"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * /generate-custom-mail → redirects to homepage in "custom" mode.
 * This page exists for SEO internal linking purposes.
 */
export default function GenerateCustomMailPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/?mode=custom");
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <p className="text-muted-foreground">Redirecting to custom mail generator...</p>
        </div>
    );
}
