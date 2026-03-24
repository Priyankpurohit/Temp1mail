import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function CustomTempMailPage() {
    return (
        <LandingPageTemplate
            heading="Custom Temp Mail"
            subheading="Personalized • Flexible • Private"
            intro="Build a custom mail address instantly. No forms, no limits. Your personalized inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Sparkles", title: "Personalized", desc: "Type any name to create your ideal inbox." },
                { icon: "Shield", title: "Filter Bypass", desc: "Custom terms look more credible to strict websites." },
                { icon: "Lock", title: "Still Private", desc: "Even with a custom name, your identity is hidden." }
            ]}
            faqs={[
                { 
                    question: "How do I pick a custom prefix?", 
                    answer: <>Just type your desired name into the box, and if it is available, it is yours. If you do not care about the name, try a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.</>, 
                    schemaAnswer: "Just type your desired name into the box, and if it is available, it is yours. If you do not care about the name, try a random mail." 
                },
                { 
                    question: "Are custom emails more secure?", 
                    answer: <>They offer exactly the same high-level encryption as our <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.</>, 
                    schemaAnswer: "They offer exactly the same high-level encryption as our anonymous email." 
                },
                { 
                    question: "Can someone else guess my custom inbox?", 
                    answer: <>If you pick something common like "admin", possibly. We recommend unique strings, or just using a <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>.</>, 
                    schemaAnswer: "If you pick something common like \"admin\", possibly. We recommend unique strings, or just using a burner email." 
                },
                { 
                    question: "Does this cost money?", 
                    answer: <>No, customizing your prefix is as free as our standard <Link href="/free-mail" className="text-primary hover:underline">free mail</Link>.</>, 
                    schemaAnswer: "No, customizing your prefix is as free as our standard free mail." 
                },
                { 
                    question: "How long does my custom name last?", 
                    answer: <>The same 10-minute lifespan applies to keep the system fast, just like a <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.</>, 
                    schemaAnswer: "The same 10-minute lifespan applies to keep the system fast, just like a 10 minute mail." 
                }
            ]}
            ctaText="Choose Custom Prefix"
        />
    );
}
