'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Session kontrolü yap
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');

        if (response.ok) {
          // Session varsa dashboard'a yönlendir
          router.replace('/admin/dashboard');
        } else {
          // Session yoksa login'e yönlendir
          router.replace('/admin/login');
        }
      } catch (error) {
        // Hata durumunda login'e yönlendir
        router.replace('/admin/login');
      }
    };

    checkSession();
  }, [router]);

  // Yönlendirme sırasında loading göster
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#860000] mx-auto mb-4"></div>
        <p className="text-gray-600">Yönlendiriliyor...</p>
      </div>
    </div>
  );
}
