import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Twitter, Zap, Store, BarChart3, CreditCard, ArrowRight, Check } from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: <Twitter className="w-6 h-6" />,
      title: "AI Content Analysis",
      description: "Automatically analyze your X posts to identify monetization opportunities and trending content patterns."
    },
    {
      icon: <Store className="w-6 h-6" />,
      title: "Instant Storefront",
      description: "Generate a professional storefront in minutes with AI-powered product descriptions and pricing."
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Integrated Payments",
      description: "Accept payments seamlessly with Stripe integration and start earning from day one."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Track performance, understand your audience, and optimize your revenue streams."
    }
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "Up to 10 products",
        "Basic storefront",
        "Limited analytics",
        "Community support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$15",
      period: "/month",
      description: "For serious creators",
      features: [
        "Unlimited products",
        "Advanced analytics",
        "Custom branding",
        "AI optimization",
        "Priority support"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For teams and agencies",
      features: [
        "Everything in Pro",
        "White-label solution",
        "Custom integrations",
        "Dedicated support",
        "Advanced API access"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">X Creatify</h1>
              <p className="text-sm text-gray-400">Content to Store</p>
            </div>
          </div>
          
          <Link
            to="/login"
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Turn your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">X content</span> into a storefront, effortlessly
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              X Creatify analyzes your X presence to automatically generate and deploy a functional storefront, monetizing your best content.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
            >
              <Twitter className="w-5 h-5 mr-2" />
              Connect Your X Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <button className="px-8 py-4 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors text-lg font-semibold">
              Watch Demo
            </button>
          </div>

          {/* Demo Image Placeholder */}
          <div className="relative max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-2xl">
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-white text-lg">Interactive Demo Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything you need to monetize your content
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From content analysis to payment processing, we handle the technical complexity so you can focus on creating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              From X to storefront in 3 simple steps
            </h2>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
                  <h3 className="text-2xl font-semibold text-white">Connect Your X Account</h3>
                </div>
                <p className="text-gray-300 text-lg">
                  Sign in with your X account and grant permissions to analyze your content and engagement data.
                </p>
              </div>
              <div className="flex-1">
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Twitter className="w-6 h-6 text-blue-400" />
                    <span className="text-white font-medium">@your_handle</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-purple-500/20 rounded"></div>
                    <div className="h-2 bg-purple-500/20 rounded w-3/4"></div>
                    <div className="h-2 bg-purple-500/20 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
                  <h3 className="text-2xl font-semibold text-white">AI Analyzes Your Content</h3>
                </div>
                <p className="text-gray-300 text-lg">
                  Our AI identifies your top-performing content and suggests products based on your expertise and audience interests.
                </p>
              </div>
              <div className="flex-1">
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex items-center space-x-2 mb-4">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-medium">AI Analysis</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">React Course - $99</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">Setup Guide - $29</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">Code Templates - $49</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
                  <h3 className="text-2xl font-semibold text-white">Launch Your Storefront</h3>
                </div>
                <p className="text-gray-300 text-lg">
                  Review, customize, and launch your professional storefront with integrated payments in minutes.
                </p>
              </div>
              <div className="flex-1">
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex items-center space-x-2 mb-4">
                    <Store className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-medium">Your Store</span>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg mb-3"></div>
                    <p className="text-sm text-gray-300">x-creatify.com/your-store</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-300">
              Start free and scale as you grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`glass-card p-8 rounded-xl relative ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  <p className="text-gray-300">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-lg font-semibold transition-opacity ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90' 
                    : 'border border-white/20 text-white hover:bg-white/5'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 rounded-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to monetize your X content?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators who are already earning from their social media presence.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
            >
              <Twitter className="w-5 h-5 mr-2" />
              Get Started for Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">X Creatify</h1>
                <p className="text-sm text-gray-400">Content to Store</p>
              </div>
            </div>
            
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 X Creatify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
