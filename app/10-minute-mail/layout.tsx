import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free 10 Minute Mail - Fast Self-Destructing Inbox (No Signup)",
    description: "Create a 10 minute mail instantly. Fast, secure, and disposable at temp1mail.com. Free, no registration, auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/10-minute-mail" },
    openGraph: {
        title: "Free 10 Minute Mail - Fast Self-Destructing Inbox (No Signup)",
        description: "Your safe 10 minute mail. Fast temporary inbox, free and instant.",
        url: "https://temp1mail.com/10-minute-mail",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
