import { prisma } from "@/lib/prisma";

/**
 * Throttled on-demand cleanup for expired mailboxes.
 *
 * On Vercel Hobby (free) plan, cron only runs once/day.
 * This fills the gap by piggybacking cleanup on normal API traffic.
 *
 * - Runs at most once every 30 seconds (avoids hammering the DB)
 * - Deletes ALL expired mailboxes in a single query
 * - Emails are cascade-deleted automatically via Prisma schema
 * - Always fire-and-forget — never blocks the API response
 *
 * Usage: import { triggerCleanup } from "@/lib/cleanup";
 *        triggerCleanup(); // no await, no .catch needed
 */

let lastCleanupAt = 0;
const THROTTLE_MS = 30 * 1000; // 30 seconds

/**
 * Fire-and-forget cleanup. Safe to call on every request —
 * the throttle ensures it only hits the DB once per 30s.
 */
export function triggerCleanup(): void {
    const now = Date.now();

    // Skip if we ran recently
    if (now - lastCleanupAt < THROTTLE_MS) return;

    // Mark as running BEFORE the async work to prevent concurrent triggers
    lastCleanupAt = now;

    // Run in background — never blocks the caller
    performCleanup().catch(() => { });
}

async function performCleanup(): Promise<void> {
    try {
        const result = await prisma.mailbox.deleteMany({
            where: {
                expiresAt: { lt: new Date() },
            },
        });

        if (result.count > 0) {
            console.log(`On-demand cleanup: deleted ${result.count} expired mailbox(es)`);
        }
    } catch (err) {
        console.error("On-demand cleanup error:", err);
    }
}
