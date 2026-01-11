-- ReviewPro Database Schema for Supabase
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PRODUCTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  images TEXT[] DEFAULT '{}',
  specs JSONB DEFAULT '{}',
  overall_score DECIMAL(4,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster category lookups
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_score ON products(overall_score DESC);

-- =============================================
-- REVIEWS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  summary_he TEXT,
  summary_en TEXT,
  pros JSONB DEFAULT '[]',
  cons JSONB DEFAULT '[]',
  detailed_analysis JSONB DEFAULT '{}',
  sources JSONB DEFAULT '{}',
  affiliate_links JSONB DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for product lookups
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_status ON reviews(status);

-- =============================================
-- PRICES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'ILS',
  url TEXT,
  checked_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint for upsert
  UNIQUE(product_id, source)
);

-- Index for price lookups
CREATE INDEX idx_prices_product ON prices(product_id);
CREATE INDEX idx_prices_source ON prices(source);
CREATE INDEX idx_prices_checked ON prices(checked_at DESC);

-- =============================================
-- CLICKS TABLE (Affiliate Tracking)
-- =============================================
CREATE TABLE IF NOT EXISTS clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  source TEXT NOT NULL,
  platform TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  ip_hash TEXT, -- Hashed for privacy
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for analytics
CREATE INDEX idx_clicks_product ON clicks(product_id);
CREATE INDEX idx_clicks_platform ON clicks(platform);
CREATE INDEX idx_clicks_date ON clicks(clicked_at DESC);

-- =============================================
-- PRICE HISTORY TABLE (For charts)
-- =============================================
CREATE TABLE IF NOT EXISTS price_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'ILS',
  recorded_at DATE DEFAULT CURRENT_DATE,
  
  -- One entry per product/source/day
  UNIQUE(product_id, source, recorded_at)
);

CREATE INDEX idx_price_history_product ON price_history(product_id);
CREATE INDEX idx_price_history_date ON price_history(recorded_at DESC);

-- =============================================
-- SUBSCRIBERS TABLE (Newsletter)
-- =============================================
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  categories TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_active ON subscribers(is_active);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Function to record price history
CREATE OR REPLACE FUNCTION record_price_history()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO price_history (product_id, source, price, currency, recorded_at)
  VALUES (NEW.product_id, NEW.source, NEW.price, NEW.currency, CURRENT_DATE)
  ON CONFLICT (product_id, source, recorded_at) 
  DO UPDATE SET price = EXCLUDED.price;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-record price history
CREATE TRIGGER prices_history_trigger
  AFTER INSERT OR UPDATE ON prices
  FOR EACH ROW
  EXECUTE FUNCTION record_price_history();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Public read access for products and reviews
CREATE POLICY "Public can read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Public can read published reviews" ON reviews
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read prices" ON prices
  FOR SELECT USING (true);

CREATE POLICY "Public can read price history" ON price_history
  FOR SELECT USING (true);

-- Service role can do everything
CREATE POLICY "Service role full access on products" ON products
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on reviews" ON reviews
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on prices" ON prices
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on clicks" ON clicks
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on price_history" ON price_history
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on subscribers" ON subscribers
  FOR ALL USING (auth.role() = 'service_role');

-- Public can insert clicks (for tracking)
CREATE POLICY "Public can insert clicks" ON clicks
  FOR INSERT WITH CHECK (true);

-- Public can subscribe
CREATE POLICY "Public can subscribe" ON subscribers
  FOR INSERT WITH CHECK (true);

-- =============================================
-- SAMPLE DATA (Optional)
-- =============================================

-- Uncomment to insert sample data
/*
INSERT INTO products (name, slug, category, subcategory, images, specs, overall_score) VALUES
(
  'iPhone 15 Pro',
  'iphone-15-pro',
  'tech',
  'smartphones',
  ARRAY['https://placehold.co/600x400/1e293b/6366f1?text=iPhone+15+Pro'],
  '{"מסך": "6.1\" Super Retina XDR", "מעבד": "A17 Pro", "זיכרון": "256GB/512GB/1TB", "מצלמה": "48MP+12MP+12MP"}'::jsonb,
  92
),
(
  'Sony WH-1000XM5',
  'sony-wh1000xm5',
  'tech',
  'headphones',
  ARRAY['https://placehold.co/600x400/1e293b/f59e0b?text=Sony+XM5'],
  '{"סוג": "Over-ear", "ביטול רעשים": "כן", "סוללה": "30 שעות", "חיבור": "Bluetooth 5.2"}'::jsonb,
  95
),
(
  'Bugaboo Fox 5',
  'bugaboo-fox-5',
  'baby',
  'strollers',
  ARRAY['https://placehold.co/600x400/1e293b/ec4899?text=Bugaboo+Fox+5'],
  '{"משקל": "9.5 ק\"ג", "גיל": "מלידה עד 22 ק\"ג", "קיפול": "קומפקטי", "גלגלים": "כל השטחים"}'::jsonb,
  88
);
*/
