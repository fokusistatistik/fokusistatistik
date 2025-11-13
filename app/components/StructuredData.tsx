import Script from 'next/script';

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
    logo: 'https://www.fokusistatistik.com/assets/img/logobeyaz.png',
    image: 'https://static.fokusistatistik.com/logolar/fokuslogo1.png',
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
    <Script
      id="organization-schema"
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
    <Script
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
    image: image || 'https://static.fokusistatistik.com/logolar/fokuslogo1.png',
    areaServed: {
      '@type': 'Country',
      name: 'Türkiye',
    },
  };

  return (
    <Script
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
    <Script
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
    <Script
      id="software-app-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
