import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function TempMailGeneratorPage() {
    return (
        <LandingPageTemplate
            heading="Temp Mail Generator"
            subheading="Dynamic • Fast • Disposable"
            intro="Use the temp mail generator instantly. No limits, no spam. Your generated inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Sparkles", title: "Powerful Engine", desc: "Generate high-quality addresses that bypass blocks." },
                { icon: "Eye", title: "Live Inbox", desc: "Watch your verification codes arrive in real-time." },
                { icon: "Globe", title: "Dynamic Domains", desc: "We rotate domains to keep the generator effective." }
            ]}
            faqs={[
                { 
                    question: "How does the generator work?", 
                    answer: <>It dynamically assigns an alias on our mail servers routing to your active browser session. If you want to dive in, use the <Link href="/tempemail" className="text-primary hover:underline">temp email</Link> page.</>, 
                    schemaAnswer: "It dynamically assigns an alias on our mail servers routing to your active browser session. If you want to dive in, use the temp email page." 
                },
                { 
                    question: "Can I customize the generated mail?", 
                    answer: <>Yes! Our generator supports custom prefixes. Explore the <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link> feature.</>, 
                    schemaAnswer: "Yes! Our generator supports custom prefixes. Explore the custom mail feature." 
                },
                { 
                    question: "Are generated emails truly anonymous?", 
                    answer: <>They are routed without retaining personal identifiers, making them an excellent <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.</>, 
                    schemaAnswer: "They are routed without retaining personal identifiers, making them an excellent anonymous email." 
                },
                { 
                    question: "What happens if I generate too many?", 
                    answer: <>There are no strict limits for fair personal use. It acts as a totally <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> tool.</>, 
                    schemaAnswer: "There are no strict limits for fair personal use. It acts as a totally free mail tool." 
                },
                { 
                    question: "Why not just use a burner?", 
                    answer: <>They are functionally the same! Our generator is how you create your <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>.</>, 
                    schemaAnswer: "They are functionally the same! Our generator is how you create your burner email." 
                }
            ]}
            ctaText="Launch Generator"
        />
    );
}
