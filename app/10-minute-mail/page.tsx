import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function TenMinuteMailPage() {
    return (
        <LandingPageTemplate
            heading="Free 10 Minute Mail"
            subheading="Fast • Ephemeral • Secure"
            intro="Start a 10 minute mail instantly. No signups, no delays. Your temporary inbox self-destructs after 10 minutes."
            features={[
                { icon: "Clock", title: "10-Min Timer", desc: "Inbox automatically vaporizes after 600 seconds." },
                { icon: "Mail", title: "Instant Receiving", desc: "Emails appear the second they hit our servers." },
                { icon: "Globe", title: "Universal Access", desc: "Works seamlessly across all modern browsers." }
            ]}
            faqs={[
                { 
                    question: "Why exactly 10 minutes?", 
                    answer: <>Ten minutes is the optimal time for a verification email to arrive while still ensuring the inbox does not linger. If you want total unpredictability, use a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.</>, 
                    schemaAnswer: "Ten minutes is the optimal time for a verification email to arrive while still ensuring the inbox does not linger. If you want total unpredictability, use a random mail." 
                },
                { 
                    question: "Can I extend the timer?", 
                    answer: <>Currently, the timer is fixed to ensure high turnover and security, similar to a <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link>.</>, 
                    schemaAnswer: "Currently, the timer is fixed to ensure high turnover and security, similar to a temporary mail." 
                },
                { 
                    question: "What happens to the emails after 10 minutes?", 
                    answer: <>They are permanently wiped from our physical servers. Just like our <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>, we leave no trace.</>, 
                    schemaAnswer: "They are permanently wiped from our physical servers. Just like our anonymous email, we leave no trace." 
                },
                { 
                    question: "Does it autorefresh?", 
                    answer: <>Yes, the inbox automatically checks for new messages. You can also try our <Link href="/tempemail" className="text-primary hover:underline">temp email</Link> for an alternative view.</>, 
                    schemaAnswer: "Yes, the inbox automatically checks for new messages. You can also try our temp email for an alternative view." 
                },
                { 
                    question: "Is it completely free?", 
                    answer: <>Yes, 100% free with no catches. You might also like our <Link href="/temp-mail-free" className="text-primary hover:underline">temp mail free</Link> option.</>, 
                    schemaAnswer: "Yes, 100% free with no catches. You might also like our temp mail free option." 
                }
            ]}
            ctaText="Start 10 Minute Timer"
        />
    );
}
