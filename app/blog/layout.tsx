import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Blog | FOKUS İstatistik',
    template: '%s | FOKUS Blog',
  },
  description: 'Yapay zeka, veri analizi, ChatGPT ve dijital dönüşüm hakkında derinlikli makaleler, rehberler ve başarı hikayeleri.',
  alternates: {
    canonical: 'https://fokusistatistik.com/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
