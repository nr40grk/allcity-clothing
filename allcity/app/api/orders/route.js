import { NextResponse } from 'next/server';
import { getOrders, saveOrder, updateOrderStatus } from '@/lib/orders';

function isAuthorized(req) { return req.headers.get('x-admin-token') === process.env.ADMIN_PASSWORD; }

export async function GET(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getOrders());
}

export async function POST(req) {
  const order = await req.json();
  const saved = await saveOrder(order);
  return NextResponse.json(saved);
}

export async function PUT(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, status } = await req.json();
  const updated = await updateOrderStatus(id, status);
  return NextResponse.json(updated);
}
