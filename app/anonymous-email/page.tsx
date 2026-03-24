import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function AnonymousEmailPage() {
    return (
        <LandingPageTemplate
            heading="Free Anonymous Email"
            subheading="Untraceable • Secure • Private"
            intro="Get an anonymous email address instantly. No tracking, no logs. Your private inbox vanishes after 10 minutes."
            features={[
                { icon: "Eye", title: "Zero Tracking", desc: "No logs, no cookies tracking your activity." },
                { icon: "UserX", title: "No Registration", desc: "We never ask for your name or phone number." },
                { icon: "Lock", title: "Encrypted Routing", desc: "Your inbox is securely isolated from the public." }
            ]}
            faqs={[
                { 
                    question: "Is this truly anonymous?", 
                    answer: <>Yes. We do not require any personal details, IPs are not permanently logged, and the inbox cannot be traced back to you. For a different flavor of privacy, you can also explore our <Link href="/burner-email" className="text-primary hover:underline">burner email</Link> tool.</>, 
                    schemaAnswer: "Yes. We do not require any personal details, IPs are not permanently logged, and the inbox cannot be traced back to you. For a different flavor of privacy, you can also explore our burner email tool." 
                },
                { 
                    question: "Can I send emails from this address?", 
                    answer: <>To prevent spam abuse, our anonymous inboxes are currently receive-only. If you need a quick inbox, try a <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.</>, 
                    schemaAnswer: "To prevent spam abuse, our anonymous inboxes are currently receive-only. If you need a quick inbox, try a 10 minute mail." 
                },
                { 
                    question: "Will my data be sold?", 
                    answer: <>Never. We operate a completely free service without selling data, much like our <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> alternative.</>, 
                    schemaAnswer: "Never. We operate a completely free service without selling data, much like our free mail alternative." 
                },
                { 
                    question: "How long until messages disappear?", 
                    answer: <>Messages are wiped after 10 minutes to ensure your footprint remains zero. Need something quick? Use our <Link href="/temp-mail-generator" className="text-primary hover:underline">temp mail generator</Link>.</>, 
                    schemaAnswer: "Messages are wiped after 10 minutes to ensure your footprint remains zero. Need something quick? Use our temp mail generator." 
                },
                { 
                    question: "Why use this instead of Gmail or Outlook?", 
                    answer: <>Big providers require phone numbers and track your usage. This service acts as a true shield, functioning similarly to a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>.</>, 
                    schemaAnswer: "Big providers require phone numbers and track your usage. This service acts as a true shield, functioning similarly to a fake mail." 
                }
            ]}
            ctaText="Get Anonymous Mail"
        />
    );
}
