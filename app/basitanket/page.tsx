'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import './styles.css';

export default function BasitAnketPage() {
  const searchParams = useSearchParams();
  const [rating, setRating] = useState<number | null>(null);
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sirketId, setSirketId] = useState<string | null>(null);
  const [kayitId, setKayitId] = useState<string | null>(null);

  // Get URL parameters
  useEffect(() => {
    const sirket_id = searchParams.get('sirket_id');
    const kayit_id = searchParams.get('kayit_id');

    setSirketId(sirket_id);
    setKayitId(kayit_id);

    if (!sirket_id || !kayit_id) {
      console.warn('Şirket ID veya Kayıt ID bulunamadı. URL parametreleri eksik olabilir.');
    }
  }, [searchParams]);

  // Device type detection
  const getDeviceType = (): string => {
    if (typeof window === 'undefined') return 'bilinmiyor';

    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return 'mobil';
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
    return 'masaüstü';
  };

  // Format date in Turkish format
  const formatDateTR = (date: Date): string => {
    const d = new Date(date);
    const gun = String(d.getDate()).padStart(2, '0');
    const ay = String(d.getMonth() + 1).padStart(2, '0');
    const yil = d.getFullYear();
    const saat = String(d.getHours()).padStart(2, '0');
    const dakika = String(d.getMinutes()).padStart(2, '0');
    return `${gun}.${ay}.${yil} ${saat}:${dakika}`;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (rating === null) {
      alert('Lütfen değerlendirme puanı seçiniz.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      sirket_id: sirketId,
      kayit_id: kayitId,
      puan: rating,
      yorum: comments || '',
      meta: {
        kaynak: 'global_survey_page',
        tarayici: typeof window !== 'undefined' ? navigator.userAgent : 'bilinmiyor',
        cihaz_tipi: getDeviceType(),
        gonderim_saati: formatDateTR(new Date()),
        url_parametreleri: {
          sirket_id: sirketId,
          kayit_id: kayitId,
        },
      },
    };

    try {
      const response = await fetch('https://n8n.fokusistatistik.com/webhook/fokusbasitanket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Gönderim başarısız.');

      setIsSubmitted(true);
      setRating(null);
      setComments('');

      // Scroll to success message
      setTimeout(() => {
        const successElement = document.getElementById('success-message');
        if (successElement) {
          successElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      alert('Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Anket gönderimi hatası:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Hizmet Değerlendirme</h1>
          <p className="subtitle">Deneyiminizi bizimle paylaşın</p>
        </div>

        <form id="survey-form" className="form-section" onSubmit={handleSubmit}>
          <div className="question">
            <label className="question-label">
              Aldığınız hizmeti nasıl değerlendiriyorsunuz? <span className="required">*</span>
            </label>
            <div className="rating-container" role="radiogroup">
              {[
                { value: 1, emoji: '😞', text: 'Çok Kötü' },
                { value: 2, emoji: '😕', text: 'Kötü' },
                { value: 3, emoji: '😐', text: 'Orta' },
                { value: 4, emoji: '🙂', text: 'İyi' },
                { value: 5, emoji: '😍', text: 'Mükemmel' },
              ].map((item) => (
                <label key={item.value} className="rating-item">
                  <input
                    type="radio"
                    name="rating"
                    value={item.value}
                    checked={rating === item.value}
                    onChange={() => setRating(item.value)}
                    required
                    disabled={isSubmitted}
                  />
                  <span className="star-display">{item.emoji}</span>
                  <span className="rating-text">{item.text}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="question">
            <label className="question-label" htmlFor="comments">
              Görüş, öneri ve yorumlarınız (opsiyonel):
            </label>
            <textarea
              id="comments"
              name="comments"
              placeholder="Deneyiminizi, önerilerinizi veya yorumlarınızı buraya yazabilirsiniz..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              disabled={isSubmitted}
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitted || isSubmitting}
          >
            {isSubmitted ? 'Gönderildi' : isSubmitting ? 'Gönderiliyor...' : 'Değerlendirmeyi Gönder'}
          </button>

          <div id="success-message" style={{ display: isSubmitted ? 'block' : 'none' }}>
            Değerli geri bildiriminiz için teşekkür ederiz!
            <br />
            <small>Görüşünüz bizim için çok önemli.</small>
          </div>
        </form>
      </div>

      <div className="footer">
        <p>Geri bildiriminiz hizmet kalitemizi artırmamıza yardımcı oluyor.</p>
        <p>
          <small>Bu anket gizlilik politikamız çerçevesinde değerlendirilmektedir.</small>
        </p>
        <div className="footer-logo">
          <a href="https://www.fokusistatistik.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://www.fokusistatistik.com/assets/img/favicon.png"
              alt="FOKUS İstatistik"
              width={22}
              height={22}
              priority
            />
          </a>
        </div>
      </div>
    </>
  );
}
