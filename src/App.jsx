// App.js
// import { useState } from 'react';
// import Sidebar from './Components/Sidebar'
// import MainContent from './Components/MainContent'

// function App() {
//   const [recentChats, setRecentChats] = useState([]); 
//   const [activeChatId, setActiveChatId] = useState(null); 
//   const [messages, setMessages] = useState([]);

//   // Function to add a new chat to the sidebar, triggered by MainContent
//   const addChatToSidebar = (promptText) => {
//     const newChatId = `chat-${Date.now()}`;
//     const newChatTitle = promptText.substring(0, 30) + (promptText.length > 30 ? '...' : ''); 
//     setRecentChats(prevChats => [{ id: newChatId, title: newChatTitle }, ...prevChats]);
//     setActiveChatId(newChatId); 
//   };

//   // Function to handle starting a new chat from the sidebar
//   const handleNewChatFromSidebar = () => {
//     setActiveChatId(null); 
//     setMessages([]);
//   };

//   // Function to load a specific chat when clicked in the sidebar
//   const handleChatSelect = (chatId) => {
//     setActiveChatId(chatId);

//     setMessages([]); 
//     console.log(`Loading chat: ${chatId}`);
//   };


//   return (
//     <div className="flex h-screen bg-gray-950">
//       <Sidebar
//         recentChats={recentChats}
//         onNewChatClick={handleNewChatFromSidebar} 
//         onChatSelect={handleChatSelect} 
//         onDeleteChat={(chatId) => setRecentChats(recentChats.filter(chat => chat.id !== chatId))} 
//       />
//       <MainContent
//         onFirstPromptSent={addChatToSidebar} 
//         activeChatId={activeChatId}
//         messages={messages}
//         setMessages={setMessages} 
//       />
//     </div>
//   );
// }

// export default App;


// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar'; // Assuming Sidebar is in src/components
import MainContent from './components/MainContent'; // Assuming MainContent is in src/components
import { ChatProvider } from './Components/Context/ChatContext';
// import { ChatProvider } from './context/ChatContext'; // Import the ChatProvider
ChatProvider

function App() {
  return (
    // Wrap your entire application with ChatProvider
    <ChatProvider>
      <div className="flex h-screen bg-gray-950">
        <Sidebar /> {/* Sidebar no longer needs props passed directly */}
        <MainContent /> {/* MainContent no longer needs props passed directly */}
      </div>
    </ChatProvider>
  );
}

export default App;