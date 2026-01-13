import { useEffect, useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

function ChatApp() {
  const [messages, setMessages] = useState([
    { text: "Hi! I’m your AI Toolbox", sender: "bot" }
  ]);

  const [dark, setDark] = useState(true);

  // ⭐ APPLY THEME TO BODY (IMPORTANT)
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="app-bg">
      <div className="chat-card">
        <div className="chat-header">
          AI Toolbox
          <button onClick={() => setDark(!dark)} className="toggle">
            {dark ? "🔅" : "🌙"}
          </button>
        </div>

        <ChatMessages messages={messages} />
        <ChatInput messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}

export default ChatApp;
