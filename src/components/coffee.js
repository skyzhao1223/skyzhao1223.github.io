import { getLang, getMessages } from '../i18n/index.js';
import { resolveAssetBase } from '../utils/dom.js';

function appendCoffeeItem(parent, src, label) {
  const item = document.createElement('div');
  item.className = 'coffee-item';

  const img = document.createElement('img');
  img.src = src;
  img.alt = label;
  img.loading = 'lazy';

  const span = document.createElement('span');
  span.className = 'coffee-pay-label';
  span.textContent = label;

  item.append(img, span);
  parent.appendChild(item);
}

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
  container.replaceChildren();

  const labelEl = document.createElement('p');
  labelEl.className = 'coffee-label';
  labelEl.textContent = label;

  const row = document.createElement('div');
  row.className = 'coffee-row';

  const alipayLabel = lang === 'en' ? 'Alipay' : '支付宝';
  const wechatPayLabel = lang === 'en' ? 'WeChat Pay' : '微信支付';

  appendCoffeeItem(row, `${base}qr-alipay.png`, alipayLabel);
  appendCoffeeItem(row, `${base}qr-wechat-pay.png`, wechatPayLabel);
  container.append(labelEl, row);

  if (!document.getElementById('coffee-widget-style')) {
    const style = document.createElement('style');
    style.id = 'coffee-widget-style';
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
  }
}
