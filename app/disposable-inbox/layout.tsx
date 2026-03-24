import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Disposable Inbox - Instant Trashable Email (No Registration)",
    description: "Get a disposable inbox instantly. No registration, no spam. Your clean session clears after 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/disposable-inbox" },
    openGraph: {
        title: "Free Disposable Inbox - Instant Trashable Email (No Registration)",
        description: "Get a disposable inbox instantly. No registration, no spam. Your clean session clears after 10 minutes.",
        url: "https://temp1mail.com/disposable-inbox",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
