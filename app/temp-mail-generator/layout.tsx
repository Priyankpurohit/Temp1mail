import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Temp Mail Generator - Powerful Disposable Engine (No Limits)",
    description: "Create a temp mail generator instantly. Fast, secure, and disposable at temp1mail.com. Free, no registration, auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/temp-mail-generator" },
    openGraph: {
        title: "Free Temp Mail Generator - Powerful Disposable Engine (No Limits)",
        description: "Your safe temp mail generator. Fast temporary inbox, free and instant.",
        url: "https://temp1mail.com/temp-mail-generator",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
