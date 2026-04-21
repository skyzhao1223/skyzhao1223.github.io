/**
 * actionEngine.js — 动作引擎模块
 * 将配置中的动作序列解析为有序异步队列并执行
 * 同一时间只执行一个序列（重复点击忽略）
 */

import * as THREE from 'three';
import { delay, showTooltip, vibrate } from './utils.js';
import * as Role from './roleManager.js';
import * as Items from './itemManager.js';
import * as Audio from './audioManager.js';

let isRunning = false;
// 延迟导入 SceneManager，避免循环依赖
let _sceneManager = null;
export function setSceneManager(sm) { _sceneManager = sm; }

export async function execute(actions, itemId, itemConfig) {
  if (isRunning) return;
  isRunning = true;
  try {
    for (const action of actions) {
      await _run(action, itemId, itemConfig);
    }
  } finally {
    isRunning = false;
  }
}

async function _run(action, itemId, itemConfig) {
  const interaction = itemConfig.interaction;
  const itemPos = Items.getWorldPosition(itemId);

  switch (action) {
    case 'role_walk_to': {
      if (Role.getState() === 'sit') await Role.standUp(200);
      const rolePos = Role.getPosition();
      const walkTarget = new THREE.Vector3(itemPos.x, rolePos.y, itemPos.z + 0.8);
      await Role.walkTo(walkTarget, 300);
      break;
    }

    case 'role_pickup':
      await Promise.all([Role.raiseArm('right', -1.2, 200), Items.liftItem(itemId, 200)]);
      break;

    case 'use_guitar':
      await Role.raiseArm('left', -0.8, 150);
      await delay(300);
      Audio.play(interaction.sound);
      break;

    case 'use_microphone':
      await Role.raiseArm('right', -1.4, 150);
      await Role.turnHead(0.15, 150);
      await delay(300);
      Audio.play(interaction.sound);
      break;

    case 'use_ski_board':
      await Role.tiltBody(0.7, 200);
      await delay(300);
      Audio.play(interaction.sound);
      break;

    case 'use_swim_goggles':
      await Role.raiseArm('right', -1.1, 150);
      await Role.turnHead(0.35, 200);
      await Role.turnHead(-0.35, 200);
      await Role.turnHead(0, 150);
      Audio.play(interaction.sound);
      break;

    case 'use_tennis_racket':
    case 'use_badminton_racket':
      await Role.raiseArm('right', -1.5, 100);
      await Role.raiseArm('right', 0.3, 200);
      Audio.play(interaction.sound);
      break;

    case 'put_back':
      await Items.resetItem(itemId, 200);
      await Role.resetPose(200);
      break;

    case 'open_door':
      await Items.openDoor(itemId, 300);
      Audio.play(interaction.sound);
      break;

    case 'enter_room':
      await Role.fadeOut(200);
      if (interaction.targetRoom && _sceneManager) {
        _sceneManager.switchRoom(interaction.targetRoom);
      }
      break;

    case 'knock_door':
      await Role.knockDoor(400);
      Audio.play(interaction.sound);
      break;

    case 'back': {
      if (_sceneManager) {
        const roomCfg = _sceneManager.getCurrentRoomConfig();
        if (roomCfg) {
          const [rx, ry, rz] = roomCfg.rolePosition;
          await Role.walkTo(new THREE.Vector3(rx, ry, rz), 300);
        }
      }
      if (interaction.tips) showTooltip(interaction.tips, 3000);
      await Role.sitDown(500);
      break;
    }

    case 'touch_item':
      await Role.raiseArm('right', -0.9, 200);
      await delay(200);
      await Role.raiseArm('right', 0, 200);
      break;

    case 'navigate': {
      const url = interaction.targetUrl;
      if (url) {
        if (url.startsWith('mailto:')) window.location.href = url;
        else window.open(url, '_blank');
      }
      break;
    }

    case 'wave':
      await Role.wave(400);
      break;

    default:
      break;
  }
}

export function executeTouchEffects(effects, itemId, itemConfig) {
  effects.forEach(effect => {
    switch (effect) {
      case 'light_up': Items.lightUp(itemId); break;
      case 'light_handle': Items.lightHandle(itemId); break;
      case 'scale_up': Items.scaleUp(itemId, 300); break;
      case 'shake': vibrate(itemConfig.interaction.vibration || 30); break;
    }
  });
}

export function isBusy() { return isRunning; }
