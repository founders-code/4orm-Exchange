/* Chrome injector - shared page furniture for 4ormex.com.
   Builds the preview legend, nav, closing CTA, family block and footer.
   Pure DOM. No dependencies. Runs after DOMContentLoaded (defer).

   Disclosure rule for this surface: this site shows WHAT the platform
   produces. It does not describe HOW any of it is produced. Keep it that way.
*/
(function(){
  'use strict';

  /* ========================================================
     CONFIG
     ======================================================== */

  var BRAND_NAME = '4orm Finance';

  /* Drop a transparent PNG at /assets/logo.png and flip USE_LOGO to true.
     Until then the nav renders a typographic wordmark so nothing is broken. */
  var USE_LOGO = false;
  var LOGO_SRC = '/assets/logo.png';

  var NAV_LINKS = [
    { label:'Home',                 href:'/',                     slug:'home' },
    { label:'The duty',             href:'/the-duty',             slug:'the-duty' },
    { label:'The platform',         href:'/platform',             slug:'platform' },
    { label:'Inside the platform',  href:'/inside-the-platform',  slug:'screens' },
    { label:'Contact',              href:'/contact',              slug:'contact' }
  ];

  var CTA_LABEL = 'Request a walkthrough';
  var CTA_HREF  = '/contact';

  var LEGEND_HTML = '<strong>Platform preview.</strong> Every screen and figure on this site is drawn for illustration. Not a live environment.';

  /* The investor data room is deliberately NOT linked or named here. A public
     buyer page has no reason to advertise the address of a confidential
     document set. Do not add it back. */
  var FAMILY_EYEBROW = 'Two 4orm surfaces';
  var FAMILY_HEADLINE = 'One company. Two places it shows up.';
  var FAMILY_CARDS = [
    { cls:'fc-b', href:'https://www.4ormfinance.com', badge:'01 / The company',
      name:'4orm Finance', url:'4ormfinance.com', ext:true,
      body:'Who we are, what we are building and why now. The company surface.' },
    { cls:'here fc-a', href:'/', badge:'You are here',
      name:'Platform preview', url:'4ormex.com',
      body:'What the platform produces, drawn rather than photographed.' }
  ];

  var CONTACT_EMAIL = 'office@4ormfinance.com';

  /* ========================================================
     Helpers
     ======================================================== */

  var page = document.body.getAttribute('data-page') || 'home';

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

  var ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

  /* ========================================================
     Preview legend
     ======================================================== */
  function buildLegend(){
    var s = el('div', {class:'preview-legend'});
    s.innerHTML = LEGEND_HTML;
    return s;
  }

  /* ========================================================
     Nav
     ======================================================== */
  function buildNav(){
    var nav = el('header', {class:'nav' + (USE_LOGO ? '' : ' nav--word')});

    var mark = USE_LOGO
      ? '<img class="brand-logo" src="' + LOGO_SRC + '" alt="' + BRAND_NAME + '" />'
      : '<span class="brand-word">' +
          '<span class="bw-main">4<em>orm</em></span>' +
          '<span class="bw-sub">Platform preview</span>' +
        '</span>';

    var links = NAV_LINKS.map(function(l){
      var active = (l.slug === page) ? ' class="is-active"' : '';
      return '<a href="' + l.href + '" data-page="' + l.slug + '"' + active + '>' + l.label + '</a>';
    }).join('');

    nav.innerHTML =
      '<div class="nav-inner">' +
        '<a class="brand" href="/" aria-label="' + BRAND_NAME + ' home">' + mark + '</a>' +
        '<nav class="nav-links" aria-label="Primary">' + links + '</nav>' +
        '<a class="nav-cta" href="' + CTA_HREF + '">' + CTA_LABEL + ' ' + ARROW + '</a>' +
      '</div>';
    return nav;
  }

  /* ========================================================
     Closing CTA
     ======================================================== */
  function buildCTA(){
    var s = el('section', {class:'iw-cta', id:'walkthrough'});
    s.innerHTML =
      '<div class="wrap">' +
        '<span class="stamp"><span class="pulse"></span>The duty is live today</span>' +
        '<h2>See it against your own morning. <span class="accent">Bring a date and a balance.</span></h2>' +
        '<p>A walkthrough runs about thirty minutes. We open the screens, you pick a day, and we show what the record for that day looks like when an examiner asks about it eighteen months later.</p>' +
        '<div class="iw-btns">' +
          '<a class="btn btn-primary" href="' + CTA_HREF + '">' + CTA_LABEL + ' ' + ARROW + '</a>' +
          '<a class="btn btn-ghost" href="/inside-the-platform">Look at the screens first</a>' +
        '</div>' +
      '</div>';
    return s;
  }

  /* ========================================================
     Family block
     ======================================================== */
  function buildFam(){
    var s = el('section', {class:'fam'});
    var cards = FAMILY_CARDS.map(function(c){
      var ext = c.ext ? ' <span class="ext">&#8599;</span>' : '';
      var rel = c.ext ? ' target="_blank" rel="noopener"' : '';
      return '<a class="fam-card ' + c.cls + '" href="' + c.href + '"' + rel + '>' +
               '<span class="badge">' + c.badge + '</span>' +
               '<h4>' + c.name + ext + '</h4>' +
               '<p>' + c.body + '</p>' +
               '<span class="url">' + c.url + '</span>' +
             '</a>';
    }).join('');
    s.innerHTML =
      '<div class="wrap">' +
        '<div class="sh">' +
          '<div class="s-eye"><span class="tick"></span><span class="dot"></span><span class="txt">' + FAMILY_EYEBROW + '</span></div>' +
          '<h3>' + FAMILY_HEADLINE + '</h3>' +
        '</div>' +
        '<div class="fam-grid' + (FAMILY_CARDS.length === 2 ? ' c2' : '') + '">' + cards + '</div>' +
      '</div>';
    return s;
  }

  /* ========================================================
     Footer
     ======================================================== */
  function buildFooter(){
    var f = el('footer', {class:'footer'});
    var year = new Date().getFullYear();

    f.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<h5>' + BRAND_NAME + '</h5>' +
            '<p>Software that performs the daily proof a company owes when it holds money belonging to somebody else, keeps that proof, and produces it when it is asked for. An Alberta company.</p>' +
            '<div class="foot-contact">' +
              '<div class="fc-lbl">Get in touch</div>' +
              '<a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>' +
              '<a href="https://www.4ormfinance.com" target="_blank" rel="noopener">www.4ormfinance.com</a>' +
              '<span class="fc-addr">Alberta, Canada</span>' +
            '</div>' +
          '</div>' +
          '<div><h6>This site</h6><ul>' +
            NAV_LINKS.slice(1).map(function(l){
              return '<li><a href="' + l.href + '">' + l.label + '</a></li>';
            }).join('') +
          '</ul></div>' +
          '<div><h6>The four parts</h6><ul>' +
            '<li><a href="/platform#safeguard">Safeguard</a></li>' +
            '<li><a href="/platform#comply">Comply</a></li>' +
            '<li><a href="/platform#trust">Trust</a></li>' +
            '<li><a href="/platform#recall">Recall</a></li>' +
          '</ul></div>' +
          '<div><h6>Elsewhere</h6><ul>' +
            '<li><a href="https://www.4ormfinance.com" target="_blank" rel="noopener">The company</a></li>' +
            '<li><a href="' + CTA_HREF + '">' + CTA_LABEL + '</a></li>' +
            '<li><a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a></li>' +
          '</ul></div>' +
        '</div>' +

        '<div class="legal-block">' +
          '<p><strong>Illustrative screens.</strong> Every screen, balance, name, timestamp and figure shown on this site is drawn for illustration. They are not screenshots of a live system, they do not describe any real firm, and no figure on this site is taken from a customer.</p>' +
          '<p><strong>Not advice.</strong> Nothing on this site is legal, compliance, accounting, tax or investment advice, and nothing here is an offer to sell or a solicitation to buy securities. A firm subject to the Retail Payment Activities Act, the Proceeds of Crime (Money Laundering) and Terrorist Financing Act or a provincial real estate act should take its own advice on what those statutes require of it.</p>' +
          '<p><strong>No affiliation.</strong> 4orm Finance is an independent company. It is not affiliated with, endorsed by, sponsored by, acting for or approved by the Bank of Canada, FINTRAC, OSFI, the Canadian Securities Administrators, any provincial regulator or any other public body named anywhere on this site. Those bodies are named only to identify the statutes and published requirements this software is built to serve.</p>' +
          '<p><strong>Intellectual property.</strong> Patent applications pending. This site describes what the platform produces. It does not describe how any of it is produced, and the underlying design is confidential and shown only under a written agreement.</p>' +
          '<p><strong>Sources.</strong> Statutory dates and penalty ceilings cited on this site are drawn from the Bank of Canada retail payments pages, the Retail Payment Activities Act and the Retail Payment Activities Regulations SOR/2023-229, and from Bill C-12 as it came into force on 26 March 2026. Readers should confirm all of them against the current published text before relying on any of them.</p>' +
        '</div>' +

        '<div class="copy-row">' +
          '<span>&#169; ' + year + ' ' + BRAND_NAME + ' &#183; Alberta, Canada</span>' +
          '<span>Platform preview &#183; illustrative throughout</span>' +
        '</div>' +
      '</div>';
    return f;
  }

  /* ========================================================
     Mount
     ======================================================== */
  mount('legend-mount', buildLegend());
  mount('nav-mount',    buildNav());
  mount('cta-mount',    buildCTA());
  mount('fam-mount',    buildFam());
  mount('footer-mount', buildFooter());

  /* ========================================================
     App mock - five-screen switcher on /inside-the-platform
     Presentation only. No data, no logic, no method.
     ======================================================== */
  (function initAppMock(){
    var app = document.querySelector('[data-app-mock]');
    if(!app) return;

    var rails = app.querySelectorAll('.rail-btn');
    var panes = app.querySelectorAll('.app-pane');

    function show(key){
      Array.prototype.forEach.call(rails, function(b){
        b.classList.toggle('on', b.getAttribute('data-screen') === key);
      });
      Array.prototype.forEach.call(panes, function(p){
        p.classList.toggle('on', p.getAttribute('data-pane') === key);
      });
    }

    Array.prototype.forEach.call(rails, function(b){
      b.addEventListener('click', function(){ show(b.getAttribute('data-screen')); });
    });
  })();

})();
