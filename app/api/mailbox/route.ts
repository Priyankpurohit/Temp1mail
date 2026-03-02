import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateEmailAddress, getExpirationDate, MAILBOX_LIFETIME_MINUTES } from "@/lib/mailbox";

const MAIL_DOMAIN = process.env.MAILGUN_DOMAIN || "temp1mail.com";

/**
 * POST /api/mailbox
 *
 * Create a new temporary mailbox.
 * Returns the mailbox address, token (for inbox access), and expiration time.
 */
export async function POST() {
    try {
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
            { status: 201 }
        );
    } catch (error) {
        console.error("Failed to create mailbox:", error);
        return NextResponse.json(
            { error: "Failed to create mailbox" },
            { status: 500 }
        );
    }
}
