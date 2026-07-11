#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { siteUrl } = require('./site-config');
const { writeBilingualPages } = require('./i18n-html');

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

for (const name of fs.readdirSync(publicDir)) {
  const src = path.join(publicDir, name);
  const dest = path.join(rootDir, name);
  if (fs.statSync(src).isDirectory()) {
    fs.rmSync(dest, { recursive: true, force: true });
    fs.cpSync(src, dest, { recursive: true });
  } else {
    fs.copyFileSync(src, dest);
  }
}

writeBilingualPages({
  rootDir,
  zhHtmlPath: path.join(rootDir, 'index.html'),
  zhOutPath: path.join(rootDir, 'index.html'),
  enOutPath: path.join(rootDir, 'en', 'index.html'),
  domain: siteUrl,
});

console.log('Prepared GitHub Pages static files:');
console.log('  - synced public/ assets to repo root');
console.log('  - updated index.html hreflang');
console.log('  - generated en/index.html');
