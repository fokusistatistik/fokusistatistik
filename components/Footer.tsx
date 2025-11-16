'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/fokusistatistik/',
      icon: 'https://static.fokusistatistik.com/resimler/instagram.png',
    },
    {
      name: 'E-posta',
      url: 'mailto:bilgi@fokusistatistik.com',
      icon: 'https://static.fokusistatistik.com/resimler/eposta.png',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61577855105088',
      icon: 'https://static.fokusistatistik.com/resimler/facebook.png',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/fokusistatistik',
      icon: 'https://static.fokusistatistik.com/resimler/ln.png',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/fokusistatistik',
      icon: 'https://static.fokusistatistik.com/resimler/twitter.png',
    },
    {
      name: 'Telegram',
      url: 'https://t.me/fokusistatistikbot',
      icon: 'https://static.fokusistatistik.com/resimler/telegram.png',
    },
    {
      name: 'Asistanlar',
      url: 'https://asistan.fokusistatistik.com/',
      icon: 'https://static.fokusistatistik.com/resimler/asistanfokus.png',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/905354040712?text=merhaba%20fokusistatistik',
      icon: 'https://static.fokusistatistik.com/resimler/whatsapp.png',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@fokusistatistik',
      icon: 'https://static.fokusistatistik.com/resimler/youtube.png',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/fokusistatistik',
      icon: 'https://static.fokusistatistik.com/resimler/github.png',
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        {/* Social Icons */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              title={social.name}
              target={social.name !== 'E-posta' ? '_blank' : undefined}
              rel={social.name !== 'E-posta' ? 'noopener noreferrer' : undefined}
              className="hover:scale-110 transition-transform duration-200"
            >
              <Image
                src={social.icon}
                alt={social.name}
                width={26}
                height={26}
                className="opacity-80 hover:opacity-100 transition"
              />
            </a>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center md:text-left">
          <div>
            <h3 className="font-bold text-[#ffc107] mb-3">Kurumsal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hakkimizda" className="hover:text-[#ffc107] transition">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/neden-biz" className="hover:text-[#ffc107] transition">
                  Neden FOKUS?
                </Link>
              </li>
              <li>
                <Link href="/ekibimiz" className="hover:text-[#ffc107] transition">
                  Ekibimiz
                </Link>
              </li>
              <li>
                <Link href="/yapay-zeka-danismanligi" className="hover:text-[#ffc107] transition">
                  YZ Danışmanlığı
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-[#ffc107] transition">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#ffc107] mb-3">Hizmetler</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dijital" className="hover:text-[#ffc107] transition">
                  Dijital Çözümler
                </Link>
              </li>
              <li>
                <Link href="/sanalasistanlar" className="hover:text-[#ffc107] transition">
                  Sanal Asistanlar
                </Link>
              </li>
              <li>
                <Link href="/fiyatlandirma" className="hover:text-[#ffc107] transition">
                  Fiyatlandırma
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-[#ffc107] transition">
                  Demo Talep Et
                </Link>
              </li>
              <li>
                <Link href="/analiz-formu" className="hover:text-[#ffc107] transition">
                  Ücretsiz Analiz
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#ffc107] mb-3">Destek</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sss" className="hover:text-[#ffc107] transition">
                  S.S.S.
                </Link>
              </li>
              <li>
                <Link href="/giris" className="hover:text-[#ffc107] transition">
                  Giriş Yap
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-[#ffc107] transition">
                  Profilim
                </Link>
              </li>
              <li>
                <Link href="/siparisler" className="hover:text-[#ffc107] transition">
                  Siparişlerim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#ffc107] mb-3">Yasal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/kvkk-aydinlatma" className="hover:text-[#ffc107] transition">
                  KVKK Aydınlatma
                </Link>
              </li>
              <li>
                <Link href="/gizlilik-politikasi" className="hover:text-[#ffc107] transition">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/kullanim-kosullari" className="hover:text-[#ffc107] transition">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/cerez-politikasi" className="hover:text-[#ffc107] transition">
                  Çerez Politikası
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 mb-6" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} FOKUS İstatistik ve YZ Danışmanlığı
            <span className="mx-3">|</span>
            Tüm Hakları Saklıdır
          </p>
          <p className="mt-2 text-xs">
            Yapay Zeka ve Veri Bilimi ile İş Süreçlerinizi Optimize Edin
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs">
            <span>🎯 22+ Yıllık Deneyim</span>
            <span>🤖 9 Sanal Asistan</span>
            <span>⏰ 7/24 Destek</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
