"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Copy, Mail, Shield, Zap, Clock, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

const MAIL_DOMAIN = "temp1mail.com";
const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

function randomUsername(): string {
  let name = "";
  for (let i = 0; i < 8; i++) {
    name += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return name;
}

interface MailboxResponse {
  id: string;
  address: string;
  token: string;
  expiresAt: string;
  createdAt: string;
}

const Index = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isOpening, setIsOpening] = useState(false);
  const [copied, setCopied] = useState(false);
  // "custom" = type your own email, "random" = generated email shown
  const [mode, setMode] = useState<"custom" | "random">("custom");

  /** Generate a random username and switch to random view */
  const generateRandom = () => {
    setUsername(randomUsername());
    setMode("random");
  };

  /** Switch back to custom input view */
  const switchToCustom = () => {
    setUsername("");
    setMode("custom");
  };

  /** Create the mailbox in DB and navigate to inbox */
  const handleOpenInbox = async () => {
    if (!username.trim()) return;
    const fullAddress = `${username}@${MAIL_DOMAIN}`;
    setIsOpening(true);
    try {
      const res = await fetch("/api/mailbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: fullAddress }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || errData.error || "Failed to create mailbox");
      }
      const data: MailboxResponse = await res.json();
      router.push(`/inbox/${data.token}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "Error", description: msg });
    } finally {
      setIsOpening(false);
    }
  };

  const handleCopy = async () => {
    const fullAddress = `${username}@${MAIL_DOMAIN}`;
    await navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    toast({ title: "Email copied!", description: "Your temporary address is ready to use." });
    setTimeout(() => setCopied(false), 2000);
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
          <Mail className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Temp1Mail</span>
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

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-card w-full max-w-md rounded-2xl p-8"
        >
          {mode === "custom" ? (
            /* ── Custom email input view ── */
            <div className="space-y-4">
              <div className="flex items-center rounded-xl border border-border bg-card overflow-hidden">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                  placeholder="Type the email"
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  maxLength={12}
                />
                <span className="shrink-0 pr-4 text-sm text-muted-foreground font-medium">
                  @{MAIL_DOMAIN}
                </span>
              </div>

              <Button
                onClick={() => {
                  if (!username.trim()) toast({ title: "Please enter an email address" });
                  else handleOpenInbox();
                }}
                disabled={isOpening}
                className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-lg py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                size="lg"
              >
                {isOpening ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Zap className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Create Inbox
                  </>
                )}
              </Button>

              <button
                onClick={generateRandom}
                className="w-full rounded-xl border border-border bg-card/50 py-3 text-sm font-medium text-foreground hover:bg-accent/30 transition-colors"
              >
                Generate Random Email
              </button>
            </div>
          ) : (
            /* ── Generated email view ── */
            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-4">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span className="flex-1 truncate font-mono text-sm font-medium text-foreground">
                  {username}@{MAIL_DOMAIN}
                </span>
                <button
                  onClick={generateRandom}
                  className="shrink-0 p-1.5 rounded-md hover:bg-accent/30 transition-colors"
                  title="Generate new random email"
                >
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  onClick={handleCopy}
                  className="shrink-0 p-1.5 rounded-md hover:bg-accent/30 transition-colors"
                  title="Copy email address"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-accent-foreground" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>

              <Button
                onClick={handleOpenInbox}
                disabled={isOpening}
                className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-lg py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                size="lg"
              >
                {isOpening ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Zap className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Open Inbox
                  </>
                )}
              </Button>

              <button
                onClick={switchToCustom}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Generate Email of your choice
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
