'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const STATUS_COLORS = {
  true: { bg: '#22c55e', text: '#080808' },
  false: { bg: '#FF8800', text: '#080808' },
};

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

export default function AdminReviews() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', text: '', rating: 5, published: true });

  useEffect(() => {
    const t = sessionStorage.getItem('admin_token');
    if (!t) { router.push('/admin'); return; }
    setToken(t);
  }, [router]);

  const fetchReviews = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const res = await fetch('/api/reviews?admin=true', { headers: { 'x-admin-token': token } });
    if (res.status === 401) { router.push('/admin'); return; }
    const data = await res.json();
    setReviews(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [token, router]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  function flash(text) { setMsg(text); setTimeout(() => setMsg(''), 3000); }

  async function handleAdd(e) {
    e.preventDefault();
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ name: '', text: '', rating: 5, published: true });
      setShowForm(false);
      fetchReviews();
      flash('Review added.');
    } else {
      flash('Failed to add review.');
    }
  }

  async function togglePublished(review) {
    const res = await fetch('/api/reviews', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ id: review.id, published: !review.published }),
    });
    if (res.ok) {
      setReviews(prev => prev.map(r => r.id === review.id ? { ...r, published: !r.published } : r));
      flash('Status updated.');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this review?')) return;
    const res = await fetch('/api/reviews', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setReviews(prev => prev.filter(r => r.id !== id));
      flash('Review deleted.');
    }
  }

  const publishedCount = reviews.filter(r => r.published).length;
  const pendingCount = reviews.filter(r => !r.published).length;

  const inputClass = "bg-[#111] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20 w-full";

  return (
    <div className="min-h-screen bg-[#080808] pt-20 px-6 pb-20">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl text-[#F0EDE8] tracking-tight">ADMIN PANEL</h1>
            <p className="font-mono text-[11px] text-[#F0EDE8]/30 uppercase tracking-widest mt-1">Reviews Management</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/products" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#FF2200] hover:text-[#FF2200] transition-colors">Products</Link>
            <Link href="/admin/stock" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#FF2200] hover:text-[#FF2200] transition-colors">Stock</Link>
            <Link href="/admin/sales" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#FF2200] hover:text-[#FF2200] transition-colors">Sales</Link>
            <Link href="/admin/emails" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#FF2200] hover:text-[#FF2200] transition-colors">Emails</Link>
            <Link href="/admin/settings" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#FF2200] hover:text-[#FF2200] transition-colors">Settings</Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-10">
          {[['Total', reviews.length, '#F0EDE8'], ['Published', publishedCount, '#22c55e'], ['Pending', pendingCount, '#FF8800']].map(([label, count, color]) => (
            <div key={label} className="border border-[#1a1a1a] p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/30 mb-1">{label}</p>
              <p className="font-display text-4xl tracking-tight" style={{ color }}>{count}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          {msg && <div className="font-mono text-xs text-[#F0EDE8]/70 border border-[#333] px-4 py-3">{msg}</div>}
          <button onClick={() => setShowForm(!showForm)} className="font-mono text-xs uppercase tracking-widest bg-[#FF2200] text-[#080808] px-4 py-2 hover:bg-[#F0EDE8] transition-colors ml-auto">
            {showForm ? 'Cancel' : '+ Add Review'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="border border-[#1a1a1a] p-6 mb-6 flex flex-col gap-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-2">Add New Review</p>
            <input type="text" placeholder="Customer Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} />
            <textarea placeholder="Review Text" required rows={3} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} className={`${inputClass} resize-none`} />
            <div className="flex items-center gap-4">
              <label className="font-mono text-[11px] text-[#F0EDE8]/40 uppercase tracking-widest">Rating:</label>
              <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className={`${inputClass} w-auto`}>
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="accent-[#FF2200]" />
              <span className="font-mono text-[11px] text-[#F0EDE8]/40 uppercase tracking-widest">Publish immediately</span>
            </label>
            <button type="submit" className="font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] py-3 hover:bg-[#FF2200] transition-colors">Add Review</button>
          </form>
        )}

        {loading ? (
          <p className="font-mono text-xs text-[#F0EDE8]/30">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="font-mono text-xs text-[#F0EDE8]/20">No reviews yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {reviews.map(review => {
              const sc = STATUS_COLORS[review.published] || STATUS_COLORS.false;
              return (
                <div key={review.id} className="border border-[#1a1a1a] p-4 hover:border-[#333] transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-mono text-xs text-[#F0EDE8]/80">{review.name}</p>
                        <Stars count={review.rating} />
                      </div>
                      <p className="font-mono text-sm text-[#F0EDE8]/50 leading-relaxed">{review.text}</p>
                      <p className="font-mono text-[10px] text-[#F0EDE8]/20 mt-2">{new Date(review.createdAt).toLocaleDateString('en-GB')}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5" style={{ background: sc.bg, color: sc.text }}>
                        {review.published ? 'published' : 'pending'}
                      </span>
                      <button onClick={() => togglePublished(review)} className="font-mono text-[11px] text-[#F0EDE8]/30 hover:text-[#FF2200] transition-colors px-2">
                        {review.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => handleDelete(review.id)} className="font-mono text-[11px] text-[#F0EDE8]/20 hover:text-[#FF2200] transition-colors px-2">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
