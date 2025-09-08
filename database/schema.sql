-- X Creatify Database Schema
-- This file contains the complete database schema for the X Creatify application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    x_user_id VARCHAR(255) UNIQUE NOT NULL,
    x_handle VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    profile_image_url TEXT,
    storefront_url TEXT,
    storefront_config JSONB,
    subscription_tier VARCHAR(50) DEFAULT 'free',
    access_token TEXT,
    refresh_token TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    x_post_url TEXT,
    status VARCHAR(50) DEFAULT 'draft', -- draft, active, inactive
    sales_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    customer_email VARCHAR(255),
    customer_name VARCHAR(255),
    payment_intent_id VARCHAR(255) UNIQUE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'usd',
    status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- X Post Analysis table
CREATE TABLE x_post_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    post_id VARCHAR(255),
    tweet_text TEXT,
    engagement_metrics JSONB,
    identified_products JSONB,
    analysis_data JSONB,
    tweet_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscription Plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    billing_interval VARCHAR(20) NOT NULL, -- monthly, yearly
    features JSONB NOT NULL,
    max_products INTEGER,
    max_analytics_retention_days INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Subscriptions table
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    stripe_subscription_id VARCHAR(255) UNIQUE,
    status VARCHAR(50) NOT NULL, -- active, canceled, past_due, unpaid
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Events table (for tracking user behavior)
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Storefront Views table (for tracking storefront visits)
CREATE TABLE storefront_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    visitor_ip INET,
    referrer TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_x_user_id ON users(x_user_id);
CREATE INDEX idx_users_x_handle ON users(x_handle);
CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_product_id ON orders(product_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_x_post_analysis_user_id ON x_post_analysis(user_id);
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX idx_storefront_views_user_id ON storefront_views(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at BEFORE UPDATE ON user_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default subscription plans
INSERT INTO subscription_plans (name, price, billing_interval, features, max_products, max_analytics_retention_days) VALUES
('Free', 0.00, 'monthly', '{"basic_storefront": true, "limited_analytics": true, "email_support": false}', 10, 30),
('Pro', 15.00, 'monthly', '{"unlimited_products": true, "advanced_analytics": true, "custom_branding": true, "priority_support": true, "ai_optimization": true}', -1, 365),
('Enterprise', 99.00, 'monthly', '{"everything_in_pro": true, "dedicated_support": true, "custom_integrations": true, "white_label": true}', -1, -1);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE x_post_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Users can only see and modify their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Products policies
CREATE POLICY "Users can view own products" ON products
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own products" ON products
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own products" ON products
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own products" ON products
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- Public can view active products for storefronts
CREATE POLICY "Public can view active products" ON products
    FOR SELECT USING (status = 'active');

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid()::text = user_id::text);

-- X Post Analysis policies
CREATE POLICY "Users can view own analysis" ON x_post_analysis
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own analysis" ON x_post_analysis
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- User Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON user_subscriptions
    FOR SELECT USING (auth.uid()::text = user_id::text);

-- Analytics Events policies
CREATE POLICY "Users can view own analytics" ON analytics_events
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own analytics" ON analytics_events
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Functions for common operations

-- Function to get user analytics summary
CREATE OR REPLACE FUNCTION get_user_analytics_summary(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_revenue', COALESCE(SUM(o.amount), 0),
        'total_sales', COUNT(o.id),
        'total_products', (SELECT COUNT(*) FROM products WHERE user_id = user_uuid),
        'active_products', (SELECT COUNT(*) FROM products WHERE user_id = user_uuid AND status = 'active'),
        'avg_order_value', COALESCE(AVG(o.amount), 0),
        'last_30_days_revenue', COALESCE(
            (SELECT SUM(amount) FROM orders 
             WHERE user_id = user_uuid 
             AND created_at >= NOW() - INTERVAL '30 days'), 0
        )
    ) INTO result
    FROM orders o
    JOIN products p ON o.product_id = p.id
    WHERE p.user_id = user_uuid AND o.status = 'completed';
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment product sales count
CREATE OR REPLACE FUNCTION increment_product_sales(product_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE products 
    SET sales_count = sales_count + 1 
    WHERE id = product_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create order and update product sales
CREATE OR REPLACE FUNCTION create_order_and_update_sales(
    p_product_id UUID,
    p_user_id UUID,
    p_customer_email VARCHAR(255),
    p_customer_name VARCHAR(255),
    p_payment_intent_id VARCHAR(255),
    p_amount DECIMAL(10,2),
    p_currency VARCHAR(3)
)
RETURNS UUID AS $$
DECLARE
    order_id UUID;
BEGIN
    -- Insert order
    INSERT INTO orders (
        product_id, user_id, customer_email, customer_name,
        payment_intent_id, amount, currency, status
    ) VALUES (
        p_product_id, p_user_id, p_customer_email, p_customer_name,
        p_payment_intent_id, p_amount, p_currency, 'completed'
    ) RETURNING id INTO order_id;
    
    -- Update product sales count
    PERFORM increment_product_sales(p_product_id);
    
    RETURN order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
