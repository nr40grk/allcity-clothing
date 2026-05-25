import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/settings';
import { isAdmin } from '@/lib/auth';
export async function GET() { return NextResponse.json(await getSettings()); }
export async function PUT(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await saveSettings(await req.json());
  return NextResponse.json({ ok: true });
}
