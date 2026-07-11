import { isSafeUrl } from '../utils/dom.js';
import { getLang } from '../i18n/index.js';

const TYPE_LABELS = { project: 'PROJECT', article: 'ARTICLE', note: 'NOTE' };

export function createFilterSection(barEl, listEl, emptyEl, items, featuredFirst, tagLabel) {
  if (!barEl || !listEl || !emptyEl) return;

  let activeTags = new Set();
  const tags = [...new Set(items.flatMap((i) => i.tags))].sort();
  const allLabel = tagLabel('__all__');

  function syncUI() {
    barEl.querySelectorAll('.filter-tag').forEach((el) => {
      if (!el.dataset.tag) el.classList.toggle('active', activeTags.size === 0);
      else el.classList.toggle('active', activeTags.has(el.dataset.tag));
    });
  }

  function appendText(parent, tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = text;
    parent.appendChild(node);
    return node;
  }

  function renderCard(item, isFirst) {
    const tag = item.url && isSafeUrl(item.url) ? 'a' : 'div';
    const el = document.createElement(tag);
    el.className = 'card filter-show reveal in' + (isFirst ? ' featured' : '');

    if (tag === 'a') {
      el.href = item.url;
      if (item.url.startsWith('http')) {
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
      }
    }

    if (item.url && isSafeUrl(item.url)) {
      appendText(el, 'span', 'arrow mono', '↗');
    }

    appendText(el, 'div', 'type-badge', TYPE_LABELS[item.type] || item.type);
    appendText(el, 'h3', null, item.title);
    appendText(el, 'p', null, item.desc);

    const stack = document.createElement('div');
    stack.className = 'stack';
    item.tags.forEach((t) => {
      const span = document.createElement('span');
      span.className = 'clickable';
      span.dataset.tag = t;
      span.textContent = tagLabel(t);
      span.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(t);
      });
      stack.appendChild(span);
    });
    el.appendChild(stack);
    return el;
  }

  function render() {
    const filtered = activeTags.size === 0
      ? items
      : items.filter((item) => item.tags.some((t) => activeTags.has(t)));

    listEl.replaceChildren();
    emptyEl.style.display = filtered.length === 0 ? 'block' : 'none';

    filtered.forEach((item, i) => {
      const isFirst = featuredFirst && i === 0 && activeTags.size === 0;
      listEl.appendChild(renderCard(item, isFirst));
    });
  }

  function toggle(t) {
    if (activeTags.has(t)) activeTags.delete(t);
    else activeTags.add(t);
    syncUI();
    render();
  }

  barEl.replaceChildren();
  if (tags.length > 1) {
    const allBtn = document.createElement('span');
    allBtn.className = 'filter-tag active';
    allBtn.textContent = allLabel;
    allBtn.addEventListener('click', () => { activeTags.clear(); syncUI(); render(); });
    barEl.appendChild(allBtn);

    tags.forEach((t) => {
      const el = document.createElement('span');
      el.className = 'filter-tag';
      el.dataset.tag = t;
      el.textContent = tagLabel(t);
      el.addEventListener('click', () => toggle(t));
      barEl.appendChild(el);
    });
  }

  render();
}

export function renderLifeItems(lifeList, lifeItems) {
  if (!lifeList) return;
  lifeList.replaceChildren();
  lifeItems.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'life-item';
    const title = document.createElement('h4');
    title.textContent = item.title;
    const desc = document.createElement('p');
    desc.textContent = item.desc;
    el.append(title, desc);
    lifeList.appendChild(el);
  });
}
