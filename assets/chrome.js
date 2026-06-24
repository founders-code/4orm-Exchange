/* 4ormEx · v17 chrome injector
   Builds util bar, preview legend, nav, closing CTA, family block, footer.
   Pure DOM. No dependencies. Runs after DOMContentLoaded (defer).
*/
(function(){
  'use strict';

  var page = document.body.getAttribute('data-page') || 'home';

  var NAV_LINKS = [
    { label:'Home',                 href:'/',                    slug:'home' },
    { label:'What we do',           href:'/what-we-do',          slug:'what-we-do' },
    { label:'The settlement layer', href:'/settlement-layer',    slug:'settlement-layer' },
    { label:'Asset categories',     href:'/asset-categories',    slug:'asset-categories' },
    { label:'DvP',                  href:'/dvp',                 slug:'dvp' },
    { label:'Finality',             href:'/finality',            slug:'finality' }
  ];

  function el(tag, attrs, html){
    var n = document.createElement(tag);
    if(attrs){ for(var k in attrs){ n.setAttribute(k, attrs[k]); } }
    if(html != null){ n.innerHTML = html; }
    return n;
  }

  function mount(id, node){
    var m = document.getElementById(id);
    if(m) m.replaceWith(node);
  }

  /* ---------- Util bar ---------- */
  function buildUtil(){
    var bar = el('div', {class:'util'});
    bar.innerHTML =
      '<div class="util-inner">' +
        '<div class="util-links">' +
          '<a href="https://4ormfinance.com">4orm Finance</a>' +
          '<a href="#" class="here">4ormEx</a>' +
          '<a href="https://4ormedc.com">Demo</a>' +
          '<a href="https://data.4ormfinance.com">Data Room</a>' +
          '<a href="https://kcs-capital.com">KCS Capital</a>' +
        '</div>' +
        '<span class="util-waitlist"><span class="ring"></span>Raise · open to accredited investors</span>' +
      '</div>';
    return bar;
  }

  /* ---------- Preview legend ---------- */
  function buildLegend(){
    var s = el('div', {class:'preview-legend'});
    s.innerHTML = '<strong>Accredited investors only.</strong> This site is a design preview of a planned permissioned trading venue. Not an offering of securities.';
    return s;
  }

  /* ---------- Nav ---------- */
  function buildNav(){
    var nav = el('header', {class:'nav'});
    var links = NAV_LINKS.map(function(l){
      var active = (l.slug === page) ? ' is-active' : '';
      return '<a href="' + l.href + '" data-page="' + l.slug + '" class="' + active.trim() + '">' + l.label + '</a>';
    }).join('');
    nav.innerHTML =
      '<div class="nav-inner">' +
        '<a class="brand" href="/" aria-label="4ormEx home">' +
          '<img class="brand-logo" src="/assets/4orm-finance-logo.png" alt="4orm Finance" />' +
          '<span class="brand-label">' +
            '<span class="l1">4ormEx</span>' +
            '<span class="l2">Pillar 02 · Trading</span>' +
          '</span>' +
        '</a>' +
        '<nav class="nav-links" aria-label="Primary">' + links + '</nav>' +
        '<a class="nav-cta" href="https://4ormfinance.com/#waitlist">Request access ' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>' +
        '</a>' +
      '</div>';
    return nav;
  }

  /* ---------- Closing CTA ---------- */
  function buildCTA(){
    var s = el('section', {class:'iw-cta', id:'access'});
    s.innerHTML =
      '<div class="wrap">' +
        '<span class="stamp"><span class="pulse"></span>Pre-registration · accredited investors</span>' +
        '<h2>Inside the regulatory perimeter. <span class="accent">Built quietly. Open by invitation.</span></h2>' +
        '<p>Access to 4ormEx is by request, restricted to accredited investors. The waitlist supports the parallel 4orm Finance raise. No services are offered, solicited, or available.</p>' +
        '<div class="iw-btns">' +
          '<a class="btn btn-primary" href="https://4ormfinance.com/#waitlist">Request access ' +
            '<svg class="arr" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>' +
          '</a>' +
          '<a class="btn btn-ghost" href="/settlement-layer">Read the architecture</a>' +
        '</div>' +
      '</div>';
    return s;
  }

  /* ---------- Family block ---------- */
  function buildFam(){
    var s = el('section', {class:'fam'});
    s.innerHTML =
      '<div class="wrap">' +
        '<div class="sh">' +
          '<div class="s-eye"><span class="tick"></span><span class="dot"></span><span class="txt">The 4orm family</span></div>' +
          '<h3>Four surfaces. One perimeter. 4ormEx is one of them.</h3>' +
        '</div>' +
        '<div class="fam-grid">' +
          '<a class="fam-card here" href="/"><span class="badge">You are here</span><h4>4ormEx</h4><p>Trading venue surface. Permissioned matching with settlement finality at commit.</p><span class="url">4ormex.com</span></a>' +
          '<a class="fam-card" href="https://4ormfinance.com"><span class="badge">Main</span><h4>4orm Finance</h4><p>The neutral settlement layer. Six capabilities inside one perimeter.</p><span class="url">4ormfinance.com</span></a>' +
          '<a class="fam-card" href="https://4ormedc.com"><span class="badge">Demo</span><h4>Demo Exchange</h4><p>Guided walkthrough of the settlement-layer mechanics on a simulated order.</p><span class="url">4ormedc.com</span></a>' +
          '<a class="fam-card" href="https://kcs-capital.com"><span class="badge">Engineering</span><h4>KCS Capital</h4><p>The independent firm engineering 4orm Finance and 4ormEx. Founder-led.</p><span class="url">kcs-capital.com</span></a>' +
        '</div>' +
      '</div>';
    return s;
  }

  /* ---------- Footer + legal ---------- */
  function buildFooter(){
    var f = el('footer', {class:'footer'});
    f.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          '<div><h5>4ormEx</h5><p>Pillar 02 of the 4orm Finance neutral settlement layer. A planned permissioned trading venue, engineered by KCS Capital. Pre-registration.</p></div>' +
          '<div><h6>Surface</h6><ul>' +
            '<li><a href="/what-we-do">What we do</a></li>' +
            '<li><a href="/settlement-layer">The settlement layer</a></li>' +
            '<li><a href="/asset-categories">Asset categories</a></li>' +
            '<li><a href="/dvp">DvP</a></li>' +
            '<li><a href="/finality">Finality</a></li>' +
          '</ul></div>' +
          '<div><h6>4orm Finance</h6><ul>' +
            '<li><a href="https://4ormfinance.com">Main site</a></li>' +
            '<li><a href="https://4ormedc.com">Demo Exchange</a></li>' +
            '<li><a href="https://data.4ormfinance.com">Data Room</a></li>' +
          '</ul></div>' +
          '<div><h6>Contact</h6><ul>' +
            '<li><a href="https://4ormfinance.com/#waitlist">Request access</a></li>' +
            '<li><a href="mailto:compliance@4ormfinance.com">compliance@4ormfinance.com</a></li>' +
            '<li><a href="/legal">Privacy &amp; cookies</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="legal-block">' +
          '<p><strong>Design preview.</strong> 4ormEx is an early-stage software preview of a planned permissioned trading venue (Pillar 02 of six) inside the future 4orm Finance neutral settlement layer. It is not a registered marketplace, dealer, exchange, money services business, or bank in any Canadian jurisdiction. No applications have been filed. No services are offered, solicited, or available to any person.</p>' +
          '<p><strong>Intended regulatory alignment.</strong> The venue is being designed with intended alignment to NI 21-101 (Marketplace Operation), NI 23-101 (Trading Rules), NI 24-102 (Clearing Agency Requirements), and NI 31-103 (Registration Requirements), subject to required regulatory approvals. Operating a marketplace for securities in Canada is a registrable activity. 4orm Trust Co is a proposed entity; until established, third-party qualified custody applies.</p>' +
          '<p><strong>No real institutions.</strong> All identifiers, prices, balances, hashes, counterparties, tickers, and listings shown anywhere on this site are simulated and illustrative. No real institutions are named as counterparties or partners. 4orm Finance is informed by, but not a participant in, the Bank of Canada\'s Project Samara experiment (Staff Analytical Paper 2026-8) and the CSA Project Tokenization initiative.</p>' +
          '<p><strong>Cash leg.</strong> 4orm takes no deposits, touches no CDIC funds, and needs no banking or trust licence. The deposit token is the bank\'s liability, issued under the bank\'s own banking authorizations.</p>' +
          '<p><strong>Not advice; not an offer.</strong> Nothing on this site is an offer to sell or solicitation to buy securities, crypto assets, deposits, or any financial instrument, and nothing on this site is financial, legal, tax, or investment advice. Forward-looking statements reflect current intent only and are not guarantees of future outcomes. Questions: <a href="mailto:compliance@4ormfinance.com">compliance@4ormfinance.com</a>.</p>' +
        '</div>' +
        '<div class="copy-row">' +
          '<span>© 2026 4orm Finance Holdings Inc.</span>' +
          '<span>Engineered by KCS Capital · independent</span>' +
        '</div>' +
      '</div>';
    return f;
  }

/* ---------- Disclaimer gate (first-visit, session-scoped) ---------- */
function buildGate(){
  if(sessionStorage.getItem('4ormex.gate.ack') === '1') return null;

  var g = el('div', {
    class:'gate',
    role:'dialog',
    'aria-modal':'true',
    'aria-labelledby':'gate-title'
  });
  g.innerHTML =
    '<div class="gate-card">' +
      '<span class="gate-eye"><span class="dot"></span>Design preview · acknowledge to continue</span>' +
      '<h3 id="gate-title">4ormEx is a design preview. Not a registered venue.</h3>' +
      '<p>4ormEx is an early-stage software preview of a planned permissioned trading venue (Pillar 02 of six) inside the future 4orm Finance neutral settlement layer.</p>' +
      '<p><strong>It is not a registered marketplace, dealer, exchange, money services business, or bank in any Canadian jurisdiction.</strong> No applications have been filed. No services are offered, solicited, or available.</p>' +
      '<p>Every figure, ticker, identifier, counterparty, and listing shown anywhere on this site is simulated and illustrative.</p>' +
      '<div class="gate-actions">' +
        '<button class="btn btn-primary" id="gate-ack" type="button">I understand. Continue.</button>' +
      '</div>' +
    '</div>';

  // Block scroll while gate is up
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  // Wire up acknowledge and trap focus
  setTimeout(function(){
    var btn = g.querySelector('#gate-ack');
    if(!btn) return;
    btn.addEventListener('click', function(){
      sessionStorage.setItem('4ormex.gate.ack', '1');
      g.style.opacity = '0';
      g.style.transition = 'opacity .25s ease-out';
      setTimeout(function(){
        if(g.parentNode) g.parentNode.removeChild(g);
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }, 250);
    });
    btn.focus();
  }, 0);

  // Trap Tab inside the gate
  g.addEventListener('keydown', function(e){
    if(e.key === 'Tab'){
      e.preventDefault();
      var btn = g.querySelector('#gate-ack');
      if(btn) btn.focus();
    }
    // Block Escape - there is no close action
    if(e.key === 'Escape'){
      e.preventDefault();
    }
  });

  return g;
}

  /* ---------- Mount ---------- */
  mount('util-mount', buildUtil());
  mount('legend-mount', buildLegend());
  mount('nav-mount', buildNav());
  mount('cta-mount', buildCTA());
  mount('fam-mount', buildFam());
  mount('footer-mount', buildFooter());

  /* Gate goes last so it stacks on top of everything else */
var gate = buildGate();
if(gate) document.body.appendChild(gate);
})();
