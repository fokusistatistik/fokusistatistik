import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Bot, Sparkles } from 'lucide-react';

export default function SanalAsistanlar() {
  const assistants = [
    {
      code: 'fokus001',
      name: 'FOKUS001',
      title: 'Yönetici Sanal Asistanı',
      description: 'Şirket yönetimini kolaylaştırın, kararlarınızı veri ile destekleyin. Raporlama, karar destek sistemleri ve yönetim süreçlerinde yanınızda.',
      icon: '👔',
      color: 'from-blue-500 to-blue-700',
      features: ['Karar Destek', 'Raporlama', 'Yönetim Analizi', 'Performans Takibi'],
    },
    {
      code: 'fokus216',
      name: 'FOKUS216',
      title: 'Müşteri Hizmetleri Sanal Asistanı',
      description: 'Müşteri memnuniyetini artırın, 7/24 hızlı destek sağlayın. Otomatik yanıtlar, talep yönetimi ve müşteri ilişkileri.',
      icon: '💬',
      color: 'from-green-500 to-green-700',
      features: ['7/24 Destek', 'Otomatik Yanıt', 'Talep Yönetimi', 'Müşteri Analizi'],
    },
    {
      code: 'fokus314',
      name: 'FOKUS314',
      title: 'Veri Analisti Sanal Asistanı',
      description: 'Verilerinizi anlamlandırın, stratejik kararlar alın. İstatistiksel analiz, veri görselleştirme ve tahminleme.',
      icon: '📊',
      color: 'from-purple-500 to-purple-700',
      features: ['Veri Analizi', 'Görselleştirme', 'Tahminleme', 'İstatistik'],
    },
    {
      code: 'fokus520',
      name: 'FOKUS520',
      title: 'Pazarlama & Lead Takip Sanal Asistanı',
      description: 'Müşteri adaylarını yönetin, pazarlama kampanyalarını optimize edin. Lead scoring, kampanya yönetimi ve dönüşüm analizi.',
      icon: '🎯',
      color: 'from-orange-500 to-orange-700',
      features: ['Lead Yönetimi', 'Kampanya Analizi', 'SEO Optimizasyon', 'Dönüşüm Takibi'],
    },
    {
      code: 'fokus618',
      name: 'FOKUS618',
      title: 'Finans & Fatura Sanal Asistanı',
      description: 'Mali süreçlerinizi otomatikleştirin, nakit akışını kontrol edin. Fatura yönetimi, gider takibi ve finansal raporlama.',
      icon: '💰',
      color: 'from-emerald-500 to-emerald-700',
      features: ['Fatura Yönetimi', 'Gider Takibi', 'Nakit Akışı', 'Mali Raporlar'],
    },
    {
      code: 'fokus707',
      name: 'FOKUS707',
      title: 'İnsan Kaynakları Sanal Asistanı',
      description: 'Personel yönetimini kolaylaştırın, işe alım süreçlerini hızlandırın. CV analizi, performans değerlendirme ve bordro yönetimi.',
      icon: '👥',
      color: 'from-indigo-500 to-indigo-700',
      features: ['İşe Alım', 'Performans Takibi', 'Bordro', 'Eğitim Yönetimi'],
    },
    {
      code: 'fokus717',
      name: 'FOKUS717',
      title: 'İçerik Tasarımı Sanal Asistanı',
      description: 'Yaratıcı içerikler oluşturun, markanızı öne çıkarın. Copywriting, görsel öneriler ve içerik stratejisi.',
      icon: '🎨',
      color: 'from-pink-500 to-pink-700',
      features: ['Copywriting', 'İçerik Stratejisi', 'Görsel Öneriler', 'Marka İletişimi'],
    },
    {
      code: 'fokus808',
      name: 'FOKUS808',
      title: 'Sosyal Medya & İletişim Sanal Asistanı',
      description: 'Sosyal medya varlığınızı güçlendirin, kitlenizle etkileşim kurun. Post planlaması, içerik takvimi ve analiz.',
      icon: '📱',
      color: 'from-cyan-500 to-cyan-700',
      features: ['Post Planlama', 'İçerik Takvimi', 'Etkileşim Analizi', 'Trend Takibi'],
    },
    {
      code: 'fokus999',
      name: 'FOKUS999',
      title: 'Joker Sanal Asistan',
      description: 'Tüm ihtiyaçlarınız için esnek, çok yönlü asistan. Tüm asistanların yeteneklerini tek bir platformda birleştirin.',
      icon: '🃏',
      color: 'from-red-500 to-red-700',
      features: ['Çok Yönlü', 'Esnek Kullanım', 'Özelleştirilebilir', 'Entegre Çözüm'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#860000] via-[#a50000] to-[#6b0000] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                <Bot className="w-4 h-4 mr-2" />
                <span className="text-sm">9 Uzman Yapay Zeka Asistan</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-[#ffc107]">Sanal Asistanlar</span>
                <br />
                İş Süreçleriniz İçin Özel Çözümler
              </h1>

              <p className="text-xl text-gray-200 mb-8">
                Her iş ihtiyacınız için özel olarak eğitilmiş yapay zeka asistanları.
                Google ile giriş yapın, hemen kullanmaya başlayın.
              </p>
            </div>
          </div>
        </section>

        {/* Assistants Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {assistants.map((assistant) => (
                <div
                  key={assistant.code}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group"
                >
                  <div className={`bg-gradient-to-r ${assistant.color} p-6 text-center`}>
                    <div className="text-6xl mb-3 group-hover:scale-110 transition">
                      {assistant.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{assistant.name}</h3>
                    <p className="text-white/90 text-sm">{assistant.title}</p>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-6">{assistant.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 text-[#ffc107]" />
                        Öne Çıkan Özellikler
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {assistant.features.map((feature, index) => (
                          <div
                            key={index}
                            className="text-xs bg-gray-100 px-3 py-2 rounded-lg text-gray-700"
                          >
                            • {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/sanalasistanlar/${assistant.code}`}
                      className="flex items-center justify-center w-full bg-[#860000] text-white py-3 rounded-xl font-semibold hover:bg-[#6b0000] transition group"
                    >
                      Detaylı İncele
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#860000] to-[#6b0000] text-white rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Hemen Kullanmaya Başlayın
              </h2>
              <p className="text-lg text-gray-200 mb-8">
                14 gün ücretsiz deneme ile tüm asistanları keşfedin.
              </p>

              <Link
                href="/giris"
                className="inline-flex items-center bg-[#ffc107] text-[#860000] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition"
              >
                Ücretsiz Başlayın
                <ArrowRight className="ml-2" />
              </Link>

              <p className="mt-4 text-sm text-gray-300">
                Kredi kartı gerekmez • İptal ücretsiz
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
