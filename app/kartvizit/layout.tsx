import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FOKUS İstatistik - Dijital Kartvizit',
  description: 'FOKUS İstatistik - Veri Bilimi ve Yapay Zeka Danışmanlığı. 22 yıllık deneyim, 9 sanal asistan, 7/24 hizmet.',
  keywords: 'FOKUS, İstatistik, Veri Bilimi, Yapay Zeka, Sanal Asistan, Dijital Dönüşüm',
};

export default function KartvizitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://static.fokusistatistik.com/resimler/favicon.png" type="image/png" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
