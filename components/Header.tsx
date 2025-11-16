'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ChevronDown } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const googleSearchUrl = `https://www.google.com/search?q=site:fokusistatistik.com+${encodeURIComponent(searchQuery)}`;
      window.open(googleSearchUrl, '_blank');
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const assistants = [
    { code: 'fokus001', name: 'FOKUS001' },
    { code: 'fokus216', name: 'FOKUS216' },
    { code: 'fokus314', name: 'FOKUS314' },
    { code: 'fokus520', name: 'FOKUS520' },
    { code: 'fokus618', name: 'FOKUS618' },
    { code: 'fokus707', name: 'FOKUS707' },
    { code: 'fokus717', name: 'FOKUS717' },
    { code: 'fokus808', name: 'FOKUS808' },
    { code: 'fokus999', name: 'FOKUS999' },
  ];

  return (
    <header className="bg-[#860000] text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-0">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-1.5 hover:opacity-90 transition">
            <div className="relative w-[73px] h-[73px] -my-2">
              <Image
                src="https://static.fokusistatistik.com/resimler/logobeyaz.png"
                alt="FOKUS Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-base font-bold hidden sm:inline">VERİ BİLİMİ</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Link href="/" className={`py-1 border-b-2 transition ${isActive('/') ? 'border-white font-semibold' : 'border-transparent hover:border-white hover:text-gray-100'}`}>
              Anasayfa
            </Link>
            <Link href="/hakkimizda" className={`py-1 border-b-2 transition ${isActive('/hakkimizda') ? 'border-white font-semibold' : 'border-transparent hover:border-white hover:text-gray-100'}`}>
              Hakkımızda
            </Link>
            <Link href="/ekibimiz" className={`py-1 border-b-2 transition ${isActive('/ekibimiz') ? 'border-white font-semibold' : 'border-transparent hover:border-white hover:text-gray-100'}`}>
              Ekibimiz
            </Link>

            {/* Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className={`flex items-center space-x-1 py-1 border-b-2 transition ${isActive('/sanalasistanlar') ? 'border-white font-semibold' : 'border-transparent hover:border-white hover:text-gray-100'}`}>
                <span>Sanal Asistanlar</span>
                <ChevronDown size={16} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-44 bg-gray-900 text-white rounded-lg shadow-xl py-1 border border-gray-700">
                  <Link
                    href="/sanalasistanlar"
                    className="block px-3 py-1 hover:bg-[#860000] transition text-xs font-semibold border-b border-gray-700"
                  >
                    📋 Tüm Asistanlar
                  </Link>
                  {assistants.map((assistant) => (
                    <Link
                      key={assistant.code}
                      href={`/sanalasistanlar/${assistant.code}`}
                      className="block px-3 py-1 hover:bg-[#860000] transition text-xs"
                    >
                      {assistant.name}
                    </Link>
                  ))}
                  <hr className="my-1 border-gray-700" />
                  <a
                    href="https://asistan.fokusistatistik.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-1 hover:bg-[#860000] transition text-xs font-bold"
                  >
                    <Image
                      src="https://static.fokusistatistik.com/resimler/faviconfokus.png"
                      alt="FOKUS"
                      width={14}
                      height={14}
                      className="mr-2"
                    />
                    EKOSİSTEM
                  </a>
                </div>
              )}
            </div>

            <Link href="/dijital" className={`py-1 border-b-2 transition ${isActive('/dijital') ? 'border-white font-semibold' : 'border-transparent hover:border-white hover:text-gray-100'}`}>
              Dijital Çözümler
            </Link>
            <Link href="/yapay-zeka-danismanligi" className={`py-1 border-b-2 transition ${isActive('/yapay-zeka-danismanligi') ? 'border-white font-semibold' : 'border-transparent hover:border-white hover:text-gray-100'}`}>
              YZ Danışmanlığı
            </Link>
            <Link href="/fiyatlandirma" className={`py-1 border-b-2 transition ${isActive('/fiyatlandirma') ? 'border-white font-semibold' : 'border-transparent hover:border-white hover:text-gray-100'}`}>
              Fiyatlandırma
            </Link>
            <Link href="/iletisim" className={`py-1 border-b-2 transition ${isActive('/iletisim') ? 'border-white font-semibold' : 'border-transparent hover:border-white hover:text-gray-100'}`}>
              İletişim
            </Link>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-gray-200 transition"
            >
              <Search size={20} />
            </button>

            <Link
              href="https://asistan.fokusistatistik.com/ucretsiz.html" target="_blank" rel="noopener noreferrer"
              className="bg-white text-[#860000] px-4 py-1 rounded-full font-semibold hover:bg-gray-100 transition shadow-md hover:shadow-lg text-sm"
            >
              Demo Talep Et
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
          <div className="pb-2">
            <input
              type="text"
              placeholder="Site içinde ara... (Enter ile Google'da ara)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              autoFocus
              className="w-full px-4 py-1.5 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition"
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-2 border-t border-[#a50000]">
            <div className="flex flex-col space-y-2">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className={`transition py-1.5 ${isActive('/') ? 'font-bold text-yellow-300' : 'hover:text-gray-200'}`}>
                Anasayfa
              </Link>
              <Link href="/hakkimizda" onClick={() => setIsMenuOpen(false)} className={`transition py-1.5 ${isActive('/hakkimizda') ? 'font-bold text-yellow-300' : 'hover:text-gray-200'}`}>
                Hakkımızda
              </Link>
              <Link href="/ekibimiz" onClick={() => setIsMenuOpen(false)} className={`transition py-1.5 ${isActive('/ekibimiz') ? 'font-bold text-yellow-300' : 'hover:text-gray-200'}`}>
                Ekibimiz
              </Link>

              <details className="group">
                <summary className="cursor-pointer hover:text-gray-200 transition py-1.5 list-none flex items-center justify-between">
                  <span>Sanal Asistanlar</span>
                  <ChevronDown size={16} className="group-open:rotate-180 transition" />
                </summary>
                <div className="pl-4 mt-2 space-y-2">
                  {assistants.map((assistant) => (
                    <Link
                      key={assistant.code}
                      href={`/sanalasistanlar/${assistant.code}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block hover:text-gray-200 transition py-1 text-xs"
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
                      src="https://static.fokusistatistik.com/resimler/faviconfokus.png"
                      alt="FOKUS"
                      width={18}
                      height={18}
                      className="mr-2"
                    />
                    FOKUS EKOSİSTEMİ
                  </a>
                </div>
              </details>

              <Link href="/dijital" onClick={() => setIsMenuOpen(false)} className={`transition py-1.5 ${isActive('/dijital') ? 'font-bold text-yellow-300' : 'hover:text-gray-200'}`}>
                Dijital Çözümler
              </Link>
              <Link href="/yapay-zeka-danismanligi" onClick={() => setIsMenuOpen(false)} className={`transition py-1.5 ${isActive('/yapay-zeka-danismanligi') ? 'font-bold text-yellow-300' : 'hover:text-gray-200'}`}>
                YZ Danışmanlığı
              </Link>
              <Link href="/fiyatlandirma" onClick={() => setIsMenuOpen(false)} className={`transition py-1.5 ${isActive('/fiyatlandirma') ? 'font-bold text-yellow-300' : 'hover:text-gray-200'}`}>
                Fiyatlandırma
              </Link>
              <Link href="/iletisim" onClick={() => setIsMenuOpen(false)} className={`transition py-1.5 ${isActive('/iletisim') ? 'font-bold text-yellow-300' : 'hover:text-gray-200'}`}>
                İletişim
              </Link>

              <Link
                href="https://asistan.fokusistatistik.com/ucretsiz.html" target="_blank" rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="bg-white text-[#860000] px-6 py-1.5 rounded-full font-semibold hover:bg-gray-100 transition text-center mt-2 shadow-md"
              >
                Demo Talep Et
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
