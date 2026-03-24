import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function TempMailPage() {
    return (
        <LandingPageTemplate
            heading="Instant Tempmail Inbox"
            subheading="No Signup · Zero Spam · Auto-Delete"
            intro="Instant tempmail with no signup, no spam, and zero registration. Your disposable inbox is ready in one click and auto-deletes in 10 minutes."
            features={[
                {
                    icon: "Zap",
                    title: "Instant Generation",
                    desc: "Your tempmail address is ready the moment you land on the page. No forms, no waiting.",
                },
                {
                    icon: "Shield",
                    title: "Total Privacy",
                    desc: "No real identity required. Use your tempmail for signups, OTPs, and verifications anonymously.",
                },
                {
                    icon: "Trash2",
                    title: "Auto-Delete in 10 Min",
                    desc: "Your inbox and all its emails are automatically wiped after 10 minutes — leaving zero trace.",
                },
            ]}
            faqs={[
                {
                    question: "What is tempmail?",
                    answer: (
                        <>
                            Tempmail (also written as temp mail or temporary email) is a disposable email address that self-destructs after a short period. It lets you sign up for websites, receive OTPs, and verify accounts without exposing your real inbox. Try our{" "}
                            <Link href="/temporary-email" className="text-primary hover:underline">
                                temporary email
                            </Link>{" "}
                            service for a similar experience.
                        </>
                    ),
                    schemaAnswer:
                        "Tempmail is a disposable email address that self-destructs after a short period. It lets you sign up for websites, receive OTPs, and verify accounts without exposing your real inbox.",
                },
                {
                    question: "Is tempmail free to use?",
                    answer: (
                        <>
                            Completely free — no credit card, no account, no strings attached. Generate as many{" "}
                            <Link href="/disposable-mail" className="text-primary hover:underline">
                                disposable mail
                            </Link>{" "}
                            addresses as you need.
                        </>
                    ),
                    schemaAnswer:
                        "Yes, tempmail is completely free. No credit card, no account, no strings attached. Generate as many disposable mail addresses as you need.",
                },
                {
                    question: "How long does my tempmail last?",
                    answer: (
                        <>
                            Each tempmail inbox is active for 10 minutes. Need more time? You can refresh the timer. Check our{" "}
                            <Link href="/10-minute-mail" className="text-primary hover:underline">
                                10 minute mail
                            </Link>{" "}
                            page for full details.
                        </>
                    ),
                    schemaAnswer:
                        "Each tempmail inbox is active for 10 minutes. You can refresh the timer to extend it. See our 10 minute mail page for details.",
                },
                {
                    question: "Can I use tempmail to receive OTPs?",
                    answer: (
                        <>
                            Yes! OTPs and verification codes appear in your tempmail inbox within seconds. We even auto-detect and highlight them. Try our dedicated{" "}
                            <Link href="/email-for-otp" className="text-primary hover:underline">
                                email for OTP
                            </Link>{" "}
                            page for a streamlined experience.
                        </>
                    ),
                    schemaAnswer:
                        "Yes, OTPs and verification codes appear in your tempmail inbox within seconds. The service auto-detects and highlights them for easy copying.",
                },
                {
                    question: "Is tempmail anonymous?",
                    answer: (
                        <>
                            Yes. No personal info is collected when generating a tempmail address. For even more privacy, see our{" "}
                            <Link href="/anonymous-email" className="text-primary hover:underline">
                                anonymous email
                            </Link>{" "}
                            page.
                        </>
                    ),
                    schemaAnswer:
                        "Yes, no personal info is collected when generating a tempmail address. Your inbox is completely anonymous.",
                },
            ]}
            ctaText="Get My Tempmail — Free"
        />
    );
}
