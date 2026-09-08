import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://fokusistatistik.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/admin/*',
          '/dashboard',
          '/profil',
          '/siparisler',
          '/giris',
          '/*.json$',
          '/private/',
          '/content/',
          '/memnuniyet-anketi',
          '/analiz-formu',
          '/fiyat-teklifi-ozel-x7932kd-2025',
          '/fiyat-teklifi-ozel-x7932kd-2025/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard', '/profil', '/siparisler', '/giris', '/content/', '/memnuniyet-anketi', '/analiz-formu'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
