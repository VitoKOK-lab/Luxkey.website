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
};

export const services: Service[] = [
  {
    key: 'posts', name: '社群圖文貼文', short: '每週固定更新，粉專不再斷更',
    pitch: '依品牌調性規劃主題，AI 產圖、文案與排版一次完成，排程代發到 FB、IG，你只要看稿。',
    quota: '標準每月 12 則・成長每月 24 則',
    includes: ['每月主題規劃', 'AI 圖像、文案與品牌排版', 'FB、IG 排程代發'],
    fit: '粉專需要固定更新、但沒有人手的品牌',
  },
  {
    key: 'video', name: 'AI 短影音', short: '剪輯、數字人、商品片、劇情短片任選',
    pitch: '不用約拍、不用出鏡。拍好的素材幫你剪，沒有素材就用數字人或商品照做成影片，每月依需求換著用。',
    quota: '標準每月 6 支・成長每月 14 支',
    includes: ['AI 剪輯：送素材就能出片', 'AI 數字人口播：換腳本就能量產', '商品介紹片、劇情短片'],
    fit: '想經營短影音、但不想一直拍攝出鏡的品牌',
  },
  {
    key: 'article', name: 'SEO／AI 搜尋文章', short: '讓 Google 和 AI 都找得到你',
    pitch: '依客人會搜尋的問題寫成文章，結構清楚、重點明確，Google 搜尋與 ChatGPT 這類 AI 搜尋都讀得懂。',
    quota: '標準每月 2 篇・成長每月 4 篇',
    includes: ['關鍵字與客人提問研究', '可直接上架的完整文章', '標題、摘要與結構化重點'],
    fit: '想靠搜尋帶來穩定詢問的品牌',
  },
  {
    key: 'ecommerce', name: '電商商品圖文', short: '主圖、情境圖、詳情頁一次做好',
    pitch: '換上商品照與賣點，AI 生成情境圖並套上品牌版型，商品再多也做得完。',
    quota: '成長方案每月 5 個品項',
    includes: ['商品主圖與 AI 情境圖', '詳情頁圖文', '活動視覺'],
    fit: '品項多、需要大量上架素材的電商',
  },
  {
    key: 'optimize', name: '網站優化', short: '舊網站不用重做，內容先變好',
    pitch: '改寫商品與服務頁的內文、補上 SEO 與結構化資料，讓現有網站更容易被搜尋、也更容易成交。',
    quota: '成長方案每月 10 頁或品項',
    includes: ['頁面與商品內文改寫', 'SEO 標題與描述', 'AI 搜尋結構化資料'],
    fit: '已經有網站、但沒人看也沒詢問的品牌',
  },
  {
    key: 'website', name: '公版官網', short: '年約直接送，不另外收費',
    pitch: '從精選版型挑一款，換上你的文字、照片與聯絡方式就上線。手機好看，搜尋引擎與 AI 都讀得懂。',
    quota: '年約贈送・成長方案含每月維護',
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
    key: 'trial', name: '嚐鮮', en: 'TRIAL', price: 9800, unit: '一次・一個月',
    tagline: '先看成品，再決定要不要訂閱。',
    items: [['社群圖文貼文', '4 則'], ['AI 短影音', '2 支'], ['SEO／AI 搜尋文章', '1 篇'], ['品牌健檢與方向建議', '1 份']],
    perks: ['每個品牌限一次', '14 天內簽約，費用全額折抵首月'],
  },
  {
    key: 'standard', name: '標準', en: 'STANDARD', price: 29800, unit: '／月', featured: true,
    tagline: '一個小編的價格，整組 AI 團隊的產量。',
    items: [['社群圖文貼文', '12 則'], ['AI 短影音', '6 支'], ['SEO／AI 搜尋文章', '2 篇'], ['FB、IG 排程代發', '包含'], ['每月成效月報', '包含']],
    perks: ['年約贈送公版官網', '新技術免費升級'],
  },
  {
    key: 'growth', name: '成長', en: 'GROWTH', price: 59800, unit: '／月',
    tagline: '內容、電商、網站一起推進。',
    items: [['社群圖文貼文', '24 則'], ['AI 短影音', '14 支'], ['SEO／AI 搜尋文章', '4 篇'], ['電商商品圖文', '5 個品項'], ['網站優化', '10 頁'], ['月報＋雙週線上會議', '包含']],
    perks: ['年約贈送公版官網，含每月維護', '新技術免費升級'],
  },
];

export const planRules = [
  { title: '份量可以互換', body: '1 支短影音 = 3 則圖文 = 2 篇文章。這個月想多做影片、下個月想多寫文章，直接換。' },
  { title: '每件修改一次', body: '每件成品含一次集中修改，先看首版、一次說清楚，交付最快。' },
  { title: '當月額度當月用', body: '額度不累積到下個月，產能才排得準，每個月都準時交付。' },
];

export const planExcluded = ['留言、私訊回覆與客服', '廣告投放代操（可加購）', '實拍、完全客製、網紅合作（另外報價）'];

export const compareRows: [string, string, string][] = [
  ['每月成本', '約 NT$35,000（月薪加勞健保）', 'NT$29,800'],
  ['每月產量', '看個人能力與狀態', '20 件內容，固定交付'],
  ['短影音、數字人', '通常要另外外包', '包含'],
  ['SEO 文章、月報', '很少做', '包含'],
  ['請假、離職', '內容跟著停', '不中斷'],
  ['新的 AI 技術', '要自己摸索', '自動升級，不加價'],
];

export const finderGroups: { label: string; options: { label: string; services: ServiceKey[] }[] }[] = [
  {
    label: '社群經營',
    options: [
      { label: '粉專想固定更新', services: ['posts', 'video'] },
      { label: '沒有人手做貼文', services: ['posts'] },
      { label: '想做短影音、不想出鏡', services: ['video'] },
      { label: '老闆想建立個人品牌', services: ['video', 'posts'] },
    ],
  },
  {
    label: '商品銷售',
    options: [
      { label: '新品上市需要介紹片', services: ['video'] },
      { label: '電商主圖、詳情頁要重做', services: ['ecommerce'] },
      { label: '商品很多，素材做不完', services: ['ecommerce', 'posts'] },
    ],
  },
  {
    label: '搜尋曝光',
    options: [
      { label: '想讓 Google 和 AI 找得到', services: ['article', 'optimize'] },
      { label: '網站有了，但沒人看', services: ['optimize', 'article'] },
      { label: '還沒有官網', services: ['website'] },
      { label: '官網太舊想翻新', services: ['website', 'optimize'] },
    ],
  },
];

export const steps = [
  { title: '先嚐鮮', body: 'NT$9,800 做一個月，先看成品，再決定要不要訂閱。' },
  { title: '選方案', body: '標準或成長，季約、年約同價。14 天內簽約，嚐鮮費用折抵首月。' },
  { title: '每月排程', body: '月初確認主題與份量，依排程交付，圖文直接代發。' },
  { title: '月報調整', body: '看數據、調方向；有新的 AI 技術，直接用在你的內容上。' },
];

export const faqs = [
  { q: 'A.C.E. 是什麼？', a: 'A.C.E.（AI · Creative · Execution）是金曜石國際（LUXKEY）的 AI 創意行銷品牌。我們用月費訂閱的方式，每月固定替品牌產出社群圖文、短影音、搜尋文章，並優化網站。' },
  { q: '方案多少錢？', a: '嚐鮮 NT$9,800（一次、一個月）、標準 NT$29,800／月、成長 NT$59,800／月，以上價格未稅。全台統一價格，季約、年約同價，不議價也不打折；年約加贈公版官網。' },
  { q: '和請一個小編差在哪？', a: '價格比一位小編的月薪加勞健保更低，但每月產量固定，還包含短影音、SEO 文章與月報。不會因為請假或離職而停更，新的 AI 技術也會直接升級到你的方案裡。' },
  { q: '嚐鮮之後一定要訂閱嗎？', a: '不用。嚐鮮就是讓你先看成品。如果滿意，14 天內簽約，嚐鮮費用全額折抵首月。' },
  { q: '有包含留言、私訊回覆嗎？', a: '不包含。留言、私訊與客服需要即時的人力，我們專注在內容產出，才能把價格壓到最低。廣告投放代操可以另外加購。' },
  { q: '可以完全客製嗎？', a: '我們的方案以 AI 與公版流程為主，才能維持低價。實拍、完全客製與網紅合作需另外報價，費用明顯較高，且每月只承接少量案件。' },
  { q: '我不懂 AI，也能合作嗎？', a: '可以。你只需要提供品牌資料、商品照片與想法，AI 工具與製作流程由我們處理，每一件成品都由專人檢查後才交付。' },
  { q: 'AI 做的影片和圖片可以商業使用嗎？', a: '交付的成品可供你的品牌商業使用，例如社群、廣告與官網。實際授權範圍會在合約中寫清楚。' },
  { q: '我是行銷公司或顧問，可以經銷合作嗎？', a: '可以。經銷合作方式請看經銷合作頁面。' },
];
