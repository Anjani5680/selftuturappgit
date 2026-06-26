import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Volume2, Globe, FileText, Compass, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
}

interface AITutorChatProps {
  grade: number;
  subject: "Maths" | "Science";
  studentName: string;
}

export const AITutorChat: React.FC<AITutorChatProps> = ({ grade, subject, studentName }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: `Hi ${studentName}! 🌟 I am your AI Buddy Study Partner. I know all about Grade ${grade} ${subject}! What topic should we explore today? Tap any quick question below or type your doubt!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          grade: grade,
          subject: subject,
          history: messages.slice(-10), // Send last 10 messages for conversational context
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, { role: "model", content: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: `⚠️ Oops! ${data.error || "I ran into a small problem contacting the central classroom. Please try again!"}`,
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "⚠️ I couldn't reach the tutoring server. Make sure the development server is active or check your internet connection!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Preset question shortcuts
  const quickPrompts = [
    "Explain fractions with pizza 🍕",
    "Give me an easy math quiz",
    "Tell me a fun Science fact! ☄️",
    "Explain in Hindi (हिंदी)",
    "Give an easier example",
  ];

  // Speech synthesis for chat message
  const handleSpeakLastMessage = () => {
    const lastModelMsg = [...messages].reverse().find((m) => m.role === "model");
    if (!lastModelMsg) return;

    setIsSpeaking(true);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(lastModelMsg.content.replace(/\*+/g, ""));
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeaking(false), 4000);
    }
  };

  const handleStopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <div id="ai-tutor-chat-screen" className="max-w-3xl w-full mx-auto px-4 py-4 flex flex-col h-[82vh] justify-between">
      {/* Top Bar */}
      <div className="bg-white/90 backdrop-blur-xl border border-white p-4 rounded-3xl shadow-2xl flex items-center justify-between shrink-0 text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-purple-100 animate-pulse-glow">
            🤖
          </div>
          <div>
            <h3 className="text-sm font-display font-black text-slate-900">Chat with AI Buddy</h3>
            <p className="text-[10px] text-purple-600 font-extrabold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></span>
              Live Tutor Online · Grade {grade} Specialist
            </p>
          </div>
        </div>

        <button
          onClick={isSpeaking ? handleStopSpeaking : handleSpeakLastMessage}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
            isSpeaking
              ? "bg-rose-500 text-white border-rose-600 animate-pulse"
              : "bg-purple-50 border-purple-100 text-purple-600 hover:bg-purple-100"
          }`}
          title="Read last response aloud"
        >
          <Volume2 className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto py-4 px-1 space-y-4 my-2 text-left">
        {messages.map((msg, i) => {
          const isModel = msg.role === "model";
          return (
            <div key={i} className={`flex gap-3 max-w-[85%] ${isModel ? "mr-auto text-left" : "ml-auto flex-row-reverse text-right"}`}>
              {/* Avatar Icon */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-md ${
                isModel ? "bg-purple-100 text-purple-700 border border-purple-200" : "bg-gradient-to-tr from-purple-600 to-blue-600 text-white"
              }`}>
                {isModel ? "🤖" : "🎒"}
              </div>

              {/* Speech bubble */}
              <div className={`p-4 rounded-2xl text-xs sm:text-sm font-extrabold leading-relaxed whitespace-pre-line shadow-md border ${
                isModel
                  ? "bg-white/90 backdrop-blur-md text-slate-800 border-white"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none shadow-purple-100"
              }`}>
                {msg.content}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-[80%] mr-auto text-left">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg shrink-0 animate-pulse border border-purple-200">
              🤖
            </div>
            <div className="bg-white/90 backdrop-blur-md border border-white p-4 rounded-2xl flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-xs text-slate-400 font-display font-semibold pl-1">Buddy is typing study notes...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts Chips Selection */}
      <div className="shrink-0 flex gap-2 overflow-x-auto py-2 border-t border-slate-100/60 scrollbar-none text-left">
        {quickPrompts.map((p, idx) => (
          <button
            id={`btn-prompt-chip-${idx}`}
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="whitespace-nowrap text-[10px] font-display font-black bg-purple-50/50 hover:bg-purple-100 text-purple-600 border border-purple-100/30 px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Message Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-2.5 rounded-2xl shadow-xl flex items-center gap-2 shrink-0"
      >
        <input
          id="input-chat-box"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask anything about Grade ${grade} ${subject}...`}
          className="flex-1 bg-transparent border-none outline-none font-display font-bold text-xs sm:text-sm text-slate-800 px-3.5"
          disabled={isLoading}
        />
        <button
          id="btn-chat-send"
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white p-2.5 rounded-xl disabled:opacity-40 transition-all shadow-md shadow-purple-100 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
