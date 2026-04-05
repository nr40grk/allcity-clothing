import { NextResponse } from 'next/server';
import { removeSubscriber } from '@/lib/subscribers';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return new Response('<p style="font-family:monospace;color:#F0EDE8;background:#080808;padding:40px">Invalid unsubscribe link.</p>', { headers: { 'Content-Type': 'text/html' } });
  }

  await removeSubscriber(email);

  return new Response(
    `<html><body style="background:#080808;color:#F0EDE8;font-family:monospace;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0">
      <div style="text-align:center">
        <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(240,237,232,0.4)">Unsubscribed</p>
        <p style="font-size:24px;font-weight:700;margin:12px 0">You're out.</p>
        <p style="color:rgba(240,237,232,0.4);font-size:13px">You've been removed from the ALLCITY list.</p>
        <a href="/" style="display:inline-block;margin-top:24px;background:#FF2200;color:#080808;padding:12px 24px;text-decoration:none;font-size:11px;letter-spacing:0.15em;text-transform:uppercase">Back to Site</a>
      </div>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
