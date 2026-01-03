(function () {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');

  if (!toggle || !menu) return;

  function setExpanded(isOpen) {
    toggle.setAttribute('aria-expanded', String(isOpen));
    menu.toggleAttribute('data-open', isOpen);
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!isOpen);
  });

  // Close menu when a link is clicked (mobile)
  menu.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.tagName === 'A') setExpanded(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setExpanded(false);
  });
})();

(function setActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-inner a').forEach(link => {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });
})();
