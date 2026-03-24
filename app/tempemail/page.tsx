import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function TempEmailGeneratorPage() {
    return (
        <LandingPageTemplate
            heading="Free TempEmail Inbox"
            subheading="Instant • Programmatic • Clean"
            intro="Deploy a fast TempEmail address instantly. No fuss, no spam. Your dynamic inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Zap", title: "High Performance", desc: "Optimized routing for immediate message receipt." },
                { icon: "Eye", title: "No Distractions", desc: "A clean UI focused purely on your incoming messages." },
                { icon: "Globe", title: "Global Edge Routing", desc: "Ensures your emails traverse the web fastest." }
            ]}
            faqs={[
                { 
                    question: "Why choose TempEmail?", 
                    answer: <>This is the fastest path to a fresh inbox, catered to users who want no fluff. If you prefer a distinct name, explore <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>.</>, 
                    schemaAnswer: "This is the fastest path to a fresh inbox, catered to users who want no fluff. If you prefer a distinct name, explore custom mail." 
                },
                { 
                    question: "Is this the same as 10-minute mail?", 
                    answer: <>Yes, the underlying engine relies on similar timeouts. You can check the <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link> page for specifics.</>, 
                    schemaAnswer: "Yes, the underlying engine relies on similar timeouts. You can check the 10 minute mail page for specifics." 
                },
                { 
                    question: "Can I script against this?", 
                    answer: <>While we do not offer a public API, the UI is hyper-responsive. For testing suites, a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link> works best.</>, 
                    schemaAnswer: "While we do not offer a public API, the UI is hyper-responsive. For testing suites, a fake mail works best." 
                },
                { 
                    question: "How reliable is the domain?", 
                    answer: <>We use high-reputation domains to avoid aggressive spam lists, acting as a high-tier <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>.</>, 
                    schemaAnswer: "We use high-reputation domains to avoid aggressive spam lists, acting as a high-tier burner email." 
                },
                { 
                    question: "Are there any usage limits?", 
                    answer: <>Refresh and generate as often as needed, just like our <Link href="/temporary-email" className="text-primary hover:underline">temporary email</Link>.</>, 
                    schemaAnswer: "Refresh and generate as often as needed, just like our temporary email." 
                }
            ]}
            ctaText="Initialize TempEmail"
        />
    );
}
