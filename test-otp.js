const html = `<html><head><style>body { color: #000000; padding: 12px; font-family: "Arial", 16093; }</style></head><body><div id="123456" color="#000000">Your code is 628487. Ignore 2024. Rate 111111!</div><!-- 100000 --></body></html>`;
const text = `Here is your code: 628487. Don't share it. 000000 is my hex.`;

const HTML_TOKENS = /(<style[^>]*>[\s\S]*?<\/style>|<script[^>]*>[\s\S]*?<\/script>|<[^>]*>)|(?<![a-zA-Z0-9\-#_=\/.&+])(?!(?:19|20)\d{2}(?!\d))(\d{4,8})(?![a-zA-Z0-9\-#_=\/&+])/gi;

console.log("HTML Replace:", html.replace(HTML_TOKENS, (match, tag, otp) => {
    if (tag) return tag;
    if (otp) {
        if (/^(\d)\1{3,}$/.test(otp)) return match;
        return `[OTP:${otp}]`;
    }
    return match;
}));

const OTP_PATTERN = /(?<![a-zA-Z0-9\-#_=\/.&+])(?!(?:19|20)\d{2}(?!\d))(\d{4,8})(?![a-zA-Z0-9\-#_=\/&+])/gi;
const matches = text.match(OTP_PATTERN) || [];
const filtered = matches.filter(m => !/^(\d)\1{3,}$/.test(m));
console.log("Text match:", filtered);
