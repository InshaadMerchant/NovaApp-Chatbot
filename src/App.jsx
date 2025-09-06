import { useState } from 'react'
import ChatbotIcon from "./components/ChatbotIcon"
import ChatForm from "./components/ChatForm"
import ChatMessage from "./components/ChatMessage"

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = (history) => {
    console.log(history);
  }

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chatbot-header">
          <div className="header-info">
            <ChatbotIcon />
           <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded"> keyboard_arrow_down</button>
        </div>
        <div className="chat-body">
          {/* Chatbot Body */}
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hello, how can I help you today?
            </p>
          </div>
          {/* Render the chat history dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />

          ))}

        </div>
        <div className="chat-footer">
          {/* Chatbot Footer */}
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  )
}

export default App