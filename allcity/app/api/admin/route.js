import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/kv';
import { slugify } from '@/lib/products';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function isAuthorized(req) {
  return req.headers.get('x-admin-token') === process.env.ADMIN_PASSWORD;
}

export async function GET(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const products = await getProducts();
    return NextResponse.json(products, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const products = await getProducts();
    const newProduct = {
      id: Date.now().toString(),
      slug: slugify(body.name),
      name: body.name,
      price: parseFloat(body.price),
      category: body.category || 'general',
      available: body.available !== false,
      image: body.image || '',
      sizes: body.sizes || ['S', 'M', 'L', 'XL'],
      description: body.description || '',
      details: body.details || [],
      salePrice: body.salePrice || null,
    };
    const updated = [...products, newProduct];
    await saveProducts(updated);
    return NextResponse.json({ product: newProduct, all: updated }, { status: 201 });
  } catch (e) {
    console.error('[POST /api/admin]', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const products = await getProducts();
    const updated = products.map(p => {
      if (p.id !== body.id) return p;
      const merged = { ...p, ...body };
      // Regenerate slug only if name changed
      if (body.name) merged.slug = slugify(body.name);
      if (body.price !== undefined) merged.price = parseFloat(body.price);
      // Handle salePrice explicitly — null removes it
      if ('salePrice' in body) merged.salePrice = body.salePrice ? parseFloat(body.salePrice) : null;
      return merged;
    });
    await saveProducts(updated);
    return NextResponse.json({ ok: true, all: updated });
  } catch (e) {
    console.error('[PUT /api/admin]', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await req.json();
    const products = await getProducts();
    const updated = products.filter(p => p.id !== id);
    await saveProducts(updated);
    return NextResponse.json({ ok: true, all: updated });
  } catch (e) {
    console.error('[DELETE /api/admin]', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
