# NovaApp Chatbot

A modern, responsive chatbot interface built with React and Vite, powered by Google's Gemini AI. This project provides a clean and intuitive chat interface with a beautiful blue-themed UI design and real-time AI conversations.

## 🚀 Features

- **AI-Powered Conversations**: Integrated with Google Gemini 2.0 Flash API
- **Modern React Architecture**: Built with React 19 and modern hooks
- **Responsive Design**: Beautiful blue-themed UI that works on all devices
- **Real-time Chat Interface**: Clean message display with user and bot messages
- **Material Design Icons**: Integrated Google Material Symbols for icons
- **Company Context**: Pre-loaded with NovaApp company information
- **Error Handling**: Robust error handling and user feedback
- **Fast Development**: Powered by Vite for lightning-fast development experience
- **ESLint Integration**: Code quality and consistency with ESLint

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **AI Integration**: Google Gemini 2.0 Flash API
- **Styling**: CSS3 with modern features and blue theme
- **Icons**: Google Material Symbols
- **Linting**: ESLint with React plugins

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/InshaadMerchant/NovaApp-Chatbot.git
   cd NovaApp-Chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```bash
   VITE_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
   VITE_API_KEY=your_gemini_api_key_here
   ```
   
   Get your API key from [Google AI Studio](https://aistudio.google.com/)

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Note: If you encounter Node.js version issues, use:
   ```bash
   npx vite --host
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatbotIcon.jsx    # Chatbot icon component
│   ├── ChatForm.jsx       # Message input form
│   ├── ChatMessage.jsx    # Individual message component
│   └── companyInfo.js     # NovaApp company information
├── App.jsx                # Main application component with Gemini API integration
├── main.jsx              # Application entry point
└── index.css             # Global styles with blue theme
```

## 🎨 Components

### ChatbotIcon
- Reusable SVG icon component for the chatbot
- Used in header and bot messages

### ChatForm
- Message input form with submit functionality
- Handles user input and form submission
- Integrates with chat history state

### ChatMessage
- Displays individual chat messages
- Supports both user and bot message types
- Conditional rendering based on message role
- Error message display with red styling

### App.jsx
- Main application component with Gemini API integration
- Chat history state management
- Real-time API communication
- Error handling and user feedback
- Auto-scroll functionality

## 🔧 Development

The project uses Vite for fast development with:
- Hot Module Replacement (HMR)
- Fast build times
- Modern ES modules support
- Environment variable support
- Built-in TypeScript support (if needed)

## 🚧 Current Status

- ✅ Frontend UI complete with blue theme
- ✅ Component architecture implemented
- ✅ State management with React hooks
- ✅ Gemini AI API integration
- ✅ Real-time chat functionality
- ✅ Error handling and user feedback
- ✅ Company context integration
- ✅ Responsive design

## 📝 Next Steps

1. **Enhanced Features**: Add typing indicators, message timestamps
2. **Backend Development**: Implement server-side logic for scalability
3. **Database Integration**: Add persistent storage for chat history
4. **Authentication**: User management system
5. **Deployment**: Production deployment setup
6. **Analytics**: Chat analytics and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

**Inshaad Merchant**
- GitHub: [@InshaadMerchant](https://github.com/InshaadMerchant)

**Aliza Gowlani**
- GitHub: [@Alizaa15](https://github.com/Alizaa15)

**Project Link**: [NovaApp-Chatbot](https://github.com/InshaadMerchant/NovaApp-Chatbot)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Google for Material Design icons and Gemini AI API
- All contributors and supporters

## 🎨 Design

The chatbot features a modern blue-themed design with:
- Clean, intuitive interface
- Responsive layout for all devices
- Material Design principles
- Smooth animations and transitions
- Professional color scheme