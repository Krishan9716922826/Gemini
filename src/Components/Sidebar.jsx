
import { useState } from "react";
import {
  MessageSquarePlus,
  Settings,
  HelpCircle,
  Activity,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Trash2,
} from "lucide-react";

// The Sidebar now receives props 
export default function Sidebar({ recentChats, onNewChatClick, onChatSelect, onDeleteChat }) {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredChatId, setHoveredChatId] = useState(null);

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-72"
      } h-screen bg-gray-900 text-white flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 flex-shrink-0">
        {!collapsed && <h1 className="text-xl font-bold">Gemini</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
        >
          {collapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </button>
      </div>

      {/* New Chat Button */}
      <div className="px-4 py-2 flex-shrink-0">
        <button
          onClick={onNewChatClick} // Call the prop function
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 justify-center transition-colors"
        >
          <MessageSquarePlus size={18} />
          {!collapsed && "New Chat"}
        </button>
      </div>

      {/* Recent Chats Header */}
      {!collapsed && recentChats.length > 0 && (
        <h2 className="text-sm text-gray-400 mt-4 mb-2 px-4">Recent</h2>
      )}

      {/* Scrollable Recent Chats */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-1 pb-2">
          {recentChats.length > 0 ? (
            recentChats.map((chat) => (
              <div
                key={chat.id}
                className="relative flex items-center w-full"
                onMouseEnter={() => setHoveredChatId(chat.id)}
                onMouseLeave={() => setHoveredChatId(null)}
              >
                <button
                  className="flex items-center gap-2 text-sm px-4 py-1 w-full text-left hover:bg-gray-800 rounded-md truncate transition-colors"
                  title={chat.title}
                  onClick={() => onChatSelect(chat.id)} // Call the prop function
                >
                  <Clock size={16} />
                  {!collapsed && <span className="truncate">{chat.title}</span>}
                </button>

                {!collapsed && hoveredChatId === chat.id && (
                  <div className="absolute right-0 top-0 bottom-0 flex items-center bg-gray-800 rounded-md pr-2 pl-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); onDeleteChat(chat.id); }} // Call prop function
                      className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                      title="Delete chat"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            !collapsed && (
              <p className="text-gray-500 text-sm px-4 py-2 text-center">
                No recent chats. Start a new one!
              </p>
            )
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-1 px-2 py-4 flex-shrink-0 border-t border-gray-700">
        <SidebarItem
          icon={<Settings size={20} />}
          label="Settings"
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<HelpCircle size={20} />}
          label="Help"
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Activity size={20} />}
          label="Activity"
          collapsed={collapsed}
        />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, collapsed }) {
  return (
    <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 w-full text-sm rounded-md transition-colors">
      {icon}
      {!collapsed && <span>{label}</span>}
    </button>
  );
}
