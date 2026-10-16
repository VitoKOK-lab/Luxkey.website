import type { Metadata } from 'next';
import IntroducePage from './introduce-client';
const title = 'super 5｜ai market automatic system';
const description = 'super 5 雲端行銷服務：數字人、AI 製片、網站優化、專屬線上課程、實拍短影音、網紅行銷與網站系統。方案、交付內容與參考價格一次看清楚。';
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: '/introduce/' },
  openGraph: { title, description, siteName: 'super 5', url: '/introduce/', images: [{ url: '/super5-share.png', width: 1200, height: 630, alt: title }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/super5-share.png'] },
  icons: { icon: '/super5-icon.svg', apple: '/super5-icon.svg' },
};
export default function Page() { return <IntroducePage />; }
