/**
 * engine.js — 3D 渲染引擎核心模块
 * 相机正面俯视，对标参考图视角
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { clamp, PERF_TIER } from './utils.js';

let scene, camera, renderer, controls;
const updateCallbacks = [];

export function init() {
  const canvas = document.getElementById('canvas3d');

  scene = new THREE.Scene();
  scene.background = new THREE.Color('#EDE4D4');

  const aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 60);
  camera.position.set(0, 3.8, 9.2);
  camera.lookAt(0, 1.2, 0);

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: PERF_TIER === 'high',
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = false;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  _setupLights();

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.minDistance = 5;
  controls.maxDistance = 16;
  controls.minPolarAngle = Math.PI / 12;
  controls.maxPolarAngle = Math.PI / 2.3;
  controls.rotateSpeed = 0.5;
  controls.zoomSpeed = 0.7;
  controls.target.set(0, 1.2, 0);
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_ROTATE
  };

  window.addEventListener('resize', _onResize);
  _loop();
}

function _setupLights() {
  // 暖色半球光（天空米白 + 地面木色）
  const hemi = new THREE.HemisphereLight(0xfff8ee, 0xd4a870, 0.65);
  scene.add(hemi);

  // 主平行光：左上方，偏暖
  const sun = new THREE.DirectionalLight(0xfffaf0, 1.1);
  sun.position.set(3, 9, 6);
  scene.add(sun);

  // 右侧补光：减少暗面
  const fill = new THREE.DirectionalLight(0xfff0e0, 0.45);
  fill.position.set(-5, 4, 4);
  scene.add(fill);

  // 后方轮廓光
  const rim = new THREE.DirectionalLight(0xffe8cc, 0.25);
  rim.position.set(0, 3, -7);
  scene.add(rim);
}

function _loop() {
  requestAnimationFrame(_loop);
  controls.update();
  for (const cb of updateCallbacks) cb();
  renderer.render(scene, camera);
}

function _onResize() {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

export function onUpdate(cb) { updateCallbacks.push(cb); }
export function offUpdate(cb) {
  const i = updateCallbacks.indexOf(cb);
  if (i !== -1) updateCallbacks.splice(i, 1);
}

export function moveCameraTo(targetPos, targetLook, duration = 600) {
  const sp = camera.position.clone(), sl = controls.target.clone();
  const t0 = performance.now();
  return new Promise(resolve => {
    function tick() {
      const t = clamp((performance.now() - t0) / duration, 0, 1);
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      camera.position.lerpVectors(sp, targetPos, e);
      controls.target.lerpVectors(sl, targetLook, e);
      controls.update();
      if (t < 1) requestAnimationFrame(tick); else resolve();
    }
    requestAnimationFrame(tick);
  });
}

const raycaster = new THREE.Raycaster();
const ndcPtr = new THREE.Vector2();

export function raycast(cx, cy, objects) {
  ndcPtr.x = (cx / window.innerWidth) * 2 - 1;
  ndcPtr.y = -(cy / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(ndcPtr, camera);
  const hits = raycaster.intersectObjects(objects, true);
  return hits.length > 0 ? hits[0] : null;
}

export function getScene() { return scene; }
export function getCamera() { return camera; }
export function getRenderer() { return renderer; }
export function getControls() { return controls; }
export { THREE };
