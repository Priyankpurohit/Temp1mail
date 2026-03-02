"use client";

import { ThemeProvider } from "@/lib/theme";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            {children}
            <Toaster />
        </ThemeProvider>
    );
}
