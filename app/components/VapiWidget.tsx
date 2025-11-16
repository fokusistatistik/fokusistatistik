'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Phone, X, Volume2, PhoneOff } from 'lucide-react';
import Vapi from '@vapi-ai/web';

export default function VapiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<string>('');
  const [micPermission, setMicPermission] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const vapiRef = useRef<any>(null);

  // Vapi Configuration
  const VAPI_PUBLIC_KEY = '803df5c1-1a3a-4c20-a663-aaec4b67293f';
  const ASSISTANT_ID = '0f0f02b2-7d79-42fe-b1e7-e5dd12be1262';

  useEffect(() => {
    checkMicrophonePermission();

    // Vapi instance oluştur
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(VAPI_PUBLIC_KEY);

      // Event listeners
      vapiRef.current.on('call-start', () => {
        console.log('Call started');
        setIsCallActive(true);
        setCallStatus('Bağlantı kuruldu');
      });

      vapiRef.current.on('call-end', () => {
        console.log('Call ended');
        setIsCallActive(false);
        setCallStatus('');
      });

      vapiRef.current.on('speech-start', () => {
        setCallStatus('Konuşuyor...');
      });

      vapiRef.current.on('speech-end', () => {
        setCallStatus('Dinliyor...');
      });

      vapiRef.current.on('error', (error: any) => {
        console.error('Vapi error:', error);
        setCallStatus('Hata oluştu');
        setIsCallActive(false);
      });
    }

    // Cleanup
    return () => {
      if (vapiRef.current && isCallActive) {
        vapiRef.current.stop();
      }
    };
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        setMicPermission(permission.state as 'granted' | 'denied');

        permission.onchange = () => {
          setMicPermission(permission.state as 'granted' | 'denied');
        };
      }
    } catch (error) {
      console.error('Mikrofon izni kontrol hatası:', error);
    }
  };

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setMicPermission('granted');
      return true;
    } catch (error: any) {
      setMicPermission('denied');

      if (error.name === 'NotAllowedError') {
        alert('Sesli asistan için mikrofon izni gerekli. Lütfen tarayıcı ayarlarından mikrofon iznini aktifleştirin.');
      } else if (error.name === 'NotFoundError') {
        alert('Mikrofon bulunamadı. Lütfen mikrofonunuzun bağlı olduğundan emin olun.');
      } else {
        alert('Mikrofon erişim hatası: ' + error.message);
      }

      return false;
    }
  };

  const startCall = async () => {
    if (!vapiRef.current) {
      alert('Vapi başlatılamadı. Lütfen sayfayı yenileyin.');
      return;
    }

    if (micPermission !== 'granted') {
      const permissionGranted = await requestMicrophonePermission();
      if (!permissionGranted) return;
    }

    try {
      setCallStatus('Bağlanıyor...');
      await vapiRef.current.start(ASSISTANT_ID);
    } catch (error: any) {
      console.error('Call start error:', error);
      alert('Arama başlatılamadı: ' + (error.message || 'Bilinmeyen hata'));
      setCallStatus('');
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
      setIsCallActive(false);
      setCallStatus('');
    }
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button - Sol Alt */}
      <div className="fixed bottom-6 left-6 z-[9998]">
        <button
          onClick={toggleWidget}
          className="bg-gradient-to-br from-[#860000] to-[#a30000] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          style={{ width: '64px', height: '64px' }}
          aria-label="FOKUS520 Sesli Asistan"
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <div className="relative">
              <Image
                src="https://static.fokusistatistik.com/asistanlar/fokus520.png"
                alt="FOKUS520"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
                <Volume2 className="w-3 h-3 text-white" />
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Widget Penceresi */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-[9998] w-[380px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideInUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#860000] to-[#a30000] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="https://static.fokusistatistik.com/asistanlar/fokus520.png"
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

            {/* Vapi Call Controls */}
            <div className="bg-gradient-to-br from-[#860000] to-[#a30000] rounded-xl p-6 text-white text-center">
              {!isCallActive ? (
                <>
                  <Volume2 className="w-12 h-12 mx-auto mb-3 animate-pulse" />
                  <h4 className="font-semibold mb-2">Sesli Görüşme Başlat</h4>
                  <p className="text-sm text-white/90 mb-4">
                    Mikrofon izni vererek sesli asistanımızla konuşabilirsiniz
                  </p>
                  <button
                    onClick={startCall}
                    className="bg-white text-[#860000] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md w-full flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Görüşmeyi Başlat</span>
                  </button>
                  <p className="text-xs text-white/70 mt-3">
                    Vapi teknolojisi ile güçlendirilmiştir
                  </p>
                </>
              ) : (
                <>
                  <div className="relative">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Volume2 className="w-12 h-12 animate-pulse" />
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white/30 animate-ping"></div>
                  </div>
                  <h4 className="font-semibold mb-2 text-lg">Görüşme Aktif</h4>
                  {callStatus && (
                    <p className="text-sm text-white/90 mb-4">{callStatus}</p>
                  )}
                  <button
                    onClick={endCall}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition shadow-md w-full flex items-center justify-center gap-2"
                  >
                    <PhoneOff className="w-5 h-5" />
                    <span>Görüşmeyi Sonlandır</span>
                  </button>
                </>
              )}
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

        @keyframes slideInLeft {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.3s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
