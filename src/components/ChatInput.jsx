import { useState } from "react";

function ChatInput({ messages, setMessages }) {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages(prev => [
      ...prev,
      { text: input, sender: "user" }
    ]);

    setInput("");
    setTyping(true);

setTimeout(() => {
  const userText = input.toLowerCase();

  if (userText.includes("image")) {
    setMessages(prev => [
      ...prev,
      {
        text: " Here are popular AI Image tools:",
        sender: "bot"
      },
      {
        text: "• DALL·E\n• Midjourney\n• Stable Diffusion",
        sender: "bot"
      }
    ]);
  } 
  else if (userText.includes("coding")) {
    setMessages(prev => [
      ...prev,
      {
        text: " Coding AI tools you can try:",
        sender: "bot"
      },
      {
        text: "• ChatGPT\n• GitHub Copilot\n• Codeium",
        sender: "bot"
      }
    ]);
  } 
  else {
    setMessages(prev => [
      ...prev,
      {
        text: " I can help you navigate AI tools. Try asking about image, coding, or design.",
        sender: "bot"
      }
    ]);
  }

  setTyping(false);
}, 1200);

  };

  return (
    <>
      {typing && <div className="typing"> Bot is typing...</div>}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask me something..."
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </>
  );
}

export default ChatInput;
