/* =====================================================================
   4ormEx · shared UI behaviours
   - Persistent demonstration banner (sticky, not dismissible) at top of body.
   - Demo-gate modal on first visit per browser session.
   ===================================================================== */
(function () {
  'use strict';

  var ACK_KEY = '4ormex_demo_ack';

  /* ---------- Persistent banner ---------- */
  function injectBanner() {
    if (document.querySelector('.demo-banner')) return;
    var b = document.createElement('div');
    b.className = 'demo-banner';
    b.setAttribute('role', 'status');
    b.innerHTML =
      '<span class="dot" aria-hidden="true"></span>' +
      '<span><strong>Demonstration · design preview</strong> · 4ormEx is in development. Not a live exchange. Not registered with any regulator. All figures, identifiers, prices, balances, instruments and counterparties shown are simulated and hypothetical. Named institutions, if any, are illustrative only and are not partners.</span>';
    if (document.body.firstChild) {
      document.body.insertBefore(b, document.body.firstChild);
    } else {
      document.body.appendChild(b);
    }
  }

  /* ---------- Demo-gate modal (first visit per session) ---------- */
  function buildDemoGate() {
    var html =
      '<div class="demo-gate-backdrop" id="demo-gate" role="dialog" aria-modal="true" aria-labelledby="demo-gate-title">' +
      '  <div class="demo-gate-card">' +
      '    <div class="demo-gate-eye"><span class="dot"></span>Demonstration · design preview</div>' +
      '    <h2 id="demo-gate-title">You\'re entering the 4ormEx demonstration.</h2>' +
      '    <p>4ormEx is in development. This site is a design preview and operator demonstration of the future trading and execution layer of the 4orm regulated control plane. It is <strong>not a live exchange, not registered as a marketplace or dealer with any regulator, and not partnered with any of the institutions named on these pages.</strong> No applications have been filed.</p>' +
      '    <p>Every figure, identifier, price, balance, instrument and counterparty shown is simulated and hypothetical. The order book is non-functional and no securities are offered.</p>' +
      '    <div class="demo-gate-fine">Operating a marketplace for securities is a registrable activity in Canada under National Instruments 21-101, 23-101, 24-102 and 31-103. 4ormEx intends to pursue marketplace recognition and dealer registration before operating any live trading. At present no such application has been filed and no registration exists. Educational only; not an offer or solicitation of securities; not financial, legal or tax advice.</div>' +
      '    <button class="demo-gate-btn" type="button" id="demo-gate-ok">' +
      '      OK · I understand, enter demonstration' +
      '      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>' +
      '    </button>' +
      '  </div>' +
      '</div>';
    document.body.insertAdjacentHTML('beforeend', html);
    document.body.classList.add('demo-gate-active');

    var gate = document.getElementById('demo-gate');
    var btn = document.getElementById('demo-gate-ok');
    function dismiss() {
      try { sessionStorage.setItem(ACK_KEY, '1'); } catch (e) {}
      gate.style.opacity = '0';
      setTimeout(function () {
        if (gate && gate.parentNode) gate.parentNode.removeChild(gate);
        document.body.classList.remove('demo-gate-active');
      }, 200);
    }
    btn.addEventListener('click', dismiss);
    function onEsc(e) {
      if (e.key === 'Escape') { dismiss(); document.removeEventListener('keydown', onEsc); }
    }
    document.addEventListener('keydown', onEsc);
    setTimeout(function () { try { btn.focus(); } catch (e) {} }, 80);
  }

  function maybeShowGate() {
    var acked = false;
    try { acked = sessionStorage.getItem(ACK_KEY) === '1'; } catch (e) {}
    if (acked) return;
    buildDemoGate();
  }

  /* ---------- Boot ---------- */
  function boot() {
    injectBanner();
    maybeShowGate();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
