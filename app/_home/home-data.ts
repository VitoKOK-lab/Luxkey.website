export const LINE_URL = 'https://lin.ee/rL0q31t';
export const EMAIL = 'luxkey.tw@gmail.com';

export type ServiceKey = 'posts' | 'video' | 'article' | 'ecommerce' | 'optimize' | 'website';
export type PlanKey = 'trial' | 'standard' | 'growth';

export type Service = {
  key: ServiceKey;
  name: string;
  short: string;
  pitch: string;
  quota: string;
  includes: string[];
  fit: string;
  /** 服務照片（放在 public/），還沒有就用品牌色塊 */
  image?: string;
};

export const services: Service[] = [
  {
    key: 'posts', name: '社群圖文貼文', short: '每週固定更新，粉專不再斷更',
    pitch: '依品牌調性規劃主題，AI 產圖、文案與排版一次完成，排程代發到 FB、IG，你只要看稿。',
    quota: 'Pro 每月 12 則・Max 每月 24 則',
    includes: ['每月主題規劃', 'AI 圖像、文案與品牌排版', 'FB、IG 排程代發'],
    fit: '粉專需要固定更新、但沒有人手的品牌',
  },
  {
    key: 'video', name: 'AI 短影音', short: '剪輯、數字人、商品片、劇情短片任選',
    pitch: '不用約拍、不用出鏡。拍好的素材幫你剪，沒有素材就用數字人或商品照做成影片，每月依需求換著用。',
    quota: 'Pro 每月 6 支・Max 每月 14 支',
    includes: ['AI 剪輯：送素材就能出片', 'AI 數字人口播：換腳本就能量產', '商品介紹片、劇情短片'],
    fit: '想經營短影音、但不想一直拍攝出鏡的品牌',
  },
  {
    key: 'article', name: 'SEO／AI 搜尋文章', short: '讓 Google 和 AI 都找得到你',
    pitch: '依客人會搜尋的問題寫成文章，結構清楚、重點明確，Google 搜尋與 ChatGPT 這類 AI 搜尋都讀得懂。',
    quota: 'Pro 每月 2 篇・Max 每月 4 篇',
    includes: ['關鍵字與客人提問研究', '可直接上架的完整文章', '標題、摘要與結構化重點'],
    fit: '想靠搜尋帶來穩定詢問的品牌',
  },
  {
    key: 'ecommerce', name: '電商商品圖文', short: '主圖、情境圖、詳情頁一次做好',
    pitch: '換上商品照與賣點，AI 生成情境圖並套上品牌版型，商品再多也做得完。',
    quota: 'Max 方案每月 5 個品項',
    includes: ['商品主圖與 AI 情境圖', '詳情頁圖文', '活動視覺'],
    fit: '品項多、需要大量上架素材的電商',
  },
  {
    key: 'optimize', name: '網站優化', short: '舊網站不用重做，內容先變好',
    pitch: '改寫商品與服務頁的內文、補上 SEO 與結構化資料，讓現有網站更容易被搜尋、也更容易成交。',
    quota: 'Max 方案每月 10 頁或品項',
    includes: ['頁面與商品內文改寫', 'SEO 標題與描述', 'AI 搜尋結構化資料'],
    fit: '已經有網站、但沒人看也沒詢問的品牌',
  },
  {
    key: 'website', name: '公版官網', short: '年約直接送，不另外收費',
    pitch: '從精選版型挑一款，換上你的文字、照片與聯絡方式就上線。手機好看，搜尋引擎與 AI 都讀得懂。',
    quota: '年約贈送・Max 方案含每月維護',
    includes: ['精選響應式版型', '基礎 SEO 與結構化資料', 'LINE、表單詢問導流'],
    fit: '還沒有官網，或官網已經太舊的品牌',
  },
];

export type Plan = {
  key: PlanKey;
  name: string;
  en: string;
  price: number;
  unit: string;
  tagline: string;
  items: [string, string][];
  perks: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    key: 'trial', name: 'Lite', en: '入門', price: 9800, unit: '一次・一個月',
    tagline: '先看成品，再決定要不要訂閱。',
    items: [['社群圖文貼文', '4 則'], ['AI 短影音', '2 支'], ['SEO／AI 搜尋文章', '1 篇'], ['品牌健檢與方向建議', '1 份']],
    perks: ['每個品牌限一次', '14 天內簽約，費用全額折抵首月'],
  },
  {
    key: 'standard', name: 'Pro', en: '標準', price: 29800, unit: '／月', featured: true,
    tagline: '一個小編的價格，整組 AI 團隊的產量。',
    items: [['社群圖文貼文', '12 則'], ['AI 短影音', '6 支'], ['SEO／AI 搜尋文章', '2 篇'], ['FB、IG 排程代發', '包含'], ['每月成效月報', '包含']],
    perks: ['年約贈送公版官網', '新技術免費升級'],
  },
  {
    key: 'growth', name: 'Max', en: '全方位', price: 59800, unit: '／月',
    tagline: '內容、電商、網站一起推進。',
    items: [['社群圖文貼文', '24 則'], ['AI 短影音', '14 支'], ['SEO／AI 搜尋文章', '4 篇'], ['電商商品圖文', '5 個品項'], ['網站優化', '10 頁'], ['月報＋雙週線上會議', '包含']],
    perks: ['年約贈送公版官網，含每月維護', '新技術免費升級'],
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
    key: 'drama', name: '狗血劇商品介紹', price: 3500, market: 30000, marketNote: '外面找演員、場地拍一支劇情短片',
    pitch: '婆媳、霸總、逆襲反轉，用 AI 演出讓人停下來看完的劇情，最後自然帶出你的商品。',
    includes: ['劇情腳本與分鏡', 'AI 角色演出與場景', '字幕、配樂，直式交付'],
    fit: '想讓商品被大量轉傳、被記住的品牌',
  },
];

/** 老闆的痛點：為什麼要跟我們合作。href 指向對應的價格。
 *  thumb 是排隊時的小圖、image 是輪到它放大後換上的大圖（放在 public/，沒有就用色塊）。 */
export type Pain = { tag: string; title: string; body: string; href?: string; video?: Video['key']; thumb?: string; image?: string };
export const pains: Pain[] = [
  { tag: 'AI 剪片', title: '熱門話題等剪完，熱度早就沒了', body: '請一位專職剪輯，又沒有足夠的片量讓他天天剪。交給 AI 剪片，素材丟進來很快就出片，趁話題還熱就上架。', video: 'edit', thumb: '/home/pains/thumbs/ai-edit.webp', image: '/home/pains/ai-edit.webp' },
  { tag: 'AI 數字人', title: '老闆不好意思露臉', body: '讓大量 AI 數字人幫你介紹、推薦商品。不同人物、不同口吻，打進不同客群。', video: 'ugc', thumb: '/home/pains/thumbs/digital-human.webp', image: '/home/pains/digital-human.webp' },
  { tag: '狗血劇商品介紹', title: 'AI 短劇正在佔滿大家的碎片時間', body: '別在這波熱潮脫隊。讓霸總拯救少女的時候，順手置入你的品牌商品。', video: 'drama', thumb: '/home/pains/thumbs/drama.webp', image: '/home/pains/drama.webp' },
  { tag: '真人推薦影片', title: '網友買東西，先看評價', body: '我們安排各種不同身分的真實素人，拍攝你的品牌商品，留下真實的使用心得。', href: '#contact', thumb: '/home/pains/thumbs/real-review.webp', image: '/home/pains/real-review.webp' },
  { tag: '網站優化', title: '廣告、KOL 把人帶進賣場，客人卻走了', body: '看不懂你在賣什麼、文不對題、圖也不好看。我們把網站內容改到客人看得懂、願意買。', href: '#offer-optimize', thumb: '/home/pains/thumbs/store-optimization.webp', image: '/home/pains/store-optimization.webp' },
];

export type Pack = { key: ServiceKey; qty: string; price: number; per: string };

/** 其他服務單買套組：只賣整包，單價高於訂閱，讓訂閱更划算。 */
export const packs: Pack[] = [
  { key: 'posts', qty: '20 則', price: 28000, per: '每則 NT$1,400' },
  { key: 'article', qty: '6 篇', price: 12000, per: '每篇 NT$2,000' },
  { key: 'ecommerce', qty: '10 個品項', price: 32000, per: '每品項 NT$3,200' },
  { key: 'optimize', qty: '20 頁', price: 30000, per: '每頁 NT$1,500' },
  { key: 'website', qty: '1 套', price: 48000, per: '年約訂閱免費送' },
];

export const packRules = ['只賣整包，不拆單件', '一次付清，每件含一次修改', '不含排程代發與月報'];


export const compareRows: [string, string, string][] = [
  ['每月成本', '約 NT$35,000（月薪加勞健保）', 'NT$29,800'],
  ['每月產量', '看個人能力與狀態', '20 件內容，固定交付'],
  ['短影音、數字人', '通常要另外外包', '包含'],
  ['SEO 文章、月報', '很少做', '包含'],
  ['請假、離職', '內容跟著停', '不中斷'],
  ['新的 AI 技術', '要自己摸索', '自動升級，不加價'],
];

/** 幫我配方案：需求對應到要做的影片或服務。 */
export type FinderItem = Video['key'] | Exclude<ServiceKey, 'video'>;
export const finderGroups: { label: string; options: { label: string; items: FinderItem[] }[] }[] = [
  {
    label: '社群經營',
    options: [
      { label: '粉專想固定更新', items: ['posts', 'edit'] },
      { label: '沒有人手做貼文', items: ['posts'] },
      { label: '熱門話題想趕快出片', items: ['edit'] },
      { label: '老闆不想露臉', items: ['ugc'] },
    ],
  },
  {
    label: '商品銷售',
    options: [
      { label: '新品上市需要介紹片', items: ['ugc', 'drama'] },
      { label: '想讓商品被大量轉傳', items: ['drama'] },
      { label: '電商主圖、詳情頁要重做', items: ['ecommerce'] },
      { label: '商品很多，素材做不完', items: ['ecommerce', 'posts'] },
    ],
  },
  {
    label: '搜尋曝光',
    options: [
      { label: '想讓 Google 和 AI 找得到', items: ['article', 'optimize'] },
      { label: '客人進了賣場卻沒買', items: ['optimize'] },
      { label: '還沒有官網', items: ['website'] },
      { label: '官網太舊想翻新', items: ['website', 'optimize'] },
    ],
  },
];

export const steps = [
  { title: '先試 Lite', body: 'NT$9,800 做一個月，先看成品，再決定要不要訂閱。' },
  { title: '選方案', body: 'Pro 或 Max，季約、年約同價。14 天內簽約，Lite 費用折抵首月。' },
  { title: '每月排程', body: '月初確認主題與份量，依排程交付，圖文直接代發。' },
  { title: '月報調整', body: '看數據、調方向；有新的 AI 技術，直接用在你的內容上。' },
];

/** 常見問題：依主題分組；經銷那題要放最後，元件會接上經銷頁連結。 */
export type Faq = { q: string; a: string; link?: { href: string; label: string } };
export const faqGroups: { label: string; items: Faq[] }[] = [
  {
    label: '影片與價格',
    items: [
      { q: '影片一支多少錢？', a: 'AI 剪片 NT$300、AI 數字人 NT$2,000、狗血劇商品介紹 NT$3,500，都是每支的價格，未稅。同一批影片會沿用同一組角色、風格與品牌調性，所以每種影片一次 10 支起訂。', link: { href: '#why', label: '看影片價格' } },
      { q: '外面行情是怎麼算的？', a: '我們拿一般外包製作一支同類型影片的參考價來比較，例如請人剪一支短影音、找人出鏡拍商品介紹、找演員和場地拍劇情短片。實際行情依廠商而異，只是讓你知道差距有多大。' },
      { q: '可以只買一種服務嗎？', a: '可以。社群圖文、SEO 文章、電商商品圖文、網站優化、公版官網都能整包單買，例如社群圖文 20 則 NT$28,000。只賣整包、不拆單件，每件含一次修改。', link: { href: '#other', label: '看其他服務' } },
      { q: '包月方案多少錢？', a: 'Lite NT$9,800（一次、一個月）、Pro NT$29,800／月、Max NT$59,800／月，未稅。全台統一價格，季約、年約同價，不議價也不打折；年約加贈公版官網。', link: { href: '#plans', label: '看包月方案' } },
      { q: '單買和包月怎麼選？', a: '只有一項需求，單買最簡單。想做的不只一樣、而且每個月都有需求，包月的單價低很多，還包含排程代發和月報。不確定的話，先用 Lite 試一個月。', link: { href: '#finder', label: '幫我配方案' } },
    ],
  },
  {
    label: '合作方式',
    items: [
      { q: 'Lite 之後一定要包月嗎？', a: '不用。Lite 就是讓你先看成品。如果滿意，14 天內簽約，Lite 費用全額折抵首月。' },
      { q: '和請一個小編差在哪？', a: '價格比一位小編的月薪加勞健保更低，但每月產量固定，還包含短影音、SEO 文章與月報。不會因為請假或離職而停更，新的 AI 技術也會直接升級到你的方案裡。', link: { href: '#compare', label: '看比較' } },
      { q: '我需要準備什麼？', a: '品牌資料、商品照片和你想講的重點就夠了。腳本、AI 製作、剪輯、字幕都由我們處理，每一件成品都由專人檢查後才交付。' },
      { q: '有包含留言、私訊回覆嗎？', a: '不包含。留言、私訊與客服需要即時的人力，我們專注在內容產出，才能把價格壓到最低。廣告投放代操可以另外加購。' },
      { q: '可以完全客製嗎？', a: '我們的方案以 AI 與公版流程為主，才能維持低價。實拍、完全客製與網紅合作需另外報價，費用明顯較高，且每月只承接少量案件。' },
    ],
  },
  {
    label: 'AI 與授權',
    items: [
      { q: 'A.C.E. 是什麼？', a: 'A.C.E.（AI · Creative · Execution）是金曜石國際（LUXKEY）的 AI 創意行銷品牌。用 AI 做品牌影音、社群圖文、搜尋文章與網站，可以單次訂購，也可以包月。' },
      { q: 'AI 做的影片看得出來嗎？', a: '看得出來是 AI 製作沒關係，重點是內容有沒有人看、有沒有帶來詢問。我們會控制角色、口吻和品牌調性，讓每一支都像同一個品牌在說話。' },
      { q: 'AI 做的影片和圖片可以商業使用嗎？', a: '交付的成品可供你的品牌商業使用，例如社群、廣告與官網。實際授權範圍會在合約中寫清楚。' },
      { q: '我是行銷公司或顧問，可以經銷合作嗎？', a: '可以。全台同一價格，經銷商賣同一套服務，依成交抽成。合作方式請看經銷合作頁面。', link: { href: '/introduce/', label: '看經銷合作' } },
    ],
  },
];
export const faqs: Faq[] = faqGroups.flatMap(g => g.items);
