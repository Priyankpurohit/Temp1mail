"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowLeft, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (sending) return;

        setSending(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                const data = await res.json();
                toast({
                    title: "Failed to send",
                    description: data.error || "Something went wrong. Please try again.",
                });
            }
        } catch {
            toast({
                title: "Network error",
                description: "Could not send message. Please check your connection.",
            });
        } finally {
            setSending(false);
        }
    };

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
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Mail className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold text-foreground">Temp1Mail</span>
                    </Link>
                </div>
                <ThemeToggle />
            </header>

            {/* Content */}
            <main className="relative z-10 mx-auto max-w-xl px-6 pt-8 pb-24">
                <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                    Contact Us
                </h1>
                <p className="mb-10 text-muted-foreground">
                    Have a question, suggestion, or found a bug? Drop us a message.
                </p>

                {submitted ? (
                    <div className="glass-card rounded-xl p-10 text-center">
                        <Mail className="mx-auto mb-4 h-10 w-10 text-primary" />
                        <h2 className="mb-2 text-xl font-semibold text-foreground">
                            Message Sent!
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Thanks for reaching out. We&apos;ll get back to you as soon as possible.
                        </p>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="glass-card rounded-xl p-8 space-y-5"
                    >
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1.5 block text-sm font-medium text-foreground"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-sm font-medium text-foreground"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="mb-1.5 block text-sm font-medium text-foreground"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="How can we help?"
                                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={sending}
                            className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-base py-5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
                            size="lg"
                        >
                            {sending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Message
                                </>
                            )}
                        </Button>
                    </form>
                )}
            </main>

            <Footer />
        </div>
    );
}
