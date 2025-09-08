import React, { useState } from 'react'
import { Twitter, TrendingUp, Eye, MessageCircle, Zap } from 'lucide-react'

const ContentAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  const topPosts = [
    {
      id: 1,
      text: "Just launched my new course on React optimization! 🚀",
      engagement: 1254,
      products: ["React Course", "Code Templates"],
      sentiment: "positive"
    },
    {
      id: 2,
      text: "My favorite coding setup for 2024 productivity ⚡",
      engagement: 892,
      products: ["Desk Setup Guide", "Productivity Tools"],
      sentiment: "positive"
    },
    {
      id: 3,
      text: "Building SaaS apps has never been easier with these tools",
      engagement: 743,
      products: ["SaaS Starter Kit", "Tool List"],
      sentiment: "positive"
    }
  ]

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Content Analysis</h2>
          <p className="text-gray-400 text-sm">AI-powered insights</p>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Analyze</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        {topPosts.map((post) => (
          <div key={post.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-start space-x-3">
              <Twitter className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-white text-sm leading-relaxed">{post.text}</p>
                
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-1 text-gray-400 text-xs">
                    <TrendingUp className="w-3 h-3" />
                    <span>{post.engagement}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400 text-xs">
                    <Eye className="w-3 h-3" />
                    <span>High</span>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-gray-400 mb-2">Detected Products:</p>
                  <div className="flex flex-wrap gap-2">
                    {post.products.map((product, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-md"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">AI Insights</p>
            <p className="text-gray-400 text-xs">15 potential products identified</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentAnalysis