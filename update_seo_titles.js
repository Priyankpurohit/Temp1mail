const fs = require('fs');
const path = require('path');

const seoTitles = {
    'anonymous-email': 'Free Anonymous Email - Untraceable Private Inbox (No Tracking)',
    'burner-email': 'Free Burner Email - Instant Disposable Alias (No Commitment)',
    '10-minute-mail': 'Free 10 Minute Mail - Fast Self-Destructing Inbox (No Signup)',
    'custom-mail': 'Free Custom Temp Mail - Personalized Disposable Prefix (No Strings)',
    'disposable-mail': 'Free Disposable Mail - Instant Junk Deflector (No Registration)',
    'fake-mail': 'Free Fake Email - Quick Alias Generator (No Verification)',
    'free-mail': 'Free Temp Mail - Cost-Free Secure Inbox (No Hidden Fees)',
    'random-mail': 'Free Random Email - Instant Unpredictable Inbox (No Setup)',
    'temp-email': 'Free Temp Email - Clean Spam-Free Inbox (No Logs)',
    'temp-mail-free': 'Free Temp Mail - Instant Secure Inbox (Zero Cost)',
    'tempEmail': 'Free TempEmail Generator - Clean Programmatic Inbox (No Distractions)',
    'temporary-email': 'Free Temporary Email - Instant Disposable Inbox (No Signup)',
    'temporary-mail': 'Free Temporary Mail - Fast Ephemeral Inbox (No Registration)',
    'throwaway-email': 'Free Throwaway Email - Instant Trashable Inbox (No Tracking)',
    'temp-mail-generator': 'Free Temp Mail Generator - Powerful Disposable Engine (No Limits)'
};

for (const [dir, title] of Object.entries(seoTitles)) {
    const layoutPath = path.join(process.cwd(), 'app', dir, 'layout.tsx');
    if (!fs.existsSync(layoutPath)) continue;

    let content = fs.readFileSync(layoutPath, 'utf8');
    
    // Regex safely matches both standard metadata.title and openGraph.title
    content = content.replace(/title:\s*"[^"]*"/g, `title: "${title}"`);
    
    fs.writeFileSync(layoutPath, content);
    console.log(`Updated titles in ${dir}/layout.tsx`);
}
