'use client';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { useT } from '@/components/LanguageProvider';

export default function ProductsPage() {
  const t = useT();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(data => {
      const available = data.filter(p => p.available);
      const soldOut = data.filter(p => !p.available);
      setProducts([...available, ...soldOut]);
    }).catch(() => {});
  }, []);

  return (
    <div className="pt-14">
      <div className="px-6 pt-16 pb-10 border-b border-[#1a1a1a] max-w-[1400px] mx-auto flex items-end justify-between">
        <h1 className="font-display text-6xl md:text-8xl text-[#F0EDE8] tracking-tight leading-none">{t('products.title')}</h1>
        <span className="font-mono text-xs text-[#F0EDE8]/30 uppercase tracking-widest">{products.length} {t('products.items')}</span>
      </div>
      <div className="px-6 py-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
}
