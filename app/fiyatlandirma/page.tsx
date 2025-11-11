import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';

export default function Fiyatlandirma() {
  const plans = [
    {
      name: 'Başlangıç',
      price: '499',
      period: 'ay',
      description: 'Küçük işletmeler için ideal başlangıç paketi',
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      color: 'from-blue-500 to-blue-600',
      popular: false,
      features: [
        '3 Sanal Asistan',
        '1.000 mesaj/ay',
        'Temel raporlama',
        'Email desteği',
        'Google entegrasyonu',
        'Temel analitikler',
      ],
    },
    {
      name: 'Profesyonel',
      price: '1.499',
      period: 'ay',
      description: 'Büyüyen işletmeler için en popüler paket',
      icon: <Star className="w-8 h-8 text-[#860000]" />,
      color: 'from-[#860000] to-[#6b0000]',
      popular: true,
      features: [
        '6 Sanal Asistan',
        '5.000 mesaj/ay',
        'Gelişmiş raporlama',
        'Öncelikli destek',
        'Tüm entegrasyonlar',
        'Detaylı analitikler',
        'Özel eğitim',
        'API erişimi',
      ],
    },
    {
      name: 'Kurumsal',
      price: 'Özel',
      period: 'teklif',
      description: 'Büyük kurumlar için özelleştirilebilir çözümler',
      icon: <Crown className="w-8 h-8 text-purple-500" />,
      color: 'from-purple-500 to-purple-600',
      popular: false,
      features: [
        'Tüm Asistanlar (9)',
        'Sınırsız mesaj',
        'Özel raporlama',
        '7/24 dedike destek',
        'Özel entegrasyonlar',
        'Özel AI eğitimi',
        'SLA garantisi',
        'Kurumsal güvenlik',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-800">
              Size Uygun <span className="text-[#860000]">Planı</span> Seçin
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              14 gün boyunca ücretsiz deneyin. İstediğiniz zaman iptal edebilirsiniz.
            </p>

            <div className="inline-flex items-center bg-green-100 text-green-700 px-6 py-3 rounded-full font-semibold">
              <Check className="w-5 h-5 mr-2" />
              Tüm planlarda 14 gün ücretsiz deneme
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative rounded-3xl shadow-xl overflow-hidden ${
                    plan.popular ? 'border-4 border-[#860000] transform scale-105' : 'border-2 border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-[#ffc107] text-[#860000] px-4 py-1 rounded-bl-lg font-bold text-sm">
                      En Popüler
                    </div>
                  )}

                  <div className={`bg-gradient-to-r ${plan.color} p-8 text-white`}>
                    <div className="mb-4">{plan.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-white/80 text-sm mb-6">{plan.description}</p>

                    <div className="flex items-end mb-2">
                      {plan.price !== 'Özel' ? (
                        <>
                          <span className="text-5xl font-bold">₺{plan.price}</span>
                          <span className="text-white/80 ml-2 mb-2">/{plan.period}</span>
                        </>
                      ) : (
                        <span className="text-5xl font-bold">{plan.price}</span>
                      )}
                    </div>
                    <p className="text-white/60 text-sm">
                      {plan.price !== 'Özel' ? '+ KDV' : 'Fiyat teklifi alın'}
                    </p>
                  </div>

                  <div className="p-8 bg-white">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/giris"
                      className={`block w-full py-4 rounded-xl font-bold text-center transition ${
                        plan.popular
                          ? 'bg-[#860000] text-white hover:bg-[#6b0000]'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {plan.price !== 'Özel' ? 'Hemen Başlayın' : 'İletişime Geçin'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Sıkça Sorulan Sorular
              </h2>

              <div className="space-y-6">
                <details className="bg-white p-6 rounded-xl shadow-md group">
                  <summary className="font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>Deneme süresi sonunda ne olur?</span>
                    <span className="group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    14 günlük deneme süreniz bittiğinde, seçtiğiniz plana göre ücretlendirme başlar. İstediğiniz zaman
                    iptal edebilirsiniz.
                  </p>
                </details>

                <details className="bg-white p-6 rounded-xl shadow-md group">
                  <summary className="font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>Planımı değiştirebilir miyim?</span>
                    <span className="group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Değişiklikler bir sonraki
                    fatura döneminde geçerli olur.
                  </p>
                </details>

                <details className="bg-white p-6 rounded-xl shadow-md group">
                  <summary className="font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>Hangi ödeme yöntemlerini kabul ediyorsunuz?</span>
                    <span className="group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    Kredi kartı, banka kartı ve havale ile ödeme yapabilirsiniz. Tüm ödemeler İyzico güvencesi
                    altındadır.
                  </p>
                </details>

                <details className="bg-white p-6 rounded-xl shadow-md group">
                  <summary className="font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>Fatura ve muhasebe desteği var mı?</span>
                    <span className="group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    Evet, her ay düzenli olarak e-fatura düzenliyoruz. Kurumsal paketlerde özel fatura düzenlemeleri
                    yapılabilir.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#860000] to-[#6b0000] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Hemen Başlayın</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              14 gün boyunca tüm özellikleri ücretsiz deneyin. Kredi kartı bilgisi gerekmez.
            </p>

            <Link
              href="/giris"
              className="inline-flex items-center bg-[#ffc107] text-[#860000] px-10 py-5 rounded-full font-bold text-xl hover:bg-yellow-300 transition shadow-2xl"
            >
              Ücretsiz Deneyin
              <ArrowRight className="ml-3" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
