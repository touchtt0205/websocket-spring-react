import React, { useState } from 'react';

interface EnterNameFormProps {
    onEnter: (username: string) => void;
}

const EnterNameForm: React.FC<EnterNameFormProps> = ({ onEnter }) => {
    const [username, setUsername] = useState<string>('');

    const handleEnter = () => {
        if (username.trim()) {
            onEnter(username);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="p-6 bg-white shadow-md rounded-lg space-y-4">
                <h1 className="text-xl font-bold">Enter Chat</h1>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name..."
                />
                <button
                    onClick={handleEnter}
                    className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                >
                    Join Chat
                </button>
            </div>
        </div>
    );
};

export default EnterNameForm;
