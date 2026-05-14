const PREFIX = 'allcity-orders/';

export async function getOrders() {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
    const { list } = await import('@vercel/blob');
    const { blobs } = await list({ prefix: PREFIX });
    if (!blobs?.length) return [];
    const orders = await Promise.all(
      blobs.map(async b => {
        const res = await fetch(b.url + '?t=' + Date.now());
        return res.ok ? res.json() : null;
      })
    );
    return orders.filter(Boolean).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch { return []; }
}

export async function saveOrder(order) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { ...order, id: 'local', createdAt: new Date().toISOString(), status: 'pending' };
  const { put } = await import('@vercel/blob');
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const full = { ...order, id, createdAt: new Date().toISOString(), status: 'pending' };
  await put(`${PREFIX}${id}.json`, JSON.stringify(full), { access: 'public', contentType: 'application/json' });
  return full;
}

export async function updateOrderStatus(id, status) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN not set.');
  const { put, list, del } = await import('@vercel/blob');
  const { blobs } = await list({ prefix: PREFIX });
  const blob = blobs.find(b => b.pathname.includes(id));
  if (!blob) throw new Error('Order not found');
  const res = await fetch(blob.url + '?t=' + Date.now());
  const order = await res.json();
  const updated = { ...order, status };
  await del([blob.url]);
  await put(`${PREFIX}${id}.json`, JSON.stringify(updated), { access: 'public', contentType: 'application/json' });
  return updated;
}
