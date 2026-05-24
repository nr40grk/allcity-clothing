'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function WriteReviewPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order') || '';
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, orderId }),
      });
      if (res.ok) { setSubmitted(true); }
      else { setError('Something went wrong. Try again.'); }
    } catch { setError('Something went wrong. Try again.'); }
  }

  const inputClass = "bg-[#111] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20 w-full";

  return (
    <div className="min-h-screen bg-[#080808] pt-20 px-6 pb-20">
      <div className="max-w-[600px] mx-auto">
        <Link href="/" className="font-mono text-xs uppercase tracking-widest text-[#F0EDE8]/30 hover:text-[#FF2200] transition-colors mb-10 block">← Back</Link>
        <h1 className="font-display text-5xl md:text-7xl text-[#F0EDE8] tracking-tight leading-none mb-2">Review</h1>
        <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/30 mb-10">Share your ALLCITY experience</p>

        {submitted ? (
          <div className="border border-[#1a1a1a] p-8 text-center">
            <p className="font-display text-3xl text-[#FF2200] mb-4">Thank you.</p>
            <p className="font-mono text-sm text-[#F0EDE8]/50">Your review has been submitted and will appear on the site shortly.</p>
            <Link href="/" className="font-mono text-xs uppercase tracking-widest text-[#FF2200] hover:underline mt-6 inline-block">Back to home →</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} />
            <textarea placeholder="Your Review" required rows={4} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} className={`${inputClass} resize-none`} />
            <div className="flex items-center gap-4">
              <label className="font-mono text-[11px] text-[#F0EDE8]/40 uppercase tracking-widest">Rating:</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(n => (
                  <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })} className="p-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={form.rating >= n ? '#FF2200' : 'none'} stroke="#FF2200" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="font-mono text-xs text-[#FF2200]">{error}</p>}
            <button type="submit" className="font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] py-4 hover:bg-[#FF2200] transition-colors duration-200">
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function WriteReviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#080808] pt-20 px-6 pb-20">
        <div className="max-w-[600px] mx-auto">
          <p className="font-mono text-xs text-[#F0EDE8]/30">Loading...</p>
        </div>
      </div>
    }>
      <WriteReviewPageContent />
    </Suspense>
  );
}
