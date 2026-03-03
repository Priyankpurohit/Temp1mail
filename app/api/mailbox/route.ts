import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateEmailAddress, getExpirationDate, MAILBOX_LIFETIME_MINUTES } from "@/lib/mailbox";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const MAIL_DOMAIN = process.env.MAILGUN_DOMAIN || "temp1mail.com";

/**
 * On-demand cleanup: delete up to 10 expired mailboxes.
 * Runs in the background every time a new mailbox is created.
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
 * Rate limited: 5 mailboxes per IP per 10 minutes.
 * Also triggers on-demand cleanup and stats tracking.
 */
export async function POST(req: NextRequest) {
    try {
        // ─── Rate limit check ──────────────────────────────
        const ip = getClientIp(req);
        const { allowed, remaining, resetAt } = rateLimit(ip, 5, 10 * 60 * 1000);

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

        // ─── Fire-and-forget background tasks ──────────────
        cleanupExpired();
        trackMailboxCreated();

        // ─── Create mailbox ────────────────────────────────
        const address = generateEmailAddress(MAIL_DOMAIN);
        const expiresAt = getExpirationDate(MAILBOX_LIFETIME_MINUTES);

        const mailbox = await prisma.mailbox.create({
            data: {
                address,
                expiresAt,
            },
        });

        return NextResponse.json(
            {
                id: mailbox.id,
                address: mailbox.address,
                token: mailbox.token,
                expiresAt: mailbox.expiresAt.toISOString(),
                createdAt: mailbox.createdAt.toISOString(),
            },
            {
                status: 201,
                headers: {
                    "X-RateLimit-Remaining": String(remaining),
                },
            }
        );
    } catch (error) {
        console.error("Failed to create mailbox:", error);
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { error: "Failed to create mailbox", detail: message },
            { status: 500 }
        );
    }
}
