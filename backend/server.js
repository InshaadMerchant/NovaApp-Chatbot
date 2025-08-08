const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'database', 'chatbot.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
const initDatabase = () => {
  db.serialize(() => {
    // Messages table
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL,
        content TEXT NOT NULL,
        sender TEXT NOT NULL CHECK(sender IN ('user', 'bot')),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Sessions table
    db.run(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database initialized successfully');
  });
};

// Initialize database on startup
initDatabase();

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'NovaApp Chatbot API is running' });
});

// Create a new chat session
app.post('/api/sessions', (req, res) => {
  const sessionId = require('uuid').v4();
  const query = 'INSERT INTO sessions (id) VALUES (?)';
  
  db.run(query, [sessionId], function(err) {
    if (err) {
      console.error('Error creating session:', err);
      return res.status(500).json({ error: 'Failed to create session' });
    }
    
    res.json({ sessionId, message: 'Session created successfully' });
  });
});

// Get messages for a session
app.get('/api/sessions/:sessionId/messages', (req, res) => {
  const { sessionId } = req.params;
  const query = 'SELECT * FROM messages WHERE session_id = ? ORDER BY timestamp ASC';
  
  db.all(query, [sessionId], (err, rows) => {
    if (err) {
      console.error('Error fetching messages:', err);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
    
    res.json({ messages: rows });
  });
});

// Send a message
app.post('/api/chat', (req, res) => {
  const { message, sessionId } = req.body;
  
  if (!message || !sessionId) {
    return res.status(400).json({ error: 'Message and sessionId are required' });
  }

  const messageId = require('uuid').v4();
  const timestamp = new Date().toISOString();
  
  // Save user message
  const saveUserMessage = () => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO messages (id, session_id, content, sender, timestamp) VALUES (?, ?, ?, ?, ?)';
      db.run(query, [messageId, sessionId, message, 'user', timestamp], function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
  };

  // Generate bot response (placeholder - replace with actual AI logic)
  const generateBotResponse = (userMessage) => {
    // This is a simple response generator - replace with your AI service
    const responses = [
      `I understand you said: "${userMessage}". How can I help you further?`,
      `Thank you for your message: "${userMessage}". I'm here to assist you.`,
      `I received: "${userMessage}". Let me help you with that.`,
      `Interesting! You mentioned: "${userMessage}". Tell me more.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Save bot response
  const saveBotResponse = (botMessage) => {
    return new Promise((resolve, reject) => {
      const botMessageId = require('uuid').v4();
      const query = 'INSERT INTO messages (id, session_id, content, sender, timestamp) VALUES (?, ?, ?, ?, ?)';
      db.run(query, [botMessageId, sessionId, botMessage, 'bot', timestamp], function(err) {
        if (err) reject(err);
        else resolve(botMessageId);
      });
    });
  };

  // Process the message
  saveUserMessage()
    .then(() => {
      const botResponse = generateBotResponse(message);
      return saveBotResponse(botResponse);
    })
    .then((botMessageId) => {
      res.json({
        success: true,
        botMessage: {
          id: botMessageId,
          content: generateBotResponse(message),
          sender: 'bot',
          timestamp: timestamp
        }
      });
    })
    .catch((err) => {
      console.error('Error processing message:', err);
      res.status(500).json({ error: 'Failed to process message' });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NovaApp Chatbot API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('✅ Database connection closed');
    }
    process.exit(0);
  });
}); 