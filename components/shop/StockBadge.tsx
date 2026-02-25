export function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
        ❌ Out
      </span>
    )
  }
  
  if (stock <= 5) {
    return (
      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
        ⚠️ Low ({stock})
      </span>
    )
  }
  
  return (
    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
      ✅ In Stock
    </span>
  )
}
