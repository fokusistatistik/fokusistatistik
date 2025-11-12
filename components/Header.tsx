'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const assistants = [
    { code: 'fokus001', name: 'FOKUS001 - Yönetici' },
    { code: 'fokus216', name: 'FOKUS216 - Müşteri Hizmetleri' },
    { code: 'fokus314', name: 'FOKUS314 - Veri Analisti' },
    { code: 'fokus520', name: 'FOKUS520 - Pazarlama & Lead' },
    { code: 'fokus618', name: 'FOKUS618 - Finans & Fatura' },
    { code: 'fokus707', name: 'FOKUS707 - İnsan Kaynakları' },
    { code: 'fokus717', name: 'FOKUS717 - İçerik Tasarımı' },
    { code: 'fokus808', name: 'FOKUS808 - Sosyal Medya' },
    { code: 'fokus999', name: 'FOKUS999 - Joker' },
  ];

  return (
    <header className="bg-[#860000] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2.5">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition">
            <div className="relative w-16 h-16">
              <Image
                src="https://www.fokusistatistik.com/assets/img/logobeyaz.png"
                alt="FOKUS Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold hidden sm:inline">VERİ BİLİMİ</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="py-1 border-b-2 border-transparent hover:border-white hover:text-gray-100 transition">
              Anasayfa
            </Link>
            <Link href="/hakkimizda" className="py-1 border-b-2 border-transparent hover:border-white hover:text-gray-100 transition">
              Hakkımızda
            </Link>
            <Link href="/ekibimiz" className="py-1 border-b-2 border-transparent hover:border-white hover:text-gray-100 transition">
              Ekibimiz
            </Link>

            {/* Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 py-1 border-b-2 border-transparent hover:border-white hover:text-gray-100 transition">
                <span>Sanal Asistanlar</span>
                <ChevronDown size={16} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-64 bg-gray-900 text-white rounded-lg shadow-xl py-2 max-h-96 overflow-y-auto border border-gray-700">
                  <Link
                    href="/sanalasistanlar"
                    className="block px-4 py-2 hover:bg-[#860000] transition text-sm font-semibold border-b border-gray-700"
                  >
                    📋 Tüm Asistanlar
                  </Link>
                  {assistants.map((assistant) => (
                    <Link
                      key={assistant.code}
                      href={`/sanalasistanlar/${assistant.code}`}
                      className="block px-4 py-2 hover:bg-[#860000] transition text-sm"
                    >
                      {assistant.name}
                    </Link>
                  ))}
                  <hr className="my-2 border-gray-700" />
                  <a
                    href="https://asistan.fokusistatistik.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 hover:bg-[#860000] transition text-sm font-bold"
                  >
                    <Image
                      src="https://www.fokusistatistik.com/assets/img/favicon.png"
                      alt="FOKUS"
                      width={18}
                      height={18}
                      className="mr-2"
                    />
                    FOKUS EKOSİSTEMİ
                  </a>
                </div>
              )}
            </div>

            <Link href="/dijital" className="py-1 border-b-2 border-transparent hover:border-white hover:text-gray-100 transition">
              Dijital Çözümler
            </Link>
            <Link href="/yapay-zeka-danismanligi" className="py-1 border-b-2 border-transparent hover:border-white hover:text-gray-100 transition">
              YZ Danışmanlığı
            </Link>
            <Link href="/fiyatlandirma" className="py-1 border-b-2 border-transparent hover:border-white hover:text-gray-100 transition">
              Fiyatlandırma
            </Link>
            <Link href="/iletisim" className="py-1 border-b-2 border-transparent hover:border-white hover:text-gray-100 transition">
              İletişim
            </Link>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-gray-200 transition"
            >
              <Search size={20} />
            </button>

            {/* Login Button */}
            <Link
              href="/giris"
              className="bg-white text-[#860000] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition shadow-md hover:shadow-lg"
            >
              Giriş Yap
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden hover:text-gray-200 transition"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <input
              type="text"
              placeholder="Site içinde ara..."
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition"
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-[#a50000]">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="hover:text-gray-200 transition py-2">
                Anasayfa
              </Link>
              <Link href="/hakkimizda" className="hover:text-gray-200 transition py-2">
                Hakkımızda
              </Link>
              <Link href="/ekibimiz" className="hover:text-gray-200 transition py-2">
                Ekibimiz
              </Link>

              <details className="group">
                <summary className="cursor-pointer hover:text-gray-200 transition py-2 list-none flex items-center justify-between">
                  <span>Sanal Asistanlar</span>
                  <ChevronDown size={16} className="group-open:rotate-180 transition" />
                </summary>
                <div className="pl-4 mt-2 space-y-2">
                  {assistants.map((assistant) => (
                    <Link
                      key={assistant.code}
                      href={`/sanalasistanlar/${assistant.code}`}
                      className="block hover:text-gray-200 transition py-1 text-sm"
                    >
                      {assistant.name}
                    </Link>
                  ))}
                  <a
                    href="https://asistan.fokusistatistik.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-gray-200 transition py-1 text-sm font-bold"
                  >
                    <Image
                      src="https://www.fokusistatistik.com/assets/img/favicon.png"
                      alt="FOKUS"
                      width={18}
                      height={18}
                      className="mr-2"
                    />
                    FOKUS EKOSİSTEMİ
                  </a>
                </div>
              </details>

              <Link href="/dijital" className="hover:text-gray-200 transition py-2">
                Dijital Çözümler
              </Link>
              <Link href="/yapay-zeka-danismanligi" className="hover:text-gray-200 transition py-2">
                YZ Danışmanlığı
              </Link>
              <Link href="/fiyatlandirma" className="hover:text-gray-200 transition py-2">
                Fiyatlandırma
              </Link>
              <Link href="/iletisim" className="hover:text-gray-200 transition py-2">
                İletişim
              </Link>

              <Link
                href="/giris"
                className="bg-white text-[#860000] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition text-center mt-4 shadow-md"
              >
                Giriş Yap
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
