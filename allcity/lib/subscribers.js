const FILENAME = 'allcity-subscribers.json';

export async function getSubscribers() {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
    const { list } = await import('@vercel/blob');
    const { blobs } = await list({ prefix: FILENAME });
    if (!blobs || blobs.length === 0) return [];
    const sorted = blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    const res = await fetch(sorted[0].url + '?t=' + Date.now());
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}

export async function addSubscriber(email) {
  const subscribers = await getSubscribers();
  const normalized = email.toLowerCase().trim();

  // Check duplicate
  if (subscribers.find(s => s.email === normalized)) {
    return { ok: false, reason: 'already_subscribed' };
  }

  const newSubscriber = {
    id: Date.now().toString(),
    email: normalized,
    subscribedAt: new Date().toISOString(),
    active: true,
  };

  await saveSubscribers([...subscribers, newSubscriber]);
  return { ok: true, subscriber: newSubscriber };
}

export async function removeSubscriber(email) {
  const subscribers = await getSubscribers();
  const normalized = email.toLowerCase().trim();
  await saveSubscribers(subscribers.map(s =>
    s.email === normalized ? { ...s, active: false, unsubscribedAt: new Date().toISOString() } : s
  ));
}

export async function saveSubscribers(subscribers) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN not set.');
  const { put, list, del } = await import('@vercel/blob');
  try {
    const { blobs } = await list({ prefix: FILENAME });
    if (blobs?.length > 0) await del(blobs.map(b => b.url));
  } catch {}
  await put(FILENAME, JSON.stringify(subscribers), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}
