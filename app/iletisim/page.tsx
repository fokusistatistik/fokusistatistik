'use client';

import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/app/hooks/useToast';

export default function Iletisim() {
  const { showToast, ToastContainer } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // n8n webhook'a gönder
      if (process.env.NEXT_PUBLIC_N8N_CONTACT_WEBHOOK) {
        await fetch(process.env.NEXT_PUBLIC_N8N_CONTACT_WEBHOOK, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      showToast('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success', 6000);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (error) {
      showToast('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.', 'error', 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#860000] via-[#a50000] to-[#6b0000] text-white py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="content-container text-center">
              <Mail className="w-16 h-16 mx-auto mb-6 text-[#ffc107]" />
              <h1 className="text-3xl lg:text-5xl font-bold mb-6">
                Bizimle İletişime Geçin
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                FOKUS İstatistik iletişim sayfası. Yapay zeka, veri bilimi tabanlı dijital çözümlerimiz hakkında sorularınız için bizimle iletişime geçin. Otomasyon ve danışmanlık hizmetlerinde destek alın.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="content-container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    İletişim <span className="text-[#860000]">Bilgileri</span>
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Sorularınız, projeleriniz veya hizmetlerimiz hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz. FOKUS ekibi olarak size en kısa sürede dönüş yapacağız.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#860000] text-white p-3 rounded-lg">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">E-posta</h3>
                        <a
                          href="mailto:bilgi@fokusistatistik.com"
                          className="text-[#860000] hover:underline"
                        >
                          bilgi@fokusistatistik.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-[#860000] text-white p-3 rounded-lg">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Telefon</h3>
                        <a
                          href="tel:+905354040712"
                          className="text-[#860000] hover:underline"
                        >
                          +90 535 404 07 12
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-[#860000] text-white p-3 rounded-lg">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Adres</h3>
                        <p className="text-gray-600">
                          FOKUS İstatistik ve YZ Danışmanlığı
                          <br />
                          Türkiye
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-bold text-gray-800 mb-3">Çalışma Saatleri</h3>
                    <div className="space-y-2 text-gray-600">
                      <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                      <p>Cumartesi: 10:00 - 14:00</p>
                      <p>Pazar: Kapalı</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      * Acil durumlar için 7/24 destek botlarımız aktiftir.
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-[#860000] rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">İletişim Formu</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        Ad Soyad
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Adınızı ve soyadınızı girin"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#860000] focus:ring-2 focus:ring-[#860000]/20 transition"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        placeholder="5XXXXXXXXX"
                        pattern="[5][0-9]{9}"
                        title="Telefon numarası 5 ile başlamalı ve toplam 10 haneli olmalı"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#860000] focus:ring-2 focus:ring-[#860000]/20 transition"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                        E-posta
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="E-posta adresinizi girin"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#860000] focus:ring-2 focus:ring-[#860000]/20 transition"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                        Mesajınız
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        placeholder="Mesajınızı buraya yazın..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#860000] focus:ring-2 focus:ring-[#860000]/20 transition resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#860000] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#6b0000] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        'Gönderiliyor...'
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Gönder
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      
    </div>
  );
}
