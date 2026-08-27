/* ============================================================================
 * Phantom Flash — THE COMMONS (client)
 *
 * The scanner builds itself. This file is the client half of that loop:
 *   READ  — ask the shared map what it already knows about this system, and
 *           render it as "charted vs uncharted worlds."
 *   WRITE — hand this scan's first-hop graph back to the shared map, so the
 *           NEXT person's universe is drawn with what this one found.
 *
 * RULES THIS FILE OBEYS
 *  - Fail-open. Every call is wrapped, every failure is silent, nothing here
 *    can delay or break a scan. If the API is down, the universe still renders
 *    exactly as it does today.
 *  - Public data only: addresses, amounts, timestamps. No email, no wallet
 *    labels the user typed, no device id, nothing personal. Ever.
 *  - Read is non-blocking: the render never waits on the network. The Commons
 *    panel appears when it appears.
 *  - No API configured (window.PF_API unset) => this file is a no-op.
 * ========================================================================= */
(function () {
  'use strict';

  var API = window.PF_API || null;          // e.g. 'https://api.phantomflash.com'
  var TIMEOUT = 4000;
  var MAX_SEND = 250;

  function log() { if (window.PF_DEBUG) console.log.apply(console, arguments); }

  function post(path, body) {
    if (!API) return Promise.reject(new Error('no api'));
    var ctl = window.AbortController ? new AbortController() : null;
    var t = setTimeout(function () { if (ctl) ctl.abort(); }, TIMEOUT);
    return fetch(API + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
      signal: ctl ? ctl.signal : undefined
    }).then(function (r) {
      clearTimeout(t);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }, function (e) { clearTimeout(t); throw e; });
  }

  /* -------------------------- the gate (write permit) --------------------- */
  // Writing to the Commons requires a scan the API already allowed. If the
  // paywall phase has wired its own gate it will have left window.PF_GATE
  // behind, and we reuse that rather than calling twice.
  function gate(chain, addr) {
    if (window.PF_GATE && window.PF_GATE.scan_id) return Promise.resolve(window.PF_GATE);
    var dev = null;
    try {
      dev = localStorage.getItem('pf_device');
      if (!dev) {
        dev = (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
            : String(Math.random()).slice(2) + String(Date.now());
        localStorage.setItem('pf_device', dev);
      }
    } catch (e) { /* private mode: no device id, gate still works */ }
    return post('/scan/check', {
      device_id: dev, wallet: addr, chain: chain,
      source: (document.referrer || 'direct').slice(0, 200)
    }).then(function (g) { window.PF_GATE = g; return g; });
  }

  /* ------------------------------ READ: enrich --------------------------- */
  function enrich(chain, subject, cps, scanId) {
    var addrs = cps.slice(0, MAX_SEND).map(function (c) { return c.addr; });
    return post('/graph/enrich', {
      chain: chain, subject: subject, addrs: addrs,
      // optional: lets the server record ONE coverage sample per real scan
      scan_id: scanId || null
    });
  }

  /* ----------------------------- WRITE: contribute ------------------------ */
  function contribute(scanId, chain, subject, data, cps) {
    return post('/graph/contribute', {
      scan_id: scanId,
      chain: chain,
      subject: subject,
      subject_tx_count: data.txCount || 0,
      subject_in: data.fundedSum || 0,
      subject_out: data.spentSum || 0,
      chain_last_tx: (function () {
        var m = 0;
        (data.txs || []).forEach(function (t) { if (t.time > m) m = t.time; });
        return m || null;
      })(),
      counterparties: cps.slice(0, MAX_SEND).map(function (c) {
        return { addr: c.addr, in: c.inSats || 0, out: c.outSats || 0,
                 tx: c.txCount || 0, last: c.lastSeen || null };
      })
    });
  }

  /* ------------------------------ the panel ------------------------------- */

  var LABEL_COPY = {
    service: ['Charted station', 'A known hub — an exchange or service, seen from hundreds of directions.'],
    source: ['Supply line', 'This address PAYS a lot of scanned wallets. Almost always an exchange, ATM, or payout wallet — not a destination for your money.'],
    consolidator: ['Collection point', 'Money arrives here from many places and leaves through very few. That is a gathering wallet.'],
    distributor: ['Dispersal point', 'Money arrives from few places and leaves to many. That is a payout wallet.'],
    hop: ['Way station', 'One in, one out. A relay, not a destination.'],
    convergence: ['Convergence', 'Funds from several DIFFERENT scanned wallets have reached this address.'],
    mixer: ['Laundry', 'A known mixing service — where trails are meant to go cold.'],
    scam: ['Flagged', 'This address is on a confirmed-fraud list.']
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function shortAddr(a) {
    return a && a.length > 16 ? a.slice(0, 8) + '…' + a.slice(-6) : String(a || '');
  }
  function nf(n) { return (+n || 0).toLocaleString('en-US'); }
  function plural(n, one, many) { return nf(n) + ' ' + (+n === 1 ? one : many); }
  // "newly charted" is only true of a FIRST sighting. Between two and four the
  // honest answer is that we will not put a number on it.
  function sightings(n) {
    if (n.seen === 'first') return 'first sighting';
    if (n.seen === 'few') return 'seen before';
    return 'seen by ' + n.seen + ' scans';
  }

  function renderPanel(res, cps) {
    var host = document.getElementById('results');
    if (!host || !res) return;

    var known = res.known || 0;
    var uncharted = res.uncharted || 0;
    var total = known + uncharted;
    var c = res.commons || {};

    // the worlds worth calling out by name
    var flagged = [];
    cps.forEach(function (cp) {
      var n = res.nodes && res.nodes[cp.addr];
      if (!n) return;
      if (n.convergence || n.risk === 'high' || n.risk === 'elevated' ||
          (n.label && n.label !== 'hop')) flagged.push({ addr: cp.addr, n: n });
    });
    flagged.sort(function (x, y) {
      var rank = { high: 3, elevated: 2, low: 1, none: 0 };
      return (y.n.convergence - x.n.convergence) || (rank[y.n.risk] - rank[x.n.risk]);
    });
    flagged = flagged.slice(0, 8);

    var rows = flagged.map(function (f) {
      var copy = LABEL_COPY[f.n.label] || [f.n.convergence ? 'Convergence' : 'Charted', ''];
      return '<tr>' +
        '<td style="font-family:ui-monospace,Menlo,monospace">' + esc(shortAddr(f.addr)) + '</td>' +
        '<td><strong>' + esc(copy[0]) + '</strong><div style="opacity:.7;font-size:.85em">' + esc(copy[1]) + '</div></td>' +
        '<td>' + esc(sightings(f.n)) + '</td>' +
        '<td>' + (f.n.risk === 'none' ? '—' : esc(f.n.risk)) + '</td>' +
        '</tr>';
    }).join('');

    var headline;
    if (total === 0) headline = 'The Commons has nothing on this system yet.';
    else if (known === 0) headline = 'You are the first to chart every world in this system.';
    else if (uncharted === 0) headline = 'Every world in this system was already on the map.';
    else headline = nf(known) + ' of these ' + nf(total) + ' worlds were already on the map. You just charted ' + nf(uncharted) + ' more.';

    var html =
      '<section id="commonsPanel" style="margin:28px 0;padding:20px;border-left:3px solid var(--cyan,#39c9d6);background:rgba(57,201,214,.06);border-radius:6px">' +
      '<h2 style="margin:0 0 6px">THE COMMONS ⚡</h2>' +
      '<p style="margin:0 0 14px;opacity:.85">' + esc(headline) + '</p>' +
      (res.shared_clusters
        ? '<p style="margin:0 0 14px"><strong>' + plural(res.shared_clusters, 'group', 'groups') +
          ' of these worlds keep appearing together in other people’s scans.</strong> ' +
          'Addresses that travel as a set are usually run by one hand.</p>'
        : '') +
      (rows
        ? '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.95em">' +
          '<thead><tr style="text-align:left;opacity:.6"><th>World</th><th>What the map says</th><th>Sightings</th><th>Risk</th></tr></thead>' +
          '<tbody>' + rows + '</tbody></table></div>'
        : '') +
      '<div style="display:flex;gap:22px;flex-wrap:wrap;margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.12);font-size:.9em;opacity:.8">' +
      '<span><strong>' + nf(c.addresses) + '</strong> addresses mapped</span>' +
      '<span><strong>' + nf(c.connections) + '</strong> connections</span>' +
      '<span><strong>' + nf(c.scans) + '</strong> scans contributed</span>' +
      '<span><strong>' + nf(c.clusters) + '</strong> cluster' + (+c.clusters === 1 ? '' : 's') + ' found</span>' +
      '</div>' +
      '<p style="margin:12px 0 0;font-size:.82em;opacity:.6">' +
      'Built from public blockchain data contributed by every scan, including yours. ' +
      'Sighting counts are shown in ranges and never below five — the map knows addresses, never people. ' +
      'No email, wallet name, or device is ever attached to anything above.</p>' +
      '</section>';

    var old = document.getElementById('commonsPanel');
    if (old) old.parentNode.removeChild(old);
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    host.appendChild(wrap.firstChild);
  }

  /* -------------------------------- the loop ------------------------------ */

  /**
   * Called once per scan, after counterparties are aggregated.
   * Read and write are independent: enrichment renders the panel, the gate
   * earns the write permit, contribution feeds the next person's scan.
   * Neither can block the universe that is already on screen.
   */
  function run(chain, subject, data, cps) {
    if (!API) return;
    try {
      // The gate comes first — it is one fast call, and both halves of the loop
      // want its scan_id (contribute requires it; enrich uses it to record one
      // coverage sample per real scan). If the gate is unreachable we still try
      // the read, because a missing panel is better than no panel.
      gate(chain, subject).then(
        function (g) { return g && g.scan_id ? g.scan_id : null; },
        function (e) { log('gate skipped', String(e)); return null; }
      ).then(function (scanId) {
        // READ — renders the Commons panel. Never blocks the universe.
        enrich(chain, subject, cps, scanId).then(function (res) {
          log('commons enrich', res);
          try { renderPanel(res, cps); } catch (e) { log('panel failed', e); }
          // let the 3D renderer decorate planets if it has registered a hook
          if (typeof window.PF_COMMONS_DECORATE === 'function') {
            try { window.PF_COMMONS_DECORATE(res); } catch (e) { log('decorate failed', e); }
          }
        }, function (e) { log('commons enrich skipped', String(e)); });

        // WRITE — feeds the next person's scan.
        if (!scanId) return;
        contribute(scanId, chain, subject, data, cps).then(
          function (r) { log('commons contribute', r); },
          function (e) { log('commons contribute skipped', String(e)); });
      });
    } catch (e) { log('commons run failed', String(e)); }
  }

  window.PF_COMMONS = { run: run, enrich: enrich, contribute: contribute, gate: gate, renderPanel: renderPanel };
})();
