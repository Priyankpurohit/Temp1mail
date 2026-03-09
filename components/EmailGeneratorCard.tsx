"use client"

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Copy, Mail, Zap, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { startMailboxCreation } from "@/lib/pending-mailbox";

const MAIL_DOMAIN = "temp1mail.com";
const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

function randomUsername(): string {
    let name = "";
    for (let i = 0; i < 8; i++) {
        name += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    return name;
}

export function EmailGeneratorCard({ ctaText = "Create Inbox", defaultMode = "custom" }: { ctaText?: string, defaultMode?: "custom" | "random" }) {
    const router = useRouter();
    const pathname = usePathname();
    const [username, setUsername] = useState("");
    const [isOpening, setIsOpening] = useState(false);
    const [copied, setCopied] = useState(false);
    const [mode, setMode] = useState<"custom" | "random">("custom");

    // Initialize random mode after mount or route change to avoid server-client text mismatch, and reset on navigation
    useEffect(() => {
        if (defaultMode === "random") {
            setUsername(randomUsername());
            setMode("random");
        } else {
            setUsername("");
            setMode("custom");
        }
    }, [defaultMode, pathname]);

    const generateRandom = () => {
        setUsername(randomUsername());
        setMode("random");
    };

    const switchToCustom = () => {
        setUsername("");
        setMode("custom");
    };

    const handleOpenInbox = () => {
        if (!username.trim()) return;
        const fullAddress = `${username}@${MAIL_DOMAIN}`;
        setIsOpening(true);
        startMailboxCreation(fullAddress);
        router.push(`/inbox?email=${encodeURIComponent(fullAddress)}`);
    };

    const handleCopy = async () => {
        const fullAddress = `${username}@${MAIL_DOMAIN}`;
        await navigator.clipboard.writeText(fullAddress);
        setCopied(true);
        toast({ title: "Email copied!", description: "Your temporary address is ready to use." });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass-card w-full max-w-md mx-auto rounded-2xl p-8 mb-8 mt-2 text-left"
        >
            {mode === "custom" ? (
                <div className="space-y-4">
                    <div className="flex items-center rounded-xl border border-border bg-card overflow-hidden">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                            placeholder="Type the email"
                            className="flex-1 min-w-0 bg-transparent pl-4 pr-1 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                            maxLength={12}
                        />
                        <span className="shrink-0 pr-4 text-sm text-muted-foreground font-medium truncate">
                            @{MAIL_DOMAIN}
                        </span>
                    </div>

                    <Button
                        onClick={() => {
                            if (!username.trim()) toast({ title: "Please enter an email address" });
                            else handleOpenInbox();
                        }}
                        disabled={isOpening}
                        className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-lg py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                        size="lg"
                    >
                        {isOpening ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            >
                                <Zap className="h-5 w-5" />
                            </motion.div>
                        ) : (
                            <>
                                <Zap className="mr-2 h-5 w-5" />
                                {ctaText}
                            </>
                        )}
                    </Button>

                    <button
                        onClick={generateRandom}
                        className="w-full rounded-xl border border-border bg-card/50 py-3 text-sm font-medium text-foreground hover:bg-accent/30 transition-colors"
                    >
                        Generate Random Email
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-4">
                        <Mail className="h-5 w-5 shrink-0 text-primary" />
                        <span className="flex-1 truncate font-mono text-sm font-medium text-foreground">
                            {username}@{MAIL_DOMAIN}
                        </span>
                        <button
                            onClick={generateRandom}
                            className="shrink-0 p-1.5 rounded-md hover:bg-accent/30 transition-colors"
                            title="Generate new random email"
                        >
                            <RefreshCw className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button
                            onClick={handleCopy}
                            className="shrink-0 p-1.5 rounded-md hover:bg-accent/30 transition-colors"
                            title="Copy email address"
                        >
                            {copied ? (
                                <Check className="h-4 w-4 text-accent-foreground" />
                            ) : (
                                <Copy className="h-4 w-4 text-muted-foreground" />
                            )}
                        </button>
                    </div>

                    <Button
                        onClick={handleOpenInbox}
                        disabled={isOpening}
                        className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-lg py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                        size="lg"
                    >
                        {isOpening ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            >
                                <Zap className="h-5 w-5" />
                            </motion.div>
                        ) : (
                            <>
                                <Zap className="mr-2 h-5 w-5" />
                                Open Inbox
                            </>
                        )}
                    </Button>

                    <button
                        onClick={switchToCustom}
                        className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Generate Email of your choice
                    </button>
                </div>
            )
            }
        </motion.div >
    );
}
