'use client'
import { useCart } from '@/contexts/CartContext'
import { Dialog } from '@headlessui/react'
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, removeItem, updateQty, totalItems, totalPrice } = useCart()

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 hover:bg-gray-100 rounded-lg"
      >
        <ShoppingBag className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-y-0 right-0 w-full max-w-md">
          <Dialog.Panel className="h-full w-full bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-semibold">
                Your Cart ({totalItems})
              </Dialog.Title>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingBag className="w-16 h-16 mb-4" />
                  <p>Your cart is empty</p>
                  <button onClick={() => setIsOpen(false)} className="mt-4 text-primary hover:underline">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image_url ? (
                          <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          R{(item.price_cents / 100).toFixed(2)} each
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1 hover:bg-gray-100 rounded">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            disabled={item.qty >= item.stock_qty}
                            className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button onClick={() => removeItem(item.id)} className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t p-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-xl text-primary">
                    R{(totalPrice / 100).toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-primary text-white text-center py-3 rounded-lg font-semibold hover:bg-primary/90"
                >
                  View Cart
                </Link>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
