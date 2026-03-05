"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { startMailboxCreation } from "@/lib/pending-mailbox";

const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

function randomUsername(): string {
    let name = "";
    for (let i = 0; i < 8; i++) {
        name += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    return name;
}

/**
 * /random-mail → instantly generates a random email and opens the inbox.
 * This page exists for SEO internal linking purposes.
 */
export default function RandomMailPage() {
    const router = useRouter();
    useEffect(() => {
        const username = randomUsername();
        const fullAddress = `${username}@temp1mail.com`;
        startMailboxCreation(fullAddress);
        router.replace(`/inbox?email=${encodeURIComponent(fullAddress)}`);
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <p className="text-muted-foreground">Generating random email...</p>
        </div>
    );
}
