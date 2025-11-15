import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FOKUS İstatistik - Dijital Kartvizit',
  description: 'FOKUS İstatistik - Veri Bilimi ve Yapay Zeka Danışmanlığı. 22 yıllık deneyim, 9 sanal asistan, 7/24 hizmet.',
  keywords: 'FOKUS, İstatistik, Veri Bilimi, Yapay Zeka, Sanal Asistan, Dijital Dönüşüm',
  icons: {
    icon: 'https://static.fokusistatistik.com/resimler/favicon.png',
  },
};

export default function KartvizitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
