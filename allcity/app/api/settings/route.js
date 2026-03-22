import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/settings';

function isAuthorized(req) {
  return req.headers.get('x-admin-token') === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  await saveSettings(body);
  return NextResponse.json({ ok: true });
}
