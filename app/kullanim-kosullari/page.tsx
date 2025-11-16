import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Koşulları | FOKUS İstatistik',
  description: 'FOKUS İstatistik web sitesi ve hizmetlerinin kullanım koşulları, şartları ve kuralları.',
  keywords: 'kullanım koşulları, kullanım şartları, hizmet sözleşmesi, yasal şartlar',
};

export default function KullanimKosullari() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#860000] mb-8">
            Kullanım Koşulları
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-600 italic">
              Son Güncellenme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <p className="text-lg">
              Bu Kullanım Koşulları, <strong>FOKUS İstatistik</strong> web sitesi (www.fokusistatistik.com ve
              alt alan adları) ve sunulan hizmetlerin kullanımına ilişkin kuralları belirler. Sitemizi
              ziyaret ederek ve hizmetlerimizi kullanarak bu koşulları kabul etmiş sayılırsınız.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">1. Tanımlar</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Site:</strong> www.fokusistatistik.com ve tüm alt alan adları</li>
              <li><strong>Hizmet:</strong> FOKUS İstatistik tarafından sunulan tüm dijital çözümler, sanal asistanlar, danışmanlık ve veri analizi hizmetleri</li>
              <li><strong>Kullanıcı:</strong> Siteyi ziyaret eden ve/veya hizmetleri kullanan gerçek veya tüzel kişiler</li>
              <li><strong>İçerik:</strong> Site üzerinde yer alan metin, görsel, video, yazılım ve diğer tüm materyaller</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">2. Hizmetlerin Kapsamı</h2>
            <p>FOKUS İstatistik aşağıdaki hizmetleri sunmaktadır:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Sanal asistan çözümleri (9 farklı asistan)</li>
              <li>Veri analizi ve istatistiksel danışmanlık</li>
              <li>Yapay zeka destekli otomasyon sistemleri</li>
              <li>İş süreçleri optimizasyonu</li>
              <li>Eğitim ve teknik destek</li>
              <li>Özel yazılım geliştirme</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">3. Kullanıcı Yükümlülükleri</h2>
            <p>Kullanıcılar, siteyi kullanırken aşağıdaki kurallara uymayı kabul eder:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Doğru ve güncel bilgi vermek</li>
              <li>Hesap güvenliğini korumak, şifreleri paylaşmamak</li>
              <li>Yasalara ve etik kurallara uygun davranmak</li>
              <li>Sitenin işleyişini bozmaya yönelik eylemlerden kaçınmak</li>
              <li>Zararlı yazılım, virüs, spam göndermemek</li>
              <li>Başkalarının haklarına saygı göstermek</li>
              <li>Fikri mülkiyet haklarını ihlal etmemek</li>
              <li>Ticari amaçla izinsiz içerik kopyalamamak</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">4. Fikri Mülkiyet Hakları</h2>
            <p>
              Site üzerindeki tüm içerik, tasarım, logo, yazılım, kod ve materyaller FOKUS İstatistik'in
              münhasır mülkiyetindedir ve telif hakkı yasaları ile korunmaktadır. İzinsiz kullanım,
              çoğaltma, dağıtım veya ticari amaçla kullanım kesinlikle yasaktır.
            </p>
            <p className="mt-4">
              Kullanıcılar, içerikleri yalnızca kişisel ve ticari olmayan amaçlarla görüntüleyebilir.
              Her türlü ticari kullanım için önceden yazılı izin alınmalıdır.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">5. Hizmet Bedelleri ve Ödeme</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Hizmet bedelleri paket bazında web sitemizde belirtilmiştir</li>
              <li>Fiyatlar KDV dahil olarak gösterilir</li>
              <li>FOKUS İstatistik, fiyatları önceden bildirerek değiştirme hakkını saklı tutar</li>
              <li>Ödemeler güvenli ödeme sistemleri üzerinden gerçekleştirilir</li>
              <li>Abonelik hizmetleri otomatik olarak yenilenir (iptal edilmediği sürece)</li>
              <li>Ödeme bilgileri şifrelenerek korunur</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">6. İptal ve İade Koşulları</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Cayma Hakkı (Bireysel Kullanıcılar İçin):</h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Mesafeli Satış Sözleşmesi kapsamında 1 ay cayma hakkı bulunmaktadır</li>
                <li>Hizmetin ifasına başlanmışsa cayma hakkı kullanılamaz</li>
                <li>Dijital içerik teslimi yapıldıysa iade mümkün değildir</li>
                <li>İade talepleri bilgi@fokusistatistik.com adresine bildirilmelidir</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-3">Kurumsal Müşteriler:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>İptal ve iade koşulları sözleşmede belirtildiği şekilde uygulanır</li>
                <li>Proje bazlı hizmetlerde özel iptal politikaları geçerlidir</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">7. Hizmet Garantisi ve Sorumluluklar</h2>
            <p><strong>FOKUS İstatistik Taahhüt Eder:</strong></p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Hizmetlerin kaliteli ve zamanında sunulması</li>
              <li>Teknik destek ve müşteri hizmetleri</li>
              <li>Veri güvenliği ve gizlilik</li>
              <li>Yasal düzenlemelere uygunluk</li>
            </ul>

            <p className="mt-4"><strong>Sorumluluk Sınırlamaları:</strong></p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>İnternet bağlantısı kaynaklı sorunlardan FOKUS sorumlu değildir</li>
              <li>Kullanıcının hatalı bilgi vermesinden kaynaklanan sorunlardan sorumlu değiliz</li>
              <li>Üçüncü taraf hizmetlerin kesintisinden doğan zararlar kapsam dışındadır</li>
              <li>Mücbir sebep durumlarında (doğal afet, savaş, vb.) sorumluluk sınırlanır</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">8. Gizlilik ve Veri Koruma</h2>
            <p>
              Kişisel verilerinizin işlenmesi{' '}
              <a href="/gizlilik-politikasi" className="text-[#860000] hover:underline font-semibold">
                Gizlilik Politikamız
              </a>{' '}
              ve{' '}
              <a href="/kvkk-aydinlatma" className="text-[#860000] hover:underline font-semibold">
                KVKK Aydınlatma Metnimiz
              </a>{' '}
              kapsamındadır. Bu belgeleri okumanızı ve kabul etmenizi öneririz.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">9. Hesap Askıya Alma ve Sonlandırma</h2>
            <p>FOKUS İstatistik, aşağıdaki durumlarda kullanıcı hesabını askıya alma veya sonlandırma hakkını saklı tutar:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Kullanım koşullarına aykırı davranışlar</li>
              <li>Yasalara aykırı eylemler</li>
              <li>Diğer kullanıcılara zarar verme</li>
              <li>Ödeme yükümlülüklerinin yerine getirilmemesi</li>
              <li>Sahte bilgi ve dolandırıcılık girişimleri</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">10. Değişiklik Hakkı</h2>
            <p>
              FOKUS İstatistik, bu Kullanım Koşullarını önceden bildirerek veya bildirmeksizin değiştirme
              hakkını saklı tutar. Önemli değişiklikler site üzerinde duyurulacaktır. Değişikliklerden
              sonra siteyi kullanmaya devam etmeniz, yeni koşulları kabul ettiğiniz anlamına gelir.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">11. Bağlantılar ve Üçüncü Taraf İçerikleri</h2>
            <p>
              Sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin içeriğinden
              ve gizlilik uygulamalarından FOKUS İstatistik sorumlu değildir. Bağlantılara tıklamadan
              önce ilgili sitelerin politikalarını incelemenizi öneririz.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">12. Uyuşmazlık Çözümü</h2>
            <p>
              Bu Kullanım Koşulları Türkiye Cumhuriyeti yasalarına tabidir. Hizmetlerimizle ilgili
              uyuşmazlıklarda öncelikle dostane çözüm aranır. Çözüm sağlanamazsa İstanbul Mahkemeleri
              ve İcra Daireleri yetkilidir.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">13. İletişim</h2>
            <p>
              Kullanım Koşulları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p><strong>E-posta:</strong> <a href="mailto:bilgi@fokusistatistik.com" className="text-[#860000] hover:underline">bilgi@fokusistatistik.com</a></p>
              <p><strong>Web Sitesi:</strong> <a href="https://www.fokusistatistik.com" className="text-[#860000] hover:underline">www.fokusistatistik.com</a></p>
            </div>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">14. Kabul Beyanı</h2>
            <p className="font-medium">
              Bu sayfayı okuyarak ve siteyi kullanmaya devam ederek, yukarıda belirtilen tüm Kullanım
              Koşullarını okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.
            </p>

            <blockquote className="border-l-4 border-[#860000] pl-6 py-4 my-8 bg-gray-50 rounded-r-lg italic text-gray-600">
              ⚖️ Adil, şeffaf ve güvenilir bir hizmet sunmak temel ilkemizdir. – FOKUS İstatistik
            </blockquote>
          </div>
        </section>

        {/* Quick Links */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">İlgili Belgeler</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="/gizlilik-politikasi"
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Gizlilik Politikası
            </a>
            <a
              href="/kvkk-aydinlatma"
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              KVKK Aydınlatma Metni
            </a>
            <a
              href="/cerez-politikasi"
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Çerez Politikası
            </a>
          </div>
        </div>

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
