import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function TemporaryInboxPage() {
    return (
        <LandingPageTemplate
            heading="Free Temporary Inbox"
            subheading="Fast • Ephemeral • Secure"
            intro="Access a temporary inbox instantly. No tracking, no spam. Your secure mailbox vaporizes after 10 minutes."
            features={[
                { icon: "Clock", title: "Strict Autodelete", desc: "Self-cleans automatically after exactly ten minutes." },
                { icon: "Eye", title: "Spam Isolation", desc: "Keep aggressive marketers trapped in a sandbox." },
                { icon: "Zap", title: "Lighting Deliveries", desc: "Built for speed because waiting is annoying." }
            ]}
            faqs={[
                { 
                    question: "Why do I need a temporary inbox?", 
                    answer: <>To bypass mandatory signups without risking spam. Use it just like a standard <Link href="/temporary-email" className="text-primary hover:underline">temporary email</Link>.</>, 
                    schemaAnswer: "To bypass mandatory signups without risking spam. Use it just like a standard temporary email." 
                },
                { 
                    question: "Are there hidden limits?", 
                    answer: <>No hidden caps. Generate away! Check out our <Link href="/temp-mail-free" className="text-primary hover:underline">temp mail free</Link> offering.</>, 
                    schemaAnswer: "No hidden caps. Generate away! Check out our temp mail free offering." 
                },
                { 
                    question: "Does this cost anything?", 
                    answer: <>It is completely 100% free of charge. See our <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> features.</>, 
                    schemaAnswer: "It is completely 100% free of charge. See our free mail features." 
                },
                { 
                    question: "Can I use a custom name?", 
                    answer: <>You can edit the prefix before you hit generate, utilizing our <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link> functionality.</>, 
                    schemaAnswer: "You can edit the prefix before you hit generate, utilizing our custom mail functionality." 
                },
                { 
                    question: "What happens to the emails?", 
                    answer: <>They are permanently wiped from the server. Similar to how our <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link> operates.</>, 
                    schemaAnswer: "They are permanently wiped from the server. Similar to how our anonymous email operates." 
                }
            ]}
            ctaText="Create Temporary Inbox"
        />
    );
}
