import { getDb } from './db';

export const DEFAULT_SETTINGS = {
  announcement: { active: false, textEN: 'FREE SHIPPING ON ORDERS OVER €80', textGR: 'ΔΩΡΕΑΝ ΑΠΟΣΤΟΛΗ ΓΙΑ ΠΑΡΑΓΓΕΛΙΕΣ ΑΝΩ ΤΩΝ €80', color: 'red' },
  banner: { active: false, titleEN: 'NEW DROP', titleGR: 'ΝΕΑ ΣΥΛΛΟΓΗ', subtitleEN: 'SS25 Collection — Available Now', subtitleGR: 'Συλλογή ΑΧ25 — Τώρα Διαθέσιμη', ctaTextEN: 'Shop Now', ctaTextGR: 'Αγόρασε Τώρα', ctaLink: '/products', image: '' },
  clothingTypes: ['jackets', 'hoodies', 'tees', 'pants', 'accessories'],
};

export async function getSettings() {
  try {
    if (!process.env.MONGODB_URI) return DEFAULT_SETTINGS;
    const db = await getDb();
    const doc = await db.collection('store').findOne({ _id: 'settings' });
    if (!doc) return DEFAULT_SETTINGS;
    return {
      announcement: { ...DEFAULT_SETTINGS.announcement, ...doc.announcement },
      banner: { ...DEFAULT_SETTINGS.banner, ...doc.banner },
      clothingTypes: doc.clothingTypes ?? DEFAULT_SETTINGS.clothingTypes,
    };
  } catch { return DEFAULT_SETTINGS; }
}

export async function saveSettings(settings) {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set.');
  const db = await getDb();
  await db.collection('store').updateOne(
    { _id: 'settings' },
    { $set: settings },
    { upsert: true }
  );
}
