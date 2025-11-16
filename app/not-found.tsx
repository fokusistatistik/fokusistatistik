import Link from 'next/link';
import { Home, Search, ArrowLeft, Bot } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-[150px] md:text-[200px] font-bold text-gray-200 leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Bot className="w-24 h-24 md:w-32 md:h-32 text-[#860000] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Sayfa Bulunamadı
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
          <p className="text-base text-gray-500">
            FOKUS Sanal Asistanlarımız bile bu sayfayı bulamadı! 🤖
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#860000] hover:bg-[#a30000] text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <Home size={20} />
            Ana Sayfaya Dön
          </Link>

          <Link
            href="/sanalasistanlar"
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#860000] px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg border-2 border-[#860000]"
          >
            <Bot size={20} />
            Sanal Asistanlar
          </Link>
        </div>

        {/* Quick Links */}
        <div className="border-t border-gray-300 pt-8">
          <p className="text-sm text-gray-500 mb-4">Popüler Sayfalar:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/hakkimizda"
              className="text-sm text-gray-600 hover:text-[#860000] transition-colors"
            >
              Hakkımızda
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/yapay-zeka-danismanligi"
              className="text-sm text-gray-600 hover:text-[#860000] transition-colors"
            >
              YZ Danışmanlığı
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/fiyatlandirma"
              className="text-sm text-gray-600 hover:text-[#860000] transition-colors"
            >
              Fiyatlandırma
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="https://asistan.fokusistatistik.com/ucretsiz.html"
              className="text-sm text-gray-600 hover:text-[#860000] transition-colors"
            >
              Demo
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/iletisim"
              className="text-sm text-gray-600 hover:text-[#860000] transition-colors"
            >
              İletişim
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            🎯 Yardıma mı ihtiyacınız var?{' '}
            <Link href="/iletisim" className="text-[#860000] hover:underline font-semibold">
              Bizimle iletişime geçin
            </Link>
            {' '}veya{' '}
            <Link href="/sss" className="text-[#860000] hover:underline font-semibold">
              SSS sayfamıza
            </Link>
            {' '}göz atın.
          </p>
        </div>
      </div>
    </div>
  );
}
