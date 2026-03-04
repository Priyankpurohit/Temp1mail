import Link from "next/link";
import { Mail } from "lucide-react";

const footerLinks = [
    { label: "FAQs", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Contact", href: "/contact" },
];

export function Footer() {
    return (
        <footer className="relative z-10 border-t border-border bg-background/50">
            <div className="mx-auto max-w-5xl px-6 py-5">
                <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    {footerLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <span className="text-sm text-muted-foreground">© 2026 Temp1Mail</span>
                </nav>
            </div>
        </footer>
    );
}
