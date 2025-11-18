import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanal Asistanlar - FOKUS Ekosistemi',
  description: '9 farklı FOKUS sanal asistan ile iş süreçlerinizi otomatikleştirin. Yönetim, müşteri hizmetleri, veri analizi, pazarlama, finans, insan kaynakları, içerik tasarımı ve sosyal medya asistanları. 7/24 çalışan yapay zeka destekli dijital asistanlar.',
  keywords: [
    'sanal asistan',
    'yapay zeka asistan',
    'dijital asistan',
    'iş süreçleri otomasyonu',
    'yönetici asistanı',
    'müşteri hizmetleri otomasyonu',
    'veri analizi asistanı',
    'pazarlama otomasyonu',
    'finans otomasyonu',
    'insan kaynakları otomasyonu',
    'içerik tasarımı',
    'sosyal medya yönetimi',
    'chatbot',
    'AI asistan',
  ],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://fokusistatistik.com/sanalasistanlar',
    siteName: 'FOKUS İstatistik ve YZ Danışmanlığı',
    title: 'FOKUS Sanal Asistanlar - 9 Farklı AI Asistan',
    description: '9 farklı FOKUS sanal asistan ile iş süreçlerinizi otomatikleştirin. Yapay zeka destekli dijital asistanlar ile verimliliği artırın, maliyeti azaltın.',
    images: [
      {
        url: 'https://static.fokusistatistik.com/resimler/fokus-ekosistem-og.jpg',
        width: 1200,
        height: 630,
        alt: 'FOKUS Sanal Asistanlar Ekosistemi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FOKUS Sanal Asistanlar - 9 Farklı AI Asistan',
    description: '9 farklı FOKUS sanal asistan ile iş süreçlerinizi otomatikleştirin.',
    images: ['https://static.fokusistatistik.com/resimler/fokus-ekosistem-og.jpg'],
  },
  alternates: {
    canonical: 'https://fokusistatistik.com/sanalasistanlar',
  },
};

export default function SanalAsistanlarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
