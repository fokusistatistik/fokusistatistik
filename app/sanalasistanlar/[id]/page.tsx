'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, X } from 'lucide-react';
import { notFound } from 'next/navigation';

interface AssistantPackage {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: {
    [key: string]: boolean | string;
  };
}

interface AssistantData {
  code: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  whyReasons: { title: string; description: string }[];
  capabilities: string[];
  videoUrl: string;
  testQrUrl: string;
  requestQrUrl: string;
  packages: AssistantPackage[];
  priceNote: string;
}

const assistantsData: Record<string, AssistantData> = {
  fokus001: {
    code: 'FOKUS001',
    name: 'FOKUS001',
    title: 'YÖNETİCİ SANAL ASİSTANI',
    subtitle: '🎩 Üst Düzey Yönetim İçin Yapay Zekâ Destekli Kişisel Asistan',
    description:
      '"Bir yöneticinin en büyük gücü; zaman, bilgi ve iletişim üzerindeki hakimiyetidir." FOKUS001, karar vericilerin dijital sağ koludur. Talimatlarınızı yorumlar, görevleri koordine eder ve her süreci kusursuz takip eder. Gerektiğinde diğer FOKUS asistanlarını devreye alarak, yönetiminizi tek merkezden yönetilebilir hale getirir.',
    icon: '👔',
    whyReasons: [
      {
        title: '🧠 Yapay Zekâ Destekli Karar Yardımı',
        description:
          'Yöneticinin komutlarını anlar, sınıflandırır ve sistem içinde doğru iş akışına dönüştürür.',
      },
      {
        title: '🧩 FOKUS Ekosisteminin Kaptanı',
        description:
          'Tüm FOKUS asistanlarıyla entegre çalışır; bilgi alışverişi ve işlem takibini sizin adınıza yürütür.',
      },
      {
        title: '📅 Ajanda ve Zaman Yönetimi',
        description:
          'Toplantı, teslimat, kontrol ve görüşmeler için öncelik sırasına göre planlar, takip eder.',
      },
      {
        title: '📂 Belge ve Süreç Yönetimi',
        description:
          'Sık kullanılan dokümanları şablonlarla oluşturur, iletir, arşivler ve gerektiğinde günceller.',
      },
      {
        title: '🚨 Anlık Bilgilendirme & Kriz Yönetimi',
        description:
          'Kritik gecikmeleri, beklenmedik durumları ve hata raporlarını anında yöneticiye iletir.',
      },
      {
        title: '🔒 Güvenlik ve Erişim Kontrolü',
        description:
          'Yalnızca yetkilendirilmiş kanallar üzerinden işlem yapar, hassas bilgiler koruma altındadır.',
      },
      {
        title: '💬 Kişisel İletişim Arayüzü',
        description:
          'Özel Arayüzümüz ile yöneticinin talimatları yazılı veya sesli olarak alınır, hemen sonuçlandırılır.',
      },
      {
        title: '🔑 Yönetici Düşünür Asistanı İşi Bitirir',
        description:
          'İş süreçlerinize dair tüm detayları çözebilme kabiliyeti kazanabilen yetenekli bir asistandır.',
      },
    ],
    capabilities: [
      'Yönetici mesajlarını yorumlayıp aksiyona çevirir.',
      'Görevleri uygun asistanlara aktarır ve sonucunu raporlar.',
      'Ajanda ve takvim yönetimini yapar; öncelik skoru uygular.',
      'Şablon dokümanları doldurur, gönderir ve klasörler.',
      'Anlık hatırlatmalar ve uyarılarla destek sağlar.',
      'İlgili kişilere not veya belge iletimi yapar.',
      'Talebe göre arşivden dosya çeker, özet çıkarır.',
      'E-posta ya da mesaj sistemleri ile senkronize çalışır.',
      'Günlük, haftalık, aylık raporlarla genel durumu bildirir.',
      'İşletmenizin tüm yazılım ve sistemlerine entegre olur.',
    ],
    videoUrl: 'https://www.youtube.com/embed/fckfRsZJtiM',
    testQrUrl: 'https://asistan.fokusistatistik.com/fokus001/',
    requestQrUrl: 'https://asistan.fokusistatistik.com/ucretsiz.html',
    packages: [
      {
        name: 'STANDART',
        monthlyPrice: '1.499 TL + KDV',
        yearlyPrice: '14.990 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-2 Gün',
          'Ücretsiz LLM Desteği': 'Standart',
          'Kullanıcı Yetki Limiti': '1',
          'Yönetici Genel Bilgilendirme Raporu': 'Aylık',
          'Bağlanabileceği FOKUS Asistan Limiti': '1',
          '7 Gün Ücretsiz Test': true,
          'Kurumsal Statik Doküman Taraması': true,
          'İşletmeye Özel Prompt-Sürekli Gelişim ve Öğrenme': true,
          'Veri Güvenliği ve Yetkilendirme': true,
          'Takvim Yönetimi - Uyum ve Çakışma Kontrolü': true,
          'Yönetici Özel Web Arayüzü': true,
          'Diğer FOKUS Asistanlarıyla iletişim': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Kurumsal Dinamik Doküman: Getirme - Gönderme': false,
          'Otomatik Hatırlatma ve Bilgilendirmeler': false,
          'Standart Belgeleri Otomatik Doldurma': false,
          'Dosya; Tasnifi, Özetlenmesi, Seslendirilmesi': false,
          'SMS – Whatsapp Duyuru Yapma': false,
          'Toplantı Notu Alma, Özetleme, Seslendirme': false,
          'Yönetici Statik Karar Destek Sistemi': false,
          'Öncelik Skorlamalı Takvim Yönetimi': false,
          'YZ Destekli Operasyonel Görev Yönetimi': false,
          'Çoklu Dil Desteği': false,
          'Kurum Yazılım ve Sistemleriyle Tam Entegrasyon': false,
          'Yönetici Özel Web Paneli': false,
          'Yönetici Özel Dinamik Karar Destek Sistemi': false,
          'Sistem Hata Algılama ve Otomatik Bildirme': false,
          'FOKUS 7/24 Canlı Destek': false,
          'Bilgisayarınızda işlem yapabilme': false,
          'Gerçek Zamanlı Konuşan Sanal Asistan': false,
          'Müşteri – Birim – Personel Bazlı Canlı Veri': false,
          'Premium Bakım & Güncelleme (Haftada 1)': false,
          'Premium Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PRO',
        monthlyPrice: '5.000 TL + KDV',
        yearlyPrice: '50.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-7 Gün',
          'Ücretsiz LLM Desteği': 'Pro',
          'Kullanıcı Yetki Limiti': '1',
          'Yönetici Genel Bilgilendirme Raporu': 'Haftalık',
          'Bağlanabileceği FOKUS Asistan Limiti': '6',
          '7 Gün Ücretsiz Test': false,
          'Kurumsal Statik Doküman Taraması': true,
          'İşletmeye Özel Prompt-Sürekli Gelişim ve Öğrenme': true,
          'Veri Güvenliği ve Yetkilendirme': true,
          'Takvim Yönetimi - Uyum ve Çakışma Kontrolü': true,
          'Yönetici Özel Web Arayüzü': true,
          'Diğer FOKUS Asistanlarıyla iletişim': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Kurumsal Dinamik Doküman: Getirme - Gönderme': true,
          'Otomatik Hatırlatma ve Bilgilendirmeler': true,
          'Standart Belgeleri Otomatik Doldurma': true,
          'Dosya; Tasnifi, Özetlenmesi, Seslendirilmesi': true,
          'SMS – Whatsapp Duyuru Yapma': true,
          'Toplantı Notu Alma, Özetleme, Seslendirme': true,
          'Yönetici Statik Karar Destek Sistemi': true,
          'Öncelik Skorlamalı Takvim Yönetimi': true,
          'YZ Destekli Operasyonel Görev Yönetimi': true,
          'Çoklu Dil Desteği': false,
          'Kurum Yazılım ve Sistemleriyle Tam Entegrasyon': false,
          'Yönetici Özel Web Paneli': false,
          'Yönetici Özel Dinamik Karar Destek Sistemi': false,
          'Sistem Hata Algılama ve Otomatik Bildirme': false,
          'FOKUS 7/24 Canlı Destek': false,
          'Bilgisayarınızda işlem yapabilme': false,
          'Gerçek Zamanlı Konuşan Sanal Asistan': false,
          'Müşteri – Birim – Personel Bazlı Canlı Veri': false,
          'Premium Bakım & Güncelleme (Haftada 1)': false,
          'Premium Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PREMIUM',
        monthlyPrice: '20.000 TL + KDV',
        yearlyPrice: '200.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-21 Gün',
          'Ücretsiz LLM Desteği': 'Premium',
          'Kullanıcı Yetki Limiti': '5',
          'Yönetici Genel Bilgilendirme Raporu': 'Canlı',
          'Bağlanabileceği FOKUS Asistan Limiti': '5+',
          '7 Gün Ücretsiz Test': false,
          'Kurumsal Statik Doküman Taraması': true,
          'İşletmeye Özel Prompt-Sürekli Gelişim ve Öğrenme': true,
          'Veri Güvenliği ve Yetkilendirme': true,
          'Takvim Yönetimi - Uyum ve Çakışma Kontrolü': true,
          'Yönetici Özel Web Arayüzü': true,
          'Diğer FOKUS Asistanlarıyla iletişim': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Kurumsal Dinamik Doküman: Getirme - Gönderme': true,
          'Otomatik Hatırlatma ve Bilgilendirmeler': true,
          'Standart Belgeleri Otomatik Doldurma': true,
          'Dosya; Tasnifi, Özetlenmesi, Seslendirilmesi': true,
          'SMS – Whatsapp Duyuru Yapma': true,
          'Toplantı Notu Alma, Özetleme, Seslendirme': true,
          'Yönetici Statik Karar Destek Sistemi': true,
          'Öncelik Skorlamalı Takvim Yönetimi': true,
          'YZ Destekli Operasyonel Görev Yönetimi': true,
          'Çoklu Dil Desteği': true,
          'Kurum Yazılım ve Sistemleriyle Tam Entegrasyon': true,
          'Yönetici Özel Web Paneli': true,
          'Yönetici Özel Dinamik Karar Destek Sistemi': true,
          'Sistem Hata Algılama ve Otomatik Bildirme': true,
          'FOKUS 7/24 Canlı Destek': true,
          'Bilgisayarınızda işlem yapabilme': true,
          'Gerçek Zamanlı Konuşan Sanal Asistan': true,
          'Müşteri – Birim – Personel Bazlı Canlı Veri': true,
          'Premium Bakım & Güncelleme (Haftada 1)': true,
          'Premium Özel Geliştirmeler': true,
        },
      },
    ],
    priceNote:
      '* Ücretler (01.06.2025 – 31.12.2025) tarihleri arasında yapılan sözleşmeler için geçerlidir. Yıllık planda 12 aylık sözleşmede 10 ay ücreti ödenir 2 aylık kullanım hediyedir. Yıllık planda ödemeler aylık yapılır ve fiyat güncellemelerinden etkilenmez. Kurulum ve Entegrasyon için bir aylık paket ücreti talep edilir. Test aşaması için Kurulum ve Entegrasyon ücreti gerekmez.',
  },
};

export default function AssistantDetail({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [assistant, setAssistant] = useState<AssistantData | null>(null);

  useEffect(() => {
    // Webhook'tan veri çekme denemesi
    const fetchAssistantData = async () => {
      try {
        const webhookUrl = 'https://n8n.fokusistatistik.com/fokuswebsiteasistanlar';
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            assistantCode: params.id.toUpperCase(),
            userEmail: session?.user?.email || null,
            userName: session?.user?.name || null,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setAssistant(data);
        } else {
          // Webhook başarısız ise statik veriyi kullan
          setAssistant(assistantsData[params.id] || null);
        }
      } catch (error) {
        // Hata durumunda statik veriyi kullan
        setAssistant(assistantsData[params.id] || null);
      }
    };

    fetchAssistantData();
  }, [params.id, session]);

  if (!assistant && !assistantsData[params.id]) {
    notFound();
  }

  const displayAssistant = assistant || assistantsData[params.id];

  if (!displayAssistant) {
    notFound();
  }

  const featureKeys = Object.keys(displayAssistant.packages[0].features);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section with Image */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="flex justify-center">
                  <div className="text-9xl">{displayAssistant.icon}</div>
                </div>

                {/* Content */}
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-[#860000]">
                    {displayAssistant.title}
                  </h1>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-700">
                    {displayAssistant.subtitle}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{displayAssistant.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-gray-800">
                🎯 Neden {displayAssistant.code}?
              </h2>

              <div className="space-y-4">
                {displayAssistant.whyReasons.map((reason, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-[#860000]"
                  >
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{reason.title}</h3>
                    <p className="text-gray-600">{reason.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-gray-800">
                🧠 {displayAssistant.code} Neler Yapar?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayAssistant.capabilities.map((capability, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{capability}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Video & QR Codes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* QR Codes */}
                <div className="flex flex-col gap-6 justify-center">
                  <a
                    href={displayAssistant.requestQrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition border-2 border-[#860000]"
                  >
                    <h3 className="font-bold text-xl mb-4 text-gray-800">📋 Talep Et</h3>
                    <div className="bg-gray-100 w-48 h-48 mx-auto rounded-lg flex items-center justify-center text-gray-400">
                      QR Kod
                    </div>
                  </a>

                  <a
                    href={displayAssistant.testQrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition border-2 border-[#860000]"
                  >
                    <h3 className="font-bold text-xl mb-4 text-gray-800">🧪 Test Et</h3>
                    <div className="bg-gray-100 w-48 h-48 mx-auto rounded-lg flex items-center justify-center text-gray-400">
                      QR Kod
                    </div>
                  </a>
                </div>

                {/* Video */}
                <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={displayAssistant.videoUrl}
                      title={`${displayAssistant.code} Video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-gray-800">
                {displayAssistant.code} {displayAssistant.title.toUpperCase()} - PAKETLERİ
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-xl rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#860000] text-white">
                      <th className="p-4 text-left font-bold">ÖZELLİK</th>
                      {displayAssistant.packages.map((pkg) => (
                        <th key={pkg.name} className="p-4 text-center font-bold">
                          {pkg.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {featureKeys.map((featureKey, index) => (
                      <tr
                        key={featureKey}
                        className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      >
                        <td className="p-4 border-b border-gray-200 font-medium text-gray-700">
                          {featureKey}
                        </td>
                        {displayAssistant.packages.map((pkg) => {
                          const value = pkg.features[featureKey];
                          return (
                            <td key={pkg.name} className="p-4 border-b border-gray-200 text-center">
                              {typeof value === 'boolean' ? (
                                value ? (
                                  <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" />
                                ) : (
                                  <X className="w-6 h-6 text-red-600 mx-auto" />
                                )
                              ) : (
                                <span className="text-gray-700">{value}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    {/* Monthly Price Row */}
                    <tr className="bg-[#ffc107]">
                      <td className="p-4 font-bold text-gray-800">Aylık Plan*</td>
                      {displayAssistant.packages.map((pkg) => (
                        <td key={pkg.name} className="p-4 text-center font-bold text-gray-800">
                          {pkg.monthlyPrice}
                        </td>
                      ))}
                    </tr>

                    {/* Yearly Price Row */}
                    <tr className="bg-[#ffc107]">
                      <td className="p-4 font-bold text-gray-800">Yıllık Plan*</td>
                      {displayAssistant.packages.map((pkg) => (
                        <td key={pkg.name} className="p-4 text-center font-bold text-gray-800">
                          {pkg.yearlyPrice}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                <p className="text-gray-700 leading-relaxed">{displayAssistant.priceNote}</p>
              </div>
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
