"use client";
import { Logo } from "@/components/Logo";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";

function FAQAccordion({ question, children }: { question: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="glass-card rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
                <span className="font-medium text-foreground text-sm md:text-base">{question}</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-3" />
                </motion.div>
            </button>
            <motion.div
                initial={false}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed space-y-2">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}

export default function FAQPage() {
    return (
        <div className="relative min-h-screen bg-background">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-1/4 -top-1/4 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Logo />
                </div>
                <ThemeToggle />
            </header>

            {/* Content */}
            <main className="relative z-10 mx-auto max-w-3xl px-6 py-10 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl text-center">
                        Frequently Asked Questions
                    </h1>
                    <p className="mb-10 text-center text-muted-foreground">
                        Everything you need to know about Temp1Mail, your free temporary email service.
                    </p>

                    <div className="space-y-3">

                        {/* Q1 */}
                        <FAQAccordion question="What is a temporary / disposable email?">
                            <p>
                                A <strong className="text-foreground">temporary email</strong> (also called <Link href="/disposable-mail" className="text-primary hover:opacity-80 transition-opacity">disposable email</Link> or <Link href="/temp-email" className="text-primary hover:opacity-80 transition-opacity">temp mail</Link>)
                                is a short-lived email address you can use without signing up or providing personal information.
                                It&apos;s perfect for situations where you need an email address but don&apos;t want to use your real one.
                            </p>
                            <p>
                                With <Link href="/" className="text-primary hover:opacity-80 transition-opacity">Temp1Mail</Link>,
                                you can instantly create a <Link href="/free-mail" className="text-primary hover:opacity-80 transition-opacity">free temp email</Link> that auto-deletes after 10 minutes (just like a <Link href="/10-minute-mail" className="text-primary hover:opacity-80 transition-opacity">10 minute mail</Link>), keeping your
                                real inbox clean and your identity anonymous. Your new <Link href="/disposable-inbox" className="text-primary hover:opacity-80 transition-opacity">disposable inbox</Link> blocks all spam effortlessly.
                            </p>
                        </FAQAccordion>

                        {/* Q2 */}
                        <FAQAccordion question="How does Temp1Mail work?">
                            <p>
                                Using Temp1Mail is simple: visit the homepage, type a
                                custom address or click{" "}
                                <Link href="/random-mail" className="text-primary hover:opacity-80 transition-opacity">Generate Random Mail</Link>
                                , and your <Link href="/temporary-inbox" className="text-primary hover:opacity-80 transition-opacity">temporary inbox</Link> is ready instantly via our robust <Link href="/email-generator" className="text-primary hover:opacity-80 transition-opacity">email generator</Link>.
                            </p>
                            <p>
                                Any emails sent to your disposable address appear in real-time. Your inbox automatically
                                refreshes every second, so you never miss a message. After 10 minutes, the mailbox
                                and all emails are permanently deleted.
                            </p>
                        </FAQAccordion>

                        {/* Q3 */}
                        <FAQAccordion question="Is Temp1Mail free? Do I need to register?">
                            <p>
                                Yes! Temp1Mail is <strong className="text-foreground">100% free</strong> with no registration,
                                no signup, and no personal information required. Just visit{" "}
                                <Link href="/" className="text-primary hover:opacity-80 transition-opacity">temp1mail.com</Link>,
                                create your <Link href="/anonymous-email" className="text-primary hover:opacity-80 transition-opacity">anonymous email</Link> address, and start receiving emails immediately.
                            </p>
                            <p>
                                There are no hidden fees, no premium tiers, and no limits on how many <Link href="/temporary-email" className="text-primary hover:opacity-80 transition-opacity">temporary
                                    email</Link> addresses you can create. It acts as an excellent <Link href="/email-for-verification" className="text-primary hover:opacity-80 transition-opacity">email for verification</Link>.
                            </p>
                        </FAQAccordion>

                        {/* Q4 */}
                        <FAQAccordion question="How long do emails last on Temp1Mail?">
                            <p>
                                Each temporary email address lasts for <strong className="text-foreground">10 minutes</strong> from
                                the moment it&apos;s created. After that, the mailbox and all received emails are
                                automatically and permanently deleted from our servers.
                            </p>
                            <p>
                                This auto-delete feature ensures your privacy is protected. Need a fresh address?
                                Simply{" "}
                                <Link href="/custom-mail" className="text-primary hover:opacity-80 transition-opacity">generate a new custom mail</Link>{" "}
                                or use our{" "}
                                <Link href="/random-mail" className="text-primary hover:opacity-80 transition-opacity">random mail generator</Link>.
                            </p>
                        </FAQAccordion>

                        {/* Q5 */}
                        <FAQAccordion question="Can I use Temp1Mail for verification codes and OTPs?">
                            <p>
                                Absolutely! Temp1Mail is ideal for receiving verification codes, OTPs, and
                                confirmation emails. Many users use our disposable email addresses to sign up
                                for websites, verify accounts, and receive one-time passwords without exposing
                                their real email. It functions flawlessly as an <Link href="/email-for-otp" className="text-primary hover:opacity-80 transition-opacity">email for otp</Link>.
                            </p>
                            <p>
                                Simply{" "}
                                <Link href="/" className="text-primary hover:opacity-80 transition-opacity">create a temp email on Temp1Mail</Link>,
                                use it for your verification, and the inbox auto-deletes after 10 minutes.
                            </p>
                        </FAQAccordion>

                        {/* Q6 */}
                        <FAQAccordion question="Is using temporary email safe and private?">
                            <p>
                                Yes. Temp1Mail is designed with privacy as the top priority. We don&apos;t collect
                                personal information, don&apos;t require registration, and don&apos;t track your activity.
                                Your temporary inbox is protected by a unique secret token. Only you (or someone
                                with your link) can access it.
                            </p>
                            <p>
                                All data is permanently erased after expiration. Read our{" "}
                                <Link href="/privacy" className="text-primary hover:opacity-80 transition-opacity">Privacy Policy</Link>{" "}
                                for full details.
                            </p>
                        </FAQAccordion>

                        {/* Q7 */}
                        <FAQAccordion question="Can I send emails from Temp1Mail?">
                            <p>
                                Currently, Temp1Mail is a <strong className="text-foreground">receive-only</strong> service.
                                You can receive emails, verification codes, and notifications, but you cannot send
                                outgoing emails from your temporary address.
                            </p>
                            <p>
                                This is by design. It helps prevent abuse and keeps the <Link href="/tempmail" className="text-primary hover:opacity-80 transition-opacity">tempmail</Link> service free and fast
                                for all users.
                            </p>
                        </FAQAccordion>

                        {/* Q8 */}
                        <FAQAccordion question="Why use a disposable email instead of my real one?">
                            <p>
                                Using a disposable email protects you from:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Spam and unwanted marketing emails</li>
                                <li>Data breaches exposing your real email</li>
                                <li>Companies selling your email to third parties</li>
                                <li>Identity tracking across websites</li>
                            </ul>
                            <p>
                                Instead of handing out your personal email everywhere,{" "}
                                <Link href="/custom-mail" className="text-primary hover:opacity-80 transition-opacity">generate a custom temp mail</Link>{" "}
                                on Temp1Mail and keep your real inbox clean and secure.
                            </p>
                        </FAQAccordion>

                        {/* Q9 */}
                        <FAQAccordion question="What happens when my temporary email expires?">
                            <p>
                                When your 10-minute timer runs out, your temporary mailbox and <strong className="text-foreground">all
                                    associated emails are permanently deleted</strong> from our servers. There is no
                                way to recover them.
                            </p>
                            <p>
                                This ensures maximum privacy: no leftover data, no archives, no traces.
                                If you need another address, just visit{" "}
                                <Link href="/" className="text-primary hover:opacity-80 transition-opacity">Temp1Mail</Link>{" "}
                                and create a new one instantly.
                            </p>
                        </FAQAccordion>

                        {/* Q10 */}
                        <FAQAccordion question="Does Temp1Mail store my data or logs?">
                            <p>
                                No. Temp1Mail does not store user data, activity logs, or personal information.
                                Temporary mailboxes exist only for their 10-minute lifespan and are then
                                permanently purged from the database.
                            </p>
                            <p>
                                We don&apos;t use cookies for tracking and don&apos;t share any information with
                                third parties. See our{" "}
                                <Link href="/privacy" className="text-primary hover:opacity-80 transition-opacity">Privacy Policy</Link>{" "}
                                and{" "}
                                <Link href="/terms" className="text-primary hover:opacity-80 transition-opacity">Terms of Service</Link>{" "}
                                for more details.
                            </p>
                        </FAQAccordion>

                        {/* Q11 */}
                        <FAQAccordion question="How do I generate a custom or random temp mail?">
                            <p>
                                Temp1Mail gives you two options:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    <strong className="text-foreground">Custom email:</strong> Type any username you like on the{" "}
                                    <Link href="/custom-mail" className="text-primary hover:opacity-80 transition-opacity">custom mail generator</Link>{" "}
                                    , for example, <code className="text-xs bg-muted px-1 py-0.5 rounded">myname@temp1mail.com</code>
                                </li>
                                <li>
                                    <strong className="text-foreground">Random email:</strong> Click{" "}
                                    <Link href="/random-mail" className="text-primary hover:opacity-80 transition-opacity">Generate Random Mail</Link>{" "}
                                    and we&apos;ll create a unique address for you instantly
                                </li>
                            </ul>
                            <p>
                                Both options are free, instant, and require zero registration.{" "}
                                <Link href="/" className="text-primary hover:opacity-80 transition-opacity">Start using Temp1Mail now →</Link>
                            </p>
                        </FAQAccordion>

                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
