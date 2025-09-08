import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'

function App() {
  const [activeView, setActiveView] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 min-h-screen">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default App