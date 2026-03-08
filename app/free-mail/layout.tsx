import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Temporary Email Address - No Cost Disposable Inbox",
    description: "Get a 100% free temporary email address instantly. No signup, no fees, no premium tiers. Generate unlimited disposable emails to protect your privacy. Auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/free-mail" },
    openGraph: {
        title: "Free Temporary Email - Zero Cost Disposable Inbox | Temp1Mail",
        description: "Unlimited free temporary emails. No registration, no hidden fees. Instant disposable inbox that auto-deletes.",
        url: "https://temp1mail.com/free-mail",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
