
import React, { createContext, useState, useContext, useCallback } from 'react';

const ChatContext = createContext();


export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [recentChats, setRecentChats] = useState([]); 
  const [activeChatId, setActiveChatId] = useState(null); 
  const [messages, setMessages] = useState([]); 


  const startNewChat = useCallback(() => {
    setActiveChatId(null);
    setMessages([]); 
  }, []);

  // Function to load a specific chat when clicked in the sidebar
  const selectChat = useCallback((chatId) => {
    setActiveChatId(chatId);

    setMessages([]); // Clear previous messages
    console.log(`Simulating loading chat: ${chatId}. In a real app, messages would be fetched here.`);
   
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

  const contextValue = {
    recentChats,
    activeChatId,
    messages,
    addMessage,
    startNewChat,
    selectChat,
    addChatToSidebar,
    deleteChat,
   
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};