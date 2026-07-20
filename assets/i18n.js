/* Phantom Flash i18n v8 — static, client-side language layer */
(function () {
  'use strict';

  var PRICE = '$271';
  var PRICE_FULL = '$2,717.17';
  var LANGS = {
    en: 'English', es: 'Español', zh: '中文', vi: 'Tiếng Việt',
    pt: 'Português', fr: 'Français', de: 'Deutsch'
  };

  var D = {
    en: {
      metaIndex: 'Is your crypto investment real? PFLASH the wallet — a free 60-second on-chain scan that shows where your money actually lives on the blockchain. Verify before you send another dollar.',
      metaScan: 'Your wallet, PFLASHED: a live on-chain scan rendered as an interactive 3D system. See where your money actually lives — free, in seconds.',
      metaCheckout: 'Put Phantom Flash on the trail: the PFLASH-IT Report ($271) at machine speed, or the Full Owlchained Report ($2,717.17) — the hand-built investigation with evidence package and a call with a real human.',
      navHow: 'How it works', navReport: 'The Report', navFree: 'Free PFLASH', navHome: 'Home', navUnlock: 'Unlock Full Report',
      eyebrow: '⚡ Owlchained — Instant Cryptocurrency Tracing',
      hero: 'Is your investment real?<br><span class="glow">Find out in 60 seconds.</span>',
      lede: 'Your money leaves a trail on the blockchain — public, permanent, impossible to fake. <strong>This is what a wallet really looks like. Now look at yours.</strong>',
      demoBadge: '● LIVE TRACE — this is what an on-chain tracing looks like. Now find yours:',
      sunDockLabel: 'Drop your wallet address into the sun',
      addrPlaceholder: 'Paste a wallet address — BTC (bc1q…, 1A1z…) or ETH (0x…)', pflashButton: 'PFLASH IT ⚡',
      hint1: 'Free instant PFLASH · live blockchain data · no account needed · Bitcoin, Ethereum, USDT & USDC',
      hint2: 'PFLASH it. (The P is silent. The truth isn\'t.)',
      trust1: '⚡ Live blockchain data — nothing simulated', trust2: '⚡ Real wallets. Real transactions. Real answers.', trust3: '⚡ Reports built for exchange & law-enforcement escalation',
      howSub: 'Three steps. The first one is free, takes sixty seconds, and shows you what\'s actually on the chain.',
      deskTitle: 'The chain never sleeps.', deskSub: 'Neither does Phantom Flash.',
      deskP1: 'Phantom Flash finds your crypto — whether it\'s tied up in an investment, a friend is holding it, someone took it, or you just want to see where it went. Paste the wallet and watch the chain show you.',
      deskP2: 'The on-chain record is the whole story. Every transaction ever made with your money is carved into a public ledger that nobody can edit and nobody can delete. The Phantom Flash Owlchained Investigation reads that ledger the way professional investigators do — until the full picture is on the table. Whatever the truth is, it\'s yours.',
      warningTitle: 'What do you want to find?', warningText: 'Did a friend say he\'s holding your Bitcoin for you? Want to check on your son\'s crypto trading? Sent money into an investment and want to see where it actually went? Whatever the reason — paste the wallet and Phantom Flash follows the coins. No accusations, no assumptions. Just where your money is.',
      comicTitle: '“Find it for me.”', comicSub: 'Whatever happened to your crypto — an investment gone quiet, a friend who says he\'s holding it, a night you\'d take back — you just want it found. That\'s the call Phantom Flash answers.', comicCta: 'Find your crypto — free PFLASH ⚡',
      reportTitle: 'Two reports. One truth.',
      reportSub: 'Need the answer <em>now</em>? PFLASH-IT. Building a case? Go Full Owlchained. Same chain, same truth — you choose the depth.',
      price: PRICE, priceFull: PRICE_FULL, getReport: 'Get my report →',
      pfLabel: '⚡ PFLASH-IT Report', pfTag: 'One upload. Machine speed. Now.',
      pf1: 'Paste the wallet, add one document — that\'s all it takes to start',
      pf2: 'Automated multi-hop trace of your funds — wallets, transactions, convergence points',
      pf3: 'Interactive web report: tracing board, wallet inventory, key findings',
      pf4: 'Exchange & service identification — where your money actually landed, named',
      pf5: '<strong>PFLASH speed</strong> — most reports delivered same day',
      pf6: '$171 per update as your case develops',
      pfCta: 'PFLASH-IT — ' + PRICE + ' →',
      owlLabel: '🦉 Full Owlchained Report', owlTag: 'The full investigation — built by hand, chained down.',
      owl1: '<strong>Everything in the PFLASH-IT Report</strong>, plus:',
      owl2: 'Hand-built investigative workup — every hop verified, whatever the truth turns out to be',
      owl3: 'The Story — your money\'s journey as a plain-language case narrative',
      owl4: 'Evidence package formatted for IC3, FBI, Secret Service, and state law enforcement',
      owl5: '<strong>A call with a real human</strong> — walk the findings and next steps together',
      owl6: 'Delivered in 5–7 business days',
      owlCta: 'Go Full Owlchained — ' + PRICE_FULL + ' →',
      bewareTitle: 'Beware the “recovery” pitch.', bewareText: 'Strangers who cold-message crypto investors and promise to “get your funds back” for an upfront fee are almost always running a second scheme. The Owlchained Report does not promise recovery — it gives you the verified, documented truth of where your money went, in a form exchanges and law enforcement can act on.',
      finalCta: 'Before you send another dollar — PFLASH the wallet.', finalSub: 'Sixty seconds. One address. The live blockchain record, right in front of you.',
      disclaimer: 'The Phantom Flash Owlchained Report is an investigative blockchain analysis provided for informational purposes only. It is not a guarantee or commitment of any kind. Phantom Flash and its operators are not responsible for any incorrect, incomplete, or outdated tracing information in any report or free scan. Results are not guaranteed, and recovery of funds is not promised or implied. Nothing on this site is legal, financial, or investment advice. Free scan data is retrieved live from public blockchain sources and is presented as-is. Phantom Flash is an independent investigation service and is not affiliated with any cryptocurrency wallet, exchange, or software product.',
      scanTitle: 'Wallet PFLASHED ⚡', scanLoading: 'PFLASHING THE CHAIN…', scanBack: '← PFLASH another address',
      totalIn: 'Total received', totalOut: 'Total sent out', txs: 'Transactions', cps: 'Counterparties (1st hop)', window: 'Activity window',
      systemTitle: 'The System', liveData: '● LIVE BLOCKCHAIN DATA', systemSub: 'This is where your money actually lives — and these planets are <strong>inhabited</strong>. The wallet you PFLASHED is the sun. Every planet is a real wallet it transacted with — sized by volume, each with a name, a resident, and a history written by your own transactions. Drag to orbit, scroll to zoom, <strong>click any planet</strong> to fly to it: you\'ll get the hard numbers <em>and</em> the planet\'s story. <strong>Some worlds are already charted. The shrouded ones — and everything beyond — unlock with the Full Owlchained Report.</strong>',
      cpLockedLabel: 'COUNTERPARTY #{n} — LOCKED', moreCpLocked: 'MORE COUNTERPARTIES — LOCKED',
      cpLockedHover: 'a real first-hop wallet, charted by Phantom Flash · unlocked in the Full Owlchained Report · click for details',
      txCpLocked: 'LOCKED — full report', txMoreLocked: '+ {n} more transactions — unlocked in the Full Owlchained Report',
      deepTitle: 'Deep-trace findings', locked: '🔒 LOCKED', paywallTitle: 'You\'ve seen the first hop. Phantom Flash sees the rest.', paywallSub: 'The PFLASH-IT Report follows your money through every hop at machine speed — one upload, delivered fast, ' + PRICE + '. Building a case? The Full Owlchained Report (' + PRICE_FULL + ') adds the hand-built investigation, evidence package, and a call with a real human. Time matters — crypto moves in days, not months.', payCta: 'Get the PFLASH-IT Report — ' + PRICE + ' →',
      recentTx: 'Recent transactions', recentSub: '(10 most recent — free)', date: 'Date', dir: 'Direction', amt: 'Amount', cp: 'Counterparty (first hop)', txid: 'TXID',
      checkoutEyebrow: '⚡ PFLASH-IT · 🦉 Full Owlchained', checkoutTitle: 'Put Phantom Flash on the trail', checkoutSub: 'Pick your report, tell us where to reach you and which wallet to trace, complete payment, and Phantom Flash gets to work. Don’t wait until your documents are together to order — your report comes with a private account, and everything you add in the first 48 hours is included.', step1: 'Step 1 — Your information', name: 'Full name', email: 'Email', phone: 'Phone', walletLabel: 'Wallet address to trace', story: 'Add your story & documents — now, or anytime after payment', continuePay: 'Send my info — continue to payment →', captured: '✓ Information captured. Complete payment in Step 2 and Phantom Flash is on the trail. If your email app opened, hit send — that delivers your intake to our team (fallback).', order: 'Order summary', step2: 'Step 2 — Payment', paySecure: 'Pay ' + PRICE + ' securely (Stripe) →', afterPay: 'What happens after payment:', afterPayText: 'you\'ll receive a confirmation email, an engagement summary, and a short intake call gets scheduled. Phantom Flash starts tracing immediately; reports are typically delivered in 5–7 business days. Rush handling is available when time is critical — mention it in your notes.',
      darkTitle: 'Don\u2019t get left in the dark\u2026', darkText: 'Somewhere right now, someone is deciding whether to send more money into a wallet they\u2019ve never actually looked at. The chain has been keeping the receipts the whole time \u2014 public, permanent, sixty seconds away. The only people who stay in the dark are the ones who never turn on the light.', darkCta: 'Turn the light on \u2014 free PFLASH \u26a1',
      lockedIntro: 'The free PFLASH stops at the first hop. Phantom Flash sees the rest — the Full Owlchained Report follows your money through every hop after that: relay wallets, consolidation hubs, the exchanges and services where it actually landed.',
      bagLegend: '💰 = share of your money’s traffic', bagShare: 'Share of traffic',
      bagHonesty: '💰 bags = this planet’s share of the observed first-hop volume with your scanned wallet — not the absolute wealth of that address.',
      srTitle: 'See exactly what you get',
      srSub: 'Every Full Owlchained Report is a private interactive web report — not a PDF attachment. Here’s the actual structure, shown with a fictional case. Yours is built from your wallet’s real trail.',
      srNote: 'Sample shown with fictional data. The PFLASH-IT Report (' + PRICE + ') delivers the tracing map, wallet inventory, and key findings — machine-built at PFLASH speed. The Story and the Evidence Package come with the Full Owlchained Report.',
      srLead: 'This is what <span class="money">' + PRICE_FULL + '</span> buys.', srCta: 'Get my report →',
      sr1t: 'The Story', sr1b: 'How the scheme actually worked — the narrative of your money’s journey, told in plain language, start to finish.',
      sr2t: 'Tracing Map', sr2b: 'Every hop, visualized — an interactive flow of your funds from your wallet to where they actually landed.',
      sr3t: 'Wallet Inventory', sr3b: 'Every address documented — role, volume, first/last activity, and how it connects to your funds.',
      sr4t: 'Key Findings', sr4b: 'What matters, in plain language — the conclusions, the evidence behind each one, and what they mean for you.',
      sr5t: 'Evidence Package', sr5b: 'Formatted for law enforcement — IC3-ready summaries, transaction IDs, exchange escalation contacts, timeline.',
      noAddr: 'No address provided.', noAddrBody: 'Go back and paste the Bitcoin or Ethereum address you want to PFLASH.', invalid: 'That does not look like a valid wallet address.', busy: 'Primary source busy — trying backup node…', noTx: 'No transactions found.', noActivity: 'No activity found on this address.', unavail: '3D explorer unavailable in this browser — see the transaction table below for the same first-hop data.', notRecognized: 'That address is not recognized by the Bitcoin network.', noReach: 'Could not reach the blockchain data sources.', pflashingLive: 'PFLASHING THE CHAIN… pulling the live blockchain record', pflashDonePrefix: 'PFLASHED in seconds — ', pflashDoneSuffix: ' transactions found.'
    },
    es: {
      darkTitle: 'No te quedes en la oscuridad\u2026', darkText: 'En este momento, alguien est\u00e1 decidiendo si enviar m\u00e1s dinero a una billetera que nunca ha mirado de verdad. La cadena ha guardado los recibos todo el tiempo: p\u00fablicos, permanentes, a sesenta segundos. Los \u00fanicos que se quedan en la oscuridad son los que nunca encienden la luz.', darkCta: 'Enciende la luz \u2014 PFLASH gratis \u26a1',
      metaIndex: '¿Tu inversión en criptomonedas es real? PFLASH la billetera: un escaneo gratuito de 60 segundos que muestra dónde vive realmente tu dinero en la blockchain.',
      metaScan: 'Tu billetera, PFLASHED: un escaneo en vivo convertido en un sistema 3D interactivo.', metaCheckout: 'Pon a Phantom Flash sobre la pista: solicita el Full Owlchained Report.',
      navHow: 'Cómo funciona', navReport: 'El informe', navFree: 'PFLASH gratis', navHome: 'Inicio', navUnlock: 'Desbloquear informe',
      eyebrow: '⚡ Phantom Flash Owlchained Investigation', hero: '¿Tu inversión es real?<br><span class="glow">Descúbrelo en 60 segundos.</span>',
      lede: 'Tu dinero deja un rastro en la blockchain: público, permanente, imposible de falsificar. <strong>Así se ve realmente una billetera. Ahora mira la tuya.</strong>',
      demoBadge: '● DEMO EN VIVO — esta es la vista real de una víctima. Hazla tuya:',
      sunDockLabel: 'Deja caer tu dirección de billetera en el sol',
      addrPlaceholder: 'Pega una dirección — BTC (bc1q…, 1A1z…) o ETH (0x…)', pflashButton: 'PFLASH IT ⚡', hint1: 'PFLASH instantáneo gratis · datos blockchain en vivo · sin cuenta · Bitcoin y Ethereum', hint2: 'PFLASH it. (La P es silenciosa. La verdad no.)',
      trust1: '⚡ Datos blockchain en vivo — nada simulado', trust2: '⚡ Billeteras reales. Transacciones reales. Respuestas reales.', trust3: '⚡ Informes listos para escalar ante exchanges y autoridades',
      howSub: 'Tres pasos. El primero es gratis, toma sesenta segundos y muestra lo que realmente está en la cadena.', deskTitle: 'La cadena nunca duerme.', deskSub: 'Phantom Flash tampoco.', deskP1: 'Phantom Flash existe para que los inversionistas vean qué está pasando realmente con su dinero. Sin jerga, sin guardianes, sin esperas: el libro público leído a velocidad de rayo.', deskP2: 'El registro en cadena cuenta la historia completa. Cada transacción hecha con tu dinero queda grabada en un libro público que nadie puede editar ni borrar.', warningTitle: '¿Ya ves señales de alerta?', warningText: '¿Te pidieron pagar impuestos, “tarifas de desbloqueo” o nuevos depósitos antes de retirar? Detente: PFLASH la billetera antes de enviar otro dólar. Verifica primero. Luego decide.',
      reportSub: 'No es un resumen de chatbot. No es un PDF automático. Es una investigación completa del recorrido de tu dinero en la blockchain.', getReport: 'Obtener mi informe →', bewareTitle: 'Cuidado con el discurso de “recuperación”.', bewareText: 'Desconocidos que prometen recuperar fondos por una tarifa inicial casi siempre ejecutan una segunda estafa. El Owlchained Report no promete recuperación: entrega la verdad verificada y documentada.', finalCta: 'Antes de enviar otro dólar — PFLASH la billetera.', finalSub: 'Sesenta segundos. Una dirección. El registro blockchain en vivo frente a ti.',
      disclaimer: 'El Phantom Flash Owlchained Report es un análisis investigativo de blockchain proporcionado solo con fines informativos. No es una garantía ni un compromiso de ningún tipo. Phantom Flash y sus operadores no son responsables por información de rastreo incorrecta, incompleta o desactualizada en ningún informe o escaneo gratuito. Los resultados no están garantizados y no se promete ni se implica la recuperación de fondos. Nada en este sitio constituye asesoría legal, financiera o de inversión. Los datos del escaneo gratuito se obtienen en vivo de fuentes públicas de blockchain y se presentan tal cual. Phantom Flash es un servicio de investigación independiente y no está afiliado con ninguna billetera, exchange o producto de software de criptomonedas.',
      scanTitle: 'Billetera PFLASHED ⚡', scanLoading: 'PFLASHING THE CHAIN…', scanBack: '← PFLASH otra dirección', totalIn: 'Total recibido', totalOut: 'Total enviado', txs: 'Transacciones', cps: 'Contrapartes (1er salto)', window: 'Ventana de actividad', systemTitle: 'El sistema', liveData: '● DATOS EN VIVO', systemSub: 'Aquí es donde realmente vive tu dinero — y estos planetas están <strong>habitados</strong>. La billetera que PFLASHED es el sol. Cada planeta es una billetera real con la que transaccionó. <strong>Algunos mundos ya están cartografiados. Los mundos velados — y todo lo que hay más allá — se desbloquean con el Full Owlchained Report.</strong>', cpLockedLabel: 'CONTRAPARTE #{n} — BLOQUEADA', moreCpLocked: 'MÁS CONTRAPARTES — BLOQUEADAS', cpLockedHover: 'una billetera real de primer salto, cartografiada por Phantom Flash · se desbloquea con el Full Owlchained Report · haz clic para ver detalles', txCpLocked: 'BLOQUEADA — informe completo', txMoreLocked: '+ {n} transacciones más — se desbloquean en el Full Owlchained Report', deepTitle: 'Hallazgos de rastreo profundo', locked: '🔒 BLOQUEADO', paywallTitle: 'Viste el primer salto. Phantom Flash ve el resto.', paywallSub: 'El Full Owlchained Report sigue tu dinero por cada salto, nombra los servicios donde aterrizó y documenta todo el recorrido.', payCta: 'Desbloquear el PFLASH-IT Report — ' + PRICE + ' →', recentTx: 'Transacciones recientes', date: 'Fecha', dir: 'Dirección', amt: 'Cantidad', cp: 'Contraparte (primer salto)', txid: 'TXID',
      checkoutEyebrow: '⚡ Full Owlchained Report', checkoutTitle: 'Pon a Phantom Flash sobre la pista', checkoutSub: 'Dinos cómo contactarte y qué billetera rastrear. Luego completa el pago y Phantom Flash se pone a trabajar.', step1: 'Paso 1 — Tu información', name: 'Nombre completo', email: 'Correo electrónico', phone: 'Teléfono', walletLabel: 'Dirección de billetera a rastrear', story: 'Cuéntanos la historia (opcional)', continuePay: 'Continuar al pago →', captured: '✓ Información capturada. Completa el pago en el Paso 2 y Phantom Flash estará sobre la pista.', order: 'Resumen del pedido', step2: 'Paso 2 — Pago', paySecure: 'Pagar ' + PRICE + ' de forma segura (Stripe) →', afterPay: 'Qué sucede después del pago:', afterPayText: 'recibirás un correo de confirmación, un resumen de ingreso y se programará una breve llamada. Phantom Flash comienza el rastreo de inmediato.',
      bagLegend: '💰 = parte del tráfico de tu dinero', bagShare: 'Parte del tráfico',
      bagHonesty: '💰 bolsas = la parte de este planeta del volumen de primer salto observado con tu billetera escaneada — no la riqueza absoluta de esa dirección.',
      srTitle: 'Mira exactamente lo que recibes',
      srSub: 'Cada Full Owlchained Report es un informe web interactivo y privado — no un PDF adjunto. Esta es la estructura real, mostrada con un caso ficticio. El tuyo se construye con el rastro real de tu billetera.',
      srNote: 'Muestra con datos ficticios. Tu informe se construye a mano con el registro real en cadena de tu billetera.',
      srLead: 'Esto es lo que <span class="money">' + PRICE + '</span> compra.', srCta: 'Obtener mi informe →',
      sr1t: 'La historia', sr1b: 'Cómo funcionó realmente el esquema: la narrativa del recorrido de tu dinero, en lenguaje claro, de principio a fin.',
      sr2t: 'Mapa de rastreo', sr2b: 'Cada salto, visualizado: un flujo interactivo de tus fondos desde tu billetera hasta donde realmente aterrizaron.',
      sr3t: 'Inventario de billeteras', sr3b: 'Cada dirección documentada: rol, volumen, primera/última actividad y cómo se conecta con tus fondos.',
      sr4t: 'Hallazgos clave', sr4b: 'Lo que importa, en lenguaje claro: las conclusiones, la evidencia detrás de cada una y qué significan para ti.',
      sr5t: 'Paquete de evidencia', sr5b: 'Formateado para las autoridades: resúmenes listos para IC3, IDs de transacciones, contactos de escalación y línea de tiempo.',
      noAddr: 'No se proporcionó dirección.', noAddrBody: 'Regresa y pega la dirección Bitcoin o Ethereum que quieres PFLASH.', invalid: 'Eso no parece una dirección de billetera válida.', busy: 'La fuente principal está ocupada — probando nodo de respaldo…', noTx: 'No se encontraron transacciones.', noActivity: 'No se encontró actividad en esta dirección.', unavail: 'El explorador 3D no está disponible en este navegador.', notRecognized: 'La red Bitcoin no reconoce esa dirección.', noReach: 'No se pudo acceder a las fuentes de datos blockchain.', pflashDonePrefix: 'PFLASHED en segundos — ', pflashDoneSuffix: ' transacciones encontradas.', pflashLive: 'PFLASHING THE CHAIN… leyendo el registro blockchain en vivo'
    },
    zh: {}, vi: {}, pt: {}, fr: {}, de: {}
  };

  function extend(lang, o) { D[lang] = Object.assign({}, D.en, o); }
  extend('zh', {
    darkTitle:'不要被留在黑暗里…', darkText:'此刻，有人正决定要不要继续向一个他从未真正看过的钱包转账。链上一直在保存收据：公开、永久，只需六十秒。唯一留在黑暗里的人，是从不开灯的人。', darkCta:'把灯打开 — 免费 PFLASH ⚡',
    metaIndex: '你的加密投资是真的吗？PFLASH 这个钱包——免费 60 秒链上扫描，查看你的钱在区块链上真正去了哪里。', navHow:'如何运作', navReport:'报告', navFree:'免费 PFLASH', navHome:'首页', navUnlock:'解锁完整报告', hero:'你的投资是真的吗？<br><span class="glow">60 秒内看清楚。</span>', lede:'你的钱会在区块链上留下痕迹：公开、永久、无法伪造。<strong>这就是一个钱包真正的样子。现在看看你的。</strong>', addrPlaceholder:'粘贴钱包地址 — BTC（bc1q…、1A1z…）或 ETH（0x…）', hint1:'免费即时 PFLASH · 实时区块链数据 · 无需账号 · Bitcoin 和 Ethereum', hint2:'PFLASH it.（P 不发音。真相不会沉默。）', trust1:'⚡ 实时区块链数据 — 非模拟', trust2:'⚡ 真实钱包。真实交易。真实答案。', trust3:'⚡ 可用于交易所和执法升级的报告', howSub:'三步。第一步免费，只需 60 秒，就能看到链上真实记录。', deskTitle:'链从不睡觉。', deskSub:'Phantom Flash 也不睡。', deskP1:'Phantom Flash 的目的只有一个：让普通投资者看清自己的钱到底发生了什么。没有黑话，没有门槛，没有等待。', deskP2:'链上记录就是完整故事。你的钱发生过的每一笔交易，都刻在任何人都无法修改或删除的公共账本上。', warningTitle:'已经看到危险信号？', warningText:'如果有人要求你先付“税费”、解锁费或再充值才能提现，请先停下——在再转一美元之前 PFLASH 钱包。杀猪盘和虚假投资平台常用这种话术。先验证，再决定。', reportSub:'不是聊天机器人摘要，也不是自动 PDF。这是对你的钱在区块链上路径的完整调查。', getReport:'获取我的报告 →', bewareTitle:'警惕“追回资金”的话术。', bewareText:'陌生人主动联系并承诺先收费再追回资金，几乎总是在进行第二次骗局。Owlchained Report 不承诺追回，只提供经验证、可记录的资金去向真相。', finalCta:'在再转一美元之前——PFLASH 钱包。', finalSub:'60 秒。一个地址。实时链上记录，就在你面前。', disclaimer:'Phantom Flash Owlchained Report 仅作为信息用途的区块链调查分析。它不是任何形式的保证或承诺。对于任何报告或免费扫描中的错误、不完整或过时的追踪信息，Phantom Flash 及其运营方不承担责任。结果不作保证，也不承诺或暗示可以追回资金。本网站内容不构成法律、财务或投资建议。免费扫描数据来自公开区块链来源并按原样呈现。Phantom Flash 是独立调查服务，与任何加密货币钱包、交易所或软件产品无关联。', scanTitle:'钱包已 PFLASHED ⚡', totalIn:'收到总额', totalOut:'转出总额', txs:'交易', cps:'对手方（第一跳）', window:'活动时间', systemTitle:'系统', liveData:'● 实时链上数据', systemSub:'这里就是你的钱真正存在的地方——这些星球是<strong>有人居住的</strong>。你 PFLASH 的钱包是太阳，每个星球都是与它互动过的真实钱包。<strong>一部分世界已经被绘制成图。那些被遮蔽的世界——以及更远的一切——需要 Full Owlchained Report 才能解锁。</strong>', demoBadge:'● 实时演示 — 这就是受害者眼中的真实视角。让它变成你的：', sunDockLabel:'把你的钱包地址投入太阳', cpLockedLabel:'对手方 #{n} — 已锁定', moreCpLocked:'更多对手方 — 已锁定', cpLockedHover:'一个真实的第一跳钱包，已由 Phantom Flash 绘制成图 · 在 Full Owlchained Report 中解锁 · 点击查看', txCpLocked:'已锁定 — 完整报告', txMoreLocked:'+ 还有 {n} 笔交易 — 在 Full Owlchained Report 中解锁', deepTitle:'深度追踪发现', locked:'🔒 已锁定', paywallTitle:'你已经看到第一跳。Phantom Flash 看得到后面的全部。', paywallSub:'Full Owlchained Report 会沿每一跳追踪你的钱，标出它最终到达的服务，并记录整个路径。', payCta:'解锁 PFLASH-IT Report — ' + PRICE + ' →', recentTx:'最近交易', date:'日期', dir:'方向', amt:'金额', cp:'对手方（第一跳）', checkoutTitle:'让 Phantom Flash 开始追踪', checkoutSub:'告诉我们如何联系你以及要追踪哪个钱包。完成付款后，Phantom Flash 开始工作。', step1:'第一步 — 你的信息', name:'全名', email:'邮箱', phone:'电话', walletLabel:'要追踪的钱包地址', story:'告诉我们经过（可选）', continuePay:'继续付款 →', order:'订单摘要', step2:'第二步 — 付款', paySecure:'通过 Stripe 安全支付 ' + PRICE + ' →', afterPay:'付款后会发生什么：', afterPayText:'你会收到确认邮件、案件摘要，并安排一次简短沟通。Phantom Flash 会立即开始追踪。'
  });
  extend('vi', { darkTitle:'Đừng bị bỏ lại trong bóng tối…', darkText:'Ngay lúc này, có người đang quyết định có gửi thêm tiền vào một ví mà họ chưa bao giờ thật sự nhìn vào hay không. Blockchain vẫn luôn giữ biên lai: công khai, vĩnh viễn, chỉ cách sáu mươi giây. Người duy nhất ở lại trong bóng tối là người không bao giờ bật đèn.', darkCta:'Bật đèn lên — PFLASH miễn phí ⚡', navHow:'Cách hoạt động', navReport:'Báo cáo', navFree:'PFLASH miễn phí', navHome:'Trang chủ', navUnlock:'Mở báo cáo', hero:'Khoản đầu tư của bạn có thật không?<br><span class="glow">Biết trong 60 giây.</span>', lede:'Tiền của bạn để lại dấu vết trên blockchain: công khai, vĩnh viễn, không thể làm giả. Dán địa chỉ ví bạn đã gửi tiền tới, Phantom Flash sẽ đọc dữ liệu trực tiếp: tiền đang thật sự ở đâu, đã đi đâu, và đi cùng ví nào. <strong>Nếu nó thật, bạn sẽ thấy. Nếu không, bạn cũng sẽ thấy điều đó trước.</strong>', addrPlaceholder:'Dán địa chỉ ví — BTC (bc1q…, 1A1z…) hoặc ETH (0x…)', hint1:'PFLASH miễn phí tức thì · dữ liệu blockchain trực tiếp · không cần tài khoản · Bitcoin & Ethereum', hint2:'PFLASH it. (Chữ P im lặng. Sự thật thì không.)', trust1:'⚡ Dữ liệu blockchain trực tiếp — không mô phỏng', trust2:'⚡ Ví thật. Giao dịch thật. Câu trả lời thật.', trust3:'⚡ Báo cáo dùng để làm việc với sàn và cơ quan chức năng', warningTitle:'Đã thấy dấu hiệu cảnh báo?', warningText:'Nếu bạn bị yêu cầu đóng “thuế”, phí mở khóa hoặc nạp thêm tiền trước khi rút, hãy dừng lại — PFLASH ví trước khi gửi thêm tiền. Đây là dấu hiệu phổ biến của lừa đảo đầu tư / “pig-butchering”.', disclaimer:'Phantom Flash Owlchained Report là phân tích điều tra blockchain chỉ nhằm mục đích thông tin. Đây không phải là bảo đảm hay cam kết dưới bất kỳ hình thức nào. Phantom Flash và bên vận hành không chịu trách nhiệm về thông tin truy vết sai, thiếu hoặc lỗi thời trong bất kỳ báo cáo hoặc bản quét miễn phí nào. Kết quả không được bảo đảm và không hứa hẹn hay ngụ ý việc thu hồi tiền. Nội dung trang này không phải tư vấn pháp lý, tài chính hoặc đầu tư. Dữ liệu quét miễn phí được lấy trực tiếp từ nguồn blockchain công khai và được trình bày nguyên trạng. Phantom Flash là dịch vụ điều tra độc lập, không liên kết với ví, sàn giao dịch hoặc phần mềm tiền mã hóa nào.', scanTitle:'Ví đã PFLASHED ⚡', totalIn:'Tổng nhận', totalOut:'Tổng gửi ra', txs:'Giao dịch', cps:'Đối tác (bước 1)', window:'Khoảng hoạt động', systemTitle:'Hệ thống', liveData:'● DỮ LIỆU TRỰC TIẾP', deepTitle:'Phát hiện truy vết sâu', locked:'🔒 KHÓA', paywallTitle:'Bạn đã thấy bước đầu. Phantom Flash thấy phần còn lại.', payCta:'Mở khóa PFLASH-IT Report — ' + PRICE + ' →', checkoutTitle:'Đưa Phantom Flash vào cuộc', checkoutSub:'Cho chúng tôi biết cách liên hệ và ví cần truy vết. Sau khi thanh toán, Phantom Flash bắt đầu làm việc.', step1:'Bước 1 — Thông tin của bạn', name:'Họ tên', email:'Email', phone:'Điện thoại', walletLabel:'Địa chỉ ví cần truy vết', story:'Kể câu chuyện (tùy chọn)', continuePay:'Tiếp tục thanh toán →', order:'Tóm tắt đơn hàng', step2:'Bước 2 — Thanh toán', paySecure:'Thanh toán an toàn ' + PRICE + ' (Stripe) →' });
  extend('pt', { darkTitle:'Não fique no escuro…', darkText:'Agora mesmo, alguém está decidindo se envia mais dinheiro para uma carteira que nunca olhou de verdade. A blockchain guardou os recibos o tempo todo: públicos, permanentes, a sessenta segundos. Os únicos que ficam no escuro são os que nunca acendem a luz.', darkCta:'Acenda a luz — PFLASH grátis ⚡', navHow:'Como funciona', navReport:'O relatório', navFree:'PFLASH grátis', navHome:'Início', navUnlock:'Desbloquear relatório', hero:'Seu investimento é real?<br><span class="glow">Descubra em 60 segundos.</span>', lede:'Seu dinheiro deixa um rastro na blockchain: público, permanente, impossível de falsificar. Cole o endereço da carteira e Phantom Flash mostra o registro ao vivo. <strong>Se for real, você verá. Se não for, verá isso primeiro.</strong>', addrPlaceholder:'Cole um endereço — BTC (bc1q…, 1A1z…) ou ETH (0x…)', hint1:'PFLASH instantâneo grátis · dados blockchain ao vivo · sem conta · Bitcoin e Ethereum', hint2:'PFLASH it. (O P é silencioso. A verdade não.)', warningTitle:'Já viu sinais de alerta?', warningText:'Pedem impostos, taxas de desbloqueio ou novos depósitos antes de liberar saque? Pare — PFLASH a carteira antes de enviar outro dólar.', disclaimer:'O Phantom Flash Owlchained Report é uma análise investigativa de blockchain fornecida apenas para fins informativos. Não é garantia nem compromisso de qualquer tipo. Phantom Flash e seus operadores não são responsáveis por informações de rastreamento incorretas, incompletas ou desatualizadas em qualquer relatório ou escaneamento gratuito. Resultados não são garantidos e recuperação de fundos não é prometida nem implícita. Nada neste site é aconselhamento jurídico, financeiro ou de investimento. Dados gratuitos vêm de fontes públicas de blockchain e são apresentados como estão. Phantom Flash é um serviço independente e não é afiliado a nenhuma carteira, exchange ou software de criptomoedas.', scanTitle:'Carteira PFLASHED ⚡', totalIn:'Total recebido', totalOut:'Total enviado', txs:'Transações', cps:'Contrapartes (1º salto)', checkoutTitle:'Coloque Phantom Flash na trilha', step1:'Passo 1 — Suas informações', name:'Nome completo', email:'Email', phone:'Telefone', walletLabel:'Endereço da carteira a rastrear', story:'Conte a história (opcional)', continuePay:'Continuar para pagamento →', order:'Resumo do pedido', step2:'Passo 2 — Pagamento', paySecure:'Pagar ' + PRICE + ' com segurança (Stripe) →' });
  extend('fr', { darkTitle:'Ne restez pas dans le noir…', darkText:'En ce moment même, quelqu’un décide s’il va envoyer encore de l’argent vers un portefeuille qu’il n’a jamais vraiment regardé. La blockchain garde les reçus depuis le début : publics, permanents, à soixante secondes. Les seuls qui restent dans le noir sont ceux qui n’allument jamais la lumière.', darkCta:'Allumez la lumière — PFLASH gratuit ⚡', navHow:'Fonctionnement', navReport:'Le rapport', navFree:'PFLASH gratuit', navHome:'Accueil', navUnlock:'Débloquer le rapport', hero:'Votre investissement est-il réel ?<br><span class="glow">Vérifiez en 60 secondes.</span>', lede:'Votre argent laisse une trace sur la blockchain : publique, permanente, impossible à falsifier. Collez l’adresse du portefeuille et Phantom Flash lit le registre en direct. <strong>Si c’est réel, vous le verrez. Sinon, vous le verrez d’abord.</strong>', addrPlaceholder:'Collez une adresse — BTC (bc1q…, 1A1z…) ou ETH (0x…)', hint1:'PFLASH instantané gratuit · données blockchain en direct · sans compte · Bitcoin et Ethereum', hint2:'PFLASH it. (Le P est silencieux. La vérité ne l’est pas.)', warningTitle:'Vous voyez déjà des signaux d’alerte ?', warningText:'On vous demande des taxes, des frais de déblocage ou un nouveau dépôt avant de retirer ? Arrêtez — PFLASH le portefeuille avant d’envoyer un dollar de plus.', disclaimer:'Le Phantom Flash Owlchained Report est une analyse d’enquête blockchain fournie uniquement à titre informatif. Il ne constitue ni garantie ni engagement d’aucune sorte. Phantom Flash et ses opérateurs ne sont pas responsables des informations de traçage incorrectes, incomplètes ou obsolètes dans tout rapport ou scan gratuit. Les résultats ne sont pas garantis et aucune récupération de fonds n’est promise ou implicite. Rien sur ce site ne constitue un conseil juridique, financier ou d’investissement. Les données gratuites proviennent de sources blockchain publiques et sont présentées telles quelles. Phantom Flash est un service d’enquête indépendant et n’est affilié à aucun portefeuille, échange ou logiciel crypto.', scanTitle:'Portefeuille PFLASHED ⚡', totalIn:'Total reçu', totalOut:'Total envoyé', txs:'Transactions', cps:'Contreparties (1er saut)', checkoutTitle:'Mettez Phantom Flash sur la piste', step1:'Étape 1 — Vos informations', name:'Nom complet', email:'E-mail', phone:'Téléphone', walletLabel:'Adresse du portefeuille à tracer', story:'Racontez l’histoire (facultatif)', continuePay:'Continuer vers le paiement →', order:'Résumé de commande', step2:'Étape 2 — Paiement', paySecure:'Payer ' + PRICE + ' en sécurité (Stripe) →' });
  extend('de', { darkTitle:'Bleiben Sie nicht im Dunkeln…', darkText:'Genau jetzt entscheidet jemand, ob er weiteres Geld an eine Wallet sendet, die er nie wirklich angesehen hat. Die Blockchain führt die Belege seit jeher: öffentlich, dauerhaft, sechzig Sekunden entfernt. Im Dunkeln bleibt nur, wer das Licht nie einschaltet.', darkCta:'Licht an — kostenloser PFLASH ⚡', navHow:'So funktioniert es', navReport:'Der Bericht', navFree:'Kostenloser PFLASH', navHome:'Start', navUnlock:'Bericht freischalten', hero:'Ist Ihre Investition echt?<br><span class="glow">Finden Sie es in 60 Sekunden heraus.</span>', lede:'Ihr Geld hinterlässt eine Spur auf der Blockchain: öffentlich, dauerhaft, nicht fälschbar. Fügen Sie die Wallet-Adresse ein; Phantom Flash liest den Live-Datensatz. <strong>Wenn es echt ist, sehen Sie es. Wenn nicht, sehen Sie das zuerst.</strong>', addrPlaceholder:'Wallet-Adresse einfügen — BTC (bc1q…, 1A1z…) oder ETH (0x…)', hint1:'Kostenloser Sofort-PFLASH · Live-Blockchain-Daten · kein Konto · Bitcoin & Ethereum', hint2:'PFLASH it. (Das P ist stumm. Die Wahrheit nicht.)', warningTitle:'Sehen Sie bereits Warnzeichen?', warningText:'Sollen Sie Steuern, Freischaltgebühren oder weitere Einzahlungen leisten, bevor Sie abheben dürfen? Stoppen Sie — PFLASH die Wallet, bevor Sie weiteres Geld senden.', disclaimer:'Der Phantom Flash Owlchained Report ist eine investigative Blockchain-Analyse ausschließlich zu Informationszwecken. Er ist keine Garantie und keine Zusage irgendeiner Art. Phantom Flash und seine Betreiber haften nicht für falsche, unvollständige oder veraltete Tracking-Informationen in einem Bericht oder kostenlosen Scan. Ergebnisse werden nicht garantiert; eine Rückgewinnung von Geldern wird nicht versprochen oder impliziert. Diese Website stellt keine Rechts-, Finanz- oder Anlageberatung dar. Kostenlose Scan-Daten stammen live aus öffentlichen Blockchain-Quellen und werden wie vorliegend dargestellt. Phantom Flash ist ein unabhängiger Ermittlungsdienst und nicht mit Wallets, Börsen oder Softwareprodukten für Kryptowährungen verbunden.', scanTitle:'Wallet PFLASHED ⚡', totalIn:'Insgesamt erhalten', totalOut:'Insgesamt gesendet', txs:'Transaktionen', cps:'Gegenparteien (1. Sprung)', checkoutTitle:'Setzen Sie Phantom Flash auf die Spur', step1:'Schritt 1 — Ihre Angaben', name:'Vollständiger Name', email:'E-Mail', phone:'Telefon', walletLabel:'Zu verfolgende Wallet-Adresse', story:'Erzählen Sie die Geschichte (optional)', continuePay:'Weiter zur Zahlung →', order:'Bestellübersicht', step2:'Schritt 2 — Zahlung', paySecure:PRICE + ' sicher bezahlen (Stripe) →' });

  // v8 supplemental full-page translation keys
  var MORE = {
    en: {
      howTitle:'How it works', step01:'STEP 01', step02:'STEP 02', step03:'STEP 03', step1Title:'Paste the address', step2Title:'PFLASH it — free', step3Title:'Choose your report', step1Body:'The wallet address you have been sending funds to — from your exchange, your broker, your trading platform, or your own wallet that funded it. Phantom Flash pulls the live blockchain record on the spot.', step2Body:'Seconds later, the wallet is rendered as an interactive 3D system: your target at the center, every first-hop counterparty orbiting it, real transactions on every connection. Fly around. See for yourself.', step3Body:'Need it now? The PFLASH-IT Report ($271) traces your money at machine speed from one upload. Building a case? The Full Owlchained Report ($2,717.17) is the hand-built investigation — evidence package, case narrative, and a call with a real human.', reportTitle:'Two reports. One truth.', bullet1:'Complete multi-hop trace of your funds — every wallet, every transaction, every convergence point', bullet2:'Interactive web report: tracing board, wallet inventory, timeline, key findings', bullet3:'Exchange & service identification — where your money actually landed, named', bullet4:'Evidence package formatted for IC3, FBI, Secret Service, and state law enforcement — if you ever need it', bullet5:'A direct consult call to walk you through the findings and next steps', recentTitle:'Recent investigations (anonymized)', recentBody:'⚡ Traced a six-figure transfer through ATM, processor, and relay wallets into a single controlled hub — convergence evidence now in front of law enforcement.<br><br>⚡ Multi-source retirement-fund movement reconstructed across 100+ transactions into a clean, documented timeline and exchange-escalation package.', notSureTitle:'Not sure yet?', notSureBody:'Run the <a href="#scan">free PFLASH</a> first. If the address has activity, you will see the first hop of your money — for free — before you decide anything.'
    },
    es: { howTitle:'Cómo funciona', step01:'PASO 01', step02:'PASO 02', step03:'PASO 03', step1Title:'Pega la dirección', step2Title:'PFLASH it — gratis', step3Title:'Desbloquea el Full Owlchained Report', step1Body:'La dirección de la billetera a la que has estado enviando fondos — desde tu exchange, broker, plataforma de trading o tu propia billetera. Phantom Flash lee el registro blockchain en vivo al instante.', step2Body:'Segundos después, la billetera aparece como un sistema 3D interactivo: tu objetivo en el centro, cada contraparte de primer salto orbitando, transacciones reales en cada conexión. Vuela alrededor. Compruébalo.', step3Body:'La investigación completa sigue tu dinero por cada salto: dónde está retenido, adónde se movió, qué exchanges y servicios tocó, y documenta todo el recorrido en un paquete que puedes usar.', bullet1:'Rastreo multi-salto completo de tus fondos — cada billetera, cada transacción, cada punto de convergencia', bullet2:'Informe web interactivo: tablero de rastreo, inventario de billeteras, línea de tiempo y hallazgos clave', bullet3:'Identificación de exchanges y servicios — dónde aterrizó realmente tu dinero, con nombres', bullet4:'Paquete de evidencia preparado para IC3, FBI, Servicio Secreto y autoridades estatales si lo necesitas', bullet5:'Llamada directa para revisar los hallazgos y próximos pasos', recentTitle:'Investigaciones recientes (anonimizadas)', recentBody:'⚡ Rastreamos una transferencia de seis cifras a través de ATM, procesadores y billeteras de relevo hasta un hub controlado.<br><br>⚡ Reconstruimos movimiento de fondos de jubilación en más de 100 transacciones hasta una línea de tiempo limpia.', notSureTitle:'¿Aún no estás seguro?', notSureBody:'Ejecuta primero el <a href="#scan">PFLASH gratis</a>. Si la dirección tiene actividad, verás gratis el primer salto de tu dinero antes de decidir.' },
    zh: { howTitle:'如何运作', step01:'第一步', step02:'第二步', step03:'第三步', step1Title:'粘贴地址', step2Title:'PFLASH it — 免费', step3Title:'解锁 Full Owlchained Report', step1Body:'粘贴你一直转账到的钱包地址——无论来自交易所、经纪人、交易平台，还是你自己的出资钱包。Phantom Flash 会立即读取实时链上记录。', step2Body:'几秒后，钱包会变成一个互动 3D 系统：目标在中心，每个第一跳对手方像行星一样环绕，每条连接都是真实交易。你可以旋转、缩放、亲自查看。', step3Body:'完整调查会沿着每一跳追踪你的钱：它在哪里、流向哪里、接触过哪些交易所和服务，并把整个路径整理成你可以使用的证据包。', bullet1:'完整多跳资金追踪——每个钱包、每笔交易、每个汇聚点', bullet2:'互动网页报告：追踪板、钱包清单、时间线和关键发现', bullet3:'识别交易所和服务——你的钱最终真正落到哪里', bullet4:'可用于 IC3、FBI、Secret Service 和州执法机关的证据包', bullet5:'直接沟通电话，带你读懂发现和下一步', recentTitle:'近期调查（已匿名）', recentBody:'⚡ 将六位数转账通过 ATM、处理商和中继钱包追踪到同一个受控枢纽。<br><br>⚡ 将多来源退休资金流动重建为超过 100 笔交易的清晰时间线。', notSureTitle:'还不确定？', notSureBody:'先运行<a href="#scan">免费 PFLASH</a>。如果地址有活动，你会先免费看到资金的第一跳，再决定。' },
    vi: { howTitle:'Cách hoạt động', step01:'BƯỚC 01', step02:'BƯỚC 02', step03:'BƯỚC 03', step1Title:'Dán địa chỉ', step2Title:'PFLASH it — miễn phí', step3Title:'Mở khóa Full Owlchained Report', step1Body:'Dán địa chỉ ví mà bạn đã gửi tiền tới — từ sàn, “broker”, nền tảng giao dịch hoặc ví của chính bạn. Phantom Flash đọc dữ liệu blockchain trực tiếp ngay lập tức.', step2Body:'Vài giây sau, ví được dựng thành hệ 3D tương tác: mục tiêu ở trung tâm, các ví bước đầu tiên quay quanh, mỗi đường nối là giao dịch thật.', step3Body:'Bản điều tra đầy đủ theo tiền qua từng bước — nơi nó được giữ, nơi nó đi, sàn và dịch vụ nào đã chạm tới — rồi ghi lại thành gói bạn có thể sử dụng.', bullet1:'Truy vết đa bước đầy đủ — từng ví, từng giao dịch, từng điểm hội tụ', bullet2:'Báo cáo web tương tác: bảng truy vết, danh sách ví, dòng thời gian, phát hiện chính', bullet3:'Xác định sàn và dịch vụ — nơi tiền của bạn thật sự đã đến', bullet4:'Gói bằng chứng dùng được cho IC3, FBI, Secret Service và cơ quan chức năng nếu cần', bullet5:'Cuộc gọi trực tiếp để giải thích phát hiện và bước tiếp theo', recentTitle:'Điều tra gần đây (ẩn danh)', recentBody:'⚡ Truy vết một khoản chuyển sáu chữ số qua ATM, bộ xử lý và ví chuyển tiếp tới một hub bị kiểm soát.<br><br>⚡ Tái dựng hơn 100 giao dịch thành dòng thời gian rõ ràng.', notSureTitle:'Chưa chắc?', notSureBody:'Chạy <a href="#scan">PFLASH miễn phí</a> trước. Nếu địa chỉ có hoạt động, bạn sẽ thấy bước đầu tiên của tiền mình miễn phí trước khi quyết định.' }
  };
  Object.keys(MORE).forEach(function(k){ D[k] = Object.assign(D[k] || {}, MORE.en, MORE[k]); });
  Object.assign(D.vi, {
    systemSub:'Đây là nơi tiền của bạn thật sự đang sống — và những hành tinh này <strong>có cư dân</strong>. Ví bạn PFLASHED là mặt trời. Mỗi hành tinh là một ví thật đã giao dịch với nó — kích thước theo khối lượng, có tên, cư dân và lịch sử được viết bằng chính giao dịch của bạn.',
    paywallSub:'Full Owlchained Report theo tiền của bạn qua từng bước, nêu tên các dịch vụ nơi tiền đã đến và ghi lại toàn bộ hành trình thành một gói bạn có thể sử dụng.',
    recentTx:'Giao dịch gần đây', date:'Ngày', dir:'Chiều', amt:'Số lượng', cp:'Đối tác (bước đầu)', txid:'TXID',
    pflashDonePrefix:'PFLASHED trong vài giây — ', pflashDoneSuffix:' giao dịch được tìm thấy.', pflashLive:'PFLASHING THE CHAIN… đang đọc dữ liệu blockchain trực tiếp',
    exchangeLocked:'Xác định sàn — đã khóa', clusterLocked:'Phân tích hub & cụm — đã khóa', riskLocked:'Chấm điểm rủi ro — đã khóa',
    lockedIntro:'PFLASH miễn phí dừng ở bước đầu. Phantom Flash thấy phần còn lại — Full Owlchained Report theo tiền qua các ví chuyển tiếp, hub gom tiền, và các sàn/dịch vụ nơi nó thật sự đã đến.',
    includes:'Truy vết đa bước · gói bằng chứng kèm theo · cuộc gọi tư vấn kèm theo', recentSub:'(tối đa 25 giao dịch gần nhất)', hud:'BƯỚC ĐẦU — TRỰC TIẾP · CÓ CƯ DÂN · 🔒 VÒNG NGOÀI — BỊ CHE PHỦ'
  });
  Object.assign(D.es, { exchangeLocked:'Identificación de exchange — bloqueada', clusterLocked:'Análisis de hubs y clústeres — bloqueado', riskLocked:'Puntuación de riesgo — bloqueada', lockedIntro:'El PFLASH gratuito se detiene en el primer salto. Phantom Flash ve el resto.', includes:'Rastreo multi-salto · paquete de evidencia incluido · llamada incluida' });
  Object.assign(D.zh, { exchangeLocked:'交易所识别 — 已锁定', clusterLocked:'枢纽与集群分析 — 已锁定', riskLocked:'风险评分 — 已锁定', lockedIntro:'免费 PFLASH 停在第一跳。Phantom Flash 能看到后面的全部。', includes:'多跳追踪 · 包含证据包 · 包含咨询电话',
    bagLegend:'💰 = 你的资金流量占比', bagShare:'流量占比',
    bagHonesty:'💰 钱袋 = 该星球在与你扫描钱包的第一跳可观察交易量中的占比，而不是该地址的绝对财富。',
    srTitle:'看看你到底能得到什么',
    srSub:'每份 Full Owlchained Report 都是一个私密的交互式网页报告——不是 PDF 附件。这里展示的是真实结构，使用虚构案例。你的报告将基于你钱包的真实链上记录构建。',
    srNote:'示例使用虚构数据。你的报告由人工根据你钱包的真实链上记录构建。',
    srLead:'这就是 <span class="money">' + PRICE + '</span> 能买到的。', srCta:'获取我的报告 →',
    sr1t:'案情故事', sr1b:'骗局到底是怎么运作的——用清晰的语言，从头到尾讲述你的钱的去向。',
    sr2t:'追踪地图', sr2b:'每一跳都可视化——从你的钱包到资金真正落脚点的交互式资金流向图。',
    sr3t:'钱包清单', sr3b:'每个地址都有记录：角色、交易量、首次/最后活动，以及它与你资金的关联。',
    sr4t:'关键发现', sr4b:'用清晰的语言说明重点：结论、每个结论背后的证据，以及对你的意义。',
    sr5t:'证据包', sr5b:'按执法机关格式整理：IC3 就绪摘要、交易 ID、交易所升级联系方式、时间线。' });

  function getLang() {
    var p = new URLSearchParams(location.search).get('lang');
    var saved = localStorage.getItem('pf_lang');
    var n = (navigator.language || 'en').slice(0,2);
    var l = p || saved || n || 'en';
    return D[l] ? l : 'en';
  }
  var lang = getLang();
  localStorage.setItem('pf_lang', lang);
  document.documentElement.lang = lang;
  function t(k) { return (D[lang] && D[lang][k]) || D.en[k] || k; }
  window.PF_I18N_T = t;
  window.PF_I18N_LANG = lang;

  function set(sel, html) { var el = document.querySelector(sel); if (el && html) el.innerHTML = html; }
  function setAllText(sel, txt) { document.querySelectorAll(sel).forEach(function(el){ el.textContent = txt; }); }
  function attr(sel, name, val) { var el = document.querySelector(sel); if (el && val) el.setAttribute(name, val); }

  function addSwitcher() {
    if (document.querySelector('.lang-switcher')) return;
    var nav = document.querySelector('.nav-links');
    if (!nav) return;
    var wrap = document.createElement('label');
    wrap.className = 'lang-switcher';
    wrap.innerHTML = '<span>🌐</span><select aria-label="Language"></select>';
    var sel = wrap.querySelector('select');
    Object.keys(LANGS).forEach(function(k){ var o=document.createElement('option'); o.value=k; o.textContent=LANGS[k]; if(k===lang) o.selected=true; sel.appendChild(o); });
    sel.addEventListener('change', function(){ localStorage.setItem('pf_lang', sel.value); var u=new URL(location.href); u.searchParams.set('lang', sel.value); location.href=u.toString(); });
    nav.appendChild(wrap);
    var foot = document.querySelector('.site-footer .legal');
    if (foot) foot.insertAdjacentHTML('beforeend','<div class="footer-langs">🌐 ' + Object.keys(LANGS).map(function(k){return '<a href="?lang='+k+'">'+LANGS[k]+'</a>';}).join(' · ') + '</div>');
  }

  function applyCommon() {
    addSwitcher();
    document.querySelectorAll('a').forEach(function(a){
      var x=a.textContent.trim();
      if(x==='How it works') a.textContent=t('navHow');
      if(x==='The Report') a.textContent=t('navReport');
      if(x==='Free PFLASH') a.textContent=t('navFree');
      if(x==='Home') a.textContent=t('navHome');
      if(x==='Unlock Full Report') a.textContent=t('navUnlock');
      if(x==='Get my report →') a.textContent=t('getReport');
    });
    document.querySelectorAll('.site-footer .legal p:first-of-type').forEach(function(p){ p.textContent = t('disclaimer'); });
  }

  function applyIndex(){
    document.title = 'Phantom Flash — ' + t('hero').replace(/<[^>]+>/g,' ');
    attr('meta[name="description"]','content',t('metaIndex')); attr('meta[property="og:description"]','content',t('metaIndex'));
    set('.hero .eyebrow', t('eyebrow')); set('.hero h1', t('hero')); set('.hero .lede', t('lede'));
    attr('#addrInput','placeholder',t('addrPlaceholder')); set('.scan-box button',t('pflashButton'));
    var hints=document.querySelectorAll('.scan-hint'); if(hints[0]) hints[0].textContent=t('hint1'); if(hints[1]) hints[1].innerHTML='<em>'+t('hint2')+'</em>';
    // v10 live-demo hero
    set('#demoBadge', t('demoBadge')); set('#sunDockLabel', t('sunDockLabel'));
    var ts=document.querySelectorAll('.trust-strip > span'); if(ts[0]) ts[0].innerHTML=t('trust1'); if(ts[1]) ts[1].innerHTML=t('trust2'); if(ts[2]) ts[2].innerHTML=t('trust3');

    set('#how .section-title', t('howTitle')); set('#how .section-sub', t('howSub'));
    var cards=document.querySelectorAll('#how .card');
    [t('step01'),t('step02'),t('step03')].forEach(function(v,i){ var el=cards[i]&&cards[i].querySelector('.num'); if(el) el.textContent=v; });
    [t('step1Title'),t('step2Title'),t('step3Title')].forEach(function(v,i){ var el=cards[i]&&cards[i].querySelector('h3'); if(el) el.textContent=v; });
    [t('step1Body'),t('step2Body'),t('step3Body')].forEach(function(v,i){ var el=cards[i]&&cards[i].querySelector('p'); if(el) el.textContent=v; });

    var split=document.querySelector('.phantom-split');
    if(split){ var h=split.querySelector('h2.section-title'); if(h) h.innerHTML=t('deskTitle')+'<br>'+t('deskSub'); var sub=split.querySelector('.section-sub'); if(sub) sub.textContent=t('deskP1'); var calls=split.querySelectorAll('.callout'); if(calls[0]) calls[0].innerHTML='<strong>'+t('deskP2').split('.')[0]+'.</strong> '+t('deskP2').split('.').slice(1).join('.'); if(calls[1]) calls[1].innerHTML='<strong>'+t('warningTitle')+'</strong> '+t('warningText'); }

    set('#comicTitle', t('comicTitle')); set('#comicSub', t('comicSub')); set('#comicCta', t('comicCta'));
    set('#report .section-title', t('reportTitle')); set('#report .section-sub', t('reportSub'));
    set('#pfCard .label', t('pfLabel')); set('#pfCard .price', t('price')); set('#pfCard .pc-tag', t('pfTag')); set('#pfCard .btn', t('pfCta'));
    var pfl=document.querySelectorAll('#pfCard li'); [t('pf1'),t('pf2'),t('pf3'),t('pf4'),t('pf5'),t('pf6')].forEach(function(v,i){if(pfl[i]) pfl[i].innerHTML=v;});
    set('#owlCard .label', t('owlLabel')); set('#owlCard .price', t('priceFull')); set('#owlCard .pc-tag', t('owlTag')); set('#owlCard .btn', t('owlCta'));
    var owl=document.querySelectorAll('#owlCard li'); [t('owl1'),t('owl2'),t('owl3'),t('owl4'),t('owl5'),t('owl6')].forEach(function(v,i){if(owl[i]) owl[i].innerHTML=v;});
    set('#bewareBox','<strong>'+t('bewareTitle')+'</strong> '+t('bewareText'));
    set('#recentBox','<div class="label">'+t('recentTitle')+'</div><p style="margin-top:10px">'+t('recentBody')+'</p>');
    set('#notSureBox','<div class="label">'+t('notSureTitle')+'</div><p style="margin-top:10px">'+t('notSureBody')+'</p>');
    // v9 sample-report section
    set('#srTitle', t('srTitle')); set('#srSub', t('srSub')); set('#srNote', t('srNote'));
    set('#srLead', t('srLead')); set('#srCta', t('srCta'));
    var srH = document.querySelectorAll('.sr-deck .sr-h'), srP = document.querySelectorAll('.sr-deck .sr-p');
    ['sr1','sr2','sr3','sr4','sr5'].forEach(function(k,i){
      if (srH[i]) srH[i].textContent = t(k+'t');
      if (srP[i]) srP[i].textContent = t(k+'b');
    });
    set('.dark-overlay h2', t('darkTitle')); set('.dark-overlay p', t('darkText')); set('.dark-overlay .btn', t('darkCta'));
    set('.cta-band h2', t('finalCta')); set('.cta-band p', t('finalSub')); set('.cta-band .btn', t('pflashButton'));
  }
  function applyScan(){
    document.title='Phantom Flash — '+t('scanTitle'); attr('meta[name="description"]','content',t('metaScan'));
    set('.scan-head h1', t('scanTitle')); set('#statusText', t('scanLoading'));
    setAllText('.stat-row .stat:nth-child(1) .label:first-child', t('totalIn'));
    setAllText('.stat-row .stat:nth-child(2) .label:first-child', t('totalOut'));
    setAllText('.stat-row .stat:nth-child(3) .label', t('txs'));
    setAllText('.stat-row .stat:nth-child(4) .label', t('cps'));
    setAllText('.stat-row .stat:nth-child(5) .label', t('window'));
    set('.stage3d + .node-card .node-title', '');
    var h2=document.querySelector('.section-title'); if(h2) h2.innerHTML=t('systemTitle')+' <span style="color:var(--green);font-size:13px;font-weight:700;letter-spacing:.1em;font-family:var(--sans)">'+t('liveData')+'</span>';
    var sub=document.querySelector('.section-title + .section-sub'); if(sub) sub.innerHTML=t('systemSub')+' <span id="capNote" style="display:none;color:var(--amber)">Showing top counterparties by volume.</span>';
    set('.hud', lang==='vi' ? '<span class="live">●</span> '+t('hud') : '<span class="live">●</span> FIRST HOP — LIVE · INHABITED &nbsp;·&nbsp; <span style="color:var(--amber)">🔒 SHROUDED WORLDS — LOCKED</span>');
    set('.controls-hint', lang==='en' ? 'drag to orbit · scroll to zoom · click a planet to visit its world' : (lang==='vi' ? 'kéo để xoay · cuộn để phóng to · nhấp hành tinh để ghé thăm' : (lang==='zh' ? '拖动旋转 · 滚轮缩放 · 点击星球查看' : 'drag to orbit · scroll to zoom · click a planet')));
    var d=document.querySelectorAll('h2.section-title')[1]; if(d) d.innerHTML=t('deepTitle')+' <span style="color:var(--amber);font-size:13px;font-weight:700;letter-spacing:.1em;font-family:var(--sans)">'+t('locked')+'</span>';
    var dsub=document.querySelectorAll('.section-title + .section-sub')[1]; if(dsub) dsub.textContent=t('lockedIntro') || t('paywallSub');
    var mini=document.querySelectorAll('.mini-lock .t'); if(mini[0]) mini[0].textContent=t('exchangeLocked'); if(mini[1]) mini[1].textContent=t('clusterLocked'); if(mini[2]) mini[2].textContent=t('riskLocked');
    set('.cta-band h2',t('paywallTitle')); set('.cta-band p',t('paywallSub')); set('#unlockBtn2',t('payCta')); var inc=document.querySelector('.cta-band p:last-child'); if(inc) inc.textContent=t('includes');
    var rt=document.querySelectorAll('h2.section-title')[2]; if(rt){ rt.childNodes[0].textContent=t('recentTx')+' '; var sp=rt.querySelector('span'); if(sp && t('recentSub')) sp.textContent=t('recentSub'); }
    var th=document.querySelectorAll('th'); [t('date'),t('dir'),t('amt'),t('cp'),t('txid')].forEach(function(v,i){ if(th[i]) th[i].textContent=v; });
    setAllText('.bag-key', t('bagLegend')); // v9 money-bag legend (desktop legend + mobile chip)
  }
  function applyCheckout(){
    document.title='Phantom Flash — '+t('checkoutTitle'); attr('meta[name="description"]','content',t('metaCheckout'));
    set('.scan-head .eyebrow',t('checkoutEyebrow')); set('.scan-head h1',t('checkoutTitle')); set('.scan-head .section-sub',t('checkoutSub'));
    set('.card h3',t('step1'));
    var labels=document.querySelectorAll('form.lead label'); [t('name'),t('email'),t('phone'),t('walletLabel'),t('story')].forEach(function(v,i){if(labels[i]) labels[i].textContent=v;});
    set('.lead button',t('continuePay')); set('#successNote',t('captured'));
    var hs=document.querySelectorAll('.card h3'); if(hs[1]) hs[1].textContent=t('order'); if(hs[2]) hs[2].textContent=t('step2');
    /* #stripeBtn label is managed by the product selector (checkout.html), not i18n */ var ap=document.querySelector('.callout strong'); if(ap) ap.textContent=t('afterPay'); var co=document.querySelector('.callout'); if(co) co.childNodes.forEach(function(n){ if(n.nodeType===3 && n.textContent.trim().length>20) n.textContent=' '+t('afterPayText'); });
  }
  function apply(){ applyCommon(); if(document.querySelector('.hero')) applyIndex(); if(document.getElementById('stage3d')) applyScan(); if(document.getElementById('leadForm')) applyCheckout(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
})();
