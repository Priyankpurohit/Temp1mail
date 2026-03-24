import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Fake Email - Quick Alias Generator (No Verification)",
    description: "Generate fake email addresses for testing and signups. Get a working temporary inbox that receives real emails. No registration required, auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/fake-mail" },
    openGraph: {
        title: "Free Fake Email - Quick Alias Generator (No Verification)",
        description: "Generate fake emails that actually work. Receive real emails, OTP codes, and verification links.",
        url: "https://temp1mail.com/fake-mail",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
