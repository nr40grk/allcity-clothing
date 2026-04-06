import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/kv';
import { slugify } from '@/lib/products';
function isAuthorized(req) { return req.headers.get('x-admin-token') === process.env.ADMIN_PASSWORD; }
export async function GET(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getProducts());
}
export async function POST(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const products = await getProducts();
  const newProduct = { id: Date.now().toString(), slug: slugify(body.name), name: body.name, price: parseFloat(body.price), salePrice: body.salePrice ? parseFloat(body.salePrice) : null, stock: body.stock != null ? parseInt(body.stock) : null, category: body.category || 'general', available: body.available !== false, isNew: body.isNew === true, image: body.image || '', sizes: body.sizes || ['S','M','L','XL'], description: body.description || '', details: body.details || [] };
  await saveProducts([...products, newProduct]);
  return NextResponse.json(newProduct, { status: 201 });
}
export async function PUT(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const products = await getProducts();
  const updated = products.map(p => p.id === body.id ? { ...p, ...body, slug: slugify(body.name), price: parseFloat(body.price), salePrice: body.salePrice ? parseFloat(body.salePrice) : null, stock: body.stock != null ? parseInt(body.stock) : null } : p);
  await saveProducts(updated);
  return NextResponse.json({ ok: true });
}
export async function DELETE(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  const products = await getProducts();
  await saveProducts(products.filter(p => p.id !== id));
  return NextResponse.json({ ok: true });
}
