import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Custom Temporary Email - Choose Your Own Email Address",
    description: "Create a custom temporary email with any username you want. Pick your preferred email address at temp1mail.com. No signup required, instant inbox, auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/custom-mail" },
    openGraph: {
        title: "Custom Temporary Email - Choose Your Username | Temp1Mail",
        description: "Pick any username you want for your temporary email. Custom disposable inbox, instant setup.",
        url: "https://temp1mail.com/custom-mail",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
