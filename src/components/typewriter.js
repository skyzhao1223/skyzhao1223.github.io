export function initTypewriter(getPhrases) {
  const typed = document.getElementById('typed');
  if (!typed) return;

  let pi = 0;
  let ci = 0;
  let deleting = false;

  function type() {
    const phrases = getPhrases();
    const cur = phrases[pi % phrases.length] || '';
    if (!deleting) {
      ci += 1;
      typed.textContent = cur.slice(0, ci);
      if (ci === cur.length) {
        deleting = true;
        setTimeout(type, 1600);
        return;
      }
    } else {
      ci -= 1;
      typed.textContent = cur.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 35 : 70);
  }

  type();
}
