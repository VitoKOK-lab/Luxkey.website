export type DealerOption = {
  name: string;
  price: string;
  unit: string;
  detail: string;
  includes: string[];
};

export type DealerCase = {
  src: string;
  title: string;
  description: string;
  overlay?: string;
};

export type DealerService = {
  slug: string;
  nav: string;
  eyebrow: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  cardImage?: string;
  cardImageAlt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  demoIntro?: string;
  priceLine: string;
  priceNote: string;
  accent?: 'orange';
  options: DealerOption[];
  notices?: string[];
  reasons: {title: string; body: string}[];
  steps: string[];
  cases: DealerCase[];
};

export const dealerServices: DealerService[] = [
  {
    slug: 'digital-human',
    nav: '數字人',
    eyebrow: '01 / AI 數字人短影音',
    headline: '超級名模來幫你賣貨',
    intro: '打造專屬 AI 虛擬名模，持續介紹產品、回答常見問題、更新活動。老闆給重點，我們交付能發布的直式影片。',
    image: '/dealer/digital-human.webp',
    imageAlt: '品牌數字人介紹產品，製作團隊正在拍攝現場工作',
    cardImage: '/dealer/cards/digital-human.webp',
    cardImageAlt: '虛擬名模示範介紹商品的影片製作現場',
    priceLine: '年約 NT$28,000／月',
    priceNote: '每月 10 支・NT$2,800／支・未稅',
    options: [
      {name: '季約數字人', price: 'NT$35,000', unit: '／月 10 支', detail: '先用三個月穩定測試內容與角色。', includes: ['每支 NT$3,500，30–90 秒直式影片', '首次專屬數字人建置免費', '腳本、口播、字幕與配樂', '固定 1 人物、1 場景、1 套服裝']},
      {name: '半年約數字人', price: 'NT$33,000', unit: '／月 10 支', detail: '持續累積能發布的影片題材。', includes: ['每支 NT$3,300，30–90 秒直式影片', '專屬數字人持續製作', '腳本、口播、字幕與配樂', '固定 1 人物、1 場景、1 套服裝']},
      {name: '年約數字人', price: 'NT$28,000', unit: '／月 10 支', detail: '長期更新的最低單支價格。', includes: ['每支 NT$2,800，30–90 秒直式影片', '專屬數字人持續製作', '腳本、口播、字幕與配樂', '固定 1 人物、1 場景、1 套服裝']},
      {name: '數字人先試做', price: 'NT$4,500', unit: '／支', detail: '先看影片品質；正式簽約可全額折抵。', includes: ['1 支 30–90 秒直式影片', '確認角色與口播呈現方式', '試做用於確認品質，不作成效承諾']},
    ],
    notices: ['數字人最少簽一季；可選季約、半年約或年約，以上均為每月價格。', '每支免費修改 2 次，僅限文字與字幕調整；第 3 次起 NT$800／次。', '數字人更換角色 NT$1,500；固定人物、場景與服裝，換場景另行報價。', '簽約時先付一半，第二個月付另一半，另加 5% 稅。', '成片可供品牌商業使用；如需代發與成效回報，可加購每月 NT$10,000／10 支。'],
    reasons: [
      {title: '不必反覆約拍', body: '提供產品資訊與素材，便能持續產出新主題。'},
      {title: '形象維持一致', body: '同一角色和版型，讓品牌更容易被記住。'},
      {title: '拿到就能發布', body: '交付完整直式成片，不只是一個數字人檔案。'},
    ],
    steps: ['給產品資料與角色方向', '確認腳本和示範畫面', '製作、審稿、交付影片'],
    cases: [
      {src: '/dealer/simulated/digital-human-vertical.webp', title: '保養品介紹', description: '固定角色，介紹商品特色。'},
      {src: '/dealer/simulated/digital-human-2.webp', title: '咖啡新品介紹', description: '換一個商品，延續同一種口播形式。'},
      {src: '/dealer/simulated/digital-human-3.webp', title: '工具操作介紹', description: '把功能說清楚，直接給客戶看。'},
    ],
  },
  {
    slug: 'real-video',
    nav: '實拍短影音',
    eyebrow: '02 / 真實到場拍攝',
    headline: '一次拍夠，一個月都有影片可發。',
    intro: '產品、店面、服務流程真的拍給客戶看。從題目、拍攝到剪輯同一團隊完成，省掉老闆分頭找人。',
    image: '/dealer/real-video.webp',
    imageAlt: '攝影團隊在烘焙店拍攝店主製作與介紹商品的工作現場',
    cardImage: '/dealer/cards/real-video.webp',
    cardImageAlt: '攝影師在烘焙店拍攝店主製作麵包',
    priceLine: '年約 NT$50,000／月',
    priceNote: '每月 10 支・NT$5,000／支・未稅',
    options: [
      {name: '季約實拍', price: 'NT$60,000', unit: '／月 10 支', detail: '老闆真人出鏡，藏鏡人引導，自然回答不用背稿。', includes: ['每支 NT$6,000，30–90 秒直式影片', '每月 1 整天或分 2 天拍攝完成', '腳本、拍攝、剪輯、字幕與配樂', '場景可依拍攝安排變化']},
      {name: '半年約實拍', price: 'NT$57,000', unit: '／月 10 支', detail: '一次安排，持續有影片可發布。', includes: ['每支 NT$5,700，30–90 秒直式影片', '每月 1 整天或分 2 天拍攝完成', '腳本、拍攝、剪輯、字幕與配樂', '場景可依拍攝安排變化']},
      {name: '年約實拍', price: 'NT$50,000', unit: '／月 10 支', detail: '長期實拍的最低單支價格。', includes: ['每支 NT$5,000，30–90 秒直式影片', '每月 1 整天或分 2 天拍攝完成', '腳本、拍攝、剪輯、字幕與配樂', '場景可依拍攝安排變化']},
      {name: '實拍先試做', price: 'NT$10,000', unit: '／支', detail: '先看影片品質；正式簽約可全額折抵。', includes: ['1 支 30–90 秒直式影片', '藏鏡人提問與拍攝引導', '試做用於確認品質，不作成效承諾']},
    ],
    notices: ['實拍最少簽一季；可選季約、半年約或年約，以上均為每月價格。', '每月拍攝 1 整天或分 2 天完成；服務範圍外的車馬費另計。', '每支免費修改 2 次，僅限文字與字幕調整；重拍另行報價。', '簽約時先付一半，第二個月付另一半，另加 5% 稅。', '成片可供品牌商業使用；如需代發與成效回報，可加購每月 NT$10,000／10 支。'],
    reasons: [
      {title: '真實產品真實現場', body: '商品細節、店面與製作過程由鏡頭直接證明。'},
      {title: '一次安排多支內容', body: '集中拍攝，少打斷日常營運。'},
      {title: '拍完就接著剪', body: '從腳本到成片一個窗口負責。'},
    ],
    steps: ['確認產品與拍攝地點', '一次集中拍攝', '剪輯、審稿、交付 4 支'],
    cases: [
      {src: '/dealer/simulated/real-video-vertical.webp', title: '店內商品鏡頭', description: '讓客戶看見真實環境與商品。'},
      {src: '/dealer/simulated/real-video-2.webp', title: '烘焙現場拍攝', description: '把製作過程拍成短影音。'},
      {src: '/dealer/simulated/real-video-3.webp', title: '花店職人介紹', description: '店主入鏡，呈現服務與專業。'},
    ],
  },
  {
    slug: 'ai-video',
    nav: 'AI 製片',
    eyebrow: '03 / 一個製片 × 一組 AI 專員',
    headline: '一個製片，帶一整組 AI 專員。',
    intro: '不用先拍一堆影片。我們超 AI 技術把少量照片做成完整短片：白板手繪、簡報口播、品牌動態、黑底科技字卡，挑適合你的形式。',
    image: '/dealer/ai-video.webp',
    imageAlt: '五種 AI 製片畫面並列：白板手繪、平面口播、品牌動態、科技字卡與產品簡報',
    cardImage: '/dealer/cards/ai-video.webp',
    cardImageAlt: '製片人用少量照片、貼紙與積木組合成動畫短片',
    heroImage: '/dealer/ai-video-hero.webp',
    heroImageAlt: '工程師剪貼少量紙片、貼紙與積木，組成有趣的直式簡報影片',
    demoIntro: '白板、口播簡報、品牌動態、科技字卡都能做；看五種不同的製片方向。',
    priceLine: '4 支 NT$12,800 起',
    priceNote: '少量客供照片即可啟動・未稅參考價',
    options: [
      {name: 'AI 動態短片', price: 'NT$12,800', unit: '／4 支', detail: '用少量素材，做成有節奏的白板、簡報或科技字卡。', includes: ['4 支 9:16、15–30 秒成片', '客供照片動態化、重點圖卡、轉場、字幕與配樂', '開場文案、封面與必要的 AI 補畫面', '每支 1 次集中修改']},
      {name: 'AI 口播製片', price: 'NT$19,800 起', unit: '／4 支', detail: '平面卡通人物口播，帶客戶看完一個完整主題。', includes: ['4 支 9:16、15–30 秒簡報式口播短片', '產品照片動畫、平面卡通角色與口播合成', '腳本、圖卡、剪輯、字幕與配樂', '每支 1 次集中修改；指定角色與特殊授權另估']},
    ],
    reasons: [
      {title: '兩張照片也能開始', body: '先用現有商品照片，不必為了做影片重拍整套素材。'},
      {title: '影片形式由主題決定', body: '白板手繪、簡報口播、品牌動態或科技字卡，挑適合內容的形式。'},
      {title: '一次交付四支', body: '同一批素材拆出多個角度，能連續發布。'},
    ],
    steps: ['給少量素材與產品重點', '確認腳本、製片形式與看板', '審稿後交付直式成片'],
    cases: [
      {src: '/dealer/simulated/ai-video-vertical.webp', title: '白板手繪', description: '線條跟著口播一步步畫出重點。'},
      {src: '/dealer/simulated/ai-video-2.webp', title: '品牌主軸動態', description: '用顏色、動線與圖形做出品牌記憶點。'},
      {src: '/dealer/simulated/ai-video-3.webp', title: '黑底科技字卡', description: '強烈對比與節奏，讓一句話撐起整支片。', overlay: '一個製片，\n帶一整組 AI 專員'},
      {src: '/dealer/simulated/ai-video-4.webp', title: '平面人物口播', description: '卡通角色配簡報圖卡，把產品說清楚。'},
      {src: '/dealer/simulated/ai-video-5.webp', title: '服務簡報動畫', description: '用口播角色、圖表與轉場說明流程。'},
    ],
  },
  {
    slug: 'social-posts',
    nav: '圖文小編',
    eyebrow: '04 / AI 圖文小編',
    headline: 'FB 貼文、IG 連續貼文，整月都有人幫你做。',
    intro: '不用讓小編每天坐在電腦前想破頭、改了又改。產品題目、貼文文案、主圖和 IG 輪播一起排好，分批交付。',
    image: '/dealer/social-posts.webp',
    imageAlt: '小編在電腦前反覆修改貼文，旁邊展示整月已完成的 FB 與 IG 內容',
    cardImage: '/dealer/cards/social-posts.webp',
    cardImageAlt: '小編安排整月社群貼文與圖片',
    demoIntro: '直接看 FB 貼文組、IG 連續貼文，以及整月內容如何一次排好。',
    priceLine: '8 則 NT$16,800／月',
    priceNote: '圖文製作・未稅參考價',
    options: [{
      name: '圖文小編月包',
      price: 'NT$16,800',
      unit: '／月 8 則',
      detail: '每週穩定更新，FB 與 IG 都有內容可發。',
      includes: ['每月 4 則 FB 圖文貼文＋4 組 IG 連續貼文', '每組 IG 輪播最多 4 頁，含文案與圖片', '1 份當月主題與發布月曆', '分 2 批交付，每批 1 次集中修改'],
    }],
    reasons: [
      {title: '題目不用每天重想', body: '產品、促銷、故事與常見問題先排成月曆。'},
      {title: 'FB 與 IG 各有做法', body: 'FB 做清楚的單篇貼文，IG 做可滑的連續貼文。'},
      {title: '少掉反覆改稿', body: '文案和圖一起交，分批確認，老闆只要抓重點。'},
    ],
    steps: ['給品牌和產品資料', '確認月度題目', '分兩批交付圖文'],
    cases: [
      {src: '/dealer/simulated/social-posts-vertical.webp', title: 'FB 一週貼文組', description: '新品、幕後、優惠，用三種題目持續曝光。'},
      {src: '/dealer/simulated/social-posts-2.webp', title: 'IG 連續貼文', description: '同一商品拆成封面、賣點、用法與行動頁。'},
      {src: '/dealer/simulated/social-posts-3.webp', title: '整月內容排程', description: '8 則內容一次排好，分兩批交付。'},
    ],
  },
  {
    slug: 'web-system',
    nav: '網站／系統',
    eyebrow: '05 / 網站與專案系統',
    headline: '原本一群人追的工作，系統做好，兩人就能管。',
    intro: '訂單、報名、交接與進度集中在一套流程裡。老闆看得見，兩個人接得住；員工換了，工作方法也留在系統中。',
    image: '/dealer/web-system.webp',
    imageAlt: '原本六人手工傳單追進度，導入專案系統後兩人操作即可掌握流程',
    cardImage: '/dealer/cards/web-system.webp',
    cardImageAlt: '兩位同事透過訂單管理系統處理工作',
    demoIntro: '看訂單、報到與交接流程，如何從多人手工處理變成兩人掌握。',
    priceLine: '網站 NT$38,000 起',
    priceNote: '專案系統 NT$150,000 起・未稅',
    options: [
      {name: '銷售型網站', price: 'NT$38,000 起', unit: '／案', detail: '把產品、優勢與詢問入口集中在一頁。', includes: ['一頁式響應式銷售網站', '最多 6 個內容區塊與 1 個聯絡導流', '客供素材整理與基礎 SEO 設定', '1 次上線協助與 2 次集中修改']},
      {name: '專案型軟體', price: 'NT$150,000 起', unit: '／案', detail: '把原本靠多人交接的工作，做成兩人也能掌握的流程。', includes: ['1 個核心流程的網頁軟體首版', '最多 5 個主要頁面、2 種使用角色', '1 種約定格式的資料匯入／匯出', '部署、操作教學與流程交接文件']},
    ],
    reasons: [
      {title: '多人工作集中處理', body: '資料、狀態、提醒與下一步放進同一流程，減少人手傳話。'},
      {title: '員工離開，流程還在', body: '把做法和紀錄留在系統，交接不再只靠某個人的記憶。'},
      {title: '先做最有用的一段', body: '從訂單、報名或報到等核心任務開始，快速投入使用。'},
    ],
    steps: ['確認最重要的一件事', '定頁面或系統範圍', '製作、驗收、上線'],
    cases: [
      {src: '/dealer/simulated/web-system-vertical.webp', title: '訂單流程：六人 → 兩人', description: '訂單與進度集中，少掉人工傳單追件。'},
      {src: '/dealer/simulated/web-system-2.webp', title: '報到流程：多人 → 兩人', description: '名單、報到與狀態一起看，現場更好掌握。'},
      {src: '/dealer/simulated/web-system-3.webp', title: '交接流程：人走，方法留下', description: '工作步驟與紀錄留在系統，下一位接得上。'},
    ],
  },
  {
    slug: 'creator-campaign',
    nav: 'KOC／KOL',
    eyebrow: '06 / KOC × KOL 專案合作',
    headline: '讓更多人分享你的商品',
    intro: 'KOC 帶來使用者視角與內容素材；KOL 幫品牌打開新受眾。從人選、題目、合作到交付，一個窗口管理。',
    image: '/dealer/creator-campaign.webp',
    imageAlt: '多位創作者在拍攝現場開箱、示範並介紹商品',
    cardImage: '/dealer/cards/creator-campaign.webp',
    cardImageAlt: '多位創作者使用手機與相機介紹商品',
    priceLine: 'KOC 5 位 NT$18,000 起',
    priceNote: 'KOL 3–5 位 NT$100,000／組・未稅',
    accent: 'orange',
    options: [
      {name: 'KOC 生活開箱 5 人組', price: 'NT$18,000', unit: '／5 支', detail: '不同生活角度的真實口碑，每人 1 支。', includes: ['每支 NT$3,600，粉絲約 1,000–3,000 人', '人選媒合、拍攝與交付管理', '影片發布於品牌官方帳號', '可用於廣告、官網與電商頁等商業用途']},
      {name: 'KOC 生活開箱 10 人組', price: 'NT$30,000', unit: '／10 支', detail: '一次取得十種真實使用者視角。', includes: ['每支 NT$3,000，粉絲約 1,000–3,000 人', '人選媒合、拍攝與交付管理', '影片發布於品牌官方帳號', '可用於廣告、官網與電商頁等商業用途']},
      {name: 'KOL 網紅曝光', price: 'NT$100,000', unit: '／組 3–5 位', detail: '新品上市時，由創作者帳號直接帶來曝光。', includes: ['粉絲數 1 萬–20 萬的人選媒合', '依產品挑選 3–5 位創作者', '拍攝、發布到結案全程代辦', '影片發布於創作者自己的帳號']},
    ],
    notices: ['KOC、KOL 為單次計價；產品由品牌方提供。', 'KOC 成片發布於品牌官方帳號，可作商業使用；KOL 曝光內容發布於創作者帳號。', '實際人選、合作檔期與授權範圍，以正式報價與確認內容為準。', '簽約時先付一半，第二個月付另一半，另加 5% 稅。'],
    reasons: [
      {title: '人選一次找齊', body: '依產品受眾挑選合作方向與內容形式。'},
      {title: '內容有人追', body: '統一管理腳本重點、檔期與交付。'},
      {title: '口碑與曝光分開買', body: 'KOC 與 KOL 的用途、預算和期待不混在一起。'},
    ],
    steps: ['說明產品與目標受眾', '確認人選、授權及正式報價', '發布、驗收與成果彙整'],
    cases: [
      {src: '/dealer/simulated/creator-campaign-vertical.webp', title: 'KOC 開箱視角', description: '用日常分享方式讓商品被看見。'},
      {src: '/dealer/simulated/creator-campaign-2.webp', title: '創作者居家開箱', description: '人物入鏡，展現使用情境。'},
      {src: '/dealer/simulated/creator-campaign-3.webp', title: 'KOL 商品介紹', description: '由創作者示範商品細節。'},
    ],
  },
];

export function getDealerService(slug: string) {
  return dealerServices.find(service => service.slug === slug);
}
