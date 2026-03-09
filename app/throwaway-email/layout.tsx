import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Throwaway Email - Instant Temporary Inbox",
    description: "Create a throwaway email instantly. Fast, secure, and disposable at temp1mail.com. Free, no registration, auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/throwaway-email" },
    openGraph: {
        title: "Throwaway Email - Fast Temporary Inbox | Temp1Mail",
        description: "Your safe throwaway email. Fast temporary inbox, free and instant.",
        url: "https://temp1mail.com/throwaway-email",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
