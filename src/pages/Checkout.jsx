import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useMessage } from '../hooks/useMessage'
import { productLabel } from '../data/products'
import CheckoutForm from '../components/forms/CheckoutForm'

export default function Checkout() {
  const { items, subtotal, shipping, total } = useCart()
  const { showMessage } = useMessage()
  const [placed, setPlaced] = useState(false)

  function handleSuccess() {
    setPlaced(true)
    showMessage('success', "Order placed! We'll contact you within 24 hours.")
  }

  if (placed) {
    return (
      <div className="bg-[var(--amber-50)]">
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <CheckCircle2 size={56} className="mx-auto mb-4 text-success" />
          <h1 className="mb-2 text-2xl font-bold text-navy">Order Placed!</h1>
          <p className="mb-6 text-gray-500">
            Thanks for your order — we&rsquo;ll reach out within 24 hours to arrange payment
            and pickup or delivery.
          </p>
          <Link
            to="/shop"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold/90"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="bg-[var(--amber-50)]">
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="mb-2 text-2xl font-bold text-navy">Your cart is empty</h1>
          <p className="mb-6 text-gray-500">Add products before checking out.</p>
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
        <h1 className="mb-8 text-3xl font-bold text-navy">Checkout</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="h-fit space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:order-2">
            <h2 className="text-lg font-bold text-navy">Order Summary</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {productLabel(item)} × {item.qty}
                  </span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-1 border-t border-gray-200 pt-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold text-navy">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="border-t border-gray-200 pt-3 text-xs text-gray-400">
              No online payment — we&rsquo;ll contact you to arrange payment after your order
              is placed.
            </p>
          </div>

          <div className="lg:col-span-2 lg:order-1">
            <CheckoutForm onSuccess={handleSuccess} />
          </div>
        </div>
      </div>
    </div>
  )
}
