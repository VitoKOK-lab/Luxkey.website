import type { Metadata } from 'next';
import { fontClass } from './_home/fonts';
import HomePage from './_home/home-client';
import { EMAIL, faqs, plans, services } from './_home/home-data';

const title = 'A.C.E.｜讓 AI 成為每個品牌的王牌';
const description = 'A.C.E. AI 行銷內容訂閱：每月固定產出社群圖文、AI 短影音、SEO 文章並優化網站。標準方案月費 NT$29,800，一個小編的價格、整組 AI 團隊的產量；先嚐鮮 NT$9,800。';
const url = 'https://luxkey.com.tw/';

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  icons: { icon: '/home/ace-icon-192.png', apple: '/home/ace-icon-192.png' },
  openGraph: { title, description, url, siteName: 'A.C.E.', locale: 'zh_TW', type: 'website', images: [{ url: '/home/og-ace.jpg', width: 1200, height: 630, alt: title }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/home/og-ace.jpg'] },
};

const org = {
  '@type': 'Organization', '@id': `${url}#org`, name: 'A.C.E.', alternateName: ['ACE', 'AI Creative Execution', 'LUXKEY', '金曜石國際'], legalName: '金曜石國際股份有限公司',
  url, email: EMAIL, logo: `${url}home/ace-logo-full.webp`, slogan: '讓 AI 成為每個品牌的王牌', description,
  address: { '@type': 'PostalAddress', streetAddress: '信義路四段458號6樓', addressLocality: '臺北市信義區', addressCountry: 'TW' },
  areaServed: 'TW',
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'A.C.E. 內容訂閱方案',
    itemListElement: plans.map(p => ({
      '@type': 'Offer', name: `${p.name}方案`, description: p.tagline, url: `${url}#plans`,
      priceSpecification: {
        '@type': 'UnitPriceSpecification', price: p.price, priceCurrency: 'TWD', valueAddedTaxIncluded: false,
        ...(p.key === 'trial' ? {} : { unitCode: 'MON', unitText: '月' }),
      },
    })),
  },
};
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    org,
    { '@type': 'WebSite', '@id': `${url}#site`, url, name: 'A.C.E.', inLanguage: 'zh-Hant-TW', publisher: { '@id': `${url}#org` } },
    ...services.map(s => ({
      '@type': 'Service', name: s.name, description: `${s.short}。${s.pitch}（${s.quota}）`, serviceType: s.name,
      provider: { '@id': `${url}#org` }, areaServed: 'TW', url: `${url}#service-${s.key}`, audience: { '@type': 'Audience', audienceType: s.fit },
    })),
    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ],
};

export default function Page() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <HomePage fontClass={fontClass} />
  </>;
}
