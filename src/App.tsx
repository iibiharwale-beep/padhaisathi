import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Mic, Send, History, Settings, 
  LogOut, Search, Book, PenTool, Award,
  ChevronRight, Brain, Sparkles, Clock, Play, Pause, RotateCcw, Download, Home, FileText
} from 'lucide-react';

// --- Types ---
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// --- Components ---

const Dashboard = () => (
  <div className="p-8 space-y-8 animate-in fade-in duration-500">
    <div className="flex justify-between items-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Hello, Learner! 👋</h2>
        <p className="text-slate-500 mt-2 text-lg">Your target: <span className="text-indigo-600 font-semibold">UPSC Civil Services</span></p>
      </div>
      <div className="flex gap-4">
        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-center min-w-[120px]">
          <h3 className="text-orange-600 font-bold text-2xl flex justify-center items-center gap-2"><Award size={24}/> 12</h3>
          <p className="text-orange-800 text-sm font-medium">Day Streak</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-center min-w-[120px]">
          <h3 className="text-yellow-600 font-bold text-2xl flex justify-center items-center gap-2"><Sparkles size={24}/> 450</h3>
          <p className="text-yellow-800 text-sm font-medium">Coins Earned</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg"><Search size={24} /></div>
          <h3 className="text-xl font-bold text-slate-800">Smart Search</h3>
        </div>
        <p className="text-slate-500 mb-4">Search your entire syllabus and get AI-verified answers instantly.</p>
        <div className="flex gap-2">
          <input type="text" placeholder="e.g. Fundamental Rights Article 14" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <button className="bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 transition"><Search size={20}/></button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-md text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-lg"><PenTool size={24} /></div>
          <h3 className="text-xl font-bold">Daily Quiz</h3>
        </div>
        <p className="text-indigo-100 mb-6">Test your knowledge with 10 fresh questions everyday.</p>
        <button className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:scale-105 transition w-full">Take Today's Quiz</button>
      </div>
    </div>
  </div>
);

const FocusTools = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      alert('Pomodoro Session Complete! Take a break.');
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => { setIsRunning(false); setTimeLeft(25 * 60); };
  
  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in">
      <div className="bg-white p-12 rounded-3xl shadow-lg border border-slate-100 text-center max-w-md w-full">
        <div className="flex justify-center mb-6 text-indigo-600"><Clock size={48} /></div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Pomodoro Timer</h2>
        <p className="text-slate-500 mb-8">Deep work session</p>
        
        <div className="text-7xl font-bold text-slate-800 mb-10 font-mono tracking-tight">
          {mins}:{secs}
        </div>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all ${isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isRunning ? <><Pause size={20}/> Pause</> : <><Play size={20}/> Start</>}
          </button>
          <button 
            onClick={resetTimer}
            className="flex items-center gap-2 px-6 py-4 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
          >
            <RotateCcw size={20}/> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const MockTests = () => (
  <div className="p-8 space-y-6 animate-in fade-in">
    <h2 className="text-3xl font-bold text-slate-800 mb-6">Mock Tests</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {['UPSC Prelims 2023 CSAT', 'UPSC Prelims 2022 GS Paper 1', 'UPSC Mains Essay 2021', 'Current Affairs March 2026'].map((test, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="text-indigo-600 mb-4"><FileText size={32} /></div>
          <h3 className="font-bold text-lg text-slate-800 mb-2">{test}</h3>
          <p className="text-slate-500 text-sm mb-4">Duration: 2 Hours • 100 Questions</p>
          <button className="flex items-center justify-center gap-2 w-full bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition font-medium">
            <Download size={16} /> Download PDF
          </button>
        </div>
      ))}
    </div>
  </div>
);

const StudyMaterial = () => (
  <div className="p-8 space-y-6 animate-in fade-in">
    <h2 className="text-3xl font-bold text-slate-800 mb-6">Study Material</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {['NCERT History Class 11', 'Indian Polity by M. Laxmikanth', 'Geography NCERT Class 12', 'Economy Notes 2026'].map((book, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="text-green-600 mb-4"><Book size={32} /></div>
          <h3 className="font-bold text-lg text-slate-800 mb-2">{book}</h3>
          <p className="text-slate-500 text-sm mb-4">PDF Format • Full Version</p>
          <button className="flex items-center justify-center gap-2 w-full bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition font-medium">
            <BookOpen size={16} /> Read Now
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
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

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'focus': return <FocusTools />;
      case 'tests': return <MockTests />;
      case 'material': return <StudyMaterial />;
      case 'study':
      default:
        return (
          <div className="flex flex-col h-full">
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
            <div className="p-6 bg-transparent border-t border-slate-100">
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
                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-slate-800 p-2"
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
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <nav className="w-64 bg-white border-r border-slate-200 flex flex-col z-10">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-800">PadhaiSathi</span>
        </div>

        <div className="flex-1 px-4 space-y-2 overflow-y-auto py-4">
          {[
            { id: 'dashboard', icon: Home, label: 'Dashboard' },
            { id: 'study', icon: Brain, label: 'AI Chat Tutor' },
            { id: 'focus', icon: Clock, label: 'Focus Timer' },
            { id: 'tests', icon: PenTool, label: 'Mock Tests' },
            { id: 'material', icon: Book, label: 'Study Material' },
            { id: 'history', icon: History, label: 'My Progress' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
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
      <main className="flex-1 flex flex-col relative bg-slate-50/50">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-2 text-slate-500">
            <span>Home</span>
            <ChevronRight size={16} />
            <span className="text-indigo-600 font-semibold capitalize">{activeTab.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition"><Search size={20} /></button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-sm" />
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto relative">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
