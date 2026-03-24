const fs = require('fs');
const path = require('path');

const pagesData = {
    'anonymous-email': {
        heading: 'Anonymous Email',
        subheading: 'Untraceable • Secure • Private',
        intro: 'Protect your real identity online. Generate an anonymous email address that requires absolutely no personal information to set up. Ideal for stealthy signups and keeping your data hidden.',
        ctaText: 'Get Anonymous Mail',
        features: [
            { icon: 'Eye', title: 'Zero Tracking', desc: 'No logs, no cookies tracking your activity.' },
            { icon: 'UserX', title: 'No Registration', desc: 'We never ask for your name or phone number.' },
            { icon: 'Lock', title: 'Encrypted Routing', desc: 'Your inbox is securely isolated from the public.' }
        ],
        faqs: [
            { q: 'Is this truly anonymous?', a: 'Yes. We do not require any personal details, IPs are not permanently logged, and the inbox cannot be traced back to you. For a different flavor of privacy, you can also explore our <Link href="/burner-email" className="text-primary hover:underline">burner email</Link> tool.' },
            { q: 'Can I send emails from this address?', a: 'To prevent spam abuse, our anonymous inboxes are currently receive-only. If you need a quick inbox, try a <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.' },
            { q: 'Will my data be sold?', a: 'Never. We operate a completely free service without selling data, much like our <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> alternative.' },
            { q: 'How long until messages disappear?', a: 'Messages are wiped after 10 minutes to ensure your footprint remains zero. Need something quick? Use our <Link href="/temp-mail-generator" className="text-primary hover:underline">temp mail generator</Link>.' },
            { q: 'Why use this instead of Gmail or Outlook?', a: 'Big providers require phone numbers and track your usage. This service acts as a true shield, functioning similarly to a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>.' }
        ]
    },
    'burner-email': {
        heading: 'Burner Email',
        subheading: 'Use Once • Discard • Stay Clean',
        intro: 'Keep your primary inbox pristine. Create a burner email for shady websites, mandatory subscriptions, or one-off verification codes, then toss it away like it never existed.',
        ctaText: 'Create Burner',
        features: [
            { icon: 'Trash2', title: 'Toss It Away', desc: 'Abandon the inbox anytime with zero consequence.' },
            { icon: 'Shield', title: 'Spam Deflector', desc: 'Catches junk mail so your real inbox does not have to.' },
            { icon: 'Zap', title: 'On-Demand', desc: 'Spin up a new burner in milliseconds.' }
        ],
        faqs: [
            { q: 'What is a burner email?', a: 'It is a temporary address designed to be used exactly once and then abandoned. It is similar to a <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link>.' },
            { q: 'Do I need a password for my burner?', a: 'No passwords needed. Just generate it and read. If you want something specific, you can build a <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>.' },
            { q: 'Can a burner address be recovered?', a: 'Once it expires or you close the session, it is gone forever. This is par for the course for any <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link>.' },
            { q: 'Should I use this for my bank account?', a: 'Absolutely not. Burners should only be used for untrusted sites. For general quick testing, consider a <Link href="/temp-email" className="text-primary hover:underline">temp email</Link>.' },
            { q: 'Is there a limit on how many I can use?', a: 'There are no limits. Generate as many as you need, just like with our <Link href="/temp-mail-free" className="text-primary hover:underline">free temp mail</Link>.' }
        ]
    },
    '10-minute-mail': {
        heading: '10 Minute Mail',
        subheading: 'Lightning Fast • Self-Destructing',
        intro: 'Get a temporary email that self-destructs in exactly 10 minutes. Perfect for quick verifications, rapid account signups, and dodging aggressive marketing newsletters.',
        ctaText: 'Start 10 Minute Timer',
        features: [
            { icon: 'Clock', title: '10-Min Timer', desc: 'Inbox automatically vaporizes after 600 seconds.' },
            { icon: 'Mail', title: 'Instant Receiving', desc: 'Emails appear the second they hit our servers.' },
            { icon: 'Globe', title: 'Universal Access', desc: 'Works seamlessly across all modern browsers.' }
        ],
        faqs: [
            { q: 'Why exactly 10 minutes?', a: 'Ten minutes is the optimal time for a verification email to arrive while still ensuring the inbox does not linger. If you want total unpredictability, use a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.' },
            { q: 'Can I extend the timer?', a: 'Currently, the timer is fixed to ensure high turnover and security, similar to a <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link>.' },
            { q: 'What happens to the emails after 10 minutes?', a: 'They are permanently wiped from our physical servers. Just like our <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>, we leave no trace.' },
            { q: 'Does it autorefresh?', a: 'Yes, the inbox automatically checks for new messages. You can also try our <Link href="/tempEmail" className="text-primary hover:underline">temp email</Link> for an alternative view.' },
            { q: 'Is it completely free?', a: 'Yes, 100% free with no catches. You might also like our <Link href="/temp-mail-free" className="text-primary hover:underline">temp mail free</Link> option.' }
        ]
    },
    'custom-mail': {
        heading: 'Custom Temp Mail',
        subheading: 'Your Name • Your Prefix • Your Rules',
        intro: 'Do not settle for random gibberish. Pick your exact preferred email prefix for a more professional-looking temporary address that bypasses strict spam filters.',
        ctaText: 'Choose Custom Prefix',
        features: [
            { icon: 'Sparkles', title: 'Personalized', desc: 'Type any name to create your ideal inbox.' },
            { icon: 'Shield', title: 'Filter Bypass', desc: 'Custom terms look more credible to strict websites.' },
            { icon: 'Lock', title: 'Still Private', desc: 'Even with a custom name, your identity is hidden.' }
        ],
        faqs: [
            { q: 'How do I pick a custom prefix?', a: 'Just type your desired name into the box, and if it is available, it is yours. If you do not care about the name, try a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.' },
            { q: 'Are custom emails more secure?', a: 'They offer exactly the same high-level encryption as our <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.' },
            { q: 'Can someone else guess my custom inbox?', a: 'If you pick something common like "admin", possibly. We recommend unique strings, or just using a <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>.' },
            { q: 'Does this cost money?', a: 'No, customizing your prefix is as free as our standard <Link href="/free-mail" className="text-primary hover:underline">free mail</Link>.' },
            { q: 'How long does my custom name last?', a: 'The same 10-minute lifespan applies to keep the system fast, just like a <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.' }
        ]
    },
    'disposable-mail': {
        heading: 'Disposable Mail',
        subheading: 'Generate • Verify • Dispose',
        intro: 'Stop handing out your real contact information. Use our disposable mail service to intercept unwanted junk and protect yourself from phishing attempts.',
        ctaText: 'Get Disposable Mail',
        features: [
            { icon: 'Trash2', title: 'True Disposability', desc: 'Designed to be thrown away without a second thought.' },
            { icon: 'Zap', title: 'Zero Friction', desc: 'No complex setups, just a ready-to-use inbox.' },
            { icon: 'Eye', title: 'Anti-Phishing', desc: 'Filter out malicious links before they hit your real email.' }
        ],
        faqs: [
            { q: 'Why are disposable emails important?', a: 'They act as a firewall against the constant threat of spam. For a similarly structured option, look at <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link>.' },
            { q: 'Do disposable addresses look suspicious?', a: 'Some sites block known temporary domains, but we frequently cycle ours to maintain high delivery rates. A <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link> can also help bypass filters.' },
            { q: 'Is registration required?', a: 'Absolutely not. This is a frictionless service like our <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>.' },
            { q: 'What happens if I accidentally close the tab?', a: 'The session ends and the inbox is deleted immediately. If you need something persistent, do not use a <Link href="/temporary-email" className="text-primary hover:underline">temporary email</Link>.' },
            { q: 'Can I reply to messages?', a: 'Disposable inboxes here are for receiving only. Check our <Link href="/temp-mail-generator" className="text-primary hover:underline">temp mail generator</Link> for more details.' }
        ]
    },
    'fake-mail': {
        heading: 'Fake Email Generator',
        subheading: 'Bypass Forms • Test Apps • No Spam',
        intro: 'Need an email just to get past a gated content form or to test your own app? Generate a functional fake email that acts real but keeps your real inbox pristine.',
        ctaText: 'Generate Fake Mail',
        features: [
            { icon: 'UserX', title: 'Alias Creation', desc: 'Act as a completely different user instantly.' },
            { icon: 'Clock', title: 'Rapid Testing', desc: 'QA testers love the speed of our inbox delivery.' },
            { icon: 'Shield', title: 'Inbox Defense', desc: 'Never give marketers your true contact info.' }
        ],
        faqs: [
            { q: 'Is a fake email illegal?', a: 'Using a temporary alias to avoid spam is perfectly legal and encouraged for privacy. It is synonymous with an <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.' },
            { q: 'Will websites know it is fake?', a: 'It functions exactly like a real inbox, successfully receiving confirmation links. If you want a random string, check out <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.' },
            { q: 'Can I use this for social media accounts?', a: 'Yes, but remember you will lose access to password resets. For quick signups, a <Link href="/burner-email" className="text-primary hover:underline">burner email</Link> works great.' },
            { q: 'Are fake emails free?', a: 'Yes, completely free. You can also visit our <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> portal.' },
            { q: 'How fast do emails arrive?', a: 'Typically within 1-2 seconds, exactly like our <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.' }
        ]
    },
    'free-mail': {
        heading: 'Free Temp Mail',
        subheading: 'No Costs • No Limits • No Worries',
        intro: 'Why pay for premium burner services? Get absolute, unrestricted access to disposable inboxes at absolutely zero cost. Premium privacy without the premium price tag.',
        ctaText: 'Get Free Mail',
        features: [
            { icon: 'Sparkles', title: '100% Free', desc: 'No paywalls, no premium tiers, no credit cards.' },
            { icon: 'Globe', title: 'Unlimited Uses', desc: 'Generate as many addresses as you desire.' },
            { icon: 'Lock', title: 'Enterprise Security', desc: 'Top-tier encryption provided completely free of charge.' }
        ],
        faqs: [
            { q: 'How is this service completely free?', a: 'We believe privacy is a human right, so we subsidize costs through minimal, unobtrusive ads. It is similar to our <Link href="/temp-mail-free" className="text-primary hover:underline">temp mail free</Link> offering.' },
            { q: 'Are there hidden limits?', a: 'No hidden caps. Generate away! For a more specialized tool, try the <Link href="/temp-mail-generator" className="text-primary hover:underline">temp mail generator</Link>.' },
            { q: 'Is free mail secure?', a: 'We use the same robust security as paid tools, heavily inspired by <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link> standards.' },
            { q: 'Do I get a custom domain?', a: 'We cycle multiple domains to ensure deliverability. You can pick your prefix using <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>.' },
            { q: 'Can I use this on my phone?', a: 'Yes, our interface is perfectly responsive for mobile, just like a <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link>.' }
        ]
    },
    'random-mail': {
        heading: 'Random Email',
        subheading: 'Unpredictable • Secure • Effortless',
        intro: 'Let our algorithm do the work. Instantly conjure an entirely random, cryptic email address that is impossible to guess and perfect for immediate, unlinked registrations.',
        ctaText: 'Generate Random Mail',
        features: [
            { icon: 'Zap', title: 'One-Click Magic', desc: 'No typing needed. Just click and copy.' },
            { icon: 'Shield', title: 'Unguessable', desc: 'Complex strings offer natural defense against scrapers.' },
            { icon: 'Trash2', title: 'Easy Disposal', desc: 'Toss out the random string when you finish.' }
        ],
        faqs: [
            { q: 'Why use a random email?', a: 'It saves time thinking of a name and offers maximum obfuscation. If you prefer choosing, try <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>.' },
            { q: 'Are the domains random too?', a: 'We rotate through several trusted domains to keep the service highly reliable, much like a <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link>.' },
            { q: 'Can I regenerate a new one instantly?', a: 'Yes, just click perfectly frictionless buttons. If you want a fresh start, you can use a <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>.' },
            { q: 'Is this meant for long-term use?', a: 'No, random addresses are highly ephemeral. For a straightforward temp approach, see <Link href="/temp-email" className="text-primary hover:underline">temp email</Link>.' },
            { q: 'Does it auto-delete?', a: 'Messages are wiped after a short duration, functioning exactly like a <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.' }
        ]
    },
    'temp-email': {
        heading: 'Temporary Email',
        subheading: 'Your Shield Against Spam',
        intro: 'The definitive solution to cluttered inboxes. Generate a temporary email in seconds, verify your accounts, read the incoming mail, and let the inbox silently expire.',
        ctaText: 'Create Temp Email',
        features: [
            { icon: 'Shield', title: 'Block Spam', desc: 'Keep promotional junk out of your personal life.' },
            { icon: 'Clock', title: 'Auto-Expiring', desc: 'Addresses vanish gracefully after their brief lifespan.' },
            { icon: 'Zap', title: 'No Delays', desc: 'We pride ourselves on split-second email delivery.' }
        ],
        faqs: [
            { q: 'What is a temporary email?', a: 'It is a transitional mailbox that exists only long enough to serve an immediate need, otherwise known as a <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link>.' },
            { q: 'Why should I not use my Gmail?', a: 'Using real emails invites data brokers to profile you. Using this is much safer, like an <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.' },
            { q: 'How do I check my messages?', a: 'They appear automatically on your screen. You can also view them via our <Link href="/tempEmail" className="text-primary hover:underline">temp email</Link> variant page.' },
            { q: 'Is there a cost involved?', a: 'No, this is absolutely free. For more details, see our <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> feature.' },
            { q: 'Can I do a custom name?', a: 'Yes, you can edit the prefix before hitting generate, which is our <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link> functionality.' }
        ]
    },
    'temp-mail-free': {
        heading: 'Free Temp Mail',
        subheading: 'Cost-Free Privacy Protection',
        intro: 'Gain complete control over your digital footprint without opening your wallet. This free temp mail service provides robust inbox isolation for modern internet users.',
        ctaText: 'Access Free Inbox',
        features: [
            { icon: 'Sparkles', title: 'Zero Fees', desc: 'Always free, never any surprise charges.' },
            { icon: 'Lock', title: 'Secure Environment', desc: 'Your temporary sessions are protected by TLS.' },
            { icon: 'Trash2', title: 'Self-Cleaning', desc: 'We do the cleanup so you do not have to.' }
        ],
        faqs: [
            { q: 'How does this differ from regular temporary mail?', a: 'It emphasizes our commitment to remaining an unpaid service, distinct from premium-only competitors. It is a sibling to our <Link href="/free-mail" className="text-primary hover:underline">free mail</Link>.' },
            { q: 'Are my emails read by administrators?', a: 'No, our system is automated and wipes data automatically. It is a true <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.' },
            { q: 'Can I use this for software trials?', a: 'Perfectly suited for it! Software trials are the primary use case for a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>.' },
            { q: 'What happens to attachments?', a: 'Attachments are safely processed and subsequently deleted just like the text. Works seamlessly like our <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link>.' },
            { q: 'Is it mobile friendly?', a: 'Absolutely, the UI scales down perfectly, much like using a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link> on your phone.' }
        ]
    },
    'tempEmail': {
        heading: 'TempEmail Generator',
        subheading: 'Quick • Programmatic • Clean',
        intro: 'Built for efficiency. Need a rapid, no-nonsense TempEmail? Our raw generator engine skips the bloat and delivers inbox access at the speed of thought.',
        ctaText: 'Initialize TempEmail',
        features: [
            { icon: 'Zap', title: 'High Performance', desc: 'Optimized routing for immediate message receipt.' },
            { icon: 'Eye', title: 'No Distractions', desc: 'A clean UI focused purely on your incoming messages.' },
            { icon: 'Globe', title: 'Global Edge Routing', desc: 'Ensures your emails traverse the web fastest.' }
        ],
        faqs: [
            { q: 'Why choose TempEmail?', a: 'This is the fastest path to a fresh inbox, catered to users who want no fluff. If you prefer a distinct name, explore <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>.' },
            { q: 'Is this the same as 10-minute mail?', a: 'Yes, the underlying engine relies on similar timeouts. You can check the <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link> page for specifics.' },
            { q: 'Can I script against this?', a: 'While we do not offer a public API, the UI is hyper-responsive. For testing suites, a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link> works best.' },
            { q: 'How reliable is the domain?', a: 'We use high-reputation domains to avoid aggressive spam lists, acting as a high-tier <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>.' },
            { q: 'Are there any usage limits?', a: 'Refresh and generate as often as needed, just like our <Link href="/temporary-email" className="text-primary hover:underline">temporary email</Link>.' }
        ]
    },
    'temporary-email': {
        heading: 'Temporary Email Address',
        subheading: 'Stop Spam • Keep Privacy',
        intro: 'A reliable, robust temporary email address that stands between your essential accounts and the vast ocean of internet spam. Generate, verify, and walk away clean.',
        ctaText: 'Get Temporary Email',
        features: [
            { icon: 'Shield', title: 'Inbox Firewall', desc: 'Blocks annoying newsletters and data brokers.' },
            { icon: 'Trash2', title: 'Automated Deletion', desc: 'We take out the trash so your servers stay clean.' },
            { icon: 'Lock', title: 'Total Anonymity', desc: 'No one will ever know it was you.' }
        ],
        faqs: [
            { q: 'What defines a temporary email?', a: 'It is a volatile mailbox that provides utility for a short period. Simply put, it is a <Link href="/temporary-mail" className="text-primary hover:underline">temporary mail</Link>.' },
            { q: 'Why is this better than giving my real address?', a: 'Your real address is a permanent identifier. This is a mask. For ultimate masking, use an <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.' },
            { q: 'Can I trust this with bank details?', a: 'Never use temporary services for critical accounts. They are meant to be a <Link href="/throwaway-email" className="text-primary hover:underline">throwaway email</Link>.' },
            { q: 'Is the service continually free?', a: 'Yes, completely free of charge. See our <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> for our pricing philosophy.' },
            { q: 'How difficult is it to use?', a: 'Literally one click. As easy as generating a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.' }
        ]
    },
    'temporary-mail': {
        heading: 'Temporary Mail Inbox',
        subheading: 'Fast • Secure • Volatile',
        intro: 'Shield yourself from unwanted subscriptions. With our temporary mail service, you can easily bypass registration paywalls and maintain a totally clutter-free personal inbox.',
        ctaText: 'Open Temporary Mail',
        features: [
            { icon: 'Clock', title: 'Time-Limited', desc: 'Ensures no lingering digital footprints exist.' },
            { icon: 'Mail', title: 'Flawless Parsing', desc: 'Renders HTML emails beautifully and securely.' },
            { icon: 'UserX', title: 'No Strings Attached', desc: 'Leave whenever you want without deregistering.' }
        ],
        faqs: [
            { q: 'Is temporary mail different from temporary email?', a: 'They are exactly identical in function, just different phrasing! You can also refer to it as a <Link href="/temp-email" className="text-primary hover:underline">temp email</Link>.' },
            { q: 'Will I get spam here?', a: 'You will receive the spam intended for your real inbox, and then it gets deleted! That is the beauty of a <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link>.' },
            { q: 'How do I generate one?', a: 'Click the button above. For a specific name, use our <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link>.' },
            { q: 'Can I keep it forever?', a: 'No, these addresses are inherently temporary, much like a <Link href="/10-minute-mail" className="text-primary hover:underline">10 minute mail</Link>.' },
            { q: 'Who runs this service?', a: 'Privacy advocates who believe in <Link href="/temp-mail-free" className="text-primary hover:underline">free temp mail</Link> for everyone.' }
        ]
    },
    'throwaway-email': {
        heading: 'Throwaway Email',
        subheading: 'Use • Abuse • Discard',
        intro: 'Do not value the website you are signing up for? Then do not give them your valuable email. Use a throwaway email to catch their verification code and never look back.',
        ctaText: 'Create Throwaway',
        features: [
            { icon: 'Trash2', title: 'Meant to be Dumped', desc: 'The ultimate zero-commitment relationship.' },
            { icon: 'Zap', title: 'Instant Activation', desc: 'No waiting for servers to provision your inbox.' },
            { icon: 'Lock', title: 'Untraceable', desc: 'Severely limits the reach of data aggregators.' }
        ],
        faqs: [
            { q: 'What exactly makes it a throwaway?', a: 'The intention behind it. You plan to abandon it immediately, just like a <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>.' },
            { q: 'Can I recover a thrown-away email?', a: 'Once the session expires, the data is shredded. If you need recovery, a <Link href="/temporary-email" className="text-primary hover:underline">temporary email</Link> is not what you want.' },
            { q: 'Is this good for downloading free ebooks?', a: 'Yes! It is the perfect use case. It functions flawlessly as a <Link href="/fake-mail" className="text-primary hover:underline">fake mail</Link>.' },
            { q: 'Do I need to delete it myself?', a: 'No, it auto-deletes, saving you time. This is standard <Link href="/disposable-mail" className="text-primary hover:underline">disposable mail</Link> behavior.' },
            { q: 'Is it hard to set up?', a: 'It requires absolutely zero setup. Just like picking a <Link href="/random-mail" className="text-primary hover:underline">random mail</Link>.' }
        ]
    },
    'temp-mail-generator': {
        heading: 'Temp Mail Generator',
        subheading: 'The Ultimate Inbox Creation Tool',
        intro: 'Take control of your temporary accounts. Our advanced temp mail generator allows you to spin up secure, disposable inboxes on command with unparalleled ease and speed.',
        ctaText: 'Launch Generator',
        features: [
            { icon: 'Sparkles', title: 'Powerful Engine', desc: 'Generate high-quality addresses that bypass blocks.' },
            { icon: 'Eye', title: 'Live Inbox', desc: 'Watch your verification codes arrive in real-time.' },
            { icon: 'Globe', title: 'Dynamic Domains', desc: 'We rotate domains to keep the generator effective.' }
        ],
        faqs: [
            { q: 'How does the generator work?', a: 'It dynamically assigns an alias on our mail servers routing to your active browser session. If you want to dive in, use the <Link href="/tempEmail" className="text-primary hover:underline">temp email</Link> page.' },
            { q: 'Can I customize the generated mail?', a: 'Yes! Our generator supports custom prefixes. Explore the <Link href="/custom-mail" className="text-primary hover:underline">custom mail</Link> feature.' },
            { q: 'Are generated emails truly anonymous?', a: 'They are routed without retaining personal identifiers, making them an excellent <Link href="/anonymous-email" className="text-primary hover:underline">anonymous email</Link>.' },
            { q: 'What happens if I generate too many?', a: 'There are no strict limits for fair personal use. It acts as a totally <Link href="/free-mail" className="text-primary hover:underline">free mail</Link> tool.' },
            { q: 'Why not just use a burner?', a: 'They are functionally the same! Our generator is how you create your <Link href="/burner-email" className="text-primary hover:underline">burner email</Link>.' }
        ]
    }
};

for (const [dir, data] of Object.entries(pagesData)) {
    const pagePath = path.join(process.cwd(), 'app', dir, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
        console.log('Skipping', dir);
        continue;
    }

    let componentName = data.heading.replace(/[- ]+/g, '').replace(/^10/, 'Ten') + 'Page';

    let newContent = `import { LandingPageTemplate } from "@/components/LandingPageTemplate";
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
    fs.writeFileSync(pagePath, newContent);
    console.log(`✅ Updated ${dir} with UNIQUE intent.`);
}
