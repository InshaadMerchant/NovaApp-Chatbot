# NovaApp Chatbot

A modern, intelligent chatbot interface built with Next.js, React, and TypeScript.

## Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 💬 Real-time chat interface
- 🤖 Bot typing indicators
- 📱 Mobile-friendly design
- ⚡ Fast and optimized with Next.js
- 🔧 TypeScript for type safety
- 🎯 Ready for backend integration

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **clsx** - Conditional className utility

### Backend (Planned)
- **Node.js** - Runtime environment
- **SQLite** - Database
- **Express.js** - Web framework (recommended)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd novaapp-chatbot
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
novaapp-chatbot/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ChatbotInterface.tsx
│   ├── ChatMessage.tsx
│   └── TypingIndicator.tsx
├── lib/                   # Utility functions
│   └── utils.ts
├── types/                 # TypeScript types
│   └── chat.ts
├── public/                # Static assets
└── package.json
```

## Components

### ChatbotInterface
The main chat interface component that handles:
- Message state management
- User input handling
- Bot response simulation
- Auto-scrolling to latest messages

### ChatMessage
Individual message component with:
- User/bot message styling
- Timestamp display
- Avatar icons
- Responsive design

### TypingIndicator
Animated typing indicator showing when the bot is "thinking"

## Backend Integration

The frontend is ready for backend integration. You'll need to:

1. Replace the simulated bot response in `ChatbotInterface.tsx`
2. Create API endpoints for:
   - Message processing
   - Chat history
   - User authentication (if needed)

### Example API Integration

```typescript
const handleSendMessage = async () => {
  // ... existing code ...
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage.content,
        sessionId: sessionId
      })
    })
    
    const data = await response.json()
    
    const botMessage: Message = {
      id: generateId(),
      content: data.response,
      sender: 'bot',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, botMessage])
  } catch (error) {
    console.error('Error sending message:', error)
  } finally {
    setIsLoading(false)
  }
}
```

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for custom CSS classes
- Adjust component styles in individual component files

### Features
- Add message reactions
- Implement file uploads
- Add voice messages
- Create conversation history
- Add user profiles

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team. 