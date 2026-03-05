/**
 * Shared mailbox creation promise.
 * 
 * The homepage starts the API call immediately on button click
 * and navigates at the same time. The inbox page picks up the
 * in-flight promise instead of making a duplicate request.
 */

interface PendingMailbox {
    address: string;
    promise: Promise<Response>;
}

let pending: PendingMailbox | null = null;

/**
 * Start creating a mailbox in the background.
 * Called from the homepage on button click.
 */
export function startMailboxCreation(address: string): void {
    pending = {
        address,
        promise: fetch("/api/mailbox", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address }),
        }),
    };
}

/**
 * Get the pending mailbox creation promise if it matches the email.
 * Called from the inbox page on mount.
 * Returns the in-flight response, or null if no match.
 */
export function getPendingMailboxCreation(address: string): Promise<Response> | null {
    if (pending && pending.address === address) {
        const p = pending.promise;
        pending = null; // consume it - only use once
        return p;
    }
    return null;
}
