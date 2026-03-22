import { fallbackProducts } from './products';

const FILENAME = 'allcity-products.json';

export async function getProducts() {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return fallbackProducts;
    const { list } = await import('@vercel/blob');
    const { blobs } = await list({ prefix: FILENAME });
    if (!blobs || blobs.length === 0) return fallbackProducts;
    // Always use the most recently uploaded blob
    const sorted = blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    const res = await fetch(sorted[0].url + '?t=' + Date.now()); // bust cache
    if (!res.ok) return fallbackProducts;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : fallbackProducts;
  } catch (e) {
    console.error('[getProducts]', e);
    return fallbackProducts;
  }
}

export async function saveProducts(products) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN not set. Connect Vercel Blob in your project dashboard.');
  }
  const { put, list, del } = await import('@vercel/blob');

  // Delete all old versions first
  try {
    const { blobs } = await list({ prefix: FILENAME });
    if (blobs && blobs.length > 0) {
      await del(blobs.map(b => b.url));
    }
  } catch (e) {
    console.warn('[saveProducts] cleanup warning:', e);
  }

  // Save new version
  await put(FILENAME, JSON.stringify(products), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}
