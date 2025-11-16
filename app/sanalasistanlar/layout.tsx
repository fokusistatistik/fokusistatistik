import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanal Asistanlar - 9 Farklı Yapay Zeka Asistanı',
  description: 'FOKUS Sanal Asistanları: Yönetici, Müşteri Hizmetleri, Veri Analisti, Pazarlama, Finans, İnsan Kaynakları, İçerik Tasarımı, Sosyal Medya ve Joker asistan. Metal yakalı işçiler ile dijital dönüşümü tamamlayın.',
  keywords: 'sanal asistan, yapay zeka asistan, chatbot türleri, müşteri hizmetleri bot, yönetici asistanı, veri analizi bot, pazarlama otomasyonu, HR bot, sosyal medya yönetimi, metal yakalı işçiler',
  openGraph: {
    title: 'FOKUS Sanal Asistanları | 9 Farklı AI Asistan ile Dijital Ekip',
    description: 'Metal yakalı çalışanlar: 7/24 çalışan, yorulmayan, öğrenen yapay zeka asistanları. Yönetim, müşteri hizmetleri, veri analizi, pazarlama ve daha fazlası.',
    url: 'https://fokusistatistik.com/sanalasistanlar',
    images: [
      {
        url: 'https://static.fokusistatistik.com/resimler/bannerasistanlar.png',
        width: 1200,
        height: 630,
        alt: 'FOKUS Sanal Asistanlar - 9 Farklı AI Asistan',
      },
    ],
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
  return <>{children}</>;
}
