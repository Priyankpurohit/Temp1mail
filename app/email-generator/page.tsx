import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function EmailGeneratorPage() {
    return (
        <LandingPageTemplate
            heading="Free Email Generator"
            subheading="Instant • Unlimited • Secure"
            intro="Get an email generator instantly. No limits, no spam. Your created inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Zap", title: "On-Demand Addresses", desc: "Create new inboxes whenever you need them." },
                { icon: "Globe", title: "Domain Rotation", desc: "We rotate domains to bypass strict blocks." },
                { icon: "Shield", title: "Built to Protect", desc: "Keep your real email address completely hidden." }
            ]}
            faqs={[
                { 
                    question: "What is an email generator?", 
                    answer: <>It is a tool that rapidly creates disposable addresses. Similar to our <Link href="/temp-mail-generator" className="text-primary hover:underline">temp mail generator</Link>.</>, 
                    schemaAnswer: "It is a tool that rapidly creates disposable addresses. Similar to our temp mail generator." 
                },
                { 
                    question: "How many can I generate?", 
                    answer: <>Generate as many as you need to stay safe. It acts as a totally <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> tool.</>, 
                    schemaAnswer: "Generate as many as you need to stay safe. It acts as a totally free mail tool." 
                },
                { 
                    question: "Is it completely anonymous?", 
                    answer: <>Yes! It provides the exact same high-level encryption as our <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.</>, 
                    schemaAnswer: "Yes! It provides the exact same high-level encryption as our anonymous email." 
                },
                { 
                    question: "Will the emails look suspicious?", 
                    answer: <>No, we keep our domains healthy. For customization, see <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>.</>, 
                    schemaAnswer: "No, we keep our domains healthy. For customization, see custom mail." 
                },
                { 
                    question: "How fast do messages arrive?", 
                    answer: <>They typically arrive in under 2 seconds, just like a <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.</>, 
                    schemaAnswer: "They typically arrive in under 2 seconds, just like a 10 minute mail." 
                }
            ]}
            ctaText="Launch Email Generator"
        />
    );
}
