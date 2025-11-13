import type { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider";
import Header from "@/components/Header";
import ChatWidget from "@/app/components/ChatWidget";
import VapiWidget from "@/app/components/VapiWidget";
import Footer from "@/components/Footer";
import PromotionCTA from "@/app/components/PromotionCTA";
import CookieConsent from "@/app/components/CookieConsent";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import ToastProvider from "@/components/ToastProvider";
import { OrganizationSchema } from "@/app/components/StructuredData";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://fokusistatistik.com'),
  title: {
    default: "FOKUS İstatistik | Yapay Zeka ile Maliyet Düşürme, Personel Verimliliği ve İş Otomasyonu",
    template: "%s | FOKUS İstatistik",
  },
  description: "Yapay zeka ile personel maliyetlerini %40 azaltın. 9 AI sanal asistan ile iş süreçlerinizi otomatikleştirin: müşteri hizmetleri chatbot, veri analizi, pazarlama otomasyonu. ChatGPT tabanlı çözümler, işletmeler için yapay zeka danışmanlığı. İş verimliliğini artırın, kazancınızı yükseltin.",
  keywords: [
    // Ana keywords (Yüksek Rekabet)
    "yapay zeka danışmanlığı",
    "sanal asistan",
    "yapay zeka",
    "chatbot",
    "veri analizi",
    "dijital dönüşüm",
    "istatistik danışmanlığı",

    // Long-tail keywords (Düşük Rekabet, Yüksek Dönüşüm)
    "yapay zeka ile maliyet düşürme",
    "personel maliyetlerini azaltma",
    "yapay zeka ile iş verimliliği",
    "chatbot ile müşteri hizmetleri",
    "işletmeler için yapay zeka",
    "küçük işletme veri analizi",
    "şirket verimlilik artırma",
    "iş süreçleri otomasyonu çözümleri",
    "personel verimliliği artırma yöntemleri",
    "dijital dönüşüm danışmanlığı",

    // Sorgu Bazlı (Voice Search / Question-based)
    "yapay zekayı işimde nasıl kullanırım",
    "personel maliyetlerimi nasıl azaltırım",
    "chatbot ne işe yarar",
    "veri analizi neden önemli",
    "müşteri hizmetlerinde yapay zeka",
    "sanal asistan ile para kazanma",
    "yapay zeka ile kazanç artırma",
    "iş geliştirme stratejileri yapay zeka",

    // İş Süreçleri
    "müşteri hizmetleri otomasyonu",
    "pazarlama otomasyonu",
    "finans otomasyonu",
    "insan kaynakları otomasyonu",
    "yönetim asistanı yapay zeka",
    "dijital otomasyon çözümleri",

    // Teknolojiler
    "chatgpt işletme",
    "openai türkiye",
    "gpt-4 danışmanlık",
    "ai chatbot türkçe",
    "sanal asistan türkçe",
    "sesli asistan türkiye",

    // Hizmetler
    "veri bilimi danışmanlığı",
    "istatistiksel danışmanlık",
    "veri görselleştirme hizmetleri",
    "iş zekası çözümleri",
    "büyük veri analizi",
    "machine learning danışmanlık",

    // Sektörel
    "kobi yapay zeka çözümleri",
    "e-ticaret chatbot",
    "sağlık sektörü veri analizi",
    "finans sektörü yapay zeka",
    "eğitim sektörü otomasyon",
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
    icon: "https://www.fokusistatistik.com/assets/img/favicon.png",
    apple: "https://www.fokusistatistik.com/assets/img/favicon.png",
    shortcut: "https://www.fokusistatistik.com/assets/img/favicon.png",
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
        url: "https://www.fokusistatistik.com/assets/img/fokus-ekosistem-og.jpg",
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
    images: ["https://www.fokusistatistik.com/assets/img/fokus-ekosistem-og.jpg"],
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
      <body className="antialiased">
        <OrganizationSchema type="ProfessionalService" />
        <GoogleAnalytics />
        <ToastProvider />
        <Header />
        <SessionProvider>
          {children}
          <Footer />
        </SessionProvider>
        <ChatWidget />
        <VapiWidget />
        <PromotionCTA />
        <CookieConsent />
      </body>
    </html>
  );
}
