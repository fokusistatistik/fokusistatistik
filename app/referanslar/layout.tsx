import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Referanslarımız',
  description: 'FOKUS İstatistik ve YZ Danışmanlığı referansları. İş ortaklarımız ve başarı hikayeleri.',
  keywords: [
    'FOKUS referanslar',
    'müşteri yorumları',
    'başarı hikayeleri',
    'iş ortakları',
    'referans firmalar',
  ],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://fokusistatistik.com/referanslar',
    siteName: 'FOKUS İstatistik ve YZ Danışmanlığı',
    title: 'Referanslarımız | FOKUS İstatistik',
    description: 'FOKUS İstatistik ve YZ Danışmanlığı referansları. İş ortaklarımız ve başarı hikayeleri.',
    images: [
      {
        url: '/assets/cdn/logolar/fokuslogo1.png',
        width: 1200,
        height: 630,
        alt: 'FOKUS Referanslar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Referanslarımız | FOKUS İstatistik',
    description: 'FOKUS İstatistik ve YZ Danışmanlığı referansları.',
    images: ['/assets/cdn/logolar/fokuslogo1.png'],
  },
  alternates: {
    canonical: 'https://fokusistatistik.com/referanslar',
  },
};

export default function ReferanslarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
