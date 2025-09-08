import React from 'react'
import { BarChart3 } from 'lucide-react'

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Analytics Dashboard</h1>
        <p className="text-gray-300 mb-8">Track your performance and revenue</p>
        <div className="glass-card p-8 rounded-xl">
          <p className="text-gray-400">Analytics coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
