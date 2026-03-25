const fs = require('fs');
const path = require('path');

const newIntros = {
    'anonymous-email': 'Get an anonymous email address instantly. No tracking, no logs. Your private inbox vanishes after 10 minutes.',
    'burner-email': 'Create a burner email address instantly. No commitments, no spam. Your disposable inbox vaporizes after 10 minutes.',
    '10-minute-mail': 'Start a 10 minute mail instantly. No signups, no delays. Your temporary inbox self-destructs after 10 minutes.',
    'custom-mail': 'Build a custom mail address instantly. No forms, no limits. Your personalized inbox auto-deletes after 10 minutes.',
    'disposable-mail': 'Launch a disposable mail address instantly. No passwords, no spam. Your temporary inbox disappears after 10 minutes.',
    'fake-mail': 'Generate a fake email address instantly. No real info, no spam. Your alias inbox clears after 10 minutes.',
    'free-mail': 'Access your free mail address instantly. No payments, no spam. Your cost-free inbox auto-deletes after 10 minutes.',
    'random-mail': 'Spin up a random mail instantly. No typing, no spam. Your unpredictable inbox wipes clean after 10 minutes.',
    'temp-email': 'Grab a temp email address instantly. No registration, no spam. Your temporary inbox auto-deletes after 10 minutes.',
    'temp-mail-free': 'Open your free temp mail instantly. No charges, no spam. Your protected inbox auto-deletes after 10 minutes.',
    'tempemail': 'Deploy a fast TempEmail address instantly. No fuss, no spam. Your dynamic inbox auto-deletes after 10 minutes.',
    'temporary-email': 'Get a temporary email address instantly. No registration, no spam. Your secure inbox auto-deletes after 10 minutes.',
    'temporary-mail': 'Create a temporary mail address instantly. No subscriptions, no spam. Your clean inbox auto-deletes after 10 minutes.',
    'throwaway-email': 'Make a throwaway email address instantly. No tracking, no spam. Your dumped inbox auto-deletes after 10 minutes.',
    'temp-mail-generator': 'Use the temp mail generator instantly. No limits, no spam. Your generated inbox auto-deletes after 10 minutes.'
};

for (const [dir, intro] of Object.entries(newIntros)) {
    const pagePath = path.join(process.cwd(), 'app', dir, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;

    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Replace the intro prop in the code
    content = content.replace(/intro="[^"]*"/, `intro="${intro}"`);
    
    fs.writeFileSync(pagePath, content);
    console.log(`Updated intro for ${dir}`);
}
