/* =====================================================================
   4ormEx · shared UI behaviours
   - Demo-gate modal: darken page on first visit per browser session,
     show acknowledgment disclaimer, dismiss on click of "OK · Enter demo".
   ===================================================================== */
(function () {
  'use strict';

  var ACK_KEY = '4ormex_demo_ack';

  function buildDemoGate() {
    var html =
      '<div class="demo-gate-backdrop" id="demo-gate" role="dialog" aria-modal="true" aria-labelledby="demo-gate-title">' +
      '  <div class="demo-gate-card">' +
      '    <div class="demo-gate-eye"><span class="dot"></span>Sandbox preview · Demo only</div>' +
      '    <h2 id="demo-gate-title">You\'re entering the 4ormEx demo sandbox.</h2>' +
      '    <p>This site is a working preview of the 4ormEx institutional exchange — a walk-through of the architecture, tokenization workflow, marketplace, and atomic lifecycle as we\'re building them. It is <strong>not a direct replication of the production 4orm Finance Exchange or 4ormEx</strong>, and the data, balances, prices, tickers and counterparties shown are simulated for demonstration purposes only.</p>' +
      '    <div class="demo-gate-fine">All identifiers, hashes, prices and balances on these pages are simulated. 4ormEx is a sandbox-stage institutional preview environment, not a licensed exchange or dealer. Not an offer or solicitation of securities. Not financial, legal or tax advice. Educational only.</div>' +
      '    <button class="demo-gate-btn" type="button" id="demo-gate-ok">' +
      '      OK · Enter demo' +
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
      if (e.key === 'Escape') {
        dismiss();
        document.removeEventListener('keydown', onEsc);
      }
    }
    document.addEventListener('keydown', onEsc);
    // Focus the button so Enter dismisses
    setTimeout(function () { try { btn.focus(); } catch (e) {} }, 80);
  }

  function maybeShowGate() {
    var acked = false;
    try { acked = sessionStorage.getItem(ACK_KEY) === '1'; } catch (e) {}
    if (acked) return;
    buildDemoGate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', maybeShowGate);
  } else {
    maybeShowGate();
  }
})();
