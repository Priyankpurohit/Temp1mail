/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://temp1mail.com',
    generateRobotsTxt: true,
    exclude: [
        '/api/*',
        '/inbox/*',
        '/icon.svg',
    ],
    changefreq: 'weekly',
    priority: 0.7,
    transform: async (config, path) => {
        // Homepage gets highest priority
        if (path === '/') {
            return { loc: path, changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString() }
        }
        // Blog posts
        if (path.startsWith('/blog/')) {
            return { loc: path, changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() }
        }
        // Legal/info pages get lower priority
        if (['/about', '/contact', '/privacy', '/terms', '/disclaimer', '/faq'].includes(path)) {
            return { loc: path, changefreq: 'monthly', priority: 0.5, lastmod: new Date().toISOString() }
        }
        // All landing pages
        return { loc: path, changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() }
    },
}