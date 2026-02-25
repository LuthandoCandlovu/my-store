"use client";
import { useEffect, useState } from "react";

export default function RawDebugPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDirect() {
      try {
        // Direct fetch to Supabase REST API
        const response = await fetch(
          "https://kmwzbyqkbpmmzvrdzqb.supabase.co/rest/v1/products?select=*",
          {
            headers: {
              "apikey": "sb_publishable_FAU_JMqvVFHej8yg-9siGQ_XkaIe...",
              "Authorization": "Bearer sb_publishable_FAU_JMqvVFHej8yg-9siGQ_XkaIe..."
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDirect();
  }, []);

  if (loading) return <div className="p-8">Loading raw data...</div>;
  
  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">ERROR</h1>
        <div className="bg-red-100 p-4 rounded">
          <p className="font-mono">{error}</p>
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="font-bold">Troubleshooting:</p>
          <ul className="list-disc ml-4 mt-2">
            <li>Check if Proton VPN is ON</li>
            <li>Try different VPN server</li>
            <li>Disable Windows Firewall temporarily</li>
            <li>Run: <code>Test-Connection 8.8.8.8</code></li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">RAW PRODUCT DATA</h1>
      <p className="mb-4">Found {data?.length || 0} products</p>
      <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
