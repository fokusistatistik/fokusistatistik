import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import BlogContent from '@/components/blog/BlogContent';
import { BreadcrumbSchema } from '@/app/components/StructuredData';

// Force dynamic rendering so new blogs appear immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  keywords: string[];
  category: string;
  publishedDate: string;
  updatedDate: string;
  author: string;
  readTime: string;
  content?: string;
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const BLOGS_FILE = path.join(process.cwd(), 'content', 'blogs-metadata.json');
    const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

    // Read metadata
    const data = await fs.readFile(BLOGS_FILE, 'utf-8');
    const blogs: Blog[] = JSON.parse(data);
    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) {
      return null;
    }

    // Read content
    let content = '';
    try {
      content = await fs.readFile(
        path.join(CONTENT_DIR, `${slug}.html`),
        'utf-8'
      );
    } catch {
      content = '';
    }

    return { ...blog, content };
  } catch (error) {
    console.error('Error reading blog:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: 'Blog Bulunamadı',
    };
  }

  const baseUrl = 'https://fokusistatistik.com';
  const canonicalUrl = `${baseUrl}/blog/${slug}`;

  return {
    title: `${blog.title} | FOKUS Blog`,
    description: blog.description,
    keywords: blog.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: blog.title,
      description: blog.description,
      url: canonicalUrl,
      siteName: 'FOKUS İstatistik',
      locale: 'tr_TR',
      images: blog.coverImage ? [
        {
          url: blog.coverImage,
          width: 1200,
          height: 600,
          alt: blog.title,
        }
      ] : [],
      publishedTime: blog.publishedDate,
      modifiedTime: blog.updatedDate,
      authors: [blog.author],
      section: blog.category,
      tags: blog.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: blog.coverImage ? [blog.coverImage] : [],
      creator: '@fokusistatistik',
      site: '@fokusistatistik',
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const baseUrl = 'https://fokusistatistik.com';
  const canonicalUrl = `${baseUrl}/blog/${slug}`;
  const absoluteCoverImage = blog.coverImage?.startsWith('http')
    ? blog.coverImage
    : `${baseUrl}${blog.coverImage}`;

  // BlogPosting Schema Markup
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.description,
    image: absoluteCoverImage,
    datePublished: blog.publishedDate,
    dateModified: blog.updatedDate,
    author: {
      '@type': 'Organization',
      name: blog.author,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FOKUS İstatistik',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/assets/cdn/logolar/fokuslogo1.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    keywords: blog.keywords.join(', '),
    articleSection: blog.category,
    articleBody: blog.content,
    timeRequired: blog.readTime,
    inLanguage: 'tr-TR',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: baseUrl },
          { name: 'Blog', url: `${baseUrl}/blog` },
          { name: blog.title, url: canonicalUrl },
        ]}
      />

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#860000] hover:text-[#a30000] font-semibold transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Tüm Yazılara Dön
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-[#860000] text-white text-sm font-semibold rounded-full">
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{new Date(blog.publishedDate).toLocaleDateString('tr-TR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{blog.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{blog.author}</span>
          </div>
        </div>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg mb-10">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Description */}
        <div className="text-xl text-gray-700 mb-10 leading-relaxed italic bg-gray-50 p-6 rounded-xl border-l-4 border-[#860000]">
          {blog.description}
        </div>

        {/* Content - Isolated HTML rendering */}
        <BlogContent content={blog.content || ''} />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Etiketler</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#860000] to-[#a30000] rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            İşletmeniz İçin Özel Çözümler
          </h2>
          <p className="text-lg mb-6 text-white/90">
            Yapay zeka ve veri analizi konusunda ücretsiz danışmanlık almak ister misiniz?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="bg-white text-[#860000] hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Ücretsiz Danışmanlık
            </Link>
            {/* Analiz formu şimdilik aktif değil, sonradan aktif edilebilir
            <Link
              href="/analiz-formu"
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg transition-all"
            >
              İhtiyaç Analizi
            </Link>
            */}
          </div>
        </div>
      </article>
    </div>
  );
}
