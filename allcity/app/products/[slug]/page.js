'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(data => {
      const found = data.find(p => p.slug === slug);
      if (!found) { setNotFound(true); return; }
      setProduct(found); setAllProducts(data);
    }).catch(() => setNotFound(true)).finally(() => setLoading(false));
  }, [slug]);
  if (loading) return <div className="pt-14 min-h-screen flex items-center justify-center"><span className="font-mono text-xs text-[#F0EDE8]/30 uppercase tracking-widest">Loading...</span></div>;
  if (notFound) return <div className="pt-14 min-h-screen flex flex-col items-center justify-center gap-4"><span className="font-display text-6xl text-[#FF2200]">404</span><span className="font-mono text-xs text-[#F0EDE8]/40 uppercase tracking-widest">Product not found</span></div>;
  return <ProductDetail product={product} allProducts={allProducts} />;
}
