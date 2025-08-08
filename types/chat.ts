export interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export interface ChatSession {
  id: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface BotResponse {
  message: string
  confidence: number
  suggestedActions?: string[]
} 