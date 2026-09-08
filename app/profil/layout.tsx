import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profilim',
  description: 'Hesap bilgilerinizi görüntüleyin ve yönetin.',
  robots: 'noindex, nofollow',
};

export default function ProfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
