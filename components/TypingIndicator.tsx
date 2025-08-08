import { Bot } from 'lucide-react'

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-gray-600" />
        </div>
        
        {/* Typing Bubble */}
        <div className="chat-bubble bot-message">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 