import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Disposable Mail - Instant Junk Deflector (No Registration)",
    description: "Create a disposable email address instantly for one-time signups. Protect your real inbox from spam with throwaway emails that auto-delete after 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/disposable-mail" },
    openGraph: {
        title: "Free Disposable Mail - Instant Junk Deflector (No Registration)",
        description: "Instant disposable email for one-time use. Block spam, protect privacy, auto-delete in 10 minutes.",
        url: "https://temp1mail.com/disposable-mail",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
