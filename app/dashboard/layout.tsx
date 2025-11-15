import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - FOKUS Sanal Asistan Yönetim Paneli',
  description: 'FOKUS Sanal Asistan yönetim paneli. Asistanlarınızı yönetin, performans raporlarını görüntüleyin, ayarları düzenleyin.',
  robots: {
    index: false, // Dashboard should not be indexed
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
