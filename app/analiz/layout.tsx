import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ücretsiz İhtiyaç Analizi - Hangi Sanal Asistana İhtiyacınız Var?',
  description: '2 dakikada ücretsiz ihtiyaç analizi yapın. İşletmeniz için en uygun sanal asistanı ve paketi belirleyin. FOKUS yapay zeka danışmanları size özel çözüm önerileri sunar.',
  keywords: 'ihtiyaç analizi, sanal asistan seçimi, AI danışmanlık, ücretsiz analiz, işletme ihtiyaç tespiti, otomasyon analizi, dijital dönüşüm danışmanlığı',
  openGraph: {
    title: 'Ücretsiz Sanal Asistan İhtiyaç Analizi | FOKUS',
    description: '2 dakikada işletmeniz için en uygun sanal asistan çözümünü keşfedin. Ücretsiz analiz ve özel öneriler.',
    url: 'https://fokusistatistik.com/analiz',
  },
  alternates: {
    canonical: 'https://fokusistatistik.com/analiz',
  },
};

export default function AnalizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
