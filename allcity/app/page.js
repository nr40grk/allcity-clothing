'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useT, useLanguage } from '@/components/LanguageProvider';

function HeroVideo() {
  const desktop = process.env.NEXT_PUBLIC_HERO_VIDEO_DESKTOP;
  const mobile = process.env.NEXT_PUBLIC_HERO_VIDEO_MOBILE;
  if (!desktop && !mobile) return null;
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {desktop && (
        <video autoPlay muted loop playsInline className="hidden md:block absolute inset-0 w-full h-full object-cover">
          <source src={desktop} type="video/mp4" />
        </video>
      )}
      {(mobile || desktop) && (
        <video autoPlay muted loop playsInline className="block md:hidden absolute inset-0 w-full h-full object-cover">
          <source src={mobile || desktop} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-[#080808]/60" />
    </div>
  );
}

const marqueeText = 'Hood Controlling. F*ck the Game. Allcity Clothing. — Apparel born in the streets. No rules. No limits. — ';

export default function HomePage() {
  const t = useT();
  const { lang } = useLanguage();
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts).catch(() => {});
    fetch('/api/settings').then(r => r.json()).then(data => {
      if (data?.banner?.active) setBanner(data.banner);
    }).catch(() => {});
  }, []);

  const featured = products.slice(0, 8);
  const newReleases = products.filter(p => p.isNew && p.available);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative pt-14 min-h-screen flex flex-col justify-between border-b border-[#1a1a1a]">
        <HeroVideo />

        <div className="relative z-10 px-6 pt-12 flex justify-between items-start">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/30 fade-up fade-up-1">{t('home.collection')}</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/30 fade-up fade-up-1">{t('home.location')}</span>
        </div>

        <div className="relative z-10 px-4 md:px-6 pb-0 flex flex-col">
          <h1 className="font-display text-[22vw] md:text-[20vw] leading-[0.85] text-[#F0EDE8] fade-up fade-up-2 tracking-tight">ALL</h1>
          <div className="flex items-end justify-between gap-4">
            <h1 className="font-display text-[22vw] md:text-[20vw] leading-[0.85] text-[#FF2200] fade-up fade-up-3 tracking-tight">CITY</h1>
            <div className="pb-4 md:pb-8 flex flex-col items-end gap-3">
              <p className="font-mono text-xs text-[#F0EDE8]/50 text-right max-w-[200px] leading-relaxed fade-up fade-up-4">{t('home.tagline')}</p>
              <Link href="/products" className="font-mono text-xs uppercase tracking-widest border border-[#F0EDE8]/30 px-5 py-3 text-[#F0EDE8]/70 hover:bg-[#FF2200] hover:border-[#FF2200] hover:text-[#080808] transition-all duration-200">
                {t('home.shopNow')}
              </Link>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative z-10 overflow-hidden border-t border-[#1a1a1a] py-3 bg-[#080808]">
          <div className="marquee-track">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/20 whitespace-nowrap">
                {marqueeText}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo Banner ─────────────────────────────────────────── */}
      {banner && (
        <section className="relative border-b border-[#1a1a1a] overflow-hidden"
          style={{ background: banner.image ? `url(${banner.image}) center/cover` : '#0d0d0d' }}>
          {banner.image && <div className="absolute inset-0 bg-[#080808]/65" />}
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#FF2200]/60 mb-2">
                {lang === 'el' ? 'Ανακοίνωση' : 'Announcement'}
              </p>
              <h2 className="font-display text-5xl md:text-7xl text-[#FF2200] tracking-tight leading-none mb-3">
                {lang === 'el' ? banner.titleGR : banner.titleEN}
              </h2>
              <p className="font-mono text-sm text-[#F0EDE8]/60">
                {lang === 'el' ? banner.subtitleGR : banner.subtitleEN}
              </p>
            </div>
            <Link href={banner.ctaLink || '/products'}
              className="flex-shrink-0 font-mono text-xs uppercase tracking-widest border border-[#F0EDE8]/30 px-8 py-4 text-[#F0EDE8]/70 hover:bg-[#FF2200] hover:border-[#FF2200] hover:text-[#080808] transition-all duration-200">
              {lang === 'el' ? banner.ctaTextGR : banner.ctaTextEN} →
            </Link>
          </div>
        </section>
      )}

      {/* ── New Releases ─────────────────────────────────────────── */}
      {newReleases.length > 0 && (
        <section className="px-6 py-16 max-w-[1400px] mx-auto border-b border-[#1a1a1a]">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-5xl md:text-7xl text-[#F0EDE8] tracking-tight leading-none">
              {lang === 'el' ? 'Νέες Κυκλοφορίες' : 'New Releases'}
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-widest bg-[#FF2200] text-[#080808] px-2 py-1 self-start mt-2">
              {lang === 'el' ? 'ΝΕΟ' : 'NEW'}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newReleases.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      )}

      {/* ── Products ─────────────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-5xl md:text-7xl text-[#F0EDE8] tracking-tight leading-none">{t('home.productsTitle')}</h2>
          <Link href="/products" className="font-mono text-xs uppercase tracking-widest text-[#F0EDE8]/40 hover:text-[#FF2200] transition-colors link-red">{t('home.viewAll')}</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────── */}
      <section className="border-t border-[#1a1a1a] bg-[#0d0d0d]">
        {/* Divider text */}
        <div className="overflow-hidden border-b border-[#1a1a1a] py-4 bg-[#080808]">
          <div className="marquee-track">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="font-display text-xl text-[#FF2200]/20 uppercase tracking-widest whitespace-nowrap pr-12">
                HOOD CONTROLLING — F*CK THE GAME — ALLCITY CLOTHING —&nbsp;
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-start">
          {/* Left — label */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#FF2200]/60 mb-4">
              {lang === 'el' ? 'Για εμάς' : 'About'}
            </p>
            <h2 className="font-display text-6xl md:text-8xl text-[#F0EDE8] tracking-tight leading-none">
              ALLCITY<br />
              <span className="text-[#FF2200]">2021</span>
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/20 mt-8 leading-relaxed">
              Athens, GR<br />
              @allcity_clothing<br />
              @nr40_ath
            </p>
          </div>

          {/* Right — text */}
          <div className="flex flex-col gap-6 pt-2">
            {lang === 'el' ? (
              <>
                <p className="font-mono text-sm text-[#F0EDE8]/70 leading-relaxed">
                  Το Allcity γεννήθηκε το 2021 μέσα από τους δρόμους της Αθήνας, από μια παρέα ανθρώπων που μεγάλωσαν με το graffiti, τα βαγόνια και την ανάγκη να αφήνουν το σημάδι τους παντού.
                </p>
                <p className="font-mono text-sm text-[#F0EDE8]/50 leading-relaxed">
                  Δεν είμαστε απλά ένα brand· είμαστε κομμάτι της πόλης.
                </p>
                <p className="font-mono text-sm text-[#F0EDE8]/50 leading-relaxed">
                  Εμπνευσμένοι από την ωμή αισθητική του street culture και την ένταση του train bombing, δημιουργούμε ρούχα υψηλής ποιότητας που κουβαλάνε αυτήν την ενέργεια. Κάθε κομμάτι είναι μια προέκταση της κουλτούρας μας — μια δήλωση, ένα attitude, μια ιστορία που γράφεται στους τοίχους και κινείται πάνω στις ράγες.
                </p>
                <p className="font-display text-2xl text-[#FF2200] tracking-widest mt-2">
                  HOOD CONTROLLING.<br />F*CK THE GAME.
                </p>
              </>
            ) : (
              <>
                <p className="font-mono text-sm text-[#F0EDE8]/70 leading-relaxed">
                  Allcity was born in 2021 on the streets of Athens, from a crew who grew up with graffiti, train bombing, and the need to leave their mark everywhere.
                </p>
                <p className="font-mono text-sm text-[#F0EDE8]/50 leading-relaxed">
                  We're not just a brand — we're part of the city.
                </p>
                <p className="font-mono text-sm text-[#F0EDE8]/50 leading-relaxed">
                  Inspired by the raw aesthetics of street culture and the intensity of train bombing, we create high-quality garments that carry that energy. Every piece is an extension of our culture — a statement, an attitude, a story written on walls and moving on rails.
                </p>
                <p className="font-display text-2xl text-[#FF2200] tracking-widest mt-2">
                  HOOD CONTROLLING.<br />F*CK THE GAME.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Info strip ───────────────────────────────────────────── */}
      <section className="border-t border-[#1a1a1a] px-6 py-16 bg-[#080808]">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-10 md:gap-6">
          {[
            { label: t('home.strip1Label'), desc: t('home.strip1Desc') },
            { label: t('home.strip2Label'), desc: t('home.strip2Desc') },
            { label: t('home.strip3Label'), desc: t('home.strip3Desc') },
          ].map(({ label, desc }) => (
            <div key={label} className="border-t border-[#1a1a1a] pt-6">
              <p className="font-display text-xl text-[#FF2200] tracking-widest mb-3">{label}</p>
              <p className="font-mono text-xs text-[#F0EDE8]/40 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
