const FILENAME = 'allcity-settings.json';

export const DEFAULT_SETTINGS = {
  announcement: {
    active: false,
    textEN: 'FREE SHIPPING ON ORDERS OVER €80',
    textGR: 'ΔΩΡΕΑΝ ΑΠΟΣΤΟΛΗ ΓΙΑ ΠΑΡΑΓΓΕΛΙΕΣ ΑΝΩ ΤΩΝ €80',
    color: 'red',
  },
  banner: {
    active: false,
    titleEN: 'NEW DROP',
    titleGR: 'ΝΕΑ ΣΥΛΛΟΓΗ',
    subtitleEN: 'SS25 Collection — Available Now',
    subtitleGR: 'Συλλογή ΑΧ25 — Τώρα Διαθέσιμη',
    ctaTextEN: 'Shop Now',
    ctaTextGR: 'Αγόρασε Τώρα',
    ctaLink: '/products',
    image: '',
  },
};

export async function getSettings() {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return DEFAULT_SETTINGS;
    const { list } = await import('@vercel/blob');
    const { blobs } = await list({ prefix: FILENAME });
    if (!blobs || blobs.length === 0) return DEFAULT_SETTINGS;
    const sorted = blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    const res = await fetch(sorted[0].url + '?t=' + Date.now());
    if (!res.ok) return DEFAULT_SETTINGS;
    const data = await res.json();
    return {
      announcement: { ...DEFAULT_SETTINGS.announcement, ...data.announcement },
      banner: { ...DEFAULT_SETTINGS.banner, ...data.banner },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN not set.');
  const { put, list, del } = await import('@vercel/blob');
  try {
    const { blobs } = await list({ prefix: FILENAME });
    if (blobs && blobs.length > 0) await del(blobs.map(b => b.url));
  } catch {}
  await put(FILENAME, JSON.stringify(settings), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}
