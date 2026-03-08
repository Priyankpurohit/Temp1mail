import { Metadata } from "next";

export const metadata: Metadata = {
    title: "TempEmail - Quick Disposable Email in One Click",
    description: "TempEmail made simple. Get a disposable email address in one click with no signup. Receive verification codes and emails instantly. Auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/tempemail" },
    openGraph: {
        title: "TempEmail - One-Click Disposable Email | Temp1Mail",
        description: "One click to a working temp email. Instant inbox, no registration, self-destructing.",
        url: "https://temp1mail.com/tempemail",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
