import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('access_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const apiService = {
  // Health check
  async healthCheck() {
    const response = await api.get('/health')
    return response.data
  },

  // Authentication
  async authenticateWithTwitter(code, state) {
    const response = await api.post('/auth/twitter', { code, state })
    return response.data
  },

  // Content Analysis
  async analyzeContent(userId, accessToken) {
    const response = await api.post('/analyze-content', { userId, accessToken })
    return response.data
  },

  // Products
  async getProducts(userId) {
    const response = await api.get(`/products/${userId}`)
    return response.data
  },

  async createProduct(productData) {
    const response = await api.post('/products', productData)
    return response.data
  },

  async updateProduct(productId, updates) {
    const response = await api.put(`/products/${productId}`, updates)
    return response.data
  },

  async deleteProduct(productId) {
    const response = await api.delete(`/products/${productId}`)
    return response.data
  },

  // Storefront
  async generateStorefront(userId, products) {
    const response = await api.post('/generate-storefront', { userId, products })
    return response.data
  },

  async getPublicStorefront(userId) {
    const response = await api.get(`/storefront/${userId}`)
    return response.data
  },

  // Payments
  async createPaymentIntent(productId, amount, currency = 'usd') {
    const response = await api.post('/create-payment-intent', {
      productId,
      amount,
      currency
    })
    return response.data
  },

  // Analytics
  async getAnalytics(userId) {
    const response = await api.get(`/analytics/${userId}`)
    return response.data
  },

  // Image generation (using OpenAI DALL-E)
  async generateProductImage(description) {
    const response = await api.post('/generate-image', { description })
    return response.data
  },

  // AI-powered product description generation
  async generateProductDescription(productName, context) {
    const response = await api.post('/generate-description', {
      productName,
      context
    })
    return response.data
  },

  // Subscription management
  async createSubscription(planId, paymentMethodId) {
    const response = await api.post('/subscriptions', {
      planId,
      paymentMethodId
    })
    return response.data
  },

  async cancelSubscription(subscriptionId) {
    const response = await api.post(`/subscriptions/${subscriptionId}/cancel`)
    return response.data
  },

  async getSubscriptionPlans() {
    const response = await api.get('/subscription-plans')
    return response.data
  },

  // User management
  async updateUserProfile(userId, updates) {
    const response = await api.put(`/users/${userId}`, updates)
    return response.data
  },

  async getUserProfile(userId) {
    const response = await api.get(`/users/${userId}`)
    return response.data
  },

  // Analytics events tracking
  async trackEvent(eventType, eventData) {
    const response = await api.post('/analytics/events', {
      eventType,
      eventData
    })
    return response.data
  },

  // Storefront customization
  async updateStorefrontConfig(userId, config) {
    const response = await api.put(`/storefront/${userId}/config`, config)
    return response.data
  },

  // Export data
  async exportUserData(userId, format = 'json') {
    const response = await api.get(`/export/${userId}?format=${format}`)
    return response.data
  }
}

// Utility functions for common operations
export const utils = {
  // Format currency
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  },

  // Format date
  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date))
  },

  // Generate unique ID
  generateId() {
    return Math.random().toString(36).substr(2, 9)
  },

  // Validate email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // Truncate text
  truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + '...'
  },

  // Calculate percentage change
  calculatePercentageChange(current, previous) {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / previous) * 100
  },

  // Debounce function
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Local storage helpers
  storage: {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    },

    get(key) {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (error) {
        console.error('Error reading from localStorage:', error)
        return null
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key)
      } catch (error) {
        console.error('Error removing from localStorage:', error)
      }
    }
  }
}

export default api
