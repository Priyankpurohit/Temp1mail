import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function ChoiceMailPage() {
    return (
        <LandingPageTemplate
            heading="Choice Mail"
            subheading="Choice • Custom • Secure"
            intro="Free choice mail address instantly. No registration, no spam. Your disposable inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Zap", title: "Instant", desc: "Get your email in under 1 second" },
                { icon: "Shield", title: "Private Inbox", desc: "No signup, no tracking, no logs" },
                { icon: "Clock", title: "Auto-Delete", desc: "All emails erased after 10 minutes" }
            ]}
            faqs={[
                { 
                    question: "What is a choice mail?", 
                    answer: <>A choice mail provides free, instant disposable email addresses. If you need something slightly different, you can also try a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>, a <Link href="/generate-custom-mail" className="text-primary hover:underline">custom mail</Link>, or a <Link href="/temp-mail-free" className="text-primary hover:underline">free temp mail</Link> to sign up for services without registration.</> 
                },
                { 
                    question: "How long does a choice mail last?", 
                    answer: <>Each choice mail address lasts for 10 minutes from creation. This operates similarly to a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>, a <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link>, or a <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>, automatically and permanently deleting all messages afterwards.</> 
                },
                { 
                    question: "Is this choice mail free to use?", 
                    answer: <>Yes, this choice mail service is completely free. We also offer other tools like the <Link href="/tempemail" className="text-primary hover:underline">temp email</Link>, the <Link href="/free-mail" className="text-primary hover:underline">free mail</Link>, and the <Link href="/temporary-email" className="text-primary hover:underline">temporary email</Link> with absolutely no hidden fees and no limits.</> 
                },
                { 
                    question: "Can I choose my own choice mail address?", 
                    answer: <>Absolutely! You can type in any custom prefix, or let us generate one for you. For more tailored addresses, consider creating a <Link href="/temp-email" className="text-primary hover:underline">temp email</Link> or a <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link> for your specific needs.</> 
                },
                { 
                    question: "Why use a choice mail instead of my real email?", 
                    answer: <>Using a choice mail protects your primary inbox from data leaks and marketing spam. Much like a <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link> or a <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>, it acts as a reliable shield between your private details and potentially untrustworthy websites.</> 
                }
            ]}
            ctaText="Create Choice Mail"
            defaultMode="random"
        />
    );
}
