import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  expiresAt: Date;
  className?: string;
}

export function CountdownTimer({ expiresAt, className }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(() => Math.max(0, expiresAt.getTime() - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      const r = Math.max(0, expiresAt.getTime() - Date.now());
      setRemaining(r);
      if (r <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const totalMs = 60 * 60 * 1000;
  const pct = (remaining / totalMs) * 100;
  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  const isWarning = remaining < 5 * 60 * 1000;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className={cn("font-medium", isWarning ? "text-destructive" : "text-muted-foreground")}>
          {remaining <= 0 ? "Expired" : `${mins}m ${secs.toString().padStart(2, "0")}s remaining`}
        </span>
      </div>
      <Progress
        value={pct}
        className={cn("h-2", isWarning && "[&>div]:bg-destructive")}
      />
    </div>
  );
}
