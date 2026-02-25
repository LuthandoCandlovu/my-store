import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order. We'll start preparing it right away.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
