import { NextResponse } from 'next/server';
import { getReviews, saveReview, updateReview, deleteReview } from '@/lib/reviews';
import { isAdmin } from '@/lib/auth';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const admin = searchParams.get('admin') === 'true';
  if (admin && !isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getReviews(!admin));
}

export async function POST(req) {
  const ip = getClientIP(req);
  const limit = rateLimit(`review:${ip}`, { max: 5, windowSeconds: 60 });
  if (!limit.allowed) return NextResponse.json({ error: 'Too many reviews. Try again later.' }, { status: 429 });
  try {
    const review = await req.json();
    if (!review.name || !review.text || !review.rating) {
      return NextResponse.json({ error: 'Name, text, and rating required.' }, { status: 400 });
    }
    if (typeof review.name !== 'string' || review.name.length > 100) {
      return NextResponse.json({ error: 'Invalid name.' }, { status: 400 });
    }
    if (typeof review.text !== 'string' || review.text.length > 2000) {
      return NextResponse.json({ error: 'Review too long.' }, { status: 400 });
    }
    const saved = await saveReview(review);
    return NextResponse.json(saved);
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function PUT(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id, ...updates } = await req.json();
    const updated = await updateReview(id, updates);
    return NextResponse.json(updated);
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function DELETE(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await req.json();
    await deleteReview(id);
    return NextResponse.json({ ok: true });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
