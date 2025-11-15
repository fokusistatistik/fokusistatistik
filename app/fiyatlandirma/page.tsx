import Link from 'next/link';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';

export default function Fiyatlandirma() {
  const plans = [
    {
      name: 'Standart',
      price: '999',
      period: 'ay',
      description: 'Küçük işletmeler ve girişimciler için',
      icon: <Zap className="w-6 h-6" />,
      color: 'border-gray-300',
      popular: false,
      features: [
        '1 Ay Ücretsiz Test',
        'İşletmeye Özel Prompt',
        'Sürekli Gelişim ve Öğrenme',
        'Server Kullanımı',
        'Standart Bakım & Güncelleme (Ayda 1)',
        'Email Desteği',
        'Temel Raporlama',
      ],
    },
    {
      name: 'Pro',
      price: '2.500',
      period: 'ay',
      description: 'Büyüyen işletmeler için en popüler paket',
      icon: <Star className="w-6 h-6" />,
      color: 'border-[#860000]',
      popular: true,
      features: [
        'Standart Paketin Tüm Özellikleri',
        'Kurumsal Doküman Taraması',
        'Çapraz Veri Doğrulama',
        'Detaylı Arşivleme ve Raporlama',
        'Diğer FOKUS Asistanlarıyla İletişim',
        'Öncelikli Destek',
        'Gelişmiş Analitikler',
      ],
    },
    {
      name: 'Premium',
      price: '12.500',
      period: 'ay',
      description: 'Kurumsal çözümler ve maksimum performans',
      icon: <Crown className="w-6 h-6" />,
      color: 'border-purple-500',
      popular: false,
      features: [
        'Pro Paketin Tüm Özellikleri',
        'Dinamik Karar Destek Sistemi',
        'Python Destekli Analizler',
        'Kritik Düzey Uyarı Sistemleri',
        'Premium Bakım & Güncelleme (Haftada 1)',
        '7/24 Dedike Destek',
        'Özel Geliştirmeler',
        'SLA Garantisi',
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
              Tüm planlarda 1 ay ücretsiz deneme
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
                  className={`relative rounded-3xl shadow-lg overflow-hidden bg-white ${
                    plan.popular ? 'border-4 border-[#860000] transform scale-105' : `border-2 ${plan.color}`
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-[#860000] text-white px-4 py-2 rounded-bl-lg font-bold text-sm">
                      En Popüler
                    </div>
                  )}

                  <div className="p-8 border-b-2 border-gray-100">
                    <div className={`mb-4 ${plan.popular ? 'text-[#860000]' : 'text-gray-600'}`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                    <div className="flex items-end mb-2">
                      <span className="text-5xl font-bold text-gray-900">₺{plan.price}</span>
                      <span className="text-gray-500 ml-2 mb-2">/{plan.period}</span>
                    </div>
                    <p className="text-gray-500 text-sm">+ KDV</p>
                  </div>

                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/iletisim"
                      className={`block w-full py-4 rounded-xl font-bold text-center transition ${
                        plan.popular
                          ? 'bg-[#860000] text-white hover:bg-[#6b0000]'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      Hemen Başlayın
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
              href="/iletisim"
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
