export const LINE_URL = 'https://lin.ee/rL0q31t';
export const EMAIL = 'info@luxkey.com.tw';

export type ServiceKey = 'posts' | 'video' | 'article' | 'ecommerce' | 'optimize' | 'website';

export type Service = {
  key: ServiceKey;
  name: string;
  short: string;
  pitch: string;
  includes: string[];
  fit: string;
};

export const services: Service[] = [
  {
    key: 'posts', name: '社群圖文貼文', short: '每週固定更新，粉專不再斷更',
    pitch: '依品牌調性規劃主題，AI 產圖、文案與排版一次完成，排程代發到 FB、IG，你只要看稿。',
    includes: ['每月主題規劃', 'AI 圖像、文案與品牌排版', 'FB、IG 排程代發'],
    fit: '粉專需要固定更新、但沒有人手的品牌',
  },
  {
    key: 'video', name: 'AI 短影音', short: '剪輯、數字人、商品片、劇情短片任選',
    pitch: '不用約拍、不用出鏡。拍好的素材幫你剪，沒有素材就用數字人或商品照做成影片，每月依需求換著用。',
    includes: ['AI 剪輯：送素材就能出片', 'AI 數字人口播：換腳本就能量產', '商品介紹片、劇情短片'],
    fit: '想經營短影音、但不想一直拍攝出鏡的品牌',
  },
  {
    key: 'article', name: 'SEO／AI 搜尋文章', short: '讓 Google 和 AI 都找得到你',
    pitch: '依客人會搜尋的問題寫成文章，結構清楚、重點明確，Google 搜尋與 ChatGPT 這類 AI 搜尋都讀得懂。',
    includes: ['關鍵字與客人提問研究', '可直接上架的完整文章', '標題、摘要與結構化重點'],
    fit: '想靠搜尋帶來穩定詢問的品牌',
  },
  {
    key: 'ecommerce', name: '電商商品圖文', short: '主圖、情境圖、詳情頁一次做好',
    pitch: '換上商品照與賣點，AI 生成情境圖並套上品牌版型，商品再多也做得完。',
    includes: ['商品主圖與 AI 情境圖', '詳情頁圖文', '活動視覺'],
    fit: '品項多、需要大量上架素材的電商',
  },
  {
    key: 'optimize', name: '網站優化', short: '舊網站不用重做，內容先變好',
    pitch: '改寫商品與服務頁的內文、補上 SEO 與結構化資料，讓現有網站更容易被搜尋、也更容易成交。',
    includes: ['頁面與商品內文改寫', 'SEO 標題與描述', 'AI 搜尋結構化資料'],
    fit: '已經有網站、但沒人看也沒詢問的品牌',
  },
  {
    key: 'website', name: '公版官網', short: '年約直接送，不另外收費',
    pitch: '從精選版型挑一款，換上你的文字、照片與聯絡方式就上線。手機好看，搜尋引擎與 AI 都讀得懂。',
    includes: ['精選響應式版型', '基礎 SEO 與結構化資料', 'LINE、表單詢問導流'],
    fit: '還沒有官網，或官網已經太舊的品牌',
  },
];

export type Video = {
  key: 'edit' | 'ugc' | 'drama';
  name: string;
  price: number;
  market: number;
  marketNote: string;
  pitch: string;
  includes: string[];
  fit: string;
  /** 卡片上多一句鉤子 */
  hook?: string;
};

/** 主打影音：每支單價，一次 10 支起訂。market 為一般外包行情，僅供比較。 */
export const VIDEO_MIN = 10;
export const videos: Video[] = [
  {
    key: 'edit', name: 'AI 剪片', price: 300, market: 1500, marketNote: '外面請人剪一支短影音',
    pitch: '你拍好素材丟給我們，AI 剪輯、上字幕，直接交付可以上架的直式短影音。',
    includes: ['剪輯、轉場與節奏調整', '自動字幕', '直式 9:16，可直接上架'],
    fit: '手上有拍攝素材、但沒時間剪的品牌',
  },
  {
    key: 'ugc', name: 'AI 數字人', price: 2000, market: 8000, marketNote: '外面找人出鏡拍一支商品介紹',
    pitch: '老闆不用露臉。AI 數字人幫你介紹、推薦商品，不同人物、不同口吻，打進不同客群。',
    includes: ['介紹腳本撰寫', 'AI 數字人口播與商品展示', '字幕、配樂，直式交付'],
    fit: '老闆不想露臉、需要大量商品介紹影片的品牌',
  },
  {
    key: 'drama', name: '狗血劇商品介紹', hook: '3 秒反轉的劇情廣告', price: 3500, market: 30000, marketNote: '外面找演員、場地拍一支劇情短片',
    pitch: '婆媳、霸總、逆襲反轉，用 AI 演出讓人停下來看完的劇情，最後自然帶出你的商品。',
    includes: ['劇情腳本與分鏡', 'AI 角色演出與場景', '字幕、配樂，直式交付'],
    fit: '想讓商品被大量轉傳、被記住的品牌',
  },
];

/** 示範影片：先全部用同一支，之後各項換成自己的（放在 public/home/demo/）。 */
export const DEMO_VIDEO = '/home/demo/demo.mp4';
export const DEMO_POSTER = '/home/demo/poster.webp';

/** 老闆的痛點：五支手機並排，每支一個服務。video 對應影片價格；market／price 是沒有影片單價時的行情對照。 */
export type Pain = { tag: string; title: string; body: string; href?: string; video?: Video['key']; market?: number; price?: number; unit?: string; demo?: string; poster?: string };
export const pains: Pain[] = [
  { tag: 'AI 剪片', title: '熱門話題等剪完，熱度早就沒了', body: '請一位專職剪輯，又沒有足夠的片量讓他天天剪。交給 AI 剪片，素材丟進來很快就出片，趁話題還熱就上架。', video: 'edit', demo: '/home/demo/ai-edit.mp4', poster: '/home/demo/ai-edit-poster.webp' },
  { tag: 'AI 數字人', title: '老闆不好意思露臉', body: '讓大量 AI 數字人幫你介紹、推薦商品。不同人物、不同口吻，打進不同客群。', video: 'ugc', demo: '/home/demo/digital-human.mp4', poster: '/home/demo/digital-human-poster.webp' },
  { tag: '狗血劇商品介紹', title: 'AI 短劇正在佔滿大家的碎片時間', body: '別在這波熱潮脫隊。讓霸總拯救少女的時候，順手置入你的品牌商品。', video: 'drama' },
  { tag: '真人推薦影片', title: '網友買東西，先看評價', body: '我們安排各種不同身分的真實素人，拍攝你的品牌商品，留下真實的使用心得。', href: '#contact', market: 12000, price: 2500, demo: '/home/demo/ugc-sales.mp4', poster: '/home/demo/ugc-sales-poster.webp' },
];

/** 合作客戶 logo，檔案在 public/home/clients/。 */
export const clients: { slug: string; name: string }[] = [
  { slug: 'mcdonalds', name: '麥當勞' }, { slug: 'familymart', name: '全家便利商店' }, { slug: 'lays', name: "Lay's 樂事" },
  { slug: 'haagen-dazs', name: 'Häagen-Dazs' }, { slug: 'foreo', name: 'FOREO' }, { slug: 'hotel-nikko', name: '高雄日航酒店' },
  { slug: 'hohos', name: 'HOHOS' }, { slug: 'azio', name: 'AZIO' }, { slug: 'laoxiezhen', name: '老協珍' },
  { slug: 'redhair', name: '紅髮' }, { slug: 'yakiniku', name: '上吉燒肉' }, { slug: 'shanjian-xiaomao', name: '山間小貓' },
  { slug: 'chuan-peng', name: 'Chuan Peng' }, { slug: 'trend', name: '趨勢商品開發' }, { slug: 'mazupu-tofu', name: '媽祖埔豆腐張' },
  { slug: 'amos', name: 'AMOS' }, { slug: 'things', name: 'things' }, { slug: 'laojing', name: '老井' },
  { slug: 'wooden-door-cafe', name: 'Wooden Door Cafe' }, { slug: 'tahir-zainab', name: 'Tahir Zainab' }, { slug: 'yiye-machinery', name: '憶燁機械' },
  { slug: 'client-2', name: '合作客戶' }, { slug: 'client-5', name: '合作客戶' },
  { slug: 'client-6', name: '合作客戶' }, { slug: 'client-9', name: '合作客戶' },
];

/** 常見問題：依主題分組；經銷那題要放最後，元件會接上經銷頁連結。 */
export type Faq = { q: string; a: string; link?: { href: string; label: string } };
export const faqGroups: { label: string; items: Faq[] }[] = [
  {
    label: '影片與價格',
    items: [
      { q: '影片一支多少錢？', a: 'AI 剪片 NT$300、AI 數字人 NT$2,000、狗血劇商品介紹 NT$3,500，都是每支的價格，未稅。同一批影片會沿用同一組角色、風格與品牌調性，所以每種影片一次 10 支起訂。', link: { href: '#why', label: '看影片價格' } },
      { q: '外面行情是怎麼算的？', a: '我們拿一般外包製作一支同類型影片的參考價來比較，例如請人剪一支短影音、找人出鏡拍商品介紹、找演員和場地拍劇情短片。實際行情依廠商而異，只是讓你知道差距有多大。' },
      { q: '還有做其他服務嗎？', a: '有。社群圖文、SEO／AI 搜尋文章、電商商品圖文、網站優化、公版官網都能做，需要的話用 LINE 告訴我們，我們回覆做法與報價。', link: { href: '#contact', label: '聯絡我們' } },
      { q: '年繳、季繳、月繳差在哪？', a: '價格都是每月金額，年繳最便宜、季繳次之、月繳最貴。一次買一個服務，綁年約最划算；前 3 個月不滿意，可以直接解約。', link: { href: '#plans', label: '看價格方案' } },
      { q: '價格含稅嗎？', a: '網站上所有價格都是未稅價。全台統一價格，不議價也不打折。' },
    ],
  },
  {
    label: '合作方式',
    items: [
      { q: '我要提供什麼素材？', a: '品牌介紹、商品照片或影片、你想強調的賣點，以及想參考的風格或同業影片。沒有素材也可以，先用 LINE 告訴我們你的想法，腳本、AI 製作、剪輯、字幕都由我們處理。' },
      { q: '交期多久？可以改幾次？', a: 'AI 影片生成後再修改，幾乎等於重做，所以我們把確認放在生成之前：腳本、角色和畫面方向會跟你來回確認，確認好才開始製作。因為客人光看文字很難想像畫面，我們會用分鏡或參考圖幫你確認。實際交期依支數與影片類型而定，LINE 告訴我們需求就回覆。' },
      { q: '有包含留言、私訊回覆嗎？', a: '不包含。留言、私訊與客服需要即時的人力，我們專注在內容產出，才能把價格壓到最低。廣告投放代操可以另外加購。' },
      { q: '可以完全客製嗎？', a: '我們以 AI 與公版流程為主，才能維持低價。實拍、完全客製與網紅合作需另外報價，費用明顯較高，且每月只承接少量案件。' },
      { q: '怎麼開始？', a: '用 LINE 告訴我們想做哪種影片、品牌現在最想完成的事，我們回覆建議做法與報價。', link: { href: '#contact', label: '聯絡我們' } },
    ],
  },
  {
    label: 'AI 與授權',
    items: [
      { q: 'A.C.E. 是什麼？', a: 'A.C.E.（AI · Creative · Execution）是金曜石國際（LUXKEY）的 AI 創意行銷品牌。用 AI 做品牌影音、社群圖文、搜尋文章與網站。' },
      { q: 'AI 做的影片看得出來嗎？', a: '看得出來是 AI 製作沒關係，重點是內容有沒有人看、有沒有帶來詢問。我們會控制角色、口吻和品牌調性，讓每一支都像同一個品牌在說話。' },
      { q: 'AI 數字人的版權歸誰？可以下廣告嗎？', a: 'AI 數字人影片和其他影片一樣，交付的成品可供你的品牌商業使用，包含廣告投放、社群與官網。版權歸屬與實際授權範圍，會在合約中寫清楚。' },
      { q: 'AI 做的影片和圖片可以商業使用嗎？', a: '交付的成品可供你的品牌商業使用，例如社群、廣告與官網。實際授權範圍會在合約中寫清楚。' },
      { q: '我是行銷公司或顧問，可以經銷合作嗎？', a: '可以。全台同一價格，經銷商賣同一套服務，依成交抽成。合作方式請看經銷合作頁面。', link: { href: '/introduce/', label: '看經銷合作' } },
    ],
  },
];
export const faqs: Faq[] = faqGroups.flatMap(g => g.items);

/** 作品案例：先用示範影片，品牌名與成效數字等有真實資料再補（brand、result）。 */
export type Work = { type: string; title?: string; brand?: string; result?: string; demo: string; poster: string };
const worksBase = pains.map(p => ({ type: p.tag, demo: p.demo ?? DEMO_VIDEO, poster: p.poster ?? DEMO_POSTER }));
/** AI 剪片的示範：緊跟在 AI 剪片那張後面 */
const cutDemos: Work[] = [
  { type: 'AI 剪片', title: '牛排・幾分熟怎麼分', demo: '/home/demo/cut-steak.mp4', poster: '/home/demo/cut-steak-poster.webp' },
  { type: 'AI 剪片', title: '保養・換季三個錯', demo: '/home/demo/cut-skincare.mp4', poster: '/home/demo/cut-skincare-poster.webp' },
  { type: 'AI 剪片', title: '台北・下午三點咖啡', demo: '/home/demo/cut-coffee.mp4', poster: '/home/demo/cut-coffee-poster.webp' },
  { type: 'AI 剪片', title: 'MC-001', demo: '/home/demo/cut-mc001.mp4', poster: '/home/demo/cut-mc001-poster.webp' },
];
export const works: Work[] = [
  ...worksBase.slice(0, 1),
  ...cutDemos,
  worksBase[1],
  { type: 'AI 數字人', title: '卡通數字人', demo: '/home/demo/cartoon-human.mp4', poster: '/home/demo/cartoon-human-poster.webp' },
  ...worksBase.slice(2),
  { type: '線上課程', demo: '/home/demo/course.mp4', poster: '/home/demo/course-poster.webp' },
  { type: '線上課程', title: '自媒體入門課', demo: '/home/demo/course-media.mp4', poster: '/home/demo/course-media-poster.webp' },
];

/** 合作流程：交期與修改次數先不寫，重點是「生成之前」就確認好。 */
export const flow = [
  { title: 'LINE 討論', body: '告訴我們你的產品、想講的重點，和想做哪種影片。' },
  { title: '提供素材', body: '品牌資料、商品照片或影片，沒有素材也可以先聊想法。' },
  { title: '生成前確認', body: '腳本、角色與畫面方向反覆確認，確認好才開始製作。' },
  { title: '製作交片', body: '依確認好的內容製作，交付可以直接上架的直式影片。' },
];

/** 為什麼是我們：三種對手各缺一塊，我們三塊都有；下面三段是我們的底氣。 */
export const whyVs = [
  { who: '行銷公司', lack: '不懂商業' },
  { who: '商業顧問公司', lack: '不懂 AI' },
  { who: 'AI 公司', lack: '只會炫技' },
];
export const whyUs = ['懂行銷', '懂商業', '會用 AI'];
export const whyProof = [
  { title: '市場還在觀望，我們已經在做了。', body: '2019 年，當大家還覺得抖音沒什麼用的時候，我們已經在拍短影音和教課；當市場開始討論 AI，我們已經把它用在每一支影片裡。這些年來，我們一直比市場早一步。' },
  { title: '我們不是來割韭菜的。', body: '這幾年，太多老闆被行銷公司當成肥羊：收了錢，做出來的影片沒人看，一個月幾十萬換了一間又一間，錢花了，生意卻沒有起色。作為資深短影音行銷人，我們看過太多這樣的故事跟災難，所以黑桃A只做一件事：用合理的價格，給你真正有用的短影音。' },
  { title: '行銷本行出身，自己的帳號就是證明。', body: '我們不是半路轉行做影片。創辦人有超過十年的行銷經驗，曾與政府單位合作，自己經營的帳號和頻道，全網累積超過 10 萬粉絲。我們怎麼幫自己做，就怎麼幫你做。' },
];

/** 方案：一次買一個服務，綁年約最划算。價格都是每月金額、未稅；年繳最便宜，其次季繳，月繳最貴。 */
export type Tiers = { year: number; quarter: number; month: number };
export const cutPlan = { name: 'AI 剪片方案', qty: 30, hook: '天天出片，一支只要 NT$300', body: '素材丟給我們，每天一支短影音，帳號再也不會斷更。', tiers: { year: 9000, quarter: 12000, month: 15000 } as Tiers };
export const bundleTiers: Tiers = { year: 35000, quarter: 45000, month: 60000 };
export const bundlePlans = [
  { name: '狗血劇方案', qty: '每月 10 支', body: '3 秒反轉的劇情廣告，讓人看完才發現是業配。' },
  { name: '數字人方案', qty: '每月 20 支', body: '品牌專屬的 AI 主持人，天天幫你介紹產品。' },
  { name: '雙主打方案', qty: '每月 15 支', body: '狗血劇 5 支吸睛，數字人 10 支講清楚產品，一次搞定。', best: true },
];
/** 小編成本：月薪加勞健保 */
export const EDITOR_COST = 35000;
