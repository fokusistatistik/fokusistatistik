import Link from 'next/link';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';

export default function Fiyatlandirma() {
  const plans = [
    {
      name: 'Standart',
      price: '999',
      period: 'ay',
      description: 'Her bir asistan 999 TL\'den başlayan fiyatlarla',
      icon: <Zap className="w-8 h-8 text-white" />,
      color: 'from-gray-600 to-gray-700',
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
      name: 'Pro',
      price: '1.999',
      period: 'ay',
      description: '1999\'dan başlayan fiyatlarla',
      icon: <Star className="w-8 h-8 text-white" />,
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
      name: 'Premium',
      price: 'Özel Teklif',
      period: '',
      description: 'Fiyatlandırma için özel teklif',
      icon: <Crown className="w-8 h-8 text-white" />,
      color: 'from-gray-800 to-gray-900',
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

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-800">
              Size Uygun <span className="text-[#860000]">Planı</span> Seçin
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              1 ay boyunca ücretsiz deneyin. İstediğiniz zaman iptal edebilirsiniz.
            </p>

            <div className="inline-flex items-center bg-green-100 text-green-700 px-6 py-3 rounded-full font-semibold">
              <Check className="w-5 h-5 mr-2" />
              Standart planlarda 1 ay ücretsiz deneme
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
                  className={`relative rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    plan.popular ? 'border-4 border-[#860000] transform scale-105' : 'border-2 border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-white text-[#860000] px-4 py-1 rounded-bl-lg font-bold text-sm shadow-md">
                      En Popüler
                    </div>
                  )}

                  <div className={`bg-gradient-to-r ${plan.color} p-8 text-white`}>
                    <div className="mb-4">{plan.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-white/80 text-sm mb-6">{plan.description}</p>

                    <div className="flex items-end mb-2">
                      {plan.price !== 'Özel Teklif' ? (
                        <>
                          <span className="text-5xl font-bold">₺{plan.price}</span>
                          <span className="text-white/80 ml-2 mb-2">/{plan.period}</span>
                        </>
                      ) : (
                        <span className="text-4xl font-bold">{plan.price}</span>
                      )}
                    </div>
                    <p className="text-white/60 text-sm">
                      {plan.price !== 'Özel Teklif' ? '+ KDV' : 'Fiyat teklifi alın'}
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
                      {plan.price !== 'Özel Teklif' ? 'Hemen Başlayın' : 'İletişime Geçin'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free Analysis CTA */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-[#860000]/20">
              <div className="bg-gradient-to-r from-[#860000] to-[#a30000] text-white p-8 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-3">Ücretsiz İhtiyaç Analizi</h2>
                <p className="text-xl text-white/90">Hangi sanal asistana ihtiyacınız olduğunu anında analiz edelim</p>
              </div>
              <div className="p-8 md:p-12 text-center">
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                  İşletmenizin ihtiyaçlarını anlayalım ve size en uygun sanal asistan paketini önerelim.
                  Detaylı analiz formumuzu doldurarak ücretsiz danışmanlık hizmeti alın.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/analiz"
                    className="inline-flex items-center justify-center bg-[#860000] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#6b0000] transition shadow-lg"
                  >
                    <span>İhtiyaç Analizi Yap</span>
                    <ArrowRight className="ml-2" />
                  </Link>
                  <Link
                    href="/sanalasistanlar"
                    className="inline-flex items-center justify-center bg-gray-100 text-gray-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition"
                  >
                    Tüm Asistanları İncele
                  </Link>
                </div>
              </div>
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
                    1 aylık deneme süreniz bittiğinde, seçtiğiniz plana göre ücretlendirme başlar. İstediğiniz zaman
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
              1 ay boyunca tüm özellikleri ücretsiz deneyin. Kredi kartı bilgisi gerekmez.
            </p>

            <Link
              href="/giris"
              className="inline-flex items-center bg-white text-[#860000] px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition shadow-2xl"
            >
              Ücretsiz Deneyin
              <ArrowRight className="ml-3" />
            </Link>
          </div>
        </section>
      </main>

      
    </div>
  );
}
