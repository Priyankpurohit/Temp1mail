"use client";
import { Logo } from "@/components/Logo";

import { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, Mail, RefreshCw, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CountdownTimer } from "@/components/CountdownTimer";
import { EmailCard, type EmailData } from "@/components/EmailCard";
import { toast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";
import { getPendingMailboxCreation } from "@/lib/pending-mailbox";
import { useMailboxStream } from "@/hooks/use-mailbox-stream";

interface MailboxData {
    id: string;
    address: string;
    token: string;
    expiresAt: string;
    createdAt: string;
    emails: {
        id: string;
        from: string;
        subject: string;
        body_html: string | null;
        body_text: string | null;
        isRead: boolean;
        receivedAt: string;
    }[];
}

function InboxContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const emailParam = searchParams.get("email");

    const [mailbox, setMailbox] = useState<MailboxData | null>(null);
    const [emails, setEmails] = useState<EmailData[]>([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    // Capture email on first render so it survives URL changes
    const emailRef = useRef(emailParam);
    // Provisional expiry: show timer immediately (10 min from now), update with real value later
    const [expiresAt] = useState(() => new Date(Date.now() + 10 * 60 * 1000));

    /** Step 1: Create the mailbox - reuse the in-flight request from homepage if available */
    useEffect(() => {
        const email = emailRef.current;
        if (!email) {
            setError("No email address provided");
            setLoading(false);
            return;
        }

        async function createMailbox() {
            try {
                // Reuse the in-flight request started on the homepage (saves 4-5s!)
                const pending = getPendingMailboxCreation(email!);
                const response = await (pending || fetch("/api/mailbox", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ address: email }),
                }));

                // ─── Rate limit feedback ───────────────────────
                if (response.status === 429) {
                    const retryAfter = parseInt(response.headers.get("Retry-After") || "60", 10);
                    const minutes = Math.ceil(retryAfter / 60);
                    toast({
                        title: "⏳ Too many mailboxes created",
                        description: `Rate Limit Reached - Kindley Wait For ${minutes} Minute${minutes > 1 ? "s" : ""}.`,
                        variant: "destructive",
                    });
                    setError(`Rate Limit Reached - Kindley Wait For ${minutes} Minute${minutes > 1 ? "s" : ""}.`);
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    throw new Error(errData.detail || errData.error || "Failed to create mailbox");
                }

                const data: MailboxData = await response.json();

                setToken(data.token);
                setMailbox(data);
                setEmails(
                    (data.emails || []).map((e) => ({
                        id: e.id,
                        from_email: e.from,
                        subject: e.subject,
                        body_text: e.body_text || "",
                        body_html: e.body_html || "",
                        received_at: e.receivedAt,
                    }))
                );
                setLoading(false);

                // Silently update the URL to the token-based URL (no page reload)
                // Passing window.history.state is CRITICAL so we don't break Next.js's back button history stack
                window.history.replaceState(window.history.state, "", `/inbox/${data.token}`);
            } catch (err) {
                const msg = err instanceof Error ? err.message : "Unknown error";
                setError(msg);
                setLoading(false);
            }
        }

        createMailbox();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /** Step 2: Real-time email updates via SSE (with polling fallback) */
    const mapEmails = useCallback((emails: { id: string; from: string; subject: string; body_html: string | null; body_text: string | null; isRead: boolean; receivedAt: string }[]) => {
        return emails.map((e) => ({
            id: e.id,
            from_email: e.from,
            subject: e.subject,
            body_text: e.body_text || "",
            body_html: e.body_html || "",
            received_at: e.receivedAt,
        }));
    }, []);

    useMailboxStream({
        token,
        enabled: !error && !loading,
        onMailbox: (data) => {
            setMailbox((prev) => prev ? { ...prev, ...data, token: prev.token } : { ...data, token: token! });
            setEmails(mapEmails(data.emails));
        },
        onEmails: (emails) => {
            setEmails(mapEmails(emails));
        },
        onExpired: () => {
            setError("This mailbox has expired");
        },
        onError: (msg) => {
            setError(msg);
        },
    });

    const handleCopy = async () => {
        const address = mailbox?.address || emailRef.current;
        if (!address) return;
        await navigator.clipboard.writeText(address);
        setCopied(true);
        toast({ title: "Email copied!" });
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDelete = async () => {
        if (!token) return;
        try {
            await fetch(`/api/mailbox/${token}`, { method: "DELETE" });
            toast({ title: "Mailbox deleted" });
            router.push("/");
        } catch {
            toast({ title: "Error", description: "Could not delete mailbox" });
        }
    };

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                    <Mail className="h-16 w-16 text-muted-foreground/30 mb-4" />
                </motion.div>
                <h2 className="text-xl font-semibold text-foreground mb-2">{error}</h2>
                {!error.includes("Rate Limit Reached") && (
                    <p className="text-sm text-muted-foreground mb-6">
                        This mailbox may have expired or doesn&apos;t exist.
                    </p>
                )}
                <div className="mt-[70px]">
                    <Link href="/">
                        <Button className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
                            Generate New Email
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex flex-col bg-background">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-1/4 -top-1/4 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <Logo />
                </div>
                <ThemeToggle />
            </header>

            <div className="relative z-10 mx-auto flex items-start w-full max-w-5xl gap-2 sm:gap-4 px-4 py-6 md:px-6 pb-20">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="mt-2 sm:mt-3 shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full hover:bg-muted/50" title="Go back">
                    <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground hover:text-foreground transition-colors" />
                </Button>

                {/* Main content */}
                <div className="flex-1 min-w-0 space-y-4 sm:space-y-6">
                    {/* Email address bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-xl p-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground mb-1">Your temporary email</p>
                                <p className="truncate font-mono text-sm font-semibold text-foreground">
                                    {mailbox?.address || emailRef.current || "Loading..."}
                                </p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={handleDelete} className="shrink-0" title="Delete mailbox" disabled={!token}>
                                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={handleCopy} className="shrink-0">
                                {copied ? <Check className="h-4 w-4 text-accent-foreground" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                            </Button>
                        </div>
                        <CountdownTimer expiresAt={mailbox ? new Date(mailbox.expiresAt) : expiresAt} className="mt-3" />
                    </motion.div>

                    {/* Refresh indicator */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        {loading ? "Creating mailbox..." : "Auto-refreshing"}
                    </div>

                    {/* Email list */}
                    {emails.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center py-20 text-center"
                        >
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                                <Mail className="h-16 w-16 text-muted-foreground/30" />
                            </motion.div>
                            <h3 className="mt-4 text-lg font-semibold text-foreground">Waiting for emails...</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Send an email to{" "}
                                <a
                                    href={`mailto:${mailbox?.address || emailRef.current}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-primary no-underline hover:no-underline hover:opacity-80 transition-opacity"
                                >
                                    {mailbox?.address || emailRef.current}
                                </a>{" "}
                                and it will appear here
                            </p>
                        </motion.div>
                    ) : (
                        <div className="space-y-3">
                            {emails.map((em) => (
                                <EmailCard key={em.id} email={em} token={token!} />
                            ))}
                        </div>
                    )}

                </div>

            </div>

            <Footer />
        </div>
    );
}

export default function InboxPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Loading...</span>
                </div>
            </div>
        }>
            <InboxContent />
        </Suspense>
    );
}
