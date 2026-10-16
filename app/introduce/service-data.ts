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

const serviceOrder = ['digital-human', 'ai-video', 'website-optimization', 'online-course', 'real-video', 'creator-campaign', 'web-system'];

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
    cardImageAlt: '數字人短影音成品組合',
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
    eyebrow: '05 / 真實到場拍攝',
    headline: '一次拍夠，一個月都有影片可發。',
    intro: '產品、店面、服務流程真的拍給客戶看。從題目、拍攝到剪輯同一團隊完成，省掉老闆分頭找人。',
    image: '/dealer/real-video.webp',
    imageAlt: '攝影團隊在烘焙店拍攝店主製作與介紹商品的工作現場',
    cardImage: '/dealer/cards/real-video.webp',
    cardImageAlt: '實拍短影音成品組合',
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
    eyebrow: '02 / 一個製片 × 一組 AI 專員',
    headline: '一個製片，帶一整組 AI 專員。',
    intro: '給我們少量商品照片或貼紙圖，就能用 AI 動畫、Remotion 動態設計與 3D 效果組成有聲短片；旁白也能用 AI 人聲製作。',
    image: '/dealer/ai-video.webp',
    imageAlt: '五種 AI 製片畫面並列：白板手繪、平面口播、品牌動態、科技字卡與產品簡報',
    cardImage: '/dealer/cards/ai-video.webp',
    cardImageAlt: 'AI 製片完成的短影音成品組合',
    heroImage: '/dealer/ai-video-hero.webp',
    heroImageAlt: '工程師剪貼少量紙片、貼紙與積木，組成有趣的直式簡報影片',
    demoIntro: '用商品照片、貼紙圖、AI 動畫、動態排版與 3D 畫面，做成有 AI 人聲的短片。',
    priceLine: '4 支 NT$12,800 起',
    priceNote: '少量客供照片即可啟動・未稅參考價',
    options: [
      {name: 'AI 動態短片', price: 'NT$12,800', unit: '／4 支', detail: '少量客戶照片、貼紙圖，就能組合成有 AI 人聲的動畫短片。', includes: ['4 支 9:16、15–30 秒成片', '用客供照片、貼紙圖結合 AI 動畫、Remotion 動態排版及適合主題的 3D 效果', 'AI 人聲旁白、字幕、配樂、封面與必要的補畫面', '每支 1 次集中修改']},
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
    slug: 'web-system',
    nav: '網站／系統',
    eyebrow: '07 / 網站與專案系統',
    headline: '原本一群人追的工作，系統做好，兩人就能管。',
    intro: '訂單、報名、交接與進度集中在一套流程裡。老闆看得見，兩個人接得住；員工換了，工作方法也留在系統中。',
    image: '/dealer/web-system.webp',
    imageAlt: '原本六人手工傳單追進度，導入專案系統後兩人操作即可掌握流程',
    cardImage: '/dealer/cards/web-system.webp',
    cardImageAlt: '已上線的網站與系統介面',
    demoIntro: '看訂單、報到與交接流程，如何從多人手工處理變成兩人掌握。',
    priceLine: '網站 NT$38,000 起',
    priceNote: '專案系統 NT$50,000 起・未稅',
    options: [
      {name: '銷售型網站', price: 'NT$38,000 起', unit: '／案', detail: '把產品、優勢與詢問入口集中在一頁。', includes: ['一頁式響應式銷售網站', '最多 6 個內容區塊與 1 個聯絡導流', '客供素材整理與基礎 SEO 設定', '1 次上線協助與 2 次集中修改']},
      {name: '專案型軟體', price: 'NT$50,000 起', unit: '／案', detail: '把原本靠多人交接的工作，做成兩人也能掌握的流程。', includes: ['1 個核心流程的網頁軟體首版', '主要頁面、使用角色與資料串接範圍依需求報價', '部署、操作教學與流程交接文件']},
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
    slug: 'online-course',
    nav: '專屬線上課程',
    eyebrow: '04 / 製作專屬線上課程',
    headline: '把你的專業，做成能反覆觀看的課程。',
    intro: '從講稿、畫面素材到分集成片，讓專業知識變成可上架、可交付的線上課程。',
    image: '/dealer/cards/online-course.webp',
    imageAlt: '平板展示整套線上課程單元，手機播放完成的課程影片',
    cardImage: '/dealer/cards/online-course.webp',
    cardImageAlt: '已完成的線上課程影片與單元列表',
    priceLine: 'NT$35,000 起',
    priceNote: '11 集內或 25 集內兩種方案・未稅',
    options: [
      {name: '自己講・11 集內', price: 'NT$35,000', unit: '／套', detail: '你寫好講稿、錄好自己的聲音，我們把課程做成影片。', includes: ['最多 11 集，每集 3 分鐘內的課程影片', '客戶提供講稿、聲音錄音與核心資料', '依資料製作基本簡報、圖卡與課程封面', '影片剪輯、字幕、配樂與單元整理']},
      {name: 'AI 配音・25 集內', price: 'NT$55,000', unit: '／套', detail: '給課程主題和專業資料，我們代寫講稿、製作素材並以 AI 人聲配音。', includes: ['最多 25 集，每集 3 分鐘內的課程影片', '依客戶提供的知識資料規劃分集並代寫講稿', '製作簡報圖卡、示意素材與課程封面', 'AI 人聲配音、影片剪輯、字幕與配樂']},
    ],
    notices: ['價格以每集 3 分鐘內、單一課程主題為基礎；超出集數、長度或特殊動畫需求另行報價。', '自己聲音方案由客戶提供可用的錄音檔；AI 配音方案使用一般 AI 人聲，不含聲音複製。', '講稿與專業內容由客戶確認正確性；影片交付格式與修改次數依正式報價確認。'],
    reasons: [
      {title: '專業一次整理成套', body: '從零散知識變成有順序的課程單元。'},
      {title: '聲音方式自由選', body: '可用自己錄好的聲音，或選 AI 人聲配音。'},
      {title: '交付可上架影片', body: '課程封面、字幕與影片一次備齊。'},
    ],
    steps: ['提供課程主題與資料', '確認分集和講稿', '製作素材、配音與成片'],
    cases: [],
  },
  {
    slug: 'website-optimization',
    nav: '網站優化',
    eyebrow: '03 / 官方網站優化',
    headline: '讓官方網站更會接單。',
    intro: '把既有官網的主視覺、商品重點與行動入口重新整理，讓客戶看得懂、願意往下看，也更容易留下詢問。',
    image: '/dealer/cards/website-optimization.webp',
    imageAlt: '網站優化前後的完成頁面對照',
    cardImage: '/dealer/cards/website-optimization.webp',
    cardImageAlt: '網站優化前後的完成頁面對照',
    priceLine: '商品內文 NT$2,000 起',
    priceNote: '網站商品內文每品項 NT$2,000 起；官網頁面優化另估',
    options: [
      {name: '網站商品內文優化', price: 'NT$2,000 起', unit: '／品項', detail: '把商品頁原有文字改得更好懂、更能凸顯賣點。', includes: ['整理客供商品資料與現有內文', '重寫商品標題、重點賣點與購買引導文字', '實際字數與頁面上稿需求依品項報價']},
      {name: '官方網站頁面優化', price: '專案報價', unit: '／案', detail: '針對已上線官網，優化最需要成交的頁面。', includes: ['首頁或指定頁面的訊息與版面優化', '商品賣點、行動入口與閱讀順序調整', '手機與桌機的響應式檢查', '範圍、頁數與素材整理依正式報價確認']},
    ],
    reasons: [],
    steps: [],
    cases: [],
  },
  {
    slug: 'creator-campaign',
    nav: '網紅行銷',
    eyebrow: '06 / 網紅行銷專案合作',
    headline: '讓更多人分享你的商品',
    intro: '由合適的創作者帶來真實使用者視角與新受眾。從人選、題目、合作到交付，一個窗口管理。',
    image: '/dealer/creator-campaign.webp',
    imageAlt: '多位創作者在拍攝現場開箱、示範並介紹商品',
    cardImage: '/dealer/cards/creator-campaign.webp',
    cardImageAlt: '網紅行銷完成的社群短影音成品',
    priceLine: '口碑開箱 5 位 NT$18,000 起',
    priceNote: '網紅曝光 3–5 位 NT$100,000／組・未稅',
    accent: 'orange' as const,
    options: [
      {name: '口碑開箱 5 人組', price: 'NT$18,000', unit: '／5 支', detail: '不同生活角度的真實口碑，每人 1 支。', includes: ['每支 NT$3,600，粉絲約 1,000–3,000 人', '人選媒合、拍攝與交付管理', '影片發布於品牌官方帳號', '可用於廣告、官網與電商頁等商業用途']},
      {name: '口碑開箱 10 人組', price: 'NT$30,000', unit: '／10 支', detail: '一次取得十種真實使用者視角。', includes: ['每支 NT$3,000，粉絲約 1,000–3,000 人', '人選媒合、拍攝與交付管理', '影片發布於品牌官方帳號', '可用於廣告、官網與電商頁等商業用途']},
      {name: '網紅曝光合作', price: 'NT$100,000', unit: '／組 3–5 位', detail: '新品上市時，由創作者帳號直接帶來曝光。', includes: ['粉絲數 1 萬–20 萬的人選媒合', '依產品挑選 3–5 位創作者', '拍攝、發布到結案全程代辦', '影片發布於創作者自己的帳號']},
    ],
    notices: ['口碑開箱與網紅曝光均為單次計價；產品由品牌方提供。', '口碑開箱成片發布於品牌官方帳號，可作商業使用；網紅曝光內容發布於創作者帳號。', '實際人選、合作檔期與授權範圍，以正式報價與確認內容為準。', '簽約時先付一半，第二個月付另一半，另加 5% 稅。'],
    reasons: [
      {title: '人選一次找齊', body: '依產品受眾挑選合作方向與內容形式。'},
      {title: '內容有人追', body: '統一管理腳本重點、檔期與交付。'},
      {title: '口碑與曝光分開買', body: '依目標選擇素材授權或創作者帳號曝光，預算與期待清楚分開。'},
    ],
    steps: ['說明產品與目標受眾', '確認人選、授權及正式報價', '發布、驗收與成果彙整'],
    cases: [
      {src: '/dealer/simulated/creator-campaign-vertical.webp', title: '開箱分享視角', description: '用日常分享方式讓商品被看見。'},
      {src: '/dealer/simulated/creator-campaign-2.webp', title: '創作者居家開箱', description: '人物入鏡，展現使用情境。'},
      {src: '/dealer/simulated/creator-campaign-3.webp', title: '創作者商品介紹', description: '由創作者示範商品細節。'},
    ],
  },
].sort((a, b) => serviceOrder.indexOf(a.slug) - serviceOrder.indexOf(b.slug));

export function getDealerService(slug: string) {
  return dealerServices.find(service => service.slug === slug);
}
