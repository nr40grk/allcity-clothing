import { NextResponse } from 'next/server';
import { getOrders, saveOrder, updateOrderStatus } from '@/lib/orders';
import { getResend, FROM_EMAIL } from '@/lib/resend';
import { render } from '@react-email/render';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmationEmail';

function isAuthorized(req) { return req.headers.get('x-admin-token') === process.env.ADMIN_PASSWORD; }

export async function GET(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getOrders());
}

export async function POST(req) {
  const order = await req.json();
  const saved = await saveOrder(order);

  try {
    const resend = getResend();
    if (resend) {
      const orderNum = saved.id || saved.orderNumber || Date.now();
      const locker = order.boxnowLockerName || order.boxnowLocker || null;

      // Customer confirmation
      const html = await render(OrderConfirmationEmail({
        orderNumber: orderNum,
        customerName: order.name,
        items: order.items || [],
        total: order.total,
        shippingAddress: `${order.address}, ${order.city} ${order.postalCode}`,
        boxnowLockerName: order.boxnowLockerName || null,
        boxnowLockerAddress: order.boxnowLockerAddress || null,
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://allcity-clothing.vercel.app',
      }));
      await resend.emails.send({
        from: FROM_EMAIL,
        to: order.email,
        subject: `Order Confirmed — #${orderNum} · ALLCITY`,
        html,
      });

      // Admin notification
      const itemsList = (order.items || []).map(i => `${i.name} ${i.size} ×${i.qty} — €${(i.price * i.qty).toFixed(2)}`).join('\n');
      await resend.emails.send({
        from: FROM_EMAIL,
        to: 'allcityclo@gmail.com',
        subject: `🛒 New Order #${orderNum} — €${Number(order.total).toFixed(2)}`,
        text: `New order from ${order.name}\nEmail: ${order.email}\nPhone: ${order.phone}\n\nBoxNow Locker: ${locker || 'N/A'}\nLocker ID: ${order.boxnowLockerId || 'N/A'}\nAddress: ${order.address}, ${order.city} ${order.postalCode}\n\nItems:\n${itemsList}\n\nTotal: €${Number(order.total).toFixed(2)}`,
      });
    }
  } catch (e) { console.error('Order email failed:', e.message); }

  return NextResponse.json(saved);
}

export async function PUT(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, status } = await req.json();
  const updated = await updateOrderStatus(id, status);
  return NextResponse.json(updated);
}
