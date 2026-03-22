'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function LoginForm({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin', { headers: { 'x-admin-token': password } });
    if (res.ok) {
      sessionStorage.setItem('admin_token', password);
      onLogin(password);
    } else {
      setError('Wrong password.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808]">
      <div className="w-full max-w-sm px-6">
        <h1 className="font-display text-5xl text-[#F0EDE8] mb-2 tracking-tight">ADMIN</h1>
        <p className="font-mono text-xs text-[#F0EDE8]/30 mb-10 uppercase tracking-widest">Allcity Panel</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} autoFocus
            className="bg-[#111] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20" />
          {error && <p className="font-mono text-xs text-[#FF2200]">{error}</p>}
          <button type="submit"
            className="font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] py-3 hover:bg-[#FF2200] transition-colors">
            Enter →
          </button>
        </form>
      </div>
    </div>
  );
}

function Dashboard({ token }) {
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [tab, setTab] = useState('overview'); // 'overview' | 'banner' | 'sale'

  // Banner form state
  const [banner, setBanner] = useState({ enabled: false, text: '', subtext: '', bgColor: '#FF2200', textColor: '#080808', expiresAt: '' });
  // Global sale form state
  const [globalSale, setGlobalSale] = useState({ enabled: false, discountPercent: '' });

  function flash(text) { setMsg(text); setTimeout(() => setMsg(''), 3000); }

  useEffect(() => {
    async function load() {
      const [pRes, sRes] = await Promise.all([
        fetch('/api/admin', { headers: { 'x-admin-token': token } }),
        fetch('/api/settings'),
      ]);
      const p = await pRes.json();
      const s = await sRes.json();
      setProducts(Array.isArray(p) ? p : []);
      setSettings(s);
      setBanner({ ...s.banner, expiresAt: s.banner?.expiresAt ? s.banner.expiresAt.slice(0, 16) : '' });
      setGlobalSale({ enabled: s.globalSale?.enabled || false, discountPercent: s.globalSale?.discountPercent || '' });
      setLoading(false);
    }
    load();
  }, [token]);

  async function saveBanner() {
    const updated = { ...settings, banner: { ...banner, expiresAt: banner.expiresAt || null } };
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify(updated),
    });
    if (res.ok) { setSettings(updated); flash('Banner saved.'); }
    else flash('Error saving banner.');
  }

  async function saveGlobalSale() {
    const updated = { ...settings, globalSale: { enabled: globalSale.enabled, discountPercent: parseFloat(globalSale.discountPercent) || 0 } };
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify(updated),
    });
    if (res.ok) { setSettings(updated); flash('Sale settings saved.'); }
    else flash('Error saving sale.');
  }

  async function setProductSale(productId, salePrice) {
    const res = await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ id: productId, salePrice: salePrice === '' ? null : parseFloat(salePrice) }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.all) setProducts(data.all);
      flash('Product sale price updated.');
    }
  }

  const available = products.filter(p => p.available).length;
  const soldOut = products.filter(p => !p.available).length;
  const onSale = products.filter(p => p.salePrice && parseFloat(p.salePrice) > 0).length;

  return (
    <div className="min-h-screen bg-[#080808] pt-20 px-6 pb-20">
      <div className="max-w-[1000px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl text-[#F0EDE8] tracking-tight">ADMIN PANEL</h1>
            <p className="font-mono text-[11px] text-[#F0EDE8]/30 uppercase tracking-widest mt-1">Dashboard</p>
          </div>
          <div className="flex gap-3">
            <a href="/" target="_blank" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#F0EDE8]/30 transition-colors">
              View Site ↗
            </a>
            <Link href="/admin/products" className="font-mono text-xs uppercase tracking-widest bg-[#FF2200] text-[#080808] px-4 py-2 hover:bg-[#F0EDE8] transition-colors">
              Products →
            </Link>
          </div>
        </div>

        {msg && <div className="mb-6 font-mono text-xs text-[#F0EDE8]/70 border border-[#333] px-4 py-3">{msg}</div>}

        {/* Tabs */}
        <div className="flex gap-0 border border-[#1a1a1a] mb-8 w-fit">
          {[['overview', 'Overview'], ['banner', 'Sale Banner'], ['sale', 'Discounts']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              style={{ background: tab === id ? '#FF2200' : 'transparent', color: tab === id ? '#080808' : 'rgba(240,237,232,0.4)' }}
              className="font-mono text-xs uppercase tracking-widest px-5 py-2 transition-colors border-r border-[#1a1a1a] last:border-r-0">
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="font-mono text-xs text-[#F0EDE8]/30">Loading...</p>
        ) : (
          <>
            {/* Overview tab */}
            {tab === 'overview' && (
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Products', value: products.length },
                    { label: 'Available', value: available },
                    { label: 'Sold Out', value: soldOut },
                    { label: 'On Sale', value: onSale },
                  ].map(({ label, value }) => (
                    <div key={label} className="border border-[#1a1a1a] p-5 bg-[#0d0d0d]">
                      <p className="font-mono text-[11px] text-[#F0EDE8]/30 uppercase tracking-widest mb-2">{label}</p>
                      <p className="font-display text-4xl text-[#F0EDE8]">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Status indicators */}
                <div className="border border-[#1a1a1a] p-5 bg-[#0d0d0d] flex flex-col gap-3">
                  <p className="font-mono text-[11px] text-[#F0EDE8]/30 uppercase tracking-widest mb-1">Active Right Now</p>
                  <div className="flex items-center gap-3">
                    <span style={{ background: settings?.banner?.enabled ? '#FF2200' : '#333', width: 8, height: 8, borderRadius: '50%', display: 'inline-block' }} />
                    <span className="font-mono text-xs text-[#F0EDE8]/60">Sale Banner — {settings?.banner?.enabled ? 'ON' : 'OFF'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{ background: settings?.globalSale?.enabled ? '#FF2200' : '#333', width: 8, height: 8, borderRadius: '50%', display: 'inline-block' }} />
                    <span className="font-mono text-xs text-[#F0EDE8]/60">
                      Global Discount — {settings?.globalSale?.enabled ? `${settings.globalSale.discountPercent}% OFF` : 'OFF'}
                    </span>
                  </div>
                </div>

                <Link href="/admin/products"
                  className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-5 py-3 w-fit hover:border-[#FF2200] hover:text-[#FF2200] transition-colors">
                  Manage Products →
                </Link>
              </div>
            )}

            {/* Banner tab */}
            {tab === 'banner' && (
              <div className="border border-[#1a1a1a] p-6 bg-[#0d0d0d] flex flex-col gap-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#FF2200]">Sale Banner</p>
                <p className="font-mono text-[11px] text-[#F0EDE8]/30">Displays a bar below the navbar on all pages when enabled.</p>

                {/* Toggle */}
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setBanner(b => ({ ...b, enabled: !b.enabled }))}
                    style={{ background: banner.enabled ? '#FF2200' : '#333', position: 'relative', width: 44, height: 24, borderRadius: 12 }}
                    className="transition-colors flex-shrink-0">
                    <span style={{ position: 'absolute', top: 4, left: banner.enabled ? 24 : 4, width: 16, height: 16, background: 'white', borderRadius: '50%', transition: 'left 0.2s' }} />
                  </button>
                  <span className="font-mono text-xs text-[#F0EDE8]/50">{banner.enabled ? 'Banner is ON' : 'Banner is OFF'}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="label">Banner Text</label>
                    <input value={banner.text} onChange={e => setBanner(b => ({ ...b, text: e.target.value }))}
                      className="input w-full" placeholder="SALE — 50% OFF EVERYTHING" />
                  </div>
                  <div className="col-span-2">
                    <label className="label">Subtext (optional)</label>
                    <input value={banner.subtext} onChange={e => setBanner(b => ({ ...b, subtext: e.target.value }))}
                      className="input w-full" placeholder="Limited time only. Use code: ALLCITY50" />
                  </div>
                  <div>
                    <label className="label">Background Color</label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={banner.bgColor} onChange={e => setBanner(b => ({ ...b, bgColor: e.target.value }))}
                        className="w-10 h-10 cursor-pointer bg-transparent border-0" />
                      <input value={banner.bgColor} onChange={e => setBanner(b => ({ ...b, bgColor: e.target.value }))}
                        className="input flex-1" placeholder="#FF2200" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Text Color</label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={banner.textColor} onChange={e => setBanner(b => ({ ...b, textColor: e.target.value }))}
                        className="w-10 h-10 cursor-pointer bg-transparent border-0" />
                      <input value={banner.textColor} onChange={e => setBanner(b => ({ ...b, textColor: e.target.value }))}
                        className="input flex-1" placeholder="#080808" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="label">Expires At (optional)</label>
                    <input type="datetime-local" value={banner.expiresAt}
                      onChange={e => setBanner(b => ({ ...b, expiresAt: e.target.value }))}
                      className="input w-full" />
                    <p className="font-mono text-[11px] text-[#F0EDE8]/20 mt-1">Leave blank to keep banner active indefinitely.</p>
                  </div>
                </div>

                {/* Preview */}
                {banner.text && (
                  <div>
                    <label className="label">Preview</label>
                    <div style={{ background: banner.bgColor, color: banner.textColor }} className="px-6 py-2 flex items-center justify-center gap-4">
                      <span className="font-display text-base tracking-widest">{banner.text}</span>
                      {banner.subtext && <span className="font-mono text-[11px] opacity-70">{banner.subtext}</span>}
                    </div>
                  </div>
                )}

                <button onClick={saveBanner}
                  className="font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] px-6 py-3 hover:bg-[#FF2200] transition-colors w-fit">
                  Save Banner
                </button>
              </div>
            )}

            {/* Sale / Discounts tab */}
            {tab === 'sale' && (
              <div className="flex flex-col gap-6">

                {/* Global sale */}
                <div className="border border-[#1a1a1a] p-6 bg-[#0d0d0d] flex flex-col gap-5">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#FF2200]">Global Discount</p>
                  <p className="font-mono text-[11px] text-[#F0EDE8]/30">Applies a % discount to all products automatically. Per-product sale prices take priority.</p>

                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setGlobalSale(s => ({ ...s, enabled: !s.enabled }))}
                      style={{ background: globalSale.enabled ? '#FF2200' : '#333', position: 'relative', width: 44, height: 24, borderRadius: 12 }}
                      className="transition-colors flex-shrink-0">
                      <span style={{ position: 'absolute', top: 4, left: globalSale.enabled ? 24 : 4, width: 16, height: 16, background: 'white', borderRadius: '50%', transition: 'left 0.2s' }} />
                    </button>
                    <span className="font-mono text-xs text-[#F0EDE8]/50">{globalSale.enabled ? 'Global discount is ON' : 'Global discount is OFF'}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="label">Discount %</label>
                      <input type="number" min="0" max="100" step="1" value={globalSale.discountPercent}
                        onChange={e => setGlobalSale(s => ({ ...s, discountPercent: e.target.value }))}
                        className="input w-full" placeholder="50" />
                    </div>
                    {globalSale.discountPercent && (
                      <div className="pt-5 font-mono text-xs text-[#F0EDE8]/40">
                        e.g. €100 → €{(100 * (1 - parseFloat(globalSale.discountPercent) / 100)).toFixed(2)}
                      </div>
                    )}
                  </div>

                  <button onClick={saveGlobalSale}
                    className="font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] px-6 py-3 hover:bg-[#FF2200] transition-colors w-fit">
                    Save Global Discount
                  </button>
                </div>

                {/* Per-product sale prices */}
                <div className="border border-[#1a1a1a] p-6 bg-[#0d0d0d] flex flex-col gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#FF2200]">Per-Product Sale Price</p>
                  <p className="font-mono text-[11px] text-[#F0EDE8]/30">Set a specific sale price per product. Overrides global discount. Leave blank to remove.</p>

                  <div className="flex flex-col gap-2 mt-2">
                    {products.map(product => (
                      <ProductSaleRow key={product.id} product={product} onSave={setProductSale} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
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

function ProductSaleRow({ product, onSave }) {
  const [price, setPrice] = useState(product.salePrice ?? '');
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    await onSave(product.id, price);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex items-center gap-4 border border-[#1a1a1a] px-4 py-3">
      <div className="w-10 h-12 bg-[#111] flex-shrink-0 overflow-hidden">
        {product.image && <img src={product.image} alt="" className="w-full h-full object-cover" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs text-[#F0EDE8]/70 truncate">{product.name}</p>
        <p className="font-mono text-[11px] text-[#F0EDE8]/30">Regular: €{product.price}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="font-mono text-[11px] text-[#F0EDE8]/30">Sale €</span>
        <input
          type="number" step="0.01" min="0" value={price}
          onChange={e => setPrice(e.target.value)}
          className="input w-24 py-2 text-center"
          placeholder="—"
        />
        <button onClick={handleSave}
          style={{ background: saved ? '#22c55e' : '#FF2200' }}
          className="font-mono text-[11px] uppercase tracking-widest text-[#080808] px-3 py-2 transition-colors">
          {saved ? '✓' : 'Set'}
        </button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = sessionStorage.getItem('admin_token');
    if (t) setToken(t);
  }, []);

  if (!token) return <LoginForm onLogin={setToken} />;
  return <Dashboard token={token} />;
}
