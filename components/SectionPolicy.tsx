import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, MessageSquare, Send, X, ChevronDown, Loader2 } from 'lucide-react';

const SUPABASE_BASE = 'https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/POLICY%20BRIEFS';

const featuredBriefs = [
  {
    id: 'a',
    title: 'IDAHO ADS ACT',
    subtitle: 'Statewide Driverless Passenger Service',
    target: 'Idaho State Legislature · March 2026',
    description: 'A proposed new Chapter 38 under Title 49, Idaho Code, modeled on Utah\'s HB 101 (House 70–0, Senate 23–0). Defines automated driving systems, creates a driverless passenger-service category, and establishes fleet operator accountability. Zero new agencies, zero new taxes, zero new fees.',
    keyPoints: [
      'Idaho has zero ADS statutory framework. Forty states have acted.',
      '277 traffic fatalities in 2023 — deadliest year in two decades.',
      'Waymo\'s 25.3M autonomous miles: 88–92% fewer crash claims.',
      'SELF DRIVE Act of 2026 cleared House subcommittee 12–11.',
      'Private property authorization leads every recommendation.',
    ],
    color: 'bg-micron-green',
    hoverColor: 'group-hover:text-micron-eggplant-light',
    downloadUrl: `${SUPABASE_BASE}/BRIEF-A-Idaho-ADS-Driverless-Passenger-Service-Act_NEW_DRAFT.docx`,
    htmlUrl: `${SUPABASE_BASE}/brief-a.html`,
  },
  {
    id: 'b',
    title: 'BOISE ROBOT-ENABLED OPERATIONS',
    subtitle: 'Municipal Pilot Ordinance',
    target: 'Boise City Council · March 2026',
    description: 'A two-track approach: state PDD amendments plus a Boise City pilot ordinance for robot-enabled building operations. Extends Boise\'s AI governance (Regulation 4.30q) to physical robotic systems. Three-year sunset, voluntary opt-in, administered through existing city infrastructure.',
    keyPoints: [
      'Construction robotics venture funding: $1.36B in first 3 quarters of 2025.',
      'Consumer humanoid robots ship to U.S. buyers in 2026 at $20,000.',
      'Coeur d\'Alene: first U.S. municipal robotics ordinance, 10+ years, zero incidents.',
      'Utah\'s AI Learning Lab runs 12-month regulatory sandbox agreements.',
      'Pilot is voluntary, opt-in, three-year sunset. Zero new agencies.',
    ],
    color: 'bg-micron-eggplant',
    hoverColor: 'group-hover:text-micron-eggplant-light',
    downloadUrl: `${SUPABASE_BASE}/BRIEF-B-Boise-Robot-Enabled-Operations-Pilot-Ordinance_NEW_DRAFT.docx`,
    htmlUrl: `${SUPABASE_BASE}/brief-b.html`,
  },
];

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const PolicyChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-10),
        }),
      });

      const data = await res.json();

      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error || 'Something went wrong.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="mt-12"
    >
      {/* Chat Toggle Bar */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-micron-grey1 text-white rounded-2xl p-6 flex items-center justify-between cursor-pointer
          shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)]
          hover:-translate-y-1 transition-all duration-300 border border-white/10"
        whileHover={{ y: -4 }}
      >
        <div className="flex items-center gap-3">
          <MessageSquare size={20} className="text-micron-green" />
          <span className="text-lg font-bold uppercase tracking-tight">Policy Brief Assistant</span>
          <span className="text-xs font-medium uppercase tracking-widest text-white/50 ml-2">97 documents · AI-powered</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} className="text-white/60" />
        </motion.div>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-zinc-50 rounded-b-2xl border border-t-0 border-zinc-200 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
              {/* Messages Area */}
              <div
                ref={scrollRef}
                className="h-[360px] overflow-y-auto p-6 space-y-4"
              >
                {messages.length === 0 && (
                  <div className="text-center text-zinc-400 pt-16 space-y-3">
                    <MessageSquare size={32} className="mx-auto opacity-40" />
                    <p className="text-base font-medium">Ask about Idaho ADS legislation, Boise robot-enabled operations, or any policy brief in the archive.</p>
                    <div className="flex flex-wrap gap-2 justify-center pt-4">
                      {[
                        'What vote count did Utah HB 101 achieve?',
                        'How does the Boise pilot work?',
                        'What is Regulation 4.30q?',
                      ].map((q, i) => (
                        <button
                          key={i}
                          onClick={() => { setInput(q); }}
                          className="text-xs bg-white border border-zinc-200 rounded-full px-4 py-2 text-zinc-500 hover:text-micron-eggplant hover:border-micron-eggplant/30 transition-colors cursor-pointer"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-5 py-3 text-base leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-micron-eggplant text-white rounded-br-md'
                          : 'bg-white text-zinc-700 border border-zinc-200 rounded-bl-md shadow-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white text-zinc-400 border border-zinc-200 rounded-2xl rounded-bl-md px-5 py-3 shadow-sm flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-sm">Searching briefs...</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Bar */}
              <div className="border-t border-zinc-200 p-4 flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about the policy briefs..."
                  className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-3 text-base text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-micron-eggplant/40 focus:ring-2 focus:ring-micron-eggplant/10 transition-all"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="bg-micron-eggplant text-white rounded-xl p-3 hover:bg-micron-eggplant/90 disabled:opacity-30 disabled:cursor-default transition-all duration-200 cursor-pointer"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const SectionPolicy: React.FC = () => {
  const [viewingBrief, setViewingBrief] = useState<string | null>(null);
  const [briefHtml, setBriefHtml] = useState<string>('');
  const [loadingBrief, setLoadingBrief] = useState(false);

  const openBrief = async (brief: typeof featuredBriefs[0]) => {
    setViewingBrief(brief.id);
    setLoadingBrief(true);
    try {
      const res = await fetch(brief.htmlUrl);
      const html = await res.text();
      setBriefHtml(html);
    } catch {
      setBriefHtml('<p>Failed to load brief. Please download the document instead.</p>');
    } finally {
      setLoadingBrief(false);
    }
  };

  return (
    <section id="policy" className="container mx-auto px-8 md:px-12 pt-12 pb-6 md:pb-12 text-zinc-900 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end gap-6 mb-12"
      >
        <div className="flex-shrink-0">
          <span className="block text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">06 / FRAMEWORK</span>
          <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant leading-none font-sans">
            POLICY
          </h2>
        </div>

        <div className="md:ml-auto max-w-2xl pb-1">
          <div className="md:pl-6 md:border-l-4 md:border-micron-eggplant/20 md:hover:border-micron-eggplant md:transition-colors md:duration-500">
            <div className="text-base font-light text-zinc-600 leading-snug font-body">
              <span className="font-bold text-micron-eggplant/50 block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                LEGISLATIVE GROUNDWORK
              </span>
              Two policy briefs prepared for the Idaho Legislature and Boise City Council. Autonomous driving systems at the state level, robot-enabled building operations at the municipal level.
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Brief Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {featuredBriefs.map((brief, i) => (
          <motion.div
            key={brief.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: i * 0.15, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className={`${brief.color} text-white rounded-2xl p-8 relative overflow-hidden group
              shadow-[0_40px_80px_-12px_rgba(0,0,0,0.5)]
              hover:shadow-[0_50px_90px_-12px_rgba(0,0,0,0.55)]
              hover:-translate-y-2 transition-all duration-300
              border-t border-white/20 border-l border-white/10 border-b border-black/10 border-r border-black/10
              flex flex-col`}
          >
            {/* Bevel */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={18} className="text-white/60" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50">Policy Brief</span>
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight leading-none mb-2 text-white transition-colors duration-300 ${brief.hoverColor}`}>
                    {brief.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60">{brief.subtitle}</p>
                </div>
              </div>

              {/* Target */}
              <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-4">{brief.target}</p>

              {/* Description */}
              <p className="text-base font-medium text-white/80 leading-relaxed mb-6">{brief.description}</p>

              {/* Key Points */}
              <div className="border-t border-white/15 pt-5 mb-6 flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Key Points</p>
                <ul className="space-y-2.5">
                  {brief.keyPoints.map((point, j) => (
                    <li key={j} className="flex items-start gap-3 text-white/80 text-sm font-medium leading-snug">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
                <button
                  onClick={() => openBrief(brief)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-xl px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-all duration-200 cursor-pointer"
                >
                  <FileText size={16} />
                  Read
                </button>
                <a
                  href={brief.downloadUrl}
                  download
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-xl px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-all duration-200"
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Chat */}
      <PolicyChat />

      {/* Brief Viewer Modal */}
      <AnimatePresence>
        {viewingBrief && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setViewingBrief(null); setBriefHtml(''); }}
              className="fixed inset-0 z-[250] bg-zinc-950/80 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-[251] flex items-center justify-center p-4 pt-8 pointer-events-none overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[85vh] flex flex-col pointer-events-auto shadow-2xl overflow-hidden"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-100 shrink-0">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                      {featuredBriefs.find(b => b.id === viewingBrief)?.title}
                    </h3>
                    <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mt-1">
                      {featuredBriefs.find(b => b.id === viewingBrief)?.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => { setViewingBrief(null); setBriefHtml(''); }}
                    className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
                  >
                    <X size={20} className="text-zinc-500" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-8">
                  {loadingBrief ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 size={24} className="animate-spin text-zinc-400" />
                    </div>
                  ) : (
                    <div
                      className="prose prose-zinc max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-li:leading-relaxed prose-blockquote:border-micron-eggplant prose-blockquote:text-zinc-700"
                      dangerouslySetInnerHTML={{ __html: briefHtml }}
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
