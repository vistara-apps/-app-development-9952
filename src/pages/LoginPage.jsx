import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Star, Twitter, ArrowLeft, Zap, Shield, TrendingUp } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

const LoginPage = () => {
  const { signInWithTwitter, loading } = useAuth()
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleTwitterSignIn = async () => {
    try {
      setIsSigningIn(true)
      await signInWithTwitter()
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsSigningIn(false)
    }
  }

  if (loading || isSigningIn) {
    return <LoadingSpinner message="Connecting to X..." />
  }

  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Instant Analysis",
      description: "AI analyzes your X content in seconds"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Revenue Insights",
      description: "Discover hidden monetization opportunities"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure & Private",
      description: "Your data is encrypted and protected"
    }
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Link>
            
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">X Creatify</h1>
                <p className="text-sm text-gray-400">Content to Store</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome back
            </h2>
            <p className="text-gray-300">
              Connect your X account to start monetizing your content
            </p>
          </div>

          {/* Sign In Button */}
          <div className="space-y-6">
            <button
              onClick={handleTwitterSignIn}
              disabled={isSigningIn}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-lg font-semibold"
            >
              {isSigningIn ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Twitter className="w-5 h-5 mr-3" />
                  Continue with X
                </>
              )}
            </button>

            {/* Benefits */}
            <div className="space-y-4 pt-6">
              <p className="text-sm text-gray-400 text-center">What you'll get:</p>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Privacy Notice */}
            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium text-sm mb-1">Your privacy matters</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    We only access your public X data to analyze content and engagement. 
                    We never post on your behalf or access private information.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-400 text-center">
              By continuing, you agree to our{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Feature Showcase */}
      <div className="hidden lg:flex flex-1 items-center justify-center px-6 py-12">
        <div className="max-w-lg">
          <div className="glass-card p-8 rounded-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Turn your X content into revenue
              </h3>
              <p className="text-gray-300">
                See how X Creatify transforms your social media presence into a profitable storefront
              </p>
            </div>

            {/* Demo Steps */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Connect X Account</h4>
                  <p className="text-gray-400 text-sm">Securely link your X profile for content analysis</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">AI Analysis</h4>
                  <p className="text-gray-400 text-sm">Our AI identifies your best content and suggests products</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Launch Store</h4>
                  <p className="text-gray-400 text-sm">Deploy your professional storefront in minutes</p>
                </div>
              </div>
            </div>

            {/* Mock Analytics */}
            <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium text-sm">Potential Revenue</span>
                <span className="text-green-400 font-bold">+$2,847/mo</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">React Course</span>
                  <span className="text-white">$99 × 15 sales</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Setup Guide</span>
                  <span className="text-white">$29 × 42 sales</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Templates Pack</span>
                  <span className="text-white">$49 × 23 sales</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                * Estimates based on your content engagement and similar creators
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
