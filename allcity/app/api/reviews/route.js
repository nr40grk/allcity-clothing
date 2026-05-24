import { NextResponse } from 'next/server';
import { getReviews, saveReview, updateReview, deleteReview } from '@/lib/reviews';

function isAuthorized(req) { return req.headers.get('x-admin-token') === process.env.ADMIN_PASSWORD; }

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const admin = searchParams.get('admin') === 'true';
  if (admin && !isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getReviews(!admin));
}

export async function POST(req) {
  try {
    const review = await req.json();
    const saved = await saveReview(review);
    return NextResponse.json(saved);
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function PUT(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id, ...updates } = await req.json();
    const updated = await updateReview(id, updates);
    return NextResponse.json(updated);
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function DELETE(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await req.json();
    await deleteReview(id);
    return NextResponse.json({ ok: true });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
