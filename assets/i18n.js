/* Phantom Flash i18n v10 — static, client-side language layer
   v22: "This is the field. You can follow your agents in the field." Nothing
   is paid, so the sales strings are gone. Every language carries the full
   key set below (no English fallbacks needed). */
(function () {
  'use strict';

  var LANGS = {
    en: 'English', es: 'Español', zh: '中文', vi: 'Tiếng Việt',
    pt: 'Português', fr: 'Français', de: 'Deutsch'
  };

  var D = {};

  D.en = {
    metaIndex: `This is the field. You can follow your agents in the field. Paste any address on BTC, ETH, or XRP and see every wallet it touched, free, in seconds. Click a transaction, follow the money hop by hop, and leave the field charted for the next person.`,
    metaScan: `A live on-chain scan drawn as an interactive 3D system in the field: the address at the center, every wallet it dealt with in orbit around it. Free, in seconds.`,
    titleIndex: `Phantom Flash — Trace the field.`,
    titleScan: `The field — Phantom Flash`,
    navHow: `How it works`, navFree: `Free PFLASH`, navHome: `Home`,
    eyebrow: `⚡ Owlchained — Public Ledgers, Drawn as a Field`,
    hero: `Trace the <span class="glow">field.</span>`,
    lede: `Paste an address. See everything it touched. Follow any hop. <strong>Free.</strong>`,
    demoBadge: `● LIVE DEMO — a fictional wallet and the field around it. Now paste an address:`,
    sunDockLabel: `Drop any wallet address into the sun`,
    addrPlaceholder: `Paste a wallet address — BTC (bc1q…, 1A1z…), ETH (0x…) or XRP (r…)`, pflashButton: `PFLASH IT ⚡`,
    hint1: `Free instant PFLASH · live blockchain data · no account needed · Bitcoin, Ethereum, XRP, USDT & USDC`,
    hint2: `PFLASH it. (The P is silent. The truth isn't.)`,
    trust1: `⚡ Live blockchain data — nothing simulated`, trust2: `⚡ Real wallets. Real transactions. Real answers.`, trust3: `⚡ Free for everybody — no account, no card`,
    howSub: `Three steps. All of them free.`,
    deskTitle: `The chain never sleeps.`, deskSub: `Neither does Phantom Flash.`,
    deskP1: `The map grows with every visitor. Each address someone pastes charts a few more wallets, and each hop someone follows draws the next system. The field you open tomorrow has more in it than the one you opened today.`,
    deskP2: `The public ledger is the whole record. Every transaction is carved into a ledger that nobody can edit and nobody can delete. Phantom Flash reads it the way analysts do and draws it for anyone, free.`,
    warningTitle: `Agents leave a trail.`, warningText: `An AI agent that holds a key signs its declarations onto a public ledger. Phantom Flash reads them back, so you can follow your agents the way you follow money. Paste the agent’s address, or open the <a href="agents.html">Agents page</a>.`,
    comicTitle: `“Follow it for me.”`, comicSub: `Someone pastes an address. A system draws itself around it. One hop looks interesting, so they follow it, and the next system draws itself in place. That’s the call Phantom Flash answers.`, comicCta: `Paste an address — free PFLASH ⚡`,
    bewareTitle: `Read-only.`, bewareText: `Phantom Flash reads public ledgers. It never asks for a seed phrase or a private key, and it never touches a wallet.`,
    finalCta: `Paste an address. See the field.`, finalSub: `One address. A few seconds. The public ledger, drawn as a field.`,
    disclaimer: `Phantom Flash is a blockchain analysis provided for informational purposes only. It is not a guarantee or commitment of any kind. Phantom Flash and its operators are not responsible for any incorrect, incomplete, or outdated tracing information in any scan. Results are not guaranteed, and no outcome is promised or implied. Nothing on this site is legal, financial, or investment advice. Scan data is retrieved live from public blockchain sources and is presented as-is. Phantom Flash is an independent blockchain analysis service and is not affiliated with any cryptocurrency wallet, exchange, or software product. Wallet addresses entered for a scan are recorded to chart the field.`,
    scanTitle: `Wallet PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← PFLASH another address`,
    totalIn: `Total received`, totalOut: `Total sent out`, txs: `Transactions`, cps: `Counterparties (1st hop)`, window: `Recent activity`,
    systemTitle: `The System`, liveData: `● LIVE BLOCKCHAIN DATA`, systemSub: `This is the system around the address you pasted. It sits at the center; every wallet it dealt with orbits it, sized by volume. Drag to rotate, scroll to zoom, click any wallet for the numbers, click any transaction to light its path and follow it into the field. All of it free.`,
    controlsHint: `drag to rotate · scroll to zoom · click a wallet for details`,
    recentTx: `Recent transactions`, date: `Date`, dir: `Direction`, amt: `Amount`, cp: `Counterparty (first hop)`, txid: `TXID`,
    darkTitle: `The ledger keeps the receipts.`, darkText: `Every public ledger has been keeping the record the whole time: public, permanent, seconds away. Phantom Flash turns it into a field you can walk.`, darkCta: `See the field`,
    bagLegend: `💰 = share of the money’s traffic`, bagShare: `Share of traffic`,
    bagHonesty: `💰 bags = this wallet’s share of the observed first-hop volume with the scanned wallet — not the absolute balance of that address.`,
    noAddr: `No address provided.`, noAddrBody: `Go back and paste the Bitcoin or Ethereum address you want to PFLASH.`, invalid: `That does not look like a valid wallet address.`, busy: `Primary source busy — trying backup node…`, noTx: `No transactions found.`, noActivity: `No activity found on this address.`, unavail: `3D explorer unavailable in this browser — see the transaction table below for the same first-hop data.`, notRecognized: `That address is not recognized by the Bitcoin network.`, noReach: `Could not reach the blockchain data sources.`, pflashingLive: `PFLASHING THE CHAIN… pulling the live blockchain record`, pflashDonePrefix: `PFLASHED in seconds — `, pflashDoneSuffix: ` transactions found.`,
    howTitle: `How it works`, step01: `STEP 01`, step02: `STEP 02`, step03: `STEP 03`,
    step1Title: `Paste an address`, step2Title: `The system draws itself`, step3Title: `Follow any hop, as far as you like`,
    step1Body: `One address on BTC, ETH, or XRP. That’s all.`,
    step2Body: `The address is the sun. Every wallet it dealt with orbits it, sized by volume. Fly through it.`,
    step3Body: `Click a transaction to light its path, then follow it to the next wallet. Every hop is free, and every hop charts the field.`,
    recentTitle: `What the field keeps`,
    recentBody: `The Commons is the field’s record. It stores addresses, amounts and timestamps from public ledgers, and counts only as bands. No person, no email, no device is attached to any of it.`,
  };

  D.es = {
    metaIndex: `Este es el campo. Puedes seguir a tus agentes en el campo. Pega cualquier dirección de BTC, ETH o XRP y mira todas las billeteras que tocó, gratis y en segundos. Haz clic en una transacción, sigue el dinero salto a salto y deja el campo trazado para la próxima persona.`,
    metaScan: `Un escaneo en vivo de la cadena, dibujado como un sistema 3D interactivo en el campo: la dirección en el centro y cada billetera con la que operó orbitando a su alrededor. Gratis, en segundos.`,
    titleIndex: `Phantom Flash — Este es el campo. Síguelo.`,
    titleScan: `El campo — Phantom Flash`,
    navHow: `Cómo funciona`, navFree: `PFLASH gratis`, navHome: `Inicio`,
    eyebrow: `⚡ Owlchained — Libros públicos, dibujados como un campo`,
    hero: `Este es el <span class="glow">campo.</span>`,
    lede: `Puedes seguir a tus agentes en el campo. Pega una dirección. Mira todo lo que tocó. Sigue cualquier salto. <strong>Gratis.</strong>`,
    demoBadge: `● DEMO EN VIVO — una billetera ficticia y el campo a su alrededor. Ahora pega una dirección:`,
    sunDockLabel: `Deja caer cualquier dirección de billetera en el sol`,
    addrPlaceholder: `Pega una dirección — BTC (bc1q…, 1A1z…), ETH (0x…) o XRP (r…)`, pflashButton: `PFLASH IT ⚡`,
    hint1: `PFLASH instantáneo gratis · datos blockchain en vivo · sin cuenta · Bitcoin, Ethereum, XRP, USDT y USDC`,
    hint2: `PFLASH it. (La P es silenciosa. La verdad no.)`,
    trust1: `⚡ Datos blockchain en vivo — nada simulado`, trust2: `⚡ Billeteras reales. Transacciones reales. Respuestas reales.`, trust3: `⚡ Gratis para todos — sin cuenta, sin tarjeta`,
    howSub: `Tres pasos. Todos gratis.`,
    deskTitle: `La cadena nunca duerme.`, deskSub: `Phantom Flash tampoco.`,
    deskP1: `El mapa crece con cada visitante. Cada dirección que alguien pega traza unas billeteras más, y cada salto que alguien sigue dibuja el siguiente sistema. El campo que abres mañana tiene más que el que abriste hoy.`,
    deskP2: `El libro público es todo el registro. Cada transacción queda grabada en un libro que nadie puede editar ni borrar. Phantom Flash lo lee como lo hacen los analistas y lo dibuja para cualquiera, gratis.`,
    warningTitle: `Los agentes dejan rastro.`, warningText: `Un agente de IA que tiene una clave firma sus declaraciones en un libro público. Phantom Flash las lee de vuelta, así puedes seguir a tus agentes como sigues el dinero. Pega la dirección del agente o abre la <a href="agents.html">página de Agentes</a>.`,
    comicTitle: `“Síguelo por mí.”`, comicSub: `Alguien pega una dirección. Un sistema se dibuja a su alrededor. Un salto parece interesante, así que lo sigue, y el siguiente sistema se dibuja en su lugar. Esa es la llamada que Phantom Flash responde.`, comicCta: `Pega una dirección — PFLASH gratis ⚡`,
    bewareTitle: `Solo lectura.`, bewareText: `Phantom Flash lee libros públicos. Nunca pide una frase semilla ni una clave privada, y nunca toca una billetera.`,
    finalCta: `Pega una dirección. Mira el campo.`, finalSub: `Una dirección. Unos segundos. El libro público, dibujado como un campo.`,
    disclaimer: `Phantom Flash es un análisis de blockchain proporcionado solo con fines informativos. No es una garantía ni un compromiso de ningún tipo. Phantom Flash y sus operadores no son responsables por información de rastreo incorrecta, incompleta o desactualizada en ningún escaneo. Los resultados no están garantizados y no se promete ni se implica ningún resultado. Nada en este sitio constituye asesoría legal, financiera o de inversión. Los datos del escaneo se obtienen en vivo de fuentes públicas de blockchain y se presentan tal cual. Phantom Flash es un servicio independiente de análisis de blockchain y no está afiliado con ninguna billetera, exchange o producto de software de criptomonedas. Las direcciones ingresadas en un escaneo se registran para trazar el campo.`,
    scanTitle: `Billetera PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← PFLASH otra dirección`,
    totalIn: `Total recibido`, totalOut: `Total enviado`, txs: `Transacciones`, cps: `Contrapartes (1er salto)`, window: `Actividad reciente`,
    systemTitle: `El sistema`, liveData: `● DATOS EN VIVO`, systemSub: `Este es el sistema alrededor de la dirección que pegaste. Está en el centro; cada billetera con la que operó orbita a su alrededor, con tamaño según el volumen. Arrastra para rotar, usa la rueda para acercar, haz clic en cualquier billetera para ver los números y en cualquier transacción para iluminar su camino y seguirlo hacia el campo. Todo gratis.`,
    controlsHint: `arrastra para rotar · rueda para acercar · clic en una billetera para ver detalles`,
    recentTx: `Transacciones recientes`, date: `Fecha`, dir: `Dirección`, amt: `Cantidad`, cp: `Contraparte (primer salto)`, txid: `TXID`,
    darkTitle: `El libro guarda los recibos.`, darkText: `Todo libro público ha llevado el registro todo el tiempo: público, permanente, a segundos de distancia. Phantom Flash lo convierte en un campo que puedes recorrer.`, darkCta: `Ver el campo`,
    bagLegend: `💰 = parte del tráfico del dinero`, bagShare: `Parte del tráfico`,
    bagHonesty: `💰 bolsas = la parte de esta billetera en el volumen de primer salto observado con la billetera escaneada — no el saldo absoluto de esa dirección.`,
    noAddr: `No se proporcionó dirección.`, noAddrBody: `Regresa y pega la dirección Bitcoin o Ethereum que quieres PFLASH.`, invalid: `Eso no parece una dirección de billetera válida.`, busy: `La fuente principal está ocupada — probando nodo de respaldo…`, noTx: `No se encontraron transacciones.`, noActivity: `No se encontró actividad en esta dirección.`, unavail: `El explorador 3D no está disponible en este navegador — consulta la tabla de transacciones de abajo para ver los mismos datos del primer salto.`, notRecognized: `La red Bitcoin no reconoce esa dirección.`, noReach: `No se pudo acceder a las fuentes de datos blockchain.`, pflashingLive: `PFLASHING THE CHAIN… leyendo el registro blockchain en vivo`, pflashDonePrefix: `PFLASHED en segundos — `, pflashDoneSuffix: ` transacciones encontradas.`,
    howTitle: `Cómo funciona`, step01: `PASO 01`, step02: `PASO 02`, step03: `PASO 03`,
    step1Title: `Pega una dirección`, step2Title: `El sistema se dibuja solo`, step3Title: `Sigue cualquier salto, tan lejos como quieras`,
    step1Body: `Una dirección de BTC, ETH o XRP. Eso es todo.`,
    step2Body: `La dirección es el sol. Cada billetera con la que operó orbita a su alrededor, con tamaño según el volumen. Vuela por él.`,
    step3Body: `Haz clic en una transacción para iluminar su camino y síguela hasta la siguiente billetera. Cada salto es gratis y cada salto traza el campo.`,
    recentTitle: `Lo que guarda el campo`,
    recentBody: `El Commons es el registro del campo. Guarda direcciones, montos y marcas de tiempo de libros públicos, y los conteos solo en rangos. Nada de eso lleva asociada una persona, un correo ni un dispositivo.`,
  };

  D.zh = {
    metaIndex: `这就是场域。你可以在场域中追踪你的智能体。粘贴任意 BTC、ETH 或 XRP 地址，几秒钟内免费看到它接触过的每个钱包。点击一笔交易，逐跳追踪资金，并为下一个人留下已绘制好的场域。`,
    metaScan: `实时链上扫描，在场域中呈现为可交互的 3D 星系：地址位于中心，与它有过往来的每个钱包环绕其周围。免费，几秒钟完成。`,
    titleIndex: `Phantom Flash — 这就是场域。去追踪它。`,
    titleScan: `场域 — Phantom Flash`,
    navHow: `如何运作`, navFree: `免费 PFLASH`, navHome: `首页`,
    eyebrow: `⚡ Owlchained — 把公共账本画成一片场域`,
    hero: `这就是<span class="glow">场域。</span>`,
    lede: `你可以在场域中追踪你的智能体。粘贴一个地址。看到它接触过的一切。跟随任何一跳。<strong>免费。</strong>`,
    demoBadge: `● 实时演示 — 一个虚构的钱包及其周围的场域。现在粘贴一个地址：`,
    sunDockLabel: `把任意钱包地址投入太阳`,
    addrPlaceholder: `粘贴地址 — BTC（bc1q…、1A1z…）、ETH（0x…）或 XRP（r…）`, pflashButton: `PFLASH IT ⚡`,
    hint1: `免费即时 PFLASH · 实时区块链数据 · 无需账号 · Bitcoin、Ethereum、XRP、USDT 和 USDC`,
    hint2: `PFLASH it.（P 不发音。真相不会沉默。）`,
    trust1: `⚡ 实时区块链数据 — 非模拟`, trust2: `⚡ 真实钱包。真实交易。真实答案。`, trust3: `⚡ 人人免费 — 无需账号，无需银行卡`,
    howSub: `三步。全部免费。`,
    deskTitle: `链从不睡觉。`, deskSub: `Phantom Flash 也不睡。`,
    deskP1: `地图随每位访客一起成长。每个被粘贴的地址都会多绘出几个钱包，每个被追踪的跳转都会画出下一个星系。你明天打开的场域，比今天的更丰富。`,
    deskP2: `公共账本就是完整的记录。每一笔交易都刻在一本无人能修改、无人能删除的账本里。Phantom Flash 像分析师一样读取它，并免费把它画给所有人看。`,
    warningTitle: `智能体会留下痕迹。`, warningText: `持有密钥的 AI 智能体会把自己的声明签到公共账本上。Phantom Flash 把它们读回来，让你像追踪资金一样追踪你的智能体。粘贴智能体的地址，或打开<a href="agents.html">智能体页面</a>。`,
    comicTitle: `“替我追踪它。”`, comicSub: `有人粘贴了一个地址。一个星系在它周围自行绘出。有一跳看起来很有意思，于是他们跟了过去，下一个星系就在原地画了出来。这就是 Phantom Flash 接起的那通电话。`, comicCta: `粘贴一个地址 — 免费 PFLASH ⚡`,
    bewareTitle: `只读。`, bewareText: `Phantom Flash 只读取公共账本。它从不索要助记词或私钥，也从不触碰任何钱包。`,
    finalCta: `粘贴一个地址。看见场域。`, finalSub: `一个地址。几秒钟。把公共账本画成一片场域。`,
    disclaimer: `Phantom Flash 仅作为信息用途的区块链分析。它不是任何形式的保证或承诺。对于任何扫描中的错误、不完整或过时的追踪信息，Phantom Flash 及其运营方不承担责任。结果不作保证，也不承诺或暗示任何结果。本网站内容不构成法律、财务或投资建议。扫描数据来自公开区块链来源并按原样呈现。Phantom Flash 是独立的区块链分析服务，与任何加密货币钱包、交易所或软件产品无关联。为扫描输入的钱包地址会被记录，用于绘制场域。`,
    scanTitle: `钱包已 PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← PFLASH 另一个地址`,
    totalIn: `收到总额`, totalOut: `转出总额`, txs: `交易`, cps: `对手方（第一跳）`, window: `近期活动`,
    systemTitle: `系统`, liveData: `● 实时链上数据`, systemSub: `这是你所粘贴地址周围的星系。它位于中心；与它有过往来的每个钱包都环绕着它，大小按交易量而定。拖动旋转，滚轮缩放，点击任意钱包查看数字，点击任意交易点亮它的路径并跟随它进入场域。全部免费。`,
    controlsHint: `拖动旋转 · 滚轮缩放 · 点击钱包查看详情`,
    recentTx: `最近交易`, date: `日期`, dir: `方向`, amt: `金额`, cp: `对手方（第一跳）`, txid: `TXID`,
    darkTitle: `账本保存着收据。`, darkText: `每一本公共账本一直都在记录：公开、永久，只需几秒。Phantom Flash 把它变成一片你可以漫步其中的场域。`, darkCta: `查看场域`,
    bagLegend: `💰 = 资金流量占比`, bagShare: `流量占比`,
    bagHonesty: `💰 钱袋 = 该钱包在与所扫描钱包的第一跳可观察交易量中的占比，而不是该地址的绝对余额。`,
    noAddr: `未提供地址。`, noAddrBody: `请返回并粘贴你想 PFLASH 的 Bitcoin 或 Ethereum 地址。`, invalid: `这看起来不是有效的钱包地址。`, busy: `主数据源繁忙 — 正在尝试备用节点…`, noTx: `未找到交易。`, noActivity: `此地址上未发现任何活动。`, unavail: `此浏览器无法使用 3D 浏览器 — 请查看下方的交易表以获得相同的第一跳数据。`, notRecognized: `Bitcoin 网络无法识别该地址。`, noReach: `无法连接到区块链数据源。`, pflashingLive: `PFLASHING THE CHAIN… 正在读取实时区块链记录`, pflashDonePrefix: `数秒内完成 PFLASHED — `, pflashDoneSuffix: ` 笔交易已找到。`,
    howTitle: `如何运作`, step01: `第一步`, step02: `第二步`, step03: `第三步`,
    step1Title: `粘贴一个地址`, step2Title: `星系自行绘出`, step3Title: `跟随任何一跳，想走多远都行`,
    step1Body: `一个 BTC、ETH 或 XRP 地址。仅此而已。`,
    step2Body: `这个地址就是太阳。与它有过往来的每个钱包都环绕着它，大小按交易量而定。尽情穿行。`,
    step3Body: `点击一笔交易点亮它的路径，然后跟随它到下一个钱包。每一跳都免费，每一跳都在绘制场域。`,
    recentTitle: `场域保存什么`,
    recentBody: `Commons 是场域的记录。它保存来自公共账本的地址、金额和时间戳，计数只以区间形式呈现。其中任何内容都不会关联到某个人、某个邮箱或某台设备。`,
  };

  D.vi = {
    metaIndex: `Đây là cánh đồng. Bạn có thể theo dõi các tác nhân của mình trong cánh đồng. Dán bất kỳ địa chỉ BTC, ETH hoặc XRP nào và xem mọi ví mà nó đã chạm tới, miễn phí, trong vài giây. Nhấp vào một giao dịch, theo dõi dòng tiền từng bước, và để lại cánh đồng đã được vẽ cho người tiếp theo.`,
    metaScan: `Một lần quét trực tiếp trên chuỗi, được vẽ thành hệ 3D tương tác trong cánh đồng: địa chỉ ở trung tâm, mọi ví từng giao dịch với nó quay quanh. Miễn phí, trong vài giây.`,
    titleIndex: `Phantom Flash — Đây là cánh đồng. Hãy theo dõi nó.`,
    titleScan: `Cánh đồng — Phantom Flash`,
    navHow: `Cách hoạt động`, navFree: `PFLASH miễn phí`, navHome: `Trang chủ`,
    eyebrow: `⚡ Owlchained — Sổ cái công khai, được vẽ thành một cánh đồng`,
    hero: `Đây là <span class="glow">cánh đồng.</span>`,
    lede: `Bạn có thể theo dõi các tác nhân của mình trong cánh đồng. Dán một địa chỉ. Xem mọi thứ nó đã chạm tới. Theo dõi bất kỳ bước nào. <strong>Miễn phí.</strong>`,
    demoBadge: `● DEMO TRỰC TIẾP — một ví hư cấu và cánh đồng quanh nó. Giờ hãy dán một địa chỉ:`,
    sunDockLabel: `Thả bất kỳ địa chỉ ví nào vào mặt trời`,
    addrPlaceholder: `Dán một địa chỉ — BTC (bc1q…, 1A1z…), ETH (0x…) hoặc XRP (r…)`, pflashButton: `PFLASH IT ⚡`,
    hint1: `PFLASH miễn phí tức thì · dữ liệu blockchain trực tiếp · không cần tài khoản · Bitcoin, Ethereum, XRP, USDT & USDC`,
    hint2: `PFLASH it. (Chữ P im lặng. Sự thật thì không.)`,
    trust1: `⚡ Dữ liệu blockchain trực tiếp — không mô phỏng`, trust2: `⚡ Ví thật. Giao dịch thật. Câu trả lời thật.`, trust3: `⚡ Miễn phí cho tất cả — không tài khoản, không thẻ`,
    howSub: `Ba bước. Tất cả đều miễn phí.`,
    deskTitle: `Chuỗi không bao giờ ngủ.`, deskSub: `Phantom Flash cũng vậy.`,
    deskP1: `Bản đồ lớn lên theo từng người truy cập. Mỗi địa chỉ được dán sẽ vẽ thêm vài ví, và mỗi bước được theo dõi sẽ vẽ hệ tiếp theo. Cánh đồng bạn mở ngày mai có nhiều hơn cánh đồng bạn mở hôm nay.`,
    deskP2: `Sổ cái công khai là toàn bộ hồ sơ. Mọi giao dịch đều được khắc vào một sổ cái mà không ai sửa được và không ai xóa được. Phantom Flash đọc nó như các nhà phân tích vẫn đọc và vẽ nó cho bất kỳ ai, miễn phí.`,
    warningTitle: `Các tác nhân để lại dấu vết.`, warningText: `Một tác nhân AI nắm giữ khóa sẽ ký các tuyên bố của nó lên sổ cái công khai. Phantom Flash đọc lại chúng, để bạn theo dõi các tác nhân của mình như theo dõi dòng tiền. Dán địa chỉ của tác nhân, hoặc mở <a href="agents.html">trang Tác nhân</a>.`,
    comicTitle: `“Hãy theo dõi nó giúp tôi.”`, comicSub: `Một người dán một địa chỉ. Một hệ tự vẽ ra quanh nó. Một bước trông thú vị, nên họ theo dõi nó, và hệ tiếp theo tự vẽ ngay tại chỗ. Đó là cuộc gọi mà Phantom Flash nghe máy.`, comicCta: `Dán một địa chỉ — PFLASH miễn phí ⚡`,
    bewareTitle: `Chỉ đọc.`, bewareText: `Phantom Flash đọc các sổ cái công khai. Nó không bao giờ hỏi seed phrase hay khóa riêng, và không bao giờ chạm vào ví.`,
    finalCta: `Dán một địa chỉ. Xem cánh đồng.`, finalSub: `Một địa chỉ. Vài giây. Sổ cái công khai, được vẽ thành một cánh đồng.`,
    disclaimer: `Phantom Flash là phân tích blockchain chỉ nhằm mục đích thông tin. Đây không phải là bảo đảm hay cam kết dưới bất kỳ hình thức nào. Phantom Flash và bên vận hành không chịu trách nhiệm về thông tin truy vết sai, thiếu hoặc lỗi thời trong bất kỳ bản quét nào. Kết quả không được bảo đảm và không có kết quả nào được hứa hẹn hay ngụ ý. Nội dung trang này không phải tư vấn pháp lý, tài chính hoặc đầu tư. Dữ liệu quét được lấy trực tiếp từ nguồn blockchain công khai và được trình bày nguyên trạng. Phantom Flash là dịch vụ phân tích blockchain độc lập, không liên kết với ví, sàn giao dịch hoặc phần mềm tiền mã hóa nào. Các địa chỉ được nhập để quét sẽ được ghi lại để vẽ cánh đồng.`,
    scanTitle: `Ví đã PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← PFLASH địa chỉ khác`,
    totalIn: `Tổng nhận`, totalOut: `Tổng gửi ra`, txs: `Giao dịch`, cps: `Đối tác (bước 1)`, window: `Hoạt động gần đây`,
    systemTitle: `Hệ thống`, liveData: `● DỮ LIỆU BLOCKCHAIN TRỰC TIẾP`, systemSub: `Đây là hệ quanh địa chỉ bạn đã dán. Nó nằm ở trung tâm; mọi ví từng giao dịch với nó quay quanh, kích thước theo khối lượng. Kéo để xoay, cuộn để phóng to, nhấp vào bất kỳ ví nào để xem số liệu, nhấp vào bất kỳ giao dịch nào để làm sáng đường đi của nó và theo dõi nó vào cánh đồng. Tất cả đều miễn phí.`,
    controlsHint: `kéo để xoay · cuộn để phóng to · nhấp vào ví để xem chi tiết`,
    recentTx: `Giao dịch gần đây`, date: `Ngày`, dir: `Chiều`, amt: `Số lượng`, cp: `Đối tác (bước đầu)`, txid: `TXID`,
    darkTitle: `Sổ cái giữ mọi biên lai.`, darkText: `Mọi sổ cái công khai vẫn luôn giữ hồ sơ suốt thời gian qua: công khai, vĩnh viễn, chỉ cách vài giây. Phantom Flash biến nó thành một cánh đồng mà bạn có thể đi dạo.`, darkCta: `Xem cánh đồng`,
    bagLegend: `💰 = phần lưu lượng của dòng tiền`, bagShare: `Phần lưu lượng`,
    bagHonesty: `💰 túi tiền = phần của ví này trong khối lượng bước đầu tiên quan sát được với ví đã quét — không phải số dư tuyệt đối của địa chỉ đó.`,
    noAddr: `Chưa có địa chỉ.`, noAddrBody: `Hãy quay lại và dán địa chỉ Bitcoin hoặc Ethereum bạn muốn PFLASH.`, invalid: `Đây không giống một địa chỉ ví hợp lệ.`, busy: `Nguồn chính đang bận — đang thử nút dự phòng…`, noTx: `Không tìm thấy giao dịch.`, noActivity: `Không tìm thấy hoạt động nào trên địa chỉ này.`, unavail: `Trình khám phá 3D không khả dụng trên trình duyệt này — xem bảng giao dịch bên dưới để có cùng dữ liệu bước đầu tiên.`, notRecognized: `Mạng Bitcoin không nhận ra địa chỉ này.`, noReach: `Không thể kết nối tới các nguồn dữ liệu blockchain.`, pflashingLive: `PFLASHING THE CHAIN… đang đọc dữ liệu blockchain trực tiếp`, pflashDonePrefix: `PFLASHED trong vài giây — `, pflashDoneSuffix: ` giao dịch được tìm thấy.`,
    howTitle: `Cách hoạt động`, step01: `BƯỚC 01`, step02: `BƯỚC 02`, step03: `BƯỚC 03`,
    step1Title: `Dán một địa chỉ`, step2Title: `Hệ tự vẽ ra`, step3Title: `Theo dõi bất kỳ bước nào, xa tùy ý`,
    step1Body: `Một địa chỉ BTC, ETH hoặc XRP. Chỉ vậy thôi.`,
    step2Body: `Địa chỉ là mặt trời. Mọi ví từng giao dịch với nó quay quanh, kích thước theo khối lượng. Hãy bay xuyên qua.`,
    step3Body: `Nhấp vào một giao dịch để làm sáng đường đi của nó, rồi theo nó tới ví tiếp theo. Mỗi bước đều miễn phí, và mỗi bước đều vẽ thêm cánh đồng.`,
    recentTitle: `Cánh đồng lưu giữ gì`,
    recentBody: `Commons là sổ ghi của cánh đồng. Nó lưu địa chỉ, số tiền và dấu thời gian từ các sổ cái công khai, và chỉ lưu số đếm theo từng khoảng. Không có người, email hay thiết bị nào được gắn với bất kỳ thứ gì trong đó.`,
  };

  D.pt = {
    metaIndex: `Este é o campo. Você pode seguir seus agentes no campo. Cole qualquer endereço de BTC, ETH ou XRP e veja todas as carteiras que ele tocou, grátis, em segundos. Clique em uma transação, siga o dinheiro salto a salto e deixe o campo traçado para a próxima pessoa.`,
    metaScan: `Uma varredura ao vivo da blockchain, desenhada como um sistema 3D interativo no campo: o endereço no centro e cada carteira com a qual ele operou em órbita ao redor. Grátis, em segundos.`,
    titleIndex: `Phantom Flash — Este é o campo. Siga-o.`,
    titleScan: `O campo — Phantom Flash`,
    navHow: `Como funciona`, navFree: `PFLASH grátis`, navHome: `Início`,
    eyebrow: `⚡ Owlchained — Livros-razão públicos, desenhados como um campo`,
    hero: `Este é o <span class="glow">campo.</span>`,
    lede: `Você pode seguir seus agentes no campo. Cole um endereço. Veja tudo em que ele tocou. Siga qualquer salto. <strong>Grátis.</strong>`,
    demoBadge: `● DEMO AO VIVO — uma carteira fictícia e o campo ao redor dela. Agora cole um endereço:`,
    sunDockLabel: `Solte qualquer endereço de carteira no sol`,
    addrPlaceholder: `Cole um endereço — BTC (bc1q…, 1A1z…), ETH (0x…) ou XRP (r…)`, pflashButton: `PFLASH IT ⚡`,
    hint1: `PFLASH instantâneo grátis · dados blockchain ao vivo · sem conta · Bitcoin, Ethereum, XRP, USDT e USDC`,
    hint2: `PFLASH it. (O P é silencioso. A verdade não.)`,
    trust1: `⚡ Dados blockchain ao vivo — nada simulado`, trust2: `⚡ Carteiras reais. Transações reais. Respostas reais.`, trust3: `⚡ Grátis para todos — sem conta, sem cartão`,
    howSub: `Três passos. Todos grátis.`,
    deskTitle: `A cadeia nunca dorme.`, deskSub: `O Phantom Flash também não.`,
    deskP1: `O mapa cresce a cada visitante. Cada endereço que alguém cola traça mais algumas carteiras, e cada salto que alguém segue desenha o próximo sistema. O campo que você abre amanhã tem mais coisas do que o de hoje.`,
    deskP2: `O livro-razão público é o registro inteiro. Cada transação fica gravada em um livro que ninguém pode editar nem apagar. O Phantom Flash o lê como os analistas leem e o desenha para qualquer pessoa, de graça.`,
    warningTitle: `Agentes deixam rastro.`, warningText: `Um agente de IA que possui uma chave assina suas declarações em um livro-razão público. O Phantom Flash as lê de volta, para que você siga seus agentes como segue o dinheiro. Cole o endereço do agente ou abra a <a href="agents.html">página de Agentes</a>.`,
    comicTitle: `“Siga isso por mim.”`, comicSub: `Alguém cola um endereço. Um sistema se desenha ao redor dele. Um salto parece interessante, então a pessoa o segue, e o próximo sistema se desenha no lugar. É a chamada que o Phantom Flash atende.`, comicCta: `Cole um endereço — PFLASH grátis ⚡`,
    bewareTitle: `Somente leitura.`, bewareText: `O Phantom Flash lê livros-razão públicos. Nunca pede uma frase-semente nem uma chave privada, e nunca toca em uma carteira.`,
    finalCta: `Cole um endereço. Veja o campo.`, finalSub: `Um endereço. Alguns segundos. O livro-razão público, desenhado como um campo.`,
    disclaimer: `O Phantom Flash é uma análise de blockchain fornecida apenas para fins informativos. Não é garantia nem compromisso de qualquer tipo. Phantom Flash e seus operadores não são responsáveis por informações de rastreamento incorretas, incompletas ou desatualizadas em qualquer escaneamento. Os resultados não são garantidos e nenhum resultado é prometido ou implícito. Nada neste site é aconselhamento jurídico, financeiro ou de investimento. Os dados do escaneamento vêm de fontes públicas de blockchain e são apresentados como estão. Phantom Flash é um serviço independente de análise de blockchain e não é afiliado a nenhuma carteira, exchange ou software de criptomoedas. Os endereços informados em um escaneamento são registrados para traçar o campo.`,
    scanTitle: `Carteira PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← PFLASH outro endereço`,
    totalIn: `Total recebido`, totalOut: `Total enviado`, txs: `Transações`, cps: `Contrapartes (1º salto)`, window: `Atividade recente`,
    systemTitle: `O sistema`, liveData: `● DADOS BLOCKCHAIN AO VIVO`, systemSub: `Este é o sistema ao redor do endereço que você colou. Ele fica no centro; cada carteira com a qual ele operou orbita ao redor, com tamanho conforme o volume. Arraste para girar, use a rolagem para aproximar, clique em qualquer carteira para ver os números e em qualquer transação para iluminar seu caminho e segui-lo até o campo. Tudo grátis.`,
    controlsHint: `arraste para girar · role para aproximar · clique em uma carteira para ver detalhes`,
    recentTx: `Transações recentes`, date: `Data`, dir: `Direção`, amt: `Valor`, cp: `Contraparte (primeiro salto)`, txid: `TXID`,
    darkTitle: `O livro-razão guarda os recibos.`, darkText: `Todo livro-razão público tem mantido o registro o tempo todo: público, permanente, a segundos de distância. O Phantom Flash o transforma em um campo que você pode percorrer.`, darkCta: `Ver o campo`,
    bagLegend: `💰 = parte do tráfego do dinheiro`, bagShare: `Parte do tráfego`,
    bagHonesty: `💰 sacos = a parte desta carteira no volume de primeiro salto observado com a carteira escaneada — não o saldo absoluto desse endereço.`,
    noAddr: `Nenhum endereço informado.`, noAddrBody: `Volte e cole o endereço Bitcoin ou Ethereum que você quer PFLASH.`, invalid: `Isso não parece um endereço de carteira válido.`, busy: `Fonte principal ocupada — tentando nó de backup…`, noTx: `Nenhuma transação encontrada.`, noActivity: `Nenhuma atividade encontrada neste endereço.`, unavail: `O explorador 3D não está disponível neste navegador — veja a tabela de transações abaixo para os mesmos dados do primeiro salto.`, notRecognized: `Esse endereço não é reconhecido pela rede Bitcoin.`, noReach: `Não foi possível acessar as fontes de dados blockchain.`, pflashingLive: `PFLASHING THE CHAIN… lendo o registro blockchain ao vivo`, pflashDonePrefix: `PFLASHED em segundos — `, pflashDoneSuffix: ` transações encontradas.`,
    howTitle: `Como funciona`, step01: `PASSO 01`, step02: `PASSO 02`, step03: `PASSO 03`,
    step1Title: `Cole um endereço`, step2Title: `O sistema se desenha sozinho`, step3Title: `Siga qualquer salto, até onde quiser`,
    step1Body: `Um endereço de BTC, ETH ou XRP. Só isso.`,
    step2Body: `O endereço é o sol. Cada carteira com a qual ele operou orbita ao redor, com tamanho conforme o volume. Voe por ele.`,
    step3Body: `Clique em uma transação para iluminar seu caminho e siga-a até a próxima carteira. Cada salto é grátis e cada salto traça o campo.`,
    recentTitle: `O que o campo guarda`,
    recentBody: `O Commons é o registro do campo. Guarda endereços, valores e carimbos de data e hora de livros-razão públicos, e as contagens apenas em faixas. Nenhuma pessoa, e-mail ou dispositivo fica associado a nada disso.`,
  };

  D.fr = {
    metaIndex: `Voici le champ. Vous pouvez suivre vos agents dans le champ. Collez n’importe quelle adresse BTC, ETH ou XRP et voyez chaque portefeuille qu’elle a touché, gratuitement, en quelques secondes. Cliquez sur une transaction, suivez l’argent saut après saut et laissez le champ tracé pour la personne suivante.`,
    metaScan: `Un scan en direct de la blockchain, dessiné comme un système 3D interactif dans le champ : l’adresse au centre, chaque portefeuille avec lequel elle a échangé en orbite autour d’elle. Gratuit, en quelques secondes.`,
    titleIndex: `Phantom Flash — Voici le champ. Suivez-le.`,
    titleScan: `Le champ — Phantom Flash`,
    navHow: `Fonctionnement`, navFree: `PFLASH gratuit`, navHome: `Accueil`,
    eyebrow: `⚡ Owlchained — Les registres publics, dessinés comme un champ`,
    hero: `Voici le <span class="glow">champ.</span>`,
    lede: `Vous pouvez suivre vos agents dans le champ. Collez une adresse. Voyez tout ce qu’elle a touché. Suivez n’importe quel saut. <strong>Gratuit.</strong>`,
    demoBadge: `● DÉMO EN DIRECT — un portefeuille fictif et le champ autour de lui. Collez maintenant une adresse :`,
    sunDockLabel: `Déposez n’importe quelle adresse de portefeuille dans le soleil`,
    addrPlaceholder: `Collez une adresse — BTC (bc1q…, 1A1z…), ETH (0x…) ou XRP (r…)`, pflashButton: `PFLASH IT ⚡`,
    hint1: `PFLASH instantané gratuit · données blockchain en direct · sans compte · Bitcoin, Ethereum, XRP, USDT et USDC`,
    hint2: `PFLASH it. (Le P est silencieux. La vérité ne l’est pas.)`,
    trust1: `⚡ Données blockchain en direct — rien de simulé`, trust2: `⚡ De vrais portefeuilles. De vraies transactions. De vraies réponses.`, trust3: `⚡ Gratuit pour tout le monde — sans compte, sans carte`,
    howSub: `Trois étapes. Toutes gratuites.`,
    deskTitle: `La chaîne ne dort jamais.`, deskSub: `Phantom Flash non plus.`,
    deskP1: `La carte grandit à chaque visiteur. Chaque adresse collée trace quelques portefeuilles de plus, et chaque saut suivi dessine le système suivant. Le champ que vous ouvrez demain contient plus que celui d’aujourd’hui.`,
    deskP2: `Le registre public est tout le dossier. Chaque transaction est gravée dans un registre que personne ne peut modifier ni effacer. Phantom Flash le lit comme le font les analystes et le dessine pour tout le monde, gratuitement.`,
    warningTitle: `Les agents laissent une trace.`, warningText: `Un agent d’IA qui détient une clé signe ses déclarations sur un registre public. Phantom Flash les relit, pour que vous suiviez vos agents comme vous suivez l’argent. Collez l’adresse de l’agent ou ouvrez la <a href="agents.html">page Agents</a>.`,
    comicTitle: `« Suis-le pour moi. »`, comicSub: `Quelqu’un colle une adresse. Un système se dessine autour. Un saut semble intéressant, alors la personne le suit, et le système suivant se dessine sur place. C’est l’appel auquel Phantom Flash répond.`, comicCta: `Collez une adresse — PFLASH gratuit ⚡`,
    bewareTitle: `Lecture seule.`, bewareText: `Phantom Flash lit les registres publics. Il ne demande jamais de phrase secrète ni de clé privée, et ne touche jamais à un portefeuille.`,
    finalCta: `Collez une adresse. Voyez le champ.`, finalSub: `Une adresse. Quelques secondes. Le registre public, dessiné comme un champ.`,
    disclaimer: `Phantom Flash est une analyse blockchain fournie uniquement à titre informatif. Elle ne constitue ni garantie ni engagement d’aucune sorte. Phantom Flash et ses opérateurs ne sont pas responsables des informations de traçage incorrectes, incomplètes ou obsolètes dans tout scan. Les résultats ne sont pas garantis et aucun résultat n’est promis ni sous-entendu. Rien sur ce site ne constitue un conseil juridique, financier ou d’investissement. Les données du scan proviennent en direct de sources blockchain publiques et sont présentées telles quelles. Phantom Flash est un service indépendant d’analyse blockchain et n’est affilié à aucun portefeuille, échange ou logiciel crypto. Les adresses saisies pour un scan sont enregistrées afin de tracer le champ.`,
    scanTitle: `Portefeuille PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← PFLASH une autre adresse`,
    totalIn: `Total reçu`, totalOut: `Total envoyé`, txs: `Transactions`, cps: `Contreparties (1er saut)`, window: `Activité récente`,
    systemTitle: `Le système`, liveData: `● DONNÉES BLOCKCHAIN EN DIRECT`, systemSub: `Voici le système autour de l’adresse que vous avez collée. Elle se trouve au centre ; chaque portefeuille avec lequel elle a échangé gravite autour, dimensionné selon le volume. Faites glisser pour pivoter, utilisez la molette pour zoomer, cliquez sur un portefeuille pour voir les chiffres, cliquez sur une transaction pour illuminer son chemin et le suivre dans le champ. Le tout gratuit.`,
    controlsHint: `faites glisser pour pivoter · molette pour zoomer · cliquez sur un portefeuille pour les détails`,
    recentTx: `Transactions récentes`, date: `Date`, dir: `Sens`, amt: `Montant`, cp: `Contrepartie (premier saut)`, txid: `TXID`,
    darkTitle: `Le registre garde les reçus.`, darkText: `Chaque registre public tient le dossier depuis le début : public, permanent, à quelques secondes. Phantom Flash en fait un champ que vous pouvez parcourir.`, darkCta: `Voir le champ`,
    bagLegend: `💰 = part du trafic de l’argent`, bagShare: `Part du trafic`,
    bagHonesty: `💰 sacs = la part de ce portefeuille dans le volume de premier saut observé avec le portefeuille scanné — pas le solde absolu de cette adresse.`,
    noAddr: `Aucune adresse fournie.`, noAddrBody: `Revenez en arrière et collez l’adresse Bitcoin ou Ethereum que vous voulez PFLASH.`, invalid: `Cela ne ressemble pas à une adresse de portefeuille valide.`, busy: `Source principale occupée — essai du nœud de secours…`, noTx: `Aucune transaction trouvée.`, noActivity: `Aucune activité trouvée sur cette adresse.`, unavail: `L’explorateur 3D n’est pas disponible dans ce navigateur — voyez le tableau des transactions ci-dessous pour les mêmes données du premier saut.`, notRecognized: `Cette adresse n’est pas reconnue par le réseau Bitcoin.`, noReach: `Impossible d’atteindre les sources de données blockchain.`, pflashingLive: `PFLASHING THE CHAIN… lecture du registre blockchain en direct`, pflashDonePrefix: `PFLASHED en quelques secondes — `, pflashDoneSuffix: ` transactions trouvées.`,
    howTitle: `Fonctionnement`, step01: `ÉTAPE 01`, step02: `ÉTAPE 02`, step03: `ÉTAPE 03`,
    step1Title: `Collez une adresse`, step2Title: `Le système se dessine tout seul`, step3Title: `Suivez n’importe quel saut, aussi loin que vous voulez`,
    step1Body: `Une adresse BTC, ETH ou XRP. C’est tout.`,
    step2Body: `L’adresse est le soleil. Chaque portefeuille avec lequel elle a échangé gravite autour, dimensionné selon le volume. Volez à travers.`,
    step3Body: `Cliquez sur une transaction pour illuminer son chemin, puis suivez-la jusqu’au portefeuille suivant. Chaque saut est gratuit, et chaque saut trace le champ.`,
    recentTitle: `Ce que garde le champ`,
    recentBody: `Le Commons est le registre du champ. Il conserve des adresses, des montants et des horodatages issus de registres publics, et des comptages uniquement par tranches. Aucune personne, aucun e-mail, aucun appareil n’y est rattaché.`,
  };

  D.de = {
    metaIndex: `Das ist das Feld. Sie können Ihren Agenten im Feld folgen. Fügen Sie eine beliebige Adresse auf BTC, ETH oder XRP ein und sehen Sie jede Wallet, die sie berührt hat – kostenlos, in Sekunden. Klicken Sie auf eine Transaktion, folgen Sie dem Geld Sprung für Sprung und hinterlassen Sie das Feld für die nächste Person gezeichnet.`,
    metaScan: `Ein Live-Scan der Blockchain, dargestellt als interaktives 3D-System im Feld: die Adresse in der Mitte, jede Wallet, mit der sie gehandelt hat, auf einer Umlaufbahn darum. Kostenlos, in Sekunden.`,
    titleIndex: `Phantom Flash — Das ist das Feld. Folgen Sie ihm.`,
    titleScan: `Das Feld — Phantom Flash`,
    navHow: `So funktioniert es`, navFree: `Kostenloser PFLASH`, navHome: `Start`,
    eyebrow: `⚡ Owlchained — Öffentliche Ledger, gezeichnet als Feld`,
    hero: `Das ist das <span class="glow">Feld.</span>`,
    lede: `Sie können Ihren Agenten im Feld folgen. Fügen Sie eine Adresse ein. Sehen Sie alles, was sie berührt hat. Folgen Sie jedem Sprung. <strong>Kostenlos.</strong>`,
    demoBadge: `● LIVE-DEMO — eine fiktive Wallet und das Feld um sie herum. Fügen Sie jetzt eine Adresse ein:`,
    sunDockLabel: `Werfen Sie eine beliebige Wallet-Adresse in die Sonne`,
    addrPlaceholder: `Adresse einfügen — BTC (bc1q…, 1A1z…), ETH (0x…) oder XRP (r…)`, pflashButton: `PFLASH IT ⚡`,
    hint1: `Kostenloser Sofort-PFLASH · Live-Blockchain-Daten · kein Konto · Bitcoin, Ethereum, XRP, USDT & USDC`,
    hint2: `PFLASH it. (Das P ist stumm. Die Wahrheit nicht.)`,
    trust1: `⚡ Live-Blockchain-Daten — nichts simuliert`, trust2: `⚡ Echte Wallets. Echte Transaktionen. Echte Antworten.`, trust3: `⚡ Kostenlos für alle — kein Konto, keine Karte`,
    howSub: `Drei Schritte. Alle kostenlos.`,
    deskTitle: `Die Chain schläft nie.`, deskSub: `Phantom Flash auch nicht.`,
    deskP1: `Die Karte wächst mit jedem Besucher. Jede eingefügte Adresse zeichnet ein paar Wallets mehr, und jeder verfolgte Sprung zeichnet das nächste System. Das Feld, das Sie morgen öffnen, enthält mehr als das von heute.`,
    deskP2: `Das öffentliche Ledger ist die ganze Aufzeichnung. Jede Transaktion ist in ein Ledger eingraviert, das niemand ändern und niemand löschen kann. Phantom Flash liest es, wie Analysten es lesen, und zeichnet es für alle, kostenlos.`,
    warningTitle: `Agenten hinterlassen eine Spur.`, warningText: `Ein KI-Agent, der einen Schlüssel besitzt, signiert seine Erklärungen auf einem öffentlichen Ledger. Phantom Flash liest sie zurück, damit Sie Ihren Agenten folgen können, wie Sie dem Geld folgen. Fügen Sie die Adresse des Agenten ein oder öffnen Sie die <a href="agents.html">Agenten-Seite</a>.`,
    comicTitle: `„Folge ihm für mich.“`, comicSub: `Jemand fügt eine Adresse ein. Ein System zeichnet sich darum herum. Ein Sprung sieht interessant aus, also folgt die Person ihm, und das nächste System zeichnet sich an Ort und Stelle. Das ist der Anruf, den Phantom Flash annimmt.`, comicCta: `Adresse einfügen — kostenloser PFLASH ⚡`,
    bewareTitle: `Nur lesen.`, bewareText: `Phantom Flash liest öffentliche Ledger. Es fragt nie nach einer Seed-Phrase oder einem privaten Schlüssel und berührt nie eine Wallet.`,
    finalCta: `Adresse einfügen. Das Feld sehen.`, finalSub: `Eine Adresse. Ein paar Sekunden. Das öffentliche Ledger, gezeichnet als Feld.`,
    disclaimer: `Phantom Flash ist eine Blockchain-Analyse ausschließlich zu Informationszwecken. Sie ist keine Garantie und keine Zusage irgendeiner Art. Phantom Flash und seine Betreiber haften nicht für falsche, unvollständige oder veraltete Tracking-Informationen in einem Scan. Ergebnisse werden nicht garantiert; ein bestimmtes Ergebnis wird weder versprochen noch impliziert. Diese Website stellt keine Rechts-, Finanz- oder Anlageberatung dar. Scan-Daten stammen live aus öffentlichen Blockchain-Quellen und werden wie vorliegend dargestellt. Phantom Flash ist ein unabhängiger Blockchain-Analysedienst und nicht mit Wallets, Börsen oder Softwareprodukten für Kryptowährungen verbunden. Für einen Scan eingegebene Adressen werden gespeichert, um das Feld zu zeichnen.`,
    scanTitle: `Wallet PFLASHED ⚡`, scanLoading: `PFLASHING THE CHAIN…`, scanBack: `← Andere Adresse PFLASHEN`,
    totalIn: `Insgesamt erhalten`, totalOut: `Insgesamt gesendet`, txs: `Transaktionen`, cps: `Gegenparteien (1. Sprung)`, window: `Letzte Aktivität`,
    systemTitle: `Das System`, liveData: `● LIVE-BLOCKCHAIN-DATEN`, systemSub: `Das ist das System um die Adresse, die Sie eingefügt haben. Sie sitzt in der Mitte; jede Wallet, mit der sie gehandelt hat, kreist um sie, nach Volumen skaliert. Ziehen zum Drehen, Scrollen zum Zoomen, auf eine Wallet klicken für die Zahlen, auf eine Transaktion klicken, um ihren Pfad zu beleuchten und ihm ins Feld zu folgen. Alles kostenlos.`,
    controlsHint: `ziehen zum Drehen · scrollen zum Zoomen · Wallet anklicken für Details`,
    recentTx: `Letzte Transaktionen`, date: `Datum`, dir: `Richtung`, amt: `Betrag`, cp: `Gegenpartei (erster Sprung)`, txid: `TXID`,
    darkTitle: `Das Ledger bewahrt die Belege.`, darkText: `Jedes öffentliche Ledger führt die Aufzeichnung seit jeher: öffentlich, dauerhaft, Sekunden entfernt. Phantom Flash macht daraus ein Feld, das Sie begehen können.`, darkCta: `Das Feld sehen`,
    bagLegend: `💰 = Anteil am Verkehr des Geldes`, bagShare: `Verkehrsanteil`,
    bagHonesty: `💰 Beutel = der Anteil dieser Wallet am beobachteten Volumen des ersten Sprungs mit der gescannten Wallet — nicht der absolute Kontostand dieser Adresse.`,
    noAddr: `Keine Adresse angegeben.`, noAddrBody: `Gehen Sie zurück und fügen Sie die Bitcoin- oder Ethereum-Adresse ein, die Sie PFLASHEN möchten.`, invalid: `Das sieht nicht nach einer gültigen Wallet-Adresse aus.`, busy: `Primärquelle ausgelastet — Backup-Knoten wird versucht…`, noTx: `Keine Transaktionen gefunden.`, noActivity: `Keine Aktivität für diese Adresse gefunden.`, unavail: `Der 3D-Explorer ist in diesem Browser nicht verfügbar — die Transaktionstabelle unten zeigt dieselben Daten des ersten Sprungs.`, notRecognized: `Diese Adresse wird vom Bitcoin-Netzwerk nicht erkannt.`, noReach: `Die Blockchain-Datenquellen waren nicht erreichbar.`, pflashingLive: `PFLASHING THE CHAIN… der Live-Blockchain-Datensatz wird gelesen`, pflashDonePrefix: `In Sekunden PFLASHED — `, pflashDoneSuffix: ` Transaktionen gefunden.`,
    howTitle: `So funktioniert es`, step01: `SCHRITT 01`, step02: `SCHRITT 02`, step03: `SCHRITT 03`,
    step1Title: `Adresse einfügen`, step2Title: `Das System zeichnet sich selbst`, step3Title: `Folgen Sie jedem Sprung, so weit Sie wollen`,
    step1Body: `Eine Adresse auf BTC, ETH oder XRP. Mehr nicht.`,
    step2Body: `Die Adresse ist die Sonne. Jede Wallet, mit der sie gehandelt hat, kreist um sie, nach Volumen skaliert. Fliegen Sie hindurch.`,
    step3Body: `Klicken Sie auf eine Transaktion, um ihren Pfad zu beleuchten, und folgen Sie ihr zur nächsten Wallet. Jeder Sprung ist kostenlos, und jeder Sprung zeichnet das Feld.`,
    recentTitle: `Was das Feld speichert`,
    recentBody: `Das Commons ist die Aufzeichnung des Feldes. Es speichert Adressen, Beträge und Zeitstempel aus öffentlichen Ledgern, Zählungen nur in Bändern. Keine Person, keine E-Mail, kein Gerät ist damit verknüpft.`,
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
      if(x==='Free PFLASH') a.textContent=t('navFree');
      if(x==='Home') a.textContent=t('navHome');
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
    set('#bewareBox','<strong>'+t('bewareTitle')+'</strong> '+t('bewareText'));
    set('#recentBox','<div class="label">'+t('recentTitle')+'</div><p style="margin-top:10px">'+t('recentBody')+'</p>');
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
    var sub=document.querySelector('.section-title + .section-sub'); if(sub) sub.innerHTML=t('systemSub')+' <span id="capNote" style="display:none;color:var(--amber)"></span>';
    set('.hud', '<span class="live">●</span> FIRST HOP — LIVE · INHABITED · FREE');
    set('.controls-hint', t('controlsHint'));
    var rt=document.querySelectorAll('h2.section-title')[1]; if(rt){ rt.childNodes[0].textContent=t('recentTx')+' '; }
    var th=document.querySelectorAll('th'); [t('date'),t('dir'),t('amt'),t('cp'),t('txid')].forEach(function(v,i){ if(th[i]) th[i].textContent=v; });
    setAllText('.bag-key', t('bagLegend')); // v9 money-bag legend (desktop legend + mobile chip)
  }
  function apply(){ applyCommon(); if(document.querySelector('.hero')) applyIndex(); if(document.getElementById('stage3d')) applyScan(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
})();
