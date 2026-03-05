import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
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
                    Privacy Policy
                </h1>
                <p className="mb-10 text-sm text-muted-foreground">
                    Last updated: March 1, 2026
                </p>

                <div className="glass-card rounded-xl p-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
                    <section>
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            1. Information We Collect
                        </h2>
                        <p>
                            Temp1Mail is designed to be privacy-first. We do <strong className="text-foreground">not</strong> require any personal information to use our service. No registration, no name, no phone number.
                        </p>
                        <p className="mt-2">
                            Temporary mailboxes are created on-the-fly and are automatically destroyed after 10 minutes along with all received emails.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            2. How We Use Data
                        </h2>
                        <p>
                            Any email received by a temporary mailbox is stored solely for the purpose of displaying it to the mailbox holder. We do not read, analyze, sell, or share email content with third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            3. Data Retention
                        </h2>
                        <p>
                            All mailbox data (including email addresses, messages, and attachments) is permanently deleted after the mailbox expires (10 minutes from creation). We do not maintain backups of expired mailboxes.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            4. Cookies &amp; Analytics
                        </h2>
                        <p>
                            We use Google Analytics to understand how visitors interact with the site (page views, session duration). No personally identifiable information is collected through analytics. We do not use advertising cookies.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            5. Third-Party Services
                        </h2>
                        <p>
                            We use Mailgun for email routing. Emails received by Mailgun are forwarded to our servers and stored temporarily. Mailgun&apos;s own privacy policy applies to their handling of messages in transit.
                        </p>
                    </section>

                    <section>
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
        </div>
    );
}
