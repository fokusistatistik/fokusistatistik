import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { jwtVerify } from 'jose';
import { getJwtSecret } from '@/lib/jwt';

const BLOGS_FILE = path.join(process.cwd(), 'content', 'blogs-metadata.json');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

// Güvenlik: JWT token doğrulaması
async function checkAuth(request: NextRequest): Promise<boolean> {
  const sessionCookie = request.cookies.get('admin_session');

  if (!sessionCookie) {
    return false;
  }

  try {
    const secret = getJwtSecret();

    const { payload } = await jwtVerify(sessionCookie.value, secret);

    if (!payload.username || !payload.role || payload.role !== 'admin') {
      return false;
    }

    return true;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return false;
  }
}

// GET - List all blogs
export async function GET() {
  try {
    const data = await fs.readFile(BLOGS_FILE, 'utf-8');
    const blogs = JSON.parse(data);
    return NextResponse.json({ blogs });
  } catch {
    return NextResponse.json({ blogs: [] });
  }
}

// POST - Create new blog
export async function POST(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const blog = await request.json();

    // Blogs metadata dosyasını oku
    let blogs = [];
    try {
      const data = await fs.readFile(BLOGS_FILE, 'utf-8');
      blogs = JSON.parse(data);
    } catch {
      // Dosya yoksa boş array
      blogs = [];
    }

    // Yeni blog ekle
    const newBlog = {
      id: Date.now().toString(),
      slug: blog.slug,
      title: blog.title,
      description: blog.description,
      coverImage: blog.coverImage || '',
      tags: blog.tags || [],
      keywords: blog.keywords || [],
      category: blog.category || 'Genel',
      publishedDate: blog.publishedDate || new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      author: blog.author || 'FOKUS İstatistik',
      readTime: blog.readTime || '5 dakika okuma',
    };

    blogs.push(newBlog);

    // Metadata dosyasını güncelle
    await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2));

    // İçerik dosyasını oluştur
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    await fs.writeFile(
      path.join(CONTENT_DIR, `${blog.slug}.html`),
      blog.content || ''
    );

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json(
      { error: 'Blog oluşturulamadı' },
      { status: 500 }
    );
  }
}
