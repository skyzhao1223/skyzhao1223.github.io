/**
 * itemManager.js — 物品管理模块
 * 六边形徽章（对标参考图）、带描边的门、器材库物品
 */

import * as THREE from 'three';
import { clamp, lerp, loadJSON, PERF_TIER } from './utils.js';
import { getScene } from './engine.js';

let itemsConfig = [];
const itemConfigMap = {};
const itemMeshMap = {};
let interactableObjects = [];

export async function loadConfig() {
  const data = await loadJSON('config/items.json');
  itemsConfig = data.items;
  itemsConfig.forEach(item => { itemConfigMap[item.id] = item; });
}

export function buildLayout(layoutItems) {
  const scene = getScene();
  clearAll();
  interactableObjects = [];

  layoutItems.forEach(layout => {
    const config = itemConfigMap[layout.itemId];
    if (!config) return;

    const group = _buildMesh(config);
    const [x, y, z] = layout.position;
    const [rx, ry, rz] = layout.rotation || [0, 0, 0];
    group.position.set(x, y, z);
    group.rotation.set(rx, ry, rz);
    group.userData.originPos = group.position.clone();
    group.userData.originRot = { y: ry };
    group.userData.originScale = group.scale.clone();
    group.userData.itemId = config.id;
    group.userData.itemConfig = config;
    group.userData.label = layout.label || config.name;

    itemMeshMap[config.id] = group;
    scene.add(group);

    group.traverse(c => {
      if (c.isMesh) { c.userData.itemId = config.id; interactableObjects.push(c); }
    });
  });
}

export function clearAll() {
  const scene = getScene();
  Object.keys(itemMeshMap).forEach(id => {
    const m = itemMeshMap[id];
    if (m?.parent) scene.remove(m);
    _dispose(m);
    delete itemMeshMap[id];
  });
  interactableObjects = [];
}

/* ===== 物品造型分发 ===== */
function _buildMesh(config) {
  switch (config.type) {
    case 'navigation': return _buildBadge(config);
    case 'door':       return _buildDoor(config);
    case 'hobby':      return _buildHobbyItem(config);
    default:           return _buildGeneric(config);
  }
}

/* ===== 六边形徽章（对标参考图的大按钮风格） ===== */
function _buildBadge(config) {
  const group = new THREE.Group();
  group.name = config.id;
  const baseColor = new THREE.Color(config['3dModel'].color);
  const darkColor = baseColor.clone().multiplyScalar(0.68);
  const lightColor = baseColor.clone().lerp(new THREE.Color(0xffffff), 0.18);

  // 外层底座（深色六边形，宽而矮）
  const baseGeo = new THREE.CylinderGeometry(0.5, 0.52, 0.14, 6);
  const baseMesh = new THREE.Mesh(baseGeo, _std(darkColor));
  baseMesh.name = config.id + '_base';
  _addEdges(baseMesh, baseGeo);
  group.add(baseMesh);

  // 中间层（主色，稍窄）
  const midGeo = new THREE.CylinderGeometry(0.44, 0.47, 0.10, 6);
  const midMesh = new THREE.Mesh(midGeo, _std(baseColor));
  midMesh.position.y = 0.11;
  _addEdges(midMesh, midGeo);
  group.add(midMesh);

  // 顶面（亮色，最窄）
  const topGeo = new THREE.CylinderGeometry(0.40, 0.43, 0.06, 6);
  const topMesh = new THREE.Mesh(topGeo, _std(lightColor));
  topMesh.position.y = 0.19;
  topMesh.name = config.id + '_body';
  topMesh.userData.originalColor = '#' + baseColor.getHexString();
  _addEdges(topMesh, topGeo);
  group.add(topMesh);

  // 图标（白色小几何图形）
  _addBadgeIcon(group, config.id, 0.26);

  return group;
}

/* ===== 各徽章图标（对标参考图的图标造型） ===== */
function _addBadgeIcon(group, id, y) {
  const iconMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });

  switch (id) {
    case 'badge_portfolio': {
      // 房屋/盾牌形：方形底座 + 三角顶
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.06), iconMat);
      body.position.set(0, y, 0);
      group.add(body);
      const geo = new THREE.CylinderGeometry(0, 0.16, 0.12, 3);
      const roof = new THREE.Mesh(geo, iconMat);
      roof.position.set(0, y + 0.15, 0);
      group.add(roof);
      break;
    }
    case 'badge_blog': {
      // 向下箭头
      const stem = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.18, 0.06), iconMat);
      stem.position.set(0, y + 0.04, 0);
      group.add(stem);
      const tip = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.14, 0.10, 3), iconMat);
      tip.position.set(0, y - 0.04, 0);
      group.add(tip);
      break;
    }
    case 'badge_github': {
      // 音符：圆头 + 短竖线 + 横旗
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 6), iconMat);
      ball.position.set(-0.05, y - 0.02, 0);
      group.add(ball);
      const stem = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.20, 0.04), iconMat);
      stem.position.set(0.04, y + 0.06, 0);
      group.add(stem);
      const flag = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.04), iconMat);
      flag.position.set(0.10, y + 0.15, 0);
      group.add(flag);
      break;
    }
    case 'badge_contact': {
      // 齿轮：中心圆 + 8个小凸起
      const center = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.06, 8), iconMat);
      center.position.set(0, y, 0);
      group.add(center);
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.06), iconMat);
        tooth.position.set(Math.cos(angle) * 0.16, y, Math.sin(angle) * 0.16);
        group.add(tooth);
      }
      break;
    }
  }
}

/* ===== 门（对标参考图：白色、带框、黑色描边） ===== */
function _buildDoor(config) {
  const group = new THREE.Group();
  group.name = config.id;

  // 门框背板（浅灰）
  const frameGeo = new THREE.BoxGeometry(1.0, 2.2, 0.06);
  const frameMesh = new THREE.Mesh(frameGeo, _std(0xe8e4dc));
  _addEdges(frameMesh, frameGeo);
  group.add(frameMesh);

  // 门板（白色，略小于门框）
  const panelGeo = new THREE.BoxGeometry(0.86, 2.04, 0.08);
  const panelMesh = new THREE.Mesh(panelGeo, _std(0xfafafa));
  panelMesh.position.z = 0.04;
  panelMesh.name = config.id + '_body';
  panelMesh.userData.originalColor = '#fafafa';
  _addEdges(panelMesh, panelGeo);
  group.add(panelMesh);

  // 门板内嵌面板（上下两块凹陷矩形）
  [0.55, -0.55].forEach(dy => {
    const insetGeo = new THREE.BoxGeometry(0.64, 0.62, 0.04);
    const inset = new THREE.Mesh(insetGeo, _std(0xf0edea));
    inset.position.set(0, dy, 0.08);
    _addEdges(inset, insetGeo);
    group.add(inset);
  });

  // 门把手（金属球）
  const handleGeo = new THREE.SphereGeometry(0.058, 8, 8);
  const handle = new THREE.Mesh(handleGeo,
    new THREE.MeshStandardMaterial({ color: 0xc8b080, roughness: 0.3, metalness: 0.7 }));
  handle.position.set(0.34, 0, 0.12);
  handle.name = 'door_handle';
  group.add(handle);

  return group;
}

/* ===== 器材库物品（更有辨识度的造型） ===== */
function _buildHobbyItem(config) {
  const group = new THREE.Group();
  group.name = config.id;

  switch (config.id) {
    case 'guitar':         _buildGuitar(group); break;
    case 'microphone':     _buildMic(group); break;
    case 'ski_board':      _buildSkiBoard(group); break;
    case 'swim_goggles':   _buildGoggles(group); break;
    case 'tennis_racket':  _buildRacket(group, 0x8bc34a); break;
    case 'badminton_racket': _buildRacket(group, 0x9c27b0); break;
    default:               _buildGenericShape(group, config); break;
  }

  // 给主体网格注册 itemId
  group.traverse(c => { if (c.isMesh) c.userData.originalColor = '#aaaaaa'; });
  return group;
}

function _buildGuitar(group) {
  const c = 0x4caf50;
  // 琴身（大）
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.58, 0.10), _std(c));
  body.name = 'guitar_body';
  _addEdges(body, body.geometry);
  group.add(body);
  // 琴颈
  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.72, 0.07), _std(0x8d6e48));
  neck.position.y = 0.65;
  _addEdges(neck, neck.geometry);
  group.add(neck);
  // 琴头
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.07), _std(0x8d6e48));
  head.position.y = 1.06;
  _addEdges(head, head.geometry);
  group.add(head);
  // 音孔
  const holeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.12, 8);
  const hole = new THREE.Mesh(holeGeo, _std(0x1a1a1a));
  hole.rotation.x = Math.PI / 2;
  group.add(hole);
}

function _buildMic(group) {
  const ballGeo = new THREE.SphereGeometry(0.18, 8, 8);
  const ball = new THREE.Mesh(ballGeo, _std(0x212121));
  ball.position.y = 0.46;
  _addEdges(ball, ballGeo);
  group.add(ball);
  const bodyGeo = new THREE.CylinderGeometry(0.07, 0.09, 0.42, 8);
  const body = new THREE.Mesh(bodyGeo, _std(0x616161));
  body.name = 'microphone_body';
  _addEdges(body, bodyGeo);
  group.add(body);
}

function _buildSkiBoard(group) {
  const geo = new THREE.BoxGeometry(1.5, 0.06, 0.24);
  const board = new THREE.Mesh(geo, _std(0xff5722));
  board.name = 'ski_board_body';
  _addEdges(board, geo);
  group.add(board);
  // 绑带
  [-0.3, 0.3].forEach(x => {
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.26), _std(0xffffff));
    strap.position.x = x;
    group.add(strap);
  });
}

function _buildGoggles(group) {
  const lensGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 8);
  [-0.15, 0.15].forEach(x => {
    const lens = new THREE.Mesh(lensGeo, _std(0x03a9f4));
    lens.position.x = x;
    _addEdges(lens, lensGeo);
    group.add(lens);
  });
  const bridgeGeo = new THREE.BoxGeometry(0.10, 0.04, 0.05);
  const bridge = new THREE.Mesh(bridgeGeo, _std(0x0288d1));
  group.add(bridge);
  group.name = 'swim_goggles_body';
}

function _buildRacket(group, color) {
  const frameGeo = new THREE.TorusGeometry(0.24, 0.03, 4, 12);
  const frame = new THREE.Mesh(frameGeo, _std(color));
  frame.name = 'racket_body';
  frame.position.y = 0.4;
  group.add(frame);
  const handleGeo = new THREE.BoxGeometry(0.06, 0.50, 0.06);
  const handle = new THREE.Mesh(handleGeo, _std(0xffffff));
  handle.position.y = 0.05;
  _addEdges(handle, handleGeo);
  group.add(handle);
}

function _buildGenericShape(group, config) {
  const model = config['3dModel'];
  let geo;
  switch (model.shape) {
    case 'cylinder': geo = new THREE.CylinderGeometry(model.size[0], model.size[2], model.size[1], 8); break;
    case 'sphere':   geo = new THREE.SphereGeometry(model.size[0], 8, 8); break;
    default:         geo = new THREE.BoxGeometry(...model.size);
  }
  const mesh = new THREE.Mesh(geo, _std(new THREE.Color(model.color)));
  mesh.name = config.id + '_body';
  mesh.userData.originalColor = model.color;
  _addEdges(mesh, geo);
  group.add(mesh);
}

function _buildGeneric(config) {
  const group = new THREE.Group();
  _buildGenericShape(group, config);
  return group;
}

/* ===== 描边辅助（EdgesGeometry 黑线轮廓） ===== */
function _addEdges(mesh, geo, color = 0x111111, threshold = 20) {
  const edges = new THREE.EdgesGeometry(geo, threshold);
  const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color }));
  mesh.add(lines);
}

/* ===== 材质 ===== */
function _std(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.82, metalness: 0, flatShading: false, ...opts });
}

/* ===== 视觉反馈 ===== */
export function lightUp(itemId, hex = '#ffe082') {
  if (PERF_TIER === 'low') return;
  const group = itemMeshMap[itemId];
  if (!group) return;
  group.traverse(c => {
    if (c.isMesh && c.material?.isMeshStandardMaterial) {
      c.material.emissive = new THREE.Color(hex);
      c.material.emissiveIntensity = 0.55;
    }
  });
  setTimeout(() => {
    group.traverse(c => {
      if (c.isMesh && c.material?.isMeshStandardMaterial) {
        c.material.emissive.set(0x000000);
        c.material.emissiveIntensity = 0;
      }
    });
  }, 500);
}

export function lightHandle(itemId) {
  if (PERF_TIER === 'low') return;
  const handle = itemMeshMap[itemId]?.getObjectByName('door_handle');
  if (!handle) return;
  handle.material.emissive = new THREE.Color(0xffffff);
  handle.material.emissiveIntensity = 0.7;
  setTimeout(() => {
    handle.material.emissive.set(0x000000);
    handle.material.emissiveIntensity = 0;
  }, 500);
}

export function scaleUp(itemId, duration = 300) {
  if (PERF_TIER === 'low') return;
  const group = itemMeshMap[itemId];
  if (!group) return;
  const origin = group.userData.originScale?.clone() || new THREE.Vector3(1, 1, 1);
  _tweenScale(group, origin.clone(), origin.clone().multiplyScalar(1.18), duration / 2)
    .then(() => _tweenScale(group, origin.clone().multiplyScalar(1.18), origin.clone(), duration / 2));
}

export function liftItem(itemId, duration = 200) {
  const group = itemMeshMap[itemId];
  if (!group) return Promise.resolve();
  const origin = group.userData.originPos.clone();
  return _tweenPos(group, origin, origin.clone().setY(origin.y + 0.3), duration);
}

export function resetItem(itemId, duration = 200) {
  const group = itemMeshMap[itemId];
  if (!group) return Promise.resolve();
  return _tweenPos(group, group.position.clone(), group.userData.originPos.clone(), duration);
}

export function openDoor(itemId, duration = 300) {
  const group = itemMeshMap[itemId];
  if (!group) return Promise.resolve();
  return _tweenRotY(group, group.rotation.y, group.rotation.y + Math.PI / 12, duration);
}

export function closeDoor(itemId, duration = 300) {
  const group = itemMeshMap[itemId];
  if (!group) return Promise.resolve();
  return _tweenRotY(group, group.rotation.y, group.userData.originRot.y, duration);
}

function _tweenScale(obj, from, to, dur) {
  return new Promise(res => {
    const t0 = performance.now();
    const tick = () => { const t = clamp((performance.now() - t0) / dur, 0, 1); obj.scale.lerpVectors(from, to, t); t < 1 ? requestAnimationFrame(tick) : res(); };
    requestAnimationFrame(tick);
  });
}

function _tweenPos(obj, from, to, dur) {
  return new Promise(res => {
    const t0 = performance.now();
    const tick = () => { const t = clamp((performance.now() - t0) / dur, 0, 1); obj.position.lerpVectors(from, to, t); t < 1 ? requestAnimationFrame(tick) : res(); };
    requestAnimationFrame(tick);
  });
}

function _tweenRotY(obj, from, to, dur) {
  return new Promise(res => {
    const t0 = performance.now();
    const tick = () => { const t = clamp((performance.now() - t0) / dur, 0, 1); obj.rotation.y = lerp(from, to, t); t < 1 ? requestAnimationFrame(tick) : res(); };
    requestAnimationFrame(tick);
  });
}

function _dispose(group) {
  if (!group) return;
  group.traverse(c => {
    if (c.geometry) c.geometry.dispose();
    if (c.material) { if (Array.isArray(c.material)) c.material.forEach(m => m.dispose()); else c.material.dispose(); }
  });
}

export function getConfig(itemId) { return itemConfigMap[itemId]; }
export function getMesh(itemId) { return itemMeshMap[itemId]; }
export function getInteractables() { return interactableObjects; }
export function getWorldPosition(itemId) {
  const group = itemMeshMap[itemId];
  if (!group) return new THREE.Vector3();
  const pos = new THREE.Vector3();
  group.getWorldPosition(pos);
  return pos;
}
