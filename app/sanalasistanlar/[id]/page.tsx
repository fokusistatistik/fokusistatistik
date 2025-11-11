import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  Zap,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { notFound } from 'next/navigation';

interface AssistantData {
  code: string;
  name: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  features: string[];
  useCases: string[];
  benefits: string[];
  technologies: string[];
}

const assistantsData: Record<string, AssistantData> = {
  fokus001: {
    code: 'fokus001',
    name: 'FOKUS001',
    title: 'Yönetici Sanal Asistanı',
    description: 'Şirket yönetimini kolaylaştırın, kararlarınızı veri ile destekleyin',
    longDescription:
      'FOKUS001, üst düzey yöneticiler için tasarlanmış yapay zeka destekli bir asistandır. Şirket performansınızı izler, veri odaklı öneriler sunar ve stratejik kararlarınızı destekler.',
    icon: '👔',
    color: 'from-blue-500 to-blue-700',
    features: [
      'Karar Destek Sistemi',
      'Performans Takibi',
      'Otomatik Raporlama',
      'KPI Analizi',
      'Trend Tahminleme',
      'Strateji Önerileri',
    ],
    useCases: [
      'Haftalık/aylık performans raporlarının otomatik oluşturulması',
      'Departman performanslarının karşılaştırmalı analizi',
      'Gelecek dönem tahminleri ve öneriler',
      'Kritik metriklerin anlık takibi',
    ],
    benefits: [
      'Zamandan tasarruf: Rapor hazırlama süresini %80 azaltın',
      'Daha iyi kararlar: Veri odaklı içgörüler',
      'Risk yönetimi: Potansiyel sorunları önceden tespit edin',
      'Verimlilik: Yönetim süreçlerini otomatikleştirin',
    ],
    technologies: ['GPT-4', 'Veri Analizi', 'Business Intelligence', 'Makine Öğrenmesi'],
  },
  fokus216: {
    code: 'fokus216',
    name: 'FOKUS216',
    title: 'Müşteri Hizmetleri Sanal Asistanı',
    description: 'Müşteri memnuniyetini artırın, 7/24 hızlı destek sağlayın',
    longDescription:
      'FOKUS216, müşteri hizmetleri operasyonlarınızı otomatikleştirir. 7/24 müşteri taleplerine yanıt verir, sık sorulan sorulara çözüm üretir ve müşteri memnuniyetini artırır.',
    icon: '💬',
    color: 'from-green-500 to-green-700',
    features: [
      '7/24 Otomatik Yanıt',
      'Çok Dilli Destek',
      'Talep Yönetimi',
      'Müşteri Geçmişi Takibi',
      'Sentiment Analizi',
      'Otomatik Ticket Oluşturma',
    ],
    useCases: [
      'Sık sorulan soruların otomatik yanıtlanması',
      'Müşteri taleplerinin kategorize edilmesi ve yönlendirilmesi',
      'Müşteri memnuniyeti anketleri ve analizi',
      'Canlı destek öncesi ön eleme',
    ],
    benefits: [
      'Maliyet düşürme: Destek maliyetlerini %60 azaltın',
      'Hızlı yanıt: Ortalama yanıt süresini saniyeler içine indirin',
      'Müşteri memnuniyeti: Daha hızlı çözümlerle mutlu müşteriler',
      '24/7 erişim: Zaman dilimi sınırlaması olmadan destek',
    ],
    technologies: ['Natural Language Processing', 'Chatbot', 'Sentiment Analysis', 'CRM Integration'],
  },
  fokus314: {
    code: 'fokus314',
    name: 'FOKUS314',
    title: 'Veri Analisti Sanal Asistanı',
    description: 'Verilerinizi anlamlandırın, stratejik kararlar alın',
    longDescription:
      'FOKUS314, veri analizi uzmanınızdır. Karmaşık veri setlerini analiz eder, görselleştirir ve iş süreçleriniz için öngörüler sunar.',
    icon: '📊',
    color: 'from-purple-500 to-purple-700',
    features: [
      'İstatistiksel Analiz',
      'Veri Görselleştirme',
      'Tahminsel Modelleme',
      'A/B Test Analizi',
      'Cohort Analizi',
      'Otomatik Dashboard',
    ],
    useCases: [
      'Satış trendlerinin analizi ve tahmini',
      'Müşteri segmentasyonu ve davranış analizi',
      'Ürün performans analizleri',
      'Pazarlama kampanyası ROI hesaplaması',
    ],
    benefits: [
      'Daha iyi içgörüler: Verilerinizden maksimum değer',
      'Hızlı analiz: Manuel analizlere göre %90 daha hızlı',
      'Görselleştirme: Kolay anlaşılır grafikler ve dashboardlar',
      'Tahminleme: Gelecek trendleri önceden görün',
    ],
    technologies: ['Python', 'R', 'Machine Learning', 'Data Visualization', 'SQL'],
  },
  fokus520: {
    code: 'fokus520',
    name: 'FOKUS520',
    title: 'Pazarlama & Lead Takip Sanal Asistanı',
    description: 'Müşteri adaylarını yönetin, pazarlama kampanyalarını optimize edin',
    longDescription:
      'FOKUS520, pazarlama ve satış ekiplerinin en iyi dostudur. Lead yönetimi, kampanya optimizasyonu ve dönüşüm artırma konusunda uzmanlaşmıştır.',
    icon: '🎯',
    color: 'from-orange-500 to-orange-700',
    features: [
      'Lead Scoring',
      'Kampanya Yönetimi',
      'Email Marketing Automation',
      'SEO Analizi',
      'Conversion Optimization',
      'Social Media Integration',
    ],
    useCases: [
      'Lead\'lerin kalite puanlaması ve önceliklendirme',
      'Email kampanyalarının otomatik yönetimi',
      'Landing page A/B testleri',
      'SEO içerik önerileri',
    ],
    benefits: [
      'Daha fazla dönüşüm: Konversiyon oranını %35 artırın',
      'Verimli kaynak kullanımı: Doğru lead\'lere odaklanın',
      'Otomasyon: Marketing süreçlerini otomatikleştirin',
      'ROI artışı: Pazarlama bütçenizi optimize edin',
    ],
    technologies: ['Marketing Automation', 'CRM', 'Google Analytics', 'SEO Tools'],
  },
  fokus618: {
    code: 'fokus618',
    name: 'FOKUS618',
    title: 'Finans & Fatura Sanal Asistanı',
    description: 'Mali süreçlerinizi otomatikleştirin, nakit akışını kontrol edin',
    longDescription:
      'FOKUS618, finansal süreçlerinizi yönetir. Fatura oluşturma, gider takibi, nakit akışı yönetimi ve mali raporlama konularında size yardımcı olur.',
    icon: '💰',
    color: 'from-emerald-500 to-emerald-700',
    features: [
      'Otomatik Fatura Oluşturma',
      'Gider Takibi',
      'Nakit Akış Yönetimi',
      'Vergi Hesaplamaları',
      'Mali Raporlama',
      'Muhasebe Entegrasyonu',
    ],
    useCases: [
      'Otomatik fatura oluşturma ve gönderimi',
      'Aylık gider raporları',
      'Nakit akış tahminleri',
      'Vergi beyannamesi hazırlığı',
    ],
    benefits: [
      'Zaman kazanımı: Fatura süreçlerinde %75 zaman tasarrufu',
      'Hata azaltma: Manuel hataları minimize edin',
      'Nakit akış kontrolü: Finansal durumu anlık izleyin',
      'Uyumluluk: Vergi ve yasal gerekliliklere uyum',
    ],
    technologies: ['Accounting Software', 'Invoice Automation', 'Financial Analysis', 'ERP Integration'],
  },
  fokus707: {
    code: 'fokus707',
    name: 'FOKUS707',
    title: 'İnsan Kaynakları Sanal Asistanı',
    description: 'Personel yönetimini kolaylaştırın, işe alım süreçlerini hızlandırın',
    longDescription:
      'FOKUS707, İK süreçlerinizi optimize eder. İşe alım, performans yönetimi, eğitim ve bordro süreçlerinde size destek olur.',
    icon: '👥',
    color: 'from-indigo-500 to-indigo-700',
    features: [
      'CV Tarama & Analizi',
      'İşe Alım Süreci Yönetimi',
      'Performans Değerlendirme',
      'Eğitim Planlaması',
      'Bordro Yönetimi',
      'Çalışan Memnuniyeti Analizi',
    ],
    useCases: [
      'CV\'lerin otomatik taranması ve ön eleme',
      'Performans değerlendirme formlarının analizi',
      'Eğitim ihtiyaç analizi',
      'Bordro hesaplamaları',
    ],
    benefits: [
      'Hızlı işe alım: İşe alım sürecini %50 hızlandırın',
      'Daha iyi eşleşme: Doğru aday-pozisyon eşleştirmesi',
      'Verimli yönetim: İK süreçlerini otomatikleştirin',
      'Çalışan mutluluğu: Memnuniyet anketleri ile geri bildirim',
    ],
    technologies: ['ATS Systems', 'HR Analytics', 'Performance Management', 'Payroll Software'],
  },
  fokus717: {
    code: 'fokus717',
    name: 'FOKUS717',
    title: 'İçerik Tasarımı Sanal Asistanı',
    description: 'Yaratıcı içerikler oluşturun, markanızı öne çıkarın',
    longDescription:
      'FOKUS717, içerik üretim sürecinizi hızlandırır. Blog yazıları, sosyal medya içerikleri, email metinleri ve daha fazlası için yaratıcı çözümler sunar.',
    icon: '🎨',
    color: 'from-pink-500 to-pink-700',
    features: [
      'Copywriting',
      'İçerik Stratejisi',
      'SEO Optimizasyonu',
      'Görsel Öneri',
      'Marka Ses Tonu',
      'Çoklu Format Desteği',
    ],
    useCases: [
      'Blog yazıları ve makaleler',
      'Sosyal medya gönderileri',
      'Email marketing içerikleri',
      'Ürün açıklamaları',
    ],
    benefits: [
      'Hızlı üretim: İçerik üretimini %80 hızlandırın',
      'Tutarlılık: Marka ses tonunda tutarlı içerik',
      'SEO dostu: Arama motorlarına optimize edilmiş',
      'Yaratıcılık: Sürekli taze ve özgün fikirler',
    ],
    technologies: ['GPT-4', 'Content Management', 'SEO Tools', 'Creative AI'],
  },
  fokus808: {
    code: 'fokus808',
    name: 'FOKUS808',
    title: 'Sosyal Medya & İletişim Sanal Asistanı',
    description: 'Sosyal medya varlığınızı güçlendirin, kitlenizle etkileşim kurun',
    longDescription:
      'FOKUS808, sosyal medya yönetim sürecinizi kolaylaştırır. İçerik planlaması, zamanlama, analiz ve etkileşim yönetimi konularında size yardımcı olur.',
    icon: '📱',
    color: 'from-cyan-500 to-cyan-700',
    features: [
      'Post Planlama & Zamanlama',
      'İçerik Takvimi',
      'Hashtag Önerileri',
      'Etkileşim Analizi',
      'Trend Takibi',
      'Çoklu Platform Yönetimi',
    ],
    useCases: [
      'Haftalık/aylık içerik takvimi oluşturma',
      'En iyi paylaşım zamanlarının belirlenmesi',
      'Hashtag stratejisi optimizasyonu',
      'Rekabet analizi',
    ],
    benefits: [
      'Tutarlı varlık: Düzenli ve tutarlı paylaşım',
      'Etkileşim artışı: %45\'e kadar daha fazla etkileşim',
      'Zaman yönetimi: Tüm platformları tek yerden yönetin',
      'Trend\'leri yakalayın: Güncel içerik stratejisi',
    ],
    technologies: ['Social Media APIs', 'Scheduling Tools', 'Analytics', 'Trend Analysis'],
  },
  fokus999: {
    code: 'fokus999',
    name: 'FOKUS999',
    title: 'Joker Sanal Asistan',
    description: 'Tüm ihtiyaçlarınız için esnek, çok yönlü asistan',
    longDescription:
      'FOKUS999, tüm asistanların yeteneklerini birleştiren özel bir asistanıdır. İhtiyaçlarınıza göre özelleştirilebilir ve her türlü iş sürecinde size destek olur.',
    icon: '🃏',
    color: 'from-red-500 to-red-700',
    features: [
      'Çok Yönlü Kullanım',
      'Özelleştirilebilir',
      'Entegre Çözüm',
      'Esnek Yapılandırma',
      'Tüm Özelliklere Erişim',
      'Özel Eğitim',
    ],
    useCases: [
      'Özel iş süreçleri için uyarlanabilir çözümler',
      'Çoklu departman desteği',
      'Karmaşık iş akışları',
      'Sektöre özel uygulamalar',
    ],
    benefits: [
      'Esneklik: İhtiyaçlarınıza göre şekillenir',
      'Tüm özellikler: 8 asistanın tüm yetenekleri',
      'Özelleştirme: Size özel yapılandırma',
      'Maksimum verimlilik: Her alanda destek',
    ],
    technologies: ['All FOKUS Technologies', 'Custom Integration', 'Enterprise Solutions'],
  },
};

export default function AssistantDetail({ params }: { params: { id: string } }) {
  const assistant = assistantsData[params.id];

  if (!assistant) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className={`bg-gradient-to-r ${assistant.color} text-white py-20`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-8xl mb-6 animate-bounce">{assistant.icon}</div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">{assistant.name}</h1>
              <h2 className="text-2xl lg:text-3xl mb-6">{assistant.title}</h2>
              <p className="text-xl text-white/90 mb-8">{assistant.description}</p>

              <Link
                href="/giris"
                className="inline-flex items-center bg-white text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-2xl"
              >
                Hemen Başlayın
                <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed">{assistant.longDescription}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Sparkles className="w-12 h-12 text-[#860000] mx-auto mb-4" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  Öne Çıkan Özellikler
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assistant.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex items-start space-x-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Target className="w-12 h-12 text-[#860000] mx-auto mb-4" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  Kullanım Senaryoları
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assistant.useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 p-6 rounded-xl hover:border-[#860000] transition"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#860000] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{useCase}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gradient-to-br from-[#860000] to-[#6b0000] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <TrendingUp className="w-12 h-12 text-[#ffc107] mx-auto mb-4" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">İşletmenize Faydaları</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assistant.benefits.map((benefit, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <Zap className="w-6 h-6 text-[#ffc107] flex-shrink-0 mt-1" />
                      <p className="text-lg">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Shield className="w-12 h-12 text-[#860000] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Kullanılan Teknolojiler</h3>

              <div className="flex flex-wrap justify-center gap-3">
                {assistant.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-white px-6 py-3 rounded-full shadow-md border-2 border-gray-200 text-gray-700 font-medium"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-gray-50 to-white border-2 border-[#860000] rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                {assistant.name} ile Hemen Başlayın
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                14 gün ücretsiz deneme ile tüm özellikleri keşfedin.
              </p>

              <Link
                href="/giris"
                className="inline-flex items-center bg-[#860000] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#6b0000] transition shadow-2xl"
              >
                Ücretsiz Deneyin
                <ArrowRight className="ml-3" />
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

export async function generateStaticParams() {
  return [
    { id: 'fokus001' },
    { id: 'fokus216' },
    { id: 'fokus314' },
    { id: 'fokus520' },
    { id: 'fokus618' },
    { id: 'fokus707' },
    { id: 'fokus717' },
    { id: 'fokus808' },
    { id: 'fokus999' },
  ];
}
