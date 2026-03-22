'use client';
import Link from 'next/link';
import { useT } from './LanguageProvider';

export default function Footer() {
  const t = useT();

  return (
    <footer className="border-t border-[#1a1a1a] mt-24">
      <div className="border-b border-[#1a1a1a] py-10 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="font-mono text-xs uppercase tracking-widest text-[#F0EDE8]/50">{t('footer.subscribe')}</p>
          <form className="flex gap-0 w-full max-w-sm">
            <input type="email" placeholder={t('footer.emailPlaceholder')}
              className="flex-1 bg-[#1a1a1a] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20" />
            <button type="submit" className="bg-[#FF2200] text-[#080808] font-mono text-xs uppercase tracking-widest px-5 py-3 hover:bg-[#F0EDE8] transition-colors">→</button>
          </form>
        </div>
      </div>

      <div className="py-8 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[11px] text-[#F0EDE8]/40 uppercase tracking-widest">{t('footer.storeLocation')}</p>
            <a href="https://maps.google.com/?q=nr40+athens" target="_blank" rel="noreferrer"
              className="font-mono text-xs text-[#F0EDE8]/70 hover:text-[#FF2200] transition-colors">{t('footer.findUs')}</a>
            <a href="mailto:allcity.clothing@gmail.com" className="font-mono text-xs text-[#F0EDE8]/70 hover:text-[#FF2200] transition-colors">
              allcity.clothing@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/allcity_clothing" target="_blank" rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-[#F0EDE8]/50 hover:text-[#FF2200] transition-colors">Instagram</a>
            <Link href="/shipping" className="font-mono text-xs uppercase tracking-widest text-[#F0EDE8]/50 hover:text-[#FF2200] transition-colors">
              {t('nav.shipping')}
            </Link>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2 items-center">
              {['VISA', 'MC', 'AMEX', 'GPAY'].map((card) => (
                <span key={card} className="font-mono text-[9px] border border-[#333] px-2 py-1 text-[#F0EDE8]/30">{card}</span>
              ))}
            </div>
            <p className="font-mono text-[11px] text-[#F0EDE8]/20">© {new Date().getFullYear()}, ALLCITY</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
