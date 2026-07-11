#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { writeBilingualPages } = require('./i18n-html');
const { siteUrl } = require('./site-config');

const distDir = path.join(__dirname, '..', 'dist');
const zhHtml = path.join(distDir, 'index.html');
const enHtml = path.join(distDir, 'en', 'index.html');

writeBilingualPages({
  rootDir: path.join(__dirname, '..'),
  zhHtmlPath: zhHtml,
  zhOutPath: zhHtml,
  enOutPath: enHtml,
  domain: siteUrl,
});

console.log('Postbuild complete:');
console.log(`  ZH: ${zhHtml} (hreflang injected)`);
console.log(`  EN: ${enHtml} (hreflang + pre-rendered English)`);
