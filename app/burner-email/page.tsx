import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function BurnerEmailPage() {
    return (
        <LandingPageTemplate
            heading="Free Burner Email"
            subheading="Instant • Disposable • Unlinked"
            intro="Create a burner email address instantly. No commitments, no spam. Your disposable inbox vaporizes after 10 minutes."
            features={[
                { icon: "Trash2", title: "Toss It Away", desc: "Abandon the inbox anytime with zero consequence." },
                { icon: "Shield", title: "Spam Deflector", desc: "Catches junk mail so your real inbox does not have to." },
                { icon: "Zap", title: "On-Demand", desc: "Spin up a new burner in milliseconds." }
            ]}
            faqs={[
                { 
                    question: "What is a burner email?", 
                    answer: <>It is a temporary address designed to be used exactly once and then abandoned. It is similar to a <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link>.</>, 
                    schemaAnswer: "It is a temporary address designed to be used exactly once and then abandoned. It is similar to a throwaway email." 
                },
                { 
                    question: "Do I need a password for my burner?", 
                    answer: <>No passwords needed. Just generate it and read. If you want something specific, you can build a <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>.</>, 
                    schemaAnswer: "No passwords needed. Just generate it and read. If you want something specific, you can build a custom mail." 
                },
                { 
                    question: "Can a burner address be recovered?", 
                    answer: <>Once it expires or you close the session, it is gone forever. This is par for the course for any <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link>.</>, 
                    schemaAnswer: "Once it expires or you close the session, it is gone forever. This is par for the course for any disposable mail." 
                },
                { 
                    question: "Should I use this for my bank account?", 
                    answer: <>Absolutely not. Burners should only be used for untrusted sites. For general quick testing, consider a <Link href="/temp-email" className="text-primary hover:underline">temp email</Link>.</>, 
                    schemaAnswer: "Absolutely not. Burners should only be used for untrusted sites. For general quick testing, consider a temp email." 
                },
                { 
                    question: "Is there a limit on how many I can use?", 
                    answer: <>There are no limits. Generate as many as you need, just like with our <Link href="/temp-mail-free" className="text-primary hover:underline">free temp mail</Link>.</>, 
                    schemaAnswer: "There are no limits. Generate as many as you need, just like with our free temp mail." 
                }
            ]}
            ctaText="Create Burner"
        />
    );
}
