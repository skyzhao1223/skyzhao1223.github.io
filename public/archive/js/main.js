/**
 * main.js — 应用主入口
 * 各模块初始化顺序管理
 */

import { hideLoadingOverlay } from './utils.js';
import { init as engineInit } from './engine.js';
import { init as audioInit } from './audioManager.js';
import { loadConfig as loadItems } from './itemManager.js';
import { loadConfig as loadRooms, enterDefault } from './sceneManager.js';
import { create as createRole } from './roleManager.js';
import { init as interactionInit } from './interaction.js';
import { setSceneManager } from './actionEngine.js';
import * as Scene from './sceneManager.js';

(async function bootstrap() {
  try {
    // 注入 SceneManager 到 ActionEngine（避免循环依赖）
    setSceneManager(Scene);

    // 初始化渲染引擎
    engineInit();

    // 初始化音效
    audioInit();

    // 并行加载配置
    await Promise.all([loadItems(), loadRooms()]);

    // 创建角色
    createRole();

    // 进入默认场景（客厅）
    await enterDefault();

    // 初始化交互
    interactionInit();

    // 清除超时计时器并隐藏加载遮罩
    if (window._clearLoadTimer) window._clearLoadTimer();
    hideLoadingOverlay();

  } catch (err) {
    console.error('[App] 启动失败:', err);
    const txt = document.querySelector('.loading-text');
    if (txt) { txt.textContent = '加载失败，请刷新重试'; txt.style.color = '#e53935'; }
  }
})();
