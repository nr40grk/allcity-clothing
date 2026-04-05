'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminEmails() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ subject: '', bodyText: '', ctaText: '', ctaUrl: '' });
  const [showCompose, setShowCompose] = useState(false);

  useEffect(() => {
    const t = sessionStorage.getItem('admin_token');
    if (!t) { router.push('/admin'); return; }
    setToken(t);
    fetch('/api/newsletter', { headers: { 'x-admin-token': t } })
      .then(r => r.json())
      .then(setSubscribers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  function flash(text) { setMsg(text); setTimeout(() => setMsg(''), 4000); }

  const active = subscribers.filter(s => s.active !== false);
  const inactive = subscribers.filter(s => s.active === false);

  async function handleSend(e) {
    e.preventDefault();
    if (!form.subject || !form.bodyText) { flash('Subject and body are required.'); return; }
    if (!confirm(`Send to ${active.length} subscribers?`)) return;

    setSending(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        flash(`Sent to ${data.sent} subscribers.${data.failed > 0 ? ` ${data.failed} failed.` : ''}`);
        setShowCompose(false);
        setForm({ subject: '', bodyText: '', ctaText: '', ctaUrl: '' });
      } else {
        flash(data.message || data.error || 'Failed to send.');
      }
    } catch { flash('Error sending newsletter.'); }
    finally { setSending(false); }
  }

  return (
    <div className="min-h-screen bg-[#080808] pt-20 px-6 pb-20">
      <div className="max-w-[900px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl text-[#F0EDE8] tracking-tight">EMAIL</h1>
            <p className="font-mono text-[11px] text-[#F0EDE8]/30 uppercase tracking-widest mt-1">
              Subscribers · Newsletter
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/products" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#F0EDE8]/30 transition-colors">
              ← Products
            </Link>
            <button
              onClick={() => setShowCompose(!showCompose)}
              className="font-mono text-xs uppercase tracking-widest bg-[#FF2200] text-[#080808] px-4 py-2 hover:bg-[#F0EDE8] transition-colors"
            >
              {showCompose ? 'Cancel' : '+ Send Newsletter'}
            </button>
          </div>
        </div>

        {msg && <div className="mb-6 font-mono text-xs text-[#F0EDE8]/70 border border-[#333] px-4 py-3">{msg}</div>}

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total', value: subscribers.length },
            { label: 'Active', value: active.length },
            { label: 'Unsubscribed', value: inactive.length },
          ].map(({ label, value }) => (
            <div key={label} className="border border-[#1a1a1a] px-5 py-4 bg-[#0d0d0d]">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/30 mb-1">{label}</p>
              <p className="font-display text-4xl text-[#F0EDE8]">{value}</p>
            </div>
          ))}
        </div>

        {/* Compose newsletter */}
        {showCompose && (
          <form onSubmit={handleSend} className="border border-[#1a1a1a] p-6 mb-10 bg-[#0d0d0d] flex flex-col gap-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#FF2200]">
              New Newsletter — sending to {active.length} subscribers
            </p>

            <div>
              <label className="label">Subject *</label>
              <input required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                className="input w-full" placeholder="NEW DROP — SS25 Available Now" />
            </div>

            <div>
              <label className="label">Body *</label>
              <textarea required value={form.bodyText} onChange={e => setForm({...form, bodyText: e.target.value})}
                className="input w-full h-40 resize-none"
                placeholder={"Write your message here.\n\nSupports line breaks.\n\nKeep it short and direct."} />
              <p className="font-mono text-[11px] text-[#F0EDE8]/20 mt-1">Plain text. Line breaks are preserved.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">CTA Button Text (optional)</label>
                <input value={form.ctaText} onChange={e => setForm({...form, ctaText: e.target.value})}
                  className="input w-full" placeholder="Shop Now" />
              </div>
              <div>
                <label className="label">CTA Button URL (optional)</label>
                <input value={form.ctaUrl} onChange={e => setForm({...form, ctaUrl: e.target.value})}
                  className="input w-full" placeholder="https://allcity-clothing.vercel.app/products" />
              </div>
            </div>

            <div className="border border-[#1a1a1a] p-4 bg-[#080808]">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/30 mb-2">Preview</p>
              <p className="font-mono text-xs text-[#FF2200] uppercase tracking-widest mb-1">{form.subject || 'Subject line'}</p>
              <p className="font-mono text-xs text-[#F0EDE8]/50 leading-relaxed whitespace-pre-line">{form.bodyText || 'Your message here...'}</p>
              {form.ctaText && <p className="font-mono text-xs text-[#F0EDE8]/30 mt-3 border border-[#333] inline-block px-3 py-1">{form.ctaText} →</p>}
            </div>

            <div className="flex gap-3 border-t border-[#1a1a1a] pt-4">
              <button type="submit" disabled={sending}
                className="font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] px-6 py-3 hover:bg-[#FF2200] transition-colors disabled:opacity-40">
                {sending ? `Sending to ${active.length}...` : `Send to ${active.length} Subscribers`}
              </button>
              <button type="button" onClick={() => setShowCompose(false)}
                className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/40 px-6 py-3 hover:border-[#F0EDE8]/30 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Subscriber list */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/30 mb-4">
            Subscriber List
          </p>
          {loading ? (
            <p className="font-mono text-xs text-[#F0EDE8]/30">Loading...</p>
          ) : subscribers.length === 0 ? (
            <p className="font-mono text-xs text-[#F0EDE8]/20">No subscribers yet. The footer subscribe form will collect them.</p>
          ) : (
            <div className="flex flex-col gap-1">
              {[...subscribers].reverse().map(sub => (
                <div key={sub.id} className="flex items-center justify-between border border-[#1a1a1a] px-4 py-3 hover:border-[#333] transition-colors">
                  <div className="flex items-center gap-4">
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: sub.active !== false ? '#FF2200' : '#333', flexShrink: 0 }} />
                    <span className="font-mono text-xs text-[#F0EDE8]/70">{sub.email}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#F0EDE8]/20">
                    {sub.active !== false
                      ? new Date(sub.subscribedAt).toLocaleDateString('en-GB')
                      : 'Unsubscribed'
                    }
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .label { display:block; font-family:'IBM Plex Mono',monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:rgba(240,237,232,0.3); margin-bottom:6px; }
        .input { background:#111; border:1px solid #333; color:#F0EDE8; font-family:'IBM Plex Mono',monospace; font-size:12px; padding:10px 14px; outline:none; transition:border-color 0.2s; display:block; }
        .input:focus { border-color:#FF2200; }
        .input::placeholder { color:rgba(240,237,232,0.2); }
      `}</style>
    </div>
  );
}
