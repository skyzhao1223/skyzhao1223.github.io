const cache = { zh: null, en: null };
let ready = null;

const I18N_BASE = new URL('./', import.meta.url).pathname;

export function getLang() {
  return location.pathname.startsWith('/en') ? 'en' : 'zh';
}

export function ensureI18nLoaded() {
  if (!ready) {
    ready = Promise.all([
      fetch(`${I18N_BASE}zh.json`).then((r) => {
        if (!r.ok) throw new Error(`Failed to load zh.json (${r.status})`);
        return r.json();
      }).then((data) => { cache.zh = data; }),
      fetch(`${I18N_BASE}en.json`).then((r) => {
        if (!r.ok) throw new Error(`Failed to load en.json (${r.status})`);
        return r.json();
      }).then((data) => { cache.en = data; }),
    ]);
  }
  return ready;
}

export function getMessages() {
  const lang = getLang();
  return cache[lang] || cache.zh || {};
}

export async function initI18n() {
  await ensureI18nLoaded();
  const msgs = getMessages();
  if (!msgs || Object.keys(msgs).length === 0) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (msgs[key] !== undefined) el.textContent = msgs[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (msgs[key] !== undefined) el.innerHTML = msgs[key];
  });

  const attrPrefixes = ['title', 'alt', 'aria-label', 'placeholder', 'content'];
  attrPrefixes.forEach((attr) => {
    document.querySelectorAll(`[data-i18n-${attr}]`).forEach((el) => {
      const key = el.getAttribute(`data-i18n-${attr}`);
      if (msgs[key] !== undefined) el.setAttribute(attr, msgs[key]);
    });
  });

  if (msgs._title) document.title = msgs._title;

  if (msgs._description) {
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', msgs._description);
  }

  const lang = getLang();
  document.querySelectorAll('#langSwitch, #langSwitchMobile').forEach((switchEl) => {
    if (lang === 'en') {
      switchEl.textContent = '中文';
      switchEl.href = '/';
    } else {
      switchEl.textContent = 'EN';
      switchEl.href = '/en/';
    }
  });

  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
}
