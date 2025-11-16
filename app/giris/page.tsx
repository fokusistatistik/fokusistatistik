'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Chrome, Mail, Lock, ArrowRight, Shield, Zap, User } from 'lucide-react';

function GirisContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    // URL'den hata ve success mesajlarını kontrol et
    const error = searchParams?.get('error');
    const authSuccess = searchParams?.get('auth');
    const sessionData = searchParams?.get('session');

    if (error) {
      setStatusMessage(`❌ Giriş hatası: ${error}`);
      console.error('❌ Login error:', error);
    } else if (authSuccess === 'success' && sessionData) {
      try {
        const decoded = JSON.parse(decodeURIComponent(sessionData));
        console.log('✅ Authentication successful:', decoded);

        // Session'ı localStorage'a kaydet
        const fullSessionData = {
          ...decoded.userInfo,
          user: decoded.user,
          email: decoded.email,
          userId: decoded.userId,
          picture: decoded.picture,
          isNewUser: decoded.isNewUser,
          token: generateSecureToken(),
          timestamp: Date.now(),
          isLoggedIn: true,
          authMethod: 'google'
        };

        localStorage.setItem('fokus520Session', JSON.stringify(fullSessionData));
        console.log('💾 Session saved to localStorage');
        console.log('🆕 Is new user:', decoded.isNewUser);

        // Yeni kullanıcı mı kontrol et
        const isNewUser = decoded.isNewUser === true;

        if (isNewUser) {
          setStatusMessage(`✅ Hoş geldiniz ${decoded.user.split(' ')[0]}! Hesabınız oluşturuldu.`);
          // Yeni kullanıcılar dashboard'a yönlendirilir
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        } else {
          setStatusMessage(`✅ Tekrar hoş geldiniz ${decoded.user.split(' ')[0]}!`);
          // Eski kullanıcılar anasayfaya yönlendirilir
          setTimeout(() => {
            router.push('/');
          }, 1500);
        }

      } catch (e) {
        console.error('❌ Session parse error:', e);
        setStatusMessage('❌ Session verisi işlenemedi');
      }
    }

    // Check if already logged in
    const session = localStorage.getItem('fokus520Session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed.isLoggedIn && parsed.token) {
          router.push('/dashboard');
        }
      } catch (e) {
        localStorage.removeItem('fokus520Session');
      }
    }
  }, [searchParams, router]);

  const handleGoogleSignIn = () => {
    console.log('🚀 Starting Google Sign In...');
    setIsLoading(true);
    setStatusMessage('Google ile giriş başlatılıyor...');

    // API route'a yönlendir
    window.location.href = '/api/auth/google';
  };

  const handleAdminLogin = () => {
    console.log('🔧 Admin bypass login...');
    setIsLoading(true);
    setStatusMessage('✅ Admin olarak giriş yapılıyor...');

    // Create temporary admin session
    const adminSession = {
      user: 'Admin User',
      email: 'admin@fokusistatistik.com',
      userId: 'admin-temp-001',
      picture: 'https://static.fokusistatistik.com/resimler/logobeyaz.png',
      isNewUser: false,
      token: generateSecureToken(),
      timestamp: Date.now(),
      isLoggedIn: true,
      authMethod: 'admin-bypass'
    };

    localStorage.setItem('fokus520Session', JSON.stringify(adminSession));
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center py-4 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
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
                  <h3 className="font-bold text-lg text-gray-800 mb-1">1 Ay Ücretsiz</h3>
                  <p className="text-gray-600">
                    Tüm özellikleri 1 ay boyunca ücretsiz deneyin. Kredi kartı gerekmez.
                  </p>
                </div>
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

              {/* Status Message */}
              {statusMessage && (
                <div className={`mb-4 p-4 rounded-lg text-center ${statusMessage.startsWith('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                  {statusMessage}
                </div>
              )}

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
                      <div className="relative w-5 h-5">
                        <Image
                          src="https://static.fokusistatistik.com/resimler/google.png"
                          alt="Google"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>Google ile Giriş Yap</span>
                    </>
                  )}
                </button>

                {/* Admin Login (Temporary) */}
                <button
                  onClick={handleAdminLogin}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-3 bg-gray-100 border-2 border-gray-400 hover:border-gray-600 text-gray-700 font-semibold py-4 px-6 rounded-xl transition group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <span>Admin Girişi (Geçici)</span>
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
              <p>✓ 1 ay ücretsiz deneme</p>
              <p>✓ Kredi kartı gerekmez</p>
              <p>✓ İstediğiniz zaman iptal</p>
            </div>

            {/* B2B Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                ℹ️ FOKUS İstatistik B2B hizmet vermektedir. Üyelikler sözleşme sonrası oluşturulur.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Suspense wrapper for the page
export default function GirisPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#860000] mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    }>
      <GirisContent />
    </Suspense>
  );
}

// Helper function
function generateSecureToken(): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)), byte =>
      byte.toString(16).padStart(2, '0')).join('');
  } else {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
