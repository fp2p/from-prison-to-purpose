(function () {
  function initSiteNav() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const menu = document.querySelector('[data-nav-menu]');

    if (!toggle || !menu) return;

    // Prevent double-binding if init runs more than once
    if (toggle.dataset.bound === "true") return;
    toggle.dataset.bound = "true";

    function setExpanded(isOpen) {
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) menu.setAttribute('data-open', '');
      else menu.removeAttribute('data-open');
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
  }

  // Expose globally so includes.js can call it after injection
  window.initSiteNav = initSiteNav;
})();
