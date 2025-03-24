import React, { useState } from 'react';
import axios from 'axios';

const ChatModal = ({ isOpen, onClose }) => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        // Add user message to chat history
        setChatHistory((prev) => [...prev, { sender: 'User', text: message }]);

        try {
            const response = await axios.post('YOUR_FASTAPI_URL', { message }); // Replace with your FastAPI URL
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-11/12 md:w-1/3">
                <h1 className="text-lg font-bold mb-4">Chat with AI</h1>
                <div className="chat-history border border-gray-300 rounded p-2 h-64 overflow-y-scroll mb-2">
                    {chatHistory.map((chat, index) => (
                        <div key={index} className={chat.sender === 'User' ? 'text-right' : 'text-left'}>
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
                    className="border border-gray-300 rounded p-2 w-full mb-2"
                />
                <button onClick={handleSendMessage} className="bg-blue-500 text-white rounded p-2 w-full">
                    Send
                </button>
                <button onClick={onClose} className="mt-2 text-red-500" style={{ width: '100%' }}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ChatModal; 