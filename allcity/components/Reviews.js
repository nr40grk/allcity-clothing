'use client';
import { useLanguage } from './LanguageProvider';

const reviews = [
  {
    name: 'Dimitris K.',
    textEN: 'Quality is insane. The hoodie feels premium and the fit is perfect. Allcity is the real deal.',
    textEL: 'Η ποιότητα είναι τρελή. Το hoodie είναι premium και η εφαρμογή τέλεια. Το Allcity είναι το real deal.',
    rating: 5,
  },
  {
    name: 'Maria P.',
    textEN: 'Fast shipping to Athens and the packaging was clean. Already ordered twice.',
    textEL: 'Γρήγορη αποστολή στην Αθήνα και η συσκευασία καθαρή. Έχω παραγγείλει ήδη δύο φορές.',
    rating: 5,
  },
  {
    name: 'Giannis R.',
    textEN: 'Streetwear that actually feels street. Hood controlling, f*ck the game — they mean it.',
    textEL: 'Streetwear που νιώθεις πραγματικά street. Hood controlling, f*ck the game — το εννοούν.',
    rating: 5,
  },
  {
    name: 'Elena T.',
    textEN: 'Love the designs. Minimal but bold. Gets compliments every time I wear it.',
    textEL: 'Λατρεύω τα σχέδια. Minimal αλλά bold. Παίρνω κομπλιμέντα κάθε φορά που το φοράω.',
    rating: 5,
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < count ? '#FF2200' : 'none'} stroke="#FF2200" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const { lang } = useLanguage();
  return (
    <section className="border-t border-[#1a1a1a] bg-[#0d0d0d]">
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[#FF2200]/60 mb-4">
          {lang === 'el' ? 'Κριτικές' : 'Reviews'}
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-[#F0EDE8] tracking-tight leading-none mb-14">
          {lang === 'el' ? 'Τι λένε οι δικοί μας' : 'What the crew says'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((r, i) => (
            <div key={i} className="border border-[#1a1a1a] p-6 flex flex-col gap-4 hover:border-[#333] transition-colors">
              <Stars count={r.rating} />
              <p className="font-mono text-sm text-[#F0EDE8]/70 leading-relaxed flex-1">
                {lang === 'el' ? r.textEL : r.textEN}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/30">
                {r.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
