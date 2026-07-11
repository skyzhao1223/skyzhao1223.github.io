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

const DATA_PATHS = {
  zh: ['/data.json', '/public/data.json'],
  en: ['/data.en.json', '/public/data.en.json'],
};

export async function fetchSiteData() {
  const paths = DATA_PATHS[getLang()] || DATA_PATHS.zh;
  let lastError;

  for (const path of paths) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        lastError = new Error(`Failed to load ${path} (${response.status})`);
        continue;
      }
      const data = await response.json();
      return validateSiteData(data);
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to load site data');
}
