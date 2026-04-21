/**
 * utils.js — 工具函数模块
 * 提供防抖、节流、震动、提示框、LocalStorage、颜色解析等通用工具
 */

/* ===== 防抖（短时间重复点击只响应一次） ===== */
export function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) return;
    fn.apply(this, args);
    timer = setTimeout(() => { timer = null; }, delay);
  };
}

/* ===== 节流 ===== */
export function throttle(fn, interval = 16) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last < interval) return;
    last = now;
    return fn.apply(this, args);
  };
}

/* ===== 线性插值 ===== */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/* ===== 钳制值到指定区间 ===== */
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

/* ===== 手机震动反馈 ===== */
export function vibrate(duration = 30) {
  if (navigator.vibrate) {
    navigator.vibrate(clamp(duration, 10, 200));
  }
}

/* ===== 提示框 ===== */
let tooltipTimer = null;

export function showTooltip(text, duration = 2500) {
  const el = document.getElementById('tooltip');
  const textEl = document.getElementById('tooltip-text');
  if (!el || !textEl) return;
  textEl.textContent = text;
  el.classList.remove('hidden');
  el.classList.add('show');
  if (tooltipTimer) clearTimeout(tooltipTimer);
  if (duration > 0) {
    tooltipTimer = setTimeout(hideTooltip, duration);
  }
}

export function hideTooltip() {
  const el = document.getElementById('tooltip');
  if (!el) return;
  el.classList.remove('show');
  el.classList.add('hidden');
}

/* ===== 场景切换渐变遮罩 ===== */
export function sceneTransition(onMid, halfDuration = 400) {
  const overlay = document.getElementById('scene-transition');
  if (!overlay) { onMid && onMid(); return; }
  overlay.classList.add('fade-in');
  setTimeout(() => {
    onMid && onMid();
    setTimeout(() => {
      overlay.classList.remove('fade-in');
    }, halfDuration);
  }, halfDuration);
}

/* ===== 加载遮罩 ===== */
export function hideLoadingOverlay() {
  const el = document.getElementById('loading-overlay');
  if (!el) return;
  el.classList.add('fade-out');
  setTimeout(() => { el.style.display = 'none'; }, 500);
}

/* ===== 房间名称标签 ===== */
export function setRoomLabel(name) {
  const el = document.getElementById('room-label');
  if (el) el.textContent = name;
}

/* ===== LocalStorage 工具 ===== */
export const Storage = {
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (e) { console.warn('[Storage] 写入失败:', e); }
  },
  get(key, defaultVal = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : defaultVal;
    } catch (e) { return defaultVal; }
  },
  remove(key) { localStorage.removeItem(key); }
};

/* ===== 异步加载 JSON 配置 ===== */
export async function loadJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`[loadJSON] 无法加载 ${url}: ${res.status}`);
  return res.json();
}

/* ===== 简单延迟 ===== */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ===== 检测移动端性能档位 ===== */
function detectPerformanceTier() {
  const memory = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;
  if (memory && memory <= 2) return 'low';
  if (cores && cores <= 2) return 'low';
  return 'high';
}

export const PERF_TIER = detectPerformanceTier();
