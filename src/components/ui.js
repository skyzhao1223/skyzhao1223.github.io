export function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!menuToggle || !mobileMenu) return;

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

export function initWechatPopup() {
  const wechatPopup = document.getElementById('wechatPopup');
  const wechatBtn = document.getElementById('wechatBtn');
  if (!wechatPopup || !wechatBtn) return;

  wechatBtn.addEventListener('click', () => wechatPopup.classList.add('open'));
  wechatPopup.addEventListener('click', () => wechatPopup.classList.remove('open'));
}

export function initLifeGroups() {
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
}
