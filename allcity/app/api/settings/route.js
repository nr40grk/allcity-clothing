import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/settings';
function isAuthorized(req) { return req.headers.get('x-admin-token') === process.env.ADMIN_PASSWORD; }
export async function GET() { return NextResponse.json(await getSettings()); }
export async function PUT(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await saveSettings(await req.json());
  return NextResponse.json({ ok: true });
}
