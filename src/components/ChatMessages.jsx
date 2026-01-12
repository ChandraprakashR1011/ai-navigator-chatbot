import { useEffect, useRef } from "react";
import botAvatar from "../assets/robot.png";
import userAvatar from "../assets/user.png";

function ChatMessages({ messages }) {
  const bottomRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-messages">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.sender} fade-in`}
        >

          {/* BOT AVATAR (LEFT) */}
          {msg.sender === "bot" && (
            <span className="avatar">
              <img className="avatarpng" src={botAvatar} alt="Bot Avatar" />
            </span>
          )}

          {/* MESSAGE TEXT */}
          {msg.text && (
            <div className="text">
              {msg.text}
            </div>
          )}

          {/* TOOL SUGGESTION CARDS */}
          {msg.type === "tools" && (
            <div className="tool-cards">
              {msg.tools.map((tool, i) => (
                <a
                  key={i}
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  className="tool-card"
                >
                  <div className="tool-name">{tool.name}</div>
                  <div className="tool-desc">{tool.desc}</div>
                </a>
              ))}
            </div>
          )}

          {/* USER AVATAR (RIGHT) */}
          {msg.sender === "user" && (
            <span className="avatar">
              <img className="avatarpng" src={userAvatar} alt="User Avatar" />
            </span>
          )}

        </div>
      ))}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatMessages;
