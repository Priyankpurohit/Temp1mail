const fs = require('fs');
const path = require('path');

const newHeaders = {
    'anonymous-email': { h: 'Free Anonymous Email', s: 'Untraceable • Secure • Private' },
    'burner-email': { h: 'Free Burner Email', s: 'Instant • Disposable • Unlinked' },
    '10-minute-mail': { h: 'Free 10 Minute Mail', s: 'Fast • Ephemeral • Secure' },
    'custom-mail': { h: 'Custom Temp Mail', s: 'Personalized • Flexible • Private' },
    'disposable-mail': { h: 'Free Disposable Mail', s: 'Fast • Trashable • Clean' },
    'fake-mail': { h: 'Free Fake Email', s: 'Alias • Bypassing • Protected' },
    'free-mail': { h: 'Free Temp Mail', s: 'Cost-free • Unlimited • Secure' },
    'random-mail': { h: 'Free Random Email', s: 'Unpredictable • Hidden • Disposable' },
    'temp-email': { h: 'Free Temp Email', s: 'Temporary • Clean • Private' },
    'temp-mail-free': { h: 'Free Temp Mail', s: 'Free • Temporary • Secure' },
    'tempemail': { h: 'Free TempEmail Inbox', s: 'Instant • Programmatic • Clean' },
    'temporary-email': { h: 'Free Temporary Email', s: 'Instant • Disposable • Private' },
    'temporary-mail': { h: 'Free Temporary Mail', s: 'Fast • Temporary • Secure' },
    'throwaway-email': { h: 'Free Throwaway Email', s: 'Disposable • Untracked • Clean' },
    'temp-mail-generator': { h: 'Temp Mail Generator', s: 'Dynamic • Fast • Disposable' }
};

for (const [dir, data] of Object.entries(newHeaders)) {
    const pagePath = path.join(process.cwd(), 'app', dir, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;

    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Replace the heading and subheading props in the code
    content = content.replace(/heading="[^"]*"/, `heading="${data.h}"`);
    content = content.replace(/subheading="[^"]*"/, `subheading="${data.s}"`);
    
    fs.writeFileSync(pagePath, content);
    console.log(`Updated heading/subheading for ${dir}`);
}
