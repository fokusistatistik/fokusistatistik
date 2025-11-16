import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - Yapay Zeka ve Veri Analizi Rehberleri',
  description: 'Yapay zeka ile kazanç artırma, veri analizi, ChatGPT iş süreçleri ve dijital dönüşüm hakkında derinlikli makaleler. Uzman görüşleri ve pratik rehberler.',
  keywords: [
    'yapay zeka blog',
    'veri analizi rehberi',
    'chatgpt rehber',
    'yapay zeka ile kazanç',
    'dijital dönüşüm blog',
    'AI makaleleri',
    'veri bilimi yazıları',
  ],
  openGraph: {
    title: 'FOKUS Blog - Yapay Zeka ve Veri Analizi',
    description: 'Yapay zeka, veri analizi ve dijital dönüşüm hakkında uzman içerikleri',
    url: 'https://fokusistatistik.com/blog',
  },
};

const blogPosts = [
  {
    slug: 'yapay-zeka-ile-kazanc',
    title: '2025\'te Yapay Zeka ile Kazanç: İşletmeler İçin 7 Kanıtlanmış Yöntem',
    excerpt: 'Yapay zeka teknolojileri ile işletmenizin karlılığını nasıl artırabilirsiniz? Maliyet tasarrufu, gelir artışı ve verimlilik kazanımları için detaylı rehber.',
    date: '2025-01-15',
    readTime: '8 dakika',
    category: 'Yapay Zeka',
    image: 'https://static.fokusistatistik.com/blog/ai-kazanc.jpg',
  },
  {
    slug: 'whatsapp-musteri-hizmetleri-botu',
    title: 'WhatsApp Müşteri Hizmetleri Botu: Kurulum, Fiyat ve ROI Rehberi [2025]',
    excerpt: 'WhatsApp müşteri hizmetleri botu ile 7/24 otomatik destek. Kurulum maliyeti, fiyat karşılaştırması, ROI hesaplama ve gerçek örnekler ile tam rehber.',
    date: '2025-01-16',
    readTime: '10 dakika',
    category: 'Otomasyon',
    image: 'https://static.fokusistatistik.com/blog/whatsapp-bot.jpg',
  },
  {
    slug: 'sanal-asistan-vs-gercek-personel',
    title: 'Sanal Asistan vs Gerçek Personel: 12 Aylık Maliyet Karşılaştırması [2025]',
    excerpt: 'Sanal asistan mı yoksa gerçek personel mi? Detaylı maliyet analizi, verimlilik karşılaştırması ve işletmeniz için doğru seçim rehberi. Gerçek rakamlarla.',
    date: '2025-01-17',
    readTime: '12 dakika',
    category: 'Karşılaştırma',
    image: 'https://static.fokusistatistik.com/blog/comparison.jpg',
  },
  {
    slug: 'veri-analizi-rehberi',
    title: 'Veri Analizi Nedir? Başlangıçtan İleri Seviyeye Kapsamlı Rehber',
    excerpt: 'Veri analizinin temellerinden ileri tekniklerine kadar her şey. Araçlar, metodolojiler, örnekler ve başarı için ipuçları.',
    date: '2025-01-14',
    readTime: '10 dakika',
    category: 'Veri Analizi',
    image: 'https://static.fokusistatistik.com/blog/veri-analizi.jpg',
  },
  {
    slug: 'chatgpt-is-surecleri',
    title: 'ChatGPT\'yi İş Süreçlerine Entegre Etme: Pratik Rehber ve Örnekler',
    excerpt: 'ChatGPT ve benzeri AI araçlarını iş süreçlerinize nasıl entegre edersiniz? Müşteri hizmetlerinden içerik üretimine 15+ kullanım senaryosu.',
    date: '2025-01-13',
    readTime: '12 dakika',
    category: 'ChatGPT',
    image: 'https://static.fokusistatistik.com/blog/chatgpt.jpg',
  },
  {
    slug: 'kucuk-isletmeler-icin-yapay-zeka',
    title: 'Küçük İşletmeler İçin Uygun Fiyatlı Yapay Zeka Çözümleri',
    excerpt: 'Sınırlı bütçeyle yapay zekadan nasıl faydalanılır? Küçük ve orta ölçekli işletmeler için maliyet-etkin AI stratejileri ve araçlar.',
    date: '2025-01-12',
    readTime: '7 dakika',
    category: 'KOBİ',
    image: 'https://static.fokusistatistik.com/blog/kobi-ai.jpg',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#860000] to-[#a30000] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            FOKUS Blog
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Yapay Zeka, Veri Analizi ve Dijital Dönüşüm Rehberleri
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#860000]/20"
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-[#860000]/10 to-[#a30000]/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#860000] to-[#a30000] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">📊</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="inline-block bg-[#860000]/10 text-[#860000] px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#860000] transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-[#860000] font-semibold group-hover:gap-2 transition-all">
                  <span>Devamını Oku</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            İşletmeniz İçin Özel Çözümler
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Yapay zeka ve veri analizi konusunda ücretsiz danışmanlık almak ister misiniz?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://asistan.fokusistatistik.com/ucretsiz.html"
              className="bg-[#860000] hover:bg-[#b30000] text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Ücretsiz Danışmanlık
            </Link>
            <Link
              href="/analiz-formu"
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-lg transition-all border-2 border-gray-200"
            >
              İhtiyaç Analizi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
