/* =====================================================================
   4ormEx · shared UI behaviours
   Loaded by every page (inline-chrome pages AND chrome-JS pages).
   Uses event delegation so it works regardless of when elements
   are added to the DOM.
   ===================================================================== */
(function () {
  'use strict';

  // Markets toggle — collapses / expands the product nav
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.markets-toggle');
    if (!btn) return;
    e.preventDefault();
    var isOpen = btn.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(isOpen));
    document.querySelectorAll('.productnav').forEach(function (n) {
      n.classList.toggle('collapsed', !isOpen);
    });
  });
})();
