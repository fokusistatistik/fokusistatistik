import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanal Asistan Analiz Formu - Detaylı İhtiyaç Belirleme',
  description: 'FOKUS Ekosistemi Sanal Asistan Analiz Formu. Müşteri hizmetleri, veri analizi, pazarlama, finans, İK ve daha fazla alan için işletmenizin dijitalleşme ihtiyaçlarını belirleyin. 2 dakikalık pratik form.',
  keywords: 'sanal asistan formu, ihtiyaç analiz formu, dijital dönüşüm formu, otomasyon ihtiyacı, AI çözüm talebi, işletme analizi',
  openGraph: {
    title: 'FOKUS Sanal Asistan Analiz Formu | Detaylı İhtiyaç Belirleme',
    description: '8 farklı kategoride işletmenizin otomasyon ihtiyaçlarını belirleyin. Anında analiz raporu alın.',
    url: 'https://fokusistatistik.com/analiz-formu',
  },
  alternates: {
    canonical: 'https://fokusistatistik.com/analiz-formu',
  },
  // Sayfa şimdilik UI'dan gizlendi (n8n webhook'u aktif değil), sonradan aktif edilebilir
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalizFormuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
