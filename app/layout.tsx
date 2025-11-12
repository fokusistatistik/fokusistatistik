import type { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider";
import Header from "@/components/Header";
import ChatWidget from "@/app/components/ChatWidget";
import Footer from "@/components/Footer";
import PromotionCTA from "@/app/components/PromotionCTA";
import CookieConsent from "@/app/components/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  title: "FOKUS İstatistik ve YZ Danışmanlığı | Sanal Asistanlar",
  description: "9 farklı sanal asistanla iş süreçlerinizi optimize edin. Yönetim, müşteri hizmetleri, veri analizi, pazarlama ve daha fazlası için yapay zeka destekli çözümler.",
  keywords: "sanal asistan, yapay zeka, iş süreçleri, veri analizi, müşteri hizmetleri, pazarlama, finans, insan kaynakları",
  authors: [{ name: "FOKUS İstatistik" }],
  manifest: "/manifest.json",
  themeColor: "#860000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  icons: {
    icon: "/assets/img/favicon.png",
    apple: "/assets/img/favicon.png",
    shortcut: "/assets/img/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.fokusistatistik.com",
    siteName: "FOKUS İstatistik",
    title: "FOKUS İstatistik ve YZ Danışmanlığı | Sanal Asistanlar",
    description: "9 farklı sanal asistanla iş süreçlerinizi optimize edin. Yapay zeka destekli çözümler.",
    images: [
      {
        url: "/assets/img/fokus-ekosistem-og.png",
        width: 1200,
        height: 630,
        alt: "FOKUS Ekosistemi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FOKUS İstatistik ve YZ Danışmanlığı",
    description: "9 farklı sanal asistanla iş süreçlerinizi optimize edin.",
    images: ["/assets/img/fokus-ekosistem-og.png"],
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
        <Header />
        <SessionProvider>
          {children}
          <Footer />
        </SessionProvider>
        <ChatWidget />
        <PromotionCTA />
        <CookieConsent />
      </body>
    </html>
  );
}
