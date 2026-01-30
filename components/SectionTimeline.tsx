import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Calendar, PenTool, Activity, Zap } from 'lucide-react';

const timelineEvents = [
  { 
    id: 1, 
    date: "NOW", 
    title: "The Lease", 
    desc: "Contract signing and transition planning.",
    detail: "Immediate activation. Website launch. Handover of keys. The property shifts from private residence to corporate asset status.",
    icon: <PenTool />,
    gradient: "bg-micron-black",
    hoverColor: "text-micron-green"
  },
  { 
    id: 2, 
    date: "MONTH 1", 
    title: "Access Begins", 
    desc: "Calendar booking opens. Executive onboarding.",
    detail: "Soft launch. Board members begin booking stays. Initial feedback loop established with executive assistants.",
    icon: <Calendar />,
    gradient: "bg-micron-grey1",
    hoverColor: "text-micron-eggplant-light"
  },
  { 
    id: 3, 
    date: "PHASE 1", 
    title: "Wellness Install", 
    desc: "Sauna, Cold Plunge, and WBV integration.",
    detail: "Installation of world-class recovery modalities. Geothermal heating loop optimized for the new amenities.",
    icon: <Activity />,
    gradient: "bg-micron-green", // Green (1 per section)
    hoverColor: "text-micron-eggplant"
  },
  { 
    id: 4, 
    date: "2027", 
    title: "Full Autonomy", 
    desc: "Tesla Optimus & Cybercab deployment.",
    detail: "The house becomes a living lab. Cybercab handles all transport. Optimus manages housekeeping and security.",
    icon: <Zap />,
    gradient: "bg-micron-eggplant", // Eggplant (1 per section)
    hoverColor: "text-micron-green"
  }
];

export const SectionTimeline: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  return (
    <section id="timeline" className="container mx-auto px-6 py-24 md:px-12 mb-20 bg-white text-zinc-900">
      {/* Consistent Header */}
      <div className="mb-20 flex flex-col md:flex-row md:items-end gap-6 border-b border-zinc-200 pb-8">
        <div>
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">05 / Roadmap</span>
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-zinc-900 leading-none">Timeline</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {timelineEvents.map((item, i) => (
          <BentoCard 
            key={item.id} 
            delay={i * 0.1}
            className={`flex flex-col justify-between min-h-[250px] border border-white/5`}
            gradient={item.gradient}
            onClick={() => setModalData({
                title: item.title,
                subtitle: item.date,
                category: 'reference',
                content: <p className="text-lg text-zinc-300">{item.detail}</p>
            })}
          >
             <div className="flex justify-between items-start">
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase text-white backdrop-blur-md border border-white/5 group-hover:bg-white/20 transition-colors">
                    {item.date}
                </div>
                <div className="text-zinc-500 group-hover:text-white transition-colors duration-300">
                    {item.icon}
                </div>
             </div>

             <div className="mt-8">
                 <h3 className={`text-2xl font-bold text-white mb-2 group-hover:${item.hoverColor} transition-colors duration-300`}>{item.title}</h3>
                 <p className="text-sm text-zinc-400 leading-relaxed font-body group-hover:text-zinc-200 transition-colors duration-300">
                    {item.desc}
                 </p>
             </div>
             
             {/* Timeline Connector Visual */}
             {i < timelineEvents.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-zinc-800 hidden lg:block translate-x-4 z-10" />
             )}
          </BentoCard>
        ))}
      </div>
      
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};