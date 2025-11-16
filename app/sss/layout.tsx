import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular (SSS) - FOKUS Sanal Asistan Hakkında',
  description: 'FOKUS Sanal Asistanlar hakkında sıkça sorulan sorular. Fiyatlandırma, kurulum, entegrasyon, güvenlik, kullanım ve teknik destek konularında detaylı yanıtlar.',
  keywords: 'sanal asistan sss, yapay zeka sorular, chatbot nasıl kurulur, AI asistan fiyat, sanal asistan entegrasyon, bot güvenlik',
  openGraph: {
    title: 'Sıkça Sorulan Sorular | FOKUS Sanal Asistan',
    description: 'Sanal asistanlar hakkında merak ettikleriniz. Fiyatlandırma, kurulum, entegrasyon ve daha fazlası.',
    url: 'https://fokusistatistik.com/sss',
  },
  alternates: {
    canonical: 'https://fokusistatistik.com/sss',
  },
};

export default function SSSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
