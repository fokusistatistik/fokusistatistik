import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Neden Biz? | FOKUS İstatistik - Yapay Zeka ve Veri Bilimi ile İşinizi Geleceğe Taşıyın',
  description: 'FOKUS İstatistik olarak yapay zeka destekli dijital çözümlerimizle veri bilimi alanında fark yaratıyoruz. 22 yıllık deneyim, yenilikçi teknolojiler ve müşteri odaklı stratejilerle işinizi geleceğe taşıyın.',
  keywords: 'FOKUS İstatistik, neden biz, yapay zeka, veri bilimi, dijital dönüşüm, otomasyon, iş analitiği, stratejik veri yönetimi, Power BI, GPT, Python',
  openGraph: {
    title: 'Neden Biz? | FOKUS İstatistik',
    description: 'FOKUS İstatistik\'in neden tercih edildiğini keşfedin. Deneyim, teknoloji, etik ve müşteri odaklı çözümlerle işinizi bir adım öteye taşıyoruz.',
    images: ['/assets/img/nedenbiz1.jpg'],
    locale: 'tr_TR',
    type: 'website',
  }
};

interface ReasonItem {
  image: string;
  title: string;
  description: string;
  result: string;
}

const reasons: ReasonItem[] = [
  {
    image: '/assets/img/nedenbiz1.jpg',
    title: 'Veriyi Stratejik Bir Araca Dönüştürüyoruz',
    description: 'FOKUS olarak veriye sadece teknik bir çıktı olarak bakmıyoruz. Her veri noktasını kurum hedeflerinizle entegre eden, operasyonel aksiyonları besleyen ve yönetime stratejik yol gösteren bir karar aracına dönüştürüyoruz.',
    result: 'Sadece veri değil, vizyon kazanırsınız.'
  },
  {
    image: '/assets/img/nedenbiz2.jpg',
    title: 'Kamu ve Gerçek Saha Deneyimiyle Uygulanabilir Çözümler Üretiyoruz',
    description: 'Sağlık ve yerel yönetimler başta olmak üzere çeşitli kamu kurumlarında gerçekleştirdiğimiz projeler sayesinde, karmaşık yapılarda çalışan, gerçek ihtiyaçlara dayalı uygulanabilir çözümler geliştirme yetkinliği kazandık.',
    result: 'Hazır reçeteler değil, kurumunuza özel sistemler.'
  },
  {
    image: '/assets/img/nedenbiz5.jpg',
    title: 'Ölçülebilir Fayda ve Sürdürülebilir Etki Odaklıyız',
    description: 'Her proje başlangıcında "ne kazandıracak?" sorusunu netleştirir, sonunda bu kazanımları somutlaştırır ve periyodik olarak raporlarız. Zaman tasarrufu, iş gücü verimliliği, veri kaybı azalması, operasyon hızı, kaynak optimizasyonu gibi somut çıktılarla projelerimizi yönetiriz.',
    result: 'Sözde değil, veriye dayalı fayda garantisi.'
  },
  {
    image: '/assets/img/nedenbiz6.jpg',
    title: 'Gizlilik, Etik ve Hukuki Çerçevede Çalışırız',
    description: 'Tüm veri süreçlerimizi, Kişisel Verilerin Korunması Kanunu (KVKK), istatistik meslek etiği ilkeleri ve kurumsal danışmanlık protokolleri çerçevesinde yürütüyoruz. Verinizin güvenliği ve etik kullanımı bizim için temel bir ilkedir.',
    result: 'Endişesiz iş birliği, tam güven ortamı.'
  },
  {
    image: '/assets/img/nedenbiz7.jpg',
    title: 'Etkileyici Sunum ve Görsel İletişimle Fark Yaratırız',
    description: 'En güçlü analiz bile iyi anlatılamıyorsa etkisizdir. FOKUS, veriyi yalnızca doğru analiz etmez; onu etkileyici sunumlar, infografikler ve stratejik iletişim içerikleriyle karar vericilere aktarır. PowerPoint, görsel dil, raporlama standardizasyonu gibi araçlarla iletişimi güçlendiririz.',
    result: 'Veriyle yalnızca bilgilendirme değil, ikna da sağlarsınız.'
  },
  {
    image: '/assets/img/nedenbiz8.jpg',
    title: 'İşletme Ölçeğiniz Ne Olursa Olsun Yanınızdayız',
    description: 'İster tek kişilik bir girişim, ister yüzlerce personelli bir kurum, ister on binlerce çalışanı olan bir holding olun — FOKUS, veri odaklı çözümlerini ölçek farkı gözetmeden ihtiyaçlarınıza özel tasarlar. Analiz altyapılarımız, danışmanlık metodolojilerimiz ve görsel iletişim sistemlerimiz her ölçekte esnek çalışabilir.',
    result: 'Bütçenize, kapasitenize ve vizyonunuza uygun özelleştirilmiş veri çözümleri.'
  },
  {
    image: '/assets/img/nedenbiz9.jpg',
    title: 'Yenilikçi ve Gelecek Odaklı Yaklaşımlar Sunarız',
    description: 'FOKUS, sadece bugünü değil yarını da hesap eder. Stratejik öngörü, teknolojik yakınsama ve geleceğe hazır çözümler üretiriz.',
    result: 'Zamanın ilerisinde pozisyon alırsınız.'
  },
  {
    image: '/assets/img/nedenbiz10.jpg',
    title: 'Sanal ve Gerçek Kişilerle 7/24 Erişilebilir Destek Sunarız',
    description: 'Hem gerçek danışmanlarımız hem de sanal asistanlarımızla kesintisiz iletişim sunarız.',
    result: 'Sorularınız cevapsız, ihtiyaçlarınız karşılıksız kalmaz.'
  },
  {
    image: '/assets/img/nedenbiz11.jpg',
    title: 'Akademiden Gelen Bilimsel Güçle Hareket Ederiz',
    description: 'İstatistik ve veri bilimi kökenli ekibimiz sayesinde projelerinize bilimsel yöntemlerle yaklaşırız.',
    result: 'Deney değil, doğrulanabilir ve tekrarlanabilir çözümler.'
  },
  {
    image: '/assets/img/nedenbiz12.jpg',
    title: 'Sizinle Birlikte Öğrenir, Geliştirir, Uygularız',
    description: 'Yalnızca bir hizmet sağlayıcı değil, birlikte düşünen ve üreten bir çözüm ortağıyız.',
    result: 'Sadece hizmet değil, stratejik ortaklık kazanırsınız.'
  },
  {
    image: '/assets/img/nedenbiz13.jpg',
    title: 'Ücretsiz Demo ve Pilot Uygulama İmkânları Sunarız',
    description: 'Projeye başlamadan önce örnek bir senaryoyla sistemi test etmenizi sağlıyoruz.',
    result: 'Kararsızlık değil, deneyimleyerek karar verme imkânı.'
  },
  {
    image: '/assets/img/nedenbiz14.jpg',
    title: '22 Yıllık Deneyim, Dinamik Yaklaşım ile Buluşuyoruz',
    description: 'Deneyim ile dinamizmi buluşturan hibrit bir bakış açısıyla çalışıyoruz.',
    result: 'Ne gençlik hataları ne de eski alışkanlıklar; sadece verimli çözümler.'
  },
  {
    image: '/assets/img/nedenbiz15.jpg',
    title: 'Her Projeye Özgü Tasarım, Her Kuruma Özgü Yaklaşım Sunarız',
    description: 'Hazır şablonlarla ilerlemeyiz; sizin için en baştan, sizin dilinizle düşünürüz. Yeni ve karmaşık sistemler dayatmak yerine, hâlihazırda kullandığınız düzeni esas alır, onun üzerinden otomasyonu geliştiririz. Böylece hem alışık olduğunuz yapıyı bozmamış oluruz, hem de teknolojinin gücünü arka planda size hissettirmeden işler hâle getiririz.',
    result: 'Sizin gibi düşünen, size özel ve uyumlu sistemlerle hızlıca adapte olur, farkı kısa sürede hissetmeye başlarsınız.'
  }
];

export default function NedenBiz() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#860000] mb-12">
          Neden FOKUS?
        </h1>

        <div className="space-y-12">
          {reasons.map((reason, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              itemScope
              itemType="https://schema.org/Service"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image */}
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={reason.image}
                    alt={reason.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h2
                    className="text-xl md:text-2xl font-bold text-gray-900 mb-4"
                    itemProp="name"
                  >
                    {reason.title}
                  </h2>
                  <p
                    className="text-gray-700 mb-4 leading-relaxed"
                    itemProp="description"
                  >
                    {reason.description}
                  </p>
                  <p className="text-[#860000] font-semibold">
                    <strong>Sonuç:</strong> {reason.result}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-[#860000] to-[#a30000] rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Dijital Dönüşüm Yolculuğunuza Başlayın
          </h2>
          <p className="text-lg mb-6 opacity-90">
            22 yıllık deneyimimiz ve yenilikçi çözümlerimizle yanınızdayız
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/iletisim"
              className="bg-white text-[#860000] hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              İletişime Geçin
            </a>
            <a
              href="/analiz-formu"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#860000] font-semibold py-3 px-8 rounded-lg transition-all"
            >
              Ücretsiz Analiz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
