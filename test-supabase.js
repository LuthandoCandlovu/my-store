require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testConnection() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(5);
    
  if (error) {
    console.log('❌ Supabase error:', error.message);
  } else {
    console.log('✅ Connected to Supabase!');
    console.log('📦 Products found:', data.length);
    console.log('🛍️  First product:', data[0]?.name);
  }
}

testConnection();
