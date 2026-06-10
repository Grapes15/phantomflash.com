# Phantom Flash — Unchained Investigation (v6)

Static lead-gen site: free live Bitcoin wallet scan ("PFLASH") → upsell to the **$2,717.17
Full Unchained Report** (investigative blockchain analysis). No backend — plain
HTML/CSS/JS, live data fetched client-side.

## v6 changes (2026-06-10) — canonical desk-panel theme pass

Final visual-theme alignment to the canonical Phantom Flash desk artwork
(`assets/hero-desk-panel.jpg` — comic-noir panel: Phantom Flash on a corded phone at
his desk, the *Ravens Edge Register* "HOUSE OF BONES" front page on the monitor,
halftone newsprint texture). No copy-voice, pricing, 3D-explorer-behavior, mobile-fix,
or disclaimer changes.

1. **New canonical hero art.** `assets/hero-desk-panel.jpg` (1600px, 361 KB — sips
   q62 from the 2752px master). Replaces `hero-noir.jpg` (which had baked-in
   "…HAVEN'T GOTTEN TO YOU YET" text) as the index hero background AND replaces the
   off-model `phantom-office.jpg` in the About panel (portrait widened to 420px /
   16:9-ish crop so the desk scene reads). Both old images deleted; `og:image` on all
   three pages now points at `hero-desk-panel.jpg`.
2. **Palette extracted from the artwork** and applied via CSS variables: deep
   teal-navy shadows (`--bg:#06131b`, panels `#0b202c`/`#0e2735`), cyan monitor glow
   (kept `#00e5ff`), warm desk-lamp amber (`--amber:#f2a950`), newsprint cream
   (`--paper:#ece1c8`), and a new ink-edge black (`--edge:#05090c`). Card/panel/CTA
   shadows switched from cyan-tinted to hard ink-black comic offsets; subtle warm-amber
   radial added to body + cta-band backgrounds; `theme-color` → `#06131b`.
3. **Newsprint texture touches:** fixed-position 5px halftone grain over the whole
   page (`body::after`, ~3% cream — no perf cost, pure CSS gradient), halftone dot
   pattern inside the cream ticker strip, and a newspaper-masthead double rule (amber
   3px+1px) under every `.section-title`. Cards/callouts get ink-edge borders
   (`--edge`) with a thin teal keyline.
4. **Brand sweep — zero standalone "Phantom".** Every bare "the Phantom" in shipped
   UI text rewritten to "Phantom Flash" across index/scan/checkout HTML and all
   scan.js lore strings (planet histories, locked-node card, hover labels, sun
   record). Verified by grep: no `\bPhantom\b` remains outside "Phantom Flash".
5. **Footer legal contrast bumped** (`--muted2` → `--muted`) after screenshot review.
6. **Re-verified mobile:** `audit-mobile.js` — zero document overflow on all three
   pages at 375/390/414 wide (fixed one regression: the About portrait needed
   `height:240px` on mobile instead of `aspect-ratio`). Re-shot everything as
   `v6-*.png` (desktop 1440) + `v6-mobile-*.png` (390×844) via `shoot-v6.js`.

## v5 changes (2026-06-10) — mobile optimization pass

Audited all three pages at 375×667 / 390×844 / 414×896 (headless Chromium, touch
emulation). No copy, pricing, branding, or 3D-lore changes.

1. **Horizontal overflow on `scan.html` fixed.** `main` was being stretched past the
   viewport by the wide tx table inside flex-column `body` (`main{min-width:0;
   max-width:100vw}`); the tx table now scrolls *inside* `.tx-table-wrap`
   (`min-width:560px` on the table, touch momentum scrolling on the wrapper) instead
   of widening the page. All three pages now have zero document-level overflow at all
   three viewports.
2. **Touch targets ≥ 44px.** Header logo + nav links padded to 44px min-height; the
   hero scan input is 48px min-height / 16px font (also prevents iOS zoom-on-focus);
   the PFLASH IT button is 52px tall full-width on mobile; all checkout inputs are
   48px+/16px (wallet input included); `.btn.big` CTAs become full-width 52px blocks
   on mobile; node-card close button is 44×44.
3. **3D explorer mobile pass** (`assets/scan.js`):
   - Node cap lowered on small screens: 24 real planets + 8 locked + sun (≈33 nodes
     vs ≈59 desktop); sphere resolution 12 vs 16 — keeps orbit/pinch smooth on phones.
   - `touch-action:none` on the canvas container so browser pan/zoom gestures don't
     fight 3d-force-graph's built-in touch orbit/pinch controls (library supports
     touch natively; nothing else blocks it).
   - Canvas resizes via `ResizeObserver` + `orientationchange` (was resize-only).
   - Stage height is `70vh` (380–560px) on mobile instead of fixed 480px.
4. **Planet info cards → bottom sheet on mobile.** `≤880px`, the node card is a
   fixed full-width bottom sheet: opaque `#070d18` background, rounded top, drag
   handle, 62vh max-height internal scroll, `env(safe-area-inset-bottom)` padding,
   44×44 close button. Verified opaque (no text bleed-through) by screenshot review.
5. **Legibility:** `.label` and table headers bumped 11px → 12px; small-screen stat
   values 18px with `overflow-wrap:anywhere` so BTC amounts never overflow their tile.
6. **Meta/icons added to all three pages:** `theme-color` (#04070d; now #06131b in v6), full
   `og:title/description/image` (+`twitter:card`) using `assets/hero-noir.jpg` (now `hero-desk-panel.jpg` in v6),
   SVG favicon + 32px PNG + 180px `apple-touch-icon` (new lightning-bolt mark:
   `assets/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`).
   *Note for deploy:* og:image is a relative path — some scrapers require absolute
   URLs; swap to the full `https://` URL once the domain is known.
7. **Images audited, not recompressed:** `hero-noir.jpg` is 369 KB (under the 400 KB
   threshold; sips recompression at q68 came out *larger*, so the original is kept),
   `phantom-office.jpg` 164 KB. Both load lazily / via CSS background.
   *(v6: both replaced by `hero-desk-panel.jpg`.)*

### Mixed-content / external-domain audit (for HTTPS deploy + CSP)

Every external reference is `https://` — zero `http://` resources (the only
`http://` string in the repo is the SVG `xmlns` namespace identifier, which is
never fetched). External domains used at runtime:

| Domain | Used by | Purpose |
|---|---|---|
| `fonts.googleapis.com` | all pages | Bangers font CSS |
| `fonts.gstatic.com` | all pages | font files (preconnect) |
| `unpkg.com` | scan.html | `3d-force-graph@1.80.0` (pinned) |
| `mempool.space` | scan.js (fetch) | primary BTC data + USD price |
| `blockchain.info` | scan.js (fetch) | fallback BTC data |

Future (currently TODO stubs, not live): `buy.stripe.com` (payment link),
`formspree.io` (lead form). Suggested CSP `connect-src`: `'self'
https://mempool.space https://blockchain.info`; `script-src`: `'self'
https://unpkg.com 'unsafe-inline'` (or hash the two inline scripts);
`style-src`: `'self' https://fonts.googleapis.com 'unsafe-inline'`;
`font-src`: `https://fonts.gstatic.com`.

Screenshots: `_screenshots/v5-mobile-index.png`, `v5-mobile-scan.png`,
`v5-mobile-scan-card.png` (bottom-sheet card), `v5-mobile-checkout.png`
(390×844, DPR 2, full-page). Regenerate with `node _screenshots/shoot-v5-mobile.js`;
re-audit with `node _screenshots/audit-mobile.js` (both need the local server up).

## v4 changes (2026-06-10) — living lore layer

The planets in the 3D system are now **inhabited**. The tracing report becomes a
story the victim explores — wonder + noir, so they can literally *see* their money
went somewhere real. No pipeline/paywall/theme changes.

1. **Deterministic planet names.** Each first-hop counterparty gets a mythic
   space-opera name (Solova, Nimdor, Belantha, Cassbelle…) generated from an
   FNV-1a hash of its wallet address — 32 prefixes × 22 suffixes, with Roman-numeral
   disambiguation on collisions. Same wallet → same planet name, every scan.
   **Canon:** the largest-volume counterparty is always **Planet Walker**.
2. **Creature inhabitants.** Each planet is home to one of 12 creatures (fox, owl,
   moth, serpent, golem, jellyfish, kraken, wolf, raven, tortoise, stag, scorpion),
   hash-picked per address, each with a ruler flavor line ("a silver fox who trades
   in whispers"). **Planet Walker is inhabited by a swift bunny** — "the fastest
   courier in the system, always one hop ahead." Creature glyphs appear on the
   hover label and the info card header (glowing emoji — zero perf cost).
3. **Planet History on the info card.** Clicking a planet now shows the tracing
   data (unchanged: address, BTC/USD in/out, shared tx count) **plus** 2–3 sentences
   of generated lore that weaves the *real* numbers into the story. Metric → lore
   mapping: tx count → trade routes · share of system volume → influence tier
   (influential world / prosperous mid-system / modest outpost / far orbit) · money
   in → "tribute paid to your sun" · money out → "your sun funded its expeditions" ·
   bidirectional flow → "port world" · high tx count + bidirectional → "smuggler's
   haven" · no activity for >1 year → "silent world." Neighboring planet names get
   name-dropped so the system feels connected. Sentence templates are picked by a
   seeded PRNG (mulberry32 from the address hash) — fully deterministic, varied
   across planets.
4. **Sun card lore:** "Your sun — every planet in this system orbits your money."
5. **Locked planets** are now "shrouded worlds" with a classified-history teaser
   ("The Phantom has charted its trade routes, its rulers, and where its treasure
   sails. The free PFLASH stops here — the story doesn't.") → unlock CTA. Still
   **zero real data client-side** on locked nodes.
6. `window.__pflash` dev hook (openSun/openPlanet/openLocked/lore) for screenshot
   automation — exposes only data already client-side.

Screenshots: `_screenshots/v4-system.png`, `v4-planet-walker-card.png`,
`v4-planet-card.png`, `v4-sun-card.png`, `v4-locked-card.png` (genesis address demo).

## v3 changes (2026-06-10) — copy/positioning pass only

No visual/theme/layout/3D/paywall/data changes. Language only, per the strategic
insight: **most pig-butchering victims don't yet believe they're being scammed** —
they still want to believe the investment is real. v2's lead ("You're being robbed.
Let me prove it.") only spoke to the already-awake minority. v3 sells **verification
and truth**, not accusation:

1. **New hero:** "Is your investment real? **Find out in 60 seconds.**" The lede
   frames the scan as proof either way ("If it's real, you'll see it. If it's not —
   you'll see that first."). No "scam"/"robbed" language above the fold.
2. **Hero-as-protector energy.** The Phantom is on the visitor's side — "The chain
   never sleeps. Neither does the Phantom." Ticker now reads "PHANTOM FLASH TO THE
   RESCUE!" / "INVESTORS GET THE TRUTH — FAST".
3. **Branded verb: PFLASH** (the P is silent — from *P*hantom *F*lash). Main CTA is
   **"PFLASH IT ⚡"**; loading state "PFLASHING THE CHAIN…"; results header "Wallet
   PFLASHED ⚡"; success status "PFLASHED in seconds". Tagline under the hero input:
   *"PFLASH it. (The P is silent. The truth isn't.)"*
4. **Already-awake audience demoted to a secondary callout** in the About-the-Phantom
   panel: "Told to pay taxes, 'unlock fees', or fresh deposits before you can
   withdraw? Stop — and PFLASH the wallet before you send another dollar." The
   "beware the recovery pitch" warning is retained on the report section.
5. **Neutralized error copy** in `scan.js` ("the platform that gave it to you"
   instead of "the scammers"), kept honest-stats policy, $2,500 pricing, Unchained
   naming, no recovery guarantees, no attorney language. Paywall unlock copy carries
   the new voice: "You've seen the first hop. **The Phantom sees the rest.**"

Screenshots: `_screenshots/v3-index.png`, `v3-scan.png`, `v3-checkout.png`.

## v2 changes (2026-06-10)

1. **Rebrand — attorney positioning removed.** All attorney/lawyer/bar/legal-services
   language is gone. The service line is now **"Phantom Flash Unchained Investigation"**;
   the product is the **Full Unchained Report ($2,500)** — an investigative analysis.
   New footer disclaimer (marked `DRAFT — DISCLAIMER PENDING FINAL REVIEW`):
   informational investigative analysis, results not guaranteed, not legal/financial/
   investment advice, not affiliated with any wallet/exchange product (avoids
   confusion with the "Phantom" wallet brand — the full "Phantom Flash" mark is used
   everywhere, with the ⚡ lightning identity).
2. **Comic-noir theme.** Bangers display font (Google Fonts), comic-panel borders and
   offset shadows, halftone-dot textures, cyan electric glow, newsprint headline
   ticker ("PHANTOM FLASH STRIKES AGAIN!"), darkened comic-cover hero background
   (`assets/hero-noir.jpg`), and an "About the Phantom" panel using the noir office
   artwork (`assets/phantom-office.jpg`).
3. **3D "solar system" blockchain explorer** on `scan.html` (replaces the 2D
   cytoscape graph). Built on [3d-force-graph](https://github.com/vasturiano/3d-force-graph)
   (pinned `@1.80.0` via unpkg CDN):
   - Scanned wallet = glowing cyan **sun** at the center.
   - Real first-hop counterparties = **planets**, sized by volume, green (sent in) /
     red (received out), with directional particle flows on the links.
   - Full orbit/zoom (mouse + touch). **Click any node** → camera flies to it and an
     info card opens (truncated address, BTC + USD in/out, shared tx count).
   - **Locked outer ring:** dim "mystery planets" labeled e.g. "EXCHANGE IDENTIFIED —
     LOCKED". Clicking one opens the paywall card → checkout. These nodes are
     **purely decorative — zero real second-hop data ships to the client**, so the
     paywall cannot be bypassed via inspect-element.
   - Node cap ≈ 60 (44 real planets + 14 locked + sun) for performance; a
     "showing top counterparties by volume" note appears when capped.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Landing: verification-first hero ("Is your investment real?") + PFLASH input, headline ticker, how-it-works, About-Phantom-Flash panel (incl. warning-signs callout), $2,717.17 report pitch, CTA. |
| `scan.html` | PFLASH results ("Wallet PFLASHED ⚡"): live stats (received/sent/tx count/counterparties/date range — all computed from fetched data, nothing fabricated), 3D system explorer, locked deep-trace findings, tx table. |
| `checkout.html` | Lead-capture form (mailto fallback) + Stripe payment stub. |

## v7 — Character-select creatures (animated)

Clicking a planet now opens a **video-game character-select stage** inside the
info card: the planet's resident creature is a bespoke inline-SVG character that
idle-animates on a glowing podium — rotating dashed select-ring, breathing
spotlight cone, slow-spinning halftone burst, and a cream comic name plate
("THE SWIFT BUNNY of PLANET WALKER").

- **12 + 1 bespoke SVG creatures** in `assets/scan.js` (`CREATURE_ART`): bunny
  (canon Planet Walker resident — fast bounce + ear twitch + speed lines, the
  showcase loop), fox & wolf (pace + tail swish), owl (slow blink + head tilt),
  raven (wing ruffle), kraken & jellyfish (float + tentacle drift), golem
  (heavy-breathing shoulder rise + core glow pulse), stag & tortoise (head
  raise), serpent (sway + tongue flicker), moth (wing flutter), scorpion
  (sting raise).
- **Animations are CSS keyframes, transform/opacity only** (GPU-cheap, 1–3.4s
  loops, no libraries, no GIFs) — classes `a-*` in `assets/style.css`.
  `prefers-reduced-motion: reduce` kills all loops (static pose fallback).
- **Famous planet features:** every planet gets a deterministic "famous for"
  trait (volcano fields, ice rings, endless storms, crystal canyons, twin
  moons, glowing seas, magnetic mountains… 16 total, seeded from the wallet
  address hash like everything else) — woven into the lore text and shown as a
  small amber badge on the select stage.
- **Locked worlds** keep the shrouded treatment: a silhouetted creature
  (ink-black fill, amber glowing eyes, `UNKNOWN RESIDENT` plate) on an
  amber-lit podium with the paywall copy. Silhouette is derived from the lock
  label string — still **zero real downstream data client-side**.
- **Mobile:** stage compresses to 132px tall in the bottom-sheet card; audited
  375/390/414 widths — no horizontal overflow (`docOverflow: null` on all
  pages). Desktop node card now scrolls if taller than the 3D stage.

Screenshots: `_screenshots/v7-system.png`, `v7-walker-card.png`,
`v7-planet-card.png`, `v7-locked-card.png`, `v7-mobile-system.png`,
`v7-mobile-walker-card.png`. Regenerate with `node _screenshots/shoot-v7.js`.

## Data pipeline (unchanged from v1, verified live)

- Primary: `https://mempool.space/api/address/{addr}` + `/txs` (most recent ~50 txs)
  and `/api/v1/prices` for USD.
- Fallback: `https://blockchain.info/rawaddr/{addr}?limit=50&cors=true`.
- Graceful states: missing address, invalid format, no-activity address, API failure
  (both sources down), 3D-library/WebGL failure (falls back to tx table notice).

## Honest-stats policy

The free scan only displays numbers actually computed from fetched first-hop data.
v1's fake static findings ("3 services", "Hub detected", "High") were replaced with
blurred `████` placeholders behind the lock overlays.

## Before launch (TODOs in code)

1. **Stripe Payment Link** — replace `#TODO-STRIPE-PAYMENT-LINK` in `checkout.html`.
2. **Formspree (or similar)** — replace the mailto fallback in `checkout.html`;
   confirm intake destination email.
3. **Finalize the footer disclaimer** and remove the `DRAFT` tag.

## Dev

```bash
cd projects/phantomflash-site
python3 -m http.server 8742
# http://localhost:8742  — test scan with any active BTC address
```

Screenshots: `_screenshots/v7-*.png` (current — character-select cards, desktop
1440 + mobile 390×844); `v6-*` (comic-noir pass), `v5-mobile-*`, `v4-*` (lore
layer), `v3-*`, `v2-*` and unprefixed v1 screenshots retained for history.
Regenerate with `node _screenshots/shoot-v7.js` (cards) / `shoot-v6.js` (full
pages) while the local server runs; `audit-mobile.js` re-checks overflow/touch
targets.

## Assets

- `assets/hero-desk-panel.jpg` — **canonical Phantom Flash desk panel** (1600px, ~360 KB): comic-noir, Phantom Flash on the corded phone, Ravens Edge Register "HOUSE OF BONES" front page on the monitor. Hero backdrop (CSS, darkened overlay), About-panel portrait, and og:image on all three pages.
- `assets/favicon.svg` / `favicon-32.png` / `apple-touch-icon.png` — lightning-bolt mark (v5).
- `assets/style.css` — comic-noir design system + mobile breakpoint (≤880px) +
  v7 character-select stage & creature idle-animation keyframes.
- `assets/scan.js` — scan pipeline + 3D explorer (mobile node cap + touch
  handling) + v7 `CREATURE_ART` SVG library, famous-feature generator, and
  select-stage card renderer.
