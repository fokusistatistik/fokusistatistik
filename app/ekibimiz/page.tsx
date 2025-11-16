import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Ekibimiz - FOKUS Sanal Asistanlar | 9 Uzman AI Asistan',
  description: 'FOKUS İstatistik\'in 9 farklı alana özel yapay zeka destekli sanal asistanlarıyla tanışın. E-ticaret, müşteri hizmetleri, veri analizi, pazarlama ve daha fazlası.',
  keywords: 'sanal asistan ekibi, yapay zeka asistanları, AI team, FOKUS asistanları',
};

interface Assistant {
  id: string;
  code: string;
  name: string;
  title: string;
  image: string;
  shortDescription: string;
  color: string;
}

const assistants: Assistant[] = [
  {
    id: 'fokus001',
    code: 'FOKUS001',
    name: 'Yönetici Sanal Asistanı',
    title: 'Yönetici Asistanı',
    image: 'https://static.fokusistatistik.com/asistanlar/fokus001.png',
    shortDescription: 'Stok yönetimi, sipariş takibi ve müşteri analiziyle e-ticaret süreçlerinizi optimize eder.',
    color: 'from-[#860000] to-[#a30000]'
  },
  {
    id: 'fokus216',
    code: 'FOKUS216',
    name: 'Müşteri Hizmetleri Sanal Asistanı',
    title: 'Müşteri Hizmetleri',
    image: 'https://static.fokusistatistik.com/asistanlar/fokus216.png',
    shortDescription: 'Müşteri sorularına anında yanıt verir, destek taleplerini yönetir ve memnuniyeti artırır.',
    color: 'from-[#6d0000] to-[#860000]'
  },
  {
    id: 'fokus314',
    code: 'FOKUS314',
    name: 'Veri Analisti Sanal Asistanı',
    title: 'Veri Analisti',
    image: 'https://static.fokusistatistik.com/asistanlar/fokus314.png',
    shortDescription: 'Verilerinizi analiz eder, görselleştirir ve stratejik kararlar için raporlar sunar.',
    color: 'from-[#a30000] to-[#b30000]'
  },
  {
    id: 'fokus520',
    code: 'FOKUS520',
    name: 'Pazarlama Sanal Asistanı',
    title: 'Pazarlama & Lead Takip',
    image: 'https://static.fokusistatistik.com/asistanlar/fokus520.png',
    shortDescription: 'Kampanya yönetimi, lead takibi ve müşteri skorlamasıyla pazarlama süreçlerinizi otomatikleştirir.',
    color: 'from-[#860000] to-[#6d0000]'
  },
  {
    id: 'fokus618',
    code: 'FOKUS618',
    name: 'Finans Sanal Asistanı',
    title: 'Finans & Fatura',
    image: 'https://static.fokusistatistik.com/asistanlar/fokus618.png',
    shortDescription: 'Fatura işlemleri, gelir-gider takibi ve ödeme hatırlatmalarını otomatik yönetir.',
    color: 'from-[#5a0000] to-[#860000]'
  },
  {
    id: 'fokus707',
    code: 'FOKUS707',
    name: 'İnsan Kaynakları Sanal Asistanı',
    title: 'İnsan Kaynakları',
    image: 'https://static.fokusistatistik.com/asistanlar/fokus707.png',
    shortDescription: 'Personel takibi, özlük dosyaları, izin yönetimi ve işe alım süreçlerini dijitalleştirir.',
    color: 'from-[#a30000] to-[#860000]'
  },
  {
    id: 'fokus717',
    code: 'FOKUS717',
    name: 'İçerik Tasarımı Sanal Asistanı',
    title: 'İçerik Tasarımı',
    image: 'https://static.fokusistatistik.com/asistanlar/fokus717.png',
    shortDescription: 'Görsel içerik, video ve sunum oluşturarak yaratıcı süreçlerinizi hızlandırır.',
    color: 'from-[#6d0000] to-[#a30000]'
  },
  {
    id: 'fokus808',
    code: 'FOKUS808',
    name: 'Sosyal Medya Sanal Asistanı',
    title: 'Sosyal Medya & İletişim',
    image: 'https://static.fokusistatistik.com/asistanlar/fokus808.png',
    shortDescription: 'Sosyal medya yönetimi, içerik planlaması ve etkileşim analiziyle dijital varlığınızı güçlendirir.',
    color: 'from-[#b30000] to-[#860000]'
  },
  {
    id: 'fokus999',
    code: 'FOKUS999',
    name: 'Joker Sanal Asistan',
    title: 'Joker Asistan',
    image: 'https://static.fokusistatistik.com/asistanlar/fokus999.png',
    shortDescription: 'İşletmenizin her alanına uyum sağlayan, özelleştirilebilir dijital destek.',
    color: 'from-[#860000] to-[#b30000]'
  }
];

export default function Ekibimiz() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            FOKUS Sanal Asistan Ekibi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            9 farklı alana özel, yapay zeka destekli sanal asistanlarımızla
            <br />
            işletmenizin tüm süreçlerini otomatikleştirin
          </p>
        </section>

        {/* Assistants Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {assistants.map((assistant) => (
            <Link
              key={assistant.id}
              href={`/sanalasistanlar/${assistant.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-2">
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${assistant.color} p-6 text-white`}>
                  <div className="relative w-24 h-24 mx-auto mb-4 transform group-hover:scale-110 transition-transform">
                    <Image
                      src={assistant.image}
                      alt={assistant.name}
                      fill
                      className="object-contain rounded-full"
                    />
                  </div>
                  <div className="text-sm font-semibold text-center opacity-90">
                    {assistant.code}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#860000] transition-colors">
                    {assistant.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {assistant.title}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {assistant.shortDescription}
                  </p>
                  <div className="flex items-center text-[#860000] font-semibold text-sm group-hover:translate-x-2 transition-transform">
                    Detaylı İncele →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-[#860000] to-[#a30000] rounded-2xl shadow-xl p-8 md:p-12 text-white mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Sanal Asistanlarımızın Gücü
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">9</div>
              <div className="text-lg opacity-90">Uzman Asistan</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">7/24</div>
              <div className="text-lg opacity-90">Kesintisiz Hizmet</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-lg opacity-90">Özellik</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">∞</div>
              <div className="text-lg opacity-90">Ölçeklenebilir</div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nasıl Çalışır?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#860000] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">İhtiyaçlarınız Tespit Edilir</h3>
              <p className="text-gray-600">
                İşletmenizin ihtiyaçları analiz edilir ve size özel çözümler belirlenir
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#860000] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">En Uygun Asistanlar Seçilir</h3>
              <p className="text-gray-600">
                İhtiyaçlarınıza göre en uygun FOKUS asistanları önerilir ve yapılandırılır
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#860000] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Asistanlar Uygulanır</h3>
              <p className="text-gray-600">
                Kurulum ve entegrasyon desteğiyle asistanlarınız hızla devreye alınır
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Hangi Asistan İşinize Yarar?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Ücretsiz analiz formunu doldurun, size özel asistan önerilerimizi alın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/analiz-formu"
              className="bg-[#860000] hover:bg-[#b30000] text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Ücretsiz Analiz Talep Edin
            </Link>
            <a
              href="https://asistan.fokusistatistik.com/ucretsiz.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-8 rounded-lg transition-all"
            >
              Demo Talep Edin
            </a>
            <Link
              href="/iletisim"
              className="bg-transparent border-2 border-[#860000] text-[#860000] hover:bg-[#860000] hover:text-white font-semibold py-4 px-8 rounded-lg transition-all"
            >
              İletişime Geçin
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
