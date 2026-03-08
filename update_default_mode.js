const fs = require('fs');
const path = require('path');

const targetDirs = [
    'anonymous-email',
    'fake-mail',
    'disposable-mail',
    'burner-email',
    'random-mail'
];

targetDirs.forEach(dir => {
    const pagePath = path.join(__dirname, 'app', dir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, 'utf8');

        // Only inject defaultMode if it doesn't exist
        if (!content.includes('defaultMode=')) {
            // Find where we define ctaText, plug it directly after it.
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
    } else {
        console.log(`Missing ${dir}`);
    }
});
