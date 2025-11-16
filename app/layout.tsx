import type { Metadata } from "next";
import Header from "@/components/Header";
import ChatWidget from "@/app/components/ChatWidget";
import VapiWidget from "@/app/components/VapiWidget";
import Footer from "@/components/Footer";
import CookieConsent from "@/app/components/CookieConsent";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import { OrganizationSchema } from "@/app/components/StructuredData";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://fokusistatistik.com'),
  title: {
    default: "FOKUS İstatistik ve YZ Danışmanlığı | Yapay Zeka, Sanal Asistan, Veri Analizi",
    template: "%s | FOKUS İstatistik",
  },
  description: "Türkiye'nin lider yapay zeka danışmanlık şirketi. 9 farklı sanal asistan ile iş süreçlerinizi dijitalleştirin. ChatGPT tabanlı çözümler, veri analizi, istatistiksel danışmanlık, dijital dönüşüm hizmetleri. Yönetim, müşteri hizmetleri, pazarlama, finans otomasyonu.",
  keywords: [
    // Ana keywords
    "yapay zeka danışmanlığı",
    "sanal asistan",
    "yapay zeka",
    "istatistik",
    "veri analizi",
    "dijital dönüşüm",
    "chatgpt",
    // İş süreçleri
    "iş süreçleri otomasyonu",
    "dijital otomasyon",
    "akıllı asistan",
    "ai danışmanlık",
    // Hizmetler
    "veri bilimi",
    "istatistiksel danışmanlık",
    "veri görselleştirme",
    "iş zekası",
    "büyük veri analizi",
    "machine learning",
    "derin öğrenme",
    // Sektörler
    "müşteri hizmetleri otomasyonu",
    "pazarlama otomasyonu",
    "finans otomasyonu",
    "insan kaynakları otomasyonu",
    "yönetim asistanı",
    // Teknolojiler
    "openai",
    "gpt-4",
    "doğal dil işleme",
    "nlp",
    "chatbot",
    "sesli asistan",
    "konuşma yapay zekası",
    // Türkçe
    "yapay zeka türkiye",
    "sanal asistan türkçe",
    "chatgpt türkçe",
    "veri analizi hizmeti",
  ],
  authors: [{ name: "FOKUS İstatistik ve YZ Danışmanlığı", url: "https://fokusistatistik.com" }],
  creator: "FOKUS İstatistik",
  publisher: "FOKUS İstatistik",
  category: "Technology",
  classification: "Yapay Zeka ve Veri Bilimi Danışmanlığı",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://fokusistatistik.com',
  },
  manifest: "/manifest.json",
  themeColor: "#860000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  icons: {
    icon: "https://static.fokusistatistik.com/resimler/faviconfokus.png",
    apple: "https://static.fokusistatistik.com/resimler/faviconfokus.png",
    shortcut: "https://static.fokusistatistik.com/resimler/faviconfokus.png",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://fokusistatistik.com",
    siteName: "FOKUS İstatistik ve YZ Danışmanlığı",
    title: "FOKUS İstatistik | Yapay Zeka Danışmanlığı, Sanal Asistan, Veri Analizi",
    description: "Türkiye'nin en kapsamlı yapay zeka danışmanlık platformu. 9 farklı sanal asistan ile dijital dönüşümünüzü hızlandırın. ChatGPT, veri analizi, istatistik ve otomasyon çözümleri.",
    images: [
      {
        url: "https://static.fokusistatistik.com/resimler/fokus-ekosistem-og.jpg",
        width: 1200,
        height: 630,
        alt: "FOKUS İstatistik - Yapay Zeka ve Sanal Asistan Ekosistemi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FOKUS İstatistik | Yapay Zeka Danışmanlığı & Sanal Asistan",
    description: "9 farklı AI sanal asistan ile dijital dönüşümünüzü hızlandırın. ChatGPT, veri analizi ve otomasyon çözümleri.",
    images: ["https://static.fokusistatistik.com/resimler/fokus-ekosistem-og.jpg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased pt-16">
        <OrganizationSchema type="ProfessionalService" />
        <GoogleAnalytics />
        <Header />
        <div className="w-full flex justify-center">
          <div className="w-full lg:w-[75%]">
            {children}
          </div>
        </div>
        <Footer />
        <ChatWidget />
        <VapiWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
