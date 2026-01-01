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
        sender: "bot",
        type: "text",
        text: "Here are some popular AI image tools:"
      },
      {
        sender: "bot",
        type: "tools",
        tools: [
          {
            name: "DALL·E",
            desc: "Text to image generation",
            url: "https://openai.com/dall-e"
          },
          {
            name: "Midjourney",
            desc: "High quality AI artwork",
            url: "https://www.midjourney.com"
          },
          {
            name: "Stable Diffusion",
            desc: "Open-source image generation",
            url: "https://stability.ai"
          }
        ]
      }
    ]);
  } else {
    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        type: "text",
        text: "Ask me about image, coding, or design tools."
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
