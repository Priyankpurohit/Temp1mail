"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Copy, Mail, Shield, Zap, Clock, Check, RefreshCw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";
import { startMailboxCreation } from "@/lib/pending-mailbox";

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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-medium text-foreground text-sm md:text-base">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
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

  /** Fire API call + navigate simultaneously - zero perceived delay */
  const handleOpenInbox = () => {
    if (!username.trim()) return;
    const fullAddress = `${username}@${MAIL_DOMAIN}`;
    setIsOpening(true);
    // Start the API call NOW (in the background)
    startMailboxCreation(fullAddress);
    // Navigate immediately - inbox page picks up the in-flight request
    router.replace(`/inbox?email=${encodeURIComponent(fullAddress)}`);
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
      <main className="relative z-10 flex flex-col items-center px-6 pt-6 pb-20 md:pt-12">

        <div className="text-center animate-fade-in-up opacity-0">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
            Free Temporary Email
            <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent leading-normal pb-1">
              Instant • Disposable • Private
            </span>
          </h1>
          <p className="mx-auto mb-6 max-w-lg text-lg text-muted-foreground">
            Free anonymous email address instantly. No registration, no spam. Your disposable inbox auto-deletes after 10 minutes.
          </p>
        </div>

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
            { icon: Shield, title: "Private Inbox", desc: "No signup, no tracking, no logs" },
            { icon: Clock, title: "Auto-Delete", desc: "All emails erased after 10 minutes" },
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

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-16 w-full max-w-3xl"
        >
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground md:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <FAQItem
              question="What is Temp1Mail?"
              answer="Temp1Mail provides free, instant disposable email addresses. Use them to sign up for services, receive verification codes, or protect your real email from spam - all without registration."
            />
            <FAQItem
              question="How long does a temporary email last?"
              answer="Each temporary email address lasts for 10 minutes from creation. After that, the mailbox and all emails are automatically and permanently deleted."
            />
            <FAQItem
              question="Do I need to sign up or register?"
              answer="No! Just visit the site, type or generate an email address, and start receiving emails instantly. Zero registration, zero personal information required."
            />
            <FAQItem
              question="Can I receive attachments?"
              answer="Currently, Temp1Mail supports receiving plain text and HTML emails. Attachment support may be added in future updates."
            />
            <FAQItem
              question="Is Temp1Mail free to use?"
              answer="Yes, Temp1Mail is completely free. There are no hidden fees, no premium tiers, and no limits on how many temporary emails you can create."
            />
            <FAQItem
              question="Can someone else access my temporary inbox?"
              answer="Your inbox is protected by a unique secret token in the URL. Only someone with that exact link can access your inbox. Never share your inbox URL if you want to keep your emails private."
            />
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
};

export default Index;
