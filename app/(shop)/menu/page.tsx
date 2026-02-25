import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/shop/ProductCard";

export default async function MenuPage(props: {
  searchParams?: Promise<{ category?: string; search?: string }>
}) {
  const searchParams = await props.searchParams || {};
  const supabase = await createClient();
  
  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true);

  if (searchParams.category) {
    query = query.eq("category", searchParams.category);
  }

  if (searchParams.search) {
    query = query.ilike("name", `%${searchParams.search}%`);
  }

  const { data: products } = await query.order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Menu</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
