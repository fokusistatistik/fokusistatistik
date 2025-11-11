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
        <div className="flex items-center justify-between py-4">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition">
            <div className="relative w-10 h-10">
              <Image
                src="/assets/img/logobeyaz.png"
                alt="FOKUS Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold hidden sm:inline">VERİ BİLİMİ</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="hover:text-[#ffc107] transition">
              Anasayfa
            </Link>
            <Link href="/dijital" className="hover:text-[#ffc107] transition">
              Dijital Çözümlerimiz
            </Link>
            <Link href="/neden-biz" className="hover:text-[#ffc107] transition">
              Neden Biz?
            </Link>

            {/* Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 hover:text-[#ffc107] transition">
                <span>Sanal Asistanlar</span>
                <ChevronDown size={16} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl py-2">
                  {assistants.map((assistant) => (
                    <Link
                      key={assistant.code}
                      href={`/sanalasistanlar/${assistant.code}`}
                      className="block px-4 py-2 hover:bg-[#860000] hover:text-white transition text-sm"
                    >
                      {assistant.name}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <a
                    href="https://asistan.fokusistatistik.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 hover:bg-[#860000] hover:text-white transition text-sm font-bold"
                  >
                    <Image
                      src="/assets/img/favicon.png"
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

            <Link href="/yapay-zeka-cagi" className="hover:text-[#ffc107] transition">
              Yapay Zeka Çağı
            </Link>
            <Link href="/sss" className="hover:text-[#ffc107] transition">
              S.S.S.
            </Link>
            <Link href="/iletisim" className="hover:text-[#ffc107] transition">
              İletişim
            </Link>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-[#ffc107] transition"
            >
              <Search size={20} />
            </button>

            {/* Login Button */}
            <Link
              href="/giris"
              className="bg-[#ffc107] text-[#860000] px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Giriş Yap
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden hover:text-[#ffc107] transition"
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
              className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffc107]"
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-[#a50000]">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="hover:text-[#ffc107] transition py-2">
                Anasayfa
              </Link>
              <Link href="/dijital" className="hover:text-[#ffc107] transition py-2">
                Dijital Çözümlerimiz
              </Link>
              <Link href="/neden-biz" className="hover:text-[#ffc107] transition py-2">
                Neden Biz?
              </Link>

              <details className="group">
                <summary className="cursor-pointer hover:text-[#ffc107] transition py-2 list-none flex items-center justify-between">
                  <span>Sanal Asistanlar</span>
                  <ChevronDown size={16} className="group-open:rotate-180 transition" />
                </summary>
                <div className="pl-4 mt-2 space-y-2">
                  {assistants.map((assistant) => (
                    <Link
                      key={assistant.code}
                      href={`/sanalasistanlar/${assistant.code}`}
                      className="block hover:text-[#ffc107] transition py-1 text-sm"
                    >
                      {assistant.name}
                    </Link>
                  ))}
                  <a
                    href="https://asistan.fokusistatistik.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-[#ffc107] transition py-1 text-sm font-bold"
                  >
                    <Image
                      src="/assets/img/favicon.png"
                      alt="FOKUS"
                      width={18}
                      height={18}
                      className="mr-2"
                    />
                    FOKUS EKOSİSTEMİ
                  </a>
                </div>
              </details>

              <Link href="/yapay-zeka-cagi" className="hover:text-[#ffc107] transition py-2">
                Yapay Zeka Çağı
              </Link>
              <Link href="/sss" className="hover:text-[#ffc107] transition py-2">
                S.S.S.
              </Link>
              <Link href="/iletisim" className="hover:text-[#ffc107] transition py-2">
                İletişim
              </Link>

              <Link
                href="/giris"
                className="bg-[#ffc107] text-[#860000] px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition text-center mt-4"
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
