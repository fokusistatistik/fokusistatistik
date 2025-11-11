'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Chrome, Mail, Lock, ArrowRight, Shield, Zap } from 'lucide-react';

export default function GirisPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#860000] mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div className="hidden lg:block">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">
              <span className="text-[#860000]">FOKUS</span> İle
              <br />
              İş Süreçlerinizi
              <br />
              <span className="text-[#860000]">Optimize Edin</span>
            </h1>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#860000] rounded-full p-3 flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">Hızlı Başlangıç</h3>
                  <p className="text-gray-600">
                    Google hesabınızla giriş yapın, 30 saniyede kullanmaya başlayın.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#860000] rounded-full p-3 flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">Güvenli & Gizli</h3>
                  <p className="text-gray-600">
                    Verileriniz tamamen güvende. KVKK uyumlu altyapı ile %100 gizlilik.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#860000] rounded-full p-3 flex-shrink-0">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">14 Gün Ücretsiz</h3>
                  <p className="text-gray-600">
                    Tüm özellikleri 14 gün boyunca ücretsiz deneyin. Kredi kartı gerekmez.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg border-2 border-[#860000]/20">
              <p className="text-sm text-gray-600 mb-2">Halihazırda kullanıcılarımız:</p>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white"></div>
                </div>
                <span className="text-gray-700 font-semibold">+500 İşletme</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#860000] rounded-full mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Hoş Geldiniz</h2>
                <p className="text-gray-600">Giriş yaparak devam edin</p>
              </div>

              <div className="space-y-4">
                {/* Google Login */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 hover:border-[#860000] text-gray-700 font-semibold py-4 px-6 rounded-xl transition group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#860000]"></div>
                  ) : (
                    <>
                      <Chrome className="w-5 h-5 text-[#860000]" />
                      <span>Google ile Giriş Yap</span>
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">veya</span>
                  </div>
                </div>

                {/* Email Login (Placeholder for future) */}
                <button
                  disabled
                  className="w-full flex items-center justify-center space-x-3 bg-gray-100 border-2 border-gray-200 text-gray-400 font-semibold py-4 px-6 rounded-xl cursor-not-allowed"
                >
                  <Mail className="w-5 h-5" />
                  <span>E-posta ile Giriş (Yakında)</span>
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Giriş yaparak{' '}
                  <Link href="/kullanim-kosullari" className="text-[#860000] hover:underline">
                    Kullanım Koşulları
                  </Link>{' '}
                  ve{' '}
                  <Link href="/gizlilik" className="text-[#860000] hover:underline">
                    Gizlilik Politikası
                  </Link>
                  &apos;nı kabul etmiş olursunuz.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Hesabınız yok mu?{' '}
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="text-[#860000] font-semibold hover:underline disabled:opacity-50"
                  >
                    Hemen Kaydolun
                  </button>
                </p>
              </div>
            </div>

            {/* Mobile Info */}
            <div className="lg:hidden mt-8 text-center text-gray-600 text-sm">
              <p>✓ 14 gün ücretsiz deneme</p>
              <p>✓ Kredi kartı gerekmez</p>
              <p>✓ İstediğiniz zaman iptal</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
