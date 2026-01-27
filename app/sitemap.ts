import { MetadataRoute } from 'next';
import fs from 'fs/promises';
import path from 'path';

interface Blog {
  slug: string;
  publishedDate: string;
  updatedDate: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fokusistatistik.com';
  const currentDate = new Date();

  // Ana sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ekibimiz`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sanalasistanlar`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/dijital`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/yapay-zeka-danismanligi`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },

    {
      url: `${baseUrl}/iletisim`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neden-biz`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/analiz-formu`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/sss`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/referanslar`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/memnuniyet-anketi`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    // Legal pages
    {
      url: `${baseUrl}/kvkk-aydinlatma`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cerez-politikasi`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kullanim-kosullari`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // Sanal asistan sayfaları
  const assistants = [
    'fokus001',
    'fokus216',
    'fokus314',
    'fokus520',
    'fokus618',
    'fokus707',
    'fokus717',
    'fokus808',
    'fokus999',
  ];

  const assistantPages = assistants.map((assistant) => ({
    url: `${baseUrl}/sanalasistanlar/${assistant}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Blog sayfaları - Blog listesi sayfası
  const blogPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Dinamik blog yazıları
  let dynamicBlogPages: MetadataRoute.Sitemap = [];
  try {
    const BLOGS_FILE = path.join(process.cwd(), 'content', 'blogs-metadata.json');
    const data = await fs.readFile(BLOGS_FILE, 'utf-8');
    const blogs: Blog[] = JSON.parse(data);

    dynamicBlogPages = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedDate || blog.publishedDate),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }));
  } catch (error) {
    console.error('Error reading blogs for sitemap:', error);
  }

  return [...staticPages, ...assistantPages, ...blogPages, ...dynamicBlogPages];
}
