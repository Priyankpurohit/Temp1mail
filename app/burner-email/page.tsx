import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function BurnerEmailPage() {
    return (
        <LandingPageTemplate
            heading="Burner Email"
            subheading="Instant • Disposable • Private"
            intro="Free burner email address instantly. No registration, no spam. Your disposable inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Zap", title: "Instant", desc: "Get your email in under 1 second" },
                { icon: "Shield", title: "Private Inbox", desc: "No signup, no tracking, no logs" },
                { icon: "Clock", title: "Auto-Delete", desc: "All emails erased after 10 minutes" }
            ]}
            faqs={[
                { 
                    question: "What is a burner email?", 
                    answer: <>A burner email provides free, instant disposable email addresses. If you need something slightly different, you can also try a <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>, a <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link>, or a <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link> to sign up for services without registration.</> 
                },
                { 
                    question: "How long does a burner email last?", 
                    answer: <>Each burner email address lasts for 10 minutes from creation. This operates similarly to a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>, a <Link href="/temp-mail-free" className="text-primary hover:underline">free temp mail</Link>, or a <Link href="/temp-mail-generator" className="text-primary hover:underline">temp mail generator</Link>, automatically and permanently deleting all messages afterwards.</> 
                },
                { 
                    question: "Is this burner email free to use?", 
                    answer: <>Yes, this burner email service is completely free. We also offer other tools like the <Link href="/temporary-email" className="text-primary hover:underline">temporary email</Link>, the <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>, and the <Link href="/temp-email" className="text-primary hover:underline">temp email</Link> with absolutely no hidden fees and no limits.</> 
                },
                { 
                    question: "Can I choose my own burner email address?", 
                    answer: <>Absolutely! You can type in any custom prefix, or let us generate one for you. For more tailored addresses, consider creating a <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link> or a <Link href="/tempEmail" className="text-primary hover:underline">temp email</Link> for your specific needs.</> 
                },
                { 
                    question: "Why use a burner email instead of my real email?", 
                    answer: <>Using a burner email protects your primary inbox from data leaks and marketing spam. Much like a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link> or a <Link href="/free-mail" className="text-primary hover:underline">free mail</Link>, it acts as a reliable shield between your private details and potentially untrustworthy websites.</> 
                }
            ]}
            ctaText="Create Burner Email"
        />
    );
}
