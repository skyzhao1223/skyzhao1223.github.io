#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const files = ['data.json', 'data.en.json'];

function validateItem(item, file, index) {
  if (!item || typeof item !== 'object') {
    throw new Error(`${file} items[${index}] is not an object`);
  }
  if (!item.title || typeof item.title !== 'string') {
    throw new Error(`${file} items[${index}] missing title`);
  }
  if (!Array.isArray(item.tags)) {
    throw new Error(`${file} items[${index}] missing tags array`);
  }
  if (item.url && typeof item.url !== 'string') {
    throw new Error(`${file} items[${index}] url must be a string`);
  }
}

for (const file of files) {
  const filePath = path.join(publicDir, file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  if (!Array.isArray(data.items)) {
    throw new Error(`${file} must contain an items array`);
  }
  data.items.forEach((item, index) => validateItem(item, file, index));
  console.log(`Validated ${file}: ${data.items.length} items`);
}
