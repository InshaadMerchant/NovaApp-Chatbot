'use client'

import { useState } from 'react'
import ChatbotInterface from '@/components/ChatbotInterface'
import ActionButton from '@/components/ActionButton'

export default function Home() {
  const [showChat, setShowChat] = useState(false)
  const [initialMessage, setInitialMessage] = useState('')

  const handleInitialAction = (action: string) => {
    setInitialMessage(action)
    setShowChat(true)
  }

  if (!showChat) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden w-full max-w-md mx-auto">
          {/* Header */}
          <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-white font-semibold text-lg">Agent</h2>
            </div>
          </div>

          {/* Initial Message */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-100">
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-xs">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-blue-500">
                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="bg-blue-500 text-white rounded-lg px-3 py-2">
                  <p className="text-sm leading-relaxed">Hi There! Please Login or Register to get support.</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <ActionButton label="Login" onClick={() => handleInitialAction('Login')} />
                    <ActionButton label="Register" onClick={() => handleInitialAction('Register')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              NovaApp Chatbot
            </h1>
            <p className="text-gray-600 text-lg">
              Your intelligent assistant is here to help
            </p>
          </header>
          
          <ChatbotInterface />
        </div>
      </div>
    </main>
  )
} 