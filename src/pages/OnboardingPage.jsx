import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Star, Zap, ArrowRight, Check } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

const OnboardingPage = () => {
  const navigate = useNavigate()
  const { user, getUserProfile } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userProfile, setUserProfile] = useState(null)

  React.useEffect(() => {
    const loadProfile = async () => {
      const profile = await getUserProfile()
      setUserProfile(profile)
    }
    loadProfile()
  }, [getUserProfile])

  const handleComplete = async () => {
    setLoading(true)
    // Simulate onboarding completion
    setTimeout(() => {
      navigate('/dashboard')
    }, 2000)
  }

  if (loading) {
    return <LoadingSpinner message="Setting up your storefront..." />
  }

  const steps = [
    {
      title: "Welcome to X Creatify",
      description: "Let's get your storefront ready in just a few steps"
    },
    {
      title: "Analyzing Your Content",
      description: "Our AI is reviewing your X posts to find monetization opportunities"
    },
    {
      title: "Generating Products",
      description: "Creating product suggestions based on your expertise and audience"
    },
    {
      title: "Setting Up Payments",
      description: "Configuring your payment processing and storefront"
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Star className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">X Creatify</h1>
              <p className="text-sm text-gray-400">Content to Store</p>
            </div>
          </div>

          {userProfile && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome, @{userProfile.x_handle}!
              </h2>
              <p className="text-gray-300">
                Let's turn your X content into a profitable storefront
              </p>
            </div>
          )}
        </div>

        <div className="glass-card p-8 rounded-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-400">Step {currentStep} of {steps.length}</span>
              <span className="text-sm text-gray-400">{Math.round((currentStep / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Step */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-purple-400 animate-pulse" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              {steps[currentStep - 1].title}
            </h3>
            <p className="text-gray-300 text-lg">
              {steps[currentStep - 1].description}
            </p>
          </div>

          {/* Mock Progress Steps */}
          <div className="space-y-4 mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  index < currentStep 
                    ? 'bg-green-500' 
                    : index === currentStep - 1 
                      ? 'bg-purple-500 animate-pulse' 
                      : 'bg-gray-600'
                }`}>
                  {index < currentStep ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                <span className={`${
                  index < currentStep ? 'text-white' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                Complete Setup
                <Check className="w-5 h-5 ml-2" />
              </button>
            )}
            
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors font-semibold"
            >
              Skip for now
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-400 text-sm">Smart content analysis and product suggestions</p>
          </div>
          
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Professional Store</h3>
            <p className="text-gray-400 text-sm">Beautiful, mobile-ready storefront</p>
          </div>
          
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Easy Payments</h3>
            <p className="text-gray-400 text-sm">Integrated payment processing</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
