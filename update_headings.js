const fs = require('fs');
const path = require('path');

const pages = [
    { dir: 'anonymous-email', keyword: 'Anonymous Email', short: 'anonymous email' },
    { dir: 'burner-email', keyword: 'Burner Email', short: 'burner email' },
    { dir: '10-minute-mail', keyword: '10 Minute Mail', short: '10 minute mail' },
    { dir: 'custom-mail', keyword: 'Custom Mail', short: 'custom mail' },
    { dir: 'disposable-mail', keyword: 'Disposable Mail', short: 'disposable mail' },
    { dir: 'fake-mail', keyword: 'Fake Mail', short: 'fake mail' },
    { dir: 'free-mail', keyword: 'Free Mail', short: 'free mail' },
    { dir: 'random-mail', keyword: 'Random Mail', short: 'random mail' },
    { dir: 'temp-email', keyword: 'Temp Email', short: 'temp email' },
    { dir: 'temp-mail-free', keyword: 'Temp Mail Free', short: 'free temp mail' },
    { dir: 'tempEmail', keyword: 'Temp Email', short: 'temp email' },
    { dir: 'temporary-email', keyword: 'Temporary Email', short: 'temporary email' },
    { dir: 'temporary-mail', keyword: 'Temporary Mail', short: 'temporary mail' },
    { dir: 'throwaway-email', keyword: 'Throwaway Email', short: 'throwaway email' },
    { dir: 'temp-mail-generator', keyword: 'Temp Mail Generator', short: 'temp mail generator' }
];

for (const page of pages) {
    const pagePath = path.join(__dirname, 'app', page.dir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, 'utf8');

        // Logic to ensure heading is 2-3 words
        let finalHeading = page.keyword;

        // Try stripping "Free " if it exists
        let stripped = page.keyword.replace(/^Free\s+/i, '');
        let strippedWords = stripped.split(' ').filter(w => w.trim().length > 0);

        // If stripping "Free" leaves us with 2 or more words, we keep the clean stripped version
        // If it leaves us with 1 word (like "Free Mail" -> "Mail"), we DO NOT strip it, so finalHeading remains "Free Mail".
        if (strippedWords.length >= 2) {
            finalHeading = stripped;
        }

        // If the keyword itself is 1 word (like "Tempemail"), let's prepend "Free " to make it "Free Tempemail"
        if (finalHeading.split(' ').filter(w => w.trim().length > 0).length === 1) {
            // e.g., "Tempemail" turns into "Free Tempemail"
            // Also helps if somehow we ended up with 1 word, we secure a minimum of 2.
            finalHeading = 'Free ' + finalHeading;
        }

        content = content.replace(/heading="[^"]+"/, `heading="${finalHeading}"`);
        fs.writeFileSync(pagePath, content);
        console.log(`Updated ${page.dir} heading to "${finalHeading}"`);
    }
}
