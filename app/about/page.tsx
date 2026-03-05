import { Metadata } from "next";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: "About Us - Temp1Mail – Free Temporary Email",
    description: "Learn about Temp1Mail, a free, instant disposable email service. No signup required. Protect your privacy with anonymous temporary email addresses that auto-delete.",
};

export default function AboutPage() {
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
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Mail className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold text-foreground">Temp1Mail</span>
                    </Link>
                </div>
                <ThemeToggle />
            </header>

            {/* Content */}
            <main className="relative z-10 mx-auto max-w-3xl px-6 py-10 pb-24">
                <div className="glass-card rounded-2xl p-8 md:p-10">
                    <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
                        About Temp1Mail
                    </h1>

                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            <strong className="text-foreground">Temp1Mail</strong> is a free temporary email service
                            designed for people who value their privacy. We provide instant, anonymous disposable email
                            addresses. No signup, no registration, no personal information required.
                        </p>

                        <p>
                            In a world where every website asks for your email, protecting your real inbox matters.
                            Whether you need a temp mail for a one-time verification, testing a new service, or
                            avoiding spam, Temp1Mail has you covered.
                        </p>

                        <p>
                            Every temporary email address you create is fully functional and ready to receive emails
                            within seconds. Your disposable email inbox auto-deletes after 10 minutes, ensuring no
                            trace of your activity remains. We don&apos;t store logs, we don&apos;t track users, and
                            we don&apos;t sell data.
                        </p>

                        <p>
                            Temp1Mail is built with speed and simplicity at its core. Generate a free temp email in
                            under one second, receive your messages instantly, and move on. No strings attached.
                        </p>

                        <div className="pt-4">
                            <Link href="/">
                                <Button className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                    Start using free temp mail now →
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
