import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// 經銷頁沿用原本的全域樣式與字型；新官網不載入這些。
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const viewport: Viewport = { themeColor: '#14161A' };

export default function DealerLayout({ children }: { children: React.ReactNode }) {
  return <div className={inter.variable}>{children}</div>;
}
