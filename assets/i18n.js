/* Phantom Flash i18n v9 — static, client-side language layer
   v21 rebrand: "This is the universe. You can follow your agents." Every
   language carries the full key set below (no English fallbacks needed). */
(function () {
  'use strict';

  var PRICE = '$271';
  var PRICE_FULL = '$2,717.17';
  var LANGS = {
    en: 'English', es: 'Español', zh: '中文', vi: 'Tiếng Việt',
    pt: 'Português', fr: 'Français', de: 'Deutsch'
  };

  var D = {};

  D.en = {
    metaIndex: `This is the universe. You can follow your agents. Paste any address on BTC, ETH, or XRP and see every wallet it touched, free, in seconds. Click a transaction, follow the money hop by hop, and leave the map charted for the next person.`,
    metaScan: `A live on-chain scan drawn as an interactive 3D universe: the address at the center, every wallet it dealt with in orbit around it. Free, in seconds.`,
    metaCheckout: `Put Phantom Flash on the trail: the PFLASH-IT Report (${PRICE}) follows the money through every hop at machine speed, or the Full Owlchained Report (${PRICE_FULL}) adds the hand-built analysis, the evidence package, and a call with a real human.`,
    titleIndex: `Phantom Flash — This is the universe. Follow it.`,
    titleScan: `Universe — Phantom Flash`,
    navHow: `How it works`, navReport: `The Report`, navFree: `Free PFLASH`, navHome: `Home`, navUnlock: `Unlock Full Report`,
    eyebrow: `⚡ Owlchained — Public Ledgers, Drawn as a Universe`,
    hero: `This is the <span class="glow">universe.</span>`,
    lede: `You can follow your agents. Paste an address. See everything it touched. Follow any hop. <strong>Free.</strong>`,
    demoBadge: `● LIVE DEMO — a fictional wallet and the universe around it. Now paste an address:`,
    sunDockLabel: `Drop any wallet address into the sun`,
    addrPlaceholder: `Paste a wallet address — BTC (bc1q…, 1A1z…), ETH (0x…) or XRP (r…)`, pflashButton: `PFLASH IT ⚡`,
    hint1: `Free instant PFLASH · live blockchain data · no account needed · Bitcoin, Ethereum, XRP, USDT & USDC`,
    hint2: `PFLASH it. (The P is silent. The truth isn't.)`,
    trust1: `⚡ Live blockchain data — nothing simulated`, trust2: `⚡ Real wallets. Real transactions. Real answers.`, trust3: `⚡ Free for everybody — no account, no card`,
    howSub: `Three steps. All of them free.`,
    deskTitle: `The chain never sleeps.`, deskSub: `Neither does Phantom Flash.`,
    deskP1: `The map grows with every visitor. Each address someone pastes charts a few more wallets, and each hop someone follows draws the next system. The universe you open tomorrow has more in it than the one you opened today.`,
    deskP2: `The public ledger is the whole record. Every transaction is carved into a ledger that nobody can edit and nobody can delete. Phantom Flash reads it the way analysts do and draws it for anyone, free.`,
    warningTitle: `Agents leave a trail.`, warningText: `An AI agent that holds a key signs its declarations onto a public ledger. Phantom Flash reads them back, so you can follow your agents the way you follow money. Paste the agent’s address, or open the <a href="agents.html">Agents page</a>.`,
    comicTitle: `“Follow it for me.”`, comicSub: `Someone pastes an address. The universe draws itself around it. One hop looks interesting, so they follow it, and the next system draws itself in place. That’s the call Phantom Flash answers.`, comicCta: `Paste an address — free PFLASH ⚡`,
    reportTitle: `Two reports. One truth.`,
    reportSub: `Need the whole trail <em>now</em>? PFLASH-IT. Want the hand-built analysis? Go Full Owlchained. Same chain, same record — you choose the depth.`,
    price: PRICE, priceFull: PRICE_FULL, getReport: `Get my report →`,
    pfLabel: `⚡ PFLASH-IT Report`, pfTag: `One upload. Machine speed. Now.`,
    pf1: `Paste the address, add one document — that’s all it takes to start`,
    pf2: `Automated multi-hop trace — follows the money through every hop at machine speed: wallets, transactions, convergence points`,
    pf3: `Interactive web report: the map, the wallet inventory, key findings`,
    pf4: `Exchange & service identification — where the money landed, named`,
    pf5: `<strong>PFLASH speed</strong> — most reports delivered same day`,
    pf6: `$171 per update as the trail develops`,
    pfCta: `PFLASH-IT — ${PRICE} →`,
    owlLabel: `🦉 Full Owlchained Report`, owlTag: `The full analysis — built by hand, chained down.`,
    owl1: `<strong>Everything in the PFLASH-IT Report</strong>, plus:`,
    owl2: `Hand-built tracing workup — every hop verified`,
    owl3: `The Story — the money’s journey as a plain-language narrative`,
    owl4: `Evidence package — transaction IDs, timeline, and exchange contacts, formatted for whoever needs to act on it`,
    owl5: `<strong>A call with a real human</strong> — walk the findings and next steps together`,
    owl6: `Delivered in 5–7 business days`,
    owlCta: `Go Full Owlchained — ${PRICE_FULL} →`,
    bewareTitle: `Read-only.`, bewareText: `Phantom Flash reads public ledgers. It never asks for a seed phrase or a private key, and it never touches a wallet.`,
    finalCta: `Paste an address. See the universe.`, finalSub: `One address. A few seconds. The public ledger, drawn as a universe.`,
    disclaimer: `The Phantom Flash Owlchained Report is a blockchain analysis provided for informational purposes only. It is not a guarantee or commitment of any kind. Phantom Flash and its operators are not responsible for any incorrect, incomplete, or outdated tracing information in any report or free scan. Results are not guaranteed, and no outcome is promised or implied. Nothing on this site is legal, financial, or investment advice. Free scan data is retrieved live from public blockchain sources and is presented as-is. Phantom Flash is an independent blockchain analysis service and is not affiliated with any cryptocurrency wallet, exchange, or software product. Wallet addresses entered for a scan are recorded to chart the shared map.`,
    scanTitle: `Wallet PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← PFLASH another address`,
    totalIn: `Total received`, totalOut: `Total sent out`, txs: `Transactions`, cps: `Counterparties (1st hop)`, window: `Recent activity`,
    systemTitle: `The System`, liveData: `● LIVE BLOCKCHAIN DATA`, systemSub: `This is the universe around the address you pasted. It sits at the center; every wallet it dealt with orbits it, sized by volume. Drag to rotate, scroll to zoom, click any wallet for the numbers, click any transaction to light its path and follow it. All of it free.`,
    controlsHint: `drag to rotate · scroll to zoom · click a wallet for details`,
    cpLockedLabel: `COUNTERPARTY #{n} — LOCKED`, moreCpLocked: `MORE COUNTERPARTIES — LOCKED`,
    cpLockedHover: `a real first-hop wallet, charted by Phantom Flash · the full report follows it further · click for details`,
    txCpLocked: `LOCKED — full report`, txMoreLocked: `+ {n} more transactions — the Full Owlchained Report follows them further`,
    deepTitle: `Deep-trace findings`, locked: `🔒 LOCKED`, paywallTitle: `That’s the first hop. Phantom Flash can follow the rest.`,
    paywallSub: `The PFLASH-IT Report follows the money through every hop at machine speed and hands you the map, the wallet inventory and the findings — one upload, delivered fast, ${PRICE}. The Full Owlchained Report (${PRICE_FULL}) adds the hand-built analysis, the evidence package, and a call with a real human. Crypto moves in days, not months.`,
    payCta: `Get the PFLASH-IT Report — ${PRICE} →`,
    recentTx: `Recent transactions`, recentSub: ``, date: `Date`, dir: `Direction`, amt: `Amount`, cp: `Counterparty (first hop)`, txid: `TXID`,
    checkoutEyebrow: `⚡ PFLASH-IT · 🦉 Full Owlchained`, checkoutTitle: `Put Phantom Flash on the trail`,
    checkoutSub: `Pick your report, tell us where to reach you and which address to follow, complete payment, and Phantom Flash gets to work. Your report comes with a private account, and everything you add in the first 48 hours is included.`,
    step1: `Step 1 — Your information`, name: `Full name`, email: `Email`, phone: `Phone`, walletLabel: `Wallet address to trace`,
    story: `Add notes & documents — now, or anytime after payment`, continuePay: `Send my info — continue to payment →`,
    captured: `✓ Information captured. Complete payment in Step 2 and Phantom Flash is on the trail. If your email app opened, hit send — that delivers your intake to our team (fallback).`,
    order: `Order summary`, step2: `Step 2 — Payment`, paySecure: `Pay ${PRICE} securely (Stripe) →`, afterPay: `What happens after payment:`,
    afterPayText: `you’ll receive a confirmation email, an engagement summary, and a short intake call gets scheduled. Phantom Flash starts tracing immediately; reports are typically delivered in 5–7 business days. Rush handling is available when time is critical — mention it in your notes.`,
    darkTitle: `The ledger keeps the receipts.`, darkText: `Every public ledger has been keeping the record the whole time: public, permanent, seconds away. Phantom Flash turns it into a universe you can walk.`, darkCta: `See the universe`,
    lockedIntro: `The free PFLASH stops at the first hop. The Full Owlchained Report follows it further: relay wallets, consolidation hubs, and the exchanges and services where the money landed.`,
    bagLegend: `💰 = share of the money’s traffic`, bagShare: `Share of traffic`,
    bagHonesty: `💰 bags = this wallet’s share of the observed first-hop volume with the scanned wallet — not the absolute balance of that address.`,
    srTitle: `See exactly what you get`,
    srSub: `Every Full Owlchained Report is a private interactive web report — not a PDF attachment. Here’s the actual structure, shown with a fictional example. Yours is built from the address’s real trail.`,
    srNote: `Sample shown with fictional data. The PFLASH-IT Report (${PRICE}) follows the money through every hop and delivers the tracing map, wallet inventory, and key findings — machine-built at PFLASH speed. The Story and the Evidence Package come with the Full Owlchained Report.`,
    srLead: `This is what <span class="money">${PRICE_FULL}</span> buys.`, srCta: `Get my report →`,
    sr1t: `The Story`, sr1b: `How the money moved — the narrative of its journey, told in plain language, start to finish.`,
    sr2t: `Tracing Map`, sr2b: `Every hop, visualized — an interactive flow from the address to where the funds landed.`,
    sr3t: `Wallet Inventory`, sr3b: `Every address documented — role, volume, first/last activity, and how it connects to the others.`,
    sr4t: `Key Findings`, sr4b: `What matters, in plain language — the conclusions and the evidence behind each one.`,
    sr5t: `Evidence Package`, sr5b: `Formatted for whoever needs to act on it — transaction IDs, exchange escalation contacts, timeline.`,
    noAddr: `No address provided.`, noAddrBody: `Go back and paste the Bitcoin or Ethereum address you want to PFLASH.`, invalid: `That does not look like a valid wallet address.`, busy: `Primary source busy — trying backup node…`, noTx: `No transactions found.`, noActivity: `No activity found on this address.`, unavail: `3D explorer unavailable in this browser — see the transaction table below for the same first-hop data.`, notRecognized: `That address is not recognized by the Bitcoin network.`, noReach: `Could not reach the blockchain data sources.`, pflashingLive: `PFLASHING THE CHAIN… pulling the live blockchain record`, pflashDonePrefix: `PFLASHED in seconds — `, pflashDoneSuffix: ` transactions found.`,
    howTitle: `How it works`, step01: `STEP 01`, step02: `STEP 02`, step03: `STEP 03`,
    step1Title: `Paste an address`, step2Title: `The universe draws itself`, step3Title: `Follow any hop, as far as you like`,
    step1Body: `One address on BTC, ETH, or XRP. That’s all.`,
    step2Body: `The address is the sun. Every wallet it dealt with orbits it, sized by volume. Fly through it.`,
    step3Body: `Click a transaction to light its path, then follow it to the next wallet. Every hop is free, and every hop charts the map.`,
    bullet1: `Complete multi-hop trace — every wallet, every transaction, every convergence point`,
    bullet2: `Interactive web report: tracing board, wallet inventory, timeline, key findings`,
    bullet3: `Exchange & service identification — where the money landed, named`,
    bullet4: `Evidence package formatted for whoever needs to act on it`,
    bullet5: `A direct call to walk through the findings and next steps`,
    recentTitle: `What the map keeps`,
    recentBody: `The Commons stores addresses, amounts and timestamps from public ledgers, and counts only as bands. No person, no email, no device is attached to any of it.`,
    notSureTitle: `Not sure yet?`,
    notSureBody: `Run the <a href="#scan">free PFLASH</a> first. If the address has activity, you will see the universe around it — for free — before you decide anything.`
  };

  D.es = {
    metaIndex: `Este es el universo. Puedes seguir a tus agentes. Pega cualquier dirección de BTC, ETH o XRP y mira todas las billeteras que tocó, gratis y en segundos. Haz clic en una transacción, sigue el dinero salto a salto y deja el mapa trazado para la próxima persona.`,
    metaScan: `Un escaneo en vivo de la cadena, dibujado como un universo 3D interactivo: la dirección en el centro y cada billetera con la que operó orbitando a su alrededor. Gratis, en segundos.`,
    metaCheckout: `Pon a Phantom Flash sobre la pista: el PFLASH-IT Report (${PRICE}) sigue el dinero por cada salto a velocidad de máquina, o el Full Owlchained Report (${PRICE_FULL}) añade el análisis hecho a mano, el paquete de evidencia y una llamada con una persona real.`,
    titleIndex: `Phantom Flash — Este es el universo. Síguelo.`,
    titleScan: `Universo — Phantom Flash`,
    navHow: `Cómo funciona`, navReport: `El informe`, navFree: `PFLASH gratis`, navHome: `Inicio`, navUnlock: `Desbloquear informe`,
    eyebrow: `⚡ Owlchained — Libros públicos, dibujados como un universo`,
    hero: `Este es el <span class="glow">universo.</span>`,
    lede: `Puedes seguir a tus agentes. Pega una dirección. Mira todo lo que tocó. Sigue cualquier salto. <strong>Gratis.</strong>`,
    demoBadge: `● DEMO EN VIVO — una billetera ficticia y el universo a su alrededor. Ahora pega una dirección:`,
    sunDockLabel: `Deja caer cualquier dirección de billetera en el sol`,
    addrPlaceholder: `Pega una dirección — BTC (bc1q…, 1A1z…), ETH (0x…) o XRP (r…)`, pflashButton: `PFLASH IT ⚡`,
    hint1: `PFLASH instantáneo gratis · datos blockchain en vivo · sin cuenta · Bitcoin, Ethereum, XRP, USDT y USDC`,
    hint2: `PFLASH it. (La P es silenciosa. La verdad no.)`,
    trust1: `⚡ Datos blockchain en vivo — nada simulado`, trust2: `⚡ Billeteras reales. Transacciones reales. Respuestas reales.`, trust3: `⚡ Gratis para todos — sin cuenta, sin tarjeta`,
    howSub: `Tres pasos. Todos gratis.`,
    deskTitle: `La cadena nunca duerme.`, deskSub: `Phantom Flash tampoco.`,
    deskP1: `El mapa crece con cada visitante. Cada dirección que alguien pega traza unas billeteras más, y cada salto que alguien sigue dibuja el siguiente sistema. El universo que abres mañana tiene más que el que abriste hoy.`,
    deskP2: `El libro público es todo el registro. Cada transacción queda grabada en un libro que nadie puede editar ni borrar. Phantom Flash lo lee como lo hacen los analistas y lo dibuja para cualquiera, gratis.`,
    warningTitle: `Los agentes dejan rastro.`, warningText: `Un agente de IA que tiene una clave firma sus declaraciones en un libro público. Phantom Flash las lee de vuelta, así puedes seguir a tus agentes como sigues el dinero. Pega la dirección del agente o abre la <a href="agents.html">página de Agentes</a>.`,
    comicTitle: `“Síguelo por mí.”`, comicSub: `Alguien pega una dirección. El universo se dibuja a su alrededor. Un salto parece interesante, así que lo sigue, y el siguiente sistema se dibuja en su lugar. Esa es la llamada que Phantom Flash responde.`, comicCta: `Pega una dirección — PFLASH gratis ⚡`,
    reportTitle: `Dos informes. Una verdad.`,
    reportSub: `¿Necesitas todo el rastro <em>ahora</em>? PFLASH-IT. ¿Quieres el análisis hecho a mano? Elige Full Owlchained. Misma cadena, mismo registro: tú eliges la profundidad.`,
    getReport: `Obtener mi informe →`,
    pfLabel: `⚡ PFLASH-IT Report`, pfTag: `Una carga. Velocidad de máquina. Ahora.`,
    pf1: `Pega la dirección, añade un documento: eso es todo lo que hace falta para empezar`,
    pf2: `Rastreo automático multi-salto: sigue el dinero por cada salto a velocidad de máquina — billeteras, transacciones, puntos de convergencia`,
    pf3: `Informe web interactivo: el mapa, el inventario de billeteras y los hallazgos clave`,
    pf4: `Identificación de exchanges y servicios: dónde aterrizó el dinero, con nombres`,
    pf5: `<strong>Velocidad PFLASH</strong> — la mayoría de los informes se entregan el mismo día`,
    pf6: `$171 por actualización a medida que el rastro avanza`,
    pfCta: `PFLASH-IT — ${PRICE} →`,
    owlLabel: `🦉 Full Owlchained Report`, owlTag: `El análisis completo: hecho a mano, encadenado.`,
    owl1: `<strong>Todo lo del PFLASH-IT Report</strong>, más:`,
    owl2: `Análisis de rastreo hecho a mano: cada salto verificado`,
    owl3: `La Historia: el recorrido del dinero como narrativa en lenguaje claro`,
    owl4: `Paquete de evidencia: IDs de transacción, línea de tiempo y contactos de exchanges, formateado para quien necesite actuar con él`,
    owl5: `<strong>Una llamada con una persona real</strong>: repasen juntos los hallazgos y los próximos pasos`,
    owl6: `Entrega en 5–7 días hábiles`,
    owlCta: `Ir a Full Owlchained — ${PRICE_FULL} →`,
    bewareTitle: `Solo lectura.`, bewareText: `Phantom Flash lee libros públicos. Nunca pide una frase semilla ni una clave privada, y nunca toca una billetera.`,
    finalCta: `Pega una dirección. Mira el universo.`, finalSub: `Una dirección. Unos segundos. El libro público, dibujado como un universo.`,
    disclaimer: `El Phantom Flash Owlchained Report es un análisis de blockchain proporcionado solo con fines informativos. No es una garantía ni un compromiso de ningún tipo. Phantom Flash y sus operadores no son responsables por información de rastreo incorrecta, incompleta o desactualizada en ningún informe o escaneo gratuito. Los resultados no están garantizados y no se promete ni se implica ningún resultado. Nada en este sitio constituye asesoría legal, financiera o de inversión. Los datos del escaneo gratuito se obtienen en vivo de fuentes públicas de blockchain y se presentan tal cual. Phantom Flash es un servicio independiente de análisis de blockchain y no está afiliado con ninguna billetera, exchange o producto de software de criptomonedas. Las direcciones ingresadas en un escaneo se registran para trazar el mapa compartido.`,
    scanTitle: `Billetera PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← PFLASH otra dirección`,
    totalIn: `Total recibido`, totalOut: `Total enviado`, txs: `Transacciones`, cps: `Contrapartes (1er salto)`, window: `Actividad reciente`,
    systemTitle: `El sistema`, liveData: `● DATOS EN VIVO`, systemSub: `Este es el universo alrededor de la dirección que pegaste. Está en el centro; cada billetera con la que operó orbita a su alrededor, con tamaño según el volumen. Arrastra para rotar, usa la rueda para acercar, haz clic en cualquier billetera para ver los números y en cualquier transacción para iluminar su camino y seguirlo. Todo gratis.`,
    controlsHint: `arrastra para rotar · rueda para acercar · clic en una billetera para ver detalles`,
    cpLockedLabel: `CONTRAPARTE #{n} — BLOQUEADA`, moreCpLocked: `MÁS CONTRAPARTES — BLOQUEADAS`,
    cpLockedHover: `una billetera real de primer salto, cartografiada por Phantom Flash · el informe completo la sigue más lejos · haz clic para ver detalles`,
    txCpLocked: `BLOQUEADA — informe completo`, txMoreLocked: `+ {n} transacciones más — el Full Owlchained Report las sigue más lejos`,
    deepTitle: `Hallazgos de rastreo profundo`, locked: `🔒 BLOQUEADO`, paywallTitle: `Ese es el primer salto. Phantom Flash puede seguir el resto.`,
    paywallSub: `El PFLASH-IT Report sigue el dinero por cada salto a velocidad de máquina y te entrega el mapa, el inventario de billeteras y los hallazgos: una carga, entrega rápida, ${PRICE}. El Full Owlchained Report (${PRICE_FULL}) añade el análisis hecho a mano, el paquete de evidencia y una llamada con una persona real. Las criptomonedas se mueven en días, no en meses.`,
    payCta: `Obtener el PFLASH-IT Report — ${PRICE} →`,
    recentTx: `Transacciones recientes`, date: `Fecha`, dir: `Dirección`, amt: `Cantidad`, cp: `Contraparte (primer salto)`, txid: `TXID`,
    checkoutEyebrow: `⚡ PFLASH-IT · 🦉 Full Owlchained`, checkoutTitle: `Pon a Phantom Flash sobre la pista`,
    checkoutSub: `Elige tu informe, dinos cómo contactarte y qué dirección seguir, completa el pago y Phantom Flash se pone a trabajar. Tu informe incluye una cuenta privada, y todo lo que añadas en las primeras 48 horas está incluido.`,
    step1: `Paso 1 — Tu información`, name: `Nombre completo`, email: `Correo electrónico`, phone: `Teléfono`, walletLabel: `Dirección de billetera a rastrear`,
    story: `Añade notas y documentos — ahora o en cualquier momento después del pago`, continuePay: `Enviar mis datos — continuar al pago →`,
    captured: `✓ Información recibida. Completa el pago en el Paso 2 y Phantom Flash estará sobre la pista. Si se abrió tu app de correo, pulsa enviar: así llega tu solicitud a nuestro equipo (alternativa).`,
    order: `Resumen del pedido`, step2: `Paso 2 — Pago`, paySecure: `Pagar ${PRICE} de forma segura (Stripe) →`, afterPay: `Qué sucede después del pago:`,
    afterPayText: `recibirás un correo de confirmación y un resumen del encargo, y se programará una breve llamada de ingreso. Phantom Flash comienza el rastreo de inmediato; los informes suelen entregarse en 5–7 días hábiles. Hay tramitación urgente cuando el tiempo es crítico: menciónalo en tus notas.`,
    darkTitle: `El libro guarda los recibos.`, darkText: `Todo libro público ha llevado el registro todo el tiempo: público, permanente, a segundos de distancia. Phantom Flash lo convierte en un universo que puedes recorrer.`, darkCta: `Ver el universo`,
    lockedIntro: `El PFLASH gratuito se detiene en el primer salto. El Full Owlchained Report lo sigue más lejos: billeteras de relevo, hubs de consolidación y los exchanges y servicios donde aterrizó el dinero.`,
    bagLegend: `💰 = parte del tráfico del dinero`, bagShare: `Parte del tráfico`,
    bagHonesty: `💰 bolsas = la parte de esta billetera en el volumen de primer salto observado con la billetera escaneada — no el saldo absoluto de esa dirección.`,
    srTitle: `Mira exactamente lo que recibes`,
    srSub: `Cada Full Owlchained Report es un informe web interactivo y privado, no un PDF adjunto. Esta es la estructura real, mostrada con un ejemplo ficticio. El tuyo se construye con el rastro real de la dirección.`,
    srNote: `Muestra con datos ficticios. El PFLASH-IT Report (${PRICE}) sigue el dinero por cada salto y entrega el mapa de rastreo, el inventario de billeteras y los hallazgos clave, construido por máquina a velocidad PFLASH. La Historia y el Paquete de evidencia vienen con el Full Owlchained Report.`,
    srLead: `Esto es lo que compra <span class="money">${PRICE_FULL}</span>.`, srCta: `Obtener mi informe →`,
    sr1t: `La historia`, sr1b: `Cómo se movió el dinero: la narrativa de su recorrido, en lenguaje claro, de principio a fin.`,
    sr2t: `Mapa de rastreo`, sr2b: `Cada salto, visualizado: un flujo interactivo desde la dirección hasta donde aterrizaron los fondos.`,
    sr3t: `Inventario de billeteras`, sr3b: `Cada dirección documentada: rol, volumen, primera/última actividad y cómo se conecta con las demás.`,
    sr4t: `Hallazgos clave`, sr4b: `Lo que importa, en lenguaje claro: las conclusiones y la evidencia detrás de cada una.`,
    sr5t: `Paquete de evidencia`, sr5b: `Formateado para quien necesite actuar con él: IDs de transacción, contactos de escalación en exchanges y línea de tiempo.`,
    noAddr: `No se proporcionó dirección.`, noAddrBody: `Regresa y pega la dirección Bitcoin o Ethereum que quieres PFLASH.`, invalid: `Eso no parece una dirección de billetera válida.`, busy: `La fuente principal está ocupada — probando nodo de respaldo…`, noTx: `No se encontraron transacciones.`, noActivity: `No se encontró actividad en esta dirección.`, unavail: `El explorador 3D no está disponible en este navegador — consulta la tabla de transacciones de abajo para ver los mismos datos del primer salto.`, notRecognized: `La red Bitcoin no reconoce esa dirección.`, noReach: `No se pudo acceder a las fuentes de datos blockchain.`, pflashingLive: `PFLASHING THE CHAIN… leyendo el registro blockchain en vivo`, pflashDonePrefix: `PFLASHED en segundos — `, pflashDoneSuffix: ` transacciones encontradas.`,
    howTitle: `Cómo funciona`, step01: `PASO 01`, step02: `PASO 02`, step03: `PASO 03`,
    step1Title: `Pega una dirección`, step2Title: `El universo se dibuja solo`, step3Title: `Sigue cualquier salto, tan lejos como quieras`,
    step1Body: `Una dirección de BTC, ETH o XRP. Eso es todo.`,
    step2Body: `La dirección es el sol. Cada billetera con la que operó orbita a su alrededor, con tamaño según el volumen. Vuela por él.`,
    step3Body: `Haz clic en una transacción para iluminar su camino y síguela hasta la siguiente billetera. Cada salto es gratis y cada salto traza el mapa.`,
    bullet1: `Rastreo multi-salto completo: cada billetera, cada transacción, cada punto de convergencia`,
    bullet2: `Informe web interactivo: tablero de rastreo, inventario de billeteras, línea de tiempo y hallazgos clave`,
    bullet3: `Identificación de exchanges y servicios: dónde aterrizó el dinero, con nombres`,
    bullet4: `Paquete de evidencia formateado para quien necesite actuar con él`,
    bullet5: `Una llamada directa para repasar los hallazgos y los próximos pasos`,
    recentTitle: `Lo que guarda el mapa`,
    recentBody: `El Commons guarda direcciones, montos y marcas de tiempo de libros públicos, y los conteos solo en rangos. Nada de eso lleva asociada una persona, un correo ni un dispositivo.`,
    notSureTitle: `¿Aún no estás seguro?`,
    notSureBody: `Ejecuta primero el <a href="#scan">PFLASH gratis</a>. Si la dirección tiene actividad, verás el universo a su alrededor, gratis, antes de decidir nada.`
  };

  D.zh = {
    metaIndex: `这就是宇宙。你可以追踪你的智能体。粘贴任意 BTC、ETH 或 XRP 地址，几秒钟内免费看到它接触过的每个钱包。点击一笔交易，逐跳追踪资金，并为下一个人留下已绘制好的地图。`,
    metaScan: `实时链上扫描，呈现为可交互的 3D 宇宙：地址位于中心，与它有过往来的每个钱包环绕其周围。免费，几秒钟完成。`,
    metaCheckout: `让 Phantom Flash 上路：PFLASH-IT Report（${PRICE}）以机器速度沿每一跳追踪资金；Full Owlchained Report（${PRICE_FULL}）另加人工打造的分析、证据包和与真人的通话。`,
    titleIndex: `Phantom Flash — 这就是宇宙。去追踪它。`,
    titleScan: `宇宙 — Phantom Flash`,
    navHow: `如何运作`, navReport: `报告`, navFree: `免费 PFLASH`, navHome: `首页`, navUnlock: `解锁完整报告`,
    eyebrow: `⚡ Owlchained — 把公共账本画成一个宇宙`,
    hero: `这就是<span class="glow">宇宙。</span>`,
    lede: `你可以追踪你的智能体。粘贴一个地址。看到它接触过的一切。跟随任何一跳。<strong>免费。</strong>`,
    demoBadge: `● 实时演示 — 一个虚构的钱包及其周围的宇宙。现在粘贴一个地址：`,
    sunDockLabel: `把任意钱包地址投入太阳`,
    addrPlaceholder: `粘贴地址 — BTC（bc1q…、1A1z…）、ETH（0x…）或 XRP（r…）`, pflashButton: `PFLASH IT ⚡`,
    hint1: `免费即时 PFLASH · 实时区块链数据 · 无需账号 · Bitcoin、Ethereum、XRP、USDT 和 USDC`,
    hint2: `PFLASH it.（P 不发音。真相不会沉默。）`,
    trust1: `⚡ 实时区块链数据 — 非模拟`, trust2: `⚡ 真实钱包。真实交易。真实答案。`, trust3: `⚡ 人人免费 — 无需账号，无需银行卡`,
    howSub: `三步。全部免费。`,
    deskTitle: `链从不睡觉。`, deskSub: `Phantom Flash 也不睡。`,
    deskP1: `地图随每位访客一起成长。每个被粘贴的地址都会多绘出几个钱包，每个被追踪的跳转都会画出下一个星系。你明天打开的宇宙，比今天的更丰富。`,
    deskP2: `公共账本就是完整的记录。每一笔交易都刻在一本无人能修改、无人能删除的账本里。Phantom Flash 像分析师一样读取它，并免费把它画给所有人看。`,
    warningTitle: `智能体会留下痕迹。`, warningText: `持有密钥的 AI 智能体会把自己的声明签到公共账本上。Phantom Flash 把它们读回来，让你像追踪资金一样追踪你的智能体。粘贴智能体的地址，或打开<a href="agents.html">智能体页面</a>。`,
    comicTitle: `“替我追踪它。”`, comicSub: `有人粘贴了一个地址。宇宙在它周围自行绘出。有一跳看起来很有意思，于是他们跟了过去，下一个星系就在原地画了出来。这就是 Phantom Flash 接起的那通电话。`, comicCta: `粘贴一个地址 — 免费 PFLASH ⚡`,
    reportTitle: `两份报告。同一个真相。`,
    reportSub: `<em>现在</em>就需要完整轨迹？PFLASH-IT。想要人工打造的分析？选 Full Owlchained。同一条链，同一份记录——深度由你选。`,
    getReport: `获取我的报告 →`,
    pfLabel: `⚡ PFLASH-IT Report`, pfTag: `一次上传。机器速度。现在。`,
    pf1: `粘贴地址，再添加一份文件——这就是开始所需的全部`,
    pf2: `自动多跳追踪：以机器速度沿每一跳追踪资金——钱包、交易、汇聚点`,
    pf3: `交互式网页报告：地图、钱包清单和关键发现`,
    pf4: `识别交易所和服务——资金最终落在哪里，附名称`,
    pf5: `<strong>PFLASH 速度</strong>——大多数报告当天交付`,
    pf6: `随轨迹推进，每次更新 $171`,
    pfCta: `PFLASH-IT — ${PRICE} →`,
    owlLabel: `🦉 Full Owlchained Report`, owlTag: `完整分析——人工打造，牢牢锁定。`,
    owl1: `<strong>包含 PFLASH-IT Report 的全部内容</strong>，另加：`,
    owl2: `人工打造的追踪分析——每一跳都经过核实`,
    owl3: `故事——以通俗语言叙述资金的旅程`,
    owl4: `证据包——交易 ID、时间线和交易所联系人，按需要据此行动的人所需格式整理`,
    owl5: `<strong>与真人的一次通话</strong>——一起过一遍发现和下一步`,
    owl6: `5–7 个工作日交付`,
    owlCta: `选择 Full Owlchained — ${PRICE_FULL} →`,
    bewareTitle: `只读。`, bewareText: `Phantom Flash 只读取公共账本。它从不索要助记词或私钥，也从不触碰任何钱包。`,
    finalCta: `粘贴一个地址。看见宇宙。`, finalSub: `一个地址。几秒钟。把公共账本画成一个宇宙。`,
    disclaimer: `Phantom Flash Owlchained Report 仅作为信息用途的区块链分析。它不是任何形式的保证或承诺。对于任何报告或免费扫描中的错误、不完整或过时的追踪信息，Phantom Flash 及其运营方不承担责任。结果不作保证，也不承诺或暗示任何结果。本网站内容不构成法律、财务或投资建议。免费扫描数据来自公开区块链来源并按原样呈现。Phantom Flash 是独立的区块链分析服务，与任何加密货币钱包、交易所或软件产品无关联。为扫描输入的钱包地址会被记录，用于绘制共享地图。`,
    scanTitle: `钱包已 PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← PFLASH 另一个地址`,
    totalIn: `收到总额`, totalOut: `转出总额`, txs: `交易`, cps: `对手方（第一跳）`, window: `近期活动`,
    systemTitle: `系统`, liveData: `● 实时链上数据`, systemSub: `这是你所粘贴地址周围的宇宙。它位于中心；与它有过往来的每个钱包都环绕着它，大小按交易量而定。拖动旋转，滚轮缩放，点击任意钱包查看数字，点击任意交易点亮它的路径并跟随。全部免费。`,
    controlsHint: `拖动旋转 · 滚轮缩放 · 点击钱包查看详情`,
    cpLockedLabel: `对手方 #{n} — 已锁定`, moreCpLocked: `更多对手方 — 已锁定`,
    cpLockedHover: `一个真实的第一跳钱包，已由 Phantom Flash 绘制成图 · 完整报告会继续追踪它 · 点击查看`,
    txCpLocked: `已锁定 — 完整报告`, txMoreLocked: `+ 还有 {n} 笔交易 — Full Owlchained Report 会继续追踪`,
    deepTitle: `深度追踪发现`, locked: `🔒 已锁定`, paywallTitle: `这只是第一跳。Phantom Flash 可以继续追踪其余部分。`,
    paywallSub: `PFLASH-IT Report 以机器速度沿每一跳追踪资金，并交给你地图、钱包清单和各项发现——一次上传，快速交付，${PRICE}。Full Owlchained Report（${PRICE_FULL}）另加人工打造的分析、证据包和与真人的通话。加密资产以天为单位流动，而不是以月。`,
    payCta: `获取 PFLASH-IT Report — ${PRICE} →`,
    recentTx: `最近交易`, date: `日期`, dir: `方向`, amt: `金额`, cp: `对手方（第一跳）`, txid: `TXID`,
    checkoutEyebrow: `⚡ PFLASH-IT · 🦉 Full Owlchained`, checkoutTitle: `让 Phantom Flash 开始追踪`,
    checkoutSub: `选择你的报告，告诉我们如何联系你以及要追踪哪个地址，完成付款，Phantom Flash 随即开工。你的报告附带一个私人账户，前 48 小时内你补充的所有内容均包含在内。`,
    step1: `第一步 — 你的信息`, name: `全名`, email: `邮箱`, phone: `电话`, walletLabel: `要追踪的钱包地址`,
    story: `添加备注和文件——现在或付款后任何时候`, continuePay: `发送我的信息——继续付款 →`,
    captured: `✓ 已收到信息。请在第二步完成付款，Phantom Flash 即刻上路。如果你的邮件应用已打开，请点击发送——这样才会把你的请求送达我们的团队（备用方式）。`,
    order: `订单摘要`, step2: `第二步 — 付款`, paySecure: `通过 Stripe 安全支付 ${PRICE} →`, afterPay: `付款后会发生什么：`,
    afterPayText: `你会收到确认邮件和委托摘要，并会安排一次简短的接洽通话。Phantom Flash 会立即开始追踪；报告通常在 5–7 个工作日内交付。时间紧迫时可加急处理——请在备注中说明。`,
    darkTitle: `账本保存着收据。`, darkText: `每一本公共账本一直都在记录：公开、永久，只需几秒。Phantom Flash 把它变成一个你可以漫步其中的宇宙。`, darkCta: `查看宇宙`,
    lockedIntro: `免费 PFLASH 止于第一跳。Full Owlchained Report 会继续追踪：中继钱包、归集枢纽，以及资金最终落脚的交易所和服务。`,
    bagLegend: `💰 = 资金流量占比`, bagShare: `流量占比`,
    bagHonesty: `💰 钱袋 = 该钱包在与所扫描钱包的第一跳可观察交易量中的占比，而不是该地址的绝对余额。`,
    srTitle: `看看你到底能得到什么`,
    srSub: `每份 Full Owlchained Report 都是私密的交互式网页报告——不是 PDF 附件。这里展示的是真实结构，使用虚构示例。你的报告将基于该地址的真实链上轨迹构建。`,
    srNote: `示例使用虚构数据。PFLASH-IT Report（${PRICE}）沿每一跳追踪资金，交付追踪地图、钱包清单和关键发现——以 PFLASH 速度由机器构建。故事和证据包随 Full Owlchained Report 提供。`,
    srLead: `这就是 <span class="money">${PRICE_FULL}</span> 能买到的。`, srCta: `获取我的报告 →`,
    sr1t: `故事`, sr1b: `资金是如何流动的——用通俗语言，从头到尾叙述它的旅程。`,
    sr2t: `追踪地图`, sr2b: `每一跳都可视化——从该地址到资金最终落脚点的交互式流向图。`,
    sr3t: `钱包清单`, sr3b: `每个地址都有记录：角色、交易量、首次/最后活动，以及它与其他地址的关联。`,
    sr4t: `关键发现`, sr4b: `用通俗语言说明重点：结论，以及每个结论背后的依据。`,
    sr5t: `证据包`, sr5b: `按需要据此行动的人所需格式整理：交易 ID、交易所升级联系方式、时间线。`,
    noAddr: `未提供地址。`, noAddrBody: `请返回并粘贴你想 PFLASH 的 Bitcoin 或 Ethereum 地址。`, invalid: `这看起来不是有效的钱包地址。`, busy: `主数据源繁忙 — 正在尝试备用节点…`, noTx: `未找到交易。`, noActivity: `此地址上未发现任何活动。`, unavail: `此浏览器无法使用 3D 浏览器 — 请查看下方的交易表以获得相同的第一跳数据。`, notRecognized: `Bitcoin 网络无法识别该地址。`, noReach: `无法连接到区块链数据源。`, pflashingLive: `PFLASHING THE CHAIN… 正在读取实时区块链记录`, pflashDonePrefix: `数秒内完成 PFLASHED — `, pflashDoneSuffix: ` 笔交易已找到。`,
    howTitle: `如何运作`, step01: `第一步`, step02: `第二步`, step03: `第三步`,
    step1Title: `粘贴一个地址`, step2Title: `宇宙自行绘出`, step3Title: `跟随任何一跳，想走多远都行`,
    step1Body: `一个 BTC、ETH 或 XRP 地址。仅此而已。`,
    step2Body: `这个地址就是太阳。与它有过往来的每个钱包都环绕着它，大小按交易量而定。尽情穿行。`,
    step3Body: `点击一笔交易点亮它的路径，然后跟随它到下一个钱包。每一跳都免费，每一跳都在绘制地图。`,
    bullet1: `完整多跳追踪——每个钱包、每笔交易、每个汇聚点`,
    bullet2: `互动网页报告：追踪板、钱包清单、时间线、关键发现`,
    bullet3: `识别交易所和服务——资金最终落在哪里，附名称`,
    bullet4: `按需要据此行动的人所需格式整理的证据包`,
    bullet5: `一次直接通话，一起过一遍发现和下一步`,
    recentTitle: `地图保存什么`,
    recentBody: `Commons 保存来自公共账本的地址、金额和时间戳，计数只以区间形式呈现。其中任何内容都不会关联到某个人、某个邮箱或某台设备。`,
    notSureTitle: `还不确定？`,
    notSureBody: `先运行<a href="#scan">免费 PFLASH</a>。如果该地址有活动，你会先免费看到它周围的宇宙，再决定下一步。`
  };

  D.vi = {
    metaIndex: `Đây là vũ trụ. Bạn có thể theo dõi các tác nhân của mình. Dán bất kỳ địa chỉ BTC, ETH hoặc XRP nào và xem mọi ví mà nó đã chạm tới, miễn phí, trong vài giây. Nhấp vào một giao dịch, theo dõi dòng tiền từng bước, và để lại bản đồ đã được vẽ cho người tiếp theo.`,
    metaScan: `Một lần quét trực tiếp trên chuỗi, được vẽ thành vũ trụ 3D tương tác: địa chỉ ở trung tâm, mọi ví từng giao dịch với nó quay quanh. Miễn phí, trong vài giây.`,
    metaCheckout: `Đưa Phantom Flash vào cuộc: PFLASH-IT Report (${PRICE}) theo dòng tiền qua từng bước với tốc độ máy, hoặc Full Owlchained Report (${PRICE_FULL}) bổ sung phân tích làm thủ công, gói bằng chứng và một cuộc gọi với người thật.`,
    titleIndex: `Phantom Flash — Đây là vũ trụ. Hãy theo dõi nó.`,
    titleScan: `Vũ trụ — Phantom Flash`,
    navHow: `Cách hoạt động`, navReport: `Báo cáo`, navFree: `PFLASH miễn phí`, navHome: `Trang chủ`, navUnlock: `Mở báo cáo`,
    eyebrow: `⚡ Owlchained — Sổ cái công khai, được vẽ thành một vũ trụ`,
    hero: `Đây là <span class="glow">vũ trụ.</span>`,
    lede: `Bạn có thể theo dõi các tác nhân của mình. Dán một địa chỉ. Xem mọi thứ nó đã chạm tới. Theo dõi bất kỳ bước nào. <strong>Miễn phí.</strong>`,
    demoBadge: `● DEMO TRỰC TIẾP — một ví hư cấu và vũ trụ quanh nó. Giờ hãy dán một địa chỉ:`,
    sunDockLabel: `Thả bất kỳ địa chỉ ví nào vào mặt trời`,
    addrPlaceholder: `Dán một địa chỉ — BTC (bc1q…, 1A1z…), ETH (0x…) hoặc XRP (r…)`, pflashButton: `PFLASH IT ⚡`,
    hint1: `PFLASH miễn phí tức thì · dữ liệu blockchain trực tiếp · không cần tài khoản · Bitcoin, Ethereum, XRP, USDT & USDC`,
    hint2: `PFLASH it. (Chữ P im lặng. Sự thật thì không.)`,
    trust1: `⚡ Dữ liệu blockchain trực tiếp — không mô phỏng`, trust2: `⚡ Ví thật. Giao dịch thật. Câu trả lời thật.`, trust3: `⚡ Miễn phí cho tất cả — không tài khoản, không thẻ`,
    howSub: `Ba bước. Tất cả đều miễn phí.`,
    deskTitle: `Chuỗi không bao giờ ngủ.`, deskSub: `Phantom Flash cũng vậy.`,
    deskP1: `Bản đồ lớn lên theo từng người truy cập. Mỗi địa chỉ được dán sẽ vẽ thêm vài ví, và mỗi bước được theo dõi sẽ vẽ hệ tiếp theo. Vũ trụ bạn mở ngày mai có nhiều hơn vũ trụ bạn mở hôm nay.`,
    deskP2: `Sổ cái công khai là toàn bộ hồ sơ. Mọi giao dịch đều được khắc vào một sổ cái mà không ai sửa được và không ai xóa được. Phantom Flash đọc nó như các nhà phân tích vẫn đọc và vẽ nó cho bất kỳ ai, miễn phí.`,
    warningTitle: `Các tác nhân để lại dấu vết.`, warningText: `Một tác nhân AI nắm giữ khóa sẽ ký các tuyên bố của nó lên sổ cái công khai. Phantom Flash đọc lại chúng, để bạn theo dõi các tác nhân của mình như theo dõi dòng tiền. Dán địa chỉ của tác nhân, hoặc mở <a href="agents.html">trang Tác nhân</a>.`,
    comicTitle: `“Hãy theo dõi nó giúp tôi.”`, comicSub: `Một người dán một địa chỉ. Vũ trụ tự vẽ ra quanh nó. Một bước trông thú vị, nên họ theo dõi nó, và hệ tiếp theo tự vẽ ngay tại chỗ. Đó là cuộc gọi mà Phantom Flash nghe máy.`, comicCta: `Dán một địa chỉ — PFLASH miễn phí ⚡`,
    reportTitle: `Hai báo cáo. Một sự thật.`,
    reportSub: `Cần toàn bộ dấu vết <em>ngay</em>? PFLASH-IT. Muốn phân tích làm thủ công? Chọn Full Owlchained. Cùng một chuỗi, cùng một hồ sơ — bạn chọn độ sâu.`,
    getReport: `Nhận báo cáo của tôi →`,
    pfLabel: `⚡ PFLASH-IT Report`, pfTag: `Một lần tải lên. Tốc độ máy. Ngay bây giờ.`,
    pf1: `Dán địa chỉ, thêm một tài liệu — chỉ cần vậy là bắt đầu`,
    pf2: `Truy vết đa bước tự động: theo dòng tiền qua từng bước với tốc độ máy — ví, giao dịch, điểm hội tụ`,
    pf3: `Báo cáo web tương tác: bản đồ, danh sách ví và các phát hiện chính`,
    pf4: `Xác định sàn và dịch vụ — nơi tiền đã đến, có nêu tên`,
    pf5: `<strong>Tốc độ PFLASH</strong> — hầu hết báo cáo được giao trong ngày`,
    pf6: `$171 cho mỗi lần cập nhật khi dấu vết tiếp diễn`,
    pfCta: `PFLASH-IT — ${PRICE} →`,
    owlLabel: `🦉 Full Owlchained Report`, owlTag: `Phân tích đầy đủ — làm thủ công, xích chặt.`,
    owl1: `<strong>Mọi thứ trong PFLASH-IT Report</strong>, cộng thêm:`,
    owl2: `Bản phân tích truy vết làm thủ công — mỗi bước đều được xác minh`,
    owl3: `Câu chuyện — hành trình của dòng tiền dưới dạng bản tường thuật dễ hiểu`,
    owl4: `Gói bằng chứng — mã giao dịch, dòng thời gian và liên hệ sàn, định dạng cho bất kỳ ai cần hành động dựa trên nó`,
    owl5: `<strong>Một cuộc gọi với người thật</strong> — cùng xem các phát hiện và bước tiếp theo`,
    owl6: `Giao trong 5–7 ngày làm việc`,
    owlCta: `Chọn Full Owlchained — ${PRICE_FULL} →`,
    bewareTitle: `Chỉ đọc.`, bewareText: `Phantom Flash đọc các sổ cái công khai. Nó không bao giờ hỏi seed phrase hay khóa riêng, và không bao giờ chạm vào ví.`,
    finalCta: `Dán một địa chỉ. Xem vũ trụ.`, finalSub: `Một địa chỉ. Vài giây. Sổ cái công khai, được vẽ thành một vũ trụ.`,
    disclaimer: `Phantom Flash Owlchained Report là phân tích blockchain chỉ nhằm mục đích thông tin. Đây không phải là bảo đảm hay cam kết dưới bất kỳ hình thức nào. Phantom Flash và bên vận hành không chịu trách nhiệm về thông tin truy vết sai, thiếu hoặc lỗi thời trong bất kỳ báo cáo hoặc bản quét miễn phí nào. Kết quả không được bảo đảm và không có kết quả nào được hứa hẹn hay ngụ ý. Nội dung trang này không phải tư vấn pháp lý, tài chính hoặc đầu tư. Dữ liệu quét miễn phí được lấy trực tiếp từ nguồn blockchain công khai và được trình bày nguyên trạng. Phantom Flash là dịch vụ phân tích blockchain độc lập, không liên kết với ví, sàn giao dịch hoặc phần mềm tiền mã hóa nào. Các địa chỉ được nhập để quét sẽ được ghi lại để vẽ bản đồ chung.`,
    scanTitle: `Ví đã PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← PFLASH địa chỉ khác`,
    totalIn: `Tổng nhận`, totalOut: `Tổng gửi ra`, txs: `Giao dịch`, cps: `Đối tác (bước 1)`, window: `Hoạt động gần đây`,
    systemTitle: `Hệ thống`, liveData: `● DỮ LIỆU BLOCKCHAIN TRỰC TIẾP`, systemSub: `Đây là vũ trụ quanh địa chỉ bạn đã dán. Nó nằm ở trung tâm; mọi ví từng giao dịch với nó quay quanh, kích thước theo khối lượng. Kéo để xoay, cuộn để phóng to, nhấp vào bất kỳ ví nào để xem số liệu, nhấp vào bất kỳ giao dịch nào để làm sáng đường đi của nó và theo dõi. Tất cả đều miễn phí.`,
    controlsHint: `kéo để xoay · cuộn để phóng to · nhấp vào ví để xem chi tiết`,
    cpLockedLabel: `ĐỐI TÁC #{n} — ĐÃ KHÓA`, moreCpLocked: `THÊM ĐỐI TÁC — ĐÃ KHÓA`,
    cpLockedHover: `một ví bước đầu tiên có thật, đã được Phantom Flash lập bản đồ · báo cáo đầy đủ theo nó đi xa hơn · nhấp để xem chi tiết`,
    txCpLocked: `ĐÃ KHÓA — báo cáo đầy đủ`, txMoreLocked: `+ {n} giao dịch nữa — Full Owlchained Report theo chúng đi xa hơn`,
    deepTitle: `Phát hiện truy vết sâu`, locked: `🔒 KHÓA`, paywallTitle: `Đó là bước đầu tiên. Phantom Flash có thể theo phần còn lại.`,
    paywallSub: `PFLASH-IT Report theo dòng tiền qua từng bước với tốc độ máy và trao cho bạn bản đồ, danh sách ví và các phát hiện — một lần tải lên, giao nhanh, ${PRICE}. Full Owlchained Report (${PRICE_FULL}) bổ sung phân tích làm thủ công, gói bằng chứng và một cuộc gọi với người thật. Tiền mã hóa di chuyển theo ngày, không phải theo tháng.`,
    payCta: `Nhận PFLASH-IT Report — ${PRICE} →`,
    recentTx: `Giao dịch gần đây`, date: `Ngày`, dir: `Chiều`, amt: `Số lượng`, cp: `Đối tác (bước đầu)`, txid: `TXID`,
    checkoutEyebrow: `⚡ PFLASH-IT · 🦉 Full Owlchained`, checkoutTitle: `Đưa Phantom Flash vào cuộc`,
    checkoutSub: `Chọn báo cáo của bạn, cho chúng tôi biết cách liên hệ và địa chỉ cần theo dõi, hoàn tất thanh toán, và Phantom Flash bắt tay vào việc. Báo cáo đi kèm một tài khoản riêng, và mọi thứ bạn thêm trong 48 giờ đầu đều được bao gồm.`,
    step1: `Bước 1 — Thông tin của bạn`, name: `Họ tên`, email: `Email`, phone: `Điện thoại`, walletLabel: `Địa chỉ ví cần truy vết`,
    story: `Thêm ghi chú và tài liệu — ngay bây giờ hoặc bất cứ lúc nào sau khi thanh toán`, continuePay: `Gửi thông tin — tiếp tục thanh toán →`,
    captured: `✓ Đã nhận thông tin. Hoàn tất thanh toán ở Bước 2 và Phantom Flash sẽ vào cuộc. Nếu ứng dụng email của bạn đã mở, hãy nhấn gửi — việc đó chuyển yêu cầu của bạn đến đội của chúng tôi (phương án dự phòng).`,
    order: `Tóm tắt đơn hàng`, step2: `Bước 2 — Thanh toán`, paySecure: `Thanh toán an toàn ${PRICE} (Stripe) →`, afterPay: `Điều xảy ra sau khi thanh toán:`,
    afterPayText: `bạn sẽ nhận email xác nhận và bản tóm tắt dịch vụ, và một cuộc gọi tiếp nhận ngắn sẽ được xếp lịch. Phantom Flash bắt đầu truy vết ngay; báo cáo thường được giao trong 5–7 ngày làm việc. Có xử lý gấp khi thời gian cấp bách — hãy ghi chú trong phần ghi chú của bạn.`,
    darkTitle: `Sổ cái giữ mọi biên lai.`, darkText: `Mọi sổ cái công khai vẫn luôn giữ hồ sơ suốt thời gian qua: công khai, vĩnh viễn, chỉ cách vài giây. Phantom Flash biến nó thành một vũ trụ mà bạn có thể đi dạo.`, darkCta: `Xem vũ trụ`,
    lockedIntro: `PFLASH miễn phí dừng ở bước đầu tiên. Full Owlchained Report theo nó đi xa hơn: ví chuyển tiếp, hub gom tiền, và các sàn/dịch vụ nơi tiền đã đến.`,
    bagLegend: `💰 = phần lưu lượng của dòng tiền`, bagShare: `Phần lưu lượng`,
    bagHonesty: `💰 túi tiền = phần của ví này trong khối lượng bước đầu tiên quan sát được với ví đã quét — không phải số dư tuyệt đối của địa chỉ đó.`,
    srTitle: `Xem chính xác bạn nhận được gì`,
    srSub: `Mỗi Full Owlchained Report là một báo cáo web tương tác riêng tư — không phải tệp PDF đính kèm. Đây là cấu trúc thật, hiển thị bằng một ví dụ hư cấu. Báo cáo của bạn được dựng từ dấu vết thật của địa chỉ.`,
    srNote: `Mẫu hiển thị bằng dữ liệu hư cấu. PFLASH-IT Report (${PRICE}) theo dòng tiền qua từng bước và giao bản đồ truy vết, danh sách ví và các phát hiện chính — do máy dựng với tốc độ PFLASH. Câu chuyện và Gói bằng chứng đi kèm Full Owlchained Report.`,
    srLead: `Đây là thứ <span class="money">${PRICE_FULL}</span> mua được.`, srCta: `Nhận báo cáo của tôi →`,
    sr1t: `Câu chuyện`, sr1b: `Dòng tiền đã di chuyển như thế nào — bản tường thuật hành trình của nó, bằng ngôn ngữ dễ hiểu, từ đầu đến cuối.`,
    sr2t: `Bản đồ truy vết`, sr2b: `Từng bước được trực quan hóa — dòng chảy tương tác từ địa chỉ đến nơi tiền đã đến.`,
    sr3t: `Danh sách ví`, sr3b: `Mỗi địa chỉ đều được ghi lại — vai trò, khối lượng, hoạt động đầu/cuối và cách nó liên kết với các địa chỉ khác.`,
    sr4t: `Phát hiện chính`, sr4b: `Điều quan trọng, bằng ngôn ngữ dễ hiểu — các kết luận và bằng chứng đằng sau từng kết luận.`,
    sr5t: `Gói bằng chứng`, sr5b: `Định dạng cho bất kỳ ai cần hành động dựa trên nó — mã giao dịch, đầu mối liên hệ ở sàn, dòng thời gian.`,
    noAddr: `Chưa có địa chỉ.`, noAddrBody: `Hãy quay lại và dán địa chỉ Bitcoin hoặc Ethereum bạn muốn PFLASH.`, invalid: `Đây không giống một địa chỉ ví hợp lệ.`, busy: `Nguồn chính đang bận — đang thử nút dự phòng…`, noTx: `Không tìm thấy giao dịch.`, noActivity: `Không tìm thấy hoạt động nào trên địa chỉ này.`, unavail: `Trình khám phá 3D không khả dụng trên trình duyệt này — xem bảng giao dịch bên dưới để có cùng dữ liệu bước đầu tiên.`, notRecognized: `Mạng Bitcoin không nhận ra địa chỉ này.`, noReach: `Không thể kết nối tới các nguồn dữ liệu blockchain.`, pflashingLive: `PFLASHING THE CHAIN… đang đọc dữ liệu blockchain trực tiếp`, pflashDonePrefix: `PFLASHED trong vài giây — `, pflashDoneSuffix: ` giao dịch được tìm thấy.`,
    howTitle: `Cách hoạt động`, step01: `BƯỚC 01`, step02: `BƯỚC 02`, step03: `BƯỚC 03`,
    step1Title: `Dán một địa chỉ`, step2Title: `Vũ trụ tự vẽ ra`, step3Title: `Theo dõi bất kỳ bước nào, xa tùy ý`,
    step1Body: `Một địa chỉ BTC, ETH hoặc XRP. Chỉ vậy thôi.`,
    step2Body: `Địa chỉ là mặt trời. Mọi ví từng giao dịch với nó quay quanh, kích thước theo khối lượng. Hãy bay xuyên qua.`,
    step3Body: `Nhấp vào một giao dịch để làm sáng đường đi của nó, rồi theo nó tới ví tiếp theo. Mỗi bước đều miễn phí, và mỗi bước đều vẽ thêm bản đồ.`,
    bullet1: `Truy vết đa bước đầy đủ — từng ví, từng giao dịch, từng điểm hội tụ`,
    bullet2: `Báo cáo web tương tác: bảng truy vết, danh sách ví, dòng thời gian, phát hiện chính`,
    bullet3: `Xác định sàn và dịch vụ — nơi tiền đã đến, có nêu tên`,
    bullet4: `Gói bằng chứng định dạng cho bất kỳ ai cần hành động dựa trên nó`,
    bullet5: `Một cuộc gọi trực tiếp để cùng xem các phát hiện và bước tiếp theo`,
    recentTitle: `Bản đồ lưu giữ gì`,
    recentBody: `Commons lưu địa chỉ, số tiền và dấu thời gian từ các sổ cái công khai, và chỉ lưu số đếm theo từng khoảng. Không có người, email hay thiết bị nào được gắn với bất kỳ thứ gì trong đó.`,
    notSureTitle: `Chưa chắc?`,
    notSureBody: `Hãy chạy <a href="#scan">PFLASH miễn phí</a> trước. Nếu địa chỉ có hoạt động, bạn sẽ thấy vũ trụ quanh nó — miễn phí — trước khi quyết định bất cứ điều gì.`
  };

  D.pt = {
    metaIndex: `Este é o universo. Você pode seguir seus agentes. Cole qualquer endereço de BTC, ETH ou XRP e veja todas as carteiras que ele tocou, grátis, em segundos. Clique em uma transação, siga o dinheiro salto a salto e deixe o mapa traçado para a próxima pessoa.`,
    metaScan: `Uma varredura ao vivo da blockchain, desenhada como um universo 3D interativo: o endereço no centro e cada carteira com a qual ele operou em órbita ao redor. Grátis, em segundos.`,
    metaCheckout: `Coloque o Phantom Flash na trilha: o PFLASH-IT Report (${PRICE}) segue o dinheiro por cada salto em velocidade de máquina, ou o Full Owlchained Report (${PRICE_FULL}) acrescenta a análise feita à mão, o pacote de evidências e uma conversa com uma pessoa real.`,
    titleIndex: `Phantom Flash — Este é o universo. Siga-o.`,
    titleScan: `Universo — Phantom Flash`,
    navHow: `Como funciona`, navReport: `O relatório`, navFree: `PFLASH grátis`, navHome: `Início`, navUnlock: `Desbloquear relatório`,
    eyebrow: `⚡ Owlchained — Livros-razão públicos, desenhados como um universo`,
    hero: `Este é o <span class="glow">universo.</span>`,
    lede: `Você pode seguir seus agentes. Cole um endereço. Veja tudo em que ele tocou. Siga qualquer salto. <strong>Grátis.</strong>`,
    demoBadge: `● DEMO AO VIVO — uma carteira fictícia e o universo ao redor dela. Agora cole um endereço:`,
    sunDockLabel: `Solte qualquer endereço de carteira no sol`,
    addrPlaceholder: `Cole um endereço — BTC (bc1q…, 1A1z…), ETH (0x…) ou XRP (r…)`, pflashButton: `PFLASH IT ⚡`,
    hint1: `PFLASH instantâneo grátis · dados blockchain ao vivo · sem conta · Bitcoin, Ethereum, XRP, USDT e USDC`,
    hint2: `PFLASH it. (O P é silencioso. A verdade não.)`,
    trust1: `⚡ Dados blockchain ao vivo — nada simulado`, trust2: `⚡ Carteiras reais. Transações reais. Respostas reais.`, trust3: `⚡ Grátis para todos — sem conta, sem cartão`,
    howSub: `Três passos. Todos grátis.`,
    deskTitle: `A cadeia nunca dorme.`, deskSub: `O Phantom Flash também não.`,
    deskP1: `O mapa cresce a cada visitante. Cada endereço que alguém cola traça mais algumas carteiras, e cada salto que alguém segue desenha o próximo sistema. O universo que você abre amanhã tem mais coisas do que o de hoje.`,
    deskP2: `O livro-razão público é o registro inteiro. Cada transação fica gravada em um livro que ninguém pode editar nem apagar. O Phantom Flash o lê como os analistas leem e o desenha para qualquer pessoa, de graça.`,
    warningTitle: `Agentes deixam rastro.`, warningText: `Um agente de IA que possui uma chave assina suas declarações em um livro-razão público. O Phantom Flash as lê de volta, para que você siga seus agentes como segue o dinheiro. Cole o endereço do agente ou abra a <a href="agents.html">página de Agentes</a>.`,
    comicTitle: `“Siga isso por mim.”`, comicSub: `Alguém cola um endereço. O universo se desenha ao redor dele. Um salto parece interessante, então a pessoa o segue, e o próximo sistema se desenha no lugar. É a chamada que o Phantom Flash atende.`, comicCta: `Cole um endereço — PFLASH grátis ⚡`,
    reportTitle: `Dois relatórios. Uma verdade.`,
    reportSub: `Precisa de todo o rastro <em>agora</em>? PFLASH-IT. Quer a análise feita à mão? Vá de Full Owlchained. Mesma cadeia, mesmo registro — você escolhe a profundidade.`,
    getReport: `Obter meu relatório →`,
    pfLabel: `⚡ PFLASH-IT Report`, pfTag: `Um envio. Velocidade de máquina. Agora.`,
    pf1: `Cole o endereço, adicione um documento — é só isso para começar`,
    pf2: `Rastreamento automático multissalto: segue o dinheiro por cada salto em velocidade de máquina — carteiras, transações, pontos de convergência`,
    pf3: `Relatório web interativo: o mapa, o inventário de carteiras e as principais descobertas`,
    pf4: `Identificação de exchanges e serviços — onde o dinheiro pousou, com nomes`,
    pf5: `<strong>Velocidade PFLASH</strong> — a maioria dos relatórios é entregue no mesmo dia`,
    pf6: `$171 por atualização conforme o rastro avança`,
    pfCta: `PFLASH-IT — ${PRICE} →`,
    owlLabel: `🦉 Full Owlchained Report`, owlTag: `A análise completa — feita à mão, acorrentada.`,
    owl1: `<strong>Tudo do PFLASH-IT Report</strong>, mais:`,
    owl2: `Levantamento de rastreamento feito à mão — cada salto verificado`,
    owl3: `A História — a jornada do dinheiro em uma narrativa em linguagem simples`,
    owl4: `Pacote de evidências — IDs de transação, linha do tempo e contatos de exchanges, formatado para quem precisar agir com ele`,
    owl5: `<strong>Uma conversa com uma pessoa real</strong> — percorram juntos as descobertas e os próximos passos`,
    owl6: `Entregue em 5–7 dias úteis`,
    owlCta: `Ir de Full Owlchained — ${PRICE_FULL} →`,
    bewareTitle: `Somente leitura.`, bewareText: `O Phantom Flash lê livros-razão públicos. Nunca pede uma frase-semente nem uma chave privada, e nunca toca em uma carteira.`,
    finalCta: `Cole um endereço. Veja o universo.`, finalSub: `Um endereço. Alguns segundos. O livro-razão público, desenhado como um universo.`,
    disclaimer: `O Phantom Flash Owlchained Report é uma análise de blockchain fornecida apenas para fins informativos. Não é garantia nem compromisso de qualquer tipo. Phantom Flash e seus operadores não são responsáveis por informações de rastreamento incorretas, incompletas ou desatualizadas em qualquer relatório ou escaneamento gratuito. Os resultados não são garantidos e nenhum resultado é prometido ou implícito. Nada neste site é aconselhamento jurídico, financeiro ou de investimento. Os dados do escaneamento gratuito vêm de fontes públicas de blockchain e são apresentados como estão. Phantom Flash é um serviço independente de análise de blockchain e não é afiliado a nenhuma carteira, exchange ou software de criptomoedas. Os endereços informados em um escaneamento são registrados para traçar o mapa compartilhado.`,
    scanTitle: `Carteira PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← PFLASH outro endereço`,
    totalIn: `Total recebido`, totalOut: `Total enviado`, txs: `Transações`, cps: `Contrapartes (1º salto)`, window: `Atividade recente`,
    systemTitle: `O sistema`, liveData: `● DADOS BLOCKCHAIN AO VIVO`, systemSub: `Este é o universo ao redor do endereço que você colou. Ele fica no centro; cada carteira com a qual ele operou orbita ao redor, com tamanho conforme o volume. Arraste para girar, use a rolagem para aproximar, clique em qualquer carteira para ver os números e em qualquer transação para iluminar seu caminho e segui-lo. Tudo grátis.`,
    controlsHint: `arraste para girar · role para aproximar · clique em uma carteira para ver detalhes`,
    cpLockedLabel: `CONTRAPARTE #{n} — BLOQUEADA`, moreCpLocked: `MAIS CONTRAPARTES — BLOQUEADAS`,
    cpLockedHover: `uma carteira real de primeiro salto, mapeada pelo Phantom Flash · o relatório completo a segue mais adiante · clique para ver detalhes`,
    txCpLocked: `BLOQUEADA — relatório completo`, txMoreLocked: `+ {n} transações a mais — o Full Owlchained Report as segue mais adiante`,
    deepTitle: `Descobertas de rastreamento profundo`, locked: `🔒 BLOQUEADO`, paywallTitle: `Esse é o primeiro salto. O Phantom Flash pode seguir o resto.`,
    paywallSub: `O PFLASH-IT Report segue o dinheiro por cada salto em velocidade de máquina e entrega o mapa, o inventário de carteiras e as descobertas — um envio, entrega rápida, ${PRICE}. O Full Owlchained Report (${PRICE_FULL}) acrescenta a análise feita à mão, o pacote de evidências e uma conversa com uma pessoa real. Criptomoedas se movem em dias, não em meses.`,
    payCta: `Obter o PFLASH-IT Report — ${PRICE} →`,
    recentTx: `Transações recentes`, date: `Data`, dir: `Direção`, amt: `Valor`, cp: `Contraparte (primeiro salto)`, txid: `TXID`,
    checkoutEyebrow: `⚡ PFLASH-IT · 🦉 Full Owlchained`, checkoutTitle: `Coloque o Phantom Flash na trilha`,
    checkoutSub: `Escolha seu relatório, diga como falar com você e qual endereço seguir, conclua o pagamento e o Phantom Flash começa a trabalhar. Seu relatório vem com uma conta privada, e tudo o que você adicionar nas primeiras 48 horas está incluído.`,
    step1: `Passo 1 — Suas informações`, name: `Nome completo`, email: `E-mail`, phone: `Telefone`, walletLabel: `Endereço da carteira a rastrear`,
    story: `Adicione notas e documentos — agora ou a qualquer momento após o pagamento`, continuePay: `Enviar meus dados — continuar para o pagamento →`,
    captured: `✓ Informações recebidas. Conclua o pagamento no Passo 2 e o Phantom Flash estará na trilha. Se o seu app de e-mail abriu, clique em enviar — é isso que entrega sua solicitação à nossa equipe (alternativa).`,
    order: `Resumo do pedido`, step2: `Passo 2 — Pagamento`, paySecure: `Pagar ${PRICE} com segurança (Stripe) →`, afterPay: `O que acontece após o pagamento:`,
    afterPayText: `você receberá um e-mail de confirmação e um resumo do contrato, e uma breve conversa inicial será agendada. O Phantom Flash começa o rastreamento imediatamente; os relatórios costumam ser entregues em 5–7 dias úteis. Há atendimento urgente quando o tempo é crítico — mencione nas suas notas.`,
    darkTitle: `O livro-razão guarda os recibos.`, darkText: `Todo livro-razão público tem mantido o registro o tempo todo: público, permanente, a segundos de distância. O Phantom Flash o transforma em um universo que você pode percorrer.`, darkCta: `Ver o universo`,
    lockedIntro: `O PFLASH gratuito para no primeiro salto. O Full Owlchained Report o segue mais adiante: carteiras de repasse, hubs de consolidação e as exchanges e serviços onde o dinheiro pousou.`,
    bagLegend: `💰 = parte do tráfego do dinheiro`, bagShare: `Parte do tráfego`,
    bagHonesty: `💰 sacos = a parte desta carteira no volume de primeiro salto observado com a carteira escaneada — não o saldo absoluto desse endereço.`,
    srTitle: `Veja exatamente o que você recebe`,
    srSub: `Cada Full Owlchained Report é um relatório web interativo e privado — não um PDF anexado. Esta é a estrutura real, mostrada com um exemplo fictício. O seu é construído a partir do rastro real do endereço.`,
    srNote: `Amostra com dados fictícios. O PFLASH-IT Report (${PRICE}) segue o dinheiro por cada salto e entrega o mapa de rastreamento, o inventário de carteiras e as principais descobertas — construído por máquina em velocidade PFLASH. A História e o Pacote de evidências vêm com o Full Owlchained Report.`,
    srLead: `Isto é o que <span class="money">${PRICE_FULL}</span> compra.`, srCta: `Obter meu relatório →`,
    sr1t: `A história`, sr1b: `Como o dinheiro se moveu — a narrativa da sua jornada, em linguagem simples, do começo ao fim.`,
    sr2t: `Mapa de rastreamento`, sr2b: `Cada salto, visualizado — um fluxo interativo do endereço até onde os fundos pousaram.`,
    sr3t: `Inventário de carteiras`, sr3b: `Cada endereço documentado — função, volume, primeira/última atividade e como se conecta aos demais.`,
    sr4t: `Principais descobertas`, sr4b: `O que importa, em linguagem simples — as conclusões e a evidência por trás de cada uma.`,
    sr5t: `Pacote de evidências`, sr5b: `Formatado para quem precisar agir com ele — IDs de transação, contatos de escalonamento em exchanges, linha do tempo.`,
    noAddr: `Nenhum endereço informado.`, noAddrBody: `Volte e cole o endereço Bitcoin ou Ethereum que você quer PFLASH.`, invalid: `Isso não parece um endereço de carteira válido.`, busy: `Fonte principal ocupada — tentando nó de backup…`, noTx: `Nenhuma transação encontrada.`, noActivity: `Nenhuma atividade encontrada neste endereço.`, unavail: `O explorador 3D não está disponível neste navegador — veja a tabela de transações abaixo para os mesmos dados do primeiro salto.`, notRecognized: `Esse endereço não é reconhecido pela rede Bitcoin.`, noReach: `Não foi possível acessar as fontes de dados blockchain.`, pflashingLive: `PFLASHING THE CHAIN… lendo o registro blockchain ao vivo`, pflashDonePrefix: `PFLASHED em segundos — `, pflashDoneSuffix: ` transações encontradas.`,
    howTitle: `Como funciona`, step01: `PASSO 01`, step02: `PASSO 02`, step03: `PASSO 03`,
    step1Title: `Cole um endereço`, step2Title: `O universo se desenha sozinho`, step3Title: `Siga qualquer salto, até onde quiser`,
    step1Body: `Um endereço de BTC, ETH ou XRP. Só isso.`,
    step2Body: `O endereço é o sol. Cada carteira com a qual ele operou orbita ao redor, com tamanho conforme o volume. Voe por ele.`,
    step3Body: `Clique em uma transação para iluminar seu caminho e siga-a até a próxima carteira. Cada salto é grátis e cada salto traça o mapa.`,
    bullet1: `Rastreamento multissalto completo — cada carteira, cada transação, cada ponto de convergência`,
    bullet2: `Relatório web interativo: quadro de rastreamento, inventário de carteiras, linha do tempo, principais descobertas`,
    bullet3: `Identificação de exchanges e serviços — onde o dinheiro pousou, com nomes`,
    bullet4: `Pacote de evidências formatado para quem precisar agir com ele`,
    bullet5: `Uma conversa direta para percorrer as descobertas e os próximos passos`,
    recentTitle: `O que o mapa guarda`,
    recentBody: `O Commons guarda endereços, valores e carimbos de data e hora de livros-razão públicos, e as contagens apenas em faixas. Nenhuma pessoa, e-mail ou dispositivo fica associado a nada disso.`,
    notSureTitle: `Ainda não tem certeza?`,
    notSureBody: `Rode primeiro o <a href="#scan">PFLASH grátis</a>. Se o endereço tiver atividade, você verá o universo ao redor dele — de graça — antes de decidir qualquer coisa.`
  };

  D.fr = {
    metaIndex: `Voici l’univers. Vous pouvez suivre vos agents. Collez n’importe quelle adresse BTC, ETH ou XRP et voyez chaque portefeuille qu’elle a touché, gratuitement, en quelques secondes. Cliquez sur une transaction, suivez l’argent saut après saut et laissez la carte tracée pour la personne suivante.`,
    metaScan: `Un scan en direct de la blockchain, dessiné comme un univers 3D interactif : l’adresse au centre, chaque portefeuille avec lequel elle a échangé en orbite autour d’elle. Gratuit, en quelques secondes.`,
    metaCheckout: `Mettez Phantom Flash sur la piste : le PFLASH-IT Report (${PRICE}) suit l’argent à travers chaque saut à vitesse machine, ou le Full Owlchained Report (${PRICE_FULL}) ajoute l’analyse faite à la main, le dossier de preuves et un appel avec une vraie personne.`,
    titleIndex: `Phantom Flash — Voici l’univers. Suivez-le.`,
    titleScan: `Univers — Phantom Flash`,
    navHow: `Fonctionnement`, navReport: `Le rapport`, navFree: `PFLASH gratuit`, navHome: `Accueil`, navUnlock: `Débloquer le rapport`,
    eyebrow: `⚡ Owlchained — Les registres publics, dessinés comme un univers`,
    hero: `Voici l’<span class="glow">univers.</span>`,
    lede: `Vous pouvez suivre vos agents. Collez une adresse. Voyez tout ce qu’elle a touché. Suivez n’importe quel saut. <strong>Gratuit.</strong>`,
    demoBadge: `● DÉMO EN DIRECT — un portefeuille fictif et l’univers autour de lui. Collez maintenant une adresse :`,
    sunDockLabel: `Déposez n’importe quelle adresse de portefeuille dans le soleil`,
    addrPlaceholder: `Collez une adresse — BTC (bc1q…, 1A1z…), ETH (0x…) ou XRP (r…)`, pflashButton: `PFLASH IT ⚡`,
    hint1: `PFLASH instantané gratuit · données blockchain en direct · sans compte · Bitcoin, Ethereum, XRP, USDT et USDC`,
    hint2: `PFLASH it. (Le P est silencieux. La vérité ne l’est pas.)`,
    trust1: `⚡ Données blockchain en direct — rien de simulé`, trust2: `⚡ De vrais portefeuilles. De vraies transactions. De vraies réponses.`, trust3: `⚡ Gratuit pour tout le monde — sans compte, sans carte`,
    howSub: `Trois étapes. Toutes gratuites.`,
    deskTitle: `La chaîne ne dort jamais.`, deskSub: `Phantom Flash non plus.`,
    deskP1: `La carte grandit à chaque visiteur. Chaque adresse collée trace quelques portefeuilles de plus, et chaque saut suivi dessine le système suivant. L’univers que vous ouvrez demain contient plus que celui d’aujourd’hui.`,
    deskP2: `Le registre public est tout le dossier. Chaque transaction est gravée dans un registre que personne ne peut modifier ni effacer. Phantom Flash le lit comme le font les analystes et le dessine pour tout le monde, gratuitement.`,
    warningTitle: `Les agents laissent une trace.`, warningText: `Un agent d’IA qui détient une clé signe ses déclarations sur un registre public. Phantom Flash les relit, pour que vous suiviez vos agents comme vous suivez l’argent. Collez l’adresse de l’agent ou ouvrez la <a href="agents.html">page Agents</a>.`,
    comicTitle: `« Suis-le pour moi. »`, comicSub: `Quelqu’un colle une adresse. L’univers se dessine autour. Un saut semble intéressant, alors la personne le suit, et le système suivant se dessine sur place. C’est l’appel auquel Phantom Flash répond.`, comicCta: `Collez une adresse — PFLASH gratuit ⚡`,
    reportTitle: `Deux rapports. Une seule vérité.`,
    reportSub: `Besoin de toute la piste <em>maintenant</em> ? PFLASH-IT. Envie de l’analyse faite à la main ? Passez au Full Owlchained. Même chaîne, même registre — vous choisissez la profondeur.`,
    getReport: `Obtenir mon rapport →`,
    pfLabel: `⚡ PFLASH-IT Report`, pfTag: `Un envoi. Vitesse machine. Maintenant.`,
    pf1: `Collez l’adresse, ajoutez un document — c’est tout ce qu’il faut pour commencer`,
    pf2: `Traçage automatique multi-sauts : suit l’argent à travers chaque saut à vitesse machine — portefeuilles, transactions, points de convergence`,
    pf3: `Rapport web interactif : la carte, l’inventaire des portefeuilles et les principales constatations`,
    pf4: `Identification des plateformes et services — où l’argent a atterri, nommé`,
    pf5: `<strong>Vitesse PFLASH</strong> — la plupart des rapports sont livrés le jour même`,
    pf6: `$171 par mise à jour à mesure que la piste évolue`,
    pfCta: `PFLASH-IT — ${PRICE} →`,
    owlLabel: `🦉 Full Owlchained Report`, owlTag: `L’analyse complète — faite à la main, enchaînée.`,
    owl1: `<strong>Tout ce que contient le PFLASH-IT Report</strong>, plus :`,
    owl2: `Analyse de traçage faite à la main — chaque saut vérifié`,
    owl3: `L’Histoire — le parcours de l’argent en un récit en langage clair`,
    owl4: `Dossier de preuves — identifiants de transaction, chronologie et contacts des plateformes, mis en forme pour quiconque doit agir dessus`,
    owl5: `<strong>Un appel avec une vraie personne</strong> — parcourez ensemble les constatations et les prochaines étapes`,
    owl6: `Livré en 5 à 7 jours ouvrés`,
    owlCta: `Passer au Full Owlchained — ${PRICE_FULL} →`,
    bewareTitle: `Lecture seule.`, bewareText: `Phantom Flash lit les registres publics. Il ne demande jamais de phrase secrète ni de clé privée, et ne touche jamais à un portefeuille.`,
    finalCta: `Collez une adresse. Voyez l’univers.`, finalSub: `Une adresse. Quelques secondes. Le registre public, dessiné comme un univers.`,
    disclaimer: `Le Phantom Flash Owlchained Report est une analyse blockchain fournie uniquement à titre informatif. Il ne constitue ni garantie ni engagement d’aucune sorte. Phantom Flash et ses opérateurs ne sont pas responsables des informations de traçage incorrectes, incomplètes ou obsolètes dans tout rapport ou scan gratuit. Les résultats ne sont pas garantis et aucun résultat n’est promis ni sous-entendu. Rien sur ce site ne constitue un conseil juridique, financier ou d’investissement. Les données du scan gratuit proviennent en direct de sources blockchain publiques et sont présentées telles quelles. Phantom Flash est un service indépendant d’analyse blockchain et n’est affilié à aucun portefeuille, échange ou logiciel crypto. Les adresses saisies pour un scan sont enregistrées afin de tracer la carte partagée.`,
    scanTitle: `Portefeuille PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← PFLASH une autre adresse`,
    totalIn: `Total reçu`, totalOut: `Total envoyé`, txs: `Transactions`, cps: `Contreparties (1er saut)`, window: `Activité récente`,
    systemTitle: `Le système`, liveData: `● DONNÉES BLOCKCHAIN EN DIRECT`, systemSub: `Voici l’univers autour de l’adresse que vous avez collée. Elle se trouve au centre ; chaque portefeuille avec lequel elle a échangé gravite autour, dimensionné selon le volume. Faites glisser pour pivoter, utilisez la molette pour zoomer, cliquez sur un portefeuille pour voir les chiffres, cliquez sur une transaction pour illuminer son chemin et le suivre. Le tout gratuit.`,
    controlsHint: `faites glisser pour pivoter · molette pour zoomer · cliquez sur un portefeuille pour les détails`,
    cpLockedLabel: `CONTREPARTIE n° {n} — VERROUILLÉE`, moreCpLocked: `AUTRES CONTREPARTIES — VERROUILLÉES`,
    cpLockedHover: `un vrai portefeuille de premier saut, cartographié par Phantom Flash · le rapport complet le suit plus loin · cliquez pour les détails`,
    txCpLocked: `VERROUILLÉE — rapport complet`, txMoreLocked: `+ {n} transactions de plus — le Full Owlchained Report les suit plus loin`,
    deepTitle: `Constatations du traçage approfondi`, locked: `🔒 VERROUILLÉ`, paywallTitle: `Voilà le premier saut. Phantom Flash peut suivre le reste.`,
    paywallSub: `Le PFLASH-IT Report suit l’argent à travers chaque saut à vitesse machine et vous remet la carte, l’inventaire des portefeuilles et les constatations — un envoi, livraison rapide, ${PRICE}. Le Full Owlchained Report (${PRICE_FULL}) ajoute l’analyse faite à la main, le dossier de preuves et un appel avec une vraie personne. Les cryptomonnaies bougent en jours, pas en mois.`,
    payCta: `Obtenir le PFLASH-IT Report — ${PRICE} →`,
    recentTx: `Transactions récentes`, date: `Date`, dir: `Sens`, amt: `Montant`, cp: `Contrepartie (premier saut)`, txid: `TXID`,
    checkoutEyebrow: `⚡ PFLASH-IT · 🦉 Full Owlchained`, checkoutTitle: `Mettez Phantom Flash sur la piste`,
    checkoutSub: `Choisissez votre rapport, dites-nous comment vous joindre et quelle adresse suivre, réglez le paiement, et Phantom Flash se met au travail. Votre rapport s’accompagne d’un compte privé, et tout ce que vous ajoutez durant les 48 premières heures est inclus.`,
    step1: `Étape 1 — Vos informations`, name: `Nom complet`, email: `E-mail`, phone: `Téléphone`, walletLabel: `Adresse du portefeuille à tracer`,
    story: `Ajoutez des notes et des documents — maintenant, ou à tout moment après le paiement`, continuePay: `Envoyer mes informations — passer au paiement →`,
    captured: `✓ Informations reçues. Réglez le paiement à l’étape 2 et Phantom Flash est sur la piste. Si votre application de messagerie s’est ouverte, cliquez sur envoyer — c’est ce qui transmet votre demande à notre équipe (solution de secours).`,
    order: `Résumé de commande`, step2: `Étape 2 — Paiement`, paySecure: `Payer ${PRICE} en sécurité (Stripe) →`, afterPay: `Ce qui se passe après le paiement :`,
    afterPayText: `vous recevrez un e-mail de confirmation et un récapitulatif de mission, et un court appel d’accueil sera planifié. Phantom Flash commence le traçage immédiatement ; les rapports sont généralement livrés en 5 à 7 jours ouvrés. Un traitement accéléré est possible lorsque le temps presse — mentionnez-le dans vos notes.`,
    darkTitle: `Le registre garde les reçus.`, darkText: `Chaque registre public tient le dossier depuis le début : public, permanent, à quelques secondes. Phantom Flash en fait un univers que vous pouvez parcourir.`, darkCta: `Voir l’univers`,
    lockedIntro: `Le PFLASH gratuit s’arrête au premier saut. Le Full Owlchained Report le suit plus loin : portefeuilles relais, centres de regroupement, et les plateformes et services où l’argent a atterri.`,
    bagLegend: `💰 = part du trafic de l’argent`, bagShare: `Part du trafic`,
    bagHonesty: `💰 sacs = la part de ce portefeuille dans le volume de premier saut observé avec le portefeuille scanné — pas le solde absolu de cette adresse.`,
    srTitle: `Voyez exactement ce que vous obtenez`,
    srSub: `Chaque Full Owlchained Report est un rapport web interactif et privé — pas une pièce jointe PDF. Voici la structure réelle, montrée avec un exemple fictif. Le vôtre est construit à partir de la vraie piste de l’adresse.`,
    srNote: `Exemple avec des données fictives. Le PFLASH-IT Report (${PRICE}) suit l’argent à travers chaque saut et remet la carte de traçage, l’inventaire des portefeuilles et les constatations clés — construit par machine à vitesse PFLASH. L’Histoire et le Dossier de preuves sont fournis avec le Full Owlchained Report.`,
    srLead: `Voilà ce qu’achète <span class="money">${PRICE_FULL}</span>.`, srCta: `Obtenir mon rapport →`,
    sr1t: `L’Histoire`, sr1b: `Comment l’argent a circulé — le récit de son parcours, en langage clair, du début à la fin.`,
    sr2t: `Carte de traçage`, sr2b: `Chaque saut, visualisé — un flux interactif depuis l’adresse jusqu’à l’endroit où les fonds ont atterri.`,
    sr3t: `Inventaire des portefeuilles`, sr3b: `Chaque adresse documentée — rôle, volume, première/dernière activité et lien avec les autres.`,
    sr4t: `Constatations clés`, sr4b: `Ce qui compte, en langage clair — les conclusions et les éléments derrière chacune.`,
    sr5t: `Dossier de preuves`, sr5b: `Mis en forme pour quiconque doit agir dessus — identifiants de transaction, contacts d’escalade auprès des plateformes, chronologie.`,
    noAddr: `Aucune adresse fournie.`, noAddrBody: `Revenez en arrière et collez l’adresse Bitcoin ou Ethereum que vous voulez PFLASH.`, invalid: `Cela ne ressemble pas à une adresse de portefeuille valide.`, busy: `Source principale occupée — essai du nœud de secours…`, noTx: `Aucune transaction trouvée.`, noActivity: `Aucune activité trouvée sur cette adresse.`, unavail: `L’explorateur 3D n’est pas disponible dans ce navigateur — voyez le tableau des transactions ci-dessous pour les mêmes données du premier saut.`, notRecognized: `Cette adresse n’est pas reconnue par le réseau Bitcoin.`, noReach: `Impossible d’atteindre les sources de données blockchain.`, pflashingLive: `PFLASHING THE CHAIN… lecture du registre blockchain en direct`, pflashDonePrefix: `PFLASHED en quelques secondes — `, pflashDoneSuffix: ` transactions trouvées.`,
    howTitle: `Fonctionnement`, step01: `ÉTAPE 01`, step02: `ÉTAPE 02`, step03: `ÉTAPE 03`,
    step1Title: `Collez une adresse`, step2Title: `L’univers se dessine tout seul`, step3Title: `Suivez n’importe quel saut, aussi loin que vous voulez`,
    step1Body: `Une adresse BTC, ETH ou XRP. C’est tout.`,
    step2Body: `L’adresse est le soleil. Chaque portefeuille avec lequel elle a échangé gravite autour, dimensionné selon le volume. Volez à travers.`,
    step3Body: `Cliquez sur une transaction pour illuminer son chemin, puis suivez-la jusqu’au portefeuille suivant. Chaque saut est gratuit, et chaque saut trace la carte.`,
    bullet1: `Traçage multi-sauts complet — chaque portefeuille, chaque transaction, chaque point de convergence`,
    bullet2: `Rapport web interactif : tableau de traçage, inventaire des portefeuilles, chronologie, constatations clés`,
    bullet3: `Identification des plateformes et services — où l’argent a atterri, nommé`,
    bullet4: `Dossier de preuves mis en forme pour quiconque doit agir dessus`,
    bullet5: `Un appel direct pour parcourir les constatations et les prochaines étapes`,
    recentTitle: `Ce que garde la carte`,
    recentBody: `Le Commons conserve des adresses, des montants et des horodatages issus de registres publics, et des comptages uniquement par tranches. Aucune personne, aucun e-mail, aucun appareil n’y est rattaché.`,
    notSureTitle: `Pas encore sûr ?`,
    notSureBody: `Lancez d’abord le <a href="#scan">PFLASH gratuit</a>. Si l’adresse a de l’activité, vous verrez l’univers autour d’elle — gratuitement — avant de décider quoi que ce soit.`
  };

  D.de = {
    metaIndex: `Das ist das Universum. Sie können Ihren Agenten folgen. Fügen Sie eine beliebige Adresse auf BTC, ETH oder XRP ein und sehen Sie jede Wallet, die sie berührt hat – kostenlos, in Sekunden. Klicken Sie auf eine Transaktion, folgen Sie dem Geld Sprung für Sprung und hinterlassen Sie die Karte für die nächste Person gezeichnet.`,
    metaScan: `Ein Live-Scan der Blockchain, dargestellt als interaktives 3D-Universum: die Adresse in der Mitte, jede Wallet, mit der sie gehandelt hat, auf einer Umlaufbahn darum. Kostenlos, in Sekunden.`,
    metaCheckout: `Setzen Sie Phantom Flash auf die Spur: Der PFLASH-IT Report (${PRICE}) folgt dem Geld durch jeden Sprung in Maschinengeschwindigkeit, der Full Owlchained Report (${PRICE_FULL}) ergänzt die handgefertigte Analyse, das Beweispaket und ein Gespräch mit einem echten Menschen.`,
    titleIndex: `Phantom Flash — Das ist das Universum. Folgen Sie ihm.`,
    titleScan: `Universum — Phantom Flash`,
    navHow: `So funktioniert es`, navReport: `Der Bericht`, navFree: `Kostenloser PFLASH`, navHome: `Start`, navUnlock: `Bericht freischalten`,
    eyebrow: `⚡ Owlchained — Öffentliche Ledger, gezeichnet als Universum`,
    hero: `Das ist das <span class="glow">Universum.</span>`,
    lede: `Sie können Ihren Agenten folgen. Fügen Sie eine Adresse ein. Sehen Sie alles, was sie berührt hat. Folgen Sie jedem Sprung. <strong>Kostenlos.</strong>`,
    demoBadge: `● LIVE-DEMO — eine fiktive Wallet und das Universum um sie herum. Fügen Sie jetzt eine Adresse ein:`,
    sunDockLabel: `Werfen Sie eine beliebige Wallet-Adresse in die Sonne`,
    addrPlaceholder: `Adresse einfügen — BTC (bc1q…, 1A1z…), ETH (0x…) oder XRP (r…)`, pflashButton: `PFLASH IT ⚡`,
    hint1: `Kostenloser Sofort-PFLASH · Live-Blockchain-Daten · kein Konto · Bitcoin, Ethereum, XRP, USDT & USDC`,
    hint2: `PFLASH it. (Das P ist stumm. Die Wahrheit nicht.)`,
    trust1: `⚡ Live-Blockchain-Daten — nichts simuliert`, trust2: `⚡ Echte Wallets. Echte Transaktionen. Echte Antworten.`, trust3: `⚡ Kostenlos für alle — kein Konto, keine Karte`,
    howSub: `Drei Schritte. Alle kostenlos.`,
    deskTitle: `Die Chain schläft nie.`, deskSub: `Phantom Flash auch nicht.`,
    deskP1: `Die Karte wächst mit jedem Besucher. Jede eingefügte Adresse zeichnet ein paar Wallets mehr, und jeder verfolgte Sprung zeichnet das nächste System. Das Universum, das Sie morgen öffnen, enthält mehr als das von heute.`,
    deskP2: `Das öffentliche Ledger ist die ganze Aufzeichnung. Jede Transaktion ist in ein Ledger eingraviert, das niemand ändern und niemand löschen kann. Phantom Flash liest es, wie Analysten es lesen, und zeichnet es für alle, kostenlos.`,
    warningTitle: `Agenten hinterlassen eine Spur.`, warningText: `Ein KI-Agent, der einen Schlüssel besitzt, signiert seine Erklärungen auf einem öffentlichen Ledger. Phantom Flash liest sie zurück, damit Sie Ihren Agenten folgen können, wie Sie dem Geld folgen. Fügen Sie die Adresse des Agenten ein oder öffnen Sie die <a href="agents.html">Agenten-Seite</a>.`,
    comicTitle: `„Folge ihm für mich.“`, comicSub: `Jemand fügt eine Adresse ein. Das Universum zeichnet sich darum herum. Ein Sprung sieht interessant aus, also folgt die Person ihm, und das nächste System zeichnet sich an Ort und Stelle. Das ist der Anruf, den Phantom Flash annimmt.`, comicCta: `Adresse einfügen — kostenloser PFLASH ⚡`,
    reportTitle: `Zwei Berichte. Eine Wahrheit.`,
    reportSub: `Sie brauchen die ganze Spur <em>jetzt</em>? PFLASH-IT. Sie wollen die handgefertigte Analyse? Nehmen Sie Full Owlchained. Dieselbe Chain, dieselbe Aufzeichnung — Sie wählen die Tiefe.`,
    getReport: `Meinen Bericht erhalten →`,
    pfLabel: `⚡ PFLASH-IT Report`, pfTag: `Ein Upload. Maschinengeschwindigkeit. Jetzt.`,
    pf1: `Adresse einfügen, ein Dokument hinzufügen — mehr braucht es zum Start nicht`,
    pf2: `Automatischer Multi-Hop-Trace: folgt dem Geld durch jeden Sprung in Maschinengeschwindigkeit — Wallets, Transaktionen, Konvergenzpunkte`,
    pf3: `Interaktiver Web-Bericht: die Karte, das Wallet-Inventar und die wichtigsten Erkenntnisse`,
    pf4: `Identifizierung von Börsen und Diensten — wo das Geld gelandet ist, benannt`,
    pf5: `<strong>PFLASH-Tempo</strong> — die meisten Berichte werden am selben Tag geliefert`,
    pf6: `$171 pro Update, während sich die Spur entwickelt`,
    pfCta: `PFLASH-IT — ${PRICE} →`,
    owlLabel: `🦉 Full Owlchained Report`, owlTag: `Die vollständige Analyse — von Hand gebaut, angekettet.`,
    owl1: `<strong>Alles aus dem PFLASH-IT Report</strong>, plus:`,
    owl2: `Handgefertigte Tracing-Auswertung — jeder Sprung verifiziert`,
    owl3: `Die Geschichte — die Reise des Geldes als Erzählung in klarer Sprache`,
    owl4: `Beweispaket — Transaktions-IDs, Zeitleiste und Börsenkontakte, aufbereitet für alle, die damit handeln müssen`,
    owl5: `<strong>Ein Gespräch mit einem echten Menschen</strong> — gemeinsam die Erkenntnisse und nächsten Schritte durchgehen`,
    owl6: `Lieferung in 5–7 Werktagen`,
    owlCta: `Full Owlchained wählen — ${PRICE_FULL} →`,
    bewareTitle: `Nur lesen.`, bewareText: `Phantom Flash liest öffentliche Ledger. Es fragt nie nach einer Seed-Phrase oder einem privaten Schlüssel und berührt nie eine Wallet.`,
    finalCta: `Adresse einfügen. Das Universum sehen.`, finalSub: `Eine Adresse. Ein paar Sekunden. Das öffentliche Ledger, gezeichnet als Universum.`,
    disclaimer: `Der Phantom Flash Owlchained Report ist eine Blockchain-Analyse ausschließlich zu Informationszwecken. Er ist keine Garantie und keine Zusage irgendeiner Art. Phantom Flash und seine Betreiber haften nicht für falsche, unvollständige oder veraltete Tracking-Informationen in einem Bericht oder kostenlosen Scan. Ergebnisse werden nicht garantiert; ein bestimmtes Ergebnis wird weder versprochen noch impliziert. Diese Website stellt keine Rechts-, Finanz- oder Anlageberatung dar. Kostenlose Scan-Daten stammen live aus öffentlichen Blockchain-Quellen und werden wie vorliegend dargestellt. Phantom Flash ist ein unabhängiger Blockchain-Analysedienst und nicht mit Wallets, Börsen oder Softwareprodukten für Kryptowährungen verbunden. Für einen Scan eingegebene Adressen werden gespeichert, um die gemeinsame Karte zu zeichnen.`,
    scanTitle: `Wallet PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← Andere Adresse PFLASHEN`,
    totalIn: `Insgesamt erhalten`, totalOut: `Insgesamt gesendet`, txs: `Transaktionen`, cps: `Gegenparteien (1. Sprung)`, window: `Letzte Aktivität`,
    systemTitle: `Das System`, liveData: `● LIVE-BLOCKCHAIN-DATEN`, systemSub: `Das ist das Universum um die Adresse, die Sie eingefügt haben. Sie sitzt in der Mitte; jede Wallet, mit der sie gehandelt hat, kreist um sie, nach Volumen skaliert. Ziehen zum Drehen, Scrollen zum Zoomen, auf eine Wallet klicken für die Zahlen, auf eine Transaktion klicken, um ihren Pfad zu beleuchten und ihm zu folgen. Alles kostenlos.`,
    controlsHint: `ziehen zum Drehen · scrollen zum Zoomen · Wallet anklicken für Details`,
    cpLockedLabel: `GEGENPARTEI #{n} — GESPERRT`, moreCpLocked: `WEITERE GEGENPARTEIEN — GESPERRT`,
    cpLockedHover: `eine echte Wallet des ersten Sprungs, von Phantom Flash kartiert · der vollständige Bericht verfolgt sie weiter · klicken für Details`,
    txCpLocked: `GESPERRT — vollständiger Bericht`, txMoreLocked: `+ {n} weitere Transaktionen — der Full Owlchained Report verfolgt sie weiter`,
    deepTitle: `Erkenntnisse aus dem Deep-Trace`, locked: `🔒 GESPERRT`, paywallTitle: `Das ist der erste Sprung. Phantom Flash kann dem Rest folgen.`,
    paywallSub: `Der PFLASH-IT Report folgt dem Geld durch jeden Sprung in Maschinengeschwindigkeit und liefert Ihnen die Karte, das Wallet-Inventar und die Erkenntnisse — ein Upload, schnell geliefert, ${PRICE}. Der Full Owlchained Report (${PRICE_FULL}) ergänzt die handgefertigte Analyse, das Beweispaket und ein Gespräch mit einem echten Menschen. Krypto bewegt sich in Tagen, nicht in Monaten.`,
    payCta: `PFLASH-IT Report erhalten — ${PRICE} →`,
    recentTx: `Letzte Transaktionen`, date: `Datum`, dir: `Richtung`, amt: `Betrag`, cp: `Gegenpartei (erster Sprung)`, txid: `TXID`,
    checkoutEyebrow: `⚡ PFLASH-IT · 🦉 Full Owlchained`, checkoutTitle: `Setzen Sie Phantom Flash auf die Spur`,
    checkoutSub: `Wählen Sie Ihren Bericht, sagen Sie uns, wie wir Sie erreichen und welcher Adresse wir folgen sollen, schließen Sie die Zahlung ab, und Phantom Flash legt los. Zu Ihrem Bericht gehört ein privates Konto, und alles, was Sie in den ersten 48 Stunden hinzufügen, ist inbegriffen.`,
    step1: `Schritt 1 — Ihre Angaben`, name: `Vollständiger Name`, email: `E-Mail`, phone: `Telefon`, walletLabel: `Zu verfolgende Wallet-Adresse`,
    story: `Notizen und Dokumente hinzufügen — jetzt oder jederzeit nach der Zahlung`, continuePay: `Meine Angaben senden — weiter zur Zahlung →`,
    captured: `✓ Angaben erfasst. Schließen Sie die Zahlung in Schritt 2 ab, und Phantom Flash ist auf der Spur. Falls sich Ihre E-Mail-App geöffnet hat, klicken Sie auf Senden — damit geht Ihre Anfrage an unser Team (Ausweichlösung).`,
    order: `Bestellübersicht`, step2: `Schritt 2 — Zahlung`, paySecure: `${PRICE} sicher bezahlen (Stripe) →`, afterPay: `Was nach der Zahlung passiert:`,
    afterPayText: `Sie erhalten eine Bestätigungs-E-Mail und eine Auftragszusammenfassung, und ein kurzes Aufnahmegespräch wird vereinbart. Phantom Flash beginnt sofort mit dem Tracing; Berichte werden in der Regel in 5–7 Werktagen geliefert. Eilbearbeitung ist möglich, wenn die Zeit drängt — erwähnen Sie es in Ihren Notizen.`,
    darkTitle: `Das Ledger bewahrt die Belege.`, darkText: `Jedes öffentliche Ledger führt die Aufzeichnung seit jeher: öffentlich, dauerhaft, Sekunden entfernt. Phantom Flash macht daraus ein Universum, das Sie begehen können.`, darkCta: `Das Universum sehen`,
    lockedIntro: `Der kostenlose PFLASH endet beim ersten Sprung. Der Full Owlchained Report verfolgt ihn weiter: Relay-Wallets, Sammelstellen und die Börsen und Dienste, auf denen das Geld gelandet ist.`,
    bagLegend: `💰 = Anteil am Verkehr des Geldes`, bagShare: `Verkehrsanteil`,
    bagHonesty: `💰 Beutel = der Anteil dieser Wallet am beobachteten Volumen des ersten Sprungs mit der gescannten Wallet — nicht der absolute Kontostand dieser Adresse.`,
    srTitle: `Sehen Sie genau, was Sie bekommen`,
    srSub: `Jeder Full Owlchained Report ist ein privater, interaktiver Web-Bericht — kein PDF-Anhang. Hier ist die tatsächliche Struktur, gezeigt an einem fiktiven Beispiel. Ihrer wird aus der echten Spur der Adresse gebaut.`,
    srNote: `Muster mit fiktiven Daten. Der PFLASH-IT Report (${PRICE}) folgt dem Geld durch jeden Sprung und liefert die Tracing-Karte, das Wallet-Inventar und die wichtigsten Erkenntnisse — maschinell erstellt in PFLASH-Tempo. Die Geschichte und das Beweispaket gehören zum Full Owlchained Report.`,
    srLead: `Das bekommen Sie für <span class="money">${PRICE_FULL}</span>.`, srCta: `Meinen Bericht erhalten →`,
    sr1t: `Die Geschichte`, sr1b: `Wie sich das Geld bewegt hat — die Erzählung seiner Reise, in klarer Sprache, von Anfang bis Ende.`,
    sr2t: `Tracing-Karte`, sr2b: `Jeder Sprung, visualisiert — ein interaktiver Fluss von der Adresse dorthin, wo die Gelder gelandet sind.`,
    sr3t: `Wallet-Inventar`, sr3b: `Jede Adresse dokumentiert — Rolle, Volumen, erste/letzte Aktivität und wie sie mit den anderen zusammenhängt.`,
    sr4t: `Wichtigste Erkenntnisse`, sr4b: `Was zählt, in klarer Sprache — die Schlussfolgerungen und die Belege hinter jeder einzelnen.`,
    sr5t: `Beweispaket`, sr5b: `Aufbereitet für alle, die damit handeln müssen — Transaktions-IDs, Eskalationskontakte bei Börsen, Zeitleiste.`,
    noAddr: `Keine Adresse angegeben.`, noAddrBody: `Gehen Sie zurück und fügen Sie die Bitcoin- oder Ethereum-Adresse ein, die Sie PFLASHEN möchten.`, invalid: `Das sieht nicht nach einer gültigen Wallet-Adresse aus.`, busy: `Primärquelle ausgelastet — Backup-Knoten wird versucht…`, noTx: `Keine Transaktionen gefunden.`, noActivity: `Keine Aktivität für diese Adresse gefunden.`, unavail: `Der 3D-Explorer ist in diesem Browser nicht verfügbar — die Transaktionstabelle unten zeigt dieselben Daten des ersten Sprungs.`, notRecognized: `Diese Adresse wird vom Bitcoin-Netzwerk nicht erkannt.`, noReach: `Die Blockchain-Datenquellen waren nicht erreichbar.`, pflashingLive: `PFLASHING THE CHAIN… der Live-Blockchain-Datensatz wird gelesen`, pflashDonePrefix: `In Sekunden PFLASHED — `, pflashDoneSuffix: ` Transaktionen gefunden.`,
    howTitle: `So funktioniert es`, step01: `SCHRITT 01`, step02: `SCHRITT 02`, step03: `SCHRITT 03`,
    step1Title: `Adresse einfügen`, step2Title: `Das Universum zeichnet sich selbst`, step3Title: `Folgen Sie jedem Sprung, so weit Sie wollen`,
    step1Body: `Eine Adresse auf BTC, ETH oder XRP. Mehr nicht.`,
    step2Body: `Die Adresse ist die Sonne. Jede Wallet, mit der sie gehandelt hat, kreist um sie, nach Volumen skaliert. Fliegen Sie hindurch.`,
    step3Body: `Klicken Sie auf eine Transaktion, um ihren Pfad zu beleuchten, und folgen Sie ihr zur nächsten Wallet. Jeder Sprung ist kostenlos, und jeder Sprung zeichnet die Karte.`,
    bullet1: `Vollständiger Multi-Hop-Trace — jede Wallet, jede Transaktion, jeder Konvergenzpunkt`,
    bullet2: `Interaktiver Web-Bericht: Tracing-Board, Wallet-Inventar, Zeitleiste, wichtigste Erkenntnisse`,
    bullet3: `Identifizierung von Börsen und Diensten — wo das Geld gelandet ist, benannt`,
    bullet4: `Beweispaket, aufbereitet für alle, die damit handeln müssen`,
    bullet5: `Ein direktes Gespräch, um die Erkenntnisse und nächsten Schritte durchzugehen`,
    recentTitle: `Was die Karte speichert`,
    recentBody: `Das Commons speichert Adressen, Beträge und Zeitstempel aus öffentlichen Ledgern, Zählungen nur in Bändern. Keine Person, keine E-Mail, kein Gerät ist damit verknüpft.`,
    notSureTitle: `Noch unsicher?`,
    notSureBody: `Starten Sie zuerst den <a href="#scan">kostenlosen PFLASH</a>. Wenn die Adresse Aktivität hat, sehen Sie das Universum um sie herum — kostenlos —, bevor Sie irgendetwas entscheiden.`
  };

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
  function t(k) { var v = D[lang] && D[lang][k]; if (v == null) v = D.en[k]; return v == null ? k : v; }
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
    document.querySelectorAll('.site-footer .legal').forEach(function(f){
      if (f.querySelector('.footer-social')) return;
      var s = document.createElement('p');
      s.className = 'footer-social';
      s.innerHTML = 'Follow Phantom Flash: ' +
        '<a href="https://x.com/PhantomFlashHQ" target="_blank" rel="noopener">X (@PhantomFlashHQ)</a> · ' +
        '<a href="https://www.youtube.com/@PhantomFlashHQ" target="_blank" rel="noopener">YouTube (@PhantomFlashHQ)</a>';
      var copyright = f.querySelector('p:last-of-type');
      if (copyright) f.insertBefore(s, copyright); else f.appendChild(s);
    });
  }

  function applyIndex(){
    document.title = t('titleIndex');
    attr('meta[name="description"]','content',t('metaIndex')); attr('meta[property="og:description"]','content',t('metaIndex'));
    attr('meta[property="og:title"]','content',t('titleIndex'));
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
    if(split){
      var h=split.querySelector('h2.section-title'); if(h) h.innerHTML=t('deskTitle')+'<br>'+t('deskSub');
      var sub=split.querySelector('.section-sub'); if(sub) sub.textContent=t('deskP1');
      var calls=split.querySelectorAll('.callout');
      // first sentence bold (ends at . or the CJK full stop), the rest plain
      var m=/^([\s\S]+?[.。])\s*([\s\S]*)$/.exec(t('deskP2'));
      if(calls[0]) calls[0].innerHTML = m ? '<strong>'+m[1]+'</strong> '+m[2] : t('deskP2');
      if(calls[1]) calls[1].innerHTML='<strong>'+t('warningTitle')+'</strong> '+t('warningText');
    }

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
    document.title=t('titleScan'); attr('meta[name="description"]','content',t('metaScan'));
    attr('meta[property="og:title"]','content',t('titleScan')); attr('meta[property="og:description"]','content',t('metaScan'));
    set('.scan-head h1', t('scanTitle')); set('#statusText', t('scanLoading'));
    setAllText('.stat-row .stat:nth-child(1) .label:first-child', t('totalIn'));
    setAllText('.stat-row .stat:nth-child(2) .label:first-child', t('totalOut'));
    setAllText('.stat-row .stat:nth-child(3) .label', t('txs'));
    setAllText('.stat-row .stat:nth-child(4) .label', t('cps'));
    setAllText('.stat-row .stat:nth-child(5) .label', t('window'));
    set('.stage3d + .node-card .node-title', '');
    var h2=document.querySelector('.section-title'); if(h2) h2.innerHTML=t('systemTitle')+' <span style="color:var(--green);font-size:13px;font-weight:700;letter-spacing:.1em;font-family:var(--sans)">'+t('liveData')+'</span>';
    var sub=document.querySelector('.section-title + .section-sub'); if(sub) sub.innerHTML=t('systemSub')+' <span id="capNote" style="display:none;color:var(--amber)">Showing top counterparties by volume.</span>';
    set('.hud', '<span class="live">●</span> FIRST HOP — LIVE · INHABITED · FREE');
    set('.controls-hint', t('controlsHint'));
    /* v11 (2026-08-21): paywall removed — deep-trace section, cta-band, and
       mini-locks no longer exist on scan.html; their rewrites are gone too. */
    var rt=document.querySelectorAll('h2.section-title')[1]; if(rt){ rt.childNodes[0].textContent=t('recentTx')+' '; var sp=rt.querySelector('span'); if(sp && t('recentSub')) sp.textContent=t('recentSub'); }
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
