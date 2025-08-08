'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, Loader2, X, Minus } from 'lucide-react'
import ActionButton from './ActionButton'

export interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'buttons' | 'registration' | 'live_agent'
}

export interface ActionButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export default function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Thank You for being our valued customer!',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    },
    {
      id: '2',
      content: 'Hello, how can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'buttons'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [registrationStep, setRegistrationStep] = useState<'none' | 'first_name' | 'last_name' | 'email' | 'phone'>('none')
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleActionButton = (action: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: action,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])

    // Handle different actions
    if (action === 'Register') {
      setRegistrationStep('first_name')
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'May I have your first name?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, botMessage])
    } else if (action === 'Login') {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Please enter your login credentials.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, botMessage])
    } else if (['Billing', 'Sales', 'Operations'].includes(action)) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'What is your concern?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, botMessage])
    } else if (action === 'Yes') {
      // Simulate live agent connection
      const connectingMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Connecting you to a live agent now...',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, connectingMessage])

      setTimeout(() => {
        const agentMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: 'Hi, This is Noman. How may I assist you today?',
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        }
        setMessages(prev => [...prev, agentMessage])
      }, 2000)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    const userInput = inputValue.trim()
    setInputValue('')
    setIsLoading(true)

    // Handle registration flow
    if (registrationStep !== 'none') {
      let nextStep: 'none' | 'first_name' | 'last_name' | 'email' | 'phone' = 'none'
      let botResponse = ''

      switch (registrationStep) {
        case 'first_name':
          setUserData(prev => ({ ...prev, firstName: userInput }))
          nextStep = 'last_name'
          botResponse = 'Last name'
          break
        case 'last_name':
          setUserData(prev => ({ ...prev, lastName: userInput }))
          nextStep = 'email'
          botResponse = 'Email'
          break
        case 'email':
          setUserData(prev => ({ ...prev, email: userInput }))
          nextStep = 'phone'
          botResponse = 'Phone Number'
          break
        case 'phone':
          setUserData(prev => ({ ...prev, phone: userInput }))
          botResponse = 'Thank you for registering! Your account has been created successfully.'
          break
      }

      setRegistrationStep(nextStep)

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        }
        setMessages(prev => [...prev, botMessage])
        setIsLoading(false)
      }, 1000)
    } else {
      // Handle regular conversation
      setTimeout(() => {
        let botResponse = ''
        
        if (userInput.toLowerCase().includes('charged twice')) {
          botResponse = "I'm sorry because I could not understand what you are saying. Would you like to talk to a live agent?"
        } else {
          botResponse = `I understand you said: "${userInput}". How can I help you further?`
        }

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          sender: 'bot',
          timestamp: new Date(),
          type: botResponse.includes('live agent') ? 'live_agent' : 'text'
        }
        setMessages(prev => [...prev, botMessage])
        setIsLoading(false)
      }, 1500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const renderMessageContent = (message: Message) => {
    if (message.type === 'buttons' && message.sender === 'bot') {
      return (
        <div className="space-y-2">
          <p className="text-sm leading-relaxed">{message.content}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <ActionButton label="Billing" onClick={() => handleActionButton('Billing')} />
            <ActionButton label="Sales" onClick={() => handleActionButton('Sales')} />
            <ActionButton label="Operations" onClick={() => handleActionButton('Operations')} />
          </div>
        </div>
      )
    }

    if (message.type === 'live_agent' && message.sender === 'bot') {
      return (
        <div className="space-y-2">
          <p className="text-sm leading-relaxed">{message.content}</p>
          <div className="mt-3">
            <ActionButton label="Yes" onClick={() => handleActionButton('Yes')} />
          </div>
        </div>
      )
    }

    return <p className="text-sm leading-relaxed">{message.content}</p>
  }

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden w-full max-w-md mx-auto">
      {/* Header - matches Figma design */}
      <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-white font-semibold text-lg">Agent</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-white/80 hover:text-white p-1">
            <Minus className="w-4 h-4" />
          </button>
          <button className="text-white/80 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-100 scrollbar-hide">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Avatar - only for bot messages */}
              {message.sender === 'bot' && (
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-blue-500">
                  <Bot className="w-3 h-3 text-blue-600" />
                </div>
              )}
              
              {/* Message Bubble */}
              <div className={`rounded-lg px-3 py-2 max-w-xs ${
                message.sender === 'user' 
                  ? 'bg-gray-300 text-gray-800' 
                  : 'bg-blue-500 text-white'
              }`}>
                {renderMessageContent(message)}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-xs">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-blue-500">
                <Bot className="w-3 h-3 text-blue-600" />
              </div>
              <div className="bg-blue-500 text-white rounded-lg px-3 py-2">
                <div className="flex space-x-1 items-center">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
} 