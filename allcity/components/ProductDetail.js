'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useT } from '@/components/LanguageProvider';

export default function ProductDetail({ product, allProducts = [] }) {
  const t = useT();
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [addedMsg, setAddedMsg] = useState('');

  const images = product.images && product.images.length > 0
    ? product.images
    : product.image ? [product.image] : [];

  const related = allProducts.filter((p) => p.id !== product.id && p.available).slice(0, 4);

  function handleAddToCart() {
    if (!selectedSize) { setAddedMsg(t('product.selectSize')); return; }
    setAddedMsg(`${t('product.addedToCart')} — ${product.name} / ${selectedSize}`);
    setTimeout(() => setAddedMsg(''), 3000);
  }

  return (
    <div className="pt-14">
      <div className="px-6 py-5 border-b border-[#1a1a1a]">
        <div className="max-w-[1400px] mx-auto flex gap-3 font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/30">
          <Link href="/" className="hover:text-[#FF2200] transition-colors">{t('product.home')}</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#FF2200] transition-colors">{t('nav.products')}</Link>
          <span>/</span>
          <span className="text-[#F0EDE8]/60">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 lg:gap-20">
        <div className="flex flex-col gap-3">
          <div className="bg-[#111] aspect-[3/4] overflow-hidden">
            {images[activeImg]
              ? <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center"><span className="font-mono text-xs text-[#F0EDE8]/20">No Image</span></div>
            }
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((src, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-16 h-20 bg-[#111] overflow-hidden border transition-colors ${activeImg === i ? 'border-[#FF2200]' : 'border-transparent'}`}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-[#F0EDE8] tracking-tight leading-tight">{product.name}</h1>
            {product.salePrice && parseFloat(product.salePrice) < parseFloat(product.price) ? (<div className="flex items-center gap-3 mt-2"><span className="font-mono text-xl text-[#FF2200]">€{Number(product.salePrice).toFixed(2)}</span><span className="font-mono text-base text-[#F0EDE8]/30 line-through">€{Number(product.price).toFixed(2)}</span><span className="font-mono text-[10px] bg-[#FF2200] text-[#080808] px-2 py-0.5">-{Math.round((1 - product.salePrice / product.price) * 100)}%</span></div>) : (<p className="font-mono text-xl text-[#F0EDE8]/70 mt-2">€{Number(product.price).toFixed(2)}</p>)}
            <p className="font-mono text-[11px] text-[#F0EDE8]/30 mt-1">{t('product.taxIncluded')}</p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-3">{t('product.size')}</p>
            <div className="flex flex-wrap gap-2">
              {(product.sizes || []).map((size) => (
                <button key={size} onClick={() => setSelectedSize(size)}
                  className={`font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-150 ${
                    selectedSize === size ? 'bg-[#FF2200] border-[#FF2200] text-[#080808]' : 'border-[#333] text-[#F0EDE8]/60 hover:border-[#F0EDE8]/50'
                  }`}>{size}</button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-3">{t('product.quantity')}</p>
            <div className="flex items-center border border-[#333] w-fit">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 font-mono text-[#F0EDE8]/60 hover:text-[#F0EDE8] flex items-center justify-center border-r border-[#333]">−</button>
              <span className="w-10 h-10 font-mono text-xs text-[#F0EDE8] flex items-center justify-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-10 font-mono text-[#F0EDE8]/60 hover:text-[#F0EDE8] flex items-center justify-center border-l border-[#333]">+</button>
            </div>
          </div>

          {product.available ? (
            <div className="flex flex-col gap-3">
              <button onClick={handleAddToCart} className="w-full font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] py-4 hover:bg-[#FF2200] transition-colors duration-200">
                {t('product.addToCart')}
              </button>
              <Link href="/checkout" className="w-full font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/60 py-4 text-center hover:border-[#FF2200] hover:text-[#FF2200] transition-colors duration-200">
                {t('product.buyNow')}
              </Link>
              {addedMsg && <p className={`font-mono text-xs ${addedMsg.includes('select') || addedMsg.includes('επέλεξε') ? 'text-[#FF2200]' : 'text-[#F0EDE8]/50'}`}>{addedMsg}</p>}
            </div>
          ) : (
            <div className="w-full font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/20 py-4 text-center cursor-not-allowed">
              {t('product.soldOut')}
            </div>
          )}

          <div className="border-t border-[#1a1a1a] pt-6">
            <p className="font-mono text-xs text-[#F0EDE8]/60 leading-relaxed mb-4">{product.description}</p>
            <ul className="flex flex-col gap-2">
              {(product.details || []).map((d) => (
                <li key={d} className="font-mono text-xs text-[#F0EDE8]/40 flex items-center gap-2">
                  <span className="text-[#FF2200]">—</span> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-[#1a1a1a] px-6 py-14 max-w-[1400px] mx-auto">
          <h2 className="font-display text-4xl text-[#F0EDE8] mb-8 tracking-tight">{t('product.youMayAlsoLike')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
