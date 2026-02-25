"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function DebugPage() {
  const [status, setStatus] = useState("Loading...");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient();
        
        // Test 1: Simple query
        const { data, error } = await supabase
          .from("products")
          .select("*");
          
        if (error) throw error;
        
        setProducts(data || []);
        setStatus(`✅ Success! Found ${data?.length || 0} products`);
      } catch (err: any) {
        setError(err.message);
        setStatus("❌ Connection failed");
        console.error("Supabase error:", err);
      }
    }
    testConnection();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Debug Page</h1>
      
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p className="font-mono">Status: {status}</p>
        {error && (
          <div className="mt-2 p-4 bg-red-100 text-red-700 rounded">
            <p className="font-bold">Error:</p>
            <p className="font-mono text-sm">{error}</p>
          </div>
        )}
      </div>

      {products.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Products ({products.length})</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(products, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 rounded">
        <p className="font-bold">Debug Info:</p>
        <p className="font-mono text-sm">URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
        <p className="font-mono text-sm">Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...</p>
      </div>
    </div>
  );
}
