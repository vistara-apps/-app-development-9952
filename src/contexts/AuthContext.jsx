import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { apiService } from '../lib/api'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      if (event === 'SIGNED_IN') {
        toast.success('Successfully signed in!')
      } else if (event === 'SIGNED_OUT') {
        toast.success('Successfully signed out!')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Twitter OAuth login
  const signInWithTwitter = async () => {
    try {
      setLoading(true)
      
      // Generate OAuth URL
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'tweet.read users.read offline.access'
        }
      })

      if (error) throw error

      return data
    } catch (error) {
      console.error('Twitter sign in error:', error)
      toast.error('Failed to sign in with Twitter')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Handle OAuth callback
  const handleOAuthCallback = async (code, state) => {
    try {
      setLoading(true)
      
      // Exchange code for tokens via our API
      const { user: userData, accessToken } = await apiService.authenticateWithTwitter(code, state)
      
      // Store access token for API calls
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('user_data', JSON.stringify(userData))
      
      // Sign in to Supabase with the user data
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email || `${userData.x_handle}@twitter.local`,
        password: userData.x_user_id // Use Twitter ID as password
      })

      if (error) {
        // If user doesn't exist, create account
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: userData.email || `${userData.x_handle}@twitter.local`,
          password: userData.x_user_id,
          options: {
            data: {
              x_user_id: userData.x_user_id,
              x_handle: userData.x_handle,
              name: userData.name,
              profile_image_url: userData.profile_image_url
            }
          }
        })

        if (signUpError) throw signUpError
        setUser(signUpData.user)
      } else {
        setUser(data.user)
      }

      toast.success('Successfully authenticated with Twitter!')
      return userData
    } catch (error) {
      console.error('OAuth callback error:', error)
      toast.error('Authentication failed')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true)
      
      // Clear local storage
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_data')
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
      setSession(null)
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Failed to sign out')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Get user profile data
  const getUserProfile = async () => {
    if (!user) return null

    try {
      const userData = localStorage.getItem('user_data')
      if (userData) {
        return JSON.parse(userData)
      }

      // Fallback to API call
      const profile = await apiService.getUserProfile(user.id)
      return profile
    } catch (error) {
      console.error('Get user profile error:', error)
      return null
    }
  }

  // Update user profile
  const updateUserProfile = async (updates) => {
    if (!user) throw new Error('No user logged in')

    try {
      const updatedUser = await apiService.updateUserProfile(user.id, updates)
      
      // Update local storage
      localStorage.setItem('user_data', JSON.stringify(updatedUser))
      
      toast.success('Profile updated successfully!')
      return updatedUser
    } catch (error) {
      console.error('Update profile error:', error)
      toast.error('Failed to update profile')
      throw error
    }
  }

  // Check if user has completed onboarding
  const hasCompletedOnboarding = () => {
    const userData = localStorage.getItem('user_data')
    if (!userData) return false

    const user = JSON.parse(userData)
    return user.storefront_url && user.subscription_tier
  }

  // Get user's subscription status
  const getSubscriptionStatus = async () => {
    if (!user) return null

    try {
      const subscription = await apiService.getUserSubscription(user.id)
      return subscription
    } catch (error) {
      console.error('Get subscription error:', error)
      return null
    }
  }

  const value = {
    user,
    session,
    loading,
    signInWithTwitter,
    handleOAuthCallback,
    signOut,
    getUserProfile,
    updateUserProfile,
    hasCompletedOnboarding,
    getSubscriptionStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
