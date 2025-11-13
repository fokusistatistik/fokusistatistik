'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, X, Volume2 } from 'lucide-react';

export default function VapiWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button - Sol Alt */}
      <button
        onClick={toggleWidget}
        className="fixed bottom-6 left-6 z-[9998] bg-gradient-to-br from-[#860000] to-[#a30000] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        style={{ width: '64px', height: '64px' }}
        aria-label="FOKUS520 Sesli Asistan"
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <div className="relative">
            <Image
              src="https://www.fokusistatistik.com/assets/img/fokus520.png"
              alt="FOKUS520"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
              <Volume2 className="w-3 h-3 text-white" />
            </div>
          </div>
        )}
      </button>

      {/* Widget Penceresi */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-[9998] w-[380px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideInUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#860000] to-[#a30000] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="https://www.fokusistatistik.com/assets/img/fokus520.png"
                  alt="FOKUS520"
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-white"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">FOKUS520</h3>
                <p className="text-xs text-white/90">Sesli Asistan - Pazarlama & Lead</p>
              </div>
            </div>
            <button
              onClick={toggleWidget}
              className="hover:bg-white/20 rounded-full p-1.5 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 bg-gray-50">
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4 border-l-4 border-[#860000]">
              <div className="flex items-start gap-3">
                <Phone className="w-6 h-6 text-[#860000] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Sesli Asistan ile Konuşun
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    FOKUS520, pazarlama ve lead takip konularında size yardımcı olacak yapay zeka destekli sesli asistanınız.
                  </p>
                  <ul className="space-y-1.5 text-sm text-gray-700 mb-4">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Lead yönetimi ve takibi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Pazarlama kampanya analizi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Müşteri segmentasyonu</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Performans raporları</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Vapi Integration Placeholder */}
            <div className="bg-gradient-to-br from-[#860000] to-[#a30000] rounded-xl p-6 text-white text-center">
              <Volume2 className="w-12 h-12 mx-auto mb-3 animate-pulse" />
              <h4 className="font-semibold mb-2">Sesli Görüşme Başlat</h4>
              <p className="text-sm text-white/90 mb-4">
                Mikrofon izni vererek sesli asistanımızla konuşabilirsiniz
              </p>
              <button className="bg-white text-[#860000] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md w-full flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                <span>Görüşmeyi Başlat</span>
              </button>
              <p className="text-xs text-white/70 mt-3">
                Vapi teknolojisi ile güçlendirilmiştir
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 text-center">
              <a
                href="/sanalasistanlar/fokus520"
                className="text-sm text-[#860000] hover:underline font-medium"
              >
                FOKUS520 hakkında detaylı bilgi →
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
