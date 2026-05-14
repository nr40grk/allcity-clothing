'use client';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="px-6 pt-16 pb-10 border-b border-[#1a1a1a] max-w-[1400px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[#FF2200]/60 mb-4">
          {lang === 'el' ? 'Για εμάς' : 'About Us'}
        </p>
        <h1 className="font-display text-6xl md:text-[10vw] text-[#F0EDE8] tracking-tight leading-none">
          ALLCITY<br />
          <span className="text-[#FF2200]">2021</span>
        </h1>
      </div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/20 leading-relaxed">
            Athens, GR<br />
            @allcity_clothing<br />
            allcityclo@gmail.com
          </p>
          <div className="mt-12 border border-[#1a1a1a] p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/30 mb-3">
              {lang === 'el' ? 'Επικοινωνία' : 'Contact'}
            </p>
            <a
              href="https://www.instagram.com/allcity_clothing"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-mono text-xs text-[#F0EDE8]/60 hover:text-[#FF2200] transition-colors mb-2"
            >
              Instagram @allcity_clothing
            </a>
            <a
              href="mailto:allcityclo@gmail.com"
              className="font-mono text-xs text-[#F0EDE8]/60 hover:text-[#FF2200] transition-colors"
            >
              allcityclo@gmail.com
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-8">
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
              <p className="font-mono text-sm text-[#F0EDE8]/50 leading-relaxed">
                Κάθε drop είναι limited. Κάθε κομμάτι έχει ιστορία. Δεν κυνηγάμε τάσεις — τις αγνοούμε.
              </p>
              <p className="font-display text-3xl text-[#FF2200] tracking-widest mt-4">
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
              <p className="font-mono text-sm text-[#F0EDE8]/50 leading-relaxed">
                Every drop is limited. Every piece has a story. We don't chase trends — we ignore them.
              </p>
              <p className="font-display text-3xl text-[#FF2200] tracking-widest mt-4">
                HOOD CONTROLLING.<br />F*CK THE GAME.
              </p>
            </>
          )}

          <div className="pt-4 border-t border-[#1a1a1a]">
            <Link
              href="/products"
              className="font-mono text-xs uppercase tracking-widest border border-[#F0EDE8]/30 px-6 py-3 text-[#F0EDE8]/70 hover:bg-[#FF2200] hover:border-[#FF2200] hover:text-[#080808] transition-all duration-200 inline-block"
            >
              {lang === 'el' ? 'Δες τα προϊόντα' : 'Shop the Collection'}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="border-t border-[#1a1a1a] overflow-hidden py-4 bg-[#080808]">
        <div className="marquee-track">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="font-display text-xl text-[#FF2200]/20 uppercase tracking-widest whitespace-nowrap pr-12">
              HOOD CONTROLLING — F*CK THE GAME — ALLCITY CLOTHING —\u00a0
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
