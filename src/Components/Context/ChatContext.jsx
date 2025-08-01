// src/context/ChatContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';

// 1. Create the Context
const ChatContext = createContext();

// 2. Create a custom hook to use the context easily
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// 3. Create the Provider component
export const ChatProvider = ({ children }) => {
  const [recentChats, setRecentChats] = useState([]); // Stores { id, title } for sidebar
  const [activeChatId, setActiveChatId] = useState(null); // ID of the currently active chat
  const [messages, setMessages] = useState([]); // Messages for the active chat

  // Function to clear current chat and start a new one
  const startNewChat = useCallback(() => {
    setActiveChatId(null); // No chat is active, signals a new session
    setMessages([]); // Clear messages in MainContent to start fresh
  }, []);

  // Function to load a specific chat when clicked in the sidebar
  const selectChat = useCallback((chatId) => {
    setActiveChatId(chatId);
    // In a real app: fetch messages for this chatId from your backend
    // For now, let's just simulate clearing messages for simplicity
    setMessages([]); // Clear previous messages
    console.log(`Simulating loading chat: ${chatId}. In a real app, messages would be fetched here.`);
    // Example: fetch(`/api/chats/${chatId}/messages`).then(res => res.json()).then(data => setMessages(data));
  }, []);

  // Function to add a new message to the current active chat
  const addMessage = useCallback((message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }, []);

  // Function to add a new chat to the sidebar, triggered by MainContent's first prompt
  const addChatToSidebar = useCallback((promptText) => {
    const newChatId = `chat-${Date.now()}`;
    const newChatTitle = promptText.substring(0, 30) + (promptText.length > 30 ? '...' : ''); // Truncate
    setRecentChats(prevChats => [{ id: newChatId, title: newChatTitle }, ...prevChats]);
    setActiveChatId(newChatId); // Set the newly created chat as active
    // The first user message is already added via addMessage by MainContent.
  }, []);

  // Function to delete a chat from the sidebar
  const deleteChat = useCallback((chatId) => {
    setRecentChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    // If the deleted chat was active, clear the main content
    if (activeChatId === chatId) {
      startNewChat();
    }
  }, [activeChatId, startNewChat]);

  // The value that will be supplied to any consumer of the context
  const contextValue = {
    recentChats,
    activeChatId,
    messages,
    addMessage,
    startNewChat,
    selectChat,
    addChatToSidebar,
    deleteChat,
    // Add any other state or functions that need to be globally accessible
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};