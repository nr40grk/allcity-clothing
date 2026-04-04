'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useT, useLanguage } from './LanguageProvider';
import LanguageToggle from './LanguageToggle';

function AllCityLogo({ size = 36 }) {
  return (
    <svg width={size * 2.6} height={size} viewBox="0 0 280 108" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="4" width="100" height="100" fill="#FF2200"/>
      <path d="M28 52 L32 44 L38 40 L46 38 L54 36 L62 40 L68 38 L74 42 L72 50 L76 56 L72 64 L66 68 L60 72 L52 74 L44 72 L36 68 L30 62 L28 52Z" fill="#080808"/>
      <path d="M46 38 L50 32 L56 30 L60 34 L64 36 L62 40Z" fill="#080808"/>
      <path d="M68 38 L72 34 L76 36 L78 42 L74 42Z" fill="#080808"/>
      <text x="116" y="60" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="44" fill="#F0EDE8" letterSpacing="-1">ALL</text>
      <text x="116" y="102" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="44" fill="#F0EDE8" letterSpacing="-1">CITY</text>
    </svg>
  );
}

const COLORS = {
  red: { bg: '#FF2200', text: '#080808' },
  white: { bg: '#F0EDE8', text: '#080808' },
  black: { bg: '#111111', text: '#F0EDE8' },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState(null);
  const { lang } = useLanguage();
  const t = useT();

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => { if (data?.announcement?.active) setAnnouncement(data.announcement); })
      .catch(() => {});
  }, []);

  const annColors = announcement ? (COLORS[announcement.color] || COLORS.red) : null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement bar */}
      {announcement && (
        <div style={{ background: annColors.bg, color: annColors.text }}
          className="w-full py-2 px-4 text-center font-mono text-[11px] uppercase tracking-widest">
          {lang === 'el' ? announcement.textGR : announcement.textEN}
        </div>
      )}

      {/* Main navbar — 3 column: links | logo | actions */}
      <nav className="border-b border-[#1a1a1a] bg-[#080808]/95 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-14 grid grid-cols-3 items-center">

          {/* Left — nav links */}
          <div className="hidden md:flex items-center gap-8">
            {[['/', 'nav.home'], ['/products', 'nav.products'], ['/shipping', 'nav.shipping']].map(([href, key]) => (
              <Link key={href} href={href} className="font-mono text-xs text-[#F0EDE8]/70 uppercase tracking-widest hover:text-[#F0EDE8] transition-colors link-red">
                {t(key)}
              </Link>
            ))}
          </div>
          {/* Mobile left — burger */}
          <div className="flex md:hidden items-center">
            <button className="text-[#F0EDE8]/60 hover:text-[#F0EDE8]" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
              </svg>
            </button>
          </div>

          {/* Center — logo */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <AllCityLogo size={30} />
            </Link>
          </div>

          {/* Right — actions */}
          <div className="flex items-center justify-end gap-3">
            <LanguageToggle />
            <Link href="/products" aria-label="Search" className="text-[#F0EDE8]/60 hover:text-[#FF2200] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </Link>
            <Link href="/checkout" aria-label="Cart" className="text-[#F0EDE8]/60 hover:text-[#FF2200] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#080808] border-t border-[#1a1a1a] px-6 py-6 flex flex-col gap-6">
            {[['/', 'nav.home'], ['/products', 'nav.products'], ['/shipping', 'nav.shipping']].map(([href, key]) => (
              <Link key={href} href={href}
                className="font-mono text-sm uppercase tracking-widest text-[#F0EDE8]/70 hover:text-[#FF2200] transition-colors"
                onClick={() => setMenuOpen(false)}>
                {t(key)}
              </Link>
            ))}
            <div className="pt-2"><LanguageToggle /></div>
          </div>
        )}
      </nav>
    </div>
  );
}
