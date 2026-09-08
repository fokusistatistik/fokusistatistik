'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  ArrowRight,
  Star,
  Clock,
  Target,
} from 'lucide-react';
import { urunler } from '@/lib/urunlerimiz';

// Note: metadata is handled in layout.tsx for this page

export default function Home() {
  // CTA toast and floating button removed per user request

  const assistants = [
    {
      code: 'fokus001',
      name: 'FOKUS001',
      title: 'Yönetici Asistanı',
      image: '/assets/cdn/asistanlar/fokus001.png',
    },
    {
      code: 'fokus216',
      name: 'FOKUS216',
      title: 'Müşteri Hizmetleri',
      image: '/assets/cdn/asistanlar/fokus216.png',
    },
    {
      code: 'fokus314',
      name: 'FOKUS314',
      title: 'Veri Analisti',
      image: '/assets/cdn/asistanlar/fokus314.png',
    },
    {
      code: 'fokus520',
      name: 'FOKUS520',
      title: 'Pazarlama & Lead',
      image: '/assets/cdn/asistanlar/fokus520.png',
    },
    {
      code: 'fokus618',
      name: 'FOKUS618',
      title: 'Finans & Fatura',
      image: '/assets/cdn/asistanlar/fokus618.png',
    },
    {
      code: 'fokus707',
      name: 'FOKUS707',
      title: 'İnsan Kaynakları',
      image: '/assets/cdn/asistanlar/fokus707.png',
    },
    {
      code: 'fokus717',
      name: 'FOKUS717',
      title: 'İçerik Tasarımı',
      image: '/assets/cdn/asistanlar/fokus717.png',
    },
    {
      code: 'fokus808',
      name: 'FOKUS808',
      title: 'Sosyal Medya & İletişim',
      image: '/assets/cdn/asistanlar/fokus808.png',
    },
    {
      code: 'fokus999',
      name: 'FOKUS999',
      title: 'Joker Asistan',
      image: '/assets/cdn/asistanlar/fokus999.png',
    },
  ];

  const impactItems = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Maliyeti azaltır',
      description: 'Sanal asistanlar SSK, yemek, yol gibi yükleri ortadan kaldırır.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'İşleri otomatikleştirir',
      description: 'Randevu, form, raporlama, veri işleme gibi görevler otomasyona geçer.',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Gelirleri artırır',
      description: 'Kaçan fırsatları azaltır, hizmet ve satış süreçlerini hızlandırır.',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Zaman kazandırır',
      description: 'Saatler sürecek işlerin dakikalar içinde tamamlanmasını sağlar.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Kararları güçlendirir',
      description: 'Veriye dayalı analizler, paneller ve otomatik raporlar sunar.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Kârlılığı artırır',
      description: 'Daha az giderle daha çok üretkenlik sağlar.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Randevu Toast Notification removed per user request */}

      <main className="flex-grow">
        {/* Assistants Section */}
        <section className="pt-12 pb-8 bg-white mt-4">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-gray-800">
              FOKUS Ekosistemi | <span className="text-[#860000]">Modüler Sanal Asistanlar Çağı</span>
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-5 max-w-5xl mx-auto">
              {assistants.map((assistant) => (
                <Link
                  key={assistant.code}
                  href={`/sanalasistanlar/${assistant.code}`}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative w-[99px] h-[99px] mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={assistant.image}
                      alt={assistant.title}
                      fill
                      className="object-contain rounded-[50%]"
                    />
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-[#860000] transition text-[13px]">
                    {assistant.title}
                  </span>
                  <span className="text-xs text-gray-500 italic mt-1">{assistant.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Hero CTA Section - kullanıcı isteğiyle gizlendi (2026-09-08), sonradan aktif edilebilir
        <section className="relative bg-gradient-to-br from-[#860000] via-[#a03333] to-[#6b0000] text-white py-12 lg:py-14 my-6 mx-4 lg:mx-auto max-w-7xl rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-2xl lg:text-4xl font-bold mb-3 leading-relaxed">
                Yapay Zekâ Dalgasına Katılın
              </h2>
              <p className="text-lg lg:text-xl mb-10 text-gray-100 max-w-3xl mx-auto">
                FOKUS ile Dijitalleşin, Daha Hızlı, Daha Kârlı Olun
              </p>

              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 shadow-xl flex-1 max-w-md border border-white/20 w-full">
                  <a
                    href="/iletisim"
                    className="block bg-white text-[#860000] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 mb-3 shadow-lg"
                  >
                    Ücretsiz Danışmanlık
                  </a>
                  <p className="text-sm text-gray-100">
                    Formu doldurun, ücretsiz danışmanlık için randevu oluşturalım.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* Impact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-800">
                  FOKUS Ekosistemi ile <span className="text-[#860000]">Verimliliği Arttırın, Maliyeti Azaltın</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  FOKUS Modüler Sanal Asistanları; tekrarlayan işleri otomatikleştirir, insan kaynağını stratejik alanlara yönlendirir ve işletmenizin dijitalleşmesini hızlandırır. Geleneksel maliyet kalemleri (SSK, yemek, yol, izin vb.) olmadan 7/24 çalışır, zaman ve bütçe kazandırır.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {impactItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#860000] transition group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-[#860000] group-hover:scale-110 transition flex-shrink-0">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-[17px] text-gray-800">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  <strong>İnsan + Yapay Zekâ iş birliğiyle</strong>, hem çalışan memnuniyetini hem de operasyonel verimliliği artırıyoruz. Bugün iki asistanla başlarsınız, yarın ekibinizi genişletebilirsiniz. Çünkü FOKUS, sizinle birlikte büyüyen bir ekosistemdir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl lg:text-3xl font-semibold mb-3 text-gray-800">
                FOKUS Ekosistemi&apos;ni <span className="text-[#860000]">Keşfedin</span>
              </h2>
              <p className="text-base text-gray-600">İşletmenizi dijitale taşıyan sanal asistanları tanıyın</p>
            </div>
            <div className="w-[90%] lg:w-1/2 mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#860000]/10 hover:border-[#860000]/30 transition-all">
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src="https://www.youtube.com/embed/SQ3hBK6ZVDw?rel=0&modestbranding=1"
                    title="FOKUS Ekosistemi - Sanal Asistanlar Tanıtımı"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
              <div className="text-center mt-4">
                <Link
                  href="/sanalasistanlar"
                  className="inline-flex items-center gap-2 text-[#860000] hover:text-[#a30000] font-semibold transition text-sm"
                >
                  Tüm Asistanları İncele
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FOKUS Ürün Ailesi Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto mb-8 bg-[#2b2b2b] rounded-2xl px-6 py-4 flex items-center gap-4 shadow-md">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/assets/cdn/resimler/favicon.png"
                  alt="FOKUS logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-px self-stretch bg-white/25" aria-hidden="true" />
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-white leading-tight">
                  FOKUS İstatistik Ürün Ailesi
                </h2>
                <p className="text-xs lg:text-sm text-white/80">
                  Sanal asistanlarımızın yanı sıra, farklı sektörlere özel geliştirdiğimiz bağımsız SaaS ürünlerimiz
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {urunler.map((urun) => (
                <div
                  key={urun.slug}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#860000]/30 p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="relative h-9 w-32 flex-shrink-0">
                      <Image
                        src={urun.logo}
                        alt={`${urun.name} logo`}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <Link
                      href="/urunlerimiz"
                      className="inline-flex items-center gap-1 text-[#860000] hover:text-[#a30000] font-semibold text-sm transition flex-shrink-0 mt-1"
                    >
                      İncele
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <p className="text-sm text-gray-600">{urun.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-gray-50 to-white border-2 border-[#860000] rounded-3xl p-12 shadow-2xl">
              <Star className="w-16 h-16 text-[#ffc107] mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                Dijital Dönüşümü Başlatın
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                FOKUS Sanal Asistanlar ile iş süreçlerinizi otomatikleştirin,
                <br />
                maliyetleri düşürün, verimliliği artırın.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center bg-[#860000] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#6b0000] transition shadow-2xl group"
                >
                  Hemen Başlayın
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition" />
                </Link>
                <Link
                  href="/sanalasistanlar"
                  className="inline-flex items-center bg-white border-2 border-[#860000] text-[#860000] px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-50 transition"
                >
                  Asistanları Keşfedin
                </Link>
              </div>

              <p className="mt-6 text-gray-500 text-sm">
                ✓ 1 ay ücretsiz deneme • ✓ Kredi kartı gerekmez • ✓ İstediğiniz zaman iptal
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
