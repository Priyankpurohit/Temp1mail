import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Temp Mail Generator - Instant Temporary Inbox",
    description: "Create a temp mail generator instantly. Fast, secure, and disposable at temp1mail.com. Free, no registration, auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/temp-mail-generator" },
    openGraph: {
        title: "Temp Mail Generator - Fast Temporary Inbox | Temp1Mail",
        description: "Your safe temp mail generator. Fast temporary inbox, free and instant.",
        url: "https://temp1mail.com/temp-mail-generator",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
