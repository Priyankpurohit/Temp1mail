import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "node:crypto";

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || "";

/**
 * POST /api/webhook/mailgun
 *
 * Mailgun routes incoming emails here.
 * Parses the email and stores it in the matching mailbox.
 *
 * Mailgun sends multipart/form-data with fields:
 *   - recipient: the To address
 *   - sender: the From address
 *   - from: display name + address
 *   - subject: email subject
 *   - body-html: HTML body
 *   - body-plain: plain-text body
 *   - timestamp, token, signature: for verification
 */
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // ─── Verify Mailgun signature ────────────────────────
        const timestamp = formData.get("timestamp") as string;
        const token = formData.get("token") as string;
        const signature = formData.get("signature") as string;

        if (!verifyMailgunSignature(timestamp, token, signature)) {
            console.warn("Invalid Mailgun signature");
            return NextResponse.json(
                { error: "Invalid signature" },
                { status: 403 }
            );
        }

        // ─── Parse email fields ──────────────────────────────
        const recipient = (formData.get("recipient") as string)?.toLowerCase();
        const sender = formData.get("sender") as string;
        const from = formData.get("from") as string;
        const subject = (formData.get("subject") as string) || "(no subject)";
        const bodyHtml = formData.get("body-html") as string | null;
        const bodyPlain = formData.get("body-plain") as string | null;

        if (!recipient) {
            return NextResponse.json(
                { error: "Missing recipient" },
                { status: 400 }
            );
        }

        // ─── Find the mailbox ────────────────────────────────
        const mailbox = await prisma.mailbox.findUnique({
            where: { address: recipient },
        });

        if (!mailbox) {
            // No matching mailbox — discard silently (Mailgun expects 200)
            console.log(`No mailbox found for ${recipient}, discarding.`);
            return NextResponse.json({ message: "Discarded" }, { status: 200 });
        }

        if (new Date() > mailbox.expiresAt) {
            console.log(`Mailbox ${recipient} has expired, discarding.`);
            return NextResponse.json({ message: "Expired" }, { status: 200 });
        }

        // ─── Parse sender name ───────────────────────────────
        const fromName = extractSenderName(from);
        const fromAddr = sender || extractSenderAddr(from) || "unknown";

        // ─── Store the email ─────────────────────────────────
        await prisma.email.create({
            data: {
                mailboxId: mailbox.id,
                fromAddr,
                fromName,
                subject,
                bodyHtml,
                bodyText: bodyPlain,
            },
        });

        return NextResponse.json({ message: "Stored" }, { status: 200 });
    } catch (error) {
        console.error("Webhook error:", error);
        // Return 200 so Mailgun doesn't retry indefinitely
        return NextResponse.json({ message: "Error" }, { status: 200 });
    }
}

// ─── Helpers ───────────────────────────────────────────────

/**
 * Verify the Mailgun webhook signature.
 * https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Webhooks/#tag/Webhooks/Securing-Webhooks
 */
function verifyMailgunSignature(
    timestamp: string,
    token: string,
    signature: string
): boolean {
    if (!MAILGUN_API_KEY || !timestamp || !token || !signature) return false;

    const hmac = crypto.createHmac("sha256", MAILGUN_API_KEY);
    hmac.update(timestamp + token);
    const expected = hmac.digest("hex");

    return crypto.timingSafeEqual(
        Buffer.from(signature, "hex"),
        Buffer.from(expected, "hex")
    );
}

/**
 * Extract Display Name from "John Doe <john@example.com>" format.
 */
function extractSenderName(from: string | null): string | null {
    if (!from) return null;
    const match = from.match(/^(.+?)\s*<.+>$/);
    return match ? match[1].replace(/"/g, "").trim() : null;
}

/**
 * Extract email address from "John Doe <john@example.com>" format.
 */
function extractSenderAddr(from: string | null): string | null {
    if (!from) return null;
    const match = from.match(/<(.+?)>/);
    return match ? match[1] : from;
}
