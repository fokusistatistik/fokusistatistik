'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, X, Shield, Mail, FileText } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose?: () => void;
  userInfo: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onAccept: (emailSubscription: boolean) => Promise<void>;
}

export default function WelcomeModal({ isOpen, onClose, userInfo, onAccept }: WelcomeModalProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [emailSubscription, setEmailSubscription] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleAccept = async () => {
    if (!acceptedTerms) {
      alert('Lütfen Kullanım Koşulları ve Gizlilik Politikası\'nı kabul edin.');
      return;
    }

    setIsLoading(true);
    console.log('🚀 Welcome modal - user accepting terms:', {
      email: userInfo.email,
      name: userInfo.name,
      emailSubscription,
      acceptedTerms,
    });

    try {
      await onAccept(emailSubscription);
      console.log('✅ Welcome modal - onAccept completed');
    } catch (error) {
      console.error('❌ Registration error in modal:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      setIsLoading(false); // Only reset on error
    }
    // Note: Don't reset loading on success - parent will handle redirect
  };

  return (
    <>
      <style jsx global>{`
        .welcome-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        .welcome-modal-content {
          background: white;
          border-radius: 20px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
          position: relative;
        }

        .welcome-modal-header {
          background: linear-gradient(135deg, #860000 0%, #b30000 100%);
          color: white;
          padding: 32px;
          text-align: center;
          position: relative;
        }

        .welcome-modal-body {
          padding: 32px;
        }

        .welcome-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          color: white;
          font-size: 24px;
          cursor: pointer;
          transition: background 0.2s;
          display: none; /* Hide close button - user must accept */
        }

        .welcome-modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 768px) {
          .welcome-modal-header,
          .welcome-modal-body {
            padding: 24px;
          }

          .welcome-modal-content {
            max-height: 95vh;
          }
        }
      `}</style>

      <div className="welcome-modal-backdrop">
        <div className="welcome-modal-content">
          {/* Header */}
          <div className="welcome-modal-header">
            {onClose && (
              <button className="welcome-modal-close" onClick={onClose}>
                ×
              </button>
            )}

            <div className="mb-4">
              {userInfo.image ? (
                <img
                  src={userInfo.image}
                  alt={userInfo.name || 'User'}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-full mx-auto bg-white/20 flex items-center justify-center text-3xl font-bold">
                  {userInfo.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>

            <h2 className="text-3xl font-bold mb-2">Hoş Geldiniz! 🎉</h2>
            <p className="text-white/90 text-lg">
              {userInfo.name || 'Değerli Kullanıcımız'}
            </p>
            <p className="text-white/80 text-sm mt-1">{userInfo.email}</p>
          </div>

          {/* Body */}
          <div className="welcome-modal-body">
            <div className="text-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Google ile Giriş Başarılı!
              </h3>
              <p className="text-gray-600">
                FOKUS İstatistik ailesine katıldınız. Hesabınızı tamamlamak için lütfen aşağıdaki bilgileri onaylayın.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Güvenli ve Gizli</h4>
                  <p className="text-sm text-gray-600">
                    Verileriniz KVKK uyumlu altyapımızda güvende tutulur.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <Mail className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">1 Ay Ücretsiz Deneme</h4>
                  <p className="text-sm text-gray-600">
                    Tüm özellikleri ücretsiz keşfedin. Kredi kartı gerekmez.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">9 Sanal Asistan</h4>
                  <p className="text-sm text-gray-600">
                    İş süreçlerinizi otomatikleştirin, verimliliği artırın.
                  </p>
                </div>
              </div>
            </div>

            {/* Email Subscription */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer p-4 border-2 border-gray-200 rounded-lg hover:border-[#860000] transition">
                <input
                  type="checkbox"
                  checked={emailSubscription}
                  onChange={(e) => setEmailSubscription(e.target.checked)}
                  className="w-5 h-5 text-[#860000] border-gray-300 rounded focus:ring-2 focus:ring-[#860000] mt-0.5"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">E-posta bildirimleri almak istiyorum</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Yeni özellikler, kampanyalar ve özel tekliflerden haberdar olun. İstediğiniz zaman iptal edebilirsiniz.
                  </div>
                </div>
              </label>
            </div>

            {/* Terms Agreement */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer p-4 border-2 border-[#860000] bg-red-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-5 h-5 text-[#860000] border-gray-300 rounded focus:ring-2 focus:ring-[#860000] mt-0.5"
                  required
                />
                <div className="flex-1 text-sm">
                  <span className="text-gray-900 font-medium">
                    <Link href="/kullanim-kosullari" target="_blank" className="text-[#860000] hover:underline">
                      Kullanım Koşulları
                    </Link>
                    {', '}
                    <Link href="/gizlilik-politikasi" target="_blank" className="text-[#860000] hover:underline">
                      Gizlilik Politikası
                    </Link>
                    {' ve '}
                    <Link href="/kvkk-aydinlatma" target="_blank" className="text-[#860000] hover:underline">
                      KVKK Aydınlatma Metni
                    </Link>
                    'ni okudum ve kabul ediyorum. *
                  </span>
                </div>
              </label>
            </div>

            {/* Action Button */}
            <button
              onClick={handleAccept}
              disabled={!acceptedTerms || isLoading}
              className="w-full bg-[#860000] hover:bg-[#b30000] text-white font-semibold py-4 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Devam Et ve Hesabımı Oluştur
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Bu bilgiler backend sistemimizde güvenli şekilde saklanacaktır.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
