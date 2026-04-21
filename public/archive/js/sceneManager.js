/**
 * sceneManager.js — 场景管理模块
 * 对标参考图：米白墙、木地板（地板线）、Low-Poly 沙发、白色咖啡桌、两侧门
 */

import * as THREE from 'three';
import { loadJSON, sceneTransition, setRoomLabel, delay } from './utils.js';
import { getScene, getCamera, getControls, moveCameraTo } from './engine.js';
import * as Role from './roleManager.js';
import * as Items from './itemManager.js';

let roomsConfig = [];
const roomConfigMap = {};
let currentRoomId = null;

export async function loadConfig() {
  const data = await loadJSON('config/rooms.json');
  roomsConfig = data.rooms;
  roomsConfig.forEach(r => { roomConfigMap[r.id] = r; });
}

export async function enterDefault() {
  await _loadRoom('living_room', false);
}

export function switchRoom(roomId) {
  sceneTransition(async () => { await _loadRoom(roomId, true); }, 400);
}

export async function backToLivingRoom() {
  if (currentRoomId === 'living_room') return;
  sceneTransition(async () => { await _loadRoom('living_room', true); }, 300);
}

async function _loadRoom(roomId, animate) {
  const config = roomConfigMap[roomId];
  if (!config) { console.warn('[SceneManager] 未知房间:', roomId); return; }

  currentRoomId = roomId;
  const scene = getScene();

  scene.background = new THREE.Color(config.background.wallColor);

  _buildGeometry(scene, config);
  Items.buildLayout(config.defaultLayout);

  const camPos = new THREE.Vector3(...config.cameraPosition);
  const camTarget = new THREE.Vector3(...config.cameraTarget);
  getControls().target.copy(camTarget);

  if (animate) {
    moveCameraTo(camPos, camTarget, 500);
  } else {
    getCamera().position.copy(camPos);
    getCamera().lookAt(camTarget);
  }

  // 重置角色
  const [rx, ry, rz] = config.rolePosition;
  Role.setPosition(rx, ry, rz);
  Role.getMesh().visible = true;
  Role.getMesh().traverse(c => {
    if (c.isMesh && c.material) { c.material.opacity = 1; c.material.transparent = false; }
  });
  Role.setState('stand');
  Role.getMesh().rotation.y = 0;

  if (config.roleDefaultState === 'sit') {
    await delay(300);
    Role.sitDown(500);
  }

  setRoomLabel(config.name);
  const backBtn = document.getElementById('back-btn');
  if (backBtn) backBtn.classList.toggle('hidden', roomId === 'living_room');

  if (roomId === 'living_room') Role.startIdleTimer();
}

/* ===== 房间几何体构建 ===== */
const ROOM_TAG = '__room_geo__';

function _buildGeometry(scene, config) {
  // 清理旧几何体
  const toRemove = [];
  scene.traverse(c => { if (c.userData[ROOM_TAG]) toRemove.push(c); });
  toRemove.forEach(c => {
    scene.remove(c);
    if (c.geometry) c.geometry.dispose();
    if (c.material) { Array.isArray(c.material) ? c.material.forEach(m => m.dispose()) : c.material.dispose(); }
  });

  if (config.id === 'living_room') {
    _buildLivingRoom(scene, config);
  } else if (config.id === 'equipment_room') {
    _buildEquipmentRoom(scene, config);
  }
}

/* ===== 客厅：对标参考图 ===== */
function _buildLivingRoom(scene, config) {
  const wallC = config.background.wallColor;    // 米白
  const floorC = config.background.floorColor;  // 木色

  // ── 地板 ──
  const floorGeo = new THREE.PlaneGeometry(14, 14);
  const floor = new THREE.Mesh(floorGeo,
    new THREE.MeshStandardMaterial({ color: new THREE.Color(floorC), roughness: 0.9, metalness: 0 }));
  floor.rotation.x = -Math.PI / 2;
  floor.userData[ROOM_TAG] = true;
  scene.add(floor);

  // 地板木纹线（水平方向条状）
  const plankMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(floorC).multiplyScalar(0.82), roughness: 1 });
  for (let i = -6; i <= 6; i += 0.9) {
    const plankGeo = new THREE.PlaneGeometry(14, 0.04);
    const plank = new THREE.Mesh(plankGeo, plankMat);
    plank.rotation.x = -Math.PI / 2;
    plank.position.set(0, 0.002, i);
    plank.userData[ROOM_TAG] = true;
    scene.add(plank);
  }

  // ── 后墙 ──
  _addWall(scene, 14, 6, wallC, m => { m.position.set(0, 3, -4.8); });

  // ── 左墙 ──
  _addWall(scene, 10, 6, wallC, m => { m.rotation.y = Math.PI / 2; m.position.set(-6.5, 3, -0.5); });

  // ── 右墙 ──
  _addWall(scene, 10, 6, wallC, m => { m.rotation.y = -Math.PI / 2; m.position.set(6.5, 3, -0.5); });

  // ── 踢脚线（三面墙底部深色条） ──
  const skirtColor = new THREE.Color(wallC).multiplyScalar(0.88);
  _addBox(scene, 14, 0.12, 0.06, skirtColor, m => m.position.set(0, 0.06, -4.77));
  _addBox(scene, 10, 0.12, 0.06, skirtColor, m => { m.rotation.y = Math.PI / 2; m.position.set(-6.47, 0.06, -0.5); });
  _addBox(scene, 10, 0.12, 0.06, skirtColor, m => { m.rotation.y = Math.PI / 2; m.position.set(6.47, 0.06, -0.5); });

  // ── 沙发（对标参考图：Low-Poly 米色三人沙发） ──
  _buildSofa(scene);

  // ── 咖啡桌（白色，细腿） ──
  _buildCoffeeTable(scene);
}

/* ===== Low-Poly 沙发 ===== */
function _buildSofa(scene) {
  const sofaColor = 0xe8dcc8;     // 米白/奶油
  const sofaDark  = 0xd4c8b0;     // 深一级（扶手/腿）
  const legColor  = 0xf0ede8;     // 腿：更浅白

  // 座垫（分三块，让 flat-shading 产生多面体感）
  const seatMat = new THREE.MeshStandardMaterial({ color: sofaColor, roughness: 0.85, flatShading: true });

  // 整体座垫底
  const seatGeo = new THREE.BoxGeometry(3.4, 0.32, 1.0);
  const seat = new THREE.Mesh(seatGeo, seatMat);
  seat.position.set(0, 0.44, 0.2);
  seat.userData[ROOM_TAG] = true;
  _addEdgeLines(seat, seatGeo);
  scene.add(seat);

  // 座垫面（凸出，三块分开）
  [-1.0, 0, 1.0].forEach(x => {
    const cushGeo = new THREE.BoxGeometry(0.94, 0.16, 0.96);
    const cush = new THREE.Mesh(cushGeo,
      new THREE.MeshStandardMaterial({ color: new THREE.Color(sofaColor).lerp(new THREE.Color(0xffffff), 0.08), roughness: 0.82, flatShading: true }));
    cush.position.set(x, 0.66, 0.22);
    cush.userData[ROOM_TAG] = true;
    _addEdgeLines(cush, cushGeo);
    scene.add(cush);
  });

  // 靠背（整体）
  const backGeo = new THREE.BoxGeometry(3.4, 0.80, 0.28);
  const back = new THREE.Mesh(backGeo,
    new THREE.MeshStandardMaterial({ color: sofaColor, roughness: 0.85, flatShading: true }));
  back.position.set(0, 0.90, -0.32);
  back.userData[ROOM_TAG] = true;
  _addEdgeLines(back, backGeo);
  scene.add(back);

  // 靠背靠垫（三块）
  [-1.0, 0, 1.0].forEach(x => {
    const bCushGeo = new THREE.BoxGeometry(0.94, 0.70, 0.12);
    const bCush = new THREE.Mesh(bCushGeo,
      new THREE.MeshStandardMaterial({ color: new THREE.Color(sofaColor).lerp(new THREE.Color(0xffffff), 0.06), roughness: 0.8, flatShading: true }));
    bCush.position.set(x, 0.90, -0.19);
    bCush.userData[ROOM_TAG] = true;
    _addEdgeLines(bCush, bCushGeo);
    scene.add(bCush);
  });

  // 左扶手
  const armGeo = new THREE.BoxGeometry(0.30, 0.70, 1.06);
  const armMat = new THREE.MeshStandardMaterial({ color: sofaDark, roughness: 0.85, flatShading: true });
  const armL = new THREE.Mesh(armGeo, armMat);
  armL.position.set(-1.72, 0.64, 0.16);
  armL.userData[ROOM_TAG] = true;
  _addEdgeLines(armL, armGeo);
  scene.add(armL);

  // 右扶手
  const armR = armL.clone();
  armR.position.set(1.72, 0.64, 0.16);
  armR.userData[ROOM_TAG] = true;
  scene.add(armR);

  // 沙发底座
  const baseGeo = new THREE.BoxGeometry(3.4, 0.14, 1.06);
  const base = new THREE.Mesh(baseGeo,
    new THREE.MeshStandardMaterial({ color: sofaDark, roughness: 0.88 }));
  base.position.set(0, 0.16, 0.16);
  base.userData[ROOM_TAG] = true;
  _addEdgeLines(base, baseGeo);
  scene.add(base);

  // 四条腿（白色细腿）
  const legMat = new THREE.MeshStandardMaterial({ color: legColor, roughness: 0.9 });
  [[-1.4, -0.46], [-1.4, 0.58], [1.4, -0.46], [1.4, 0.58]].forEach(([lx, lz]) => {
    const legGeo = new THREE.BoxGeometry(0.10, 0.14, 0.10);
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(lx, 0.07, lz);
    leg.userData[ROOM_TAG] = true;
    _addEdgeLines(leg, legGeo);
    scene.add(leg);
  });
}

/* ===== 咖啡桌（白色，黑描边，细腿） ===== */
function _buildCoffeeTable(scene) {
  const tableColor = 0xf8f5f0;
  const legColor   = 0xeeebe5;
  const tableMat = new THREE.MeshStandardMaterial({ color: tableColor, roughness: 0.85 });

  // 桌面
  const topGeo = new THREE.BoxGeometry(3.7, 0.10, 1.35);
  const top = new THREE.Mesh(topGeo, tableMat);
  top.position.set(0, 0.60, 3.1);
  top.userData[ROOM_TAG] = true;
  _addEdgeLines(top, topGeo);
  scene.add(top);

  // 桌面下边缘条
  const rimGeo = new THREE.BoxGeometry(3.7, 0.06, 1.35);
  const rim = new THREE.Mesh(rimGeo,
    new THREE.MeshStandardMaterial({ color: new THREE.Color(tableColor).multiplyScalar(0.92), roughness: 0.88 }));
  rim.position.set(0, 0.52, 3.1);
  rim.userData[ROOM_TAG] = true;
  _addEdgeLines(rim, rimGeo);
  scene.add(rim);

  // 四条细腿
  const legMat = new THREE.MeshStandardMaterial({ color: legColor, roughness: 0.9 });
  [[-1.7, 2.5], [-1.7, 3.7], [1.7, 2.5], [1.7, 3.7]].forEach(([lx, lz]) => {
    const legGeo = new THREE.BoxGeometry(0.08, 0.56, 0.08);
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(lx, 0.28, lz);
    leg.userData[ROOM_TAG] = true;
    _addEdgeLines(leg, legGeo);
    scene.add(leg);
  });
}

/* ===== 器材库 ===== */
function _buildEquipmentRoom(scene, config) {
  const wallC  = config.background.wallColor;
  const floorC = config.background.floorColor;

  // 地板
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 14),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(floorC), roughness: 0.9 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.userData[ROOM_TAG] = true;
  scene.add(floor);

  // 地板线
  const plankMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(floorC).multiplyScalar(0.82), roughness: 1 });
  for (let i = -6; i <= 6; i += 0.9) {
    const plank = new THREE.Mesh(new THREE.PlaneGeometry(14, 0.04), plankMat);
    plank.rotation.x = -Math.PI / 2;
    plank.position.set(0, 0.002, i);
    plank.userData[ROOM_TAG] = true;
    scene.add(plank);
  }

  // 墙壁
  _addWall(scene, 14, 6, wallC, m => m.position.set(0, 3, -4.8));
  _addWall(scene, 10, 6, wallC, m => { m.rotation.y = Math.PI / 2; m.position.set(-6.5, 3, -0.5); });
  _addWall(scene, 10, 6, wallC, m => { m.rotation.y = -Math.PI / 2; m.position.set(6.5, 3, -0.5); });

  // 器材架（靠后墙）
  const frameColor = 0x8b7355;
  const shelfColor = 0xd4c5a9;

  _addBox(scene, 7.2, 3.0, 0.35, frameColor, m => m.position.set(0, 1.5, -2.1));

  for (let col = -1; col <= 1; col++) {
    for (let row = 0; row < 2; row++) {
      _addBox(scene, 2.0, 0.06, 0.35, shelfColor, m => m.position.set(col * 2.4, 0.72 + row * 1.15, -1.95));
    }
  }

  // 地面标线
  const lineMat = new THREE.MeshStandardMaterial({ color: 0xb0a090 });
  const line = new THREE.Mesh(new THREE.PlaneGeometry(7.5, 0.05), lineMat);
  line.rotation.x = -Math.PI / 2;
  line.position.set(0, 0.01, -1.0);
  line.userData[ROOM_TAG] = true;
  scene.add(line);

  // 返回箭头示意贴地板
  const exitMat = new THREE.MeshStandardMaterial({ color: 0xc0a880, transparent: true, opacity: 0.5 });
  const exitCircle = new THREE.Mesh(new THREE.CircleGeometry(0.4, 16), exitMat);
  exitCircle.rotation.x = -Math.PI / 2;
  exitCircle.position.set(0, 0.01, 3.5);
  exitCircle.userData[ROOM_TAG] = true;
  scene.add(exitCircle);
}

/* ===== 辅助函数 ===== */
function _addWall(scene, w, h, color, setup) {
  const geo = new THREE.PlaneGeometry(w, h);
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color), roughness: 0.92, side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geo, mat);
  setup(mesh);
  mesh.userData[ROOM_TAG] = true;
  scene.add(mesh);
}

function _addBox(scene, w, h, d, color, setup) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.88 });
  const mesh = new THREE.Mesh(geo, mat);
  setup(mesh);
  mesh.userData[ROOM_TAG] = true;
  scene.add(mesh);
  return mesh;
}

function _addEdgeLines(mesh, geo, color = 0x111111, threshold = 25) {
  const edges = new THREE.EdgesGeometry(geo, threshold);
  const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color }));
  mesh.add(lines);
}

export function getCurrentRoomConfig() { return roomConfigMap[currentRoomId]; }
export function getCurrentRoomId() { return currentRoomId; }
