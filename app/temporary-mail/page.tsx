import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function TemporaryMailInboxPage() {
    return (
        <LandingPageTemplate
            heading="Free Temporary Mail"
            subheading="Fast • Temporary • Secure"
            intro="Create a temporary mail address instantly. No subscriptions, no spam. Your clean inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Clock", title: "Time-Limited", desc: "Ensures no lingering digital footprints exist." },
                { icon: "Mail", title: "Flawless Parsing", desc: "Renders HTML emails beautifully and securely." },
                { icon: "UserX", title: "No Strings Attached", desc: "Leave whenever you want without deregistering." }
            ]}
            faqs={[
                { 
                    question: "Is temporary mail different from temporary email?", 
                    answer: <>They are exactly identical in function, just different phrasing! You can also refer to it as a <Link href="/temp-email" className="text-primary hover:underline">temp email</Link>.</>, 
                    schemaAnswer: "They are exactly identical in function, just different phrasing! You can also refer to it as a temp email." 
                },
                { 
                    question: "Will I get spam here?", 
                    answer: <>You will receive the spam intended for your real inbox, and then it gets deleted! That is the beauty of a <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link>.</>, 
                    schemaAnswer: "You will receive the spam intended for your real inbox, and then it gets deleted! That is the beauty of a disposable mail." 
                },
                { 
                    question: "How do I generate one?", 
                    answer: <>Click the button above. For a specific name, use our <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>.</>, 
                    schemaAnswer: "Click the button above. For a specific name, use our custom mail." 
                },
                { 
                    question: "Can I keep it forever?", 
                    answer: <>No, these addresses are inherently temporary, much like a <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.</>, 
                    schemaAnswer: "No, these addresses are inherently temporary, much like a 10 minute mail." 
                },
                { 
                    question: "Who runs this service?", 
                    answer: <>Privacy advocates who believe in <Link href="/temp-mail-free" className="text-primary hover:underline">free temp mail</Link> for everyone.</>, 
                    schemaAnswer: "Privacy advocates who believe in free temp mail for everyone." 
                }
            ]}
            ctaText="Open Temporary Mail"
        />
    );
}
