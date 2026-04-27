import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Mic, Send, History, Settings, LogOut, Search, Book, PenTool, Award, ChevronRight, Brain, Sparkles, Clock, Play, Pause, RotateCcw, Download, Home, FileText,
  Map, Target, Zap, LayoutDashboard, Library, Layers, Video, Users, Bell, Newspaper, Image as ImageIcon, Flame, CheckCircle2, ShieldAlert
} from 'lucide-react';

interface Message { id: string; text: string; sender: 'user' | 'ai'; timestamp: Date; }

const Dashboard = () => (
  <div className="p-8 space-y-8 animate-in fade-in duration-500">
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10">
        <Target size={200} className="-mr-10 -mt-10" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">Skill Assessment Pending</span>
        </div>
        <h2 className="text-4xl font-bold mb-4">Welcome back, Learner! 👋</h2>
        <p className="text-indigo-100 text-lg mb-6 max-w-xl">Take a quick 5-minute skill assessment to get a highly personalized AI learning roadmap tailored for you.</p>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
          <Brain size={20} /> Start Assessment
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Map className="text-indigo-500"/> Today's Custom Roadmap</h3>
        <ul className="space-y-4">
          <li className="flex gap-3"><div className="mt-1 text-green-500"><CheckCircle2 size={20}/></div><div><p className="font-semibold text-slate-700 line-through">Polity: Fundamental Rights</p><p className="text-xs text-slate-400">Completed at 10:00 AM</p></div></li>
          <li className="flex gap-3"><div className="mt-1 text-indigo-500"><Clock size={20}/></div><div><p className="font-semibold text-slate-800">History: Revolt of 1857</p><p className="text-xs text-slate-500">Scheduled for 2:00 PM</p></div></li>
          <li className="flex gap-3"><div className="mt-1 text-slate-300"><Clock size={20}/></div><div><p className="font-semibold text-slate-500">Take Daily Mock Test</p><p className="text-xs text-slate-400">Pending</p></div></li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Flame className="text-orange-500"/> Gamification Stats</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <h4 className="text-orange-600 text-2xl font-bold">12</h4>
            <p className="text-orange-800 text-xs font-semibold">Day Streak</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 text-center">
            <h4 className="text-yellow-600 text-2xl font-bold">450</h4>
            <p className="text-yellow-800 text-xs font-semibold">Earned Coins</p>
          </div>
        </div>
        <p className="text-sm text-slate-500 text-center">Keep studying to unlock the "Master Scholar" badge!</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Award className="text-purple-500"/> Leaderboard</h3>
        <div className="space-y-3">
          {['Rahul Sharma', 'Sneha Patel', 'You'].map((name, i) => (
            <div key={i} className={`flex justify-between items-center p-3 rounded-lg ${name === 'You' ? 'bg-indigo-50 border border-indigo-100' : 'bg-slate-50'}`}>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-400">#{i+1}</span>
                <span className={`font-medium ${name === 'You' ? 'text-indigo-700' : 'text-slate-700'}`}>{name}</span>
              </div>
              <span className="text-sm font-bold text-slate-600">{1500 - (i*120)} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const StudyContentViewer = () => (
  <div className="p-8 space-y-8 animate-in fade-in bg-white m-8 rounded-3xl shadow-sm border border-slate-100">
    <div className="border-b border-slate-100 pb-6 mb-6">
      <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">UPSC Polity: Fundamental Rights</h1>
      <div className="flex gap-3 mt-4">
        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md text-sm font-bold">UPSC CSE</span>
        <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-sm font-bold">Polity</span>
        <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-md text-sm font-bold">Chapter 7</span>
      </div>
    </div>

    <div className="space-y-12">
      {/* 1. TOPIC NOTES */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6"><Book className="text-indigo-600"/> 1. Topic Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-lg mb-4 text-slate-800">💻 Computerized Version</h3>
            <ul className="space-y-2 text-slate-600 text-sm list-disc pl-4">
              <li><b>Part III</b> of the Constitution (Articles 12-35).</li>
              <li>Described as the <b>Magna Carta of India</b>.</li>
              <li>Justiciable in nature (Article 32 & 226).</li>
              <li>Not absolute but qualified (Subject to reasonable restrictions).</li>
              <li>Can be suspended during National Emergency (except Art 20 & 21).</li>
            </ul>
          </div>
          <div className="bg-yellow-50/50 p-6 rounded-2xl border border-yellow-200 shadow-inner">
            <h3 className="font-bold text-lg mb-4 text-slate-800 font-serif">✍️ Handmade Style Guide</h3>
            <div className="text-slate-700 font-serif space-y-4">
              <p><b>Mnemonic for Art 14-18 (Equality):</b><br/><span className="bg-yellow-200 px-1">"E-D-O-U-T"</span> (Equality, Discrimination, Opportunity, Untouchability, Titles)</p>
              <div className="border-l-4 border-slate-800 pl-4 py-2 my-2">
                <b>Flowchart: Suspension during Emergency</b><br/>
                National Emergency ➡️ Art 19 Suspended automatically (if war/external aggression) ➡️ Other FRs suspended by Prez order (except 20, 21).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHAPTER-WISE TEST */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6"><PenTool className="text-rose-500"/> 2. Chapter-wise Test (Mini)</h2>
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl p-4">
            <p className="font-bold text-slate-800 mb-2">Q1 (Medium): Which Article cannot be suspended even during a National Emergency?</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button className="bg-slate-50 p-2 rounded-lg text-left hover:bg-slate-100">A) Article 19</button>
              <button className="bg-emerald-50 border-emerald-200 border p-2 rounded-lg text-left font-bold text-emerald-800">B) Article 20 & 21 (✅ Correct)</button>
              <button className="bg-slate-50 p-2 rounded-lg text-left hover:bg-slate-100">C) Article 14</button>
              <button className="bg-slate-50 p-2 rounded-lg text-left hover:bg-slate-100">D) Article 32</button>
            </div>
            <p className="text-xs text-slate-500 mt-3"><b>Explanation:</b> 44th Amendment Act 1978 restricted the suspension of Article 20 and 21 during emergencies.</p>
          </div>
        </div>
      </section>

      {/* 3. TOPPER'S ADVICE */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6"><Award className="text-yellow-500"/> 3. Topper's Advice</h2>
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 text-white">
          <ul className="space-y-4">
            <li className="flex gap-3"><Flame className="text-orange-400 shrink-0"/> <span><b>Secret Tip 1:</b> Article 14, 19, 21 ko "Golden Triangle" bolte hain. Inko hamesha Supreme Court judgments ke sath link karke padho (e.g. Puttaswamy case).</span></li>
            <li className="flex gap-3"><Flame className="text-orange-400 shrink-0"/> <span><b>Secret Tip 2:</b> Ratta mat maaro! Exceptions par focus karo. UPSC humesha exceptions se sawal banata hai (Jaise Art 15(4) and 16(4)).</span></li>
            <li className="flex gap-3"><Flame className="text-orange-400 shrink-0"/> <span><b>Secret Tip 3:</b> Mains ke liye Fundamental Rights vs DPSP ka debate tip of the tongue par hona chahiye.</span></li>
          </ul>
        </div>
      </section>

      {/* 4. EXAM CONNECT */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6"><Target className="text-emerald-500"/> 4. Exam Connect</h2>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
          <p className="text-slate-700 mb-4"><b>Trend Analysis:</b> UPSC CSE Prelims mein har saal average <b>2-3 questions</b> Fundamental Rights se aate hi hain.</p>
          <div className="flex gap-2">
            <span className="bg-white px-3 py-1 rounded-md text-sm border border-emerald-200 font-semibold text-emerald-800">High Yielding Topic</span>
            <span className="bg-white px-3 py-1 rounded-md text-sm border border-emerald-200 font-semibold text-emerald-800">Conceptual + Factual</span>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const LibraryView = ({ setTab }: { setTab: (t: string) => void }) => (
  <div className="p-8 space-y-8 animate-in fade-in">
    <h2 className="text-3xl font-bold text-slate-800">Complete Study Library 📚</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div onClick={() => setTab('content')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer hover:border-indigo-300">
        <div className="text-blue-500 mb-4 bg-blue-50 w-12 h-12 flex items-center justify-center rounded-xl"><FileText size={24} /></div>
        <h3 className="font-bold text-lg text-slate-800">Handmade Notes</h3>
        <p className="text-slate-500 text-sm">Topper's handwritten PDFs</p>
      </div>
      <div onClick={() => setTab('content')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer hover:border-indigo-300">
        <div className="text-indigo-500 mb-4 bg-indigo-50 w-12 h-12 flex items-center justify-center rounded-xl"><Book size={24} /></div>
        <h3 className="font-bold text-lg text-slate-800">Computerized Notes</h3>
        <p className="text-slate-500 text-sm">Standard typed PDFs & NCERTs</p>
      </div>
      <div onClick={() => setTab('content')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer hover:border-indigo-300">
        <div className="text-rose-500 mb-4 bg-rose-50 w-12 h-12 flex items-center justify-center rounded-xl"><Newspaper size={24} /></div>
        <h3 className="font-bold text-lg text-slate-800">Daily Newspapers</h3>
        <p className="text-slate-500 text-sm">The Hindu, Indian Express</p>
      </div>
      <div onClick={() => setTab('content')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer hover:border-indigo-300">
        <div className="text-emerald-500 mb-4 bg-emerald-50 w-12 h-12 flex items-center justify-center rounded-xl"><Layers size={24} /></div>
        <h3 className="font-bold text-lg text-slate-800">All Subjects</h3>
        <p className="text-slate-500 text-sm">Topic-wise categorized content</p>
      </div>
    </div>
  </div>
);

const SmartRevision = () => (
  <div className="p-8 space-y-8 animate-in fade-in">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-slate-800">Smart Revision 🧠</h2>
      <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
        <ShieldAlert size={18}/> 3 Topics need revision today!
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Interactive Flashcards</h3>
        <p className="text-slate-500 mb-8">Master tough formulas and articles quickly.</p>
        <div className="w-full max-w-sm h-64 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:rotate-1 transition-transform relative preserve-3d">
          <h2 className="text-white text-2xl font-bold text-center px-4">Article 21 of the Constitution? <br/><span className="text-indigo-300 text-sm mt-4 block">(Tap to flip)</span></h2>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2"><ImageIcon className="text-purple-500"/> Concept Mind Maps</h3>
          <p className="text-slate-500 text-sm mb-4">Visual summaries of entire chapters.</p>
          <button className="w-full bg-purple-50 text-purple-700 py-3 rounded-xl font-bold hover:bg-purple-100 transition">View "Indian River System" Map</button>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-red-500">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Spaced Repetition Alert</h3>
          <p className="text-slate-600 text-sm mb-4">You read <b>Modern History: Gandhi Era</b> 3 days ago. AI predicts you are about to forget 40% of it.</p>
          <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium">Revise Now (10 mins)</button>
        </div>
      </div>
    </div>
  </div>
);

const FocusTools = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in">
      <div className="bg-white p-12 rounded-3xl shadow-lg border border-slate-100 text-center max-w-md w-full relative overflow-hidden">
        {focusMode && <div className="absolute inset-0 border-4 border-indigo-500 rounded-3xl pointer-events-none" />}
        
        <div className="flex justify-center mb-6 text-indigo-600"><Clock size={48} /></div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Pomodoro Timer</h2>
        
        <div className="flex items-center justify-center gap-3 mb-8 bg-slate-50 py-2 px-4 rounded-full w-fit mx-auto cursor-pointer" onClick={() => setFocusMode(!focusMode)}>
          <div className={`w-10 h-6 rounded-full transition-colors relative ${focusMode ? 'bg-indigo-600' : 'bg-slate-300'}`}>
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${focusMode ? 'left-5' : 'left-1'}`} />
          </div>
          <span className="text-sm font-semibold text-slate-600">Deep Focus Mode (Blocks Notifications)</span>
        </div>
        
        <div className="text-7xl font-bold text-slate-800 mb-10 font-mono tracking-tight">
          {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        
        <div className="flex justify-center gap-4">
          <button onClick={() => setIsRunning(!isRunning)} className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all ${isRunning ? 'bg-orange-500' : 'bg-indigo-600'}`}>
            {isRunning ? <><Pause size={20}/> Pause</> : <><Play size={20}/> Start</>}
          </button>
          <button onClick={() => {setIsRunning(false); setTimeLeft(25*60)}} className="flex items-center gap-2 px-6 py-4 rounded-xl font-bold bg-slate-100 text-slate-600">
            <RotateCcw size={20}/>
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoContent = () => (
  <div className="p-8 space-y-6 animate-in fade-in">
    <h2 className="text-3xl font-bold text-slate-800 mb-6">Short Summary Videos 📺</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg relative aspect-[9/16] group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
            <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Play className="text-white ml-1" />
            </div>
            <h3 className="text-white font-bold text-lg">Revolt of 1857 Summary in 2 Mins</h3>
            <p className="text-slate-300 text-sm mt-2">History • 50k views</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Community = () => (
  <div className="p-8 space-y-6 animate-in fade-in">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-3"><Zap className="text-yellow-500"/> AI Doubt Solver</h2>
        <p className="text-slate-500 mb-6">Stuck on a question? Click a photo and get instant step-by-step solutions.</p>
        <div className="border-2 border-dashed border-slate-300 bg-slate-50 h-48 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition">
          <div className="bg-white p-4 rounded-full shadow-sm mb-3"><ImageIcon className="text-indigo-600" size={32}/></div>
          <span className="font-semibold text-slate-600">Upload Photo or PDF</span>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Users className="text-blue-500"/> Study Groups</h2>
        <div className="space-y-4">
          {['UPSC Prelims 2026 Warriors', 'SSC CGL Quant Doubts'].map(group => (
            <div key={group} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl hover:border-indigo-200 transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center"><Users className="text-indigo-600"/></div>
                <div>
                  <h4 className="font-bold text-slate-800">{group}</h4>
                  <p className="text-xs text-slate-500">234 members online</p>
                </div>
              </div>
              <button className="text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-lg">Join</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const JobAlerts = () => (
  <div className="p-8 space-y-6 animate-in fade-in">
    <h2 className="text-3xl font-bold text-slate-800 mb-6">Job Notifications & Alerts 📢</h2>
    <div className="space-y-4">
      {[
        { t: 'UPSC CSE 2026 Notification Released', d: 'Apply before 20th Feb', type: 'New Vacancy' },
        { t: 'SSC CGL Tier 1 Admit Card Out', d: 'Download your admit card now', type: 'Admit Card' },
        { t: 'IBPS PO Final Result Declared', d: 'Check cutoff marks', type: 'Result' }
      ].map((job, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-md transition">
          <div>
            <span className={`text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block ${job.type === 'New Vacancy' ? 'bg-green-100 text-green-700' : job.type === 'Admit Card' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{job.type}</span>
            <h3 className="font-bold text-lg text-slate-800">{job.t}</h3>
            <p className="text-slate-500 text-sm mt-1">{job.d}</p>
          </div>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition">View Details</button>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: '1', text: "नमस्ते! मैं आपका पढ़ाई साथी AI हूँ। आज आप क्या पढ़ना चाहेंगे?", sender: 'ai', timestamp: new Date() }]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), text: "यह एक बेहतरीन सवाल है! मैं इस पर रिसर्च कर रहा हूँ...", sender: 'ai', timestamp: new Date() }]);
    }, 1000);
  };

    const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'library': return <LibraryView setTab={setActiveTab} />;
      case 'content': return <StudyContentViewer />;
      case 'revision': return <SmartRevision />;
      case 'videos': return <VideoContent />;
      case 'focus': return <FocusTools />;
      case 'community': return <Community />;
      case 'jobs': return <JobAlerts />;
      case 'study':
      default:
        return (
          <div className="flex flex-col h-full animate-in fade-in">
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <AnimatePresence>
                {messages.map((m) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${m.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}`}>
                      <p>{m.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="p-6 bg-transparent border-t border-slate-100">
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-2 flex items-center gap-2">
                <button onClick={() => setIsRecording(!isRecording)} className={`p-3 rounded-xl transition-all ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'hover:bg-slate-100 text-slate-400'}`}><Mic size={24} /></button>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="अपना सवाल यहाँ लिखें..." className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-slate-800 p-2" />
                <button onClick={handleSend} className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl shadow-lg shadow-indigo-200"><Send size={24} /></button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden text-slate-800">
      <nav className="w-64 bg-white border-r border-slate-200 flex flex-col z-10 shadow-sm">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg"><BookOpen className="text-white w-6 h-6" /></div>
          <span className="text-2xl font-bold text-slate-800 tracking-tight">PadhaiSathi</span>
        </div>
        <div className="flex-1 px-4 space-y-1 overflow-y-auto py-2 custom-scrollbar">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Roadmap & Dashboard' },
            { id: 'library', icon: Library, label: 'Study Library' },
            { id: 'revision', icon: Brain, label: 'Smart Revision' },
            { id: 'videos', icon: Video, label: 'Summary Videos' },
            { id: 'study', icon: Zap, label: 'AI Chat Tutor' },
            { id: 'focus', icon: Clock, label: 'Focus Tools' },
            { id: 'community', icon: Users, label: 'Doubts & Peer Groups' },
            { id: 'jobs', icon: Bell, label: 'Job Notifications' },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === item.id ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              <item.icon size={20} className={activeTab === item.id ? "text-indigo-600" : "text-slate-400"} /> {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 text-slate-500 hover:text-red-500 transition-colors w-full px-4 py-2 font-medium"><LogOut size={20} /> Logout</button>
        </div>
      </nav>
      <main className="flex-1 flex flex-col relative bg-slate-50/50">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium"><span>PadhaiSathi</span><ChevronRight size={14} /><span className="text-indigo-600 capitalize">{activeTab.replace('-', ' ')}</span></div>
          <div className="flex items-center gap-4">
            <div className="relative"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input type="text" placeholder="Global search..." className="bg-slate-100 pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-none w-64"/></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-sm cursor-pointer" />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto relative">{renderContent()}</div>
      </main>
    </div>
  );
}
