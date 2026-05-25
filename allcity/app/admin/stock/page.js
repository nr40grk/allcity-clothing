'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const bool = v => v === true || v === 'true';

function StockDot({ count }) {
  if (count == null) return <span className="font-mono text-[10px] text-[#F0EDE8]/20">—</span>;
  if (count === 0) return <span className="font-mono text-xs text-[#FF2200]">{count}</span>;
  if (count <= 2) return <span className="font-mono text-xs text-[#FF8800]">{count}</span>;
  return <span className="font-mono text-xs text-[#22FF00]/70">{count}</span>;
}

export default function AdminStock() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | low | out
  const [msg, setMsg] = useState('');
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    const t = sessionStorage.getItem('admin_token');
    if (!t) { router.push('/admin'); return; }
    setToken(t);
  }, [router]);

  const fetchProducts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const res = await fetch('/api/admin', { headers: { 'x-admin-token': token } });
    if (res.status === 401) { router.push('/admin'); return; }
    const data = await res.json();
    setProducts(data.map(p => ({ ...p, available: bool(p.available), isNew: bool(p.isNew), images: p.images || [] })));
    setLoading(false);
  }, [token, router]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  function flash(text) { setMsg(text); setTimeout(() => setMsg(''), 3000); }

  async function updateStock(productId, size, newVal) {
    const val = Math.max(0, parseInt(newVal) || 0);
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      const stockBySizes = { ...(p.stockBySizes || {}) };
      let sizes = [...(p.sizes || [])];
      if (val > 0) {
        stockBySizes[size] = val;
        if (!sizes.includes(size)) sizes.push(size);
      } else {
        delete stockBySizes[size];
        sizes = sizes.filter(s => s !== size);
      }
      const available = sizes.length > 0;
      return { ...p, stockBySizes, sizes, available };
    }));
  }

  async function saveProductStock(product) {
    setSavingId(product.id);
    const payload = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      salePrice: product.salePrice ? parseFloat(product.salePrice) : null,
      stockBySizes: product.stockBySizes || {},
      sizes: product.sizes || [],
      available: product.available,
      isNew: product.isNew,
      image: product.image,
      images: product.images || [],
      category: product.category || 'general',
      description: product.description || '',
      details: Array.isArray(product.details) ? product.details : [],
    };
    const res = await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify(payload),
    });
    setSavingId(null);
    if (res.ok) flash('Saved.');
    else flash('Save failed.');
  }

  async function toggleAvailable(product) {
    const newVal = !bool(product.available);
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, available: newVal } : p));
    const res = await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ ...product, available: newVal }),
    });
    if (!res.ok) flash('Update failed.');
  }

  const allSizes = useMemo(() => {
    const set = new Set();
    products.forEach(p => (p.sizes || []).forEach(s => set.add(s)));
    return Array.from(set).sort();
  }, [products]);

  const filtered = useMemo(() => {
    let list = products;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q));
    }
    if (filter === 'out') list = list.filter(p => (p.sizes || []).length === 0);
    if (filter === 'low') {
      list = list.filter(p => {
        const vals = Object.values(p.stockBySizes || {});
        return vals.length > 0 && vals.every(v => v <= 2) && vals.some(v => v > 0);
      });
    }
    return list;
  }, [products, search, filter]);

  const stats = useMemo(() => {
    const total = products.length;
    const out = products.filter(p => (p.sizes || []).length === 0).length;
    const low = products.filter(p => {
      const vals = Object.values(p.stockBySizes || {});
      return vals.length > 0 && vals.some(v => v > 0 && v <= 2);
    }).length;
    const totalUnits = products.reduce((sum, p) => sum + Object.values(p.stockBySizes || {}).reduce((s, v) => s + (v || 0), 0), 0);
    return { total, out, low, totalUnits };
  }, [products]);

  return (
    <div className="min-h-screen bg-[#080808] pt-14 px-6 pb-20">
      {/* Nav */}
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pt-6">
        <div>
          <h1 className="font-display text-4xl text-[#F0EDE8] tracking-tight">STOCK</h1>
          <p className="font-mono text-xs text-[#F0EDE8]/30 uppercase tracking-widest mt-1">Inventory Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="font-mono text-[11px] uppercase tracking-widest border border-[#333] text-[#F0EDE8]/40 px-4 py-2 hover:border-[#F0EDE8]/30 hover:text-[#F0EDE8]/70 transition-colors">Products</Link>
          <Link href="/admin/sales" className="font-mono text-[11px] uppercase tracking-widest border border-[#333] text-[#F0EDE8]/40 px-4 py-2 hover:border-[#F0EDE8]/30 hover:text-[#F0EDE8]/70 transition-colors">Sales</Link>
          <Link href="/admin/reviews" className="font-mono text-[11px] uppercase tracking-widest border border-[#333] text-[#F0EDE8]/40 px-4 py-2 hover:border-[#F0EDE8]/30 hover:text-[#F0EDE8]/70 transition-colors">Reviews</Link>
          <Link href="/admin/settings" className="font-mono text-[11px] uppercase tracking-widest border border-[#333] text-[#F0EDE8]/40 px-4 py-2 hover:border-[#F0EDE8]/30 hover:text-[#F0EDE8]/70 transition-colors">Settings</Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Products', value: stats.total, color: 'text-[#F0EDE8]/60' },
            { label: 'Total Units', value: stats.totalUnits, color: 'text-[#F0EDE8]/60' },
            { label: 'Low Stock', value: stats.low, color: 'text-[#FF8800]' },
            { label: 'Out of Stock', value: stats.out, color: 'text-[#FF2200]' },
          ].map(s => (
            <div key={s.label} className="border border-[#1a1a1a] p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/20 mb-1">{s.label}</p>
              <p className={`font-display text-3xl ${s.color} tracking-tight`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="bg-[#111] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-2 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20 w-full sm:w-64"
          />
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'low', label: 'Low Stock' },
              { key: 'out', label: 'Out of Stock' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`font-mono text-[11px] uppercase tracking-widest px-3 py-2 border transition-colors ${filter === f.key ? 'bg-[#FF2200] border-[#FF2200] text-[#080808]' : 'border-[#333] text-[#F0EDE8]/40 hover:border-[#F0EDE8]/30'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {msg && <p className="font-mono text-xs text-[#FF2200] sm:ml-auto">{msg}</p>}
        </div>

        {/* Table */}
        {loading ? (
          <p className="font-mono text-xs text-[#F0EDE8]/30">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="font-mono text-xs text-[#F0EDE8]/20">No products match.</p>
        ) : (
          <div className="border border-[#1a1a1a] overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="text-left font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/20 px-4 py-3 w-[320px]">Product</th>
                  <th className="text-left font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/20 px-3 py-3">Status</th>
                  {allSizes.map(size => (
                    <th key={size} className="text-center font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/20 px-2 py-3 w-[72px]">{size}</th>
                  ))}
                  <th className="text-right font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/20 px-4 py-3 w-[100px]">Total</th>
                  <th className="text-right font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/20 px-4 py-3 w-[80px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(product => {
                  const total = Object.values(product.stockBySizes || {}).reduce((s, v) => s + (v || 0), 0);
                  const isAvailable = bool(product.available);
                  return (
                    <tr key={product.id} className="border-b border-[#1a1a1a] hover:bg-[#0d0d0d] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 bg-[#111] flex-shrink-0 overflow-hidden">
                            {product.image && <img src={product.image} alt="" className="w-full h-full object-cover" />}
                          </div>
                          <div className="min-w-0">
                            <p className="font-mono text-xs text-[#F0EDE8]/80 truncate">{product.name}</p>
                            <p className="font-mono text-[10px] text-[#F0EDE8]/20">{product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <button
                          onClick={() => toggleAvailable(product)}
                          className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 border transition-colors ${isAvailable ? 'border-[#FF2200]/30 text-[#FF2200]/80' : 'border-[#333] text-[#F0EDE8]/20'}`}
                        >
                          {isAvailable ? 'Live' : 'Off'}
                        </button>
                      </td>
                      {allSizes.map(size => {
                        const val = product.stockBySizes?.[size] ?? 0;
                        return (
                          <td key={size} className="px-2 py-3">
                            <div className="flex flex-col items-center gap-1">
                              <input
                                type="number"
                                min="0"
                                value={val}
                                onChange={e => updateStock(product.id, size, e.target.value)}
                                className="bg-[#111] border border-[#333] text-[#F0EDE8] font-mono text-xs w-14 text-center py-1 outline-none focus:border-[#FF2200] transition-colors"
                              />
                            </div>
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-right">
                        <span className={`font-mono text-xs ${total === 0 ? 'text-[#FF2200]' : total <= 5 ? 'text-[#FF8800]' : 'text-[#F0EDE8]/60'}`}>
                          {total}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => saveProductStock(product)}
                          disabled={savingId === product.id}
                          className="font-mono text-[10px] uppercase tracking-widest border border-[#333] text-[#F0EDE8]/40 px-3 py-1 hover:border-[#FF2200] hover:text-[#FF2200] transition-colors disabled:opacity-40"
                        >
                          {savingId === product.id ? '...' : 'Save'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx global>{`
        .label { display:block; font-family:'IBM Plex Mono',monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:rgba(240,237,232,0.3); margin-bottom:6px; }
        .input { background:#111; border:1px solid #333; color:#F0EDE8; font-family:'IBM Plex Mono',monospace; font-size:12px; padding:10px 14px; outline:none; transition:border-color 0.2s; display:block; }
        .input:focus { border-color:#FF2200; }
        .input::placeholder { color:rgba(240,237,232,0.2); }
        select.input option { background:#111; }
        @keyframes spin { to { transform:rotate(360deg); } }
        .animate-spin { animation:spin 0.8s linear infinite; }
      `}</style>
    </div>
  );
}
