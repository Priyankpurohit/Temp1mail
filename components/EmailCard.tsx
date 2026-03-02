"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Copy, Check, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { extractOtpCodes, highlightOtpInHtml } from "@/lib/otp";
import { toast } from "@/hooks/use-toast";

export interface EmailData {
  id: string;
  from_email: string;
  subject: string;
  body_text: string;
  body_html: string;
  received_at: string;
}

interface EmailCardProps {
  email: EmailData;
  token: string;
}

export function EmailCard({ email, token }: EmailCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [fullEmail, setFullEmail] = useState<{
    bodyHtml: string | null;
    bodyText: string | null;
  } | null>(null);
  const [loadingBody, setLoadingBody] = useState(false);

  const bodyText = fullEmail?.bodyText || email.body_text || "";
  const bodyHtml = fullEmail?.bodyHtml || email.body_html || "";
  const otpCodes = extractOtpCodes(bodyText);
  const timeAgo = getTimeAgo(email.received_at);

  const handleToggle = async () => {
    const willExpand = !expanded;
    setExpanded(willExpand);

    // Fetch full email body on first expand
    if (willExpand && !fullEmail && !loadingBody) {
      setLoadingBody(true);
      try {
        const res = await fetch(`/api/mailbox/${token}/emails/${email.id}`);
        if (res.ok) {
          const data = await res.json();
          setFullEmail({
            bodyHtml: data.bodyHtml || null,
            bodyText: data.bodyText || null,
          });
        }
      } catch {
        toast({ title: "Error", description: "Could not load email content" });
      } finally {
        setLoadingBody(false);
      }
    }
  };

  const handleOtpCopy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    toast({ title: `OTP ${code} copied! ✨` });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={handleToggle}
        className="flex w-full items-start gap-3 p-4 text-left hover:bg-accent/30 transition-colors"
      >
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <User className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-medium text-foreground">
              {email.from_email}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">{timeAgo}</span>
          </div>
          <p className="truncate text-sm text-foreground/80">{email.subject || "(no subject)"}</p>
          {otpCodes.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {otpCodes.map((code) => (
                <OtpBadge key={code} code={code} onCopy={handleOtpCopy} />
              ))}
            </div>
          )}
        </div>
        <ChevronDown
          className={cn(
            "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            expanded && "rotate-180"
          )}
        />
      </button>

      {/* Expanded body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border p-4">
              {loadingBody ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">Loading email...</span>
                </div>
              ) : bodyHtml ? (
                <div
                  className="prose prose-sm dark:prose-invert max-w-none text-foreground"
                  dangerouslySetInnerHTML={{
                    __html: highlightOtpInHtml(bodyHtml),
                  }}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    const otp = target.getAttribute("data-otp");
                    if (otp) handleOtpCopy(otp);
                  }}
                />
              ) : bodyText ? (
                <pre className="whitespace-pre-wrap text-sm text-foreground/80">
                  {bodyText}
                </pre>
              ) : (
                <p className="text-sm text-muted-foreground italic">No content</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function OtpBadge({ code, onCopy }: { code: string; onCopy: (c: string) => void }) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(e as unknown as React.MouseEvent); }}
      className="inline-flex items-center gap-1 otp-highlight text-xs cursor-pointer"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {code}
    </span>
  );
}

function getTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}
