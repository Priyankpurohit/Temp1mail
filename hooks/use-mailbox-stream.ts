import { useEffect, useRef, useCallback } from "react";

interface SSEEmail {
    id: string;
    from: string;
    subject: string;
    body_html: string | null;
    body_text: string | null;
    isRead: boolean;
    receivedAt: string;
}

interface SSEMailboxData {
    id: string;
    address: string;
    expiresAt: string;
    createdAt: string;
    emails: SSEEmail[];
}

interface UseMailboxStreamOptions {
    token: string | null;
    /** Called when full mailbox data is received (initial connect) */
    onMailbox: (data: SSEMailboxData) => void;
    /** Called when emails update */
    onEmails: (emails: SSEEmail[]) => void;
    /** Called when mailbox expires */
    onExpired: () => void;
    /** Called on fatal error */
    onError: (message: string) => void;
    /** Whether streaming is enabled */
    enabled: boolean;
}

/**
 * Hook that connects to the SSE stream for real-time email updates.
 * Automatically falls back to polling if SSE fails.
 */
export function useMailboxStream({
    token,
    onMailbox,
    onEmails,
    onExpired,
    onError,
    enabled,
}: UseMailboxStreamOptions) {
    const eventSourceRef = useRef<EventSource | null>(null);
    const fallbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const retriesRef = useRef(0);
    const MAX_RETRIES = 3;

    // Stable refs for callbacks to avoid re-triggering useEffect
    const callbacksRef = useRef({ onMailbox, onEmails, onExpired, onError });
    callbacksRef.current = { onMailbox, onEmails, onExpired, onError };

    // Polling fallback fetch function
    const pollFetch = useCallback(async (t: string) => {
        try {
            const res = await fetch(`/api/mailbox/${t}`);
            if (res.status === 404) {
                callbacksRef.current.onError("Mailbox not found");
                return;
            }
            if (res.status === 410) {
                callbacksRef.current.onExpired();
                return;
            }
            if (!res.ok) return;
            const data = await res.json();
            callbacksRef.current.onMailbox(data);
        } catch {
            // Silent fail on poll
        }
    }, []);

    useEffect(() => {
        if (!token || !enabled) return;

        let es: EventSource | null = null;

        function connectSSE() {
            es = new EventSource(`/api/mailbox/${token}/stream`);
            eventSourceRef.current = es;

            es.addEventListener("mailbox", (e) => {
                retriesRef.current = 0; // Reset retries on success
                try {
                    const data: SSEMailboxData = JSON.parse(e.data);
                    callbacksRef.current.onMailbox(data);
                } catch { /* parse error */ }
            });

            es.addEventListener("emails", (e) => {
                try {
                    const { emails }: { emails: SSEEmail[] } = JSON.parse(e.data);
                    callbacksRef.current.onEmails(emails);
                } catch { /* parse error */ }
            });

            es.addEventListener("expired", () => {
                callbacksRef.current.onExpired();
                es?.close();
            });

            es.addEventListener("error", () => {
                es?.close();
                eventSourceRef.current = null;

                retriesRef.current++;
                if (retriesRef.current <= MAX_RETRIES) {
                    // Retry SSE with exponential backoff
                    const delay = Math.min(1000 * Math.pow(2, retriesRef.current - 1), 8000);
                    setTimeout(connectSSE, delay);
                } else {
                    // Fall back to polling
                    startPollingFallback();
                }
            });
        }

        function startPollingFallback() {
            if (fallbackIntervalRef.current) return;
            // Initial fetch
            pollFetch(token!);
            // Then poll every 3 seconds (still better than 1s)
            fallbackIntervalRef.current = setInterval(() => {
                pollFetch(token!);
            }, 3000);
        }

        // Start SSE
        connectSSE();

        return () => {
            es?.close();
            eventSourceRef.current?.close();
            eventSourceRef.current = null;
            if (fallbackIntervalRef.current) {
                clearInterval(fallbackIntervalRef.current);
                fallbackIntervalRef.current = null;
            }
        };
    }, [token, enabled, pollFetch]);
}
