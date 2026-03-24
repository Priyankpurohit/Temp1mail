const fs = require('fs');
const path = require('path');

const newPages = {
    'email-generator': {
        title: 'Free Email Generator - Instant Address Creator (No Limits)',
        heading: 'Free Email Generator',
        subheading: 'Instant • Unlimited • Secure',
        intro: 'Get an email generator instantly. No limits, no spam. Your created inbox auto-deletes after 10 minutes.',
        ctaText: 'Launch Email Generator',
        shortName: 'email generator',
        features: [
            { icon: 'Zap', title: 'On-Demand Addresses', desc: 'Create new inboxes whenever you need them.' },
            { icon: 'Globe', title: 'Domain Rotation', desc: 'We rotate domains to bypass strict blocks.' },
            { icon: 'Shield', title: 'Built to Protect', desc: 'Keep your real email address completely hidden.' }
        ],
        faqs: [
            { q: 'What is an email generator?', a: 'It is a tool that rapidly creates disposable addresses. Similar to our <Link href="/temp-mail-generator" className="text-primary hover:underline">temp mail generator</Link>.' },
            { q: 'How many can I generate?', a: 'Generate as many as you need to stay safe. It acts as a totally <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> tool.' },
            { q: 'Is it completely anonymous?', a: 'Yes! It provides the exact same high-level encryption as our <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.' },
            { q: 'Will the emails look suspicious?', a: 'No, we keep our domains healthy. For customization, see <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>.' },
            { q: 'How fast do messages arrive?', a: 'They typically arrive in under 2 seconds, just like a <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.' }
        ]
    },
    'disposable-inbox': {
        title: 'Free Disposable Inbox - Instant Trashable Email (No Registration)',
        heading: 'Free Disposable Inbox',
        subheading: 'Trashable • Fast • Clean',
        intro: 'Get a disposable inbox instantly. No registration, no spam. Your clean session clears after 10 minutes.',
        ctaText: 'Open Disposable Inbox',
        shortName: 'disposable inbox',
        features: [
            { icon: 'Trash2', title: 'Meant for the Trash', desc: 'Read your code and throw the inbox away.' },
            { icon: 'Mail', title: 'Seamless Receiving', desc: 'Works with almost every major website.' },
            { icon: 'Lock', title: 'Zero Footprint', desc: 'We never keep any history of your sessions.' }
        ],
        faqs: [
            { q: 'What is a disposable inbox?', a: 'It is simply a mailbox you abandon when done, just like a <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link>.' },
            { q: 'Can I reply to messages?', a: 'No, these inboxes are strictly receive-only to prevent spam. Just like our <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link>.' },
            { q: 'Do I need a password?', a: 'Nope! It is completely password-free. It functions flawlessly as a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>.' },
            { q: 'Is this reliable for banking?', a: 'Never use this for banking! Always use a secure real email. Use this for a <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link> scenario only.' },
            { q: 'Does it auto-refresh?', a: 'Yes, incoming messages will just pop up on your screen. Like grabbing a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.' }
        ]
    },
    'temporary-inbox': {
        title: 'Free Temporary Inbox - Fast Ephemeral Mailbox (No Logs)',
        heading: 'Free Temporary Inbox',
        subheading: 'Fast • Ephemeral • Secure',
        intro: 'Access a temporary inbox instantly. No tracking, no spam. Your secure mailbox vaporizes after 10 minutes.',
        ctaText: 'Create Temporary Inbox',
        shortName: 'temporary inbox',
        features: [
            { icon: 'Clock', title: 'Strict Autodelete', desc: 'Self-cleans automatically after exactly ten minutes.' },
            { icon: 'Eye', title: 'Spam Isolation', desc: 'Keep aggressive marketers trapped in a sandbox.' },
            { icon: 'Zap', title: 'Lighting Deliveries', desc: 'Built for speed because waiting is annoying.' }
        ],
        faqs: [
            { q: 'Why do I need a temporary inbox?', a: 'To bypass mandatory signups without risking spam. Use it just like a standard <Link href="/temporary-email" className="text-primary hover:underline">temporary email</Link>.' },
            { q: 'Are there hidden limits?', a: 'No hidden caps. Generate away! Check out our <Link href="/temp-mail-free" className="text-primary hover:underline">temp mail free</Link> offering.' },
            { q: 'Does this cost anything?', a: 'It is completely 100% free of charge. See our <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> features.' },
            { q: 'Can I use a custom name?', a: 'You can edit the prefix before you hit generate, utilizing our <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link> functionality.' },
            { q: 'What happens to the emails?', a: 'They are permanently wiped from the server. Similar to how our <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link> operates.' }
        ]
    },
    'email-for-verification': {
        title: 'Email For Verification - Instant Confirmation Inbox (No Phone)',
        heading: 'Email For Verification',
        subheading: 'Fast • Reliable • Private',
        intro: 'Get an email for verification instantly. No phones, no spam. Your confirmation inbox disappears after 10 minutes.',
        ctaText: 'Get Verification Email',
        shortName: 'email for verification',
        features: [
            { icon: 'Mail', title: 'Catches Confirmations', desc: 'Clicking verification links has never been safer.' },
            { icon: 'Lock', title: 'No Phone Needed', desc: 'Unlike Gmail, we skip the phone verification step.' },
            { icon: 'Shield', title: 'Secure Tunnels', desc: 'Your verification links are entirely encrypted.' }
        ],
        faqs: [
            { q: 'Is this the best way to verify accounts?', a: 'For accounts you care little about, yes. It is the perfect <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link>.' },
            { q: 'Will they know it is a temporary email?', a: 'Some strict websites might, but most will accept it. It is great as a <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>.' },
            { q: 'Is there a delay?', a: 'Verification emails appear almost instantly. Equivalent speed to our <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.' },
            { q: 'Is my data tracked?', a: 'No! We do not log IP addresses or request info, acting dynamically like an <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.' },
            { q: 'Do I get to pick the address?', a: 'You can let it randomize, or type your own. Randomizing acts like a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.' }
        ]
    },
    'email-for-otp': {
        title: 'Email For OTP - Instant Code Catcher (Immediate Delivery)',
        heading: 'Email For OTP',
        subheading: 'Codes • Speed • Access',
        intro: 'Receive an email for OTP instantly. No delays, no spam. Your code catcher self-destructs after 10 minutes.',
        ctaText: 'Catch OTP Instantly',
        shortName: 'email for OTP',
        features: [
            { icon: 'Zap', title: 'Split-Second OTP', desc: 'View 6-digit codes the moment they are sent.' },
            { icon: 'Eye', title: 'Inbox UI', desc: 'Zero distractions, just the verification codes you need.' },
            { icon: 'Trash2', title: 'Auto Shred', desc: 'Your codes are wiped securely so you stay safe.' }
        ],
        faqs: [
            { q: 'What does OTP stand for?', a: 'One Time Password. It is used to quickly confirm access. Useful if testing via a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>.' },
            { q: 'Can I use this instead of SMS?', a: 'If the website offers an email OTP option, absolutely! Works like a fast <Link href="/temp-email" className="text-primary hover:underline">temp email</Link>.' },
            { q: 'Is it safe to get OTPs here?', a: 'Since the inbox deletes itself, nobody else will ever see it. A true <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link>.' },
            { q: 'Can I access this on mobile?', a: 'Yes, our modern UI handles OTP catching perfectly on phones. Similar to the <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link> design.' },
            { q: 'What if the code takes 15 minutes?', a: 'The lifespan is 10 min, so use this for instant sending services like the <Link href="/temp-mail-generator" className="text-primary hover:underline">temp mail generator</Link>.' }
        ]
    }
};

for (const [dir, data] of Object.entries(newPages)) {
    const pageDir = path.join(process.cwd(), 'app', dir);
    if (!fs.existsSync(pageDir)) {
        fs.mkdirSync(pageDir, { recursive: true });
    }

    const componentName = dir.split('-').map(p => p[0].toUpperCase() + p.slice(1)).join('') + 'Page';

    const pageContent = `import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import Link from "next/link";

export default function ${componentName}() {
    return (
        <LandingPageTemplate
            heading="${data.heading}"
            subheading="${data.subheading}"
            intro="${data.intro}"
            features={[
                { icon: "${data.features[0].icon}", title: "${data.features[0].title}", desc: "${data.features[0].desc}" },
                { icon: "${data.features[1].icon}", title: "${data.features[1].title}", desc: "${data.features[1].desc}" },
                { icon: "${data.features[2].icon}", title: "${data.features[2].title}", desc: "${data.features[2].desc}" }
            ]}
            faqs={[
                { 
                    question: "${data.faqs[0].q}", 
                    answer: <>${data.faqs[0].a}</> 
                },
                { 
                    question: "${data.faqs[1].q}", 
                    answer: <>${data.faqs[1].a}</> 
                },
                { 
                    question: "${data.faqs[2].q}", 
                    answer: <>${data.faqs[2].a}</> 
                },
                { 
                    question: "${data.faqs[3].q}", 
                    answer: <>${data.faqs[3].a}</> 
                },
                { 
                    question: "${data.faqs[4].q}", 
                    answer: <>${data.faqs[4].a}</> 
                }
            ]}
            ctaText="${data.ctaText}"
        />
    );
}
`;

    fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent);

    const layoutContent = `import { Metadata } from "next";

export const metadata: Metadata = {
    title: "${data.title}",
    description: "${data.intro}",
    alternates: { canonical: "https://temp1mail.com/${dir}" },
    openGraph: {
        title: "${data.title}",
        description: "${data.intro}",
        url: "https://temp1mail.com/${dir}",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
`;

    fs.writeFileSync(path.join(pageDir, 'layout.tsx'), layoutContent);
    console.log(`Created ${dir}`);
}
