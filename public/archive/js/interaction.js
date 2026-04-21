/**
 * interaction.js — 交互处理模块
 * 统一管理触控/点击事件，对接射线检测和动作引擎
 */

import { debounce, vibrate } from './utils.js';
import { raycast } from './engine.js';
import * as Items from './itemManager.js';
import * as Audio from './audioManager.js';
import * as Action from './actionEngine.js';
import * as Scene from './sceneManager.js';

const CLICK_COOLDOWN = 1000;
let lastClickTime = 0;
let touchStartX = 0, touchStartY = 0, touchStartTime = 0;

export function init() {
  const canvas = document.getElementById('canvas3d');

  canvas.addEventListener('touchstart', _onTouchStart, { passive: true });
  canvas.addEventListener('touchend', _onTouchEnd, { passive: false });
  canvas.addEventListener('mousedown', _onMouseDown);
  canvas.addEventListener('mouseup', _onMouseUp);

  const audioBtn = document.getElementById('audio-toggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      Audio.toggle();
      Audio.unlock();
    });
  }

  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', debounce(() => {
      vibrate(50);
      Scene.backToLivingRoom();
    }, CLICK_COOLDOWN));
  }
}

function _onTouchStart(e) {
  if (e.touches.length !== 1) return;
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
  touchStartTime = Date.now();
  _handleHover(t.clientX, t.clientY);
}

function _onTouchEnd(e) {
  if (e.changedTouches.length !== 1) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  if (Math.sqrt(dx * dx + dy * dy) < 12 && Date.now() - touchStartTime < 400) {
    e.preventDefault();
    _handleClick(t.clientX, t.clientY);
  }
}

let mouseDownX = 0, mouseDownY = 0;

function _onMouseDown(e) {
  mouseDownX = e.clientX;
  mouseDownY = e.clientY;
  _handleHover(e.clientX, e.clientY);
}

function _onMouseUp(e) {
  const dx = e.clientX - mouseDownX;
  const dy = e.clientY - mouseDownY;
  if (Math.sqrt(dx * dx + dy * dy) < 8) _handleClick(e.clientX, e.clientY);
}

function _handleHover(cx, cy) {
  const hit = raycast(cx, cy, Items.getInteractables());
  if (!hit) return;
  const config = Items.getConfig(hit.object.userData.itemId);
  if (!config?.interaction?.touch) return;
  Action.executeTouchEffects(config.interaction.touch, config.id, config);
}

function _handleClick(cx, cy) {
  const now = Date.now();
  if (now - lastClickTime < CLICK_COOLDOWN || Action.isBusy()) return;
  lastClickTime = now;
  Audio.unlock();

  const hit = raycast(cx, cy, Items.getInteractables());
  if (!hit) return;

  const itemId = hit.object.userData.itemId;
  const config = Items.getConfig(itemId);
  if (!config) return;

  vibrate(config.interaction.vibration || 30);
  Action.execute(config.interaction.click, itemId, config);
}
