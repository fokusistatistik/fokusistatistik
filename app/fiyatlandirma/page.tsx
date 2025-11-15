import Link from 'next/link';
import Image from 'next/image';
import { Check, Star, Zap, Crown, ArrowRight, Users, Package } from 'lucide-react';

export default function Fiyatlandirma() {
  const assistants = [
    {
      code: 'fokus001',
      name: 'FOKUS001',
      title: 'Yönetici Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus001.png',
      price: '999',
      features: [
        'Toplantı & Randevu yönetimi',
        'Görev takibi ve hatırlatıcılar',
        'Ekip koordinasyonu',
        'Email yönetimi',
        'Raporlama ve analiz',
        'Google entegrasyonu',
      ],
    },
    {
      code: 'fokus216',
      name: 'FOKUS216',
      title: 'Müşteri Hizmetleri Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus216.png',
      price: '999',
      popular: true,
      features: [
        '7/24 otomatik yanıtlama',
        'Çoklu kanal desteği',
        'Müşteri kayıt yönetimi',
        'Şikayet takibi',
        'WhatsApp & Web entegrasyonu',
        'Performans raporları',
      ],
    },
    {
      code: 'fokus314',
      name: 'FOKUS314',
      title: 'Veri Analisti Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus314.png',
      price: '999',
      features: [
        'Veri toplama & işleme',
        'Otomatik rapor oluşturma',
        'Trend analizi',
        'Görselleştirme',
        'Excel & Google Sheets entegrasyonu',
        'Özel dashboard',
      ],
    },
    {
      code: 'fokus520',
      name: 'FOKUS520',
      title: 'Pazarlama & Lead Takip Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus520.png',
      price: '999',
      features: [
        'Lead toplama & yönlendirme',
        'Kampanya yönetimi',
        'Müşteri segmentasyonu',
        'Otomatik takip',
        'CRM entegrasyonu',
        'Performans metrikleri',
      ],
    },
    {
      code: 'fokus618',
      name: 'FOKUS618',
      title: 'Finans & Fatura Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus618.png',
      price: '999',
      features: [
        'Fatura takibi',
        'Ödeme hatırlatıcıları',
        'Gider yönetimi',
        'Mali raporlama',
        'Muhasebe entegrasyonu',
        'Ödeme sistemleri entegrasyonu',
      ],
    },
    {
      code: 'fokus707',
      name: 'FOKUS707',
      title: 'İnsan Kaynakları Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus707.png',
      price: '999',
      features: [
        'İşe alım süreç yönetimi',
        'Personel kayıt sistemi',
        'İzin & vardiya takibi',
        'Performans değerlendirme',
        'Eğitim planlama',
        'Bordro yardımcısı',
      ],
    },
    {
      code: 'fokus717',
      name: 'FOKUS717',
      title: 'İçerik Tasarımı Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus717.png',
      price: '999',
      features: [
        'İçerik planlama',
        'Metin oluşturma & düzenleme',
        'SEO optimizasyonu',
        'Görsel içerik önerileri',
        'İçerik takvimi',
        'Analiz & raporlama',
      ],
    },
    {
      code: 'fokus808',
      name: 'FOKUS808',
      title: 'Sosyal Medya & İletişim Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus808.png',
      price: '999',
      features: [
        'Sosyal medya planlama',
        'Otomatik paylaşım',
        'Yorum & mesaj yönetimi',
        'Etkileşim analizi',
        'Hashtag optimizasyonu',
        'Çoklu platform desteği',
      ],
    },
    {
      code: 'fokus999',
      name: 'FOKUS999',
      title: 'Joker Sanal Asistan',
      image: 'https://www.fokusistatistik.com/assets/img/fokus999.png',
      price: '999',
      features: [
        'Özelleştirilebilir görevler',
        'Esnek iş akışları',
        'Tüm entegrasyonlar',
        'Özel senaryolar',
        'Maksimum esneklik',
        'Gelişmiş AI yetenekleri',
      ],
    },
  ];

  const packages = [
    {
      name: 'Başlangıç Paketi',
      assistantCount: '3',
      price: '2.699',
      discount: '300 TL İndirim',
      icon: <Zap className="w-8 h-8 text-white" />,
      color: 'from-gray-600 to-gray-700',
      features: [
        '3 Asistan seçimi',
        '3.000 mesaj/ay',
        'Temel raporlama',
        'Email desteği',
        'Tüm entegrasyonlar',
        '10% indirim',
      ],
    },
    {
      name: 'İşletme Paketi',
      assistantCount: '6',
      price: '4.999',
      discount: '995 TL İndirim',
      icon: <Star className="w-8 h-8 text-white" />,
      color: 'from-[#860000] to-[#6b0000]',
      popular: true,
      features: [
        '6 Asistan seçimi',
        '10.000 mesaj/ay',
        'Gelişmiş raporlama',
        'Öncelikli destek',
        'Tüm entegrasyonlar',
        'Özel eğitim',
        'API erişimi',
        '17% indirim',
      ],
    },
    {
      name: 'Kurumsal Paket',
      assistantCount: '9',
      price: '6.999',
      discount: '1.992 TL İndirim',
      icon: <Crown className="w-8 h-8 text-white" />,
      color: 'from-gray-800 to-gray-900',
      features: [
        'Tüm 9 Asistan',
        'Sınırsız mesaj',
        'Özel raporlama',
        '7/24 dedike destek',
        'Özel entegrasyonlar',
        'Özel AI eğitimi',
        'SLA garantisi',
        'Kurumsal güvenlik',
        '22% indirim',
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
              Size Uygun <span className="text-[#860000]">Asistanı</span> Seçin
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Her asistan 999 TL/ay'dan başlayan fiyatlarla. İhtiyacınıza göre istediğiniz asistanları seçin.
            </p>

            <div className="inline-flex items-center bg-green-100 text-green-700 px-6 py-3 rounded-full font-semibold">
              <Check className="w-5 h-5 mr-2" />
              1 ay ücretsiz deneme - Paket fırsatlarıyla %22'ye varan indirim
            </div>
          </div>
        </section>

        {/* Individual Assistants */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                Bireysel Asistan Fiyatları
              </h2>
              <p className="text-lg text-gray-600">
                İhtiyacınız olan asistanları tek tek seçin ve ödeyin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {assistants.map((assistant) => (
                <div
                  key={assistant.code}
                  className={`relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    assistant.popular ? 'border-4 border-[#860000]' : 'border-2 border-gray-200'
                  }`}
                >
                  {assistant.popular && (
                    <div className="absolute top-0 right-0 bg-[#860000] text-white px-4 py-2 rounded-bl-lg font-bold text-sm shadow-md z-10">
                      En Popüler
                    </div>
                  )}

                  <div className="relative h-48 bg-gray-50">
                    <Image
                      src={assistant.image}
                      alt={assistant.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-bold text-[#860000] mb-1">{assistant.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{assistant.title}</p>

                    <div className="flex items-end mb-4 pb-4 border-b border-gray-200">
                      <span className="text-4xl font-bold text-gray-800">₺{assistant.price}</span>
                      <span className="text-gray-500 ml-2 mb-1">/ay</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">+ KDV</p>

                    <ul className="space-y-3 mb-6">
                      {assistant.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/sanalasistanlar/${assistant.code}`}
                      className="block w-full py-3 rounded-xl font-semibold text-center transition bg-gray-100 text-gray-800 hover:bg-gray-200 mb-2"
                    >
                      Detaylı İncele
                    </Link>

                    <Link
                      href="/giris"
                      className={`block w-full py-3 rounded-xl font-semibold text-center transition ${
                        assistant.popular
                          ? 'bg-[#860000] text-white hover:bg-[#6b0000]'
                          : 'bg-[#860000] text-white hover:bg-[#6b0000]'
                      }`}
                    >
                      Hemen Başla
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Package Deals */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                Paket Fırsatları <span className="text-[#860000]">İndirimli!</span>
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Birden fazla asistan alarak avantajlı fiyatlardan yararlanın
              </p>
              <p className="text-sm text-gray-500">
                Paketlerde istediğiniz asistanları seçebilirsiniz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    pkg.popular ? 'border-4 border-[#860000] transform scale-105' : 'border-2 border-gray-200'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-white text-[#860000] px-4 py-1 rounded-bl-lg font-bold text-sm shadow-md">
                      En Popüler
                    </div>
                  )}

                  <div className={`bg-gradient-to-r ${pkg.color} p-8 text-white`}>
                    <div className="mb-4">{pkg.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-white/80 text-sm mb-1">{pkg.assistantCount} Asistan</p>
                    <p className="text-green-300 text-sm font-semibold mb-6">{pkg.discount}</p>

                    <div className="flex items-end mb-2">
                      <span className="text-5xl font-bold">₺{pkg.price}</span>
                      <span className="text-white/80 ml-2 mb-2">/ay</span>
                    </div>
                    <p className="text-white/60 text-sm">+ KDV</p>
                  </div>

                  <div className="p-8 bg-white">
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/giris"
                      className={`block w-full py-4 rounded-xl font-bold text-center transition ${
                        pkg.popular
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
