import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaComments } from 'react-icons/fa'; // Import Font Awesome icon for the chatbot button
import '../style/chatbot.css';

const Chatbot = () => {
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false); // State to manage the open/close functionality
    const navigate = useNavigate();

    // Add welcome message when the chatbot is opened
    useEffect(() => {
        if (isChatOpen) {
            const welcomeMessage = {
                sender: 'bot',
                text: 'Welcome to your own personal bot! Please write the scheme you want to search in your language.',
            };
            setChatMessages((prevMessages) => [...prevMessages, welcomeMessage]);
        }
    }, [isChatOpen]); // Runs when isChatOpen changes

    // Handle form submission
    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        // Add user message to chat
        const newMessages = [...chatMessages, { sender: 'user', text: chatInput }];
        setChatMessages(newMessages);
        setChatInput('');

        try {
            // Make a POST request to the backend to get matched schemes
            const response = await axios.post('http://localhost:5000/api/chat', { message: chatInput });
            const matchedSchemes = response.data;

            if (matchedSchemes && matchedSchemes.length > 0) {
                // Add bot response with scheme titles and buttons
                setChatMessages((prev) => [
                    ...prev,
                    { sender: 'bot', text: 'Here are the available schemes:' },
                    ...matchedSchemes.map((scheme) => ({
                        sender: 'bot',
                        text: '', // Empty text for now
                        schemeId: scheme._id, // Store scheme ID for navigation
                        schemeTitle: scheme.title, // Store scheme title
                    }))
                ]);
            } else {
                setChatMessages((prev) => [
                    ...prev,
                    { sender: 'bot', text: 'Sorry, no schemes found matching your request.' }
                ]);
            }
        } catch (error) {
            console.error('Error:', error);
            setChatMessages((prev) => [
                ...prev,
                { sender: 'bot', text: 'Sorry, I couldn\'t fetch the schemes.' }
            ]);
        }
    };

    return (
        <div>
            {/* Chatbot Window */}
            {isChatOpen && (
                <div className="chatbot-container">
                    <div className="chat-window">
                        {chatMessages.map((msg, index) => (
                            <div key={index} className={msg.sender}>
                                {msg.schemeId ? (
                                    // Display scheme title and make it clickable
                                    <button onClick={() => navigate(`/scheme/${msg.schemeId}`)}>
                                        {msg.schemeTitle}  {/* Display scheme title */}
                                    </button>
                                ) : (
                                    <p>{msg.text}</p>  // Display text for other messages
                                )}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleChatSubmit} className="chat-form">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask something..."
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}

            {/* Chatbot Icon (button to open/close the chatbot) */}
            <div
                className="chatbot-icon"
                onClick={() => setIsChatOpen(!isChatOpen)} // Toggle chatbot visibility
            >
                <FaComments />
            </div>
        </div>
    );
};

export default Chatbot;
