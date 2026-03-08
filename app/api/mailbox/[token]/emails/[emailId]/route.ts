import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = { params: Promise<{ token: string; emailId: string }> };

/**
 * GET /api/mailbox/[token]/emails/[emailId]
 *
 * Fetch the full content of a specific email (including HTML/text body).
 * Marks the email as read.
 */
export async function GET(_req: NextRequest, { params }: RouteParams) {
    try {
        const { token, emailId } = await params;

        // ─── Single query: find email via mailbox token ──────
        // Replaces 3 sequential queries with 1 by joining through
        // the mailbox relation and checking expiry in the WHERE clause.
        const email = await prisma.email.findFirst({
            where: {
                id: emailId,
                mailbox: {
                    token,
                    expiresAt: { gt: new Date() },
                },
            },
            include: {
                mailbox: { select: { token: true } },
            },
        });

        if (!email) {
            return NextResponse.json(
                { error: "Email not found or mailbox expired" },
                { status: 404 }
            );
        }

        // ─── Mark as read (fire-and-forget, doesn't block response)
        if (!email.isRead) {
            prisma.email
                .update({ where: { id: email.id }, data: { isRead: true } })
                .catch(() => { });
        }

        return NextResponse.json({
            id: email.id,
            from: email.fromName
                ? `${email.fromName} <${email.fromAddr}>`
                : email.fromAddr,
            subject: email.subject,
            bodyHtml: email.bodyHtml,
            bodyText: email.bodyText,
            isRead: true,
            receivedAt: email.receivedAt.toISOString(),
        });
    } catch (error) {
        console.error("Failed to fetch email:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
