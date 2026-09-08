import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { BreadcrumbSchema, SoftwareAppSchema, VideoSchema } from '@/app/components/StructuredData';
import { urunler } from '@/lib/urunlerimiz';

export const metadata: Metadata = {
  title: 'Ürünlerimiz | Nöbetçim, Çizelgecim, Sigma - FOKUS İstatistik Ürün Ailesi',
  description:
    'FOKUS İstatistik ürün ailesi: Nöbetçim (nöbet/vardiya planlama), Çizelgecim (okul ders programı optimizasyonu) ve Sigma (hastaneler için Sağlık Bilgi Yönetim Sistemi).',
  keywords: [
    'nöbet çizelgesi yazılımı',
    'vardiya planlama programı',
    'ders programı oluşturma yazılımı',
    'okul ders programı programı',
    'hastane sağlık bilgi yönetim sistemi',
    'SBYS',
    'nöbetçim',
    'çizelgecim',
    'sigma sağlık istatistikleri',
    'FOKUS ürünleri',
  ],
  openGraph: {
    title: 'Ürünlerimiz | FOKUS İstatistik Ürün Ailesi',
    description:
      'Nöbetçim, Çizelgecim ve Sigma: FOKUS İstatistik\'in geliştirdiği nöbet/vardiya planlama, ders programı optimizasyonu ve hastane yönetim sistemi ürünleri.',
    url: 'https://fokusistatistik.com/urunlerimiz',
  },
  alternates: {
    canonical: 'https://fokusistatistik.com/urunlerimiz',
  },
};

const applicationCategoryBySlug: Record<string, string> = {
  nobetcim: 'BusinessApplication',
  cizelgecim: 'EducationApplication',
  sigma: 'HealthApplication',
};

export default function UrunlerimizPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://fokusistatistik.com' },
          { name: 'Ürünlerimiz', url: 'https://fokusistatistik.com/urunlerimiz' },
        ]}
      />
      {urunler.map((urun) => (
        <SoftwareAppSchema
          key={urun.slug}
          name={urun.name}
          description={urun.description}
          applicationCategory={applicationCategoryBySlug[urun.slug] || 'BusinessApplication'}
        />
      ))}
      {urunler
        .filter((urun) => urun.videoEmbedUrl)
        .map((urun) => (
          <VideoSchema
            key={`video-${urun.slug}`}
            name={`${urun.name} Tanıtım Videosu`}
            description={urun.description}
            embedUrl={urun.videoEmbedUrl!}
            uploadDate={urun.videoUploadDate!}
            thumbnailUrl={urun.videoThumbnail!}
          />
        ))}

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero */}
        <section className="pt-8 px-4">
          <div className="max-w-5xl mx-auto bg-[#2b2b2b] text-white rounded-2xl px-6 py-4 shadow-lg flex items-center gap-4">
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src="/assets/cdn/resimler/favicon.png"
                alt="FOKUS logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-px self-stretch bg-white/25" aria-hidden="true" />
            <div>
              <h1 className="text-lg lg:text-xl font-bold leading-tight">FOKUS İstatistik Ürün Ailesi</h1>
              <p className="text-xs lg:text-sm text-gray-300">
                Sanal asistanlarımızın yanı sıra, farklı sektörlere özel geliştirdiğimiz bağımsız
                SaaS ürünlerimiz
              </p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-16">
              {urunler.map((urun) => {
                const hasVisual = Boolean(urun.image || urun.videoEmbedUrl);
                return (
                <div
                  key={urun.slug}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-12"
                >
                  <div
                    className={`grid grid-cols-1 ${hasVisual ? 'lg:grid-cols-2' : ''} gap-8 items-center`}
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={
                            urun.slug === 'sigma'
                              ? 'relative h-[77px] w-[170px] flex-shrink-0'
                              : 'relative h-11 w-40 flex-shrink-0'
                          }
                        >
                          <Image
                            src={urun.logo}
                            alt={`${urun.name} logo`}
                            fill
                            className="object-contain object-left"
                          />
                        </div>
                        <div className="w-px self-stretch bg-gray-300" aria-hidden="true" />
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                          {urun.tagline}
                        </h2>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-6">{urun.description}</p>

                      <ul className="space-y-3 mb-8">
                        {urun.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#860000] flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-col sm:flex-row gap-3">
                        {urun.primaryCta.external ? (
                          <a
                            href={urun.primaryCta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#860000] hover:bg-[#6b0000] text-white font-semibold px-6 py-3 rounded-lg transition"
                          >
                            {urun.primaryCta.label}
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        ) : (
                          <Link
                            href={urun.primaryCta.href}
                            className="inline-flex items-center justify-center gap-2 bg-[#860000] hover:bg-[#6b0000] text-white font-semibold px-6 py-3 rounded-lg transition"
                          >
                            {urun.primaryCta.label}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                        {urun.secondaryCta && (
                          <a
                            href={urun.secondaryCta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#860000] text-[#860000] hover:bg-[#860000] hover:text-white font-semibold px-6 py-3 rounded-lg transition"
                          >
                            {urun.secondaryCta.label}
                          </a>
                        )}
                      </div>
                    </div>

                    {urun.videoEmbedUrl ? (
                      <div>
                        <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-md" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            src={urun.videoEmbedUrl}
                            title={`${urun.name} tanıtım videosu`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                          />
                        </div>
                      </div>
                    ) : urun.image ? (
                      <div>
                        <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-md" style={{ aspectRatio: '1151/641' }}>
                          <Image
                            src={urun.image}
                            alt={urun.imageAlt || urun.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {urun.imageNote && (
                          <p className="text-xs text-gray-500 mt-2 text-center">{urun.imageNote}</p>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-gray-50 to-white border-2 border-[#860000] rounded-3xl p-10 shadow-xl">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-800">
                Sektörünüze özel bir çözüme mi ihtiyacınız var?
              </h2>
              <p className="text-gray-600 mb-6">
                FOKUS ürün ailesindeki çözümlerden biri işletmenize uymuyorsa, ihtiyacınıza özel
                bir çözüm için bizimle iletişime geçin.
              </p>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 bg-[#860000] hover:bg-[#6b0000] text-white font-semibold px-8 py-4 rounded-lg transition"
              >
                İletişime Geçin
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
