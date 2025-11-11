import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Bot,
  TrendingUp,
  Users,
  Shield,
  Zap,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Star
} from 'lucide-react';

export default function Home() {
  const assistants = [
    {
      code: 'fokus001',
      name: 'FOKUS001',
      title: 'Yönetici Sanal Asistanı',
      description: 'Şirket yönetimini kolaylaştırın, kararlarınızı veri ile destekleyin.',
      icon: '👔',
    },
    {
      code: 'fokus216',
      name: 'FOKUS216',
      title: 'Müşteri Hizmetleri Sanal Asistanı',
      description: 'Müşteri memnuniyetini artırın, 7/24 hızlı destek sağlayın.',
      icon: '💬',
    },
    {
      code: 'fokus314',
      name: 'FOKUS314',
      title: 'Veri Analisti Sanal Asistanı',
      description: 'Verilerinizi anlamlandırın, stratejik kararlar alın.',
      icon: '📊',
    },
    {
      code: 'fokus520',
      name: 'FOKUS520',
      title: 'Pazarlama & Lead Takip',
      description: 'Müşteri adaylarını yönetin, pazarlama kampanyalarını optimize edin.',
      icon: '🎯',
    },
    {
      code: 'fokus618',
      name: 'FOKUS618',
      title: 'Finans & Fatura',
      description: 'Mali süreçlerinizi otomatikleştirin, nakit akışını kontrol edin.',
      icon: '💰',
    },
    {
      code: 'fokus707',
      name: 'FOKUS707',
      title: 'İnsan Kaynakları',
      description: 'Personel yönetimini kolaylaştırın, işe alım süreçlerini hızlandırın.',
      icon: '👥',
    },
    {
      code: 'fokus717',
      name: 'FOKUS717',
      title: 'İçerik Tasarımı',
      description: 'Yaratıcı içerikler oluşturun, markanızı öne çıkarın.',
      icon: '🎨',
    },
    {
      code: 'fokus808',
      name: 'FOKUS808',
      title: 'Sosyal Medya & İletişim',
      description: 'Sosyal medya varlığınızı güçlendirin, kitlenizle etkileşim kurun.',
      icon: '📱',
    },
    {
      code: 'fokus999',
      name: 'FOKUS999',
      title: 'Joker Sanal Asistan',
      description: 'Tüm ihtiyaçlarınız için esnek, çok yönlü asistan.',
      icon: '🃏',
    },
  ];

  const features = [
    {
      icon: <Bot className="w-12 h-12 text-[#860000]" />,
      title: 'Yapay Zeka Gücü',
      description: 'En son yapay zeka teknolojileriyle güçlendirilmiş 9 farklı uzman asistan.',
    },
    {
      icon: <Zap className="w-12 h-12 text-[#860000]" />,
      title: 'Anında Yanıt',
      description: '7/24 aktif asistanlar ile iş süreçlerinizde hız kazanın.',
    },
    {
      icon: <Shield className="w-12 h-12 text-[#860000]" />,
      title: 'Güvenli & Gizli',
      description: 'Verileriniz tamamen güvende, KVKK uyumlu altyapı.',
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-[#860000]" />,
      title: 'Verimlilik Artışı',
      description: 'İş süreçlerinizi optimize ederek %40\'a kadar verimlilik artışı.',
    },
    {
      icon: <Users className="w-12 h-12 text-[#860000]" />,
      title: 'Kolay Entegrasyon',
      description: 'Google hesabınızla giriş yapın, hemen kullanmaya başlayın.',
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-[#860000]" />,
      title: 'Detaylı Raporlama',
      description: 'İş süreçlerinizi anlık olarak takip edin, raporlar alın.',
    },
  ];

  const benefits = [
    'Zaman Tasarrufu - Rutin işleri otomatikleştirin',
    'Maliyet Düşürme - İnsan kaynağı maliyetlerini optimize edin',
    'Hata Minimizasyonu - Yapay zeka ile daha az hata',
    'Ölçeklenebilirlik - İşiniz büyüdükçe asistanlarınız da büyür',
    '24/7 Erişilebilirlik - Her an her yerden erişim',
    'Veri Odaklı Kararlar - Verilerle desteklenmiş stratejiler',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#860000] via-[#a50000] to-[#6b0000] text-white py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                <Star className="w-4 h-4 mr-2 text-[#ffc107]" />
                <span className="text-sm">Türkiye&apos;nin İlk Yapay Zeka Asistan Ekosistemi</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                9 Farklı Sanal Asistanla
                <br />
                <span className="text-[#ffc107]">İş Süreçlerinizi Optimize Edin</span>
              </h1>

              <p className="text-xl lg:text-2xl mb-8 text-gray-200">
                Yapay zeka destekli asistanlarımızla verimliliğinizi artırın,
                maliyetlerinizi düşürün, işinizi büyütün.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/giris"
                  className="bg-[#ffc107] text-[#860000] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-2xl hover:shadow-yellow-300/50 flex items-center justify-center group"
                >
                  Hemen Başlayın
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  href="/sanalasistanlar"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition"
                >
                  Asistanları Keşfedin
                </Link>
              </div>

              <p className="mt-6 text-sm text-gray-300">
                ✓ Kredi kartı gerekmez &nbsp; ✓ 14 gün ücretsiz deneme &nbsp; ✓ İptal ücretsiz
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-gray-800">
                Neden <span className="text-[#860000]">FOKUS</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Yapay zeka teknolojisini iş süreçlerinize entegre ederek rekabet avantajı kazanın
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition group hover:-translate-y-2 duration-300"
                >
                  <div className="mb-4 group-hover:scale-110 transition">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Assistants Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-gray-800">
                9 Uzman <span className="text-[#860000]">Sanal Asistan</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Her iş ihtiyacınız için özel olarak eğitilmiş yapay zeka asistanları
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assistants.map((assistant) => (
                <Link
                  key={assistant.code}
                  href={`/sanalasistanlar/${assistant.code}`}
                  className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 p-6 rounded-2xl hover:border-[#860000] hover:shadow-2xl transition group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition">
                    {assistant.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#860000]">{assistant.name}</h3>
                  <h4 className="text-lg font-semibold mb-3 text-gray-700">{assistant.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{assistant.description}</p>
                  <div className="flex items-center text-[#860000] font-semibold group-hover:translate-x-2 transition">
                    Detaylı İncele <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-[#860000] to-[#6b0000] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold mb-12 text-center">
                İşletmenize Sağlayacağı <span className="text-[#ffc107]">Faydalar</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle2 className="w-6 h-6 text-[#ffc107] flex-shrink-0 mt-1" />
                    <p className="text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-gray-50 to-white border-2 border-[#860000] rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
                Hazır mısınız?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Bugün başlayın, işletmenizi yapay zeka ile güçlendirin.
                <br />
                İlk 14 gün tamamen ücretsiz!
              </p>

              <Link
                href="/giris"
                className="inline-flex items-center bg-[#860000] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#6b0000] transition shadow-2xl hover:shadow-[#860000]/50 group"
              >
                Ücretsiz Deneyin
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition" />
              </Link>

              <p className="mt-6 text-gray-500 text-sm">
                Kredi kartı bilgisi gerekmez • İstediğiniz zaman iptal edebilirsiniz
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
