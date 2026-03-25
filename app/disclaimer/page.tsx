import { Logo } from "@/components/Logo";
import Link from "next/link";
import { Mail, ArrowLeft, Zap } from "lucide-react";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Disclaimer - Temp1Mail",
    description:
        "Important legal disclaimers for using the Temp1Mail disposable email service.",
};

export default function DisclaimerPage() {
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
                    Disclaimer
                </h1>
                <p className="mb-10 text-sm text-muted-foreground">
                    Last updated: March 1, 2026
                </p>

                <div className="glass-card rounded-xl p-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
                    <section className="mb-8">
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            Prohibited Use
                        </h2>
                        <p>
                            You may not use Temp1Mail's <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link> or <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link> services for illegal activities, harassment, distribution of malware, phishing, or any purpose that violates applicable laws. We reserve the right to block <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link> addresses or domains used for abuse.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            Limitation of Liability
                        </h2>
                        <p>
                            Temp1Mail and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use this <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> service, including our <Link href="/random-mail" className="text-primary hover:underline">random mail</Link> or <Link href="/temp-email" className="text-primary hover:underline">temp email</Link> addresses. We recommend not using it for important accounts where a primary email is required.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold text-foreground">
                            Changes
                        </h2>
                        <p>
                            We may update this Disclaimer at any time. Continued use of the service after changes constitutes acceptance of the revised terms.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div >
    );
}
