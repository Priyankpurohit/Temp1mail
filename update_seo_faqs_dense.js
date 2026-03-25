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

for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const pagePath = path.join(process.cwd(), 'app', page.dir, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;

    // ALL 13 other pages to link to
    let otherPages = pages.filter(p => p.dir !== page.dir);
    otherPages = otherPages.sort(() => 0.5 - Math.random()); // Shuffle

    // Distribute 13 links across 5 FAQs (3, 3, 3, 2, 2)
    const links = otherPages.map(p => `<Link href="/${p.dir}" className="text-primary hover:underline">${p.short}</Link>`);

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
                    answer: <>A ${page.short} provides free, instant disposable email addresses. If you need something slightly different, you can also try a ${links[0]}, a ${links[1]}, or a ${links[2]} to sign up for services without registration.</> 
                },
                { 
                    question: "How long does a ${page.short} last?", 
                    answer: <>Each ${page.short} address lasts for 10 minutes from creation. This operates similarly to a ${links[3]}, a ${links[4]}, or a ${links[5]}, automatically and permanently deleting all messages afterwards.</> 
                },
                { 
                    question: "Is this ${page.short} free to use?", 
                    answer: <>Yes, this ${page.short} service is completely free. We also offer other tools like the ${links[6]}, the ${links[7]}, and the ${links[8]} with absolutely no hidden fees and no limits.</> 
                },
                { 
                    question: "Can I choose my own ${page.short} address?", 
                    answer: <>Absolutely! You can type in any custom prefix, or let us generate one for you. For more tailored addresses, consider creating a ${links[9]} or a ${links[10]} for your specific needs.</> 
                },
                { 
                    question: "Why use a ${page.short} instead of my real email?", 
                    answer: <>Using a ${page.short} protects your primary inbox from data leaks and marketing spam. Much like a ${links[11]} or a ${links[12]}, it acts as a reliable shield between your private details and potentially untrustworthy websites.</> 
                }
            ]}
            ctaText="${CTA}"
        />
    );
}
`;
    fs.writeFileSync(pagePath, newContent);
    console.log(`Updated ${page.dir} with 5 FAQs + 13 Links`);
}
