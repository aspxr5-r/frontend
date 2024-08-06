import React from 'react';

function Sidebar({ chats, activeChat, setActiveChat, createNewChat }) {
  return (
    <div className="sidebar">
      <div>Today</div>
      <button onClick={createNewChat}>New Chat</button>
      {chats.map(chat => (
        <div 
          key={chat.id} 
          onClick={() => setActiveChat(chat.id)}
          className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
        >
          Chat {chat.id}
        </div>
      ))}
      <div className="user-info">User #1</div>
    </div>
  );
}

export default Sidebar;