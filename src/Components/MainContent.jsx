import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Image as ImageIcon, Mic } from "lucide-react";


import ReactMarkdown from "react-markdown"; 
import { useChat } from "./Context/ChatContext";

// import { useChat } from "./Context/ChatContext";


const baseURL = import.meta.env.VITE_API_URL;
export default function MainContent() {
  // Consume the context
  const { messages, addMessage, activeChatId, addChatToSidebar } = useChat();

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [displayedAIText, setDisplayedAIText] = useState(""); // Add this state
  const messagesEndRef = useRef(null);

  // Helper to check if this is the first message in the current chat session
  const isFirstMessageOfSession = messages.length === 0 && !activeChatId;

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const currentPrompt = input.trim();
    const newUserMessage = {
      id: Date.now(),
      text: currentPrompt,
      sender: "user",
    };
    addMessage(newUserMessage);
    setInput("");
    setIsTyping(true);

    if (isFirstMessageOfSession) {
      addChatToSidebar(currentPrompt);
    }

    try {
      // const response = await fetch("http://localhost:3001/generate", {
      const response = await fetch(`${baseURL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: currentPrompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Typing effect for AI response
      typeAIResponse(data.text);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Oops! Something went wrong. Please try again. (Check backend console for details)",
        sender: "ai",
        isError: true,
      };
      addMessage(errorMessage);
      setIsTyping(false);
    }
  };

  const typeAIResponse = (fullText) => {
    setDisplayedAIText(""); // Reset before typing
    let i = 0;
    const typingSpeed = 18; // ms per character, adjust for speed

    function typeChar() {
      setDisplayedAIText((prev) => prev + fullText[i]);
      i++;
      if (i < fullText.length) {
        setTimeout(typeChar, typingSpeed);
      } else {
        // When done, add the full message to the chat history
        addMessage({
          id: Date.now() + 1,
          text: fullText,
          sender: "ai",
        });
        setIsTyping(false);
        setDisplayedAIText(""); // Clear the typing buffer
      }
    }

    typeChar();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const renderMessageContent = (message) => {
    return (
      <div
        className={`p-3 rounded-lg max-w-[80%] ${
          message.sender === "user"
            ? "bg-blue-600 self-end text-white"
            : message.isError
            ? "bg-red-700 self-start text-white"
            : "bg-gray-800 self-start text-gray-100"
        }`}
      >
        {/* Use ReactMarkdown here for AI responses */}
        {message.sender === "ai" && !message.isError ? (
          <ReactMarkdown
            children={message.text}

          />
        ) : (
          // Render user messages and error messages as plain text
          message.text
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-950 text-white relative">
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-950 to-transparent z-10 pointer-events-none"></div>

      <div className="flex-1 overflow-y-auto pt-16 pb-24 px-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-950">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <Sparkles size={48} className="text-blue-500 mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-gray-200">
              Hello there! How can I help you today?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mt-8">
              <button
                className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg text-left transition-colors flex items-center gap-3"
                onClick={() =>
                  setInput("Suggest a dish for dinner with ingredients I have.")
                }
              >
                <ImageIcon size={20} className="text-gray-400" />
                <span>Suggest a dish for dinner with ingredients I have.</span>
              </button>
              <button
                className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg text-left transition-colors flex items-center gap-3"
                onClick={() =>
                  setInput("Write a short story about a space explorer.")
                }
              >
                <Sparkles size={20} className="text-gray-400" />
                <span>Write a short story about a space explorer.</span>
              </button>
              <button
                className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg text-left transition-colors flex items-center gap-3"
                onClick={() =>
                  setInput("Explain quantum physics in simple terms.")
                }
              >
                <Mic size={20} className="text-gray-400" />
                <span>Explain quantum physics in simple terms.</span>
              </button>
              <button
                className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg text-left transition-colors flex items-center gap-3"
                onClick={() => setInput("Help me debug this React component.")}
              >
                <Send size={20} className="text-gray-400" />
                <span>Help me debug this React component.</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {renderMessageContent(msg)}
              </div>
            ))}
          

            {/* THIS IS THE LOADING EFFECT SECTION: */}
            {isTyping && displayedAIText && (
              <div className="flex justify-start">
                <div className="bg-gray-800 p-3 rounded-lg text-gray-100 max-w-[80%] flex items-center gap-2">
                  <span>
                    <ReactMarkdown>{displayedAIText}</ReactMarkdown>
                  </span>
                  <span className="gemini-dots">
                    <span className="dot dot-1"></span>
                    <span className="dot dot-2"></span>
                    <span className="dot dot-3"></span>
                  </span>
                </div>
              </div>
            )}
            {isTyping && !displayedAIText && (
              <div className="flex justify-start">
                <div className="bg-gray-800 p-3 rounded-lg text-gray-400 text-sm italic flex items-center gap-2">
                  <span>AI is thinking</span>
                  <div className="gemini-dots">
                    <span className="dot dot-1"></span>
                    <span className="dot dot-2"></span>
                    <span className="dot dot-3"></span>
                  </div>
                </div>
              </div>
            )}
            {/* END OF LOADING EFFECT SECTION */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-950 border-t border-gray-800">
        <div className="relative flex items-center max-w-3xl mx-auto bg-gray-800 rounded-full pr-2">
          <textarea
            className="flex-1 p-3 pl-5 bg-transparent text-white placeholder-gray-400 resize-none outline-none focus:ring-0 overflow-hidden"
            rows={1}
            placeholder="Message Gemini..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            style={{ maxHeight: "150px" }}
          />
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <ImageIcon size={20} className="text-gray-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <Mic size={20} className="text-gray-400" />
          </button>
          <button
            onClick={handleSendMessage}
            className={`p-2 ml-2 rounded-full ${
              input.trim()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-700 cursor-not-allowed"
            } transition-colors`}
            disabled={!input.trim()}
          >
            <Send size={20} className="text-white" />
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          Gemini may display inaccurate info, including about people, so
          double-check its responses. Your privacy & Gemini
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-950 to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}
