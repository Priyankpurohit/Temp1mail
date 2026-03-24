import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tempmail - Free Disposable Temp Mail | Instant No Signup",
    description: "Get a free tempmail address in one click. No registration, no spam. Your disposable inbox receives emails instantly and auto-deletes after 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/tempmail" },
    openGraph: {
        title: "Tempmail - Free Disposable Temp Mail | Instant No Signup",
        description: "Instant tempmail with zero registration. Generate a disposable address, receive emails in real-time, auto-delete in 10 minutes.",
        url: "https://temp1mail.com/tempmail",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
