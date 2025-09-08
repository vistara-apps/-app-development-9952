import React, { useState } from 'react'
import { Package, Edit, Trash2, Plus, Eye, DollarSign } from 'lucide-react'

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "React Optimization Course",
      description: "Complete guide to React performance optimization",
      price: 99,
      status: "active",
      sales: 45,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Productivity Setup Guide", 
      description: "Ultimate developer workspace setup",
      price: 29,
      status: "active",
      sales: 23,
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "SaaS Starter Kit",
      description: "Ready-to-use SaaS boilerplate code",
      price: 149,
      status: "draft",
      sales: 0,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "Code Templates Pack",
      description: "Collection of reusable code templates",
      price: 49,
      status: "active",
      sales: 67,
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop&crop=center"
    }
  ])

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const handleStatusToggle = (id) => {
    setProducts(products.map(p => 
      p.id === id 
        ? { ...p, status: p.status === 'active' ? 'draft' : 'active' }
        : p
    ))
  }

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Products</h2>
          <p className="text-gray-400 text-sm">Manage your storefront items</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs rounded-md font-medium ${
                  product.status === 'active' 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {product.status}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-white font-semibold text-sm mb-2">{product.name}</h3>
              <p className="text-gray-400 text-xs mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-bold">${product.price}</span>
                <div className="flex items-center space-x-1 text-gray-400 text-xs">
                  <DollarSign className="w-3 h-3" />
                  <span>{product.sales} sales</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleStatusToggle(product.id)}
                  className="flex-1 px-3 py-2 bg-white/10 text-white text-xs rounded-md hover:bg-white/20 transition-colors"
                >
                  <Eye className="w-3 h-3 inline mr-1" />
                  {product.status === 'active' ? 'Hide' : 'Show'}
                </button>
                <button className="p-2 bg-white/10 text-gray-300 hover:text-white rounded-md transition-colors">
                  <Edit className="w-3 h-3" />
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-2 bg-red-500/20 text-red-300 hover:text-red-200 rounded-md transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Package className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-white font-medium text-sm">Storefront Status</p>
              <p className="text-gray-400 text-xs">Live at: x-creatify.com/your-store</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm hover:opacity-90 transition-opacity">
            View Store
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductList