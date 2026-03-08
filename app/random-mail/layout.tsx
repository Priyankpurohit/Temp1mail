import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Random Temporary Email Generator - Instant Disposable Email",
    description: "Instantly generate a random temporary email address for free. One-click random email generator with a live inbox. No signup, auto-deletes after 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/random-mail" },
    openGraph: {
        title: "Random Email Generator - Instant Temp Email | Temp1Mail",
        description: "One click to a random temporary email. Instant inbox, no registration, auto-delete.",
        url: "https://temp1mail.com/random-mail",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
