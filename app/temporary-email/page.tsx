import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function TemporaryEmailAddressPage() {
    return (
        <LandingPageTemplate
            heading="Free Temporary Email"
            subheading="Instant • Disposable • Private"
            intro="Get a temporary email address instantly. No registration, no spam. Your secure inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Shield", title: "Inbox Firewall", desc: "Blocks annoying newsletters and data brokers." },
                { icon: "Trash2", title: "Automated Deletion", desc: "We take out the trash so your servers stay clean." },
                { icon: "Lock", title: "Total Anonymity", desc: "No one will ever know it was you." }
            ]}
            faqs={[
                { 
                    question: "What defines a temporary email?", 
                    answer: <>It is a volatile mailbox that provides utility for a short period. Simply put, it is a <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link>.</>, 
                    schemaAnswer: "It is a volatile mailbox that provides utility for a short period. Simply put, it is a temporary mail." 
                },
                { 
                    question: "Why is this better than giving my real address?", 
                    answer: <>Your real address is a permanent identifier. This is a mask. For ultimate masking, use an <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.</>, 
                    schemaAnswer: "Your real address is a permanent identifier. This is a mask. For ultimate masking, use an anonymous email." 
                },
                { 
                    question: "Can I trust this with bank details?", 
                    answer: <>Never use temporary services for critical accounts. They are meant to be a <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link>.</>, 
                    schemaAnswer: "Never use temporary services for critical accounts. They are meant to be a throwaway email." 
                },
                { 
                    question: "Is the service continually free?", 
                    answer: <>Yes, completely free of charge. See our <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> for our pricing philosophy.</>, 
                    schemaAnswer: "Yes, completely free of charge. See our free mail for our pricing philosophy." 
                },
                { 
                    question: "How difficult is it to use?", 
                    answer: <>Literally one click. As easy as generating a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.</>, 
                    schemaAnswer: "Literally one click. As easy as generating a random mail." 
                }
            ]}
            ctaText="Get Temporary Email"
        />
    );
}
