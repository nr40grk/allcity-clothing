import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
export async function POST(req) {
  if (req.headers.get('x-admin-token') !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    const filename = `products/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '')}`;
    const blob = await put(filename, file, { access: 'public' });
    return NextResponse.json({ url: blob.url });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
