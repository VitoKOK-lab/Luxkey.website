import type { Metadata } from 'next';
import { fontClass } from '../_home/fonts';
import BriefPage from './brief-client';

export const metadata: Metadata = {
  title: '需求單｜ACE Impact',
  description: '填寫 ACE Impact 短影音需求單：想做的影片、品牌與商品資料、素材上傳。',
  alternates: { canonical: 'https://luxkey.com.tw/brief/' },
  robots: { index: false, follow: true },
  icons: { icon: '/home/ace-icon-192.png', apple: '/home/ace-icon-192.png' },
};

export default function Page() { return <BriefPage fontClass={fontClass} />; }
