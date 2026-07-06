import zh from './zh.json';
import en from './en.json';

const LANGS = { zh, en };

export function getLang() {
  return location.pathname.startsWith('/en') ? 'en' : 'zh';
}

export function initI18n() {
  const lang = getLang();
  const msgs = LANGS[lang];
  if (!msgs) return;

  // innerHTML replacement
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (msgs[key] !== undefined) el.innerHTML = msgs[key];
  });

  // attribute replacements: data-i18n-{attr}="{key}"
  const attrPrefixes = ['title', 'alt', 'aria-label', 'placeholder', 'content'];
  attrPrefixes.forEach(attr => {
    const selector = `[data-i18n-${attr}]`;
    document.querySelectorAll(selector).forEach(el => {
      const key = el.getAttribute(`data-i18n-${attr}`);
      if (msgs[key] !== undefined) el.setAttribute(attr, msgs[key]);
    });
  });

  // <title>
  if (msgs._title) document.title = msgs._title;

  // <meta name="description">
  if (msgs._description) {
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', msgs._description);
  }

  // language switch links (desktop + mobile)
  document.querySelectorAll('#langSwitch, #langSwitchMobile').forEach(switchEl => {
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
