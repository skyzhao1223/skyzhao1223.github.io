import { getLang } from '../i18n/index.js';

export function validateSiteData(data) {
  if (!data || !Array.isArray(data.items)) {
    throw new Error('Invalid site data: missing items array');
  }

  return data.items
    .filter((item) => item && typeof item === 'object')
    .map((item) => ({
      title: String(item.title ?? ''),
      type: String(item.type ?? 'note'),
      category: String(item.category ?? 'work'),
      tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
      desc: String(item.desc ?? ''),
      date: String(item.date ?? ''),
      ...(item.url ? { url: String(item.url) } : {}),
    }))
    .filter((item) => item.title);
}

export async function fetchSiteData() {
  const dataFile = getLang() === 'en' ? '/data.en.json' : '/data.json';
  const response = await fetch(dataFile);
  if (!response.ok) {
    throw new Error(`Failed to load ${dataFile} (${response.status})`);
  }
  const data = await response.json();
  return validateSiteData(data);
}
