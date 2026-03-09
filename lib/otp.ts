/**
 * OTP code detection utilities.
 *
 * Targets 4-8 digit codes (the range used by virtually all OTP systems).
 * Excludes common false positives like years (1900-2099) using a
 * negative lookahead/lookbehind approach.
 */

// Pattern: 4-8 digits, excluding years, preventing match if touching letters, dashes, underscores, @, or #
const OTP_PATTERN = /(?<![\w\-@#])(?!(?:19|20)\d{2}(?![\w\-@#]))\d{4,8}(?![\w\-@#])/g;

/** Finds 4-8 digit OTP codes in text, filtering out year-like numbers and repeating digits */
export function extractOtpCodes(text: string): string[] {
  const matches = text.match(OTP_PATTERN);
  if (!matches) return [];
  // Filter out repetitive junk like 000000
  return [...new Set(matches)].filter(m => !/^(\d)\1{3,}$/.test(m));
}

/** Wraps OTP codes in <span class="otp-highlight"> tags, ensuring it avoids altering HTML tags */
export function highlightOtpInHtml(html: string): string {
  // Regex to match HTML tags, style/script blocks, OR our rigorous OTP pattern
  const mixedPattern = /(<style[^>]*>[\s\S]*?<\/style>|<script[^>]*>[\s\S]*?<\/script>|<[^>]+>)|((?<![\w\-@#])(?!(?:19|20)\d{2}(?![\w\-@#]))\d{4,8}(?![\w\-@#]))/gi;

  return html.replace(mixedPattern, (match, tag, otp) => {
    // If we matched an HTML tag or script/style block, return it completely untouched
    if (tag) return tag;

    // If we matched an OTP, verify it's not repetitive junk before wrapping
    if (otp && !/^(\d)\1{3,}$/.test(otp)) {
      return `<span class="otp-highlight" data-otp="${otp}" title="Click to copy">${otp}</span>`;
    }

    return match; // return unmodified string if it was repetitive digits
  });
}
