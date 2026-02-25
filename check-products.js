const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkProducts() {
  console.log('🔗 Connecting to:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  
  const { data, error } = await supabase
    .from('products')
    .select('*');
    
  if (error) {
    console.log('❌ Error:', error.message);
    console.log('📝 Details:', error.details);
    return;
  }
  
  console.log('✅ Connected successfully!');
  console.log('📦 Total products:', data?.length || 0);
  
  if (data?.length > 0) {
    console.log('\n📋 PRODUCT LIST:');
    data.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - R${(p.price_cents/100).toFixed(2)} - Stock: ${p.stock_qty}`);
    });
  } else {
    console.log('⚠️ No products found!');
    console.log('\n🔄 Run this SQL in Supabase:');
    console.log('INSERT INTO products (name, description, price_cents, category, stock_qty) VALUES');
    console.log("('Classic Burger', 'Beef patty, lettuce, tomato, cheese', 8995, 'Burgers', 15),");
    console.log("('Margherita Pizza', 'Tomato sauce, mozzarella, basil', 12995, 'Pizza', 10),");
    console.log("('Caesar Salad', 'Romaine lettuce, croutons, parmesan', 7495, 'Salads', 8);");
  }
}

checkProducts();
