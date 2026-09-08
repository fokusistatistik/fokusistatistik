export interface UrunItem {
  slug: string;
  name: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  tagline: string;
  description: string;
  features: string[];
  image?: string;
  imageAlt?: string;
  imageNote?: string;
  videoEmbedUrl?: string;
  videoUploadDate?: string;
  videoThumbnail?: string;
  primaryCta: {
    label: string;
    href: string;
    external: boolean;
  };
  secondaryCta?: {
    label: string;
    href: string;
    external: boolean;
  };
}

export const urunler: UrunItem[] = [
  {
    slug: 'nobetcim',
    name: 'Nöbetçim',
    logo: '/assets/cdn/urunler/nobetcim-yatay-logo.png',
    logoWidth: 800,
    logoHeight: 208,
    tagline: 'Nöbet ve vardiya planlamasını otomatikleştirin',
    description:
      'Sağlık, güvenlik ve endüstriyel tesisler gibi farklı sektörler için geliştirilmiş genel amaçlı nöbet/vardiya planlama SaaS platformu. Personel taleplerini ve kısıtlarını dikkate alarak çakışmasız nöbet çizelgeleri oluşturur.',
    features: [
      'Personel taleplerini ve izin/kısıtlamalarını otomatik dikkate alır',
      'Çakışmasız nöbet ve vardiya çizelgeleri saniyeler içinde oluşturulur',
      'Sağlık, güvenlik ve endüstriyel tesis gibi farklı sektörlere uyarlanabilir',
    ],
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/Lzl-4YCFrts',
    videoUploadDate: '2026-08-21',
    videoThumbnail: 'https://img.youtube.com/vi/Lzl-4YCFrts/maxresdefault.jpg',
    primaryCta: {
      label: 'Siteyi Ziyaret Et',
      href: 'https://nobetcim.net',
      external: true,
    },
  },
  {
    slug: 'cizelgecim',
    name: 'Çizelgecim',
    logo: '/assets/cdn/urunler/cizelgecim-yatay-logo.png',
    logoWidth: 1370,
    logoHeight: 333,
    tagline: 'Okulunuzun ders programını saniyeler içinde oluşturun',
    description:
      'Okullar için haftalık ders programı (school timetabling) optimizasyonu yapan self-servis SaaS. Öğretmen × Ders × Sınıf × Derslik\'i çakışmasız bir haftalık tabloya oturtur, öğretmen taleplerini ve gün kapatmalarını dikkate alır.',
    features: [
      'Öğretmen, ders, sınıf ve derslik kısıtlarını aynı anda çözer',
      'Öğretmen taleplerini ve müsaitlik durumlarını otomatik değerlendirir',
      'Okul yöneticileri için self-servis, kurulum gerektirmeyen kullanım',
    ],
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/VAPaBB6kQBw',
    videoUploadDate: '2026-09-07',
    videoThumbnail: 'https://img.youtube.com/vi/VAPaBB6kQBw/maxresdefault.jpg',
    primaryCta: {
      label: 'Siteyi Ziyaret Et',
      href: 'https://cizelgecim.net',
      external: true,
    },
  },
  {
    slug: 'sigma',
    name: 'Sigma',
    logo: '/assets/cdn/urunler/sigma-logo-horizontal.png',
    logoWidth: 431,
    logoHeight: 200,
    tagline: 'Hastane yönetimini veriye dayalı hale getirin',
    description:
      'Kamu ve özel hastaneler için geliştirilmiş Sağlık Bilgi Yönetim Sistemi (SBYS). Hastane doluluk, denetim, finansal ve personel verilerini tek panelde birleştirerek veriye dayalı karar almayı destekler.',
    features: [
      'Hastane doluluk, denetim ve finansal verilerini tek panelde birleştirir',
      'Kamu ve özel hastane sürümleri mevcuttur',
      'Veri güvenliği için on-premise veya kuruma özel domain üzerinde kurulum sunulur',
    ],
    image: '/assets/cdn/urunler/sigma-harita.jpg',
    imageAlt: 'Sigma Coğrafi Bilgi Sistemi harita modülü ekran görüntüsü',
    imageNote: 'Sigma-CBS harita modülü — örnek görünüm',
    primaryCta: {
      label: 'İletişime Geçin',
      href: '/iletisim',
      external: false,
    },
    secondaryCta: {
      label: 'Demo Ortamını Görüntüle',
      href: 'https://sigma.fokusistatistik.com',
      external: true,
    },
  },
];
