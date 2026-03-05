import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateEmailAddress, getExpirationDate, MAILBOX_LIFETIME_MINUTES } from "@/lib/mailbox";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const MAIL_DOMAIN = process.env.MAILGUN_DOMAIN || "temp1mail.com";

/**
 * On-demand cleanup: delete up to 10 expired mailboxes.
 * Runs in the background after the response is sent.
 */
async function cleanupExpired() {
    try {
        const expired = await prisma.mailbox.findMany({
            where: { expiresAt: { lt: new Date() } },
            select: { id: true },
            take: 10,
        });

        if (expired.length > 0) {
            await prisma.mailbox.deleteMany({
                where: { id: { in: expired.map((m: { id: string }) => m.id) } },
            });
            console.log(`On-demand cleanup: deleted ${expired.length} expired mailboxes`);
        }
    } catch (err) {
        console.error("On-demand cleanup error:", err);
    }
}

/**
 * Increment the global stats counter for mailboxes created.
 */
async function trackMailboxCreated() {
    try {
        await prisma.stats.upsert({
            where: { id: "global" },
            create: { id: "global", mailboxes: 1, emails: 0 },
            update: { mailboxes: { increment: 1 } },
        });
    } catch (err) {
        console.error("Stats tracking error:", err);
    }
}

/**
 * POST /api/mailbox
 *
 * Create a new temporary mailbox.
 * Rate limited: 8 mailboxes per IP per 10 minutes.
 * Optimised for speed - cleanup & stats run AFTER the response.
 */
export async function POST(req: NextRequest) {
    try {
        // ─── Rate limit check ──────────────────────────────
        const ip = getClientIp(req);
        const { allowed, remaining, resetAt } = rateLimit(ip, 8, 10 * 60 * 1000);

        if (!allowed) {
            const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
            return NextResponse.json(
                { error: "Too many requests. Please wait before creating another mailbox." },
                {
                    status: 429,
                    headers: {
                        "Retry-After": String(retryAfter),
                        "X-RateLimit-Remaining": "0",
                    },
                }
            );
        }

        // ─── Parse optional address from client ─────────────
        let address: string;
        try {
            const body = await req.json();
            if (body.address && typeof body.address === "string") {
                const pattern = /^[a-z0-9]{3,12}@[a-z0-9.-]+$/;
                if (!pattern.test(body.address)) {
                    return NextResponse.json(
                        { error: "Invalid email address format" },
                        { status: 400 }
                    );
                }
                address = body.address.toLowerCase();
            } else {
                address = generateEmailAddress(MAIL_DOMAIN);
            }
        } catch {
            address = generateEmailAddress(MAIL_DOMAIN);
        }

        const expiresAt = getExpirationDate(MAILBOX_LIFETIME_MINUTES);

        // ─── Create mailbox FIRST (critical path) ───────────
        const mailbox = await prisma.mailbox.upsert({
            where: { address },
            create: {
                address,
                expiresAt,
            },
            update: {},
            include: {
                emails: {
                    orderBy: { receivedAt: "desc" },
                    select: {
                        id: true,
                        fromAddr: true,
                        fromName: true,
                        subject: true,
                        bodyHtml: true,
                        bodyText: true,
                        isRead: true,
                        receivedAt: true,
                    },
                },
            },
        });

        // ─── Send response immediately ──────────────────────
        const response = NextResponse.json(
            {
                id: mailbox.id,
                address: mailbox.address,
                token: mailbox.token,
                expiresAt: mailbox.expiresAt.toISOString(),
                createdAt: mailbox.createdAt.toISOString(),
                emails: mailbox.emails.map((e: { id: string; fromAddr: string; fromName: string | null; subject: string; bodyHtml: string | null; bodyText: string | null; isRead: boolean; receivedAt: Date }) => ({
                    id: e.id,
                    from: e.fromName ? `${e.fromName} <${e.fromAddr}>` : e.fromAddr,
                    subject: e.subject,
                    body_html: e.bodyHtml,
                    body_text: e.bodyText,
                    isRead: e.isRead,
                    receivedAt: e.receivedAt.toISOString(),
                })),
            },
            {
                status: 201,
                headers: {
                    "X-RateLimit-Remaining": String(remaining),
                },
            }
        );

        // ─── Fire-and-forget AFTER building the response ────
        // These run in the background and don't block the response
        cleanupExpired().catch(() => { });
        trackMailboxCreated().catch(() => { });

        return response;
    } catch (error) {
        console.error("Failed to create mailbox:", error);
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { error: "Failed to create mailbox", detail: message },
            { status: 500 }
        );
    }
}
