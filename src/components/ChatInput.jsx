import { useState } from "react";

function ChatInput({ messages, setMessages }) {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { text: input, sender: "user" },
      { text: "I am learning 🤖. More features coming soon!", sender: "bot" }
    ]);

    setInput("");
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Ask me something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>➤</button>
    </div>
  );
}

export default ChatInput;

