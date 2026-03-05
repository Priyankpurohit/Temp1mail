import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ - Temp1Mail | Disposable Temp Mail & Anonymous Email",
    description: "Find answers to frequently asked questions about Temp1Mail. Free temporary email, disposable email addresses, anonymous email, no registration, auto-delete after 10 minutes.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
