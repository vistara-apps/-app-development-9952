import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database helper functions
export const db = {
  // Users
  async getUser(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async updateUser(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Products
  async getProducts(userId) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createProduct(product) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateProduct(productId, updates) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteProduct(productId) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
    
    if (error) throw error
  },

  // Orders
  async getOrders(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        products (name, price, image_url)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Analytics
  async getAnalyticsSummary(userId) {
    const { data, error } = await supabase
      .rpc('get_user_analytics_summary', { user_uuid: userId })
    
    if (error) throw error
    return data
  },

  // X Post Analysis
  async getContentAnalysis(userId) {
    const { data, error } = await supabase
      .from('x_post_analysis')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
    
    if (error) throw error
    return data[0]
  },

  async saveContentAnalysis(analysis) {
    const { data, error } = await supabase
      .from('x_post_analysis')
      .insert(analysis)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Storefront
  async getStorefront(userId) {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('name, x_handle, storefront_config, storefront_url')
      .eq('id', userId)
      .single()

    if (userError) throw userError

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')

    if (productsError) throw productsError

    return { user, products }
  },

  // Subscription
  async getUserSubscription(userId) {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select(`
        *,
        subscription_plans (*)
      `)
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  }
}

export default supabase
