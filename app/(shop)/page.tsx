import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  
  const { data: featured } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .gt("stock_qty", 0)
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4">Fresh Food, Delivered Fast</h1>
          <p className="text-xl mb-8">Order from our store and get it within 30 minutes</p>
          <Link
            href="/menu"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Order Now
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Items</h2>
          <Link href="/menu" className="text-primary hover:underline">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
