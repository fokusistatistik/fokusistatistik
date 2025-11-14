import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Hakkımızda | FOKUS İstatistik - Veri Bilimi ve Yapay Zeka Çözümleri',
  description: '22 yıllık deneyim ile veri bilimi, istatistik ve yapay zeka alanında öncü çözümler sunuyoruz. Akademik kökenli ekibimiz ve müşteri odaklı yaklaşımımızla yanınızdayız.',
  keywords: 'FOKUS İstatistik, hakkımızda, veri bilimi, istatistik, yapay zeka, sanal asistan, kurumsal kimlik',
};

export default function Hakkimizda() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="content-container">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="relative w-40 h-40 mx-auto">
              <Image
                src="https://static.fokusistatistik.com/logolar/fokuslogo1.png"
                alt="FOKUS Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            FOKUS İstatistik
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Veri Bilimi ve Yapay Zeka ile İşletmenizi Geleceğe Taşıyoruz
          </p>
        </section>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Kimiz Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#860000] mb-6">Biz Kimiz?</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>FOKUS İstatistik</strong>, 22 yıllık deneyimi ile veri bilimi, istatistik ve yapay zeka
                alanında öncü çözümler sunan bir teknoloji ve danışmanlık firmasıdır.
              </p>
              <p>
                Akademik kökenli uzman ekibimiz, istatistik ve veri bilimi disiplinlerinden gelen derinlemesine
                bilgi birikimini, günümüzün en gelişmiş yapay zeka teknolojileriyle birleştirerek işletmelere
                özel, ölçülebilir ve sürdürülebilir dijital çözümler geliştirmektedir.
              </p>
              <p>
                Kamu kurumları ve özel sektörde gerçekleştirdiğimiz yüzlerce proje ile edindiğimiz deneyimi,
                müşterilerimize değer katan, sonuç odaklı hizmetlere dönüştürüyoruz.
              </p>
            </div>
          </div>

          {/* Misyon Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#860000] mb-6">Misyonumuz</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Veriyi sadece bir çıktı olarak değil, <strong>stratejik bir karar aracı</strong> olarak gören
                anlayışımızla, işletmelerin dijital dönüşüm yolculuğunda güvenilir iş ortağı olmak.
              </p>
              <p>
                Her ölçekteki işletmenin veri odaklı, otomasyon destekli ve yapay zeka ile güçlendirilmiş
                süreçlere erişimini demokratikleştirmek.
              </p>
              <p>
                Müşterilerimize <strong>etik</strong>, <strong>şeffaf</strong> ve <strong>ölçülebilir</strong> çözümler
                sunarak, teknolojinin gücünü insan merkezli bir yaklaşımla birleştirmek.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-[#860000] text-center mb-12">Değerlerimiz</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#860000] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                🎯
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sonuç Odaklılık</h3>
              <p className="text-gray-600">
                Somut, ölçülebilir ve sürdürülebilir sonuçlar üretmeyi öncelik ediniyoruz.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#860000] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                🔬
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bilimsel Yaklaşım</h3>
              <p className="text-gray-600">
                İstatistik ve veri bilimi temelli, doğrulanabilir yöntemlerle çalışırız.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#860000] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                🔐
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Etik ve Güvenlik</h3>
              <p className="text-gray-600">
                KVKK uyumlu, etik kurallara bağlı ve güvenli veri yönetimi uygularız.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#860000] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                💡
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Yenilikçilik</h3>
              <p className="text-gray-600">
                En güncel teknolojileri takip eder, geleceğe yönelik çözümler geliştiririz.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#860000] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                🤝
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Müşteri Odaklılık</h3>
              <p className="text-gray-600">
                Sizinle birlikte düşünür, ihtiyaçlarınıza özel çözümler üretiriz.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#860000] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                📊
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Şeffaflık</h3>
              <p className="text-gray-600">
                Tüm süreçlerimizi açık, anlaşılır ve raporlanabilir şekilde yürütürüz.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="bg-gradient-to-r from-[#860000] to-[#a30000] rounded-2xl shadow-lg p-8 md:p-12 text-white mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Neler Yapıyoruz?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="text-3xl">🤖</span> Sanal Asistan Çözümleri
              </h3>
              <p className="text-gray-100 mb-4">
                9 farklı alana özel sanal asistanlarımızla iş süreçlerinizi otomatikleştirin:
              </p>
              <ul className="space-y-2 text-gray-100">
                <li>• E-Ticaret Yönetimi</li>
                <li>• Müşteri Hizmetleri</li>
                <li>• Veri Analizi ve İstatistik</li>
                <li>• Pazarlama Otomasyonu</li>
                <li>• İnsan Kaynakları</li>
                <li>• Satış Süreçleri</li>
                <li>• İçerik Tasarımı</li>
                <li>• Sosyal Medya Yönetimi</li>
                <li>• Joker Asistan (Özel Çözümler)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="text-3xl">📈</span> Veri Bilimi Danışmanlığı
              </h3>
              <p className="text-gray-100 mb-4">
                22 yıllık deneyimimizle veri odaklı dönüşüm:
              </p>
              <ul className="space-y-2 text-gray-100">
                <li>• Stratejik veri analizi ve raporlama</li>
                <li>• İstatistiksel modelleme</li>
                <li>• Tahminleme ve senaryo analizi</li>
                <li>• Power BI, Python, R ile dashboard'lar</li>
                <li>• Performans takip sistemleri</li>
                <li>• KPI tanımlama ve ölçümleme</li>
                <li>• Veri görselleştirme ve sunum</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="text-3xl">⚙️</span> Otomasyon ve Entegrasyon
              </h3>
              <p className="text-gray-100 mb-4">
                İş süreçlerinizi otomatikleştirin:
              </p>
              <ul className="space-y-2 text-gray-100">
                <li>• RPA (Robotic Process Automation)</li>
                <li>• Workflow otomasyonu (n8n, Make)</li>
                <li>• API geliştirme ve entegrasyon</li>
                <li>• QR/Barkod tabanlı sistemler</li>
                <li>• E-posta ve bildirim otomasyonu</li>
                <li>• Chatbot ve sesli asistanlar</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="text-3xl">🎓</span> Eğitim ve Destek
              </h3>
              <p className="text-gray-100 mb-4">
                Ekiplerinizi güçlendirin:
              </p>
              <ul className="space-y-2 text-gray-100">
                <li>• Yapay zeka ve veri bilimi eğitimleri</li>
                <li>• Power BI ve Excel ileri seviye</li>
                <li>• İstatistik ve analiz teknikleri</li>
                <li>• Teknik dokümantasyon</li>
                <li>• 7/24 teknik destek</li>
                <li>• Ücretsiz demo ve pilot uygulamalar</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-4xl font-bold text-[#860000] mb-2">22+</div>
            <div className="text-gray-600">Yıllık Deneyim</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-4xl font-bold text-[#860000] mb-2">9</div>
            <div className="text-gray-600">Sanal Asistan</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-4xl font-bold text-[#860000] mb-2">100+</div>
            <div className="text-gray-600">Başarılı Proje</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-4xl font-bold text-[#860000] mb-2">7/24</div>
            <div className="text-gray-600">Destek Hizmeti</div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Dijital Dönüşüm Yolculuğunuza Başlamaya Hazır mısınız?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            22 yıllık deneyimimiz, akademik kökenli ekibimiz ve yenilikçi çözümlerimizle
            işletmenizi geleceğe taşımak için yanınızdayız.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/iletisim"
              className="bg-[#860000] hover:bg-[#b30000] text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Hemen İletişime Geçin
            </a>
            <a
              href="/analiz-formu"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-8 rounded-lg transition-all"
            >
              Ücretsiz Analiz Talep Edin
            </a>
            <a
              href="/neden-biz"
              className="bg-transparent border-2 border-[#860000] text-[#860000] hover:bg-[#860000] hover:text-white font-semibold py-4 px-8 rounded-lg transition-all"
            >
              Neden FOKUS?
            </a>
          </div>
        </section>

        {/* Footer Quote */}
        <div className="mt-12 text-center">
          <blockquote className="text-xl italic text-gray-600 max-w-3xl mx-auto">
            "Veriyi stratejiye, teknolojiyi değere, deneyimi güvene dönüştürüyoruz."
            <br />
            <span className="text-[#860000] font-semibold">– FOKUS İstatistik</span>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
