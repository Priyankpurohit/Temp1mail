import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function DisposableInboxPage() {
    return (
        <LandingPageTemplate
            heading="Free Disposable Inbox"
            subheading="Trashable • Fast • Clean"
            intro="Get a disposable inbox instantly. No registration, no spam. Your clean session clears after 10 minutes."
            features={[
                { icon: "Trash2", title: "Meant for the Trash", desc: "Read your code and throw the inbox away." },
                { icon: "Mail", title: "Seamless Receiving", desc: "Works with almost every major website." },
                { icon: "Lock", title: "Zero Footprint", desc: "We never keep any history of your sessions." }
            ]}
            faqs={[
                { 
                    question: "What is a disposable inbox?", 
                    answer: <>It is simply a mailbox you abandon when done, just like a <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link>.</>, 
                    schemaAnswer: "It is simply a mailbox you abandon when done, just like a disposable mail." 
                },
                { 
                    question: "Can I reply to messages?", 
                    answer: <>No, these inboxes are strictly receive-only to prevent spam. Just like our <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link>.</>, 
                    schemaAnswer: "No, these inboxes are strictly receive-only to prevent spam. Just like our temporary mail." 
                },
                { 
                    question: "Do I need a password?", 
                    answer: <>Nope! It is completely password-free. It functions flawlessly as a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>.</>, 
                    schemaAnswer: "Nope! It is completely password-free. It functions flawlessly as a fake mail." 
                },
                { 
                    question: "Is this reliable for banking?", 
                    answer: <>Never use this for banking! Always use a secure real email. Use this for a <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link> scenario only.</>, 
                    schemaAnswer: "Never use this for banking! Always use a secure real email. Use this for a throwaway email scenario only." 
                },
                { 
                    question: "Does it auto-refresh?", 
                    answer: <>Yes, incoming messages will just pop up on your screen. Like grabbing a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.</>, 
                    schemaAnswer: "Yes, incoming messages will just pop up on your screen. Like grabbing a random mail." 
                }
            ]}
            ctaText="Open Disposable Inbox"
        />
    );
}
