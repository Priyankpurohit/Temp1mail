import Link from "next/link";
import { Mail, ArrowLeft, Calendar } from "lucide-react";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog - Temp1Mail",
    description:
        "Tips, guides, and news about temporary email, online privacy, and staying safe on the internet.",
};

const posts = [
    {
        title: "Why You Need a Temporary Email Address",
        excerpt:
            "Signing up for a new service shouldn't mean handing over your real inbox. Learn how disposable emails keep spam at bay and protect your identity.",
        date: "2026-02-28",
        slug: "#",
    },
    {
        title: "5 Ways to Protect Your Online Privacy in 2026",
        excerpt:
            "From VPNs to temp mail, here are five practical steps you can take today to reduce your digital footprint and stay anonymous online.",
        date: "2026-02-20",
        slug: "#",
    },
    {
        title: "Temp Mail vs Email Aliases: Which One Should You Use?",
        excerpt:
            "Both tools help you manage unwanted email, but they work differently. We break down the pros and cons of each approach.",
        date: "2026-02-10",
        slug: "#",
    },
    {
        title: "How Disposable Emails Help You Avoid Phishing Attacks",
        excerpt:
            "Phishing emails are getting smarter. Discover how using throwaway addresses limits your exposure to scams and data breaches.",
        date: "2026-01-25",
        slug: "#",
    },
];

export default function BlogPage() {
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
                    Blog
                </h1>
                <p className="mb-10 text-muted-foreground">
                    Tips, guides, and news about disposable email &amp; online privacy.
                </p>

                <div className="space-y-6">
                    {posts.map((post) => (
                        <article
                            key={post.title}
                            className="glass-card rounded-xl p-6 transition-transform hover:scale-[1.01]"
                        >
                            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5" />
                                {post.date}
                            </div>
                            <h2 className="mb-2 text-lg font-semibold text-foreground">
                                {post.title}
                            </h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {post.excerpt}
                            </p>
                        </article>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
