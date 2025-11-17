'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

function AbonelikYonetimiContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>('');
  const [reasons, setReasons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get('email') || searchParams.get('e') || '';
    setEmail(decodeURIComponent(emailParam));
  }, [searchParams]);

  const handleReasonChange = (reason: string, checked: boolean) => {
    if (checked) {
      setReasons([...reasons, reason]);
    } else {
      setReasons(reasons.filter((r) => r !== reason));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const unsubscribeData = {
      email: email,
      reasons: reasons,
      feedback: feedback,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://n8n.fokusistatistik.com/webhook/epostaaboneligiiptal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(unsubscribeData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          window.location.href = 'https://www.fokusistatistik.com';
        }, 3000);
      } else {
        alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    } catch (error) {
      console.error('Hata:', error);
      alert('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  const reasonOptions = [
    'Çok fazla e-posta alıyorum',
    'İçerikler ilgimi çekmiyor',
    'Hizmetinizi kullanmayı bıraktım',
    'Bu e-posta adresini artık kullanmıyorum',
    'Diğer',
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col max-h-[calc(100vh-100px)]">
        {/* Header */}
        <div className="bg-white p-6 text-center border-b border-gray-200">
          <div className="inline-block bg-white p-4 rounded-2xl mb-3">
            <img
              src="https://static.fokusistatistik.com/logolar/fokuslogo1.png"
              alt="FOKUS İstatistik Logo"
              className="h-16 w-auto object-contain"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            E-posta Tercihlerinizi Yönetin
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            E-posta listemizden ayrılmak istediğinizi görüyoruz. Geri bildiriminiz bizim için önemli.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* Email Display */}
          <div className="bg-blue-50 border-l-4 border-[#860000] p-4 rounded-lg mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-1">E-posta Adresiniz:</p>
            <p className={`font-semibold text-base break-all ${email ? 'text-[#860000]' : 'text-red-600'}`}>
              {email || 'E-posta bulunamadı'}
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6 animate-slideIn">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">İşlem Başarılı</h3>
                  <p className="text-sm text-green-800">
                    E-posta aboneliğiniz başarıyla iptal edildi. Geri bildiriminiz için teşekkür ederiz.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          {!showSuccess && (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              {/* Reasons Section */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5">
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  Ayrılma nedeniniz nedir? (Opsiyonel)
                </p>

                <div className="space-y-2">
                  {reasonOptions.map((reason, index) => (
                    <label
                      key={index}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#860000]/5 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 accent-[#860000] cursor-pointer"
                        checked={reasons.includes(reason)}
                        onChange={(e) => handleReasonChange(reason, e.target.checked)}
                      />
                      <span className="text-sm text-gray-700">{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div className="mb-5">
                <label htmlFor="feedback" className="block text-sm font-semibold text-gray-900 mb-2">
                  Eklemek istediğiniz bir şey var mı?
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Geri bildiriminiz bize yol gösterir..."
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none transition text-sm resize-vertical min-h-[80px]"
                />
              </div>

              {/* Info Box */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded mb-5">
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Not:</strong> E-posta aboneliğinizi iptal etseniz bile önemli hesap bildirimleri ve işlem onayları gibi zorunlu e-postaları almaya devam edeceksiniz.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => window.location.href = 'https://www.fokusistatistik.com'}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'İşleniyor...' : 'Abonelikten Çık'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-600">
            Fikrinizi değiştirirseniz, her zaman{' '}
            <a href="https://www.fokusistatistik.com" className="text-[#860000] font-semibold hover:underline">
              fokusistatistik.com
            </a>{' '}
            üzerinden tekrar abone olabilirsiniz.
          </p>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #860000;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b0000;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease;
        }
      `}</style>
    </div>
  );
}

export default function AbonelikYonetimiPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block bg-white p-4 rounded-2xl mb-3">
            <img
              src="https://static.fokusistatistik.com/logolar/fokuslogo1.png"
              alt="FOKUS Logo"
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    }>
      <AbonelikYonetimiContent />
    </Suspense>
  );
}
