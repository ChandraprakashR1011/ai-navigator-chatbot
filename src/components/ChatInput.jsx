import { useState } from "react";

/* ================= AI TOOLS ================= */

const AI_TOOLS = {
  photo: [
    {
      name: "Adobe Photoshop AI",
      desc: "AI-powered photo editing",
      url: "https://www.adobe.com/products/photoshop.html",
    },
    {
      name: "Canva AI",
      desc: "Easy photo & design editing",
      url: "https://www.canva.com",
    },
    {
      name: "Fotor AI",
      desc: "Online AI photo editor",
      url: "https://www.fotor.com",
    },
  ],

  design: [
    {
      name: "Figma AI",
      desc: "AI-assisted UI/UX design",
      url: "https://www.figma.com",
    },
    {
      name: "Uizard",
      desc: "Design from text",
      url: "https://uizard.io",
    },
    {
      name: "Canva",
      desc: "Quick AI designs",
      url: "https://www.canva.com",
    },
  ],

  coding: [
    {
      name: "ChatGPT",
      desc: "AI coding assistant",
      url: "https://chat.openai.com",
    },
    {
      name: "GitHub Copilot",
      desc: "AI pair programmer",
      url: "https://github.com/features/copilot",
    },
    {
      name: "Codeium",
      desc: "Free AI code completion",
      url: "https://codeium.com",
    },
  ],

  learning: [
    {
      name: "DeepLearning.AI",
      desc: "AI notes & learning",
      url: "https://www.deeplearning.ai",
    },
    {
      name: "GeeksforGeeks AI",
      desc: "AI tutorials & notes",
      url: "https://www.geeksforgeeks.org/artificial-intelligence",
    },
    {
      name: "Coursera AI",
      desc: "AI courses & content",
      url: "https://www.coursera.org",
    },
  ],
};

/* ================= INTENT & RESPONSE ================= */

const INTENT_KEYWORDS = {
  photo: ["photo", "image", "edit", "editing", "background", "enhance"],
  design: ["design", "ui", "ux", "poster", "logo", "banner"],
  coding: ["code", "coding", "program", "java", "react", "debug"],
  learning: ["learn", "study", "notes", "summary", "explain", "content"],
};

const INTENT_TO_FUNCTION = {
  photo: "edit",
  design: "create",
  coding: "build",
  learning: "analyze",
};

const AI_RESPONSES = {
  edit: {
    intro: "I understand that you want to edit or improve media.",
    explain:
      "AI tools can enhance images, remove backgrounds, and improve overall quality quickly.",
  },
  create: {
    intro: "It looks like you want to create something visual.",
    explain:
      "AI design tools can help generate posters, logos, UI layouts, and creative visuals.",
  },
  build: {
    intro: "You’re working on a coding or development task.",
    explain:
      "AI coding assistants can generate code, fix bugs, and explain logic step by step.",
  },
  analyze: {
    intro: "You’re trying to learn or understand something.",
    explain:
      "AI learning tools can explain concepts clearly and generate structured notes.",
  },
};

/* ================= HELPERS ================= */

// MULTI-INTENT DETECTION
function detectIntents(text) {
  const foundIntents = [];

  Object.keys(INTENT_KEYWORDS).forEach((intent) => {
    INTENT_KEYWORDS[intent].forEach((word) => {
      if (text.includes(word) && !foundIntents.includes(intent)) {
        foundIntents.push(intent);
      }
    });
  });

  return foundIntents; // returns array
}

function mapToFunction(intent) {
  return INTENT_TO_FUNCTION[intent] || "analyze";
}

/* ================= COMPONENT ================= */

function ChatInput({ messages, setMessages }) {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lastIntent, setLastIntent] = useState(null); // context memory

  const sendMessage = () => {
    if (!input.trim()) return;

    // show user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    const userText = input;
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const text = userText.toLowerCase();

      // 1️⃣ detect multiple intents
      let intents = detectIntents(text);

      // 2️⃣ use previous intent if nothing detected
      if (intents.length === 0 && lastIntent) {
        intents = [lastIntent];
      }

      // 3️⃣ fallback
      if (intents.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "I couldn’t clearly understand your request.\n\n" +
              "You can try:\n" +
              "• Design a poster\n" +
              "• Edit a photo\n" +
              "• Help with Java code\n" +
              "• Create study notes",
          },
        ]);
        setTyping(false);
        return;
      }

      // 4️⃣ store last intent
      setLastIntent(intents[intents.length - 1]);

      // 5️⃣ respond for each intent (group handling)
      intents.forEach((intent) => {
        const aiFunction = mapToFunction(intent);
        const response = AI_RESPONSES[aiFunction];

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              response.intro +
              "\n\n" +
              response.explain +
              `\n\nHere are AI tools related to **${intent}** 👇`,
          },
          {
            sender: "bot",
            type: "tools",
            tools: AI_TOOLS[intent],
          },
        ]);
      });

      setTyping(false);
    }, 1000);
  };

  return (
    <>
      {typing && <div className="typing">AI is thinking...</div>}

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask me anything about AI tools..."
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </>
  );
}

export default ChatInput;
