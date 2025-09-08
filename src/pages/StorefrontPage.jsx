import React from 'react'
import { Store } from 'lucide-react'

const StorefrontPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Store className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Storefront Management</h1>
        <p className="text-gray-300 mb-8">Customize and manage your storefront</p>
        <div className="glass-card p-8 rounded-xl">
          <p className="text-gray-400">Coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default StorefrontPage
