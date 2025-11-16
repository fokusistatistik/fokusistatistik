import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

function checkAuth(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  return !!session;
}

const BLOGS_FILE = path.join(process.cwd(), 'content', 'blogs-metadata.json');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

// POST - Backup blogs to git
export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action } = await request.json();

    if (action === 'backup') {
      // Git'e blogları commit et
      try {
        // Content klasörünü stage'e ekle
        await execAsync('git add content/');

        // Commit yap
        const timestamp = new Date().toISOString();
        await execAsync(`git commit -m "chore: Backup blogs - ${timestamp}"`);

        // Push yap (isteğe bağlı)
        // await execAsync('git push');

        return NextResponse.json({
          success: true,
          message: 'Bloglar başarıyla yedeklendi (git commit)',
        });
      } catch (error: any) {
        // Eğer değişiklik yoksa commit hatası verir, onu yakalayalım
        if (error.message.includes('nothing to commit')) {
          return NextResponse.json({
            success: true,
            message: 'Yedeklenecek yeni değişiklik yok',
          });
        }
        throw error;
      }
    }

    if (action === 'export') {
      // Tüm blogları ve içerikleri bir ZIP veya JSON olarak dışa aktar
      const blogsData = await fs.readFile(BLOGS_FILE, 'utf-8');
      const blogs = JSON.parse(blogsData);

      // Her blog için içeriği de ekle
      const fullBackup = await Promise.all(
        blogs.map(async (blog: any) => {
          try {
            const content = await fs.readFile(
              path.join(CONTENT_DIR, `${blog.slug}.html`),
              'utf-8'
            );
            return { ...blog, content };
          } catch {
            return { ...blog, content: '' };
          }
        })
      );

      return NextResponse.json({
        success: true,
        data: fullBackup,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json(
      { error: 'Yedekleme başarısız oldu' },
      { status: 500 }
    );
  }
}

// PUT - Restore blogs from backup
export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { blogs } = await request.json();

    if (!Array.isArray(blogs)) {
      return NextResponse.json(
        { error: 'Geçersiz yedekleme formatı' },
        { status: 400 }
      );
    }

    // Metadata dosyasını yaz
    const metadata = blogs.map((blog: any) => {
      const { content, ...meta } = blog;
      return meta;
    });

    await fs.writeFile(BLOGS_FILE, JSON.stringify(metadata, null, 2));

    // İçerik dosyalarını yaz
    await fs.mkdir(CONTENT_DIR, { recursive: true });

    for (const blog of blogs) {
      if (blog.content) {
        await fs.writeFile(
          path.join(CONTENT_DIR, `${blog.slug}.html`),
          blog.content
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `${blogs.length} blog başarıyla geri yüklendi`,
    });
  } catch (error) {
    console.error('Restore error:', error);
    return NextResponse.json(
      { error: 'Geri yükleme başarısız oldu' },
      { status: 500 }
    );
  }
}
