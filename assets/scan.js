/* ============================================================
   PHANTOM FLASH — Free PFLASH scan (v7: character-select creatures)
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
   v7: clicking a planet opens a video-game character-select
   stage — the resident creature idle-animates (inline SVG +
   CSS keyframes, transform/opacity only) on a glowing podium
   with a rotating ring, spotlight and name plate. Each planet
   also gets a deterministic "famous for" feature woven into
   its lore. Locked worlds show a silhouetted creature with
   glowing eyes — still zero real data client-side.
   v10: (1) the renderer is reusable — index.html runs it in DEMO
   mode with injected fictional data (wallet "DEMO"); (2) PAYWALL
   WITH TEETH — only N = min(8, ceil(40% of counterparties)) real
   first-hop worlds are charted. The rest render as browned locked
   placeholders interspersed INTO ring one (positions deterministic
   from the wallet hash). CRITICAL: the client render path receives
   only a COUNT for locked counterparties — no address, amount, or
   tx detail for them ever enters a node, label, card, or table row.
   ============================================================ */
(function () {
  'use strict';
  var T = function(k){ return (window.PF_I18N_T ? window.PF_I18N_T(k) : k); };

  var SATS = 1e8;
  // ---------- active coin (set per-scan in runScan; BTC by default + demo) ----------
  // The internal model counts in a coin's smallest practical unit — sats for
  // BTC, wei for ETH. COIN.divisor converts that base unit to a whole coin for
  // display; COIN.ticker is the symbol shown to the user. The field names below
  // keep the historical "sats" spelling but mean "base units of the active coin."
  var COIN = { chain: 'btc', ticker: 'BTC', divisor: 1e8 };
  // OPERATOR full-trace view: unlocks every counterparty + all transactions.
  // Activated by ?full=1 but ONLY on localhost (see runScan).
  // v11 (2026-08-21, Dan's call): the public scan is FREE FOR EVERYBODY —
  // the whole universe, every planet, every fetched transaction. No paywall.
  var FULL_MODE = false;
  var MAX_TX_TABLE = 10; // legacy cap; v11 shows all fetched txs (see renderTable)
  // small screens get a lower node cap so the 3D system stays smooth on phones
  var IS_SMALL = Math.min(window.innerWidth, window.innerHeight) <= 600 ||
                 (window.matchMedia && window.matchMedia('(max-width:880px)').matches);
  var MAX_PLANETS = IS_SMALL ? 24 : 44;      // hard render cap (v10 paywall caps real planets at 8 anyway)
  var LOCKED_PLANETS = IS_SMALL ? 8 : 14;    // decorative deep-trace outer-ring nodes
  var LOCKED_RING = IS_SMALL ? 6 : 12;       // v10: locked REAL-counterparty placeholders in ring one (count only — zero real data)

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
  function fmtBtc(units) {
    if (COIN.usd) {                          // multi-asset ETH scan — amounts are already USD
      if (!units) return '$0';
      if (units < 0.01) return '<$0.01';
      return '$' + units.toLocaleString('en-US', { maximumFractionDigits: units < 100 ? 2 : 0 });
    }
    var v = units / COIN.divisor;
    if (v === 0) return '0 ' + COIN.ticker;
    if (v < 0.0001) return v.toFixed(8) + ' ' + COIN.ticker;
    return v.toLocaleString('en-US', { maximumFractionDigits: 5 }) + ' ' + COIN.ticker;
  }
  function fmtUsd(units, price) {
    if (COIN.usd) return '';                 // already shown in dollars by fmtBtc
    if (!price) return '';
    var usd = (units / COIN.divisor) * price;
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

  // ---------- v10: render context (set by runScan / runDemo) ----------
  var curAddr = '';                          // wallet shown in cards ('DEMO' in demo mode)
  var curCheckout = 'checkout.html';         // CTA target for locked cards
  var curSunTitle = '\u2600 PFLASHED Wallet';
  var curSunSub = 'The sun of this system';

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
    { glyph: '🦊', name: 'fox',       epithet: 'THE SILVER FOX',      ruler: 'a silver fox who trades in whispers' },
    { glyph: '🦉', name: 'owl',       epithet: 'THE MOONLIT OWL',     ruler: 'an owl court that reads every ledger by moonlight' },
    { glyph: '🦋', name: 'moth',      epithet: 'THE LANTERN MOTH',    ruler: 'lantern moths drawn to bright money' },
    { glyph: '🐍', name: 'serpent',   epithet: 'THE COILED SERPENT',  ruler: 'a coiled serpent that never forgets a debt' },
    { glyph: '🗿', name: 'golem',     epithet: 'THE STONE GOLEM',     ruler: 'stone golems who count coin in silence' },
    { glyph: '🪼', name: 'jellyfish', epithet: 'THE GLOW JELLY',      ruler: 'drifting jellyfish that glow when treasure passes' },
    { glyph: '🐙', name: 'kraken',    epithet: 'THE DEEP KRAKEN',     ruler: 'a deep kraken with a tentacle in every port' },
    { glyph: '🐺', name: 'wolf',      epithet: 'THE NIGHT WOLF',      ruler: 'a wolf pack that runs the night convoys' },
    { glyph: '🦅', name: 'raven',     epithet: 'THE SKY RAVEN',       ruler: 'sky ravens that watch the trade winds' },
    { glyph: '🐢', name: 'tortoise',  epithet: 'THE ANCIENT TORTOISE', ruler: 'an ancient tortoise that moves treasure slowly and surely' },
    { glyph: '🦌', name: 'stag',      epithet: 'THE PALE STAG',       ruler: 'a pale stag that appears only when ships dock' },
    { glyph: '🦂', name: 'scorpion',  epithet: 'THE STING BROKER',    ruler: 'scorpion brokers with a sting in every contract' }
  ];
  // CANON: the first major hop — the largest-volume counterparty —
  // is always Planet Walker, and it is inhabited by a swift bunny.
  var WALKER = {
    glyph: '🐇', name: 'bunny', epithet: 'THE SWIFT BUNNY',
    ruler: 'a swift bunny — the fastest courier in the system, always one hop ahead'
  };

  // ---------- v7: famous planet features (deterministic) ----------
  var FEATURES = [
    { icon: '🌋', label: 'volcano fields',     text: 'its fire-belching volcano fields' },
    { icon: '❄️', label: 'ice rings',          text: 'the glittering ice rings that circle it' },
    { icon: '🌪️', label: 'endless storms',     text: 'the endless storms that never touch its vaults' },
    { icon: '💎', label: 'crystal canyons',    text: 'its canyons of living crystal' },
    { icon: '🌕', label: 'twin moons',         text: 'its twin moons, said to rise on payday' },
    { icon: '🌊', label: 'glowing seas',       text: 'seas that glow when treasure passes beneath' },
    { icon: '🧲', label: 'magnetic mountains', text: 'magnetic mountains that pull ships off course' },
    { icon: '🍄', label: 'mushroom forests',   text: 'its forests of lantern mushrooms' },
    { icon: '⚡', label: 'storm spires',       text: 'spires that drink lightning from the sky' },
    { icon: '🏜️', label: 'singing dunes',      text: 'dunes that sing when convoys land' },
    { icon: '🕳️', label: 'bottomless vaults',  text: 'vaults rumored to reach the planet\u2019s core' },
    { icon: '🌫️', label: 'silver mists',       text: 'the silver mists that hide its harbors' },
    { icon: '🪐', label: 'a shattered ring',   text: 'the shattered ring of an older moon' },
    { icon: '🌠', label: 'meteor showers',     text: 'its nightly meteor showers' },
    { icon: '🧊', label: 'glacier ports',      text: 'harbors carved into ancient glaciers' },
    { icon: '🌀', label: 'the great whirlpool', text: 'the great whirlpool at its southern pole' }
  ];
  function planetFeature(a) {
    return FEATURES[(hashStr(a) >>> 3) % FEATURES.length];
  }

  // ---------- v9: money bags (Walker's idea) ----------
  // Non-crypto visitors couldn't see at a glance "where the money is".
  // Each planet gets 1-5 stacked 💰 bags = its RELATIVE share of the
  // total observed first-hop volume with the scanned wallet. Bands are
  // log-spaced (~3x per band) so one whale doesn't flatten everyone
  // else. HONESTY RULE: bags are share-of-observed-traffic, NOT the
  // absolute wealth of that address.
  var BAG_ROWS = { 1: [1], 2: [2], 3: [2, 1], 4: [3, 1], 5: [3, 2] }; // bottom row first
  var BAG_WORDS = ['one', 'two', 'three', 'four', 'five'];
  function bagTier(total, grandTotal) {
    if (!grandTotal || !total) return 1;
    var share = total / grandTotal;
    if (share >= 0.30) return 5;
    if (share >= 0.10) return 4;
    if (share >= 0.03) return 3;
    if (share >= 0.01) return 2;
    return 1;
  }
  function bagEmojis(tier) { return new Array(tier + 1).join('\uD83D\uDCB0'); }
  function bagPileHtml(tier, locked) {
    if (locked) {
      // shrouded sack: greyed bag + amber "?" — zero real data behind it
      return '<div class="bag-pile bag-locked"><span class="bag-row">\uD83D\uDCB0</span><span class="bag-q">?</span></div>';
    }
    var rows = BAG_ROWS[tier] || [1];
    var html = '';
    for (var i = rows.length - 1; i >= 0; i--) { // DOM top row first
      html += '<span class="bag-row">' + bagEmojis(rows[i]) + '</span>';
    }
    return '<div class="bag-pile">' + html + '</div>';
  }
  function bagLore(tier) {
    if (tier >= 5) return 'It carries the largest share of your wallet’s first-hop volume.';
    if (tier === 4) return 'It carries a large share of your wallet’s first-hop volume.';
    if (tier === 3) return 'A moderate share of your first-hop volume ran through it.';
    if (tier === 2) return 'A small share of your first-hop volume touched it.';
    return 'Only a trickle of your first-hop volume touched it.';
  }

  // ---------- v7: animated character-select creatures ----------
  // Inline SVG, parts grouped so CSS keyframes (style.css) can run
  // transform-only idle loops. NEVER put a transform attribute on an
  // element that gets a CSS animation class — CSS would override it.
  var CREATURE_ART = (function () {
    var B  = 'fill="#0b1d29" stroke="#27c4de" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';
    var Bt = 'fill="#0b1d29" stroke="#27c4de" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"';
    var LN = 'fill="none" stroke="#27c4de" stroke-width="2.5" stroke-linecap="round"';
    var L4 = 'fill="none" stroke="#27c4de" stroke-width="4" stroke-linecap="round"';
    var EY = 'class="eye" fill="#ffd27a"';
    return {
      bunny:
        '<g class="a-bounce">' +
          '<g class="a-eartwitch"><ellipse cx="50" cy="34" rx="6" ry="17" ' + B + ' transform="rotate(-10 50 50)"/></g>' +
          '<ellipse cx="68" cy="33" rx="6" ry="17" ' + B + ' transform="rotate(8 68 49)"/>' +
          '<circle cx="83" cy="92" r="6.5" ' + Bt + '/>' +
          '<ellipse cx="60" cy="88" rx="24" ry="20" ' + B + '/>' +
          '<circle cx="59" cy="59" r="16.5" ' + B + '/>' +
          '<circle cx="53" cy="57" r="2.8" ' + EY + '/>' +
          '<circle cx="65" cy="57" r="2.8" ' + EY + '/>' +
          '<ellipse cx="59" cy="64" rx="2.6" ry="1.8" fill="#f2a950"/>' +
          '<ellipse cx="46" cy="106" rx="9" ry="4.5" ' + Bt + '/>' +
          '<ellipse cx="73" cy="106" rx="9" ry="4.5" ' + Bt + '/>' +
        '</g>' +
        '<g class="a-speed">' +
          '<path d="M8 56h15" ' + LN + '/>' +
          '<path d="M3 72h21" ' + LN + '/>' +
          '<path d="M9 88h13" ' + LN + '/>' +
        '</g>',
      fox:
        '<g class="a-pace">' +
          '<g class="a-tailswish"><path d="M82 86 Q108 84 112 60 Q100 76 80 74 Z" ' + B + '/></g>' +
          '<ellipse cx="60" cy="90" rx="26" ry="17" ' + B + '/>' +
          '<rect x="44" y="100" width="7" height="9" rx="3" ' + Bt + '/>' +
          '<rect x="70" y="100" width="7" height="9" rx="3" ' + Bt + '/>' +
          '<g class="a-headtilt">' +
            '<path d="M30 50 L25 30 L42 42 Z" ' + B + '/>' +
            '<path d="M53 48 L60 30 L42 40 Z" ' + B + '/>' +
            '<circle cx="41" cy="60" r="15" ' + B + '/>' +
            '<path d="M29 62 L14 70 L31 73 Z" ' + B + '/>' +
            '<circle cx="37" cy="58" r="2.6" ' + EY + '/>' +
            '<circle cx="48" cy="58" r="2.6" ' + EY + '/>' +
          '</g>' +
        '</g>',
      owl:
        '<g class="a-slowbob">' +
          '<ellipse cx="60" cy="82" rx="22" ry="25" ' + B + '/>' +
          '<path d="M42 70 q-6 14 2 24" ' + LN + '/>' +
          '<path d="M78 70 q6 14 -2 24" ' + LN + '/>' +
          '<ellipse cx="50" cy="108" rx="6" ry="3" ' + Bt + '/>' +
          '<ellipse cx="70" cy="108" rx="6" ry="3" ' + Bt + '/>' +
          '<g class="a-headtilt">' +
            '<circle cx="60" cy="48" r="19" ' + B + '/>' +
            '<path d="M46 34 l-3 -9 9 5 Z" ' + B + '/>' +
            '<path d="M74 34 l3 -9 -9 5 Z" ' + B + '/>' +
            '<g class="a-blink">' +
              '<circle cx="52" cy="47" r="6.5" fill="#0b1d29" stroke="#27c4de" stroke-width="2"/>' +
              '<circle cx="68" cy="47" r="6.5" fill="#0b1d29" stroke="#27c4de" stroke-width="2"/>' +
              '<circle cx="52" cy="47" r="2.6" ' + EY + '/>' +
              '<circle cx="68" cy="47" r="2.6" ' + EY + '/>' +
            '</g>' +
            '<path d="M57 54 L60 58 L63 54" ' + Bt + '/>' +
          '</g>' +
        '</g>',
      kraken:
        '<g class="a-float">' +
          '<ellipse cx="60" cy="52" rx="21" ry="23" ' + B + '/>' +
          '<circle cx="52" cy="50" r="3" ' + EY + '/>' +
          '<circle cx="68" cy="50" r="3" ' + EY + '/>' +
          '<g class="a-tdrift1"><path d="M44 72 Q38 88 26 94 Q36 92 46 82" ' + B + '/></g>' +
          '<g class="a-tdrift2"><path d="M55 76 Q53 94 44 104 Q56 98 60 84" ' + B + '/></g>' +
          '<g class="a-tdrift1"><path d="M66 76 Q68 94 76 104 Q66 98 62 84" ' + B + '/></g>' +
          '<g class="a-tdrift2"><path d="M76 72 Q82 88 94 94 Q84 92 74 82" ' + B + '/></g>' +
        '</g>',
      golem:
        '<g class="a-breathe">' +
          '<rect x="36" y="52" width="48" height="42" rx="9" ' + B + '/>' +
          '<rect x="46" y="30" width="28" height="26" rx="7" ' + B + '/>' +
          '<rect x="24" y="56" width="12" height="30" rx="6" ' + B + '/>' +
          '<rect x="84" y="56" width="12" height="30" rx="6" ' + B + '/>' +
          '<g class="a-glowpulse">' +
            '<rect x="52" y="40" width="7" height="4" rx="2" ' + EY + '/>' +
            '<rect x="63" y="40" width="7" height="4" rx="2" ' + EY + '/>' +
            '<circle cx="60" cy="72" r="5" fill="#27c4de" opacity=".8"/>' +
          '</g>' +
          '<path d="M44 64 h-6 M82 64 h-6" ' + Bt + '/>' +
        '</g>' +
        '<rect x="40" y="96" width="15" height="12" rx="4" ' + Bt + '/>' +
        '<rect x="65" y="96" width="15" height="12" rx="4" ' + Bt + '/>',
      raven:
        '<g class="a-slowbob">' +
          '<ellipse cx="60" cy="78" rx="19" ry="24" ' + B + '/>' +
          '<g class="a-wingruffle"><path d="M44 64 Q26 72 22 92 Q38 86 48 76" ' + B + '/></g>' +
          '<g class="a-wingruffle2"><path d="M76 64 Q94 72 98 92 Q82 86 72 76" ' + B + '/></g>' +
          '<path d="M52 100 Q56 112 60 116 Q64 112 68 100" ' + B + '/>' +
          '<g class="a-headtilt">' +
            '<circle cx="60" cy="44" r="14" ' + B + '/>' +
            '<path d="M72 42 L86 46 L72 50 Z" ' + B + '/>' +
            '<circle cx="56" cy="42" r="2.6" ' + EY + '/>' +
          '</g>' +
        '</g>',
      stag:
        '<g class="a-breathe">' +
          '<ellipse cx="62" cy="86" rx="26" ry="16" ' + B + '/>' +
          '<rect x="44" y="96" width="6" height="14" rx="3" ' + Bt + '/>' +
          '<rect x="58" y="98" width="6" height="12" rx="3" ' + Bt + '/>' +
          '<rect x="74" y="96" width="6" height="14" rx="3" ' + Bt + '/>' +
          '<g class="a-headraise">' +
            '<path d="M38 78 L30 56 L42 64" ' + B + '/>' +
            '<circle cx="36" cy="56" r="11" ' + B + '/>' +
            '<path d="M30 47 Q22 36 14 34 M30 47 Q30 34 26 28 M34 46 Q38 32 34 24" ' + LN + '/>' +
            '<circle cx="33" cy="54" r="2.4" ' + EY + '/>' +
          '</g>' +
        '</g>',
      wolf:
        '<g class="a-pace">' +
          '<g class="a-tailswish"><path d="M84 80 Q100 74 104 58 Q96 70 82 72 Z" ' + B + '/></g>' +
          '<ellipse cx="60" cy="88" rx="27" ry="16" ' + B + '/>' +
          '<rect x="42" y="98" width="7" height="11" rx="3" ' + Bt + '/>' +
          '<rect x="70" y="98" width="7" height="11" rx="3" ' + Bt + '/>' +
          '<g class="a-headtilt">' +
            '<path d="M32 50 L28 32 L43 42 Z" ' + B + '/>' +
            '<path d="M54 48 L60 32 L44 40 Z" ' + B + '/>' +
            '<circle cx="42" cy="60" r="15" ' + B + '/>' +
            '<path d="M30 64 L16 70 L31 73 Z" ' + B + '/>' +
            '<circle cx="38" cy="57" r="2.6" ' + EY + '/>' +
            '<circle cx="49" cy="57" r="2.6" ' + EY + '/>' +
          '</g>' +
        '</g>',
      serpent:
        '<g class="a-sway">' +
          '<path d="M30 104 Q44 110 58 102 Q72 94 64 84 Q56 76 64 68 Q74 60 66 48" fill="none" stroke="#27c4de" stroke-width="9" stroke-linecap="round"/>' +
          '<path d="M30 104 Q44 110 58 102 Q72 94 64 84 Q56 76 64 68 Q74 60 66 48" fill="none" stroke="#0b1d29" stroke-width="5" stroke-linecap="round"/>' +
          '<g class="a-headtilt">' +
            '<ellipse cx="64" cy="42" rx="11" ry="9" ' + B + '/>' +
            '<circle cx="61" cy="40" r="2.4" ' + EY + '/>' +
            '<circle cx="69" cy="40" r="2.4" ' + EY + '/>' +
            '<path class="a-flicker" d="M64 51 l0 7 m0 -2 l-3 4 m3 -4 l3 4" ' + Bt + '/>' +
          '</g>' +
        '</g>',
      moth:
        '<g class="a-float">' +
          '<g class="a-flutterL"><path d="M54 60 Q30 40 22 56 Q18 72 50 74 Z" ' + B + '/><path d="M52 76 Q32 78 30 90 Q34 100 52 84 Z" ' + B + '/></g>' +
          '<g class="a-flutterR"><path d="M66 60 Q90 40 98 56 Q102 72 70 74 Z" ' + B + '/><path d="M68 76 Q88 78 90 90 Q86 100 68 84 Z" ' + B + '/></g>' +
          '<ellipse cx="60" cy="74" rx="7" ry="20" ' + B + '/>' +
          '<circle cx="60" cy="52" r="7" ' + B + '/>' +
          '<path d="M56 46 Q52 38 46 36 M64 46 Q68 38 74 36" ' + LN + '/>' +
          '<circle cx="57" cy="51" r="2" ' + EY + '/>' +
          '<circle cx="63" cy="51" r="2" ' + EY + '/>' +
        '</g>',
      jellyfish:
        '<g class="a-float">' +
          '<path d="M38 64 Q38 36 60 36 Q82 36 82 64 Q71 70 60 70 Q49 70 38 64 Z" ' + B + '/>' +
          '<circle cx="53" cy="54" r="2.6" ' + EY + '/>' +
          '<circle cx="67" cy="54" r="2.6" ' + EY + '/>' +
          '<g class="a-tdrift1"><path d="M46 70 Q42 86 46 100" ' + LN + '/></g>' +
          '<g class="a-tdrift2"><path d="M56 72 Q54 90 58 104" ' + LN + '/></g>' +
          '<g class="a-tdrift1"><path d="M66 72 Q68 90 64 104" ' + LN + '/></g>' +
          '<g class="a-tdrift2"><path d="M74 70 Q78 86 74 100" ' + LN + '/></g>' +
        '</g>',
      tortoise:
        '<g class="a-breathe-slow">' +
          '<path d="M30 88 Q30 60 60 60 Q90 60 90 88 Z" ' + B + '/>' +
          '<path d="M44 70 v16 M60 64 v24 M76 70 v16 M36 80 h48" ' + Bt.replace('fill="#0b1d29" ', 'fill="none" ') + '/>' +
          '<g class="a-headraise"><circle cx="22" cy="78" r="9" ' + B + '/><circle cx="20" cy="76" r="2.2" ' + EY + '/></g>' +
          '<ellipse cx="42" cy="94" rx="7" ry="4" ' + Bt + '/>' +
          '<ellipse cx="76" cy="94" rx="7" ry="4" ' + Bt + '/>' +
        '</g>',
      scorpion:
        '<g class="a-pace">' +
          '<ellipse cx="56" cy="86" rx="22" ry="12" ' + B + '/>' +
          '<g class="a-stingraise"><path d="M76 82 Q94 76 96 58 Q97 48 90 44" fill="none" stroke="#27c4de" stroke-width="6" stroke-linecap="round"/><path d="M90 44 l-7 -2 m7 2 l-1 7" ' + Bt + '/></g>' +
          '<path d="M40 80 L26 70 M44 90 L28 92 M52 96 L42 106 M64 96 L70 106" ' + LN + '/>' +
          '<g class="a-headtilt">' +
            '<circle cx="36" cy="80" r="9" ' + B + '/>' +
            '<circle cx="33" cy="78" r="2.2" ' + EY + '/>' +
            '<path d="M28 74 Q20 66 14 66 M30 86 Q22 92 16 92" ' + LN + '/>' +
          '</g>' +
        '</g>'
    };
  })();

  // glyph-class → art key (every creature has bespoke art; fall back to glyph)
  function creatureSvg(creature, locked) {
    var art = CREATURE_ART[creature.name];
    if (!art) return null;
    return '<svg class="cs-svg' + (locked ? ' cs-shadow' : '') + '" viewBox="0 0 120 120" ' +
      'role="img" aria-label="' + esc(creature.epithet || creature.name) + '">' + art + '</svg>';
  }

  // Build the full character-select stage HTML for the info card.
  // creature: lore creature obj; planetNm: display name; feature: {icon,label} or null;
  // locked: shrouded mystery treatment.
  function selectStage(creature, planetNm, feature, locked) {
    var svg = creatureSvg(creature, locked);
    var inner = svg ||
      ('<div class="cs-glyph' + (locked ? ' cs-shadow' : '') + '">' + creature.glyph + '</div>');
    return '<div class="char-select' + (locked ? ' locked' : '') + '">' +
      '<div class="cs-burst"></div>' +
      '<div class="cs-spot"></div>' +
      '<div class="cs-stage">' + inner + '</div>' +
      '<div class="cs-ring"></div>' +
      '<div class="cs-podium"></div>' +
      '<div class="cs-plate">' +
        '<span class="cs-epithet">' + esc(locked ? 'UNKNOWN RESIDENT' : (creature.epithet || creature.name.toUpperCase())) + '</span>' +
        '<span class="cs-of">of</span> <span class="cs-world">' + esc(planetNm) + '</span>' +
      '</div>' +
      (feature && !locked ? '<div class="cs-feature" title="Famous for ' + esc(feature.label) + '">' + feature.icon + ' <span>famous for ' + esc(feature.label) + '</span></div>' : '') +
      '</div>';
  }

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

  // Turn the REAL first-hop data into a plain-language forensic finding:
  // direction of flow, amounts, transaction count, volume rank. No identities
  // are invented on a free scan — only what the chain actually shows, hedged
  // where the pattern is suggestive rather than certain.
  function planetHistory(cp, lore, names, idx, maxTotal, price) {
    var rng = mulberry32(hashStr(cp.addr) ^ 0x9E3779B9);
    var amt = function (sats) {
      var b = fmtBtc(sats), u = fmtUsd(sats, price);
      return u ? b + ' (' + u + ')' : b;
    };
    var tx = cp.txCount + ' transaction' + (cp.txCount === 1 ? '' : 's');
    var ratio = maxTotal ? cp.total / maxTotal : 0;
    var both = cp.inSats > 0 && cp.outSats > 0;
    var inboundOnly = cp.inSats > 0 && cp.outSats === 0;
    var silent = cp.lastSeen && (Date.now() / 1000 - cp.lastSeen) > 365 * 86400;
    var s1, s2, s3;

    if (both) {
      s1 = pick(rng, [
        'Two-way wallet: ' + amt(cp.inSats) + ' came in to your wallet and ' + amt(cp.outSats) + ' went back out, across ' + tx + '.',
        'Money moved both directions here — ' + amt(cp.inSats) + ' in, ' + amt(cp.outSats) + ' out, over ' + tx + '.'
      ]);
      s2 = pick(rng, [
        'Funds arriving and leaving like this is a pattern often seen with relay or pass-through wallets — but it can also just be ordinary back-and-forth. The chain shows the movement, not the reason.',
        'That in-and-out pattern can mean a relay or pass-through, or it can be routine two-way activity. Read it as a probability, not a verdict.'
      ]);
    } else if (inboundOnly) {
      s1 = pick(rng, [
        'Money came in to your wallet from this address — ' + amt(cp.inSats) + ' across ' + tx + '.',
        'This address sent ' + amt(cp.inSats) + ' to your wallet, over ' + tx + '.'
      ]);
      s2 = pick(rng, [
        'On the free scan this is a first-hop source; where those funds came from before that is the next step in a full trace.',
        'It is a first-hop source — a full trace follows it back another hop to see where the money originated.'
      ]);
    } else {
      s1 = pick(rng, [
        'Your wallet sent ' + amt(cp.outSats) + ' to this address, across ' + tx + '.',
        'Money went out from your wallet to here — ' + amt(cp.outSats) + ' over ' + tx + '.'
      ]);
      s2 = pick(rng, [
        'It is a first-hop destination; following it onward — to the next wallet, exchange, or service — is what the full trace does.',
        'This is a first-hop destination. A full trace follows it forward to where the money landed next.'
      ]);
    }

    var vol = ratio >= 0.5  ? 'By volume, it is the largest counterparty in this first hop.'
            : ratio >= 0.15 ? 'It is one of the larger counterparties here by volume.'
            : ratio >= 0.03 ? 'A mid-sized counterparty by volume.'
                            : 'A smaller counterparty by volume.';
    s3 = silent ? 'Nothing has moved to or from it in over a year — currently dormant.' : vol;

    return s1 + ' ' + s2 + ' ' + s3;
  }

  // Build the lore table for the rendered planets (sorted by volume).
  // Names are role labels derived from the real flow direction.
  function buildSystemLore(planets, price) {
    function roleName(cp) {
      if (cp.inSats > 0 && cp.outSats > 0) return 'Two-way wallet';
      if (cp.inSats > 0) return 'Inbound wallet';
      return 'Outbound wallet';
    }
    var entries = planets.map(function (cp, i) {
      return { name: (i === 0 ? 'Top counterparty' : roleName(cp)),
               creature: (i === 0 ? WALKER : planetCreature(cp.addr)),
               feature: planetFeature(cp.addr) };
    });
    var names = entries.map(function (e) { return e.name; });
    var maxTotal = planets.length ? planets[0].total : 0;
    entries.forEach(function (e, i) {
      e.history = planetHistory(planets[i], e, names, i, maxTotal, price);
    });
    return entries;
  }

  // ---------- address (scan page only; assigned in runScan) ----------
  var addr = '';
  var curChain = '';
  var LEDGER_SENT = false;

  // ---------- data fetchers ----------
  // Fetch with retry: data APIs throttle bursts (HTTP 429/5xx or Cloudflare
  // 524 timeouts), which used to surface as a false "No activity" scan. Retry
  // up to 3 times with backoff before giving up.
  function fetchJson(url, timeoutMs) {
    function attempt(triesLeft, delayMs) {
      return new Promise(function (resolve, reject) {
        var ctrl = new AbortController();
        var t = setTimeout(function () { ctrl.abort(); }, timeoutMs || 15000);
        fetch(url, { signal: ctrl.signal })
          .then(function (r) {
            clearTimeout(t);
            if (!r.ok) {
              var retryable = r.status === 429 || r.status >= 500;
              if (retryable && triesLeft > 0) {
                return setTimeout(function () {
                  attempt(triesLeft - 1, delayMs * 2).then(resolve, reject);
                }, delayMs);
              }
              return reject(new Error('HTTP ' + r.status));
            }
            return r.json().then(resolve, reject);
          })
          .catch(function (e) {
            clearTimeout(t);
            if (triesLeft > 0 && e && e.name !== 'AbortError') {
              return setTimeout(function () {
                attempt(triesLeft - 1, delayMs * 2).then(resolve, reject);
              }, delayMs);
            }
            reject(e);
          });
      });
    }
    return attempt(3, 700);
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
    setStatus(T('pflashingLive'));
    var base = 'https://mempool.space/api/address/' + encodeURIComponent(addr);
    return Promise.all([fetchJson(base), fetchJson(base + '/txs', 20000)])
      .then(function (res) { return normalizeMempool(res[0], res[1]); })
      .catch(function () {
        setStatus(T('busy'));
        return fetchJson('https://blockchain.info/rawaddr/' + encodeURIComponent(addr) + '?limit=50&cors=true', 20000)
          .then(normalizeBlockchainInfo);
      });
  }

  function loadPrice() {
    return fetchJson('https://mempool.space/api/v1/prices', 8000)
      .then(function (p) { return p.USD; })
      .catch(function () { return null; });
  }

  // ---------- Ethereum + stablecoins (Blockscout — keyless, CORS-open) ----------
  // An Ethereum address rarely moves just one asset — and scam money usually
  // travels as stablecoins — so we trace native ETH PLUS USDT and USDC, and
  // unify them in the only honest common unit: US dollars. Every transfer is
  // converted to USD (ETH at the live price, stablecoins at $1) so the system,
  // stats and planets compare apples to apples. The tx table still shows each
  // move in its native asset ("5,000 USDT"). To add a token, add a row here.
  var ETH_TOKENS = [
    { symbol: 'USDT', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6, usd: 1 },
    { symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6, usd: 1 }
  ];

  // Which chain does an address belong to? Returns 'btc', 'eth', or null.
  function detectChain(a) {
    if (/^0x[0-9a-fA-F]{40}$/.test(a)) return 'eth';
    if (/^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{20,90}$/.test(a)) return 'btc';
    return null;
  }

  // native amount → short human string for the tx table ("5,000 USDT", "0.42 ETH")
  function fmtToken(amount, symbol) {
    var s = amount < 1
      ? amount.toFixed(symbol === 'ETH' ? 6 : 2)
      : amount.toLocaleString('en-US', { maximumFractionDigits: amount < 1000 ? 2 : 0 });
    return s + ' ' + symbol;
  }

  // One Etherscan-style transfer row (native or token) → normalized + USD-valued.
  // Returns null for reverted txs, zero-value rows, or rows that don't touch the
  // scanned wallet — so the money map stays about money.
  function ethTransfer(tx, me, symbol, decimals, usdEach) {
    if (tx.isError === '1' || tx.txreceipt_status === '0') return null; // reverted
    var raw = Number(tx.value);
    if (!(raw > 0)) return null;
    var native = raw / Math.pow(10, decimals);
    var usd = native * usdEach;
    if (!(usd > 0)) return null;             // e.g. native ETH when no price is available
    var from = (tx.from || '').toLowerCase();
    var to = (tx.to || '').toLowerCase();
    var isIn = to === me, isOut = from === me;
    if (!isIn && !isOut) return null;
    var cps = [];
    if (isIn) { if (from && from !== me) cps.push({ addr: tx.from, sats: usd }); }
    else { if (to && to !== me) cps.push({ addr: tx.to, sats: usd }); }
    return {
      txid: tx.hash || tx.transactionHash,
      time: Number(tx.timeStamp) || 0,
      confirmed: true,
      inSats: isIn ? usd : 0,
      outSats: isOut ? usd : 0,
      direction: isIn ? 'in' : 'out',
      assetLabel: fmtToken(native, symbol),
      counterparties: cps
    };
  }

  // Merge native-ETH + token transfer lists into the shared normalized shape,
  // amounts in USD. ethUsd prices native ETH; stablecoins are valued at $1.
  function normalizeEthAll(ethRes, intRes, tokenResults, ethUsd) {
    var me = addr.toLowerCase();
    var out = { txCount: 0, fundedSum: 0, spentSum: 0, txs: [], sourceFailed: false };
    function ingest(rows, symbol, decimals, usdEach) {
      // Etherscan-style rate-limit/NOTOK responses put a STRING in result
      // ("Max rate limit reached"). That is a failed source, not an empty one.
      if (rows && !Array.isArray(rows)) { out.sourceFailed = true; rows = []; }
      (rows || []).forEach(function (tx) {
        var t = ethTransfer(tx, me, symbol, decimals, usdEach);
        if (!t) return;
        if (t.inSats) out.fundedSum += t.inSats;
        if (t.outSats) out.spentSum += t.outSats;
        out.txs.push(t);
      });
    }
    if (ethRes && ethRes._failed) out.sourceFailed = true;
    ingest(ethRes && ethRes.result, 'ETH', 18, ethUsd || 0);
    // Internal (contract-mediated) ETH transfers — smart wallets (ERC-4337) and
    // sweeper contracts move ETH ONLY here; without this list they scan empty.
    if (intRes && intRes._failed) out.sourceFailed = true;
    ingest(intRes && intRes.result, 'ETH', 18, ethUsd || 0);
    tokenResults.forEach(function (tr) {
      if (tr.d && tr.d._failed) out.sourceFailed = true;
      ingest(tr.d && tr.d.result, tr.tk.symbol, tr.tk.decimals, tr.tk.usd);
    });
    out.txs.sort(function (a, b) { return b.time - a.time; }); // newest first, across assets
    out.txCount = out.txs.length;
    return out;
  }

  function loadDataEth() {
    setStatus(T('pflashingLive'));
    var api = 'https://eth.blockscout.com/api';
    var a = encodeURIComponent(addr);
    // price first so native ETH can be valued; each token list is independently
    // guarded so a slow/timed-out asset never breaks the whole scan
    return loadPriceEth().then(function (ethUsd) {
      // stagger the requests ~400ms apart — a simultaneous burst trips the
      // API's rate limiter and used to produce a false "No activity" result
      var ethList = fetchJson(api + '?module=account&action=txlist&address=' + a +
        '&sort=desc&page=1&offset=100', 20000).catch(function () { return { result: [], _failed: true }; });
      var tokenLists = ETH_TOKENS.map(function (tk, i) {
        return new Promise(function (res) { setTimeout(res, 400 * (i + 1)); })
          .then(function () {
            return fetchJson(api + '?module=account&action=tokentx&contractaddress=' + tk.address +
              '&address=' + a + '&sort=desc&page=1&offset=100', 20000);
          })
          .then(function (d) { return { tk: tk, d: d }; })
          .catch(function () { return { tk: tk, d: { result: [], _failed: true } }; });
      });
      // internal transactions — staggered after the token lists
      var intList = new Promise(function (res) { setTimeout(res, 400 * (ETH_TOKENS.length + 1)); })
        .then(function () {
          return fetchJson(api + '?module=account&action=txlistinternal&address=' + a +
            '&sort=desc&page=1&offset=100', 20000);
        })
        .catch(function () { return { result: [], _failed: true }; });
      return Promise.all([ethList, intList].concat(tokenLists)).then(function (res) {
        return normalizeEthAll(res[0], res[1], res.slice(2), ethUsd);
      });
    });
  }

  function loadPriceEth() {
    return fetchJson('https://eth.blockscout.com/api?module=stats&action=ethprice', 8000)
      .then(function (p) { return (p && p.result) ? parseFloat(p.result.ethusd) : null; })
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

  // ---------- Scan Ledger: log each PUBLIC scan to a private Google Form ----------
  // Fire-and-forget (no-cors); never blocks or errors a scan. Skipped on
  // localhost / operator so internal traces and testing stay out of the ledger.
  function logScan(data, totalCp) {
    try {
      if (LEDGER_SENT) return;
      if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[?::1\]?)$/.test(location.hostname)) return;
      if (!addr) return;
      LEDGER_SENT = true;
      var f = new FormData();
      f.append('entry.1615371807', addr);                              // Address
      f.append('entry.1899091726', curChain || '');                    // Chain
      f.append('entry.1717732954', document.referrer || 'direct');     // Source
      f.append('entry.495642637', '');                                 // Client (public scan = none)
      f.append('entry.1191277323',                                     // Summary
        'tx=' + (data && data.txCount != null ? data.txCount : '?') +
        ' cps=' + (totalCp != null ? totalCp : '?') +
        ' in=' + (data ? fmtBtc(data.fundedSum) : '?') +
        ' out=' + (data ? fmtBtc(data.spentSum) : '?'));
      fetch('https://docs.google.com/forms/d/e/1FAIpQLSdn6zGAR02-Gsrhavb3DMy-zHV_jQtTE1d81e0-BimJloTVjw/formResponse',
            { method: 'POST', mode: 'no-cors', body: f });
    } catch (e) { /* ledger never breaks a scan */ }
  }

  // ---------- render: stats (always FULL and honest — totals are the hook) ----------
  function renderStats(data, totalCp, price) {
    $('statIn').textContent = fmtBtc(data.fundedSum);
    $('statOut').textContent = fmtBtc(data.spentSum);
    $('statTx').textContent = data.txCount.toLocaleString('en-US');
    $('statInUsd').textContent = fmtUsd(data.fundedSum, price);
    $('statOutUsd').textContent = fmtUsd(data.spentSum, price);
    $('statCp').textContent = totalCp.toLocaleString('en-US');

    var times = data.txs.map(function (t) { return t.time; }).filter(Boolean);
    if (times.length) {
      var min = Math.min.apply(null, times), max = Math.max.apply(null, times);
      var dmin = fmtDate(min), dmax = fmtDate(max);
      var range = (dmin === dmax) ? dmin : (dmin + ' → ' + dmax);
      if (data.txs.length < data.txCount) range += ' (most recent ' + data.txs.length + ' of ' + data.txCount.toLocaleString('en-US') + ')';
      $('statRange').textContent = range;
    } else {
      $('statRange').textContent = 'unconfirmed only';
    }
    logScan(data, totalCp);
  }

  // ---------- render: tx table ----------
  // v10: 10 most recent rows, then a locked teaser row for the rest.
  // Counterparty addresses are shown ONLY for unlocked counterparties;
  // a locked counterparty's address never reaches the DOM.
  function renderTable(data, unlockedSet) {
    var cap = data.txs.length; // v11: everything we fetched, free

    var shown = Math.min(data.txs.length, cap);
    var rows = data.txs.slice(0, cap).map(function (t) {
      var amt = t.direction === 'in' ? t.inSats : t.outSats;
      var cp;
      if (!t.counterparties.length) {
        cp = '(script / non-standard)';
      } else if (unlockedSet && !unlockedSet[t.counterparties[0].addr]) {
        cp = '\uD83D\uDD12 ' + T('txCpLocked');
      } else {
        cp = shortAddr(t.counterparties[0].addr) + (t.counterparties.length > 1 ? ' +' + (t.counterparties.length - 1) + ' more' : '');
      }
      return '<tr>' +
        '<td>' + fmtDate(t.time) + '</td>' +
        '<td class="dir-' + t.direction + '">' + (t.direction === 'in' ? '↓ IN' : '↑ OUT') + '</td>' +
        '<td>' + esc(t.assetLabel || fmtBtc(amt)) + '</td>' +
        '<td>' + esc(cp) + '</td>' +
        '<td>' + esc(t.txid.slice(0, 10)) + '…</td>' +
        '</tr>';
    }).join('');
    var more = data.txCount - shown;
    if (more > 0) {
      // v11: honest disclosure, nothing locked — the chain simply has more
      // history than one fetch returns.
      rows += '<tr class="tx-locked-row"><td colspan="5">+ ' +
        more.toLocaleString('en-US') + ' earlier transactions on-chain \u2014 showing the ' +
        shown.toLocaleString('en-US') + ' most recent</td></tr>';
    }
    $('txBody').innerHTML = rows || '<tr><td colspan="5">' + T('noTx') + '</td></tr>';
  }

  // ---------- node info card (exists on scan page AND inside the index demo stage) ----------
  var nodeCard = $('nodeCard');
  if (nodeCard && $('ncClose')) {
    $('ncClose').addEventListener('click', function () {
      nodeCard.className = 'node-card';
    });
  }

  function showSunCard(data, price) {
    if (!nodeCard) return;
    nodeCard.className = 'node-card show';
    $('ncBody').innerHTML =
      '<h4>' + curSunTitle + '</h4>' +
      '<div class="nc-sub">' + esc(curSunSub) + '</div>' +
      '<div class="nc-addr">' + esc(curAddr) + '</div>' +
      '<div class="nc-rows">' +
      '<div class="r"><span class="k">Total received</span><span class="val green">' + esc(fmtBtc(data.fundedSum)) + (price ? ' · ' + esc(fmtUsd(data.fundedSum, price)) : '') + '</span></div>' +
      '<div class="r"><span class="k">Total sent</span><span class="val red">' + esc(fmtBtc(data.spentSum)) + (price ? ' · ' + esc(fmtUsd(data.spentSum, price)) : '') + '</span></div>' +
      '<div class="r"><span class="k">Transactions</span><span class="val">' + data.txCount.toLocaleString('en-US') + '</span></div>' +
      '</div>' +
      '<div class="nc-lore"><div class="nc-lore-label">SYSTEM RECORD</div>' +
      '<p>Your sun — every wallet here orbits it. Every transaction below began or ended at this address, and the chain recorded all of it. Phantom Flash just reads it back.</p></div>';
  }

  function showPlanetCard(cp, price, lore) {
    if (!nodeCard) return;
    nodeCard.className = 'node-card show';
    var demo = (curAddr === 'DEMO');
    var html =
      '<h4>' + (lore ? '' : '<span class="nc-glyph">🪐</span> ') + esc(lore ? lore.name : 'First-Hop Wallet') + '</h4>' +
      (lore ? '<div class="nc-sub">' + (demo ? 'First-hop wallet · sample tracing' : 'First-hop wallet') + '</div>' : '') +
      '<div class="nc-addr">' + esc(cp.addr) + '</div>' +
      '<div class="nc-rows">' +
      '<div class="r"><span class="k">Sent to scanned wallet</span><span class="val green">' + esc(fmtBtc(cp.inSats)) + (price && cp.inSats ? ' · ' + esc(fmtUsd(cp.inSats, price)) : '') + '</span></div>' +
      '<div class="r"><span class="k">Received from it</span><span class="val red">' + esc(fmtBtc(cp.outSats)) + (price && cp.outSats ? ' · ' + esc(fmtUsd(cp.outSats, price)) : '') + '</span></div>' +
      '<div class="r"><span class="k">Shared transactions</span><span class="val">' + cp.txCount + '</span></div>' +
      (lore && lore.bags ? '<div class="r"><span class="k">' + esc(T('bagShare')) + '</span><span class="val nc-bags">' + bagEmojis(lore.bags) + '</span></div>' : '') +
      '</div>' +
      (lore && lore.bags ? '<div class="nc-bagnote">' + esc(T('bagHonesty')) + '</div>' : '');
    if (lore) {
      html += '<div class="nc-lore"><div class="nc-lore-label">WHAT THE BLOCKCHAIN SHOWS</div><p>' + esc(lore.history) + '</p></div>';
    }
    $('ncBody').innerHTML = html;
  }

  function showLockedCard(label) {
    if (!nodeCard) return;
    nodeCard.className = 'node-card show locked';
    $('ncBody').innerHTML =
      '<div class="lock-ico">🔒</div>' +
      '<h4>' + esc(label) + '</h4>' +
      '<div class="nc-rows" style="margin-bottom:12px"><div class="r"><span class="k">' + esc(T('bagShare')) + '</span>' +
      '<span class="val"><span style="filter:grayscale(1) brightness(.65)">\uD83D\uDCB0</span><span style="color:var(--amber);font-weight:800">?</span></span></div></div>' +
      '<div class="nc-lore" style="margin-top:0;border-top:0;padding-top:0"><div class="nc-lore-label">LOCKED — FULL REPORT</div>' +
      '<p>A first-hop wallet Phantom Flash has already charted. The free scan stops at the first hop — the PFLASH-IT Report follows it onward: where the money went next, and the exchange or service where it landed.</p></div>' +
      '<a class="btn primary" style="width:100%;text-align:center;display:block" href="' + esc(curCheckout) + '">' + T('payCta') + '</a>';
  }

  // ---------- 3D solar system ----------
  // v10: reusable renderer. opts:
  //   demo       — fictional injected data (index.html live demo)
  //   autoOrbit  — slow auto-rotate camera (demo)
  //   noPaywall  — skip the unlocked/locked split (demo supplies its own mix)
  //   lockedExtra— explicit ring-one locked placeholder count (demo)
  // ---- v11: no paywall. Everything unlocks for everybody. ----
  // The only cap left is MAX_PLANETS, a pure render-performance ceiling;
  // when a wallet has more counterparties than that, the top ones by
  // volume render and the capNote discloses it.
  function paywallSplit(cps) {
    var setAll = {};
    cps.forEach(function (c) { setAll[c.addr] = true; });
    var planets = cps.slice(0, MAX_PLANETS);
    var capNote = $('capNote');
    if (capNote && cps.length > MAX_PLANETS) capNote.style.display = 'inline';
    return { planets: planets, unlockedSet: setAll, lockedCpCount: 0 };
  }

  function renderSystem(data, cps, price, opts) {
    opts = opts || {};
    var stage = $('graph3d');
    // touch orbit/pinch-zoom: make sure browser gestures don't intercept the canvas
    stage.style.touchAction = 'none';

    var planets, unlockedSet, lockedCpCount;
    if (opts.noPaywall) {
      planets = cps.slice(0, MAX_PLANETS);
      lockedCpCount = opts.lockedExtra || 0;
      unlockedSet = {};
      planets.forEach(function (c) { unlockedSet[c.addr] = true; });
    } else {
      var split = opts.split || paywallSplit(cps);
      planets = split.planets;
      unlockedSet = split.unlockedSet;
      lockedCpCount = split.lockedCpCount;
    }
    var capNote = $('capNote');
    if (capNote && lockedCpCount > 0 && !opts.demo) capNote.style.display = 'inline';

    // living lore: name + creature + history for every rendered planet
    var lore = buildSystemLore(planets, price);

    // v9: money-bag tiers — share of TOTAL observed first-hop volume
    // (all counterparties, including ones beyond the render cap, so the
    // shares stay honest), then woven into each planet's history.
    var grandTotal = 0;
    cps.forEach(function (c) { grandTotal += c.total; });
    lore.forEach(function (e, i) {
      e.bags = bagTier(planets[i].total, grandTotal);
      if (opts.demo && planets[i].demoLore) {
        // sample tracing supplies real-world forensic text — no space-opera lore
        if (planets[i].demoName) e.name = planets[i].demoName;
        e.history = planets[i].demoLore;
      } else {
        e.history += ' ' + bagLore(e.bags);
      }
    });

    var maxTotal = planets.length ? planets[0].total : 1;
    function planetSize(sats) {
      // sqrt scale, 2..14
      return 2 + 12 * Math.sqrt(sats / maxTotal);
    }

    var nodes = [{
      id: 'sun', kind: 'sun', val: 26, color: '#00e5ff',
      labelHtml: opts.demo
        ? '<b>☀ THE SUN — DEMO WALLET</b><br>this is what YOUR wallet becomes · click for details'
        : '<b>☀ YOUR SUN — SCANNED WALLET</b><br>' + esc(shortAddr(curAddr)) + '<br>every planet here orbits your money · click for details'
    }];
    var links = [];
    var ringNodes = []; // ring one: real planets + locked placeholders, interspersed

    planets.forEach(function (cp, i) {
      var isIn = cp.inSats >= cp.outSats;
      var pl = lore[i];
      ringNodes.push({
        id: 'p' + i, kind: 'planet', cp: cp, lore: pl,
        val: planetSize(cp.total),
        color: isIn ? '#3ddc97' : '#ff4d5e',
        labelHtml: '<b>' + esc(pl.name) + '</b> <span style="letter-spacing:-2px">' + bagEmojis(pl.bags) + '</span><br>' +
          '<span style="color:#7e93b3">' + esc(shortAddr(cp.addr)) + '</span><br>' +
          (cp.inSats ? '↓ in: ' + esc(fmtBtc(cp.inSats)) + '<br>' : '') +
          (cp.outSats ? '↑ out: ' + esc(fmtBtc(cp.outSats)) + '<br>' : '') +
          cp.txCount + ' tx · click to visit'
      });
    });

    // ---- v10: locked REAL counterparties — interspersed into ring one ----
    // Synthetic placeholders. The ONLY real fact they carry is that a
    // counterparty exists: a count. No address, no amounts, generic size.
    // Positions/order are deterministic from the wallet hash so the same
    // wallet always renders the same system.
    var seedRng = mulberry32(hashStr(curAddr || 'pf') ^ 0x51ED5EED);
    var ringLockedN = Math.min(lockedCpCount, opts.demo ? (opts.lockedExtra || 0) : LOCKED_RING);
    var overflow = lockedCpCount - ringLockedN;
    for (var R = 0; R < ringLockedN; R++) {
      var isLast = (R === ringLockedN - 1) && overflow > 0;
      var cpNum = planets.length + R + 1;
      var lbl = isLast
        ? '+' + overflow.toLocaleString('en-US') + ' ' + T('moreCpLocked')
        : T('cpLockedLabel').replace('{n}', cpNum);
      ringNodes.push({
        id: 'rlock' + R, kind: 'ringlocked', lockLabel: lbl,
        val: 3.5 + Math.floor(seedRng() * 3),  // generic size — reveals nothing
        color: '#6b5a33',
        labelHtml: '\uD83D\uDD12 <b>' + esc(lbl) + '</b><br>' + esc(T('cpLockedHover'))
      });
    }

    // deterministic intersperse: shuffle ring one (real + locked) by wallet seed
    for (var sh = ringNodes.length - 1; sh > 0; sh--) {
      var sj = Math.floor(seedRng() * (sh + 1));
      var tmp = ringNodes[sh]; ringNodes[sh] = ringNodes[sj]; ringNodes[sj] = tmp;
    }
    ringNodes.forEach(function (n) {
      nodes.push(n);
      if (n.kind === 'planet') {
        if (n.cp.inSats) links.push({ source: n.id, target: 'sun', color: 'rgba(61,220,151,.55)', w: n.cp.inSats, dir: 'in' });
        if (n.cp.outSats) links.push({ source: 'sun', target: n.id, color: 'rgba(255,77,94,.55)', w: n.cp.outSats, dir: 'out' });
      } else {
        // locked counterparty: linked to the sun like any first-hop world
        links.push({ source: 'sun', target: n.id, color: 'rgba(120,100,60,.38)', w: 0, dir: 'locked' });
      }
    });

    // ---- locked outer ring (deep trace): DECORATIVE ONLY, zero real data ----
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

    var lockedCount = 0; // v11: free for everybody — no shrouded decorative ring
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
      .onBackgroundClick(function () { if (nodeCard) nodeCard.className = 'node-card'; });

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

    // ---- v9: money-bag overlay (Walker's idea) ----
    // Pure-DOM emoji piles projected from 3D node positions each frame.
    // No textures, no extra geometry — cheap on phones (≤58 labels,
    // updated at half-rate on small screens). The bundled 3d-force-graph
    // doesn't expose THREE, so we project world→screen by hand using the
    // camera's matrixWorldInverse + projectionMatrix.
    var bagLayer = document.createElement('div');
    bagLayer.className = 'bag-layer';
    stage.appendChild(bagLayer);
    var bagTracked = [];
    nodes.forEach(function (n) {
      if (n.kind === 'sun') return;
      var el = document.createElement('div');
      el.className = 'bag-anchor';
      el.innerHTML = n.kind === 'planet' ? bagPileHtml(n.lore.bags, false) : bagPileHtml(0, true);
      el.style.display = 'none';
      bagLayer.appendChild(el);
      n.__bagEl = el;
      n.__bagOff = 8 + (n.val || 3) * 1.1; // ride above the planet's sphere
      bagTracked.push(n);
    });
    var bagFrame = 0;
    (function tickBags() {
      requestAnimationFrame(tickBags);
      bagFrame++;
      if (IS_SMALL && (bagFrame % 2)) return; // half-rate on phones
      var cam = graph.camera && graph.camera();
      if (!cam || !cam.matrixWorldInverse || !cam.projectionMatrix) return;
      var W = stage.clientWidth, H = stage.clientHeight;
      var mi = cam.matrixWorldInverse.elements, pr = cam.projectionMatrix.elements;
      for (var bi = 0; bi < bagTracked.length; bi++) {
        var n = bagTracked[bi], el = n.__bagEl;
        var x = n.x || 0, y = n.y || 0, z = n.z || 0;
        var vx = mi[0] * x + mi[4] * y + mi[8] * z + mi[12];
        var vy = mi[1] * x + mi[5] * y + mi[9] * z + mi[13];
        var vz = mi[2] * x + mi[6] * y + mi[10] * z + mi[14];
        var cw = pr[3] * vx + pr[7] * vy + pr[11] * vz + pr[15];
        if (cw <= 0) { el.style.display = 'none'; continue; } // behind camera
        var ndx = (pr[0] * vx + pr[4] * vy + pr[8] * vz + pr[12]) / cw;
        var ndy = (pr[1] * vx + pr[5] * vy + pr[9] * vz + pr[13]) / cw;
        if (ndx < -1.05 || ndx > 1.05 || ndy < -1.05 || ndy > 1.05) { el.style.display = 'none'; continue; }
        var dist = Math.sqrt(vx * vx + vy * vy + vz * vz);
        var scale = Math.max(0.55, Math.min(1.25, 95 / dist));
        el.style.display = 'block';
        el.style.transform = 'translate(' + ((ndx + 1) / 2 * W).toFixed(1) + 'px,' +
          ((1 - ndy) / 2 * H - n.__bagOff * scale).toFixed(1) + 'px) translate(-50%,-100%) scale(' + scale.toFixed(3) + ')';
      }
    })();

    // spread the system out a bit
    graph.d3Force('charge').strength(-160);

    // initial camera: pull back to see the whole system
    setTimeout(function () {
      graph.zoomToFit(900, 60);
    }, 1200);

    // ---- v10: slow auto-orbit (demo mode) ----
    // prefers-reduced-motion → static rendered demo, no orbit.
    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (opts.autoOrbit && !reduceMotion) {
      var lastTouch = 0;
      ['pointerdown', 'wheel', 'touchstart'].forEach(function (ev) {
        stage.addEventListener(ev, function () { lastTouch = Date.now(); }, { passive: true });
      });
      setTimeout(function () {
        var pos = graph.cameraPosition();
        var orbitDist = Math.max(220, Math.hypot(pos.x, pos.y, pos.z)) || 380;
        var angle = Math.atan2(pos.x || 1, pos.z || 1);
        setInterval(function () {
          // pause while (and shortly after) the visitor drives the camera,
          // then resume from wherever they left it
          if (Date.now() - lastTouch < 8000) {
            var p = graph.cameraPosition();
            angle = Math.atan2(p.x || 1, p.z || 1);
            orbitDist = Math.max(160, Math.hypot(p.x, p.y, p.z)) || orbitDist;
            return;
          }
          angle += 0.0032;
          graph.cameraPosition({
            x: orbitDist * Math.sin(angle),
            y: orbitDist * 0.18,
            z: orbitDist * Math.cos(angle)
          });
        }, 33);
      }, 2300); // after zoomToFit settles
    }

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

  // ============================================================
  // v10 — DEMO MODE (index.html hero): a pre-populated fictional
  // example system, auto-orbiting. ALL DATA BELOW IS FICTIONAL —
  // "DEMO" wallet, invented amounts, no real addresses anywhere.
  // ============================================================
  function buildDemoData() {
    var DAY = 86400, now = Math.floor(Date.now() / 1000);
    // SAMPLE TRACING - fictional data, synthetic addresses (not real wallets).
    // Written to read the way a real Phantom Flash tracing reads: each wallet
    // gets a plain-language finding, the amounts, and - where the chain supports
    // it - a probable identity. Findings are PROBABILITIES; the flows are facts.
    // [addr, name, inSats(they->sun), outSats(sun->them), txCount, daysAgo, finding]
    var rows = [
      ['bc1qs7g4hf2n8kxr3vd0q9m5aw7czt6ljy4p2u', 'Funding source — likely your exchange', 62000000, 0, 14, 3,
        'This is where your money came IN. About $42,800 in Bitcoin reached your wallet from this address across 14 deposits — the pattern is almost certainly a withdrawal from your own regulated exchange or brokerage (Coinbase, Kraken or similar). Because exchanges keep identity records, an address like this is usually the single strongest subpoena target in a case. That identification is a probability read from the flow — but this is where your money’s trail begins, and it’s your information.'],
      ['bc1qh3m9x2kf7v0aq5d8s4n6cwltr9zj2y5g8e', 'Collection hub — “Lin” (probable)', 0, 18000000, 6, 5,
        'The single largest amount OUT of your wallet landed here — roughly $12,400. This address receives from at least 31 other wallets, in deposits ranging from a few dollars to tens of thousands. That many-into-one pattern is the signature of a collection hub: one wallet gathering many people’s funds. On-chain timing and counterparties point (probably, not certainly) to an operator we’ll call “Lin,” likely working out of a Hong Kong-based ring. This same hub also appears in another Phantom Flash tracing — on the blockchain, you may not be the only one who paid into it.'],
      ['bc1q4t8v2n7khf3m0x9s5aq6dwzr2cyl8j3g7u', 'Inbound — possible “return”', 12500000, 0, 9, 8,
        'About $8,600 came back to you from this address. Small inbound “returns” like this are often staged early in a scheme to build trust before a bigger ask — but they can also be a legitimate payout. The chain can’t tell you the motive; it can only show you the money moved this way. Treat the read as a probability.'],
      ['bc1q9d2s7hf4kx3n8v0mq5awt6czr2yl9j5g3e', 'Pass-through relay', 6200000, 3600000, 11, 2,
        'A pass-through relay: funds land here and leave again within hours, so money only rested here briefly on its way somewhere else. Relays like this are used to put distance between your wallet and the final destination. Following it to the next hop is exactly what the full trace does.'],
      ['bc1qk7h3m9x2f4v8n0s5aqd6wtzr9cyl2j8g4u', 'Secondary funding (probable)', 7400000, 0, 4, 12,
        'Roughly $5,100 flowed to you from here. The pattern is consistent with a second funding source or one of your own wallets — money you likely controlled. Probable, not proven.'],
      ['bc1q2n8v4kf7h3mx0q9s5awt6dzr2cyl8j3g7e', 'Feeder into the hub (probable)', 0, 5200000, 3, 16,
        'About $3,600 left your wallet to this address and did not come back. It sits one hop upstream of the collection hub above — a likely feeder into the same cluster. Probable connection, based on shared counterparties.'],
      ['bc1qm5x9k2h7f3v8n0d4aqs6wtzr9cyl2j8g5u', 'Low-volume inbound', 4100000, 0, 5, 21,
        'About $2,800 came in from here over 5 transactions. A low-volume counterparty; on the data so far it doesn’t connect cleanly to the main cluster. Noted, not yet linked.'],
      ['bc1qf7h3n9x2k4m8v0s5awqd6tzr2cyl9j3g7e', 'Shuffling / mixing service (probable)', 1900000, 1400000, 8, 6,
        'The busiest address in your first hop — 8 transactions, money in and right back out. High-frequency two-way flow like this is a common signature of a mixing or shuffling service used to blur the trail. It rarely stops the trace — the chain still records every hop.'],
      ['bc1q8v2n7kf4h3mx0q9d5awts6zr2cyl8j3g5u', 'Secondary payout path', 0, 2600000, 2, 30,
        'About $1,800 went out to this wallet. A small outbound leg, probably a secondary payout path branching off the main flow.'],
      ['bc1q3m9x7k2h4f8v0n5aqds6wtzr9cyl2j8g4e', 'Minor inbound', 1900000, 0, 3, 45,
        'A minor inbound counterparty (~$1,300). Nothing on-chain ties it to the main scheme yet — included so your picture is complete.'],
      ['bc1qn8v4k7f2h3mx0q9s5awtd6zr2cyl8j3g7u', 'Dormant / cold wallet', 1200000, 0, 2, 400,
        'Dormant. About $800 arrived here more than a year ago and nothing has moved since — a cold wallet holding a slice of the funds. Cold doesn’t mean gone; it means parked, and the chain will show us the moment it wakes up.'],
      ['bc1q7k3h9x2m4f8v0n5aqds6wtzr2cyl9j3g5e', 'Small outbound leg', 0, 800000, 1, 60,
        'A small outbound leg (~$550) — likely a test transfer or a fee payment. Small, but it’s part of the same trail.']
    ];
    if (!IS_SMALL) { // perf cap ~12 planets on phones; a couple more on desktop
      rows.push(['bc1q4v8n2k7f3hmx0q9s5awtd6zr2cyl8j3g7u', 'Trace-level inbound', 450000, 0, 2, 90,
        'Trace-level inbound (~$310). Small, included for completeness so the map shows everything your wallet touched.']);
      rows.push(['bc1q9x2k7h3f4m8v0n5aqds6wtzr9cyl2j8g4e', 'Trace-level outbound', 0, 300000, 1, 120,
        'Trace-level outbound (~$210). Small, included for completeness so the map shows everything your wallet touched.']);
    }
    var fundedSum = 0, spentSum = 0, txCount = 0;
    var cps = rows.map(function (r) {
      fundedSum += r[2]; spentSum += r[3]; txCount += r[4];
      return { addr: r[0], demoName: r[1], inSats: r[2], outSats: r[3], txCount: r[4],
               total: r[2] + r[3], lastSeen: now - r[5] * DAY, demoLore: r[6] };
    }).sort(function (a, b) { return b.total - a.total; });
    return {
      data: { txCount: txCount, fundedSum: fundedSum, spentSum: spentSum, txs: [] },
      cps: cps,
      price: 69000 // fixed fictional rate so demo $ figures are stable
    };
  }
  function runDemo() {
    curAddr = 'DEMO';
    curCheckout = 'checkout.html';
    curSunTitle = '\u2600 THE DEMO SUN';
    curSunSub = 'A fictional example — your wallet takes this seat';
    var demo = buildDemoData();
    try {
      if (typeof ForceGraph3D === 'undefined') throw new Error('3D library unavailable');
      renderSystem(demo.data, demo.cps, demo.price, {
        demo: true,
        noPaywall: true,
        lockedExtra: 0,   // sample is FULLY charted — nothing browned out. Locking only happens on a visitor's own scan.
        autoOrbit: true
      });
    } catch (e) {
      var st = $('demoStage');
      if (st) st.classList.add('demo-fallback');
    }
  }

  // ============================================================
  // SCAN MODE (scan.html): live data + v10 paywall-with-teeth
  // ============================================================
  // Operator full-trace furniture: banner + hide the client-only paywall
  // sections. Only ever called on localhost (see runScan).
  function enableOperatorView() {
    document.body.classList.add('pf-full');
    var sh = document.querySelector('.scan-head');
    if (sh) {
      var b = document.createElement('div');
      b.style.cssText = 'margin:14px auto 0;max-width:760px;padding:10px 14px;border:1px solid #d39a2a;border-radius:10px;background:rgba(211,154,42,.12);color:#f0c560;font:700 13px/1.45 -apple-system,system-ui,sans-serif;letter-spacing:.03em;text-align:center';
      b.textContent = '⚙ OPERATOR — FULL TRACE: every counterparty + all transactions unlocked. This is NOT the client view.';
      sh.appendChild(b);
    }
    var card = document.querySelector('.locked-card');
    var grid = card && card.closest('.grid');
    if (grid) {
      var p = grid.previousElementSibling, h = p && p.previousElementSibling;
      [grid, p, h].forEach(function (el) { if (el) el.style.display = 'none'; });
    }
    document.querySelectorAll('.cta-band').forEach(function (el) { el.style.display = 'none'; });
  }

  function runScan() {
    var params = new URLSearchParams(window.location.search);
    addr = (params.get('addr') || '').trim();
    $('addrChip').textContent = addr || T('noAddr');

    if (!addr) {
      showError(T('noAddr'), T('noAddrBody'));
      return;
    }
    var chain = detectChain(addr);
    if (!chain) {
      showError(T('invalid'),
        /^0x/i.test(addr)
          ? 'That looks like an Ethereum address but isn\u2019t valid \u2014 it should be 0x followed by 40 hexadecimal characters. Copy it exactly, character for character.'
          : 'Bitcoin addresses start with 1, 3, or bc1; Ethereum addresses start with 0x. Double-check the address you were given \u2014 copy it exactly, character for character.');
      return;
    }
    // ETH-address scans are multi-asset (ETH + USDT + USDC), so amounts are
    // unified and displayed in USD (divisor 1; values arrive already in dollars).
    if (chain === 'eth') COIN = { chain: 'eth', ticker: 'USD', divisor: 1, usd: true };
    curChain = chain; LEDGER_SENT = false;

    // OPERATOR full-trace view — ?full=1, but ONLY when served from localhost.
    // On the public site location.hostname is phantomflash.com, so this is a
    // no-op and the paywall stands.
    var OPERATOR = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[?::1\]?)$/.test(location.hostname);
    FULL_MODE = OPERATOR && params.get('full') === '1';
    if (FULL_MODE) enableOperatorView();

    curAddr = addr;
    curCheckout = 'checkout.html?addr=' + encodeURIComponent(addr);

    // carry the address through to checkout
    var unlock2 = $('unlockBtn2');
    if (unlock2) unlock2.href = curCheckout;

    Promise.all([
      chain === 'eth' ? loadDataEth() : loadData(),
      chain === 'eth' ? Promise.resolve(null) : loadPrice()
    ])
      .then(function (res) {
        var data = res[0], price = res[1];
        if (data.txCount === 0 && data.sourceFailed) {
          // A data source failed or rate-limited us and we found nothing —
          // NEVER report that as "no activity": it may be a false negative.
          showError('The blockchain data source is busy right now.',
            'Your address wasn\u2019t the problem — our data source limited the request ' +
            '(this can happen when several scans run back-to-back). ' +
            'Wait about a minute and PFLASH it again.');
          return;
        }
        if (data.txCount === 0) {
          showError(T('noActivity'),
            'This address exists in a valid format but has never sent or received ' +
            (COIN.chain === 'eth' ? 'ETH, USDT or USDC' : 'Bitcoin') + '. ' +
            'Double-check the address — many platforms issue a fresh address for each deposit. ' +
            'Try the address from your exchange/ATM receipt, or the wallet you sent funds FROM.');
          return;
        }
        var cps = aggregateCounterparties(data);
        stampLastSeen(data, cps);
        setStatus(T('pflashDonePrefix') + data.txCount.toLocaleString('en-US') + T('pflashDoneSuffix'), true);
        $('results').style.display = 'block';
        // v12: stash the finished scan so the free PDF / paper view can be built on demand
        PDF_STATE = { data: data, cps: cps, price: price, addr: addr, chain: COIN.chain, ticker: COIN.ticker };
        initSplitChooser(); // v13.3: land on BOTH views side by side; tabs appear after first pick
        // v10: one split decides what the system AND the table may reveal
        var split = paywallSplit(cps);
        renderStats(data, cps.length, price); // stats stay fully honest — totals are the hook
        renderTable(data, split.unlockedSet);
        try {
          if (typeof ForceGraph3D === 'undefined') throw new Error('3D library unavailable');
          renderSystem(data, cps, price, { split: split });
        } catch (e) {
          $('stage3d').innerHTML = '<div style="padding:30px;color:#7e93b3">' + T('unavail') + '</div>';
        }
      })
      .catch(function (err) {
        if (String(err).indexOf('HTTP 400') !== -1 || String(err).indexOf('HTTP 404') !== -1) {
          showError('That address isn\u2019t recognized on the ' + (COIN.chain === 'eth' ? 'Ethereum' : 'Bitcoin') + ' network.',
            (COIN.chain === 'eth'
              ? 'Check for typos — copy it exactly from your wallet, your receipt, or the platform that gave it to you.'
              : 'Check for typos — addresses are case-sensitive after "bc1". Copy it exactly from your wallet, your receipt, or the platform that gave it to you.'));
        } else {
          showError('Couldn\u2019t reach the blockchain data sources.',
            'Both our primary and backup nodes are unreachable right now. This is usually temporary — wait a minute and refresh. (' + esc(String(err && err.message || err)) + ')');
        }
      });
  }

  // ============================================================
  // v12: FREE PDF REPORT — built entirely client-side from the
  // scan data already in memory. jsPDF loads lazily on first click;
  // if the CDN is unreachable we fall back to window.print().
  // ============================================================
  var PDF_STATE = null;
  var PDF_LIBS_LOADED = false;

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src; s.onload = resolve; s.onerror = function () { reject(new Error('load failed: ' + src)); };
      document.head.appendChild(s);
    });
  }

  function loadPdfLibs() {
    if (PDF_LIBS_LOADED) return Promise.resolve();
    return loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
      .then(function () { return loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'); })
      .then(function () { PDF_LIBS_LOADED = true; });
  }

  // jsPDF's built-in fonts are WinAnsi-only — map the unicode we use to safe glyphs
  function pdfSafe(s) {
    return String(s)
      .replace(/\u2248/g, '~').replace(/\u2192/g, '->').replace(/\u26a1/g, '')
      .replace(/\u00b7/g, '\u00b7');
  }
  // v12.3: the ghost — grayscale desk-panel watermark for every data page.
  // Loaded once from our own assets, grayed via canvas; if anything fails,
  // the report simply ships without the ghost.
  var WM_CACHE;
  function loadWatermark() {
    if (WM_CACHE !== undefined) return Promise.resolve(WM_CACHE);
    return new Promise(function (resolve) {
      try {
        var img = new Image();
        img.onload = function () {
          try {
            var c = document.createElement('canvas');
            c.width = img.naturalWidth; c.height = img.naturalHeight;
            var x = c.getContext('2d');
            x.filter = 'grayscale(1)';
            x.drawImage(img, 0, 0);
            WM_CACHE = { data: c.toDataURL('image/jpeg', 0.55), w: c.width, h: c.height };
            resolve(WM_CACHE);
          } catch (e) { WM_CACHE = null; resolve(null); }
        };
        img.onerror = function () { WM_CACHE = null; resolve(null); };
        img.src = 'assets/hero-desk-panel.jpg';
      } catch (e) { WM_CACHE = null; resolve(null); }
    });
  }

  var PDF_EPIGRAPH = '\u201cPflashing aligns shapes electromagnetically.\u201d';
  var PDF_CLOSER = 'This is a free Pflash tracing. We think it\u2019s good. But you get what you pay for.';

  function buildPdf(wm) {
    var st = PDF_STATE;
    var doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'letter' });
    var W = doc.internal.pageSize.getWidth();
    var H0 = doc.internal.pageSize.getHeight();
    var navy = [6, 19, 27], ink = [28, 39, 51], muted = [107, 118, 131];
    // v13.2: the PDF IS the web paper — cream stock, typewriter body
    var cream = [236, 225, 200], creamDark = [222, 209, 182], creamLine = [185, 172, 143];
    var now = new Date();
    var priceOk = st.price && st.chain !== 'eth';

    // cream stock on every page (page 1 by hand; table pages via willDrawPage)
    var painted = {};
    function paintPage() {
      var n = doc.internal.getCurrentPageInfo().pageNumber;
      if (painted[n]) return;
      painted[n] = true;
      doc.setFillColor(cream[0], cream[1], cream[2]);
      doc.rect(0, 0, W, H0, 'F');
    }
    paintPage();

    // masthead — display-weight heading over the double rule, like the paper
    doc.setTextColor(ink[0], ink[1], ink[2]);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(27);
    doc.text('PHANTOM FLASH', 40, 52);
    doc.setDrawColor(ink[0], ink[1], ink[2]);
    doc.setLineWidth(1.6); doc.line(40, 62, W - 40, 62);
    doc.setLineWidth(0.5); doc.line(40, 66, W - 40, 66);
    doc.setFont('courier', 'bold'); doc.setFontSize(11);
    doc.text('WALLET PFLASH REPORT \u2014 FREE EDITION', 40, 84);
    doc.setFont('courier', 'normal'); doc.setFontSize(8);
    doc.setTextColor(muted[0], muted[1], muted[2]);
    doc.text('Generated ' + now.toLocaleString('en-US') + '  \u00b7  phantomflash.com  \u00b7  live public blockchain data', 40, 98);

    // the transmission — right up at the top
    doc.setFont('courier', 'italic'); doc.setFontSize(9.5);
    doc.text(PDF_EPIGRAPH, W / 2, 122, { align: 'center' });

    doc.setTextColor(ink[0], ink[1], ink[2]);
    doc.setFont('courier', 'bold'); doc.setFontSize(11);
    doc.text('Scanned wallet (' + (st.chain === 'eth' ? 'Ethereum' : 'Bitcoin') + '):', 40, 146);
    doc.setFont('courier', 'normal'); doc.setFontSize(10);
    doc.text(st.addr, 40, 162, { maxWidth: W - 80 });

    // summary table
    var d = st.data;
    var times = d.txs.map(function (t) { return t.time; }).filter(Boolean);
    var range = '\u2014';
    if (times.length) {
      var mn = Math.min.apply(null, times), mx = Math.max.apply(null, times);
      range = fmtDate(mn) + (fmtDate(mn) === fmtDate(mx) ? '' : '  ->  ' + fmtDate(mx));
      if (d.txs.length < d.txCount) range += '   (most recent ' + d.txs.length + ' of ' + d.txCount.toLocaleString('en-US') + ')';
    }
    var tableTheme = {
      theme: 'grid',
      headStyles: { fillColor: creamDark, textColor: ink, fontStyle: 'bold', font: 'courier', lineColor: creamLine, lineWidth: 0.5 },
      styles: { font: 'courier', textColor: ink, lineColor: creamLine, lineWidth: 0.5, fillColor: cream },
      alternateRowStyles: { fillColor: [229, 218, 192] },
      margin: { left: 40, right: 40 },
      willDrawPage: paintPage
    };
    function themed(o) { var t = {}; var k; for (k in tableTheme) t[k] = tableTheme[k]; for (k in o) { if (k === 'headStyles' || k === 'styles') { var m = {}; var j; for (j in tableTheme[k]) m[j] = tableTheme[k][j]; for (j in o[k]) m[j] = o[k][j]; t[k] = m; } else t[k] = o[k]; } return t; }

    doc.autoTable(themed({
      startY: 180,
      head: [['SUMMARY', '']],
      body: [
        ['Total received', pdfSafe(fmtBtc(d.fundedSum) + (priceOk ? '   (' + fmtUsd(d.fundedSum, st.price) + ')' : ''))],
        ['Total sent out', pdfSafe(fmtBtc(d.spentSum) + (priceOk ? '   (' + fmtUsd(d.spentSum, st.price) + ')' : ''))],
        ['Transactions on-chain', d.txCount.toLocaleString('en-US')],
        ['Counterparties (first hop)', String(st.cps.length)],
        ['Activity window', range]
      ],
      styles: { fontSize: 9, cellPadding: 5 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 170 } }
    }));

    // counterparties
    var CP_CAP = 200;
    var cpRows = st.cps.slice(0, CP_CAP).map(function (c, i) {
      return [String(i + 1), c.addr, fmtBtc(c.inSats), fmtBtc(c.outSats), String(c.txCount)];
    });
    doc.autoTable(themed({
      startY: doc.lastAutoTable.finalY + 18,
      head: [[{ content: 'FIRST-HOP COUNTERPARTIES \u2014 every wallet yours transacted with' + (st.cps.length > CP_CAP ? ' (top ' + CP_CAP + ' of ' + st.cps.length + ' by volume)' : ''), colSpan: 5 }],
             ['#', 'Wallet address', 'Sent to you', 'Received from you', 'Shared tx']],
      body: cpRows,
      headStyles: { fontSize: 8 },
      styles: { fontSize: 7, cellPadding: 4 },
      columnStyles: { 0: { cellWidth: 24 }, 1: { cellWidth: 250 } }
    }));

    // transactions
    var txRows = d.txs.map(function (t) {
      var amt = t.direction === 'in' ? t.inSats : t.outSats;
      var cp = t.counterparties.length ? t.counterparties[0].addr + (t.counterparties.length > 1 ? ' +' + (t.counterparties.length - 1) : '') : '(script / non-standard)';
      return [fmtDate(t.time), t.direction === 'in' ? 'IN' : 'OUT', pdfSafe(t.assetLabel || fmtBtc(amt)), cp, t.txid];
    });
    var moreTx = d.txCount - d.txs.length;
    doc.autoTable(themed({
      startY: doc.lastAutoTable.finalY + 18,
      head: [[{ content: 'TRANSACTIONS \u2014 most recent ' + d.txs.length.toLocaleString('en-US') + (moreTx > 0 ? ' (of ' + d.txCount.toLocaleString('en-US') + ' on-chain)' : ''), colSpan: 5 }],
             ['Date', 'Dir', 'Amount', 'Counterparty (first hop)', 'TXID']],
      body: txRows,
      headStyles: { fontSize: 8 },
      styles: { fontSize: 6, cellPadding: 3, overflow: 'linebreak' },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 26 }, 2: { cellWidth: 70 } },
      didParseCell: function (h) { if (h.section === 'body' && h.column.index === 1) h.cell.styles.textColor = h.cell.raw === 'IN' ? [22, 122, 80] : [176, 42, 60]; }
    }));

    // ---- v12.2: the closing page — the word from Phantom Flash ----
    doc.addPage();
    var H2 = doc.internal.pageSize.getHeight();
    doc.setFillColor(navy[0], navy[1], navy[2]);
    doc.rect(0, 0, W, H2, 'F');
    var cx = W / 2;
    // thin cyan rules top and bottom
    doc.setDrawColor(0, 229, 255); doc.setLineWidth(1.2);
    doc.line(cx - 90, 150, cx + 90, 150);
    doc.setTextColor(0, 229, 255);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(24);
    doc.text('PHANTOM FLASH', cx, 195, { align: 'center' });
    doc.setTextColor(236, 225, 200);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(12);
    doc.text('The chain never sleeps. Neither does Phantom Flash.', cx, 222, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(236, 225, 200);
    doc.text('This is a free Pflash tracing. We think it\u2019s good.', cx, 290, { align: 'center' });
    doc.text('But you get what you pay for.', cx, 306, { align: 'center' });

    // socials — prominent, clickable
    doc.setFont('helvetica', 'bold'); doc.setFontSize(14); doc.setTextColor(0, 229, 255);
    doc.textWithLink('X \u00b7 @PhantomFlashHQ', cx, 356, { align: 'center', url: 'https://x.com/PhantomFlashHQ' });
    doc.textWithLink('YouTube \u00b7 @PhantomFlashHQ', cx, 380, { align: 'center', url: 'https://www.youtube.com/@PhantomFlashHQ' });
    doc.textWithLink('phantomflash.com', cx, 404, { align: 'center', url: 'https://phantomflash.com' });

    doc.setDrawColor(0, 229, 255); doc.setLineWidth(1.2);
    doc.line(cx - 90, 440, cx + 90, 440);

    // the signature
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(236, 225, 200);
    doc.text('This reading was generated for whoever needed it.', cx, 480, { align: 'center' });
    doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.setTextColor(242, 169, 80);
    doc.text('Daniel Irwin', cx, 504, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(236, 225, 200);
    doc.text('Phantom Flash HQ', cx, 519, { align: 'center' });

    // the disclaimer, said our way
    doc.setFontSize(9); doc.setTextColor(126, 147, 179);
    doc.text('Not legal advice. Not financial advice. Not for law-enforcement purposes.', cx, 585, { align: 'center' });
    doc.text('A free first-hop reading of the public blockchain, presented as-is.', cx, 600, { align: 'center' });
    doc.text('No recovery promised or implied. The chain keeps the receipts \u2014 we just read them back.', cx, 615, { align: 'center' });

    // footer + the ghost on every data page (skip the closing page — it speaks for itself)
    var pages = doc.internal.getNumberOfPages();
    for (var p = 1; p <= pages; p++) {
      doc.setPage(p);
      var H = doc.internal.pageSize.getHeight();
      if (p < pages && wm) {
        try {
          var iw = 470, ih = iw * (wm.h / wm.w);
          doc.saveGraphicsState();
          doc.setGState(new doc.GState({ opacity: 0.055 }));
          doc.addImage(wm.data, 'JPEG', (W - iw) / 2, (H - ih) / 2, iw, ih);
          doc.restoreGraphicsState();
        } catch (e) { try { doc.restoreGraphicsState(); } catch (e2) {} }
      }
      if (p < pages) {
        doc.setFontSize(6.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(muted[0], muted[1], muted[2]);
        doc.text('Not legal advice \u00b7 not financial advice \u00b7 not for law-enforcement purposes \u00b7 free reading of public blockchain data, as-is \u00b7 no recovery promised or implied.', 40, H - 34, { maxWidth: W - 80 });
        doc.text('phantomflash.com \u00b7 @PhantomFlashHQ \u00b7 page ' + p + ' of ' + pages, W - 40, H - 18, { align: 'right' });
      }
    }

    doc.save('PFLASH-report-' + st.addr.slice(0, 12) + '-' + now.toISOString().slice(0, 10) + '.pdf');
  }

  // PDF button lives inside the (dynamically rendered) paper view — delegate.
  document.addEventListener('click', function (ev) {
    var btn = ev.target && ev.target.closest ? ev.target.closest('#pdfBtn') : null;
    if (!btn || !PDF_STATE || btn.disabled) return;
    var orig = btn.textContent;
    btn.textContent = '\u26a1 Pflash Loading \u26a1';
    btn.disabled = true;
    try { if (window.gtag) gtag('event', 'pdf_download', { address_kind: PDF_STATE.chain }); } catch (e) {}
    Promise.all([loadPdfLibs(), loadWatermark()])
      .then(function (r) {
        buildPdf(r[1]);
        btn.textContent = '\u26a1 Successful Pflash Export \u26a1';
        setTimeout(function () { btn.textContent = orig; btn.disabled = false; }, 4000);
      })
      .catch(function () {
        // CDN blocked/offline — the browser's own PDF printer still works
        btn.textContent = orig; btn.disabled = false;
        window.print();
      });
  });

  // ============================================================
  // v13: PAPER VIEW — the written report, on the page, free
  // (named like the thing people pay for; the joke is it isn't)
  // ============================================================
  var PAPER_RENDERED = false;

  function renderPaperView() {
    var st = PDF_STATE, box = $('paperView');
    if (!st || !box) return;
    var d = st.data;
    var priceOk = st.price && st.chain !== 'eth';
    var now = new Date();
    var times = d.txs.map(function (t) { return t.time; }).filter(Boolean);
    var range = '\u2014';
    if (times.length) {
      var mn = Math.min.apply(null, times), mx = Math.max.apply(null, times);
      range = fmtDate(mn) + (fmtDate(mn) === fmtDate(mx) ? '' : ' \u2192 ' + fmtDate(mx));
      if (d.txs.length < d.txCount) range += ' (most recent ' + d.txs.length + ' of ' + d.txCount.toLocaleString('en-US') + ')';
    }
    function row(k, v) { return '<div class="pd-row"><span class="pd-k">' + k + '</span><span class="pd-v">' + v + '</span></div>'; }
    var cpRows = st.cps.map(function (c, i) {
      return '<tr><td>' + (i + 1) + '</td><td class="pd-addr">' + esc(c.addr) + '</td><td>' + esc(fmtBtc(c.inSats)) + '</td><td>' + esc(fmtBtc(c.outSats)) + '</td><td>' + c.txCount + '</td></tr>';
    }).join('');
    var txRows = d.txs.map(function (t) {
      var amt = t.direction === 'in' ? t.inSats : t.outSats;
      var cp = t.counterparties.length ? esc(shortAddr(t.counterparties[0].addr)) + (t.counterparties.length > 1 ? ' +' + (t.counterparties.length - 1) : '') : '(script / non-standard)';
      return '<tr><td>' + fmtDate(t.time) + '</td><td class="pd-' + t.direction + '">' + (t.direction === 'in' ? 'IN' : 'OUT') + '</td><td>' + esc(t.assetLabel || fmtBtc(amt)) + '</td><td class="pd-addr">' + cp + '</td><td class="pd-addr">' + esc(t.txid.slice(0, 14)) + '\u2026</td></tr>';
    }).join('');
    var moreTx = d.txCount - d.txs.length;
    box.innerHTML =
      '<div class="paper-doc">' +
        '<div class="pd-head">' +
          '<div><div class="pd-brand">PHANTOM FLASH</div>' +
          '<div class="pd-sub">WALLET PFLASH REPORT \u2014 FREE EDITION \u00b7 generated ' + esc(now.toLocaleString('en-US')) + '</div></div>' +
          '<button class="btn primary" id="pdfBtn" type="button">\u2b07 Don\u2019t Forget to Download this Report and Take it With You!</button>' +
        '</div>' +
        '<div class="pd-epigraph">' + PDF_EPIGRAPH + '</div>' +
        '<div class="pd-wallet">Scanned wallet (' + (st.chain === 'eth' ? 'Ethereum' : 'Bitcoin') + '): <span class="pd-addr">' + esc(st.addr) + '</span></div>' +
        '<div class="pd-section">SUMMARY</div>' +
        row('Total received', esc(fmtBtc(d.fundedSum)) + (priceOk ? ' <span class="pd-usd">' + esc(fmtUsd(d.fundedSum, st.price)) + '</span>' : '')) +
        row('Total sent out', esc(fmtBtc(d.spentSum)) + (priceOk ? ' <span class="pd-usd">' + esc(fmtUsd(d.spentSum, st.price)) + '</span>' : '')) +
        row('Transactions on-chain', d.txCount.toLocaleString('en-US')) +
        row('Counterparties (first hop)', String(st.cps.length)) +
        row('Activity window', esc(range)) +
        '<div class="pd-section">FIRST-HOP COUNTERPARTIES \u2014 every wallet yours transacted with</div>' +
        '<div class="pd-scroll"><table class="pd-table"><thead><tr><th>#</th><th>Wallet address</th><th>Sent to you</th><th>Received from you</th><th>Tx</th></tr></thead><tbody>' + cpRows + '</tbody></table></div>' +
        '<div class="pd-section">TRANSACTIONS \u2014 most recent ' + d.txs.length.toLocaleString('en-US') + (moreTx > 0 ? ' of ' + d.txCount.toLocaleString('en-US') + ' on-chain' : '') + '</div>' +
        '<div class="pd-scroll"><table class="pd-table"><thead><tr><th>Date</th><th>Dir</th><th>Amount</th><th>Counterparty</th><th>TXID</th></tr></thead><tbody>' + txRows + '</tbody></table></div>' +
        '<div class="pd-close">' +
          '<p>' + PDF_CLOSER + '</p>' +
          '<p class="pd-socials"><a href="https://x.com/PhantomFlashHQ" target="_blank" rel="noopener">X \u00b7 @PhantomFlashHQ</a> &nbsp;\u00b7&nbsp; <a href="https://www.youtube.com/@PhantomFlashHQ" target="_blank" rel="noopener">YouTube \u00b7 @PhantomFlashHQ</a> &nbsp;\u00b7&nbsp; <a href="https://phantomflash.com">phantomflash.com</a></p>' +
          '<p class="pd-sign">Daniel Irwin<br><span>Phantom Flash HQ</span></p>' +
          '<p class="pd-legal">Not legal advice. Not financial advice. Not for law-enforcement purposes.<br>A free first-hop reading of the public blockchain, presented as-is. No recovery promised or implied.<br>The chain keeps the receipts \u2014 we just read them back.</p>' +
        '</div>' +
      '</div>';
    PAPER_RENDERED = true;
  }

  function setView(paper) {
    var tU = $('tabUniverse'), tP = $('tabPaper'), vU = $('universeView'), vP = $('paperView');
    if (!vU || !vP) return;
    if (paper && !PAPER_RENDERED) renderPaperView();
    vU.style.display = paper ? 'none' : 'block';
    vP.style.display = paper ? 'block' : 'none';
    if (tU) tU.className = 'view-tab' + (paper ? '' : ' active');
    if (tP) tP.className = 'view-tab' + (paper ? ' active' : '');
    // the 3D stage must re-fit after any width change
    if (!paper) setTimeout(function () { try { window.dispatchEvent(new Event('resize')); } catch (e) {} }, 60);
    try { if (window.gtag) gtag('event', 'view_switch', { view: paper ? 'paper' : 'universe' }); } catch (e) {}
  }

  function initViewTabs() {
    var tU = $('tabUniverse'), tP = $('tabPaper');
    if (!tU || !tP) return;
    tU.addEventListener('click', function () { setView(false); });
    tP.addEventListener('click', function () { setView(true); });
  }
  initViewTabs();

  // v13.3: the first landing shows BOTH views side by side (universe left,
  // paper right). People don't find tabs — so the site teaches them there
  // are two views by showing both, then collapses to tabs after the pick.
  function initSplitChooser() {
    var wrap = $('viewWrap'), vU = $('universeView'), vP = $('paperView');
    if (!wrap || !vU || !vP) { var t = $('viewTabs'); if (t) t.style.display = 'flex'; return; }
    renderPaperView();
    vP.style.display = 'block';
    wrap.className = 'split';
    vU.className = 'view-pane'; vP.className = 'view-pane';
    [[false, vU, '\ud83e\ude90 UNIVERSE VIEW'], [true, vP, '\ud83d\udcc4 PAPER VIEW']].forEach(function (cfg) {
      var ov = document.createElement('div');
      ov.className = 'pane-pick';
      ov.innerHTML = '<div class="pp-label">' + cfg[2] + '<span>click to open</span></div>';
      ov.addEventListener('click', function () { chooseView(cfg[0]); });
      cfg[1].appendChild(ov);
    });
    try { if (window.gtag) gtag('event', 'view_split_shown', {}); } catch (e) {}
  }

  function chooseView(paper) {
    var wrap = $('viewWrap'), vU = $('universeView'), vP = $('paperView');
    if (wrap) wrap.className = '';
    document.querySelectorAll('.pane-pick').forEach(function (el) { el.parentNode.removeChild(el); });
    if (vU) vU.className = ''; if (vP) vP.className = '';
    var tabs = $('viewTabs'); if (tabs) tabs.style.display = 'flex';
    setView(paper);
    try { if (window.gtag) gtag('event', 'view_pick', { view: paper ? 'paper' : 'universe' }); } catch (e) {}
  }

  // ---------- entry: which page are we on? ----------
  if ($('addrChip')) {
    runScan();                            // scan.html
  } else if ($('demoStage')) {
    // index.html live-demo hero — wait for the deferred i18n layer so
    // locked-node labels are translated (DOMContentLoaded fires after
    // deferred scripts execute).
    if (window.PF_I18N_T || document.readyState === 'complete') runDemo();
    else document.addEventListener('DOMContentLoaded', runDemo);
  }
})();
