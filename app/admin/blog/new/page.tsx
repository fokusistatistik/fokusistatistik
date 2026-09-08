'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AuthGuard from '@/components/admin/AuthGuard';
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  FileText,
  Image as ImageIcon,
  Tag,
  Calendar,
  Clock,
  Folder,
  Hash,
} from 'lucide-react';

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    coverImage: '',
    content: '',
    tags: '',
    keywords: '',
    category: 'Yapay Zeka',
    author: 'FOKUS İstatistik',
    readTime: '5 dakika okuma',
    publishedDate: new Date().toISOString().split('T')[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title
    if (name === 'title' && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        keywords: formData.keywords.split(',').map((kw) => kw.trim()).filter(Boolean),
      };

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || 'Blog oluşturulamadı');
      }
    } catch {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push('/admin/dashboard')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Yeni Blog Yazısı
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Blog içeriği ve metadata bilgilerini girin
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
              >
                {showPreview ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Düzenleme
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Önizleme
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!showPreview ? (
              <>
                {/* Metadata Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Temel Bilgiler
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Başlık *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                        placeholder="Blog başlığını girin"
                      />
                    </div>

                    {/* Slug */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                        placeholder="blog-url-slug"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        URL: /blog/{formData.slug || 'blog-url-slug'}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Açıklama *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                        placeholder="Blog yazısının kısa açıklaması (SEO için önemli)"
                      />
                    </div>

                    {/* Cover Image */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Kapak Görseli URL
                      </label>
                      <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>📐 Önerilen Boyut:</strong> 1200x600 px (2:1 oran - kompakt)
                          <br />
                          <strong>💡 Kullanım:</strong> Sadece blog listesinde görünür (blog içinde GÖRÜNMEZ)
                          <br />
                          <strong>📱 Uyumluluk:</strong> Mobil & masaüstü optimize
                          <br />
                          <strong>🎨 Format:</strong> JPG, PNG veya WebP
                        </p>
                      </div>
                      <input
                        type="url"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                        placeholder="https://example.com/image.jpg (boş bırakırsanız FOKUS logosu kullanılır)"
                      />
                      {formData.coverImage && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-600 mb-2">Önizleme (2:1 oran - blog listesinde böyle görünecek):</p>
                          <div className="relative w-full max-w-md" style={{ aspectRatio: '2/1' }}>
                            <Image
                              src={formData.coverImage}
                              alt="Cover preview"
                              fill
                              unoptimized
                              className="object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Folder className="w-4 h-4" />
                        Kategori *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                      >
                        <option value="Yapay Zeka">Yapay Zeka</option>
                        <option value="Otomasyon">Otomasyon</option>
                        <option value="İş Süreçleri">İş Süreçleri</option>
                        <option value="Dijital Dönüşüm">Dijital Dönüşüm</option>
                        <option value="Teknoloji">Teknoloji</option>
                        <option value="Genel">Genel</option>
                      </select>
                    </div>

                    {/* Read Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Okuma Süresi
                      </label>
                      <input
                        type="text"
                        name="readTime"
                        value={formData.readTime}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                        placeholder="5 dakika okuma"
                      />
                    </div>

                    {/* Author */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yazar
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                        placeholder="FOKUS İstatistik"
                      />
                    </div>

                    {/* Published Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Yayın Tarihi
                      </label>
                      <input
                        type="date"
                        name="publishedDate"
                        value={formData.publishedDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Tags */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Etiketler
                      </label>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                        placeholder="yapay zeka, otomasyon, chatbot (virgülle ayırın)"
                      />
                    </div>

                    {/* Keywords */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        SEO Anahtar Kelimeler
                      </label>
                      <input
                        type="text"
                        name="keywords"
                        value={formData.keywords}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                        placeholder="anahtar kelime 1, anahtar kelime 2 (virgülle ayırın)"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Blog İçeriği (HTML)
                  </h2>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={20}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none font-mono text-sm"
                    placeholder="HTML içeriğini buraya girin..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    HTML etiketlerini kullanabilirsiniz: &lt;h1&gt;, &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;, vb.
                  </p>
                </div>
              </>
            ) : (
              /* Preview Section */
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="max-w-4xl mx-auto">
                  {/* Cover Image */}
                  {formData.coverImage && (
                    <div className="relative w-full h-64 mb-8">
                      <Image
                        src={formData.coverImage}
                        alt={formData.title}
                        fill
                        unoptimized
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#860000] text-white text-sm rounded-full">
                      {formData.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {formData.title || 'Blog Başlığı'}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(formData.publishedDate).toLocaleDateString('tr-TR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formData.readTime}
                    </span>
                    <span>{formData.author}</span>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-600 mb-8 italic">
                    {formData.description}
                  </p>

                  {/* Content */}
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />

                  {/* Tags */}
                  {formData.tags && (
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.split(',').map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-[#860000] text-white rounded-lg hover:bg-[#a30000] transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Kaydediliyor...' : 'Blog Yayınla'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </AuthGuard>
  );
}
