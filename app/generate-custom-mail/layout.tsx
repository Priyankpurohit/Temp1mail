import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Generate Custom Temporary Email - Temp1Mail | Free Disposable Email",
    description: "Create your own custom temporary email address for free. Choose any username you want at temp1mail.com. No signup, instant inbox, auto-deletes after 10 minutes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
