'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useT } from './LanguageProvider';

export default function ProductCard({ product }) {
  const t = useT();
  const [hovered, setHovered] = useState(false);
  const onSale = product.salePrice && parseFloat(product.salePrice) < parseFloat(product.price);
  const discount = onSale ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
  const extraImages = product.images?.filter(Boolean) ?? [];
  const hoverImage = extraImages[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-[#111111] aspect-[3/4]">
        {product.image ? (
          <>
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400"
              style={{ opacity: hovered && hoverImage ? 0 : 1 }}
            />
            {hoverImage && (
              <img
                src={hoverImage}
                alt={product.name + ' alternate'}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400"
                style={{ opacity: hovered ? 1 : 0 }}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-[11px] text-[#F0EDE8]/20 uppercase tracking-widest">No Image</span>
          </div>
        )}

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <span className="font-mono text-[9px] uppercase tracking-widest bg-[#F0EDE8] text-[#080808] px-2 py-0.5">NEW</span>}
          {onSale && <span className="font-mono text-[9px] uppercase tracking-widest bg-[#FF2200] text-[#080808] px-2 py-0.5">-{discount}%</span>}
        </div>

        {!product.available && (
          <div className="absolute inset-0 bg-[#080808]/70 flex items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F0EDE8]/60 border border-[#F0EDE8]/20 px-3 py-1">{t('products.soldOut')}</span>
          </div>
        )}

        {extraImages.length > 1 && (
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {[product.image, ...extraImages].slice(0, 4).map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-[#F0EDE8]/60" />
            ))}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-[#080808]/90 py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/70">{t('products.viewProduct')}</span>
        </div>
      </div>

      <div className="pt-3 pb-1 flex items-start justify-between gap-2">
        <p className="font-mono text-xs uppercase tracking-wide text-[#F0EDE8]/80 leading-snug">{product.name}</p>
        <div className="flex flex-col items-end flex-shrink-0">
          {onSale ? (
            <>
              <span className="font-mono text-xs text-[#FF2200]">€{Number(product.salePrice).toFixed(2)}</span>
              <span className="font-mono text-[10px] text-[#F0EDE8]/30 line-through">€{Number(product.price).toFixed(2)}</span>
            </>
          ) : (
            <span className="font-mono text-xs text-[#F0EDE8]/60">€{Number(product.price).toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
