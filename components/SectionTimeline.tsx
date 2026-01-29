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
    gradient: "bg-zinc-950"
  },
  { 
    id: 2, 
    date: "MONTH 1", 
    title: "Access Begins", 
    desc: "Calendar booking opens. Executive onboarding.",
    detail: "Soft launch. Board members begin booking stays. Initial feedback loop established with executive assistants.",
    icon: <Calendar />,
    gradient: "bg-zinc-900"
  },
  { 
    id: 3, 
    date: "PHASE 1", 
    title: "Wellness Install", 
    desc: "Sauna, Cold Plunge, and WBV integration.",
    detail: "Installation of world-class recovery modalities. Geothermal heating loop optimized for the new amenities.",
    icon: <Activity />,
    gradient: "bg-zinc-800"
  },
  { 
    id: 4, 
    date: "2027", 
    title: "Full Autonomy", 
    desc: "Tesla Optimus & Cybercab deployment.",
    detail: "The house becomes a living lab. Cybercab handles all transport. Optimus manages housekeeping and security.",
    icon: <Zap />,
    gradient: "bg-gradient-to-br from-indigo-950 to-purple-950" // Pop: Eggplant
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
            className={`flex flex-col justify-between min-h-[250px] group border border-white/5`}
            gradient={item.gradient}
            onClick={() => setModalData({
                title: item.title,
                subtitle: item.date,
                category: 'reference',
                content: <p className="text-lg text-zinc-300">{item.detail}</p>
            })}
          >
             <div className="flex justify-between items-start">
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase text-white backdrop-blur-md border border-white/5">
                    {item.date}
                </div>
                <div className="text-zinc-500 group-hover:text-white transition-colors">
                    {item.icon}
                </div>
             </div>

             <div className="mt-8">
                 <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                 <p className="text-sm text-zinc-400 leading-relaxed font-body">
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