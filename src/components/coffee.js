import { getLang, getMessages } from '../i18n/index.js';
import { resolveAssetBase } from '../utils/dom.js';

export function initCoffee() {
  const container = document.getElementById('coffee');
  if (!container) return;

  const lang = getLang();
  const msgs = getMessages();
  const label = container.dataset.label || msgs.coffee_label || '';
  const theme = container.dataset.theme || 'dark';
  const base = resolveAssetBase(container.dataset.base || '/');

  const isDark = theme === 'dark';
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  const muted = isDark ? '#6e7486' : '#888';

  container.classList.add('coffee-widget');
  container.innerHTML = `
    <p class="coffee-label"></p>
    <div class="coffee-row">
      <div class="coffee-item">
        <img src="${base}qr-alipay.png" alt="" loading="lazy">
        <span class="coffee-pay-label"></span>
      </div>
      <div class="coffee-item">
        <img src="${base}qr-wechat-pay.png" alt="" loading="lazy">
        <span class="coffee-pay-label"></span>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .coffee-widget { text-align: center; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .coffee-widget .coffee-label { font-size: 13px; color: ${muted}; margin-bottom: 14px; }
    .coffee-widget .coffee-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .coffee-widget .coffee-item { display: flex; flex-direction: column; align-items: center; gap: 6px; }
    .coffee-widget .coffee-item img {
      width: 130px; border-radius: 10px;
      border: 1px solid ${border};
      background: #fff; padding: 4px;
      transition: transform 0.2s;
    }
    .coffee-widget .coffee-item img:hover { transform: scale(1.05); }
    .coffee-widget .coffee-pay-label {
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 11px; color: ${muted};
    }
  `;
  document.head.appendChild(style);

  const alipayLabel = lang === 'en' ? 'Alipay' : '支付宝';
  const wechatPayLabel = lang === 'en' ? 'WeChat Pay' : '微信支付';

  container.querySelector('.coffee-label').textContent = label;
  const imgs = container.querySelectorAll('img');
  const labels = container.querySelectorAll('.coffee-pay-label');
  imgs[0].alt = alipayLabel;
  imgs[1].alt = wechatPayLabel;
  labels[0].textContent = alipayLabel;
  labels[1].textContent = wechatPayLabel;
}
