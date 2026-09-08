'use client';

import { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface FormData {
  secilenler: string[];
  adsoyad: string;
  email: string;
  telefon: string;
  kurum: string;
  adres: string;
}

interface Category {
  title: string;
  items: { label: string; value: string }[];
}

export default function AnalizFormu() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState<FormData>({
    secilenler: [],
    adsoyad: '',
    email: '',
    telefon: '',
    kurum: '',
    adres: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<string>('');

  // Spam koruması - Honeypot ve Timestamp
  const [honeypot, setHoneypot] = useState('');
  const [formStartTime, setFormStartTime] = useState(0);

  useEffect(() => {
    // Form yüklendiğinde zamanı kaydet
    setFormStartTime(Date.now());
  }, []);

  const categories: Category[] = [
    {
      title: 'Müşteri Hizmetleri',
      items: [
        { label: 'Müşterilerin sık sorulan sorularına 7/24 otomatik cevaplar (Fiyat, hizmet gibi)', value: '216-1' },
        { label: 'Teknik destek taleplerini toplayan, yönlendiren ve takip eden bir asistan', value: '216-2' },
        { label: 'Randevu ve rezervasyon süreçlerinin otomatik yürütülmesi', value: '216-2' },
        { label: 'Müşteri memnuniyetini ve taleplerini sürekli ölçmek', value: '216-2' },
        { label: 'Müşterilere otomatik bilgi, belge, hatırlatma, teklif vs. göndermek', value: '216-2' },
        { label: 'Özelleştirilmiş online sipariş botu', value: '216-3' },
        { label: 'Canlı konuşma ve gerektiğinde gerçek destek personeline aktarım yapan bir sanal asistan(lar)', value: '216-3' },
        { label: 'Birden fazla dil desteği ile canlı destek', value: '216-3' }
      ]
    },
    {
      title: 'Veri Analizi - İstatistik',
      items: [
        { label: 'Verilerinizi temel seviyede analiz eden, düzenli rapor sunan, istenildiğinde işletmenize ait verileri veren bir asistan', value: '314-1' },
        { label: 'Verilerinizin aylık olarak grafiklerle görselleştirilmesi ve trend analizleri', value: '314-2' },
        { label: 'Veri Bilimi Danışmanlığı', value: '314-3' },
        { label: 'Hatalar, eşikler ve kritik durumlar için otomatik uyarı sistemleri', value: '314-3' },
        { label: 'Gerçek Zamanlı Karar Destek Sistemi ile veri takibi', value: '314-3' },
        { label: 'Şube/Personel/Birim bazlı performans analizleri', value: '314-3' },
        { label: 'İş süreçlerinde QR/Barkod tabanlı tam entegre otomasyon sistemleri', value: '314-3' },
        { label: 'Anket oluşturma, uygulama ve analiz etme', value: '314-3' }
      ]
    },
    {
      title: 'Pazarlama Operasyonu',
      items: [
        { label: 'Müşteri kayıtlarını, geçmişini, etkileşimlerini otomatik takip etmek', value: '520-1' },
        { label: 'Otomatik müşteri profili ve skorlama (sadakat, sipariş sıklığı vb.)', value: '520-2' },
        { label: 'Kampanyalarınızı otomatik olarak yürütmek ve performanslarını analiz etmek', value: '520-2' },
        { label: 'Aylık bakım çizelgeleri ve müşteri iletişim planı yapabilmek', value: '520-2' },
        { label: 'Yeni müşterileri bulmak için web veya lokasyon tabanlı tarama otomasyonları', value: '520-3' },
        { label: 'Detayşı Müşteri Analizleri ve raporlama (Harita, web sitesi, sosyal medya, haberler vs)', value: '520-3' },
        { label: 'Her müşteriye özel geliştirilen pazarlama stratejisi', value: '520-3' }
      ]
    },
    {
      title: 'Finansal Süreçler',
      items: [
        { label: 'Gelen faturaların (PDF, resim, HTML vb.) analiz edilerek sisteme kaydedilmesi', value: '618-1' },
        { label: 'Faturaların otomatik veya sesli/yazılı komutla kesilip müşteriye gönderilmesi', value: '618-1' },
        { label: 'Borç ve tahsilat hatırlatmalarının otomatik yapılması', value: '618-2' },
        { label: 'Gelir gider kayıtlarının düzenli ve detaylı otomatik kaydedilmesi, raporlanması, müşteri bazlı sorgulama', value: '618-2' }
      ]
    },
    {
      title: 'İnsan Kaynakları Yönetimi',
      items: [
        { label: 'Özlük dosyası düzenli, dijital, entegre tutmak', value: '707-1' },
        { label: 'İzin, vardiya ve görev planlamasını otomatik yürütmek', value: '707-1' },
        { label: 'Personel yönlendirme, görev, giriş çıkış takibi', value: '707-2' },
        { label: 'Personel eğitim ve deneyim düzeyini ölçmek, değerlendirmek', value: '707-2' },
        { label: 'Duyuruların / İK yazılarının otomatik dağıtılması', value: '707-2' },
        { label: 'CV toplama ve aday değerlendirme, işe alım süreci otomasyonu', value: '707-2' },
        { label: 'Personel performans değerlendirmeleri', value: '707-3' }
      ]
    },
    {
      title: 'Fotoğraf, Tasarım, Video, İçerik Üretme',
      items: [
        { label: 'Tanıtım, basın ve kurum içi bültenlerin, blogların hazır şablonlarla otomatikleştirilmesi', value: '717-1' },
        { label: 'Sosyal medya gönderileri (yazı, görsel, reels, hikâye) için otomatik içerik üretimi', value: '717-1' },
        { label: 'Kurum verilerinden otomatik ve görselli sunumlar oluşturmak', value: '717-2' },
        { label: 'Kolay bir şekilde Veo3 gibi modellerle video üretmek', value: '717-3' }
      ]
    },
    {
      title: 'Sosyal Medya ve İletişim',
      items: [
        { label: 'İçeriklerin sosyal medya platformlarına uygun şekilde planlanıp otomatik paylaşılması', value: '808-1' },
        { label: 'Yorumları analiz eden, otomatik yanıtlayan ve etkileşimleri ölçen otomasyon', value: '808-2' },
        { label: 'Detaylı sosyal medya raporu', value: '808-2' },
        { label: 'Sosyal medya yönetimi', value: '808-3' },
        { label: 'Detaylı SEO hizmeti', value: '808-3' },
        { label: 'Sektör trendlerini ve rakip firmaları analiz eden yapay zekâ desteği', value: '808-3' }
      ]
    },
    {
      title: 'Yönetim ve Kurumsallık',
      items: [
        { label: 'İşletmemin genel işleyişiyle ilgili periyodik bilgi ve rapor takibi', value: '001-1' },
        { label: 'Takvim yönetimini tam otomatikleştirmek ve otomatik bildirimler', value: '001-2' },
        { label: 'Tek tıklamayla belge oluşturma, silme, gönderme ve temel görevleri yürütme', value: '001-2' },
        { label: 'Tekrarlayan işler (form doldurma, görev takibi vb.) için otomasyon desteği', value: '001-2' },
        { label: 'Gelişmiş Yönetici Paneli, Gösterge Paneli ve Kolay İşletme Özetleri', value: '001-2' },
        { label: 'E-postaları sınıflandırmak ve yapay zeka destekli otomatik cevaplamak', value: '001-2' },
        { label: 'İşletmemdeki herhangi bir güncel bilgiye 7/24 ulaşabilmek ve işlem yapabilmek', value: '001-3' },
        { label: 'Henüz net bir ihtiyacınız yoksa size özel analiz ve dijital çözüm önerileri ücretsiz sunalım.', value: '999-0' },
        { label: 'Yapay Zeka Eğitim ve Danışmanlığı', value: '999-3' },
        { label: 'İade, memnuniyet, başvuru gibi formların otomasyonu ve iç iletişim chatbotları', value: '999-3' },
        { label: 'Sistem entegrasyonu, Meta Business veya özel bulut sistem kurulumu gibi teknik destekler', value: '999-3' },
        { label: 'Kullanıcıya ve ihtiyaca özel web tabanlı arayüzler, Dijital Kartvizit - NFC Hizmetleri', value: '999-3' },
        { label: 'Web Sitesi Kurmak / Güncellemek', value: '999-3' }
      ]
    }
  ];

  const handleCheckboxChange = (categoryIdx: number, itemIdx: number) => {
    const uniqueId = `${categoryIdx}-${itemIdx}`;
    setFormData(prev => ({
      ...prev,
      secilenler: prev.secilenler.includes(uniqueId)
        ? prev.secilenler.filter(v => v !== uniqueId)
        : [...prev.secilenler, uniqueId]
    }));
  };

  const handleInputChange = (field: keyof Omit<FormData, 'secilenler'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.secilenler.length === 0) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setIsLoading(true);

    try {
      // 🛡️ SPAM KORUMALARI

      // 1. Honeypot kontrolü - Bot görünmez alanı doldurmuşsa engelle
      if (honeypot) {
        console.warn('Spam detected: honeypot filled');
        alert('Form gönderimi başarısız oldu. Lütfen tekrar deneyin.');
        setIsLoading(false);
        return;
      }

      // 2. Timestamp kontrolü - 3 saniyeden kısa sürede gönderilmişse bot
      const timeTaken = Date.now() - formStartTime;
      if (timeTaken < 3000) {
        console.warn('Spam detected: form submitted too quickly');
        alert('Lütfen formu doldurduktan sonra gönderin.');
        setIsLoading(false);
        return;
      }

      // 3. reCAPTCHA v3 kontrolü (Opsiyonel - Graceful Degradation)
      if (executeRecaptcha) {
        try {
          await executeRecaptcha('analysis_form');
        } catch (error) {
          console.warn('⚠️ reCAPTCHA kullanılamıyor - Güvenliksiz modda devam ediliyor', error);
        }
      } else {
        console.warn('⚠️ reCAPTCHA kullanılamıyor - Güvenliksiz modda devam ediliyor');
      }

      // Unique ID'leri gerçek değerlere çevir (backend için)
      const selectedItems = formData.secilenler.map(uniqueId => {
        const [catIdx, itemIdx] = uniqueId.split('-').map(Number);
        const item = categories[catIdx]?.items[itemIdx];
        return item ? { id: item.value, label: item.label } : null;
      }).filter(Boolean);

      // FormData oluştur (statik HTML ile uyumlu)
      const formDataToSend = new FormData();

      // Checkbox değerlerini ekle (HTML formu gibi)
      selectedItems.forEach(item => {
        formDataToSend.append('secilenler[]', item!.id);
      });

      // secilenlerDetay JSON formatında gönder (statik HTML ile aynı)
      formDataToSend.append('secilenlerDetay', JSON.stringify(selectedItems));
      formDataToSend.append('adsoyad', formData.adsoyad);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('telefon', formData.telefon);
      formDataToSend.append('kurum', formData.kurum);
      formDataToSend.append('adres', formData.adres);

      // Direkt n8n webhook'a gönder (statik HTML ile aynı)
      const response = await fetch('https://n8n.fokusistatistik.com/webhook/fokusanalizform', {
        method: 'POST',
        body: formDataToSend
      });

      // HTML response al (statik HTML ile aynı)
      const htmlString = await response.text();

      if (response.ok) {
        setAnalysisResults(htmlString);
        setShowResults(true);
        setHoneypot(''); // Reset honeypot
        setFormStartTime(Date.now()); // Reset timestamp
      } else {
        alert('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Form gönderme hatası:', error);
      alert('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewForm = () => {
    setFormData({
      secilenler: [],
      adsoyad: '',
      email: '',
      telefon: '',
      kurum: '',
      adres: ''
    });
    setShowResults(false);
    setAnalysisResults('');
    setHoneypot('');
    setFormStartTime(Date.now());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <Image
                src="/assets/cdn/resimler/favicon.png"
                alt="FOKUS Logo"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              FOKUS Ekosistemi Sanal Asistan Analiz Formu
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Bu form, yaklaşık 2 dakika süren kısa ve pratik bir değerlendirmedir. İşletmenizin dijitalleşme ve otomasyon
              ihtiyaçlarına en uygun FOKUS Sanal Asistan çözümünü belirlemek amacıyla hazırlanmıştır. Aşağıdaki 8 başlık
              altında yer alan maddeleri işaretleyerek ihtiyaçlarınızı hızlıca seçebilir, iletişim bilgilerinizi girerek
              formu tamamladıktan sonra size özel detaylı analiz ve öneri raporunu anında alabilirsiniz.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          {/* 🍯 Honeypot - Görünmez alan (botlar için tuzak) */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute -left-[9999px]"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Categories */}
          <div className="space-y-4 mb-8">
            {categories.map((category, idx) => (
              <details key={idx} className="group border border-gray-200 rounded-lg overflow-hidden">
                <summary className="cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 font-semibold text-gray-900 flex justify-between items-center transition-colors">
                  <span>{category.title}</span>
                  <span className="text-[#860000] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 space-y-3 bg-white">
                  {category.items.map((item, itemIdx) => {
                    const uniqueId = `${idx}-${itemIdx}`;
                    return (
                      <label key={uniqueId} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.secilenler.includes(uniqueId)}
                          onChange={() => handleCheckboxChange(idx, itemIdx)}
                          className="mt-1 w-4 h-4 text-[#860000] border-gray-300 rounded focus:ring-[#860000]"
                        />
                        <span className="text-gray-700 text-sm">{item.label}</span>
                      </label>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>

          {/* Contact Information */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">İletişim Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Ad Soyad"
                required
                minLength={4}
                value={formData.adsoyad}
                onChange={(e) => handleInputChange('adsoyad', e.target.value)}
                className="col-span-1 md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none transition"
              />
              <input
                type="email"
                placeholder="E-Posta Adresi"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none transition"
              />
              <input
                type="tel"
                placeholder="Telefon Numarası"
                required
                maxLength={10}
                pattern="[1-9][0-9]{9}"
                value={formData.telefon}
                onChange={(e) => handleInputChange('telefon', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none transition"
              />
              <input
                type="text"
                placeholder="Şirket / Kurum Adı"
                value={formData.kurum}
                onChange={(e) => handleInputChange('kurum', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none transition"
              />
              <textarea
                placeholder="İl / İlçe"
                rows={2}
                value={formData.adres}
                onChange={(e) => handleInputChange('adres', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#860000] hover:bg-[#b30000] text-white font-bold py-4 px-12 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? '⏳ Lütfen bekleyiniz, analiz yapılıyor...' : 'Analizi Başlat'}
            </button>
          </div>

          {/* New Form Button */}
          {showResults && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleNewForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Yeni Form Doldur
              </button>
            </div>
          )}
        </form>

        {/* Results - HTML Response (statik HTML ile aynı) */}
        {showResults && analysisResults && (
          <div
            className="bg-white rounded-2xl shadow-lg p-8 mt-8"
            dangerouslySetInnerHTML={{ __html: analysisResults }}
          />
        )}
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-red-600 text-white px-6 py-4 rounded-lg shadow-xl animate-bounce">
          ⚠️ Lütfen en az bir ihtiyacınızı seçiniz.
        </div>
      )}
    </div>
  );
}
