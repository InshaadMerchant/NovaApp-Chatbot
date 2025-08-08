# NovaApp Chatbot Backend

Node.js backend API for the NovaApp Chatbot with SQLite database.

## Features

- 🚀 Express.js REST API
- 💾 SQLite database for message storage
- 🔒 Security middleware (Helmet, CORS)
- 📝 Session management
- 🤖 Placeholder bot response system
- 📊 Health check endpoint

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Initialize the database:
```bash
npm run init-db
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Health Check
```
GET /api/health
```
Returns API status and version information.

### Create Session
```
POST /api/sessions
```
Creates a new chat session and returns the session ID.

**Response:**
```json
{
  "sessionId": "uuid-string",
  "message": "Session created successfully"
}
```

### Get Messages
```
GET /api/sessions/:sessionId/messages
```
Retrieves all messages for a specific session.

**Response:**
```json
{
  "messages": [
    {
      "id": "message-id",
      "session_id": "session-id",
      "content": "Hello!",
      "sender": "user",
      "timestamp": "2023-12-01T10:00:00.000Z"
    }
  ]
}
```

### Send Message
```
POST /api/chat
```
Sends a message and receives a bot response.

**Request Body:**
```json
{
  "message": "Hello, how are you?",
  "sessionId": "session-id"
}
```

**Response:**
```json
{
  "success": true,
  "botMessage": {
    "id": "bot-message-id",
    "content": "I understand you said: \"Hello, how are you?\". How can I help you further?",
    "sender": "bot",
    "timestamp": "2023-12-01T10:00:00.000Z"
  }
}
```

## Database Schema

### Sessions Table
```sql
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  content TEXT NOT NULL,
  sender TEXT NOT NULL CHECK(sender IN ('user', 'bot')),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3001
NODE_ENV=development
```

## Integration with Frontend

Update the frontend `ChatbotInterface.tsx` to use the real API:

```typescript
const handleSendMessage = async () => {
  if (!inputValue.trim() || isLoading) return

  const userMessage: Message = {
    id: Date.now().toString(),
    content: inputValue.trim(),
    sender: 'user',
    timestamp: new Date()
  }

  setMessages(prev => [...prev, userMessage])
  setInputValue('')
  setIsLoading(true)

  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage.content,
        sessionId: sessionId // You'll need to manage session IDs
      })
    })
    
    const data = await response.json()
    
    if (data.success) {
      const botMessage: Message = {
        id: data.botMessage.id,
        content: data.botMessage.content,
        sender: 'bot',
        timestamp: new Date(data.botMessage.timestamp)
      }
      setMessages(prev => [...prev, botMessage])
    }
  } catch (error) {
    console.error('Error sending message:', error)
  } finally {
    setIsLoading(false)
  }
}
```

## Next Steps

1. **AI Integration**: Replace the placeholder bot response with a real AI service (OpenAI, Claude, etc.)
2. **Authentication**: Add user authentication and session management
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **Logging**: Add comprehensive logging
5. **Testing**: Add unit and integration tests
6. **Deployment**: Set up production deployment

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run init-db` - Initialize database tables

### File Structure
```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies
├── database/              # SQLite database files
│   └── chatbot.db
├── scripts/               # Database scripts
│   └── init-database.js
└── README.md             # This file
```

## License

MIT License 