import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

function ChatApp() {
  const [messages, setMessages] = useState([
    { text: "Hello! 👋 I am your AI Navigator.", sender: "bot" }
  ]);

  return (
    <div className="app-bg">
      <div className="chat-card">
        <div className="chat-header">🤖 AI Navigator</div>
        <ChatMessages messages={messages} />
        <ChatInput messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}

export default ChatApp;
