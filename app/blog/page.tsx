import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

// Force dynamic rendering so new blogs appear immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

interface Blog {
  id?: string;
  slug: string;
  title: string;
  description: string;
  date?: string;
  publishedDate?: string;
  readTime: string;
  category: string;
  image?: string;
  coverImage?: string;
}

async function getBlogs(): Promise<Blog[]> {
  // Statik blog listesi
  const staticBlogs: Blog[] = [
    {
      slug: 'yapay-zeka-ile-kazanc',
      title: '2025\'te Yapay Zeka ile Kazanç: İşletmeler İçin 7 Kanıtlanmış Yöntem',
      description: 'Yapay zeka teknolojileri ile işletmenizin karlılığını nasıl artırabilirsiniz? Maliyet tasarrufu, gelir artışı ve verimlilik kazanımları için detaylı rehber.',
      date: '2025-01-15',
      readTime: '8 dakika',
      category: 'Yapay Zeka',
      image: 'https://static.fokusistatistik.com/logolar/fokuslogo1.png',
    },
    {
      slug: 'whatsapp-musteri-hizmetleri-botu',
      title: 'WhatsApp Müşteri Hizmetleri Botu: Kurulum, Fiyat ve ROI Rehberi [2025]',
      description: 'WhatsApp müşteri hizmetleri botu ile 7/24 otomatik destek. Kurulum maliyeti, fiyat karşılaştırması, ROI hesaplama ve gerçek örnekler ile tam rehber.',
      date: '2025-01-16',
      readTime: '10 dakika',
      category: 'Otomasyon',
      image: 'https://static.fokusistatistik.com/logolar/fokuslogo1.png',
    },
    {
      slug: 'sanal-asistan-vs-gercek-personel',
      title: 'Sanal Asistan vs Gerçek Personel: 12 Aylık Maliyet Karşılaştırması [2025]',
      description: 'Sanal asistan mı yoksa gerçek personel mi? Detaylı maliyet analizi, verimlilik karşılaştırması ve işletmeniz için doğru seçim rehberi. Gerçek rakamlarla.',
      date: '2025-01-17',
      readTime: '12 dakika',
      category: 'Karşılaştırma',
      image: 'https://static.fokusistatistik.com/logolar/fokuslogo1.png',
    },
    {
      slug: 'yapay-zeka-maliyet-dusurme',
      title: 'Yapay Zeka ile İşletme Maliyetlerini Düşürme: Dijital İşçi Devrimi',
      description: 'Dijital işçi ile işletme maliyetlerini %40-80 düşürün. 8 farklı sektörde gerçek örnekler, ROI hesaplamaları ve adım adım maliyet düşürme stratejileri.',
      date: '2025-01-18',
      readTime: '14 dakika',
      category: 'Maliyet Optimizasyonu',
      image: 'https://static.fokusistatistik.com/logolar/fokuslogo1.png',
    },
    {
      slug: 'veri-analizi-rehberi',
      title: 'Veri Analizi Nedir? Başlangıçtan İleri Seviyeye Kapsamlı Rehber',
      description: 'Veri analizinin temellerinden ileri tekniklerine kadar her şey. Araçlar, metodolojiler, örnekler ve başarı için ipuçları.',
      date: '2025-01-14',
      readTime: '10 dakika',
      category: 'Veri Analizi',
      image: 'https://static.fokusistatistik.com/logolar/fokuslogo1.png',
    },
    {
      slug: 'chatgpt-is-surecleri',
      title: 'ChatGPT\'yi İş Süreçlerine Entegre Etme: Pratik Rehber ve Örnekler',
      description: 'ChatGPT ve benzeri AI araçlarını iş süreçlerinize nasıl entegre edersiniz? Müşteri hizmetlerinden içerik üretimine 15+ kullanım senaryosu.',
      date: '2025-01-13',
      readTime: '12 dakika',
      category: 'ChatGPT',
      image: 'https://static.fokusistatistik.com/logolar/fokuslogo1.png',
    },
    {
      slug: 'kucuk-isletmeler-icin-yapay-zeka',
      title: 'Küçük İşletmeler İçin Uygun Fiyatlı Yapay Zeka Çözümleri',
      description: 'Sınırlı bütçeyle yapay zekadan nasıl faydalanılır? Küçük ve orta ölçekli işletmeler için maliyet-etkin AI stratejileri ve araçlar.',
      date: '2025-01-12',
      readTime: '7 dakika',
      category: 'KOBİ',
      image: 'https://static.fokusistatistik.com/logolar/fokuslogo1.png',
    },
  ];

  // Dinamik blogları dosyadan oku
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const BLOGS_FILE = path.join(process.cwd(), 'content', 'blogs-metadata.json');

    const data = await fs.readFile(BLOGS_FILE, 'utf-8');
    const dynamicBlogs: Blog[] = JSON.parse(data);

    // Dinamik blogları en üstte göster (en yeni tarihten eskiye), sonra statik bloglar
    const sortedDynamicBlogs = dynamicBlogs.sort((a, b) => {
      const dateA = new Date(a.publishedDate || '').getTime();
      const dateB = new Date(b.publishedDate || '').getTime();
      return dateB - dateA; // En yeni önce
    });

    return [...sortedDynamicBlogs, ...staticBlogs];
  } catch (error) {
    console.error('Error reading dynamic blogs:', error);
    // Dosya okunamadıysa sadece statik blogları göster
    return staticBlogs;
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogs();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Minimal & Clean */}
      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            FOKUS Blog
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Yapay Zeka, Veri Analizi ve Dijital Dönüşüm Rehberleri
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#860000]/30 flex flex-col"
            >
              {/* Cover Image - 16:9 aspect ratio (1200x675 px önerilen) */}
              <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '16/9' }}>
                <img
                  src={post.coverImage || post.image || 'https://static.fokusistatistik.com/logolar/fokuslogo1.png'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="inline-block bg-[#860000]/10 text-[#860000] px-2 py-1 rounded-md text-xs font-medium">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#860000] transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                  {post.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#860000] group-hover:translate-x-1 transition-transform" />
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
