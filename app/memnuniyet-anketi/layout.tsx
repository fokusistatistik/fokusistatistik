import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hizmet Değerlendirme Anketi | FOKUS İstatistik',
  description: 'Aldığınız hizmet hakkında görüşlerinizi paylaşın. Değerli geri bildiriminiz bizim için çok önemli.',
  robots: 'noindex, nofollow', // Arama motorlarında indexlenmemesi için
};

export default function MemnuniyetAnketiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
