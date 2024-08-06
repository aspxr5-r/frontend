import React from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import { API_BASE_URL } from '../config';

function ChatPage({ chats, activeChat, setActiveChat, createNewChat, addMessage, onLogout }) {
  const activeChatData = chats.find(chat => chat.id === activeChat);

  return (
    <div className="chat-page">
      <Sidebar 
        chats={chats} 
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        createNewChat={createNewChat}
        onLogout={onLogout}  
      />
      <div className="main-content">
        <img src="/Logo.png" alt="WebCoach AI" className="logo" />
        <h1>WebCoach AI</h1>
        <p className="subtitle">/link to online course</p>
        <button onClick={onLogout} className="logout-button">Logout</button>
          <div className="no-chat-selected">Select a chat or create a new one</div>
      </div>
    </div>
  );
}

export default ChatPage;