import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Copy, Check, User } from "lucide-react";
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
}

export function EmailCard({ email }: EmailCardProps) {
  const [expanded, setExpanded] = useState(false);
  const otpCodes = extractOtpCodes(email.body_text || "");
  const timeAgo = getTimeAgo(email.received_at);

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
        onClick={() => setExpanded(!expanded)}
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
              {email.body_html ? (
                <div
                  className="prose prose-sm dark:prose-invert max-w-none text-foreground"
                  dangerouslySetInnerHTML={{
                    __html: highlightOtpInHtml(email.body_html),
                  }}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    const otp = target.getAttribute("data-otp");
                    if (otp) handleOtpCopy(otp);
                  }}
                />
              ) : (
                <pre className="whitespace-pre-wrap text-sm text-foreground/80">
                  {email.body_text || "No content"}
                </pre>
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
