"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Copy, Mail, Shield, Zap, Clock, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

interface MailboxResponse {
  id: string;
  address: string;
  token: string;
  expiresAt: string;
  createdAt: string;
}

const Index = () => {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [mailbox, setMailbox] = useState<MailboxResponse | null>(null);
  const [copied, setCopied] = useState(false);

  /** Call the API to create a real mailbox in the DB */
  const createMailbox = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/mailbox", { method: "POST" });
      if (!res.ok) throw new Error("Failed to create mailbox");
      const data: MailboxResponse = await res.json();
      setMailbox(data);
    } catch {
      toast({ title: "Error", description: "Could not create mailbox. Please try again." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!mailbox) return;
    await navigator.clipboard.writeText(mailbox.address);
    setCopied(true);
    toast({ title: "Email copied!", description: "Your temporary address is ready to use." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoToInbox = () => {
    if (!mailbox) return;
    router.push(`/inbox/${mailbox.token}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-primary-glow/10 blur-[120px] animate-pulse-glow [animation-delay:1s]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Mail className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">temp1mail</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center px-6 pt-12 pb-20 md:pt-24">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
            Free Temp Mail
            <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Instant • Private
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-lg text-lg text-muted-foreground">
            Get a disposable email address instantly. No signup, no hassle. Emails auto-delete after 10 minutes.
          </p>
        </motion.div>

        {/* Generate card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-card w-full max-w-md rounded-2xl p-8"
        >
          {!mailbox ? (
            <div className="space-y-4">
              <Button
                onClick={createMailbox}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-lg py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                size="lg"
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Zap className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Generate Email Address
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Click to get a random disposable email — no signup needed
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-4">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span className="flex-1 truncate font-mono text-sm font-medium text-foreground">
                  {mailbox.address}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={createMailbox}
                  disabled={isGenerating}
                  className="shrink-0"
                  title="Generate new random email"
                >
                  <RefreshCw className={`h-4 w-4 text-muted-foreground ${isGenerating ? "animate-spin" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-accent-foreground" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <Button
                onClick={handleGoToInbox}
                className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-xl font-semibold"
                size="lg"
              >
                Open Inbox
              </Button>
              <button
                onClick={createMailbox}
                disabled={isGenerating}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                Generate a different address
              </button>
            </div>
          )}
        </motion.div>

        {/* Features */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 max-w-3xl w-full">
          {[
            { icon: Zap, title: "Instant", desc: "Get your email in under 1 second" },
            { icon: Shield, title: "Private", desc: "No signup, no tracking, no logs" },
            { icon: Clock, title: "Auto-Delete", desc: "All data erased after 10 minutes" },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <f.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-1 font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} temp1mail.com — Free disposable email service
      </footer>
    </div>
  );
};

export default Index;
