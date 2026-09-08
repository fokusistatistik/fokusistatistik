'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface UserSession {
  user: string;
  email: string;
}

export default function Siparisler() {
  const router = useRouter();
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/giris');
          return;
        }
        const email: string = data.user?.username || '';
        setSession({ user: email.split('@')[0], email });
        setIsLoading(false);
      })
      .catch(() => router.push('/giris'));
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#860000] mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Placeholder orders data
  const placeholderOrders = [
    {
      id: '001',
      date: '15 Aralık 2024',
      assistant: 'FOKUS216 - Müşteri Hizmetleri',
      package: 'Pro',
      status: 'Aktif',
      amount: '2.500 ₺',
      nextPayment: '15 Ocak 2025'
    },
    {
      id: '002',
      date: '1 Aralık 2024',
      assistant: 'FOKUS314 - Veri Analisti',
      package: 'Standart',
      status: 'Aktif',
      amount: '1.499 ₺',
      nextPayment: '1 Ocak 2025'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Siparişlerim</h1>
          <p className="text-gray-600">Aktif ve geçmiş siparişlerinizi görüntüleyin</p>
        </div>

        {/* Active Orders */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Aktif Siparişler</h2>

          <div className="space-y-4">
            {placeholderOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {order.status}
                      </span>
                      <span className="text-gray-500 text-sm">
                        Sipariş No: #{order.id}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {order.assistant}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>📦 Paket: <strong>{order.package}</strong></span>
                      <span>📅 Başlangıç: {order.date}</span>
                      <span>💰 Aylık: <strong>{order.amount}</strong></span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => alert('Sipariş detayları yakında eklenecek!')}
                      className="px-6 py-2 bg-[#860000] hover:bg-[#b30000] text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      Detaylar
                    </button>
                    <button
                      onClick={() => alert('Fatura görüntüleme yakında eklenecek!')}
                      className="px-6 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      Fatura
                    </button>
                  </div>
                </div>

                {/* Next Payment */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sonraki Ödeme:</span>
                    <span className="font-semibold text-gray-900">{order.nextPayment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Toplam Sipariş</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Aktif Asistan</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Aylık Toplam</p>
                <p className="text-2xl font-bold text-gray-900">3.999 ₺</p>
              </div>
            </div>
          </div>
        </div>

        {/* Past Orders (Empty State) */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Geçmiş Siparişler</h2>

          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Geçmiş sipariş bulunamadı
            </h3>
            <p className="text-gray-600 mb-6">
              Tamamlanmış veya iptal edilmiş siparişiniz bulunmamaktadır.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-r from-[#860000] to-[#a30000] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Yeni Asistan Eklemek İster misiniz?</h3>
          <p className="mb-6 opacity-90">
            9 farklı alana özel sanal asistanlarımızla işletmenizi güçlendirin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sanalasistanlar"
              className="bg-white text-[#860000] hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all inline-block"
            >
              Asistanları İncele
            </Link>
            <a
              href="/iletisim"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#860000] font-semibold py-3 px-8 rounded-lg transition-all inline-block"
            >
              Demo Talep Et
            </a>
          </div>
        </div>

        {/* Notification */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">ℹ️</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Geliştirme Aşamasında</h3>
              <p className="text-gray-600 text-sm">
                Sipariş yönetimi özellikleri aktif olarak geliştirilmektedir.
                Yakında detaylı sipariş geçmişi, fatura indirme ve ödeme geçmişi eklenecektir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
