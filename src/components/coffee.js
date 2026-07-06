import { getLang } from '../i18n/index.js';
import zhMsgs from '../i18n/zh.json';
import enMsgs from '../i18n/en.json';

export function initCoffee() {
  const container = document.getElementById('coffee');
  if (!container) return;

  const lang = getLang();
  const msgs = lang === 'en' ? enMsgs : zhMsgs;
  const label = container.dataset.label || msgs.coffee_label;
  const theme = container.dataset.theme || 'dark';
  const base = (container.dataset.base || '/').replace(/\/?$/, '/');

  const isDark = theme === 'dark';
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  const muted = isDark ? '#6e7486' : '#888';

  const id = 'coffee-style-' + Math.random().toString(36).slice(2, 8);

  const style = document.createElement('style');
  style.textContent = `
    #${id} { text-align: center; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    #${id} .coffee-label { font-size: 13px; color: ${muted}; margin-bottom: 14px; }
    #${id} .coffee-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    #${id} .coffee-item { display: flex; flex-direction: column; align-items: center; gap: 6px; }
    #${id} .coffee-item img {
      width: 130px; border-radius: 10px;
      border: 1px solid ${border};
      background: #fff; padding: 4px;
      transition: transform 0.2s;
    }
    #${id} .coffee-item img:hover { transform: scale(1.05); }
    #${id} .coffee-item span {
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 11px; color: ${muted};
    }
  `;
  document.head.appendChild(style);

  const alipayLabel = lang === 'en' ? 'Alipay' : '支付宝';
  const wechatPayLabel = lang === 'en' ? 'WeChat Pay' : '微信支付';

  container.id = id;
  container.innerHTML = `
    <p class="coffee-label">${label}</p>
    <div class="coffee-row">
      <div class="coffee-item">
        <img src="${base}qr-alipay.png" alt="${alipayLabel}" loading="lazy">
        <span>${alipayLabel}</span>
      </div>
      <div class="coffee-item">
        <img src="${base}qr-wechat-pay.png" alt="${wechatPayLabel}" loading="lazy">
        <span>${wechatPayLabel}</span>
      </div>
    </div>
  `;
}
