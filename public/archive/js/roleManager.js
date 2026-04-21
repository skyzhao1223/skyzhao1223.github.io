/**
 * roleManager.js — Q版角色
 * 对标参考图：棕发、蓝色外套（内白）、深蓝裤子、橙色鞋子
 */

import * as THREE from 'three';
import { clamp, lerp, delay } from './utils.js';
import { onUpdate, getScene } from './engine.js';

// ── 参考图色板 ──
const C_SKIN   = 0xffcc99;   // 肤色（暖桃）
const C_HAIR   = 0x6b3e26;   // 棕发
const C_EYE    = 0x1a0f08;   // 深棕眼睛
const C_WHITE  = 0xffffff;   // 白色（眼睛高光、内衬）
const C_JACKET = 0x5b9ec9;   // 蓝色外套
const C_INNER  = 0xf2f2f2;   // 白色内衬
const C_PANTS  = 0x2d3d6b;   // 深蓝裤子
const C_SHOE   = 0xe8662a;   // 橙色鞋子
const C_SOLE   = 0xffffff;   // 鞋底白色

let roleMesh = null;
let bodyGroup = null;
let headGroup = null;
let leftArm = null, rightArm = null;
let leftLeg = null, rightLeg = null;

let currentState = 'stand';
let breathTimer = 0;
let idleTimer = null;
const IDLE_TIMEOUT = 5000;

/* ===== 创建角色 ===== */
export function create() {
  roleMesh = new THREE.Group();
  roleMesh.name = 'role';
  bodyGroup = new THREE.Group();

  // 地面伪阴影
  const shadowMesh = new THREE.Mesh(
    new THREE.CircleGeometry(0.3, 16),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.08 })
  );
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = 0.005;
  roleMesh.add(shadowMesh);

  // ── 头部 (Q版大头) ──
  headGroup = new THREE.Group();

  const face = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.46, 0.46), _mat(C_SKIN));
  face.position.y = 0.23;
  headGroup.add(face);

  // 顶部头发
  const hairTop = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.20, 0.48), _mat(C_HAIR));
  hairTop.position.set(0, 0.43, 0);
  headGroup.add(hairTop);

  // 刘海
  const bang = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.10, 0.14), _mat(C_HAIR));
  bang.position.set(0, 0.33, 0.20);
  headGroup.add(bang);

  // 后发
  const backHair = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.26, 0.10), _mat(C_HAIR));
  backHair.position.set(0, 0.24, -0.26);
  headGroup.add(backHair);

  // 耳朵
  [-0.27, 0.27].forEach(x => {
    const ear = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.12, 0.09), _mat(C_SKIN));
    ear.position.set(x, 0.20, 0);
    headGroup.add(ear);
  });

  // 左眼（深色 + 白色高光）
  const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.12, 0.04), _mat(C_EYE));
  eyeL.position.set(-0.14, 0.24, 0.24);
  headGroup.add(eyeL);
  const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.04), _mat(C_WHITE));
  hlL.position.set(-0.11, 0.27, 0.25);
  headGroup.add(hlL);

  // 右眼
  const eyeR = eyeL.clone();
  eyeR.position.set(0.14, 0.24, 0.24);
  headGroup.add(eyeR);
  const hlR = hlL.clone();
  hlR.position.set(0.17, 0.27, 0.25);
  headGroup.add(hlR);

  // 腮红
  [{ x: -0.19 }, { x: 0.19 }].forEach(({ x }) => {
    const blush = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.06, 0.02),
      new THREE.MeshStandardMaterial({ color: 0xffaabb, roughness: 0.9, transparent: true, opacity: 0.6 })
    );
    blush.position.set(x, 0.17, 0.24);
    headGroup.add(blush);
  });

  // 小嘴（浅线条）
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.03, 0.02), _mat(0xdd8866));
  mouth.position.set(0, 0.12, 0.24);
  headGroup.add(mouth);

  headGroup.position.y = 0.92;
  bodyGroup.add(headGroup);

  // ── 躯干（蓝色外套 + 白色内衬）──
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.42, 0.28), _mat(C_JACKET));
  torso.position.y = 0.66;
  bodyGroup.add(torso);

  // 内衬（胸口白色竖条）
  const inner = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.36, 0.30), _mat(C_INNER));
  inner.position.set(0, 0.64, 0);
  bodyGroup.add(inner);

  // 外套翻领（左右两片）
  [{ x: -0.10, rz: 0.18 }, { x: 0.10, rz: -0.18 }].forEach(({ x, rz }) => {
    const lapel = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.26, 0.30), _mat(C_JACKET));
    lapel.position.set(x, 0.72, 0);
    lapel.rotation.z = rz;
    bodyGroup.add(lapel);
  });

  // ── 手臂 ──
  leftArm = _limb(0.13, 0.38, 0.13, C_JACKET);
  leftArm.position.set(-0.29, 0.72, 0);
  bodyGroup.add(leftArm);

  rightArm = _limb(0.13, 0.38, 0.13, C_JACKET);
  rightArm.position.set(0.29, 0.72, 0);
  bodyGroup.add(rightArm);

  // ── 腿部 ──
  leftLeg = _limb(0.17, 0.38, 0.17, C_PANTS);
  leftLeg.position.set(-0.12, 0.38, 0);
  bodyGroup.add(leftLeg);

  rightLeg = _limb(0.17, 0.38, 0.17, C_PANTS);
  rightLeg.position.set(0.12, 0.38, 0);
  bodyGroup.add(rightLeg);

  // ── 橙色鞋子 ──
  [-0.12, 0.12].forEach(x => {
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.10, 0.26), _mat(C_SHOE));
    upper.position.set(x, 0.10, 0.03);
    bodyGroup.add(upper);
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.04, 0.28), _mat(C_SOLE));
    sole.position.set(x, 0.04, 0.03);
    bodyGroup.add(sole);
  });

  roleMesh.add(bodyGroup);
  getScene().add(roleMesh);
  onUpdate(_breathe);
  return roleMesh;
}

function _limb(w, h, d, color) {
  const g = new THREE.Group();
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), _mat(color));
  m.position.y = -h / 2;
  g.add(m);
  return g;
}

function _mat(color) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.82, metalness: 0 });
}

function _breathe() {
  if (!bodyGroup || currentState === 'walk') return;
  breathTimer += 0.018;
  bodyGroup.position.y = Math.sin(breathTimer) * 0.006;
  if (headGroup) headGroup.rotation.z = Math.sin(breathTimer * 0.65) * 0.006;
}

/* ===== 状态接口 ===== */
export function setPosition(x, y, z) { roleMesh?.position.set(x, y, z); }
export function getPosition() { return roleMesh ? roleMesh.position.clone() : new THREE.Vector3(); }
export function getMesh() { return roleMesh; }
export function getState() { return currentState; }
export function setState(s) { currentState = s; }

/* 沙发坐姿：腿向前伸，脚悬空（对标参考图） */
export function sitDown(duration = 500) {
  if (currentState === 'sit') return Promise.resolve();
  currentState = 'sit';
  _clearIdle();
  return _pose({ llr: -1.35, rlr: -1.35, lar: 0.08, rar: -0.08, by: -0.05 }, duration);
}

export function standUp(duration = 200) {
  if (currentState === 'stand') return Promise.resolve();
  currentState = 'stand';
  _resetIdle();
  return _pose({ llr: 0, rlr: 0, lar: 0, rar: 0, by: 0 }, duration);
}

export function walkTo(targetPos, duration = 300) {
  currentState = 'walk';
  _resetIdle();
  const sp = roleMesh.position.clone();
  roleMesh.rotation.y = Math.atan2(targetPos.x - sp.x, targetPos.z - sp.z);
  return _animPos(sp, targetPos, duration, true);
}

export function wave(dur = 400) {
  return new Promise(res => {
    const t0 = performance.now();
    const tick = () => {
      const t = clamp((performance.now() - t0) / dur, 0, 1);
      if (rightArm) rightArm.rotation.z = -Math.sin(t * Math.PI * 3) * 0.55;
      t < 1 ? requestAnimationFrame(tick) : (rightArm && (rightArm.rotation.z = 0), res());
    };
    requestAnimationFrame(tick);
  });
}

export function raiseArm(side = 'right', angle = -1.0, dur = 200) {
  return new Promise(res => {
    const arm = side === 'right' ? rightArm : leftArm;
    if (!arm) { res(); return; }
    const from = arm.rotation.x, t0 = performance.now();
    const tick = () => {
      const t = clamp((performance.now() - t0) / dur, 0, 1);
      arm.rotation.x = lerp(from, angle, 1 - Math.pow(1 - t, 2));
      t < 1 ? requestAnimationFrame(tick) : res();
    };
    requestAnimationFrame(tick);
  });
}

export function turnHead(angle = 0.3, dur = 300) {
  return new Promise(res => {
    if (!headGroup) { res(); return; }
    const from = headGroup.rotation.y, t0 = performance.now();
    const tick = () => {
      const t = clamp((performance.now() - t0) / dur, 0, 1);
      headGroup.rotation.y = lerp(from, angle, 1 - Math.pow(1 - t, 2));
      t < 1 ? requestAnimationFrame(tick) : res();
    };
    requestAnimationFrame(tick);
  });
}

export function tiltBody(zAngle = 0.7, dur = 200) {
  return new Promise(res => {
    if (!bodyGroup) { res(); return; }
    const from = bodyGroup.rotation.z, t0 = performance.now();
    const tick = () => {
      const t = clamp((performance.now() - t0) / dur, 0, 1);
      bodyGroup.rotation.z = lerp(from, zAngle, 1 - Math.pow(1 - t, 2));
      t < 1 ? requestAnimationFrame(tick) : res();
    };
    requestAnimationFrame(tick);
  });
}

export function knockDoor(dur = 400) {
  return new Promise(res => {
    const t0 = performance.now();
    const tick = () => {
      const t = clamp((performance.now() - t0) / dur, 0, 1);
      if (rightArm) rightArm.rotation.x = -Math.abs(Math.sin(t * Math.PI * 2)) * 0.9;
      t < 1 ? requestAnimationFrame(tick) : (rightArm && (rightArm.rotation.x = 0), res());
    };
    requestAnimationFrame(tick);
  });
}

export function fadeOut(dur = 200) { return _fade(1, 0, dur); }
export function fadeIn(dur = 200) { return _fade(0, 1, dur); }

function _fade(from, to, dur) {
  const mats = [];
  roleMesh.traverse(c => { if (c.isMesh && c.material) { c.material.transparent = true; mats.push(c.material); } });
  return new Promise(res => {
    const t0 = performance.now();
    const tick = () => {
      const t = clamp((performance.now() - t0) / dur, 0, 1);
      mats.forEach(m => { m.opacity = lerp(from, to, t); });
      t < 1 ? requestAnimationFrame(tick) : res();
    };
    requestAnimationFrame(tick);
  });
}

export function resetPose(dur = 200) {
  _tp(bodyGroup.rotation, 'z', 0, dur);
  _tp(headGroup.rotation, 'y', 0, dur);
  [rightArm, leftArm].forEach(a => { if (a) { _tp(a.rotation, 'x', 0, dur); _tp(a.rotation, 'z', 0, dur); } });
  return delay(dur);
}

export function startIdleTimer() { _resetIdle(); }

function _resetIdle() {
  _clearIdle();
  idleTimer = setTimeout(() => { if (currentState !== 'sit') sitDown(); }, IDLE_TIMEOUT);
}
function _clearIdle() { if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; } }

function _pose(p, dur) {
  return new Promise(res => {
    const sll = leftLeg?.rotation.x ?? 0, srl = rightLeg?.rotation.x ?? 0;
    const sla = leftArm?.rotation.z ?? 0, sra = rightArm?.rotation.z ?? 0;
    const sby = bodyGroup?.position.y ?? 0;
    const t0 = performance.now();
    const tick = () => {
      const t = clamp((performance.now() - t0) / dur, 0, 1);
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      if (leftLeg) leftLeg.rotation.x = lerp(sll, p.llr, e);
      if (rightLeg) rightLeg.rotation.x = lerp(srl, p.rlr, e);
      if (leftArm) leftArm.rotation.z = lerp(sla, p.lar, e);
      if (rightArm) rightArm.rotation.z = lerp(sra, p.rar, e);
      if (bodyGroup) bodyGroup.position.y = lerp(sby, p.by, e);
      t < 1 ? requestAnimationFrame(tick) : res();
    };
    requestAnimationFrame(tick);
  });
}

function _animPos(from, to, dur, walk) {
  return new Promise(res => {
    const t0 = performance.now();
    const tick = () => {
      const t = clamp((performance.now() - t0) / dur, 0, 1);
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      roleMesh.position.lerpVectors(from, to, e);
      if (walk) {
        const s = Math.sin(t * Math.PI * 4) * 0.28;
        if (leftArm) leftArm.rotation.x = s;
        if (rightArm) rightArm.rotation.x = -s;
        if (leftLeg) leftLeg.rotation.x = -s * 0.5;
        if (rightLeg) rightLeg.rotation.x = s * 0.5;
      }
      if (t < 1) { requestAnimationFrame(tick); return; }
      if (walk) [leftArm, rightArm, leftLeg, rightLeg].forEach(l => l && (l.rotation.x = 0));
      currentState = 'stand';
      res();
    };
    requestAnimationFrame(tick);
  });
}

function _tp(obj, prop, target, dur) {
  const from = obj[prop], t0 = performance.now();
  const tick = () => {
    const t = clamp((performance.now() - t0) / dur, 0, 1);
    obj[prop] = lerp(from, target, 1 - Math.pow(1 - t, 2));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
