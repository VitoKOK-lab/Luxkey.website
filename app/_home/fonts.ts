import { Montserrat, Noto_Serif_TC } from 'next/font/google';

const serif = Noto_Serif_TC({ weight: ['600', '700'], subsets: ['latin'], preload: false, display: 'swap', variable: '--font-serif-tc' });
const sans = Montserrat({ weight: ['400', '500', '600'], subsets: ['latin'], display: 'swap', variable: '--font-latin' });

export const fontClass = `${serif.variable} ${sans.variable}`;
