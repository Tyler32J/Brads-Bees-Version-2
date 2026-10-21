// Product names and prices with no images, so the order email server can read
// the real prices too. Photos are attached in products.js.
// imageFit: 'cover' fills the frame; 'tall' and 'pint' keep the whole jar visible.
export const productCatalog = [
  {
    id: 'honey-pint',
    name: 'Honey',
    variant: 'Pint',
    price: 14,
    rating: 5.0,
    inStock: true,
    imageFit: 'pint',
    description:
      'Pure, raw honey from our local hives. Perfect for sweetening tea, baking, or enjoying straight from the jar.',
  },
  {
    id: 'honey-quart',
    name: 'Honey',
    variant: 'Quart',
    price: 24,
    rating: 5.0,
    inStock: true,
    imageFit: 'tall',
    description:
      'Bulk honey perfect for families or those who use honey regularly. Fresh from our apiary to your table.',
  },
  {
    id: 'honey-gallon',
    name: 'Honey',
    variant: 'Gallon',
    price: 85,
    rating: 4.9,
    inStock: true,
    imageFit: 'tall',
    description:
      'Our premium gallon size for serious honey lovers. Great for large families or small businesses.',
  },
  {
    id: 'beeswax-block',
    name: 'Pure Beeswax',
    variant: '1 lb Block',
    price: 20,
    rating: 4.8,
    inStock: true,
    imageFit: 'cover',
    description:
      'Raw beeswax block for candle making, lip balms, and other DIY projects. 100% natural.',
  },
  {
    id: 'beeswax-candles',
    name: 'Beeswax Candles',
    variant: 'Singles',
    price: 20,
    rating: 5.0,
    inStock: true,
    imageFit: 'cover',
    description:
      'Hand-poured beeswax candles with natural honey scent. Clean burning and long-lasting.',
  },
]

export const SHIPPING_THRESHOLD = 50
export const FLAT_SHIPPING = 5

export function shippingFor(subtotal) {
  return subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING
}

export function getCatalogProduct(id) {
  return productCatalog.find((product) => product.id === id)
}

export function productLabel(product) {
  return product.variant ? `${product.name} (${product.variant})` : product.name
}
