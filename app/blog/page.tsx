import { Logo } from "@/components/Logo";
import Link from "next/link";
import { Mail, ArrowLeft, Calendar, ArrowRight, Zap } from "lucide-react";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog - Temp1Mail | Disposable Email Tips & Privacy Guides",
    description:
        "Read expert guides on temporary email, online privacy, and staying safe. Learn how Temp1Mail helps protect your identity with free disposable email addresses.",
};

const posts = [
    {
        title: "Best Temporary Email Services in 2026: Why Temp1Mail Dominates",
        excerpt:
            "We tested 20+ providers on speed, privacy, retention, and features. See how Temp1Mail stacks up against 10 Minute Mail, YOPmail, Guerrilla Mail, and more.",
        date: "2026-03-05",
        slug: "best-temporary-email-services-2026",
        readTime: "7 min read",
    },
    {
        title: "How to Use Disposable Email for Safe Online Signups",
        excerpt:
            "Sites like Facebook block temp mail domains. Learn step-by-step how to use disposable email to get OTPs without risking your real inbox.",
        date: "2026-03-03",
        slug: "disposable-email-safe-signups-guide",
        readTime: "5 min read",
    },
    {
        title: "Top 5 Reasons to Use Temporary Email for Privacy in 2026",
        excerpt:
            "In 2026, data breaches hit 1B+ records yearly. Discover why temporary email beats regular email for spam protection, phishing defense, and total privacy.",
        date: "2026-02-28",
        slug: "top-5-reasons-temporary-email-privacy",
        readTime: "5 min read",
    },
    {
        title: "Generating Custom Temp Emails: Bypass Site Blocks on Temp1Mail",
        excerpt:
            "Public temp domains get blacklisted fast. Learn how custom disposable emails via Temp1Mail give you unblocked access with your own domain.",
        date: "2026-02-20",
        slug: "custom-temp-emails-bypass-blocks",
        readTime: "6 min read",
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
            <main className="relative z-10 mx-auto max-w-3xl px-6 pt-8 pb-24">
                <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                    Blog
                </h1>
                <p className="mb-10 text-muted-foreground">
                    Expert guides on disposable email, online privacy, and staying safe in 2026.
                </p>

                <div className="space-y-6">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                            <article className="glass-card rounded-xl p-6 transition-all hover:scale-[1.01] hover:border-primary/30 mb-6">
                                <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {post.date}
                                    </span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h2 className="mb-2 text-lg font-semibold text-foreground">
                                    {post.title}
                                </h2>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                    {post.excerpt}
                                </p>
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                                    Read more <ArrowRight className="h-3 w-3" />
                                </span>
                            </article>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
