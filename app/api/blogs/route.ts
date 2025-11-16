import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const BLOGS_FILE = path.join(process.cwd(), 'content', 'blogs-metadata.json');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

// Auth check helper
function checkAuth(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  return !!session;
}

// GET - List all blogs
export async function GET(request: NextRequest) {
  try {
    const data = await fs.readFile(BLOGS_FILE, 'utf-8');
    const blogs = JSON.parse(data);
    return NextResponse.json({ blogs });
  } catch (error) {
    return NextResponse.json({ blogs: [] });
  }
}

// POST - Create new blog
export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const blog = await request.json();

    // Blogs metadata dosyasını oku
    let blogs = [];
    try {
      const data = await fs.readFile(BLOGS_FILE, 'utf-8');
      blogs = JSON.parse(data);
    } catch (error) {
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
