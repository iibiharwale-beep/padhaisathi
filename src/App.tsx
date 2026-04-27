import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Mic, Send, History, Settings, 
  LogOut, Search, Book, PenTool, Award,
  ChevronRight, Brain, Sparkles
} from 'lucide-react';

// --- Types ---
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

function App() {
  const [activeTab, setActiveTab] = useState('study');
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "नमस्ते! मैं आपका पढ़ाई साथी AI हूँ। आज आप क्या पढ़ना चाहेंगे?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMsg]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiRes: Message = {
        id: (Date.now() + 1).toString(),
        text: "यह एक बेहतरीन सवाल है! मैं इस पर रिसर्च कर रहा हूँ...",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiRes]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <nav className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-800">PadhaiSathi</span>
        </div>

        <div className="flex-1 px-4 space-y-2">
          {[
            { id: 'study', icon: Brain, label: 'AI Study' },
            { id: 'tests', icon: PenTool, label: 'Mock Tests' },
            { id: 'history', icon: History, label: 'My Progress' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 text-slate-500 hover:text-red-500 transition-colors w-full px-4 py-2">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-slate-500">
            <span>Dashboard</span>
            <ChevronRight size={16} />
            <span className="text-slate-900 font-medium capitalize">{activeTab}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-indigo-600"><Search size={20} /></button>
            <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200" />
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                  m.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                  <p>{m.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-transparent">
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 flex items-center gap-2">
              <button 
                onClick={() => setIsRecording(!isRecording)}
                className={`p-3 rounded-xl transition-all ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'hover:bg-slate-100 text-slate-400'}`}
              >
                <Mic size={24} />
              </button>
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="अपना सवाल यहाँ लिखें..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 p-2"
              />
              <button 
                onClick={handleSend}
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-all shadow-lg shadow-indigo-200"
              >
                <Send size={24} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
