export function initStars() {
  const cv = document.getElementById('stars');
  if (!cv) return;

  const ctx = cv.getContext('2d');
  let stars = [];

  function resize() {
    cv.width = innerWidth * devicePixelRatio;
    cv.height = innerHeight * devicePixelRatio;
    cv.style.width = `${innerWidth}px`;
    cv.style.height = `${innerHeight}px`;
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
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = cv.width;
      if (s.x > cv.width) s.x = 0;
      if (s.y < 0) s.y = cv.height;
      if (s.y > cv.height) s.y = 0;
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
