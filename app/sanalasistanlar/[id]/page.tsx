import { CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { assistantsData, type AssistantData, type AssistantPackage } from '@/lib/assistantsData';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const assistantId = id?.toLowerCase() || '';
  const assistant = assistantsData[assistantId];

  if (!assistant) {
    return {
      title: 'Asistan Bulunamadı',
      description: 'Aradığınız sanal asistan mevcut değil.',
    };
  }

  return {
    title: `${assistant.name} - ${assistant.title}`,
    description: assistant.description.substring(0, 160),
    keywords: [
      assistant.title,
      assistant.name,
      'sanal asistan',
      'yapay zeka',
      'otomasyon',
      'dijital asistan',
      'FOKUS',
      'iş süreçleri otomasyonu',
    ],
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url: `https://fokusistatistik.com/sanalasistanlar/${assistantId}`,
      siteName: 'FOKUS İstatistik ve YZ Danışmanlığı',
      title: `${assistant.name} - ${assistant.title} | FOKUS İstatistik`,
      description: assistant.description.substring(0, 160),
      images: [
        {
          url: assistant.image,
          width: 800,
          height: 800,
          alt: `${assistant.name} - ${assistant.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${assistant.name} - ${assistant.title}`,
      description: assistant.description.substring(0, 160),
      images: [assistant.image],
    },
    alternates: {
      canonical: `https://fokusistatistik.com/sanalasistanlar/${assistantId}`,
    },
  };
}


export default async function AssistantDetail({ params }: { params: Promise<{ id: string }> }) {
  // Await params as required by Next.js 16
  const { id } = await params;
  const assistantId = id?.toLowerCase() || '';
  const displayAssistant = assistantsData[assistantId];

  // Not found state
  if (!displayAssistant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Asistan Bulunamadı</h1>
          <p className="text-gray-600 mb-8">
            Aradığınız sanal asistan mevcut değil veya kaldırılmış olabilir.
          </p>
          <Link
            href="/sanalasistanlar"
            className="inline-block bg-[#860000] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#a30000] transition"
          >
            Tüm Asistanları Görüntüle
          </Link>
        </div>
      </div>
    );
  }

  const featureKeys = displayAssistant?.packages?.length > 0
    ? Object.keys(displayAssistant.packages[0].features)
    : [];

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow">
        {/* Hero Section with Image */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8 items-center">
                {/* Image */}
                <div className="flex justify-center">
                  <div className="relative w-64 h-64">
                    <Image
                      src={displayAssistant.image}
                      alt={displayAssistant.title}
                      fill
                      className="object-contain rounded-[50%]"
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-[#860000]">
                    {displayAssistant.title}
                  </h1>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-700">
                    {displayAssistant.subtitle}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{displayAssistant.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800">
                🎯 Neden {displayAssistant.code}?
              </h2>

              <div className="space-y-4">
                {displayAssistant.whyReasons.map((reason, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-[#860000]"
                  >
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{reason.title}</h3>
                    <p className="text-gray-600">{reason.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800">
                🧠 {displayAssistant.code} Neler Yapar?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayAssistant.capabilities.map((capability, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{capability}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Video & QR Codes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Video */}
              <div className="lg:w-1/2 mx-auto mb-8">
                <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={displayAssistant.videoUrl}
                      title={`${displayAssistant.code} Video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* QR Codes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a
                  href={displayAssistant.requestQrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition border-2 border-[#860000]"
                >
                  <div className="w-40 h-40 mx-auto rounded-lg relative">
                    <Image
                      src={displayAssistant.requestQrImage}
                      alt="Talep Et QR Kod"
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>

                <a
                  href={displayAssistant.testQrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition border-2 border-[#860000]"
                >
                  <div className="w-40 h-40 mx-auto rounded-lg relative">
                    <Image
                      src={displayAssistant.testQrImage}
                      alt="Test Et QR Kod"
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        {displayAssistant?.packages && displayAssistant.packages.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800">
                  {displayAssistant.code} {displayAssistant.title.toUpperCase()} - PAKETLERİ
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white shadow-md text-sm rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-[#860000] text-white">
                        <th className="p-2 text-left font-semibold text-xs">ÖZELLİK</th>
                        {displayAssistant.packages.map((pkg) => (
                          <th key={pkg.name} className="p-2 text-center font-semibold text-xs">
                            {pkg.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {featureKeys.map((featureKey, index) => (
                        <tr
                          key={featureKey}
                          className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                        >
                          <td className="p-2 border-b text-xs border-gray-200 font-medium text-gray-700">
                            {featureKey}
                          </td>
                          {displayAssistant.packages.map((pkg) => {
                            const value = pkg.features[featureKey];
                            return (
                              <td key={pkg.name} className="p-2 border-b border-gray-200 text-center text-xs">
                                {typeof value === 'boolean' ? (
                                  value ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" />
                                  ) : (
                                    <X className="w-4 h-4 text-red-600 mx-auto" />
                                  )
                                ) : (
                                  <span className="text-gray-700">{value}</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}


                    </tbody>
                  </table>
                </div>


              </div>
            </div>
          </section>
        )}

        {/* Price Note for non-packaged assistants */}
        {displayAssistant?.packages && displayAssistant.packages.length === 0 && displayAssistant.priceNote && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Özel Fiyatlandırma</h2>
                  <p className="text-gray-700 leading-relaxed text-center">{displayAssistant.priceNote}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>


    </div>
  );
}

