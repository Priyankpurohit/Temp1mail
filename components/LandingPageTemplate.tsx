import { Logo } from "@/components/Logo";
import Link from "next/link";
import { Mail, Zap, Shield, Clock, Eye, UserX, Lock, Globe, Trash2, Sparkles, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { EmailGeneratorCard } from "@/components/EmailGeneratorCard";
import type { LucideIcon } from "lucide-react";

/* ── Icon lookup (server components can't pass components as props) ── */
const ICON_MAP: Record<string, LucideIcon> = {
    Zap, Shield, Clock, Eye, UserX, Lock, Globe, Trash2, Sparkles, Mail,
};

/* ── Types ── */
export interface LandingFeature {
    icon: string;      // key into ICON_MAP
    title: string;
    desc: string;
}

import { ReactNode } from "react";

export interface LandingFAQ {
    question: string;
    answer: ReactNode;
}

export interface LandingPageProps {
    /** Keyword-optimized heading (rendered as <h1>) */
    heading: string;
    /** Gradient sub-heading line */
    subheading: string;
    /** 2-4 sentence intro paragraph */
    intro: string;
    /** 3 feature cards */
    features: LandingFeature[];
    /** 2-3 unique FAQs */
    faqs: LandingFAQ[];
    /** CTA button text */
    ctaText?: string;
    /** Optional second CTA for random mail */
    secondaryCta?: { text: string; href: string };
    /** Optional mode to start in: custom or random */
    defaultMode?: "custom" | "random";
}

/* ── FAQ Accordion (client island via details/summary — no JS needed) ── */
function FAQItem({ question, answer }: LandingFAQ) {
    return (
        <details className="glass-card rounded-xl group">
            <summary className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left list-none [&::-webkit-details-marker]:hidden">
                <span className="font-medium text-foreground text-sm md:text-base">{question}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-2 transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{answer}</p>
        </details>
    );
}

/* ── Main Template ── */
export function LandingPageTemplate({
    heading,
    subheading,
    intro,
    features,
    faqs,
    ctaText = "Generate Temp Mail — Free",
    secondaryCta,
    defaultMode = "custom",
}: LandingPageProps) {
    return (
        <div className="relative min-h-screen flex flex-col overflow-hidden bg-background">
            {/* FAQ Schema Injector */}
            {faqs.some(f => f.schemaAnswer) && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: faqs.map((f) => ({
                                "@type": "Question",
                                name: f.question,
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: f.schemaAnswer || "",
                                },
                            })),
                        }),
                    }}
                />
            )}
            {/* Animated gradient background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
                <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-primary-glow/10 blur-[120px] animate-pulse-glow [animation-delay:1s]" />
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-6 py-4">
                <Logo />
                <ThemeToggle />
            </header>

            {/* Hero */}
            <main className="relative z-10 flex flex-col items-center px-6 pt-6 pb-0 md:pt-12">
                <div className="text-center w-full">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
                        {heading}
                        <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent leading-normal pb-1">
                            {subheading}
                        </span>
                    </h1>
                    <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">
                        {intro}
                    </p>

                    {/* Card */}
                    <EmailGeneratorCard ctaText={ctaText} defaultMode={defaultMode} />
                </div>

                {/* Features */}
                <div className="grid gap-6 md:grid-cols-3 max-w-3xl w-full">
                    {features.map((f) => {
                        const IconComponent = ICON_MAP[f.icon] || Zap;
                        return (
                            <div key={f.title} className="glass-card rounded-xl p-6 text-center">
                                <IconComponent className="mx-auto mb-3 h-8 w-8 text-primary" />
                                <h3 className="mb-1 font-semibold text-foreground">{f.title}</h3>
                                <p className="text-sm text-muted-foreground">{f.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* FAQs */}
                <div className="mt-16 w-full max-w-3xl">
                    <h2 className="mb-6 text-center text-2xl font-bold text-foreground md:text-3xl">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                        {faqs.map((faq) => (
                            <FAQItem key={faq.question} {...faq} />
                        ))}
                    </div>
                </div>



            </main>

            <Footer />
        </div>
    );
}
