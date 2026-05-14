'use client';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { useT } from '@/components/LanguageProvider';

export default function ProductsPage() {
  const t = useT();
  const [products, setProducts] = useState([]);
  const [clothingTypes, setClothingTypes] = useState([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [saleFilter, setSaleFilter] = useState('all');

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(data => {
      setProducts([...data.filter(p => p.available), ...data.filter(p => !p.available)]);
    }).catch(() => {});
    fetch('/api/settings').then(r => r.json()).then(data => {
      if (data?.clothingTypes) setClothingTypes(data.clothingTypes);
    }).catch(() => {});
  }, []);

  const filtered = products.filter(p => {
    const typeOk = typeFilter === 'all' || p.category === typeFilter;
    const saleOk = saleFilter === 'all' || (saleFilter === 'sale' && p.salePrice && parseFloat(p.salePrice) < parseFloat(p.price));
    return typeOk && saleOk;
  });

  const btnClass = (active) =>
    `font-mono text-[11px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
      active ? 'border-[#FF2200] text-[#FF2200] bg-[#FF2200]/10' : 'border-[#333] text-[#F0EDE8]/40 hover:border-[#F0EDE8]/30 hover:text-[#F0EDE8]/70'
    }`;

  return (
    <div className="pt-14">
      <div className="px-6 pt-16 pb-10 border-b border-[#1a1a1a] max-w-[1400px] mx-auto flex items-end justify-between">
        <h1 className="font-display text-6xl md:text-8xl text-[#F0EDE8] tracking-tight leading-none">{t('products.title')}</h1>
        <span className="font-mono text-xs text-[#F0EDE8]/30 uppercase tracking-widest">{filtered.length} {t('products.items')}</span>
      </div>

      {/* Filters */}
      <div className="px-6 py-6 border-b border-[#1a1a1a] max-w-[1400px] mx-auto flex flex-wrap gap-6">
        {/* Sale filter */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/20 mr-1">Price</span>
          <button className={btnClass(saleFilter === 'all')} onClick={() => setSaleFilter('all')}>All</button>
          <button className={btnClass(saleFilter === 'sale')} onClick={() => setSaleFilter('sale')}>On Sale</button>
        </div>

        {/* Clothing type filter */}
        {clothingTypes.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/20 mr-1">Type</span>
            <button className={btnClass(typeFilter === 'all')} onClick={() => setTypeFilter('all')}>All</button>
            {clothingTypes.map(type => (
              <button key={type} className={btnClass(typeFilter === type)} onClick={() => setTypeFilter(type)}>
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 py-12 max-w-[1400px] mx-auto">
        {filtered.length === 0 ? (
          <p className="font-mono text-xs text-[#F0EDE8]/20 uppercase tracking-widest">No products match these filters.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
    </div>
  );
}
