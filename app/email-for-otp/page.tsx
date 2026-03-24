import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function EmailForOtpPage() {
    return (
        <LandingPageTemplate
            heading="Email For OTP"
            subheading="Codes • Speed • Access"
            intro="Receive an email for OTP instantly. No delays, no spam. Your code catcher self-destructs after 10 minutes."
            features={[
                { icon: "Zap", title: "Split-Second OTP", desc: "View 6-digit codes the moment they are sent." },
                { icon: "Eye", title: "Inbox UI", desc: "Zero distractions, just the verification codes you need." },
                { icon: "Trash2", title: "Auto Shred", desc: "Your codes are wiped securely so you stay safe." }
            ]}
            faqs={[
                { 
                    question: "What does OTP stand for?", 
                    answer: <>One Time Password. It is used to quickly confirm access. Useful if testing via a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>.</>, 
                    schemaAnswer: "One Time Password. It is used to quickly confirm access. Useful if testing via a fake mail." 
                },
                { 
                    question: "Can I use this instead of SMS?", 
                    answer: <>If the website offers an email OTP option, absolutely! Works like a fast <Link href="/temp-email" className="text-primary hover:underline">temp email</Link>.</>, 
                    schemaAnswer: "If the website offers an email OTP option, absolutely! Works like a fast temp email." 
                },
                { 
                    question: "Is it safe to get OTPs here?", 
                    answer: <>Since the inbox deletes itself, nobody else will ever see it. A true <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link>.</>, 
                    schemaAnswer: "Since the inbox deletes itself, nobody else will ever see it. A true temporary mail." 
                },
                { 
                    question: "Can I access this on mobile?", 
                    answer: <>Yes, our modern UI handles OTP catching perfectly on phones. Similar to the <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link> design.</>, 
                    schemaAnswer: "Yes, our modern UI handles OTP catching perfectly on phones. Similar to the disposable mail design." 
                },
                { 
                    question: "What if the code takes 15 minutes?", 
                    answer: <>The lifespan is 10 min, so use this for instant sending services like the <Link href="/temp-mail-generator" className="text-primary hover:underline">temp mail generator</Link>.</>, 
                    schemaAnswer: "The lifespan is 10 min, so use this for instant sending services like the temp mail generator." 
                }
            ]}
            ctaText="Catch OTP Instantly"
        />
    );
}
