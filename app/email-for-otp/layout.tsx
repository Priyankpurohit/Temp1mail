import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Email For OTP - Instant Code Catcher (Immediate Delivery)",
    description: "Receive an email for OTP instantly. No delays, no spam. Your code catcher self-destructs after 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/email-for-otp" },
    openGraph: {
        title: "Email For OTP - Instant Code Catcher (Immediate Delivery)",
        description: "Receive an email for OTP instantly. No delays, no spam. Your code catcher self-destructs after 10 minutes.",
        url: "https://temp1mail.com/email-for-otp",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
