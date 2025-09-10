# NovaApp Chatbot - Backend Support System

This backend handles support form submissions and sends them via email to `inshaad17@gmail.com`.

## Features

- **Email Integration**: Sends support requests via Gmail SMTP
- **Form Validation**: Validates all required fields
- **CORS Support**: Allows frontend communication
- **Error Handling**: Comprehensive error handling and logging
- **HTML Email Templates**: Beautiful formatted emails

## Setup Instructions

### 1. Gmail App Password Setup

1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Enable 2-Step Verification if not already enabled
4. Go to Security → App passwords
5. Generate a new app password for "Mail"
6. Copy the 16-character password

### 2. Environment Configuration

1. Open `backend/.env` file
2. Update the following values:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
PORT=3001
```

### 3. Install Dependencies

```bash
cd backend
npm install
```

### 4. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### POST /api/support
Handles support form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "message": "I need help with..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Support request submitted successfully. We will get back to you soon!"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Support API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Email Template

The system sends beautifully formatted HTML emails with:
- Contact information section
- Message content
- Timestamp and source information
- Professional styling

## Troubleshooting

### Common Issues

1. **"Invalid login" error**: Check your Gmail app password
2. **CORS errors**: Ensure frontend is running on `http://localhost:5173`
3. **Connection refused**: Make sure backend server is running on port 3001

### Testing

Test the API using curl:

```bash
curl -X POST http://localhost:3001/api/support \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "123-456-7890",
    "message": "This is a test message"
  }'
```

## Security Notes

- Never commit `.env` file to version control
- Use app passwords instead of your main Gmail password
- Consider using environment variables in production
