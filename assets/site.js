/* 4orm Transaction Integrity - the firm surface.
   Chrome injection, reveal, segmented controls, the supervision board.
   Every figure, name and file on this site is invented for illustration. */
(function(){
  'use strict';

  var V = '20260902';
  var PAGE = document.body.getAttribute('data-page') || 'home';
  var DOT = '\u00B7';

  var NAV = [
    { t:'Overview',   h:'/',            s:'home' },
    { t:'The record', h:'/the-record',  s:'record' },
    { t:'Industries', h:'/industries',  s:'industries' }
  ];
  var CTA_T = 'Book a walkthrough';
  var CTA_H = 'mailto:office@4ormfinance.com?subject=Transaction%20Integrity%20walkthrough';

  function esc(s){
    return String(s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function el(tag, cls, html){
    var n = document.createElement(tag);
    if(cls) n.className = cls;
    if(html != null) n.innerHTML = html;
    return n;
  }
  function mount(id, node){ var m = document.getElementById(id); if(m) m.replaceWith(node); }

  var AR = '<svg class="ar" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

  /* ---------- nav ---------- */
  function buildNav(){
    var n = el('header','nav');
    var links = NAV.map(function(l){
      return '<a href="'+l.h+'"'+(l.s===PAGE?' class="on"':'')+'>'+esc(l.t)+'</a>';
    }).join('');
    n.innerHTML =
      '<div class="nav-in">'+
        '<a class="nav-brand" href="/">'+
          '<span class="w">4<em>orm</em></span>'+
          '<span class="s">Transaction Integrity</span>'+
        '</a>'+
        '<nav class="nav-links" aria-label="Primary">'+links+'</nav>'+
        '<a class="nav-cta" href="'+CTA_H+'">'+esc(CTA_T)+AR+'</a>'+
      '</div>';
    return n;
  }

  /* ---------- closing ---------- */
  function buildClose(){
    var s = el('section','close');
    s.innerHTML =
      '<div class="wrap">'+
        '<span class="kick">Thirty minutes, against one of your own files</span>'+
        '<h2>Pick a deal that closed last year. We will show you what comes back.</h2>'+
        '<p class="lede">No data leaves your office to do this. You describe a file, we open the same screens a principal broker uses, and you see what an examiner would receive if they asked about it eighteen months from now.</p>'+
        '<div class="close-b">'+
          '<a class="btn btn-p" href="'+CTA_H+'">'+esc(CTA_T)+AR+'</a>'+
          '<a class="btn btn-g" href="/the-record">See what a file returns</a>'+
        '</div>'+
      '</div>';
    return s;
  }

  /* ---------- footer ---------- */
  function buildFoot(){
    var f = el('footer','site-foot');
    var yr = new Date().getFullYear();
    f.innerHTML =
      '<div class="wrap">'+
        '<div class="foot-g">'+
          '<div>'+
            '<h5>4orm Finance</h5>'+
            '<p>Transaction Integrity is the commercial platform for the regulated firm. It builds the record of what happened in a consequential consumer financial transaction, from the systems the firm already runs. A Calgary software company.</p>'+
          '</div>'+
          '<div><h6>This surface</h6><ul>'+
            NAV.map(function(l){ return '<li><a href="'+l.h+'">'+esc(l.t)+'</a></li>'; }).join('')+
          '</ul></div>'+
          '<div><h6>The company</h6><ul>'+
            '<li><a href="https://www.4ormfinance.com" target="_blank" rel="noopener">4ormfinance.com</a></li>'+
            '<li><a href="https://www.4ormfinance.com/the-standard" target="_blank" rel="noopener">The standard</a></li>'+
            '<li><a href="https://www.4ormfinance.com/privacy" target="_blank" rel="noopener">Privacy</a></li>'+
          '</ul></div>'+
          '<div><h6>Talk to us</h6><ul>'+
            '<li><a href="'+CTA_H+'">'+esc(CTA_T)+'</a></li>'+
            '<li><a href="mailto:office@4ormfinance.com">office@4ormfinance.com</a></li>'+
          '</ul></div>'+
        '</div>'+
        '<div class="foot-legal">'+
          '<p><b>Illustrative throughout.</b> Every file, name, borrower, agent, date and figure shown on this site is invented for illustration. They are not screenshots of a live system, they do not describe any real firm or any real person, and no figure on this site is taken from a customer.</p>'+
          '<p><b>What the platform does not do.</b> It never holds or moves client money. It never decides whether a recommendation is suitable. It never gives financial advice, and it never performs, conducts or signs an independent review. The professional keeps the recommendation, the firm keeps the duty, and the reviewer stays independent.</p>'+
          '<p><b>Market figures.</b> Market figures are management estimates built from published regulatory registries and reporting-entity counts, tiered pricing assumptions and an overlap adjustment. They are not third-party market research. Forecasts are constrained by sales capacity, delivery capacity, price realization and retention assumptions stated in the model. Cryptographic integrity supports the detection of changes to an evidence package; it does not establish legal admissibility and does not prove compliance.</p>'+
          '<p><b>Regulator findings.</b> Findings attributed to a regulator are drawn from the published material of that body and are quoted as targeted findings on selected files, not as a measure of the whole market. Sources are named beside each figure. Confirm against the current published text before relying on any of them.</p>'+
          '<p><b>No affiliation.</b> 4orm Finance is an independent company. It is not affiliated with, endorsed by, sponsored by, acting for or approved by FSRA, RECO, OMVIC, the Canadian Securities Administrators, CIRO, the Bank of Canada or any other body named anywhere on this site. Those bodies are named only to identify published requirements and published findings.</p>'+
        '</div>'+
        '<div class="foot-end">'+
          '<span>\u00A9 '+yr+' 4orm Finance '+DOT+' Calgary, Alberta</span>'+
          '<span>Illustrative preview '+DOT+' build '+V+'</span>'+
        '</div>'+
      '</div>';
    return f;
  }

  mount('nav-mount',  buildNav());
  mount('close-mount', buildClose());
  mount('foot-mount', buildFoot());

  /* ---------- reveal: observer plus a rAF sweep for fast flings ---------- */
  (function reveal(){
    var items = [].slice.call(document.querySelectorAll('.rv'));
    if(!items.length) return;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){
      items.forEach(function(n){ n.classList.add('in'); }); return;
    }
    function show(n){ n.classList.add('in'); }
    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ show(e.target); io.unobserve(e.target); } });
      }, { rootMargin:'0px 0px -8% 0px', threshold:.04 });
      items.forEach(function(n){ io.observe(n); });
    }
    var tick = false;
    function sweep(){
      tick = false;
      var h = window.innerHeight;
      items.forEach(function(n){
        if(n.classList.contains('in')) return;
        var r = n.getBoundingClientRect();
        if(r.top < h * 0.94 && r.bottom > 0) show(n);
      });
    }
    addEventListener('scroll', function(){ if(!tick){ tick = true; requestAnimationFrame(sweep); } }, {passive:true});
    addEventListener('resize', sweep, {passive:true});
    sweep();
  })();

  /* ---------- segmented controls: [data-seg] drives [data-pane] ---------- */
  [].forEach.call(document.querySelectorAll('[data-seg]'), function(seg){
    var scope = document.querySelector('[data-panes="'+seg.getAttribute('data-seg')+'"]');
    if(!scope) return;
    var btns  = [].slice.call(seg.querySelectorAll('button'));
    var panes = [].slice.call(scope.querySelectorAll('[data-pane]'));
    function pick(k){
      btns.forEach(function(b){ b.setAttribute('aria-selected', String(b.getAttribute('data-k') === k)); });
      panes.forEach(function(p){ p.classList.toggle('on', p.getAttribute('data-pane') === k); });
    }
    btns.forEach(function(b){ b.addEventListener('click', function(){ pick(b.getAttribute('data-k')); }); });
    var first = btns[0]; if(first) pick(first.getAttribute('data-k'));
  });

  /* ---------- the supervision board ---------- */
  (function board(){
    var root = document.querySelector('[data-board]');
    if(!root) return;

    var OK   = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0E8A5F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>';
    var GAP  = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8F5C12" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.2M12 16.3v.2"/></svg>';

    var FILES = [
      { id:'M-2291', nm:'Renewal, five year fixed', ag:'D. Whitfield', st:'warn', days:'open 12 days',
        need:'Two items outstanding',
        items:[
          [1,'What the borrower said they needed, captured in the first call'],
          [1,'Three products considered, with the rates and terms as at that date'],
          [1,'The recommendation, and the reason it was made'],
          [0,'<b>The trade-off that was discussed verbally</b> when the borrower asked about the penalty'],
          [0,'<b>Acknowledgement</b> that the prepayment terms were read']
        ]},
      { id:'M-2288', nm:'Purchase, first time buyer', ag:'S. Okonkwo', st:'ok', days:'closed 4 days ago',
        need:'Complete',
        items:[
          [1,'Goals, circumstances and preferences, captured at intake'],
          [1,'Four products considered, two declined with reasons'],
          [1,'The recommendation, dated against what was known that day'],
          [1,'Material risks disclosed and acknowledged'],
          [1,'A change in employment, re-checked against the recommendation']
        ]},
      { id:'M-2284', nm:'Refinance, self employed', ag:'D. Whitfield', st:'bad', days:'open 31 days',
        need:'No documented suitability',
        items:[
          [1,'Application and supporting documents'],
          [0,'<b>Nothing recorded</b> about what the borrower needed'],
          [0,'<b>No alternatives</b> shown as considered'],
          [0,'<b>No reason</b> recorded for the product selected'],
          [0,'<b>No acknowledgement</b> of the rate hold expiry']
        ]},
      { id:'M-2279', nm:'Switch, rate improvement', ag:'A. Bhattacharya', st:'ok', days:'closed 9 days ago',
        need:'Complete',
        items:[
          [1,'What the borrower wanted from the switch'],
          [1,'The comparison that was run, and what it returned'],
          [1,'The recommendation and the reason'],
          [1,'Penalty and break cost disclosed, acknowledged same day'],
          [1,'Reviewed by the principal broker']
        ]},
      { id:'M-2276', nm:'Private lending, bridge', ag:'S. Okonkwo', st:'warn', days:'open 6 days',
        need:'One item outstanding',
        items:[
          [1,'Circumstances and the reason a bridge was being considered'],
          [1,'Two lenders approached, terms recorded'],
          [1,'The recommendation and the reason'],
          [1,'Fees and compensation disclosed'],
          [0,'<b>Borrower acknowledgement</b> of the lender fee, not yet returned']
        ]},
      { id:'M-2270', nm:'Purchase, new to Canada', ag:'A. Bhattacharya', st:'ok', days:'closed 16 days ago',
        need:'Complete',
        items:[
          [1,'Goals and circumstances, captured with an interpreter present'],
          [1,'Three products considered, one declined on documentation'],
          [1,'The recommendation and the reason'],
          [1,'Material risks disclosed, acknowledged in the first language of the borrower'],
          [1,'Reviewed by the principal broker']
        ]}
    ];

    var listEl   = root.querySelector('[data-board-list]');
    var detailEl = root.querySelector('[data-board-detail]');
    var countEl  = root.querySelector('[data-board-count]');
    var filter   = 'all';
    var current  = FILES[0].id;

    function pipFor(st){
      if(st === 'ok')   return '<span class="pip ok"><i></i>Complete</span>';
      if(st === 'warn') return '<span class="pip warn"><i></i>Gap</span>';
      return '<span class="pip bad"><i></i>No suitability</span>';
    }

    function visible(){
      return FILES.filter(function(f){
        if(filter === 'all')  return true;
        if(filter === 'att')  return f.st !== 'ok';
        return f.st === 'ok';
      });
    }

    function renderList(){
      var rows = visible();
      listEl.innerHTML = rows.map(function(f){
        return '<button class="row" type="button" data-act="file" data-id="'+esc(f.id)+'" role="option" aria-selected="'+(f.id===current)+'">'+
                 '<span class="nm">'+esc(f.nm)+'</span>'+
                 pipFor(f.st)+
                 '<span class="mt">'+esc(f.id)+' '+DOT+' '+esc(f.ag)+' '+DOT+' '+esc(f.days)+'</span>'+
               '</button>';
      }).join('');
      if(countEl){
        var gaps = FILES.filter(function(f){ return f.st !== 'ok'; }).length;
        countEl.textContent = rows.length + ' of ' + FILES.length + ' files ' + DOT + ' ' + gaps + ' needing attention';
      }
      [].forEach.call(listEl.querySelectorAll('[data-act="file"]'), function(b){
        b.addEventListener('click', function(){ current = b.getAttribute('data-id'); renderList(); renderDetail(); });
      });
    }

    function renderDetail(){
      var f = FILES.filter(function(x){ return x.id === current; })[0] || FILES[0];
      var done = f.items.filter(function(i){ return i[0]; }).length;
      detailEl.innerHTML =
        '<div class="bd-h">'+
          '<div><h4>'+esc(f.nm)+'</h4><div class="bd-id">'+esc(f.id)+' '+DOT+' '+esc(f.ag)+'</div></div>'+
          pipFor(f.st)+
        '</div>'+
        '<ul class="chk">'+
          f.items.map(function(i){
            return '<li class="'+(i[0]?'':'miss')+'">'+(i[0]?OK:GAP)+'<span>'+i[1]+'</span></li>';
          }).join('')+
        '</ul>'+
        '<div class="bd-foot">'+done+' of '+f.items.length+' captured '+DOT+' '+esc(f.need)+'</div>';
    }

    var segEls = root.querySelectorAll('[data-act="filter"]');
    [].forEach.call(segEls, function(b){
      b.addEventListener('click', function(){
        filter = b.getAttribute('data-k');
        [].forEach.call(segEls, function(x){ x.setAttribute('aria-selected', String(x === b)); });
        var rows = visible();
        if(!rows.filter(function(r){ return r.id === current; }).length && rows.length) current = rows[0].id;
        renderList(); renderDetail();
      });
    });

    renderList(); renderDetail();
  })();

})();
