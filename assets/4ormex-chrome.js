/* =====================================================================
   4ormEx v15 · Shared chrome injector  (Apple + rwa.xyz hybrid)
   Reads body[data-product] for product-nav active state.
   Reads body[data-sidebar] for sidebar active state.
   All counterparties, prices, balances, identifiers below are illustrative
   and shown for product-design only. No names of real institutions are used.
   ===================================================================== */
(function () {
  'use strict';

  const TOPBAR_HTML = `
    <header class="topbar">
      <div class="topbar-inner">
        <a href="/" class="brand" aria-label="4ormEx home">
          <img src="/assets/4orm-logo.png" alt="4orm Finance" />
          <span class="sub">The Canadian RWA Exchange</span>
        </a>
        <label class="search" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input type="search" placeholder="Search asset classes, tickers, or issuer categories…" />
          <span class="kbd">⌘ K</span>
        </label>
        <nav class="utility" aria-label="Primary">
          <a class="back" href="https://4ormfinance.com">← 4orm Finance</a>
          <a class="topbar-cta-gold" href="/for-issuers.html">List an asset →</a>
          <a class="cta" href="https://4ormfinance.com/#waitlist">Request access</a>
        </nav>
      </div>
    </header>`;

  // Illustrative ticker tape · entity-category descriptions only (no names).
  const TICKER_ITEMS = [
    ['tGCB-ILL','C$ 99.82','u','▲ 0.03%'],
    ['tPRV-A','C$ 102.41','u','▲ 0.18%'],
    ['tPCR-VII','C$ 1,041.20','u','▲ 4.12%'],
    ['tREIT-MF','C$ 26.40','u','▲ 0.42%'],
    ['tCMR-AU','C$ 96.18','d','▼ 0.27%'],
    ['tCRE-A','C$ 524.00','u','▲ 1.12%'],
    ['tCAD-MM','C$ 1.0000','u','▲ 0.00%'],
    ['tDPR-A','C$ 1.0000','u','▲ 0.00%'],
    ['tFCE25','C$ 101.18','u','▲ 0.07%'],
    ['tCBC-ALB','C$ 38.50','u','▲ 0.62%'],
    ['tCBV-NBS','C$ 24.10','d','▼ 0.18%'],
    ['tINF-P3','C$ 99.91','d','▼ 0.04%'],
    ['tCDR-EQ','C$ 184.50','u','▲ 0.92%'],
    ['tDPR-B','C$ 1.0000','u','▲ 0.00%'],
    ['tCMR-AG','C$ 42.50','u','▲ 0.18%'],
  ];
  const tiHtml = TICKER_ITEMS.map(([t,p,d,c]) => `<span class="ti"><span class="t">${t}</span><span class="p">${p}</span><span class="c ${d}">${c}</span></span>`).join('');
  const TICKER_HTML = `<div class="tape" aria-hidden="true"><div class="track"><span class="ti tape-lbl"><span class="t" style="color:#E7C76C">ILLUSTRATIVE TAPE ·</span><span class="p">simulated tickers, no live market data</span></span>${tiHtml}<span class="ti tape-lbl"><span class="t" style="color:#E7C76C">ILLUSTRATIVE TAPE ·</span><span class="p">simulated tickers, no live market data</span></span>${tiHtml}</div></div>`;

  // Product nav: trim to actual surfaces, no numbered prefixes.
  const PRODUCTNAV_HTML = `
    <nav class="productnav" id="productnav-main" aria-label="4ormEx product surface">
      <div class="productnav-inner">
        <a href="/" data-product="market-overview">Market Overview</a>
        <a href="/marketplace.html" data-product="marketplace">Marketplace</a>
        <a href="/new-listings.html" data-product="new-listings">New Listings</a>
        <a href="/issuer.html" data-product="issuer">Issuer view</a>
        <a href="/investor.html" data-product="investor">Investor view</a>
        <a href="/compliance.html" data-product="compliance">Compliance</a>
        <a href="/about.html" data-product="about">About 4ormEx</a>
        <a href="/for-issuers.html" class="pn-cta">List your asset →</a>
      </div>
    </nav>`;

  // Sidebar: 10 asset classes + 4 tools + CTA. No Network, no Admin, no Lifecycle.
  const SIDEBAR_HTML = `
    <aside class="sidebar" aria-label="Market navigation">
      <section class="sb-group"><h6>Market</h6><ul>
        <li><a href="/" data-key="market-overview"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>Market Overview</a></li>
        <li><a href="/marketplace.html" data-key="asset-screener"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>Marketplace</a></li>
        <li><a href="/new-listings.html" data-key="new-listing-monitor"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg>New Listings <span class="new">Illustrative</span></a></li>
      </ul></section>
      <section class="sb-group"><h6>Asset Classes</h6><ul>
        <li><a href="/government-of-canada.html" data-key="government-of-canada">Government of Canada</a></li>
        <li><a href="/provincial-sub-sovereign.html" data-key="provincial">Provincial &amp; Sub-Sovereign</a></li>
        <li><a href="/private-credit.html" data-key="private-credit">Private Credit</a></li>
        <li><a href="/real-estate.html" data-key="real-estate">Real Estate &amp; REITs</a></li>
        <li><a href="/commodities.html" data-key="commodities">Commodities</a></li>
        <li><a href="/carbon-credits.html" data-key="carbon-credits">Carbon Credits <span class="new">New</span></a></li>
        <li><a href="/infrastructure.html" data-key="infrastructure">Infrastructure</a></li>
        <li><a href="/equities-cdr.html" data-key="equities">Equities (CDR)</a></li>
      </ul></section>
      <section class="sb-group"><h6>Settlement Assets</h6><ul>
        <li><a href="/bank-deposits.html" data-key="bank-deposits">Tokenized Deposit Receipts</a></li>
        <li><a href="/stablecoins.html" data-key="stablecoins">Cash Tokens (VRCA)</a></li>
      </ul></section>
      <section class="sb-group"><h6>Personas (illustrative)</h6><ul>
        <li><a href="/issuer.html" data-key="issuer-view">Issuer view</a></li>
        <li><a href="/investor.html" data-key="investor-view">Investor view</a></li>
      </ul></section>
      <section class="sb-group"><h6>Posture</h6><ul>
        <li><a href="/compliance.html" data-key="compliance">Compliance posture</a></li>
        <li><a href="/about.html" data-key="about">About 4ormEx</a></li>
        <li><a href="/data-api.html" data-key="data-api">Data API <span class="new">Spec</span></a></li>
      </ul></section>
      <section class="sb-cta"><h6>For Issuers &amp; Institutions</h6><p>Register interest to be onboarded once 4ormEx is registered as a CIRO member firm. No live applications are accepted on this site.</p><a class="start-btn" href="/for-issuers.html">Register your interest →</a></section>
    </aside>`;

  const FOOTER_HTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="grid">
          <div class="brand-blk"><h5>4ormEx · Pillar 02 of the 4orm Finance control plane</h5><p>Illustrative trading venue. 4orm Finance Holdings Inc. operates the canonical ledger and the other five pillars (Issuance, Settlement, Custody, Reporting, Supervision) at the platform level. Design preview · v0.15.</p></div>
          <div><h6>Venue</h6><ul><li><a href="/">Market Overview</a></li><li><a href="/marketplace.html">Marketplace</a></li><li><a href="/new-listings.html">New Listings</a></li><li><a href="/for-issuers.html">List your asset</a></li></ul></div>
          <div><h6>About</h6><ul><li><a href="/about.html">About 4ormEx</a></li><li><a href="/compliance.html">Compliance posture</a></li><li><a href="/data-api.html">Data API spec</a></li></ul></div>
          <div><h6>4orm Finance</h6><ul><li><a href="https://4ormfinance.com">Main site</a></li><li><a href="https://4ormfinance.com/regulatory.html">Regulatory posture</a></li><li><a href="https://4ormfinance.com/#waitlist">Request access</a></li><li><a href="mailto:compliance@kcs-capital.com">compliance@kcs-capital.com</a></li></ul></div>
        </div>
        <div class="lr"><div>© 2026 4orm Finance Holdings Inc. · Developed by KCS Capital (independent engineering firm)</div><div>Design preview · simulated data only · not a live trading venue</div></div>
        <p class="disclaim">4orm Finance is an early-stage platform in development. 4ormEx is a design preview of the trading venue (Pillar 02 of six) inside the planned 4orm Finance regulated control plane. 4ormEx is not registered as a dealer, marketplace, exchange, money services business, or bank in any Canadian jurisdiction. No applications have been filed. No services are offered, solicited, or available to any person. All identifiers, prices, balances, hashes, counterparties and issuer categories shown anywhere on this site are simulated and illustrative; no real institutions are named anywhere on this site. Nothing on this site is an offer to sell or solicitation to buy securities, crypto assets, deposits, or any financial instrument, and nothing on this site is financial, legal, tax, or investment advice.</p>
      </div>
    </footer>`;

  function boot() {
    // v15d · sidebar is the ONLY navigation. Productnav removed entirely.
    // Top stays minimal (logo + search + utility) and ticker tape sits right
    // below it. Asset class drilldown lives in the sidebar.
    document.body.insertAdjacentHTML('afterbegin', TOPBAR_HTML + TICKER_HTML);

    const pane = document.querySelector('main.pane');
    if (pane) {
      const dash = document.createElement('div');
      dash.className = 'dash';
      pane.parentNode.insertBefore(dash, pane);
      dash.insertAdjacentHTML('afterbegin', SIDEBAR_HTML);
      dash.appendChild(pane);
    }

    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

    const sidebarKey = document.body.dataset.sidebar;
    if (sidebarKey) {
      const link = document.querySelector(`.sb-group a[data-key="${sidebarKey}"]`);
      if (link) link.classList.add('active');
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
