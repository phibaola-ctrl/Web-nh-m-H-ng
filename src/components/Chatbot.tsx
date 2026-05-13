import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Minus, Sparkles, MessageCircle, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const Chatbot: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load chat history from local storage
    const savedChat = localStorage.getItem('plantripgo_chat_history');
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    } else {
      // Add welcome message
      const welcome: Message = {
        id: 'welcome',
        role: 'bot',
        text: t('chatbot.welcome'),
        timestamp: new Date().toISOString(),
      };
      setMessages([welcome]);
    }
  }, [t]);

  useEffect(() => {
    // Save chat history
    if (messages.length > 0) {
      localStorage.setItem('plantripgo_chat_history', JSON.stringify(messages));
    }
    // Scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClearChat = () => {
    localStorage.removeItem('plantripgo_chat_history');
    const welcome: Message = {
      id: 'welcome-' + Date.now(),
      role: 'bot',
      text: t('chatbot.welcome'),
      timestamp: new Date().toISOString(),
    };
    setMessages([welcome]);
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (textOverride?: string) => {
    const text = textOverride || inputValue.trim();
    if (!text) return;

    if (!textOverride) setInputValue('');
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
      
      const systemInstruction = `
        You are the official AI Concierge for PLANTRIPGO, a luxury AI Travel Planner.
        Your tone: Professional, sophisticated, helpful, and slightly "artisan".
        
        Website Context:
        - PLANTRIPGO creates bespoke 7-day itineraries (default) using AI.
        - Features: "Artisan Logic" (cultural depth), "Minimal Transit" (efficient routes), "Heritage Export" (beautiful PDFs).
        - Views: Landing (Intro), Setup (Preferences), Result (The Itinerary), Saved (Collection).
        - Creator: PHI LEGEND.
        - Support: contact support@plantripgo.com.
        - Tech: Powered by Gemini.
        
        Rules:
        - Keep answers concise.
        - If you don't know something about the specific UI, tell them it's a minimal luxury interface designed for PlanTripGo.
        - Answer in ${i18n.language === 'vi' ? 'Vietnamese' : 'English'}.
      `;

      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history.map(item => ({ role: item.role, parts: item.parts })),
          { role: 'user', parts: [{ text }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: response.text || t('chatbot.fallback'),
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: t('chatbot.fallback'),
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-luxury-ivory rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto border border-luxury-beige/20"
          >
            {/* Header */}
            <div className="bg-luxury-espresso p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-luxury-gold flex items-center justify-center">
                  <Sparkles size={16} className="text-luxury-espresso" />
                </div>
                <div>
                  <h3 className="text-luxury-ivory font-serif font-bold text-sm leading-none tracking-wide">{t('chatbot.title')}</h3>
                  <p className="text-luxury-gold/80 text-[9px] font-bold uppercase tracking-widest mt-1">PLANTRIPGO Edition</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleClearChat}
                  title={t('chatbot.clearChat')}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-luxury-ivory/60 hover:text-luxury-ivory"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-luxury-ivory/60 hover:text-luxury-ivory"
                >
                  <Minus size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-luxury-ivory/60 hover:text-luxury-ivory"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-luxury-bg/30 scrollbar-thin"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-luxury-espresso text-luxury-ivory rounded-tr-none' 
                      : 'bg-luxury-beige/10 text-luxury-espresso border border-luxury-beige/20 shadow-sm rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-luxury-beige/20 shadow-sm">
                    <div className="flex gap-1">
                      <motion.div 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                        className="w-1.5 h-1.5 bg-luxury-espresso/30 rounded-full" 
                      />
                      <motion.div 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                        className="w-1.5 h-1.5 bg-luxury-espresso/30 rounded-full" 
                      />
                      <motion.div 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                        className="w-1.5 h-1.5 bg-luxury-espresso/30 rounded-full" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Predefined Questions */}
            {messages.length === 1 && (
              <div className="p-4 pt-0 bg-luxury-bg/30 overflow-x-auto">
                <div className="flex gap-2 pb-2">
                  {[t('chatbot.faq1'), t('chatbot.faq2'), t('chatbot.faq3')].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(q)}
                      className="whitespace-nowrap px-3 py-1.5 bg-luxury-ivory border border-luxury-beige/30 rounded-full text-[10px] font-bold text-luxury-espresso/60 hover:bg-luxury-espresso hover:text-luxury-ivory hover:border-luxury-espresso transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-luxury-ivory border-t border-luxury-beige/10">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('chatbot.placeholder')}
                  className="w-full bg-luxury-bg/50 border border-luxury-beige/30 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-luxury-espresso transition-colors placeholder:text-luxury-cacao/40"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-luxury-espresso/40 hover:text-luxury-espresso disabled:opacity-30 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-luxury-espresso rounded-full shadow-2xl flex items-center justify-center text-white pointer-events-auto group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-luxury-gold opacity-0 group-hover:opacity-10 transition-opacity" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageCircle size={24} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-luxury-gold border-2 border-luxury-espresso rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default Chatbot;
