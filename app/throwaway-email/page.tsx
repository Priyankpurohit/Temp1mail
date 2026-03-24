import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function ThrowawayEmailPage() {
    return (
        <LandingPageTemplate
            heading="Free Throwaway Email"
            subheading="Disposable • Untracked • Clean"
            intro="Make a throwaway email address instantly. No tracking, no spam. Your dumped inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Trash2", title: "Meant to be Dumped", desc: "The ultimate zero-commitment relationship." },
                { icon: "Zap", title: "Instant Activation", desc: "No waiting for servers to provision your inbox." },
                { icon: "Lock", title: "Untraceable", desc: "Severely limits the reach of data aggregators." }
            ]}
            faqs={[
                { 
                    question: "What exactly makes it a throwaway?", 
                    answer: <>The intention behind it. You plan to abandon it immediately, just like a <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>.</>, 
                    schemaAnswer: "The intention behind it. You plan to abandon it immediately, just like a burner email." 
                },
                { 
                    question: "Can I recover a thrown-away email?", 
                    answer: <>Once the session expires, the data is shredded. If you need recovery, a <Link href="/temporary-email" className="text-primary hover:underline">temporary email</Link> is not what you want.</>, 
                    schemaAnswer: "Once the session expires, the data is shredded. If you need recovery, a temporary email is not what you want." 
                },
                { 
                    question: "Is this good for downloading free ebooks?", 
                    answer: <>Yes! It is the perfect use case. It functions flawlessly as a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>.</>, 
                    schemaAnswer: "Yes! It is the perfect use case. It functions flawlessly as a fake mail." 
                },
                { 
                    question: "Do I need to delete it myself?", 
                    answer: <>No, it auto-deletes, saving you time. This is standard <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link> behavior.</>, 
                    schemaAnswer: "No, it auto-deletes, saving you time. This is standard disposable mail behavior." 
                },
                { 
                    question: "Is it hard to set up?", 
                    answer: <>It requires absolutely zero setup. Just like picking a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.</>, 
                    schemaAnswer: "It requires absolutely zero setup. Just like picking a random mail." 
                }
            ]}
            ctaText="Create Throwaway"
        />
    );
}
