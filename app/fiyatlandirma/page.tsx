import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fiyatlandırma | FOKUS Sanal Asistan Paketleri',
  description: 'FOKUS Sanal Asistanlar için uygun fiyatlı paketler. Standart, Pro ve Premium seçenekleri ile işletmenize en uygun planı seçin.',
  keywords: 'sanal asistan fiyat, yapay zeka fiyatlandırma, dijital asistan paket, FOKUS fiyat',
};

export default function Fiyatlandirma() {
  const plans = [
    {
      name: 'Standart',
      price: '999',
      description: 'Küçük işletmeler ve girişimciler için',
      color: 'border-blue-500',
      popular: false,
      features: [
        '1 Ay Ücretsiz Test',
        'Standart LLM Desteği',
        'Server Kullanımı Dahil',
        'Kurumsal Doküman Taraması',
        'İşletmeye Özel Prompt Sistemi',
        'Sürekli Gelişim ve Öğrenme',
        'Veri Güvenliği ve Yetkilendirme',
        'Web Arayüzü Erişimi',
        'Aylık Bakım & Güncelleme',
        'E-posta Desteği',
        'Temel Raporlama',
      ],
    },
    {
      name: 'Pro',
      price: '2.500',
      description: 'Büyüyen işletmeler için',
      color: 'border-[#860000]',
      popular: true,
      features: [
        'Pro LLM Desteği',
        'Server Kullanımı Dahil',
        'Kurumsal Dinamik Doküman İşleme',
        'İşletmeye Özel Prompt Sistemi',
        'Sürekli Gelişim ve Öğrenme',
        'Çapraz Veri Doğrulama',
        'Gelişmiş Veri Güvenliği',
        'Öncelikli Web Arayüzü',
        'Çoklu Kanal Entegrasyonu',
        'Haftalık Bakım & Güncelleme',
        'Öncelikli Destek',
        'Detaylı Raporlama ve Analiz',
      ],
    },
    {
      name: 'Premium',
      price: '12.500',
      description: 'Kurumsal çözümler ve maksimum performans',
      color: 'border-purple-500',
      popular: false,
      features: [
        'Premium LLM Desteği',
        'Özel Server Kullanımı',
        'Dinamik Doküman İşleme & Entegrasyonu',
        'İleri Seviye Prompt Sistemi',
        'Sürekli Gelişim ve Öğrenme',
        'Çapraz Veri Doğrulama',
        'Dinamik Karar Destek Sistemi',
        'Python Destekli Analizler',
        'API Entegrasyonu',
        'Özel Geliştirmeler',
        'Haftalık Bakım & Güncelleme',
        '7/24 Özel Destek',
        'Kapsamlı İş Zekası Raporları',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Fiyatlandırma
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            İşletmenizin ihtiyaçlarına uygun paketi seçin.
            <br />
            Standart pakette 1 ay ücretsiz deneme fırsatı!
          </p>
        </section>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular
                  ? 'border-4 border-[#860000] scale-105 relative'
                  : `border-2 ${plan.color}`
              } transition-all duration-300 hover:shadow-2xl`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#860000] text-white px-4 py-1 rounded-bl-lg flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold">En Popüler</span>
                </div>
              )}

              {/* Card Content */}
              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">TL</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">'den başlayan fiyatlarla</p>
                </div>

                {/* CTA Button */}
                <Link
                  href="/iletisim"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-[#860000] text-white hover:bg-[#a30000] shadow-md hover:shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Hemen Başla
                </Link>

                {/* Features */}
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center text-[#860000] mb-8">
            Tüm Paketlerde Dahil
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  LLM Desteği
                </h3>
                <p className="text-sm text-gray-600">
                  Gelişmiş dil modeli entegrasyonu
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Özelleştirilebilir Promptlar
                </h3>
                <p className="text-sm text-gray-600">
                  İşletmenize özel yapay zeka ayarları
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Sürekli Öğrenme
                </h3>
                <p className="text-sm text-gray-600">
                  Sistemimiz sizinle birlikte gelişir
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Güvenli Server
                </h3>
                <p className="text-sm text-gray-600">
                  Verileriniz güvenli sunucularda
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Veri Güvenliği
                </h3>
                <p className="text-sm text-gray-600">
                  Yetkilendirme ve şifreleme
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Profesyonel Destek
                </h3>
                <p className="text-sm text-gray-600">
                  Uzman ekibimiz her zaman yanınızda
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center text-[#860000] mb-8">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Paketler arasındaki fark nedir?
              </h3>
              <p className="text-gray-600 text-sm">
                Standart paket temel özellikleri içerirken, Pro paket daha gelişmiş entegrasyonlar ve öncelikli destek sunar. Premium paket ise kurumsal düzeyde özelleştirmeler ve 7/24 destek içerir.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Ücretsiz deneme nasıl çalışır?
              </h3>
              <p className="text-gray-600 text-sm">
                Standart pakette 1 ay ücretsiz deneme hakkınız vardır. Kredi kartı bilgisi gerekmez ve deneme sonunda otomatik ücretlendirme yapılmaz.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Paket değişikliği yapabilir miyim?
              </h3>
              <p className="text-gray-600 text-sm">
                Evet, istediğiniz zaman paket yükseltme veya düşürme yapabilirsiniz. Değişiklik bir sonraki faturalandırma döneminde geçerli olur.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                İptal politikanız nedir?
              </h3>
              <p className="text-gray-600 text-sm">
                İstediğiniz zaman iptal edebilirsiniz. İptal talebiniz sonrası mevcut dönem sonuna kadar hizmet alabilirsiniz, ardından aboneliğiniz sonlandırılır.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-[#860000] to-[#a30000] rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Hâlâ Kararsız mısınız?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Size en uygun paketi seçmenize yardımcı olalım
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="bg-white text-[#860000] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Bizimle İletişime Geçin
            </Link>
            <Link
              href="https://asistan.fokusistatistik.com/ucretsiz.html" target="_blank" rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#860000] transition"
            >
              Demo Talep Edin
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
