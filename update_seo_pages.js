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
    { dir: 'tempemail', keyword: 'Temp Email', short: 'temp email' },
    { dir: 'temporary-email', keyword: 'Temporary Email', short: 'temporary email' },
    { dir: 'temporary-mail', keyword: 'Temporary Mail', short: 'temporary mail' },
    { dir: 'throwaway-email', keyword: 'Throwaway Email', short: 'throwaway email' },
    { dir: 'temp-mail-generator', keyword: 'Temp Mail Generator', short: 'temp mail generator' }
];

for (const page of pages) {
    const pagePath = path.join(__dirname, 'app', page.dir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
        let componentName = page.keyword.replace(/\s+/g, '').replace(/^10/, "Ten") + 'Page';
        // Remove "Free" from the heading to make it shorter and generally fit on one line!
        const headingText = page.keyword.replace(/^Free\s+/i, '');

        // Creating text that perfectly matches the required template
        const content = `import { LandingPageTemplate } from "@/components/LandingPageTemplate";

export default function ${componentName}() {
    return (
        <LandingPageTemplate
            heading="${headingText}"
            subheading="Instant • Disposable • Private"
            intro="Free ${page.short} address instantly. No registration, no spam. Your disposable inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Zap", title: "Instant", desc: "Get your email in under 1 second" },
                { icon: "Shield", title: "Private Inbox", desc: "No signup, no tracking, no logs" },
                { icon: "Clock", title: "Auto-Delete", desc: "All emails erased after 10 minutes" }
            ]}
            faqs={[
                { question: "What is a ${page.short}?", answer: "A ${page.short} provides free, instant disposable email addresses. Use them to sign up for services, receive verification codes, or protect your real email from spam - all without registration." },
                { question: "How long does a ${page.short} last?", answer: "Each ${page.short} address lasts for 10 minutes from creation. After that, the mailbox and all emails are automatically and permanently deleted." },
                { question: "Is this ${page.short} free to use?", answer: "Yes, this ${page.short} service is completely free. There are no hidden fees, no premium tiers, and no limits on how many temporary emails you can create." }
            ]}
            ctaText="Create ${page.keyword}"
        />
    );
}
`;
        fs.writeFileSync(pagePath, content);
        console.log(`Updated ${page.dir} with heading "${headingText}"`);
    } else {
        console.log(`Missing ${page.dir}`);
    }
}
