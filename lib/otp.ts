/**
 * OTP code detection utilities.
 *
 * Targets 4-6 digit codes (the range used by virtually all OTP systems).
 * Excludes common false positives like years (1900-2099) using a
 * negative lookahead/lookbehind approach.
 */

/** Pattern: 4-6 digits on word boundaries, excluding year-like numbers */
const OTP_PATTERN = /(?<!\d)\b(?!(?:19|20)\d{2}\b)\d{4,6}\b(?!\d)/g;

/** Finds 4-6 digit OTP codes in text, filtering out year-like numbers */
export function extractOtpCodes(text: string): string[] {
  const matches = text.match(OTP_PATTERN);
  return matches ? [...new Set(matches)] : [];
}

/** Wraps OTP codes in <span class="otp-highlight"> tags */
export function highlightOtpInHtml(html: string): string {
  return html.replace(
    OTP_PATTERN,
    '<span class="otp-highlight" data-otp="$&" title="Click to copy">$&</span>'
  );
}
