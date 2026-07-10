import React, { useState, useRef, useEffect, FormEvent } from "react";
import { MessageCircle, X, Send, Leaf, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Aloha! I'm Coco, your virtual Dulce de Coco assistant. Ask me anything about our dairy-free coconut condensed milk, Davenport shop hours, recipe ideas, or allergies! 🥥✨",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages list or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsgText = input.trim();
    setInput("");

    // Add user message to state
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userMsgText,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Map entire history for the backend to remember conversation context
      const chatHistoryForBackend = messages.map(msg => ({
        sender: msg.sender,
        text: msg.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMsgText,
          history: chatHistoryForBackend
        })
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Coco");
      }

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.reply || "I didn't quite catch that. Could you ask again, or email gabrielabmgm29@gmail.com?",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text: "My apologies, my signal to the coconut palms is a bit weak! Please feel free to call our Davenport team at 863-360-6088 or try again in a moment.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="ai-chatbot-widget">
      {/* Floating Button Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center p-4 bg-[#4B5D41] hover:bg-[#3D2B1F] text-white rounded-full shadow-2xl border border-[#F9F7F2] cursor-pointer relative group"
            aria-label="Open chat with Coco"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#3D2B1F] text-[#F9F7F2] text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
              Chat with Coco! 🥥
            </span>
            {/* Soft pulsing halo */}
            <span className="absolute inset-0 rounded-full bg-[#4B5D41]/30 animate-ping -z-10"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="bg-[#F9F7F2] w-[340px] sm:w-[380px] h-[500px] rounded-3xl shadow-2xl border border-[#F0ECE4] flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-[#4B5D41] p-4 text-white flex items-center justify-between border-b border-[#3D2B1F]">
              <div className="flex items-center space-x-3">
                <span className="p-1.5 bg-[#F9F7F2]/20 rounded-full">
                  <Leaf className="h-4.5 w-4.5 text-[#E8E2D6]" />
                </span>
                <div>
                  <h3 className="font-serif font-bold text-sm tracking-wide">Chat with Coco</h3>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] text-[#E8E2D6] uppercase tracking-wider font-semibold">Online | Davenport, FL</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white"
                  title="Minimize"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Body (Message Log) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F9F7F2]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-[#4B5D41] text-[#F9F7F2] rounded-tr-none"
                        : "bg-[#E8E2D6]/70 text-[#3D2B1F] rounded-tl-none border border-[#F0ECE4]"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span
                      className={`text-[9px] mt-1 block text-right ${
                        msg.sender === "user" ? "text-[#E8E2D6]/70" : "text-[#7C8D6C]"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#E8E2D6]/50 border border-[#F0ECE4] rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4B5D41] animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4B5D41] animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4B5D41] animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Footer / Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-[#E8E2D6]/20 border-t border-[#F0ECE4] flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Coco a question..."
                className="flex-1 bg-[#F9F7F2] border border-[#F0ECE4] rounded-xl px-3.5 py-2 text-sm text-[#3D2B1F] focus:outline-none focus:ring-1 focus:ring-[#4B5D41] placeholder:text-[#7C8D6C]/60 shadow-inner"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 bg-[#4B5D41] hover:bg-[#3D2B1F] disabled:opacity-50 text-white rounded-xl transition-all cursor-pointer shadow-md"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
