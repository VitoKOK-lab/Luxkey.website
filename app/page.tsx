import type { Metadata } from 'next';
import { fontClass } from './_home/fonts';
import HomePage from './_home/home-client';
import { EMAIL, addOns, faqs, promoActive, videos } from './_home/home-data';

const title = 'ACE Impact｜讓 AI 成為每個品牌的王牌';
const description = `ACE Impact 用 AI 做品牌短影音：${videos.map(v => `${v.name}每支 NT$${v.price.toLocaleString('en-US')}`).join('、')}（年約，每月 10 支起）。另有素人開箱、電商網站與線上課程。`;
const url = 'https://luxkey.com.tw/';

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  icons: { icon: '/home/ace-icon-192.png', apple: '/home/ace-icon-192.png' },
  openGraph: { title, description, url, siteName: 'ACE Impact', locale: 'zh_TW', type: 'website', images: [{ url: '/home/og-ace.jpg', width: 1200, height: 630, alt: title }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/home/og-ace.jpg'] },
};

const org = {
  '@type': 'Organization', '@id': `${url}#org`, name: 'ACE Impact', alternateName: ['A.C.E.', 'ACE', 'AI Creative Execution', 'LUXKEY', '金曜石國際'], legalName: '金曜石國際股份有限公司',
  url, email: EMAIL, logo: `${url}home/ace-logo-full.webp`, slogan: '讓 AI 成為每個品牌的王牌', description,
  address: { '@type': 'PostalAddress', streetAddress: '信義路四段458號6樓', addressLocality: '臺北市信義區', addressCountry: 'TW' },
  areaServed: 'TW',
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'ACE Impact 服務與價格',
    itemListElement: videos.map(v => ({
      '@type': 'Offer', name: v.name, description: v.pitch, url: `${url}#why`,
      priceSpecification: { '@type': 'UnitPriceSpecification', price: v.price, priceCurrency: 'TWD', valueAddedTaxIncluded: false, unitText: '支' },
    }) as Record<string, unknown>)
  },
};
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    org,
    { '@type': 'WebSite', '@id': `${url}#site`, url, name: 'ACE Impact', inLanguage: 'zh-Hant-TW', publisher: { '@id': `${url}#org` } },
    ...addOns.map(a => ({
      '@type': 'Service', name: a.name, description: a.detail, serviceType: a.name,
      provider: { '@id': `${url}#org` }, areaServed: 'TW', url: `${url}#other`, audience: { '@type': 'Audience', audienceType: 'ACE Impact 訂閱用戶' },
    })),
    ...videos.map(v => ({
      '@type': 'Service', name: v.name, description: v.pitch, serviceType: 'AI 影音製作',
      provider: { '@id': `${url}#org` }, areaServed: 'TW', url: `${url}#why`, audience: { '@type': 'Audience', audienceType: v.fit },
    })),
    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ],
};

export default function Page() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <HomePage fontClass={fontClass} promoOn={promoActive()} />
  </>;
}
