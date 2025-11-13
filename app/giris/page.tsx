'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Chrome, Mail, Lock, ArrowRight, Shield, Zap } from 'lucide-react';
import WelcomeModal from '@/app/components/WelcomeModal';
import { toast } from 'sonner';

export default function GirisPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [checkingUser, setCheckingUser] = useState(false);

  // Check if user is registered when authenticated
  useEffect(() => {
    if (status === 'authenticated' && session && !checkingUser && !showWelcomeModal) {
      checkUserRegistration();
    }
  }, [status, session]);

  const checkUserRegistration = async () => {
    setCheckingUser(true);
    console.log('🔍 Checking user registration for:', session?.user?.email);

    try {
      const response = await fetch('/api/user/register');
      const data = await response.json();

      console.log('📋 User check response:', data);

      if (data.success) {
        if (data.isNewUser || !data.isRegistered) {
          // New user - show welcome modal
          console.log('✨ New user detected - showing welcome modal');
          setShowWelcomeModal(true);
        } else {
          // Existing user - redirect to dashboard
          console.log('✅ Existing user - redirecting to dashboard');
          toast.success(`Hoş geldiniz ${session?.user?.name || 'tekrar'}!`);
          router.push('/dashboard');
        }
      } else {
        // Error checking - assume new user
        console.warn('⚠️ User check failed - showing welcome modal as fallback');
        setShowWelcomeModal(true);
      }
    } catch (error) {
      console.error('❌ User check error:', error);
      // On error, show modal to be safe
      toast.error('Kullanıcı kontrolü başarısız, lütfen tekrar deneyin.');
      setShowWelcomeModal(true);
    } finally {
      setCheckingUser(false);
    }
  };

  const handleWelcomeAccept = async (emailSubscription: boolean) => {
    console.log('📝 Registering new user:', {
      email: session?.user?.email,
      name: session?.user?.name,
      emailSubscription,
    });

    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          acceptedTerms: true,
          emailSubscription,
        }),
      });

      const data = await response.json();
      console.log('📋 Registration response:', data);

      if (data.success) {
        const firstName = session?.user?.name?.split(' ')[0] || 'Kullanıcı';
        toast.success(`Hoş geldiniz ${firstName}! Hesabınız oluşturuldu. 🎉`);
        setShowWelcomeModal(false);

        // Redirect to profile for completion
        console.log('✅ Registration successful - redirecting to profile');
        setTimeout(() => {
          router.push('/profil');
        }, 1500);
      } else {
        console.error('❌ Registration failed:', data.error);
        toast.error(data.error || 'Kayıt sırasında bir hata oluştu.');
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      toast.error('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/giris' }); // Redirect back to /giris for check
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  if (status === 'loading' || checkingUser) {
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
                  <h3 className="font-bold text-lg text-gray-800 mb-1">1 Ay Ücretsiz</h3>
                  <p className="text-gray-600">
                    Tüm özellikleri 1 ay boyunca ücretsiz deneyin. Kredi kartı gerekmez.
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
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Giriş yaparak{' '}
                  <Link href="/kullanim-kosullari" className="text-[#860000] hover:underline">
                    Kullanım Koşulları
                  </Link>{' '}
                  ve{' '}
                  <Link href="/gizlilik-politikasi" className="text-[#860000] hover:underline">
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
          </div>
        </div>
      </main>

      {/* Welcome Modal for New Users */}
      {showWelcomeModal && session && (
        <WelcomeModal
          isOpen={showWelcomeModal}
          userInfo={{
            name: session.user?.name,
            email: session.user?.email,
            image: session.user?.image,
          }}
          onAccept={handleWelcomeAccept}
        />
      )}
    </div>
  );
}
