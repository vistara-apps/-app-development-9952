import React from 'react'
import { TrendingUp, DollarSign, ShoppingBag, Users } from 'lucide-react'

const OverviewCards = () => {
  const cards = [
    {
      title: 'Revenue',
      value: '$2,156.80',
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Orders',
      value: '143',
      change: '+23%',
      changeType: 'positive',
      icon: ShoppingBag,
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Products',
      value: '28',
      change: '+12%',
      changeType: 'positive',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Visitors',
      value: '1,234',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      gradient: 'from-orange-500 to-red-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div key={index} className="glass-card p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    card.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {card.change}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${card.gradient}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OverviewCards