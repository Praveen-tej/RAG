import { useState } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import { sendMessage } from "../api";

interface Message {
  role: "user" | "ai";
  content: string;
}

function ChatPage() {
  const [message, setMessage] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input) return;
    setMessage((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);
    const response = await sendMessage(input);
    console.log(response);
    setMessage((prev) => [...prev, { role: "ai", content: response.answer }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />

      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <button className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">
          Logout
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
        {message.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 max-w-2xl ${msg.role === "user" ? "self-end flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm shrink-0 ${msg.role === "user" ? "bg-cyan-600" : "bg-violet-600"}`}
            >
              {msg.role === "user" ? "U" : "AI"}
            </div>
            <div
              className={`rounded-2xl px-4 py-3 text-gray-200 ${msg.role === "user" ? "bg-violet-600/30 border border-violet-500/20 rounded-tr-none" : "bg-white/5 border border-white/10 rounded-tl-none"}`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 max-w-2xl">
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm shrink-0">
              AI
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 text-gray-400">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 px-6 py-4 flex gap-3">
        <input
          type="text"
          placeholder="Ask a question about your document..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-violet-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 rounded-lg transition-colors"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
