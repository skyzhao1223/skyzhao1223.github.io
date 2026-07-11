import { initI18n, getTypewriterPhrases, getTagLabel } from './i18n/index.js';
import { initCoffee } from './components/coffee.js';
import { createFilterSection, renderLifeItems } from './components/work-list.js';
import { initScrollReveal } from './components/scroll-reveal.js';
import { initTypewriter } from './components/typewriter.js';
import { initLifeGroups, initMobileMenu, initWechatPopup } from './components/ui.js';
import { initCursorInteraction } from './effects/cursor.js';
import { initGlow } from './effects/glow.js';
import { initStars } from './effects/stars.js';
import { fetchSiteData } from './utils/data.js';

initGlow();
initStars();
initScrollReveal();
initWechatPopup();
initMobileMenu();
initLifeGroups();
initCursorInteraction();

initI18n()
  .then(() => {
    initTypewriter(getTypewriterPhrases);
    initCoffee();
    return fetchSiteData();
  })
  .then((items) => {
    const work = items.filter((i) => i.category === 'work');
    createFilterSection(
      document.getElementById('workFilterBar'),
      document.getElementById('workList'),
      document.getElementById('workEmpty'),
      work,
      true,
      getTagLabel,
    );
    renderLifeItems(
      document.getElementById('lifeList'),
      items.filter((i) => i.category === 'life'),
    );
  })
  .catch((err) => {
    console.error('Failed to initialize page:', err);
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    const emptyEl = document.getElementById('workEmpty');
    if (emptyEl) emptyEl.style.display = 'block';
  });
