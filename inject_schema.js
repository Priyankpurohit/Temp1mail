const fs = require('fs');
const path = require('path');

const templatePath = path.join('components', 'LandingPageTemplate.tsx');
let templateContent = fs.readFileSync(templatePath, 'utf8');

// Add schemaAnswer to type
templateContent = templateContent.replace(
`export interface LandingFAQ {
    question: string;
    answer: ReactNode;
}`,
`export interface LandingFAQ {
    question: string;
    answer: ReactNode;
    schemaAnswer?: string;
}`
);

const scriptToInject = `
            {faqs.some(f => f.schemaAnswer) && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: faqs.map((f) => ({
                                "@type": "Question",
                                name: f.question,
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: f.schemaAnswer || "",
                                },
                            })),
                        }),
                    }}
                />
            )}
`;
templateContent = templateContent.replace(
`            {/* Animated gradient background */}`,
`            {/* FAQ Schema Injector */}` + scriptToInject + `            {/* Animated gradient background */}`
);

fs.writeFileSync(templatePath, templateContent);

const appDir = path.join(process.cwd(), 'app');
const dirs = fs.readdirSync(appDir).filter(f => fs.statSync(path.join(appDir, f)).isDirectory());

let updatedCount = 0;
for (const dir of dirs) {
    const pagePath = path.join(appDir, dir, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;

    let content = fs.readFileSync(pagePath, 'utf8');
    
    if (content.includes('schemaAnswer:')) continue;

    let modified = content.replace(/(question:\s*"[^"]*",\s*answer:\s*<>(.*?)<\/>)/g, (match, p1, p2) => {
        let cleanAnswer = p2.replace(/<[^>]+>/g, '').replace(/"/g, '\\"');
        return `${p1}, \n                    schemaAnswer: "${cleanAnswer}"`;
    });

    if (content !== modified) {
        fs.writeFileSync(pagePath, modified);
        updatedCount++;
    }
}
console.log(`Updated template and ${updatedCount} pages`);
