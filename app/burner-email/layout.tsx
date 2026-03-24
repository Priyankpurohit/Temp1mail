import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Burner Email - Instant Disposable Alias (No Commitment)",
    description: "Create a burner email address for one-time use. Temporary inbox that self-destructs after 10 minutes. No signup, no trace, perfect for quick verifications.",
    alternates: { canonical: "https://temp1mail.com/burner-email" },
    openGraph: {
        title: "Free Burner Email - Instant Disposable Alias (No Commitment)",
        description: "One-time burner email that self-destructs. Use it, verify, forget it.",
        url: "https://temp1mail.com/burner-email",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
