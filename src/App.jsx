import { useState, useRef, useEffect } from 'react'
import ChatbotIcon from "./components/ChatbotIcon"
import ChatForm from "./components/ChatForm"
import ChatMessage from "./components/ChatMessage"
import LoginPage from "./components/LoginPage"
import SupportForm from "./components/SupportForm"
import { companyInfo } from "./components/companyInfo"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo
    },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [agentsBusy, setAgentsBusy] = useState(false);
  const chatBodyRef = useRef();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSupportFormSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:3001/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Thank you for your message! Our team will get back to you soon.');
        setShowSupportForm(false);
        setAgentsBusy(false);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting support form:', error);
      alert('Failed to submit your message. Please try again later.');
    }
  };

  const handleSupportFormCancel = () => {
    setShowSupportForm(false);
  };

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: "model", text, isError}]);
    }
    
    // Simulate random busy agents (30% chance)
    const isBusy = Math.random() < 0.3;
    
    if (isBusy) {
      setAgentsBusy(true);
      updateHistory("I'm sorry, but all our support agents are currently busy. Please fill out the support form and our team will get back to you as soon as possible.");
      setTimeout(() => {
        setShowSupportForm(true);
      }, 2000);
      return;
    }
    
    const contents = history.map(({role, text}) => ({
      role: role === "model" ? "model" : "user",
      parts: [{ text: text }]
    }));
    
    const requestOptions = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-goog-api-key": "AIzaSyBQEReFox0EY7Yo683AqtTK83ECKquOx_I"
      },
      body: JSON.stringify({ contents: contents })
    };

    try {
      const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
      const response = await fetch(apiUrl, requestOptions);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      const responseText = await response.text();
      if (!responseText) {
        throw new Error("Empty response from API");
      }
      
      const data = JSON.parse(responseText);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error("Invalid response format from API");
      }

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/^"|\s+"$/g, "").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(`Error: ${error.message}`, true);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth"});
    }
  }, [chatHistory]);

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      <div className="chatbot-popup">
        <div className="chatbot-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <div className="header-buttons">
            <button 
              onClick={() => setShowSupportForm(true)} 
              className="support-btn" 
              title="Contact Support"
            >
              <span className="material-symbols-rounded">support_agent</span>
            </button>
            <button onClick={() => setShowChatbot((prev) => !prev)} className="material-symbols-rounded"> keyboard_arrow_down</button>
          </div>
        </div>
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hello, how can I help you today?
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
          
          {/* Support Form inside chatbot */}
          {showSupportForm && (
            <SupportForm 
              onSubmit={handleSupportFormSubmit}
              onCancel={handleSupportFormCancel}
            />
          )}
        </div>
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  )
}

export default App