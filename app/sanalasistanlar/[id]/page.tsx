'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';

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
          '1 Ay Ücretsiz Test': true,
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
          '1 Ay Ücretsiz Test': false,
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
          '1 Ay Ücretsiz Test': false,
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
  fokus216: {
    code: 'FOKUS216',
    name: 'FOKUS216',
    title: 'MÜŞTERİ HİZMETLERİ SANAL ASİSTANI',
    subtitle: '🤖 7/24 Çalışan, Müşteri Deneyimini Güçlendiren Yapay Zekâ Asistanı',
    description:
      '"Müşteriniz uyanıksa, asistanınız da çalışsın." FOKUS216, müşteri iletişimini asla kesintiye uğratmayan akıllı bir müşteri hizmetleri asistanıdır. İster gece yarısı bir soru, ister hafta sonu bir talep olsun; FOKUS216 yanıt verir, yönlendirir ve çözüm üretir. Gerçek insan desteğinin yanı sıra, sürekli hazır bir asistan olarak işletmenizin müşteri memnuniyetini üst seviyeye taşır.',
    icon: '💬',
    whyReasons: [
      {
        title: '⏰ 7/24 Aktif İletişim',
        description:
          'Mesai saati, tatil ya da gece fark etmez. Müşterileriniz her an yanıt alır, bilgi edinir.',
      },
      {
        title: '📲 Çoklu Kanal Entegrasyonu',
        description:
          'WhatsApp, web chat, e-posta, sosyal medya ve telefon üzerinden tek sistem üzerinden yönetilir.',
      },
      {
        title: '🧠 Yapay Zekâ Destekli Yanıt',
        description:
          'Sık sorulan sorulara anında yanıt verir. Karmaşık konular için uygun birime yönlendirir.',
      },
      {
        title: '📊 Müşteri Veri Yönetimi',
        description:
          'Her müşteri ile yapılan görüşme kaydedilir, analiz edilir ve gelecek hizmetlere rehber olur.',
      },
      {
        title: '🚀 Hızlı Kurulum & Ölçeklenebilirlik',
        description:
          'Sisteme entegrasyon sadece birkaç gün. Büyüdükçe yeni kanallar ve özellikler eklenebilir.',
      },
      {
        title: '🎯 Odaklanmış Müşteri Deneyimi',
        description:
          'İnsan kaynaklarını rutin işlerden kurtarır, kritik durumlara odaklanmalarını sağlar.',
      },
    ],
    capabilities: [
      'Sık sorulan soruları anında yanıtlar.',
      'Müşteri taleplerini kategorize eder ve ilgili birime iletir.',
      'Randevu, sipariş, ödeme sorgularını yönetir.',
      'WhatsApp, web, e-posta üzerinden çok kanallı destek sağlar.',
      'Müşteri geçmişini takip eder ve kişiselleştirilmiş yanıt verir.',
      'CRM sistemleriyle entegre çalışır ve verileri güncel tutar.',
      'Öncelikli durumları insan desteğine yönlendirir.',
      'Geri bildirim ve şikayetleri toplar, raporlar.',
      'İstatistiksel raporlar sunarak hizmet kalitesini izler.',
    ],
    videoUrl: 'https://www.youtube.com/embed/VwVeSnsK0lA',
    testQrUrl: 'https://asistan.fokusistatistik.com/fokus216/',
    requestQrUrl: 'https://asistan.fokusistatistik.com/ucretsiz.html',
    packages: [
      {
        name: 'STANDART',
        monthlyPrice: '999 TL + KDV',
        yearlyPrice: '9.990 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-2 Gün',
          'Ücretsiz LLM Desteği': 'Standart',
          'Aylık Yanıt Limiti': '1.000',
          'Çoklu Kanal Desteği': '2 Kanal',
          'Müşteri Geçmişi Kayıt Süresi': '30 Gün',
          '1 Ay Ücretsiz Test': true,
          'Temel SSS Veritabanı': true,
          'Web Chat Entegrasyonu': true,
          'WhatsApp Business Entegrasyonu': false,
          'E-posta Otomatik Yanıt': false,
          'Sosyal Medya Entegrasyonu': false,
          'CRM Entegrasyonu': false,
          'Müşteri Talep Takip Sistemi': false,
          'Sesli Çağrı Merkezi Entegrasyonu': false,
          'Çok Dilli Destek': false,
          'Öncelikli Durum Yönlendirme': false,
          'Kişiselleştirilmiş Yanıt Sistemi': false,
          'Müşteri Memnuniyet Anketleri': false,
          'Gerçek Zamanlı İstatistikler': false,
          'Haftalık Performans Raporları': false,
          'Özel Şablon ve İçerik Yönetimi': false,
          'FOKUS 7/24 Canlı Destek': false,
          'Premium Bakım & Güncelleme': false,
          'Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PRO',
        monthlyPrice: '2.500 TL + KDV',
        yearlyPrice: '25.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-5 Gün',
          'Ücretsiz LLM Desteği': 'Pro',
          'Aylık Yanıt Limiti': '5.000',
          'Çoklu Kanal Desteği': '5 Kanal',
          'Müşteri Geçmişi Kayıt Süresi': '6 Ay',
          '1 Ay Ücretsiz Test': false,
          'Temel SSS Veritabanı': true,
          'Web Chat Entegrasyonu': true,
          'WhatsApp Business Entegrasyonu': true,
          'E-posta Otomatik Yanıt': true,
          'Sosyal Medya Entegrasyonu': true,
          'CRM Entegrasyonu': true,
          'Müşteri Talep Takip Sistemi': true,
          'Sesli Çağrı Merkezi Entegrasyonu': false,
          'Çok Dilli Destek': false,
          'Öncelikli Durum Yönlendirme': true,
          'Kişiselleştirilmiş Yanıt Sistemi': true,
          'Müşteri Memnuniyet Anketleri': true,
          'Gerçek Zamanlı İstatistikler': true,
          'Haftalık Performans Raporları': true,
          'Özel Şablon ve İçerik Yönetimi': false,
          'FOKUS 7/24 Canlı Destek': false,
          'Premium Bakım & Güncelleme': false,
          'Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PREMIUM',
        monthlyPrice: '15.000 TL + KDV',
        yearlyPrice: '150.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-14 Gün',
          'Ücretsiz LLM Desteği': 'Premium',
          'Aylık Yanıt Limiti': 'Sınırsız',
          'Çoklu Kanal Desteği': 'Tüm Kanallar',
          'Müşteri Geçmişi Kayıt Süresi': 'Sınırsız',
          '1 Ay Ücretsiz Test': false,
          'Temel SSS Veritabanı': true,
          'Web Chat Entegrasyonu': true,
          'WhatsApp Business Entegrasyonu': true,
          'E-posta Otomatik Yanıt': true,
          'Sosyal Medya Entegrasyonu': true,
          'CRM Entegrasyonu': true,
          'Müşteri Talep Takip Sistemi': true,
          'Sesli Çağrı Merkezi Entegrasyonu': true,
          'Çok Dilli Destek': true,
          'Öncelikli Durum Yönlendirme': true,
          'Kişiselleştirilmiş Yanıt Sistemi': true,
          'Müşteri Memnuniyet Anketleri': true,
          'Gerçek Zamanlı İstatistikler': true,
          'Haftalık Performans Raporları': true,
          'Özel Şablon ve İçerik Yönetimi': true,
          'FOKUS 7/24 Canlı Destek': true,
          'Premium Bakım & Güncelleme': true,
          'Özel Geliştirmeler': true,
        },
      },
    ],
    priceNote:
      '* Ücretler (01.06.2025 – 31.12.2025) tarihleri arasında yapılan sözleşmeler için geçerlidir. Yıllık planda 12 aylık sözleşmede 10 ay ücreti ödenir 2 aylık kullanım hediyedir. Yıllık planda ödemeler aylık yapılır ve fiyat güncellemelerinden etkilenmez. Kurulum ve Entegrasyon için bir aylık paket ücreti talep edilir. Test aşaması için Kurulum ve Entegrasyon ücreti gerekmez.',
  },
  fokus314: {
    code: 'FOKUS314',
    name: 'FOKUS314',
    title: 'VERİ ANALİSTİ SANAL ASİSTANI',
    subtitle: '📊 Veriden Stratejiye, Zamandan Kazanca...',
    description:
      '"Veri çoktu, ama bilgiye dönüşmüyordu." FOKUS314 ile artık tüm verileriniz anlam kazanır. İster küçük bir işletme olun ister dev bir organizasyon, FOKUS314 size sadece analiz değil, strateji sunar.',
    icon: '📊',
    whyReasons: [
      {
        title: '📁 Kurumsal Kaynaklara Erişim',
        description:
          'Arşivlenmiş dosyalar, tablolar, Google Sheets ve sistem belgelerine hızlı ve güvenli erişim sağlar.',
      },
      {
        title: '🧠 Yapay Zekâ Destekli Analiz',
        description:
          'Öğrenen yapısıyla her veri setini analiz eder, iş süreçlerine özel yaklaşım geliştirir.',
      },
      {
        title: '📅 Zamanlanmış Raporlama',
        description:
          'Günlük, haftalık ya da aylık raporları otomatik olarak oluşturur ve sunar.',
      },
      {
        title: '📈 Veri Görselleştirme ve Karar Desteği',
        description:
          'Grafikler, tablolar ve metin özetleriyle veriyi anlamlı hale getirir, karar süreçlerini destekler.',
      },
      {
        title: '🔐 Güvenli Erişim',
        description:
          'Kimlik doğrulama ve yetkilendirme sistemiyle veri gizliliğini garanti altına alır.',
      },
      {
        title: '📊 Trend ve Performans İzleme',
        description:
          'Zaman içindeki değişimleri, eğilimleri ve fırsatları analiz eder.',
      },
      {
        title: '💬 Sade ya da Teknik Raporlar',
        description:
          'Kullanıcının ihtiyacına göre sade dilde ya da teknik detaylı raporlar sunar.',
      },
      {
        title: '🧪 Problem Çözme Yetisi',
        description:
          'Basit hesaplamalardan ileri düzey istatistiksel modellemelere kadar geniş çözüm yelpazesi sunar.',
      },
    ],
    capabilities: [
      'Gelen veri taleplerini içerik türüne göre sınıflandırır ve uygun çıktılar üretir: rapor, analiz, tablo, grafik, özet.',
      'Günlük, haftalık veya aylık periyotlarla otomatik rapor oluşturur ve paylaşır.',
      'Karmaşık verileri sadeleştirir, görselleştirir ve yöneticilere özel grafik & yorumlu çıktı sunar.',
      'Trend, dağılım, frekans gibi temel istatistiksel analizleri yapar, anlamlı sonuçlar üretir.',
      'Basit hesaplamalardan ileri düzey istatistiksel modelleme süreçlerine kadar çözüm üretir.',
      'Yeni gelen verileri geçmiş sonuçlarla ilişkilendirerek karar destek sistemine katkı sağlar.',
      'Kimlik doğrulama ile veri güvenliğini korur, yalnızca yetkili kişilere erişim sağlar.',
      'İhtiyaç duyduğunuzda Veri Bilimi Danışmanlığı sunar; doğru soruya, doğru analizle cevap verir.',
    ],
    videoUrl: 'https://www.youtube.com/embed/oePHh9TU4qg',
    testQrUrl: 'https://asistan.fokusistatistik.com/fokus314/',
    requestQrUrl: 'https://asistan.fokusistatistik.com/ucretsiz.html',
    packages: [
      {
        name: 'STANDART',
        monthlyPrice: '999 TL + KDV',
        yearlyPrice: '9.990 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-2 Gün',
          'Veri Seti Güncelleme ve Raporlama Periyodu': 'Aylık',
          'Hesaplayıcı Özellikleri – Problem Çözme Yetisi': 'Basit',
          'Performans Raporlama Periyodu': 'Aylık',
          'Yetki Sayısı Üst Limiti': '1',
          'Rapor Detayı': 'Genel',
          '1 Ay Ücretsiz Test': true,
          'Kurumsal Statik Doküman Taraması': true,
          'İşletmeye Özel Prompt': true,
          'Sürekli Gelişim ve Öğrenme': true,
          'Otomatik Zamanlı Raporlama': true,
          'Server Kullanımı – Veri Güvenliği ve Yetkilendirme': true,
          'Standart Arşivleme, Raporlama ve Görselleştirme': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Statik ve Standart Karar Destek Sistemi Ekranı': false,
          'Kurumsal Dinamik Doküman Taraması': false,
          'Çapraz Veri Doğrulama Yöntemleri': false,
          'Kümülatif ve Trend Analizleri': false,
          'Kategorizasyon ve Detaylı Sorgulama': false,
          'İstatistiksel Arşivleme Raporlama ve Görselleştirme': false,
          'Diğer Asistanlarla iletişim': false,
          'Dinamik ve Özel Karar Destek Sistemi Ekranı': false,
          'Birim Bazlı – Kişi Bazlı Sorgulama': false,
          'Anket Oluşturma, Uygulama ve Analiz Etme': false,
          'Performans Analizleri': false,
          'Veri Bilimi Danışmanlığı Desteği': false,
          'Barkodlu ve Gerçek Zamanlı Form Otomasyonları': false,
          'Detaylı Veri Güvenilirliği Kontrolleri': false,
          'Python Destekli özelleştirilmiş İstatistik Analizler': false,
          'Kritik Düzey-Eşik Uyarı Sistemleri': false,
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
          'Veri Seti Güncelleme ve Raporlama Periyodu': 'Haftalık',
          'Hesaplayıcı Özellikleri – Problem Çözme Yetisi': 'Orta',
          'Performans Raporlama Periyodu': 'Haftalık',
          'Yetki Sayısı Üst Limiti': '3',
          'Rapor Detayı': 'Detaylı',
          '1 Ay Ücretsiz Test': false,
          'Kurumsal Statik Doküman Taraması': true,
          'İşletmeye Özel Prompt': true,
          'Sürekli Gelişim ve Öğrenme': true,
          'Otomatik Zamanlı Raporlama': true,
          'Server Kullanımı – Veri Güvenliği ve Yetkilendirme': true,
          'Standart Arşivleme, Raporlama ve Görselleştirme': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Statik ve Standart Karar Destek Sistemi Ekranı': true,
          'Kurumsal Dinamik Doküman Taraması': true,
          'Çapraz Veri Doğrulama Yöntemleri': true,
          'Kümülatif ve Trend Analizleri': true,
          'Kategorizasyon ve Detaylı Sorgulama': true,
          'İstatistiksel Arşivleme Raporlama ve Görselleştirme': true,
          'Diğer Asistanlarla iletişim': true,
          'Dinamik ve Özel Karar Destek Sistemi Ekranı': false,
          'Birim Bazlı – Kişi Bazlı Sorgulama': false,
          'Anket Oluşturma, Uygulama ve Analiz Etme': false,
          'Performans Analizleri': false,
          'Veri Bilimi Danışmanlığı Desteği': false,
          'Barkodlu ve Gerçek Zamanlı Form Otomasyonları': false,
          'Detaylı Veri Güvenilirliği Kontrolleri': false,
          'Python Destekli özelleştirilmiş İstatistik Analizler': false,
          'Kritik Düzey-Eşik Uyarı Sistemleri': false,
          'Premium Bakım & Güncelleme (Haftada 1)': false,
          'Premium Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PREMIUM',
        monthlyPrice: '25.000 TL + KDV',
        yearlyPrice: '250.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-30 Gün',
          'Veri Seti Güncelleme ve Raporlama Periyodu': 'Canlı',
          'Hesaplayıcı Özellikleri – Problem Çözme Yetisi': 'Detaylı',
          'Performans Raporlama Periyodu': 'Günlük',
          'Yetki Sayısı Üst Limiti': '15',
          'Rapor Detayı': 'Özelleştirilmiş',
          '1 Ay Ücretsiz Test': false,
          'Kurumsal Statik Doküman Taraması': true,
          'İşletmeye Özel Prompt': true,
          'Sürekli Gelişim ve Öğrenme': true,
          'Otomatik Zamanlı Raporlama': true,
          'Server Kullanımı – Veri Güvenliği ve Yetkilendirme': true,
          'Standart Arşivleme, Raporlama ve Görselleştirme': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Statik ve Standart Karar Destek Sistemi Ekranı': true,
          'Kurumsal Dinamik Doküman Taraması': true,
          'Çapraz Veri Doğrulama Yöntemleri': true,
          'Kümülatif ve Trend Analizleri': true,
          'Kategorizasyon ve Detaylı Sorgulama': true,
          'İstatistiksel Arşivleme Raporlama ve Görselleştirme': true,
          'Diğer Asistanlarla iletişim': true,
          'Dinamik ve Özel Karar Destek Sistemi Ekranı': true,
          'Birim Bazlı – Kişi Bazlı Sorgulama': true,
          'Anket Oluşturma, Uygulama ve Analiz Etme': true,
          'Performans Analizleri': true,
          'Veri Bilimi Danışmanlığı Desteği': true,
          'Barkodlu ve Gerçek Zamanlı Form Otomasyonları': true,
          'Detaylı Veri Güvenilirliği Kontrolleri': true,
          'Python Destekli özelleştirilmiş İstatistik Analizler': true,
          'Kritik Düzey-Eşik Uyarı Sistemleri': true,
          'Premium Bakım & Güncelleme (Haftada 1)': true,
          'Premium Özel Geliştirmeler': true,
        },
      },
    ],
    priceNote:
      '* Ücretler (01.06.2025 – 31.12.2025) tarihleri arasında yapılan sözleşmeler için geçerlidir. Yıllık planda 12 aylık sözleşmede 10 ay ücreti ödenir, 2 aylık kullanım hediyedir. Yıllık planda ödemeler aylık yapılır. Kurulum ve Entegrasyon için bir aylık paket ücreti talep edilir. Test aşaması için Kurulum ve Entegrasyon ücreti gerekmez.',
  },
  fokus520: {
    code: 'FOKUS520',
    name: 'FOKUS520',
    title: 'PAZARLAMA & LEAD SANAL ASİSTANI',
    subtitle: '📈 "Doğru kitleye, doğru zamanda, doğru mesajla ulaşın."',
    description:
      'Hedef kitleniz zaten orada. Peki, onlara doğru anda, doğru mesajla ulaşan bir asistanınız var mı? Artık var: FOKUS520, 7/24 potansiyel müşterileri analiz eder, takip eder, sınıflandırır ve satışa dönüştürür; ayrıca mevcut müşterileri elde tutmak ve yenilerini kazanmak için özel stratejiler geliştirir.',
    icon: '🎯',
    whyReasons: [
      {
        title: '🎯 Hedef Kitle Belirleme',
        description:
          'Lokasyon, sosyal medya, arama geçmişi ve müşteri profilleri üzerinden otomatik segmentasyon.',
      },
      {
        title: '💾 CRM Kaydı',
        description:
          'Potansiyel, aktif ve pasif müşteriler düzenli şekilde işlenir ve güncellenir.',
      },
      {
        title: '🧠 Öğrenen Yapay Zekâ',
        description:
          'Müşteri tepkilerine göre kampanya dili sürekli optimize edilir.',
      },
      {
        title: '🔥 İlgi Düzeyi Sınıflandırması',
        description:
          'Her bir müşteri için özel duygu, niyet, ilgi analizi yapılır.',
      },
      {
        title: '🔁 Takip & Hatırlatma',
        description:
          '1., 2. ve 3. temaslar zamanlanır, fırsat kaçmaz.',
      },
      {
        title: '📊 Kampanya Raporlama',
        description:
          'Performans izlenir derin analiz sağlanır.',
      },
      {
        title: '🚨 Yönetici Bildirimleri',
        description:
          'Kritik etkileşimler için uyarı ve yönlendirme yapılır.',
      },
    ],
    capabilities: [
      '7/24 potansiyel müşteri taraması yapar.',
      'Yeni gelen mesajları kampanya ilgisine göre sınıflandırır.',
      'İlgi seviyesi düşük müşteriyle bile otomatik etkileşim kurar.',
      'CRM kaydı olmayanları kaydeder, eski müşterileri günceller.',
      'Kampanya verimini raporlar.',
      'İlgi düzeyine göre tetiklenen kampanyalar başlatır.',
      'Satış fırsatlarını kaçırmaz.',
    ],
    videoUrl: 'https://www.youtube.com/embed/Wzwc3HCEDrU',
    testQrUrl: 'https://asistan.fokusistatistik.com/fokus520/',
    requestQrUrl: 'https://asistan.fokusistatistik.com/ucretsiz.html',
    packages: [
      {
        name: 'STANDART',
        monthlyPrice: '999 TL + KDV',
        yearlyPrice: '9.990 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-2 Gün',
          'Lead Yöntem Tipi': 'Kontrol',
          '1 Ay Ücretsiz Test': true,
          'İşletmeye Özel Prompt': true,
          'Sürekli Gelişim ve Öğrenme': true,
          'Server Kullanım Hakkı': true,
          'Otomatik Lead Takibi – Tek Kanallı': true,
          'Basit CRM Yönetimi – Standart Arşiv/Rapor': true,
          'Sınırlı Lead Takibi ve Sıcaklık Sınıflaması (1.000)': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Otomatik Lead Takibi – Çok Kanallı': false,
          'Otomatik Kampanya ve Yenileme Bildirimleri': false,
          'Detaylı/Entegre CRM Yönetimi – İstatistiksel Arşiv/Rapor': false,
          'Müşteri Skorlama, Etiketleme ve Raporlama': false,
          'Gelişmiş Lead Analizi: Duygu, Niyet ve İlgi': false,
          'Sınırsız Lead Takibi': false,
          'Diğer FOKUS Asistanlarıyla iletişim': false,
          'Sosyal Etkileşimleri CRM\'ye ekleme': false,
          'Müşteri Geri Bildirimlerini Raporlama': false,
          'Fırsata Özel Kampanya Önerileri': false,
          'E-Posta/Maps/Sosyal Medya vb. Tarama ile Müşteri Bulma': false,
          'Müşterilerinize Özel Kampanya Önerileri': false,
          'Kampanya Performans Analizi': false,
          'Detaylı CRM Ekran Arayüzü Kullanıcı Paneli': false,
          'Premium Bakım & Güncelleme (Haftada 1)': false,
          'Premium Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PRO',
        monthlyPrice: '2.500 TL + KDV',
        yearlyPrice: '25.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-5 Gün',
          'Lead Yöntem Tipi': 'Tetik',
          '1 Ay Ücretsiz Test': false,
          'İşletmeye Özel Prompt': true,
          'Sürekli Gelişim ve Öğrenme': true,
          'Server Kullanım Hakkı': true,
          'Otomatik Lead Takibi – Tek Kanallı': true,
          'Basit CRM Yönetimi – Standart Arşiv/Rapor': true,
          'Sınırlı Lead Takibi ve Sıcaklık Sınıflaması (1.000)': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Otomatik Lead Takibi – Çok Kanallı': true,
          'Otomatik Kampanya ve Yenileme Bildirimleri': true,
          'Detaylı/Entegre CRM Yönetimi – İstatistiksel Arşiv/Rapor': true,
          'Müşteri Skorlama, Etiketleme ve Raporlama': true,
          'Gelişmiş Lead Analizi: Duygu, Niyet ve İlgi': true,
          'Sınırsız Lead Takibi': true,
          'Diğer FOKUS Asistanlarıyla iletişim': true,
          'Sosyal Etkileşimleri CRM\'ye ekleme': false,
          'Müşteri Geri Bildirimlerini Raporlama': false,
          'Fırsata Özel Kampanya Önerileri': false,
          'E-Posta/Maps/Sosyal Medya vb. Tarama ile Müşteri Bulma': false,
          'Müşterilerinize Özel Kampanya Önerileri': false,
          'Kampanya Performans Analizi': false,
          'Detaylı CRM Ekran Arayüzü Kullanıcı Paneli': false,
          'Premium Bakım & Güncelleme (Haftada 1)': false,
          'Premium Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PREMIUM',
        monthlyPrice: '12.500 TL + KDV',
        yearlyPrice: '125.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-15 Gün',
          'Lead Yöntem Tipi': 'Radar',
          '1 Ay Ücretsiz Test': false,
          'İşletmeye Özel Prompt': true,
          'Sürekli Gelişim ve Öğrenme': true,
          'Server Kullanım Hakkı': true,
          'Otomatik Lead Takibi – Tek Kanallı': true,
          'Basit CRM Yönetimi – Standart Arşiv/Rapor': true,
          'Sınırlı Lead Takibi ve Sıcaklık Sınıflaması (1.000)': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Otomatik Lead Takibi – Çok Kanallı': true,
          'Otomatik Kampanya ve Yenileme Bildirimleri': true,
          'Detaylı/Entegre CRM Yönetimi – İstatistiksel Arşiv/Rapor': true,
          'Müşteri Skorlama, Etiketleme ve Raporlama': true,
          'Gelişmiş Lead Analizi: Duygu, Niyet ve İlgi': true,
          'Sınırsız Lead Takibi': true,
          'Diğer FOKUS Asistanlarıyla iletişim': true,
          'Sosyal Etkileşimleri CRM\'ye ekleme': true,
          'Müşteri Geri Bildirimlerini Raporlama': true,
          'Fırsata Özel Kampanya Önerileri': true,
          'E-Posta/Maps/Sosyal Medya vb. Tarama ile Müşteri Bulma': true,
          'Müşterilerinize Özel Kampanya Önerileri': true,
          'Kampanya Performans Analizi': true,
          'Detaylı CRM Ekran Arayüzü Kullanıcı Paneli': true,
          'Premium Bakım & Güncelleme (Haftada 1)': true,
          'Premium Özel Geliştirmeler': true,
        },
      },
    ],
    priceNote:
      '* Ücretler (01.06.2025 – 31.12.2025) tarihleri arasında yapılan sözleşmeler için geçerlidir. Yıllık planda 12 aylık sözleşmede 10 ay ücreti ödenir, 2 aylık kullanım hediyedir. Yıllık planda ödemeler aylık yapılır. Kurulum ve Entegrasyon için bir aylık paket ücreti talep edilir. Test aşaması için Kurulum ve Entegrasyon ücreti gerekmez.',
  },
  fokus618: {
    code: 'FOKUS618',
    name: 'FOKUS618',
    title: 'FİNANS & FATURA SANAL ASİSTANI',
    subtitle: '💸 Nakit Akışının Nabzını Tutan Dijital Mali Uzmanınız',
    description:
      '"Gelir ve gider vardı ama sistematik değildi." FOKUS618 ile artık finansal süreçler sadece takip edilmez, yönetilir. İster küçük bir girişim, ister büyük bir yapı olun; FOKUS618 tüm mali akışınızı düzenli hale getirir.',
    icon: '💰',
    whyReasons: [
      {
        title: '💰 Gelir & Gider Kaydı',
        description:
          'Müşteri adı, hizmet, tarih, tutar, fatura bilgileriyle kayıt işlemleri otomatiktir.',
      },
      {
        title: '🧾 Fatura Oluşturma ve Gönderme',
        description:
          'Şablonlara uygun fatura üretir, e-posta veya SMS ile anında iletir.',
      },
      {
        title: '⏰ Vade ve Tahsilat Hatırlatmaları',
        description:
          'Otomatik bildirim sistemi ile tahsilat öncesi ve sonrası uyarılar sağlar.',
      },
      {
        title: '📊 Aylık Finansal Özet',
        description:
          'Gelir-gider farkı, harcama sınıfları, performans grafikleriyle kapsamlı tablo sunar.',
      },
      {
        title: '📂 Harcamaların Sınıflandırılması',
        description:
          'Sabit, değişken ve dönemsel giderler otomatik olarak ayrıştırılır.',
      },
      {
        title: '🔁 Süreklilik Takibi',
        description:
          'Veri akışında kopma olmadan 7/24 izleme, bildirim ve güncelleme sağlar.',
      },
      {
        title: '🔐 Güvenli Veri İşleme',
        description:
          'Server tabanlı arşivleme, yetkilendirme ve KVKK uyumlu altyapı ile çalışır.',
      },
    ],
    capabilities: [
      'Tüm gelir ve giderleri müşteri, hizmet, tarih, tutar gibi parametrelerle kaydeder.',
      'Her ödeme sonrası otomatik fatura oluşturur ve müşteriye iletir.',
      'Vade yaklaşınca otomatik uyarı sistemleri devreye girer (SMS / e-posta).',
      'Aylık, haftalık veya günlük bazlı özet raporlar hazırlar.',
      'Giderleri kategori ve dönem bazlı sınıflandırır.',
      'Stopaj, KDV, vergi indirimleri gibi finansal detayları takip eder.',
      'Takvim entegrasyonu ile ödeme günlerini yönetir.',
      'Shopier, Paraşüt, Mikro gibi sistemlerle entegre çalışır.',
      'CRM sistemleriyle müşteri ilişkileri ve finans verilerini bağlar.',
      'Komutla fatura oluşturma, etiketleme ve arşivleme sistemini kurar.',
    ],
    videoUrl: 'https://www.youtube.com/embed/4WS0b82IJ38',
    testQrUrl: 'https://asistan.fokusistatistik.com/fokus618/',
    requestQrUrl: 'https://asistan.fokusistatistik.com/ucretsiz.html',
    packages: [
      {
        name: 'STANDART',
        monthlyPrice: '999 TL + KDV',
        yearlyPrice: '9.990 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-2 Gün',
          '1 Ay Ücretsiz Test': true,
          'İşletmeye Özel Prompt': true,
          'Sürekli Gelişim ve Öğrenme': true,
          'Veri Güvenliği ve Yetkilendirme': true,
          'Server Kullanım Hakkı': true,
          'Basit Gelir-Gider Kaydı (4 Parametre)': true,
          'Şablon Fatura Oluşturma ve Yönlendirme': true,
          'Otomatik Aylık Finansal Rapor': true,
          'Standart Arşiv/Rapor ve Görselleştirme': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Özel Marka Logolu Fatura Oluşturma': false,
          'Komutla Fatura Oluşturma': false,
          'Detaylı Gelir-Gider Kaydı (12 Parametre)': false,
          'Takvim Entegrasyonlu Ödeme ve Gelir İşaretleme': false,
          'Gelir-Gider Sınıflandırmaları': false,
          'Vade Bildirimi ve Borç Takibi': false,
          'Diğer Asistanlarla iletişim': false,
          'Detaylı Arşiv/Rapor ve Görselleştirme': false,
          'Müşteri bazlı Sorgulama': false,
          'Paraşüt, Logo, Mikro vb. entegrasyonları': false,
          'Shopier, Shopify entegrasyonları': false,
          'KDV/Stopaj Takibi': false,
          'Fatura Analiz Etme ve Tasnifleme': false,
          'Finans Takip Ekran Arayüzü Kullanıcı Paneli': false,
          'Yetki Bazlı Kullanıcı Kontrolü': false,
          'Günlük-Haftalık Finansal Özet': false,
          'Premium Bakım & Güncelleme (Haftada 1)': false,
          'Premium Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PRO',
        monthlyPrice: '4.000 TL + KDV',
        yearlyPrice: '40.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-7 Gün',
          '1 Ay Ücretsiz Test': false,
          'İşletmeye Özel Prompt': true,
          'Sürekli Gelişim ve Öğrenme': true,
          'Veri Güvenliği ve Yetkilendirme': true,
          'Server Kullanım Hakkı': true,
          'Basit Gelir-Gider Kaydı (4 Parametre)': true,
          'Şablon Fatura Oluşturma ve Yönlendirme': true,
          'Otomatik Aylık Finansal Rapor': true,
          'Standart Arşiv/Rapor ve Görselleştirme': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Özel Marka Logolu Fatura Oluşturma': true,
          'Komutla Fatura Oluşturma': true,
          'Detaylı Gelir-Gider Kaydı (12 Parametre)': true,
          'Takvim Entegrasyonlu Ödeme ve Gelir İşaretleme': true,
          'Gelir-Gider Sınıflandırmaları': true,
          'Vade Bildirimi ve Borç Takibi': true,
          'Diğer Asistanlarla iletişim': true,
          'Detaylı Arşiv/Rapor ve Görselleştirme': true,
          'Müşteri bazlı Sorgulama': true,
          'Paraşüt, Logo, Mikro vb. entegrasyonları': false,
          'Shopier, Shopify entegrasyonları': false,
          'KDV/Stopaj Takibi': false,
          'Fatura Analiz Etme ve Tasnifleme': false,
          'Finans Takip Ekran Arayüzü Kullanıcı Paneli': false,
          'Yetki Bazlı Kullanıcı Kontrolü': false,
          'Günlük-Haftalık Finansal Özet': false,
          'Premium Bakım & Güncelleme (Haftada 1)': false,
          'Premium Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PREMIUM',
        monthlyPrice: '15.000 TL + KDV',
        yearlyPrice: '150.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-30 Gün',
          '1 Ay Ücretsiz Test': false,
          'İşletmeye Özel Prompt': true,
          'Sürekli Gelişim ve Öğrenme': true,
          'Veri Güvenliği ve Yetkilendirme': true,
          'Server Kullanım Hakkı': true,
          'Basit Gelir-Gider Kaydı (4 Parametre)': true,
          'Şablon Fatura Oluşturma ve Yönlendirme': true,
          'Otomatik Aylık Finansal Rapor': true,
          'Standart Arşiv/Rapor ve Görselleştirme': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Özel Marka Logolu Fatura Oluşturma': true,
          'Komutla Fatura Oluşturma': true,
          'Detaylı Gelir-Gider Kaydı (12 Parametre)': true,
          'Takvim Entegrasyonlu Ödeme ve Gelir İşaretleme': true,
          'Gelir-Gider Sınıflandırmaları': true,
          'Vade Bildirimi ve Borç Takibi': true,
          'Diğer Asistanlarla iletişim': true,
          'Detaylı Arşiv/Rapor ve Görselleştirme': true,
          'Müşteri bazlı Sorgulama': true,
          'Paraşüt, Logo, Mikro vb. entegrasyonları': true,
          'Shopier, Shopify entegrasyonları': true,
          'KDV/Stopaj Takibi': true,
          'Fatura Analiz Etme ve Tasnifleme': true,
          'Finans Takip Ekran Arayüzü Kullanıcı Paneli': true,
          'Yetki Bazlı Kullanıcı Kontrolü': true,
          'Günlük-Haftalık Finansal Özet': true,
          'Premium Bakım & Güncelleme (Haftada 1)': true,
          'Premium Özel Geliştirmeler': true,
        },
      },
    ],
    priceNote:
      '* Ücretler (01.06.2025 – 31.12.2025) tarihleri arasında yapılan sözleşmeler için geçerlidir. Yıllık planda 12 aylık sözleşmede 10 ay ücreti ödenir, 2 aylık kullanım hediyedir. Yıllık planda ödemeler aylık yapılır. Kurulum ve Entegrasyon için bir aylık paket ücreti talep edilir. Test aşaması için Kurulum ve Entegrasyon ücreti gerekmez.',
  },
  fokus707: {
    code: 'FOKUS707',
    name: 'FOKUS707',
    title: 'İNSAN KAYNAKLARI SANAL ASİSTANI',
    subtitle: '👥 İK Süreçlerinizde Dijital Dönüşüm Başlasın!',
    description:
      '"Her çalışanın bir hikayesi vardır, FOKUS707 onu kaydeder, analiz eder ve yönetir." FOKUS707 ile özlük belgeleri, izin takibi, maaş hesaplama ve performans analizi gibi süreçler dijitalleşir; zaman kazanır, hata azalır.',
    icon: '👥',
    whyReasons: [
      {
        title: '🗂 Dijital Özlük Dosyaları',
        description:
          'Personel bilgileri dijital ortamda güvenle saklanır, yedeklenir.',
      },
      {
        title: '🗓 Vardiya & Fazla Mesai Planlama',
        description:
          'Aylık vardiya programları ve fazla mesai hesapları hazırlanır.',
      },
      {
        title: '📆 İzin & Rapor Takibi',
        description:
          'İzin talepleri alınır, yöneticiden onay alınır, sonuçlar bildirilir.',
      },
      {
        title: '📊 Performans Raporlama',
        description:
          'Personel performansları takip edilir, periyodik olarak raporlanır.',
      },
      {
        title: '💸 Maaş & Prim Hesaplama',
        description:
          'Otomatik maaş ve ek ödeme hesaplaması, bordro dökümleri hazırlar.',
      },
      {
        title: '📢 Bildirim Sistemleri',
        description:
          'Vardiya, izin, maaş ve belgelerle ilgili otomatik bildirim gönderir.',
      },
      {
        title: '⏱ Deneme Süreci Takibi',
        description:
          'Yeni çalışanların deneme süreci takip edilir, raporlanır.',
      },
      {
        title: '🎓 Eğitim & Sertifika Takibi',
        description:
          'Gerekli belgeler, eğitim tarihleri izlenir ve hatırlatılır.',
      },
      {
        title: '📬 Yönetici Sorgularına Yanıt',
        description:
          'Kişi bazlı sorgulara hızlı geri dönüş sağlar.',
      },
    ],
    capabilities: [
      'Personel kartı, belge ve sözleşmeleri dijital olarak arşivler.',
      'İzin taleplerini alır, kalan günleri hesaplar, yöneticiden onay alır.',
      'Vardiya planları oluşturur, personele bilgilendirme gönderir.',
      'Aylık maaş ve prim hesaplarını otomatik yapar, bordro dökümleri hazırlar.',
      'Doğum günü, eğitim, belge süresi gibi konularda otomatik bildirimler gönderir.',
      'Her çalışanın performans verisini toplar, analiz eder ve görselleştirir.',
      'Personel bilgi düzeyini sınavlarla ölçer, değerlendirir ve raporlar.',
      'Deneme sürecindeki personeli takip eder ve yönetime özet çıkarır.',
      'Eğitim, sertifika ve yasal yükümlülükleri hatırlatır.',
      'Yönetici talepleri doğrultusunda kişi bazlı sorgulama yapar.',
    ],
    videoUrl: 'https://www.youtube.com/embed/AA0L2nleZXU',
    testQrUrl: 'https://asistan.fokusistatistik.com/fokus707/',
    requestQrUrl: 'https://asistan.fokusistatistik.com/ucretsiz.html',
    packages: [
      {
        name: 'STANDART',
        monthlyPrice: '1.499 TL + KDV',
        yearlyPrice: '14.990 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-2 Gün',
          '1 Ay Ücretsiz Test': true,
          'Personel Kartı Parametre Üst Limiti': '8',
          'İşletmeye Özel Prompt – Sürekli Gelişim': true,
          'İzin, Vardiya, Puantaj Takibi': true,
          'Standart Arşivleme': true,
          'Maaş ve Fazla Mesai Hesaplama': true,
          'Şablon Personel Kartı – Dijital Özlük Dosyası': true,
          'Aylık Özet Personel Raporu': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Zaman Bildirimli Hatırlatmalar/Duyurular': false,
          'Özel Marka Logolu Dokümanlar': false,
          'CV Toplama ve Ön Değerlendirme Otomasyonu': false,
          'Eğitim ve Sertifika Takibi': false,
          'Aylık Detaylı Personel Performans Raporu': false,
          'Aksiyona Bağlı Hatırlatmalar/Duyurular': false,
          'Manuel/Otomatik İzin Onaylama': false,
          'Personel Giriş Çıkış Otomasyonu': false,
          'Diğer Sanal Asistanlarla iletişim': false,
          'Personel / Müşteri Eşleştirmeleri ve Analizleri': false,
          'Sesli Asistan Opsiyonu': false,
          'Otomatik Personel Belge Oluşturma': false,
          'Personel Programlarıyla tam Entegrasyon': false,
          'Özelleştirilmiş Personel Kartı': false,
          'Personel Deneyimini Otomatik Sınavlarla Ölçme': false,
          'QR Destekli Özel Personel Takip Paneli': false,
          'Personel Bazlı Anlık Sorgulama-Raporlama': false,
          'Personel Karar Destek Sistemi': false,
          'Personel Deneme Süreci Takibi': false,
          'Özelleştirilebilir İzin ve Rapor Paneli': false,
          'Personel Performans Skoru ve Parametre Takibi': false,
          'SMS Desteği': false,
          'Premium Bakım & Güncelleme (Haftada 1)': false,
          'Premium Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PRO',
        monthlyPrice: '4.000 TL + KDV',
        yearlyPrice: '40.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-7 Gün',
          '1 Ay Ücretsiz Test': false,
          'Personel Kartı Parametre Üst Limiti': '20',
          'İşletmeye Özel Prompt – Sürekli Gelişim': true,
          'İzin, Vardiya, Puantaj Takibi': true,
          'Standart Arşivleme': true,
          'Maaş ve Fazla Mesai Hesaplama': true,
          'Şablon Personel Kartı – Dijital Özlük Dosyası': true,
          'Aylık Özet Personel Raporu': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Zaman Bildirimli Hatırlatmalar/Duyurular': true,
          'Özel Marka Logolu Dokümanlar': true,
          'CV Toplama ve Ön Değerlendirme Otomasyonu': true,
          'Eğitim ve Sertifika Takibi': true,
          'Aylık Detaylı Personel Performans Raporu': true,
          'Aksiyona Bağlı Hatırlatmalar/Duyurular': true,
          'Manuel/Otomatik İzin Onaylama': true,
          'Personel Giriş Çıkış Otomasyonu': true,
          'Diğer Sanal Asistanlarla iletişim': true,
          'Personel / Müşteri Eşleştirmeleri ve Analizleri': true,
          'Sesli Asistan Opsiyonu': false,
          'Otomatik Personel Belge Oluşturma': false,
          'Personel Programlarıyla tam Entegrasyon': false,
          'Özelleştirilmiş Personel Kartı': false,
          'Personel Deneyimini Otomatik Sınavlarla Ölçme': false,
          'QR Destekli Özel Personel Takip Paneli': false,
          'Personel Bazlı Anlık Sorgulama-Raporlama': false,
          'Personel Karar Destek Sistemi': false,
          'Personel Deneme Süreci Takibi': false,
          'Özelleştirilebilir İzin ve Rapor Paneli': false,
          'Personel Performans Skoru ve Parametre Takibi': false,
          'SMS Desteği': false,
          'Premium Bakım & Güncelleme (Haftada 1)': false,
          'Premium Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PREMIUM',
        monthlyPrice: '15.000 TL + KDV',
        yearlyPrice: '150.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-30 Gün',
          '1 Ay Ücretsiz Test': false,
          'Personel Kartı Parametre Üst Limiti': '20+',
          'İşletmeye Özel Prompt – Sürekli Gelişim': true,
          'İzin, Vardiya, Puantaj Takibi': true,
          'Standart Arşivleme': true,
          'Maaş ve Fazla Mesai Hesaplama': true,
          'Şablon Personel Kartı – Dijital Özlük Dosyası': true,
          'Aylık Özet Personel Raporu': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Zaman Bildirimli Hatırlatmalar/Duyurular': true,
          'Özel Marka Logolu Dokümanlar': true,
          'CV Toplama ve Ön Değerlendirme Otomasyonu': true,
          'Eğitim ve Sertifika Takibi': true,
          'Aylık Detaylı Personel Performans Raporu': true,
          'Aksiyona Bağlı Hatırlatmalar/Duyurular': true,
          'Manuel/Otomatik İzin Onaylama': true,
          'Personel Giriş Çıkış Otomasyonu': true,
          'Diğer Sanal Asistanlarla iletişim': true,
          'Personel / Müşteri Eşleştirmeleri ve Analizleri': true,
          'Sesli Asistan Opsiyonu': true,
          'Otomatik Personel Belge Oluşturma': true,
          'Personel Programlarıyla tam Entegrasyon': true,
          'Özelleştirilmiş Personel Kartı': true,
          'Personel Deneyimini Otomatik Sınavlarla Ölçme': true,
          'QR Destekli Özel Personel Takip Paneli': true,
          'Personel Bazlı Anlık Sorgulama-Raporlama': true,
          'Personel Karar Destek Sistemi': true,
          'Personel Deneme Süreci Takibi': true,
          'Özelleştirilebilir İzin ve Rapor Paneli': true,
          'Personel Performans Skoru ve Parametre Takibi': true,
          'SMS Desteği': true,
          'Premium Bakım & Güncelleme (Haftada 1)': true,
          'Premium Özel Geliştirmeler': true,
        },
      },
    ],
    priceNote:
      '* Ücretler (01.06.2025 – 31.12.2025) tarihleri arasında yapılan sözleşmeler için geçerlidir. Yıllık planda 12 aylık sözleşmede 10 ay ücreti ödenir 2 aylık kullanım hediyedir. Yıllık planda ödemeler aylık yapılır ve fiyat güncellemelerinden etkilenmez. Kurulum ve Entegrasyon için bir aylık paket ücreti talep edilir. Test aşaması için Kurulum ve Entegrasyon ücreti gerekmez.',
  },
  fokus717: {
    code: 'FOKUS717',
    name: 'FOKUS717',
    title: 'İÇERİK TASARIMI SANAL ASİSTANI',
    subtitle: '🌟 Fikirden Yayına, Tüm İçeriğinizi Tasarlar',
    description:
      'Dijital iletişim süreçlerinizi anlayarak size özel tasarımlar oluşturur. Sosyal medya içeriklerinden videolara, kurumsal sunumlardan bültenlere kadar FOKUS717 ile tüm içeriklerinizi otomatikleştirin, zamandan tasarruf edin ve marka değeriniz yükselsin.',
    icon: '🎨',
    whyReasons: [
      {
        title: '📥 İçerik Talebi Karşılama',
        description:
          'Tüm dijital kanallardan gelen talepleri algılar, uygun içerik üretim sürecini başlatır.',
      },
      {
        title: '🧠 Kurumsal Hedefe Uyumlu Tasarım Fikri',
        description:
          'Zaman, hedef kitle ve amaca uygun stratejiler geliştirir.',
      },
      {
        title: '🎨 Görsel ve Formatlı Tasarım Üretimi',
        description:
          'Sosyal medya, bülten, afiş, sunum gibi alanlara uygun görsel içerikler tasarlar.',
      },
      {
        title: '📝 Metin, Alt Metin ve Açıklama Yazımı',
        description:
          'Tasarımların bağlamına uygun kurumsal metinler oluşturur.',
      },
      {
        title: '📸 Fotoğraf Tabanlı İçerik Çeşitlendirme',
        description:
          'Tekil ve seri görselleri farklı boyut, kolaj ve kırpma yapılarıyla çoğaltır.',
      },
      {
        title: '🎥 Video ve Reels Üretimi',
        description:
          'Dinamik sosyal medya videoları, animasyonlar ve sesli içerikler sunar.',
      },
      {
        title: '📩 Kurumsal Bülten Hazırlığı',
        description:
          'Haftalık/aylık e-bültenleri planlar, tasarlar ve yayına hazırlar.',
      },
      {
        title: '✅ Onay ve Revizyon Süreci Yönetimi',
        description:
          'Hazırlanan çalışmalar yetkiliye sunulur, gerekirse revize edilir veya alternatif önerilir.',
      },
      {
        title: '🔊 Sektöre Özel Dil ve Format Uyumu',
        description:
          'Güzellik, sağlık, hukuk, eğitim gibi farklı alanlara özgü içerik dili ve formatıyla %100 uyumludur.',
      },
    ],
    capabilities: [
      'Sanal asistanlardan ya da sistem verilerinden gelen içerik taleplerini algılar ve işleme alır.',
      'Marka dilinize uygun metinler, sloganlar ve açıklamalar üretir.',
      'Sosyal medya, afiş, sunum, e-bülten gibi formatlara uygun içerikler tasarlar.',
      'Fotoğraflardan içerik varyasyonları oluşturur ve kırpma/renklendirme işlemleri yapar.',
      'Video, reels ve animasyonlu içerikler üretir.',
      'Kurumsal haftalık/aylık bültenleri planlar, yazar ve tasarlar.',
      'Yetkili kişi/ekipten içerik onayı alır, gerekirse alternatifler sunar.',
      'Takvim bazlı içerik akışını otomatikleştirir.',
      'Sektörünüze özel içerik dili ve görsel estetik uyumu sağlar.',
      'FOKUS ekosisteminin diğer asistanlarıyla senkronize çalışarak kampanya içeriklerini zamanında üretir.',
    ],
    videoUrl: 'https://www.youtube.com/embed/Bt3ZmrE1MqU',
    testQrUrl: 'https://asistan.fokusistatistik.com/fokus717/',
    requestQrUrl: 'https://asistan.fokusistatistik.com/ucretsiz.html',
    packages: [
      {
        name: 'STANDART',
        monthlyPrice: '1.499 TL + KDV',
        yearlyPrice: '14.990 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-2 Gün',
          'Aylık Görsel İçerik Tasarlama Limiti': '100',
          'Aylık Video Üretme Limiti': '0',
          'Aylık Kurumsal Bülten Tasarımı': 'Standart',
          'Aylık Kurumsal Bülten Sayfa Sayısı Üst Limiti': '1',
          '1 Ay Ücretsiz Test': true,
          'Kurumsal Statik Doküman Taraması': true,
          'İşletmeye Özel Prompt ile Sürekli Gelişim/Öğrenme': true,
          'Sürekli Gelişim ve Öğrenme': true,
          'Seri Ürün Görselleştirme Otomasyonu': true,
          'Metin ve Görsel Üretimi': true,
          'Kolay İçerik Üretime Arayüzü': true,
          'Otomatik Aylık Kurum Bülteni Hazırlama': true,
          'Yönetici Onay Bildirimi': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Kurumsal Dinamik Doküman Taraması': false,
          'Kurumsal Logo ve Renk Paleti Kullanımı': false,
          'Basit Sunumlar Hazırlama': false,
          'Takvim Planına göre Otomatik Üretim': false,
          'Video ve Reels Üretimi': false,
          'Diğer FOKUS Asistanlarıyla iletişim': false,
          'Limitli Video ve Reels Üretim Hakkı': false,
          'Sanat ve İçerik Oluşturma Danışmanlığı Desteği': false,
          'İşletmenin tüm dijital verisine tam entegrasyon': false,
          'Premium İçerik için en güçlü YZ sistemleri': false,
          'Google Slides – Canva vb Entegrasyonları': false,
          'Kurumsal Sunum Hazırlama': false,
          'Sektöre Özel Dil ve Format Seçimi': false,
          'Kurumsal Dil Kontrolü': false,
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
          'Aylık Görsel İçerik Tasarlama Limiti': '1.000',
          'Aylık Video Üretme Limiti': '30',
          'Aylık Kurumsal Bülten Tasarımı': 'Standart',
          'Aylık Kurumsal Bülten Sayfa Sayısı Üst Limiti': '4',
          '1 Ay Ücretsiz Test': false,
          'Kurumsal Statik Doküman Taraması': true,
          'İşletmeye Özel Prompt ile Sürekli Gelişim/Öğrenme': true,
          'Sürekli Gelişim ve Öğrenme': true,
          'Seri Ürün Görselleştirme Otomasyonu': true,
          'Metin ve Görsel Üretimi': true,
          'Kolay İçerik Üretime Arayüzü': true,
          'Otomatik Aylık Kurum Bülteni Hazırlama': true,
          'Yönetici Onay Bildirimi': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Kurumsal Dinamik Doküman Taraması': true,
          'Kurumsal Logo ve Renk Paleti Kullanımı': true,
          'Basit Sunumlar Hazırlama': true,
          'Takvim Planına göre Otomatik Üretim': true,
          'Video ve Reels Üretimi': true,
          'Diğer FOKUS Asistanlarıyla iletişim': true,
          'Limitli Video ve Reels Üretim Hakkı': true,
          'Sanat ve İçerik Oluşturma Danışmanlığı Desteği': false,
          'İşletmenin tüm dijital verisine tam entegrasyon': false,
          'Premium İçerik için en güçlü YZ sistemleri': false,
          'Google Slides – Canva vb Entegrasyonları': false,
          'Kurumsal Sunum Hazırlama': false,
          'Sektöre Özel Dil ve Format Seçimi': false,
          'Kurumsal Dil Kontrolü': false,
          'Premium Bakım & Güncelleme (Haftada 1)': false,
          'Premium Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PREMIUM',
        monthlyPrice: '25.000 TL + KDV',
        yearlyPrice: '250.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-30 Gün',
          'Aylık Görsel İçerik Tasarlama Limiti': '20.000',
          'Aylık Video Üretme Limiti': '100',
          'Aylık Kurumsal Bülten Tasarımı': 'Özelleştirilmiş',
          'Aylık Kurumsal Bülten Sayfa Sayısı Üst Limiti': '16',
          '1 Ay Ücretsiz Test': false,
          'Kurumsal Statik Doküman Taraması': true,
          'İşletmeye Özel Prompt ile Sürekli Gelişim/Öğrenme': true,
          'Sürekli Gelişim ve Öğrenme': true,
          'Seri Ürün Görselleştirme Otomasyonu': true,
          'Metin ve Görsel Üretimi': true,
          'Kolay İçerik Üretime Arayüzü': true,
          'Otomatik Aylık Kurum Bülteni Hazırlama': true,
          'Yönetici Onay Bildirimi': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Kurumsal Dinamik Doküman Taraması': true,
          'Kurumsal Logo ve Renk Paleti Kullanımı': true,
          'Basit Sunumlar Hazırlama': true,
          'Takvim Planına göre Otomatik Üretim': true,
          'Video ve Reels Üretimi': true,
          'Diğer FOKUS Asistanlarıyla iletişim': true,
          'Limitli Video ve Reels Üretim Hakkı': true,
          'Sanat ve İçerik Oluşturma Danışmanlığı Desteği': true,
          'İşletmenin tüm dijital verisine tam entegrasyon': true,
          'Premium İçerik için en güçlü YZ sistemleri': true,
          'Google Slides – Canva vb Entegrasyonları': true,
          'Kurumsal Sunum Hazırlama': true,
          'Sektöre Özel Dil ve Format Seçimi': true,
          'Kurumsal Dil Kontrolü': true,
          'Premium Bakım & Güncelleme (Haftada 1)': true,
          'Premium Özel Geliştirmeler': true,
        },
      },
    ],
    priceNote:
      '* Ücretler (01.06.2025 – 31.12.2025) tarihleri arasında yapılan sözleşmeler için geçerlidir. Yıllık planda 12 aylık sözleşmede 10 ay ücreti ödenir 2 aylık kullanım hediyedir. Yıllık planda ödemeler aylık yapılır ve fiyat güncellemelerinden etkilenmez. Kurulum ve Entegrasyon için bir aylık paket ücreti talep edilir. Test aşaması için Kurulum ve Entegrasyon ücreti gerekmez.',
  },
  fokus808: {
    code: 'FOKUS808',
    name: 'FOKUS808',
    title: 'SOSYAL MEDYA & İLETİŞİM SANAL ASİSTANI',
    subtitle: '📱 Paylaş, Planla, Korun – Tüm Sosyal Medya Süreçleri Tek Yerden!',
    description:
      'Sadece paylaşmak yetmez; doğru zamanda, doğru içerikle, güvenle paylaşmak gerekir. FOKUS808, sosyal medya ve kurumsal iletişiminizi algoritmalara uygun içerikler, doğru etiketlemeler ve stratejik zamanlamayla yönetir. Markanızın dijital dünyadaki sesi, gözü ve kulağı olur; sadece görünür değil, fark edilir hale gelirsiniz.',
    icon: '📱',
    whyReasons: [
      {
        title: '🗓 Zamanlı Paylaşım',
        description:
          'Belirlenen gün ve saatlerde içerikler otomatik yayınlanır.',
      },
      {
        title: '🧠 Basın ve Sosyal Medya Takibi',
        description:
          'Marka adınızı geçen haber, yorum ve içerikler analiz edilir.',
      },
      {
        title: '🎨 Kurumsal Kimlik Uyumu',
        description:
          'Dil, renk, logo ve tasarım bütünlüğü sağlanır.',
      },
      {
        title: '🛡 Etik Denetim & İçerik Riski',
        description:
          'Paylaşımlar etik kurallara göre değerlendirilir.',
      },
      {
        title: '💬 Yorum Takibi ve Yanıt Önerisi',
        description:
          'Gelen mesajları algılar, uygun yanıtlar önerir.',
      },
      {
        title: '🚨 Kriz Anında Müdahale',
        description:
          'Hassas durumlarda içerik yayını durdurur, yöneticiyi uyarır.',
      },
      {
        title: '🧩 Yayın Sürekliliği',
        description:
          'İçerik akışınızda boşluk kalmaz. Her zaman güncelsiniz.',
      },
    ],
    capabilities: [
      'Sosyal medya takvimi oluşturur ve tetikler.',
      'İçerikleri platforma özel olarak biçimlendirir.',
      'Etik denetimden geçirir, riskli içerikleri ayıklar.',
      'Marka imajına uygun içerik dizayn eder.',
      'Diğer FOKUS Sanal Asistanlarından gelen verileri paylaşım haline getirir.',
      'Yorumları analiz eder, riskli olanları etiketler.',
      'Paylaşılan içeriklerin erişim ve etkileşimini raporlar.',
      'Sosyal medya trendlerini izler ve yönetime önerilerde bulunur.',
      'Kriz anlarında yayını durdurur ve alternatif içerik önerir.',
    ],
    videoUrl: 'https://www.youtube.com/embed/PWFR6mPbhGM',
    testQrUrl: 'https://asistan.fokusistatistik.com/fokus808/',
    requestQrUrl: 'https://asistan.fokusistatistik.com/ucretsiz.html',
    packages: [
      {
        name: 'STANDART',
        monthlyPrice: '999 TL + KDV',
        yearlyPrice: '9.990 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-2 Gün',
          'Aylık Yayın Üst Limiti': '60',
          'Kanal Kullanım Üst Limiti': '2',
          'Aylık Kurumsal Bülten Tasarımı': 'Standart',
          '1 Ay Ücretsiz Test': true,
          'İşletmeye Özel Prompt- Sürekli Gelişim': true,
          'Takvim Planına göre ya da Manuel Paylaşım': true,
          'Aylık Standart Sosyal Medya Raporu': true,
          'Standart Etik ve Kurumsal Kimlik Kontrol': true,
          'Standart Sosyal Medya Taraması': true,
          'Güncel sosyal medya trend takibi': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Kurumsal Statik Doküman Taraması': true,
          'Özelleştirilmiş Etik Kontrol': false,
          'Pro Sosyal Medya ve Basın Tarama': false,
          'Aylık Pro Raporlama (Sosyal Medya – Basın)': false,
          'Olumlu – Olumsuz Yorum Analizi': false,
          'Diğer FOKUS Asistanlarıyla iletişim': false,
          'Yorum okuma, değerlendirme ve cevaplama': false,
          'Kuruma Özel Sosyal Medya Kontrol Arayüzü': false,
          'Trendler ve Kurum verilerine göre İçerik Önerisi': false,
          'Sosyal Medya Etkileşim Analizi': false,
          'Kurum Yazılım ve Verilerine Tam Entegrasyon': false,
          'Kriz Anında Otomatik Yayın Durdurma-Bildirim': false,
          'Rakiplerin Sosyal Medya Hesap Analizleri': false,
          'Detaylı Yorum ve Duygu Analizi': false,
          'Sektörel Sosyal Medya Trend Analizi': false,
          'Tam Sosyal Medya Yönetimi': false,
          'SEO Yönetimi': false,
          'Haftalık Analiz Raporları ve Anlık Bildirimler': false,
          'Premium Bakım & Güncelleme (Haftada 1)': false,
          'Premium Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PRO',
        monthlyPrice: '4.000 TL + KDV',
        yearlyPrice: '40.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-7 Gün',
          'Aylık Yayın Üst Limiti': '500',
          'Kanal Kullanım Üst Limiti': '5',
          'Aylık Kurumsal Bülten Tasarımı': 'Standart',
          '1 Ay Ücretsiz Test': false,
          'İşletmeye Özel Prompt- Sürekli Gelişim': true,
          'Takvim Planına göre ya da Manuel Paylaşım': true,
          'Aylık Standart Sosyal Medya Raporu': true,
          'Standart Etik ve Kurumsal Kimlik Kontrol': true,
          'Standart Sosyal Medya Taraması': true,
          'Güncel sosyal medya trend takibi': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Kurumsal Statik Doküman Taraması': true,
          'Özelleştirilmiş Etik Kontrol': true,
          'Pro Sosyal Medya ve Basın Tarama': true,
          'Aylık Pro Raporlama (Sosyal Medya – Basın)': true,
          'Olumlu – Olumsuz Yorum Analizi': true,
          'Diğer FOKUS Asistanlarıyla iletişim': true,
          'Yorum okuma, değerlendirme ve cevaplama': true,
          'Kuruma Özel Sosyal Medya Kontrol Arayüzü': true,
          'Trendler ve Kurum verilerine göre İçerik Önerisi': true,
          'Sosyal Medya Etkileşim Analizi': true,
          'Kurum Yazılım ve Verilerine Tam Entegrasyon': false,
          'Kriz Anında Otomatik Yayın Durdurma-Bildirim': false,
          'Rakiplerin Sosyal Medya Hesap Analizleri': false,
          'Detaylı Yorum ve Duygu Analizi': false,
          'Sektörel Sosyal Medya Trend Analizi': false,
          'Tam Sosyal Medya Yönetimi': false,
          'SEO Yönetimi': false,
          'Haftalık Analiz Raporları ve Anlık Bildirimler': false,
          'Premium Bakım & Güncelleme (Haftada 1)': false,
          'Premium Özel Geliştirmeler': false,
        },
      },
      {
        name: 'PREMIUM',
        monthlyPrice: '25.000 TL + KDV',
        yearlyPrice: '250.000 TL + KDV',
        features: {
          'Kurulum ve Entegrasyon Süresi': '1-30 Gün',
          'Aylık Yayın Üst Limiti': 'Sınırsız',
          'Kanal Kullanım Üst Limiti': 'Sınırsız',
          'Aylık Kurumsal Bülten Tasarımı': 'Özelleştirilmiş',
          '1 Ay Ücretsiz Test': false,
          'İşletmeye Özel Prompt- Sürekli Gelişim': true,
          'Takvim Planına göre ya da Manuel Paylaşım': true,
          'Aylık Standart Sosyal Medya Raporu': true,
          'Standart Etik ve Kurumsal Kimlik Kontrol': true,
          'Standart Sosyal Medya Taraması': true,
          'Güncel sosyal medya trend takibi': true,
          'Standart Bakım & Güncelleme (Ayda 1)': true,
          'Kurumsal Statik Doküman Taraması': true,
          'Özelleştirilmiş Etik Kontrol': true,
          'Pro Sosyal Medya ve Basın Tarama': true,
          'Aylık Pro Raporlama (Sosyal Medya – Basın)': true,
          'Olumlu – Olumsuz Yorum Analizi': true,
          'Diğer FOKUS Asistanlarıyla iletişim': true,
          'Yorum okuma, değerlendirme ve cevaplama': true,
          'Kuruma Özel Sosyal Medya Kontrol Arayüzü': true,
          'Trendler ve Kurum verilerine göre İçerik Önerisi': true,
          'Sosyal Medya Etkileşim Analizi': true,
          'Kurum Yazılım ve Verilerine Tam Entegrasyon': true,
          'Kriz Anında Otomatik Yayın Durdurma-Bildirim': true,
          'Rakiplerin Sosyal Medya Hesap Analizleri': true,
          'Detaylı Yorum ve Duygu Analizi': true,
          'Sektörel Sosyal Medya Trend Analizi': true,
          'Tam Sosyal Medya Yönetimi': true,
          'SEO Yönetimi': true,
          'Haftalık Analiz Raporları ve Anlık Bildirimler': true,
          'Premium Bakım & Güncelleme (Haftada 1)': true,
          'Premium Özel Geliştirmeler': true,
        },
      },
    ],
    priceNote:
      '* Ücretler (01.06.2025 – 31.12.2025) tarihleri arasında yapılan sözleşmeler için geçerlidir. Yıllık planda 12 aylık sözleşmede 10 ay ücreti ödenir 2 aylık kullanım hediyedir. Yıllık planda ödemeler aylık yapılır ve fiyat güncellemelerinden etkilenmez. Kurulum ve Entegrasyon için bir aylık paket ücreti talep edilir. Test aşaması için Kurulum ve Entegrasyon ücreti gerekmez.',
  },
  fokus999: {
    code: 'FOKUS999',
    name: 'FOKUS999',
    title: 'JOKER SANAL ASİSTAN',
    subtitle: '🧩 İşinizin Her Alanına Uyum Sağlayan Dijital Destek',
    description:
      '"Her görevi üstlenebilir, her alana uyumlanabilir." FOKUS999, tam bir dijital İsviçre çakısı gibi çalışır. Görev tanımı fark etmeksizin işletmenizin ihtiyaçlarını hızla öğrenir, yorumlar ve çözüm üretir. Özellikle sınırları net çizilmemiş, karmaşık veya çok alanlı işlerde görev alarak diğer tüm FOKUS asistanlarına destek olur.',
    icon: '🃏',
    whyReasons: [
      {
        title: '📝 Görev Tanımını Algılama ve Uyarlama',
        description:
          'Verilen görevleri analiz eder, hızla uyumlanır ve kendi iç kaynaklarını organize eder.',
      },
      {
        title: '🔁 Hızlı adaptasyon',
        description:
          'Yeni komutları kolayca entegre eder. Farklı alanlara adapte olarak geniş bir hizmet yelpazesi sunar.',
      },
      {
        title: '🤝 Asistanlar Arası Saygılı İşbirliği',
        description:
          'Diğer FOKUS asistanlarına müdahale etmeden destek olur, gerektiğinde yüklerini hafifletir.',
      },
      {
        title: '🧠 Hızlı Öğrenme',
        description:
          'İşletmenize ait bilgileri analiz eder, sistematik bir yapıya oturtur ve tekrar kullanıma hazır hale getirir.',
      },
      {
        title: '🌐 Yeni Nesil Çalışma Düzenine Uyum',
        description:
          'Hibrit, uzaktan veya dijital-first modellerde kolaylaştırıcı çözümler üretir.',
      },
    ],
    capabilities: [
      'Stok seviyeleri belirli eşiklerdeyken bildirim sistemleri kurar.',
      'Yapay Zeka Eğitim ve Danışmanlığı sağlar.',
      'Ürün iade / memnuniyet formlarının otomasyonunu gerçekleştirir.',
      'İç chatbot ile çalışanların sık sorduğu sorulara yanıt verir.',
      'Kullanıcıya özel web tabanlı arayüzler oluşturur.',
      'Web sitesi kurulumu ve dijital danışmanlık sunar.',
      'Standart formları dijital ortama taşır ve özelleştirir.',
      'Sosyal medya hesaplarının kurumsallaştırılmasını destekler.',
      'Dijital dinamik kartvizitler tasarlar ve sunar.',
      'Meta Business hesabı kurulumunu gerçekleştirir.',
      'Özel bulut tabanlı sunucu çözümleri geliştirir.',
      'İş süreçlerinizi öğrenerek otomasyon senaryoları üretir.',
      'Dijital altyapı ihtiyaçlarına yaratıcı ve esnek çözümler sunar.',
      'Farklı sektörlere özel dijital ürün ve hizmetler geliştirir.',
      'Ve çok daha fazlası…',
    ],
    videoUrl: 'https://www.youtube.com/embed/cnZqBpW5bdc',
    testQrUrl: 'https://asistan.fokusistatistik.com/fokus999/',
    requestQrUrl: 'https://asistan.fokusistatistik.com/ucretsiz.html',
    packages: [],
    priceNote:
      'FOKUS999, işletmenizin her alanına uyum sağlayan özel bir asistandır. Fiyatlandırma, projenizin kapsamına ve ihtiyaçlarınıza göre belirlenir. Detaylı bilgi ve teklif almak için bizimle iletişime geçin.',
  },
};

export default function AssistantDetail({ params }: { params: { id: string } }) {
  const [session, setSession] = useState<any>(null);
  const [assistant, setAssistant] = useState<AssistantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // localStorage'dan session oku
    const sessionData = localStorage.getItem('fokus520Session');
    if (sessionData) {
      try {
        const parsed = JSON.parse(sessionData);
        setSession(parsed);
      } catch (e) {
        console.error('Session parse error:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Webhook'tan veri çekme denemesi
    const fetchAssistantData = async () => {
      if (!params.id) {
        setIsLoading(false);
        return;
      }

      try {
        const assistantId = params.id.toLowerCase(); // URL'den gelen ID'yi lowercase yap

        const webhookUrl = 'https://n8n.fokusistatistik.com/fokuswebsiteasistanlar';
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            assistantCode: assistantId.toUpperCase(),
            userEmail: session?.email || null,
            userName: session?.user || session?.name || null,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setAssistant(data);
        } else {
          // Webhook başarısız ise statik veriyi kullan
          setAssistant(assistantsData[assistantId] || null);
        }
      } catch (error) {
        // Hata durumunda statik veriyi kullan
        const assistantId = params.id?.toLowerCase() || '';
        setAssistant(assistantsData[assistantId] || null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssistantData();
  }, [params.id]);

  const assistantId = params.id?.toLowerCase() || '';
  const displayAssistant = assistant || assistantsData[assistantId];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#860000] mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (!displayAssistant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Asistan Bulunamadı</h1>
          <p className="text-gray-600 mb-8">
            Aradığınız sanal asistan mevcut değil veya kaldırılmış olabilir.
          </p>
          <Link
            href="/sanalasistanlar"
            className="inline-block bg-[#860000] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#a30000] transition"
          >
            Tüm Asistanları Görüntüle
          </Link>
        </div>
      </div>
    );
  }

  const featureKeys = displayAssistant?.packages?.length > 0
    ? Object.keys(displayAssistant.packages[0].features)
    : [];

  return (
    <div className="min-h-screen flex flex-col">

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
        {displayAssistant?.packages && displayAssistant.packages.length > 0 && (
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
        )}

        {/* Price Note for non-packaged assistants */}
        {displayAssistant?.packages && displayAssistant.packages.length === 0 && displayAssistant.priceNote && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Özel Fiyatlandırma</h2>
                <p className="text-gray-700 leading-relaxed text-center">{displayAssistant.priceNote}</p>
              </div>
            </div>
          </div>
        </section>
        )}
      </main>

      
    </div>
  );
}

