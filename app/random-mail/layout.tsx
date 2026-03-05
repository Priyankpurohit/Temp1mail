import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Random Temporary Email Generator - Temp1Mail | Free Disposable Email",
    description: "Instantly generate a random temporary email address for free. No signup required. Get a disposable email in one click. Auto-deletes after 10 minutes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
