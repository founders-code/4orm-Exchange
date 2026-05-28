/* =====================================================================
   4ormEx v3 · Shared chrome injector
   Used by every page that opts in (any page that <script src="">s this).
   Reads body[data-product] for product-nav active state.
   Reads body[data-sidebar] for sidebar active state.
   ===================================================================== */
(function () {
  'use strict';

  const TOPBAR_HTML = `
    <header class="topbar">
      <div class="topbar-inner">
        <a href="/" class="brand" aria-label="4ormEx home">
          <img src="/assets/4orm-logo.png" alt="4orm Finance" />
          <span class="sub">4ormEx · The Exchange</span>
        </a>
        <label class="search" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input type="search" placeholder="Search any asset, issuer, ticker, or entity…" />
          <span class="kbd">⌘ K</span>
        </label>
        <nav class="utility" aria-label="Primary">
          <a class="menu" href="/for-issuers.html">For issuers <span class="car">▾</span></a>
          <a href="#data-api">Data API <span class="new">New</span></a>
          <a href="#book-demo">Book a demo</a>
          <a class="back" href="https://4ormfinance.com">← 4orm Finance</a>
          <a class="cta" href="https://4ormfinance.com/#waitlist">Request access</a>
        </nav>
      </div>
    </header>`;

  const TICKER_ITEMS = [
    ['tGCB','C$ 99.82','u','▲ 0.03%'],
    ['tABP28','C$ 102.41','u','▲ 0.18%'],
    ['tACP-VII','C$ 1,041.20','u','▲ 4.12%'],
    ['tPMP-A','C$ 1.0400','u','▲ 0.42%'],
    ['tAUC','C$ 96.18','d','▼ 0.27%'],
    ['tCRE-CGY1','C$ 524.00','u','▲ 1.12%'],
    ['QCAD','C$ 1.0000','u','▲ 0.00%'],
    ['tMMF-RBC','C$ 10.0021','u','▲ 0.01%'],
    ['tEDC25','C$ 101.18','u','▲ 0.07%'],
    ['tCRE-EDM2','C$ 287.50','u','▲ 0.62%'],
    ['tAGL-SK1','C$ 1,200.00','u','▲ 0.08%'],
    ['tHQI32','C$ 99.91','d','▼ 0.04%'],
    ['tRBCD','C$ 1.0000','u','▲ 0.00%'],
    ['tTDD','C$ 1.0000','u','▲ 0.00%'],
    ['W-CAD','C$ 1.0000','u','▲ 0.00%'],
    ['RVNSI','C$ 42.50/T','u','▲ 0.18%'],
    ['tCNFT-ALPHA','NFT · #00214','u','verified'],
    ['tPMS-CGY40','C$ 2.10M','u','▲ paid'],
  ];
  const tiHtml = TICKER_ITEMS.map(([t,p,d,c]) => `<span class="ti"><span class="t">${t}</span><span class="p">${p}</span><span class="c ${d}">${c}</span></span>`).join('');
  const TICKER_HTML = `<div class="tape" aria-hidden="true"><div class="track">${tiHtml}${tiHtml}</div></div>`;

  const PRODUCTNAV_HTML = `
    <nav class="productnav" aria-label="4ormEx product surface">
      <div class="productnav-inner">
        <a href="/" data-product="market-overview"><span class="pn-num">01</span> Market Overview</a>
        <a href="/marketplace.html" data-product="marketplace"><span class="pn-num">02</span> Marketplace</a>
        <a href="/tokenize.html" data-product="tokenize"><span class="pn-num">03</span> Tokenize</a>
        <a href="/lifecycle.html" data-product="lifecycle"><span class="pn-num">04</span> Lifecycle</a>
        <a href="/issuer.html" data-product="issuer"><span class="pn-num">05</span> Issuer Portal</a>
        <a href="/investor.html" data-product="investor"><span class="pn-num">06</span> Investor Portal</a>
        <a href="/compliance.html" data-product="compliance"><span class="pn-num">07</span> Compliance</a>
        <a href="/settlement.html" data-product="settlement"><span class="pn-num">08</span> Settlement</a>
        <a href="/admin.html" data-product="admin"><span class="pn-num">09</span> Admin &amp; Audit</a>
        <a href="/for-issuers.html" class="pn-cta">List your asset →</a>
      </div>
    </nav>`;

  const SIDEBAR_HTML = `
    <aside class="sidebar" aria-label="Market navigation">
      <section class="sb-group"><h6>Latest</h6><ul>
        <li><a href="/" data-key="market-overview"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>Market Overview</a></li>
        <li><a href="/marketplace.html" data-key="asset-screener"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>Asset Screener</a></li>
        <li><a href="/new-listings.html" data-key="new-listing-monitor"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg>New Listing Monitor <span class="new">New</span></a></li>
      </ul></section>
      <section class="sb-group"><h6>Asset Classes</h6><ul>
        <li><a href="/bank-deposits.html" data-key="bank-deposits">Tokenized Bank Deposits</a></li>
        <li><a href="/stablecoins.html" data-key="stablecoins">Stablecoins</a></li>
        <li><a href="/corporate-nfts.html" data-key="corporate-nfts">Corporate NFTs <span class="new">New</span></a></li>
        <li><a href="/project-milestones.html" data-key="project-milestones">Project Milestones <span class="new">New</span></a></li>
        <li><a href="/verified-delivery.html" data-key="verified-delivery">Verified Delivery <span class="new">New</span></a></li>
        <li><a href="/government-of-canada.html" data-key="government-of-canada">Government of Canada</a></li>
        <li><a href="/provincial-sub-sovereign.html" data-key="provincial">Provincial &amp; Sub-Sovereign</a></li>
        <li><a href="/private-credit.html" data-key="private-credit">Private Credit</a></li>
        <li><a href="/real-estate.html" data-key="real-estate">Real Estate</a></li>
        <li><a href="/commodities.html" data-key="commodities">Commodities</a></li>
        <li><a href="/infrastructure.html" data-key="infrastructure">Infrastructure</a></li>
        <li><a href="/equities-cdr.html" data-key="equities">Equities (CDR-style)</a></li>
      </ul></section>
      <section class="sb-group"><h6>Network</h6><ul>
        <li><a href="/network-banks.html" data-key="banks">Canadian Banks</a></li>
        <li><a href="/network-custodians.html" data-key="custodians">Qualified Custodians</a></li>
        <li><a href="/network-issuers.html" data-key="issuers">Issuers &amp; Originators</a></li>
        <li><a href="/network-settlement.html" data-key="settlement-operators">Settlement Operators</a></li>
      </ul></section>
      <section class="sb-group"><h6>Tools</h6><ul>
        <li><a href="/data-api.html" data-key="data-api">Data API <span class="new">New</span></a></li>
        <li><a href="/data-catalog.html" data-key="data-catalog">Data Catalog</a></li>
        <li><a href="/documentation.html" data-key="documentation">Documentation</a></li>
        <li><a href="/research.html" data-key="research">Research</a></li>
        <li><a href="/admin.html" data-key="audit-citations">Audit &amp; Citations</a></li>
      </ul></section>
      <section class="sb-cta"><h6>For Issuers &amp; Banks</h6><p>Onboard a Canadian asset to the regulated rail or join the bank corridor.</p><a class="start-btn" href="/tokenize.html">Register your asset →</a></section>
    </aside>`;

  const FOOTER_HTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="grid">
          <div class="brand-blk"><h5>4ormEx · The 4orm Exchange</h5><p>Institutional settlement and trading layer of 4orm Finance. Sandbox preview · v0.1.</p></div>
          <div><h6>Exchange</h6><ul><li><a href="/">Market Overview</a></li><li><a href="/marketplace.html">Marketplace</a></li><li><a href="/issuer.html">Issuer portal</a></li><li><a href="/investor.html">Investor portal</a></li></ul></div>
          <div><h6>Operations</h6><ul><li><a href="/compliance.html">Compliance</a></li><li><a href="/settlement.html">Settlement</a></li><li><a href="/admin.html">Admin &amp; audit</a></li><li><a href="/tokenize.html">Tokenization wizard</a></li></ul></div>
          <div><h6>4orm Finance</h6><ul><li><a href="https://4ormfinance.com">Main site</a></li><li><a href="https://4ormfinance.com/regulatory.html">Regulatory posture</a></li><li><a href="https://4ormfinance.com/#waitlist">Request access</a></li><li><a href="mailto:founders@kcs-capital.com">founders@kcs-capital.com</a></li></ul></div>
        </div>
        <div class="lr"><div>© 2026 4orm Finance · 4orm Finance Holdings Inc.</div><div>Sandbox preview · simulated data only · not a live trading venue</div></div>
        <p class="disclaim">4orm Finance is an early-stage platform in development. 4ormEx is a sandbox-stage institutional preview environment, not a licensed exchange or dealer. All identifiers, hashes, prices and balances on these pages are simulated and do not represent live systems, real assets or real counterparties. Educational only; not an offer or solicitation of securities and not financial, legal or tax advice.</p>
      </div>
    </footer>`;

  function boot() {
    // Inject topbar → productnav (2nd bar) → ticker at the very top of body
    document.body.insertAdjacentHTML('afterbegin', TOPBAR_HTML + PRODUCTNAV_HTML + TICKER_HTML);

    // Wrap the existing .pane in a .dash + .sidebar shell
    const pane = document.querySelector('main.pane');
    if (pane) {
      const dash = document.createElement('div');
      dash.className = 'dash';
      pane.parentNode.insertBefore(dash, pane);
      dash.insertAdjacentHTML('afterbegin', SIDEBAR_HTML);
      dash.appendChild(pane);
    }

    // Footer at the bottom
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

    // Active states from body data attributes
    const product = document.body.dataset.product;
    if (product) {
      const link = document.querySelector(`.productnav a[data-product="${product}"]`);
      if (link) link.classList.add('active');
    }
    const sidebarKey = document.body.dataset.sidebar;
    if (sidebarKey) {
      const link = document.querySelector(`.sb-group a[data-key="${sidebarKey}"]`);
      if (link) link.classList.add('active');
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
