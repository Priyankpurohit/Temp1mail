import { Logo } from "@/components/Logo";
import Link from "next/link";
import { Mail, ArrowLeft, Zap } from "lucide-react";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - Temp1Mail",
    description:
        "Learn how Temp1Mail handles your data. We collect minimal information and auto-delete everything.",
};

export default function PrivacyPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
                <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-primary-glow/10 blur-[120px] animate-pulse-glow [animation-delay:1s]" />
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-6 py-4">
                <Logo />
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
                    Privacy Policy
                </h1>
                <p className="mb-10 text-sm text-muted-foreground">
                    Last updated: March 1, 2026
                </p>

                <div className="glass-card rounded-xl p-8 space-y-8 text-sm leading-relaxed text-muted-foreground">

                    <section className="mb-8">
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            1. Data Collection &amp; Storage
                        </h2>
                        <p>
                            When you create a <Link href="/temporary-email" className="text-primary hover:underline">temporary email</Link> (or <Link href="/tempmail" className="text-primary hover:underline">tempmail</Link>) address using our <Link href="/email-generator" className="text-primary hover:underline">email generator</Link> or <Link href="/temp-mail-generator" className="text-primary hover:underline">temp mail generator</Link>, we store the address itself and any emails received by it, such as a <Link href="/email-for-verification" className="text-primary hover:underline">verification email</Link> or <Link href="/email-for-otp" className="text-primary hover:underline">email for OTP</Link>. Whether you use it as a <Link href="/disposable-inbox" className="text-primary hover:underline">disposable inbox</Link> or a secure <Link href="/temporary-inbox" className="text-primary hover:underline">temporary inbox</Link>, we do not collect any personal information about you to protect your primary email identity (e.g., IP address, browser details).
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            2. Data Deletion
                        </h2>
                        <p>
                            All <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link> and <Link href="/disposable-mail" className="text-primary hover:underline">disposable email</Link> addresses and their associated emails are automatically and permanently deleted after 10 minutes (acting like a secure <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>). There is no way to recover them once deleted, ensuring a true <Link href="/burner-email" className="text-primary hover:underline">burner email</Link> experience.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            3. Data Security
                        </h2>
                        <p>
                            We implement standard security measures to protect the data we store. However, as with any online service, we cannot guarantee absolute security. Please do not use Temp1Mail for sensitive or confidential communications.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            4. Cookies &amp; Analytics
                        </h2>
                        <p>
                            We use Google Analytics to understand how visitors interact with the site (page views, session duration). No personally identifiable information is collected through analytics. We do not use advertising cookies.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            5. Third-Party Services
                        </h2>
                        <p>
                            We use Mailgun for email routing. Emails received by Mailgun are forwarded to our servers and stored temporarily. Mailgun&apos;s own privacy policy applies to their handling of messages in transit.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            6. Changes to This Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised &ldquo;Last updated&rdquo; date.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            7. Contact
                        </h2>
                        <p>
                            If you have questions about this Privacy Policy, please reach out via our{" "}
                            <Link href="/contact" className="text-primary hover:underline">
                                Contact page
                            </Link>
                            .
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div >
    );
}
