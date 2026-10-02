import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { enquiryAPI } from '../services/api';
import toast from 'react-hot-toast';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: 'Hello! Welcome to EstateHub. I am your 24/7 AI Concierge. How can I help you find your dream home or schedule a site visit today?',
    time: 'Just now',
  },
];

const SUGGESTIONS = [
  'Featured properties in Mumbai',
  'How to book a site visit?',
  'Calculate my home loan EMI',
  'Speak with a verified agent',
];

const LiveChatWidget = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Save lead in backend
    try {
      enquiryAPI.create({
        name: user?.name || 'Chat Visitor',
        email: user?.email || 'chat.visitor@realestate.com',
        phone: user?.phone || '+91 99999 00000',
        message: `[Live Chat]: ${text}`,
      });
    } catch (_) {}

    // Simulated intelligent response
    setTimeout(() => {
      let botReply = "Thank you! I've noted your request. Our premier property specialist will connect with you shortly.";
      const lower = text.toLowerCase();

      if (lower.includes('mumbai') || lower.includes('flat') || lower.includes('penthouse')) {
        botReply = "We have breathtaking luxury residences in Worli, Bandra West, and Marine Drive! Check out our Properties page to filter by Mumbai sea views.";
      } else if (lower.includes('visit') || lower.includes('book')) {
        botReply = "You can schedule an in-person site visit or virtual 3D tour on any property detail page using the 'Book Site Visit' button!";
      } else if (lower.includes('emi') || lower.includes('loan') || lower.includes('calculator')) {
        botReply = "Our integrated EMI Calculator lets you customize down payment, loan tenure, and interest rates with real-time payment breakdown!";
      } else if (lower.includes('agent') || lower.includes('speak') || lower.includes('call')) {
        botReply = "All our agents are RERA-certified. Check our Agents page to view direct WhatsApp contacts, ratings, and track records!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 transition-all hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        <span className="sr-only">Live Chat</span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
          </span>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  EstateHub AI Concierge
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h4>
                <p className="text-[11px] text-slate-400">Instant answers & booking assistance</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-900/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-md'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-500'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-slate-400">
                <div className="w-7 h-7 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-800 px-3 py-2 rounded-xl border border-slate-700/60 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-slate-950/40 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {SUGGESTIONS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="shrink-0 px-2.5 py-1 bg-slate-800 hover:bg-emerald-950/50 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-500/40 rounded-full text-slate-300 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about properties..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LiveChatWidget;
