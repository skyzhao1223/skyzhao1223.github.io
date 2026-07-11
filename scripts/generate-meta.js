#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { siteUrl } = require('./site-config');

const publicDir = path.join(__dirname, '..', 'public');
const routes = [
  { path: '/', hreflang: 'zh', priority: '1.0' },
  { path: '/en/', hreflang: 'en', priority: '0.9' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes.map((route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <xhtml:link rel="alternate" hreflang="zh" href="${siteUrl}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en/"/>
    <changefreq>monthly</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf-8');

console.log('Generated public/sitemap.xml and public/robots.txt from site-config.js');
