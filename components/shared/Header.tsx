'use client'
import Link from 'next/link'
import { Store } from 'lucide-react'
import { CartDrawer } from '@/components/shop/CartDrawer'

export function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Store className="w-6 h-6" />
            <span>MyStore</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-primary transition">Home</Link>
            <Link href="/menu" className="hover:text-primary transition">Menu</Link>
          </nav>
          <CartDrawer />
        </div>
      </div>
    </header>
  )
}
