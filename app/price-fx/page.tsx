import type { Metadata } from 'next';
import { fontClass } from '../_home/fonts';
import FxClient from './fx-client';

export const metadata: Metadata = {
  title: '價格動畫預覽',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FxClient fontClass={fontClass} />;
}
