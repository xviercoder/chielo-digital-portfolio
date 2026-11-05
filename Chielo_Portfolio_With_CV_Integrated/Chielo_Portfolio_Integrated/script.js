(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress span');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;

  const closeMenu = () => {
    navLinks?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation menu');
  };

  menuToggle?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('is-open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  });

  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progressValue = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = `${progressValue}%`;
    header?.classList.toggle('is-scrolled', window.scrollY > 24);

    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && !reduceMotion && window.innerWidth > 760) {
      const offset = Math.min(window.scrollY * -0.045, 0);
      heroVisual.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
    } else if (heroVisual) {
      heroVisual.style.setProperty('--parallax-y', '0px');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', updateScrollUI, { passive: true });
  updateScrollUI();

  // Reveal content only when it enters the viewport; no scroll event animation loops.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -42px 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Keep the current section reflected in the navigation.
  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const current = `#${entry.target.id}`;
        navAnchors.forEach((anchor) => {
          const active = anchor.getAttribute('href') === current;
          anchor.classList.toggle('is-active', active);
          if (active) anchor.setAttribute('aria-current', 'location');
          else anchor.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Project category filter.
  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
    });
  });

  // A restrained pointer response on the hero composition, disabled for touch/reduced motion.
  const hero = document.querySelector('.hero');
  const heroVisual = document.querySelector('.hero-visual');
  if (hero && heroVisual && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    let pointerFrame = 0;
    hero.addEventListener('pointermove', (event) => {
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 4;
        heroVisual.style.setProperty('--pointer-x', `${x.toFixed(2)}px`);
        heroVisual.style.setProperty('--pointer-y', `${y.toFixed(2)}px`);
      });
    });
    hero.addEventListener('pointerleave', () => {
      heroVisual.style.setProperty('--pointer-x', '0px');
      heroVisual.style.setProperty('--pointer-y', '0px');
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
