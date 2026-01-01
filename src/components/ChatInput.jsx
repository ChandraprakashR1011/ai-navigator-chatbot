import { useState } from "react";

const AI_TOOLS = {
  photo: [
    {
      name: "Adobe Photoshop AI",
      desc: "AI-powered photo editing",
      url: "https://www.adobe.com/products/photoshop.html"
    },
    {
      name: "Canva AI",
      desc: "Easy photo & design editing",
      url: "https://www.canva.com"
    },
    {
      name: "Fotor AI",
      desc: "Online AI photo editor",
      url: "https://www.fotor.com"
    }
  ],

  design: [
    {
      name: "Figma AI",
      desc: "AI-assisted UI/UX design",
      url: "https://www.figma.com"
    },
    {
      name: "Uizard",
      desc: "Design from text",
      url: "https://uizard.io"
    },
    {
      name: "Canva",
      desc: "Quick AI designs",
      url: "https://www.canva.com"
    }
  ],

  coding: [
    {
      name: "ChatGPT",
      desc: "AI coding assistant",
      url: "https://chat.openai.com"
    },
    {
      name: "GitHub Copilot",
      desc: "AI pair programmer",
      url: "https://github.com/features/copilot"
    },
    {
      name: "Codeium",
      desc: "Free AI code completion",
      url: "https://codeium.com"
    }
  ],

  learning: [
    {
      name: "DeepLearning.AI",
      desc: "AI notes & learning",
      url: "https://www.deeplearning.ai"
    },
    {
      name: "GeeksforGeeks AI",
      desc: "AI tutorials & notes",
      url: "https://www.geeksforgeeks.org/artificial-intelligence"
    },
    {
      name: "Coursera AI",
      desc: "AI courses & content",
      url: "https://www.coursera.org"
    }
  ]
};



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
  const text = input.toLowerCase();

  let tools = null;
  let title = "";

  if (text.includes("photo") || text.includes("image") || text.includes("editing")) {
    tools = AI_TOOLS.photo;
    title = "Here are some AI photo editing tools:";
  }
  else if (text.includes("design")) {
    tools = AI_TOOLS.design;
    title = "Here are some AI design tools:";
  }
  else if (text.includes("code") || text.includes("coding")) {
    tools = AI_TOOLS.coding;
    title = "Here are some AI coding tools:";
  }
  else if (text.includes("note") || text.includes("learn") || text.includes("study")) {
    tools = AI_TOOLS.learning;
    title = "Here are some AI learning & notes platforms:";
  }

  if (tools) {
    setMessages(prev => [
      ...prev,
      { sender: "bot", text: title },
      { sender: "bot", type: "tools", tools }
    ]);
  } else {
    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: "Tell me what you are looking for. Example: photo editing tools, design tools, coding AI, or AI notes."
      }
    ]);
  }

  setTyping(false);
}, 1000);


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
