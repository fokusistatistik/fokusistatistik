'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';

export default function Demo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    sayi: '',
    field: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Phone validation
    const phonePattern = /^5\d{9}$/;
    if (!phonePattern.test(formData.phone.trim())) {
      alert('Telefon numaranız 5 ile başlamalı ve 10 haneli olmalıdır.');
      return;
    }

    // Email validation
    if (!formData.email.includes('@') || formData.email.length < 8) {
      alert('Lütfen geçerli bir e-posta adresi giriniz (en az 8 karakter, \'@\' içermeli).');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://n8n.fokusistatistik.com/webhook/form1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          window.location.href = 'https://asistan.fokusistatistik.com/';
        }, 3000);
      } else {
        alert('Gönderim sırasında bir hata oluştu.');
      }
    } catch (error) {
      console.error('Hata:', error);
      alert('Bağlantı hatası oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
          {/* Banner */}
          <div className="text-center mb-6">
            <a href="https://static.fokusistatistik.com/resimler/bannerkck.jpg" target="_blank" rel="noopener">
              <Image
                src="https://static.fokusistatistik.com/resimler/bannerkck.jpg"
                alt="FOKUS Banner"
                width={800}
                height={200}
                className="max-w-full h-auto rounded-lg mx-auto"
              />
            </a>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            📅 Ücretsiz Yapay Zeka Danışmanlığı & FOKUS Asistanları Deneme Başvurusu
          </h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-lg">
                  Ad Soyad:
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-lg">
                  E-posta:
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2 text-lg">
                  Telefon (5 ile başlayan 10 haneli):
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  placeholder="5XXXXXXXXX"
                  pattern="5[0-9]{9}"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-gray-700 font-medium mb-2 text-lg">
                  Kurum Adı:
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  required
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="sayi" className="block text-gray-700 font-medium mb-2 text-lg">
                  Çalışan Sayısı:
                </label>
                <select
                  id="sayi"
                  value={formData.sayi}
                  onChange={(e) => handleInputChange('sayi', e.target.value)}
                  required
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                >
                  <option value="">Seçiniz</option>
                  <option value="1-9">1-9</option>
                  <option value="10-49">10-49</option>
                  <option value="50-249">50-249</option>
                  <option value="250+">250+</option>
                </select>
              </div>

              <div>
                <label htmlFor="field" className="block text-gray-700 font-medium mb-2 text-lg">
                  İlgilendiğiniz Sanal Asistan:
                </label>
                <select
                  id="field"
                  value={formData.field}
                  onChange={(e) => handleInputChange('field', e.target.value)}
                  required
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                >
                  <option value="">Seçiniz</option>
                  <option value="DANIŞMANLIK">ÜCRETSİZ YAPAY ZEKA DANIŞMANLIĞI</option>
                  <option value="FOKUS001">FOKUS001 Yönetici Sanal Asistanı</option>
                  <option value="FOKUS216">FOKUS216 Müşteri Hizmetleri Sanal Asistanı</option>
                  <option value="FOKUS314">FOKUS314 Veri Analisti Sanal Asistanı</option>
                  <option value="FOKUS520">FOKUS520 Pazarlama ve Lead Takip Sanal Asistanı</option>
                  <option value="FOKUS618">FOKUS618 Finans ve Fatura Sanal Asistanı</option>
                  <option value="FOKUS707">FOKUS707 İnsan Kaynakları Sanal Asistanı</option>
                  <option value="FOKUS717">FOKUS717 İçerik Tasarımı Sanal Asistanı</option>
                  <option value="FOKUS808">FOKUS808 Sosyal Medya ve İletişim Sanal Asistanı</option>
                  <option value="FOKUS999">FOKUS999 Joker Sanal Asistan - ÜCRETSİZ KEŞİF</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2 text-lg">
                  Ek Not (isteğe bağlı):
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none resize-vertical"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#860000] hover:bg-[#a30405] text-white font-bold py-4 px-6 text-xl rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Gönderiliyor...' : 'Başvuru Gönder'}
              </button>
            </form>
          ) : (
            <div className="text-center py-12">
              <Image
                src="https://static.fokusistatistik.com/logolar/fokuslogo1.png"
                alt="FOKUS Logo"
                width={200}
                height={80}
                className="mx-auto mb-6"
              />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Teşekkürler!</h2>
              <p className="text-lg text-gray-600">
                Başvurunuz başarıyla alınmıştır.
              </p>
            </div>
          )}

          <div className="text-center mt-8 text-sm text-gray-500">
            FOKUS Veri Bilimi ve Yapay Zeka Danışmanlığı
          </div>
        </div>
      </div>

      {/* Voice Assistant Button */}
      <div className="fixed bottom-8 right-8 z-50 text-center">
        <button
          onClick={() => setShowVoiceModal(true)}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#860000] to-[#a30405] border-4 border-white shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform animate-pulse"
        >
          <Image
            src="https://static.fokusistatistik.com/resimler/FOKUS520profil.png"
            alt="FOKUS Sesli Asistan"
            width={60}
            height={60}
            className="rounded-full"
          />
        </button>
        <div className="mt-2 text-xs text-gray-600 max-w-[120px]">
          Sanal Asistanla<br />Sesli Görüşme
        </div>
      </div>

      {/* Voice Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[2000] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-lg max-h-[80vh] shadow-2xl">
            <div className="bg-gradient-to-r from-[#860000] to-[#a30405] text-white p-6 relative">
              <h3 className="text-lg font-medium text-center">
                Benimle konuşmak için lütfen düğmeye basın
              </h3>
              <button
                onClick={() => setShowVoiceModal(false)}
                className="absolute top-4 right-6 text-white text-3xl hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
            <div className="h-[500px]">
              <iframe
                src="https://vapi.ai?demo=true&shareKey=803df5c1-1a3a-4c20-a663-aaec4b67293f&assistantId=0f0f02b2-7d79-42fe-b1e7-e5dd12be1262"
                className="w-full h-full border-0"
                allow="microphone"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
