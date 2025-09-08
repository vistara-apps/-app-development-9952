import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { TwitterApi } from 'twitter-api-v2';
import OpenAI from 'openai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize services
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.raw({ type: 'application/json' }));

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Authentication routes
app.post('/api/auth/twitter', async (req, res) => {
  try {
    const { code, state } = req.body;
    
    // Exchange code for access token
    const { client: loggedClient, accessToken, refreshToken } = await twitterClient.loginWithOAuth2({
      code,
      codeVerifier: state,
      redirectUri: `${process.env.VITE_APP_URL}/auth/callback`,
    });

    // Get user info
    const { data: userObject } = await loggedClient.v2.me({
      'user.fields': ['id', 'name', 'username', 'profile_image_url', 'public_metrics']
    });

    // Store user in database
    const { data: user, error } = await supabase
      .from('users')
      .upsert({
        x_user_id: userObject.id,
        x_handle: userObject.username,
        name: userObject.name,
        profile_image_url: userObject.profile_image_url,
        access_token: accessToken,
        refresh_token: refreshToken,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ user, accessToken });
  } catch (error) {
    console.error('Twitter auth error:', error);
    res.status(400).json({ error: error.message });
  }
});

// X Content Analysis
app.post('/api/analyze-content', async (req, res) => {
  try {
    const { userId, accessToken } = req.body;

    // Get user's recent tweets
    const client = new TwitterApi(accessToken);
    const tweets = await client.v2.userTimeline(userId, {
      max_results: 100,
      'tweet.fields': ['public_metrics', 'created_at', 'context_annotations'],
      exclude: ['retweets', 'replies']
    });

    // Analyze tweets with OpenAI
    const tweetTexts = tweets.data.data.map(tweet => tweet.text).join('\n\n');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI that analyzes social media content to identify potential products or services that could be monetized. 
          Analyze the following tweets and identify:
          1. Potential products or services mentioned
          2. Skills or expertise demonstrated
          3. Tools or resources referenced
          4. Audience interests and pain points
          
          Return a JSON response with:
          - products: array of potential products with name, description, suggested_price
          - insights: array of key insights about the content
          - engagement_patterns: analysis of what content performs best`
        },
        {
          role: "user",
          content: tweetTexts
        }
      ],
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content);

    // Store analysis in database
    const { data: analysisRecord, error } = await supabase
      .from('x_post_analysis')
      .insert({
        user_id: userId,
        analysis_data: analysis,
        tweet_count: tweets.data.data.length,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ analysis, tweets: tweets.data.data });
  } catch (error) {
    console.error('Content analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Product Management
app.get('/api/products/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { userId, name, description, price, imageUrl, status = 'draft' } = req.body;

    const { data: product, error } = await supabase
      .from('products')
      .insert({
        user_id: userId,
        name,
        description,
        price,
        image_url: imageUrl,
        status,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ product });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const { data: product, error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId)
      .select()
      .single();

    if (error) throw error;

    res.json({ product });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Storefront Generation
app.post('/api/generate-storefront', async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Generate storefront with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a web designer that creates beautiful, modern storefront layouts. 
          Generate a complete storefront configuration including:
          - Color scheme and branding
          - Layout structure
          - Product presentation
          - Call-to-action elements
          
          Return JSON with storefront configuration.`
        },
        {
          role: "user",
          content: `Create a storefront for these products: ${JSON.stringify(products)}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const storefrontConfig = JSON.parse(completion.choices[0].message.content);

    // Update user's storefront configuration
    const { data: user, error } = await supabase
      .from('users')
      .update({
        storefront_config: storefrontConfig,
        storefront_url: `${process.env.VITE_APP_URL}/store/${userId}`,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    res.json({ storefrontConfig, storefrontUrl: user.storefront_url });
  } catch (error) {
    console.error('Generate storefront error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Payment Processing
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { productId, amount, currency = 'usd' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      metadata: {
        productId: productId.toString()
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/webhook/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      
      // Record the order
      const { error } = await supabase
        .from('orders')
        .insert({
          product_id: paymentIntent.metadata.productId,
          payment_intent_id: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: 'completed',
          created_at: new Date().toISOString()
        });

      if (error) throw error;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Analytics
app.get('/api/analytics/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user's analytics data
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        products (name, price)
      `)
      .eq('products.user_id', userId);

    if (ordersError) throw ordersError;

    // Calculate metrics
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
    const totalSales = orders.length;
    const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

    // Get product performance
    const productPerformance = orders.reduce((acc, order) => {
      const productName = order.products.name;
      if (!acc[productName]) {
        acc[productName] = { sales: 0, revenue: 0 };
      }
      acc[productName].sales += 1;
      acc[productName].revenue += order.amount;
      return acc;
    }, {});

    res.json({
      totalRevenue,
      totalSales,
      averageOrderValue,
      productPerformance,
      recentOrders: orders.slice(-10)
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Public storefront
app.get('/api/storefront/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('name, x_handle, storefront_config')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active');

    if (productsError) throw productsError;

    res.json({
      user,
      products,
      storefrontConfig: user.storefront_config
    });
  } catch (error) {
    console.error('Storefront error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 X Creatify API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
