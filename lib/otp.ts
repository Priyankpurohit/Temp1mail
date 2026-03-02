/** Finds 4-8 digit OTP codes in text */
export function extractOtpCodes(text: string): string[] {
  const matches = text.match(/\b\d{4,8}\b/g);
  return matches ? [...new Set(matches)] : [];
}

/** Wraps OTP codes in <span class="otp-highlight"> tags */
export function highlightOtpInHtml(html: string): string {
  return html.replace(
    /\b(\d{4,8})\b/g,
    '<span class="otp-highlight" data-otp="$1" title="Click to copy">$1</span>'
  );
}
