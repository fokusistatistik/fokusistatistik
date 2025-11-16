'use client';

import { useState, useEffect } from 'react';

export default function PromotionCTA() {
  const [showToast, setShowToast] = useState(false);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFloatingClosing, setIsFloatingClosing] = useState(false);

  useEffect(() => {
    const toastSeen = localStorage.getItem('fokusToastSeen');
    const floatingCtaDismissed = localStorage.getItem('fokusFloatingCtaDismissed');

    if (!toastSeen) {
      // Show toast after 5 seconds
      const timer = setTimeout(() => {
        setShowToast(true);

        // Auto-hide after 15 seconds
        setTimeout(() => {
          closeToast();
        }, 15000);
      }, 5000);

      return () => clearTimeout(timer);
    } else if (!floatingCtaDismissed) {
      // If toast was already seen but floating CTA wasn't dismissed, show it
      setShowFloatingCta(true);
    }
  }, []);

  const closeToast = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowToast(false);
      setIsClosing(false);
      setShowFloatingCta(true);
      localStorage.setItem('fokusToastSeen', 'true');
    }, 500);
  };

  const closeFloatingCta = () => {
    setIsFloatingClosing(true);
    setTimeout(() => {
      setShowFloatingCta(false);
      setIsFloatingClosing(false);
      localStorage.setItem('fokusFloatingCtaDismissed', 'true');
    }, 300);
  };

  const trackToastClick = () => {
    console.log('Toast CTA clicked - Randevu Sistemi Campaign');
  };

  const trackFloatingClick = () => {
    console.log('Floating CTA clicked - Ücretsiz Deneme Campaign');
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div
          className={`fixed top-20 right-5 bg-gradient-to-br from-[#860000] to-[#a30000] text-white p-5 rounded-xl shadow-2xl max-w-[380px] z-[10000] ${
            isClosing ? 'animate-slideOutRight' : 'animate-slideInRight'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider">
              🎁 Özel Fırsat
            </span>
            <button
              onClick={closeToast}
              className="text-white text-2xl w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/15 transition-all opacity-90 hover:opacity-100"
              aria-label="Kapat"
            >
              ×
            </button>
          </div>

          <div className="flex gap-3">
            <img
              src="https://static.fokusistatistik.com/asistanlar/fokus216kare.png"
              alt="FOKUS216"
              className="w-[60px] h-[60px] rounded-full object-cover border-2 border-white/30 flex-shrink-0 bg-blue-50"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            <div className="flex-1">
              <h3 className="text-base font-semibold mb-2 leading-tight">
                Randevu Sistemi İlk 1 Ay Ücretsiz!
              </h3>
              <p className="text-[13px] leading-relaxed mb-3 opacity-95">
                Yapay zeka destekli randevu sistemi. Müşterileriniz 7/24 otomatik randevu alabilsin.
              </p>
              <div className="flex gap-3 mb-3 flex-wrap">
                <span className="text-[11px] opacity-90 flex items-center gap-1">
                  <span className="font-bold text-[13px]">✓</span> Hızlı Kurulum
                </span>
                <span className="text-[11px] opacity-90 flex items-center gap-1">
                  <span className="font-bold text-[13px]">✓</span> 7/24 Aktif
                </span>
                <span className="text-[11px] opacity-90 flex items-center gap-1">
                  <span className="font-bold text-[13px]">✓</span> Pratik
                </span>
              </div>
              <a
                href="https://asistan.fokusistatistik.com/fokusdemorandevusistemi/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackToastClick}
                className="inline-block bg-white text-[#860000] px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-all hover:bg-gray-50 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                Hemen Başla →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating CTA Button */}
      {showFloatingCta && (
        <div
          className={`fixed top-[86px] left-[30px] z-[9999] max-md:top-auto max-md:bottom-5 max-md:left-1/2 max-md:-translate-x-1/2 ${
            isFloatingClosing ? 'animate-fadeOut' : 'animate-slideInUp'
          }`}
        >
          <div className="relative group">
            <a
              href="https://asistan.fokusistatistik.com/ucretsiz.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackFloatingClick}
              className="bg-gradient-to-br from-[#860000] to-[#a30000] text-white px-5 py-3 rounded-full shadow-xl font-semibold text-xs transition-all hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2 hover:scale-105 max-md:px-6 max-md:py-3.5"
            >
              <span className="text-[17px] animate-bounce">🎁</span>
              <span className="whitespace-nowrap">1 Ay Ücretsiz Dene</span>
            </a>
            <button
              onClick={closeFloatingCta}
              className="absolute -top-2 -right-2 bg-white text-[#860000] rounded-full w-6 h-6 flex items-center justify-center text-lg font-bold shadow-md hover:bg-gray-100 transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Kapat"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }

        .animate-slideOutRight {
          animation: slideOutRight 0.5s ease-in;
        }

        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out;
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .animate-fadeOut {
          animation: fadeOut 0.3s ease-out;
        }

        @media (max-width: 768px) {
          .fixed.top-20 {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: calc(100% - 20px);
            padding: 14px 16px;
          }
        }
      `}</style>
    </>
  );
}
