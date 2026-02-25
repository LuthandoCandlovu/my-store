'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export interface CartItem {
  id: string
  name: string
  price_cents: number
  image_url: string | null
  qty: number
  stock_qty: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems(current => {
      const existing = current.find(i => i.id === newItem.id)
      if (existing) {
        if (existing.qty + 1 > existing.stock_qty) {
          toast.error('Not enough stock')
          return current
        }
        toast.success(`Added another ${newItem.name}`)
        return current.map(i =>
          i.id === newItem.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      toast.success(`Added ${newItem.name} to cart`)
      return [...current, { ...newItem, qty: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems(current => current.filter(i => i.id !== id))
    toast.success('Item removed')
  }

  const updateQty = (id: string, qty: number) => {
    if (qty === 0) {
      removeItem(id)
      return
    }
    setItems(current =>
      current.map(i => {
        if (i.id === id) {
          if (qty > i.stock_qty) {
            toast.error('Not enough stock')
            return i
          }
          return { ...i, qty }
        }
        return i
      })
    )
  }

  const clearCart = () => {
    setItems([])
    toast.success('Cart cleared')
  }

  const totalItems = items.reduce((acc, i) => acc + i.qty, 0)
  const totalPrice = items.reduce((acc, i) => acc + i.price_cents * i.qty, 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
