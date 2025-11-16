'use client';

import { Suspense, useState, FormEvent, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';


// Force dynamic rendering to avoid pre-render issues with useSearchParams
export const dynamic = 'force-dynamic';
interface SurveyPayload {
  sirket_id: string | null;
  kayit_id: string | null;
  puan: number;
  yorum: string;
  meta: {
    kaynak: string;
    tarayici: string;
    cihaz_tipi: string;
    gonderim_saati: string;
    url_parametreleri: {
      sirket_id: string | null;
      kayit_id: string | null;
    };
  };
}

function SurveyContent() {
  const searchParams = useSearchParams();
  const [rating, setRating] = useState<number | null>(null);
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sirket_id = searchParams.get('sirket_id');
  const kayit_id = searchParams.get('kayit_id');

  useEffect(() => {
    if (!sirket_id || !kayit_id) {
      console.warn('Şirket ID veya Kayıt ID bulunamadı. URL parametreleri eksik olabilir.');
    }
  }, [sirket_id, kayit_id]);

  const getDeviceType = (): string => {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return 'mobil';
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
    return 'masaüstü';
  };

  const formatDateTR = (date: Date): string => {
    const gun = String(date.getDate()).padStart(2, '0');
    const ay = String(date.getMonth() + 1).padStart(2, '0');
    const yil = date.getFullYear();
    const saat = String(date.getHours()).padStart(2, '0');
    const dakika = String(date.getMinutes()).padStart(2, '0');
    return `${gun}.${ay}.${yil} ${saat}:${dakika}`;
  };

  const ratingOptions = [
    { value: 1, emoji: '😞', text: 'Çok Kötü' },
    { value: 2, emoji: '😕', text: 'Kötü' },
    { value: 3, emoji: '😐', text: 'Orta' },
    { value: 4, emoji: '🙂', text: 'İyi' },
    { value: 5, emoji: '😍', text: 'Mükemmel' }
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!rating) {
      alert('Lütfen değerlendirme puanı seçiniz.');
      return;
    }

    setIsLoading(true);

    const payload: SurveyPayload = {
      sirket_id,
      kayit_id,
      puan: rating,
      yorum: comments || '',
      meta: {
        kaynak: 'global_survey_page',
        tarayici: navigator.userAgent,
        cihaz_tipi: getDeviceType(),
        gonderim_saati: formatDateTR(new Date()),
        url_parametreleri: {
          sirket_id,
          kayit_id
        }
      }
    };

    try {
      const response = await fetch('https://n8n.fokusistatistik.com/webhook/fokusbasitanket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Gönderim başarısız.');

      setIsSubmitted(true);

      // Scroll to success message
      setTimeout(() => {
        document.getElementById('success-message')?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    } catch (error) {
      alert('Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Anket gönderimi hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-5 pb-10 bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="max-w-xl w-full bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-[#860000]/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-20 bg-gradient-to-bl from-[#860000]/8 to-transparent rounded-bl-[60px]" />
        <div className="absolute bottom-0 left-0 w-24 h-16 bg-gradient-to-tr from-[#860000]/6 to-transparent rounded-tr-[50px]" />

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="absolute -top-5 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#860000]/50 to-transparent rounded" />
          <h1 className="text-3xl md:text-4xl font-semibold text-[#860000] mb-3 tracking-wide">
            Hizmet Değerlendirme
          </h1>
          <p className="text-gray-600 text-base md:text-lg font-medium">
            Deneyiminizi bizimle paylaşın
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative z-10">
          {/* Rating Question */}
          <div className="mb-6">
            <label className="block text-base md:text-lg font-semibold text-gray-700 mb-4 leading-relaxed">
              Aldığınız hizmeti nasıl değerlendiriyorsunuz? <span className="text-[#860000] font-bold">*</span>
            </label>

            <div className="flex justify-between bg-gray-50 p-4 md:p-5 rounded-xl border border-gray-200">
              {ratingOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex-1 text-center cursor-pointer px-1 py-2 pb-7 md:p-3 md:pb-8 rounded-lg transition-all relative ${
                    rating === option.value ? 'bg-[#860000]/5' : 'hover:bg-[#860000]/5 hover:-translate-y-0.5'
                  }`}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={option.value}
                    checked={rating === option.value}
                    onChange={() => setRating(option.value)}
                    disabled={isSubmitted}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 cursor-pointer accent-[#860000]"
                    required
                  />
                  <span className={`block text-[28px] md:text-[32px] mb-2 transition-transform ${
                    rating === option.value ? 'scale-110' : ''
                  }`}>
                    {option.emoji}
                  </span>
                  <span className={`block text-[11px] md:text-xs font-medium mb-2 ${
                    rating === option.value ? 'text-[#860000] font-semibold' : 'text-gray-600'
                  }`}>
                    {option.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="mb-8">
            <label htmlFor="comments" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
              Görüş, öneri ve yorumlarınız (opsiyonel):
            </label>
            <textarea
              id="comments"
              name="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              disabled={isSubmitted}
              placeholder="Deneyiminizi, önerilerinizi veya yorumlarınızı buraya yazabilirsiniz..."
              className="w-full p-4 text-sm md:text-base rounded-xl border border-gray-300 bg-gray-50 resize-vertical min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#860000] focus:border-transparent focus:bg-white transition-all disabled:opacity-50"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitted || isLoading}
            className="block mx-auto bg-gradient-to-br from-[#860000] to-[#a30000] text-white font-semibold py-4 px-10 rounded-xl text-base md:text-lg uppercase tracking-wide shadow-lg hover:from-[#a30000] hover:to-[#c40000] hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
          >
            {isLoading ? 'Gönderiliyor...' : isSubmitted ? 'Gönderildi' : 'Değerlendirmeyi Gönder'}
          </button>

          {/* Success Message */}
          {isSubmitted && (
            <div
              id="success-message"
              className="mt-6 text-center p-5 bg-gradient-to-br from-green-100 to-green-200 border border-green-300 rounded-xl text-green-800 font-semibold"
            >
              <div className="text-4xl text-green-600 mb-2">✓</div>
              Değerli geri bildiriminiz için teşekkür ederiz!
              <br />
              <small className="text-sm">Görüşünüz bizim için çok önemli.</small>
            </div>
          )}
        </form>
      </div>

      {/* Footer */}
      <div className="max-w-xl w-full mt-6 text-center text-sm text-gray-600 relative">
        <div className="absolute -top-3 left-[30%] w-[40%] h-px bg-gradient-to-r from-transparent via-[#860000]/30 to-transparent" />
        <p className="my-2">Geri bildiriminiz hizmet kalitemizi artırmamıza yardımcı oluyor.</p>
        <p className="text-xs my-2">
          Bu anket gizlilik politikamız çerçevesinde değerlendirilmektedir.
        </p>
        <div className="mt-4">
          <a
            href="https://www.fokusistatistik.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block opacity-75 hover:opacity-100 transition-opacity"
          >
            <img
              src="https://static.fokusistatistik.com/resimler/fokuslogo.png"
              alt="FOKUS İstatistik"
              className="h-6 w-auto"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

// Wrapper component with Suspense boundary
export default function MemnuniyetAnketi() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#860000] mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    }>
      <SurveyContent />
    </Suspense>
  );
}
