import { videos } from '../_home/home-data';

/** 客人上傳素材的 Google Drive 連結。拿到連結後貼在這裡，頁面上的「上傳素材」按鈕就會亮起來。 */
export const DRIVE_UPLOAD_URL = '';

export type Values = Record<string, string | string[]>;
export type Ctx = { promo: boolean };
export type Field = {
  key: string; label: string; kind: 'text' | 'textarea' | 'single' | 'multi';
  options?: string[]; required?: boolean; placeholder?: string; hint?: string;
  show?: (v: Values, c: Ctx) => boolean;
};
export type Section = { id: string; title: string; hint?: string; show?: (v: Values, c: Ctx) => boolean; fields: Field[] };

/** 方案名稱直接取自首頁方案資料：改名、新增方案時，需求單選項會跟著變。 */
export const planOptions = videos.map(v => `${v.letter} ${v.name}`);
export const hasPlan = (v: Values, letter: string) => ((v.plans as string[] | undefined) ?? []).some(x => x.startsWith(`${letter} `));
const has = (letter: string) => (v: Values) => hasPlan(v, letter);

export const sections: Section[] = [
  {
    id: 'who', title: '1. 基本資料', hint: '我們用這些資料回覆你。',
    fields: [
      { key: 'brand', label: '品牌／公司名稱', kind: 'text', required: true },
      { key: 'name', label: '聯絡人', kind: 'text', required: true },
      { key: 'contact', label: 'LINE ID 或手機', kind: 'text', required: true, hint: '業務會用這個聯絡你' },
      { key: 'email', label: 'Email（選填）', kind: 'text' },
      { key: 'links', label: '官網、社群連結（選填）', kind: 'textarea', placeholder: '官網、IG、FB、抖音，一行一個', hint: '我們會先看過你的品牌，再開始規劃' },
    ],
  },
  {
    id: 'what', title: '2. 想做什麼', hint: '可以複選，不確定的先空著。',
    fields: [
      { key: 'plans', label: '想做的影片', kind: 'multi', required: true, options: planOptions },
      { key: 'term', label: '合作期間', kind: 'single', options: ['單月', '季約', '年約', '還沒決定'] },
      { key: 'qty', label: '每種影片每月支數', kind: 'single', options: ['10 支', '20 支', '30 支以上', '想先問問'] },
      { key: 'promo', label: '雙 11 活動', kind: 'single', options: ['我要用雙 11 活動價（11/20 前簽約）', '先不用'], show: (_v, c) => c.promo },
      { key: 'platforms', label: '要發在哪裡', kind: 'multi', options: ['Instagram Reels', '抖音／TikTok', 'YouTube Shorts', 'Facebook Reels', '官網或電商頁', '其他'] },
      { key: 'start', label: '希望什麼時候開始', kind: 'single', options: ['越快越好', '兩週內', '一個月內', '還沒決定'] },
    ],
  },
  {
    id: 'brand', title: '3. 品牌與商品', hint: '寫得越具體，腳本越準，修改越少。',
    fields: [
      { key: 'product', label: '要推的商品或服務', kind: 'text', required: true, placeholder: '商品名稱，可以寫多個' },
      { key: 'points', label: '最想強調的 3 個賣點', kind: 'textarea', required: true, placeholder: '例：1. 現做現送 2. 無添加 3. 全台宅配' },
      { key: 'audience', label: '目標客群', kind: 'text', placeholder: '誰會買？年齡、職業、需求' },
      { key: 'goal', label: '影片目標', kind: 'single', options: ['提升詢問', '帶來訂單／導購', '品牌曝光', '活動宣傳', '其他'] },
      { key: 'tone', label: '想要的風格', kind: 'multi', options: ['專業', '親切', '活潑', '高級質感', '幽默', '溫暖'] },
      { key: 'refs', label: '想參考的影片（選填）', kind: 'textarea', placeholder: '貼 1–3 支連結，同業或你喜歡的風格都可以' },
      { key: 'avoid', label: '禁用詞與要注意的事（選填）', kind: 'textarea', placeholder: '食品、保健、美妝、醫療類請特別註明法規限制' },
    ],
  },
  {
    id: 'a', title: 'A　素材快剪', hint: '你拍好素材，我們剪成可以上架的短影音。', show: has('A'),
    fields: [
      { key: 'a_type', label: '素材類型', kind: 'multi', options: ['活動紀錄', '新品宣傳', '開箱', '花絮', '商品實拍', '口播影片', '其他'] },
      { key: 'a_count', label: '手上有多少素材', kind: 'single', options: ['1–5 支', '6–20 支', '20 支以上', '還沒拍，想先問怎麼拍'] },
      { key: 'a_voice', label: '有口播嗎', kind: 'single', options: ['有，我或員工口播', '沒有口播，只有畫面', '不確定'] },
      { key: 'a_sub', label: '字幕語言', kind: 'multi', options: ['繁體中文', '英文', '其他'] },
      { key: 'a_brand', label: '品牌元素', kind: 'multi', options: ['有 Logo', '有品牌色', '有固定片頭片尾', '有指定配樂'] },
      { key: 'a_note', label: '剪輯重點（選填）', kind: 'textarea', placeholder: '哪些畫面一定要留？開頭想怎麼抓人？' },
    ],
  },
  {
    id: 'b', title: 'B　AI 代言人', hint: '不用真人，AI 人物替你介紹商品。', show: has('B'),
    fields: [
      { key: 'b_gender', label: '代言人性別', kind: 'single', options: ['男', '女', '都可以'] },
      { key: 'b_age', label: '年齡層', kind: 'single', options: ['20–30 歲', '30–45 歲', '45 歲以上', '都可以'] },
      { key: 'b_look', label: '形象氣質', kind: 'multi', options: ['專業可靠', '親切鄰家', '時尚精品', '活力運動', '長輩信賴感'] },
      { key: 'b_scene', label: '畫面場景', kind: 'single', options: ['棚內或純色背景', '店面或辦公室', '戶外', '看你們建議'] },
      { key: 'b_lang', label: '口播語言', kind: 'single', options: ['國語', '英文', '其他，需先確認'] },
      { key: 'b_script', label: '腳本', kind: 'single', options: ['請你們撰寫', '我已經有腳本', '想先討論'] },
      { key: 'b_price', label: '要不要口播價格或優惠（選填）', kind: 'text', placeholder: '例：第一件 8 折，滿千免運' },
      { key: 'b_note', label: '其他形象描述（選填）', kind: 'textarea', placeholder: '職業、穿著、想放的場景' },
    ],
  },
  {
    id: 'cd', title: 'C、D　個人品牌分身與 AI 短劇置入', hint: '先寫方向，業務會再跟你確認細節。', show: (v) => hasPlan(v, 'C') || hasPlan(v, 'D'),
    fields: [
      { key: 'c_who', label: '個人品牌分身：你是誰、想講什麼', kind: 'textarea', show: has('C'), placeholder: '職業、專長、想分享的主題。分身需要你的照片與影片，請在下一步上傳' },
      { key: 'd_story', label: 'AI 短劇置入：想要的題材', kind: 'textarea', show: has('D'), placeholder: '例：職場逆襲、婆媳、霸總。商品要怎麼出現？' },
    ],
  },
  {
    id: 'upload', title: '4. 上傳素材', hint: '照片與影片放在 Google Drive，檔案大也沒關係。',
    fields: [
      { key: 'uploaded', label: '素材狀態', kind: 'single', options: ['已經上傳', '稍後上傳', '沒有素材，請你們協助規劃'] },
      { key: 'upload_note', label: '上傳備註（選填）', kind: 'text', placeholder: '資料夾名稱，或哪些檔案是做什麼用的' },
    ],
  },
];

/** 該上傳什麼：依選的方案列出，頁面上顯示成清單。 */
export const uploadList = (v: Values) => [
  '商品照、產品圖（原檔，越清楚越好）',
  '品牌 Logo（PNG、SVG 或 AI 檔）',
  ...(hasPlan(v, 'A') ? ['要剪的素材影片', '口播錄音或口播影片'] : []),
  ...(hasPlan(v, 'B') ? ['想參考的代言人形象圖（選填）'] : []),
  ...(hasPlan(v, 'C') ? ['本人照片（正面、半身）與一段說話影片'] : []),
  '參考影片或圖片（選填）',
];
