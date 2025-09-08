import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const AnalyticsChart = () => {
  const data = [
    { name: 'Jan', revenue: 1200, orders: 45 },
    { name: 'Feb', revenue: 1900, orders: 52 },
    { name: 'Mar', revenue: 1700, orders: 48 },
    { name: 'Apr', revenue: 2400, orders: 61 },
    { name: 'May', revenue: 2100, orders: 55 },
    { name: 'Jun', revenue: 2800, orders: 72 },
    { name: 'Jul', revenue: 3200, orders: 86 },
  ]

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Revenue Analytics</h2>
          <p className="text-gray-400 text-sm">Monthly performance overview</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-medium">
            Revenue
          </button>
          <button className="px-4 py-2 text-gray-400 hover:text-white rounded-lg text-sm font-medium transition-colors">
            Orders
          </button>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8b5cf6" 
              fillOpacity={1} 
              fill="url(#colorRevenue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AnalyticsChart