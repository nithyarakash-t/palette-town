// import * as fs from 'fs';
// import * as path from 'path';
// import { seoConfig } from '../src/config/seo.config';

// interface RouteConfig {
//     path: string;
//     priority: number;
//     changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
// }

// const routes: RouteConfig[] = [
//     { path: '/', priority: 1.0, changefreq: 'weekly' },
//     { path: '/contrast-checker', priority: 0.8, changefreq: 'monthly' },
//     { path: '/css-colors', priority: 0.8, changefreq: 'monthly' },
//     { path: '/color-guesser', priority: 0.8, changefreq: 'monthly' }
// ];

// function generateSitemap(): void {
//     try {
//         const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     ${routes.map(route => `
//     <url>
//         <loc>${seoConfig.siteUrl}${route.path}</loc>
//         <lastmod>${new Date().toISOString()}</lastmod>
//         <changefreq>${route.changefreq}</changefreq>
//         <priority>${route.priority.toFixed(1)}</priority>
//     </url>`).join('')}
// </urlset>`;

//         const publicDir = path.join(process.cwd(), 'public');
        
//         // Ensure public directory exists
//         if (!fs.existsSync(publicDir)) {
//             fs.mkdirSync(publicDir, { recursive: true });
//         }

//         const sitemapPath = path.join(publicDir, 'sitemap.xml');
//         fs.writeFileSync(sitemapPath, sitemap.trim());
//         console.log('✅ Sitemap generated successfully at:', sitemapPath);
//     } catch (error) {
//         console.error('❌ Error generating sitemap:', error);
//         process.exit(1);
//     }
// }

// // Execute if running directly
// if (require.main === module) {
//     generateSitemap();
// }

// export { generateSitemap, type RouteConfig };


// import fs from 'fs';
// import { seoConfig } from '../src/config/seo.config';

// const routes = [
//     '/',
//     '/contrast-checker',
//     '/css-colors',
//     '/color-guesser'
// ];

// function generateSitemap() {
//     const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     ${routes.map(route => `
//     <url>
//         <loc>${seoConfig.siteUrl}${route}</loc>
//         <lastmod>${new Date().toISOString()}</lastmod>
//         <changefreq>monthly</changefreq>
//         <priority>${route === '/' ? '1.0' : '0.8'}</priority>
//     </url>`).join('')}
// </urlset>`;

//     fs.writeFileSync('./public/sitemap.xml', sitemap);
//     console.log('Sitemap generated successfully!');
// }

// generateSitemap();