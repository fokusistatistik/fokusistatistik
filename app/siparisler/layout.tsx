import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Siparişlerim',
  description: 'Aktif ve geçmiş siparişlerinizi görüntüleyin.',
  robots: 'noindex, nofollow',
};

export default function SiparislerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
