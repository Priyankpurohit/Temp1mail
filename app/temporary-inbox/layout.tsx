import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Temporary Inbox - Fast Ephemeral Mailbox (No Logs)",
    description: "Access a temporary inbox instantly. No tracking, no spam. Your secure mailbox vaporizes after 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/temporary-inbox" },
    openGraph: {
        title: "Free Temporary Inbox - Fast Ephemeral Mailbox (No Logs)",
        description: "Access a temporary inbox instantly. No tracking, no spam. Your secure mailbox vaporizes after 10 minutes.",
        url: "https://temp1mail.com/temporary-inbox",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
