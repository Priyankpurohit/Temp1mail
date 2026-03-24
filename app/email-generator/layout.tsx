import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Email Generator - Instant Address Creator (No Limits)",
    description: "Get an email generator instantly. No limits, no spam. Your created inbox auto-deletes after 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/email-generator" },
    openGraph: {
        title: "Free Email Generator - Instant Address Creator (No Limits)",
        description: "Get an email generator instantly. No limits, no spam. Your created inbox auto-deletes after 10 minutes.",
        url: "https://temp1mail.com/email-generator",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
