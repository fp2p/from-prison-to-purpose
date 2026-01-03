(function () {
  const c = window.SITE_CONTENT;
  if (!c) return;

  const get = (path) => {
    let val = c;
    path.split('.').forEach(k => { val = (val && val[k] !== undefined) ? val[k] : undefined; });
    return val;
  };

  // Text injection
  document.querySelectorAll('[data-content]').forEach(el => {
    const key = el.getAttribute('data-content');
    const val = get(key);
    if (val === undefined || val === null) return;
    el.textContent = String(val);
  });

  // mailto links
  document.querySelectorAll('[data-mailto]').forEach(el => {
    const key = el.getAttribute('data-mailto');
    const email = get(key);
    if (!email) return;
    el.setAttribute('href', 'mailto:' + email);
    if (!el.textContent.trim()) el.textContent = email;
  });

  // tel links
  document.querySelectorAll('[data-tel]').forEach(el => {
    const key = el.getAttribute('data-tel');
    const tel = get(key);
    if (!tel) return;
    el.setAttribute('href', 'tel:' + tel);
  });

  // Leadership cards (about page)
  const leaderWrap = document.querySelector('[data-leadership]');
  if (leaderWrap && Array.isArray(c.leadership)) {
    leaderWrap.innerHTML = c.leadership.map(p => {
      const safe = (s) => String(s || '');
      return `
        <div class="card person">
          <div class="avatar" aria-hidden="true"></div>
          <h3>${safe(p.role || '')}</h3>
          <p class="muted"><strong>${safe(p.name || '')}</strong><br>${safe(p.bio || '')}</p>
        </div>`;
    }).join('');
  }
})();