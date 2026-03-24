import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free TempEmail Generator - Clean Programmatic Inbox (No Distractions)",
    description: "TempEmail made simple. Get a disposable email address in one click with no signup. Receive verification codes and emails instantly. Auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/tempemail" },
    openGraph: {
        title: "Free TempEmail Generator - Clean Programmatic Inbox (No Distractions)",
        description: "One click to a working temp email. Instant inbox, no registration, self-destructing.",
        url: "https://temp1mail.com/tempemail",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
