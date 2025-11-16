'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

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

        // Auto-hide after 15 seconds
        const hideTimer = setTimeout(() => {
          handleClose();
        }, 15000);

        return () => clearTimeout(hideTimer);
      }, 5000);

      return () => clearTimeout(showTimer);
    }
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
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
      className={`fixed top-20 right-5 z-[10000] max-w-[380px] transition-all duration-500 ${
        isExiting ? 'translate-x-[400px] opacity-0' : 'translate-x-0 opacity-100'
      }`}
    >
      <div className="bg-gradient-to-br from-[#860000] to-[#a30000] text-white rounded-xl shadow-2xl p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide">
            🎁 Özel Fırsat
          </span>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/15 transition"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex gap-3">
          {/* Image */}
          <div className="flex-shrink-0">
            <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden bg-white/10 border-2 border-white/30">
              <Image
                src="https://www.fokusistatistik.com/assets/img/fokus216kare.png"
                alt="FOKUS216"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold mb-2 leading-tight">
              Randevu Sistemi İlk 1 Ay Ücretsiz!
            </h3>
            <p className="text-[13px] opacity-95 mb-3 leading-relaxed">
              Yapay zeka destekli randevu sistemi. Müşterileriniz 7/24 otomatik randevu alabilsin.
            </p>

            {/* Features */}
            <div className="flex gap-3 mb-3 flex-wrap">
              <span className="flex items-center gap-1 text-[11px] opacity-90">
                <span className="font-bold text-[13px]">✓</span>
                Hızlı Kurulum
              </span>
              <span className="flex items-center gap-1 text-[11px] opacity-90">
                <span className="font-bold text-[13px]">✓</span>
                7/24 Aktif
              </span>
              <span className="flex items-center gap-1 text-[11px] opacity-90">
                <span className="font-bold text-[13px]">✓</span>
                Pratik
              </span>
            </div>

            {/* CTA Button */}
            <a
              href="https://asistan.fokusistatistik.com/fokusdemorandevusistemi/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackClick}
              className="inline-block w-full bg-white text-[#860000] px-5 py-2.5 rounded-lg text-[13px] font-semibold text-center hover:bg-gray-100 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Hemen Başla →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
