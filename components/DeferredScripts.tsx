"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

export function DeferredScripts() {
    const [load, setLoad] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const handleInteraction = () => {
            if (!load) {
                setLoad(true);
            }
            cleanUp();
        };

        const cleanUp = () => {
            window.removeEventListener("scroll", handleInteraction);
            window.removeEventListener("mousemove", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            window.removeEventListener("keydown", handleInteraction);
            clearTimeout(timeout);
        };

        window.addEventListener("scroll", handleInteraction, { passive: true });
        window.addEventListener("mousemove", handleInteraction, { passive: true });
        window.addEventListener("touchstart", handleInteraction, { passive: true });
        window.addEventListener("keydown", handleInteraction, { passive: true });

        // Fallback: load scripts after 5 seconds even with no interaction
        timeout = setTimeout(() => {
            if (!load) setLoad(true);
            cleanUp();
        }, 5000);

        return cleanUp;
    }, [load]);

    if (!load) return null;

    return (
        <>
            <GoogleAnalytics gaId="G-2R46QD65F3" />
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5486930886029492"
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />
        </>
    );
}
