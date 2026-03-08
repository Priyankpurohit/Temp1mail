import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Temp Mail - No Cost Temporary Email Service",
    description: "Get free temp mail addresses with no limits. Generate unlimited disposable temporary email addresses at zero cost. No signup, instant inbox, auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/temp-mail-free" },
    openGraph: {
        title: "Free Temp Mail - Unlimited Disposable Email | Temp1Mail",
        description: "Unlimited free temp mail for everyone. No cost, no limits, no signup required.",
        url: "https://temp1mail.com/temp-mail-free",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
