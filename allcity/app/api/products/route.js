import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/kv';
import { getSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const [products, settings] = await Promise.all([getProducts(), getSettings()]);

  // Apply global sale discount if active
  const globalDiscount = settings.globalSale?.enabled
    ? parseFloat(settings.globalSale.discountPercent) / 100
    : 0;

  const result = products.map(p => {
    // Per-product sale takes priority over global
    const hasSale = p.salePrice && parseFloat(p.salePrice) > 0;
    const salePrice = hasSale
      ? parseFloat(p.salePrice)
      : globalDiscount > 0
        ? Math.round(parseFloat(p.price) * (1 - globalDiscount) * 100) / 100
        : null;

    return {
      ...p,
      originalPrice: salePrice ? p.price : null,
      displayPrice: salePrice ?? p.price,
      onSale: !!salePrice,
    };
  });

  return NextResponse.json(result, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
