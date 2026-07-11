#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'content');
const publicDir = path.join(__dirname, '..', 'public');
const outFileZh = path.join(publicDir, 'data.json');
const outFileEn = path.join(publicDir, 'data.en.json');

function isSafeUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return false;
  if (url.startsWith('/')) return !url.startsWith('//');
  return /^https?:\/\//i.test(url);
}

function parseFrontMatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw.trim() };

  const meta = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map(s => s.trim());
    } else if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    meta[key] = val;
  }
  return { meta, body: match[2].trim() };
}

if (!fs.existsSync(contentDir)) {
  console.log('No content/ directory found, using existing public/data.json.');
  process.exit(0);
}

const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md')).sort();
if (files.length === 0) {
  console.log('No markdown files in content/, using existing public/data.json.');
  process.exit(0);
}
const zhItems = [];
const enItems = [];
const tagSet = new Set();

for (const file of files) {
  const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
  const { meta, body } = parseFrontMatter(raw);

  const tags = Array.isArray(meta.tags) ? meta.tags : [];
  tags.forEach(t => tagSet.add(t));

  if (meta.url && !isSafeUrl(meta.url)) {
    throw new Error(`Unsafe url in ${file}: ${meta.url}`);
  }

  zhItems.push({
    title: meta.title || file.replace('.md', ''),
    type: meta.type || 'note',
    category: meta.category || 'work',
    tags,
    desc: body,
    ...(meta.url && { url: meta.url }),
    date: meta.date || '',
  });

  enItems.push({
    title: meta.title_en || meta.title || file.replace('.md', ''),
    type: meta.type || 'note',
    category: meta.category || 'work',
    tags,
    desc: meta.desc_en || body,
    ...(meta.url && { url: meta.url }),
    date: meta.date || '',
  });
}

zhItems.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
enItems.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

const zhData = { tags: [...tagSet].sort(), items: zhItems };
const enData = { tags: [...tagSet].sort(), items: enItems };

fs.writeFileSync(outFileZh, JSON.stringify(zhData, null, 2), 'utf-8');
fs.writeFileSync(outFileEn, JSON.stringify(enData, null, 2), 'utf-8');

console.log(`Built ${zhItems.length} items, ${zhData.tags.length} tags`);
console.log(`  -> ${outFileZh}`);
console.log(`  -> ${outFileEn}`);
