import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Temporary Mail - Instant Disposable Mailbox Online",
    description: "Get a temporary mail address online in seconds. Free disposable mailbox that receives real emails. No registration, no personal data. Auto-deletes in 10 minutes.",
    alternates: { canonical: "https://temp1mail.com/temporary-mail" },
    openGraph: {
        title: "Temporary Mail - Online Disposable Mailbox | Temp1Mail",
        description: "Instant temporary mailbox online. Free, no signup, self-destructing in 10 minutes.",
        url: "https://temp1mail.com/temporary-mail",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
