import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function FreeTempMailPage() {
    return (
        <LandingPageTemplate
            heading="Free Temp Mail"
            subheading="Cost-free • Unlimited • Secure"
            intro="Access your free mail address instantly. No payments, no spam. Your cost-free inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Sparkles", title: "100% Free", desc: "No paywalls, no premium tiers, no credit cards." },
                { icon: "Globe", title: "Unlimited Uses", desc: "Generate as many addresses as you desire." },
                { icon: "Lock", title: "Enterprise Security", desc: "Top-tier encryption provided completely free of charge." }
            ]}
            faqs={[
                { 
                    question: "How is this service completely free?", 
                    answer: <>We believe privacy is a human right, so we subsidize costs through minimal, unobtrusive ads. It is similar to our <Link href="/temp-mail-free" className="text-primary hover:underline">temp mail free</Link> offering.</>, 
                    schemaAnswer: "We believe privacy is a human right, so we subsidize costs through minimal, unobtrusive ads. It is similar to our temp mail free offering." 
                },
                { 
                    question: "Are there hidden limits?", 
                    answer: <>No hidden caps. Generate away! For a more specialized tool, try the <Link href="/temp-mail-generator" className="text-primary hover:underline">temp mail generator</Link>.</>, 
                    schemaAnswer: "No hidden caps. Generate away! For a more specialized tool, try the temp mail generator." 
                },
                { 
                    question: "Is free mail secure?", 
                    answer: <>We use the same robust security as paid tools, heavily inspired by <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link> standards.</>, 
                    schemaAnswer: "We use the same robust security as paid tools, heavily inspired by anonymous email standards." 
                },
                { 
                    question: "Do I get a custom domain?", 
                    answer: <>We cycle multiple domains to ensure deliverability. You can pick your prefix using <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>.</>, 
                    schemaAnswer: "We cycle multiple domains to ensure deliverability. You can pick your prefix using custom mail." 
                },
                { 
                    question: "Can I use this on my phone?", 
                    answer: <>Yes, our interface is perfectly responsive for mobile, just like a <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link>.</>, 
                    schemaAnswer: "Yes, our interface is perfectly responsive for mobile, just like a disposable mail." 
                }
            ]}
            ctaText="Get Free Mail"
        />
    );
}
