import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './CartContext'
import { getProduct } from '../data/products'

const STORAGE_KEY = 'brads-bees-cart'
const SHIPPING_THRESHOLD = 50
const FLAT_SHIPPING = 5

// Only { id, qty } is stored. Names and prices always come from the product
// catalog, so a price change can't leave a stale price in someone's cart.
function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((entry) => getProduct(entry?.id) && Number.isInteger(entry.qty) && entry.qty > 0)
      .map(({ id, qty }) => ({ id, qty }))
  } catch {
    return []
  }
}

function saveCart(lines) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  } catch {
    // Storage can be full or blocked (e.g. private browsing); the cart still works in memory.
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadCart)

  useEffect(() => {
    saveCart(lines)
  }, [lines])

  const value = useMemo(() => {
    function addItem(product, qty = 1) {
      setLines((prev) => {
        const existing = prev.find((line) => line.id === product.id)
        if (existing) {
          return prev.map((line) =>
            line.id === product.id ? { ...line, qty: line.qty + qty } : line,
          )
        }
        return [...prev, { id: product.id, qty }]
      })
    }

    function updateQty(id, qty) {
      if (qty < 1) return
      setLines((prev) => prev.map((line) => (line.id === id ? { ...line, qty } : line)))
    }

    function removeItem(id) {
      setLines((prev) => prev.filter((line) => line.id !== id))
    }

    function clear() {
      setLines([])
    }

    const items = lines.map((line) => ({ ...getProduct(line.id), qty: line.qty }))
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
    const shipping = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING

    return {
      items,
      addItem,
      updateQty,
      removeItem,
      clear,
      subtotal,
      shipping,
      total: subtotal + shipping,
      itemCount: items.reduce((sum, item) => sum + item.qty, 0),
    }
  }, [lines])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
