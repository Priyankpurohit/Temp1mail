import { Logo } from "@/components/Logo";
import { Metadata } from "next";
import Link from "next/link";
import { Mail, ArrowLeft, Zap } from "lucide-react";
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
                    <Logo />
                </div>
                <ThemeToggle />
            </header>

            {/* Content */}
            <main className="relative z-10 mx-auto max-w-3xl px-6 py-10 pb-24">
                <div className="glass-card rounded-2xl p-8 md:p-10">
                    <h1 className="mb-6 flex items-center flex-wrap gap-2 text-xl font-bold text-foreground">
                        About
                        <span className="flex items-center text-foreground">
                            Temp
                            <Zap className="h-[2em] w-[1.2em] -mx-1 text-primary fill-primary scale-x-50 rotate-12" />
                            Mail
                        </span>
                    </h1>

                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            <strong className="text-foreground">Temp1Mail</strong> is a <Link href="/free-mail" className="text-primary hover:underline">free temporary email</Link> service
                            designed to help you protect your online privacy and keep your
                            primary inbox free from spam and unwanted solicitations. You can also use it as a <Link href="/temp-mail-generator" className="text-primary hover:underline">temp mail generator</Link>.
                        </p>
                        <p>
                            In today's digital world, your email address is often required for
                            everything from signing up for new services to accessing free
                            content. However, using your primary email for every online
                            interaction can lead to a deluge of spam, unwanted marketing
                            emails, and even potential security risks. Using a <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link> or <Link href="/burner-email" className="text-primary hover:underline">burner email</Link> is where Temp1Mail comes in.
                        </p>
                        <p>
                            We provide instant, <Link href="/disposable-mail" className="text-primary hover:underline">disposable email</Link> addresses that protect your
                            privacy and keep your main inbox clean. Our service is completely
                            free, requires no registration, and allows you to receive emails
                            using an <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link> for a short period (acting like a <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>) before they are automatically
                            deleted.
                        </p>
                        <p>
                            Whether you're testing a new service, signing up for a one-time
                            offer, or simply want to avoid giving out your real email,
                            Temp1Mail offers a quick and secure <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link> solution. You can use it as a <Link href="/disposable-inbox" className="text-primary hover:underline">disposable inbox</Link> or to get an <Link href="/email-for-otp" className="text-primary hover:underline">email for OTP</Link> verification. It's the perfect <Link href="/email-generator" className="text-primary hover:underline">email generator</Link> for receiving a quick <Link href="/email-for-verification" className="text-primary hover:underline">verification email</Link>.
                        </p>
                    </div>

                    <h2 className="mb-1 mt-14 text-xl font-bold text-foreground">
                        How Temp1Mail Works
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            Using Temp1Mail is incredibly simple. When you visit our homepage,
                            a unique, <Link href="/temp-email" className="text-primary hover:underline">temp email</Link> address is instantly generated for you.
                            You can copy this address and use it wherever you need a <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link>.
                        </p>
                        <p>
                            Any emails sent to your <Link href="/random-mail" className="text-primary hover:underline">random mail</Link> address will appear in your
                            inbox on our website in real-time. You can view the content of
                            these emails, including attachments (though we recommend caution
                            with unknown attachments).
                        </p>
                        <p>
                            Each <Link href="/temporary-email" className="text-primary hover:underline">temporary email</Link> address (or <Link href="/tempmail" className="text-primary hover:underline">tempmail</Link>) acts as a secure <Link href="/temporary-inbox" className="text-primary hover:underline">temporary inbox</Link> with a limited lifespan, typically a few hours, after which it and all associated emails are permanently deleted from our servers. This ensures your privacy and keeps our system efficient.
                        </p>
                    </div>

                    <h2 className="mb-1 mt-14 text-xl font-bold text-foreground">
                        Our Mission
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            Our mission at Temp1Mail is to empower internet users with a simple
                            yet powerful tool to protect their online privacy. We believe that
                            everyone should have the right to control their personal
                            information and avoid unsolicited communications.
                        </p>
                        <p>
                            We are committed to providing a reliable, fast, and user-friendly
                            service that helps you navigate the digital world with greater
                            peace of mind.
                        </p>
                    </div>

                    <h2 className="mb-1 mt-14 text-xl font-bold text-foreground">
                        Contact Us
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            If you have any questions, feedback, or suggestions, please don't
                            hesitate to reach out to us.
                        </p>
                        <p className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-primary" />
                            <span>
                                Email:{" "}
                                <a
                                    href="mailto:support@temp1mail.com"
                                    className="text-primary hover:underline"
                                >
                                    support@temp1mail.com
                                </a>
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-primary" />
                            <span>
                                For quick support, you can also use our{" "}
                                <Link href="/contact" className="text-primary hover:underline">
                                    contact form
                                </Link>
                                .
                            </span>
                        </p>

                        <div className="pt-6">
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
        </div >
    );
}
