import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function EmailForVerificationPage() {
    return (
        <LandingPageTemplate
            heading="Email For Verification"
            subheading="Fast • Reliable • Private"
            intro="Get an email for verification instantly. No phones, no spam. Your confirmation inbox disappears after 10 minutes."
            features={[
                { icon: "Mail", title: "Catches Confirmations", desc: "Clicking verification links has never been safer." },
                { icon: "Lock", title: "No Phone Needed", desc: "Unlike Gmail, we skip the phone verification step." },
                { icon: "Shield", title: "Secure Tunnels", desc: "Your verification links are entirely encrypted." }
            ]}
            faqs={[
                { 
                    question: "Is this the best way to verify accounts?", 
                    answer: <>For accounts you care little about, yes. It is the perfect <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link>.</>, 
                    schemaAnswer: "For accounts you care little about, yes. It is the perfect throwaway email." 
                },
                { 
                    question: "Will they know it is a temporary email?", 
                    answer: <>Some strict websites might, but most will accept it. It is great as a <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>.</>, 
                    schemaAnswer: "Some strict websites might, but most will accept it. It is great as a burner email." 
                },
                { 
                    question: "Is there a delay?", 
                    answer: <>Verification emails appear almost instantly. Equivalent speed to our <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.</>, 
                    schemaAnswer: "Verification emails appear almost instantly. Equivalent speed to our 10 minute mail." 
                },
                { 
                    question: "Is my data tracked?", 
                    answer: <>No! We do not log IP addresses or request info, acting dynamically like an <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.</>, 
                    schemaAnswer: "No! We do not log IP addresses or request info, acting dynamically like an anonymous email." 
                },
                { 
                    question: "Do I get to pick the address?", 
                    answer: <>You can let it randomize, or type your own. Randomizing acts like a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.</>, 
                    schemaAnswer: "You can let it randomize, or type your own. Randomizing acts like a random mail." 
                }
            ]}
            ctaText="Get Verification Email"
        />
    );
}
