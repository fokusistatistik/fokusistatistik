'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UserProfile, ProfileFormData } from '@/types/profile';
import { toast } from '@/lib/toast';
import { User, Building2, Calendar, Phone, Mail, CheckCircle2, Info } from 'lucide-react';
import { FormTooltip } from '@/components/Tooltip';
import SaveIndicator from '@/components/SaveIndicator';

export default function ProfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    company: '',
    birthYear: undefined,
    phone: '',
    kvkkConsent: false,
    emailSubscription: true,
    smsSubscription: false,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/giris');
    }
  }, [status, router]);

  if (status === 'loading') {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#860000] to-[#a30000] rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {session.user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {session.user?.name || 'Kullanıcı'}
              </h1>
              <p className="text-gray-600">{session.user?.email}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-[#860000] hover:bg-[#b30000] text-white px-6 py-3 rounded-lg transition-all"
            >
              {isEditing ? 'İptal' : 'Düzenle'}
            </button>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profil Bilgileri</h2>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={session.user?.name || ''}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  value={session.user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  placeholder="Telefon numarası ekleyin"
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şirket
                </label>
                <input
                  type="text"
                  placeholder="Şirket adı ekleyin"
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    alert('Profil güncelleme özelliği yakında eklenecek!');
                    setIsEditing(false);
                  }}
                  className="px-6 py-3 bg-[#860000] hover:bg-[#b30000] text-white rounded-lg transition-colors"
                >
                  Değişiklikleri Kaydet
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Siparişlerim</h3>
            <p className="text-sm text-gray-600 mb-4">Aktif ve geçmiş siparişleriniz</p>
            <a
              href="/siparisler"
              className="text-[#860000] hover:underline text-sm font-medium"
            >
              Görüntüle →
            </a>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Asistanlarım</h3>
            <p className="text-sm text-gray-600 mb-4">Aktif sanal asistanlarınız</p>
            <a
              href="/dashboard"
              className="text-[#860000] hover:underline text-sm font-medium"
            >
              Yönet →
            </a>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Ödeme Yöntemleri</h3>
            <p className="text-sm text-gray-600 mb-4">Kayıtlı kart ve yöntemler</p>
            <button
              onClick={() => alert('Ödeme yöntemleri özelliği yakında eklenecek!')}
              className="text-[#860000] hover:underline text-sm font-medium"
            >
              Düzenle →
            </button>
          </div>
        </div>

        {/* Notification */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">ℹ️</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Geliştirme Aşamasında</h3>
              <p className="text-gray-600 text-sm">
                Profil yönetimi özellikleri aktif olarak geliştirilmektedir.
                Yakında tam özellikli profil düzenleme, şifre değiştirme ve hesap ayarları eklenecektir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
