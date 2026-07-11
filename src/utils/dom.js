const HTML_ESCAPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => HTML_ESCAPE[ch]);
}

export function isSafeUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return false;
  if (url.startsWith('/')) return !url.startsWith('//');
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function resolveAssetBase(rawBase) {
  const base = (rawBase || '/').trim();
  if (!base.startsWith('/') || base.startsWith('//')) return '/';
  return base.endsWith('/') ? base : `${base}/`;
}
