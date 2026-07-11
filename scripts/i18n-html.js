const fs = require('fs');
const path = require('path');

function loadEnJson(rootDir) {
  return JSON.parse(
    fs.readFileSync(path.join(rootDir, 'src', 'i18n', 'en.json'), 'utf-8')
  );
}

function buildHreflang(domain, page) {
  if (page === 'en') {
    return [
      `<link rel="alternate" hreflang="en" href="${domain}/en/">`,
      `<link rel="alternate" hreflang="zh" href="${domain}/">`,
      `<link rel="alternate" hreflang="x-default" href="${domain}/">`,
    ].join('\n  ');
  }

  return [
    `<link rel="alternate" hreflang="zh" href="${domain}/">`,
    `<link rel="alternate" hreflang="en" href="${domain}/en/">`,
    `<link rel="alternate" hreflang="x-default" href="${domain}/">`,
  ].join('\n  ');
}

function injectHreflang(html, domain, page) {
  const hreflang = buildHreflang(domain, page);
  return html.replace('</head>', `  ${hreflang}\n</head>`);
}

function buildEnglishHtml(html, domain, enJson) {
  let enOut = html
    .replace('lang="zh-CN"', 'lang="en"')
    .replace('</head>', `  ${buildHreflang(domain, 'en')}\n</head>`);

  if (enJson._title) {
    enOut = enOut.replace(/<title>[^<]*<\/title>/, `<title>${enJson._title}</title>`);
  }

  if (enJson._description) {
    enOut = enOut.replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${enJson._description}$2`
    );
  }

  for (const [key, val] of Object.entries(enJson)) {
    if (key.startsWith('_')) continue;
    const regex = new RegExp(
      `(data-i18n="${key}"[^>]*>)[\\s\\S]*?(</)`,
      'g'
    );
    enOut = enOut.replace(regex, `$1${val}$2`);
  }

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

  enOut = enOut.replace(/(id="langSwitch"[^>]*class="lang-switch[^"]*"[^>]*href=")\/en\/(">)EN/g,
    '$1/$2中文');
  enOut = enOut.replace(/(id="langSwitchMobile"[^>]*class="lang-switch[^"]*"[^>]*href=")\/en\/(">)EN/g,
    '$1/$2中文');

  return enOut;
}

function writeBilingualPages({ rootDir, zhHtmlPath, zhOutPath, enOutPath, domain }) {
  const enJson = loadEnJson(rootDir);
  const html = fs.readFileSync(zhHtmlPath, 'utf-8');
  const zhOut = injectHreflang(html, domain, 'zh');
  const enOut = buildEnglishHtml(html, domain, enJson);

  fs.writeFileSync(zhOutPath, zhOut, 'utf-8');
  fs.mkdirSync(path.dirname(enOutPath), { recursive: true });
  fs.writeFileSync(enOutPath, enOut, 'utf-8');
}

module.exports = {
  buildEnglishHtml,
  injectHreflang,
  writeBilingualPages,
};
