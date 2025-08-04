import React from 'react';
import Sidebar from './Components/Sidebar'; 
import MainContent from './Components/MainContent';
import { ChatProvider } from './Components/Context/ChatContext';




function App() {
  return (
    // Wrap your entire application with ChatProvider
    <ChatProvider>
      <div className="flex h-screen bg-gray-950">
        <Sidebar /> 
        <MainContent />
      </div>
    </ChatProvider>
  );
}

export default App;