import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function RandomEmailPage() {
    return (
        <LandingPageTemplate
            heading="Free Random Email"
            subheading="Unpredictable • Hidden • Disposable"
            intro="Spin up a random mail instantly. No typing, no spam. Your unpredictable inbox wipes clean after 10 minutes."
            features={[
                { icon: "Zap", title: "One-Click Magic", desc: "No typing needed. Just click and copy." },
                { icon: "Shield", title: "Unguessable", desc: "Complex strings offer natural defense against scrapers." },
                { icon: "Trash2", title: "Easy Disposal", desc: "Toss out the random string when you finish." }
            ]}
            faqs={[
                { 
                    question: "Why use a random email?", 
                    answer: <>It saves time thinking of a name and offers maximum obfuscation. If you prefer choosing, try <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>.</>, 
                    schemaAnswer: "It saves time thinking of a name and offers maximum obfuscation. If you prefer choosing, try custom mail." 
                },
                { 
                    question: "Are the domains random too?", 
                    answer: <>We rotate through several trusted domains to keep the service highly reliable, much like a <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link>.</>, 
                    schemaAnswer: "We rotate through several trusted domains to keep the service highly reliable, much like a throwaway email." 
                },
                { 
                    question: "Can I regenerate a new one instantly?", 
                    answer: <>Yes, just click perfectly frictionless buttons. If you want a fresh start, you can use a <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>.</>, 
                    schemaAnswer: "Yes, just click perfectly frictionless buttons. If you want a fresh start, you can use a burner email." 
                },
                { 
                    question: "Is this meant for long-term use?", 
                    answer: <>No, random addresses are highly ephemeral. For a straightforward temp approach, see <Link href="/temp-email" className="text-primary hover:underline">temp email</Link>.</>, 
                    schemaAnswer: "No, random addresses are highly ephemeral. For a straightforward temp approach, see temp email." 
                },
                { 
                    question: "Does it auto-delete?", 
                    answer: <>Messages are wiped after a short duration, functioning exactly like a <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.</>, 
                    schemaAnswer: "Messages are wiped after a short duration, functioning exactly like a 10 minute mail." 
                }
            ]}
            ctaText="Generate Random Mail"
        />
    );
}
