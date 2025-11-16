'use client';

import { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function RandevuToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if toast was already seen in this session
    const toastSeen = sessionStorage.getItem('fokusRandevuToastSeen');

    if (!toastSeen) {
      // Show toast after 5 seconds
      const showTimer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('fokusRandevuToastSeen', 'true');

        // Auto-hide after 12 seconds
        const hideTimer = setTimeout(() => {
          handleClose();
        }, 12000);

        return () => clearTimeout(hideTimer);
      }, 5000);

      return () => clearTimeout(showTimer);
    }
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const trackClick = () => {
    console.log('Randevu Toast CTA clicked');
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'Toast',
        event_label: 'Randevu Sistemi - Toast CTA',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-24 right-6 z-[10000] max-w-[320px] transition-all duration-300 ${
        isExiting ? 'translate-x-[350px] opacity-0' : 'translate-x-0 opacity-100'
      }`}
    >
      {/* Modern Minimal Toast */}
      <div className="relative backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 overflow-hidden">
        {/* Gradient Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#860000] via-[#a30000] to-[#860000]"></div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          aria-label="Kapat"
        >
          <X className="w-4 h-4 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
        </button>

        {/* Content */}
        <div className="pr-6">
          {/* Icon + Badge */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#860000] to-[#a30000] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-[10px] font-semibold text-[#860000] uppercase tracking-wider">
              Özel Fırsat
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5 leading-snug">
            Randevu Sistemi 1 Ay Ücretsiz
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
            AI destekli randevu sistemi ile müşterileriniz 7/24 kolayca randevu alabilsin
          </p>

          {/* CTA Button */}
          <a
            href="https://asistan.fokusistatistik.com/fokusdemorandevusistemi/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackClick}
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-[#860000] to-[#a30000] hover:from-[#a30000] hover:to-[#860000] text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Hemen Dene
          </a>
        </div>
      </div>
    </div>
  );
}
