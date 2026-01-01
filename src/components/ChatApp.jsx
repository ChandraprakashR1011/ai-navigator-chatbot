import { useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

function ChatApp() {
  const [messages, setMessages] = useState([
    { text: "Hi! I’m your AI Navigator ", sender: "bot" }
  ]);

  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "app-bg dark" : "app-bg light"}>
      <div className="chat-card">
        <div className="chat-header">
          🤖 AI Navigator
          <button onClick={() => setDark(!dark)} className="toggle">
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        <ChatMessages messages={messages} />
        <ChatInput messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}

export default ChatApp;
