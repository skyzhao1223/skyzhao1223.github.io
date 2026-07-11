export function initCursorInteraction() {
  const isTouch = matchMedia('(pointer: coarse)').matches;
  const avatar = document.getElementById('avatar');

  if (!isTouch && avatar) {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let dx = 0;
    let dy = 0;
    let rx = 0;
    let ry = 0;

    document.addEventListener('mousemove', (e) => {
      dx = e.clientX;
      dy = e.clientY;
      document.querySelectorAll('.card, .cap').forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
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
    return;
  }

  document.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple';
    ripple.style.left = `${t.clientX}px`;
    ripple.style.top = `${t.clientY}px`;
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
