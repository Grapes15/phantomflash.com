/* agents.html "THE AGENT" stage: turntable + live ledger attributes. No dependencies. */
(function(){
  'use strict';
  var ADDR = 'rJWiym22YxSLSsRCVLZAGjPQ2eLYgRG4uL';
  var RIPPLE_EPOCH = 946684800;
  var $ = function(id){ return document.getElementById(id); };
  var STATIC_LICENSES = [
    { type:'Attorney at Law', no:'0395439', holder:'Dan Irwin', issuer:'Minnesota Supreme Court', since:'2013-10-25', activated:true },
    { type:'Federal Court Admission', no:'D. Minn.', holder:'Dan Irwin', issuer:'U.S. District Court, District of Minnesota', since:'2018-06-14', activated:true },
    { type:'Notary Public', no:'969986700034', holder:'Dan Irwin', issuer:'Minnesota Secretary of State', since:'2017-10-03', expires:'2027-01-31', activated:false }
  ];
  var CAPTAIN = {
    location: 'Rice County, Minnesota, USA',
    education: 'University of Wisconsin-Madison',
    skills: '',
    websites: [
      { text:'irwinlawmn.com', href:'https://www.irwinlawmn.com' },
      { text:'phantomflash.com', href:'https://www.phantomflash.com' }
    ],
    entanglements: [
      /* none published yet */
    ]
  };
  var licenses = STATIC_LICENSES, licOpen = false, syncSpin = function(){}, pf2d = null;

  function esc(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function hexToUtf8(h){
    try{
      if(!h || h.length % 2 || /[^0-9a-fA-F]/.test(h)) return '';
      var b = new Uint8Array(h.length / 2);
      for(var i = 0; i < b.length; i++) b[i] = parseInt(h.substr(i * 2, 2), 16);
      return new TextDecoder('utf-8').decode(b);
    }catch(e){ return ''; }
  }
  function shortAddr(a){ return a.length > 12 ? a.slice(0, 6) + '…' + a.slice(-4) : a; }

  /* ---------------- ATTRIBUTES ---------------- */
  var attrRows = $('pfAttrRows'), attrNote = $('pfAttrNote'), capRows = $('pfCaptainRows');

  /* ---------------- LICENSES (the backpack) ---------------- */
  var figcol = document.querySelector('.pf-figcol'), tray = $('pfTray');

  function normLicenses(arr){
    if(!Array.isArray(arr)) return null;
    return arr.filter(function(x){ return x && typeof x === 'object'; }).slice(0, 6).map(function(x){
      return { type:String(x.type || ''), no:String(x.no || ''), holder:String(x.holder || ''),
               issuer:String(x.issuer || ''), since:String(x.since || ''), expires:String(x.expires || ''),
               activated: x.activated === true };
    });
  }
  function licCountText(list){
    var a = list.filter(function(l){ return l.activated; }).length;
    return list.length + ' held · ' + a + ' activated';
  }
  function trayHtml(list){
    return list.map(function(l, i){
      var line2 = [l.issuer, l.no ? (/^\d+$/.test(l.no) ? '#' + l.no : l.no) : ''].filter(Boolean).join(' · ');
      var line3 = [l.since ? 'since ' + l.since : '', l.expires ? 'expires ' + l.expires : ''].filter(Boolean).join(' · ');
      return '<div class="pf-badge' + (l.activated ? '' : ' off') + '" style="--i:' + i + ';--ord:' + ((Math.floor((list.length - 1) / 2) - Math.floor(i / 2)) * 2 + (i % 2)) + '">' +
        '<div class="pf-b-type">' + esc(l.type) + '</div>' +
        '<div class="pf-b-line">' + esc(line2) + '</div>' +
        '<div class="pf-b-line">held by ' + esc(l.holder) + '</div>' +
        (line3 ? '<div class="pf-b-line">' + esc(line3) + '</div>' : '') +
        '<div class="pf-pill ' + (l.activated ? 'on' : 'off') + '">' + (l.activated ? 'ACTIVATED ON THIS AGENT' : 'HELD · NOT ACTIVATED') + '</div></div>';
    }).join('');
  }
  function licBtn(){ return attrRows && attrRows.querySelector('.pf-lic-btn'); }
  function applyOpen(){
    if(figcol) figcol.classList.toggle('pf-lic-open', licOpen);
    if(tray) tray.setAttribute('aria-hidden', licOpen ? 'false' : 'true');
    var b = licBtn(); if(b) b.setAttribute('aria-expanded', licOpen ? 'true' : 'false');
    syncSpin();
  }
  function setOpen(v){
    licOpen = !!v && licenses.length > 0;
    applyOpen();
  }


  /* hrefs from the ledger may be https/http or a relative path; anything with another scheme is dropped */
  function safeHref(h){
    h = String(h == null ? '' : h).trim();
    if(!h) return '';
    if(/^[a-z][a-z0-9+.\-]*:/i.test(h)) return /^https?:\/\//i.test(h) ? h : '';
    return h;
  }
  function normCaptain(c){
    if(!c || typeof c !== 'object' || Array.isArray(c)) return null;
    var sites = Array.isArray(c.websites) ? c.websites : [];
    var ents = Array.isArray(c.entanglements) ? c.entanglements : [];
    return {
      location: String(c.location || ''), education: String(c.education || ''), skills: String(c.skills || ''),
      websites: sites.slice(0, 6).map(function(w){
        if(typeof w === 'string') return { text:w, href:/^https?:\/\//i.test(w) ? w : 'https://' + w };
        return w && typeof w === 'object' ? { text:String(w.text || w.href || ''), href:String(w.href || '') } : null;
      }).filter(Boolean),
      entanglements: ents.slice(0, 6).filter(function(e){ return e && typeof e === 'object' && e.name; }).map(function(e){
        return { name:String(e.name), href:String(e.href || ''), of:String(e.of || ''), status:String(e.status || '') };
      })
    };
  }
  function captainHtml(c){
    var dash = '<span class="pf-dash" aria-label="blank">—</span>';
    var h = '';
    h += row('Location', c.location ? esc(c.location) : dash);
    h += row('Education', c.education ? esc(c.education) : dash);
    h += row('Special skills', c.skills ? esc(c.skills) : dash);
    var sites = c.websites.map(function(w){ var u = safeHref(w.href); return u ? link(u, w.text, 'pf-line') : ''; }).filter(Boolean);
    h += row('Captain\'s website', sites.length ? sites.join('') : dash);
    var ents = c.entanglements.map(function(e){
      var u = safeHref(e.href);
      var a = u ? '<a href="' + esc(u) + '">' + esc(e.name) + '</a>' : '<span>' + esc(e.name) + '</span>';
      var sfx = [e.of ? 'agent of ' + e.of : '', e.status].filter(Boolean).join(' · ');
      return '<div class="pf-ent">' + a + (sfx ? '<span class="pf-sfx">· ' + esc(sfx) + '</span>' : '') + '</div>';
    });
    h += row('Chosen public entanglements', (ents.length ? ents.join('') : dash) +
      '<div class="pf-sub">entanglements the captain chose; each one is checkable on its own record.</div>');
    return h;
  }

  function row(k, vHtml){
    return '<div class="pf-row"><dt class="pf-k">' + esc(k) + '</dt><dd class="pf-v">' + vHtml + '</dd></div>';
  }
  function link(href, text, cls){
    return '<a href="' + esc(href) + '" target="_blank" rel="noopener"' + (cls ? ' class="' + cls + '"' : '') + '>' + esc(text) + '</a>';
  }
  function render(d){
    var h = '';
    h += row('Agent #', '<span class="pf-amber">' + esc(d.agentNo || '1.1') + '</span>');
    h += row('Agent', esc(d.agent));
    h += row('Alias', esc(d.aka || 'Pflash'));
    var ans = esc(d.answersTo);
    if(d.dest) ans += ' ' + link('https://livenet.xrpl.org/accounts/' + encodeURIComponent(d.dest), shortAddr(d.dest), 'pf-mono');
    h += row('Answers to', ans);
    h += row('Lawyer', esc(d.answersTo || 'Dan Irwin') + ' <span class="pf-muted">· Minnesota bar no. ' + esc(d.bar) + '</span>');
    h += row('Rules', link('https://irwinlawmn.com/rules.html', d.rules));
    var fp = d.sha || '';
    var fpShort = fp.length > 10 ? fp.slice(0, 10) + '…' : fp;
    h += row('Fingerprint', '<span class="pf-mono" title="' + esc(fp) + '">' + esc(fpShort) + '</span>');
    h += row('Receipts', esc(d.receipts));
    h += row('Permissions', 'All');
    licenses = d.licenses || STATIC_LICENSES;
    h += row('Licenses', licenses.length
      ? '<button type="button" class="pf-lic-btn" aria-expanded="false" aria-controls="pfTray">' + esc(licCountText(licenses)) + '</button>'
      : 'none on record');
    if(tray){ tray.innerHTML = trayHtml(licenses); tray.className = 'pf-tray' + (licenses.length > 3 ? ' pf-two' : ''); }
    var dec = d.hash ? link('https://livenet.xrpl.org/transactions/' + encodeURIComponent(d.hash), d.declared) : esc(d.declared);
    h += row('Declared', dec);
    attrRows.innerHTML = h;
    if(capRows) capRows.innerHTML = captainHtml(d.captain || CAPTAIN);
    applyOpen();
  }

  var FALLBACK = { agent:'Phantom Flash', answersTo:'Dan Irwin', dest:'', bar:'0395439', rules:'v0.5',
                   sha:'850beb…', receipts:'0', declared:'2026-10-16', hash:'' };

  function parseLedger(res){
    var txs = (res && res.result && res.result.transactions) || [];
    var latest = null, receipts = 0;
    txs.forEach(function(t){
      var tx = t.tx || t.tx_json || t.tx_blob_json || {};
      if(!tx.Account) tx = t.tx_json || t.tx || {};
      if(tx.Account !== ADDR) return;
      var memos = tx.Memos || [];
      memos.forEach(function(m){
        var mm = (m && m.Memo) || {};
        var type = hexToUtf8(mm.MemoType);
        if(type === 'phantomflash/receipt') receipts++;
        if(type === 'phantomflash/clothes'){
          var data; try{ data = JSON.parse(hexToUtf8(mm.MemoData)); }catch(e){ return; }
          if(!data || typeof data !== 'object') return;
          var date = tx.date != null ? tx.date : (t.tx && t.tx.date != null ? t.tx.date : t.date);
          if(date == null && t.close_time_iso) date = Date.parse(t.close_time_iso) / 1000 - RIPPLE_EPOCH;
          date = Number(date) || 0;
          if(!latest || date > latest.date){
            latest = { date: date, data: data, dest: tx.Destination || '', hash: tx.hash || t.hash || (t.tx && t.tx.hash) || '' };
          }
        }
      });
    });
    if(!latest) return null;
    var d = latest.data;
    var rulesStr = String(d.rules || '');
    var ver = (rulesStr.match(/\bv(\d+(?:\.\d+)*)\b/) || [])[0] || String(d.v || rulesStr);
    return {
      agentNo: d.agent_no != null ? String(d.agent_no).slice(0, 12) : '',
      agent: String(d.agent || ''), aka: d.aka != null ? String(d.aka) : '', answersTo: String(d.answers_to || ''), dest: latest.dest,
      bar: String(d.bar || ''), rules: ver, sha: String(d.rules_sha256 || ''),
      receipts: String(receipts),
      declared: latest.date ? new Date((latest.date + RIPPLE_EPOCH) * 1000).toISOString().slice(0, 10) : '',
      hash: latest.hash,
      licenses: normLicenses(d.licenses),
      captain: normCaptain(d.captain)
    };
  }

  function loadLedger(){
    attrRows.innerHTML = '<div class="pf-row"><dd class="pf-v pf-reading">reading the ledger…</dd></div>';
    if(capRows) capRows.innerHTML = captainHtml(CAPTAIN);
    var ctl = ('AbortController' in window) ? new AbortController() : null;
    var to = setTimeout(function(){ if(ctl) ctl.abort(); }, 12000);
    fetch('https://xrplcluster.com', {
      method:'POST', headers:{'Content-Type':'application/json'}, signal: ctl ? ctl.signal : undefined,
      body: JSON.stringify({ method:'account_tx', params:[{ account: ADDR, limit: 200 }] })
    }).then(function(r){ if(!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function(j){
        clearTimeout(to);
        var d = parseLedger(j);
        if(!d) throw new Error('no clothes memo');
        render(d); attrNote.textContent = '';
      })
      .catch(function(){
        clearTimeout(to);
        render(FALLBACK);
        attrNote.textContent = 'ledger unreachable; showing last known';
      });
  }
  if(attrRows) loadLedger();

  if(attrRows){
    attrRows.addEventListener('click', function(e){
      if(e.target.closest && e.target.closest('.pf-lic-btn')) setOpen(!licOpen);
    });
  }
  document.addEventListener('click', function(e){
    if(!licOpen) return;
    var t = e.target;
    if((tray && tray.contains(t)) || (t.closest && t.closest('.pf-lic-btn'))) return;
    setOpen(false);
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && licOpen) setOpen(false);
  });

  /* ---------------- TURNTABLE ---------------- */
  /* One 2D turntable binding, used by both stages. extraPause() adds a reason to hold the spin (stage one: the
     licenses tray); onSync() lets the caller mirror the pause state elsewhere (stage one: the 3D render). */
  function bindTurntable(fig, spin, drag, extraPause, onSync){
    var angle = 0, down = false, lastX = 0, hover = false, cool = null;
    var sync = function(){
      spin.style.animationPlayState = (down || hover || cool || extraPause()) ? 'paused' : 'running';
      onSync();
    };
    var rest = function(){
      clearTimeout(cool); cool = setTimeout(function(){ cool = null; sync(); }, 3000); sync();
    };
    fig.addEventListener('pointerenter', function(e){ if(e.pointerType === 'mouse'){ hover = true; sync(); } });
    fig.addEventListener('pointerleave', function(e){ if(e.pointerType === 'mouse'){ hover = false; sync(); } });
    fig.addEventListener('pointerdown', function(e){
      if(fig.classList.contains('pf-has-model')) return;
      down = true; lastX = e.clientX; clearTimeout(cool); cool = null; sync();
      fig.classList.add('pf-grab');
      try{ fig.setPointerCapture(e.pointerId); }catch(_){}
    });
    fig.addEventListener('pointermove', function(e){
      if(!down) return;
      angle += (e.clientX - lastX) * 0.6; lastX = e.clientX;
      drag.style.transform = 'rotateY(' + angle + 'deg)';
    });
    var up = function(e){
      if(!down) return;
      down = false; fig.classList.remove('pf-grab');
      hover = false;  /* released: resume a few seconds after, even if the pointer is still over it */
      try{ fig.releasePointerCapture(e.pointerId); }catch(_){}
      rest();
    };
    fig.addEventListener('pointerup', up);
    fig.addEventListener('pointercancel', up);
    return sync;
  }
  var fig = $('pfFigure'), spin = $('pfSpin'), drag = $('pfDrag');
  if(fig && spin && drag){
    /* the 2D turnaround pauses with the backpack open; it handles its own drag pause */
    syncSpin = bindTurntable(fig, spin, drag, function(){ return licOpen; }, function(){ if(pf2d) pf2d.setPaused(licOpen); });
  }

  /* ---------------- NOIR TURNAROUND (assets/stage2d.js) ---------------- */
  /* The center of each stage is the drawn noir image, cycled through 45-degree frames over the disc. Frames that 404 are
     skipped (a set with only 000.jpg stands still). If no frame loads, stage one keeps its 2D card; Atlas shows "model coming". */
  var ALL_ANGLES = ['000', '045', '090', '135', '180', '225', '270', '315'];
  var TURN = {
    pflash: ['000'],   /* Dan 10/16: no spinning; straight on. The other seven frames stay in assets/turn/pflash/ if ever wanted. */
    atlas: ['000']   /* one frame so far, so it stands still (and no 404s in the console); add '045' ... as the frames arrive in assets/turn/atlas/ */
  };
  var FRAME_VER = '20261016-14';   /* bump whenever a frame image is replaced, so browsers refetch it */
  function frameUrls(dir){ return TURN[dir].map(function(a){ return 'assets/turn/' + dir + '/' + a + '.jpg?v=' + FRAME_VER; }); }
  /* mount a turnaround in `fig` (needs a .pf-2d host and a .pf-disc inside it): o.dir, o.ready(handle), o.fail() */
  function mount2d(o){
    var done = false;
    function go(){
      if(done) return; done = true; clearTimeout(t);
      window.PF2D.mountTurnaround(o.fig.querySelector('.pf-2d'), frameUrls(o.dir), { fig: o.fig }).then(function(h){
        o.fig.classList.add('pf-has-model', 'pf-has-2d'); o.ready(h);
      }).catch(o.fail);
    }
    var t = setTimeout(function(){ if(!done){ done = true; o.fail(); } }, 8000);
    if(window.PF2D) go(); else document.addEventListener('pf2d-ready', go, { once:true });
  }
  if(fig && fig.querySelector('.pf-2d')){
    mount2d({ fig: fig, dir: 'pflash', fail: function(){}, ready: function(h){ pf2d = h; syncSpin(); } });
  }

  /* ---------------- STAGE TWO: ATLAS (agent no. 2, static until it has a key) ---------------- */
  var atlasRows = $('atlasAttrRows'), afig = $('atlasFigure');
  if(atlasRows){
    var dash = '<span class="pf-dash" aria-label="blank">—</span>';
    atlasRows.innerHTML =
      row('Agent #', '<span class="pf-amber">2</span>') +
      row('Agent', esc('Atlas')) +
      row('Alias', dash) +
      row('Answers to', esc('Steven Atneosen')) +
      row('Lawyer', 'Steven Atneosen <span class="pf-muted">· bar no. to be posted</span>') +
      row('Rules', dash + '<div class="pf-sub">adopts a standard when its captain posts one</div>') +
      row('Fingerprint', dash) +
      row('Receipts', dash) +
      row('Permissions', dash) +
      row('Licenses', esc('none on record')) +
      row('Declared', esc('not yet'));
  }
  if(afig && afig.querySelector('.pf-2d')){
    mount2d({ fig: afig, dir: 'atlas', fail: function(){ afig.classList.add('pf-soon'); }, ready: function(){} });
  }
})();
