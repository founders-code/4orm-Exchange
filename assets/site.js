/* 4orm Transaction Integrity, the firm surface.
   Every file, name, figure and date below is invented for illustration. */
(function(){
  'use strict';

  var V='20260902-25', PAGE=document.body.getAttribute('data-page')||'home', DOT='\u00B7';
  var NAV=[{t:'Overview',h:'/',s:'home'},{t:'The record',h:'/the-record',s:'record'},{t:'Industries',h:'/industries',s:'industries'}];
  var CTA_T='Book a walkthrough', CTA_H='mailto:office@4ormfinance.com?subject=Transaction%20Integrity%20walkthrough';
  var LOGO='/assets/logo.png?v='+V;
  var AR='<svg class="ar" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function el(t,c,h){var n=document.createElement(t); if(c)n.className=c; if(h!=null)n.innerHTML=h; return n;}
  function mount(id,node){var m=document.getElementById(id); if(m)m.replaceWith(node);}

  document.body.insertBefore(el('div','aurora'), document.body.firstChild);

  /* ---------- nav ---------- */
  mount('nav-mount', (function(){
    var n=el('header','nav');
    n.innerHTML='<div class="nav-in">'+
      '<a class="nav-brand" href="/" aria-label="4orm Finance home"><img src="'+LOGO+'" alt="4orm Finance" width="58" height="26" /></a>'+
      '<nav class="nav-links" aria-label="Primary">'+NAV.map(function(l){
        return '<a href="'+l.h+'"'+(l.s===PAGE?' class="on"':'')+'>'+esc(l.t)+'</a>';}).join('')+'</nav>'+
      '<a class="nav-cta" href="'+CTA_H+'">'+esc(CTA_T)+'<span class="cir">'+AR+'</span></a></div>';
    return n;
  })());

  /* ---------- closing ---------- */
  mount('close-mount', (function(){
    var s=el('section','hs band');
    s.innerHTML='<div class="hwrap hero">'+
      '<span class="hk">Thirty minutes, against one of your own files</span>'+
      '<h2 class="hh" style="max-width:18em;margin:0 auto">Pick a deal that closed last year. <span class="acc">We will show you what comes back.</span></h2>'+
      '<p class="hsub center">No data leaves your office to do this. You describe a file, we open the same screens a principal broker uses, and you see what an examiner would receive if they asked about it eighteen months from now.</p>'+
      '<div class="hbtns"><a class="hb hb-p" href="'+CTA_H+'">'+esc(CTA_T)+AR+'</a>'+
      '<a class="hb hb-g" href="/the-record">See what a complete file looks like</a></div></div>';
    return s;
  })());

  /* ---------- footer ---------- */
  mount('foot-mount', (function(){
    var f=el('footer','site-foot'), yr=new Date().getFullYear();
    f.innerHTML='<div class="hwrap"><div class="foot-g">'+
      '<div><img src="'+LOGO+'" alt="4orm Finance" width="58" height="26" />'+
      '<p>Transaction Integrity is the commercial platform for the regulated firm. It builds the record of what happened in a consequential consumer financial transaction, from the systems the firm already runs. A Calgary software company.</p></div>'+
      '<div><h6>This surface</h6><ul>'+NAV.map(function(l){return '<li><a href="'+l.h+'">'+esc(l.t)+'</a></li>';}).join('')+'</ul></div>'+
      '<div><h6>The company</h6><ul>'+
        '<li><a href="https://www.4ormfinance.com" target="_blank" rel="noopener">4ormfinance.com</a></li>'+
        '<li><a href="https://www.4ormfinance.com/the-standard" target="_blank" rel="noopener">The standard</a></li>'+
        '<li><a href="https://www.4ormfinance.com/privacy" target="_blank" rel="noopener">Privacy</a></li></ul></div>'+
      '<div><h6>Talk to us</h6><ul><li><a href="'+CTA_H+'">'+esc(CTA_T)+'</a></li>'+
        '<li><a href="mailto:office@4ormfinance.com">office@4ormfinance.com</a></li></ul></div>'+
      '</div><div class="foot-legal">'+
      '<p><b>Illustrative throughout.</b> Every file, name, borrower, agent, date and figure shown on this site is invented for illustration. They are not screenshots of a live system, they do not describe any real firm or any real person, and no figure on this site is taken from a customer.</p>'+
      '<p><b>What the platform does not do.</b> It never holds or moves client money. It never decides whether a recommendation is suitable. It never gives financial advice, and it never performs, conducts or signs an independent review. The professional keeps the recommendation, the firm keeps the duty, and the reviewer stays independent.</p>'+
      '<p><b>Market figures.</b> Market figures are management estimates built from published regulatory registries and reporting-entity counts, tiered pricing assumptions and an overlap adjustment. They are not third-party market research. Forecasts are constrained by sales capacity, delivery capacity, price realization and retention assumptions stated in the model. Cryptographic integrity supports the detection of changes to an evidence package; it does not establish legal admissibility and does not prove compliance.</p>'+
      '<p><b>Regulator findings.</b> Findings attributed to a regulator are drawn from the published material of that body and are quoted as targeted findings on selected files, not as a measure of the whole market. Sources are named beside each figure. Confirm against the current published text before relying on any of them.</p>'+
      '<p><b>No affiliation.</b> 4orm Finance is an independent company. It is not affiliated with, endorsed by, sponsored by, acting for or approved by FSRA, RECO, OMVIC, the Canadian Securities Administrators, CIRO, the Bank of Canada or any other body named anywhere on this site.</p>'+
      '</div><div class="foot-end"><span>\u00A9 '+yr+' 4orm Finance '+DOT+' Calgary, Alberta</span>'+
      '<span>Illustrative preview '+DOT+' build '+V+'</span></div></div>';
    return f;
  })());

  /* ---------- reveal ---------- */
  (function(){
    var items=[].slice.call(document.querySelectorAll('.rv'));
    if(!items.length)return;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){items.forEach(function(n){n.classList.add('in');});return;}
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},
        {rootMargin:'0px 0px -8% 0px',threshold:.04});
      items.forEach(function(n){io.observe(n);});
    }
    var t=false;
    function sweep(){t=false;var h=innerHeight;items.forEach(function(n){if(n.classList.contains('in'))return;
      var r=n.getBoundingClientRect(); if(r.top<h*0.94&&r.bottom>0)n.classList.add('in');});}
    addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(sweep);}},{passive:true});
    addEventListener('resize',sweep,{passive:true}); sweep();
  })();

  /* ---------- segmented controls ---------- */
  [].forEach.call(document.querySelectorAll('[data-seg]'),function(seg){
    var scope=document.querySelector('[data-panes="'+seg.getAttribute('data-seg')+'"]'); if(!scope)return;
    var btns=[].slice.call(seg.querySelectorAll('button')), panes=[].slice.call(scope.querySelectorAll('[data-pane]'));
    function pick(k){btns.forEach(function(b){b.setAttribute('aria-selected',String(b.getAttribute('data-k')===k));});
      panes.forEach(function(p){p.classList.toggle('on',p.getAttribute('data-pane')===k);});}
    btns.forEach(function(b){b.addEventListener('click',function(){pick(b.getAttribute('data-k'));});});
    if(btns[0])pick(btns[0].getAttribute('data-k'));
  });

  /* ---------- the supervision board ---------- */
  (function(){
    var root=document.querySelector('[data-board]'); if(!root)return;

    var FILES=[
      {id:'M-2291',nm:'Renewal, five year fixed',ag:'D. Whitfield',st:'warn',tag:'Gap',days:'open 12 days',
       rows:[['Needs assessment','ok','Captured'],['Options considered','ok','3 products'],['Recommendation reason','ok','On file'],
             ['Penalty disclosure','warn','Does not match'],['Borrower acknowledgement','bad','Not returned']],
       flag:{t:'The penalty explained does not match the penalty signed.',
             a:['Explained in the call','3 month interest'],b:['On the commitment','IRD, $9,240'],
             acts:['Explain','Correct','Request acknowledgement']}},
      {id:'M-2288',nm:'Purchase, first time buyer',ag:'S. Okonkwo',st:'ok',tag:'Complete',days:'closed 4 days ago',
       rows:[['Needs assessment','ok','Captured'],['Options considered','ok','4 products, 2 declined'],['Recommendation reason','ok','On file'],
             ['Material risks','ok','Disclosed and acknowledged'],['Change in employment','ok','Re-checked']],
       done:'Produced on request, with an index. Nothing to reconstruct.'},
      {id:'M-2284',nm:'Refinance, self employed',ag:'D. Whitfield',st:'bad',tag:'No suitability',days:'open 31 days',
       rows:[['Application and documents','ok','On file'],['Needs assessment','bad','Nothing recorded'],['Options considered','bad','None shown'],
             ['Recommendation reason','bad','Not recorded'],['Rate hold expiry','warn','Not acknowledged']],
       flag:{t:'Nothing on file shows why this product was selected.',
             a:['Products presented','1'],b:['Reason recorded','None'],
             acts:['Request from agent','Add reasoning','Flag to principal']}},
      {id:'M-2279',nm:'Switch, rate improvement',ag:'A. Bhattacharya',st:'ok',tag:'Complete',days:'closed 9 days ago',
       rows:[['Needs assessment','ok','Captured'],['Comparison run','ok','On file'],['Recommendation reason','ok','On file'],
             ['Penalty and break cost','ok','Acknowledged same day'],['Principal broker review','ok','Signed']],
       done:'Produced on request, with an index. Nothing to reconstruct.'},
      {id:'M-2276',nm:'Private lending, bridge',ag:'S. Okonkwo',st:'warn',tag:'Gap',days:'open 6 days',
       rows:[['Needs assessment','ok','Captured'],['Lenders approached','ok','2, terms recorded'],['Recommendation reason','ok','On file'],
             ['Fees and compensation','ok','Disclosed'],['Borrower acknowledgement','warn','Outstanding']],
       flag:{t:'The lender fee was disclosed but never acknowledged.',
             a:['Disclosed to the borrower','$4,500'],b:['Acknowledgement returned','Not yet'],
             acts:['Resend','Call the borrower','Escalate']}},
      {id:'M-2270',nm:'Purchase, new to Canada',ag:'A. Bhattacharya',st:'ok',tag:'Complete',days:'closed 16 days ago',
       rows:[['Needs assessment','ok','Interpreter present'],['Options considered','ok','3 products, 1 declined'],['Recommendation reason','ok','On file'],
             ['Material risks','ok','Acknowledged in first language'],['Principal broker review','ok','Signed']],
       done:'Produced on request, with an index. Nothing to reconstruct.'}
    ];

    var L=root.querySelector('[data-board-list]'), D=root.querySelector('[data-board-detail]'),
        C=root.querySelector('[data-board-count]'), filter='all', cur=FILES[0].id;

    function vis(){return FILES.filter(function(f){return filter==='all'?true:filter==='att'?f.st!=='ok':f.st==='ok';});}

    function renderList(){
      var rows=vis();
      L.innerHTML=rows.map(function(f){
        return '<button class="row" type="button" data-act="file" data-id="'+esc(f.id)+'" role="option" aria-selected="'+(f.id===cur)+'">'+
          '<span class="nm">'+esc(f.nm)+'</span><em class="tag '+f.st+'">'+esc(f.tag)+'</em>'+
          '<span class="mt">'+esc(f.id)+' '+DOT+' '+esc(f.ag)+' '+DOT+' '+esc(f.days)+'</span></button>';
      }).join('');
      if(C){var g=FILES.filter(function(f){return f.st!=='ok';}).length;
        C.textContent=rows.length+' of '+FILES.length+' files '+DOT+' '+g+' needing attention';}
      [].forEach.call(L.querySelectorAll('[data-act="file"]'),function(b){
        b.addEventListener('click',function(){cur=b.getAttribute('data-id'); renderList(); renderDetail();});});
    }

    function renderDetail(){
      var f=FILES.filter(function(x){return x.id===cur;})[0]||FILES[0];
      var body='<div class="rec"><div class="rec-h"><b>'+esc(f.nm)+'</b><span>'+esc(f.id)+' '+DOT+' '+esc(f.ag)+'</span></div>'+
        f.rows.map(function(r){
          return '<div class="rec-r'+(r[1]==='ok'?'':' att')+'"><span>'+esc(r[0])+'</span><em class="tag '+r[1]+'">'+esc(r[2])+'</em></div>';
        }).join('');
      if(f.flag){
        body+='<div class="rec-flag"><b>'+esc(f.flag.t)+'</b><div class="rec-cmp">'+
          '<span><i>'+esc(f.flag.a[0])+'</i>'+esc(f.flag.a[1])+'</span>'+
          '<span class="v"><i>'+esc(f.flag.b[0])+'</i>'+esc(f.flag.b[1])+'</span></div>'+
          '<div class="rec-acts">'+f.flag.acts.map(function(a){return '<span>'+esc(a)+'</span>';}).join('')+'</div></div>';
      } else {
        body+='<div class="rec-flag" style="background:rgba(14,138,95,.06)"><b>This file can be produced on request.</b>'+
          '<div class="rec-acts" style="margin-top:12px"><span>'+esc(f.done)+'</span></div></div>';
      }
      D.innerHTML=body+'</div>';
    }

    var segs=root.querySelectorAll('[data-act="filter"]');
    [].forEach.call(segs,function(b){
      b.addEventListener('click',function(){
        filter=b.getAttribute('data-k');
        [].forEach.call(segs,function(x){x.setAttribute('aria-selected',String(x===b));});
        var rows=vis();
        if(!rows.filter(function(r){return r.id===cur;}).length&&rows.length)cur=rows[0].id;
        renderList(); renderDetail();
      });
    });

    renderList(); renderDetail();
  })();
})();
