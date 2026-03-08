const fs = require('fs');
const path = require('path');

const pages = [
    { dir: 'anonymous-email', keyword: 'Anonymous Email', short: 'anonymous email' },
    { dir: 'burner-email', keyword: 'Burner Email', short: 'burner email' },
    { dir: 'choice-mail', keyword: 'Choice Mail', short: 'choice mail' },
    { dir: 'custom-mail', keyword: 'Custom Mail', short: 'custom mail' },
    { dir: 'disposable-mail', keyword: 'Disposable Mail', short: 'disposable mail' },
    { dir: 'fake-mail', keyword: 'Fake Mail', short: 'fake mail' },
    { dir: 'free-mail', keyword: 'Free Mail', short: 'free mail' },
    { dir: 'generate-custom-mail', keyword: 'Generate Custom Mail', short: 'custom mail' },
    { dir: 'random-mail', keyword: 'Random Mail', short: 'random mail' },
    { dir: 'temp-email', keyword: 'Temp Email', short: 'temp email' },
    { dir: 'temp-mail-free', keyword: 'Temp Mail Free', short: 'free temp mail' },
    { dir: 'tempemail', keyword: 'Tempemail', short: 'temp email' },
    { dir: 'temporary-email', keyword: 'Temporary Email', short: 'temporary email' },
    { dir: 'temporary-mail', keyword: 'Temporary Mail', short: 'temporary mail' }
];

for (const page of pages) {
    const pagePath = path.join(__dirname, 'app', page.dir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, 'utf8');

        // Determine perfect button label (max 3 words usually "Create [Keyword]")
        let cleanKeyword = page.keyword;
        if (cleanKeyword.toLowerCase().includes('free')) {
            cleanKeyword = cleanKeyword.replace(/^Free\s+/i, '');
        }

        const words = cleanKeyword.split(' ');
        // Keep it exactly 2 to 3 words:
        let suffix = words.slice(0, 2).join(' ');
        let finalLabel = `Create ${suffix}`;

        // Safety check just to make sure it's 2-3 words.
        // "Create" (1) + "Burner Email" (2) = 3 words.

        let updatedContent = content;
        if (content.match(/ctaText="[^"]+"/)) {
            updatedContent = content.replace(/ctaText="[^"]+"/, `ctaText="${finalLabel}"`);
        } else {
            updatedContent = content.replace('/>', `    ctaText="${finalLabel}"\n        />`);
        }

        fs.writeFileSync(pagePath, updatedContent);
        console.log(`Updated ${page.dir} CTA to "${finalLabel}"`);
    }
}
