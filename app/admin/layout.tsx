import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'FOKUS Admin Panel',
    template: '%s | FOKUS Admin Panel',
  },
  description: 'Blog Yönetim Sistemi',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
