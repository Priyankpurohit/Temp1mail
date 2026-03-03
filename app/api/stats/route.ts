import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/stats
 *
 * Public endpoint returning global usage counters.
 * Can be displayed on the homepage or used for monitoring.
 */
export async function GET() {
    try {
        const stats = await prisma.stats.findUnique({
            where: { id: "global" },
        });

        return NextResponse.json({
            mailboxesCreated: stats?.mailboxes ?? 0,
            emailsReceived: stats?.emails ?? 0,
            updatedAt: stats?.updatedAt?.toISOString() ?? null,
        });
    } catch (error) {
        console.error("Stats fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch stats" },
            { status: 500 }
        );
    }
}
