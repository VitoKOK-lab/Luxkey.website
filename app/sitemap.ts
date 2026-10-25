import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://luxkey.com.tw/', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://luxkey.com.tw/introduce/', changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://luxkey.com.tw/privacy/', changeFrequency: 'yearly', priority: 0.2 },
  ];
}
