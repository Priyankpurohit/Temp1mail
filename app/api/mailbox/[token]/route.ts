import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = { params: Promise<{ token: string }> };

/**
 * GET /api/mailbox/[token]
 *
 * Fetch a mailbox and its emails using the secret token.
 * Returns 404 if the mailbox doesn't exist or has expired.
 */
export async function GET(_req: NextRequest, { params }: RouteParams) {
    try {
        const { token } = await params;

        const mailbox = await prisma.mailbox.findUnique({
            where: { token },
            include: {
                emails: {
                    orderBy: { receivedAt: "desc" },
                    select: {
                        id: true,
                        fromAddr: true,
                        fromName: true,
                        subject: true,
                        isRead: true,
                        receivedAt: true,
                    },
                },
            },
        });

        if (!mailbox) {
            return NextResponse.json(
                { error: "Mailbox not found" },
                { status: 404 }
            );
        }

        // Check if expired
        if (new Date() > mailbox.expiresAt) {
            return NextResponse.json(
                { error: "Mailbox has expired" },
                { status: 410 }
            );
        }

        return NextResponse.json({
            id: mailbox.id,
            address: mailbox.address,
            expiresAt: mailbox.expiresAt.toISOString(),
            createdAt: mailbox.createdAt.toISOString(),
            emails: mailbox.emails.map((e: { id: string; fromAddr: string; fromName: string | null; subject: string; isRead: boolean; receivedAt: Date }) => ({
                id: e.id,
                from: e.fromName ? `${e.fromName} <${e.fromAddr}>` : e.fromAddr,
                subject: e.subject,
                isRead: e.isRead,
                receivedAt: e.receivedAt.toISOString(),
            })),
        });
    } catch (error) {
        console.error("Failed to fetch mailbox:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/mailbox/[token]
 *
 * Delete a mailbox and all its emails early.
 */
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
    try {
        const { token } = await params;

        const mailbox = await prisma.mailbox.findUnique({
            where: { token },
        });

        if (!mailbox) {
            return NextResponse.json(
                { error: "Mailbox not found" },
                { status: 404 }
            );
        }

        await prisma.mailbox.delete({ where: { id: mailbox.id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete mailbox:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
