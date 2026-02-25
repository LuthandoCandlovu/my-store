import Link from 'next/link'
import { XCircle } from 'lucide-react'

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-gray-600 mb-8">
          Your payment was cancelled. No charges were made.
        </p>
        <div className="space-x-4">
          <Link
            href="/cart"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
