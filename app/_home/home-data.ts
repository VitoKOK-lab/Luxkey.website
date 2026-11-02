/** 方案：每個服務每月 10 支起算 */
export const PLAN_QTY = 10;
export const LINE_URL = 'https://lin.ee/rL0q31t';
export const LINE_ID = '@250zlmxy';
export const EMAIL = 'info@luxkey.com.tw';
export const BRIEF_URL = '/brief/';

/** 雙 11 活動：到 PROMO_END（台灣時間 11/20 23:59:59）自動下架。改檔期只改這裡。 */
export const PROMO_END = Date.parse('2026-11-20T23:59:59+08:00');
export const PROMO = { title: '雙 11 下殺優惠', quota: '限量 11 家', deadline: '11/20 23:59 截止', gift: 11 };
export const promoActive = (now = Date.now()) => now <= PROMO_END;

/** 附加選購 E–J（接在 A–D 方案後面）。先展示、不開放選購：soon 為 true 的項目標「即將開放」，不放詢問入口。市價（market）是外面的行情，只做對照。 */
export type AddOn = {
  letter: string; key: string; name: string; detail: string;
  price: string; unit: string; pack?: string; more?: string;
  marketLabel?: string; market?: string; soon: boolean;
};
export const addOns: AddOn[] = [
  { letter: 'E', key: 'unboxing', name: '素人真實開箱', detail: '比網紅更真實・產品寄給素人', marketLabel: '網紅行情', market: 'NT$12,000 數十萬', price: 'NT$3,500', unit: '／支', pack: '10 支一組', soon: true },
  { letter: 'F', key: 'film', name: '電影級 AI 形象大片', detail: '電影感・1 分鐘・橫式', marketLabel: '真人行情', market: 'NT$100,000+', price: 'NT$10,000', unit: '／支', soon: true },
  { letter: 'G', key: 'copy', name: '網站商品內文優化', detail: '標題、賣點、購買引導', price: 'NT$2,000 起', unit: '／品項', pack: '10 品項一組', soon: true },
  { letter: 'H', key: 'website', name: '電商網站', detail: '商品頁、購買動線', marketLabel: '真人行情', market: 'NT$40,000–150,000', price: 'NT$38,000 起', unit: '／案', soon: true },
  { letter: 'I', key: 'course', name: '線上課程製作', detail: '自己講 11 集', more: 'AI 配音 25 集 NT$55,000', price: 'NT$35,000 起', unit: '', soon: true },
  { letter: 'J', key: 'collab', name: '素人影音合作', detail: '發在素人帳號・品牌可用', price: 'NT$3,500', unit: '／位', pack: '10 位一組', soon: true },
];

export type VideoKey = 'edit' | 'ugc' | 'clone' | 'drama';
export type Video = {
  key: VideoKey;
  /** 方案代號：A–D，對應線稿 */
  letter: string;
  name: string;
  price: number;
  market: number;
  marketNote: string;
  pitch: string;
  /** 方案特色：方案卡片列出 */
  includes: string[];
  fit: string;
  /** 卡片上多一句鉤子 */
  hook?: string;
  /** 適用情境：方案卡底部的標籤 */
  scenes: string[];
};

/** 主打影音 A–D：每支年約單價，每月 10 支起訂。market 為一般外包行情，僅供比較。方案價格全部由這裡的 price 算出。 */
export const VIDEO_MIN = 10;
export const videos: Video[] = [
  {
    key: 'edit', letter: 'A', name: '素材快剪', price: 300, market: 1500, marketNote: '外面請人剪一支短影音',
    pitch: '現成素材，快速剪輯成短影音。',
    includes: ['現成素材快速剪輯', '多種版型、節奏風格', '加上字幕、重點與轉場', '商品亮點導向', '適合活動、開箱、花絮', '高效率、穩定出片'],
    fit: '手上有拍攝素材、但沒時間剪的品牌',
    scenes: ['活動紀錄', '新品宣傳', '電商導購'],
  },
  {
    key: 'ugc', letter: 'B', name: 'AI 代言人', price: 2800, market: 8000, marketNote: '外面找人出鏡拍一支商品介紹',
    pitch: '不用真人，AI 人物自然代言產品。',
    includes: ['AI 代言人一鍵生成', '支援多種人節奏風格', '口條自然、畫面真實', '可置入產品介紹與賣點', '適合品牌介紹、商品推薦', '節省拍攝與人力成本'],
    fit: '老闆不想露臉、需要大量商品介紹影片的品牌',
    scenes: ['品牌介紹', '商品推廣', '活動宣傳'],
  },
  {
    key: 'clone', letter: 'C', name: '個人品牌分身', price: 3500, market: 8000, marketNote: '外面找人出鏡、專業形象打造一支',
    pitch: '專業形象打造，本人不需出鏡，AI 分身替你發聲。',
    includes: ['以你的形象打造專屬分身', '保留個人風格與語氣', '可長期持續製作內容', '適合知識分享、觀點輸出', '建立專業形象與影響力', '穩定產出、提升品牌信任'],
    fit: '想經營個人品牌、但沒時間天天拍片的老闆與專業人士',
    scenes: ['知識分享', '專業觀點', '個人品牌'],
  },
  {
    key: 'drama', letter: 'D', name: 'AI 短劇置入', price: 3900, market: 30000, marketNote: '外面找演員、場地拍一支劇情短片',
    pitch: '把產品自然融入情境短劇。',
    includes: ['AI 生成情境短劇', '劇情自然融入產品', '多種題材與風格（生活、職場等）', '提升觀看率與互動', '適合品牌故事、情境行銷', '高 CP 值、快速量產'],
    fit: '想讓商品被大量轉傳、被記住的品牌',
    scenes: ['情境短劇', '產品置入', '行銷活動'],
  },
];
/** STEP 1 的影片類型方塊：點了捲到對應的方案卡或區塊。沒有專屬方案的類型，先指到最接近的地方。 */
export const videoTiles: { label: string; icon: string; to: string }[] = [
  { label: '素人實拍系列', icon: 'camera', to: '#other' },
  { label: '素材快剪', icon: 'scissors', to: '#plan-edit' },
  { label: 'AI 代言人', icon: 'bot', to: '#plan-ugc' },
  { label: '個人品牌分身', icon: 'face', to: '#plan-clone' },
  { label: 'AI 短劇置入', icon: 'film', to: '#plan-drama' },
  { label: '電商導購影片', icon: 'bag', to: '#plan-edit' },
  { label: '線上課程宣傳', icon: 'course', to: '#other' },
  { label: '更多影片類型', icon: 'more', to: '#contact' },
];
export const videoOf = (k: VideoKey) => videos.find(v => v.key === k)!;

/** 示範影片：先全部用同一支，之後各項換成自己的（放在 public/home/demo/）。 */
export const DEMO_VIDEO = '/home/demo/demo.mp4';
export const DEMO_POSTER = '/home/demo/poster.webp';

/** 老闆的痛點：四支手機並排，每支一個服務。video 對應影片價格；market／price 是沒有影片單價時的行情對照。 */
/** 個人品牌分身還沒有示範影片：只放靜態封面，不能播放。有影片後補上 demo 即可。 */
export const CLONE_POSTER = '/home/demo/clone-soon.jpg';

export type Pain = { tag: string; title: string; body: string; video?: VideoKey; market?: number; price?: number; unit?: string; demo?: string; poster?: string; /** 示範影片準備中：只放封面，不能播放 */ soon?: boolean };
export const pains: Pain[] = [
  { tag: '素材快剪', title: '熱門話題等剪完，熱度早就沒了', body: '請一位專職剪輯，又沒有足夠的片量讓他天天剪。交給素材快剪，素材丟進來很快就出片，趁話題還熱就上架。', video: 'edit', demo: '/home/demo/cut-steak.mp4', poster: '/home/demo/cut-steak-poster.webp' },
  { tag: 'AI 代言人', title: '老闆不好意思露臉', body: '讓大量 AI 代言人幫你介紹、推薦商品。不同人物、不同口吻，打進不同客群。', video: 'ugc', demo: '/home/demo/digital-human.mp4', poster: '/home/demo/digital-human-poster.webp' },
  { tag: '個人品牌分身', title: '想經營個人品牌，卻沒時間天天拍', body: '用你的形象打造專屬 AI 分身，保留你的風格與語氣。本人不用出鏡，分身替你穩定發聲。', video: 'clone', poster: CLONE_POSTER, soon: true },
  { tag: 'AI 短劇置入', title: 'AI 短劇正在佔滿大家的碎片時間', body: '別在這波熱潮脫隊。讓霸總拯救少女的時候，順手置入你的品牌商品。', video: 'drama' },
  { tag: '素人真實開箱', title: '網友買東西，先看評價', body: '我們安排各種不同身分的真實素人，拍攝你的品牌商品，留下真實的使用心得。', market: 12000, price: 3500, demo: '/home/demo/ugc-sales.mp4', poster: '/home/demo/ugc-sales-poster.webp' },
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
    label: '老闆常問',
    items: [
      { q: '看得出是 AI 嗎？', a: '沒關係，有人看、有詢問才是重點。' },
      { q: '能下廣告、放官網嗎？', a: '可以，授權範圍寫在合約。' },
      { q: '合約、交期怎麼算？', a: '業務會提供正式報價。', link: { href: BRIEF_URL, label: '填需求單' } },
    ],
  },
  {
    label: '影片與價格',
    items: [
      { q: '影片一支多少錢？', a: `${videos.map(v => `${v.name} NT$${v.price.toLocaleString('en-US')}`).join('、')}，都是年約每支的未稅價格，每種每月 ${PLAN_QTY} 支起訂；季約、單月每支價格較高。素人真實開箱每支 NT$3,500（10 支一組），屬附加選購，即將開放。`, link: { href: '#why', label: '看影片價格' } },
      { q: 'AI 代言人一支多少錢？', a: 'AI 代言人年約每支 NT$2,800，未稅；季約、單月每支價格較高。', link: { href: '#why', label: '看影片價格' } },
      { q: '業界平均收費是怎麼算的？', a: '我們拿一般外包製作一支同類型影片的參考價來比較，例如請人剪一支短影音、找人出鏡拍商品介紹、做一套個人分身、找演員和場地拍劇情短片。實際行情依廠商而異，只是讓你知道差距有多大。' },
      { q: '附加選購有哪些？費用怎麼算？', a: `附加選購給訂閱用戶，目前即將開放：${addOns.map(a => `${a.name} ${a.price}${a.unit}${a.pack ? `（${a.pack}）` : ''}`).join('、')}。社群圖文、SEO 文章、電商圖文與完整官網頁面優化依需求報價。以上價格未稅。`, link: { href: '#other', label: '看附加選購' } },
      { q: '中途解約怎麼算？', a: '解約時，已使用的期間改以單月價格計算，從已付的費用中扣除後，退還尚未執行（未實現）的費用。實際條件以合約為準。' },
      { q: '方案怎麼選？', a: `${videos.map(v => v.name).join('、')}四種影片各自獨立，可以自由搭配，每種每個月 ${PLAN_QTY} 支起算。年約最便宜，季約次之，單月最貴。附加選購限訂閱用戶，即將開放。`, link: { href: '#plans', label: '看方案選擇' } },
      { q: '價格含稅嗎？', a: '網站標示的價格均為未稅價。附加選購若標示「起」，會依實際製作範圍提供正式報價。' },
    ],
  },
  {
    label: '合作方式',
    items: [
      { q: '我要提供什麼素材？', a: '品牌介紹、商品照片或影片、你想強調的賣點，以及想參考的風格或同業影片。沒有素材也可以，先用 LINE 告訴我們你的想法，腳本、AI 製作、剪輯、字幕都由我們處理。' },
      { q: '交期多久？可以改幾次？', a: 'AI 影片生成後再修改，幾乎等於重做，所以我們把確認放在生成之前：腳本、角色和畫面方向會跟你來回確認，確認好才開始製作。因為客人光看文字很難想像畫面，我們會用分鏡或參考圖幫你確認。實際交期依支數與影片類型而定，LINE 告訴我們需求就回覆。' },
      { q: '有包含留言、私訊回覆嗎？', a: '不包含。留言、私訊與客服需要即時的人力，我們專注在內容產出，才能把價格壓到最低。廣告投放代操可以另外加購。' },
      { q: '可以完全客製嗎？', a: '我們以 AI 與公版流程為主，才能維持低價。實拍與完全客製需另外報價，費用明顯較高，且每月只承接少量案件。' },
      { q: '怎麼開始？', a: '先填需求單，附上素材或產品照；也可以直接用 LINE 告訴我們想做哪種影片，我們回覆建議做法與報價。', link: { href: BRIEF_URL, label: '填需求單' } },
    ],
  },
  {
    label: 'AI 與授權',
    items: [
      { q: 'ACE Impact 是什麼？', a: 'ACE Impact 是金曜石國際（LUXKEY）的 AI 創意行銷品牌，前身為 A.C.E.。用 AI 做品牌影音、社群圖文、搜尋文章與網站。' },
      { q: '可以用公司的真人出鏡嗎？', a: '可以。需要先建立角色卡，費用 NT$15,000，一次付費，可長期使用。' },
      { q: 'AI 代言人的版權歸誰？可以下廣告嗎？', a: 'AI 代言人影片和其他影片一樣，交付的成品可供你的品牌商業使用，包含廣告投放、社群與官網。版權歸屬與實際授權範圍，會在合約中寫清楚。' },
      { q: 'AI 做的影片和圖片可以商業使用嗎？', a: '交付的成品可供你的品牌商業使用，例如社群、廣告與官網。實際授權範圍會在合約中寫清楚。' },
      { q: '我是行銷公司或顧問，可以經銷合作嗎？', a: '可以。全台同一價格，經銷商賣同一套服務，依成交抽成。合作方式請看經銷合作頁面。', link: { href: '/introduce/', label: '看經銷合作' } },
    ],
  },
];
export const faqs: Faq[] = faqGroups.flatMap(g => g.items);

/** 作品案例：先用示範影片，品牌名與成效數字等有真實資料再補（brand、result）。 */
export type WorkGroup = 'cut' | 'human' | 'clone' | 'drama' | 'other';
/** demo 留空＝示範影片準備中，只顯示封面、不能播放 */
export type Work = { group: WorkGroup; type: string; title?: string; brand?: string; result?: string; demo?: string; poster: string };
const demoOf = (key: string) => pains.find(p => p.video === key || p.tag === key);
const human0 = demoOf('ugc')!, drama0 = demoOf('drama')!, real0 = pains.find(p => p.tag === '素人真實開箱')!;
const asWork = (group: WorkGroup, p: (typeof pains)[number], title?: string): Work => ({ group, type: p.tag, title, demo: p.demo ?? DEMO_VIDEO, poster: p.poster ?? DEMO_POSTER });
/** 作品案例：各分頁都顯示影片卡片；品牌名與成效數字有真實資料再補（brand、result）。 */
export const worksGroups: { key: WorkGroup; label: string }[] = [
  { key: 'cut', label: '素材快剪' }, { key: 'human', label: 'AI 代言人' }, { key: 'clone', label: '個人品牌分身' }, { key: 'drama', label: 'AI 短劇置入' }, { key: 'other', label: '其他作品' },
];
export const works: Work[] = [
  { group: 'cut', type: '素材快剪', title: '牛排・幾分熟怎麼分', demo: '/home/demo/cut-steak.mp4', poster: '/home/demo/cut-steak-poster.webp' },
  { group: 'cut', type: '素材快剪', title: '保養・換季三個錯', demo: '/home/demo/cut-skincare.mp4', poster: '/home/demo/cut-skincare-poster.webp' },
  { group: 'cut', type: '素材快剪', title: '台北・下午三點咖啡', demo: '/home/demo/cut-coffee.mp4', poster: '/home/demo/cut-coffee-poster.webp' },
  { group: 'cut', type: '素材快剪', title: 'MC-001', demo: '/home/demo/cut-mc001.mp4', poster: '/home/demo/cut-mc001-poster.webp' },
  asWork('human', human0),
  { group: 'human', type: 'AI 代言人', demo: '/home/demo/ai-edit.mp4', poster: '/home/demo/ai-edit-poster.webp' },
  { group: 'human', type: 'AI 代言人', title: '卡通代言人', demo: '/home/demo/cartoon-human.mp4', poster: '/home/demo/cartoon-human-poster.webp' },
  { group: 'clone', type: '個人品牌分身', title: '示範影片準備中', poster: CLONE_POSTER },
  asWork('drama', drama0),
  asWork('other', real0),
  { group: 'other', type: '線上課程', demo: '/home/demo/course.mp4', poster: '/home/demo/course-poster.webp' },
  { group: 'other', type: '線上課程', title: '自媒體入門課', demo: '/home/demo/course-media.mp4', poster: '/home/demo/course-media-poster.webp' },
];

/** 怎麼拿到影片：3 步。交期與修改次數先不寫，重點是「生成之前」就確認好。 */
export const flow = [
  { title: '填需求單', body: '附上素材或產品照', href: BRIEF_URL, cta: '填需求單' },
  { title: '確認後製作', body: '腳本畫面先確認' },
  { title: '雲端下載', body: '直接上傳各平台' },
];

/** 首頁主視覺的規格標籤 */
export const heroSpecs = ['30–60 秒', '1080p 直式', '單月・季・年都能訂'];

/** 為什麼選我們：三個產業數據（來源照線稿，標在區塊下方）、四枚經歷、一組比價、三個強項、三個 SOP 賣點。 */
export const stats = [
  { big: '86', unit: '%', label: '美國廣告買家', label2: '用 AI 做影片' },
  { big: '1,000', unit: '億', label: '微短劇規模', label2: '超越電影票房' },
  { big: '100', unit: '+', label: '合作品牌', label2: '近千萬業績' },
];
export const statSource = '資料來源：IAB 2025 數位影音廣告報告；工商時報 2026 年 4 月（人民幣）';
export const creds = ['設計行銷近 10 年', '市政府合作顧問', '大學講師', '2019 起做短影音'];
/** 真人行銷公司拍一支的行情，對比 ACE Impact AI 代言人（價格取自方案資料） */
export const compareHuman = { label: '真人行銷公司拍一支', price: 'NT$8,000–16,000', note: '真人出鏡＋拍攝＋剪輯' };
export const compareUs = { label: 'ACE Impact AI 做一支', note: 'AI 出鏡＋腳本＋剪輯' };
export const whyUs = ['懂行銷', '懂商業', '會用 AI'];
export const sop = [
  { title: '版型直接選', body: '挑了就開始' },
  { title: '規格好上架', body: 'IG・抖音・YT 直接傳' },
  { title: '先確認再做', body: '腳本畫面確認才製作' },
];
export const whyProof = [
  { stat: '2019', title: '比市場早一步', body: '抖音還沒人看好，我們就在拍短影音；AI 一出現，就用進每支影片。' },
  { stat: '合理價', title: '價格透明', body: '價格公開、一支一支算清楚，用合理的價格，做真正有用的短影音。' },
  { stat: '10 萬+', title: '自己的帳號就是證明', body: '10 年行銷經驗、政府合作，全網 10 萬粉絲。怎麼幫自己做，就怎麼幫你做。' },
];

/** 方案選擇：A–D 四種影片各自獨立，每月 10 支起算，可自由搭配。年約最便宜，季約 ×1.3、單月 ×1.7（月費取整到百位）。其他服務只有單價，沒有季約、年約。 */
export type PlanTerm = 'year' | 'quarter' | 'month';
export const planTerms: { key: PlanTerm; label: string; ratio: number }[] = [
  { key: 'month', label: '單月', ratio: 1.7 }, { key: 'quarter', label: '季約', ratio: 1.3 }, { key: 'year', label: '年約', ratio: 1 },
];
const roundHundred = (n: number) => Math.round(n / 100) * 100;
const monthly = (year: number) => Object.fromEntries(planTerms.map(t => [t.key, roundHundred(year * t.ratio)])) as Record<PlanTerm, number>;
export const plans = videos.map(v => ({ key: v.key, letter: v.letter, name: v.name, pitch: v.pitch, qty: PLAN_QTY, unit: v.price, includes: v.includes, price: monthly(v.price * PLAN_QTY) }));
