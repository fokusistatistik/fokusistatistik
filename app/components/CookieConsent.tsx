'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('fokusCookieConsent');

    if (!cookieConsent) {
      // Show banner after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    // Save consent to localStorage
    localStorage.setItem('fokusCookieConsent', 'accepted');
    localStorage.setItem('fokusCookieConsentDate', new Date().toISOString());

    // Dispatch event for Google Analytics
    window.dispatchEvent(new Event('cookieConsentAccepted'));

    // Hide banner with animation
    setIsVisible(false);

  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-6 shadow-2xl z-[9998] animate-slideInUp border-t-4 border-[#860000]"
      role="alert"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Cookie Icon */}
        <div className="hidden md:flex items-center justify-center w-16 h-16 bg-[#860000]/20 rounded-full flex-shrink-0">
          <span className="text-4xl">🍪</span>
        </div>

        {/* Message */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm md:text-base leading-relaxed">
            İnternet sitemizde yasal düzenlemelere uygun çerezler (cookies) kullanıyoruz.
            Detaylı bilgiye{' '}
            <Link
              href="/cerez-politikasi"
              className="text-[#ffc107] hover:text-yellow-300 underline font-medium transition-colors"
              target="_blank"
            >
              Çerez Politikası
            </Link>
            {' '}ve{' '}
            <Link
              href="/kvkk-aydinlatma"
              className="text-[#ffc107] hover:text-yellow-300 underline font-medium transition-colors"
              target="_blank"
            >
              KVKK Aydınlatma Metni
            </Link>
            {' '}sayfalarımızdan erişebilirsiniz.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={acceptCookies}
            className="bg-[#860000] hover:bg-[#a30000] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap"
          >
            Tümünü Kabul Et
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out;
        }

        @media (max-width: 768px) {
          .fixed {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}
