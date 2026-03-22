// Static fallback products — used if KV is empty or unavailable
export const fallbackProducts = [
  {
    id: '1',
    slug: 'allcity-core-jacket',
    name: 'ALLCITY CORE JACKET',
    price: 120,
    category: 'jackets',
    available: true,
    image: 'https://via.placeholder.com/600x700/111111/ffffff?text=AC+JACKET',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Signature streetwear shell. Built for the city, made to last.',
    details: ['100% Nylon shell', 'Waterproof coating', 'Embroidered ALLCITY patch', 'Hidden hood', 'Zip pockets'],
  },
  {
    id: '2',
    slug: 'streets-hoodie-black',
    name: 'STREETS HOODIE',
    price: 75,
    category: 'hoodies',
    available: true,
    image: 'https://via.placeholder.com/600x700/111111/ffffff?text=STREETS+HOODIE',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Heavy cotton fleece. Oversized silhouette. Zero compromise.',
    details: ['450gsm cotton fleece', 'Oversized fit', 'Kangaroo pocket', 'Ribbed cuffs and hem'],
  },
  {
    id: '3',
    slug: 'allcity-tee',
    name: 'ALLCITY TEE',
    price: 35,
    category: 'tees',
    available: true,
    image: 'https://via.placeholder.com/600x700/111111/ffffff?text=AC+TEE',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Classic street tee. Born in the city.',
    details: ['220gsm cotton', 'Screen-printed graphic', 'Boxy fit'],
  },
];

export function getProductBySlug(slug, products) {
  const list = products || fallbackProducts;
  return list.find((p) => p.slug === slug) || null;
}

export function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
