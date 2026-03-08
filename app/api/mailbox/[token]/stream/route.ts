import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/mailbox/[token]/stream
 *
 * Server-Sent Events endpoint for real-time email updates.
 * Replaces client-side polling with efficient server-push.
 *
 * Sends:
 *   - "mailbox" event on connect (full mailbox + emails)
 *   - "emails" event when email count/content changes
 *   - "expired" event when mailbox expires
 *   - heartbeat comments every 15s to keep connection alive
 */

type RouteParams = { params: Promise<{ token: string }> };

export async function GET(_req: NextRequest, { params }: RouteParams) {
    const { token } = await params;

    // Validate mailbox exists
    const mailbox = await prisma.mailbox.findUnique({
        where: { token },
        select: { id: true, address: true, expiresAt: true, createdAt: true },
    });

    if (!mailbox) {
        return new Response(JSON.stringify({ error: "Mailbox not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    if (new Date() > mailbox.expiresAt) {
        return new Response(JSON.stringify({ error: "Mailbox has expired" }), {
            status: 410,
            headers: { "Content-Type": "application/json" },
        });
    }

    const encoder = new TextEncoder();
    let closed = false;

    const stream = new ReadableStream({
        async start(controller) {
            // Helper to send SSE event
            function send(event: string, data: unknown) {
                if (closed) return;
                try {
                    controller.enqueue(
                        encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
                    );
                } catch {
                    closed = true;
                }
            }

            // Helper to send heartbeat
            function heartbeat() {
                if (closed) return;
                try {
                    controller.enqueue(encoder.encode(": heartbeat\n\n"));
                } catch {
                    closed = true;
                }
            }

            // Fetch and format emails
            async function getEmails() {
                const emails = await prisma.email.findMany({
                    where: { mailboxId: mailbox!.id },
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
                });

                return emails.map((e) => ({
                    id: e.id,
                    from: e.fromName ? `${e.fromName} <${e.fromAddr}>` : e.fromAddr,
                    subject: e.subject,
                    body_html: e.bodyHtml,
                    body_text: e.bodyText,
                    isRead: e.isRead,
                    receivedAt: e.receivedAt.toISOString(),
                }));
            }

            // Send initial mailbox data
            try {
                const emails = await getEmails();
                send("mailbox", {
                    id: mailbox.id,
                    address: mailbox.address,
                    expiresAt: mailbox.expiresAt.toISOString(),
                    createdAt: mailbox.createdAt.toISOString(),
                    emails,
                });

                // Track last known email count + IDs for change detection
                let lastEmailIds = emails.map((e) => e.id).join(",");

                // Poll database every 2 seconds, push only on change
                const pollInterval = setInterval(async () => {
                    if (closed) {
                        clearInterval(pollInterval);
                        return;
                    }

                    try {
                        // Check if expired
                        if (new Date() > mailbox.expiresAt) {
                            send("expired", { message: "Mailbox has expired" });
                            closed = true;
                            clearInterval(pollInterval);
                            controller.close();
                            return;
                        }

                        const emails = await getEmails();
                        const currentIds = emails.map((e) => e.id).join(",");

                        // Only push if emails changed
                        if (currentIds !== lastEmailIds) {
                            lastEmailIds = currentIds;
                            send("emails", { emails });
                        }
                    } catch {
                        // Database error - don't crash the stream
                    }
                }, 2000);

                // Heartbeat every 15 seconds
                const heartbeatInterval = setInterval(() => {
                    if (closed) {
                        clearInterval(heartbeatInterval);
                        return;
                    }
                    heartbeat();
                }, 15000);

                // Clean up when client disconnects
                _req.signal.addEventListener("abort", () => {
                    closed = true;
                    clearInterval(pollInterval);
                    clearInterval(heartbeatInterval);
                });
            } catch {
                if (!closed) {
                    send("error", { message: "Stream initialization failed" });
                    controller.close();
                }
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            "X-Accel-Buffering": "no",
        },
    });
}
