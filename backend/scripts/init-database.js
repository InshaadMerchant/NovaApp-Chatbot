const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbDir = path.join(__dirname, '..', 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'chatbot.db');
const db = new sqlite3.Database(dbPath);

console.log('🗄️  Initializing NovaApp Chatbot Database...');

db.serialize(() => {
  // Create sessions table
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creating sessions table:', err.message);
    } else {
      console.log('✅ Sessions table created successfully');
    }
  });

  // Create messages table
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      content TEXT NOT NULL,
      sender TEXT NOT NULL CHECK(sender IN ('user', 'bot')),
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES sessions (id)
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creating messages table:', err.message);
    } else {
      console.log('✅ Messages table created successfully');
    }
  });

  // Create indexes for better performance
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_messages_session_id 
    ON messages (session_id)
  `, (err) => {
    if (err) {
      console.error('❌ Error creating session_id index:', err.message);
    } else {
      console.log('✅ Session ID index created successfully');
    }
  });

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_messages_timestamp 
    ON messages (timestamp)
  `, (err) => {
    if (err) {
      console.error('❌ Error creating timestamp index:', err.message);
    } else {
      console.log('✅ Timestamp index created successfully');
    }
  });

  // Insert sample data (optional)
  db.run(`
    INSERT OR IGNORE INTO sessions (id) 
    VALUES ('sample-session-123')
  `, (err) => {
    if (err) {
      console.error('❌ Error inserting sample session:', err.message);
    } else {
      console.log('✅ Sample session created');
    }
  });

  db.run(`
    INSERT OR IGNORE INTO messages (id, session_id, content, sender) 
    VALUES 
    ('msg-1', 'sample-session-123', 'Hello! Welcome to NovaApp Chatbot.', 'bot'),
    ('msg-2', 'sample-session-123', 'Hi there!', 'user'),
    ('msg-3', 'sample-session-123', 'How can I assist you today?', 'bot')
  `, (err) => {
    if (err) {
      console.error('❌ Error inserting sample messages:', err.message);
    } else {
      console.log('✅ Sample messages created');
    }
  });
});

// Close database connection
db.close((err) => {
  if (err) {
    console.error('❌ Error closing database:', err.message);
  } else {
    console.log('✅ Database initialization completed successfully!');
    console.log(`📁 Database file: ${dbPath}`);
  }
}); 