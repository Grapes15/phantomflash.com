/* agents.html "THE AGENT" stage: turntable + live ledger attributes. No dependencies. */
(function(){
  'use strict';
  var ADDR = 'rJWiym22YxSLSsRCVLZAGjPQ2eLYgRG4uL';
  var RIPPLE_EPOCH = 946684800;
  var $ = function(id){ return document.getElementById(id); };
  var STATIC_LICENSES = [{ type:'Attorney at Law', no:'0395439', holder:'Dan Irwin', issuer:'Minnesota', activated:true }];
  var licenses = STATIC_LICENSES, licOpen = false, syncSpin = function(){};

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
  var attrRows = $('pfAttrRows'), attrNote = $('pfAttrNote');

  /* ---------------- LICENSES (the backpack) ---------------- */
  var figcol = document.querySelector('.pf-figcol'), tray = $('pfTray');

  function normLicenses(arr){
    if(!Array.isArray(arr)) return null;
    return arr.filter(function(x){ return x && typeof x === 'object'; }).slice(0, 6).map(function(x){
      return { type:String(x.type || ''), no:String(x.no || ''), holder:String(x.holder || ''),
               issuer:String(x.issuer || ''), activated: x.activated === true };
    });
  }
  function licCountText(list){
    var a = list.filter(function(l){ return l.activated; }).length;
    return list.length + ' held · ' + a + ' activated';
  }
  function trayHtml(list){
    return list.map(function(l, i){
      var line2 = [l.issuer, l.no ? '#' + l.no : ''].filter(Boolean).join(' · ');
      return '<div class="pf-badge' + (l.activated ? '' : ' off') + '" style="--i:' + i + ';--ord:' + ((Math.floor((list.length - 1) / 2) - Math.floor(i / 2)) * 2 + (i % 2)) + '">' +
        '<div class="pf-b-type">' + esc(l.type) + '</div>' +
        '<div class="pf-b-line">' + esc(line2) + '</div>' +
        '<div class="pf-b-line">held by ' + esc(l.holder) + '</div>' +
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


  function row(k, vHtml){
    return '<div class="pf-row"><dt class="pf-k">' + esc(k) + '</dt><dd class="pf-v">' + vHtml + '</dd></div>';
  }
  function link(href, text, cls){
    return '<a href="' + esc(href) + '" target="_blank" rel="noopener"' + (cls ? ' class="' + cls + '"' : '') + '>' + esc(text) + '</a>';
  }
  function render(d){
    var h = '';
    h += row('Agent', esc(d.agent));
    h += row('Alias', esc(d.aka || 'Pflash'));
    var ans = esc(d.answersTo);
    if(d.dest) ans += ' ' + link('https://livenet.xrpl.org/accounts/' + encodeURIComponent(d.dest), shortAddr(d.dest), 'pf-mono');
    h += row('Answers to', ans);
    h += row('Bar', esc(d.bar));
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
      agent: String(d.agent || ''), aka: d.aka != null ? String(d.aka) : '', answersTo: String(d.answers_to || ''), dest: latest.dest,
      bar: String(d.bar || ''), rules: ver, sha: String(d.rules_sha256 || ''),
      receipts: String(receipts),
      declared: latest.date ? new Date((latest.date + RIPPLE_EPOCH) * 1000).toISOString().slice(0, 10) : '',
      hash: latest.hash,
      licenses: normLicenses(d.licenses)
    };
  }

  function loadLedger(){
    attrRows.innerHTML = '<div class="pf-row"><dd class="pf-v pf-reading">reading the ledger…</dd></div>';
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
  var fig = $('pfFigure'), spin = $('pfSpin'), drag = $('pfDrag');
  if(fig && spin && drag){
    var angle = 0, down = false, lastX = 0, hover = false, cool = null;
    var sync = function(){ spin.style.animationPlayState = (down || hover || cool || licOpen) ? 'paused' : 'running'; };
    syncSpin = sync;
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
  }

  /* ---------------- 3D MODEL SLOT ---------------- */
  var model = $('pfModel');
  if(model && fig){
    fetch('assets/pflash.glb', { method:'HEAD' }).then(function(r){
      if(r.ok){ model.setAttribute('src', 'assets/pflash.glb'); fig.classList.add('pf-has-model'); }
    }).catch(function(){});
  }
})();
