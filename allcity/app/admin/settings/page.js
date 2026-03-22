'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Toggle({ on, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{ background: on ? '#FF2200' : '#333' }}
      className="relative flex-shrink-0 rounded-full focus:outline-none transition-colors duration-200">
      <span style={{ width: 44, height: 24, display: 'block' }} />
      <span style={{
        position: 'absolute', top: 4, left: on ? 24 : 4,
        width: 16, height: 16, background: 'white', borderRadius: '50%',
        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
      }} />
    </button>
  );
}

const COLORS = [
  { value: 'red', label: 'Red', bg: '#FF2200', text: '#080808' },
  { value: 'white', label: 'White', bg: '#F0EDE8', text: '#080808' },
  { value: 'black', label: 'Black', bg: '#111', text: '#F0EDE8' },
];

export default function AdminSettings() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const t = sessionStorage.getItem('admin_token');
    if (!t) { router.push('/admin'); return; }
    setToken(t);
    fetch('/api/settings').then(r => r.json()).then(setSettings).catch(() => {});
  }, [router]);

  function flash(text) { setMsg(text); setTimeout(() => setMsg(''), 3000); }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify(settings),
      });
      if (res.ok) flash('Settings saved.');
      else flash('Error saving settings.');
    } catch {
      flash('Error saving settings.');
    } finally {
      setSaving(false);
    }
  }

  function setAnn(key, val) {
    setSettings(prev => ({ ...prev, announcement: { ...prev.announcement, [key]: val } }));
  }

  function setBan(key, val) {
    setSettings(prev => ({ ...prev, banner: { ...prev.banner, [key]: val } }));
  }

  if (!settings) return (
    <div className="min-h-screen bg-[#080808] pt-20 flex items-center justify-center">
      <span className="font-mono text-xs text-[#F0EDE8]/30">Loading...</span>
    </div>
  );

  const { announcement: ann, banner: ban } = settings;

  return (
    <div className="min-h-screen bg-[#080808] pt-20 px-6 pb-20">
      <div className="max-w-[800px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl text-[#F0EDE8] tracking-tight">SITE SETTINGS</h1>
            <p className="font-mono text-[11px] text-[#F0EDE8]/30 uppercase tracking-widest mt-1">
              Announcements · Banners
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/products" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#F0EDE8]/30 transition-colors">
              ← Products
            </Link>
            <a href="/" target="_blank" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#F0EDE8]/30 transition-colors">
              View Site ↗
            </a>
          </div>
        </div>

        {msg && <div className="mb-6 font-mono text-xs text-[#F0EDE8]/70 border border-[#333] px-4 py-3">{msg}</div>}

        {/* ── Announcement Bar ─────────────────────────────────── */}
        <section className="border border-[#1a1a1a] p-6 mb-6 bg-[#0d0d0d]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-display text-xl text-[#F0EDE8] tracking-wide">Announcement Bar</p>
              <p className="font-mono text-[11px] text-[#F0EDE8]/30 mt-1">Thin bar above the navbar — good for promos, shipping notices</p>
            </div>
            <div className="flex items-center gap-3">
              <Toggle on={ann.active} onClick={() => setAnn('active', !ann.active)} />
              <span style={{ color: ann.active ? '#FF2200' : 'rgba(240,237,232,0.3)' }} className="font-mono text-xs">
                {ann.active ? 'Live' : 'Off'}
              </span>
            </div>
          </div>

          {/* Preview */}
          <div style={{
            background: COLORS.find(c => c.value === ann.color)?.bg || '#FF2200',
            color: COLORS.find(c => c.value === ann.color)?.text || '#080808',
          }} className="py-2 px-4 text-center font-mono text-xs uppercase tracking-widest mb-5">
            {ann.textEN || '—'}
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="label">Text (English)</label>
              <input value={ann.textEN} onChange={e => setAnn('textEN', e.target.value)}
                className="input w-full" placeholder="FREE SHIPPING ON ORDERS OVER €80" />
            </div>
            <div>
              <label className="label">Text (Greek)</label>
              <input value={ann.textGR} onChange={e => setAnn('textGR', e.target.value)}
                className="input w-full" placeholder="ΔΩΡΕΑΝ ΑΠΟΣΤΟΛΗ ΓΙΑ ΠΑΡΑΓΓΕΛΙΕΣ ΑΝΩ ΤΩΝ €80" />
            </div>
            <div>
              <label className="label">Color</label>
              <div className="flex gap-2 mt-1">
                {COLORS.map(c => (
                  <button key={c.value} type="button" onClick={() => setAnn('color', c.value)}
                    style={{ background: c.bg, color: c.text, border: ann.color === c.value ? '2px solid #FF2200' : '2px solid transparent' }}
                    className="font-mono text-[10px] uppercase tracking-widest px-4 py-2 transition-all">
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Banner ───────────────────────────────────────────── */}
        <section className="border border-[#1a1a1a] p-6 mb-8 bg-[#0d0d0d]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-display text-xl text-[#F0EDE8] tracking-wide">Promo Banner</p>
              <p className="font-mono text-[11px] text-[#F0EDE8]/30 mt-1">Full-width section on the homepage — new drops, sales, campaigns</p>
            </div>
            <div className="flex items-center gap-3">
              <Toggle on={ban.active} onClick={() => setBan('active', !ban.active)} />
              <span style={{ color: ban.active ? '#FF2200' : 'rgba(240,237,232,0.3)' }} className="font-mono text-xs">
                {ban.active ? 'Live' : 'Off'}
              </span>
            </div>
          </div>

          {/* Preview */}
          <div className="border border-[#333] p-6 mb-5 flex items-center justify-between gap-4"
            style={{ background: ban.image ? `url(${ban.image}) center/cover` : '#111', position: 'relative' }}>
            {ban.image && <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.6)' }} />}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p className="font-display text-3xl text-[#FF2200] tracking-widest">{ban.titleEN || 'NEW DROP'}</p>
              <p className="font-mono text-xs text-[#F0EDE8]/60 mt-1">{ban.subtitleEN || 'Subtitle here'}</p>
            </div>
            <span style={{ position: 'relative', zIndex: 1 }}
              className="font-mono text-xs uppercase tracking-widest border border-[#F0EDE8]/30 px-4 py-2 text-[#F0EDE8]/70 whitespace-nowrap">
              {ban.ctaTextEN || 'Shop Now'} →
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Title (English)</label>
              <input value={ban.titleEN} onChange={e => setBan('titleEN', e.target.value)} className="input w-full" placeholder="NEW DROP" />
            </div>
            <div>
              <label className="label">Title (Greek)</label>
              <input value={ban.titleGR} onChange={e => setBan('titleGR', e.target.value)} className="input w-full" placeholder="ΝΕΑ ΣΥΛΛΟΓΗ" />
            </div>
            <div>
              <label className="label">Subtitle (English)</label>
              <input value={ban.subtitleEN} onChange={e => setBan('subtitleEN', e.target.value)} className="input w-full" placeholder="SS25 — Available Now" />
            </div>
            <div>
              <label className="label">Subtitle (Greek)</label>
              <input value={ban.subtitleGR} onChange={e => setBan('subtitleGR', e.target.value)} className="input w-full" placeholder="Συλλογή ΑΧ25 — Τώρα Διαθέσιμη" />
            </div>
            <div>
              <label className="label">Button Text (English)</label>
              <input value={ban.ctaTextEN} onChange={e => setBan('ctaTextEN', e.target.value)} className="input w-full" placeholder="Shop Now" />
            </div>
            <div>
              <label className="label">Button Text (Greek)</label>
              <input value={ban.ctaTextGR} onChange={e => setBan('ctaTextGR', e.target.value)} className="input w-full" placeholder="Αγόρασε Τώρα" />
            </div>
            <div className="col-span-2">
              <label className="label">Button Link</label>
              <input value={ban.ctaLink} onChange={e => setBan('ctaLink', e.target.value)} className="input w-full" placeholder="/products" />
            </div>
            <div className="col-span-2">
              <label className="label">Background Image URL (optional)</label>
              <input value={ban.image} onChange={e => setBan('image', e.target.value)} className="input w-full" placeholder="https://..." />
            </div>
          </div>
        </section>

        {/* Save button */}
        <button onClick={handleSave} disabled={saving}
          className="w-full font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] py-4 hover:bg-[#FF2200] transition-colors disabled:opacity-40">
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>

      <style jsx global>{`
        .label { display: block; font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(240,237,232,0.3); margin-bottom: 6px; }
        .input { background: #111; border: 1px solid #333; color: #F0EDE8; font-family: 'IBM Plex Mono', monospace; font-size: 12px; padding: 10px 14px; outline: none; transition: border-color 0.2s; display: block; }
        .input:focus { border-color: #FF2200; }
        .input::placeholder { color: rgba(240,237,232,0.2); }
      `}</style>
    </div>
  );
}
