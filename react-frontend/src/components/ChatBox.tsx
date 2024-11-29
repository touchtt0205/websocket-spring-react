import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

interface ChatBoxProps {
    username: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ username }) => {
    const [messages, setMessages] = useState<{ username: string; message: string; type: string }[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');

    // Establish WebSocket connection and handle incoming messages
    const { sendMessage,  } = useWebSocket('ws://172.20.10.4:8080/chat', {
        onOpen: () => {
            // Send a "join" message when the user connects
            sendMessage(JSON.stringify({ type: 'join', username, message: '' }));
        },
        onClose: () => {
            // Send a "leave" message when the user disconnects
            sendMessage(JSON.stringify({ type: 'leave', username, message: '' }));
        },
        onMessage: (event) => {
            // Parse and add the received message to the message list
            const receivedMessage = JSON.parse(event.data);
            console.log('Received message:', receivedMessage); // Debugging
            setMessages((prev) => [...prev, receivedMessage]);
        },
    });

    // Clean up on component unmount or window close
    useEffect(() => {
        // When the component is unmounted or user leaves the page
        const handleBeforeUnload = () => {
            sendMessage(JSON.stringify({ type: 'leave', username, message: '' }));
        };

        // Attach event listener for before unload (when closing tab/browser)
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            // Clean up event listener
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [username, sendMessage]);

    const handleSendMessage = () => {
        // Send a "chat" message when the user submits a message
        if (inputMessage.trim()) {
            sendMessage(JSON.stringify({ type: 'chat', username, message: inputMessage }));
            setInputMessage(''); // Clear the input field
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Message display section */}
            <div className="flex-1 overflow-y-auto p-4 bg-white shadow-md">
                <h1 className="text-lg font-bold text-center mb-4">Chatbox</h1>
                <div className="space-y-4 text-center">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg ${
                                msg.type === 'chat'
                                    ? 'bg-blue-100 text-blue-900'  // Chat message style
                                    : msg.type === 'join'
                                    ? 'bg-green-100 text-green-900 text-center font-semibold'  // Join message style
                                    : 'bg-red-100 text-red-900'  // Leave message style
                            }`}
                        >
                            {/* Display chat message with username */}
                            {msg.type === 'chat' ? (
                                <span>
                                    <strong>{msg.username}:</strong> {msg.message}
                                </span>
                            ) : msg.type === 'join' ? (
                                <span className="text-green-900 font-semibold">
                                    <strong>{msg.username}</strong> has joined the chat
                                </span>
                            ) : (
                                <span className="text-red-900 font-semibold text-center">
                                    <strong>{msg.username}</strong> has left the chat
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Message input section */}
            <div className="p-4 bg-gray-200 flex items-center space-x-4">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
