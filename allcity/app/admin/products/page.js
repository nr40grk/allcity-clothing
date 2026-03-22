'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SIZES_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'ONE SIZE'];
const CATEGORIES = ['jackets', 'hoodies', 'tees', 'pants', 'accessories'];
const EMPTY_FORM = { name: '', price: '', salePrice: '', category: 'jackets', available: true, isNew: false, image: '', sizes: ['S', 'M', 'L', 'XL'], description: '', details: '' };

const bool = (v) => v === true || v === 'true';

function Toggle({ on, onClick }) {
  return (
    <button type="button" onClick={onClick}
      style={{ background: on ? '#FF2200' : '#333' }}
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

export default function AdminProducts() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

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
    setProducts(data.map(p => ({ ...p, available: bool(p.available), isNew: bool(p.isNew) })));
    setLoading(false);
  }, [token, router]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  function flash(text) { setMsg(text); setTimeout(() => setMsg(''), 3000); }

  async function uploadImage(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { flash('Please upload an image file.'); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', headers: { 'x-admin-token': token }, body: fd });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setForm(prev => ({ ...prev, image: data.url }));
      flash('Image uploaded.');
    } catch (e) {
      flash('Upload failed: ' + e.message);
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadImage(file);
  }

  function startEdit(product) {
    setForm({
      ...product,
      available: bool(product.available),
      isNew: bool(product.isNew),
      salePrice: product.salePrice || '',
      details: Array.isArray(product.details) ? product.details.join('\n') : (product.details || ''),
    });
    setEditingId(product.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() { setForm(EMPTY_FORM); setEditingId(null); setShowForm(false); }

  function toggleSize(size) {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size],
    }));
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.image) { flash('Please upload a product image.'); return; }

    const payload = {
      ...form,
      available: bool(form.available),
      isNew: bool(form.isNew),
      price: parseFloat(form.price),
      salePrice: form.salePrice ? parseFloat(form.salePrice) : null,
      details: form.details.split('\n').map(d => d.trim()).filter(Boolean),
    };
    if (editingId) payload.id = editingId;

    const res = await fetch('/api/admin', {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify(payload),
    });

    if (!res.ok) { flash('Error saving product.'); return; }
    const saved = await res.json();

    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? { ...payload } : p));
      flash('Product updated.');
    } else {
      const newProduct = saved.id ? saved : { ...payload, id: Date.now().toString() };
      setProducts(prev => [...prev, { ...newProduct, available: bool(newProduct.available), isNew: bool(newProduct.isNew) }]);
      flash('Product created.');
    }
    resetForm();
  }

  async function handleDelete(id, name) {
    if (!confirm(`Delete "${name}"?`)) return;
    const res = await fetch('/api/admin', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ id }),
    });
    if (res.ok) { setProducts(prev => prev.filter(p => p.id !== id)); flash('Deleted.'); }
  }

  async function toggleAvailable(product) {
    const newVal = !bool(product.available);
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, available: newVal } : p));
    await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ ...product, available: newVal }),
    });
  }

  const isAvailable = bool(form.available);
  const isNew = bool(form.isNew);

  return (
    <div className="min-h-screen bg-[#080808] pt-20 px-6 pb-20">
      <div className="max-w-[1000px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl text-[#F0EDE8] tracking-tight">ADMIN PANEL</h1>
            <p className="font-mono text-[11px] text-[#F0EDE8]/30 uppercase tracking-widest mt-1">Products</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/settings" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#FF2200] hover:text-[#FF2200] transition-colors">
              Site Settings
            </Link>
            <a href="/" target="_blank" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#F0EDE8]/30 transition-colors">
              View Site ↗
            </a>
            <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(EMPTY_FORM); }}
              className="font-mono text-xs uppercase tracking-widest bg-[#FF2200] text-[#080808] px-4 py-2 hover:bg-[#F0EDE8] transition-colors">
              {showForm ? 'Cancel' : '+ New Product'}
            </button>
          </div>
        </div>

        {msg && <div className="mb-6 font-mono text-xs text-[#F0EDE8]/70 border border-[#333] px-4 py-3">{msg}</div>}

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSave} className="border border-[#1a1a1a] p-6 mb-10 flex flex-col gap-5 bg-[#0d0d0d]">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#FF2200]">
              {editingId ? 'Edit Product' : 'New Product'}
            </p>

            {/* Image upload */}
            <div>
              <label className="label">Product Image *</label>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => !uploading && fileInputRef.current?.click()}
                style={{ borderColor: dragOver ? '#FF2200' : '#333', background: dragOver ? 'rgba(255,34,0,0.05)' : 'transparent' }}
                className="border-2 border-dashed cursor-pointer flex flex-col items-center justify-center py-10 gap-3">
                {uploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border border-[#FF2200] border-t-transparent rounded-full animate-spin" />
                    <span className="font-mono text-[11px] text-[#F0EDE8]/30">Uploading...</span>
                  </div>
                ) : form.image ? (
                  <div className="flex flex-col items-center gap-3">
                    <img src={form.image} alt="Preview" className="h-36 object-contain" />
                    <span className="font-mono text-[11px] text-[#F0EDE8]/30">Click or drag to replace</span>
                  </div>
                ) : (
                  <>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#F0EDE8]/20">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span className="font-mono text-[11px] text-[#F0EDE8]/30">Drag & drop or click to upload</span>
                    <span className="font-mono text-[10px] text-[#F0EDE8]/20">JPG, PNG, WEBP</span>
                  </>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { if (e.target.files[0]) uploadImage(e.target.files[0]); e.target.value = ''; }} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="label">Product Name *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="input w-full" placeholder="ALLCITY CORE JACKET" />
              </div>
              <div>
                <label className="label">Original Price (€) *</label>
                <input required type="number" step="0.01" min="0" value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  className="input w-full" placeholder="120" />
              </div>
              <div>
                <label className="label">Sale Price (€) — leave blank if no sale</label>
                <input type="number" step="0.01" min="0" value={form.salePrice}
                  onChange={e => setForm({ ...form, salePrice: e.target.value })}
                  className="input w-full" placeholder="90" />
              </div>
              <div>
                <label className="label">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input w-full">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="label">Description</label>
                <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  className="input w-full" placeholder="Short product description" />
              </div>
              <div className="col-span-2">
                <label className="label">Details (one per line)</label>
                <textarea value={form.details} onChange={e => setForm({ ...form, details: e.target.value })}
                  className="input w-full h-24 resize-none" placeholder={"100% Nylon shell\nWaterproof coating"} />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="label">Sizes</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {SIZES_OPTIONS.map(size => (
                  <button key={size} type="button" onClick={() => toggleSize(size)}
                    style={{ background: form.sizes.includes(size) ? '#FF2200' : 'transparent', borderColor: form.sizes.includes(size) ? '#FF2200' : '#333', color: form.sizes.includes(size) ? '#080808' : 'rgba(240,237,232,0.4)' }}
                    className="font-mono text-xs px-3 py-1 border transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Flags row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="label">Availability</label>
                <div className="flex items-center gap-3 mt-2">
                  <Toggle on={isAvailable} onClick={() => setForm(prev => ({ ...prev, available: !bool(prev.available) }))} />
                  <span style={{ color: isAvailable ? '#FF2200' : 'rgba(240,237,232,0.3)' }} className="font-mono text-xs">
                    {isAvailable ? 'Available' : 'Sold Out'}
                  </span>
                </div>
              </div>
              <div>
                <label className="label">New Release Badge</label>
                <div className="flex items-center gap-3 mt-2">
                  <Toggle on={isNew} onClick={() => setForm(prev => ({ ...prev, isNew: !bool(prev.isNew) }))} />
                  <span style={{ color: isNew ? '#FF2200' : 'rgba(240,237,232,0.3)' }} className="font-mono text-xs">
                    {isNew ? 'Shows NEW badge' : 'No badge'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2 border-t border-[#1a1a1a]">
              <button type="submit"
                className="font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] px-6 py-3 hover:bg-[#FF2200] transition-colors">
                {editingId ? 'Save Changes' : 'Create Product'}
              </button>
              <button type="button" onClick={resetForm}
                className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/40 px-6 py-3 hover:border-[#F0EDE8]/30 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Products list */}
        {loading ? (
          <p className="font-mono text-xs text-[#F0EDE8]/30">Loading...</p>
        ) : products.length === 0 ? (
          <p className="font-mono text-xs text-[#F0EDE8]/20">No products yet. Click "+ New Product" to add one.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {products.map((product) => {
              const isOn = bool(product.available);
              const hasNew = bool(product.isNew);
              const onSale = product.salePrice && parseFloat(product.salePrice) < parseFloat(product.price);
              return (
                <div key={product.id} className="flex items-center gap-4 border border-[#1a1a1a] px-4 py-3 hover:border-[#333] transition-colors">
                  <div className="relative w-12 h-14 bg-[#111] flex-shrink-0 overflow-hidden">
                    {product.image && <img src={product.image} alt="" className="w-full h-full object-cover" />}
                    {hasNew && (
                      <span className="absolute top-0 left-0 bg-[#FF2200] font-mono text-[8px] uppercase tracking-widest px-1 py-0.5 text-[#080808]">NEW</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-[#F0EDE8]/80 truncate">{product.name}</p>
                    <div className="flex items-center gap-2">
                      {onSale ? (
                        <>
                          <span className="font-mono text-[11px] text-[#FF2200]">€{product.salePrice}</span>
                          <span className="font-mono text-[11px] text-[#F0EDE8]/20 line-through">€{product.price}</span>
                        </>
                      ) : (
                        <span className="font-mono text-[11px] text-[#F0EDE8]/30">€{product.price}</span>
                      )}
                      <span className="font-mono text-[11px] text-[#F0EDE8]/20">· {product.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Toggle on={isOn} onClick={() => toggleAvailable(product)} />
                    <span style={{ color: isOn ? 'rgba(255,34,0,0.7)' : 'rgba(240,237,232,0.2)' }}
                      className="font-mono text-[10px] uppercase tracking-widest w-14">
                      {isOn ? 'Live' : 'Sold Out'}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEdit(product)}
                      className="font-mono text-[11px] uppercase tracking-widest border border-[#333] text-[#F0EDE8]/40 px-3 py-1 hover:border-[#F0EDE8]/30 hover:text-[#F0EDE8]/70 transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id, product.name)}
                      className="font-mono text-[11px] uppercase tracking-widest border border-[#333] text-[#F0EDE8]/20 px-3 py-1 hover:border-[#FF2200] hover:text-[#FF2200] transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx global>{`
        .label { display: block; font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(240,237,232,0.3); margin-bottom: 6px; }
        .input { background: #111; border: 1px solid #333; color: #F0EDE8; font-family: 'IBM Plex Mono', monospace; font-size: 12px; padding: 10px 14px; outline: none; transition: border-color 0.2s; display: block; }
        .input:focus { border-color: #FF2200; }
        .input::placeholder { color: rgba(240,237,232,0.2); }
        select.input option { background: #111; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 0.8s linear infinite; }
      `}</style>
    </div>
  );
}
