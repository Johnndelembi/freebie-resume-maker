import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [apiUrl, setApiUrl] = useState('');
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        // Add user message to chat history
        setChatHistory((prev) => [...prev, { sender: 'User', text: message }]);

        try {
            const response = await axios.post(apiUrl, { message });
            const aiResponse = response.data.response; // Adjust based on your FastAPI response structure

            // Add AI response to chat history
            setChatHistory((prev) => [...prev, { sender: 'AI', text: aiResponse }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setChatHistory((prev) => [...prev, { sender: 'AI', text: 'Error: Unable to get response from server.' }]);
        }

        // Clear the input field
        setMessage('');
    };

    return (
        <div className="chat-container">
            <h1>Chat with AI</h1>
            <input
                type="text"
                placeholder="Enter FastAPI URL"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <div className="chat-history" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                {chatHistory.map((chat, index) => (
                    <div key={index} className={chat.sender === 'User' ? 'user-message' : 'ai-message'}>
                        <strong>{chat.sender}:</strong> {chat.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                style={{ width: '100%', marginTop: '10px' }}
            />
            <button onClick={handleSendMessage} style={{ width: '100%', marginTop: '10px' }}>
                Send
            </button>
        </div>
    );
};

export default Chat; 