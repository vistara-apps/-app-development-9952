import React, { useState } from 'react'
import Dashboard from '../components/Dashboard'
import Sidebar from '../components/Sidebar'

const DashboardPage = () => {
  const [activeView, setActiveView] = useState('dashboard')

  return (
    <div className="min-h-screen flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 min-h-screen">
        <Dashboard />
      </main>
    </div>
  )
}

export default DashboardPage
