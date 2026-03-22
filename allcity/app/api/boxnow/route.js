import { NextResponse } from 'next/server';
import { createBoxNowDelivery, findClosestBoxNowLocker } from '@/lib/boxnow';

export async function POST(req) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'findLocker') {
      const { city, street, postalCode } = body;
      const locker = await findClosestBoxNowLocker({ city, street, postalCode });
      return NextResponse.json(locker);
    }

    if (action === 'createDelivery') {
      const { orderNumber, invoiceValue, customer, destinationLocationId, items } = body;
      const result = await createBoxNowDelivery({
        orderNumber,
        invoiceValue,
        customer,
        destinationLocationId,
        items,
      });
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  } catch (err) {
    console.error('[BoxNow] API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
