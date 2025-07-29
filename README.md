# Gemini Chat App

A modern chat application built with **React**, **Vite**, and **Tailwind CSS**.  
It features a sidebar for recent chats, a main chat interface, and integrates with Google Gemini AI via a Node.js backend.

---

## Features

- Responsive sidebar with collapsible mode
- Recent chats management (add, select, delete)
- Main chat area with AI-powered responses
- Styled with Tailwind CSS
- Custom scrollbars
- Backend integration with Google Gemini API

---

## Project Structure

```
├── backend/                # Node.js Express backend for Gemini API
│   ├── .env                # Gemini API key
│   ├── package.json
│   └── server.js
├── public/                 # Static assets
├── src/                    # Frontend source code
│   ├── App.jsx             # Main app component
│   ├── index.css           # Tailwind and custom styles
│   ├── main.jsx            # Entry point
│   ├── Components/
│   │   ├── Sidebar.jsx     # Sidebar UI
│   │   └── MainContent.jsx # Main chat UI
│   └── assets/             # Images/icons
├── index.html              # HTML template
├── package.json            # Project metadata and scripts
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js          # Vite configuration
└── postcss.config.js       # PostCSS configuration
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd gemini
   ```

2. **Install frontend dependencies:**

   ```sh
   npm install
   ```

3. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   cd ..
   ```

---

## Running the App

### Start the Backend

1. Add your Gemini API key to `backend/.env`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
2. Start the backend server:
   ```sh
   cd backend
   node server.js
   ```

### Start the Frontend

In the project root:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Customization

- **Tailwind CSS:** Edit [`tailwind.config.js`](tailwind.config.js) and [`src/index.css`](src/index.css) for custom styles.
- **Sidebar & Main Content:** Modify [`src/Components/Sidebar.jsx`](src/Components/Sidebar.jsx) and [`src/Components/MainContent.jsx`](src/Components/MainContent.jsx) for UI changes.
- **Backend:** Update [`backend/server.js`](backend/server.js) for API logic.

---

## License

MIT

---

## Credits

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)
- [Google Gemini API](https://ai.google.dev/)
