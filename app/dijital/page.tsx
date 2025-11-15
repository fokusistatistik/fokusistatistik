import type { Metadata } from 'next';
import {
  Stethoscope,
  GraduationCap,
  Building2,
  ShoppingCart,
  Briefcase,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ServiceSchema } from '@/app/components/StructuredData';

export const metadata: Metadata = {
  title: 'Dijital Çözümler | İş Süreçleri Otomasyonu, Veri Analizi, Dijital Dönüşüm',
  description: 'Sağlık, eğitim, kamu, ticaret ve girişimler için dijital dönüşüm çözümleri. İş süreçleri otomasyonu, veri analizi, yapay zeka entegrasyonu, müşteri ilişkileri yönetimi ve performans takibi sistemleri.',
  keywords: [
    'dijital çözümler',
    'dijital dönüşüm',
    'iş süreçleri otomasyonu',
    'veri analizi',
    'müşteri ilişkileri yönetimi',
    'CRM',
    'performans takibi',
    'satış otomasyonu',
    'e-ticaret çözümleri',
    'dijital otomasyon',
    'iş zekası',
    'süreç optimizasyonu',
    'dijitalleşme',
    'kurumsal çözümler',
  ],
  openGraph: {
    title: 'Dijital Çözümler | FOKUS İstatistik',
    description: 'Sağlık, eğitim, kamu ve ticaret için dijital dönüşüm ve otomasyon çözümleri.',
    url: 'https://fokusistatistik.com/dijital',
    images: [
      {
        url: 'https://static.fokusistatistik.com/resimler/fokus-ekosistem-og.jpg',
        width: 1200,
        height: 630,
        alt: 'FOKUS Dijital Çözümler',
      },
    ],
  },
  alternates: {
    canonical: 'https://fokusistatistik.com/dijital',
  },
};

export default function DijitalCozumler() {
  const sectors = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Hizmet ve Uzmanlık Tabanlı İşletmeler',
      description:
        'Berberlerden doktorlara, veterinerden psikologlara; müşteri odaklı hizmet sunan tüm işletmelerin ihtiyaçlarına özel, iş akışlarını hızlandıran ve müşteri deneyimini iyileştiren çözümler sunuyoruz.',
      emoji: '🔧',
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Danışmanlık ve Eğitim Kurumları',
      description:
        'Akademiler, bireysel eğitmenler ve koçluk hizmetleri için veri destekli performans takibi, eğitim içerik otomasyonu ve dijital danışmanlık çözümleri geliştiriyoruz.',
      emoji: '🧠',
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: 'Sağlık ve Kamu Kurumları',
      description:
        'Özel hastanelerden belediyelere, eczanelerden sağlık merkezlerine kadar geniş yelpazede veri analizi, süreç optimizasyonu ve dijital iletişim sistemleri sağlıyoruz.',
      emoji: '🏛️',
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Ticaret ve Satış Organizasyonları',
      description:
        'Perakende zincirleri, e-ticaret platformları ve satış ekiplerine özel performans izleme, müşteri ilişkileri yönetimi ve satış otomasyonu çözümleri sunuyoruz.',
      emoji: '🏢',
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Girişim ve Özel Sektör',
      description:
        'Startup\'lardan hukuk bürolarına, yazılım firmalarından lojistik şirketlerine kadar tüm özel sektör paydaşları için dijitalleşme ve yapay zeka tabanlı çözümler geliştiriyoruz.',
      emoji: '🏘️',
    },
  ];

  const solutions = [
    'Randevu & Hatırlatma Sistemleri',
    'İş Analitiği & Raporlama',
    'Satış, Personel & Finans Yönetimi',
    'Yapay Zeka & GPT Tabanlı Sistemler',
    'Dijital İş Akışları & Otomasyon',
    'Akademik & Kurumsal Bilgi Sistemleri',
    'Veri Bilimi & İstatistiksel Danışmanlık',
    'Yapay Zeka & Akıllı Ajan Entegrasyonları',
    'Karar Destek ve İş Analitiği Sistemleri',
    'Verimlilik ve Optimizasyon Çözümleri',
    'Kurumsal Eğitim ve Kapasite Geliştirme',
    'Veri Yönetimi ve Otomasyon Sistemleri',
    'Modelleme ve Tahminleme Sistemleri',
    'Raporlama, Sunum ve Görsel İletişim Tasarımları',
    'Müşteri ve Çalışan Memnuniyeti Ölçümleme & Anket Tasarımı',
    'Personel ve Birim Performans İzleme & Değerlendirme',
    'Yapay Zeka Destekli Sanal Personel Çözümleri',
    'Üretken Yapay Zeka ile İçerik Otomasyonu',
    'Akıllı Süreç Otomasyonu ve Dijital İş Akışları',
    'Mikro Yapay Zeka Uygulamaları (MiniGPT)',
    'Sektörel Yapay Zeka ve Veri Çözümleri',
    'Çok Kanallı Veri Toplama & Akıllı Form Sistemleri',
    'Kurumsal Hafıza Sistemleri',
    'Chatbot ve Konuşma Tabanlı Asistanlar',
    'Akıllı İçerik Üretimi',
    'Prototipleme ve Simülasyon Hizmetleri',
    'Dijital Dönüşüm Yol Haritaları',
    'Akademik Yayınlara Destek',
    'İstatistik, Veri Bilimi ve Yapay Zeka ile İlgili Diğer Tüm Konular',
    'Kurumsal Danışman Asistanlar',
    'Güvenlik & GDPR Uyumlu Veri Sistemleri',
  ];

  const checklistItems = [
    'Verinizi sadece rakam olarak değil, stratejik bilgiye dönüştürmek ister misiniz?',
    'Güvenilir içgörülerle daha doğru ve hızlı kararlar almak ister misiniz?',
    'Yapay zeka destekli sistemlerle süreçlerinizi hızlandırmak ve hataları azaltmak ister misiniz?',
    'İş akışlarınızı otomatikleştirerek maliyetleri düşürüp verimliliği artırmak ister misiniz?',
    'Gerçek zamanlı performans izleme sistemleriyle süreci anlık takip etmek ister misiniz?',
    'Kaynak kullanımını optimize edip zaman ve bütçe tasarrufu sağlamak ister misiniz?',
    'Veri okuryazarlığını artırarak kurum içi yetkinliği güçlendirmek ister misiniz?',
    'Verilerinizi güvenle depolayıp, otomatik raporlama altyapıları kurmak ister misiniz?',
    'Geleceğe yönelik tahmin modelleriyle stratejik planlama yapmak ister misiniz?',
    'Etkili ve sade raporlarla karar süreçlerinde fark yaratmak ister misiniz?',
    'Müşteri ve çalışan memnuniyetini veri ile ölçmek ve geliştirmek ister misiniz?',
    'Personel ve ekip performansını objektif şekilde değerlendirmek ister misiniz?',
    '7/24 erişilebilir yapay zeka destekli asistanlarla hizmet kalitenizi artırmak ister misiniz?',
    'Sosyal medya ve pazarlama süreçlerinizi otomatikleştirmek ister misiniz?',
    'Yapay zeka destekli mini danışman sistemleriyle müşterilerinize özel çözümler sunmak ister misiniz?',
    'Mobil ve web tabanlı akıllı formlarla saha verisini gerçek zamanlı toplamak ister misiniz?',
    'Kurumsal hafıza sistemleriyle bilgiye hızlı erişim sağlamak ister misiniz?',
    'WhatsApp, Telegram gibi platformlar üzerinden chatbot ile anlık iletişim kurmak ister misiniz?',
    'Akademik çalışmalarınızda istatistiksel analiz ve modelleme desteği almak ister misiniz?',
    'Dijital dönüşüm yol haritanızı birlikte çizmek ve geleceğe hazır olmak ister misiniz?',
    'Karmaşık veri sorunlarınız için size özel, sürdürülebilir çözümler geliştirmemizi ister misiniz?',
    'Ücretsiz demo ve pilot uygulamalarla projelerinizi risksiz şekilde test etmek ister misiniz?',
    'Kurumsal kimlik ve dijital görünürlüğünüzü güçlendirmek ister misiniz?',
    'Bütçenize ve ihtiyaçlarınıza uygun, tamamen size özel çözümler ister misiniz?',
    '22 yıllık deneyim ve bilimsel yaklaşımla güvenilir sonuçlar elde etmek ister misiniz?',
    'Sadece hizmet değil, birlikte öğrenen bir çözüm ortağı ile çalışmak ister misiniz?',
    'Dijital işçilerinizi düşük maliyetle 7/24 devrede tutmak ister misiniz?',
  ];

  return (
    <>
      <ServiceSchema
        name="Dijital Çözümler"
        description="Sağlık, eğitim, kamu, ticaret ve girişimler için dijital dönüşüm çözümleri. İş süreçleri otomasyonu, veri analizi ve performans takibi sistemleri."
        url="https://fokusistatistik.com/dijital"
      />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#860000] via-[#a50000] to-[#6b0000] text-white py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-[#ffc107]" />
              <h1 className="text-3xl lg:text-5xl font-bold mb-6">
                Dijital Çözümlerimiz ile İşinizi Geleceğe Taşıyın
              </h1>
              <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                FOKUS İstatistik olarak, işletmenizin dijital dönüşümünü hızlandırmak ve rekabet gücünüzü artırmak için yapay zeka, veri bilimi ve otomasyon teknolojilerinde öncü çözümler sunuyoruz. Ham verilerinizi anlamlı, stratejik bilgiye dönüştürerek iş süreçlerinizi optimize ediyor; karar alma mekanizmalarınızı güçlendiriyoruz.
              </p>
              <p className="text-lg text-gray-200 leading-relaxed">
                İster küçük işletme olun, ister büyük bir kurum; size özel, ölçeklenebilir ve yenilikçi dijital araçlarımızla yanınızdayız. Karmaşık veri yapıları, manuel iş akışları ve yetersiz analizler zamanınızı ve kaynaklarınızı tüketirken, doğru teknoloji ve yöntemlerle bunları avantaja dönüştürmek mümkündür. Bizimle tanışın, dijital çağda öne geçmenin yollarını birlikte keşfedelim.
              </p>
            </div>
          </div>
        </section>

        {/* Sectors Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                  Kimlere <span className="text-[#860000]">Hizmet Veriyoruz?</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectors.map((sector, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#860000] transition group"
                  >
                    <div className="text-5xl mb-4">{sector.emoji}</div>
                    <h3 className="font-bold text-lg mb-3 text-gray-800 group-hover:text-[#860000] transition">
                      {sector.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{sector.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                  Çözüm <span className="text-[#860000]">Paketlerimiz</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solutions.map((solution, index) => (
                  <div
                    key={index}
                    className="bg-white border-l-4 border-[#860000] rounded-lg p-5 hover:shadow-lg transition flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#860000] flex-shrink-0 mt-1" />
                    <h3 className="font-semibold text-gray-800">{solution}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Checklist Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-[#860000] rounded-2xl p-8 lg:p-12 shadow-xl">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800 text-center">
                  Doğru Yerde <span className="text-[#860000]">misiniz?</span>
                </h2>
                <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
                  <strong>
                    Eğer aşağıdaki sorulardan en az biri sizin için önemliyse, doğru yerdesiniz!
                  </strong>
                </p>
                <p className="text-gray-700 mb-8 text-center leading-relaxed">
                  İster işini tek başına yöneten bir girişimci olun, ister büyük ve çok katmanlı bir kurumun yöneticisi — FOKUS Veri Bilimi ve Yapay Zeka Danışmanlığı olarak dijital dönüşümün her aşamasında ve her ölçekte yanınızdayız. Veriyi bilgiye, bilgiyi stratejiye dönüştürmek için buradayız.
                </p>

                <div className="space-y-3">
                  {checklistItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-[#860000] transition"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#860000] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#860000] to-[#6b0000] text-white rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Dijital Dönüşüme Hemen Başlayın
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Size özel çözümlerimiz hakkında konuşmak ve ihtiyaçlarınızı değerlendirmek için bizimle iletişime geçin.
              </p>
              <a
                href="mailto:bilgi@fokusistatistik.com"
                className="inline-block bg-white text-[#860000] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-xl"
              >
                Ücretsiz Görüşme Talep Edin
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
