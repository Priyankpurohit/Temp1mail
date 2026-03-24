import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function FakeEmailGeneratorPage() {
    return (
        <LandingPageTemplate
            heading="Free Fake Email"
            subheading="Alias • Bypassing • Protected"
            intro="Generate a fake email address instantly. No real info, no spam. Your alias inbox clears after 10 minutes."
            features={[
                { icon: "UserX", title: "Alias Creation", desc: "Act as a completely different user instantly." },
                { icon: "Clock", title: "Rapid Testing", desc: "QA testers love the speed of our inbox delivery." },
                { icon: "Shield", title: "Inbox Defense", desc: "Never give marketers your true contact info." }
            ]}
            faqs={[
                { 
                    question: "Is a fake email illegal?", 
                    answer: <>Using a temporary alias to avoid spam is perfectly legal and encouraged for privacy. It is synonymous with an <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.</>, 
                    schemaAnswer: "Using a temporary alias to avoid spam is perfectly legal and encouraged for privacy. It is synonymous with an anonymous email." 
                },
                { 
                    question: "Will websites know it is fake?", 
                    answer: <>It functions exactly like a real inbox, successfully receiving confirmation links. If you want a random string, check out <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.</>, 
                    schemaAnswer: "It functions exactly like a real inbox, successfully receiving confirmation links. If you want a random string, check out random mail." 
                },
                { 
                    question: "Can I use this for social media accounts?", 
                    answer: <>Yes, but remember you will lose access to password resets. For quick signups, a <Link href="/burner-email" className="text-primary hover:underline">burner email</Link> works great.</>, 
                    schemaAnswer: "Yes, but remember you will lose access to password resets. For quick signups, a burner email works great." 
                },
                { 
                    question: "Are fake emails free?", 
                    answer: <>Yes, completely free. You can also visit our <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> portal.</>, 
                    schemaAnswer: "Yes, completely free. You can also visit our free mail portal." 
                },
                { 
                    question: "How fast do emails arrive?", 
                    answer: <>Typically within 1-2 seconds, exactly like our <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.</>, 
                    schemaAnswer: "Typically within 1-2 seconds, exactly like our 10 minute mail." 
                }
            ]}
            ctaText="Generate Fake Mail"
        />
    );
}
