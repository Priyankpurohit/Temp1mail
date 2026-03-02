import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/webhook/mailgun
 * 
 * Simple health check to verify the webhook is reachable
 * and the database is connected. Remove in production.
 */
export async function GET() {
    try {
        const mailboxCount = await prisma.mailbox.count();
        return NextResponse.json({
            status: "ok",
            webhook: "reachable",
            mailboxes: mailboxCount,
            hasApiKey: !!process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN || "(not set, defaulting to temp1mail.com)",
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ status: "error", detail: message }, { status: 500 });
    }
}
