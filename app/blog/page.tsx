import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { BreadcrumbSchema } from '@/app/components/StructuredData';

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
  // Statik blog listesi - şablon bloglar kaldırıldı
  const staticBlogs: Blog[] = [];

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
    <>
    <BreadcrumbSchema
      items={[
        { name: 'Ana Sayfa', url: 'https://fokusistatistik.com' },
        { name: 'Blog', url: 'https://fokusistatistik.com/blog' },
      ]}
    />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-[#2b2b2b] py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-white/10 text-white/90 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4">
            FOKUS Blog
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Yapay Zeka ve Dijital Dönüşüm Rehberleri
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Sanal asistanlar, veri analizi ve iş süreçleri otomasyonu üzerine pratik, uygulanabilir yazılar
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pt-10">
          <Link
            href={`/blog/${blogPosts[0].slug}`}
            className="group grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative overflow-hidden bg-gray-100 aspect-[16/9] md:aspect-auto">
              <Image
                src={blogPosts[0].coverImage || blogPosts[0].image || '/assets/cdn/logolar/fokuslogo1.png'}
                alt={blogPosts[0].title}
                fill
                unoptimized
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span className="inline-block w-fit bg-[#860000]/10 text-[#860000] px-3 py-1 rounded-full text-xs font-semibold mb-3">
                {blogPosts[0].category}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#860000] transition-colors leading-snug">
                {blogPosts[0].title}
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-3">
                {blogPosts[0].description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[#860000] font-semibold group-hover:gap-2 transition-all">
                  Devamını Oku <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#860000]/30 flex flex-col"
            >
              {/* Cover Image */}
              <div className="relative overflow-hidden bg-gray-100 aspect-[16/9]">
                <Image
                  src={post.coverImage || post.image || '/assets/cdn/logolar/fokuslogo1.png'}
                  alt={post.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2.5">
                  <span className="inline-block bg-[#860000]/10 text-[#860000] px-2.5 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#860000] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                  {post.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
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
              href="/iletisim"
              className="bg-[#860000] hover:bg-[#b30000] text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Ücretsiz Danışmanlık
            </Link>
            {/* Analiz formu şimdilik aktif değil, sonradan aktif edilebilir
            <Link
              href="/analiz-formu"
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-lg transition-all border-2 border-gray-200"
            >
              İhtiyaç Analizi
            </Link>
            */}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
