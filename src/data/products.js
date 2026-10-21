import honeyPint from '../assets/images/product-honey-pint.webp'
import honeyQuart from '../assets/images/product-honey-quart.webp'
import honeyGallon from '../assets/images/product-honey-gallon.webp'
import beeswax from '../assets/images/product-beeswax.webp'
import beeswaxCandles from '../assets/images/product-beeswax-candles.webp'
import { productCatalog } from './productCatalog'

export { productLabel } from './productCatalog'

const images = {
  'honey-pint': honeyPint,
  'honey-quart': honeyQuart,
  'honey-gallon': honeyGallon,
  'beeswax-block': beeswax,
  'beeswax-candles': beeswaxCandles,
}

export const products = productCatalog.map((product) => ({ ...product, image: images[product.id] }))

export function getProduct(id) {
  return products.find((product) => product.id === id)
}
