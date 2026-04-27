import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './lib/supabaseClient';
import { 
  BookOpen, Mic, Send, History, Settings, LogOut, Search, Book, PenTool, Award, ChevronRight, Brain, Sparkles, Clock, Play, Pause, RotateCcw, Download, Home, FileText,
  Map, Target, Zap, LayoutDashboard, Library, Layers, Video, Users, Bell, Newspaper, Image as ImageIcon, Flame, CheckCircle2, ShieldAlert, MessageCircle,
  Headphones, UserPlus, Calendar, PlayCircle, Star, ChevronLeft
} from 'lucide-react';

interface Message { id: string; text: string; sender: 'user' | 'ai'; timestamp: Date; }

const Dashboard = ({ onStartAssessment, userName, userExam }: { onStartAssessment: () => void, userName: string, userExam: string }) => (
  <div className="p-8 space-y-8 animate-in fade-in duration-500">
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10">
        <Target size={200} className="-mr-10 -mt-10" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">🎯 Target: {userExam || 'Not Selected'}</span>
        </div>
        <h2 className="text-4xl font-bold mb-4">Welcome back, {userName || 'Learner'}! 👋</h2>
        <p className="text-indigo-100 text-lg mb-6 max-w-xl">Take a quick 5-minute skill assessment to get a highly personalized AI learning roadmap tailored for you.</p>
        <button onClick={onStartAssessment} className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
          <Brain size={20} /> Update Target Exam
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

const LibraryView = ({ setTab }: { setTab: (t: string) => void }) => {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      const { data, error } = await supabase.from('study_materials').select('*');
      if (data) setMaterials(data);
      setLoading(false);
    };
    fetchMaterials();
  }, []);

  return (
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

      <h3 className="text-2xl font-bold text-slate-800 mt-10 border-t pt-8 border-slate-200">
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-lg text-sm mr-3 uppercase tracking-widest align-middle">Live from Database</span>
        Recently Uploaded Material
      </h3>

      {loading ? (
        <div className="flex justify-center p-10"><div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {materials.map((mat) => (
            <div key={mat.id} onClick={() => setTab('pdf_viewer')} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition cursor-pointer group hover:border-indigo-300">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase ${mat.type === 'handmade_pdf' ? 'bg-amber-100 text-amber-700' : mat.type === 'mindmap' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                  {mat.type.replace('_', ' ')}
                </span>
                {mat.language && (
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${mat.language === 'Hindi' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                    {mat.language}
                  </span>
                )}
              </div>
              <h4 className="text-lg font-bold text-slate-800 mt-3 group-hover:text-indigo-600 transition">{mat.title}</h4>
              <p className="text-sm text-slate-500 mt-1">{mat.description}</p>
              <div className="mt-4 flex justify-between items-center text-xs font-semibold border-t border-slate-100 pt-3">
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{mat.subject}</span>
                <button className="text-indigo-600 hover:underline flex items-center gap-1">Open PDF <ChevronRight size={14}/></button>
              </div>
            </div>
          ))}
          {materials.length === 0 && <p className="text-slate-500 italic">No materials found in the database yet.</p>}
        </div>
      )}
    </div>
  );
};

const PDFViewerMock = ({ onExit }: { onExit: () => void }) => {
  return (
    <div className="absolute inset-0 bg-slate-900 z-50 flex flex-col animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <Book size={24} className="text-indigo-400" />
          <h1 className="text-xl font-bold tracking-wider">UPSC Geography Notes (Hindi)</h1>
          <span className="bg-orange-500/20 text-orange-400 border border-orange-500/50 text-xs font-bold px-2 py-1 rounded">HINDI MEDIUM</span>
        </div>
        <button onClick={onExit} className="text-slate-300 hover:text-white bg-slate-700 px-4 py-2 rounded-lg transition font-bold">Close PDF</button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-slate-100">
        <div className="bg-white w-full max-w-4xl min-h-[1000px] shadow-2xl p-12 text-slate-800 border border-slate-300">
          <h1 className="text-4xl font-black text-center mb-4 underline decoration-4 decoration-indigo-500">विश्व भूगोल - महत्वपूर्ण नोट्स</h1>
          <p className="text-center text-slate-500 font-bold mb-12 uppercase tracking-widest">Target UPSC Prelims 2024</p>

          <h2 className="text-2xl font-bold bg-indigo-50 border-l-4 border-indigo-600 pl-4 py-2 mb-6">1. महासागर की धाराएं (Ocean Currents)</h2>
          <p className="text-lg leading-relaxed mb-6 font-medium text-slate-700">
            महासागरीय धाराएँ (Ocean currents) महासागर के जल का एक निश्चित दिशा में निरंतर प्रवाह है। ये दो प्रकार की होती हैं: गर्म जलधारा और ठंडी जलधारा।
          </p>
          <ul className="list-disc pl-8 space-y-4 text-lg mb-8 text-slate-700 font-medium">
            <li><b>गल्फ स्ट्रीम (Gulf Stream):</b> यह अटलांटिक महासागर की एक प्रमुख गर्म जलधारा है।</li>
            <li><b>लैब्राडोर धारा (Labrador Current):</b> यह एक ठंडी जलधारा है जो न्यूफाउंडलैंड के पास गल्फ स्ट्रीम से मिलती है, जिससे वहां घना कोहरा बनता है (जो मछली पकड़ने के लिए बहुत अच्छा होता है)।</li>
            <li><b>एल नीनो (El Nino):</b> पेरू तट के पास प्रशांत महासागर में गर्म जलधारा का विकास, जो भारतीय मानसून को कमजोर करता है।</li>
          </ul>

          <h2 className="text-2xl font-bold bg-indigo-50 border-l-4 border-indigo-600 pl-4 py-2 mb-6">2. याद रखने की ट्रिक (Mnemonic)</h2>
          <div className="bg-yellow-100 border border-yellow-400 p-6 rounded-xl mb-8">
            <p className="text-xl font-bold text-yellow-800">ट्रिक: ठंडी जलधाराओं को कैसे याद रखें?</p>
            <p className="text-2xl font-black text-red-600 mt-2 tracking-wider">"हम बोले ग्रीन बगुला क्यों केला फ़ेंक रहा है"</p>
            <p className="text-lg mt-4 text-slate-700 font-medium">
              हम - हम्बोल्ट (Humboldt)<br/>
              ले - लैब्राडोर (Labrador)<br/>
              ग्रीन - ग्रीनलैंड (Greenland)<br/>
              बगुला - बेंगुएला (Benguela)<br/>
              क्यों - क्युराइल (Kurile)<br/>
              केला - कैलिफोर्निया (California)<br/>
              फ़ेंक - फॉकलैंड (Falkland)
            </p>
          </div>
          <p className="text-center text-slate-400 font-bold mt-20">Page 1 of 45</p>
        </div>
      </div>
    </div>
  );
};

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

const PremiumAudioBooks = () => (
  <div className="p-8 space-y-6 animate-in fade-in">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-2 rounded-xl"><Headphones className="text-white"/></div>
      <h2 className="text-3xl font-bold text-slate-800">Premium Audio NCERTs 🎧</h2>
    </div>
    <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="w-32 h-32 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-slate-700 shadow-xl">
        <Headphones size={48} className="text-amber-400"/>
      </div>
      <div className="flex-1 z-10">
        <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30 uppercase tracking-wider mb-3 inline-block">Now Playing</span>
        <h3 className="text-2xl font-bold mb-2">History: Class 11th - Chapter 1</h3>
        <p className="text-slate-400 mb-6 max-w-lg">Listen to the complete summary of Ancient History while you travel. Narrated by top educators.</p>
        <div className="flex items-center gap-4 w-full max-w-md">
          <PlayCircle size={40} className="text-amber-400 hover:scale-110 transition cursor-pointer" />
          <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
          </div>
          <span className="text-sm text-slate-400 font-medium">12:45 / 45:00</span>
        </div>
      </div>
    </div>
  </div>
);

const VIPMentorship = () => (
  <div className="p-8 space-y-6 animate-in fade-in">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl"><UserPlus className="text-white"/></div>
      <h2 className="text-3xl font-bold text-slate-800">VIP 1-on-1 Mentorship 🤝</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        { name: 'Ravi Kumar (AIR 14)', exam: 'UPSC 2024', slots: '2 Slots Left' },
        { name: 'Neha Singh', exam: 'SSC CGL Rank 8', slots: 'Available Today' }
      ].map((mentor, i) => (
        <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition-all group">
          <div className="w-24 h-24 bg-slate-100 rounded-full border-4 border-white shadow-lg shrink-0 overflow-hidden relative">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.name}`} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-800 mb-1">{mentor.name}</h3>
            <p className="text-indigo-600 font-semibold text-sm mb-3">{mentor.exam}</p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 text-sm mb-4">
              <Calendar size={16}/> {mentor.slots}
            </div>
            <button className="w-full md:w-auto bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-600 transition">Book Zoom Session</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TestSeriesPYQ = ({ setTab }: { setTab: (t: string) => void }) => {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      const { data } = await supabase.from('test_series').select('*');
      if (data) setTests(data);
      setLoading(false);
    };
    fetchTests();
  }, []);

  const pyqs = tests.filter(t => t.type === 'pyq');
  const mocks = tests.filter(t => t.type === 'mock');

  return (
  <div className="p-8 space-y-8 animate-in fade-in">
    <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-4">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Target className="text-rose-500"/> Mega Test Series & PYQs
        </h2>
        <p className="text-slate-500 mt-2">Real exam simulation with 20 Years of Previous Year Questions.</p>
      </div>
      <div className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl font-bold text-sm border border-rose-100 flex items-center gap-2">
        <Flame size={18} /> Live Ranking
      </div>
    </div>

    {loading ? (
      <div className="flex justify-center p-10"><div className="w-10 h-10 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div></div>
    ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* 20 Years PYQ Section */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-100 p-3 rounded-xl"><History className="text-indigo-600"/></div>
          <h3 className="text-xl font-bold text-slate-800">20 Years PYQs (2004-2024)</h3>
        </div>
        <p className="text-sm text-slate-500 mb-6">Solve exact questions asked in the last two decades. Topic-wise filtered with detailed solutions.</p>
        
        <div className="space-y-3 h-64 overflow-y-auto pr-2 custom-scrollbar">
          {pyqs.map((pyq, i) => (
            <div key={pyq.id} onClick={() => setTab('live_test')} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 hover:border-indigo-300 transition cursor-pointer hover:bg-indigo-50">
              <span className="font-bold text-slate-700">{pyq.name}</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600`}>{pyq.year || 'All Years'}</span>
            </div>
          ))}
          {pyqs.length === 0 && <p className="text-slate-500 italic">No PYQs found.</p>}
        </div>
        <button onClick={() => setTab('live_test')} className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition">Start Random PYQ</button>
      </div>

      {/* Full Length Mocks */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-all"></div>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-rose-100 p-3 rounded-xl"><FileText className="text-rose-600"/></div>
          <h3 className="text-xl font-bold text-slate-800">Full-Length Mega Mocks</h3>
        </div>
        <p className="text-sm text-slate-500 mb-6">Exact exam interface (TCS/NTA pattern). Negative marking, timer, and All India Rank.</p>
        
        <div className="space-y-3 h-64 overflow-y-auto pr-2 custom-scrollbar">
          {mocks.map((mock, i) => (
            <div key={mock.id} onClick={() => setTab('live_test')} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 hover:border-rose-300 transition cursor-pointer hover:bg-rose-50">
              <span className="font-medium text-slate-700 text-sm truncate pr-2">{mock.name}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-md shrink-0 ${mock.status === 'live' ? 'bg-red-100 text-red-600 animate-pulse' : mock.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                {mock.status.toUpperCase()}
              </span>
            </div>
          ))}
          {mocks.length === 0 && <p className="text-slate-500 italic">No mocks found.</p>}
        </div>
        <button onClick={() => setTab('live_test')} className="w-full mt-4 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition">Start Mock Test</button>
      </div>
    </div>
    )}
  </div>
  );
};

const LiveTestEngine = ({ onExit }: { onExit: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 60 mins in seconds
  
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(p => p > 0 ? p - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="absolute inset-0 bg-slate-50 z-50 flex flex-col animate-in fade-in zoom-in-95 duration-300">
      {/* Top Navbar */}
      <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold tracking-wider uppercase">Mega Mock Test - UPSC Prelims</h1>
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">LIVE</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-slate-700">
            <Clock className={timeLeft < 300 ? "text-red-400 animate-pulse" : "text-emerald-400"} />
            <span className={`text-xl font-mono font-bold tracking-widest ${timeLeft < 300 ? "text-red-400" : "text-emerald-400"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <button onClick={onExit} className="text-slate-400 hover:text-white transition">Exit Exam</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Question Area */}
        <div className="flex-1 flex flex-col border-r border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-4 bg-slate-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-700">Question 12</h2>
            <div className="flex gap-4 text-sm font-semibold">
              <span className="text-emerald-600">+2.00 Marks</span>
              <span className="text-red-500">-0.66 Marks</span>
            </div>
          </div>
          <div className="p-8 flex-1 overflow-y-auto">
            <p className="text-lg text-slate-800 mb-8 leading-relaxed font-medium">
              Consider the following statements regarding the 'Basic Structure Doctrine' of the Indian Constitution:
              <br/><br/>
              1. It was first articulated in the Golaknath case (1967).<br/>
              2. Judicial review is considered a part of the basic structure.<br/>
              3. The Constitution originally contained a provision for the basic structure.
              <br/><br/>
              Which of the statements given above is/are correct?
            </p>
            <div className="space-y-4 max-w-2xl">
              {['1 and 2 only', '2 only', '2 and 3 only', '1, 2 and 3'].map((opt, i) => (
                <label key={i} className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition">
                  <input type="radio" name="q12" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-slate-700 font-medium">{String.fromCharCode(65+i)}) {opt}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="border-t border-slate-200 p-4 bg-slate-50 flex justify-between items-center">
            <div className="flex gap-4">
              <button className="px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-100 font-bold">Mark for Review & Next</button>
              <button className="px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-100 font-bold">Clear Response</button>
            </div>
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-200">Save & Next</button>
          </div>
        </div>

        {/* Right Side: Question Palette */}
        <div className="w-80 bg-slate-50 flex flex-col shadow-xl z-10">
          <div className="p-4 border-b border-slate-200 flex items-center gap-4">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=sanje" className="w-12 h-12 rounded-full border border-slate-300 bg-white" alt="avatar"/>
            <div>
              <p className="font-bold text-slate-800 text-sm">Sanjeev Kumar</p>
              <p className="text-xs text-slate-500">Roll No: 190244</p>
            </div>
          </div>
          
          <div className="p-4 grid grid-cols-2 gap-y-2 gap-x-1 text-xs font-semibold border-b border-slate-200">
            <div className="flex items-center gap-2"><div className="w-5 h-5 bg-emerald-500 rounded text-white flex items-center justify-center">12</div> Answered</div>
            <div className="flex items-center gap-2"><div className="w-5 h-5 bg-red-500 rounded text-white flex items-center justify-center">4</div> Not Answered</div>
            <div className="flex items-center gap-2"><div className="w-5 h-5 bg-slate-200 rounded text-slate-600 border border-slate-300 flex items-center justify-center">80</div> Not Visited</div>
            <div className="flex items-center gap-2"><div className="w-5 h-5 bg-purple-500 rounded text-white flex items-center justify-center">4</div> Marked</div>
          </div>

          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className="font-bold text-slate-700 mb-3 text-sm">Section: General Studies I</h3>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({length: 100}).map((_, i) => {
                let statusClass = 'bg-slate-100 border border-slate-300 text-slate-600 hover:bg-slate-200'; // Default
                if (i < 12) statusClass = 'bg-emerald-500 text-white border border-emerald-600'; // Answered
                if (i === 12 || i === 15 || i === 18 || i === 20) statusClass = 'bg-red-500 text-white border border-red-600'; // Not Answered
                if (i === 45 || i === 50 || i === 52 || i === 60) statusClass = 'bg-purple-500 text-white border border-purple-600'; // Marked
                
                return (
                  <button key={i} className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm ${statusClass} transition-transform hover:scale-110`}>
                    {i+1}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="p-4 border-t border-slate-200">
            <button className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-200">Submit Exam</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OnboardingModal = ({ onSubmit }: { onSubmit: (name: string, exam: string) => void }) => {
  const [name, setName] = useState('');
  const [exam, setExam] = useState('UPSC Civil Services');
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center overflow-hidden border border-slate-100"
      >
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12">
          <Sparkles size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome to PadhaiSathi</h2>
        <p className="text-slate-500 text-sm mb-8">Let's personalize your learning path to get the best out of the platform.</p>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="What is your name?" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
          <select 
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium appearance-none"
          >
            <optgroup label="Central Level Exams">
              <option>UPSC Civil Services (CSE)</option>
              <option>SSC CGL / CHSL / MTS</option>
              <option>Banking (IBPS PO/Clerk, SBI)</option>
              <option>Railway (RRB NTPC, Group D)</option>
              <option>Defence (NDA, CDS, AFCAT)</option>
            </optgroup>
            <optgroup label="State PCS (Public Service)">
              <option>BPSC (Bihar PCS)</option>
              <option>UPPSC (Uttar Pradesh PCS)</option>
              <option>MPPSC (Madhya Pradesh PCS)</option>
              <option>RPSC (Rajasthan PCS)</option>
              <option>JPSC (Jharkhand PCS)</option>
              <option>HPSC (Haryana PCS)</option>
            </optgroup>
            <optgroup label="State Level & Police">
              <option>Bihar SSC / Bihar Police</option>
              <option>UP Police / UPSSSC</option>
              <option>MP Patwari / Vyapam</option>
              <option>Delhi Police</option>
            </optgroup>
            <optgroup label="Entrance Exams">
              <option>IIT JEE (Mains & Adv)</option>
              <option>NEET (UG)</option>
              <option>CUET</option>
              <option>CLAT</option>
            </optgroup>
          </select>
          
          <button 
            onClick={() => onSubmit(name || 'Student', exam)}
            className="w-full mt-4 bg-indigo-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-200 flex items-center justify-center gap-2"
          >
            Start My Journey ➔
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [history, setHistory] = useState<string[]>(['dashboard']);
  const [showAssessment, setShowAssessment] = useState(false);
  const [userName, setUserName] = useState('');
  const [userExam, setUserExam] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const navigateTo = (tab: string) => {
    if (tab === activeTab) return;
    setHistory(prev => [...prev, tab]);
    setActiveTab(tab);
  };

  const goBack = () => {
    if (history.length <= 1) return;
    const newHistory = [...history];
    newHistory.pop();
    const prevTab = newHistory[newHistory.length - 1];
    setHistory(newHistory);
    setActiveTab(prevTab);
  };

  useEffect(() => {
    const savedName = localStorage.getItem('ps_userName');
    const savedExam = localStorage.getItem('ps_userExam');
    if (savedName) {
      setUserName(savedName);
      setUserExam(savedExam || 'UPSC Civil Services');
    } else {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingSubmit = (name: string, exam: string) => {
    localStorage.setItem('ps_userName', name);
    localStorage.setItem('ps_userExam', exam);
    setUserName(name);
    setUserExam(exam);
    setShowOnboarding(false);
  };

  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: '1', text: "नमस्ते! मैं आपका पढ़ाई साथी AI हूँ। आज आप क्या पढ़ना चाहेंगे?", sender: 'ai', timestamp: new Date() }]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input;
    const newUserMsg: Message = { id: Date.now().toString(), text: userText, sender: 'user', timestamp: new Date() };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = "AIzaSyCl6ftkg1u5Kq_FF7-QKJdE3nVN-jIlG8o";
      const prompt = `You are Padhai Sathi, an expert, polite, and helpful AI tutor for Indian students preparing for competitive exams like UPSC, SSC, and BPSC. Please reply in Hinglish (a mix of Hindi and English) using markdown. The user says: "${userText}"`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf karna, main abhi theek se soch nahi pa raha hoon. Kripya dobara puchiye!";

      setMessages(prev => [...prev, { id: Date.now().toString(), text: aiText, sender: 'ai', timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), text: "Network error ho gaya hai. Kripya apna internet check karein.", sender: 'ai', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

    const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard onStartAssessment={() => setShowOnboarding(true)} userName={userName} userExam={userExam} />;
      case 'library': return <LibraryView setTab={navigateTo} />;
      case 'content': return <StudyContentViewer />;
      case 'tests': return <TestSeriesPYQ setTab={navigateTo} />;
      case 'pdf_viewer': return <PDFViewerMock onExit={goBack} />;
      case 'revision': return <SmartRevision />;
      case 'videos': return <VideoContent />;
      case 'audio': return <PremiumAudioBooks />;
      case 'mentorship': return <VIPMentorship />;
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
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                    <div className="max-w-[70%] p-4 rounded-2xl shadow-sm bg-white text-slate-800 border border-slate-100 rounded-tl-none flex gap-2 items-center">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="p-6 bg-transparent border-t border-slate-100">
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-2 flex items-center gap-2">
                <button onClick={() => setIsRecording(!isRecording)} className={`p-3 rounded-xl transition-all ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'hover:bg-slate-100 text-slate-400'}`}><Mic size={24} /></button>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="अपना सवाल यहाँ लिखें..." className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-slate-800 p-2" disabled={isLoading} />
                <button onClick={handleSend} disabled={isLoading} className={`p-3 rounded-xl shadow-lg transition-all ${isLoading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'}`}><Send size={24} /></button>
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
            { id: 'tests', icon: Target, label: 'Test Series & PYQs', isPremium: true },
            { id: 'audio', icon: Headphones, label: 'Audio NCERTs', isPremium: true },
            { id: 'revision', icon: Brain, label: 'Smart Revision' },
            { id: 'videos', icon: Video, label: 'Summary Videos' },
            { id: 'study', icon: Zap, label: 'AI Chat Tutor' },
            { id: 'focus', icon: Clock, label: 'Focus Tools' },
            { id: 'community', icon: Users, label: 'Doubts & Peer Groups' },
            { id: 'mentorship', icon: UserPlus, label: 'VIP Mentorship', isPremium: true },
            { id: 'jobs', icon: Bell, label: 'Job Notifications' },
          ].map((item) => (
            <button key={item.id} onClick={() => navigateTo(item.id)} className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all font-medium ${activeTab === item.id ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              <div className="flex items-center gap-3">
                <item.icon size={20} className={activeTab === item.id ? "text-indigo-600" : "text-slate-400"} /> {item.label}
              </div>
              {item.isPremium && <Star size={14} className="text-amber-500 fill-amber-500" />}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 text-slate-500 hover:text-red-500 transition-colors w-full px-4 py-2 font-medium"><LogOut size={20} /> Logout</button>
        </div>
      </nav>
      <main className="flex-1 flex flex-col relative bg-slate-50/50">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            {history.length > 1 && (
              <button 
                onClick={goBack} 
                className="flex items-center gap-1 text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all font-bold text-sm border border-indigo-100 shadow-sm"
              >
                <ChevronLeft size={18} /> Back
              </button>
            )}
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <span>PadhaiSathi</span>
              <ChevronRight size={14} />
              <span className="text-indigo-600 capitalize">{activeTab.replace('-', ' ').replace('_', ' ')}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input type="text" placeholder="Global search..." className="bg-slate-100 pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-none w-64"/></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-sm cursor-pointer" />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto relative">{renderContent()}</div>
      </main>

      {/* Overlays */}
      {showOnboarding && <OnboardingModal onSubmit={handleOnboardingSubmit} />}
      {activeTab === 'live_test' && <LiveTestEngine onExit={goBack} />}
      
      {/* WhatsApp Premium Help Button */}
      <a 
        href="https://wa.me/916207715021" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 left-6 bg-gradient-to-r from-[#1E293B] to-[#0F172A] border border-slate-700/50 text-white px-5 py-3 rounded-full shadow-2xl hover:shadow-[#25D366]/20 hover:border-[#25D366]/50 transition-all z-50 flex items-center justify-center gap-3 group"
        title="Chat on WhatsApp"
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[#25D366] rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <MessageCircle size={22} className="relative text-[#25D366] z-10" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold leading-tight">24/7 Support</span>
          <span className="text-sm font-bold leading-tight">Chat on WhatsApp</span>
        </div>
      </a>
    </div>
  );
}
