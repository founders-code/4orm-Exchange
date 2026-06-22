/* =====================================================================
   4ormEx v3 · Shared chrome injector  (v14 · regulatory-cleanup)
   Reads body[data-product] for product-nav active state.
   Reads body[data-sidebar] for sidebar active state.
   All counterparties, prices, balances, identifiers below are fictional
   and shown for product-design illustration only.
   ===================================================================== */
(function () {
  'use strict';

  const TOPBAR_HTML = `
    <header class="topbar">
      <div class="topbar-inner">
        <a href="/" class="brand" aria-label="4ormEx home">
          <img src="/assets/4orm-logo.png" alt="4orm Finance" />
          <span class="sub">4ormEx · Pillar 02 · Trading venue (design preview)</span>
        </a>
        <label class="search" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input type="search" placeholder="Search any illustrative asset, issuer or ticker…" />
          <span class="kbd">⌘ K</span>
        </label>
        <nav class="utility" aria-label="Primary">
          <a class="menu" href="/for-issuers.html">For issuers <span class="car">▾</span></a>
          <a href="/data-api.html">Data API</a>
          <a class="back" href="https://4ormfinance.com">← 4orm Finance</a>
          <a class="cta" href="https://4ormfinance.com/#waitlist">Request access</a>
        </nav>
      </div>
    </header>`;

  // Ticker: fictional tickers only. No real Canadian bank short forms.
  const TICKER_ITEMS = [
    ['tGCB-ILL','C$ 99.82','u','▲ 0.03%'],
    ['tWPI-A','C$ 102.41','u','▲ 0.18%'],
    ['tEHC-VII','C$ 1,041.20','u','▲ 4.12%'],
    ['tPMP-A','C$ 1.0400','u','▲ 0.42%'],
    ['tKLG','C$ 96.18','d','▼ 0.27%'],
    ['tCRE-IL1','C$ 524.00','u','▲ 1.12%'],
    ['tCAD-MM','C$ 1.0000','u','▲ 0.00%'],
    ['tMMF-NW','C$ 10.0021','u','▲ 0.01%'],
    ['tFCE25','C$ 101.18','u','▲ 0.07%'],
    ['tCRE-IL2','C$ 287.50','u','▲ 0.62%'],
    ['tAGL-IL','C$ 1,200.00','u','▲ 0.08%'],
    ['tHQI32','C$ 99.91','d','▼ 0.04%'],
    ['tNWD-R','C$ 1.0000','u','▲ 0.00%'],
    ['tPGV-R','C$ 1.0000','u','▲ 0.00%'],
    ['BSMI','C$ 42.50/T','u','▲ 0.18%'],
    ['tCNFT-IL','NFT · #00214','u','illustrative'],
    ['tPMS-IL40','C$ 2.10M','u','▲ illustrative'],
  ];
  const tiHtml = TICKER_ITEMS.map(([t,p,d,c]) => `<span class="ti"><span class="t">${t}</span><span class="p">${p}</span><span class="c ${d}">${c}</span></span>`).join('');
  // Lead label so visitors can't mistake the tape for live market data.
  const TICKER_HTML = `<div class="tape" aria-hidden="true"><div class="track"><span class="ti tape-lbl"><span class="t" style="color:#E7C76C">ILLUSTRATIVE TAPE ·</span><span class="p">simulated tickers, no live market data</span></span>${tiHtml}<span class="ti tape-lbl"><span class="t" style="color:#E7C76C">ILLUSTRATIVE TAPE ·</span><span class="p">simulated tickers, no live market data</span></span>${tiHtml}</div></div>`;

  // Product nav: labels only, no numbered prefixes (avoid collision with the
  // six canonical control-plane pillars 01–06).
  const PRODUCTNAV_HTML = `
    <nav class="productnav" id="productnav-main" aria-label="4ormEx product surface">
      <div class="productnav-inner">
        <a href="/" data-product="market-overview">Market Overview</a>
        <a href="/marketplace.html" data-product="marketplace">Marketplace</a>
        <a href="/tokenize.html" data-product="tokenize">Tokenize</a>
        <a href="/lifecycle.html" data-product="lifecycle">Lifecycle</a>
        <a href="/issuer.html" data-product="issuer">Issuer Portal</a>
        <a href="/investor.html" data-product="investor">Investor Portal</a>
        <a href="/compliance.html" data-product="compliance">Compliance</a>
        <a href="/settlement.html" data-product="settlement">Settlement view</a>
        <a href="/admin.html" data-product="admin">Admin &amp; Audit</a>
        <a href="/for-issuers.html" class="pn-cta">List an illustrative asset →</a>
      </div>
    </nav>`;

  const SIDEBAR_HTML = `
    <aside class="sidebar" aria-label="Market navigation">
      <section class="sb-group"><h6>Latest</h6><ul>
        <li><a href="/" data-key="market-overview"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>Market Overview</a></li>
        <li><a href="/marketplace.html" data-key="asset-screener"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>Asset Screener</a></li>
        <li><a href="/new-listings.html" data-key="new-listing-monitor"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg>New Listing Monitor <span class="new">Illustrative</span></a></li>
      </ul></section>
      <section class="sb-group"><h6>Illustrative Asset Classes</h6><ul>
        <li><a href="/bank-deposits.html" data-key="bank-deposits">Tokenized Deposit Receipts</a></li>
        <li><a href="/stablecoins.html" data-key="stablecoins">Cash Tokens (VRCA)</a></li>
        <li><a href="/corporate-nfts.html" data-key="corporate-nfts">Corporate NFTs <span class="new">Concept</span></a></li>
        <li><a href="/project-milestones.html" data-key="project-milestones">Project Milestones <span class="new">Concept</span></a></li>
        <li><a href="/verified-delivery.html" data-key="verified-delivery">Verified Delivery <span class="new">Concept</span></a></li>
        <li><a href="/government-of-canada.html" data-key="government-of-canada">Sovereign Reference</a></li>
        <li><a href="/provincial-sub-sovereign.html" data-key="provincial">Sub-Sovereign Reference</a></li>
        <li><a href="/private-credit.html" data-key="private-credit">Private Credit</a></li>
        <li><a href="/real-estate.html" data-key="real-estate">Real Estate</a></li>
        <li><a href="/commodities.html" data-key="commodities">Commodities</a></li>
        <li><a href="/infrastructure.html" data-key="infrastructure">Infrastructure</a></li>
        <li><a href="/equities-cdr.html" data-key="equities">Equities (CDR-style)</a></li>
      </ul></section>
      <section class="sb-group"><h6>Illustrative Network</h6><ul>
        <li><a href="/network-banks.html" data-key="banks">Deposit-taking Institutions</a></li>
        <li><a href="/network-custodians.html" data-key="custodians">Qualified Custodians</a></li>
        <li><a href="/network-issuers.html" data-key="issuers">Issuers &amp; Originators</a></li>
        <li><a href="/network-settlement.html" data-key="settlement-operators">Settlement Operators</a></li>
      </ul></section>
      <section class="sb-group"><h6>Tools</h6><ul>
        <li><a href="/data-api.html" data-key="data-api">Data API <span class="new">Demo</span></a></li>
        <li><a href="/data-catalog.html" data-key="data-catalog">Data Catalog</a></li>
        <li><a href="/documentation.html" data-key="documentation">Documentation</a></li>
        <li><a href="/research.html" data-key="research">Research</a></li>
        <li><a href="/admin.html" data-key="audit-citations">Audit &amp; Citations</a></li>
      </ul></section>
      <section class="sb-cta"><h6>For Issuers &amp; Institutions</h6><p>Express interest in being onboarded once 4ormEx is registered. No live applications are accepted on this site.</p><a class="start-btn" href="/for-issuers.html">Register your interest →</a></section>
    </aside>`;

  const FOOTER_HTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="grid">
          <div class="brand-blk"><h5>4ormEx · Pillar 02 of the 4orm Finance control plane</h5><p>Illustrative trading venue. 4orm Finance Holdings Inc. operates the canonical ledger and the other five pillars (Issuance, Settlement, Custody, Reporting, Supervision) at the platform level. Design preview · v0.1.</p></div>
          <div><h6>This site</h6><ul><li><a href="/">Market Overview</a></li><li><a href="/marketplace.html">Marketplace</a></li><li><a href="/issuer.html">Issuer portal</a></li><li><a href="/investor.html">Investor portal</a></li></ul></div>
          <div><h6>Operations view</h6><ul><li><a href="/compliance.html">Compliance</a></li><li><a href="/settlement.html">Settlement view</a></li><li><a href="/admin.html">Admin &amp; audit</a></li><li><a href="/tokenize.html">Tokenization wizard</a></li></ul></div>
          <div><h6>4orm Finance</h6><ul><li><a href="https://4ormfinance.com">Main site</a></li><li><a href="https://4ormfinance.com/regulatory.html">Regulatory posture</a></li><li><a href="https://4ormfinance.com/#waitlist">Request access (waitlist)</a></li><li><a href="mailto:compliance@kcs-capital.com">compliance@kcs-capital.com</a></li></ul></div>
        </div>
        <div class="lr"><div>© 2026 4orm Finance Holdings Inc. · Developed by KCS Capital (independent engineering firm)</div><div>Design preview · simulated data only · not a live trading venue</div></div>
        <p class="disclaim">4orm Finance is an early-stage platform in development. 4ormEx is a design preview of the trading venue (Pillar 02 of six) inside the planned 4orm Finance regulated control plane. 4ormEx is not registered as a dealer, marketplace, exchange, money services business, or bank in any Canadian jurisdiction. No applications have been filed. No services are offered, solicited, or available to any person. All identifiers, prices, balances, hashes, counterparties and institution names shown anywhere on this site are simulated, fictional, or illustrative; named real institutions, where they appear, are external precedents and are not partners, counterparties, or integrations of 4ormEx. Nothing on this site is an offer to sell or solicitation to buy securities, crypto assets, deposits, or any financial instrument, and nothing on this site is financial, legal, tax, or investment advice.</p>
      </div>
    </footer>`;

  function boot() {
    document.body.insertAdjacentHTML('afterbegin', TOPBAR_HTML + PRODUCTNAV_HTML + TICKER_HTML);

    const pane = document.querySelector('main.pane');
    if (pane) {
      const dash = document.createElement('div');
      dash.className = 'dash';
      pane.parentNode.insertBefore(dash, pane);
      dash.insertAdjacentHTML('afterbegin', SIDEBAR_HTML);
      dash.appendChild(pane);
    }

    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

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
