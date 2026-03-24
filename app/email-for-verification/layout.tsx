import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Email For Verification - Instant Confirmation Inbox (No Phone)",
    description: "Get an email for verification instantly. No phones, no spam. Your confirmation inbox disappears after 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/email-for-verification" },
    openGraph: {
        title: "Email For Verification - Instant Confirmation Inbox (No Phone)",
        description: "Get an email for verification instantly. No phones, no spam. Your confirmation inbox disappears after 10 minutes.",
        url: "https://temp1mail.com/email-for-verification",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
