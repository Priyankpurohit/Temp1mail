import { customAlphabet } from "nanoid";

// Generate random mailbox usernames like "x7k2m9p"
const generateUsername = customAlphabet(
    "abcdefghijklmnopqrstuvwxyz0123456789",
    8
);

/**
 * Default mailbox lifetime in minutes.
 */
export const MAILBOX_LIFETIME_MINUTES = 10;

/**
 * Generate a random email address for a temporary mailbox.
 */
export function generateEmailAddress(domain: string): string {
    return `${generateUsername()}@${domain}`;
}

/**
 * Calculate the expiration date from now.
 */
export function getExpirationDate(minutes: number = MAILBOX_LIFETIME_MINUTES): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
}
