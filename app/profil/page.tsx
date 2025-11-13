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

  // Load profile data on mount
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/giris');
    } else if (status === 'authenticated' && session) {
      loadProfile();
    }
  }, [status, router, session]);

  // Load profile from API
  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/profile');
      const data = await response.json();

      if (data.success && data.data) {
        setProfile(data.data);
        // Populate form with existing data
        setFormData({
          firstName: data.data.firstName || '',
          lastName: data.data.lastName || '',
          company: data.data.company || '',
          birthYear: data.data.birthYear,
          phone: data.data.phone || '',
          kvkkConsent: data.data.kvkkConsent || false,
          emailSubscription: data.data.emailSubscription !== false, // Default true
          smsSubscription: data.data.smsSubscription || false,
        });
      }
    } catch (error) {
      console.error('Profil yüklenirken hata:', error);
      toast.error('Profil bilgileri yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate KVKK consent
    if (!formData.kvkkConsent) {
      toast.error('Devam etmek için KVKK Aydınlatma Metni\'ni onaylamanız gerekmektedir.');
      return;
    }

    // Validate required fields
    if (!formData.firstName || !formData.lastName) {
      toast.error('Ad ve Soyad alanları zorunludur.');
      return;
    }

    try {
      setSaving(true);
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setProfile(data.data);
        setLastSaved(new Date());
        toast.success('Profil bilgileriniz başarıyla kaydedildi!');
      } else {
        toast.error(data.error || 'Profil kaydedilemedi');
      }
    } catch (error) {
      console.error('Profil kaydetme hatası:', error);
      toast.error('Profil kaydedilirken bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  // Handle input changes
  const handleChange = (field: keyof ProfileFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Generate birth year options (1940-2010)
  const birthYearOptions = Array.from({ length: 71 }, (_, i) => 2010 - i);

  if (status === 'loading' || loading) {
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
    <>
      <style jsx global>{`
        /* Touch-friendly sizes for mobile */
        @media (max-width: 768px) {
          input[type="text"],
          input[type="email"],
          input[type="tel"],
          select {
            min-height: 44px !important;
            font-size: 16px; /* Prevents iOS zoom on focus */
          }

          input[type="checkbox"] {
            width: 1.5rem !important;
            height: 1.5rem !important;
          }

          button {
            min-height: 44px !important;
          }
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || 'Profil'}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-[#860000] to-[#a30000] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              {profile?.profileCompleted && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profile?.firstName && profile?.lastName
                  ? `${profile.firstName} ${profile.lastName}`
                  : session.user?.name || 'Kullanıcı'}
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {session.user?.email}
              </p>
              {!profile?.profileCompleted && (
                <p className="text-orange-600 text-sm mt-2 flex items-center gap-1">
                  <Info className="w-4 h-4" />
                  Profil bilgilerinizi tamamlayın
                </p>
              )}
            </div>
            <SaveIndicator lastSaved={lastSaved} saving={saving} />
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profil Bilgileri</h2>

          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Ad *
                  <FormTooltip content="Adınızı girin" />
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  placeholder="Adınız"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Soyad *
                  <FormTooltip content="Soyadınızı girin" />
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  placeholder="Soyadınız"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Company and Birth Year */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Şirket (Opsiyonel)
                  <FormTooltip content="Çalıştığınız şirket veya kurum adı" />
                </label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Şirket adı"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Doğum Yılı
                  <FormTooltip content="Doğum yılınızı seçin" />
                </label>
                <select
                  value={formData.birthYear || ''}
                  onChange={(e) => handleChange('birthYear', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent transition-all"
                >
                  <option value="">Seçiniz</option>
                  {birthYearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefon
                <FormTooltip content="Telefon numaranızı girin (5XX XXX XX XX)" />
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="5XX XXX XX XX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent transition-all"
              />
            </div>

            {/* Communication Preferences */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">İletişim Tercihleri</h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.emailSubscription}
                    onChange={(e) => handleChange('emailSubscription', e.target.checked)}
                    className="w-5 h-5 text-[#860000] border-gray-300 rounded focus:ring-2 focus:ring-[#860000]"
                  />
                  <div>
                    <div className="font-medium text-gray-900">E-posta bildirimleri</div>
                    <div className="text-sm text-gray-600">Kampanya ve güncellemelerden haberdar olun</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.smsSubscription}
                    onChange={(e) => handleChange('smsSubscription', e.target.checked)}
                    className="w-5 h-5 text-[#860000] border-gray-300 rounded focus:ring-2 focus:ring-[#860000]"
                  />
                  <div>
                    <div className="font-medium text-gray-900">SMS bildirimleri</div>
                    <div className="text-sm text-gray-600">Önemli güncellemeler için SMS alın</div>
                  </div>
                </label>
              </div>
            </div>

            {/* KVKK Consent */}
            <div className="border-t pt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.kvkkConsent}
                  onChange={(e) => handleChange('kvkkConsent', e.target.checked)}
                  className="w-5 h-5 text-[#860000] border-gray-300 rounded focus:ring-2 focus:ring-[#860000] mt-1"
                />
                <div className="text-sm">
                  <span className="text-gray-900">
                    <a href="/kvkk-aydinlatma" target="_blank" className="text-[#860000] hover:underline font-medium">
                      KVKK Aydınlatma Metni
                    </a>
                    'ni okudum ve kabul ediyorum. *
                  </span>
                  <p className="text-gray-600 mt-1">
                    Kişisel verilerinizin işlenmesi hakkında detaylı bilgi almak için lütfen aydınlatma metnini okuyun.
                  </p>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t">
              <button
                type="submit"
                disabled={saving || !formData.kvkkConsent}
                className="px-8 py-3 bg-[#860000] hover:bg-[#b30000] text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Kaydediliyor...
                  </>
                ) : (
                  'Profili Kaydet'
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Profile Status */}
        {profile && (
          <div className={`rounded-xl p-6 ${profile.profileCompleted ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
            <div className="flex items-start gap-4">
              <div className="text-3xl">
                {profile.profileCompleted ? '✅' : 'ℹ️'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {profile.profileCompleted ? 'Profiliniz Tamamlandı' : 'Profilinizi Tamamlayın'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {profile.profileCompleted
                    ? 'Profil bilgileriniz güncel ve eksiksiz. Dilediğiniz zaman yukarıdaki formdan güncelleyebilirsiniz.'
                    : 'Profil bilgilerinizi tamamlayarak size daha iyi hizmet vermemizi sağlayın.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
