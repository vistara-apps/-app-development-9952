import React from 'react'
import { Link } from 'react-router-dom'
import { XCircle, ArrowLeft } from 'lucide-react'

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Payment Cancelled</h1>
        <p className="text-gray-300 mb-8">
          Your payment was cancelled. No charges have been made to your account.
        </p>
        
        <div className="glass-card p-6 rounded-xl mb-8">
          <h3 className="text-white font-semibold mb-2">Need help?</h3>
          <p className="text-gray-400 text-sm">
            If you experienced any issues during checkout, please contact our support team.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="block w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Return to Dashboard
          </Link>
          
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentCancel
