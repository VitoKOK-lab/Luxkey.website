import type { Metadata } from 'next';
import { fontClass } from './_home/fonts';
import HomePage from './_home/home-client';
import { EMAIL, VIDEO_MIN, faqs, packs, plans, services, videos } from './_home/home-data';

const title = 'A.C.E.｜讓 AI 成為每個品牌的王牌';
const description = 'A.C.E. 用 AI 做品牌影音：AI 剪片每支 NT$300、AI UGC 商品介紹每支 NT$2,000、狗血劇商品介紹每支 NT$3,500。另有社群圖文、SEO 文章、電商與網站服務，以及月費 NT$29,800 起的包月方案。';
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
    '@type': 'OfferCatalog', name: 'A.C.E. 服務與價格',
    itemListElement: videos.map(v => ({
      '@type': 'Offer', name: v.name, description: `${v.pitch}一次 ${VIDEO_MIN} 支起訂。`, url: `${url}#video-${v.key}`,
      priceSpecification: { '@type': 'UnitPriceSpecification', price: v.price, priceCurrency: 'TWD', valueAddedTaxIncluded: false, unitText: '支' },
      eligibleQuantity: { '@type': 'QuantitativeValue', minValue: VIDEO_MIN, unitText: '支' },
    }) as Record<string, unknown>).concat(plans.map(p => ({
      '@type': 'Offer', name: `${p.name}方案`, description: p.tagline, url: `${url}#plans`,
      priceSpecification: {
        '@type': 'UnitPriceSpecification', price: p.price, priceCurrency: 'TWD', valueAddedTaxIncluded: false,
        ...(p.key === 'trial' ? {} : { unitCode: 'MON', unitText: '月' }),
      },
    }))).concat(packs.map(p => {
      const s = services.find(x => x.key === p.key)!;
      return {
        '@type': 'Offer', name: `${s.name} ${p.qty}`, description: `單買套組：${p.per}`, url: `${url}#offer-${p.key}`,
        priceSpecification: { '@type': 'UnitPriceSpecification', price: p.price, priceCurrency: 'TWD', valueAddedTaxIncluded: false },
      };
    })),
  },
};
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    org,
    { '@type': 'WebSite', '@id': `${url}#site`, url, name: 'A.C.E.', inLanguage: 'zh-Hant-TW', publisher: { '@id': `${url}#org` } },
    ...services.filter(s => s.key !== 'video').map(s => ({
      '@type': 'Service', name: s.name, description: `${s.short}。${s.pitch}`, serviceType: s.name,
      provider: { '@id': `${url}#org` }, areaServed: 'TW', url: `${url}#offer-${s.key}`, audience: { '@type': 'Audience', audienceType: s.fit },
    })),
    ...videos.map(v => ({
      '@type': 'Service', name: v.name, description: v.pitch, serviceType: 'AI 影音製作',
      provider: { '@id': `${url}#org` }, areaServed: 'TW', url: `${url}#video-${v.key}`, audience: { '@type': 'Audience', audienceType: v.fit },
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
