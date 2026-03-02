import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/cleanup
 *
 * Delete all expired mailboxes (and their emails via cascade).
 * Call this from a cron job (e.g., Vercel Cron, or external service).
 *
 * Protect with a secret in production:
 *   Authorization: Bearer <CRON_SECRET>
 */
export async function POST(req: Request) {
    // Simple auth check for cron
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const result = await prisma.mailbox.deleteMany({
            where: {
                expiresAt: { lt: new Date() },
            },
        });

        console.log(`Cleanup: deleted ${result.count} expired mailboxes`);

        return NextResponse.json({
            deleted: result.count,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Cleanup failed:", error);
        return NextResponse.json(
            { error: "Cleanup failed" },
            { status: 500 }
        );
    }
}
