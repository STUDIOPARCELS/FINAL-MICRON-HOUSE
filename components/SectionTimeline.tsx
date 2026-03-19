
import React from 'react';
import { motion } from 'framer-motion';

const roadmapItems = [
  { 
    id: 1, 
    date: "NOW", 
    title: "SITE VISIT", 
    subtitle: "Confirm fit, scope, and operating priorities on site.", 
    bg: "bg-micron-eggplant",
    text: "text-white"
  },
  { 
    id: 2, 
    date: "DAY 30", 
    title: "PROGRAM ALIGNMENT", 
    subtitle: "Define privacy, hosting, security, service, and mobility requirements.", 
    bg: "bg-micron-green",
    text: "text-white"
  },
  { 
    id: 3, 
    date: "MONTHS 1–12", 
    title: "TESTING", 
    subtitle: "Run the living-lab phase across arrivals, stays, dinners, events, and daily household use.", 
    bg: "bg-micron-grey1",
    text: "text-white"
  },
  { 
    id: 4, 
    date: "PHASE 2", 
    title: "OPERATIONAL LAUNCH", 
    subtitle: "Activate Micron House in full operation.", 
    bg: "bg-micron-eggplant-light",
    text: "text-white"
  }
];

export const SectionTimeline: React.FC = () => {

  // Randomized staggered delay array for the 5 items
  const staggeredDelays = [0, 0.3, 0.1, 0.4];

  return (
    // REDUCED PADDING: py-16 -> py-10, UPDATED mobile padding to px-8
    <section id="timeline" className="container mx-auto px-8 md:px-12 pt-12 pb-6 md:pb-12 text-zinc-900">
      
          {/* Header Row - REMOVED OUTER BENTO WRAPPER */}
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-4 md:mb-12">
              <div className="flex-shrink-0">
                  <span className="block text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">05 / DEPLOYMENT</span>
                  {/* UPDATED: Changed color to text-micron-green */}
                  <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-green leading-none font-sans">
                      ROADMAP
                  </h2>
              </div>
          </div>

          {/* Horizontal Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {roadmapItems.map((item, i) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ delay: staggeredDelays[i] || 0, duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`
                        ${item.bg} ${item.text} 
                        h-[260px] rounded-2xl p-6 flex flex-col justify-between 
                        relative overflow-hidden group 
                        /* FLOATING SHADOW UPDATE */
                        shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)]
                        hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] 
                        hover:-translate-y-2
                        transition-all duration-300
                        border-t border-white/20 border-l border-white/10 border-b border-black/10 border-r border-black/10
                    `}
                >
                    {/* 3D Bevel Highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                    {/* Top Left Icon/Number Indicator */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-xs font-bold shadow-sm group-hover:bg-white/20 transition-colors">
                            {item.id}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/60">{item.date}</span>
                    </div>

                    {/* Center Content */}
                    <div className="mt-auto relative z-10">
                        
                        {/* UPDATED: Reduced font size to text-lg md:text-xl to ensure single line for "PROTOCOL ASSESSMENT" */}
                        <h3 className="text-lg md:text-xl font-black uppercase leading-[0.9] mb-2 tracking-tight drop-shadow-md">
                            {item.title}
                        </h3>
                        
                        {/* Subtitle text */}
                        <p className="text-base text-white/70 font-medium leading-relaxed mt-1">
                            {item.subtitle}
                        </p>
                    </div>
                </motion.div>
            ))}
          </div>

    </section>
  );
};
