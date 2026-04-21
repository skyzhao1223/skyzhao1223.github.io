/**
 * audioManager.js — 音效管理模块
 * 使用 Web Audio API 管理音效加载与播放
 * iOS Safari 需在用户首次交互后才能播放音频，本模块已处理此兼容
 */

import { Storage } from './utils.js';

let audioCtx = null;
let enabled = Storage.get('audioEnabled', false);
const bufferCache = {};
let unlocked = false;

export function init() {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    console.warn('[AudioManager] 不支持 Web Audio API');
  }
  _updateIcon();
}

export function unlock() {
  if (unlocked || !audioCtx) return;
  const buffer = audioCtx.createBuffer(1, 1, 22050);
  const src = audioCtx.createBufferSource();
  src.buffer = buffer;
  src.connect(audioCtx.destination);
  src.start(0);
  unlocked = true;
}

export async function preload(url) {
  if (!audioCtx || bufferCache[url]) return;
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const arrayBuffer = await res.arrayBuffer();
    bufferCache[url] = await audioCtx.decodeAudioData(arrayBuffer);
  } catch (e) {
    // 静默忽略
  }
}

export function play(url) {
  if (!enabled || !audioCtx || !url) return;
  unlock();
  if (bufferCache[url]) {
    _playBuffer(bufferCache[url]);
  } else {
    preload(url).then(() => {
      if (bufferCache[url]) _playBuffer(bufferCache[url]);
    });
  }
}

function _playBuffer(buffer) {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().then(() => _doPlay(buffer));
  } else {
    _doPlay(buffer);
  }
}

function _doPlay(buffer) {
  try {
    const src = audioCtx.createBufferSource();
    src.buffer = buffer;
    src.connect(audioCtx.destination);
    src.start(0);
  } catch (e) { /* 静默忽略 */ }
}

export function toggle() {
  enabled = !enabled;
  Storage.set('audioEnabled', enabled);
  _updateIcon();
  if (enabled) unlock();
}

export function isEnabled() { return enabled; }

function _updateIcon() {
  const el = document.getElementById('audio-icon');
  if (el) el.textContent = enabled ? '🔊' : '🔇';
}
