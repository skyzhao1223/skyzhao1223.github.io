import { initI18n, getLang } from './i18n/index.js';
import { initCoffee } from './components/coffee.js';
import { createFilterSection, renderLifeItems } from './components/work-list.js';
import { fetchSiteData } from './utils/data.js';

/* ============== 鼠标光晕 ============== */
const glow = document.getElementById('glow');
if (glow) {
  let mx = innerWidth / 2, my = innerHeight / 2, gx = mx, gy = my;
  window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  function loopGlow() {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    glow.style.transform = `translate(${gx}px, ${gy}px)`;
    requestAnimationFrame(loopGlow);
  }
  loopGlow();
}

/* ============== 星空粒子 ============== */
const cv = document.getElementById('stars');
if (cv) {
  const ctx = cv.getContext('2d');
  let stars = [];
  function resize() {
    cv.width = innerWidth * devicePixelRatio;
    cv.height = innerHeight * devicePixelRatio;
    cv.style.width = innerWidth + 'px';
    cv.style.height = innerHeight + 'px';
    const count = Math.min(60, Math.floor(innerWidth * innerHeight / 28000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      r: (Math.random() * 0.8 + 0.2) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.02 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.02 * devicePixelRatio,
      a: Math.random() * 0.3 + 0.08,
      tw: Math.random() * 0.01 + 0.003,
      ph: Math.random() * Math.PI * 2,
    }));
  }
  function draw(t) {
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (const s of stars) {
      s.x += s.vx; s.y += s.vy;
      if (s.x < 0) s.x = cv.width; if (s.x > cv.width) s.x = 0;
      if (s.y < 0) s.y = cv.height; if (s.y > cv.height) s.y = 0;
      const a = s.a * (0.6 + 0.4 * Math.sin(t * s.tw + s.ph));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 190, 210, ${a.toFixed(3)})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  resize();
  draw(0);
  window.addEventListener('resize', resize);
}

/* ============== 打字机 ============== */
const PHRASES = {
  zh: [
    'code · design · build · ship',
    '用代码造东西的人',
    'make it work, make it beautiful.',
  ],
  en: [
    'code · design · build · ship',
    'pixels, models, and machines',
    'make it work, make it beautiful.',
  ],
};
const typed = document.getElementById('typed');
if (typed) {
  let pi = 0, ci = 0, deleting = false;
  function type() {
    const phrases = PHRASES[getLang()] || PHRASES.zh;
    const cur = phrases[pi % phrases.length];
    if (!deleting) {
      ci++;
      typed.textContent = cur.slice(0, ci);
      if (ci === cur.length) { deleting = true; setTimeout(type, 1600); return; }
    } else {
      ci--;
      typed.textContent = cur.slice(0, ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 35 : 70);
  }
  type();
}

/* ============== 滚动入场 + 数字滚动 ============== */
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      e.target.querySelectorAll('[data-count]').forEach((el) => {
        if (el.dataset.static) return;
        const target = parseInt(el.dataset.count, 10);
        if (isNaN(target)) return;
        const dur = 1200, start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target).toString();
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      e.target.querySelectorAll('.fill[data-pct]').forEach((f) => {
        f.style.width = f.dataset.pct + '%';
      });
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.18 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

/* ============== 微信二维码弹窗 ============== */
const wechatPopup = document.getElementById('wechatPopup');
const wechatBtn = document.getElementById('wechatBtn');
if (wechatPopup && wechatBtn) {
  wechatBtn.addEventListener('click', () => wechatPopup.classList.add('open'));
  wechatPopup.addEventListener('click', () => wechatPopup.classList.remove('open'));
}

/* ============== 移动端菜单 ============== */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuToggle.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a:not(.lang-switch)').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ============== 兴趣分类展开 ============== */
document.querySelectorAll('.life-group').forEach((g) => {
  const cat = g.querySelector('.life-cat');
  if (!g.querySelector('.life-detail')) return;
  cat.addEventListener('click', (e) => {
    e.stopPropagation();
    const wasOpen = g.dataset.open === 'true';
    document.querySelectorAll('.life-group').forEach((x) => { x.dataset.open = 'false'; });
    g.dataset.open = wasOpen ? 'false' : 'true';
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.life-group').forEach((x) => { x.dataset.open = 'false'; });
});

/* ============== 交互效果 ============== */
const isTouch = matchMedia('(pointer: coarse)').matches;
const avatar = document.getElementById('avatar');

if (!isTouch && avatar) {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let dx = 0, dy = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    dx = e.clientX; dy = e.clientY;
    document.querySelectorAll('.card, .cap').forEach((el) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    const rotX = (e.clientY / innerHeight - 0.5) * -3;
    const rotY = (e.clientX / innerWidth - 0.5) * 3;
    avatar.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  if (dot && ring) {
    (function cursorLoop() {
      rx += (dx - rx) * 0.15;
      ry += (dy - ry) * 0.15;
      dot.style.transform = `translate(${dx}px, ${dy}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(cursorLoop);
    })();

    const hoverEls = 'a, button, .social, .filter-tag, .life-cat, .card, .btn';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverEls)) ring.classList.add('hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverEls)) ring.classList.remove('hover');
    });
  }

  document.querySelectorAll('.btn, .social').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      el.style.transform = `translate(${(e.clientX - cx) * 0.25}px, ${(e.clientY - cy) * 0.25}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
} else {
  document.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple';
    ripple.style.left = t.clientX + 'px';
    ripple.style.top = t.clientY + 'px';
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }, { passive: true });

  document.querySelectorAll('.card, .cap, .btn, .social').forEach((el) => {
    el.addEventListener('touchstart', () => {
      el.style.transition = 'transform 0.1s';
      el.style.transform = 'scale(0.97)';
    }, { passive: true });
    el.addEventListener('touchend', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.3s';
    });
  });

  if (avatar && window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.beta == null) return;
      const rotX = Math.max(-8, Math.min(8, (e.beta - 45) * 0.15));
      const rotY = Math.max(-8, Math.min(8, e.gamma * 0.15));
      avatar.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
  }
}

/* ============== 标签筛选系统 ============== */
const TAG_LABELS = {
  zh: {
    __all__: '全部',
    ai: 'AI', agent: 'Agent', design: '设计', product: '产品',
    music: '唱歌', band: '乐队', photo: '摄影', ski: '滑雪', tennis: '网球',
    cycling: '骑行', driving: '驾驶', gaming: '游戏', badminton: '羽毛球',
  },
  en: {
    __all__: 'All',
    ai: 'AI', agent: 'Agent', design: 'Design', product: 'Product',
    music: 'Singing', band: 'Band', photo: 'Photo', ski: 'Ski', tennis: 'Tennis',
    cycling: 'Cycling', driving: 'Driving', gaming: 'Gaming', badminton: 'Badminton',
  },
};

function tagLabel(id) {
  const labels = TAG_LABELS[getLang()] || TAG_LABELS.zh;
  return labels[id] || id;
}

/* ============== 加载数据 ============== */
fetchSiteData()
  .then((items) => {
    const work = items.filter((i) => i.category === 'work');
    createFilterSection(
      document.getElementById('workFilterBar'),
      document.getElementById('workList'),
      document.getElementById('workEmpty'),
      work,
      true,
      tagLabel,
    );
    renderLifeItems(
      document.getElementById('lifeList'),
      items.filter((i) => i.category === 'life'),
    );
  })
  .catch((err) => {
    console.error('Failed to load data:', err);
    const emptyEl = document.getElementById('workEmpty');
    if (emptyEl) emptyEl.style.display = 'block';
  });

/* ============== i18n 初始化 ============== */
initI18n()
  .then(() => {
    initCoffee();
  })
  .catch((err) => {
    console.error('Failed to load i18n:', err);
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  });
