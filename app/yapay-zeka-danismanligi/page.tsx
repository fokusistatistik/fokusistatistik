import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ServiceSchema, BreadcrumbSchema } from '@/app/components/StructuredData';

export const metadata: Metadata = {
  title: 'Yapay Zeka Danışmanlığı | AI Stratejisi, ChatGPT Entegrasyonu, Dijital Dönüşüm',
  description: '22 yıllık deneyim ve akademik uzmanlıkla yapay zeka danışmanlığı. ChatGPT entegrasyonu, veri bilimi, machine learning stratejileri, dijital dönüşüm ve AI otomasyon çözümleri. İşletmeniz için özel yapay zeka yol haritası.',
  keywords: [
    'yapay zeka danışmanlığı',
    'AI consulting',
    'chatgpt danışmanlık',
    'dijital dönüşüm',
    'veri stratejisi',
    'otomasyon danışmanlığı',
    'machine learning danışmanlık',
    'yapay zeka stratejisi',
    'AI transformation',
    'openai entegrasyonu',
    'gpt-4 danışmanlık',
    'iş zekası danışmanlığı',
    'veri bilimi danışmanlığı',
    'AI yol haritası',
    'yapay zeka çözümleri',
  ],
  openGraph: {
    title: 'Yapay Zeka Danışmanlığı | FOKUS İstatistik',
    description: '22 yıllık deneyimle AI stratejileri, ChatGPT entegrasyonu ve dijital dönüşüm danışmanlığı.',
    url: 'https://fokusistatistik.com/yapay-zeka-danismanligi',
    images: [
      {
        url: '/assets/cdn/logolar/fokuslogo1.png',
        width: 1200,
        height: 630,
        alt: 'FOKUS Yapay Zeka Danışmanlığı',
      },
    ],
  },
  alternates: {
    canonical: 'https://fokusistatistik.com/yapay-zeka-danismanligi',
  },
};

export default function YapayZekaDanismanligi() {
  return (
    <>
      <ServiceSchema
        name="Yapay Zeka Danışmanlığı"
        description="22 yıllık deneyim ve akademik uzmanlıkla yapay zeka danışmanlığı hizmetleri. ChatGPT entegrasyonu, veri bilimi, machine learning stratejileri ve dijital dönüşüm çözümleri."
        url="https://fokusistatistik.com/yapay-zeka-danismanligi"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://fokusistatistik.com' },
          { name: 'Yapay Zeka Danışmanlığı', url: 'https://fokusistatistik.com/yapay-zeka-danismanligi' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#860000] to-[#a30000] rounded-full flex items-center justify-center shadow-xl p-4">
              <div className="relative w-full h-full">
                <Image
                  src="/assets/cdn/resimler/logobeyaz.png"
                  alt="FOKUS Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Yapay Zeka Danışmanlığı
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            22 yıllık deneyimimiz ve akademik kökenli ekibimizle
            <br />
            işletmenize özel yapay zeka stratejileri geliştiriyoruz
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://asistan.fokusistatistik.com/ucretsiz.html"
              className="bg-[#860000] hover:bg-[#b30000] text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Ücretsiz Danışmanlık Talep Edin
            </Link>
            {/* 
            <Link
              href="/analiz-formu"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-8 rounded-lg transition-all"
            >
              İhtiyaç Analizi
            </Link>
            */}
          </div>
        </section>

        {/* What We Offer */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center text-[#860000] mb-12">
            Danışmanlık Hizmetlerimiz
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-3xl">
                  🎯
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Stratejik Planlama</h3>
                <p className="text-gray-600">
                  İşletmenizin dijital dönüşüm yol haritasını çıkarıyor, öncelikleri belirliyoruz.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center text-3xl">
                  📊
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Veri Analizi ve Modelleme</h3>
                <p className="text-gray-600">
                  Verilerinizi analiz ediyor, tahminsel modeller ve karar destek sistemleri geliştiriyoruz.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center text-3xl">
                  ⚙️
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Süreç Otomasyonu</h3>
                <p className="text-gray-600">
                  Tekrarlayan işlerinizi otomatikleştiriyor, iş gücü ve zaman tasarrufu sağlıyoruz.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center text-3xl">
                  🤖
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Entegrasyonu</h3>
                <p className="text-gray-600">
                  ChatGPT, Claude, Gemini gibi AI araçlarını iş süreçlerinize entegre ediyoruz.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center text-3xl">
                  🎯
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">İnovasyon Atölyeleri</h3>
                <p className="text-gray-600">
                  Ekiplerinizle birlikte yapay zeka kullanım senaryoları ve çözümler üretiyoruz.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-cyan-100 rounded-lg flex items-center justify-center text-3xl">
                  🎓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Eğitim ve Kapasite Geliştirme</h3>
                <p className="text-gray-600">
                  Ekiplerinizi yapay zeka, veri bilimi ve otomasyon konularında eğitiyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-gradient-to-r from-[#860000] to-[#a30000] rounded-2xl shadow-xl p-8 md:p-12 text-white mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Danışmanlık Sürecimiz
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#860000] text-3xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Keşif</h3>
              <p className="text-sm opacity-90">
                İhtiyaçlarınızı dinliyor, mevcut durumu analiz ediyoruz
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#860000] text-3xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">Analiz</h3>
              <p className="text-sm opacity-90">
                Verilerinizi inciliyor, fırsatları belirliyoruz
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#860000] text-3xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">Strateji</h3>
              <p className="text-sm opacity-90">
                Size özel AI stratejisi ve yol haritası oluşturuyoruz
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#860000] text-3xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold mb-2">Uygulama</h3>
              <p className="text-sm opacity-90">
                Çözümleri devreye alıyor, entegre ediyoruz
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#860000] text-3xl font-bold mx-auto mb-4">
                5
              </div>
              <h3 className="font-bold mb-2">Destek</h3>
              <p className="text-sm opacity-90">
                Sürekli izliyor, optimize ediyor ve destek veriyoruz
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center text-[#860000] mb-12">
            Hangi Alanlarda Yardımcı Oluyoruz?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#860000] hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Kurumsal Dönüşüm</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Dijital dönüşüm stratejisi</li>
                <li>• Legacy sistem modernizasyonu</li>
                <li>• Veri altyapısı kurulumu</li>
                <li>• AI readiness değerlendirmesi</li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#860000] hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Veri ve Analitik</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• BI ve dashboard sistemleri</li>
                <li>• Tahminsel analitik</li>
                <li>• Müşteri segmentasyonu</li>
                <li>• KPI tanımlama ve ölçüm</li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#860000] hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Otomasyon ve AI</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Chatbot ve sanal asistanlar</li>
                <li>• RPA (Robotik Süreç Otomasyonu)</li>
                <li>• Doküman işleme (OCR, NLP)</li>
                <li>• Görüntü işleme ve tanıma</li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#860000] hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Müşteri Deneyimi</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Kişiselleştirme motorları</li>
                <li>• Sentiment analizi</li>
                <li>• Öneri sistemleri</li>
                <li>• Müşteri yolculuğu optimizasyonu</li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#860000] hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Operasyonel Verimlilik</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Stok ve tedarik optimizasyonu</li>
                <li>• Talep tahmini</li>
                <li>• Kaynak planlaması</li>
                <li>• Anomali tespiti</li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#860000] hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Pazarlama ve Satış</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Lead scoring ve önceliklendirme</li>
                <li>• Kampanya optimizasyonu</li>
                <li>• Fiyatlandırma stratejileri</li>
                <li>• Churn (müşteri kaybı) analizi</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center text-[#860000] mb-12">
            Neden FOKUS ile Çalışmalısınız?
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#860000] rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">22 Yıllık Deneyim</h3>
                <p className="text-gray-600 text-sm">
                  İstatistik ve veri bilimi alanında iki dekattan fazla deneyimimiz var
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#860000] rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Akademik Köken</h3>
                <p className="text-gray-600 text-sm">
                  İstatistik ve veri bilimi kökenli ekibimizle bilimsel yöntemlerle çalışıyoruz
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#860000] rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Sektör Agnostik</h3>
                <p className="text-gray-600 text-sm">
                  Sağlık, eğitim, perakende, üretim gibi farklı sektörlerde proje deneyimimiz var
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#860000] rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Teknoloji Bağımsız</h3>
                <p className="text-gray-600 text-sm">
                  Python, R, Power BI, Azure, AWS gibi farklı teknolojileri kullanıyoruz
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#860000] rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Ölçülebilir Sonuçlar</h3>
                <p className="text-gray-600 text-sm">
                  Her projede somut, ölçülebilir KPI&apos;lar belirliyoruz ve raporluyoruz
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#860000] rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Etik ve KVKK Uyumlu</h3>
                <p className="text-gray-600 text-sm">
                  Tüm süreçlerimizde veri gizliliği ve etik kurallara titizlikle uyuyoruz
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ücretsiz Danışmanlık Görüşmesi
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            İşletmenizin yapay zeka potansiyelini keşfedin.
            <br />
            30 dakikalık ücretsiz danışmanlık görüşmesi için hemen başvurun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://asistan.fokusistatistik.com/ucretsiz.html"
              className="bg-[#860000] hover:bg-[#b30000] text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Hemen Başvur
            </Link>
            <Link
              href="/neden-biz"
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-lg transition-all shadow-lg"
            >
              Neden FOKUS?
            </Link>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}
