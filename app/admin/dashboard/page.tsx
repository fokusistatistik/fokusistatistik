'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/admin/AuthGuard';
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  FileText,
  Calendar,
  Tag,
  Eye,
  Search,
  Download,
  Upload,
  Save,
} from 'lucide-react';

interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  category: string;
  publishedDate: string;
  updatedDate: string;
  readTime: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleDelete = async (slug: string) => {
    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBlogs(blogs.filter((b) => b.slug !== slug));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleBackupToGit = async () => {
    try {
      const response = await fetch('/api/blogs/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'backup' }),
      });
      const data = await response.json();
      alert(data.message || 'Yedekleme başarılı!');
    } catch (error) {
      alert('Yedekleme başarısız oldu');
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('/api/blogs/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'export' }),
      });
      const data = await response.json();

      // JSON dosyası olarak indir
      const blob = new Blob([JSON.stringify(data.data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `blogs-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Dışa aktarma başarısız oldu');
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const text = await file.text();
        const blogs = JSON.parse(text);

        const response = await fetch('/api/blogs/backup', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ blogs }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          fetchBlogs(); // Listeyi yenile
        } else {
          alert(data.error || 'Geri yükleme başarısız');
        }
      } catch (error) {
        alert('Dosya okunamadı veya geçersiz format');
      }
    };
    input.click();
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  FOKUS Admin Panel
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Blog Yönetim Sistemi
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Çıkış Yap
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex-1 w-full sm:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Blog ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#860000] focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleBackupToGit}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                title="Blogları Git'e yedekle"
              >
                <Save className="w-4 h-4" />
                Git Yedekle
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                title="Blogları JSON olarak indir"
              >
                <Download className="w-4 h-4" />
                Dışa Aktar
              </button>
              <button
                onClick={handleImport}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
                title="JSON dosyasından geri yükle"
              >
                <Upload className="w-4 h-4" />
                İçe Aktar
              </button>
              <button
                onClick={() => router.push('/admin/blog/new')}
                className="flex items-center gap-2 px-6 py-2 bg-[#860000] text-white rounded-lg hover:bg-[#a30000] transition font-semibold"
              >
                <Plus className="w-5 h-5" />
                Yeni Blog Ekle
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Toplam Blog</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {blogs.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Tag className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Toplam Etiket</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(blogs.flatMap((b) => b.tags)).size}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bu Ay</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      blogs.filter((b) => {
                        const blogDate = new Date(b.publishedDate);
                        const now = new Date();
                        return (
                          blogDate.getMonth() === now.getMonth() &&
                          blogDate.getFullYear() === now.getFullYear()
                        );
                      }).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Blog List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Blog Yazıları
              </h2>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#860000] mx-auto mb-4"></div>
                <p className="text-gray-600">Yükleniyor...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  {searchQuery
                    ? 'Arama sonucu bulunamadı'
                    : 'Henüz blog yazısı yok'}
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => router.push('/admin/blog/new')}
                    className="text-[#860000] hover:text-[#a30000] font-semibold"
                  >
                    İlk blog yazınızı ekleyin
                  </button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="p-6 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-start gap-4">
                      {/* Cover Image */}
                      {blog.coverImage && (
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {blog.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(blog.publishedDate).toLocaleDateString(
                              'tr-TR'
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {blog.category}
                          </span>
                          {blog.tags.length > 0 && (
                            <div className="flex gap-2">
                              {blog.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-gray-100 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                              {blog.tags.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                                  +{blog.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <a
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Görüntüle"
                        >
                          <Eye className="w-5 h-5" />
                        </a>
                        <button
                          onClick={() =>
                            router.push(`/admin/blog/edit/${blog.slug}`)
                          }
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="Düzenle"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(blog.slug)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Sil"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Delete Confirmation */}
                    {deleteConfirm === blog.slug && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800 mb-3">
                          Bu blog yazısını silmek istediğinizden emin misiniz?
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(blog.slug)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold"
                          >
                            Evet, Sil
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition text-sm font-semibold"
                          >
                            İptal
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
