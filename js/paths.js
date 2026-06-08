(function () {
  function getSiteBase() {
    let path = window.location.pathname;
    const last = path.split('/').pop() || '';

    if (last && /\.[a-z0-9]+$/i.test(last)) {
      path = path.slice(0, path.lastIndexOf('/') + 1);
    } else if (!path.endsWith('/')) {
      path += '/';
    }

    return path || '/';
  }

  function resolveAsset(relative) {
    const clean = relative.replace(/^\.\//, '');
    const base = getSiteBase();
    if (base === '/') return clean;
    return base + clean;
  }

  window.resolveAsset = resolveAsset;

  function applyBasePaths() {
    document.querySelectorAll('[data-asset]').forEach((el) => {
      const file = el.getAttribute('data-asset');
      if (!file) return;
      const url = resolveAsset(file);
      if (el.tagName === 'IMG') el.src = url;
      else if (el.tagName === 'LINK') el.href = url;
    });
  }

  function fixLogoFallback() {
    document.querySelectorAll('img[data-asset="assets/logo.png"]').forEach((img) => {
      img.addEventListener('error', function onErr() {
        const tried = (img.dataset.fallbackTried || '').split(',');
        const fallbacks = [
          resolveAsset('assets/logo.png'),
          resolveAsset('logo.png'),
        ];
        const next = fallbacks.find((u) => !tried.includes(u) && u !== img.src);
        if (!next) return;
        tried.push(next);
        img.dataset.fallbackTried = tried.join(',');
        img.src = next;
      });
    });
  }

  function init() {
    applyBasePaths();
    fixLogoFallback();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
