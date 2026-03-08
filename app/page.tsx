"use client"
import { Logo } from "@/components/Logo";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Shield, Zap, Clock, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { EmailGeneratorCard } from "@/components/EmailGeneratorCard";

function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
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
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-primary-glow/10 blur-[120px] animate-pulse-glow [animation-delay:1s]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Logo />
        <ThemeToggle />
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center px-6 pt-6 pb-20 md:pt-12">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full"
        >
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
            Free Temporary Email
            <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent leading-normal pb-1">
              Instant • Disposable • Private
            </span>
          </h1>
          <p className="mx-auto mb-3 max-w-lg text-lg text-muted-foreground">
            Free anonymous email address instantly. No registration, no
            spam. Your disposable inbox auto-deletes after 10 minutes.
          </p>
        </motion.div>

        {/* Card */}
        <EmailGeneratorCard />

        {/* Features */}
        <div className="mt-8 grid gap-6 md:grid-cols-3 max-w-3xl w-full">
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
              answer={<>Temp1Mail provides free, instant disposable email addresses. If you need something slightly different, you can also try an <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>, a <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>, or a <Link href="/choice-mail" className="text-primary hover:underline">choice mail</Link> to sign up for services without registration.</>}
            />
            <FAQItem
              question="How long does a temporary email last?"
              answer={<>Each temporary email address lasts for 10 minutes from creation. This operates similarly to a <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>, a <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link>, or a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>, automatically and permanently deleting all messages afterwards.</>}
            />
            <FAQItem
              question="Do I need to sign up or register?"
              answer={<>No! Just visit the site, type or generate an email address, and start receiving emails instantly. Zero registration, zero personal information required. Feel free to use our <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> or <Link href="/generate-custom-mail" className="text-primary hover:underline">custom mail</Link> directly.</>}
            />
            <FAQItem
              question="Can I receive attachments?"
              answer={<>Currently, Temp1Mail supports receiving plain text and HTML emails. Attachment support may be added in future updates to our <Link href="/random-mail" className="text-primary hover:underline">random mail</Link> and <Link href="/temp-email" className="text-primary hover:underline">temp email</Link> services.</>}
            />
            <FAQItem
              question="Is Temp1Mail free to use?"
              answer={<>Yes, Temp1Mail is completely free. There are no hidden fees, no premium tiers, and no limits on how many temporary emails you can create. Be sure to check out our <Link href="/temp-mail-free" className="text-primary hover:underline">free temp mail</Link> or <Link href="/tempemail" className="text-primary hover:underline">tempemail</Link> solutions.</>}
            />
            <FAQItem
              question="Can someone else access my temporary inbox?"
              answer={<>Your inbox is protected by a unique secret token in the URL. Only someone with that exact link can access your inbox. Never share your inbox URL if you want to keep your emails private, just like a secure <Link href="/temporary-email" className="text-primary hover:underline">temporary email</Link> or <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link>.</>}
            />
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
};

export default Index;
