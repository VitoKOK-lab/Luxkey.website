import type { Metadata } from 'next';
import { fontClass } from './_home/fonts';
import HomePage from './_home/home-client';
import { EMAIL } from './_home/home-data';
import { impactPlans, impactFaqs } from './_home/impact-data';

const title = 'ACE Impact｜短影音訂閱方案';
const description = 'ACE Impact 短影音訂閱方案：素材快剪 NT$300 起、AI 代言人 NT$2,800 起、個人品牌分身 NT$3,500 起、AI 短劇置入 NT$3,900 起。單月、季繳、年繳自由選擇。';
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
    itemListElement: impactPlans.map(p => ({ '@type': 'Offer', name: p.name, description: p.pitch, url: `${url}#plan-${p.id}`, priceSpecification: { '@type': 'UnitPriceSpecification', price: p.prices[2], priceCurrency: 'TWD', valueAddedTaxIncluded: false, unitText: '支' } }))
  },
};
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    org,
    { '@type': 'WebSite', '@id': `${url}#site`, url, name: 'A.C.E.', inLanguage: 'zh-Hant-TW', publisher: { '@id': `${url}#org` } },
    { '@type': 'FAQPage', mainEntity: impactFaqs.map(([q,a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ],
};

export default function Page() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <HomePage fontClass={fontClass} />
  </>;
}
