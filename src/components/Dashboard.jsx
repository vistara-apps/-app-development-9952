import React, { useState } from 'react'
import OverviewCards from './OverviewCards'
import AnalyticsChart from './AnalyticsChart'
import ProductList from './ProductList'
import ContentAnalysis from './ContentAnalysis'
import { Bell, Search, User } from 'lucide-react'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Transform your X content into revenue</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
          
          <button className="p-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="p-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <OverviewCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Analytics Chart */}
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>
        
        {/* Content Analysis */}
        <div>
          <ContentAnalysis />
        </div>
      </div>

      {/* Product List */}
      <div className="mt-8">
        <ProductList />
      </div>
    </div>
  )
}

export default Dashboard