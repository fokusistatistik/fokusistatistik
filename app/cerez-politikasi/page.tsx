import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Çerez Politikamız | FOKUS İstatistik',
  description: 'FOKUS İstatistik olarak çerez politikamıza uygun olarak kullanıcı gizliliğine önem veriyor, verilerinizi yasal çerçevede koruyoruz.',
  keywords: 'çerez politikası, cookie policy, kvkk, gizlilik, veri koruma, web sitesi çerezleri',
};

export default function CerezPolitikasi() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#860000] mb-8">
            FOKUS İstatistik Çerez (Cookie) Politikası
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              FOKUS İstatistik olarak internet sitemizi ziyaret eden kullanıcılarımızın deneyimlerini iyileştirmek,
              içeriklerimizi kişiselleştirmek ve web trafiğimizi analiz etmek amacıyla çerezlerden faydalanmaktayız.
              Bu politika, hangi tür çerezlerin hangi amaca hizmet ettiğini açıklamak için hazırlanmıştır.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">Çerez Nedir?</h2>
            <p>
              Çerezler (cookies), ziyaret ettiğiniz web siteleri tarafından tarayıcınız aracılığıyla cihazınızda
              depolanan küçük metin dosyalarıdır. Bu dosyalar sayesinde site içindeki gezintiniz hatırlanabilir
              ve deneyiminiz kişiselleştirilebilir.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">Kullandığımız Çerez Türleri</h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <strong>Kesinlikle Gerekli Çerezler:</strong> Web sitemizin çalışması için zorunludur.
                Giriş yapma, form doldurma gibi işlevleri sağlar.
              </li>
              <li>
                <strong>Performans Çerezleri:</strong> Sitemizin performansını analiz eder; hangi sayfaların
                daha çok ziyaret edildiğini belirlemeye yardımcı olur.
              </li>
              <li>
                <strong>Fonksiyonel Çerezler:</strong> Kullanıcı tercihlerini hatırlar ve kişiselleştirilmiş
                içerik sunmamıza yardımcı olur.
              </li>
              <li>
                <strong>Hedefleme/Reklam Çerezleri:</strong> Sizin ilgi alanlarınıza yönelik reklamlar
                göstermek için kullanılabilir.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">Çerezlerle Toplanan Veriler</h2>
            <p>Çerezler aracılığıyla toplanan veriler, aşağıdaki bilgileri içerebilir:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>IP adresi (anonimleştirilmiş)</li>
              <li>Cihaz ve tarayıcı bilgisi</li>
              <li>Ziyaret edilen sayfalar ve ziyaret süreleri</li>
              <li>Konum bilgisi (tahmini)</li>
              <li>Site içindeki tıklama ve hareket davranışları</li>
              <li>Sayfa yüklenme hızı, hata verileri</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">Çerezlerin Kontrolü</h2>
            <p>
              Tarayıcı ayarlarınızdan çerezleri kabul etme veya reddetme seçeneğine sahipsiniz. Çerezleri
              reddetmeniz durumunda web sitemizin bazı işlevleri doğru çalışmayabilir.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">Çerezlerin Süresi</h2>
            <p>
              Kullanılan çerezlerin bir kısmı oturum sonunda (tarayıcıyı kapattığınızda) silinirken, bazıları
              daha uzun süreli olarak cihazınızda kalabilir. Çerezlerin saklama süreleri kullanım amacına göre
              farklılık gösterir.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">Üçüncü Taraf Çerezler</h2>
            <p>
              Google Analytics, Meta (Facebook Pixel) veya benzeri analiz/hizmet sağlayıcılar tarafından
              yerleştirilen üçüncü taraf çerezler kullanılabilir. Bu tarafların çerez politikalarına kendi
              web sitelerinden ulaşabilirsiniz.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">Veri Paylaşımı</h2>
            <p>
              Çerezler aracılığıyla toplanan veriler, FOKUS İstatistik tarafından iç hizmet iyileştirme
              amacıyla kullanılmakta, üçüncü kişilerle kesinlikle paylaşılmamaktadır.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">Haklarınız</h2>
            <p>6698 sayılı KVK Kanunu uyarınca;</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>Verileriniz işlenmişe bilgi talep etme,</li>
              <li>Amacına uygun kullanılıp kullanılmadığını sorgulama,</li>
              <li>Yanlış/eksik işlenmişse düzeltme isteme,</li>
              <li>Silinmesini ya da yok edilmesini talep etme hakkına sahipsiniz.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">Bize Ulaşın</h2>
            <p>Çerez politikamızla ilgili sorularınız için bizimle iletişime geçebilirsiniz.</p>

            <blockquote className="border-l-4 border-[#860000] pl-6 py-4 my-8 bg-gray-50 rounded-r-lg italic text-gray-600">
              🔐 Gizliliğiniz bizim için önemlidir. Verilerinizi korumak en büyük önceliğimizdir. – FOKUS
            </blockquote>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-block bg-[#860000] hover:bg-[#b30000] text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
          >
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
}
