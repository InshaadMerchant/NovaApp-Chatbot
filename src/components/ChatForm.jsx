import React from 'react'
import { useRef } from 'react'
const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {
    const inputRef = useRef();
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const message = inputRef.current.value.trim();
        if (!message) return;
        inputRef.current.value = "";

        //Update Chat History with the user's message
        setChatHistory(history => [...history, {role: "user", text: message}]);

        //Add a thinking placeholder for the bot's response
        setTimeout(() => {
            //Add a thinking placeholder for the bot's response
            setChatHistory((history) => [...history, { role: "model", text: "Thinking..."}]);
            //Call the generateBotResponse function to generate the bot's response
            generateBotResponse([...chatHistory, {role: "user", text: `Using the details provided above, please address this query: ${message}` }]);
        }, 600);
    };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input ref={inputRef} type="text" placeholder= "Message..." className="message-input" required />
        <button className="material-symbols-rounded"> arrow_upward</button>
    </form>
  )
}

export default ChatForm