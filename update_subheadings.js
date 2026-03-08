const fs = require('fs');
const path = require('path');

// Dictionary mapping each SEO URL's directory to its custom, relevant subheading
// All guaranteed to be max 33 characters and contain 2 or 3 words/phrases
const pageSubheadings = {
    'anonymous-email': 'Anonymous • Private • Secure',    // 28 chars
    'burner-email': 'Burner • Fast • Disposable',         // 26 chars
    'choice-mail': 'Choice • Custom • Secure',            // 24 chars
    'custom-mail': 'Custom • Personal • Secure',          // 26 chars
    'disposable-mail': 'Disposable • Fast • Secure',      // 26 chars
    'fake-mail': 'Fake • Throwaway • Secure',             // 25 chars
    'free-mail': 'Free • Instant • Secure',               // 23 chars
    'generate-custom-mail': 'Custom • Fast • Secure',     // 22 chars
    'random-mail': 'Random • Instant • Free',             // 23 chars
    'temp-email': 'Temp • Disposable • Fast',             // 24 chars
    'temp-mail-free': 'Free • Temp • Instant',            // 21 chars
    'tempEmail': 'Temp • Fast • Secure',                  // 20 chars
    'temporary-email': 'Temporary • Fast • Secure',       // 25 chars
    'temporary-mail': 'Temporary • Quick • Private'       // 27 chars
};

for (const [dir, subheading] of Object.entries(pageSubheadings)) {
    const pagePath = path.join(process.cwd(), 'app', dir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, 'utf8');
        // Update the subheading prop in the LandingPageTemplate instantiation
        content = content.replace(/subheading="[^"]+"/, `subheading="${subheading}"`);
        fs.writeFileSync(pagePath, content);
        console.log(`Updated ${dir} subheading to "${subheading}" (length: ${subheading.length})`);
    } else {
        console.log(`Skipping ${dir} - not found`);
    }
}
