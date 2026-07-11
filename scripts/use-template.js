#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const templatePath = path.join(rootDir, 'index.template.html');
const indexPath = path.join(rootDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Missing index.template.html');
  process.exit(1);
}

fs.copyFileSync(templatePath, indexPath);
console.log('Copied index.template.html -> index.html');
