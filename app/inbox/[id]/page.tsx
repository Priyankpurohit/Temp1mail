"use client";
import { Logo } from "@/components/Logo";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, Mail, RefreshCw, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CountdownTimer } from "@/components/CountdownTimer";
import { EmailCard, type EmailData } from "@/components/EmailCard";
import { toast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";
import { useMailboxStream } from "@/hooks/use-mailbox-stream";

interface MailboxData {
  id: string;
  address: string;
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

export default function InboxPage() {
  const { id: token } = useParams<{ id: string }>();
  const router = useRouter();

  const [mailbox, setMailbox] = useState<MailboxData | null>(null);
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Fetch mailbox + email list from API (initial load only) */
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

  const fetchMailbox = useCallback(async () => {
    try {
      const res = await fetch(`/api/mailbox/${token}`);

      if (res.status === 404) {
        setError("Mailbox not found");
        setLoading(false);
        return;
      }
      if (res.status === 410) {
        setError("This mailbox has expired");
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch mailbox");

      const data: MailboxData = await res.json();
      setMailbox(data);
      setEmails(mapEmails(data.emails));
      setLoading(false);
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }, [token, mapEmails]);

  // Initial load
  useEffect(() => {
    fetchMailbox();
  }, [fetchMailbox]);

  // Real-time updates via SSE (with polling fallback)
  useMailboxStream({
    token,
    enabled: !error && !loading,
    onMailbox: (data) => {
      setMailbox((prev) => prev ? { ...prev, ...data } : data as unknown as MailboxData);
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
    if (!mailbox) return;
    await navigator.clipboard.writeText(mailbox.address);
    setCopied(true);
    toast({ title: "Email copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!mailbox) return;
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
        <p className="text-sm text-muted-foreground mb-6">
          This mailbox may have expired or doesn&apos;t exist.
        </p>
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
                  {mailbox?.address || "Loading..."}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleDelete} className="shrink-0" title="Delete mailbox">
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCopy} className="shrink-0">
                {copied ? <Check className="h-4 w-4 text-accent-foreground" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
              </Button>
            </div>
            {mailbox && (
              <CountdownTimer expiresAt={new Date(mailbox.expiresAt)} className="mt-3" />
            )}
          </motion.div>

          {/* Refresh indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
            <RefreshCw className="h-3 w-3 animate-spin" />
            Auto-refreshing
          </div>

          {/* Email list */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : emails.length === 0 ? (
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
                  href={`mailto:${mailbox?.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-primary no-underline hover:no-underline hover:opacity-80 transition-opacity"
                >
                  {mailbox?.address}
                </a>{" "}
                and it will appear here
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {emails.map((em) => (
                <EmailCard key={em.id} email={em} token={token} />
              ))}
            </div>
          )}

        </div>

      </div>

      <Footer />
    </div>
  );
}
