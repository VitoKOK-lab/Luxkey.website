import type { Metadata } from 'next';
import { fontClass } from '../_home/fonts';
import { Brand, Footer } from '../_home/home-client';
import { EMAIL } from '../_home/home-data';
import '../_home/home.css';

export const metadata: Metadata = {
  title: '隱私說明｜A.C.E.',
  alternates: { canonical: 'https://luxkey.com.tw/privacy/' },
  icons: { icon: '/home/ace-icon-192.png', apple: '/home/ace-icon-192.png' },
};

const sections = [
  { title: '方案推薦', body: '首頁的需求勾選與方案推薦都在你的瀏覽器中處理，不會透過網站傳送給我們。按下 LINE 詢問時，需求文字只會放進你裝置的剪貼簿，由你自行貼上送出。請勿在需求中填寫密碼或機密資料。' },
  { title: 'LINE 與 Email 聯絡', body: '你主動透過 LINE 或 Email 聯絡時，我們會使用你提供的資料評估需求並回覆合作事宜。這些平台的資料處理依其隱私規範。若要查詢、更正或刪除你提供給我們的聯絡資料，請來信告知。' },
  { title: '主機服務', body: '本站由 GitHub Pages 提供，存取網站時主機服務可能記錄 IP 位址等基本連線資訊，並依其服務政策處理。本站未加入廣告追蹤或第三方分析程式。' },
];

export default function PrivacyPage() {
  return (
    <div className={`ace ${fontClass}`}>
      <header className="ace-header">
        <div className="ace-wrap ace-header-row">
          <Brand />
          <a href="/#contact" className="ace-btn ace-btn-primary">立即諮詢</a>
        </div>
      </header>
      <main className="ace-section">
        <div className="ace-wrap ace-legal">
          <p className="ace-kicker">PRIVACY</p>
          <h1 className="ace-h2">隱私說明</h1>
          <p>本網站由金曜石國際股份有限公司（LUXKEY）經營。對網站資料處理有任何疑問，請聯絡 <a href={`mailto:${EMAIL}`}>{EMAIL}</a>。</p>
          {sections.map(s => <section key={s.title}><h2>{s.title}</h2><p>{s.body}</p></section>)}
          <p className="ace-note">更新日期：2026 年 10 月 25 日</p>
          <a href="/" className="ace-text-link">返回首頁</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
