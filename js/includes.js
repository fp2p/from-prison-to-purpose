async function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');

  for (const el of elements) {
    const file = el.getAttribute('data-include');
    if (!file) continue;

    try {
      const res = await fetch(file, { cache: "no-cache" });
      if (!res.ok) throw new Error(res.status);
      el.innerHTML = await res.text();
    } catch (err) {
      el.innerHTML = `<!-- include failed: ${file} -->`;
    }
  }

  // Auto year handling
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // IMPORTANT: initialize nav AFTER header/footer are injected
  if (typeof window.initSiteNav === "function") {
    window.initSiteNav();
  }
}

document.addEventListener('DOMContentLoaded', includeHTML);
