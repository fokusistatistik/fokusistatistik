'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function SanalAsistanlar() {
  const assistants = [
    {
      code: 'fokus001',
      name: 'FOKUS001',
      title: 'Yönetici Sanal Asistanı',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus001.png',
    },
    {
      code: 'fokus216',
      name: 'FOKUS216',
      title: 'Müşteri Hizmetleri Sanal Asistanı',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus216.png',
    },
    {
      code: 'fokus314',
      name: 'FOKUS314',
      title: 'Veri Analisti Sanal Asistanı',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus314.png',
    },
    {
      code: 'fokus520',
      name: 'FOKUS520',
      title: 'Pazarlama & Lead Takip Sanal Asistanı',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus520.png',
    },
    {
      code: 'fokus618',
      name: 'FOKUS618',
      title: 'Finans & Fatura Sanal Asistanı',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus618.png',
    },
    {
      code: 'fokus707',
      name: 'FOKUS707',
      title: 'İnsan Kaynakları Sanal Asistanı',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus707.png',
    },
    {
      code: 'fokus717',
      name: 'FOKUS717',
      title: 'İçerik Tasarımı Sanal Asistanı',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus717.png',
    },
    {
      code: 'fokus808',
      name: 'FOKUS808',
      title: 'Sosyal Medya & İletişim Sanal Asistanı',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus808.png',
    },
    {
      code: 'fokus999',
      name: 'FOKUS999',
      title: 'Joker Sanal Asistan',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus999.png',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Banner */}
      <div className="w-full px-4">
        <div className="w-full relative overflow-hidden rounded-xl">
          <Image
            src="https://static.fokusistatistik.com/resimler/bannerasistanlar.png"
            alt="FOKUS Asistanları Banner"
            width={1920}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Metal Yakalı İşçiler Nedir */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#860000] text-center mb-4">
          Metal Yakalı İşçiler Nedir?
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-700 text-center mb-8">
          Yeni Nesil Çalışanlar: Sanal Asistanlar
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p className="text-lg mb-6">
            <strong>"Beyaz yakalı planlar, mavi yakalı üretir. Peki, metal yakalılar ne yapar?"</strong>
            <br />
            Metal yakalı çalışanlar, insan gibi görev yapan ancak bir yazılım olarak çalışan dijital asistanlardır.
            Ofiste masa başında değil, bulutta görev alırlar. Karmaşık veri yapıları, manuel iş akışları ve yetersiz
            analizler zamanınızı ve kaynaklarınızı tüketirken, doğru teknoloji ve yöntemlerle bunları avantaja
            dönüştürmek mümkündür. Bizimle tanışın, dijital çağda öne geçmenin yollarını birlikte keşfedelim.
          </p>
          <p className="text-lg font-semibold mb-3">Temel özellikleri:</p>
          <ul className="space-y-2 mb-6">
            <li>Kodla çalışır, arayüzle etkileşir.</li>
            <li>İşletmenize özel olarak programlanır.</li>
            <li>Kendi yazılımlarınızla, Web, e-posta, form, CRM, WhatsApp, Google Sheets gibi araçlarla entegre çalışır.</li>
            <li>Görev dağılımı net, hata oranı düşüktür.</li>
            <li>Uygulamak için teknik bir bilgi gerektirmez.</li>
          </ul>
        </div>
      </section>

      {/* Metal Yakalı Avantajları */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Metal Yakalı Çalışanların Avantajları
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-[#860000]">🕒 7/24 Kesintisiz Çalışma</h3>
              <p className="text-gray-700">Gece-gündüz, hafta sonu ve tatil fark etmeksizin sürekli görev başındadır.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-[#860000]">💸 Düşük Maliyet</h3>
              <p className="text-gray-700">SGK, yemek, yol ve izin gibi giderler olmadan dijital büyümeyi destekler.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-[#860000]">📚 Öğrenmeye Açıklık</h3>
              <p className="text-gray-700">Yeni görevleri kolayca öğrenir ve hızla uygulamaya geçer.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-[#860000]">🔋 Yorulmaz ve Ara Vermez</h3>
              <p className="text-gray-700">Mola veya motivasyon ihtiyacı olmadan sabit verim sağlar.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-[#860000]">🤝 Takım Çalışmasına Uyum</h3>
              <p className="text-gray-700">Yazılımlar ve insan personel ile senkronize biçimde çalışır.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-[#860000]">🌟 Müşteri Memnuniyetini Artırır</h3>
              <p className="text-gray-700">Anında yanıt, net bilgi ve kişisel etkileşim ile kullanıcı deneyimini güçlendirir.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-[#860000]">⚡ Hızlı ve Verimli</h3>
              <p className="text-gray-700">Saatler sürecek işlemleri dakikalar içinde tamamlayarak zaman kazandırır.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-[#860000]">📊 Kolay Yönetim</h3>
              <p className="text-gray-700">Otomatik raporlar ve kontrol paneli ile süreci kolayca takip edersiniz.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-[#860000]">📈 Ölçeklenebilirlik</h3>
              <p className="text-gray-700">Talebe göre kolayca artırılıp azaltılabilir esnek altyapı sunar.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-[#860000]">💼 Kârlılığı Artırır</h3>
              <p className="text-gray-700">İş gücü maliyetlerini azaltırken iş hacmini artırır; böylece net kazancı yükseltir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* İşin Geleceği */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-[#860000] text-center mb-4">
          💼 İşin Geleceği: İnsan + Sanal Asistan İşbirliği
        </h2>
        <h3 className="text-xl md:text-2xl text-gray-700 text-center mb-8">
          Dijital Dönüşümde İnsan–Yapay Zekâ İşbirliği Başlıyor
        </h3>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-center">
          <p className="text-lg">
            <strong>Yapay zekâ insanın yerini almaz, insanı tamamlar.</strong><br />
            Rutin işleri dijital asistanlar yürütürken, insan çalışanlar strateji, ilişki, karar gibi alanlara
            odaklanabilir. Yapay zekâ destekli <strong>FOKUS Asistanları</strong>, işletmenizi dijital geleceğe hazırlar.
            İnsan gücüyle dijital zekânın birleştiği bu yeni iş modelinde, işlerinizi <strong>hızla, verimli ve hatasız</strong>
            bir şekilde yürütmeniz mümkün.
          </p>
        </div>
      </section>

      {/* FOKUS Sanal Asistanlarımızı Tanıyın Başlık */}
      <div className="bg-[#860000] py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
          FOKUS SANAL ASİSTANLARIMIZI TANIYIN
        </h2>
      </div>

      {/* Asistanlar Grid */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <h2 className="text-3xl font-bold text-[#860000] text-center mb-12">
          FOKUS Sanal Asistanlarımız
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assistants.map((assistant) => (
            <Link
              key={assistant.code}
              href={`/sanalasistanlar/${assistant.code}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group border border-gray-200 hover:border-[#860000]"
            >
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={assistant.image}
                  alt={assistant.title}
                  fill
                  className="object-contain p-4 rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg text-[#860000] mb-1">{assistant.name}</h3>
                <p className="text-gray-600 text-sm">{assistant.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Dijital Asistanlarla Rekabet Avantajı */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Dijital Asistanlarla Rekabet Avantajı Sağlayın
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700"><strong>Maliyetleri düşürün:</strong> Tekrarlayan görevleri yapay zekaya devrederek operasyonel giderleri azaltın.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700"><strong>Zamandan kazanın:</strong> Otomasyon sayesinde süreçler hızlansın, insan kaynağınız daha verimli kullanılsın.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700"><strong>Hataları en aza indirin:</strong> Yapay zekâ tabanlı sistemlerle insan hatalarını minimuma düşürün.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700"><strong>Süreçleri otomatikleştirin:</strong> Satıştan müşteri ilişkilerine kadar tüm iş akışlarını tek merkezden yönetin.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700"><strong>7/24 çalışan sistem kurun:</strong> Dijital asistanlarınız vardiya kavramını ortadan kaldırır, kesintisiz hizmet sağlar.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700"><strong>Takım uyumunu artırın:</strong> Yapay zekâ destekli asistanlar, ekip içinde rol dağılımını dengeler ve iş birliğini güçlendirir.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700"><strong>Kişiselleştirilmiş müşteri deneyimi sunun:</strong> Formlar, butonlar yerine akıllı etkileşimlerle müşteri memnuniyetini artırın.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700"><strong>Teknolojik bir marka imajı oluşturun:</strong> Dijital dönüşümünüzü FOKUS ile görünür kılın, sektörde fark yaratın.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700"><strong>Modüler sistem kurun:</strong> 9 farklı asistandan istediklerinizi kullanabilir, ihtiyacınıza göre ödeme yaparsınız.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Her İhtiyaca Uygun Paketler */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Her İhtiyaca Uygun Paketler
        </h2>
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#860000]">
            <h3 className="text-xl font-semibold mb-3 text-[#860000]">Standart, Pro ve Premium Paketler 📦</h3>
            <p className="text-gray-700 mb-4">
              FOKUS Dijital Asistanları; küçük işletmelerden kurumsal firmalara kadar geniş bir yelpazeye hitap eden
              üç farklı paketle sunulur: <strong>Standart</strong>, <strong>Pro</strong> ve <strong>Premium</strong>.
              Bu esnek yapıyla ister başlangıç seviyesinde olun, ister ileri düzey dijital çözümler arıyor olun,
              size uygun bir model mutlaka vardır.
            </p>
            <p className="text-gray-700">
              İster girişimci, ister yönetici olun; biz işinize özel, hedef odaklı çözümler üretiriz.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#860000]">
            <h3 className="text-xl font-semibold mb-3 text-[#860000]">Modüler Yapı – Kendi Ekibinizi Kurun 🔧</h3>
            <p className="text-gray-700">
              FOKUS Asistanları modüler bir yapıda tasarlanmıştır. Yani işletmenizin ihtiyacına göre sadece bir
              asistanla başlayabilir ya da birden fazla asistanı entegre ederek kendi dijital ekibinizi oluşturabilirsiniz.
              Her bir asistan, belirli bir iş sürecine odaklanır. Böylece birlikte çalışarak verimliliği artırır,
              sizi karmaşıklıktan kurtarır.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#860000]">
            <h3 className="text-xl font-semibold mb-3 text-[#860000]">Kolektif Güç – Entegre Yapay Zeka Ekibi 🤝</h3>
            <p className="text-gray-700 mb-4">
              FOKUS Asistanları birbirinin verisini ve çıktısını paylaşabilen bir yapıya sahiptir. Bu sayede sistem
              içi tam senkronizasyon sağlanır. Sonuç olarak:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-[#860000] font-bold">⚡</span>
                Daha hızlı işlemler
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#860000] font-bold">🙅</span>
                Daha az insan müdahalesi
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#860000] font-bold">😊</span>
                Yüksek müşteri memnuniyeti
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#860000] font-bold">📉</span>
                Daha fazla verim – daha az maliyet
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#860000]">
            <h3 className="text-xl font-semibold mb-3 text-[#860000]">Esnek ve Ölçeklenebilir Sistem 🔄</h3>
            <p className="text-gray-700">
              Bugün iki asistanla başlayabilir, ihtiyaçlarınıza göre sayıyı artırabilirsiniz. FOKUS ekosistemi,
              büyüyen işletmeler için kolayca ölçeklenebilen bir yapıya sahiptir. Bu sayede sisteminiz sizinle
              birlikte gelişir, gereksiz yatırımlardan kaçınırsınız ve her adımda kontrol sizde olur.
            </p>
          </div>
        </div>
      </section>

      {/* Nasıl Kurulur */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Nasıl Kurulur?
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#860000]">
              <h3 className="text-xl font-semibold mb-3 text-[#860000]">1. İhtiyacınızı Belirleyin 🎯</h3>
              <p className="text-gray-700">
                Müşteri hizmetleri mi, randevu takibi mi, pazarlama otomasyonu mu? Öncelikle neye ihtiyaç duyduğunuzu
                belirlemeniz yeterli. Biz bu ihtiyaca en uygun FOKUS Asistanını sizin için öneriyoruz.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#860000]">
              <h3 className="text-xl font-semibold mb-3 text-[#860000]">2. Entegrasyon Haritası Çıkartıyoruz 🗺️</h3>
              <p className="text-gray-700">
                Kullandığınız sistemleri (Google Sheets, WhatsApp, Web formlar, CRM, sosyal medya kanalları vb.)
                analiz ediyoruz. Ardından bu araçlarla dijital asistanınızın nasıl entegre çalışacağını planlıyoruz.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#860000]">
              <h3 className="text-xl font-semibold mb-3 text-[#860000]">3. Özelleştirme ve Kurumsal Uyarlama 🧩</h3>
              <p className="text-gray-700">
                Sanal asistanınız markanıza özel hale getirilir. İsimlendirme, dil tonu, kullanıcı senaryoları gibi
                tüm alanlar kişiselleştirilir. Kurumsal kimliğinizle bütünleşik bir yapı sunulur.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#860000]">
              <h3 className="text-xl font-semibold mb-3 text-[#860000]">4. Test ve Yayına Alma 🧪</h3>
              <p className="text-gray-700">
                Yayın öncesinde hem teknik hem kullanıcı deneyimi açısından kapsamlı test süreçleri yürütülür.
                Sizden gelen geri bildirimler alınarak asistanınız son hâline getirilir ve yayınlanır.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#860000]">
              <h3 className="text-xl font-semibold mb-3 text-[#860000]">5. Sürekli Gelişim ve Destek 🚀</h3>
              <p className="text-gray-700">
                Asistan yayına alındıktan sonra da yalnız kalmaz. Kullanım verileri analiz edilir, senaryolar optimize
                edilir, kurumsal dökümanlarla sürekli beslenir. Geri bildirimlerinize göre güncellemeler yapılır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Butonlar */}
      <section className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-8 text-[#860000]">
          Hazırsanız, bugün başlayabiliriz!
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <div className="flex flex-col items-center">
            <a
              href="/analiz-formu"
              className="bg-[#860000] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#a30000] transition shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Analiz Yap
            </a>
            <p className="text-sm text-gray-600 mt-2">2 dakikada ücretsiz ihtiyaç analizini yapın</p>
          </div>
          <div className="flex flex-col items-center">
            <a
              href="https://asistan.fokusistatistik.com/ucretsiz.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#860000] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#a30000] transition shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Demo Talep Et
            </a>
            <p className="text-sm text-gray-600 mt-2">1 ay ücretsiz demo talebinde bulunun</p>
          </div>
        </div>
      </section>
    </main>
  );
}
