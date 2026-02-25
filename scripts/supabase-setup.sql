-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price_cents INT NOT NULL CHECK (price_cents >= 0),
    image_url TEXT,
    category TEXT,
    stock_qty INT NOT NULL DEFAULT 0 CHECK (stock_qty >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    total_cents INT NOT NULL DEFAULT 0,
    stripe_session_id TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    qty INT NOT NULL CHECK (qty > 0),
    price_cents INT NOT NULL CHECK (price_cents >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'customer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create stock decrease function
CREATE OR REPLACE FUNCTION decrease_stock(p_id UUID, p_qty INT)
RETURNS void AS $$
BEGIN
    UPDATE products
    SET stock_qty = stock_qty - p_qty
    WHERE id = p_id AND stock_qty >= p_qty;
END;
$$ LANGUAGE plpgsql;

-- Insert sample products
INSERT INTO products (name, description, price_cents, category, stock_qty) VALUES
('Classic Burger', 'Beef patty, lettuce, tomato, cheese', 8995, 'Burgers', 15),
('Margherita Pizza', 'Tomato sauce, mozzarella, basil', 12995, 'Pizza', 10),
('Caesar Salad', 'Romaine lettuce, croutons, parmesan', 7495, 'Salads', 8),
('Chicken Wings', 'Spicy buffalo wings with ranch', 10995, 'Appetizers', 20),
('Coca Cola', 'Ice cold 500ml', 2595, 'Drinks', 50),
('Chocolate Cake', 'Rich chocolate layer cake', 6495, 'Desserts', 12);
