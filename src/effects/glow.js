export function initGlow() {
  const glow = document.getElementById('glow');
  if (!glow) return;

  let mx = innerWidth / 2;
  let my = innerHeight / 2;
  let gx = mx;
  let gy = my;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function loopGlow() {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    glow.style.transform = `translate(${gx}px, ${gy}px)`;
    requestAnimationFrame(loopGlow);
  }

  loopGlow();
}
