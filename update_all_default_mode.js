const fs = require('fs');
const path = require('path');

const pages = [
    'anonymous-email',
    'burner-email',
    'choice-mail',
    'custom-mail',
    'disposable-mail',
    'fake-mail',
    'free-mail',
    'generate-custom-mail',
    'random-mail',
    'temp-email',
    'temp-mail-free',
    'tempemail',
    'temporary-email',
    'temporary-mail'
];

for (const dir of pages) {
    const pagePath = path.join(__dirname, 'app', dir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, 'utf8');

        // add defaultMode="random" if missing
        if (!content.includes('defaultMode=')) {
            if (content.includes('ctaText=')) {
                content = content.replace(/(ctaText=".*?")/, `$1\n            defaultMode="random"`);
            } else {
                content = content.replace('/>', `    defaultMode="random"\n        />`);
            }
            fs.writeFileSync(pagePath, content);
            console.log(`Updated ${dir} to default to random mode`);
        } else {
            console.log(`${dir} already has defaultMode.`);
        }
    }
}
