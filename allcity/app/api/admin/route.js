import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/kv';
import { slugify } from '@/lib/products';
import { isAdmin } from '@/lib/auth';
function unauthorized() { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }
export async function GET(req) {
  if (!isAdmin(req)) return unauthorized();
  return NextResponse.json(await getProducts());
}
export async function POST(req) {
  if (!isAdmin(req)) return unauthorized();
  const body = await req.json();
  const products = await getProducts();
  const newProduct = { id: Date.now().toString(), slug: slugify(body.name), name: body.name, price: parseFloat(body.price), salePrice: body.salePrice ? parseFloat(body.salePrice) : null, stock: null, stockBySizes: body.stockBySizes || {}, category: body.category || 'general', available: body.available !== false, isNew: body.isNew === true, image: body.image || '', images: body.images || [], sizes: body.sizes || ['S','M','L','XL'], description: body.description || '', details: body.details || [] };
  await saveProducts([...products, newProduct]);
  return NextResponse.json(newProduct, { status: 201 });
}
export async function PUT(req) {
  if (!isAdmin(req)) return unauthorized();
  const body = await req.json();
  const products = await getProducts();
  const updated = products.map(p => p.id === body.id ? { ...p, ...body, slug: slugify(body.name), price: parseFloat(body.price), salePrice: body.salePrice ? parseFloat(body.salePrice) : null, stock: null, stockBySizes: body.stockBySizes || p.stockBySizes || {}, images: body.images || p.images || [] } : p);
  await saveProducts(updated);
  return NextResponse.json({ ok: true });
}
export async function DELETE(req) {
  if (!isAdmin(req)) return unauthorized();
  const { id } = await req.json();
  const products = await getProducts();
  await saveProducts(products.filter(p => p.id !== id));
  return NextResponse.json({ ok: true });
}
