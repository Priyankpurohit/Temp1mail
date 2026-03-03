/**
 * Simple in-memory rate limiter for serverless environments.
 *
 * Tracks requests per IP using a Map. Entries auto-expire after
 * the window passes. Sufficient for basic abuse protection on
 * Vercel serverless (resets on cold starts).
 */

interface RateLimitEntry {
    count: number;
    resetAt: number; // Unix timestamp (ms)
}

const store = new Map<string, RateLimitEntry>();

/**
 * Check whether a given key (usually an IP address) has exceeded
 * the rate limit.
 *
 * @param key        Unique identifier (e.g. client IP)
 * @param limit      Max requests allowed in the window
 * @param windowMs   Time window in milliseconds
 * @returns          { allowed, remaining, resetAt }
 */
export function rateLimit(
    key: string,
    limit: number = 5,
    windowMs: number = 10 * 60 * 1000 // 10 minutes
): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const entry = store.get(key);

    // Clean up expired entry
    if (entry && now > entry.resetAt) {
        store.delete(key);
    }

    const current = store.get(key);

    if (!current) {
        // First request in this window
        store.set(key, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
    }

    if (current.count >= limit) {
        return { allowed: false, remaining: 0, resetAt: current.resetAt };
    }

    current.count++;
    return { allowed: true, remaining: limit - current.count, resetAt: current.resetAt };
}

/**
 * Extract client IP from request headers.
 * Works on Vercel (x-forwarded-for) and other platforms.
 */
export function getClientIp(req: Request): string {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }
    const realIp = req.headers.get("x-real-ip");
    if (realIp) {
        return realIp.trim();
    }
    return "unknown";
}
