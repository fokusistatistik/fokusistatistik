import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-posta Aboneliğinizi Yönetin | FOKUS İstatistik',
  description: 'FOKUS İstatistik e-posta tercihlerinizi yönetin. Abonelikten çıkış işlemlerinizi kolayca gerçekleştirin.',
  robots: 'noindex, nofollow',
};

export default function AbonelikYonetimiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
