'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="w-16 h-16 text-[#860000]" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Bir Hata Oluştu
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Üzgünüz, beklenmeyen bir hata meydana geldi.
          </p>
          <p className="text-sm text-gray-500">
            Teknik ekibimiz bu hatadan haberdar edildi ve en kısa sürede çözüm sağlanacak.
          </p>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-gray-800 rounded-lg text-left">
            <p className="text-red-400 text-sm font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-gray-400 text-xs font-mono mt-2">
                Error Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={reset}
            className="flex items-center gap-2 bg-[#860000] hover:bg-[#a30000] text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <RefreshCw size={20} />
            Tekrar Dene
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#860000] px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg border-2 border-[#860000]"
          >
            <Home size={20} />
            Ana Sayfaya Dön
          </Link>
        </div>

        {/* Help Section */}
        <div className="border-t border-gray-300 pt-8">
          <p className="text-sm text-gray-600 mb-4">
            Sorun devam ederse bizimle iletişime geçin:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/iletisim"
              className="text-[#860000] hover:underline font-semibold"
            >
              📧 İletişim Formu
            </Link>
            <span className="hidden sm:inline text-gray-300">•</span>
            <a
              href="mailto:bilgi@fokusistatistik.com"
              className="text-[#860000] hover:underline font-semibold"
            >
              ✉️ bilgi@fokusistatistik.com
            </a>
            <span className="hidden sm:inline text-gray-300">•</span>
            <a
              href="https://wa.me/905354040712"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#860000] hover:underline font-semibold"
            >
              💬 WhatsApp Destek
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-amber-50 rounded-lg">
          <p className="text-sm text-gray-700">
            🔧 <strong>Sorun giderme ipuçları:</strong>
            <br />
            • Sayfayı yenilemeyi deneyin
            <br />
            • Tarayıcı önbelleğini temizleyin
            <br />• Farklı bir tarayıcıda açmayı deneyin
          </p>
        </div>
      </div>
    </div>
  );
}
