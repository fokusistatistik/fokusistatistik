'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import {
  ArrowRight,
  Bot,
  Clock,
  TrendingDown,
  Zap,
  Brain,
  Shield,
  Scale,
  Users,
  Target,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Rocket,
  Globe,
  Award,
  Briefcase,
  Database,
  LineChart,
  Settings,
} from 'lucide-react';

export default function SanalAsistanlar() {
  const assistants = [
    {
      code: 'fokus001',
      name: 'FOKUS001',
      title: 'Yönetici Asistanı',
      icon: '👔',
    },
    {
      code: 'fokus216',
      name: 'FOKUS216',
      title: 'Müşteri Hizmetleri',
      icon: '💬',
    },
    {
      code: 'fokus314',
      name: 'FOKUS314',
      title: 'Veri Analisti',
      icon: '📊',
    },
    {
      code: 'fokus520',
      name: 'FOKUS520',
      title: 'Pazarlama & Lead',
      icon: '🎯',
    },
    {
      code: 'fokus618',
      name: 'FOKUS618',
      title: 'Finans & Fatura',
      icon: '💰',
    },
    {
      code: 'fokus707',
      name: 'FOKUS707',
      title: 'İnsan Kaynakları',
      icon: '👥',
    },
    {
      code: 'fokus717',
      name: 'FOKUS717',
      title: 'İçerik Tasarımı',
      icon: '🎨',
    },
    {
      code: 'fokus808',
      name: 'FOKUS808',
      title: 'Sosyal Medya & İletişim',
      icon: '📱',
    },
    {
      code: 'fokus999',
      name: 'FOKUS999',
      title: 'Joker Asistan',
      icon: '🃏',
    },
  ];

  const advantages = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: '7/24 Aktif',
      description: 'Hafta sonu, tatil, gece gündüz fark etmeksizin durmadan çalışır.',
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: 'Düşük Maliyet',
      description: 'Klasik personel giderlerinin (SSK, yemek, yol, izin vb.) hiçbiri yoktur.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Hızlı İşlem',
      description: 'Saatlerce sürecek işleri dakikalar, hatta saniyeler içinde tamamlar.',
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Sürekli Öğrenir',
      description: 'Verdiğiniz her görevde daha iyiye gider, yeni bilgi ekledikçe gelişir.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Hata Oranı Düşük',
      description: 'İnsan kaynaklı unutkanlık veya yanlışlıklar minimum seviyede kalır.',
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: 'Ölçeklenebilir',
      description: 'İş yükünüz arttıkça fazladan bir ekip üyesi gibi hızlı büyür.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Ekibe Zaman Kazandırır',
      description: 'Gerçek çalışanlarınız stratejik alanlara odaklanabilir, rutin işleri asistan yapar.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Çok Kanallı Erişim',
      description: 'WhatsApp, web sitesi, e-posta, sosyal medya gibi farklı kanallardan aynı anda hizmet verir.',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Veri ve Analiz Sunumu',
      description: 'Topladığı her bilgiyi anlık raporlara ve dashboard\'lara dönüştürür.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Modüler Yapı',
      description: 'İhtiyacınıza göre sadece gerekli modülleri aktifleştirerek bütçenizi optimize edersiniz.',
    },
  ];

  const competitiveAdvantages = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Hızlı Müşteri Yanıtı',
      description: 'Müşterileriniz 7/24 anında yanıt alır, memnuniyet artar.',
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: 'Operasyonel Maliyet Düşüşü',
      description: 'SSK, yemek, yol gibi ek giderleri ortadan kaldırır.',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Daha Akıllı Kararlar',
      description: 'Veriye dayalı dashboard\'lar sayesinde doğru stratejiler belirlersiniz.',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Çok Dilli Destek',
      description: 'Farklı ülkelere hizmet verirken dil engeli kalmaz.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Marka İmajı Güçlenir',
      description: 'Teknoloji odaklı, modern ve yenilikçi bir şirket görünümü kazanırsınız.',
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: 'Hatasız Süreçler',
      description: 'Otomasyonla birlikte insan kaynaklı hatalar minimize edilir.',
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Ekip Verimliliği Artar',
      description: 'Gerçek çalışanlarınız yaratıcı ve stratejik işlere odaklanır.',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Merkezi Veri Yönetimi',
      description: 'Tüm bilgiler tek platformda toplanır, analizler kolay yapılır.',
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: 'Sürekli İyileştirme',
      description: 'Yapay zeka öğrendikçe, süreçleriniz sürekli gelişir.',
    },
  ];

  const setupSteps = [
    {
      number: 1,
      title: 'İhtiyaç Analizi',
      description: 'Önce hangi sanal asistana (veya asistanlara) ihtiyacınız olduğunu belirleriz. Size özel bir analiz formu doldurup, kısa bir görüşme yapabiliriz.',
    },
    {
      number: 2,
      title: 'Paket Seçimi',
      description: 'Standart, Pro veya Premium paketlerinden birine karar verin. Modüler yapı sayesinde istediğiniz zaman yeni asistan ekleyebilir ya da çıkarabilirsiniz.',
    },
    {
      number: 3,
      title: 'Entegrasyon ve Kurulum',
      description: 'FOKUS ekibi olarak, seçtiğiniz asistanları mevcut sistemlerinize (CRM, ERP, web sitesi, WhatsApp vb.) entegre ederiz. Kurulum sürecinde sizi adım adım bilgilendiririz.',
    },
    {
      number: 4,
      title: 'Eğitim ve Test',
      description: 'Asistanlar, şirketinize özel bilgi ve süreçlerle eğitilir. Test aşamasında gerçek senaryolar deneriz ve gerekli ince ayarları yaparız.',
    },
    {
      number: 5,
      title: 'Yayına Alın ve Büyütün',
      description: 'Hemen kullanmaya başlayın. Dashboard üzerinden performansı takip edin, gerekirse yeni modüller ekleyerek ekosistemi büyütün.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#860000] via-[#a50000] to-[#6b0000] text-white py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl lg:text-5xl font-bold mb-6">
                Metal Yakalı İşçiler ile Tanışın
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                FOKUS Modüler Sanal Asistanları, işletmenizin farklı departmanlarında 7/24 çalışan, sürekli öğrenen ve klasik personel maliyetlerini ortadan kaldıran yapay zeka destekli yazılım çalışanlarıdır.
              </p>
            </div>
          </div>
        </section>

        {/* Metal Collar Workers Explanation */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-[#860000] rounded-2xl p-8 lg:p-12 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Bot className="w-10 h-10 text-[#860000]" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                    Metal Yakalı İşçiler Nedir?
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                  <p>
                    <strong>"Beyaz yakalı"</strong> ofis çalışanlarını, <strong>"mavi yakalı"</strong> saha/üretim personelini tanımlıyordu. Artık bir üçüncü kategori var: <strong className="text-[#860000]">"Metal Yakalı İşçiler"</strong> — yani yazılım temelli, yapay zeka destekli sanal asistanlar.
                  </p>
                  <p>
                    Bu asistanlar maaş, SGK primi, yemek, yol, izin gibi klasik giderleri olmayan, ancak gerçek insanlar gibi görevleri yerine getiren dijital ekip üyeleridir. FOKUS Ekosistemi'nde her bir sanal asistan, belirli bir iş sürecine özel olarak eğitilmiştir ve işletmenizin verimliliğini katbekat artırır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                  Metal Yakalı İşçilerin <span className="text-[#860000]">10 Temel Avantajı</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Klasik personel yönetiminden farklı olarak, sanal asistanlar şirketinize çok daha fazla esneklik ve maliyet avantajı sunar.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 hover:shadow-lg hover:border-[#860000] border border-gray-200 transition group"
                  >
                    <div className="text-[#860000] mb-4 group-hover:scale-110 transition">
                      {advantage.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{advantage.title}</h3>
                    <p className="text-gray-600 text-sm">{advantage.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Human + AI Collaboration */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-[#860000] to-[#6b0000] text-white rounded-2xl p-8 lg:p-12 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-10 h-10 text-[#ffc107]" />
                  <h2 className="text-2xl lg:text-3xl font-bold">
                    İnsan + Sanal Asistan İşbirliği
                  </h2>
                </div>
                <div className="space-y-4 text-gray-100 leading-relaxed">
                  <p className="text-lg">
                    FOKUS, insanların yerini almaz; tam tersine <strong>onları güçlendirir</strong>. Tekrarlayan, zaman alan işleri sanal asistanlara devredip, ekibinizin yaratıcı, stratejik ve değer yaratan alanlara odaklanmasını sağlarsınız.
                  </p>
                  <p className="text-lg">
                    Sonuç olarak hem <strong>çalışan memnuniyeti</strong> artar (monoton işlerden kurtulurlar), hem de <strong>iş verimi</strong> katlanır. İşletme sahipleri için ise bu; daha az maliyetle, daha fazla üretkenlik demektir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Assistants List */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                  FOKUS Ekosistemi | <span className="text-[#860000]">9 Modüler Sanal Asistan</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Her bir asistan, belirli bir iş sürecine özel olarak tasarlanmış ve eğitilmiştir.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {assistants.map((assistant) => (
                  <Link
                    key={assistant.code}
                    href={`/sanalasistanlar/${assistant.code}`}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="text-6xl mb-3 group-hover:scale-125 transition-transform duration-300">
                      {assistant.icon}
                    </div>
                    <span className="font-semibold text-gray-700 group-hover:text-[#860000] transition">
                      {assistant.title}
                    </span>
                    <span className="text-xs text-gray-500 italic mt-1">{assistant.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Advantages */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                  Dijital Asistanlarla <span className="text-[#860000]">Rekabet Avantajı</span> Sağlayın
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  FOKUS Sanal Asistanlar, şirketinize sadece maliyet avantajı değil, aynı zamanda pazar içinde fark yaratacak stratejik üstünlükler de kazandırır.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {competitiveAdvantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="flex gap-4 bg-gray-50 rounded-xl p-5 hover:bg-white hover:shadow-lg border border-gray-200 transition"
                  >
                    <div className="text-[#860000] flex-shrink-0">
                      {advantage.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{advantage.title}</h3>
                      <p className="text-sm text-gray-600">{advantage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Packages Info */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-200">
                <div className="text-center mb-8">
                  <Settings className="w-12 h-12 text-[#860000] mx-auto mb-4" />
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                    Modüler Paket Yapısı
                  </h2>
                  <p className="text-lg text-gray-600">
                    FOKUS, "hepsini al ya da hiç" mantığıyla çalışmaz. İhtiyacınız olanı seçin, bütçenize göre ölçeklendirin.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-300 rounded-xl p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Standart Paket</h3>
                    <p className="text-sm text-gray-600">
                      1-2 sanal asistan ile başlayın, küçük ölçekli işletmeler için idealdir.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-[#860000] to-[#6b0000] text-white border-2 border-[#860000] rounded-xl p-6 text-center transform scale-105">
                    <div className="bg-[#ffc107] text-[#860000] text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                      ÖNERİLEN
                    </div>
                    <h3 className="text-xl font-bold mb-2">Pro Paket</h3>
                    <p className="text-sm">
                      3-5 asistan, orta ölçekli şirketler için en popüler seçenek.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-300 rounded-xl p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Paket</h3>
                    <p className="text-sm text-gray-600">
                      Tüm 9 asistan + özel entegrasyonlar, kurumsal çözümler.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-700 text-center leading-relaxed">
                    <strong>Not:</strong> Her pakette, dilediğiniz zaman asistan ekleyebilir veya çıkarabilirsiniz.
                    Böylece bütçeniz her zaman kontrolünüzdedir ve sadece kullandığınız kadar ödersiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Steps */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                  Nasıl Kurulur? <span className="text-[#860000]">5 Basit Adım</span>
                </h2>
                <p className="text-lg text-gray-600">
                  FOKUS Sanal Asistanları kullanmaya başlamak için teknik bilgiye ihtiyacınız yok. Tüm süreci sizin için yönetiyoruz.
                </p>
              </div>

              <div className="space-y-6">
                {setupSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-6 bg-gradient-to-r from-gray-50 to-white border-l-4 border-[#860000] rounded-xl p-6 shadow-md hover:shadow-lg transition"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#860000] text-white rounded-full flex items-center justify-center font-bold text-xl">
                        {step.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#860000] to-[#6b0000] text-white rounded-3xl p-12 shadow-2xl">
              <Sparkles className="w-16 h-16 text-[#ffc107] mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Dijital Dönüşümünüze Hemen Başlayın
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Metal Yakalı İşçiler ile maliyetleri düşürün, verimliliği artırın.
                <br />
                İhtiyaç analizinizi yaparak size en uygun paketi belirleyelim.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/analiz"
                  className="inline-flex items-center bg-white text-[#860000] px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition shadow-2xl group"
                >
                  Ücretsiz Analiz Yap
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition" />
                </Link>
                <a
                  href="https://asistan.fokusistatistik.com/ucretsiz.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#ffc107] text-[#860000] px-10 py-5 rounded-full font-bold text-xl hover:bg-yellow-300 transition shadow-2xl"
                >
                  Demo Talep Et
                </a>
              </div>

              <p className="mt-6 text-gray-300 text-sm">
                ✓ Ücretsiz danışmanlık • ✓ Hızlı kurulum • ✓ 7/24 destek
              </p>
            </div>
          </div>
        </section>
      </main>

      
    </div>
  );
}
