import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function DisposableMailPage() {
    return (
        <LandingPageTemplate
            heading="Free Disposable Mail"
            subheading="Fast • Trashable • Clean"
            intro="Launch a disposable mail address instantly. No passwords, no spam. Your temporary inbox disappears after 10 minutes."
            features={[
                { icon: "Trash2", title: "True Disposability", desc: "Designed to be thrown away without a second thought." },
                { icon: "Zap", title: "Zero Friction", desc: "No complex setups, just a ready-to-use inbox." },
                { icon: "Eye", title: "Anti-Phishing", desc: "Filter out malicious links before they hit your real email." }
            ]}
            faqs={[
                { 
                    question: "Why are disposable emails important?", 
                    answer: <>They act as a firewall against the constant threat of spam. For a similarly structured option, look at <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link>.</>, 
                    schemaAnswer: "They act as a firewall against the constant threat of spam. For a similarly structured option, look at throwaway email." 
                },
                { 
                    question: "Do disposable addresses look suspicious?", 
                    answer: <>Some sites block known temporary domains, but we frequently cycle ours to maintain high delivery rates. A <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link> can also help bypass filters.</>, 
                    schemaAnswer: "Some sites block known temporary domains, but we frequently cycle ours to maintain high delivery rates. A custom mail can also help bypass filters." 
                },
                { 
                    question: "Is registration required?", 
                    answer: <>Absolutely not. This is a frictionless service like our <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>.</>, 
                    schemaAnswer: "Absolutely not. This is a frictionless service like our fake mail." 
                },
                { 
                    question: "What happens if I accidentally close the tab?", 
                    answer: <>The session ends and the inbox is deleted immediately. If you need something persistent, do not use a <Link href="/temporary-email" className="text-primary hover:underline">temporary email</Link>.</>, 
                    schemaAnswer: "The session ends and the inbox is deleted immediately. If you need something persistent, do not use a temporary email." 
                },
                { 
                    question: "Can I reply to messages?", 
                    answer: <>Disposable inboxes here are for receiving only. Check our <Link href="/temp-mail-generator" className="text-primary hover:underline">temp mail generator</Link> for more details.</>, 
                    schemaAnswer: "Disposable inboxes here are for receiving only. Check our temp mail generator for more details." 
                }
            ]}
            ctaText="Get Disposable Mail"
        />
    );
}
