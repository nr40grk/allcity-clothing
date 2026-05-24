'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';

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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(data => { setReviews(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (reviews.length === 0) return null;

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
              <p className="font-mono text-sm text-[#F0EDE8]/70 leading-relaxed flex-1">{r.text}</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/30">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
