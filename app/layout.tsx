import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = { metadataBase: new URL('https://luxkey.com.tw') };

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#fbf6f2' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
