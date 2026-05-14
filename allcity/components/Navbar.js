'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useT, useLanguage } from './LanguageProvider';
import LanguageToggle from './LanguageToggle';

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

  const navLinks = [
    ['/', 'nav.home'],
    ['/products', 'nav.products'],
    ['/about', 'nav.about'],
    ['/shipping', 'nav.shipping'],
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {announcement && (
        <div
          style={{ background: annColors.bg, color: annColors.text }}
          className="w-full py-2 px-4 text-center font-mono text-[11px] uppercase tracking-widest"
        >
          {lang === 'el' ? announcement.textGR : announcement.textEN}
        </div>
      )}

      <nav className="border-b border-[#1a1a1a] bg-[#080808]/95 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center">

          <div className="flex-1 flex items-center">
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(([href, key]) => (
                <Link
                  key={href}
                  href={href}
                  className="font-mono text-xs text-[#F0EDE8]/70 uppercase tracking-widest hover:text-[#F0EDE8] transition-colors link-red"
                >
                  {t(key)}
                </Link>
              ))}
            </div>
            <button
              className="flex md:hidden text-[#F0EDE8]/60 hover:text-[#F0EDE8]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-center px-4">
            <Link href="/" className="hover:opacity-80 transition-opacity leading-none">
              <Image
                src="/logo.png"
                alt="AllCity"
                width={200}
                height={200}
                className="object-contain"
                style={{ height: '52px', width: 'auto' }}
                priority
              />
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-end gap-3">
            <LanguageToggle />
            <Link href="/products" aria-label="Search" className="text-[#F0EDE8]/60 hover:text-[#FF2200] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </Link>
            <Link href="/checkout" aria-label="Cart" className="text-[#F0EDE8]/60 hover:text-[#FF2200] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </Link>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#080808] border-t border-[#1a1a1a] px-6 py-6 flex flex-col gap-6">
            {navLinks.map(([href, key]) => (
              <Link
                key={href}
                href={href}
                className="font-mono text-sm uppercase tracking-widest text-[#F0EDE8]/70 hover:text-[#FF2200] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
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
