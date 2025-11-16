import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giriş Yap - FOKUS Sanal Asistan Platformu',
  description: 'FOKUS Sanal Asistan platformuna giriş yapın. Google ile hızlı giriş. 1 ay ücretsiz deneme fırsatı. İşletmeniz için yapay zeka çözümlerine hemen başlayın.',
  keywords: 'giriş yap, sanal asistan giriş, FOKUS login, yapay zeka platform, AI dashboard',
  openGraph: {
    title: 'Giriş Yap | FOKUS Sanal Asistan Platformu',
    description: '1 ay ücretsiz deneme ile başlayın. Google ile hızlı giriş yapın.',
    url: 'https://fokusistatistik.com/giris',
  },
  alternates: {
    canonical: 'https://fokusistatistik.com/giris',
  },
  robots: {
    index: false, // Login pages should not be indexed
    follow: true,
  },
};

export default function GirisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
