export function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      e.target.querySelectorAll('[data-count]').forEach((el) => {
        if (el.dataset.static) return;
        const target = parseInt(el.dataset.count, 10);
        if (isNaN(target)) return;
        const dur = 1200;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target).toString();
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      e.target.querySelectorAll('.fill[data-pct]').forEach((f) => {
        f.style.width = `${f.dataset.pct}%`;
      });
      io.unobserve(e.target);
    }
  }, { threshold: 0.18 });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}
