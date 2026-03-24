import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Anonymous Email - Untraceable Private Inbox (No Tracking)",
    description: "Create an anonymous email address with no personal data required. Protect your real identity online with untraceable disposable email. No signup, auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/anonymous-email" },
    openGraph: {
        title: "Free Anonymous Email - Untraceable Private Inbox (No Tracking)",
        description: "Total anonymity. No name, no phone, no data. Get an untraceable email address instantly.",
        url: "https://temp1mail.com/anonymous-email",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
