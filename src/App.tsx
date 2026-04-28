import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './lib/supabaseClient';
import { 
  BookOpen, Mic, Send, History, Settings, LogOut, Search, Book, PenTool, Award, ChevronRight, Brain, Sparkles, Clock, Play, Pause, RotateCcw, Download, Home, FileText,
  Map, Target, Zap, LayoutDashboard, Library, Layers, Video, Users, Bell, Newspaper, Image as ImageIcon, Flame, CheckCircle2, ShieldAlert, MessageCircle,
  Headphones, UserPlus, Calendar, PlayCircle, Star, ChevronLeft, Monitor, Shield, ArrowRight
} from 'lucide-react';

interface Message { id: string; text: string; sender: 'user' | 'ai'; timestamp: Date; }

const Home = ({ setTab, userName }: { setTab: (t: string) => void, userName: string }) => (
  <div className="space-y-6 pb-24 animate-in fade-in duration-700 bg-slate-50/50">
    {/* Hero Banner - Dream Classes Style */}
    <div className="relative h-[240px] rounded-[24px] overflow-hidden shadow-2xl shadow-maroon-100/30 group mx-4 mt-6">
      <div className="absolute inset-0 bg-[#8B0000] overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mt-40 transition-transform group-hover:scale-110 duration-700"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 transition-transform group-hover:scale-110 duration-700"></div>
      </div>
      <div className="relative h-full flex flex-col justify-center px-10 text-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black tracking-widest backdrop-blur-md uppercase">India's #1 Platform</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight tracking-tight">Prepare for Your <br/><span className="text-rose-300 underline decoration-rose-300/30 underline-offset-8">Dream Exam</span>! 🚀</h2>
        <p className="text-white/80 font-bold text-sm mb-8 max-w-xs">Access 730+ Test Series, AI Tutor & Premium Study Notes.</p>
        <div className="flex gap-3">
          <button onClick={() => setTab('tests')} className="bg-white text-[#8B0000] px-8 py-3 rounded-2xl font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">Get Test Pass</button>
          <button className="bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-2xl font-black text-sm border border-white/30 hover:bg-white/30 transition-all">Live Classes</button>
        </div>
      </div>
    </div>

    {/* Categories Grid - Dream Classes Style */}
    <div className="px-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Browse Categories</h3>
        <button className="text-[#8B0000] text-xs font-black bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 hover:bg-rose-100 transition-all">VIEW ALL</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'Live Tests', icon: <Zap size={28}/>, count: '730+ Series', color: 'bg-rose-50 text-rose-700', tab: 'tests' },
          { id: 'ai', name: 'AI Tutor', icon: <Bot size={28}/>, count: '24/7 Doubt', color: 'bg-indigo-50 text-indigo-700', tab: 'study' },
          { name: 'Course Bank', icon: <BookOpen size={28}/>, count: '500+ Videos', color: 'bg-blue-50 text-blue-700', tab: 'library' },
          { name: 'Job Alerts', icon: <Briefcase size={28}/>, count: 'Daily Updates', color: 'bg-green-50 text-green-700', tab: 'jobs' }
        ].map((cat, idx) => (
          <div key={idx} onClick={() => setTab(cat.tab)} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex flex-col items-center text-center group cursor-pointer hover:border-rose-200 hover:shadow-xl transition-all duration-300 tap-scale">
            <div className={`w-16 h-16 rounded-full ${cat.color} flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <span className="font-black text-slate-800 text-sm block mb-1 group-hover:text-rose-700 transition-colors">{cat.name}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cat.count}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Popular Tests - Horizontal Scroll */}
    <div className="pl-6">
      <div className="flex items-center justify-between pr-6 mb-6">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Popular Test Series</h3>
        <div className="flex gap-2">
          <button className="p-2 bg-white rounded-full border border-slate-100 shadow-sm text-slate-400 hover:text-[#8B0000]"><ChevronLeft size={20}/></button>
          <button className="p-2 bg-white rounded-full border border-slate-100 shadow-sm text-slate-400 hover:text-[#8B0000]"><ChevronRight size={20}/></button>
        </div>
      </div>
      <div className="flex gap-5 overflow-x-auto no-scrollbar pr-6 pb-4">
        {[
          { name: 'UPSC Prelims 2024', count: '120 Tests', icon: <Shield size={40}/> },
          { name: 'BPSC 70th PT', count: '85 Tests', icon: <Award size={40}/> },
          { name: 'SSC CGL Tier-1', count: '150 Tests', icon: <Target size={40}/> },
          { name: 'UP Police SI', count: '60 Tests', icon: <Star size={40}/> }
        ].map((item, idx) => (
          <div key={idx} className="flex-shrink-0 w-[260px] bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-rose-100 transition-all group cursor-pointer tap-scale">
            <div className="h-32 bg-slate-50 rounded-2xl mb-5 flex items-center justify-center text-slate-200 group-hover:text-rose-100 transition-colors overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {item.icon}
            </div>
            <h4 className="font-black text-slate-800 mb-3 truncate group-hover:text-rose-700 transition-colors">{item.name}</h4>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-tight">{item.count}</span>
              <span className="text-[#8B0000] font-black text-xs bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 group-hover:bg-[#8B0000] group-hover:text-white transition-all">JOIN NOW</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* AI Tutor Card */}
    <div className="px-6 pb-6">
      <div className="bg-[#8B0000] p-8 rounded-[32px] text-white flex justify-between items-center relative overflow-hidden shadow-2xl shadow-maroon-100 hover:scale-[1.02] transition-transform cursor-pointer group" onClick={() => setTab('study')}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest">Available 24/7</span>
          </div>
          <h4 className="text-2xl font-black mb-1 tracking-tight">PadhaiSathi AI Bot</h4>
          <p className="text-white/70 text-xs font-bold leading-relaxed max-w-[180px]">Personalized roadmap & instant doubt solving in Hinglish.</p>
          <button className="mt-6 bg-white text-[#8B0000] px-8 py-2.5 rounded-2xl font-black text-sm shadow-xl tap-scale group-hover:gap-4 transition-all flex items-center gap-2">ASK AI <ArrowRight size={18}/></button>
        </div>
        <div className="absolute -right-6 -bottom-6 opacity-20 rotate-12 group-hover:rotate-0 transition-transform duration-700">
          <Bot size={140} />
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

const LibraryView = ({ setTab }: { setTab: (t: string, p?: any) => void }) => {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const subjects = ['NCERT', 'Polity', 'History', 'Geography', 'Economy', 'Science', 'Bihar Special', 'Current Affairs'];
  const types = [
    { id: 'handmade_pdf', label: 'Handmade Notes', icon: <PenTool size={20}/> },
    { id: 'digital_pro', label: 'Computerized', icon: <Monitor size={20}/> },
    { id: 'ncert_folder', label: 'NCERT Books', icon: <BookOpen size={20}/> },
    { id: 'newspaper', label: 'Newspapers', icon: <Newspaper size={20}/> },
    { id: 'mindmap', label: 'Mindmaps', icon: <Zap size={20}/> }
  ];

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      let query = supabase.from('study_materials').select('*');
      if (selectedSubject) query = query.eq('subject', selectedSubject);
      
      // If NCERT folder is selected, filter by subject 'NCERT'
      if (selectedType === 'ncert_folder') {
        query = query.eq('subject', 'NCERT');
      } else if (selectedType) {
        query = query.eq('type', selectedType);
      }
      
      const { data } = await query.order('created_at', { ascending: false });
      if (data) setMaterials(data);
      setLoading(false);
    };
    fetchMaterials();
  }, [selectedSubject, selectedType]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-800">Advanced Study Library 📚</h2>
          <p className="text-slate-500 font-medium">Topic-wise categorized content in Hindi & English.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold border border-emerald-200">
            250+ New Items Added
          </div>
        </div>
      </div>

      {/* Filter Sections */}
      <div className="space-y-6">
        {/* Row 1: Material Types (Large Folders) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {types.map(type => (
            <button 
              key={type.id}
              onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
              className={`p-6 rounded-[2rem] border-2 transition-all flex items-center gap-4 group ${selectedType === type.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-300 shadow-sm'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedType === type.id ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-indigo-50 text-indigo-600'}`}>
                {type.icon}
              </div>
              <div className="text-left">
                <span className="font-black text-sm block">{type.label}</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedType === type.id ? 'text-indigo-100' : 'text-slate-400'}`}>Browse Folder</span>
              </div>
            </button>
          ))}
        </div>

        {/* Row 2: Subject Chips */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <button 
            onClick={() => setSelectedSubject(null)}
            className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${!selectedSubject ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}
          >
            All Subjects
          </button>
          {subjects.map(sub => (
            <button 
              key={sub}
              onClick={() => setSelectedSubject(selectedSubject === sub ? null : sub)}
              className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${selectedSubject === sub ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-300'}`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-20"><div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((mat) => (
            <div key={mat.id} onClick={() => setTab('pdf_viewer')} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition cursor-pointer group hover:border-indigo-400 flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-12 -mt-12 group-hover:bg-indigo-500/10 transition-all"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-xl ${mat.type === 'newspaper' ? 'bg-rose-50 text-rose-600' : mat.type === 'handmade_pdf' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  {mat.type === 'newspaper' ? <Newspaper size={20}/> : mat.type === 'handmade_pdf' ? <PenTool size={20}/> : <Monitor size={20}/>}
                </div>
                <div className="flex gap-2">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-md border ${mat.language === 'Hindi' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                    {mat.language.toUpperCase()}
                  </span>
                </div>
              </div>

              <h4 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition mb-2">{mat.title}</h4>
              <p className="text-sm text-slate-500 font-medium flex-1 line-clamp-2">{mat.description}</p>
              
              <div className="mt-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-t border-slate-50 pt-4">
                <span className="text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{mat.subject}</span>
                <span className="text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">Read Notes <ChevronRight size={14}/></span>
              </div>
            </div>
          ))}
          {materials.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-400">
              <BookOpen size={48} className="mx-auto mb-4 opacity-20"/>
              <p className="font-bold italic">No materials found matching your filters.</p>
            </div>
          )}
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

const JobAlerts = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      const { data } = await supabase.from('job_notifications').select('*').order('created_at', { ascending: false });
      if (data) setAlerts(data);
      setLoading(false);
    };
    fetchAlerts();
  }, []);

  const jobs = alerts.filter(a => a.category === 'latest_job');
  const admitCards = alerts.filter(a => a.category === 'admit_card');
  const results = alerts.filter(a => a.category === 'result');

  const Column = ({ title, data, color }: { title: string, data: any[], color: string }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className={`bg-${color}-600 p-4 text-white font-bold text-center uppercase tracking-wider text-sm`}>
        {title}
      </div>
      <div className="flex-1 p-2 space-y-1 overflow-y-auto max-h-[500px] custom-scrollbar">
        {data.map((item, i) => (
          <a 
            key={item.id} 
            href={item.apply_link} 
            target="_blank" 
            rel="noreferrer"
            className="block p-3 rounded-lg hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full bg-${color}-500 shrink-0`}></div>
              <p className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {item.title}
              </p>
            </div>
          </a>
        ))}
        {data.length === 0 && <p className="p-8 text-center text-slate-400 italic text-sm">No updates available</p>}
      </div>
      <div className="p-3 bg-slate-50 text-center">
        <button className={`text-${color}-600 text-xs font-bold hover:underline`}>View All {title}</button>
      </div>
    </div>
  );

  return (
    <div className="p-8 space-y-8 animate-in fade-in bg-slate-50/50 min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Job Notifications 📢</h2>
          <p className="text-slate-500 font-medium mt-1 italic">India's #1 Job Portal style notifications (SarkariResult Style)</p>
        </div>
        <div className="bg-indigo-600 text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg shadow-indigo-100 animate-pulse">
          UPDATED: {new Date().toLocaleDateString()}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-20"><div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <Column title="Latest Jobs" data={jobs} color="indigo" />
          <Column title="Admit Cards" data={admitCards} color="rose" />
          <Column title="Results" data={results} color="emerald" />
        </div>
      )}

      {/* Marquee Style News Ticker */}
      <div className="bg-slate-900 text-white p-3 rounded-xl overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee items-center gap-8">
          <span className="flex items-center gap-2 text-rose-400 font-bold uppercase text-xs"><Zap size={14}/> Important:</span>
          <span className="text-sm font-medium">BPSC 70th Prelims Form Re-opened | SSC CGL Admit Card Download Link Active | Bihar Police Exam Postponed</span>
          <span className="flex items-center gap-2 text-rose-400 font-bold uppercase text-xs"><Zap size={14}/> Important:</span>
          <span className="text-sm font-medium">BPSC 70th Prelims Form Re-opened | SSC CGL Admit Card Download Link Active | Bihar Police Exam Postponed</span>
        </div>
      </div>
    </div>
  );
};

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
  const [exams, setExams] = useState<any[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      const { data } = await supabase.from('exams').select('*');
      if (data) setExams(data);
    };
    fetchExams();
  }, []);

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      let query = supabase.from('test_series').select('*');
      if (selectedExamId) query = query.eq('exam_id', selectedExamId);
      
      const { data } = await query.order('created_at', { ascending: false });
      if (data) setTests(data);
      setLoading(false);
    };
    fetchTests();
  }, [selectedExamId]);

  const [activeTab, setActiveTab] = useState<'mocks' | 'pyqs'>('mocks');

  const pyqs = tests.filter(t => t.type === 'pyq');
  const mocks = tests.filter(t => t.type === 'mock');

  return (
  <div className="p-8 space-y-8 animate-in fade-in bg-slate-50/50 min-h-full">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Ultimate Test Pass 🎫</h2>
        <p className="text-slate-500 text-lg font-medium">Access 730+ Test Series & 1 Lakh+ Questions from all Indian Exams.</p>
        
        {/* Search Bar - Professional Look */}
        <div className="mt-8 flex items-center bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-2 border border-slate-100 max-w-2xl mx-auto">
          <div className="pl-4 text-slate-400"><Search size={24}/></div>
          <input 
            type="text" 
            placeholder="Search for SSC CGL, RRB, Banking, Police..." 
            className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 font-bold text-slate-700"
          />
          <button className="bg-rose-700 text-white px-8 py-3 rounded-2xl font-black hover:bg-rose-800 transition-all shadow-lg shadow-rose-100">
            Search
          </button>
        </div>
      </div>

      {/* Horizontal Category Pills */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6 sticky top-0 bg-slate-50/80 backdrop-blur-md z-10 -mx-4 px-4">
        <button 
          onClick={() => setSelectedExamId(null)}
          className={`px-8 py-3 rounded-full font-black text-sm whitespace-nowrap border-2 transition-all ${!selectedExamId ? 'bg-rose-100 border-rose-200 text-rose-800' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'}`}
        >
          All Exams ({exams.length})
        </button>
        {exams.map(exam => (
          <button 
            key={exam.id}
            onClick={() => setSelectedExamId(exam.id)}
            className={`px-8 py-3 rounded-full font-black text-sm whitespace-nowrap border-2 transition-all ${selectedExamId === exam.id ? 'bg-rose-100 border-rose-200 text-rose-800' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'}`}
          >
            {exam.exam_name}
          </button>
        ))}
      </div>

    {/* Exam Cards Grid - Professional Style */}
    {!selectedExamId && !loading && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {exams.map(exam => (
          <div key={exam.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-all duration-500">
            <div className="h-44 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-rose-900/5 group-hover:bg-rose-900/0 transition-all"></div>
              {exam.exam_name.includes('UPSC') ? <Shield size={100} className="text-amber-500/10 group-hover:scale-110 transition-transform duration-700"/> : exam.exam_name.includes('BPSC') ? <Award size={100} className="text-indigo-500/10 group-hover:scale-110 transition-transform duration-700"/> : <Zap size={100} className="text-rose-500/10 group-hover:scale-110 transition-transform duration-700"/>}
              <div className="absolute top-6 left-6">
                <span className="bg-white/90 backdrop-blur-md text-slate-800 px-4 py-1.5 rounded-full text-[10px] font-black border border-slate-100 uppercase tracking-widest shadow-sm">{exam.category}</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black text-slate-800 mb-2 leading-tight group-hover:text-rose-700 transition-colors">{exam.exam_name} Exam</h3>
              <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">Prepare with 50+ Full Length Mocks and 20 Years of Previous Year Papers in Hindi & English.</p>
              <button 
                onClick={() => setSelectedExamId(exam.id)}
                className="w-full bg-rose-700 text-white font-black py-4 rounded-2xl hover:bg-rose-800 transition-all shadow-xl shadow-rose-100 flex items-center justify-center gap-2 group-hover:gap-4"
              >
                Go to Test Series <ArrowRight size={20}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {selectedExamId && (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
        <div className="flex items-center gap-6 mb-4">
          <button onClick={() => setSelectedExamId(null)} className="p-4 bg-white rounded-2xl shadow-xl border border-slate-100 text-slate-600 hover:text-rose-700 hover:scale-110 transition-all">
            <ChevronLeft size={24}/>
          </button>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{exams.find(e => e.id === selectedExamId)?.exam_name} Exam Portal</h3>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1">Free & Premium Test Series</p>
          </div>
        </div>

        {/* Tabs for Mocks and PYQs */}
        <div className="flex gap-4 border-b-2 border-slate-100 pb-px mb-8 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('mocks')}
            className={`pb-4 px-8 text-sm font-black transition-all relative flex-shrink-0 ${activeTab === 'mocks' ? 'text-rose-700' : 'text-slate-400 hover:text-slate-600'}`}
          >
            FULL LENGTH MOCKS
            {activeTab === 'mocks' && <div className="absolute bottom-[-2px] left-0 right-0 h-1 bg-rose-700 rounded-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('pyqs')}
            className={`pb-4 px-8 text-sm font-black transition-all relative flex-shrink-0 ${activeTab === 'pyqs' ? 'text-rose-700' : 'text-slate-400 hover:text-slate-600'}`}
          >
            PREVIOUS YEAR PAPERS
            {activeTab === 'pyqs' && <div className="absolute bottom-[-2px] left-0 right-0 h-1 bg-rose-700 rounded-full"></div>}
          </button>
          <button className="pb-4 px-8 text-sm font-black text-slate-300 cursor-not-allowed flex-shrink-0">SECTIONAL TESTS</button>
        </div>

        {loading ? (
          <div className="flex justify-center p-20"><div className="w-12 h-12 border-4 border-rose-100 border-t-rose-700 rounded-full animate-spin"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(activeTab === 'mocks' ? mocks : pyqs).map((test) => (
              <div key={test.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl shadow-slate-200/40 hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex justify-between items-start mb-8 relative">
                  <div>
                    <h4 className="font-black text-slate-800 text-xl group-hover:text-rose-700 transition-colors leading-tight mb-3 pr-8">{test.name}</h4>
                    <div className="flex gap-2">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-lg border ${test.language === 'Hindi' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>{test.language.toUpperCase()}</span>
                      <span className="text-[10px] font-black px-3 py-1 rounded-lg border bg-green-50 text-green-600 border-green-100">SOLVED PAPER</span>
                    </div>
                  </div>
                  <div className="bg-rose-50 p-3 rounded-2xl text-rose-700 shadow-sm"><Zap size={24}/></div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8 relative">
                  <div className="bg-slate-50/50 rounded-3xl p-4 text-center border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Questions</div>
                    <div className="font-black text-slate-800 text-lg">{test.total_questions}</div>
                  </div>
                  <div className="bg-slate-50/50 rounded-3xl p-4 text-center border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Marks</div>
                    <div className="font-black text-slate-800 text-lg">{test.total_questions}</div>
                  </div>
                  <div className="bg-slate-50/50 rounded-3xl p-4 text-center border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Duration</div>
                    <div className="font-black text-slate-800 text-lg">{test.duration_minutes}m</div>
                  </div>
                </div>

                <button 
                  onClick={() => setTab('live_test', { testId: test.id })}
                  className="w-full bg-rose-700 text-white font-black py-5 rounded-[1.5rem] hover:bg-rose-800 transition-all shadow-xl shadow-rose-100 flex items-center justify-center gap-3 text-lg group-hover:scale-[1.02]"
                >
                  Start Now <Play size={20} className="fill-white"/>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
late-300 rounded-full"></span>
                    <span className={`text-[10px] font-black ${mock.status === 'live' ? 'text-rose-600' : 'text-slate-400'}`}>{mock.status.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-2 rounded-full shadow-sm group-hover/item:bg-rose-600 group-hover/item:text-white transition-all">
                <ChevronRight size={18}/>
              </div>
            </div>
          ))}
          {mocks.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Zap size={48} className="mb-2 opacity-20"/>
              <p className="font-medium italic">No Mocks for this category yet.</p>
            </div>
          )}
        </div>
        <button onClick={() => setTab('live_test')} className="w-full mt-6 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
          Unlock All Tests <Star size={20} className="text-amber-400 fill-amber-400"/>
        </button>
      </div>
    </div>
    )}
  </div>
  );
};

const MOCK_QUESTIONS = [
  { q: "Which Article of the Constitution deals with the Right to Constitutional Remedies?", opts: ['Article 19', 'Article 21', 'Article 32', 'Article 14'], correct: 2 },
  { q: "The concept of 'Directive Principles of State Policy' was borrowed from which country?", opts: ['USA', 'Ireland', 'UK', 'Canada'], correct: 1 },
  { q: "Which Amendment Act added Fundamental Duties to the Constitution?", opts: ['42nd Amendment', '44th Amendment', '86th Amendment', '52nd Amendment'], correct: 0 },
  { q: "Who is known as the 'Father of the Indian Constitution'?", opts: ['Jawaharlal Nehru', 'Sardar Patel', 'B.R. Ambedkar', 'Rajendra Prasad'], correct: 2 },
  { q: "The Constituent Assembly adopted the Constitution on:", opts: ['15 August 1947', '26 January 1950', '26 November 1949', '2 October 1948'], correct: 2 },
  { q: "Under which Article can the President declare a National Emergency?", opts: ['Article 352', 'Article 356', 'Article 360', 'Article 370'], correct: 0 },
  { q: "Which fundamental right was removed by the 44th Amendment Act?", opts: ['Right to Equality', 'Right to Freedom', 'Right to Property', 'Right to Education'], correct: 2 },
  { q: "The term 'Secular' was added to the Preamble by which Amendment?", opts: ['44th', '42nd', '52nd', '86th'], correct: 1 },
  { q: "Which Schedule contains the oath of office for the President?", opts: ['Second Schedule', 'Third Schedule', 'Fourth Schedule', 'Fifth Schedule'], correct: 1 },
  { q: "The 'Basic Structure Doctrine' was established in which case?", opts: ['Golaknath Case', 'Kesavananda Bharati Case', 'Minerva Mills Case', 'Maneka Gandhi Case'], correct: 1 },
];

const LiveTestEngine = ({ testId, onExit }: { testId?: string | null, onExit: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [hasStarted, setHasStarted] = useState(false);
  const [testData, setTestData] = useState<any>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState<any[]>(MOCK_QUESTIONS);
  const [loadingQ, setLoadingQ] = useState(true);
  const totalQ = questions.length;

  useEffect(() => {
    const fetchTestData = async () => {
      if (testId) {
        const { data: ts } = await supabase.from('test_series').select('*').eq('id', testId).single();
        if (ts) {
          setTestData(ts);
          setTimeLeft(ts.duration_minutes * 60);
        }
        // Fetch real questions from DB
        const { data: qs } = await supabase
          .from('questions')
          .select('*')
          .eq('test_series_id', testId)
          .order('question_no', { ascending: true });
        if (qs && qs.length > 0) {
          // Map DB fields to component format
          const lang = ts?.language || 'Hindi';
          setQuestions(qs.map(q => ({
            q: lang === 'Hindi' && q.question_hi ? q.question_hi : q.question_en,
            opts: lang === 'Hindi' && q.option_a_hi
              ? [q.option_a_hi, q.option_b_hi, q.option_c_hi, q.option_d_hi]
              : [q.option_a_en, q.option_b_en, q.option_c_en, q.option_d_en],
            correct: ['A','B','C','D'].indexOf(q.correct_option),
            explanation: lang === 'Hindi' && q.explanation_hi ? q.explanation_hi : q.explanation_en,
            subject: q.subject,
          })));
        }
        setLoadingQ(false);
      } else {
        setLoadingQ(false);
      }
    };
    fetchTestData();
  }, [testId]);

  useEffect(() => {
    if (hasStarted && !submitted) {
      const timer = setInterval(() => setTimeLeft(p => { if (p <= 1) { setSubmitted(true); return 0; } return p - 1; }), 1000);
      return () => clearInterval(timer);
    }
  }, [hasStarted, submitted]);

  const formatTime = (secs: number) => `${Math.floor(secs/60).toString().padStart(2,'0')}:${(secs%60).toString().padStart(2,'0')}`;

  const goToQ = (idx: number) => { setCurrentQ(idx); setVisited(v => new Set([...v, idx])); };

  const handleSaveNext = () => { if (currentQ < totalQ - 1) goToQ(currentQ + 1); };

  const handleMarkReview = () => {
    setMarked(m => { const n = new Set(m); n.has(currentQ) ? n.delete(currentQ) : n.add(currentQ); return n; });
    if (currentQ < totalQ - 1) goToQ(currentQ + 1);
  };

  const handleClear = () => setAnswers(a => { const n = {...a}; delete n[currentQ]; return n; });

  const calcScore = () => {
    let score = 0;
    questions.forEach((q, i) => { if (answers[i] === q.correct) score += 2; else if (answers[i] !== undefined) score -= 0.66; });
    return score.toFixed(2);
  };

  if (!hasStarted) {
    return (
      <div className="absolute inset-0 bg-slate-100 z-50 flex items-center justify-center p-8 animate-in fade-in">
        <div className="bg-white max-w-2xl w-full rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
          <div className="bg-slate-900 p-8 text-white">
            <h2 className="text-3xl font-black mb-2">Exam Instructions</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{testData?.name || 'Loading Test...'}</p>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Total Questions</p>
                <p className="text-2xl font-black text-slate-800">{totalQ}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Duration</p>
                <p className="text-2xl font-black text-slate-800">{testData?.duration_minutes || 60} Min</p>
              </div>
            </div>
            <ul className="space-y-3 text-slate-600 text-sm font-medium">
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div> Each question carries 2 marks for a correct response.</li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></div> Negative marking of 0.33 for each wrong answer.</li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div> Do not refresh the page during the exam.</li>
            </ul>
            <div className="flex gap-4 pt-4">
              <button onClick={onExit} className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition">Go Back</button>
              <button onClick={() => setHasStarted(true)} className="flex-2 py-4 px-8 rounded-2xl font-black text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition">Start Exam Now ➔</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    const score = calcScore();
    const correct = questions.filter((q, i) => answers[i] === q.correct).length;
    const attempted = Object.keys(answers).length;
    return (
      <div className="absolute inset-0 bg-slate-50 z-50 flex items-center justify-center p-8 animate-in fade-in">
        <div className="bg-white max-w-xl w-full rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-indigo-600 p-8 text-white">
            <h2 className="text-4xl font-black mb-2">🎉 Exam Submitted!</h2>
            <p className="text-white/80">{testData?.name || 'Mock Test'}</p>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <p className="text-3xl font-black text-emerald-600">{score}</p>
                <p className="text-xs font-bold text-emerald-800 mt-1">Total Score</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                <p className="text-3xl font-black text-indigo-600">{correct}/{totalQ}</p>
                <p className="text-xs font-bold text-indigo-800 mt-1">Correct</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-3xl font-black text-slate-600">{attempted}</p>
                <p className="text-xs font-bold text-slate-800 mt-1">Attempted</p>
              </div>
            </div>
            <div className="space-y-2 text-left max-h-60 overflow-y-auto">
              {questions.map((q, i) => (
                <div key={i} className={`p-3 rounded-xl border text-sm ${answers[i] === q.correct ? 'bg-emerald-50 border-emerald-200' : answers[i] !== undefined ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                  <p className="font-bold text-slate-700 text-xs">Q{i+1}: {answers[i] !== undefined ? (answers[i] === q.correct ? '✅ Correct' : `❌ Wrong — Correct: ${q.opts[q.correct]}`) : '⏭ Skipped'}</p>
                </div>
              ))}
            </div>
            <button onClick={onExit} className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-100">Back to Tests</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  const answeredCount = Object.keys(answers).length;
  const notAnsweredVisited = [...visited].filter(i => answers[i] === undefined).length;

  return (
    <div className="absolute inset-0 bg-slate-50 z-50 flex flex-col animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold tracking-wider uppercase">{testData?.name || 'Mock Test'}</h1>
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">LIVE</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-slate-700">
            <Clock className={timeLeft < 300 ? "text-red-400 animate-pulse" : "text-emerald-400"} />
            <span className={`text-xl font-mono font-bold tracking-widest ${timeLeft < 300 ? 'text-red-400' : 'text-emerald-400'}`}>{formatTime(timeLeft)}</span>
          </div>
          <button onClick={onExit} className="text-slate-400 hover:text-white transition">Exit Exam</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col border-r border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-4 bg-slate-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-700">Question {currentQ + 1} of {totalQ}</h2>
            <div className="flex gap-4 text-sm font-semibold">
              <span className="text-emerald-600">+2.00 Marks</span>
              <span className="text-red-500">-0.66 Marks</span>
            </div>
          </div>
          <div className="p-8 flex-1 overflow-y-auto">
            <p className="text-lg text-slate-800 mb-8 leading-relaxed font-medium">{q.q}</p>
            <div className="space-y-4 max-w-2xl">
              {q.opts.map((opt, i) => (
                <div
                  key={i}
                  onClick={() => setAnswers(a => ({...a, [currentQ]: i}))}
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all select-none ${
                    answers[currentQ] === i
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200 hover:bg-indigo-50 hover:border-indigo-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    answers[currentQ] === i ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white'
                  }`}>
                    {answers[currentQ] === i && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                  <span className={`font-medium ${ answers[currentQ] === i ? 'text-indigo-700 font-bold' : 'text-slate-700'}`}>
                    {String.fromCharCode(65+i)}) {opt}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-200 p-4 bg-slate-50 flex justify-between items-center flex-wrap gap-3">
            <div className="flex gap-3">
              <button
                onClick={handleMarkReview}
                className={`px-5 py-3 border-2 rounded-xl font-bold transition-all ${
                  marked.has(currentQ) ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-300 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {marked.has(currentQ) ? '★ Marked' : '☆ Mark & Next'}
              </button>
              <button onClick={handleClear} className="px-5 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-100 font-bold">Clear</button>
            </div>
            <div className="flex gap-3">
              {currentQ > 0 && (
                <button onClick={() => goToQ(currentQ - 1)} className="px-5 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-100 font-bold">← Prev</button>
              )}
              <button onClick={handleSaveNext} className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-200">Save & Next →</button>
            </div>
          </div>
        </div>

        <div className="w-72 bg-slate-50 flex flex-col shadow-xl z-10">
          <div className="p-4 border-b border-slate-200">
            <p className="font-bold text-slate-800 text-sm">{testData?.name || 'Mock Test'}</p>
            <p className="text-xs text-slate-500 mt-0.5">Question {currentQ+1} of {totalQ}</p>
          </div>
          <div className="p-3 grid grid-cols-2 gap-y-2 gap-x-1 text-xs font-semibold border-b border-slate-200">
            <div className="flex items-center gap-2"><div className="w-5 h-5 bg-emerald-500 rounded text-white flex items-center justify-center text-[10px]">{answeredCount}</div> Answered</div>
            <div className="flex items-center gap-2"><div className="w-5 h-5 bg-red-100 border border-red-300 rounded text-red-700 flex items-center justify-center text-[10px]">{notAnsweredVisited}</div> Not Answered</div>
            <div className="flex items-center gap-2"><div className="w-5 h-5 bg-slate-200 rounded text-slate-600 border border-slate-300 flex items-center justify-center text-[10px]">{totalQ - visited.size}</div> Not Visited</div>
            <div className="flex items-center gap-2"><div className="w-5 h-5 bg-purple-500 rounded text-white flex items-center justify-center text-[10px]">{marked.size}</div> Marked</div>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className="font-bold text-slate-700 mb-3 text-sm">Question Palette</h3>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({length: totalQ}).map((_, i) => {
                let cls = 'bg-slate-100 border border-slate-300 text-slate-600 hover:bg-slate-200';
                if (answers[i] !== undefined) cls = 'bg-emerald-500 text-white border border-emerald-600';
                if (marked.has(i)) cls = 'bg-purple-500 text-white border border-purple-600';
                else if (visited.has(i) && answers[i] === undefined) cls = 'bg-red-100 text-red-700 border border-red-300';
                const ring = i === currentQ ? ' ring-2 ring-offset-1 ring-indigo-500' : '';
                return (
                  <button key={i} onClick={() => goToQ(i)} className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm ${cls}${ring} transition-all hover:scale-110`}>
                    {i+1}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="p-4 border-t border-slate-200">
            <button onClick={() => setSubmitted(true)} className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition">
              Submit Exam
            </button>
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
  const [showAssessment, setShowAssessment] = useState(false);
  const [userName, setUserName] = useState('');
  const [userExam, setUserExam] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

  const navigateTo = (tab: string, params?: { testId?: string }) => {
    if (tab === activeTab && !params?.testId) return;
    if (params?.testId) setSelectedTestId(params.testId);
    window.history.pushState({ tab, testId: params?.testId }, '', '');
    setActiveTab(tab);
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.tab) {
        setActiveTab(event.state.tab);
        if (event.state.testId) setSelectedTestId(event.state.testId);
      } else {
        setActiveTab('dashboard');
      }
    };
    window.addEventListener('popstate', handlePopState);
    // Initialize history state
    window.history.replaceState({ tab: 'dashboard' }, '', '');
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
      case 'dashboard': return <Home setTab={navigateTo} userName={userName} />;
      case 'library': return <LibraryView setTab={navigateTo} />;
      case 'content': return <StudyContentViewer />;
      case 'tests': return <TestSeriesPYQ setTab={navigateTo} />;
      case 'live_test': return <LiveTestEngine testId={selectedTestId} onExit={goBack} />;
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
                    <div className={`max-w-[70%] p-5 rounded-[24px] shadow-sm ${m.sender === 'user' ? 'bg-[#8B0000] text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                    <div className="max-w-[70%] p-4 rounded-2xl shadow-sm bg-white text-slate-800 border border-slate-100 rounded-tl-none flex gap-2 items-center">
                      <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="p-6 bg-transparent border-t border-slate-100">
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-200 p-2 flex items-center gap-2">
                <button onClick={() => setIsRecording(!isRecording)} className={`p-3 rounded-xl transition-all ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'hover:bg-slate-100 text-slate-400'}`}><Mic size={24} /></button>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="अपना सवाल यहाँ लिखें..." className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-slate-800 p-2 font-bold" disabled={isLoading} />
                <button onClick={handleSend} disabled={isLoading} className={`p-4 rounded-xl shadow-lg transition-all ${isLoading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-[#8B0000] hover:bg-[#700000] text-white shadow-rose-100'}`}><Send size={20} /></button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans overflow-hidden text-slate-800">

      {/* ── TOP HEADER (Dream Classes Style) ── */}
      <header className="bg-white border-b border-slate-200 shadow-sm z-20 flex-shrink-0">
        <div className="flex items-center justify-between px-6 h-16">

          {/* Left: Back Button OR App Logo */}
          {activeTab !== 'dashboard' ? (
            <button
              onClick={goBack}
              className="flex items-center gap-2 bg-rose-50 text-[#8B0000] font-black px-4 py-2 rounded-xl border border-rose-100 active:scale-95 transition-all"
            >
              <ChevronLeft size={20} /> BACK
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="bg-[#8B0000] p-2 rounded-xl shadow-lg shadow-maroon-100"><Star size={20} className="text-white fill-white" /></div>
              <span className="text-xl font-black text-slate-900 tracking-tight">PadhaiSathi</span>
            </div>
          )}

          {/* Right: Avatar */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400"><Search size={22}/></button>
            <div className="w-10 h-10 rounded-full bg-[#8B0000] shadow-lg shadow-maroon-100 cursor-pointer flex items-center justify-center text-white font-black text-sm border-2 border-white tap-scale">
              {userName ? userName[0].toUpperCase() : 'P'}
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-y-auto relative pb-24 no-scrollbar">
        {renderContent()}
      </main>

      {/* ── BOTTOM NAVIGATION (Dream Classes Style) ── */}
      {activeTab !== 'live_test' && activeTab !== 'pdf_viewer' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-30 flex-shrink-0">
          <div className="grid grid-cols-5 h-20 px-2 pb-safe">
            {[
              { id: 'dashboard', icon: HomeIcon, label: 'Home' },
              { id: 'tests', icon: Zap, label: 'Tests' },
              { id: 'study', icon: Bot, label: 'AI Help' },
              { id: 'library', icon: BookOpen, label: 'Study' },
              { id: 'jobs', icon: Star, label: 'Jobs' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex flex-col items-center justify-center gap-1.5 transition-all duration-300 tap-scale ${
                  activeTab === item.id ? 'text-[#8B0000] scale-110' : 'text-slate-400'
                }`}
              >
                <div className={`p-2 rounded-2xl transition-all ${
                  activeTab === item.id ? 'bg-rose-50' : ''
                }`}>
                  <item.icon size={24} className={activeTab === item.id ? 'fill-[#8B0000]/10' : ''} />
                </div>
              </button>
            ))}
          </div>

          {/* More options row */}
          <div className="hidden border-t border-slate-100 grid grid-cols-5 h-14 bg-slate-50">
            {[
              { id: 'revision', icon: Brain, label: 'Revision' },
              { id: 'videos', icon: Video, label: 'Videos' },
              { id: 'focus', icon: Clock, label: 'Focus' },
              { id: 'community', icon: Users, label: 'Groups' },
              { id: 'mentorship', icon: UserPlus, label: 'Mentor' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex flex-col items-center justify-center gap-0.5 transition-all ${
                  activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'
                }`}
              >
                <item.icon size={18} />
                <span className="text-[9px] font-bold">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Floating More Menu Button */}
      {activeTab !== 'live_test' && activeTab !== 'pdf_viewer' && (
        <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-2">
          {/* More Features */}
          {[
            { id: 'revision', icon: Brain, color: 'bg-purple-500', label: 'Revision' },
            { id: 'videos', icon: Video, color: 'bg-rose-500', label: 'Videos' },
            { id: 'audio', icon: Headphones, color: 'bg-amber-500', label: 'Audio' },
            { id: 'focus', icon: Clock, color: 'bg-emerald-500', label: 'Focus' },
            { id: 'community', icon: Users, color: 'bg-blue-500', label: 'Groups' },
            { id: 'mentorship', icon: UserPlus, color: 'bg-pink-500', label: 'Mentor' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`w-12 h-12 ${item.color} text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-all hover:opacity-90 ${
                activeTab === item.id ? 'ring-2 ring-offset-2 ring-indigo-400' : ''
              }`}
              title={item.label}
            >
              <item.icon size={20} />
            </button>
          ))}
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/916207715021"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 left-4 bg-[#25D366] text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center z-40 active:scale-90 transition-all"
        title="WhatsApp Support"
      >
        <MessageCircle size={22} />
      </a>

      {/* Overlays */}
      {showOnboarding && <OnboardingModal onSubmit={handleOnboardingSubmit} />}
    </div>
  );
}
