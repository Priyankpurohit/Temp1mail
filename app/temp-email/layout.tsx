import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Temp Email - Instant Temporary Email Address Generator",
    description: "Generate a temp email address instantly. Free temporary inbox for signups, verification codes, and spam protection. No registration needed, auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/temp-email" },
    openGraph: {
        title: "Temp Email - Instant Disposable Email Generator | Temp1Mail",
        description: "Get a temp email in seconds. Free, instant, no signup. Perfect for verification and testing.",
        url: "https://temp1mail.com/temp-email",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
