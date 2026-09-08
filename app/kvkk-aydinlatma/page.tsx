import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | FOKUS İstatistik',
  description: 'FOKUS İstatistik olarak kişisel verilerinizi KVKK ve gizlilik ilkelerine uygun olarak işliyor, şeffaf ve güvenli bir veri yönetimi sağlıyoruz.',
  keywords: 'KVKK, aydınlatma metni, kişisel veri koruma, veri sorumlusu, gizlilik, veri güvenliği',
  alternates: {
    canonical: 'https://fokusistatistik.com/kvkk-aydinlatma',
  },
};

export default function KVKKAydinlatma() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#860000] mb-8">
            KVKK Aydınlatma Metni
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              FOKUS İstatistik olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca,
              veri sorumlusu sıfatıyla kişisel verilerinizi ilgili mevzuata uygun şekilde işliyor ve koruyoruz.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">1. Veri Sorumlusu</h2>
            <p>
              Bu aydınlatma metni kapsamında veri sorumlusu: <strong>FOKUS İstatistik</strong>
              <br />
              Web sitesi: <a href="https://www.fokusistatistik.com" className="text-[#860000] hover:underline">www.fokusistatistik.com</a>
              <br />
              E-posta: <a href="mailto:bilgi@fokusistatistik.com" className="text-[#860000] hover:underline">bilgi@fokusistatistik.com</a>
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">2. Kişisel Verilerin Toplanması</h2>
            <p>
              Kişisel verileriniz, web sitemiz aracılığıyla sunulan formlar, çerezler, elektronik posta,
              telefon görüşmeleri ve hizmet ilişkisi kapsamında otomatik ya da otomatik olmayan yöntemlerle
              toplanabilir.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">3. İşlenen Veriler ve Amaçlar</h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <strong>Kimlik ve İletişim Bilgileri:</strong> Teklif, bilgi talebi, destek sunumu
              </li>
              <li>
                <strong>Web Ziyaret Bilgileri:</strong> Deneyim iyileştirme, analiz ve güvenlik
              </li>
              <li>
                <strong>Çerezler ve Kullanım Verileri:</strong> Hizmet uyarlama, reklam ve analiz
              </li>
              <li>
                <strong>Görsel/Medya Bilgileri:</strong> Görüşmeler, sunumlar, ürün demoları
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">4. Hukuki Dayanak</h2>
            <p>
              Verileriniz, KVKK&apos;nın 5. ve 6. maddelerinde belirtilen açık rızanız, sözleşme kurulması/ifası,
              meşru menfaat, hukuki yükümlülüklerin yerine getirilmesi gibi nedenlerle işlenebilir.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">5. Veri Aktarımı</h2>
            <p>
              Toplanan kişisel veriler, yasal zorunluluklar haricinde 3. şahıslarla paylaşılmaz. Ancak yurt içi
              ve yurt dışında hizmet aldığımız teknoloji sağlayıcılar (barındırma, analiz, bulut vb.) ile
              sözleşmelere dayalı olarak paylaşılabilir.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">6. Veri Saklama Süreleri</h2>
            <p>
              Kişisel veriler, ilgili mevzuatta belirtilen süreler boyunca saklanmakta olup, amacının sona
              ermesiyle veya talebiniz üzerine silinir, yok edilir veya anonim hale getirilir.
            </p>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">7. KVKK Kapsamındaki Haklarınız</h2>
            <p>KVKK&apos;nın 11. maddesi uyarınca;</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Verinizin işlenip işlenmediğini öğrenme,</li>
              <li>Toplanan veriye erişim ve bilgi isteme,</li>
              <li>Verinin amacına uygun kullanılıp kullanılmadığını sorgulama,</li>
              <li>Eksik veya yanlış işlenmişse düzeltme talep etme,</li>
              <li>Silinmesini, yok edilmesini veya anonim hale getirilmesini isteme,</li>
              <li>Aktarıldığı 3. taraflara bildirilmesini talep etme,</li>
              <li>Otomatik sistemler ile analiz edilmesine itiraz etme,</li>
              <li>Doğrudan zarara uğrarsanız tazminat talep etme hakkınız bulunur.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#860000] mt-8 mb-4">8. Başvuru</h2>
            <p>
              Bu haklarınızı kullanmak için{' '}
              <a href="mailto:bilgi@fokusistatistik.com" className="text-[#860000] hover:underline">
                bilgi@fokusistatistik.com
              </a>{' '}
              adresine e-posta gönderebilir veya KVKK Başvuru Formu&apos;nu doldurup imzalayarak iletebilirsiniz.
            </p>

            <blockquote className="border-l-4 border-[#860000] pl-6 py-4 my-8 bg-gray-50 rounded-r-lg italic text-gray-600">
              🔐 Kişisel verilerinizin güvenliği bizim için önceliklidir. Gizliliğiniz korunur. – FOKUS
            </blockquote>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-block bg-[#860000] hover:bg-[#b30000] text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
