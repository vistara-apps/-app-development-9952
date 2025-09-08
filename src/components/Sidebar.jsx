import React from 'react'
import { 
  LayoutDashboard, 
  Store, 
  BarChart3, 
  Settings, 
  Twitter,
  CreditCard,
  Users,
  Star
} from 'lucide-react'

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'storefront', label: 'Storefront', icon: Store },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'content', label: 'X Content', icon: Twitter },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="w-64 h-screen bg-slate-900/50 backdrop-blur-xl border-r border-white/10">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">X Creatify</h1>
            <p className="text-sm text-gray-400">Content to Store</p>
          </div>
        </div>
      </div>

      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <div className="glass-card p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Pro Plan</p>
              <p className="text-xs text-gray-400">$15/month</p>
            </div>
            <button className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-md hover:opacity-90 transition-opacity">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar