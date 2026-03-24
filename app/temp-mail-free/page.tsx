import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function FreeTempMailPage() {
    return (
        <LandingPageTemplate
            heading="Free Temp Mail"
            subheading="Free • Temporary • Secure"
            intro="Open your free temp mail instantly. No charges, no spam. Your protected inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Sparkles", title: "Zero Fees", desc: "Always free, never any surprise charges." },
                { icon: "Lock", title: "Secure Environment", desc: "Your temporary sessions are protected by TLS." },
                { icon: "Trash2", title: "Self-Cleaning", desc: "We do the cleanup so you do not have to." }
            ]}
            faqs={[
                { 
                    question: "How does this differ from regular temporary mail?", 
                    answer: <>It emphasizes our commitment to remaining an unpaid service, distinct from premium-only competitors. It is a sibling to our <Link href="/free-mail" className="text-primary hover:underline">free mail</Link>.</>, 
                    schemaAnswer: "It emphasizes our commitment to remaining an unpaid service, distinct from premium-only competitors. It is a sibling to our free mail." 
                },
                { 
                    question: "Are my emails read by administrators?", 
                    answer: <>No, our system is automated and wipes data automatically. It is a true <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.</>, 
                    schemaAnswer: "No, our system is automated and wipes data automatically. It is a true anonymous email." 
                },
                { 
                    question: "Can I use this for software trials?", 
                    answer: <>Perfectly suited for it! Software trials are the primary use case for a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>.</>, 
                    schemaAnswer: "Perfectly suited for it! Software trials are the primary use case for a fake mail." 
                },
                { 
                    question: "What happens to attachments?", 
                    answer: <>Attachments are safely processed and subsequently deleted just like the text. Works seamlessly like our <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link>.</>, 
                    schemaAnswer: "Attachments are safely processed and subsequently deleted just like the text. Works seamlessly like our disposable mail." 
                },
                { 
                    question: "Is it mobile friendly?", 
                    answer: <>Absolutely, the UI scales down perfectly, much like using a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link> on your phone.</>, 
                    schemaAnswer: "Absolutely, the UI scales down perfectly, much like using a random mail on your phone." 
                }
            ]}
            ctaText="Access Free Inbox"
        />
    );
}
