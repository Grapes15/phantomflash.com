/* ============================================================
   PHANTOM FLASH — Free PFLASH scan (v4: living lore layer)
   Live BTC data: mempool.space (primary), blockchain.info (fallback)
   3D "solar system" explorer via 3d-force-graph (CDN).
   Locked outer-ring nodes are DECORATIVE ONLY — no real data
   is shipped to the client for hops beyond the first.
   v4: every counterparty planet is INHABITED — deterministic
   procedural name + creature + 2-3 sentence "planet history"
   that weaves the real tracing data into space-opera lore.
   Seeded from the wallet address hash, so the same wallet
   always gets the same planet. Canon: the largest-volume
   counterparty is always Planet Walker, home of a swift bunny.
   ============================================================ */
(function () {
  'use strict';

  var SATS = 1e8;
  var MAX_TX_TABLE = 25;
  // small screens get a lower node cap so the 3D system stays smooth on phones
  var IS_SMALL = Math.min(window.innerWidth, window.innerHeight) <= 600 ||
                 (window.matchMedia && window.matchMedia('(max-width:880px)').matches);
  var MAX_PLANETS = IS_SMALL ? 24 : 44;      // real first-hop counterparties rendered
  var LOCKED_PLANETS = IS_SMALL ? 8 : 14;    // decorative locked outer-ring nodes
  // MAX_PLANETS + LOCKED_PLANETS + sun ≈ 60-node cap desktop / ≈33 mobile

  // ---------- DOM ----------
  var $ = function (id) { return document.getElementById(id); };
  var statusText = $('statusText');
  var spinner = $('spinner');
  var statusLine = $('statusLine');

  function setStatus(msg, done) {
    statusText.textContent = msg;
    if (done) spinner.style.display = 'none';
  }
  function showError(title, body) {
    spinner.style.display = 'none';
    statusLine.style.display = 'none';
    $('errorPanel').style.display = 'block';
    $('errorTitle').textContent = title + ' ';
    $('errorBody').textContent = body;
  }
  function fmtBtc(sats) {
    var btc = sats / SATS;
    if (btc === 0) return '0 BTC';
    if (btc < 0.0001) return btc.toFixed(8) + ' BTC';
    return btc.toLocaleString('en-US', { maximumFractionDigits: 5 }) + ' BTC';
  }
  function fmtUsd(sats, price) {
    if (!price) return '';
    var usd = (sats / SATS) * price;
    return '≈ $' + usd.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }
  function shortAddr(a) {
    if (!a) return '(unknown)';
    return a.length > 16 ? a.slice(0, 8) + '…' + a.slice(-6) : a;
  }
  function fmtDate(unix) {
    if (!unix) return 'pending';
    var d = new Date(unix * 1000);
    return d.toISOString().slice(0, 10);
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  // ---------- living lore (v4) ----------
  // Everything below is DETERMINISTIC from the counterparty wallet
  // address: hash → seed → name / creature / history templates.
  // Same wallet, same planet, every time. No randomness at runtime.

  function hashStr(s) { // FNV-1a 32-bit
    var h = 0x811c9dc5;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }

  var NAME_PRE = ['Ara', 'Bel', 'Cal', 'Dra', 'Elo', 'Fenn', 'Gal', 'Hal', 'Ish',
    'Jas', 'Kor', 'Lyr', 'Mar', 'Nys', 'Ond', 'Pell', 'Quor', 'Rha', 'Sol',
    'Tess', 'Umbra', 'Vey', 'Wrenn', 'Xan', 'Ysol', 'Zeph', 'Thal', 'Ori',
    'Nim', 'Sar', 'Cass', 'Mire'];
  var NAME_SUF = ['belle', 'ra', 'rin', 'aly', 'then', 'mira', 'dris', 'vane',
    'lune', 'sia', 'quin', 'dor', 'wyn', 'este', 'ion', 'ara', 'eth', 'ova',
    'is', 'antha', 'os', 'enne'];
  var ROMAN = ['', ' II', ' III', ' IV', ' V', ' VI', ' VII', ' VIII', ' IX', ' X'];

  var CREATURES = [
    { glyph: '🦊', name: 'fox',       ruler: 'a silver fox who trades in whispers' },
    { glyph: '🦉', name: 'owl',       ruler: 'an owl court that reads every ledger by moonlight' },
    { glyph: '🦋', name: 'moth',      ruler: 'lantern moths drawn to bright money' },
    { glyph: '🐍', name: 'serpent',   ruler: 'a coiled serpent that never forgets a debt' },
    { glyph: '🗿', name: 'golem',     ruler: 'stone golems who count coin in silence' },
    { glyph: '🪼', name: 'jellyfish', ruler: 'drifting jellyfish that glow when treasure passes' },
    { glyph: '🐙', name: 'kraken',    ruler: 'a deep kraken with a tentacle in every port' },
    { glyph: '🐺', name: 'wolf',      ruler: 'a wolf pack that runs the night convoys' },
    { glyph: '🦅', name: 'raven',     ruler: 'sky ravens that watch the trade winds' },
    { glyph: '🐢', name: 'tortoise',  ruler: 'an ancient tortoise that moves treasure slowly and surely' },
    { glyph: '🦌', name: 'stag',      ruler: 'a pale stag that appears only when ships dock' },
    { glyph: '🦂', name: 'scorpion',  ruler: 'scorpion brokers with a sting in every contract' }
  ];
  // CANON: the first major hop — the largest-volume counterparty —
  // is always Planet Walker, and it is inhabited by a swift bunny.
  var WALKER = {
    glyph: '🐇', name: 'bunny',
    ruler: 'a swift bunny — the fastest courier in the system, always one hop ahead'
  };

  function planetName(a, used) {
    var h = hashStr(a);
    var base = NAME_PRE[h % NAME_PRE.length] +
               NAME_SUF[(h >>> 7) % NAME_SUF.length];
    var name = base, n = 0;
    while (used[name] && n < ROMAN.length - 1) { n++; name = base + ROMAN[n]; }
    used[name] = true;
    return name;
  }

  function planetCreature(a) {
    return CREATURES[(hashStr(a) >>> 13) % CREATURES.length];
  }

  // Map the REAL tracing data onto lore traits and build 2-3 sentences.
  // cp: {addr,inSats,outSats,txCount,total,lastSeen}; lore: this planet's
  // {name,creature}; names: all planet names in system order (by volume);
  // maxTotal: volume of planet #1; price: USD/BTC or null.
  function planetHistory(cp, lore, names, idx, maxTotal, price) {
    var rng = mulberry32(hashStr(cp.addr) ^ 0x9E3779B9);
    var routes = cp.txCount + ' trade route' + (cp.txCount === 1 ? '' : 's');
    var amt = function (sats) {
      var s = fmtBtc(sats), u = fmtUsd(sats, price);
      return u ? s + ' (' + u + ')' : s;
    };
    var ratio = maxTotal ? cp.total / maxTotal : 0;
    var isPort = cp.inSats > 0 && cp.outSats > 0;
    var tribute = cp.inSats >= cp.outSats; // they sent the sun money
    var busy = cp.txCount >= 8;
    var silent = cp.lastSeen && (Date.now() / 1000 - cp.lastSeen) > 365 * 86400;

    // neighbors to name-drop (the next planets down the volume ladder)
    var n1 = names[(idx + 1) % names.length];
    var n2 = names[(idx + 2) % names.length];
    if (names.length < 2) { n1 = null; n2 = null; }
    if (names.length < 3 || n2 === lore.name) n2 = null;
    if (n1 === lore.name) n1 = n2;

    var s1, s2, s3;

    if (idx === 0) {
      // ---- Planet Walker: first among worlds ----
      s1 = 'Planet Walker is an influential planet over the others — first among the worlds of this system, home to ' + WALKER.ruler + '.';
      var partners = n1 ? (n1 + (n2 ? ' and the ' + n2 + ' system' : '')) : null;
      s2 = (partners
        ? 'Primarily the ' + (tribute ? 'patron of your sun and a power behind ' + partners : 'funder of the ' + partners + (n2 ? '' : ' starship')) + ', it'
        : 'It') + ' directly controls commerce across ' + routes + ' worth ' + amt(cp.total) + '.';
      s3 = tribute
        ? 'Of that, ' + amt(cp.inSats) + ' was delivered straight to your sun. The bunny is fast — but the chain remembers every hop.'
        : 'Of that, ' + amt(cp.outSats) + ' sailed out from your sun to its harbors. The bunny is fast — but the chain remembers every hop.';
      return s1 + ' ' + s2 + ' ' + s3;
    }

    // ---- everyone else ----
    var influence =
      ratio >= 0.5  ? 'an influential world that bends the orbits of its neighbors' :
      ratio >= 0.15 ? 'a prosperous mid-system world' :
      ratio >= 0.03 ? 'a modest outpost on a steady trade lane' :
                      'a small world in a far orbit';
    s1 = pick(rng, [
      lore.name + ' is ' + influence + ', home to ' + lore.creature.ruler + '.',
      'Charted as ' + lore.name + ' — ' + influence + ', ruled by ' + lore.creature.ruler + '.',
      lore.name + ', ' + influence + ', belongs to ' + lore.creature.ruler + '.'
    ]);

    if (isPort) {
      s2 = pick(rng, [
        'A true port world: ' + amt(cp.inSats) + ' arrived at your sun from its docks, while ' + amt(cp.outSats) + ' sailed back out, across ' + routes + '.',
        'Ships arrive heavy and leave heavier — it sent your sun ' + amt(cp.inSats) + ' and received ' + amt(cp.outSats) + ' in return, over ' + routes + '.'
      ]);
    } else if (tribute) {
      s2 = pick(rng, [
        'It has paid ' + amt(cp.inSats) + ' in tribute to your sun across ' + routes + '.',
        'Its freighters delivered ' + amt(cp.inSats) + ' to your sun over ' + routes + '.',
        'Across ' + routes + ', ' + amt(cp.inSats) + ' in tribute has flowed from its harbors to your sun.'
      ]);
    } else {
      s2 = pick(rng, [
        'Your sun has funded its expeditions — ' + amt(cp.outSats) + ' sailed out along ' + routes + '.',
        'It is an expedition world: ' + amt(cp.outSats) + ' of your sun\u2019s treasure was sent to outfit its fleets, across ' + routes + '.',
        'Over ' + routes + ', your sun dispatched ' + amt(cp.outSats) + ' to its shipyards.'
      ]);
    }

    if (silent) {
      s3 = pick(rng, [
        'Now it is a silent world — no ship has left its harbor in over a year, but its vaults remember.',
        'The harbor lights have gone dark; a silent world for more than a year. Phantom Flash still watches.'
      ]);
    } else if (busy && isPort) {
      s3 = pick(rng, [
        'Traders call it a smuggler\u2019s haven — convoys move fast here and rarely announce themselves.',
        'Its lanes never sleep; a smuggler\u2019s haven where cargo changes flags mid-voyage.'
      ]);
    } else if (n1) {
      s3 = pick(rng, [
        'Its convoys run the same lanes as ' + n1 + (n2 ? ' and ' + n2 : '') + '.',
        'It trades in the shadow of ' + n1 + (n2 ? ', within signal range of ' + n2 : '') + '.',
        'Phantom Flash keeps one eye on its harbor lights' + (n1 ? ' — and the lane it shares with ' + n1 : '') + '.'
      ]);
    } else {
      s3 = 'Phantom Flash keeps one eye on its harbor lights.';
    }
    return s1 + ' ' + s2 + ' ' + s3;
  }

  // Build the full lore table for the rendered planets (sorted by volume).
  function buildSystemLore(planets, price) {
    var used = { 'Planet Walker': true };
    var entries = planets.map(function (cp, i) {
      if (i === 0) return { name: 'Planet Walker', creature: WALKER };
      return { name: planetName(cp.addr, used), creature: planetCreature(cp.addr) };
    });
    var names = entries.map(function (e) { return e.name; });
    var maxTotal = planets.length ? planets[0].total : 0;
    entries.forEach(function (e, i) {
      e.history = planetHistory(planets[i], e, names, i, maxTotal, price);
    });
    return entries;
  }

  // ---------- address from query ----------
  var params = new URLSearchParams(window.location.search);
  var addr = (params.get('addr') || '').trim();
  $('addrChip').textContent = addr || 'No address provided';

  if (!addr) {
    showError('No address provided.', 'Go back and paste the Bitcoin address you want to PFLASH.');
    return;
  }
  if (!/^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{20,90}$/.test(addr)) {
    showError('That doesn\u2019t look like a valid Bitcoin address.',
      'Bitcoin addresses start with 1, 3, or bc1. Double-check the address you were given \u2014 copy it exactly, character for character.');
    return;
  }

  // carry the address through to checkout
  var unlock2 = $('unlockBtn2');
  if (unlock2) unlock2.href = 'checkout.html?addr=' + encodeURIComponent(addr);

  // ---------- data fetchers ----------
  function fetchJson(url, timeoutMs) {
    return new Promise(function (resolve, reject) {
      var ctrl = new AbortController();
      var t = setTimeout(function () { ctrl.abort(); }, timeoutMs || 15000);
      fetch(url, { signal: ctrl.signal })
        .then(function (r) {
          clearTimeout(t);
          if (!r.ok) return reject(new Error('HTTP ' + r.status));
          return r.json().then(resolve, reject);
        })
        .catch(function (e) { clearTimeout(t); reject(e); });
    });
  }

  // Normalized shape:
  // { txCount, fundedSum, spentSum, txs: [{txid, time, confirmed, inSats, outSats, counterparties:[{addr,sats}], direction}] }
  function normalizeMempool(info, txs) {
    var out = {
      txCount: info.chain_stats.tx_count + info.mempool_stats.tx_count,
      fundedSum: info.chain_stats.funded_txo_sum + info.mempool_stats.funded_txo_sum,
      spentSum: info.chain_stats.spent_txo_sum + info.mempool_stats.spent_txo_sum,
      txs: []
    };
    txs.forEach(function (tx) {
      var inSats = 0, outSats = 0;
      var cps = {}; // counterparty addr -> sats
      tx.vout.forEach(function (v) {
        if (v.scriptpubkey_address === addr) inSats += v.value;
      });
      tx.vin.forEach(function (vin) {
        var pv = vin.prevout;
        if (!pv) return;
        if (pv.scriptpubkey_address === addr) outSats += pv.value;
      });
      var direction = outSats > inSats ? 'out' : 'in';
      if (direction === 'in') {
        // counterparties = senders (vin prevouts not ours)
        tx.vin.forEach(function (vin) {
          var pv = vin.prevout;
          if (pv && pv.scriptpubkey_address && pv.scriptpubkey_address !== addr) {
            cps[pv.scriptpubkey_address] = (cps[pv.scriptpubkey_address] || 0) + pv.value;
          }
        });
      } else {
        // counterparties = recipients (vouts not ours / not change)
        tx.vout.forEach(function (v) {
          if (v.scriptpubkey_address && v.scriptpubkey_address !== addr) {
            cps[v.scriptpubkey_address] = (cps[v.scriptpubkey_address] || 0) + v.value;
          }
        });
      }
      out.txs.push({
        txid: tx.txid,
        time: tx.status && tx.status.block_time,
        confirmed: !!(tx.status && tx.status.confirmed),
        inSats: inSats,
        outSats: outSats,
        direction: direction,
        counterparties: Object.keys(cps).map(function (a) { return { addr: a, sats: cps[a] }; })
      });
    });
    return out;
  }

  function normalizeBlockchainInfo(d) {
    var out = {
      txCount: d.n_tx,
      fundedSum: d.total_received,
      spentSum: d.total_sent,
      txs: []
    };
    (d.txs || []).forEach(function (tx) {
      var inSats = 0, outSats = 0;
      var cps = {};
      (tx.out || []).forEach(function (o) {
        if (o.addr === addr) inSats += o.value;
      });
      (tx.inputs || []).forEach(function (i) {
        var po = i.prev_out;
        if (po && po.addr === addr) outSats += po.value;
      });
      var direction = outSats > inSats ? 'out' : 'in';
      if (direction === 'in') {
        (tx.inputs || []).forEach(function (i) {
          var po = i.prev_out;
          if (po && po.addr && po.addr !== addr) cps[po.addr] = (cps[po.addr] || 0) + po.value;
        });
      } else {
        (tx.out || []).forEach(function (o) {
          if (o.addr && o.addr !== addr) cps[o.addr] = (cps[o.addr] || 0) + o.value;
        });
      }
      out.txs.push({
        txid: tx.hash,
        time: tx.time,
        confirmed: tx.block_height != null,
        inSats: inSats,
        outSats: outSats,
        direction: direction,
        counterparties: Object.keys(cps).map(function (a) { return { addr: a, sats: cps[a] }; })
      });
    });
    return out;
  }

  function loadData() {
    setStatus('PFLASHING THE CHAIN… pulling the live blockchain record');
    var base = 'https://mempool.space/api/address/' + encodeURIComponent(addr);
    return Promise.all([fetchJson(base), fetchJson(base + '/txs', 20000)])
      .then(function (res) { return normalizeMempool(res[0], res[1]); })
      .catch(function () {
        setStatus('Primary source busy — trying backup node…');
        return fetchJson('https://blockchain.info/rawaddr/' + encodeURIComponent(addr) + '?limit=50&cors=true', 20000)
          .then(normalizeBlockchainInfo);
      });
  }

  function loadPrice() {
    return fetchJson('https://mempool.space/api/v1/prices', 8000)
      .then(function (p) { return p.USD; })
      .catch(function () { return null; });
  }

  // ---------- counterparty aggregation ----------
  // Returns sorted array: [{addr, inSats (they sent us), outSats (we sent them), txCount, total}]
  function aggregateCounterparties(data) {
    var map = {};
    data.txs.forEach(function (t) {
      t.counterparties.forEach(function (c) {
        var e = map[c.addr] || (map[c.addr] = { addr: c.addr, inSats: 0, outSats: 0, txCount: 0 });
        if (t.direction === 'in') e.inSats += c.sats; else e.outSats += c.sats;
        e.txCount += 1;
      });
    });
    return Object.keys(map).map(function (a) {
      var e = map[a];
      e.total = e.inSats + e.outSats;
      return e;
    }).sort(function (x, y) { return y.total - x.total; });
  }

  // track each counterparty's most recent activity (for "silent world" lore)
  function stampLastSeen(data, cps) {
    var seen = {};
    data.txs.forEach(function (t) {
      if (!t.time) return;
      t.counterparties.forEach(function (c) {
        if (!seen[c.addr] || t.time > seen[c.addr]) seen[c.addr] = t.time;
      });
    });
    cps.forEach(function (e) { e.lastSeen = seen[e.addr] || 0; });
  }

  // ---------- render: stats ----------
  function renderStats(data, cps, price) {
    $('statIn').textContent = fmtBtc(data.fundedSum);
    $('statOut').textContent = fmtBtc(data.spentSum);
    $('statTx').textContent = data.txCount.toLocaleString('en-US');
    $('statInUsd').textContent = fmtUsd(data.fundedSum, price);
    $('statOutUsd').textContent = fmtUsd(data.spentSum, price);
    $('statCp').textContent = cps.length.toLocaleString('en-US') + (cps.length > MAX_PLANETS ? '+' : '');

    var times = data.txs.map(function (t) { return t.time; }).filter(Boolean);
    if (times.length) {
      var min = Math.min.apply(null, times), max = Math.max.apply(null, times);
      var range = fmtDate(min) + ' → ' + fmtDate(max);
      if (data.txs.length < data.txCount) range += ' (most recent ' + data.txs.length + ' txs)';
      $('statRange').textContent = range;
    } else {
      $('statRange').textContent = 'unconfirmed only';
    }
  }

  // ---------- render: tx table ----------
  function renderTable(data) {
    var rows = data.txs.slice(0, MAX_TX_TABLE).map(function (t) {
      var amt = t.direction === 'in' ? t.inSats : t.outSats;
      var cp = t.counterparties.length
        ? shortAddr(t.counterparties[0].addr) + (t.counterparties.length > 1 ? ' +' + (t.counterparties.length - 1) + ' more' : '')
        : '(script / non-standard)';
      return '<tr>' +
        '<td>' + fmtDate(t.time) + '</td>' +
        '<td class="dir-' + t.direction + '">' + (t.direction === 'in' ? '↓ IN' : '↑ OUT') + '</td>' +
        '<td>' + esc(fmtBtc(amt)) + '</td>' +
        '<td>' + esc(cp) + '</td>' +
        '<td>' + esc(t.txid.slice(0, 10)) + '…</td>' +
        '</tr>';
    }).join('');
    $('txBody').innerHTML = rows || '<tr><td colspan="5">No transactions found.</td></tr>';
  }

  // ---------- node info card ----------
  var nodeCard = $('nodeCard');
  $('ncClose').addEventListener('click', function () {
    nodeCard.className = 'node-card';
  });

  function showSunCard(data, price) {
    nodeCard.className = 'node-card show';
    $('ncBody').innerHTML =
      '<h4>☀ PFLASHED Wallet</h4>' +
      '<div class="nc-sub">The sun of this system</div>' +
      '<div class="nc-addr">' + esc(addr) + '</div>' +
      '<div class="nc-rows">' +
      '<div class="r"><span class="k">Total received</span><span class="val green">' + esc(fmtBtc(data.fundedSum)) + (price ? ' · ' + esc(fmtUsd(data.fundedSum, price)) : '') + '</span></div>' +
      '<div class="r"><span class="k">Total sent</span><span class="val red">' + esc(fmtBtc(data.spentSum)) + (price ? ' · ' + esc(fmtUsd(data.spentSum, price)) : '') + '</span></div>' +
      '<div class="r"><span class="k">Transactions</span><span class="val">' + data.txCount.toLocaleString('en-US') + '</span></div>' +
      '</div>' +
      '<div class="nc-lore"><div class="nc-lore-label">SYSTEM RECORD</div>' +
      '<p>Your sun — every planet in this system orbits your money. Every trade route below began or ended here, and the chain wrote it all down. Phantom Flash just reads it back.</p></div>';
  }

  function showPlanetCard(cp, price, lore) {
    nodeCard.className = 'node-card show';
    var html =
      '<h4><span class="nc-glyph">' + (lore ? lore.creature.glyph : '🪐') + '</span> ' + esc(lore ? lore.name : 'First-Hop Wallet') + '</h4>' +
      (lore ? '<div class="nc-sub">Inhabited world · first-hop wallet</div>' : '') +
      '<div class="nc-addr">' + esc(cp.addr) + '</div>' +
      '<div class="nc-rows">' +
      '<div class="r"><span class="k">Sent to scanned wallet</span><span class="val green">' + esc(fmtBtc(cp.inSats)) + (price && cp.inSats ? ' · ' + esc(fmtUsd(cp.inSats, price)) : '') + '</span></div>' +
      '<div class="r"><span class="k">Received from it</span><span class="val red">' + esc(fmtBtc(cp.outSats)) + (price && cp.outSats ? ' · ' + esc(fmtUsd(cp.outSats, price)) : '') + '</span></div>' +
      '<div class="r"><span class="k">Shared transactions</span><span class="val">' + cp.txCount + '</span></div>' +
      '</div>';
    if (lore) {
      html += '<div class="nc-lore"><div class="nc-lore-label">PLANET HISTORY</div><p>' + esc(lore.history) + '</p></div>';
    }
    $('ncBody').innerHTML = html;
  }

  function showLockedCard(label) {
    nodeCard.className = 'node-card show locked';
    $('ncBody').innerHTML =
      '<div class="lock-ico">🔒</div>' +
      '<h4>' + esc(label) + '</h4>' +
      '<div class="nc-lore" style="margin-top:0;border-top:0;padding-top:0"><div class="nc-lore-label">PLANET HISTORY — CLASSIFIED</div>' +
      '<p>A shrouded world. Phantom Flash has charted its trade routes, its rulers, and where its treasure sails. The free PFLASH stops here — the story doesn\u2019t.</p></div>' +
      '<a class="btn primary" style="width:100%;text-align:center;display:block" href="checkout.html?addr=' +
      encodeURIComponent(addr) + '">Unlock the Full Unchained Report — $2,717.17 →</a>';
  }

  // ---------- 3D solar system ----------
  function renderSystem(data, cps, price) {
    var stage = $('graph3d');
    // touch orbit/pinch-zoom: make sure browser gestures don't intercept the canvas
    stage.style.touchAction = 'none';
    var planets = cps.slice(0, MAX_PLANETS);
    if (cps.length > MAX_PLANETS) $('capNote').style.display = 'inline';

    // living lore: name + creature + history for every rendered planet
    var lore = buildSystemLore(planets, price);

    var maxTotal = planets.length ? planets[0].total : 1;
    function planetSize(sats) {
      // sqrt scale, 2..14
      return 2 + 12 * Math.sqrt(sats / maxTotal);
    }

    var nodes = [{
      id: 'sun', kind: 'sun', val: 26, color: '#00e5ff',
      labelHtml: '<b>☀ YOUR SUN — SCANNED WALLET</b><br>' + esc(shortAddr(addr)) + '<br>every planet here orbits your money · click for details'
    }];
    var links = [];

    planets.forEach(function (cp, i) {
      var isIn = cp.inSats >= cp.outSats;
      var pl = lore[i];
      nodes.push({
        id: 'p' + i, kind: 'planet', cp: cp, lore: pl,
        val: planetSize(cp.total),
        color: isIn ? '#3ddc97' : '#ff4d5e',
        labelHtml: '<b>' + pl.creature.glyph + ' ' + esc(pl.name) + '</b><br>' +
          '<span style="color:#7e93b3">' + esc(shortAddr(cp.addr)) + '</span><br>' +
          (cp.inSats ? '↓ in: ' + esc(fmtBtc(cp.inSats)) + '<br>' : '') +
          (cp.outSats ? '↑ out: ' + esc(fmtBtc(cp.outSats)) + '<br>' : '') +
          cp.txCount + ' tx · click to visit'
      });
      if (cp.inSats) {
        links.push({ source: 'p' + i, target: 'sun', color: 'rgba(61,220,151,.55)', w: cp.inSats, dir: 'in' });
      }
      if (cp.outSats) {
        links.push({ source: 'sun', target: 'p' + i, color: 'rgba(255,77,94,.55)', w: cp.outSats, dir: 'out' });
      }
    });

    // ---- locked outer ring: DECORATIVE ONLY, zero real data ----
    var lockedLabels = [
      'EXCHANGE IDENTIFIED — LOCKED',
      'RELAY WALLET — LOCKED',
      'CONSOLIDATION HUB — LOCKED',
      'CASH-OUT PATH — LOCKED',
      'DEPOSIT CLUSTER — LOCKED',
      'PEEL CHAIN — LOCKED'
    ];
    var lockedHover = '🔒 <b>A SHROUDED WORLD</b><br>charted by Phantom Flash · click to unlock its history';
    // anchor locked nodes to outbound planets (deep trace follows money out);
    // fall back to any planet, then the sun.
    var outPlanetIdx = [];
    planets.forEach(function (cp, i) { if (cp.outSats > 0) outPlanetIdx.push(i); });
    var anchorPool = outPlanetIdx.length ? outPlanetIdx
      : (planets.length ? planets.map(function (_, i) { return i; }) : null);

    var lockedCount = planets.length ? LOCKED_PLANETS : 6;
    for (var L = 0; L < lockedCount; L++) {
      var label = lockedLabels[L % lockedLabels.length];
      nodes.push({
        id: 'lock' + L, kind: 'locked', lockLabel: label,
        val: 3 + (L % 3) * 2, color: '#6b5a33',
        labelHtml: lockedHover
      });
      var anchor = anchorPool ? ('p' + anchorPool[L % anchorPool.length]) : 'sun';
      links.push({ source: anchor, target: 'lock' + L, color: 'rgba(120,100,60,.30)', w: 0, dir: 'locked' });
    }

    var graph = ForceGraph3D()(stage)
      .width(stage.clientWidth)
      .height(stage.clientHeight)
      .backgroundColor('#02050b')
      .showNavInfo(false)
      .graphData({ nodes: nodes, links: links })
      .nodeVal('val')
      .nodeColor('color')
      .nodeOpacity(0.92)
      .nodeResolution(IS_SMALL ? 12 : 16)
      .nodeLabel(function (n) {
        return '<div style="font:12px Menlo,monospace;color:#e6f1ff;background:rgba(7,13,24,.94);border:1px solid #1f3a5e;border-radius:8px;padding:8px 10px;line-height:1.55">' + n.labelHtml + '</div>';
      })
      .linkColor('color')
      .linkOpacity(0.5)
      .linkWidth(function (l) { return l.dir === 'locked' ? 0.4 : 1.2; })
      .linkDirectionalParticles(function (l) { return l.dir === 'locked' ? 0 : 2; })
      .linkDirectionalParticleSpeed(0.004)
      .linkDirectionalParticleWidth(function (l) { return l.dir === 'in' ? 1.6 : 1.9; })
      .linkDirectionalParticleColor(function (l) { return l.dir === 'in' ? '#3ddc97' : '#ff7a87'; })
      .onNodeClick(function (node) {
        // fly the camera to the node
        var dist = node.kind === 'sun' ? 160 : 70;
        var len = Math.hypot(node.x || 0.001, node.y || 0.001, node.z || 0.001);
        var ratio = 1 + dist / len;
        graph.cameraPosition(
          { x: node.x * ratio, y: node.y * ratio, z: node.z * ratio },
          node, 1200
        );
        if (node.kind === 'sun') showSunCard(data, price);
        else if (node.kind === 'planet') showPlanetCard(node.cp, price, node.lore);
        else showLockedCard(node.lockLabel);
      })
      .onBackgroundClick(function () { nodeCard.className = 'node-card'; });

    // dev/demo hook (no extra data exposed — only what's already client-side)
    window.__pflash = {
      openSun: function () { showSunCard(data, price); },
      openPlanet: function (i) {
        if (planets[i]) showPlanetCard(planets[i], price, lore[i]);
      },
      openLocked: function () { showLockedCard('RELAY WALLET — LOCKED'); },
      lore: function () {
        return lore.map(function (e) { return { name: e.name, creature: e.creature.name, history: e.history }; });
      }
    };

    // dim the locked nodes (semi-transparent material) once objects exist
    graph.nodeThreeObjectExtend(true);

    // spread the system out a bit
    graph.d3Force('charge').strength(-160);

    // initial camera: pull back to see the whole system
    setTimeout(function () {
      graph.zoomToFit(900, 60);
    }, 1200);

    // keep canvas sized to container (orientation changes, browser-chrome show/hide)
    function fitGraph() {
      graph.width(stage.clientWidth).height(stage.clientHeight);
    }
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(fitGraph).observe(stage);
    }
    window.addEventListener('resize', fitGraph);
    window.addEventListener('orientationchange', function () { setTimeout(fitGraph, 350); });
  }

  // ---------- main ----------
  Promise.all([loadData(), loadPrice()])
    .then(function (res) {
      var data = res[0], price = res[1];
      if (data.txCount === 0) {
        showError('No activity found on this address.',
          'This address exists in a valid format but has never sent or received Bitcoin. ' +
          'Double-check the address — many platforms issue a fresh address for each deposit. ' +
          'Try the address from your exchange/ATM receipt, or the wallet you sent funds FROM.');
        return;
      }
      var cps = aggregateCounterparties(data);
      stampLastSeen(data, cps);
      setStatus('PFLASHED in seconds — ' + data.txCount.toLocaleString('en-US') + ' transactions found.', true);
      $('results').style.display = 'block';
      renderStats(data, cps, price);
      renderTable(data);
      try {
        if (typeof ForceGraph3D === 'undefined') throw new Error('3D library unavailable');
        renderSystem(data, cps, price);
      } catch (e) {
        $('stage3d').innerHTML = '<div style="padding:30px;color:#7e93b3">3D explorer unavailable in this browser — see the transaction table below for the same first-hop data.</div>';
      }
    })
    .catch(function (err) {
      if (String(err).indexOf('HTTP 400') !== -1 || String(err).indexOf('HTTP 404') !== -1) {
        showError('That address isn\u2019t recognized by the Bitcoin network.',
          'Check for typos — addresses are case-sensitive after "bc1". Copy it exactly from your wallet, your receipt, or the platform that gave it to you.');
      } else {
        showError('Couldn\u2019t reach the blockchain data sources.',
          'Both our primary and backup nodes are unreachable right now. This is usually temporary — wait a minute and refresh. (' + esc(String(err && err.message || err)) + ')');
      }
    });
})();
