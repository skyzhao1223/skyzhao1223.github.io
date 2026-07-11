#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { siteUrl } = require('./site-config');
const { writeBilingualPages } = require('./i18n-html');

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const templatePath = path.join(rootDir, 'index.template.html');

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

if (!fs.existsSync(templatePath)) {
  throw new Error('index.template.html is required for sync:public');
}

writeBilingualPages({
  rootDir,
  zhHtmlPath: templatePath,
  zhOutPath: path.join(rootDir, 'index.html'),
  enOutPath: path.join(rootDir, 'en', 'index.html'),
  domain: siteUrl,
});

console.log('Synced public/ assets to repo root for GitHub Pages branch deploy.');
