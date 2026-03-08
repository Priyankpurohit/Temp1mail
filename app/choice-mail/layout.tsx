import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Email of Your Choice - Pick Your Temporary Address",
    description: "Create an email address of your choice instantly. Select any username for your temporary inbox at temp1mail.com. Free, no registration, auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/choice-mail" },
    openGraph: {
        title: "Email of Your Choice - Personalized Temp Inbox | Temp1Mail",
        description: "Pick any email address you want. Personalized temporary inbox, free and instant.",
        url: "https://temp1mail.com/choice-mail",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
