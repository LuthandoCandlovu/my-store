'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCart } from 'lucide-react'
import { StockBadge } from './StockBadge'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price_cents: number
    image_url: string | null
    stock_qty: number
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const price = (product.price_cents / 100).toFixed(2)

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition group">
      <Link href={`/product/${product.id}`} className="block relative">
        <div className="relative h-48 w-full bg-gray-100 rounded-t-xl overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <StockBadge stock={product.stock_qty} />
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">R{price}</span>
          <button
            onClick={() => addItem({
              id: product.id,
              name: product.name,
              price_cents: product.price_cents,
              image_url: product.image_url,
              qty: 1,
              stock_qty: product.stock_qty
            })}
            disabled={product.stock_qty === 0}
            className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
