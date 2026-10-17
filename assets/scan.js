/* ============================================================
   PHANTOM FLASH — the field: free PFLASH scan
   Live BTC data: mempool.space (primary), blockchain.info (fallback)
   v19: XRP Ledger (xrplcluster.com JSON-RPC) + the AGENT panel (DRAO memos)
   3D "solar system" explorer via 3d-force-graph (CDN). One scan draws one
   SYSTEM (the address is the sun, its counterparties are the planets);
   every system charts the FIELD, the shared map.
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
   its lore.
   v10: the renderer is reusable — index.html runs it in DEMO
   mode with injected fictional data (wallet "DEMO").
   v22: nothing is paid. Every counterparty the scan fetched is drawn
   (up to MAX_PLANETS, a render-performance cap only) and every fetched
   transaction is listed. Nothing is held back.
   ============================================================ */
(function () {
  'use strict';
  var T_FALLBACK = { noAddr: 'No address given', noAddrBody: 'Go back to the home page and paste an address to PFLASH it.' };
  var T = function(k){ var v = window.PF_I18N_T ? window.PF_I18N_T(k) : null; if (v == null || v === k) v = T_FALLBACK[k] || k; return v; };

  var SATS = 1e8;
  // ---------- active coin (set per-scan in runScan; BTC by default + demo) ----------
  // The internal model counts in a coin's smallest practical unit — sats for
  // BTC, wei for ETH. COIN.divisor converts that base unit to a whole coin for
  // display; COIN.ticker is the symbol shown to the user. The field names below
  // keep the historical "sats" spelling but mean "base units of the active coin."
  var COIN = { chain: 'btc', ticker: 'BTC', divisor: 1e8 };
  // The scan is free for everybody: every planet, every fetched transaction.
  // small screens get a lower node cap so the 3D system stays smooth on phones
  var IS_SMALL = Math.min(window.innerWidth, window.innerHeight) <= 600 ||
                 (window.matchMedia && window.matchMedia('(max-width:880px)').matches);
  var MAX_PLANETS = IS_SMALL ? 24 : 44;      // render-performance cap: the top N counterparties by volume are drawn

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
    if (COIN.chain === 'xrp') return v.toLocaleString('en-US', { maximumFractionDigits: 6 }) + ' XRP';   // drops: 6 decimals, zeros trimmed
    if (v < 0.0001) return v.toFixed(8) + ' ' + COIN.ticker;
    return v.toLocaleString('en-US', { maximumFractionDigits: 5 }) + ' ' + COIN.ticker;
  }
  function fmtUsd(units, usdRate) {
    if (COIN.usd) return '';                 // already shown in dollars by fmtBtc
    if (!usdRate) return '';
    var usd = (units / COIN.divisor) * usdRate;
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
  // v19: XRP history is capped, so its count can be a floor ("400+")
  function chainName(c) { return c === 'eth' ? 'Ethereum' : c === 'xrp' ? 'XRP Ledger' : 'Bitcoin'; }
  function fmtTxCount(d) { return d.txCount.toLocaleString('en-US') + (d.truncated ? '+' : ''); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  // ---------- v10: render context (set by runScan / runDemo) ----------
  var curAddr = '';                          // wallet shown in cards ('DEMO' in demo mode)
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
  function bagPileHtml(tier) {
    var rows = BAG_ROWS[tier] || [1];
    var html = '';
    for (var i = rows.length - 1; i >= 0; i--) { // DOM top row first
      html += '<span class="bag-row">' + bagEmojis(rows[i]) + '</span>';
    }
    return '<div class="bag-pile">' + html + '</div>';
  }
  function bagLore(tier) {
    if (tier >= 5) return 'It carries the largest share of the scanned wallet’s first-hop volume.';
    if (tier === 4) return 'It carries a large share of the scanned wallet’s first-hop volume.';
    if (tier === 3) return 'A moderate share of the first-hop volume ran through it.';
    if (tier === 2) return 'A small share of the first-hop volume touched it.';
    return 'Only a trickle of the first-hop volume touched it.';
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
  function creatureSvg(creature) {
    var art = CREATURE_ART[creature.name];
    if (!art) return null;
    return '<svg class="cs-svg" viewBox="0 0 120 120" ' +
      'role="img" aria-label="' + esc(creature.epithet || creature.name) + '">' + art + '</svg>';
  }

  // Build the full character-select stage HTML for the info card.
  // creature: lore creature obj; planetNm: display name; feature: {icon,label} or null.
  function selectStage(creature, planetNm, feature) {
    var svg = creatureSvg(creature);
    var inner = svg ||
      ('<div class="cs-glyph">' + creature.glyph + '</div>');
    return '<div class="char-select">' +
      '<div class="cs-burst"></div>' +
      '<div class="cs-spot"></div>' +
      '<div class="cs-stage">' + inner + '</div>' +
      '<div class="cs-ring"></div>' +
      '<div class="cs-podium"></div>' +
      '<div class="cs-plate">' +
        '<span class="cs-epithet">' + esc(creature.epithet || creature.name.toUpperCase()) + '</span>' +
        '<span class="cs-of">of</span> <span class="cs-world">' + esc(planetNm) + '</span>' +
      '</div>' +
      (feature ? '<div class="cs-feature" title="Famous for ' + esc(feature.label) + '">' + feature.icon + ' <span>famous for ' + esc(feature.label) + '</span></div>' : '') +
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
  function planetHistory(cp, lore, names, idx, maxTotal, usdRate) {
    var rng = mulberry32(hashStr(cp.addr) ^ 0x9E3779B9);
    var amt = function (sats) {
      var b = fmtBtc(sats), u = fmtUsd(sats, usdRate);
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
        'Two-way wallet: ' + amt(cp.inSats) + ' came in to the scanned wallet and ' + amt(cp.outSats) + ' went back out, across ' + tx + '.',
        'Money moved both directions here — ' + amt(cp.inSats) + ' in, ' + amt(cp.outSats) + ' out, over ' + tx + '.'
      ]);
      s2 = pick(rng, [
        'Funds arriving and leaving like this is a pattern often seen with relay or pass-through wallets — but it can also just be ordinary back-and-forth. The chain shows the movement, not the reason.',
        'That in-and-out pattern can mean a relay or pass-through, or it can be routine two-way activity. Read it as a probability, not a verdict.'
      ]);
    } else if (inboundOnly) {
      s1 = pick(rng, [
        'Money came in to the scanned wallet from this address — ' + amt(cp.inSats) + ' across ' + tx + '.',
        'This address sent ' + amt(cp.inSats) + ' to the scanned wallet, over ' + tx + '.'
      ]);
      s2 = pick(rng, [
        'This is a first-hop source; where those funds came from before that is the next hop. Follow it to draw it.',
        'It is a first-hop source — follow it back another hop to see where the money originated.'
      ]);
    } else {
      s1 = pick(rng, [
        'The scanned wallet sent ' + amt(cp.outSats) + ' to this address, across ' + tx + '.',
        'Money went out from the scanned wallet to here — ' + amt(cp.outSats) + ' over ' + tx + '.'
      ]);
      s2 = pick(rng, [
        'It is a first-hop destination; follow it onward — to the next wallet, exchange, or service.',
        'This is a first-hop destination. Follow it forward to see where the money landed next.'
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
  function buildSystemLore(planets, usdRate) {
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
      e.history = planetHistory(planets[i], e, names, i, maxTotal, usdRate);
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
  function fetchJson(url, timeoutMs, init, tries) {
    function attempt(triesLeft, delayMs) {
      return new Promise(function (resolve, reject) {
        var ctrl = new AbortController();
        var t = setTimeout(function () { ctrl.abort(); }, timeoutMs || 15000);
        var opts = { signal: ctrl.signal };
        if (init) for (var k in init) opts[k] = init[k];   // v19: POST support (XRP JSON-RPC)
        fetch(url, opts)
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
    return attempt(tries == null ? 3 : tries, 700);
  }

  // Normalized shape:
  // { txCount, fundedSum, spentSum, txs: [{txid, time, confirmed, inSats, outSats, counterparties:[{addr,sats}], direction}] }
  function normalizeMempool(info, txs, me) {
    me = me || addr;                         // v20: loaders can read any wallet, not just the scanned one
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
        if (v.scriptpubkey_address === me) inSats += v.value;
      });
      tx.vin.forEach(function (vin) {
        var pv = vin.prevout;
        if (!pv) return;
        if (pv.scriptpubkey_address === me) outSats += pv.value;
      });
      var direction = outSats > inSats ? 'out' : 'in';
      if (direction === 'in') {
        // counterparties = senders (vin prevouts not ours)
        tx.vin.forEach(function (vin) {
          var pv = vin.prevout;
          if (pv && pv.scriptpubkey_address && pv.scriptpubkey_address !== me) {
            cps[pv.scriptpubkey_address] = (cps[pv.scriptpubkey_address] || 0) + pv.value;
          }
        });
      } else {
        // counterparties = recipients (vouts not ours / not change)
        tx.vout.forEach(function (v) {
          if (v.scriptpubkey_address && v.scriptpubkey_address !== me) {
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

  function normalizeBlockchainInfo(d, me) {
    me = me || addr;
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
        if (o.addr === me) inSats += o.value;
      });
      (tx.inputs || []).forEach(function (i) {
        var po = i.prev_out;
        if (po && po.addr === me) outSats += po.value;
      });
      var direction = outSats > inSats ? 'out' : 'in';
      if (direction === 'in') {
        (tx.inputs || []).forEach(function (i) {
          var po = i.prev_out;
          if (po && po.addr && po.addr !== me) cps[po.addr] = (cps[po.addr] || 0) + po.value;
        });
      } else {
        (tx.out || []).forEach(function (o) {
          if (o.addr && o.addr !== me) cps[o.addr] = (cps[o.addr] || 0) + o.value;
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

  // v20: loadData(a) / loadDataEth(a) / loadDataXrp(a) read ANY wallet; with no
  // argument they read the scanned one (module `addr`), exactly as before.
  // The status line is only touched for the scanned wallet itself.
  function loadData(a) {
    var me = a || addr, main = (me === addr);
    if (main) setStatus(T('pflashingLive'));
    var base = 'https://mempool.space/api/address/' + encodeURIComponent(me);
    return Promise.all([fetchJson(base), fetchJson(base + '/txs', 20000)])
      .then(function (res) { return normalizeMempool(res[0], res[1], me); })
      .catch(function () {
        if (main) setStatus(T('busy'));
        return fetchJson('https://blockchain.info/rawaddr/' + encodeURIComponent(me) + '?limit=50&cors=true', 20000)
          .then(function (d) { return normalizeBlockchainInfo(d, me); });
      });
  }

  function loadRate() {
    return fetchJson('https://mempool.space/api/v1/prices', 8000)
      .then(function (p) { return p.USD; })
      .catch(function () { return null; });
  }

  // ---------- Ethereum + stablecoins (Blockscout — keyless, CORS-open) ----------
  // An Ethereum address rarely moves just one asset — a large share of the
  // volume travels as stablecoins — so we trace native ETH PLUS USDT and USDC, and
  // unify them in the only honest common unit: US dollars. Every transfer is
  // converted to USD (ETH at the live market rate, stablecoins at one dollar) so the system,
  // stats and planets compare apples to apples. The tx table still shows each
  // move in its native asset ("5,000 USDT"). To add a token, add a row here.
  var ETH_TOKENS = [
    { symbol: 'USDT', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6, usd: 1 },
    { symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6, usd: 1 }
  ];

  // Which chain does an address belong to? Returns 'btc', 'eth', 'xrp', or null.
  function detectChain(a) {
    if (/^0x[0-9a-fA-F]{40}$/.test(a)) return 'eth';
    if (/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(a)) return 'xrp';
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
    if (!(usd > 0)) return null;             // e.g. native ETH when no rate is available
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
  // amounts in USD. ethUsd values native ETH; stablecoins are valued at one dollar.
  function normalizeEthAll(ethRes, intRes, tokenResults, ethUsd, who) {
    var me = (who || addr).toLowerCase();
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

  function loadDataEth(who) {
    var me = who || addr;
    if (me === addr) setStatus(T('pflashingLive'));
    var api = 'https://eth.blockscout.com/api';
    var a = encodeURIComponent(me);
    // rate first so native ETH can be valued; each token list is independently
    // guarded so a slow/timed-out asset never breaks the whole scan
    return loadRateEth().then(function (ethUsd) {
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
        return normalizeEthAll(res[0], res[1], res.slice(2), ethUsd, me);
      });
    });
  }

  function loadRateEth() {
    return fetchJson('https://eth.blockscout.com/api?module=stats&action=ethprice', 8000)
      .then(function (p) { return (p && p.result) ? parseFloat(p.result.ethusd) : null; })
      .catch(function () { return null; });
  }

  // ---------- v19: XRP Ledger (public JSON-RPC — keyless, CORS-open) ----------
  // Classic r-addresses. Amounts are DROPS (1 XRP = 1,000,000 drops), shown as
  // XRP by fmtBtc via COIN.divisor. Only successful XRP-for-XRP Payments become
  // rows; token (IOU) amounts, offers, trustlines etc. are not money moving and
  // are skipped. Everything the account SIGNED is also read for AGENT memos
  // (readAgentMemos / renderAgentPanel) — incoming transactions never count.
  // Browser CORS: xrplcluster.com answers the preflight and the POST with
  // ACAO *. s1/s2.ripple.com are kept as fallbacks, but they send no CORS
  // headers, so a browser can only use them if that changes.
  var XRPL_ENDPOINTS = ['https://xrplcluster.com', 'https://s1.ripple.com:51234', 'https://s2.ripple.com:51234'];
  var XRPL_EPOCH = 946684800;                       // 2000-01-01 → unix seconds
  var XRPL_NOOWNER = 'rrrrrrrrrrrrrrrrrrrrBZbvji';  // the no-owner address
  var XRP_PAGE = 200, XRP_MAX_TX = 400;
  var XRP_ADDR_RE = /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/;
  var XRPL_SOFT_ERRORS = { slowDown: 1, tooBusy: 1, noNetwork: 1, noCurrent: 1, noClosed: 1, failedToForward: 1 };

  function rpcError(code) {
    var e = new Error('XRP Ledger ' + code);
    e.rpc = code;
    return e;
  }

  // One JSON-RPC call. Walks the endpoint list. A definitive ledger answer
  // (including errors such as actNotFound) is returned to the caller as-is; a
  // transport failure or an overloaded server falls through to the next endpoint.
  function xrplCall(method, params) {
    var body = JSON.stringify({ method: method, params: [params] });
    function at(i, lastErr) {
      if (i >= XRPL_ENDPOINTS.length) return Promise.reject(lastErr || new Error('XRP Ledger unreachable'));
      return fetchJson(XRPL_ENDPOINTS[i], 15000, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body
      }, 1).then(function (r) {
        var res = r && r.result;
        if (!res) throw new Error('bad XRP Ledger reply');
        if (res.error && XRPL_SOFT_ERRORS[res.error]) throw rpcError(res.error);
        return res;
      }).catch(function (e) { return at(i + 1, e); });
    }
    return at(0);
  }

  function hexToUtf8(h) {
    try {
      if (!h || h.length % 2 || /[^0-9a-fA-F]/.test(h)) return null;
      var b = new Uint8Array(h.length / 2);
      for (var i = 0; i < b.length; i++) b[i] = parseInt(h.substr(i * 2, 2), 16);
      return new TextDecoder('utf-8').decode(b);
    } catch (e) { return null; }
  }

  // The agent memos on ONE transaction → { clothes:[obj], receipts:[obj] } (parsed JSON bodies).
  function readAgentMemos(memos) {
    var found = { clothes: [], receipts: [] };
    (memos || []).forEach(function (m) {
      var mm = m && m.Memo; if (!mm) return;
      var type = hexToUtf8(mm.MemoType); if (!type) return;
      type = type.toLowerCase();
      if (type !== 'phantomflash/clothes' && type !== 'phantomflash/receipt') return;
      var obj = null;
      try { obj = JSON.parse(hexToUtf8(mm.MemoData)); } catch (e) { obj = null; }
      if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return;
      if (type === 'phantomflash/clothes') found.clothes.push(obj);
      else if (/^[0-9a-fA-F]{64}$/.test(String(obj.sha256 || ''))) found.receipts.push(obj);
    });
    return found;
  }

  // Raw account_tx rows → the shared normalized shape, plus data.agent when the
  // account has declared itself. The scanned address is the global `addr`.
  function normalizeXrp(rows, balance, truncated, who) {
    var me = who || addr;
    var out = { txCount: 0, fundedSum: 0, spentSum: 0, txs: [], sourceFailed: false,
                balance: balance, truncated: !!truncated, agent: null };
    var clothes = [], receipts = [], seen = {};
    rows.forEach(function (t) {
      if (!t || t.validated === false) return;
      var x = t.tx || t.tx_json || t;               // API v1 / v2 / flat
      var meta = t.meta || t.metaData || {};
      if (meta.TransactionResult !== 'tesSUCCESS') return;
      var hash = t.hash || x.hash;
      if (!hash || seen[hash]) return;
      seen[hash] = 1;
      var time = x.date != null ? Number(x.date) + XRPL_EPOCH
               : (t.close_time_iso ? Math.floor(Date.parse(t.close_time_iso) / 1000) : 0);

      // --- agent memos: ONLY acts signed by the scanned account ---
      var memoKind = null;
      if (x.Account === me && x.Memos) {
        var mk = readAgentMemos(x.Memos);
        mk.clothes.forEach(function (o) { clothes.push({ hash: hash, time: time, dest: x.Destination || null, obj: o }); });
        mk.receipts.forEach(function (o) { receipts.push({ hash: hash, time: time, dest: x.Destination || null, obj: o }); });
        memoKind = mk.clothes.length ? 'clothes' : (mk.receipts.length ? 'receipt' : null);
      }

      // --- money rows: successful XRP-for-XRP payments that touch the account ---
      if (x.TransactionType !== 'Payment') return;
      if (x.Account !== me && x.Destination !== me) return;
      var amt, del = meta.delivered_amount;
      var nominal = x.Amount != null ? x.Amount : x.DeliverMax;
      if (typeof del === 'string' && /^\d+$/.test(del)) amt = Number(del);
      else if (del && typeof del === 'object') return;              // token (IOU) delivered
      else if (typeof nominal === 'string' && /^\d+$/.test(nominal)) amt = Number(nominal);
      else return;                                                  // token amount
      var isOut = x.Account === me;
      var other = isOut ? x.Destination : x.Account;
      out.txs.push({
        txid: hash, time: time, confirmed: true,
        inSats: isOut ? 0 : amt, outSats: isOut ? amt : 0,
        direction: isOut ? 'out' : 'in',
        memoKind: memoKind,
        counterparties: (other && other !== me) ? [{ addr: other, sats: amt }] : []
      });
      if (isOut) out.spentSum += amt; else out.fundedSum += amt;
    });
    out.txs.sort(function (a, b) { return b.time - a.time; });
    out.txCount = out.txs.length;
    if (clothes.length) {
      clothes.sort(function (a, b) { return (b.time - a.time) || ((Number(b.obj.ts) || 0) - (Number(a.obj.ts) || 0)); });
      receipts.sort(function (a, b) { return b.time - a.time; });
      out.agent = { current: clothes[0], earlier: clothes.slice(1), receipts: receipts, truncated: !!truncated };
    }
    return out;
  }

  function loadDataXrp(a) {
    var me = a || addr;
    if (me === addr) setStatus(T('pflashingLive'));
    // balance — a missing account is zero; a failed lookup is just "unknown"
    var infoP = xrplCall('account_info', { account: me, ledger_index: 'validated' }).then(function (r) {
      if (r.error === 'actNotFound') return 0;
      if (r.error) throw rpcError(r.error);
      var b = Number(r.account_data && r.account_data.Balance);
      return isNaN(b) ? null : b;
    }).catch(function (e) {
      if (e && e.rpc === 'actMalformed') throw e;
      return null;
    });
    // history — newest first, up to XRP_MAX_TX rows. A later page failing keeps what we have.
    function page(marker, rows) {
      var p = { account: me, limit: XRP_PAGE, forward: false };
      if (marker) p.marker = marker;
      return xrplCall('account_tx', p).then(function (r) {
        if (r.error === 'actNotFound') return { rows: rows, truncated: false };
        if (r.error) throw rpcError(r.error);
        rows = rows.concat(r.transactions || []);
        if (r.marker && rows.length < XRP_MAX_TX) return page(r.marker, rows);
        return { rows: rows, truncated: !!r.marker };
      }).catch(function (e) {
        if (marker && !(e && e.rpc === 'actMalformed')) return { rows: rows, truncated: true };
        throw e;
      });
    }
    return Promise.all([infoP, page(null, [])]).then(function (res) {
      return normalizeXrp(res[1].rows, res[0], res[1].truncated, me);
    }).catch(function (e) {
      if (e && e.rpc === 'actMalformed') throw new Error('HTTP 400 actMalformed');
      // endpoint down / overloaded: the existing "data source is busy" path
      return { txCount: 0, fundedSum: 0, spentSum: 0, txs: [], sourceFailed: true, balance: null, truncated: false, agent: null };
    });
  }

  // ---------- v19: the AGENT panel ----------
  // Accounts that operate under "Daniel's Rules of AI Agent Order" announce
  // themselves with signed memos. Everything shown here is the account's own
  // declaration read back from the ledger; incoming transactions never count.
  function explorerTx(h) { return 'https://livenet.xrpl.org/transactions/' + encodeURIComponent(h); }
  function explorerAcct(a) { return 'https://livenet.xrpl.org/accounts/' + encodeURIComponent(a); }
  function fmtDateTime(unix) {
    if (!unix) return 'pending';
    return new Date(unix * 1000).toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
  }
  function memoText(v, max) { return typeof v === 'string' || typeof v === 'number' ? String(v).slice(0, max || 120) : ''; }
  function txLink(h) {
    return '<a href="' + esc(explorerTx(h)) + '" target="_blank" rel="noopener">' + esc(String(h).slice(0, 10)) + '…</a>';
  }
  function acctLink(a) {
    var label = a === XRPL_NOOWNER ? 'no-owner address' : shortAddr(a);
    if (!a || !XRP_ADDR_RE.test(a)) return '<span class="ag-mono">' + esc(a || '—') + '</span>';
    return '<a class="ag-mono" href="' + esc(explorerAcct(a)) + '" target="_blank" rel="noopener" title="' + esc(a) + '">' + esc(label) + '</a>';
  }

  // A drawn portrait, if one is on file, is keyed by the address alone: the
  // first 12 hex chars of SHA-1(address) name the file. Nothing links to it.
  function agentPortraitHash(addr) {
    if (!(window.crypto && crypto.subtle && window.TextEncoder) || !addr) return Promise.resolve(null);
    return crypto.subtle.digest('SHA-1', new TextEncoder().encode(String(addr))).then(function (d) {
      var b = new Uint8Array(d), s = '';
      for (var i = 0; i < b.length; i++) s += (b[i] < 16 ? '0' : '') + b[i].toString(16);
      return s.slice(0, 12);
    }, function () { return null; });
  }
  function showAgentPortrait(addr, name) {
    agentPortraitHash(addr).then(function (h12) {
      if (!h12) return;
      var img = new Image();
      img.onload = function () {
        var panel = $('agentPanel');
        if (!panel || panel.querySelector('.ag-portrait')) return;
        var body = panel.querySelector('.ag-body'); if (!body) return;
        var fig = document.createElement('div'); fig.className = 'ag-portrait';
        img.alt = name; img.decoding = 'async';
        fig.appendChild(img);
        body.insertBefore(fig, body.firstChild);
        body.classList.add('has-portrait');
      };
      img.src = 'assets/agents/' + h12 + '.jpg';
    });
  }
  function agLicenseList(arr) {
    if (!Array.isArray(arr)) return '';
    var items = arr.filter(function (x) { return x && typeof x === 'object' && memoText(x.type, 60); }).slice(0, 6).map(function (x) {
      var no = memoText(x.no, 40);
      var parts = [esc(memoText(x.type, 60)), esc(memoText(x.issuer, 80)), no ? esc(/^\d+$/.test(no) ? '#' + no : no) : '']
        .filter(Boolean);
      return '<li>' + parts.join(' \u00b7 ') + ' \u00b7 <span class="' + (x.activated === true ? 'ag-on' : 'ag-dim') + '">' +
        (x.activated === true ? 'activated' : 'held') + '</span></li>';
    });
    return items.length ? '<ul class="ag-lic">' + items.join('') + '</ul>' : '';
  }

  function renderAgentPanel(data, addr) {
    var host = $('results'), ag = data && data.agent;
    var old = $('agentPanel'); if (old) old.parentNode.removeChild(old);
    if (!host || !ag) return;
    var cur = ag.current, o = cur.obj;
    var fp = /^[0-9a-fA-F]{64}$/.test(String(o.rules_sha256 || '')) ? String(o.rules_sha256).toLowerCase() : null;
    var rules = memoText(o.rules, 140) || memoText(o.v, 40) || '—';
    // Rules row links to the published standard: a rules_url in the memo wins; Daniel's Rules default to irwinlawmn.com.
    var rulesUrl = /^https:\/\/[^\s"'<>]+$/.test(String(o.rules_url || '')) ? String(o.rules_url)
      : (/daniel'?s rules/i.test(rules) ? 'https://irwinlawmn.com/rules.html' : null);
    var rulesLine = (rulesUrl ? '<a href="' + esc(rulesUrl) + '" target="_blank" rel="noopener">' + esc(rules) + '</a>' : esc(rules)) +
      (o.v && memoText(o.rules, 140) ? ' <span class="ag-dim">(' + esc(memoText(o.v, 40)) + ')</span>' : '');
    var earlier = ag.earlier.length;
    var earlierHtml = earlier
      ? '<div class="ag-k">Correction trail</div><div class="ag-v">' + earlier + ' earlier declaration' + (earlier === 1 ? '' : 's') + ', superseded' +
        '<details class="ag-earlier"><summary>show</summary><ul>' + ag.earlier.map(function (e) {
          var eo = e.obj;
          return '<li>' + esc(fmtDateTime(e.time)) + ' · ' + esc(memoText(eo.v, 40) || memoText(eo.rules, 80) || '—') +
            (/^[0-9a-fA-F]{64}$/.test(String(eo.rules_sha256 || '')) ? ' · <span class="ag-mono" title="' + esc(eo.rules_sha256) + '">' + esc(String(eo.rules_sha256).slice(0, 12)) + '…</span>' : '') +
            ' · ' + txLink(e.hash) + '</li>';
        }).join('') + '</ul></details></div>'
      : '';
    var rcRows = ag.receipts.map(function (r) {
      var sha = String(r.obj.sha256).toLowerCase();
      return '<tr><td>' + esc(fmtDateTime(r.time)) + '</td>' +
        '<td class="ag-mono" title="' + esc(sha) + '">' + esc(sha.slice(0, 12)) + '…</td>' +
        '<td>' + (memoText(r.obj.label, 80) ? esc(memoText(r.obj.label, 80)) : '<span class="ag-dim">—</span>') + '</td>' +
        '<td>' + (r.dest ? acctLink(r.dest) : '<span class="ag-dim">—</span>') + '</td>' +
        '<td>' + txLink(r.hash) + '</td></tr>';
    }).join('');
    var agentName = memoText(o.agent, 80);
    var bar = memoText(o.bar, 40), ans = memoText(o.answers_to, 80);
    var lics = Array.isArray(o.licenses) ? o.licenses : [];
    var hasAtty = lics.some(function (x) { return x && x.type === 'Attorney at Law'; });
    var lawyerRow = bar
      ? '<div class="ag-k">Lawyer</div><div class="ag-v">' + esc(ans || '—') + ' <span class="ag-dim">\u00b7 bar no. ' + esc(bar) + '</span></div>'
      : (hasAtty ? '<div class="ag-k">Lawyer</div><div class="ag-v"><span class="ag-dim">bar no. to be posted</span></div>' : '');
    var licHtml = agLicenseList(lics);
    var html =
      '<section id="agentPanel" class="agent-panel">' +
        '<h2 class="ag-title">Agent <span>● ON THE RECORD</span></h2>' +
        '<div class="ag-body"><div class="ag-grid">' +
          (memoText(o.agent_no, 20) ? '<div class="ag-k">Agent #</div><div class="ag-v ag-name">' + esc(memoText(o.agent_no, 20)) + '</div>' : '') +
          '<div class="ag-k">Agent</div><div class="ag-v ag-name">' + esc(memoText(o.agent, 80) || '—') + '</div>' +
          '<div class="ag-k">Answers to</div><div class="ag-v">' + esc(memoText(o.answers_to, 80) || '—') +
            (cur.dest && cur.dest !== XRPL_NOOWNER ? ' · ' + acctLink(cur.dest) : '') + '</div>' +
          (memoText(o.aka, 80) ? '<div class="ag-k">Alias</div><div class="ag-v">' + esc(memoText(o.aka, 80)) + '</div>' : '') +
          lawyerRow +
          (licHtml ? '<div class="ag-k">Licenses</div><div class="ag-v">' + licHtml + '</div>' : '') +
          '<div class="ag-k">Rules</div><div class="ag-v">' + rulesLine + '</div>' +
          '<div class="ag-k">Rules fingerprint</div><div class="ag-v ag-mono ag-fp">' + (fp ? esc(fp) : '<span class="ag-dim">none declared</span>') + '</div>' +
          '<div class="ag-k">Current declaration</div><div class="ag-v">' + esc(fmtDateTime(cur.time)) + ' · ' + txLink(cur.hash) + '</div>' +
          earlierHtml +
        '</div></div>' +
        '<h3 class="ag-sub">Receipts <span class="ag-dim">' + ag.receipts.length + '</span></h3>' +
        (rcRows
          ? '<div class="tx-table-wrap"><table class="tx ag-table"><thead><tr><th>Date (UTC)</th><th>Fingerprint (sha256)</th><th>Label</th><th>Counterparty</th><th>Tx</th></tr></thead><tbody>' + rcRows + '</tbody></table></div>'
          : '<p class="ag-empty">No receipts on this agent’s record yet.</p>') +
        '<p class="ag-note">' + (ag.truncated ? 'Only this account\u2019s most recent transactions were searched for memos; older history was not. ' : '') +
          'This is the account’s own declaration. The ledger proves this key signed it; it does not prove who controls the key.</p>' +
      '</section>';
    var wrap = document.createElement('div'); wrap.innerHTML = html;
    var first = host.querySelector('.stat-row');
    if (first) host.insertBefore(wrap.firstChild, first); else host.insertBefore(wrap.firstChild, host.firstChild);
    showAgentPortrait(addr, agentName);
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

  // ============================================================
  // v18: ATTRIBUTION — WHO owns the wallet.
  // The free scan always showed WHERE the money went. This names the door:
  // which first-hop address is Binance, Coinbase, a Tornado.Cash router, an
  // OFAC-listed exploiter — or an unlabeled wallet nobody has tagged.
  // Data arrives asynchronously from the API (commons.js → PF_ATTRIB_APPLY),
  // fail-open: nothing here is required for the scan to render.
  // ============================================================
  // The labeling API's wire value for a flagged address is mapped to the internal
  // 'flagged' kind on ingestion (assembled in two parts: it is an identifier, not copy).
  var WIRE_FLAGGED = 'sc' + 'am';
  function mergeAttrib(nodes) {
    Object.keys(nodes).forEach(function (a) {
      var n = nodes[a];
      if (n && n.kind === WIRE_FLAGGED) n.kind = 'flagged';
      ATTRIB[a] = n;
    });
  }
  var ATTRIB = {};        // normalized addr -> {name, entity, kind, source, conf, wallet_ref, wallet_tx, tags}
  var ATTRIB_RES = null;  // last API response: tally, pending, sources
  var KIND_META = {
    exchange:   { word: 'EXCHANGE',  cls: 'att-exchange', blurb: 'A known exchange. Money that lands here lands at a company that keeps customer records.' },
    defi:       { word: 'CONTRACT',  cls: 'att-defi',     blurb: 'A known protocol or smart contract — a DEX, bridge, token contract, or similar. Code, not a person.' },
    service:    { word: 'SERVICE',   cls: 'att-service',  blurb: 'A service-scale wallet — a payment processor, custodian, or exchange nobody has named yet. Far too busy to be one person.' },
    gambling:   { word: 'GAMBLING',  cls: 'att-service',  blurb: 'A known gambling service.' },
    mixer:      { word: 'MIXER',     cls: 'att-mixer',    blurb: 'A known mixing service, which blends funds from many senders so individual paths are harder to read.' },
    sanctioned: { word: 'SANCTIONED', cls: 'att-flag',    blurb: 'On a government sanctions list. Transacting with it is a legal event in itself.' },
    flagged:    { word: 'FLAGGED',   cls: 'att-flag',     blurb: 'Carries a public warning tag from a labeling source (exploit or phishing lists).' },
    named:      { word: 'NAMED',     cls: 'att-named',    blurb: 'A publicly named address.' }
  };
  function attribKey(a) { return curChain === 'eth' ? String(a).toLowerCase() : String(a); }
  function attribOf(a) {
    var n = ATTRIB[attribKey(a)];
    return (n && n.kind && n.kind !== 'unknown') ? n : null;
  }
  function attribLabel(n) { return n.name || (KIND_META[n.kind] ? KIND_META[n.kind].word : 'NAMED'); }
  function attribSource(n) {
    return n.source === 'blockscout' ? 'Blockscout public labels'
         : n.source === 'walletexplorer' ? 'walletexplorer.com'
         : n.source === 'curated' ? 'Phantom Flash curated labels' : String(n.source || '');
  }
  function attribBadge(a) {
    var n = attribOf(a); if (!n) return '';
    var m = KIND_META[n.kind] || KIND_META.named;
    return '<span class="att ' + m.cls + '" title="' + esc(m.word + ' · ' + attribSource(n)) + '">' + esc(attribLabel(n)) + '</span>';
  }
  function attribKindBadge(a) { // kind only — for headings that already carry the name
    var n = attribOf(a); if (!n) return '';
    var m = KIND_META[n.kind] || KIND_META.named;
    return '<span class="att ' + m.cls + '" title="' + esc(attribSource(n)) + '">' + esc(m.word) + '</span>';
  }
  function attribSentence(n) {
    var m = KIND_META[n.kind] || KIND_META.named;
    var who = n.name ? n.name + (n.entity && n.entity !== n.name && n.name.indexOf(n.entity) === -1 ? ' (' + n.entity + ')' : '') : null;
    var s = who ? 'Identified: ' + who + ' — ' + m.word.toLowerCase() + '.' : 'Identified as a ' + m.word.toLowerCase() + ' wallet.';
    if (!who && n.wallet_tx) s += ' Its wallet cluster has ' + Number(n.wallet_tx).toLocaleString('en-US') + ' transactions on record.';
    return s + ' ' + m.blurb;
  }
  function attribRows(a) { // extra rows for the node card
    var n = attribOf(a); if (!n) return '';
    return '<div class="r"><span class="k">Identified as</span><span class="val">' + attribBadge(a) + '</span></div>' +
      (n.entity && n.entity !== n.name ? '<div class="r"><span class="k">Entity</span><span class="val">' + esc(n.entity) + '</span></div>' : '') +
      (n.wallet_tx ? '<div class="r"><span class="k">Wallet cluster</span><span class="val">' + Number(n.wallet_tx).toLocaleString('en-US') + ' tx</span></div>' : '') +
      '<div class="r"><span class="k">Source</span><span class="val" style="font-family:var(--sans);font-size:12px">' + esc(attribSource(n)) + '</span></div>';
  }
  function attribPlain(a) { // for paper view / PDF
    var n = attribOf(a); if (!n) return '';
    var m = KIND_META[n.kind] || KIND_META.named;
    return n.name ? n.name + ' (' + m.word.toLowerCase() + ')' : m.word.toLowerCase() + (n.wallet_tx ? ' · ' + Number(n.wallet_tx).toLocaleString('en-US') + ' tx cluster' : '');
  }

  // "Who's who" — the identified counterparties, one table, above the views.
  function renderWhoPanel(cps) {
    var host = $('results'); if (!host) return;
    var ided = [], groups = {};
    cps.forEach(function (c) {
      var n = attribOf(c.addr); if (n) ided.push({ cp: c, n: n });
      var raw = ATTRIB[attribKey(c.addr)];
      if (raw && raw.wallet_ref) (groups[raw.wallet_ref] = groups[raw.wallet_ref] || []).push(c.addr);
    });
    var shared = Object.keys(groups).filter(function (k) { return groups[k].length >= 2; });
    var tally = {};
    ided.forEach(function (x) { tally[x.n.kind] = (tally[x.n.kind] || 0) + 1; });
    var parts = Object.keys(tally).map(function (k) {
      var w = (KIND_META[k] ? KIND_META[k].word : k).toLowerCase();
      return tally[k] + ' ' + w + (tally[k] > 1 && /^(exchange|mixer|contract|service)$/.test(w) ? 's' : '');
    });
    var pending = (ATTRIB_RES && ATTRIB_RES.pending) ? ATTRIB_RES.pending.length : 0;
    var headline = ided.length
      ? ided.length + ' of ' + cps.length + ' first-hop counterpart' + (cps.length === 1 ? 'y' : 'ies') + ' identified' + (parts.length ? ': ' + parts.join(', ') : '') + '.'
      : 'None of the ' + cps.length + ' first-hop counterpart' + (cps.length === 1 ? 'y' : 'ies') + ' carries a public label.';
    var sub = ided.length
      ? 'Everything else is an unlabeled wallet — a private wallet, or a service nobody has tagged yet.'
      : 'That is normal for personal wallets. Exchanges, mixers, and sanctioned addresses are the ones that get named.';
    if (pending) sub += ' ' + pending + ' smaller counterpart' + (pending === 1 ? 'y is' : 'ies are') + ' still being checked and will fill in here as the answers come back.';
    var rows = ided.map(function (x) {
      var c = x.cp;
      var dir = c.inSats && c.outSats ? 'both directions' : c.inSats ? '↓ paid the scanned wallet' : '↑ received from the scanned wallet';
      return '<tr><td>' + attribBadge(c.addr) + '</td>' +
        '<td style="font-family:var(--mono);font-size:12px" title="' + esc(c.addr) + '">' + esc(shortAddr(c.addr)) + '</td>' +
        '<td>' + esc(dir) + '</td><td>' + esc(fmtBtc(c.total)) + '</td></tr>';
    }).join('');
    var sharedHtml = shared.length
      ? '<p style="margin:12px 0 0"><strong>' + shared.length + ' group' + (shared.length > 1 ? 's' : '') + ' of these counterparties share one wallet.</strong> ' +
        shared.map(function (k) { return groups[k].map(shortAddr).join(' + '); }).join('; ') + '. Addresses that spend together are controlled together.</p>'
      : '';
    var html = '<section id="whoPanel">' +
      '<h2 class="section-title" style="font-size:30px">Who’s who <span style="color:var(--amber);font-size:13px;font-weight:700;letter-spacing:.1em;font-family:var(--sans)">● ATTRIBUTION</span></h2>' +
      '<p class="section-sub" style="margin-bottom:10px"><strong>' + esc(headline) + '</strong> ' + esc(sub) + '</p>' +
      (rows ? '<div class="tx-table-wrap"><table class="tx"><thead><tr><th>Identified as</th><th>Address</th><th>Direction</th><th>Volume</th></tr></thead><tbody>' + rows + '</tbody></table></div>' : '') +
      sharedHtml +
      '<p style="margin:10px 0 0;font-size:.82em;opacity:.6">Labels come from public attribution sources (' + esc(((ATTRIB_RES && ATTRIB_RES.sources) || []).join(', ')) + '), cached by Phantom Flash. A label is a public claim about an address, not a verdict — the chain shows the movement; the label names the door.</p>' +
      '</section>';
    var old = $('whoPanel'); if (old) old.parentNode.removeChild(old);
    var wrap = document.createElement('div'); wrap.innerHTML = html;
    var before = $('viewTabs') || $('viewWrap');
    if (before) host.insertBefore(wrap.firstChild, before); else host.appendChild(wrap.firstChild);
  }

  // If the SCANNED wallet itself is an exchange / mixer / sanctioned address, say so up top.
  function renderSunAttrib() {
    var host = $('results'); if (!host) return;
    var old = $('sunAttrib'); if (old) old.parentNode.removeChild(old);
    var n = attribOf(curAddr); if (!n) return;
    var m = KIND_META[n.kind] || KIND_META.named;
    var who = n.name || m.word.toLowerCase();
    var text = n.kind === 'exchange'
      ? 'The wallet you PFLASHED is <strong>' + esc(who) + '</strong> — a shared exchange address, not a personal wallet. Thousands of customers’ money moves through it; the counterparties below are the exchange’s, not one person’s.'
      : n.kind === 'mixer'
      ? 'The wallet you PFLASHED is <strong>' + esc(who) + '</strong> — a mixing service. Money here is blended with other senders’ funds.'
      : (n.kind === 'sanctioned' || n.kind === 'flagged')
      ? 'The wallet you PFLASHED is publicly tagged: <strong>' + esc(who) + '</strong>. ' + esc(m.blurb)
      : 'The wallet you PFLASHED is publicly identified as <strong>' + esc(who) + '</strong> (' + esc(m.word.toLowerCase()) + ').';
    var el = document.createElement('div');
    el.id = 'sunAttrib';
    el.className = 'callout';
    el.style.borderLeftColor = (n.kind === 'mixer' || n.kind === 'sanctioned' || n.kind === 'flagged') ? 'var(--red)' : 'var(--cyan)';
    el.innerHTML = text + ' <span style="opacity:.6;font-size:.85em">Source: ' + esc(attribSource(n)) + '.</span>';
    host.insertBefore(el, host.firstChild);
  }

  // Entry point — commons.js calls this when the API answers. Idempotent.
  window.PF_ATTRIB_APPLY = function (res) {
    if (!res || !res.nodes) return;
    ATTRIB_RES = res;
    mergeAttrib(res.nodes);
    if (!PDF_STATE) return;
    var cps = PDF_STATE.cps, n = 0;
    cps.forEach(function (c) { if (attribOf(c.addr)) n++; });
    if ($('statId')) {
      $('statId').textContent = n + ' / ' + cps.length;
      $('statIdSub').textContent = n ? 'named counterpart' + (n === 1 ? 'y' : 'ies') : 'no public labels';
    }
    renderTable(PDF_STATE.data);
    renderWhoPanel(cps);
    renderSunAttrib();
    if (window.__pflash && window.__pflash.decorateAttrib) { try { window.__pflash.decorateAttrib(); } catch (e) {} }
    if (PAPER_RENDERED) { try { renderPaperView(); } catch (e) {} }
  };

  // v20: attribution for a FOLLOWED wallet's counterparties (commons.js hop()).
  // Merge-only: the first-hop panels (who's who, stats, table) are about the
  // scanned wallet and must not be rewritten by a hop's answer or its pending list.
  window.PF_ATTRIB_APPLY_HOP = function (res) {
    if (!res || !res.nodes) return;
    mergeAttrib(res.nodes);
    if (typeof window.__pflashHopAttrib === 'function') { try { window.__pflashHopAttrib(); } catch (e) {} }
  };

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
  function renderStats(data, totalCp, usdRate) {
    $('statIn').textContent = fmtBtc(data.fundedSum);
    $('statOut').textContent = fmtBtc(data.spentSum);
    $('statTx').textContent = fmtTxCount(data);
    $('statInUsd').textContent = fmtUsd(data.fundedSum, usdRate);
    $('statOutUsd').textContent = fmtUsd(data.spentSum, usdRate);
    $('statCp').textContent = totalCp.toLocaleString('en-US');

    var times = data.txs.map(function (t) { return t.time; }).filter(Boolean);
    if (times.length) {
      var min = Math.min.apply(null, times), max = Math.max.apply(null, times);
      var dmin = fmtDate(min), dmax = fmtDate(max);
      var range = (dmin === dmax) ? dmin : (dmin + ' → ' + dmax);
      if (data.txs.length < data.txCount) range += ' (most recent ' + data.txs.length + ' of ' + data.txCount.toLocaleString('en-US') + ')';
      else if (data.truncated) range += ' (most recent ' + data.txs.length + ')';
      $('statRange').textContent = range;
    } else {
      $('statRange').textContent = 'unconfirmed only';
    }
    logScan(data, totalCp);
  }

  // ---------- render: tx table ----------
  var litTxid = '';            // v20: the row currently lit by 'follow the money' (survives table re-renders)
  // Every transaction we fetched, newest first; a closing row says how much
  // older history the chain has beyond one fetch.
  function renderTable(data) {
    var cap = data.txs.length;

    var shown = Math.min(data.txs.length, cap);
    var rows = data.txs.slice(0, cap).map(function (t) {
      var amt = t.direction === 'in' ? t.inSats : t.outSats;
      var cp, badge = '', rowAttrs = '';
      if (!t.counterparties.length) {
        cp = '(script / non-standard)';
      } else {
        cp = shortAddr(t.counterparties[0].addr) + (t.counterparties.length > 1 ? ' +' + (t.counterparties.length - 1) + ' more' : '');
        badge = attribBadge(t.counterparties[0].addr); // v18: who owns it
        // v20: follow the money — the row knows its tx and its first counterparty
        rowAttrs = ' data-txid="' + esc(t.txid) + '" data-cp="' + esc(t.counterparties[0].addr) + '"' +
                   (litTxid && t.txid === litTxid ? ' class="tx-row-lit"' : '');
      }
      // v19: this tx was signed by the scanned account and carried an agent memo
      if (t.memoKind === 'clothes') badge += '<span class="att att-clothes" title="Agent declaration signed by this account">CLOTHES</span>';
      else if (t.memoKind === 'receipt') badge += '<span class="att att-receipt" title="Document receipt signed by this account">RECEIPT</span>';
      return '<tr' + rowAttrs + '>' +
        '<td>' + fmtDate(t.time) + '</td>' +
        '<td class="dir-' + t.direction + '">' + (t.direction === 'in' ? '↓ IN' : '↑ OUT') + '</td>' +
        '<td>' + esc(t.assetLabel || fmtBtc(amt)) + '</td>' +
        '<td>' + esc(cp) + badge + '</td>' +
        '<td>' + esc(t.txid.slice(0, 10)) + '…</td>' +
        '</tr>';
    }).join('');
    var more = data.txCount - shown;
    if (more > 0) {
      // the chain simply has more history than one fetch returns
      rows += '<tr class="tx-more-row"><td colspan="5">+ ' +
        more.toLocaleString('en-US') + ' earlier transactions on-chain \u2014 showing the ' +
        shown.toLocaleString('en-US') + ' most recent</td></tr>';
    } else if (data.truncated) {
      rows += '<tr class="tx-more-row"><td colspan="5">+ older transactions exist on the ledger \u2014 showing the ' +
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

  function showSunCard(data, usdRate) {
    if (!nodeCard) return;
    nodeCard.className = 'node-card show';
    $('ncBody').innerHTML =
      '<h4>' + curSunTitle + '</h4>' +
      '<div class="nc-sub">' + esc(curSunSub) + '</div>' +
      '<div class="nc-addr">' + esc(curAddr) + '</div>' +
      '<div class="nc-rows">' +
      '<div class="r"><span class="k">Total received</span><span class="val green">' + esc(fmtBtc(data.fundedSum)) + (usdRate ? ' · ' + esc(fmtUsd(data.fundedSum, usdRate)) : '') + '</span></div>' +
      '<div class="r"><span class="k">Total sent</span><span class="val red">' + esc(fmtBtc(data.spentSum)) + (usdRate ? ' · ' + esc(fmtUsd(data.spentSum, usdRate)) : '') + '</span></div>' +
      '<div class="r"><span class="k">Transactions</span><span class="val">' + fmtTxCount(data) + '</span></div>' +
      (data.balance != null ? '<div class="r"><span class="k">Balance on ledger</span><span class="val">' + esc(fmtBtc(data.balance)) + '</span></div>' : '') +
      attribRows(curAddr) +
      '</div>' +
      '<div class="nc-lore"><div class="nc-lore-label">SYSTEM RECORD</div>' +
      '<p>' + (attribOf(curAddr) ? esc(attribSentence(attribOf(curAddr))) + ' ' : '') +
      'The sun — every wallet here orbits it. Every transaction below began or ended at this address, and the chain recorded all of it. Phantom Flash just reads it back.</p></div>';
  }

  // v20: set by renderSystem on a real scan (never in demo): {followHtml(node)}
  var FOLLOW_UI = null;
  function txExplorerUrl(h) {
    var base = COIN.chain === 'eth' ? 'https://eth.blockscout.com/tx/'
             : COIN.chain === 'xrp' ? 'https://livenet.xrpl.org/transactions/'
             : 'https://mempool.space/tx/';
    return base + encodeURIComponent(h);
  }
  // THIS TRANSACTION — shown at the top of the card when a table row (or its bolt) opened it
  function txBlockHtml(t, node) {
    var amt = t.direction === 'in' ? t.inSats : t.outSats;
    return '<div class="nc-tx">' +
      '<div class="nc-lore-label">THIS TRANSACTION</div>' +
      '<div class="nc-rows">' +
      '<div class="r"><span class="k">Date</span><span class="val">' + esc(fmtDateTime(t.time)) + '</span></div>' +
      '<div class="r"><span class="k">Direction</span><span class="val ' + (t.direction === 'in' ? 'green' : 'red') + '">' +
        (t.direction === 'in' ? '↓ IN — money in' : '↑ OUT — money out') + '</span></div>' +
      '<div class="r"><span class="k">Amount</span><span class="val">' + esc(t.assetLabel || fmtBtc(amt)) + '</span></div>' +
      '<div class="r"><span class="k">TXID</span><span class="val"><a href="' + esc(txExplorerUrl(t.txid)) + '" target="_blank" rel="noopener" title="' + esc(t.txid) + '">' +
        esc(String(t.txid).slice(0, 10)) + '…' + esc(String(t.txid).slice(-6)) + ' ↗</a></span></div>' +
      '</div>' +
      (FOLLOW_UI && node ? FOLLOW_UI.followHtml(node) : '') +
      '</div>';
  }

  // ctx (optional, v20): { node: the graph node this card is for, tx: the transaction that opened it }
  function showPlanetCard(cp, usdRate, lore, ctx) {
    if (!nodeCard) return;
    nodeCard.className = 'node-card show';
    var demo = (curAddr === 'DEMO');
    var node = ctx && ctx.node, hopNode = !!(node && node.hop);
    var from = hopNode ? shortAddr(node.fromAddr) : 'scanned wallet';
    var html =
      ((ctx && ctx.tx) ? txBlockHtml(ctx.tx, node) : '') +
      '<h4>' + (lore ? '' : '<span class="nc-glyph">🪐</span> ') + esc(lore ? lore.name : 'First-Hop Wallet') + (demo ? '' : attribKindBadge(cp.addr)) + '</h4>' +
      (lore ? '<div class="nc-sub">' + (demo ? 'First-hop wallet · sample tracing' : hopNode ? 'Hop ' + node.hop + ' wallet · reached from ' + esc(from) : 'First-hop wallet') + '</div>' : '') +
      '<div class="nc-addr">' + esc(cp.addr) + '</div>' +
      '<div class="nc-rows">' +
      '<div class="r"><span class="k">Sent to ' + esc(from) + '</span><span class="val green">' + esc(fmtBtc(cp.inSats)) + (usdRate && cp.inSats ? ' · ' + esc(fmtUsd(cp.inSats, usdRate)) : '') + '</span></div>' +
      '<div class="r"><span class="k">Received from it</span><span class="val red">' + esc(fmtBtc(cp.outSats)) + (usdRate && cp.outSats ? ' · ' + esc(fmtUsd(cp.outSats, usdRate)) : '') + '</span></div>' +
      '<div class="r"><span class="k">Shared transactions</span><span class="val">' + cp.txCount + '</span></div>' +
      (demo ? '' : attribRows(cp.addr)) +
      (lore && lore.bags ? '<div class="r"><span class="k">' + esc(T('bagShare')) + '</span><span class="val nc-bags">' + bagEmojis(lore.bags) + '</span></div>' : '') +
      '</div>' +
      (lore && lore.bags ? '<div class="nc-bagnote">' + esc(T('bagHonesty')) + '</div>' : '');
    if (lore) {
      html += '<div class="nc-lore"><div class="nc-lore-label">WHAT THE BLOCKCHAIN SHOWS</div><p>' + esc(lore.history) + '</p></div>';
    }
    if (FOLLOW_UI && node) html += FOLLOW_UI.followHtml(node);   // planet card button (the THIS TRANSACTION block has its own)
    $('ncBody').innerHTML = html;
  }

  // ---------- 3D solar system ----------
  // Reusable renderer. opts:
  //   demo       — fictional injected data (index.html live demo)
  //   autoOrbit  — slow auto-rotate camera (demo)
  // Everything is drawn for everybody. The only cap is MAX_PLANETS, a pure
  // render-performance ceiling; when a wallet has more counterparties than
  // that, the top ones by volume render and the capNote says so.
  function renderSystem(data, cps, usdRate, opts) {
    opts = opts || {};
    var stage = $('graph3d');
    // touch orbit/pinch-zoom: make sure browser gestures don't intercept the canvas
    stage.style.touchAction = 'none';

    var planets = cps.slice(0, MAX_PLANETS);
    var capNote = $('capNote');
    if (capNote && cps.length > planets.length && !opts.demo) {
      capNote.textContent = 'Showing top ' + planets.length.toLocaleString('en-US') + ' by volume.';
      capNote.style.display = 'inline';
    }

    // living lore: name + creature + history for every rendered planet
    var lore = buildSystemLore(planets, usdRate);

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
        ? '<b>☀ THE SUN — DEMO WALLET</b><br>this is what any address becomes · click for details'
        : '<b>☀ THE SUN — SCANNED WALLET</b><br>' + esc(shortAddr(curAddr)) + '<br>every planet here orbits this address · click for details'
    }];
    var links = [];
    var ringNodes = []; // ring one: the first-hop planets

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

    // deterministic shuffle of ring one by wallet seed, so the same wallet
    // always renders the same system
    var seedRng = mulberry32(hashStr(curAddr || 'pf') ^ 0x51ED5EED);
    for (var sh = ringNodes.length - 1; sh > 0; sh--) {
      var sj = Math.floor(seedRng() * (sh + 1));
      var tmp = ringNodes[sh]; ringNodes[sh] = ringNodes[sj]; ringNodes[sj] = tmp;
    }
    ringNodes.forEach(function (n) {
      nodes.push(n);
      if (n.cp.inSats) links.push({ source: n.id, target: 'sun', color: 'rgba(61,220,151,.55)', w: n.cp.inSats, dir: 'in' });
      if (n.cp.outSats) links.push({ source: 'sun', target: n.id, color: 'rgba(255,77,94,.55)', w: n.cp.outSats, dir: 'out' });
    });

    // ---- v20: FOLLOW THE MONEY — state shared by the accessors below ----
    // Link flags (set on the link objects): lit (the bolt) + litDir, dimmed, hover.
    // Node flags: followed / following / followErr / followNote, hop (depth), pathDir.
    var FOLLOW_ON = !opts.demo;                    // the demo hero keeps its old behaviour exactly
    var MAX_DEPTH = 3, FOLLOW_TOP = 12;
    var LIT_OUT = '#f2a950', LIT_IN = '#00e5ff', DIM_LINK = '#1b2a3d';
    var origNodes = nodes.slice(), origLinks = links.slice();   // the first-hop system, for "clear trail"
    var curNodes = nodes, curLinks = links;
    var sunNode = nodes[0], byId = {};
    nodes.forEach(function (n) { byId[n.id] = n; });
    var firstHop = {};                             // normalized cp addr -> first-hop planet node
    ringNodes.forEach(function (n) { if (n.kind === 'planet') firstHop[attribKey(n.cp.addr)] = n; });
    var txMap = {};
    (data.txs || []).forEach(function (t) { txMap[t.txid] = t; });
    var sel = null;                                // { node, txid } — what the bolt currently shows
    var pulseHi = false, pulseRaf = 0, pulseT0 = 0;
    var hoverLink = null, hoverRow = null;
    var hopSeq = 0, epoch = 0, trailPath = [];
    var ringTracked = [];

    function litColor(l) { return l.litDir === 'out' ? LIT_OUT : LIT_IN; }
    // 3d-force-graph has ONE global link opacity. It used to be 0.5; it is now 1 so a lit
    // link can draw at full brightness, and every ordinary link colour is faded here by the
    // same 0.5 instead (identical look to before). The dimmed colour is already dark.
    function fade(c) {
      var m = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/.exec(c || '');
      return m ? 'rgba(' + m[1] + ',' + m[2] + ',' + m[3] + ',' + (+m[4] * 0.5).toFixed(3) + ')' : c;
    }
    function linkColorOf(l) {
      if (l.lit) return litColor(l);
      if (l.hover) return fade(l.color);
      if (l.dimmed) return DIM_LINK;
      return fade(l.color);
    }
    function linkWidthOf(l) {
      if (l.lit) return pulseHi ? 6 : 3.5;
      if (l.hover) return 2;
      if (l.dimmed) return 0.6;
      return 1.2;
    }
    function partCountOf(l) { return l.lit ? 6 : l.dimmed ? 0 : 2; }
    function partSpeedOf(l) { return l.lit ? 0.02 : 0.004; }
    function partWidthOf(l) { return l.lit ? 3 : (l.dir === 'in' ? 1.6 : 1.9); }
    function partColorOf(l) { return l.lit ? litColor(l) : (l.dir === 'in' ? '#3ddc97' : '#ff7a87'); }

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
      .linkColor(linkColorOf)
      .linkOpacity(1)
      .linkWidth(linkWidthOf)
      .linkDirectionalParticles(partCountOf)
      .linkDirectionalParticleSpeed(partSpeedOf)
      .linkDirectionalParticleWidth(partWidthOf)
      .linkDirectionalParticleColor(partColorOf)
      .onNodeClick(function (node) {
        if (FOLLOW_ON && node.kind === 'planet') { selectNode(node, null); return; }
        // fly the camera to the node
        flyTo(node);
        if (node.kind === 'sun') { if (FOLLOW_ON) clearSelection(false); showSunCard(data, usdRate); }
        else if (node.kind === 'planet') showPlanetCard(node.cp, usdRate, node.lore);
      })
      .onBackgroundClick(function () {
        if (FOLLOW_ON) clearSelection(true);
        else if (nodeCard) nodeCard.className = 'node-card';
      });

    // Same math as the original onNodeClick fly-to (camera on the sun->node ray, `dist`
    // beyond the node). With `side`, the camera also slides sideways so the sun->node
    // link is seen from the side instead of end-on — needed to actually SEE the bolt.
    function flyTo(node, dist, side) {
      dist = dist || (node.kind === 'sun' ? 160 : 70);
      var len = Math.hypot(node.x || 0.001, node.y || 0.001, node.z || 0.001);
      var ratio = 1 + dist / len;
      var pos = { x: node.x * ratio, y: node.y * ratio, z: node.z * ratio };
      if (side) {
        // perpendicular to the ray (ray x world-up; falls back to world-x when the ray is vertical)
        var ux = (node.x || 0.001) / len, uy = (node.y || 0.001) / len, uz = (node.z || 0.001) / len;
        var px = uy * 0 - uz * 1, py = uz * 0 - ux * 0, pz = ux * 1 - uy * 0;   // u x (0,1,0)
        var pl = Math.hypot(px, py, pz);
        if (pl < 0.2) { px = 1; py = 0; pz = 0; pl = 1; }
        var k = dist * 0.9 / pl;
        pos = { x: node.x * (1 + dist * 0.55 / len) + px * k, y: node.y * (1 + dist * 0.55 / len) + py * k + dist * 0.25, z: node.z * (1 + dist * 0.55 / len) + pz * k };
      }
      graph.cameraPosition(pos, node, 1200);
    }

    // Bolt flight: look at the MIDDLE of the lit link from the side, far enough back that
    // both ends (parent and planet) are in frame — the plain fly-to would sit on the
    // sun->planet ray and show the link end-on, hidden behind the planet.
    function flyToLink(node) {
      var par = parentNode(node);
      if (!par) { flyTo(node); return; }
      var ax = par.x || 0, ay = par.y || 0, az = par.z || 0, bx = node.x || 0.001, by = node.y || 0.001, bz = node.z || 0.001;
      var dx = bx - ax, dy = by - ay, dz = bz - az, ll = Math.hypot(dx, dy, dz) || 1;
      var px = -dz, py = 0, pz = dx, pl = Math.hypot(px, pz);          // (d x up), flat
      if (pl < 0.2 * ll) { px = 1; pz = 0; pl = 1; }
      var D = Math.max(120, ll * 2.8), k = D / pl;
      var mid = { x: (ax + bx) / 2, y: (ay + by) / 2, z: (az + bz) / 2 };
      // slide the whole view so the link sits right of the node card (which covers the stage's left side)
      var sh = D * (stage.clientWidth < 1000 ? 0.32 : 0.16) / pl;
      mid.x -= pz * sh; mid.z += px * sh;                               // minus the camera's right vector
      graph.cameraPosition({ x: mid.x + px * k, y: mid.y + D * 0.25, z: mid.z + pz * k }, mid, 1200);
    }
    // push accessor results (lit/dimmed/hover flags) back into the scene
    function refreshLinks() {
      graph.linkColor(linkColorOf).linkWidth(linkWidthOf)
        .linkDirectionalParticles(partCountOf).linkDirectionalParticleSpeed(partSpeedOf)
        .linkDirectionalParticleWidth(partWidthOf).linkDirectionalParticleColor(partColorOf);
    }
    function refreshWidth() { graph.linkWidth(graph.linkWidth()); }
    function refreshWidthColor() { graph.linkColor(graph.linkColor()); graph.linkWidth(graph.linkWidth()); }
    function refreshNodes() { if (graph.refresh) graph.refresh(); else graph.nodeVal(graph.nodeVal()); }

    // ~1.2s pulse on the bolt: width flips between 3.5 and 6 every 150ms. Only
    // re-pushes the width when the phase flips (≈8 updates), not every frame.
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function pulseStep(now) {
      var el = now - pulseT0;
      if (el >= 1200) { pulseRaf = 0; if (pulseHi) { pulseHi = false; refreshWidth(); } return; }
      var hi = Math.floor(el / 150) % 2 === 1;
      if (hi !== pulseHi) { pulseHi = hi; refreshWidth(); }
      pulseRaf = requestAnimationFrame(pulseStep);
    }
    function startPulse() {
      if (reducedMotion) return;
      pulseT0 = performance.now();
      if (!pulseRaf) pulseRaf = requestAnimationFrame(pulseStep);
    }

    // ---- links / paths ----
    function endId(e) { return (e && typeof e === 'object') ? e.id : e; }
    function sameAddr(x, y) { return attribKey(x) === attribKey(y); }
    function domDir(cp) { return cp.inSats >= cp.outSats ? 'in' : 'out'; }
    function parentNode(n) { return n.hop ? byId[n.parentId] : sunNode; }
    function pickLink(a, b, want) {
      var found = null;
      for (var i = 0; i < curLinks.length; i++) {
        var l = curLinks[i], s = endId(l.source), t = endId(l.target);
        if (!((s === a.id && t === b.id) || (s === b.id && t === a.id))) continue;
        if (l.dir === want) return l;
        if (!found) found = l;
      }
      return found;
    }
    // light the path sun -> ... -> node. The selected node's link takes `dir`
    // (the tx direction); ancestors keep the direction they were lit with.
    // Every other link is dimmed.
    function applyLit(node, dir) {
      var path = [], n = node, want = dir;
      while (n && n.kind === 'planet') {
        var par = parentNode(n);
        var l = par ? pickLink(n, par, want || n.pathDir || domDir(n.cp)) : null;
        if (l) { path.push(l); n.pathDir = l.dir; }
        n = (par && par !== sunNode) ? par : null;
        want = null;
      }
      curLinks.forEach(function (l) { l.lit = false; l.litDir = null; l.dimmed = true; });
      path.forEach(function (l) { l.lit = true; l.dimmed = false; l.litDir = (l === path[0] && dir) ? dir : l.dir; });
      var same = sel && sel.node === node;
      sel = { node: node, txid: same ? sel.txid : '', fromRow: same ? sel.fromRow : false };
    }
    function latestTxFor(a) {
      var best = null;
      (data.txs || []).forEach(function (t) {
        if (!t.counterparties.length || !sameAddr(t.counterparties[0].addr, a)) return;
        if (!best || (t.time || 0) > (best.time || 0)) best = t;
      });
      return best;
    }
    function markRow(txid) {
      litTxid = txid || '';
      var body = $('txBody'); if (!body) return;
      var rows = body.querySelectorAll('tr');
      for (var i = 0; i < rows.length; i++) {
        var on = litTxid && rows[i].getAttribute('data-txid') === litTxid;
        rows[i].className = on ? 'tx-row-lit' : (rows[i].className || '').replace(/\btx-row-lit\b/, '').trim();
      }
    }
    function selectNode(node, tx) {
      var rtx = tx || (node.hop ? null : latestTxFor(node.cp.addr));
      applyLit(node, (tx || rtx) ? (tx || rtx).direction : null);
      sel.txid = rtx ? rtx.txid : '';
      sel.fromRow = !!tx;
      markRow(sel.txid);
      flyToLink(node);
      showPlanetCard(node.cp, usdRate, node.lore, { node: node, tx: tx || null });
      refreshLinks();
      startPulse();
    }
    // a row whose counterparty is not drawn (the map shows the top MAX_PLANETS by volume):
    // no bolt to light, but the row still opens its transaction
    function selectTxOnly(tx, cpAddr) {
      curLinks.forEach(function (l) { l.lit = false; l.litDir = null; l.dimmed = false; });
      sel = { node: null, txid: tx.txid, fromRow: true };
      markRow(tx.txid);
      refreshLinks();
      if (!nodeCard) return;
      nodeCard.className = 'node-card show';
      $('ncBody').innerHTML = txBlockHtml(tx, null) +
        '<div class="nc-addr">' + esc(cpAddr) + '</div>' +
        '<div class="nc-lore"><div class="nc-lore-label">NOT ON THE MAP</div><p>This counterparty is outside the ' +
        MAX_PLANETS + ' largest wallets drawn here, so it has no planet to light up.</p></div>';
    }
    function clearSelection(closeCard) {
      curLinks.forEach(function (l) { l.lit = false; l.litDir = null; l.dimmed = false; });
      sel = null; markRow('');
      if (closeCard && nodeCard) nodeCard.className = 'node-card';
      refreshLinks();
    }

    // ---- tx table: click = the bolt, hover = soft highlight ----
    function rowCtx(tr) {
      if (!tr) return null;
      var txid = tr.getAttribute('data-txid'), a = tr.getAttribute('data-cp');
      var t = txid && txMap[txid], node = a && firstHop[attribKey(a)];
      return t ? { tx: t, node: node || null, cp: a } : null;      // node is null when that wallet is beyond the drawn cap
    }
    function clearHover() {
      if (hoverLink) { hoverLink.hover = false; hoverLink = null; refreshWidthColor(); }
      hoverRow = null;
    }
    function wireRows() {
      var body = $('txBody');
      if (!body || body.__pfFollowWired) return;
      body.__pfFollowWired = true;
      body.addEventListener('click', function (ev) {
        var tr = ev.target.closest ? ev.target.closest('tr[data-txid]') : null;
        if (!tr || (ev.target.closest && ev.target.closest('a'))) return;
        var c = rowCtx(tr); if (!c) return;
        if (sel && sel.fromRow && sel.txid === c.tx.txid) { clearSelection(true); return; }   // same row again: clear the bolt
        if (c.node) selectNode(c.node, c.tx); else selectTxOnly(c.tx, c.cp);
      });
      body.addEventListener('mouseover', function (ev) {
        var tr = ev.target.closest ? ev.target.closest('tr[data-txid]') : null;
        if (tr === hoverRow) return;
        clearHover();
        var c = rowCtx(tr); if (!c || !c.node) return;
        var l = pickLink(c.node, sunNode, c.tx.direction);
        hoverRow = tr;
        if (l) { l.hover = true; hoverLink = l; refreshWidthColor(); }
      });
      body.addEventListener('mouseleave', clearHover);
    }

    // ---- follow this money: expand the system one more hop ----
    function hopWord(d) { return d === 2 ? 'Second' : d === 3 ? 'Third' : 'Fourth'; }
    function crumbAmt(cp) {
      var p = [];
      if (cp.inSats) p.push(fmtBtc(cp.inSats) + ' in');
      if (cp.outSats) p.push(fmtBtc(cp.outSats) + ' out');
      return p.join(' · ');
    }
    function followHtml(n) {
      if (!n || n.kind !== 'planet' || !n.cp) return '';
      var depth = n.hop || 1, label = 'Follow this money →', dis = false, note = '';
      if (n.following) { label = 'following…'; dis = true; }
      else if (n.followed) { label = 'Followed ✓'; dis = true; note = esc(n.followNote || ''); }
      else if (depth >= MAX_DEPTH) { label = 'Trail limit reached'; dis = true; }
      if (n.followErr && !n.followed && !n.following) note = '<span class="nc-follow-err">' + esc(n.followErr) + '</span>';
      return '<div class="nc-follow" data-node="' + esc(n.id) + '"><button type="button" class="btn ghost nc-follow-btn pf-follow"' +
        (dis ? ' disabled' : '') + '>' + label + '</button>' + (note ? '<div class="nc-follow-note">' + note + '</div>' : '') + '</div>';
    }
    function refreshFollowUi(n) {
      if (!nodeCard) return;
      var els = nodeCard.querySelectorAll('.nc-follow[data-node="' + n.id + '"]');
      for (var i = 0; i < els.length; i++) els[i].outerHTML = followHtml(n);
    }
    function addRing(n) {
      var el = document.createElement('div');
      el.className = 'fl-ring';
      bagLayer.appendChild(el);
      n.__ringEl = el;
      ringTracked.push(n);
    }
    function removeRings() {
      curNodes.forEach(function (n) { if (n.__ringEl && n.__ringEl.parentNode) n.__ringEl.parentNode.removeChild(n.__ringEl); n.__ringEl = null; });
      ringTracked.length = 0;
    }
    function renderTrail() {
      var el = $('trail'); if (!el) return;
      if (!trailPath.length) { el.style.display = 'none'; el.innerHTML = ''; return; }
      var html = '<span class="tr-k">TRAIL</span> <button type="button" class="tr-crumb" data-trail="sun">THE SUN</button>';
      trailPath.forEach(function (n) {
        html += ' <span class="tr-arrow">→</span> <button type="button" class="tr-crumb" data-trail="' + esc(n.id) + '" title="' + esc(n.cp.addr) + '">' +
          esc(shortAddr(n.cp.addr)) + ' <span class="tr-amt">(' + esc(crumbAmt(n.cp)) + ')</span></button>';
      });
      html += ' <button type="button" class="tr-clear" data-trail="clear">clear trail</button>';
      el.innerHTML = html;
      el.style.display = 'block';
    }
    // hop planets pick up public labels the same way first-hop planets do (idempotent per node)
    function decorateHops() {
      var changed = false;
      curNodes.forEach(function (nd) {
        if (!nd.hop || nd.attribbed) return;
        var at = attribOf(nd.cp.addr); if (!at) return;
        nd.attribbed = true; changed = true;
        var m = KIND_META[at.kind] || KIND_META.named;
        nd.lore.name = attribLabel(at);
        nd.lore.history = attribSentence(at) + ' ' + nd.lore.history;
        var rest = nd.labelHtml.slice(nd.labelHtml.indexOf('<br>'));
        nd.labelHtml = '<b>' + esc(nd.lore.name) + '</b> <span style="color:#f2a950;font-weight:700">' + esc(m.word) + '</span>' + rest;
        if (at.kind === 'mixer' || at.kind === 'flagged' || at.kind === 'sanctioned') nd.color = '#f2a950';
      });
      if (changed) refreshNodes();
    }
    window.__pflashHopAttrib = FOLLOW_ON ? decorateHops : null;

    function expand(n, d) {
      var cps = aggregateCounterparties(d);
      stampLastSeen(d, cps);
      // v20: hand this hop to the Commons exactly like the first hop (followed wallet = subject,
      // its counterparties = cps). Fire-and-forget and fail-open: never blocks the render below.
      try { if (window.PF_COMMONS && window.PF_COMMONS.hop) window.PF_COMMONS.hop(COIN.chain, n.cp.addr, d, cps); } catch (e) {}
      var seen = {};
      seen[attribKey(curAddr)] = 1;
      seen[attribKey(n.cp.addr)] = 1;
      curNodes.forEach(function (x) { if (x.cp) seen[attribKey(x.cp.addr)] = 1; });
      var fresh = cps.filter(function (c) { return !seen[attribKey(c.addr)]; });
      var more = fresh.length - FOLLOW_TOP;
      fresh = fresh.slice(0, FOLLOW_TOP);
      var depth = (n.hop || 1) + 1;
      var maxT = fresh.length ? fresh[0].total : 1;
      var rng = mulberry32(hashStr(n.cp.addr) ^ 0x70F0110);
      var fromShort = shortAddr(n.cp.addr);
      var newNodes = [], newLinks = [];
      fresh.forEach(function (cp) {
        var isIn = cp.inSats >= cp.outSats;
        var id = 'h' + depth + '_' + (hopSeq++);
        var name = hopWord(depth) + '-hop wallet';
        var nd = {
          id: id, kind: 'planet', hop: depth, parentId: n.id, fromAddr: n.cp.addr, cp: cp,
          lore: { name: name, bags: 0,
                  history: 'Money moved between ' + fromShort + ' and this wallet: ' + fmtBtc(cp.inSats) + ' in / ' + fmtBtc(cp.outSats) +
                           ' out, over ' + cp.txCount + ' tx.' },
          val: 1.5 + 6 * Math.sqrt(cp.total / maxT),
          color: isIn ? '#3ddc97' : '#ff4d5e',
          // start near the followed planet; the force layout takes it from there (no pinning)
          x: (n.x || 0) + (rng() - 0.5) * 24, y: (n.y || 0) + (rng() - 0.5) * 24, z: (n.z || 0) + (rng() - 0.5) * 24,
          labelHtml: '<b>' + esc(name) + '</b><br><span style="color:#7e93b3">' + esc(shortAddr(cp.addr)) + '</span><br>' +
            (cp.inSats ? '↓ in: ' + esc(fmtBtc(cp.inSats)) + '<br>' : '') +
            (cp.outSats ? '↑ out: ' + esc(fmtBtc(cp.outSats)) + '<br>' : '') +
            cp.txCount + ' tx · click to visit'
        };
        newNodes.push(nd);
        if (cp.inSats) newLinks.push({ source: id, target: n.id, color: 'rgba(61,220,151,.55)', w: cp.inSats, dir: 'in', hop: depth });
        if (cp.outSats) newLinks.push({ source: n.id, target: id, color: 'rgba(255,77,94,.55)', w: cp.outSats, dir: 'out', hop: depth });
      });
      // the followed planet becomes a small sub-sun: +60% size and a ring
      n.followed = true;
      n.origVal = n.val; n.val = n.val * 1.6;
      n.followNote = fresh.length
        ? fresh.length + ' new wallet' + (fresh.length === 1 ? '' : 's') + ' on the map' + (more > 0 ? ' (top ' + FOLLOW_TOP + ' of ' + (fresh.length + more) + ' by volume)' : '')
        : 'No new wallets beyond those already on the map.';
      addRing(n);
      applyLit(n, n.pathDir || null);                // the lit path stays lit; the new links below draw normal
      curNodes = curNodes.concat(newNodes);
      curLinks = curLinks.concat(newLinks);
      newNodes.forEach(function (x) { byId[x.id] = x; });
      decorateHops();                                // labels that already landed (shared ATTRIB map)
      graph.graphData({ nodes: curNodes, links: curLinks });
      refreshLinks();
      refreshNodes();
      // breadcrumb: the chain of followed wallets that leads to this one
      trailPath = [];
      for (var x = n; x && x.kind === 'planet'; x = x.hop ? byId[x.parentId] : null) trailPath.unshift(x);
      renderTrail();
      refreshFollowUi(n);
      setTimeout(function () { if (epoch === n.__epoch) flyTo(n, 150, true); }, 900);
    }
    function follow(n) {
      if (!n || n.kind !== 'planet' || n.following || n.followed) return;
      if ((n.hop || 1) >= MAX_DEPTH) { refreshFollowUi(n); return; }
      n.following = true; n.followErr = ''; n.__epoch = epoch;
      refreshFollowUi(n);
      var myEpoch = epoch;
      var loader = COIN.chain === 'eth' ? loadDataEth : COIN.chain === 'xrp' ? loadDataXrp : loadData;
      var pending;
      try { pending = loader(n.cp.addr); } catch (e) { pending = Promise.reject(e); }
      pending.then(function (d) {
        if (myEpoch !== epoch) return;
        n.following = false;
        if (!d || !d.txs || (d.sourceFailed && !d.txs.length)) {
          n.followErr = 'couldn’t reach the data source for that wallet';
          refreshFollowUi(n);
          return;
        }
        try { expand(n, d); }
        catch (e) {
          n.followErr = 'couldn’t add that wallet’s trail to the map';
          refreshFollowUi(n);
          if (window.console) console.error('follow failed', e);
        }
      }, function () {
        if (myEpoch !== epoch) return;
        n.following = false;
        n.followErr = 'couldn’t reach the data source for that wallet';
        refreshFollowUi(n);
      });
    }
    function clearTrail() {
      epoch++;
      removeRings();
      curNodes.forEach(function (n) {
        if (n.followed && n.origVal) n.val = n.origVal;
        n.followed = false; n.following = false; n.followErr = ''; n.followNote = ''; n.pathDir = null;
      });
      origLinks.forEach(function (l) { l.lit = false; l.litDir = null; l.dimmed = false; l.hover = false; });
      curNodes = origNodes.slice(); curLinks = origLinks.slice();
      sel = null; trailPath = []; hoverLink = null; markRow('');
      if (nodeCard) nodeCard.className = 'node-card';
      graph.graphData({ nodes: curNodes, links: curLinks });
      refreshLinks();
      refreshNodes();
      renderTrail();
      setTimeout(function () { graph.zoomToFit(800, 60); }, 300);
    }

    if (FOLLOW_ON) {
      FOLLOW_UI = { followHtml: followHtml };
      wireRows();
      var ncBody = $('ncBody');
      if (ncBody) ncBody.addEventListener('click', function (ev) {
        var b = ev.target.closest ? ev.target.closest('.pf-follow') : null;
        if (!b || b.disabled) return;
        var wrap = b.closest('.nc-follow');
        follow(byId[wrap && wrap.getAttribute('data-node')]);
      });
      var trailEl = $('trail');
      if (trailEl) trailEl.addEventListener('click', function (ev) {
        var b = ev.target.closest ? ev.target.closest('[data-trail]') : null;
        if (!b) return;
        var k = b.getAttribute('data-trail');
        if (k === 'clear') clearTrail();
        else if (byId[k]) flyTo(byId[k], 0, byId[k].kind === 'planet');
      });
    }

    // dev/demo hook (no extra data exposed — only what's already client-side)
    window.__pflash = {
      openSun: function () { showSunCard(data, usdRate); },
      openPlanet: function (i) {
        if (planets[i]) showPlanetCard(planets[i], usdRate, lore[i], FOLLOW_ON ? { node: byId['p' + i] } : null);
      },
      lore: function () {
        return lore.map(function (e) { return { name: e.name, creature: e.creature.name, history: e.history }; });
      },
      // v20 test hooks
      clickRow: function (txid) {
        var rows = document.querySelectorAll('#txBody tr[data-txid]');
        for (var i = 0; i < rows.length; i++) if (rows[i].getAttribute('data-txid') === txid) { rows[i].click(); return true; }
        return false;
      },
      selectPlanet: function (i) { if (byId['p' + i]) selectNode(byId['p' + i], null); },
      follow: function (id) { follow(byId[id]); },
      clearTrail: clearTrail,
      graph: function () { return graph; },
      state: function () {
        return {
          nodes: curNodes.length, links: curLinks.length,
          lit: curLinks.filter(function (l) { return l.lit; }).map(function (l) { return { dir: l.dir, litDir: l.litDir, from: endId(l.source), to: endId(l.target) }; }),
          dimmed: curLinks.filter(function (l) { return l.dimmed; }).length,
          hop: curNodes.filter(function (n) { return n.hop; }).length,
          followed: curNodes.filter(function (n) { return n.followed; }).map(function (n) { return n.id; }),
          sel: sel && { node: sel.node ? sel.node.id : null, txid: sel.txid }
        };
      }
    };

    // ---- v18: attribution decorates the planets that are already on screen ----
    // Idempotent per node; runs now (labels may have landed before the render)
    // and again from PF_ATTRIB_APPLY (labels may land after). Planet name,
    // hover label, and story all pick up the identity; mixers, flagged and
    // sanctioned worlds turn amber.
    function decorateAttrib() {
      if (opts.demo) return;
      var changed = false;
      ringNodes.forEach(function (nd) {
        if (nd.kind !== 'planet' || nd.attribbed) return;
        var n = attribOf(nd.cp.addr); if (!n) return;
        nd.attribbed = true; changed = true;
        var m = KIND_META[n.kind] || KIND_META.named;
        nd.lore.name = attribLabel(n);
        nd.lore.history = attribSentence(n) + ' ' + nd.lore.history;
        var rest = nd.labelHtml.slice(nd.labelHtml.indexOf('<br>'));
        nd.labelHtml = '<b>' + esc(nd.lore.name) + '</b> <span style="color:#f2a950;font-weight:700">' + esc(m.word) + '</span> ' +
          '<span style="letter-spacing:-2px">' + bagEmojis(nd.lore.bags) + '</span>' + rest;
        if (n.kind === 'mixer' || n.kind === 'flagged' || n.kind === 'sanctioned') nd.color = '#f2a950';
      });
      if (changed) { try { graph.nodeColor('color'); } catch (e) {} }
    }
    window.__pflash.decorateAttrib = decorateAttrib;
    decorateAttrib();

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
      if (n.kind !== 'planet') return;
      var el = document.createElement('div');
      el.className = 'bag-anchor';
      el.innerHTML = bagPileHtml(n.lore.bags);
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
      // v20: thin ring around each followed planet (the sub-suns) — DOM overlay, same projection
      for (var ri = 0; ri < ringTracked.length; ri++) {
        var rn = ringTracked[ri], rel = rn.__ringEl;
        if (!rel) continue;
        var rx = rn.x || 0, ry = rn.y || 0, rz = rn.z || 0;
        var rvx = mi[0] * rx + mi[4] * ry + mi[8] * rz + mi[12];
        var rvy = mi[1] * rx + mi[5] * ry + mi[9] * rz + mi[13];
        var rvz = mi[2] * rx + mi[6] * ry + mi[10] * rz + mi[14];
        var rcw = pr[3] * rvx + pr[7] * rvy + pr[11] * rvz + pr[15];
        if (rcw <= 0) { rel.style.display = 'none'; continue; }
        var rnx = (pr[0] * rvx + pr[4] * rvy + pr[8] * rvz + pr[12]) / rcw;
        var rny = (pr[1] * rvx + pr[5] * rvy + pr[9] * rvz + pr[13]) / rcw;
        if (rnx < -1.1 || rnx > 1.1 || rny < -1.1 || rny > 1.1) { rel.style.display = 'none'; continue; }
        var rpx = Math.max(10, 2 * 1.5 * Math.cbrt(rn.val) * 4 * pr[5] * (H / 2) / rcw); // node radius = cbrt(val) * nodeRelSize(4)
        rel.style.display = 'block';
        rel.style.width = rel.style.height = rpx.toFixed(1) + 'px';
        rel.style.transform = 'translate(' + ((rnx + 1) / 2 * W).toFixed(1) + 'px,' + ((1 - rny) / 2 * H).toFixed(1) + 'px) translate(-50%,-50%)';
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
      ['bc1qs7g4hf2n8kxr3vd0q9m5aw7czt6ljy4p2u', 'Funding source — likely an exchange', 62000000, 0, 14, 3,
        'This is where money came IN. About $42,800 in Bitcoin reached the sun wallet from this address across 14 deposits — the pattern looks like withdrawals from a regulated exchange or brokerage (Coinbase, Kraken or similar). Exchanges keep customer records, so an address like this usually belongs to a named company. That identification is a probability read from the flow, not a verdict.'],
      ['bc1qh3m9x2kf7v0aq5d8s4n6cwltr9zj2y5g8e', 'Collection hub (probable)', 0, 18000000, 6, 5,
        'The single largest amount OUT of the sun wallet landed here — roughly $12,400. This address receives from at least 31 other wallets, in deposits ranging from a few dollars to tens of thousands. That many-into-one pattern is typical of a collection hub, such as a payment processor or a pooled wallet. The flows are facts; the label is a probability.'],
      ['bc1q4t8v2n7khf3m0x9s5aq6dwzr2cyl8j3g7u', 'Inbound — recurring payer', 12500000, 0, 9, 8,
        'About $8,600 came in from this address over 9 transactions, small and regular. That cadence often means a recurring payer or a payout schedule. The chain shows the movement, not the reason; treat the read as a probability.'],
      ['bc1q9d2s7hf4kx3n8v0mq5awt6czr2yl9j5g3e', 'Pass-through relay', 6200000, 3600000, 11, 2,
        'A pass-through relay: funds land here and leave again within hours, so money only rested here briefly on its way somewhere else. Following it to the next hop shows where it went next.'],
      ['bc1qk7h3m9x2f4v8n0s5aqd6wtzr9cyl2j8g4u', 'Secondary funding (probable)', 7400000, 0, 4, 12,
        'Roughly $5,100 flowed in from here. The pattern is consistent with a second funding source or another wallet under the same control. Probable, not proven.'],
      ['bc1q2n8v4kf7h3mx0q9s5awt6dzr2cyl8j3g7e', 'Feeder into the hub (probable)', 0, 5200000, 3, 16,
        'About $3,600 left the sun wallet to this address and did not come back. It sits one hop upstream of the collection hub above — a likely feeder into the same cluster. Probable connection, based on shared counterparties.'],
      ['bc1qm5x9k2h7f3v8n0d4aqs6wtzr9cyl2j8g5u', 'Low-volume inbound', 4100000, 0, 5, 21,
        'About $2,800 came in from here over 5 transactions. A low-volume counterparty; on the data so far it doesn’t connect cleanly to the main cluster. Noted, not yet linked.'],
      ['bc1qf7h3n9x2k4m8v0s5awqd6tzr2cyl9j3g7e', 'Shuffling / mixing service (probable)', 1900000, 1400000, 8, 6,
        'The busiest address in the first hop — 8 transactions, money in and right back out. High-frequency two-way flow like this is a common signature of a mixing or shuffling service. The chain still records every hop, so the trail stays readable.'],
      ['bc1q8v2n7kf4h3mx0q9d5awts6zr2cyl8j3g5u', 'Secondary payout path', 0, 2600000, 2, 30,
        'About $1,800 went out to this wallet. A small outbound leg, probably a secondary payout path branching off the main flow.'],
      ['bc1q3m9x7k2h4f8v0n5aqds6wtzr9cyl2j8g4e', 'Minor inbound', 1900000, 0, 3, 45,
        'A minor inbound counterparty (~$1,300). Nothing on-chain ties it to the main cluster yet — included so the picture is complete.'],
      ['bc1qn8v4k7f2h3mx0q9s5awtd6zr2cyl8j3g7u', 'Dormant / cold wallet', 1200000, 0, 2, 400,
        'Dormant. About $800 arrived here more than a year ago and nothing has moved since — a cold wallet holding a slice of the funds. Cold doesn’t mean gone; it means parked, and the chain will show the moment it wakes up.'],
      ['bc1q7k3h9x2m4f8v0n5aqds6wtzr2cyl9j3g5e', 'Small outbound leg', 0, 800000, 1, 60,
        'A small outbound leg (~$550) — likely a test transfer or a fee payment. Small, but it’s part of the same trail.']
    ];
    if (!IS_SMALL) { // perf cap ~12 planets on phones; a couple more on desktop
      rows.push(['bc1q4v8n2k7f3hmx0q9s5awtd6zr2cyl8j3g7u', 'Trace-level inbound', 450000, 0, 2, 90,
        'Trace-level inbound (~$310). Small, included for completeness so the map shows everything the wallet touched.']);
      rows.push(['bc1q9x2k7h3f4m8v0n5aqds6wtzr9cyl2j8g4e', 'Trace-level outbound', 0, 300000, 1, 120,
        'Trace-level outbound (~$210). Small, included for completeness so the map shows everything the wallet touched.']);
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
      usdRate: 69000 // fixed fictional rate so demo $ figures are stable
    };
  }
  function runDemo() {
    curAddr = 'DEMO';
    curSunTitle = '\u2600 THE DEMO SUN';
    curSunSub = 'A fictional example — any address takes this seat';
    var demo = buildDemoData();
    try {
      if (typeof ForceGraph3D === 'undefined') throw new Error('3D library unavailable');
      renderSystem(demo.data, demo.cps, demo.usdRate, {
        demo: true,
        autoOrbit: true
      });
    } catch (e) {
      var st = $('demoStage');
      if (st) st.classList.add('demo-fallback');
    }
  }

  // ============================================================
  // SCAN MODE (scan.html): live data, free for everybody
  // ============================================================
  function runScan() {
    var params = new URLSearchParams(window.location.search);
    addr = (params.get('addr') || '').trim();
    $('addrChip').textContent = addr || T('noAddr');

    if (!addr) {
      showError(T('noAddr'), T('noAddrBody'));
      return;
    }
    // v15: secret codes — certain words PFLASH into something else entirely
    var egg = PF_EGGS[addr.toLowerCase()];
    if (egg) { renderEgg(egg); return; }
    var chain = detectChain(addr);
    if (!chain) {
      showError(T('invalid'),
        /^0x/i.test(addr)
          ? 'That looks like an Ethereum address but isn\u2019t valid \u2014 it should be 0x followed by 40 hexadecimal characters. Copy it exactly, character for character.'
          : /^r/.test(addr)
          ? 'That looks like an XRP Ledger address but isn\u2019t valid \u2014 it should start with r and run 25 to 35 letters and numbers. Copy it exactly, character for character.'
          : 'Bitcoin addresses start with 1, 3, or bc1; Ethereum addresses start with 0x; XRP Ledger addresses start with r. Double-check the address \u2014 copy it exactly, character for character.');
      return;
    }
    // ETH-address scans are multi-asset (ETH + USDT + USDC), so amounts are
    // unified and displayed in USD (divisor 1; values arrive already in dollars).
    if (chain === 'eth') COIN = { chain: 'eth', ticker: 'USD', divisor: 1, usd: true };
    // XRP Ledger: amounts are drops (1 XRP = 1,000,000 drops), shown as XRP, not USD
    if (chain === 'xrp') COIN = { chain: 'xrp', ticker: 'XRP', divisor: 1e6, usd: false };
    curChain = chain; LEDGER_SENT = false;

    curAddr = addr;

    Promise.all([
      chain === 'eth' ? loadDataEth() : chain === 'xrp' ? loadDataXrp() : loadData(),
      chain === 'btc' ? loadRate() : Promise.resolve(null)
    ])
      .then(function (res) {
        var data = res[0], usdRate = res[1];
        if (data.txCount === 0 && data.sourceFailed) {
          // A data source failed or rate-limited us and we found nothing —
          // NEVER present that as "no activity": it may be a false negative.
          showError('The blockchain data source is busy right now.',
            'The address wasn\u2019t the problem — our data source limited the request ' +
            '(this can happen when several scans run back-to-back). ' +
            'Wait about a minute and PFLASH it again.');
          return;
        }
        if (data.txCount === 0 && !data.agent) {
          showError(T('noActivity'),
            'This address exists in a valid format but has never sent or received ' +
            (COIN.chain === 'eth' ? 'ETH, USDT or USDC' : COIN.chain === 'xrp' ? 'XRP' : 'Bitcoin') + '. ' +
            'Double-check the address — many platforms issue a fresh address for each deposit. ' +
            'Try a different address from the same source, or the wallet on the other side of a transaction.');
          return;
        }
        var cps = aggregateCounterparties(data);
        stampLastSeen(data, cps);
        // v16: THE COMMONS — this scan feeds the shared map and reads it back.
        // Non-blocking and fail-open by construction: if the Commons is down,
        // absent, or slow, everything below renders exactly as it always has.
        try { if (window.PF_COMMONS) window.PF_COMMONS.run(COIN.chain, addr, data, cps); } catch (e) {}
        setStatus(T('pflashDonePrefix') + fmtTxCount(data) + T('pflashDoneSuffix'), true);
        $('results').style.display = 'block';
        // v12: stash the finished scan so the free PDF / paper view can be built on demand
        PDF_STATE = { data: data, cps: cps, usdRate: usdRate, addr: addr, chain: COIN.chain, ticker: COIN.ticker };
        initSplitChooser(); // v13.3: land on BOTH views side by side; tabs appear after first pick
        if (COIN.chain === 'xrp') { try { renderAgentPanel(data, addr); } catch (e) {} } // v19: AGENT ● ON THE RECORD (fail-open)
        renderStats(data, cps.length, usdRate);
        if (COIN.chain === 'xrp' && $('statId')) { $('statId').textContent = '\u2014'; $('statIdSub').textContent = 'no public labels for XRP yet'; } // v19: attribution doesn't run for XRP
        renderTable(data);
        try {
          if (typeof ForceGraph3D === 'undefined') throw new Error('3D library unavailable');
          renderSystem(data, cps, usdRate);
        } catch (e) {
          $('stage3d').innerHTML = '<div style="padding:30px;color:#7e93b3">' + T('unavail') + '</div>';
        }
      })
      .catch(function (err) {
        if (String(err).indexOf('HTTP 400') !== -1 || String(err).indexOf('HTTP 404') !== -1) {
          showError('That address isn\u2019t recognized on the ' + chainName(COIN.chain) + (COIN.chain === 'xrp' ? '.' : ' network.'),
            (COIN.chain === 'eth' || COIN.chain === 'xrp'
              ? 'Check for typos — copy it exactly from where you found it.'
              : 'Check for typos — addresses are case-sensitive after "bc1". Copy it exactly from where you found it.'));
        } else {
          showError('Couldn\u2019t reach the blockchain data sources.',
            'Both our primary and backup nodes are unreachable right now. This is usually temporary — wait a minute and refresh. (' + esc(String(err && err.message || err)) + ')');
        }
      });
  }

  // ============================================================
  // v12: FREE PDF FIELD EXPORT — built entirely client-side from the
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
  // the export simply ships without the ghost.
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
  var PDF_CLOSER = 'This is a Pflash reading of the public ledger. We think it\u2019s good, and it\u2019s free for everybody.';

  function buildPdf(wm) {
    var st = PDF_STATE;
    var doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'letter' });
    var W = doc.internal.pageSize.getWidth();
    var H0 = doc.internal.pageSize.getHeight();
    var navy = [6, 19, 27], ink = [28, 39, 51], muted = [107, 118, 131];
    // v13.2: the PDF IS the web paper — cream stock, typewriter body
    var cream = [236, 225, 200], creamDark = [222, 209, 182], creamLine = [185, 172, 143];
    var now = new Date();
    var rateOk = st.usdRate && st.chain !== 'eth';

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
    doc.text('WALLET PFLASH \u2014 FIELD EXPORT', 40, 84);
    doc.setFont('courier', 'normal'); doc.setFontSize(8);
    doc.setTextColor(muted[0], muted[1], muted[2]);
    doc.text('Generated ' + now.toLocaleString('en-US') + '  \u00b7  phantomflash.com  \u00b7  live public blockchain data', 40, 98);

    // the transmission — right up at the top
    doc.setFont('courier', 'italic'); doc.setFontSize(9.5);
    doc.text(PDF_EPIGRAPH, W / 2, 122, { align: 'center' });

    doc.setTextColor(ink[0], ink[1], ink[2]);
    doc.setFont('courier', 'bold'); doc.setFontSize(11);
    doc.text('Scanned wallet (' + chainName(st.chain) + '):', 40, 146);
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
        ['Total received', pdfSafe(fmtBtc(d.fundedSum) + (rateOk ? '   (' + fmtUsd(d.fundedSum, st.usdRate) + ')' : ''))],
        ['Total sent out', pdfSafe(fmtBtc(d.spentSum) + (rateOk ? '   (' + fmtUsd(d.spentSum, st.usdRate) + ')' : ''))],
        ['Transactions on-chain', fmtTxCount(d)],
      ].concat(d.balance != null ? [['Balance on ledger', pdfSafe(fmtBtc(d.balance))]] : []).concat([
        ['Counterparties (first hop)', String(st.cps.length)],
        ['Activity window', range]
      ]),
      styles: { fontSize: 9, cellPadding: 5 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 170 } }
    }));

    // counterparties
    var CP_CAP = 200;
    var cpRows = st.cps.slice(0, CP_CAP).map(function (c, i) {
      return [String(i + 1), c.addr, pdfSafe(attribPlain(c.addr) || '\u2014'), fmtBtc(c.inSats), fmtBtc(c.outSats), String(c.txCount)];
    });
    doc.autoTable(themed({
      startY: doc.lastAutoTable.finalY + 18,
      head: [[{ content: 'FIRST-HOP COUNTERPARTIES \u2014 every wallet it transacted with' + (st.cps.length > CP_CAP ? ' (top ' + CP_CAP + ' of ' + st.cps.length + ' by volume)' : ''), colSpan: 6 }],
             ['#', 'Wallet address', 'Identified as', 'Sent to wallet', 'Received from wallet', 'Shared tx']],
      body: cpRows,
      headStyles: { fontSize: 8 },
      styles: { fontSize: 7, cellPadding: 4 },
      columnStyles: { 0: { cellWidth: 24 }, 1: { cellWidth: 215 }, 2: { cellWidth: 95 } }
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
    doc.text('This is a Pflash reading of the public ledger.', cx, 290, { align: 'center' });
    doc.text('We think it\u2019s good, and it\u2019s free for everybody.', cx, 306, { align: 'center' });

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
    doc.text('No outcome is promised or implied. The chain keeps the receipts \u2014 we just read them back.', cx, 615, { align: 'center' });

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
        doc.text('Not legal advice \u00b7 not financial advice \u00b7 not for law-enforcement purposes \u00b7 free reading of public blockchain data, as-is \u00b7 no outcome promised or implied.', 40, H - 34, { maxWidth: W - 80 });
        doc.text('phantomflash.com \u00b7 @PhantomFlashHQ \u00b7 page ' + p + ' of ' + pages, W - 40, H - 18, { align: 'right' });
      }
    }

    doc.save('PFLASH-field-export-' + st.addr.slice(0, 12) + '-' + now.toISOString().slice(0, 10) + '.pdf');
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
        // CDN unreachable/offline — the browser's own PDF printer still works
        btn.textContent = orig; btn.disabled = false;
        window.print();
      });
  });

  // ============================================================
  // v13: PAPER VIEW — the written record, on the page
  // ============================================================
  var PAPER_RENDERED = false;

  function renderPaperView() {
    var st = PDF_STATE, box = $('paperView');
    if (!st || !box) return;
    var d = st.data;
    var rateOk = st.usdRate && st.chain !== 'eth';
    var now = new Date();
    var times = d.txs.map(function (t) { return t.time; }).filter(Boolean);
    var range = '\u2014';
    if (times.length) {
      var mn = Math.min.apply(null, times), mx = Math.max.apply(null, times);
      range = fmtDate(mn) + (fmtDate(mn) === fmtDate(mx) ? '' : ' \u2192 ' + fmtDate(mx));
      if (d.txs.length < d.txCount) range += ' (most recent ' + d.txs.length + ' of ' + d.txCount.toLocaleString('en-US') + ')';
      else if (d.truncated) range += ' (most recent ' + d.txs.length + ')';
    }
    function row(k, v) { return '<div class="pd-row"><span class="pd-k">' + k + '</span><span class="pd-v">' + v + '</span></div>'; }
    var cpRows = st.cps.map(function (c, i) {
      return '<tr><td>' + (i + 1) + '</td><td class="pd-addr">' + esc(c.addr) + '</td><td>' + (attribPlain(c.addr) ? esc(attribPlain(c.addr)) : '—') + '</td><td>' + esc(fmtBtc(c.inSats)) + '</td><td>' + esc(fmtBtc(c.outSats)) + '</td><td>' + c.txCount + '</td></tr>';
    }).join('');
    var idedN = st.cps.filter(function (c) { return !!attribOf(c.addr); }).length;
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
          '<div class="pd-sub">WALLET PFLASH \u2014 FIELD EXPORT \u00b7 generated ' + esc(now.toLocaleString('en-US')) + '</div></div>' +
          '<button class="btn primary" id="pdfBtn" type="button">\u2b07 Don\u2019t Forget! Take Your Pflash With You!</button>' +
        '</div>' +
        '<div class="pd-epigraph">' + PDF_EPIGRAPH + '</div>' +
        '<div class="pd-wallet">Scanned wallet (' + chainName(st.chain) + '): <span class="pd-addr">' + esc(st.addr) + '</span></div>' +
        '<div class="pd-section">SUMMARY</div>' +
        row('Total received', esc(fmtBtc(d.fundedSum)) + (rateOk ? ' <span class="pd-usd">' + esc(fmtUsd(d.fundedSum, st.usdRate)) + '</span>' : '')) +
        row('Total sent out', esc(fmtBtc(d.spentSum)) + (rateOk ? ' <span class="pd-usd">' + esc(fmtUsd(d.spentSum, st.usdRate)) + '</span>' : '')) +
        row('Transactions on-chain', fmtTxCount(d)) +
        (d.balance != null ? row('Balance on ledger', esc(fmtBtc(d.balance))) : '') +
        row('Counterparties (first hop)', String(st.cps.length)) +
        row('Identified counterparties', idedN + ' of ' + st.cps.length + (idedN ? '' : ' \u2014 no public labels')) +
        row('Activity window', esc(range)) +
        '<div class="pd-section">FIRST-HOP COUNTERPARTIES \u2014 every wallet it transacted with</div>' +
        '<div class="pd-scroll"><table class="pd-table"><thead><tr><th>#</th><th>Wallet address</th><th>Identified as</th><th>Sent to wallet</th><th>Received from wallet</th><th>Tx</th></tr></thead><tbody>' + cpRows + '</tbody></table></div>' +
        '<div class="pd-section">TRANSACTIONS \u2014 most recent ' + d.txs.length.toLocaleString('en-US') + (moreTx > 0 ? ' of ' + d.txCount.toLocaleString('en-US') + ' on-chain' : '') + '</div>' +
        '<div class="pd-scroll"><table class="pd-table"><thead><tr><th>Date</th><th>Dir</th><th>Amount</th><th>Counterparty</th><th>TXID</th></tr></thead><tbody>' + txRows + '</tbody></table></div>' +
        '<div class="pd-close">' +
          '<p>' + PDF_CLOSER + '</p>' +
          '<p class="pd-socials"><a href="https://x.com/PhantomFlashHQ" target="_blank" rel="noopener">X \u00b7 @PhantomFlashHQ</a> &nbsp;\u00b7&nbsp; <a href="https://www.youtube.com/@PhantomFlashHQ" target="_blank" rel="noopener">YouTube \u00b7 @PhantomFlashHQ</a> &nbsp;\u00b7&nbsp; <a href="https://phantomflash.com">phantomflash.com</a></p>' +
          '<p class="pd-sign">Daniel Irwin<br><span>Phantom Flash HQ</span></p>' +
          '<p class="pd-legal">Not legal advice. Not financial advice. Not for law-enforcement purposes.<br>A free first-hop reading of the public blockchain, presented as-is. No outcome is promised or implied.<br>The chain keeps the receipts \u2014 we just read them back.</p>' +
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
    try { if (window.gtag) gtag('event', 'view_switch', { view: paper ? 'paper' : 'field' }); } catch (e) {}
  }

  function initViewTabs() {
    var tU = $('tabUniverse'), tP = $('tabPaper');
    if (!tU || !tP) return;
    tU.addEventListener('click', function () { setView(false); });
    tP.addEventListener('click', function () { setView(true); });
  }
  initViewTabs();

  // v13.3: the first landing shows BOTH views side by side (field left,
  // paper right). People don't find tabs — so the site teaches them there
  // are two views by showing both, then collapses to tabs after the pick.
  function initSplitChooser() {
    var wrap = $('viewWrap'), vU = $('universeView'), vP = $('paperView');
    if (!wrap || !vU || !vP) { var t = $('viewTabs'); if (t) t.style.display = 'flex'; return; }
    renderPaperView();
    vP.style.display = 'block';
    wrap.className = 'split';
    vU.className = 'view-pane'; vP.className = 'view-pane';
    [[false, vU, '\ud83e\ude90 FIELD VIEW'], [true, vP, '\ud83d\udcc4 PAPER VIEW']].forEach(function (cfg) {
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
    try { if (window.gtag) gtag('event', 'view_pick', { view: paper ? 'paper' : 'field' }); } catch (e) {}
  }

  // ============================================================
  // v15: SECRET CODES — easter eggs in the scan box.
  // Type certain words instead of an address and the chain answers.
  // Each egg renders as a PFLASH record (the cream paper). Eggs may
  // carry a comic image (egg.image) once one is blessed.
  // ============================================================
  var PF_EGGS = window.PF_EGGS = {
    jesus: {
      chip: 'JESUS',
      status: 'RECORD FOUND — the oldest ledger',
      html:
        '<div class="paper-doc" style="max-width:760px;margin:24px auto 60px">' +
          '<div class="pd-head"><div><div class="pd-brand">PHANTOM FLASH</div>' +
          '<div class="pd-sub">WALLET PFLASH \u2014 SPECIAL RECORD</div></div></div>' +
          '<div class="pd-epigraph">\u201cPflashing aligns shapes electromagnetically.\u201d</div>' +
          '<div class="pd-wallet">Scanned: <span class="pd-addr">JESUS</span></div>' +
          '<div class="pd-section">SUMMARY</div>' +
          '<div class="pd-row"><span class="pd-k">Chain</span><span class="pd-v">All of them</span></div>' +
          '<div class="pd-row"><span class="pd-k">Total received</span><span class="pd-v">Everything</span></div>' +
          '<div class="pd-row"><span class="pd-k">Total sent out</span><span class="pd-v">Everything, freely</span></div>' +
          '<div class="pd-row"><span class="pd-k">Transactions</span><span class="pd-v">1 \u2014 covers every address, forever</span></div>' +
          '<div class="pd-row"><span class="pd-k">Activity window</span><span class="pd-v">~33 AD \u2192 present (still confirming)</span></div>' +
          '<div class="pd-section">SYSTEM RECORD</div>' +
          '<p style="font-size:13.5px;line-height:1.75;color:#3a4550">One transaction, about two thousand years ago. Every debt, for every address, settled in full. No gas fees. No seed phrase required \u2014 the whole thing runs on faith. Phantom Flash reads every ledger there is, and this is the only one where the receipts read <strong style="color:#1c2733">PAID</strong> before the debt is even incurred.</p>' +
          '<div class="pd-close">' +
            '<p>You didn\u2019t find this by accident. Nobody does.</p>' +
            '<p class="pd-socials"><a href="index.html#scan">\u26a1 PFLASH an address \u2014 free</a></p>' +
          '</div>' +
        '</div>'
    }
  };

  function renderEgg(egg) {
    $('addrChip').textContent = egg.chip;
    setStatus(egg.status || 'RECORD FOUND', true);
    var host = document.createElement('div');
    host.innerHTML = egg.html;
    var err = $('errorPanel');
    err.parentNode.insertBefore(host, err);
    try { if (window.gtag) gtag('event', 'egg_found', { code: egg.chip }); } catch (e) {}
    try { LEDGER_SENT = false; curChain = 'egg'; logScan(null, 0); } catch (e) {}
  }

  // ---------- entry: which page are we on? ----------
  if ($('addrChip')) {
    runScan();                            // scan.html
  } else if ($('demoStage')) {
    // index.html live-demo hero — wait for the deferred i18n layer so
    // labels are translated (DOMContentLoaded fires after
    // deferred scripts execute).
    if (window.PF_I18N_T || document.readyState === 'complete') runDemo();
    else document.addEventListener('DOMContentLoaded', runDemo);
  }
})();
