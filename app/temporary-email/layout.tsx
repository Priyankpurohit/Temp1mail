import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Temporary Email Address - Private Disposable Inbox",
    description: "Create a temporary email address to protect your online privacy. Instant disposable inbox, no registration, no data tracking. All emails auto-delete in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/temporary-email" },
    openGraph: {
        title: "Temporary Email Address - Private Inbox | Temp1Mail",
        description: "Protect your privacy with a temporary email address. Instant setup, no tracking, auto-delete.",
        url: "https://temp1mail.com/temporary-email",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
