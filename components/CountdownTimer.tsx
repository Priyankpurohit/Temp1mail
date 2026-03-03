"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  expiresAt: Date;
  lifetimeMinutes?: number;
  className?: string;
}

export function CountdownTimer({
  expiresAt,
  lifetimeMinutes = 10,
  className,
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, expiresAt.getTime() - Date.now())
  );

  const expiresAtMs = expiresAt.getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const r = Math.max(0, expiresAtMs - Date.now());
      setRemaining(r);
      if (r <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAtMs]);

  const totalMs = lifetimeMinutes * 60 * 1000;
  const pct = Math.min(100, (remaining / totalMs) * 100);
  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  const isWarning = remaining < 3 * 60 * 1000;
  const isCritical = remaining < 1 * 60 * 1000;
  const expired = remaining <= 0;

  // Color transitions: green → yellow → red
  const barColor = expired
    ? "bg-destructive"
    : isCritical
      ? "bg-red-500"
      : isWarning
        ? "bg-amber-500"
        : "bg-gradient-to-r from-primary to-primary-glow";

  const textColor = expired
    ? "text-destructive"
    : isCritical
      ? "text-red-400"
      : isWarning
        ? "text-amber-400"
        : "text-muted-foreground";

  return (
    <div className={cn("w-full", className)}>
      {/* Timer text */}
      <div className="flex items-center justify-between mb-2">
        <span className={cn("text-sm font-semibold tracking-wide", textColor)}>
          {expired ? (
            "⏰ Mailbox Expired"
          ) : (
            `${mins}m ${secs.toString().padStart(2, "0")}s remaining`
          )}
        </span>
        {!expired && (
          <span className="text-xs text-muted-foreground opacity-50">
            {lifetimeMinutes}m lifetime
          </span>
        )}
      </div>

      {/* Full-width progress bar */}
      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-1000 ease-linear", barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
