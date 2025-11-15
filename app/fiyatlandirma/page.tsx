import Link from 'next/link';
import Image from 'next/image';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';

export default function Fiyatlandirma() {
  const assistants = [
    {
      code: 'fokus001',
      name: 'FOKUS001',
      title: 'Yönetici Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus001.png',
      capabilities: [
        'Yönetici mesajlarını yorumlayıp aksiyona çevirir',
        'Ajanda ve takvim yönetimi',
        'Şablon dokümanları doldurur ve gönderir',
        'Anlık hatırlatmalar ve uyarılar',
        'Tüm FOKUS asistanlarıyla entegre çalışır',
      ],
    },
    {
      code: 'fokus216',
      name: 'FOKUS216',
      title: 'Müşteri Hizmetleri Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus216.png',
      capabilities: [
        'Sık sorulan soruları anında yanıtlar',
        'WhatsApp, web, e-posta çoklu kanal desteği',
        'Müşteri geçmişini takip eder',
        'CRM sistemleriyle entegre çalışır',
        '7/24 aktif iletişim',
      ],
    },
    {
      code: 'fokus314',
      name: 'FOKUS314',
      title: 'Veri Analisti Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus314.png',
      capabilities: [
        'Otomatik rapor oluşturur ve paylaşır',
        'Verileri görselleştirir',
        'Trend ve istatistiksel analizler',
        'Karar destek sistemine katkı',
        'Google Sheets entegrasyonu',
      ],
    },
    {
      code: 'fokus520',
      name: 'FOKUS520',
      title: 'Pazarlama & Lead Takip Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus520.png',
      capabilities: [
        '7/24 potansiyel müşteri taraması',
        'Lead sınıflandırma ve takip',
        'CRM kaydı ve güncelleme',
        'Kampanya verimini raporlar',
        'Otomatik etkileşim kurma',
      ],
    },
    {
      code: 'fokus618',
      name: 'FOKUS618',
      title: 'Finans & Fatura Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus618.png',
      capabilities: [
        'Gelir ve gider kaydı',
        'Otomatik fatura oluşturma',
        'Vade hatırlatmaları',
        'Finansal özet raporlar',
        'Muhasebe sistemleri entegrasyonu',
      ],
    },
    {
      code: 'fokus707',
      name: 'FOKUS707',
      title: 'İnsan Kaynakları Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus707.png',
      capabilities: [
        'Personel kartı dijital arşivleme',
        'İzin talepleri ve onay süreci',
        'Vardiya planlama',
        'Maaş ve prim hesaplama',
        'Performans takibi ve raporlama',
      ],
    },
    {
      code: 'fokus717',
      name: 'FOKUS717',
      title: 'İçerik Tasarımı Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus717.png',
      capabilities: [
        'Marka diline uygun metin üretimi',
        'Sosyal medya içerik tasarımı',
        'Video ve reels üretimi',
        'Kurumsal bülten hazırlığı',
        'Onay ve revizyon süreci yönetimi',
      ],
    },
    {
      code: 'fokus808',
      name: 'FOKUS808',
      title: 'Sosyal Medya & İletişim Sanal Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus808.png',
      capabilities: [
        'Sosyal medya takvimi oluşturma',
        'Zamanlı otomatik paylaşım',
        'Yorum takibi ve analizi',
        'Trend izleme ve öneriler',
        'Kriz anında müdahale',
      ],
    },
    {
      code: 'fokus999',
      name: 'FOKUS999',
      title: 'Joker Sanal Asistan',
      image: 'https://www.fokusistatistik.com/assets/img/fokus999.png',
      capabilities: [
        'Özelleştirilebilir görevler',
        'Hızlı adaptasyon ve öğrenme',
        'Tüm asistanlarla işbirliği',
        'Web arayüzleri oluşturma',
        'Dijital danışmanlık ve çözümler',
      ],
    },
  ];

  const packages = [
    {
      name: 'Standart',
      price: '999',
      icon: <Zap className="w-8 h-8 text-white" />,
      color: 'from-gray-600 to-gray-700',
      popular: false,
      features: [
        'Standart LLM Desteği',
        '1.000 mesaj/asistan/ay',
        'Temel raporlama',
        'Email desteği',
        'Temel entegrasyonlar',
        '1-2 gün kurulum',
        '1 Ay ücretsiz test',
      ],
    },
    {
      name: 'Pro',
      price: '1.999',
      icon: <Star className="w-8 h-8 text-white" />,
      color: 'from-[#860000] to-[#6b0000]',
      popular: true,
      features: [
        'Pro LLM Desteği',
        '5.000 mesaj/asistan/ay',
        'Gelişmiş raporlama',
        'Öncelikli destek',
        'Tüm entegrasyonlar',
        'Özel eğitim',
        'API erişimi',
        'Gelişmiş özellikler',
      ],
    },
    {
      name: 'Premium',
      price: 'Özel Teklif',
      icon: <Crown className="w-8 h-8 text-white" />,
      color: 'from-gray-800 to-gray-900',
      popular: false,
      features: [
        'Premium LLM Desteği',
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
              İhtiyacınız Olan <span className="text-[#860000]">Asistanı</span> Seçin
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Her asistan için 3 farklı paket seçeneği. Standart 999 TL/ay, Pro 1.999 TL/ay'dan başlayan fiyatlarla.
            </p>

            <div className="inline-flex items-center bg-green-100 text-green-700 px-6 py-3 rounded-full font-semibold">
              <Check className="w-5 h-5 mr-2" />
              Standart pakette 1 ay ücretsiz deneme
            </div>
          </div>
        </section>

        {/* Package Tabs Navigation */}
        <section className="bg-white py-12 border-b-2 border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-4 flex-wrap">
              {packages.map((pkg) => (
                <a
                  key={pkg.name}
                  href={`#${pkg.name.toLowerCase()}`}
                  className={`px-8 py-4 rounded-xl font-bold transition ${
                    pkg.popular
                      ? 'bg-[#860000] text-white hover:bg-[#6b0000]'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {pkg.name} Paket
                  {pkg.price !== 'Özel Teklif' && (
                    <span className="ml-2 text-sm">₺{pkg.price}/ay</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Sections - One per package tier */}
        {packages.map((pkg, pkgIndex) => (
          <section
            key={pkg.name}
            id={pkg.name.toLowerCase()}
            className={`py-20 ${pkgIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="container mx-auto px-4">
              {/* Package Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center mb-4">
                  <div className={`bg-gradient-to-r ${pkg.color} p-4 rounded-2xl`}>
                    {pkg.icon}
                  </div>
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-gray-800">
                  {pkg.name} <span className="text-[#860000]">Paket</span>
                </h2>
                <div className="flex items-end justify-center mb-4">
                  {pkg.price !== 'Özel Teklif' ? (
                    <>
                      <span className="text-5xl lg:text-6xl font-bold text-gray-800">
                        ₺{pkg.price}
                      </span>
                      <span className="text-2xl text-gray-600 ml-2 mb-2">/asistan/ay</span>
                    </>
                  ) : (
                    <span className="text-4xl lg:text-5xl font-bold text-gray-800">
                      {pkg.price}
                    </span>
                  )}
                </div>
                {pkg.price !== 'Özel Teklif' && (
                  <p className="text-gray-500 mb-6">+ KDV</p>
                )}
                {pkg.popular && (
                  <div className="inline-block bg-[#860000] text-white px-6 py-2 rounded-full font-bold mb-6">
                    En Popüler Paket
                  </div>
                )}

                {/* Package Features */}
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-12">
                  <h3 className="text-xl font-bold mb-6 text-gray-800">
                    Paket Özellikleri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assistants Grid for this package */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {assistants.map((assistant) => (
                  <div
                    key={assistant.code}
                    className="relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-gray-200 bg-white"
                  >
                    <div className="relative h-48 bg-gray-50">
                      <Image
                        src={assistant.image}
                        alt={assistant.title}
                        fill
                        className="object-contain p-4"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#860000] mb-1">
                        {assistant.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{assistant.title}</p>

                      <div className="mb-6 pb-4 border-b border-gray-200">
                        <div className="flex items-end mb-2">
                          {pkg.price !== 'Özel Teklif' ? (
                            <>
                              <span className="text-3xl font-bold text-gray-800">
                                ₺{pkg.price}
                              </span>
                              <span className="text-gray-500 ml-1 mb-1">/ay</span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold text-gray-800">
                              {pkg.price}
                            </span>
                          )}
                        </div>
                        {pkg.price !== 'Özel Teklif' && (
                          <p className="text-gray-500 text-sm">+ KDV</p>
                        )}
                      </div>

                      <ul className="space-y-2 mb-6">
                        {assistant.capabilities.slice(0, 4).map((capability, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{capability}</span>
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
                          pkg.popular
                            ? 'bg-[#860000] text-white hover:bg-[#6b0000]'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        {pkg.price !== 'Özel Teklif' ? 'Hemen Başla' : 'Teklif Al'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Free Analysis CTA */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-[#860000]/20">
              <div className="bg-gradient-to-r from-[#860000] to-[#a30000] text-white p-8 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                  Ücretsiz İhtiyaç Analizi
                </h2>
                <p className="text-xl text-white/90">
                  Hangi sanal asistana ve hangi pakete ihtiyacınız olduğunu anında analiz edelim
                </p>
              </div>
              <div className="p-8 md:p-12 text-center">
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                  İşletmenizin ihtiyaçlarını anlayalım ve size en uygun asistan ve paket kombinasyonunu önerelim.
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

        {/* Comparison Table */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-800">
              Paketleri Karşılaştır
            </h2>
            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-4 font-bold text-gray-800">Özellik</th>
                    <th className="text-center p-4 font-bold text-gray-800">Standart</th>
                    <th className="text-center p-4 font-bold text-[#860000]">Pro</th>
                    <th className="text-center p-4 font-bold text-gray-800">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-gray-700">Asistan Başına Fiyat</td>
                    <td className="p-4 text-center">₺999/ay</td>
                    <td className="p-4 text-center font-semibold text-[#860000]">₺1.999/ay</td>
                    <td className="p-4 text-center">Özel Teklif</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-gray-700">Mesaj Limiti</td>
                    <td className="p-4 text-center">1.000/ay</td>
                    <td className="p-4 text-center font-semibold text-[#860000]">5.000/ay</td>
                    <td className="p-4 text-center">Sınırsız</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-gray-700">LLM Desteği</td>
                    <td className="p-4 text-center">Standart</td>
                    <td className="p-4 text-center font-semibold text-[#860000]">Pro</td>
                    <td className="p-4 text-center">Premium</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-gray-700">Destek</td>
                    <td className="p-4 text-center">Email</td>
                    <td className="p-4 text-center font-semibold text-[#860000]">Öncelikli</td>
                    <td className="p-4 text-center">7/24 Dedike</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-gray-700">Kurulum Süresi</td>
                    <td className="p-4 text-center">1-2 Gün</td>
                    <td className="p-4 text-center font-semibold text-[#860000]">1-7 Gün</td>
                    <td className="p-4 text-center">1-21 Gün</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-gray-700">Ücretsiz Test</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">-</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-gray-700">API Erişimi</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-gray-700">SLA Garantisi</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
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
                    <span>Birden fazla asistan alabilir miyim?</span>
                    <span className="group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    Evet, ihtiyacınız olan tüm asistanları seçebilirsiniz. Her asistan için aynı paket seviyesini
                    seçmeniz gerekmez; farklı asistanlar için farklı paket seviyeleri seçebilirsiniz.
                  </p>
                </details>

                <details className="bg-white p-6 rounded-xl shadow-md group">
                  <summary className="font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>Paket değişikliği yapabilir miyim?</span>
                    <span className="group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    Evet, istediğiniz zaman paketinizi yükseltebilir veya düşürebilirsiniz. Değişiklikler bir sonraki
                    fatura döneminde geçerli olur.
                  </p>
                </details>

                <details className="bg-white p-6 rounded-xl shadow-md group">
                  <summary className="font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>Standart pakette ücretsiz test nasıl çalışır?</span>
                    <span className="group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    Standart paketi seçtiğinizde, ilk 1 ay boyunca tüm özellikleri ücretsiz deneyebilirsiniz. Test
                    süresinin sonunda memnun kalmazsanız, herhangi bir ücret ödemeden iptal edebilirsiniz.
                  </p>
                </details>

                <details className="bg-white p-6 rounded-xl shadow-md group">
                  <summary className="font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>Mesaj limiti aşılırsa ne olur?</span>
                    <span className="group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    Aylık mesaj limitiniz dolduğunda, asistanınız çalışmaya devam eder ancak ek mesajlar için
                    ücretlendirme yapılır. Premium pakette mesaj limiti sınırsızdır.
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
                    <span>Üyelik nasıl oluşturulur?</span>
                    <span className="group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    FOKUS İstatistik B2B hizmet vermektedir. Üyelikler, sözleşme sürecinizin tamamlanmasından sonra
                    tarafımızca oluşturulur ve gerekli bilgiler size iletilir.
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
              Standart pakette 1 ay boyunca ücretsiz deneyin. Kredi kartı bilgisi gerekmez.
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
