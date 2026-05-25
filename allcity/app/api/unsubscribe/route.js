import { NextResponse } from 'next/server';
import { removeSubscriber } from '@/lib/subscribers';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

function page(content) {
  return new Response(
    `<html><body style="background:#080808;color:#F0EDE8;font-family:monospace;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0">
      <div style="text-align:center;max-width:400px;padding:20px">${content}</div>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  if (!email || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@\.]+\.[^\s@]+$/.test(email)) {
    return page(`<p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(240,237,232,0.4)">Error</p><p style="font-size:16px;margin:12px 0">Invalid unsubscribe link.</p>`);
  }
  // Show confirmation form — actual unsubscription requires POST (CSRF protection)
  return page(`
    <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(240,237,232,0.4)">Unsubscribe</p>
    <p style="font-size:16px;margin:12px 0">Remove <strong>${escapeHtml(email)}</strong> from the ALLCITY list?</p>
    <form method="POST" action="/api/unsubscribe" style="margin-top:24px">
      <input type="hidden" name="email" value="${escapeHtml(email)}" />
      <button type="submit" style="background:#FF2200;color:#080808;border:none;padding:12px 24px;font-family:monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer">Confirm Unsubscribe</button>
    </form>
  `);
}

export async function POST(req) {
  const ip = getClientIP(req);
  const limit = rateLimit(`unsubscribe:${ip}`, { max: 10, windowSeconds: 60 });
  if (!limit.allowed) {
    return page(`<p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(240,237,232,0.4)">Error</p><p style="font-size:16px;margin:12px 0">Too many requests. Try again later.</p>`);
  }
  const formData = await req.formData();
  const email = formData.get('email');
  if (!email || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@\.]+\.[^\s@]+$/.test(email)) {
    return page(`<p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(240,237,232,0.4)">Error</p><p style="font-size:16px;margin:12px 0">Invalid email address.</p>`);
  }
  await removeSubscriber(email);
  return page(`
    <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(240,237,232,0.4)">Unsubscribed</p>
    <p style="font-size:24px;font-weight:700;margin:12px 0">You're out.</p>
    <p style="color:rgba(240,237,232,0.4);font-size:13px">You've been removed from the ALLCITY list.</p>
    <a href="/" style="display:inline-block;margin-top:24px;background:#FF2200;color:#080808;padding:12px 24px;text-decoration:none;font-size:11px;letter-spacing:0.15em;text-transform:uppercase">Back to Site</a>
  `);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
