import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { AlertCircle } from 'lucide-react'

const AuthCallback = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { handleOAuthCallback } = useAuth()
  const [error, setError] = useState(null)

  useEffect(() => {
    const processCallback = async () => {
      try {
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const error = searchParams.get('error')

        if (error) {
          throw new Error(`OAuth error: ${error}`)
        }

        if (!code || !state) {
          throw new Error('Missing authorization code or state parameter')
        }

        // Handle the OAuth callback
        const userData = await handleOAuthCallback(code, state)

        // Check if user needs onboarding
        if (!userData.storefront_url) {
          navigate('/onboarding')
        } else {
          navigate('/dashboard')
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        setError(error.message)
      }
    }

    processCallback()
  }, [searchParams, handleOAuthCallback, navigate])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-md w-full mx-4">
          <div className="glass-card p-8 rounded-2xl text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">
              Authentication Failed
            </h2>
            
            <p className="text-gray-300 mb-6">
              {error}
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                Try Again
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors font-semibold"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <LoadingSpinner message="Completing authentication..." />
  )
}

export default AuthCallback
