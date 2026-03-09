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

for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const pagePath = path.join(process.cwd(), 'app', page.dir, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
        console.log('Skipping', page.dir);
        continue;
    }

    // Pick 5 other pages to link to
    let otherPages = pages.filter(p => p.dir !== page.dir);
    otherPages = otherPages.sort(() => 0.5 - Math.random()).slice(0, 5);

    let ctaContent = page.keyword;
    if (ctaContent.toLowerCase().includes('free')) {
        ctaContent = ctaContent.replace(/^Free\s+/i, '');
    }
    const CTA = 'Create ' + ctaContent.split(' ').slice(0, 2).join(' ');

    let componentName = page.keyword.replace(/\s+/g, '').replace(/^10/, "Ten") + 'Page';

    let newContent = `import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function ${componentName}() {
    return (
        <LandingPageTemplate
            heading="${page.keyword.replace(/^Free\s+/i, '')}"
            subheading="Instant • Disposable • Private"
            intro="Free ${page.short} address instantly. No registration, no spam. Your disposable inbox auto-deletes after 10 minutes."
            features={[
                { icon: "Zap", title: "Instant", desc: "Get your email in under 1 second" },
                { icon: "Shield", title: "Private Inbox", desc: "No signup, no tracking, no logs" },
                { icon: "Clock", title: "Auto-Delete", desc: "All emails erased after 10 minutes" }
            ]}
            faqs={[
                { 
                    question: "What is a ${page.short}?", 
                    answer: <>A ${page.short} provides free, instant disposable email addresses. If you need something slightly different, you can also try a <Link href="/${otherPages[0].dir}" className="text-primary hover:underline">${otherPages[0].short}</Link> to sign up for services without registration.</> 
                },
                { 
                    question: "How long does a ${page.short} last?", 
                    answer: <>Each ${page.short} address lasts for 10 minutes from creation. This is very similar to how a <Link href="/${otherPages[1].dir}" className="text-primary hover:underline">${otherPages[1].short}</Link> operates, automatically and permanently deleting all messages afterwards.</> 
                },
                { 
                    question: "Is this ${page.short} free to use?", 
                    answer: <>Yes, this ${page.short} service is completely free. We also offer tools like the <Link href="/${otherPages[2].dir}" className="text-primary hover:underline">${otherPages[2].short}</Link> with no hidden fees and no limits on how many you can create.</> 
                },
                { 
                    question: "Can I choose my own ${page.short} address?", 
                    answer: <>Absolutely! You can type in any custom prefix, or let us generate one for you. For more tailored addresses, consider creating a <Link href="/${otherPages[3].dir}" className="text-primary hover:underline">${otherPages[3].short}</Link> for your specific needs.</> 
                },
                { 
                    question: "Why use a ${page.short} instead of my real email?", 
                    answer: <>Using a ${page.short} protects your primary inbox from data leaks and marketing spam. Much like a <Link href="/${otherPages[4].dir}" className="text-primary hover:underline">${otherPages[4].short}</Link>, it acts as a shield between your private details and potentially untrustworthy websites.</> 
                }
            ]}
            ctaText="${CTA}"
        />
    );
}
`;
    fs.writeFileSync(pagePath, newContent);
    console.log(`Updated ${page.dir} with 5 FAQs + Links`);
}
