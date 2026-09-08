// Not: next/script'in Script bileşeni yerine bilinçli olarak düz <script> etiketi
// kullanılıyor. Script bileşeni JSON-LD'yi ham SSR HTML'ine değil, RSC payload'ına
// gömüyor ve sadece client-side hydration sonrası DOM'a ekliyor — bu da JavaScript
// çalıştırmayan crawler'ların (GEO için kritik GPTBot, ClaudeBot, PerplexityBot vb.
// ve Google'ın ilk tarama dalgası) structured data'yı hiç görememesine yol açıyor.

interface OrganizationSchemaProps {
  type?: 'Organization' | 'LocalBusiness' | 'ProfessionalService';
}

export function OrganizationSchema({ type = 'ProfessionalService' }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    name: 'FOKUS İstatistik ve YZ Danışmanlığı',
    alternateName: 'FOKUS İstatistik',
    description:
      'Yapay zeka tabanlı sanal asistanlar, veri analizi, istatistiksel danışmanlık ve dijital dönüşüm çözümleri sunuyoruz. 9 farklı sanal asistan ile iş süreçlerinizi otomatikleştirin.',
    url: 'https://fokusistatistik.com',
    logo: 'https://fokusistatistik.com/assets/cdn/resimler/logobeyaz.png',
    image: 'https://fokusistatistik.com/assets/cdn/logolar/fokuslogo1.png',
    email: 'bilgi@fokusistatistik.com',
    telephone: '+905354040712',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressRegion: 'Türkiye',
    },
    sameAs: [
      'https://asistan.fokusistatistik.com',
      'https://www.fokusistatistik.com',
    ],
    knowsAbout: [
      'Yapay Zeka',
      'Veri Bilimi',
      'İstatistik',
      'Veri Analizi',
      'Sanal Asistan',
      'ChatGPT',
      'Dijital Dönüşüm',
      'Otomasyon',
      'Machine Learning',
      'İş Zekası',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Türkiye',
    },
    serviceType: [
      'Yapay Zeka Danışmanlığı',
      'Veri Analizi',
      'İstatistiksel Danışmanlık',
      'Sanal Asistan Hizmetleri',
      'Dijital Dönüşüm',
      'İş Süreçleri Otomasyonu',
    ],
  };

  return (
    <script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  // Not: potentialAction/SearchAction eklenmedi çünkü site içi bir arama
  // sayfası yok (Header'daki arama, Google'a yönlendiren harici bir link) —
  // Google'ın Sitelinks Arama Kutusu şartı site içi arama sonucu döndürmeyi
  // gerektirir, harici yönlendirme bu şartı sağlamaz.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FOKUS İstatistik ve YZ Danışmanlığı',
    url: 'https://fokusistatistik.com',
    inLanguage: 'tr-TR',
  };

  return (
    <script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface VideoSchemaProps {
  name: string;
  description: string;
  embedUrl: string;
  uploadDate: string;
  thumbnailUrl: string;
}

export function VideoSchema({ name, description, embedUrl, uploadDate, thumbnailUrl }: VideoSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    embedUrl,
    uploadDate,
    thumbnailUrl,
    publisher: {
      '@type': 'Organization',
      name: 'FOKUS İstatistik ve YZ Danışmanlığı',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fokusistatistik.com/assets/cdn/resimler/logobeyaz.png',
      },
    },
  };

  return (
    <script
      id={`video-schema-${embedUrl.split('/').pop()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
}

export function ServiceSchema({ name, description, url, image }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'FOKUS İstatistik ve YZ Danışmanlığı',
      url: 'https://fokusistatistik.com',
    },
    serviceType: name,
    url,
    image: image || 'https://fokusistatistik.com/assets/cdn/logolar/fokuslogo1.png',
    areaServed: {
      '@type': 'Country',
      name: 'Türkiye',
    },
  };

  return (
    <script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  faqs: { question: string; answer: string }[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface SoftwareAppSchemaProps {
  name: string;
  description: string;
  applicationCategory: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

export function SoftwareAppSchema({
  name,
  description,
  applicationCategory,
  offers,
}: SoftwareAppSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory,
    operatingSystem: 'Web',
    offers: offers
      ? {
          '@type': 'Offer',
          price: offers.price,
          priceCurrency: offers.priceCurrency,
        }
      : undefined,
    author: {
      '@type': 'Organization',
      name: 'FOKUS İstatistik ve YZ Danışmanlığı',
    },
  };

  return (
    <script
      id="software-app-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
