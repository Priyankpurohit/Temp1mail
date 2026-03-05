import { Metadata } from "next";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: "Terms of Service - Temp1Mail",
    description: "Read the Terms of Service for Temp1Mail, a free disposable temporary email service. Learn about usage guidelines, limitations, and your responsibilities.",
};

export default function TermsPage() {
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
                    <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                        Terms of Service
                    </h1>
                    <p className="mb-8 text-sm text-muted-foreground">
                        Last updated: March 5, 2026
                    </p>

                    <div className="space-y-6 text-muted-foreground leading-relaxed">

                        <section>
                            <h2 className="mb-2 text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
                            <p>
                                By using Temp1Mail, you agree to these Terms of Service. If you do not agree,
                                please do not use our service. We may update these terms at any time without notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-lg font-semibold text-foreground">2. Service Description</h2>
                            <p>
                                Temp1Mail provides free, temporary disposable email addresses. Emails and mailboxes
                                are automatically deleted after 10 minutes. We do not guarantee message delivery,
                                uptime, or availability.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-lg font-semibold text-foreground">3. Prohibited Uses</h2>
                            <p className="mb-2">You may <strong className="text-foreground">not</strong> use Temp1Mail to:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Send spam, phishing emails, or unsolicited messages</li>
                                <li>Engage in any illegal, fraudulent, or harmful activity</li>
                                <li>Harass, threaten, or impersonate others</li>
                                <li>Distribute malware, viruses, or malicious content</li>
                                <li>Violate any applicable local, national, or international law</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-2 text-lg font-semibold text-foreground">4. No Warranty</h2>
                            <p>
                                Temp1Mail is provided <strong className="text-foreground">&quot;as is&quot;</strong> and
                                <strong className="text-foreground"> &quot;as available&quot;</strong> without
                                warranties of any kind. We do not guarantee that the service will be
                                uninterrupted, error-free, or secure. Use it at your own risk.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
                            <p>
                                Temp1Mail and its operators shall not be liable for any direct, indirect,
                                incidental, or consequential damages arising from your use of the service,
                                including but not limited to loss of data or missed communications.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-lg font-semibold text-foreground">6. Privacy</h2>
                            <p>
                                We do not require registration or collect personal information. Temporary
                                mailboxes and their contents are automatically deleted after expiration.
                                For more details, see our{" "}
                                <Link href="/privacy" className="text-primary hover:opacity-80 transition-opacity">
                                    Privacy Policy
                                </Link>.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-lg font-semibold text-foreground">7. Age Requirement</h2>
                            <p>
                                You must be at least 13 years old to use Temp1Mail. By using the service,
                                you confirm that you meet this age requirement.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-lg font-semibold text-foreground">8. Changes to Service</h2>
                            <p>
                                We reserve the right to modify, suspend, or discontinue Temp1Mail at any
                                time, with or without notice. We are not obligated to maintain or support
                                the service indefinitely.
                            </p>
                        </section>

                        <div className="pt-4 border-t border-border">
                            <p className="text-sm">
                                If you have questions about these terms, please{" "}
                                <Link href="/contact" className="text-primary hover:opacity-80 transition-opacity">
                                    contact us
                                </Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
