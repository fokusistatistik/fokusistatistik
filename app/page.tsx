'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  Shield,
  Zap,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Star,
  X,
  Gift,
  Clock,
  Target,
} from 'lucide-react';

export default function Home() {
  const [showToast, setShowToast] = useState(false);
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useEffect(() => {
    const toastSeen = sessionStorage.getItem('fokusToastSeen');

    if (!toastSeen) {
      const timer = setTimeout(() => {
        setShowToast(true);
        sessionStorage.setItem('fokusToastSeen', 'true');

        // Auto-hide after 15 seconds
        setTimeout(() => {
          setShowToast(false);
          setTimeout(() => setShowFloatingCta(true), 1000);
        }, 15000);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowFloatingCta(true);
    }
  }, []);

  const assistants = [
    {
      code: 'fokus001',
      name: 'FOKUS001',
      title: 'Yönetici Asistanı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus001.png',
    },
    {
      code: 'fokus216',
      name: 'FOKUS216',
      title: 'Müşteri Hizmetleri',
      image: 'https://www.fokusistatistik.com/assets/img/fokus216.png',
    },
    {
      code: 'fokus314',
      name: 'FOKUS314',
      title: 'Veri Analisti',
      image: 'https://www.fokusistatistik.com/assets/img/fokus314.png',
    },
    {
      code: 'fokus520',
      name: 'FOKUS520',
      title: 'Pazarlama & Lead',
      image: 'https://www.fokusistatistik.com/assets/img/fokus520.png',
    },
    {
      code: 'fokus618',
      name: 'FOKUS618',
      title: 'Finans & Fatura',
      image: 'https://www.fokusistatistik.com/assets/img/fokus618.png',
    },
    {
      code: 'fokus707',
      name: 'FOKUS707',
      title: 'İnsan Kaynakları',
      image: 'https://www.fokusistatistik.com/assets/img/fokus707.png',
    },
    {
      code: 'fokus717',
      name: 'FOKUS717',
      title: 'İçerik Tasarımı',
      image: 'https://www.fokusistatistik.com/assets/img/fokus717.png',
    },
    {
      code: 'fokus808',
      name: 'FOKUS808',
      title: 'Sosyal Medya & İletişim',
      image: 'https://www.fokusistatistik.com/assets/img/fokus808.png',
    },
    {
      code: 'fokus999',
      name: 'FOKUS999',
      title: 'Joker Asistan',
      image: 'https://www.fokusistatistik.com/assets/img/fokus999.png',
    },
  ];

  const impactItems = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Personel giderlerini azaltır',
      description: 'Sanal asistanlar SSK, yemek, yol gibi yükleri ortadan kaldırır.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Tekrarlayan işleri otomatikleştirir',
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
      title: 'Şirketinizin kârlılığını yükseltir',
      description: 'Daha az giderle daha çok üretkenlik sağlar.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-5 bg-gradient-to-r from-[#860000] to-[#a30000] text-white rounded-xl shadow-2xl p-5 max-w-sm z-50 animate-slideIn">
          <div className="flex items-center justify-between mb-3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Gift className="w-3 h-3" />
              ÖZEL FIRSAT
            </span>
            <button onClick={() => setShowToast(false)} className="hover:bg-white/20 rounded-full p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-3">
            <div className="w-16 h-16 bg-white rounded-full flex-shrink-0 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-3xl">💬</div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">Randevu Sistemi İlk 1 Ay Ücretsiz!</h3>
              <p className="text-sm opacity-90 mb-2">
                Yapay zeka destekli randevu sistemi. Müşterileriniz 7/24 otomatik randevu alabilsin.
              </p>
              <div className="flex gap-2 text-xs mb-3">
                <span className="flex items-center gap-1">✓ Hızlı Kurulum</span>
                <span className="flex items-center gap-1">✓ 7/24 Aktif</span>
              </div>
              <a
                href="https://asistan.fokusistatistik.com/fokusdemorandevusistemi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-[#860000] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition"
              >
                Hemen Başla →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating CTA */}
      {showFloatingCta && (
        <a
          href="https://asistan.fokusistatistik.com/ucretsiz.html"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed top-20 left-8 bg-gradient-to-r from-[#860000] to-[#a30000] text-white px-5 py-3 rounded-full shadow-2xl hover:shadow-3xl transition flex items-center gap-2 z-50 animate-slideIn font-semibold text-sm"
        >
          <Gift className="w-5 h-5 animate-bounce" />
          <span>1 Ay Ücretsiz Dene</span>
        </a>
      )}

      <main className="flex-grow">
        {/* Assistants Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-800">
              FOKUS Ekosistemi | <span className="text-[#860000]">Modüler Sanal Asistanlar Çağı</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {assistants.map((assistant) => (
                <Link
                  key={assistant.code}
                  href={`/sanalasistanlar/${assistant.code}`}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative w-24 h-24 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={assistant.image}
                      alt={assistant.title}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-[#860000] transition">
                    {assistant.title}
                  </span>
                  <span className="text-xs text-gray-500 italic mt-1">{assistant.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#860000] via-[#a03333] to-[#6b0000] text-white py-16 lg:py-24 my-8 mx-4 lg:mx-auto max-w-7xl rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-3xl lg:text-5xl font-bold mb-8 leading-tight">
                Yapay Zekâ Dalgasına Katılın — FOKUS ile Dijitalleşin, Daha Hızlı, Daha Kârlı Olun
              </h1>

              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition shadow-xl flex-1 max-w-md">
                  <Link
                    href="/analiz"
                    className="block bg-white text-[#860000] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition mb-3"
                  >
                    Ücretsiz İhtiyaç Analizi
                  </Link>
                  <p className="text-sm text-gray-200">
                    Hangi sanal asistana ihtiyacınız olduğunu anında analiz edelim.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition shadow-xl flex-1 max-w-md">
                  <a
                    href="https://asistan.fokusistatistik.com/ucretsiz.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white text-[#860000] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition mb-3"
                  >
                    Ücretsiz Danışmanlık
                  </a>
                  <p className="text-sm text-gray-200">
                    Formu doldurun, ücretsiz danışmanlık için randevu oluşturalım.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
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
                    <div className="text-[#860000] mb-4 group-hover:scale-110 transition">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h3>
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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src="https://www.youtube.com/embed/SQ3hBK6ZVDw"
                    title="FOKUS Ekosistemi Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
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
                  href="/giris"
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
