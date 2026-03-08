import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || "";
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || "temp1mail.com";
const CONTACT_TO_EMAIL = process.env.CONTACT_EMAIL || "admin@temp1mail.com";

export async function POST(req: NextRequest) {
    try {
        // ─── Rate limit: 3 messages per IP per hour ──────────
        const ip = getClientIp(req);
        const { allowed, resetAt } = rateLimit(`contact:${ip}`, 3, 60 * 60 * 1000);
        if (!allowed) {
            const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
            return NextResponse.json(
                { error: "Too many messages. Please try again later." },
                {
                    status: 429,
                    headers: { "Retry-After": String(retryAfter) },
                }
            );
        }

        const body = await req.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Basic validation
        if (name.length > 100 || email.length > 200 || message.length > 5000) {
            return NextResponse.json(
                { error: "Input too long" },
                { status: 400 }
            );
        }

        if (!MAILGUN_API_KEY) {
            console.error("MAILGUN_API_KEY not set - cannot send contact email");
            return NextResponse.json(
                { error: "Email service not configured" },
                { status: 500 }
            );
        }

        // Send via Mailgun API
        const formData = new FormData();
        formData.append("from", `Temp1Mail Contact <contact@${MAILGUN_DOMAIN}>`);
        formData.append("to", CONTACT_TO_EMAIL);
        formData.append("subject", `[Temp1Mail Contact] Message from ${name}`);
        formData.append("text", [
            `Name: ${name}`,
            `Email: ${email}`,
            ``,
            `Message:`,
            message,
            ``,
            `---`,
            `Sent from Temp1Mail contact form`,
        ].join("\n"));
        formData.append("h:Reply-To", email);

        const res = await fetch(
            `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
            {
                method: "POST",
                headers: {
                    Authorization: `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64")}`,
                },
                body: formData,
            }
        );

        if (!res.ok) {
            const err = await res.text();
            console.error("Mailgun send error:", err);
            return NextResponse.json(
                { error: "Failed to send message" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
