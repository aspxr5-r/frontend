import React, { useState, useEffect, useCallback } from 'react';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/login';
import { API_BASE_URL } from './config';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/check-auth`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
        if (data.authenticated) {
          fetchChats();
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const fetchChats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/chats`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch chats');
      const data = await response.json();
      setChats(data.chats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleLoginSuccess = (userId) => {
    setIsAuthenticated(true);
    fetchChats();
  };

  const createNewChat = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to create new chat');
      const data = await response.json();
      setChats(prevChats => [...prevChats, { id: data.chat_id, messages: [] }]);
      setActiveChat(data.chat_id);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const addMessage = async (chatId, message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${chatId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to send message');
      const data = await response.json();
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === chatId 
            ? { ...chat, messages: [...chat.messages, { text: message, sender: 'user' }, { text: data.ai_response, sender: 'ai' }] }
            : chat
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setIsAuthenticated(false);
        setChats([]);
        setActiveChat(null);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="App">
      <ChatPage 
        chats={chats} 
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        createNewChat={createNewChat}
        addMessage={addMessage}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;