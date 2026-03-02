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

        // Verify the mailbox exists and owns this email
        const mailbox = await prisma.mailbox.findUnique({
            where: { token },
        });

        if (!mailbox) {
            return NextResponse.json(
                { error: "Mailbox not found" },
                { status: 404 }
            );
        }

        if (new Date() > mailbox.expiresAt) {
            return NextResponse.json(
                { error: "Mailbox has expired" },
                { status: 410 }
            );
        }

        const email = await prisma.email.findFirst({
            where: {
                id: emailId,
                mailboxId: mailbox.id,
            },
        });

        if (!email) {
            return NextResponse.json(
                { error: "Email not found" },
                { status: 404 }
            );
        }

        // Mark as read
        if (!email.isRead) {
            await prisma.email.update({
                where: { id: email.id },
                data: { isRead: true },
            });
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
