import { useState, useRef, useEffect } from 'react'
import ChatbotIcon from "./components/ChatbotIcon"
import ChatForm from "./components/ChatForm"
import ChatMessage from "./components/ChatMessage"

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = async (history) => {
    //Helper function to update the chat history
    const updateHistory = (text, isError = false) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: "model", text, isError}]);
    }
    //Format chat history for the API request
    const contents = history.map(({role, text}) => ({
      role: role === "model" ? "model" : "user",
      parts: [{ text: text }]
    }));
    
    const requestOptions = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-goog-api-key": import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ contents: contents })
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
      const apiKey = import.meta.env.VITE_API_KEY || "AIzaSyBQEReFox0EY7Yo683AqtTK83ECKquOx_I";
      
      console.log("API URL:", apiUrl);
      console.log("API Key:", apiKey);
      console.log("Request body:", JSON.stringify({ contents: contents }, null, 2));
      
      //Make the API call to get the bot's response
      const response = await fetch(apiUrl, {
        ...requestOptions,
        headers: {
          ...requestOptions.headers,
          "x-goog-api-key": apiKey
        }
      });
      
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      const responseText = await response.text();
      console.log("Response text:", responseText);
      
      if (!responseText) {
        throw new Error("Empty response from API");
      }
      
      const data = JSON.parse(responseText);
      console.log("Parsed data:", data);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error("Invalid response format from API");
      }

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/^"|\s+"$/g, "").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.error("Full error:", error);
      updateHistory(`Error: ${error.message}`, true);
    }
  };

  useEffect(() => {
    //Autoscroll whenever chat history updates
    chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth"});
  }, [chatHistory]);

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chatbot-header">
          <div className="header-info">
            <ChatbotIcon />
           <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot((prev) => !prev)} className="material-symbols-rounded"> keyboard_arrow_down</button>
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
      </div> )}
    </div>
  );
};

export default App