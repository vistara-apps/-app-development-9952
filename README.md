# X Creatify - Turn Your X Content Into a Storefront

X Creatify analyzes your X (Twitter) presence to automatically generate and deploy a functional storefront, monetizing your best content.

## 🚀 Features

- **AI Content Analysis**: Automatically analyze your X posts to identify monetization opportunities
- **Instant Storefront Generation**: Create a professional storefront in minutes with AI-powered descriptions
- **Integrated Payments**: Accept payments seamlessly with Stripe integration
- **Advanced Analytics**: Track performance, understand your audience, and optimize revenue streams
- **User Content Control**: Review and approve AI suggestions before they go live

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **React Router** for client-side routing
- **TailwindCSS** for styling with glassmorphism design
- **React Query** for data fetching and caching
- **React Hook Form** for form management
- **Framer Motion** for animations
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **Supabase** for database and authentication
- **Stripe** for payment processing
- **OpenAI API** for content analysis and generation
- **Twitter API v2** for X integration

### Database
- **PostgreSQL** (via Supabase) with Row Level Security
- Comprehensive schema with users, products, orders, and analytics

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Supabase account and project
- Twitter Developer Account with API keys
- OpenAI API key
- Stripe account for payments

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd x-creatify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # X (Twitter) API Configuration
   TWITTER_CLIENT_ID=your_twitter_client_id
   TWITTER_CLIENT_SECRET=your_twitter_client_secret
   TWITTER_BEARER_TOKEN=your_twitter_bearer_token

   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key

   # Stripe Configuration
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # Application Configuration
   VITE_APP_URL=http://localhost:5173
   API_URL=http://localhost:3001
   PORT=3001

   # JWT Secret
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Set up the database**
   
   Run the SQL schema in your Supabase project:
   ```bash
   # Copy the contents of database/schema.sql and run it in your Supabase SQL editor
   ```

5. **Configure Twitter OAuth**
   
   In your Twitter Developer Portal:
   - Set callback URL to: `http://localhost:5173/auth/callback`
   - Enable OAuth 2.0
   - Set required scopes: `tweet.read`, `users.read`, `offline.access`

6. **Configure Stripe**
   
   In your Stripe Dashboard:
   - Set webhook endpoint to: `http://localhost:3001/api/webhook/stripe`
   - Enable events: `payment_intent.succeeded`

## 🚀 Running the Application

1. **Start the backend server**
   ```bash
   npm run start
   ```

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
x-creatify/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React contexts (Auth, etc.)
│   ├── lib/               # Utilities and API clients
│   ├── pages/             # Page components
│   └── App.jsx            # Main app component
├── database/
│   └── schema.sql         # Database schema
├── server.js              # Express backend server
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🔐 Authentication Flow

1. User clicks "Connect with X"
2. Redirected to Twitter OAuth
3. User grants permissions
4. Callback handled by `/auth/callback`
5. User data stored in Supabase
6. JWT token issued for API access

## 💳 Payment Flow

1. User selects product on storefront
2. Stripe Payment Intent created
3. User completes payment
4. Webhook confirms payment
5. Order recorded in database
6. User receives confirmation

## 📊 AI Content Analysis

1. Fetch user's recent X posts via Twitter API
2. Send content to OpenAI for analysis
3. AI identifies potential products/services
4. Generate product descriptions and pricing
5. User reviews and approves suggestions

## 🎨 Design System

The application uses a modern glassmorphism design with:

- **Colors**: Purple and blue gradients with dark theme
- **Typography**: Clean, modern fonts with proper hierarchy
- **Components**: Reusable glass-card components
- **Animations**: Smooth transitions and micro-interactions

## 🔒 Security Features

- Row Level Security (RLS) in Supabase
- JWT-based authentication
- API rate limiting
- Input validation and sanitization
- Secure environment variable handling

## 📈 Analytics & Monitoring

- User behavior tracking
- Revenue analytics
- Product performance metrics
- Storefront visit tracking
- Error monitoring and logging

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in deployment platform

### Backend (Railway/Heroku)
1. Deploy the Express server
2. Set all environment variables
3. Configure webhook endpoints

### Database (Supabase)
1. Run the schema in production
2. Configure RLS policies
3. Set up proper indexes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact:
- Email: support@xcreatify.com
- Documentation: [docs.xcreatify.com](https://docs.xcreatify.com)
- Issues: [GitHub Issues](https://github.com/your-org/x-creatify/issues)

## 🎯 Roadmap

- [ ] Advanced AI product suggestions
- [ ] Multi-platform social media integration
- [ ] Advanced analytics dashboard
- [ ] White-label solutions
- [ ] Mobile app
- [ ] API for third-party integrations

---

Built with ❤️ by the X Creatify team
