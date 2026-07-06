#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const zhHtml = path.join(distDir, 'index.html');
const enDir = path.join(distDir, 'en');
const enHtml = path.join(enDir, 'index.html');
const domain = 'https://zhaosky.cn';

const enJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'i18n', 'en.json'), 'utf-8')
);

const hreflangZh = [
  `<link rel="alternate" hreflang="zh" href="${domain}/">`,
  `<link rel="alternate" hreflang="en" href="${domain}/en/">`,
  `<link rel="alternate" hreflang="x-default" href="${domain}/">`,
].join('\n  ');

const hreflangEn = [
  `<link rel="alternate" hreflang="en" href="${domain}/en/">`,
  `<link rel="alternate" hreflang="zh" href="${domain}/">`,
  `<link rel="alternate" hreflang="x-default" href="${domain}/">`,
].join('\n  ');

let html = fs.readFileSync(zhHtml, 'utf-8');

// --- ZH page: inject hreflang only ---
const zhOut = html.replace('</head>', `  ${hreflangZh}\n</head>`);
fs.writeFileSync(zhHtml, zhOut, 'utf-8');

// --- EN page: change lang + inject hreflang + pre-render English text ---
let enOut = html
  .replace('lang="zh-CN"', 'lang="en"')
  .replace('</head>', `  ${hreflangEn}\n</head>`);

// Replace <title>
if (enJson._title) {
  enOut = enOut.replace(/<title>[^<]*<\/title>/, `<title>${enJson._title}</title>`);
}

// Replace <meta name="description">
if (enJson._description) {
  enOut = enOut.replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${enJson._description}$2`
  );
}

// Replace data-i18n innerHTML: data-i18n="key">...content...</tag>
for (const [key, val] of Object.entries(enJson)) {
  if (key.startsWith('_')) continue;
  const regex = new RegExp(
    `(data-i18n="${key}"[^>]*>)[\\s\\S]*?(</)`,
    'g'
  );
  enOut = enOut.replace(regex, `$1${val}$2`);
}

// Replace data-i18n-{attr} attributes
const attrNames = ['title', 'alt', 'aria-label', 'placeholder', 'content'];
for (const attr of attrNames) {
  const attrRegex = new RegExp(
    `data-i18n-${attr}="([^"]+)"([^>]*)${attr}="[^"]*"`,
    'g'
  );
  enOut = enOut.replace(attrRegex, (match, key, between) => {
    const val = enJson[key];
    if (val === undefined) return match;
    return `data-i18n-${attr}="${key}"${between}${attr}="${val}"`;
  });
}

// Replace OG/Twitter meta for EN
enOut = enOut
  .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/,
    `$1${enJson._title || 'Sky Zhao'}$2`)
  .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    `$1${enJson.tagline || enJson._description || ''}$2`)
  .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/,
    `$1${domain}/en/$2`)
  .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
    `$1${enJson._title || 'Sky Zhao'}$2`)
  .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
    `$1${enJson.tagline || enJson._description || ''}$2`);

// Fix EN lang-switch links: /en/ -> /  and text: EN -> 中文
enOut = enOut.replace(/(id="langSwitch"[^>]*class="lang-switch[^"]*"[^>]*href=")\/en\/(">)EN/g,
  '$1/$2中文');
enOut = enOut.replace(/(id="langSwitchMobile"[^>]*class="lang-switch[^"]*"[^>]*href=")\/en\/(">)EN/g,
  '$1/$2中文');

fs.mkdirSync(enDir, { recursive: true });
fs.writeFileSync(enHtml, enOut, 'utf-8');

console.log('Postbuild complete:');
console.log(`  ZH: ${zhHtml} (hreflang injected)`);
console.log(`  EN: ${enHtml} (hreflang + pre-rendered English)`);
