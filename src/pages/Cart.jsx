import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { productLabel } from '../data/products'

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, shipping, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="bg-[var(--amber-50)]">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
          <h1 className="mb-2 text-2xl font-bold text-navy">Your cart is empty</h1>
          <p className="mb-6 text-gray-500">Add some honey and beeswax goodness to get started.</p>
          <Link
            to="/shop"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold/90"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--amber-50)]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold text-navy">Your Cart</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={productLabel(item)}
                    className={`h-16 w-16 shrink-0 rounded-lg bg-[#f9f9f9] ${
                      item.imageFit === 'cover' ? 'object-cover' : 'object-contain p-1'
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-navy">{productLabel(item)}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-gray-300 px-2 py-1">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="text-navy disabled:opacity-30"
                      disabled={item.qty <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="text-navy"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="w-16 text-right font-semibold text-navy">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-error hover:opacity-70"
                    aria-label={`Remove ${productLabel(item)}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-navy">Order Summary</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  Free shipping on orders over $50
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-bold text-navy">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link
              to="/shop/checkout"
              className="mt-6 block rounded-lg bg-gold px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-gold/90"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
