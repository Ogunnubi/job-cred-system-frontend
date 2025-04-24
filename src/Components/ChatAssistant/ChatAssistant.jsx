import {useState} from 'react'
import "./ChatAssistant.css"

const ChatAssistant = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');


    const sendMessage = async () => {
        if (!input.trim()) return;
        
        // Add user message to chat
        setMessages(prev => [...prev, { text: input, sender: 'user' }]);
        
        try {
          const { data } = await axiosPrivate.post('/assistant', { 
            message: input 
          });
          
          // Add AI response to chat
          setMessages(prev => [...prev, { text: data.message, sender: 'assistant' }]);
        } catch (error) {
          console.error("Error with assistant:", error);
        }
        
        setInput('');
    };


  return (
    <div className="assistant-container">
      {!isOpen ? (
        <button 
          className="assistant-icon" 
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      ) : (
        <div className="assistant-chat">
          <div className="chat-header">
            <h3>Assistant</h3>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask something..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatAssistant