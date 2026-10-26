import localFont from 'next/font/local';

// 字體檔放在專案裡（latin 子集的可變字重字體），建置時不再依賴 Google Fonts，部署不會因為外部網路失敗。
const serif = localFont({ src: './fonts/noto-serif-tc-latin.woff2', weight: '200 900', display: 'swap', variable: '--font-serif-tc' });
const sans = localFont({ src: './fonts/montserrat-latin.woff2', weight: '100 900', display: 'swap', variable: '--font-latin' });

export const fontClass = `${serif.variable} ${sans.variable}`;
