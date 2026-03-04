import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ - Temp1Mail",
    description:
        "Frequently asked questions about Temp1Mail — how it works, how long emails last, and more.",
};

const faqs = [
    {
        q: "What is Temp1Mail?",
        a: "Temp1Mail is a free disposable email service. It gives you a temporary email address that you can use to receive emails without sharing your real inbox.",
    },
    {
        q: "How long does my temporary email last?",
        a: "Each mailbox is active for 10 minutes from the moment it is created. After that, the mailbox and all emails are permanently deleted.",
    },
    {
        q: "Do I need to sign up?",
        a: "No. There is no registration, no password, and no personal information required. Just create an address and start receiving emails.",
    },
    {
        q: "Can I send emails from Temp1Mail?",
        a: "No. Temp1Mail is a receive-only service. You can use it to receive verification emails, newsletters, or any other incoming mail.",
    },
    {
        q: "Is it free?",
        a: "Absolutely. Temp1Mail is 100% free with no hidden charges.",
    },
    {
        q: "Can I recover deleted emails?",
        a: "No. Once a mailbox expires, all data is permanently erased and cannot be recovered. Make sure to save anything important before expiry.",
    },
    {
        q: "Is Temp1Mail safe to use?",
        a: "Yes. We don't track you, don't store personal information, and auto-delete everything. However, avoid using temporary email for sensitive accounts like banking.",
    },
    {
        q: "Why are some services blocking temporary emails?",
        a: "Some websites detect and block disposable email domains to prevent abuse. This is outside our control. You can try generating a different address.",
    },
];

export default function FaqPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
                <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-primary-glow/10 blur-[120px] animate-pulse-glow [animation-delay:1s]" />
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-6 py-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                    <Mail className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold text-foreground">Temp1Mail</span>
                </Link>
                <Link
                    href="/"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>
            </header>

            {/* Content */}
            <main className="relative z-10 mx-auto max-w-3xl px-6 pt-8 pb-20">
                <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                    Frequently Asked Questions
                </h1>
                <p className="mb-10 text-muted-foreground">
                    Everything you need to know about Temp1Mail.
                </p>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="glass-card rounded-xl p-6"
                        >
                            <h2 className="mb-2 text-base font-semibold text-foreground">
                                {faq.q}
                            </h2>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
