import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim - FOKUS İstatistik ve YZ Danışmanlığı',
  description: 'FOKUS İstatistik ile iletişime geçin. Yapay zeka danışmanlığı, sanal asistan hizmetleri ve dijital dönüşüm çözümleri için bizimle iletişime geçebilirsiniz. Telefon, email ve adres bilgilerimiz.',
  keywords: 'iletişim, FOKUS iletişim, yapay zeka danışmanlık iletişim, sanal asistan teklif, AI danışmanlık randevu',
  openGraph: {
    title: 'İletişim | FOKUS İstatistik ve YZ Danışmanlığı',
    description: 'Yapay zeka ve sanal asistan çözümleri için bizimle iletişime geçin. Ücretsiz danışmanlık için randevu alın.',
    url: 'https://fokusistatistik.com/iletisim',
  },
  alternates: {
    canonical: 'https://fokusistatistik.com/iletisim',
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
