import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
        <p className="text-gray-300 mb-8">
          Thank you for your purchase. Your order has been confirmed and you'll receive a confirmation email shortly.
        </p>
        
        <div className="glass-card p-6 rounded-xl mb-8">
          <h3 className="text-white font-semibold mb-2">What's next?</h3>
          <p className="text-gray-400 text-sm">
            You can now access your purchased content and track your order in your dashboard.
          </p>
        </div>
        
        <Link
          to="/dashboard"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
        >
          Go to Dashboard
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess
