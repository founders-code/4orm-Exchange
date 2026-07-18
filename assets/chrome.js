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
          '<a href="https://4ormdr.com">Data Room</a>' +
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
          '<div class="s-eye"><span class="tick"></span><span class="dot"></span><span class="txt">The 4orm Finance family</span></div>' +
          '<h3>Three surfaces. One perimeter. 4ormEx is one of them.</h3>' +
        '</div>' +
        '<div class="fam-grid">' +
          '<a class="fam-card here fc-ex" href="/"><span class="badge">You are here</span><h4>4ormEx</h4><p>Institutional trading venue surface. Permissioned matching with settlement finality at commit.</p><span class="url">4ormex.com</span></a>' +
          '<a class="fam-card fc-data" href="https://4ormdr.com"><span class="badge">01 · Data Room</span><h4>4orm Data Room <span class="ext">↗</span></h4><p>Vetted access for institutional and accredited investors. Documents, disclosures, diligence.</p><span class="url">4ormdr.com</span></a>' +
          '<a class="fam-card fc-fin" href="https://4ormfinance.com"><span class="badge">02 · Neutral Layer</span><h4>4orm Finance <span class="ext">↗</span></h4><p>The neutral, Canadian-dollar settlement layer. Six embedded capabilities inside one perimeter.</p><span class="url">4ormfinance.com</span></a>' +
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
          '<div>' +
            '<h5>4ormEx</h5>' +
            '<p>Institutional trading venue surface inside the 4orm Finance neutral settlement layer. Engineered by KCS Capital. Incorporated in Alberta.</p>' +
            '<div class="foot-contact">' +
              '<div class="fc-lbl">Get in touch</div>' +
              '<a href="mailto:office@4ormfinance.com">office@4ormfinance.com</a>' +
              '<a href="https://4ormdr.com">www.4ormdr.com</a>' +
              '<span class="fc-addr">Unit 400, 718 8 Ave SW, Calgary, AB</span>' +
            '</div>' +
          '</div>' +
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
            '<li><a href="https://4ormdr.com">Data Room</a></li>' +
          '</ul></div>' +
          '<div><h6>Contact</h6><ul>' +
            '<li><a href="https://4ormfinance.com/#waitlist">Request access</a></li>' +
            '<li><a href="mailto:compliance@4ormfinance.com">compliance@4ormfinance.com</a></li>' +
            '<li><a href="/legal">Privacy &amp; cookies</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="legal-block">' +
          '<p><strong>Accredited investors only.</strong> The securities referenced on this website are being offered only to "accredited investors" as defined in National Instrument 45-106. This is not an offer to sell or a solicitation of an offer to buy securities in any jurisdiction where such offer is not permitted. No securities regulatory authority has assessed the merits of any securities described on this website. 4ormEx is an early-stage software preview of a planned permissioned trading venue (Pillar 02 of six) inside the future 4orm Finance neutral settlement layer. It is not a registered marketplace, dealer, exchange, money services business, or bank in any Canadian jurisdiction. No applications have been filed. No services are offered, solicited, or available to any person.</p>' +
          '<p><strong>Forward-looking statements.</strong> This website contains forward-looking statements within the meaning of applicable Canadian securities laws, including statements about the planned 4ormEx trading venue, its intended regulatory alignment with National Instruments 21-101, 23-101, 24-102, and 31-103, and its planned integration with the 4orm Finance neutral settlement layer. These statements are based on assumptions current as of the date stated and are subject to material risks and uncertainties, including the receipt of required regulatory approvals. Actual results may differ materially. 4orm Trust Co is a proposed entity; until established, third-party qualified custody applies.</p>' +
          '<p><strong>No affiliation or endorsement.</strong> References to third-party companies, regulators, and initiatives are for market-context and educational purposes only and do not imply any partnership, endorsement, or affiliation. All third-party names and trademarks are the property of their respective owners. 4orm Finance and 4ormEx are not affiliated with the Bank of Canada, OSFI, the CSA (or its members including OSC, AMF, BCSC, ASC), CIRO, FINTRAC, or any other regulator. No regulator has reviewed, endorsed, or approved 4orm Finance, 4ormEx, or any securities described on this website. 4orm Finance is informed by, but not a participant in, the Bank of Canada\'s Project Samara experiment (Staff Analytical Paper 2026-8) and the CSA Project Tokenization initiative. All identifiers, prices, balances, hashes, counterparties, tickers, and listings shown anywhere on this site are simulated and illustrative.</p>' +
          '<p><strong>FINTRAC.</strong> 4orm Finance will register with FINTRAC as required prior to commencing regulated activity. FINTRAC registration is not an endorsement. Questions: <a href="mailto:compliance@4ormfinance.com">compliance@4ormfinance.com</a>.</p>' +
        '</div>' +
        '<div class="copy-row">' +
          '<span>© 2026 4orm Finance · Calgary, AB</span>' +
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
