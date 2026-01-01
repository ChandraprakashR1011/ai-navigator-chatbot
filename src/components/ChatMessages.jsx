import { useEffect, useRef } from "react";

function ChatMessages({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-messages">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.sender}`}
        >
        {msg.sender === "bot" && (
        <span className="avatar">🤖</span>
        )}
        <span className="text">{msg.text}</span>

        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
}

export default ChatMessages;
