import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | FOKUS İstatistik',
  description: 'FOKUS İstatistik gizlilik politikası. Kişisel verilerinizin toplanması, işlenmesi, saklanması ve korunması hakkında detaylı bilgiler.',
  keywords: 'gizlilik politikası, veri koruma, kişisel veri işleme, veri güvenliği, KVKK, şeffaflık',
};

export default function GizlilikPolitikasi() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#860000] mb-8">
            Gizlilik Politikası
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-600 italic">
              Son Güncellenme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <p className="text-lg font-medium">
              FOKUS İstatistik olarak, kullanıcılarımızın gizliliğini ve kişisel verilerinin korunmasını
              en önemli önceliklerimiz arasında tutuyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret
              ettiğinizde ve hizmetlerimizi kullandığınızda kişisel verilerinizin nasıl toplandığını,
              işlendiğini, saklandığını ve korunduğunu açıklamaktadır.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">1. Toplanan Kişisel Veriler</h2>
            <p>Aşağıdaki kişisel verilerinizi toplayabiliriz:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası (yasal zorunluluk durumunda)</li>
              <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, posta adresi</li>
              <li><strong>Kurumsal Bilgiler:</strong> Şirket adı, vergi kimlik numarası, şirket adresi</li>
              <li><strong>Elektronik İletişim Verileri:</strong> IP adresi, tarayıcı bilgisi, cihaz bilgisi</li>
              <li><strong>Kullanım Verileri:</strong> Ziyaret edilen sayfalar, tıklama davranışları, oturum süreleri</li>
              <li><strong>Çerez Verileri:</strong> Çerezler aracılığıyla toplanan teknik ve davranışsal veriler</li>
              <li><strong>Ödeme Bilgileri:</strong> Kredi kartı bilgileri (güvenli ödeme sağlayıcıları üzerinden)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">2. Verilerin Toplanma Yöntemleri</h2>
            <p>Kişisel verileriniz aşağıdaki yöntemlerle toplanabilir:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Web sitemizdeki formlar (iletişim formu, analiz formu, kayıt formları)</li>
              <li>E-posta ve telefon iletişimi</li>
              <li>Çerezler ve benzeri teknolojiler</li>
              <li>Sosyal medya etkileşimleri</li>
              <li>Hizmet kullanımı sırasında otomatik olarak</li>
              <li>İş ortakları ve üçüncü taraf hizmet sağlayıcılar</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">3. Verilerin İşlenme Amaçları</h2>
            <p>Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Hizmetlerimizi sunmak ve iyileştirmek</li>
              <li>Müşteri destek taleplerini yanıtlamak</li>
              <li>Sözleşmelerin kurulması ve ifası</li>
              <li>Ödeme işlemlerinin gerçekleştirilmesi</li>
              <li>Web sitesi performansını analiz etmek</li>
              <li>Kullanıcı deneyimini kişiselleştirmek</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Güvenlik ve dolandırıcılık önleme</li>
              <li>İstatistiksel analiz ve raporlama</li>
              <li>Pazarlama ve tanıtım faaliyetleri (izniniz dahilinde)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">4. Verilerin Paylaşımı</h2>
            <p>
              Kişisel verileriniz, aşağıdaki durumlar haricinde üçüncü şahıslarla paylaşılmaz:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Hizmet Sağlayıcılar:</strong> Hosting, bulut depolama, ödeme sistemleri, analiz araçları</li>
              <li><strong>Yasal Zorunluluklar:</strong> Mahkeme kararları, resmi makam talepleri</li>
              <li><strong>İş Ortakları:</strong> Hizmet sunumu için gerekli iş ortaklarımız (sözleşme ile korunan)</li>
              <li><strong>Açık Rızanız:</strong> Sizin açık onayınızla belirlenen durumlar</li>
            </ul>
            <p className="mt-4">
              Verilerinizi paylaştığımız tüm taraflarla gizlilik ve güvenlik sözleşmeleri yapılmıştır.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">5. Veri Güvenliği</h2>
            <p>Kişisel verilerinizin güvenliğini sağlamak için aşağıdaki önlemleri alıyoruz:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>SSL/TLS şifreleme protokolleri</li>
              <li>Güvenli veri tabanı sistemleri</li>
              <li>Düzenli güvenlik güncellemeleri</li>
              <li>Erişim kontrolü ve yetkilendirme</li>
              <li>Güvenlik duvarı ve antivirüs sistemleri</li>
              <li>Personel eğitimi ve gizlilik protokolleri</li>
              <li>Düzenli güvenlik denetimleri</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">6. Veri Saklama Süreleri</h2>
            <p>
              Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve ilgili mevzuatta
              öngörülen süreler dahilinde saklanır:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Sözleşme ilişkisi süresince ve sonrasında yasal saklama süreleri</li>
              <li>Pazarlama verileri: İzin süresince veya itirazınıza kadar</li>
              <li>Web kullanım verileri: Amacın gerektirdiği süre (genellikle 6-24 ay)</li>
              <li>Yasal zorunluluk gerektiren veriler: İlgili mevzuatta belirtilen süreler</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">7. Çerezler ve Benzer Teknolojiler</h2>
            <p>
              Web sitemizde çerezler kullanılmaktadır. Detaylı bilgi için{' '}
              <a href="/cerez-politikasi" className="text-[#860000] hover:underline font-semibold">
                Çerez Politikamızı
              </a>{' '}
              inceleyebilirsiniz.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">8. Haklarınız (KVKK Uyarınca)</h2>
            <p>6698 sayılı KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı 3. kişileri bilme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>Silinmesini veya yok edilmesini talep etme</li>
              <li>Aktarıldığı 3. kişilere bildirilmesini isteme</li>
              <li>Münhasıran otomatik sistemlerle analiz edilmesine itiraz etme</li>
              <li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">9. Başvuru ve İletişim</h2>
            <p>
              Gizlilik politikamız veya kişisel verilerinizle ilgili sorularınız, talepleriniz ve
              haklarınızı kullanmak için:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p><strong>E-posta:</strong> <a href="mailto:info@fokusistatistik.com" className="text-[#860000] hover:underline">info@fokusistatistik.com</a></p>
              <p><strong>Web Sitesi:</strong> <a href="https://www.fokusistatistik.com" className="text-[#860000] hover:underline">www.fokusistatistik.com</a></p>
              <p className="mt-2 text-sm text-gray-600">
                Başvurularınız en geç 30 gün içinde değerlendirilecek ve sonuçlandırılacaktır.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">10. Çocukların Gizliliği</h2>
            <p>
              Hizmetlerimiz 18 yaş altı kişilere yönelik değildir. Bilinçli olarak 18 yaş altından
              kişisel veri toplamıyoruz. Eğer böyle bir durumdan haberimiz olursa, ilgili verileri
              derhal sileriz.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">11. Değişiklikler</h2>
            <p>
              Bu Gizlilik Politikası, yasal düzenlemeler veya iş süreçlerindeki değişiklikler nedeniyle
              güncellenebilir. Önemli değişiklikler web sitemizde duyurulacaktır. Düzenli olarak bu
              sayfayı kontrol etmenizi öneririz.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">12. Uluslararası Veri Aktarımı</h2>
            <p>
              Kişisel verileriniz, hizmet sağlayıcılarımız aracılığıyla yurt dışına aktarılabilir.
              Bu durumda, KVKK'nın 9. maddesi kapsamında gerekli güvenlik önlemleri alınır ve
              uygun sözleşmeler yapılır.
            </p>

            <blockquote className="border-l-4 border-[#860000] pl-6 py-4 my-8 bg-gray-50 rounded-r-lg italic text-gray-600">
              🔐 Gizliliğiniz bizim için önceliklidir. Verilerinizi korumak ve şeffaf olmak en büyük
              sorumluluğumuzdur. – FOKUS İstatistik
            </blockquote>
          </div>
        </section>

        {/* Quick Links */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">İlgili Politikalar</h3>
          <div className="flex flex-wrap gap-3">
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
            <a
              href="/kullanim-kosullari"
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Kullanım Koşulları
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
