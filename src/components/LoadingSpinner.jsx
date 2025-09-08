import React from 'react'
import { Star } from 'lucide-react'

const LoadingSpinner = ({ size = 'large', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <div className="relative mb-8">
          <div className={`${sizeClasses[size]} mx-auto mb-4 animate-spin`}>
            <div className="w-full h-full border-4 border-purple-500/20 border-t-purple-500 rounded-full"></div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <Star className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">X Creatify</h2>
          <p className="text-gray-400">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
