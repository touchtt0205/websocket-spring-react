import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // ต้องแน่ใจว่าไฟล์นี้ถูก import

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
