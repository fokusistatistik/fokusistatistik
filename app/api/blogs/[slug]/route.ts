import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const BLOGS_FILE = path.join(process.cwd(), 'content', 'blogs-metadata.json');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

function checkAuth(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  return !!session;
}

// GET - Get single blog
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Metadata oku
    const data = await fs.readFile(BLOGS_FILE, 'utf-8');
    const blogs = JSON.parse(data);
    const blog = blogs.find((b: any) => b.slug === slug);

    if (!blog) {
      return NextResponse.json({ error: 'Blog bulunamadı' }, { status: 404 });
    }

    // İçerik dosyasını oku
    let content = '';
    try {
      content = await fs.readFile(
        path.join(CONTENT_DIR, `${slug}.html`),
        'utf-8'
      );
    } catch (error) {
      content = '';
    }

    return NextResponse.json({ ...blog, content });
  } catch (error) {
    return NextResponse.json({ error: 'Blog okunamadı' }, { status: 500 });
  }
}

// PUT - Update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = params;
    const updates = await request.json();

    // Metadata oku
    const data = await fs.readFile(BLOGS_FILE, 'utf-8');
    const blogs = JSON.parse(data);
    const blogIndex = blogs.findIndex((b: any) => b.slug === slug);

    if (blogIndex === -1) {
      return NextResponse.json({ error: 'Blog bulunamadı' }, { status: 404 });
    }

    // Blog'u güncelle
    blogs[blogIndex] = {
      ...blogs[blogIndex],
      ...updates,
      slug: updates.slug || blogs[blogIndex].slug,
      updatedDate: new Date().toISOString(),
    };

    // Metadata dosyasını güncelle
    await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2));

    // Eğer slug değiştiyse eski dosyayı sil
    if (updates.slug && updates.slug !== slug) {
      try {
        await fs.unlink(path.join(CONTENT_DIR, `${slug}.html`));
      } catch (error) {
        // Eski dosya yoksa devam et
      }
    }

    // İçerik dosyasını güncelle
    if (updates.content !== undefined) {
      await fs.writeFile(
        path.join(CONTENT_DIR, `${updates.slug || slug}.html`),
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
  { params }: { params: { slug: string } }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = params;

    // Metadata oku
    const data = await fs.readFile(BLOGS_FILE, 'utf-8');
    const blogs = JSON.parse(data);
    const filteredBlogs = blogs.filter((b: any) => b.slug !== slug);

    if (blogs.length === filteredBlogs.length) {
      return NextResponse.json({ error: 'Blog bulunamadı' }, { status: 404 });
    }

    // Metadata dosyasını güncelle
    await fs.writeFile(BLOGS_FILE, JSON.stringify(filteredBlogs, null, 2));

    // İçerik dosyasını sil
    try {
      await fs.unlink(path.join(CONTENT_DIR, `${slug}.html`));
    } catch (error) {
      // Dosya yoksa devam et
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Blog deletion error:', error);
    return NextResponse.json({ error: 'Blog silinemedi' }, { status: 500 });
  }
}
