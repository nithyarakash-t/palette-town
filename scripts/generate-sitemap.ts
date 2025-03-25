import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { seoConfig } from '../src/config/seo.config';

interface RouteConfig {
    path: string;
    priority: number;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

const routes: RouteConfig[] = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/contrast-checker', priority: 0.8, changefreq: 'monthly' },
    { path: '/css-colors', priority: 0.8, changefreq: 'monthly' },
    { path: '/color-guesser', priority: 0.8, changefreq: 'monthly' },
    { path: '/color-picker', priority: 0.8, changefreq: 'monthly' } // Added missing route
];

function generateSitemap(): void {
    try {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map(route => `
    <url>
        <loc>${new URL(route.path, seoConfig.siteUrl).toString()}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority.toFixed(1)}</priority>
    </url>`).join('')}
</urlset>`;

        const publicDir = join(process.cwd(), 'public');
        
        if (!existsSync(publicDir)) {
            mkdirSync(publicDir, { recursive: true });
        }

        const sitemapPath = join(publicDir, 'sitemap.xml');
        writeFileSync(sitemapPath, sitemap.trim());
        console.log('✅ Sitemap generated successfully at:', sitemapPath);
    } catch (error) {
        console.error('❌ Error generating sitemap:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
}

// Execute if running directly
if (require.main === module) {
    generateSitemap();
}

export { generateSitemap, type RouteConfig };