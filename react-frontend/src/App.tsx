import React, { useState } from 'react';
import EnterNameForm from './components/EnterNameForm';
import ChatBox from './components/ChatBox';

const App: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);

    return (
        <div>
            {!username ? (
                <EnterNameForm onEnter={(name) => setUsername(name)} />
            ) : (
                <ChatBox username={username} />
            )}
        </div>
    );
};

export default App;
