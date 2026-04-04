export const fallbackProducts = [
  { id: '1', slug: 'allcity-core-jacket', name: 'ALLCITY CORE JACKET', price: 120, salePrice: null, isNew: false, category: 'jackets', available: true, image: '', sizes: ['XS','S','M','L','XL'], description: 'Signature streetwear shell.', details: ['100% Nylon shell','Waterproof coating'] },
  { id: '2', slug: 'streets-hoodie', name: 'STREETS HOODIE', price: 75, salePrice: null, isNew: false, category: 'hoodies', available: true, image: '', sizes: ['S','M','L','XL','XXL'], description: 'Heavy cotton fleece.', details: ['450gsm cotton fleece','Oversized fit'] },
  { id: '3', slug: 'allcity-tee', name: 'ALLCITY TEE', price: 35, salePrice: null, isNew: false, category: 'tees', available: true, image: '', sizes: ['S','M','L','XL'], description: 'Classic street tee.', details: ['220gsm cotton','Screen-printed graphic'] },
];
export function getProductBySlug(slug, products) { return (products || fallbackProducts).find(p => p.slug === slug) || null; }
export function slugify(name) { return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
