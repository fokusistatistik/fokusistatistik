import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dijital Kartvizit | FOKUS İstatistik',
  description: 'FOKUS İstatistik dijital kartvizit. 9 modüler sanal asistan ile işletmenizi dijitalleştirin.',
  keywords: 'dijital kartvizit, sanal asistan, yapay zeka, FOKUS, vCard, iletişim',
  openGraph: {
    title: 'Dijital Kartvizit | FOKUS İstatistik',
    description: 'FOKUS İstatistik dijital kartvizit. 9 modüler sanal asistan ile işletmenizi dijitalleştirin.',
    type: 'website',
  },
};

export default function KartvizitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
