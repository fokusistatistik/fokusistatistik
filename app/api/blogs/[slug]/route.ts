import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { jwtVerify } from 'jose';
import { getJwtSecret } from '@/lib/jwt';

const BLOGS_FILE = path.join(process.cwd(), 'content', 'blogs-metadata.json');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

interface BlogMetadata {
  slug: string;
  [key: string]: unknown;
}

// Güvenlik: Path traversal saldırılarını önle
function sanitizeSlug(slug: string): string {
  // Sadece harf, rakam, tire ve alt çizgiye izin ver
  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
    throw new Error('Geçersiz slug formatı');
  }

  // Normalize et ve path traversal kontrolü
  const normalized = path.normalize(slug);
  if (normalized.includes('..') || normalized.includes('/') || normalized.includes('\\')) {
    throw new Error('Güvenlik ihlali tespit edildi');
  }

  return normalized;
}

// Güvenlik: JWT token doğrulaması
async function checkAuth(request: NextRequest): Promise<boolean> {
  const sessionCookie = request.cookies.get('admin_session');

  if (!sessionCookie) {
    return false;
  }

  try {
    const secret = getJwtSecret();

    const { payload } = await jwtVerify(sessionCookie.value, secret);

    // Payload kontrolü
    if (!payload.username || !payload.role || payload.role !== 'admin') {
      return false;
    }

    return true;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return false;
  }
}

// GET - Get single blog
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Güvenlik: Slug sanitizasyonu
    const safeSlug = sanitizeSlug(slug);

    // Metadata oku
    const data = await fs.readFile(BLOGS_FILE, 'utf-8');
    const blogs: BlogMetadata[] = JSON.parse(data);
    const blog = blogs.find((b) => b.slug === safeSlug);

    if (!blog) {
      return NextResponse.json({ error: 'Blog bulunamadı' }, { status: 404 });
    }

    // İçerik dosyasını oku
    let content = '';
    try {
      content = await fs.readFile(
        path.join(CONTENT_DIR, `${safeSlug}.html`),
        'utf-8'
      );
    } catch {
      content = '';
    }

    return NextResponse.json({ ...blog, content });
  } catch {
    return NextResponse.json({ error: 'Blog okunamadı' }, { status: 500 });
  }
}

// PUT - Update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const updates = await request.json();

    // Güvenlik: Slug sanitizasyonu
    const safeSlug = sanitizeSlug(slug);
    const newSafeSlug = updates.slug ? sanitizeSlug(updates.slug) : safeSlug;

    // Metadata oku
    const data = await fs.readFile(BLOGS_FILE, 'utf-8');
    const blogs: BlogMetadata[] = JSON.parse(data);
    const blogIndex = blogs.findIndex((b) => b.slug === safeSlug);

    if (blogIndex === -1) {
      return NextResponse.json({ error: 'Blog bulunamadı' }, { status: 404 });
    }

    // Blog'u güncelle
    blogs[blogIndex] = {
      ...blogs[blogIndex],
      ...updates,
      slug: newSafeSlug,
      updatedDate: new Date().toISOString(),
    };

    // Metadata dosyasını güncelle
    await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2));

    // Eğer slug değiştiyse eski dosyayı sil
    if (newSafeSlug !== safeSlug) {
      try {
        await fs.unlink(path.join(CONTENT_DIR, `${safeSlug}.html`));
      } catch {
        // Eski dosya yoksa devam et
      }
    }

    // İçerik dosyasını güncelle
    if (updates.content !== undefined) {
      await fs.writeFile(
        path.join(CONTENT_DIR, `${newSafeSlug}.html`),
        updates.content
      );
    }

    return NextResponse.json({ success: true, blog: blogs[blogIndex] });
  } catch (error) {
    console.error('Blog update error:', error);
    return NextResponse.json(
      { error: 'Blog güncellenemedi' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await params;

    // Güvenlik: Slug sanitizasyonu
    const safeSlug = sanitizeSlug(slug);

    // Metadata oku
    const data = await fs.readFile(BLOGS_FILE, 'utf-8');
    const blogs: BlogMetadata[] = JSON.parse(data);
    const filteredBlogs = blogs.filter((b) => b.slug !== safeSlug);

    if (blogs.length === filteredBlogs.length) {
      return NextResponse.json({ error: 'Blog bulunamadı' }, { status: 404 });
    }

    // Metadata dosyasını güncelle
    await fs.writeFile(BLOGS_FILE, JSON.stringify(filteredBlogs, null, 2));

    // İçerik dosyasını sil
    try {
      await fs.unlink(path.join(CONTENT_DIR, `${safeSlug}.html`));
    } catch {
      // Dosya yoksa devam et
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Blog deletion error:', error);
    return NextResponse.json({ error: 'Blog silinemedi' }, { status: 500 });
  }
}
