import type { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider";
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
    icon: "/favicon.ico",
    apple: "/icon-192x192.png",
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
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
