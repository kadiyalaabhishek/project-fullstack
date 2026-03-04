import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI shopping assistant. What are you looking for today?", sender: "ai" }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      // Send to your FastAPI backend
      const response = await axios.post("http://127.0.0.1:8000/ask-ai", { message: input });
      
      // Add AI response to chat
      setMessages([...newMessages, { text: response.data.reply, sender: "ai" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Network error. Make sure the backend is running!", sender: "ai" }]);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ padding: '15px', borderRadius: '50%', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
        >
          💬 AI
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{ width: '300px', height: '400px', backgroundColor: 'white', borderRadius: '10px', display: 'flex', flexDirection: 'column', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
          {/* Header */}
          <div style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <strong>Smart Assistant</strong>
            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>✖</button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.sender === 'user' ? '#e3f2fd' : '#f1f1f1', padding: '8px 12px', borderRadius: '15px', maxWidth: '80%', fontSize: '14px' }}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}>
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..." 
              style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button onClick={handleSend} style={{ marginLeft: '5px', padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;


