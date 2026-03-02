import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/cleanup
 *
 * Delete all expired mailboxes (and their emails via Prisma cascade).
 * Called automatically by Vercel Cron every 5 minutes.
 *
 * Protected by CRON_SECRET — Vercel sends this automatically.
 */
export async function GET(req: Request) {
    // Verify the request is from Vercel Cron
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Delete all expired mailboxes — emails are cascade-deleted automatically
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
