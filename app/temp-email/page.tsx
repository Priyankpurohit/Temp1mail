import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function TemporaryEmailPage() {
    return (
        <LandingPageTemplate
            heading="Free Temp Email"
            subheading="Temporary • Clean • Private"
            intro="Grab a temp email address instantly. No registration, no spam. Your temporary inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Shield", title: "Block Spam", desc: "Keep promotional junk out of your personal life." },
                { icon: "Clock", title: "Auto-Expiring", desc: "Addresses vanish gracefully after their brief lifespan." },
                { icon: "Zap", title: "No Delays", desc: "We pride ourselves on split-second email delivery." }
            ]}
            faqs={[
                { 
                    question: "What is a temporary email?", 
                    answer: <>It is a transitional mailbox that exists only long enough to serve an immediate need, otherwise known as a <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link>.</>, 
                    schemaAnswer: "It is a transitional mailbox that exists only long enough to serve an immediate need, otherwise known as a temporary mail." 
                },
                { 
                    question: "Why should I not use my Gmail?", 
                    answer: <>Using real emails invites data brokers to profile you. Using this is much safer, like an <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.</>, 
                    schemaAnswer: "Using real emails invites data brokers to profile you. Using this is much safer, like an anonymous email." 
                },
                { 
                    question: "How do I check my messages?", 
                    answer: <>They appear automatically on your screen. You can also view them via our <Link href="/tempemail" className="text-primary hover:underline">temp email</Link> variant page.</>, 
                    schemaAnswer: "They appear automatically on your screen. You can also view them via our temp email variant page." 
                },
                { 
                    question: "Is there a cost involved?", 
                    answer: <>No, this is absolutely free. For more details, see our <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> feature.</>, 
                    schemaAnswer: "No, this is absolutely free. For more details, see our free mail feature." 
                },
                { 
                    question: "Can I do a custom name?", 
                    answer: <>Yes, you can edit the prefix before hitting generate, which is our <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link> functionality.</>, 
                    schemaAnswer: "Yes, you can edit the prefix before hitting generate, which is our custom mail functionality." 
                }
            ]}
            ctaText="Create Temp Email"
        />
    );
}
