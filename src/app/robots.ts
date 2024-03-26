import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/mypage/', '/edit/'],
    },
    sitemap: 'https://www.foliohub.me/sitemap.xml',
  }
}
