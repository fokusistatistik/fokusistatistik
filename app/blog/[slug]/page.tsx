import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import BlogContent from '@/components/blog/BlogContent';

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
    const blogs = JSON.parse(data);
    const blog = blogs.find((b: any) => b.slug === slug);

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
    } catch (error) {
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

  return {
    title: `${blog.title} | FOKUS Blog`,
    description: blog.description,
    keywords: blog.keywords,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
        {/* Cover Image */}
        {blog.coverImage && (
          <div className="aspect-video w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

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

        {/* Description */}
        <div className="text-xl text-gray-700 mb-8 leading-relaxed italic bg-gray-50 p-6 rounded-lg border-l-4 border-[#860000]">
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
              href="https://asistan.fokusistatistik.com/ucretsiz.html"
              className="bg-white text-[#860000] hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Ücretsiz Danışmanlık
            </Link>
            <Link
              href="/analiz-formu"
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg transition-all"
            >
              İhtiyaç Analizi
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
