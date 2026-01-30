import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Calendar, PenTool, Activity, Zap, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const timelineEvents = [
  { 
    id: 1, 
    date: "NOW", 
    title: "AGREEMENT", 
    desc: "Establishing the partnership framework.",
    detail: "Finalizing the agreement between Micron and the property stakeholders. Defining the scope of the prototype relationship.",
    icon: <FileText />,
    gradient: "bg-micron-black",
  },
  { 
    id: 2, 
    date: "MAR 1", 
    title: "PROTOCOLS", 
    desc: "Confirming prototype details.",
    detail: "Defining specific testing parameters for Optimus. Establishing liability, insurance, and operational protocols for the residence.",
    icon: <PenTool />,
    gradient: "bg-micron-grey2",
  },
  { 
    id: 3, 
    date: "APR 1", 
    title: "WELLNESS INSTALL", 
    desc: "Sauna, Cold Plunge, and WBV integration.",
    detail: "Installation of world-class recovery modalities. Geothermal heating loop optimized for the new amenities.",
    icon: <Activity />,
    gradient: "bg-micron-green",
  },
  { 
    id: 4, 
    date: "MAY 1", 
    title: "ACCESS BEGINS", 
    desc: "Calendar booking opens.",
    detail: "Soft launch. Board members begin booking stays. Initial feedback loop established with executive assistants.",
    icon: <Calendar />,
    gradient: "bg-micron-eggplant-light",
  },
  { 
    id: 5, 
    date: "2027", 
    title: "FULL AUTONOMY", 
    desc: "Tesla Optimus & Cybercab deployment.",
    detail: "The house becomes a living lab. Cybercab handles all transport. Optimus manages housekeeping and security.",
    icon: <Zap />,
    gradient: "bg-micron-eggplant",
  }
];

export const SectionTimeline: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  return (
    <section id="timeline" className="container mx-auto px-6 py-24 md:px-12 mb-20 bg-white text-zinc-900">
      {/* Consistent Header - Animated Reveal */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="mb-20 flex flex-col md:flex-row md:items-end gap-6 border-b border-zinc-200 pb-8"
      >
        <div>
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">06 / Roadmap</span>
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-grey1 leading-none">Timeline</h2>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {timelineEvents.map((item, i) => (
          <BentoCard 
            key={item.id} 
            delay={i * 0.1}
            className={`flex flex-col min-h-[300px] relative`}
            gradient={item.gradient}
            textColor="text-white"
            borderColor="border-white/10"
            onClick={() => setModalData({
                title: item.title,
                subtitle: item.date,
                category: 'reference',
                content: <p className="text-lg text-zinc-300">{item.detail}</p>
            })}
          >
             {/* Icon Top Left - Matched to Experiences Style (No Circle) */}
             <div className="absolute top-8 left-8 text-white group-hover:scale-110 transition-transform duration-300">
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 18, strokeWidth: 1.5, className: "text-white" })}
             </div>

             {/* Content Container */}
             <div className="flex flex-col items-center justify-center h-full pt-8 text-center px-2">
                 {/* Date as Header in Center */}
                 <div className="mb-6">
                    <span className="text-2xl font-black uppercase tracking-widest text-white/90 drop-shadow-sm font-sans">
                        {item.date}
                    </span>
                    <div className="h-0.5 w-8 bg-white/30 mx-auto mt-2"></div>
                 </div>

                 <div className="mt-2">
                     <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-tight leading-none">{item.title}</h3>
                     <p className="text-white/70 font-body text-xs leading-relaxed group-hover:text-white transition-colors duration-300">
                        {item.desc}
                     </p>
                 </div>
             </div>
             
             {/* Timeline Connector - Adjusted position */}
             {i < timelineEvents.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-white/20 hidden xl:block translate-x-4 z-10">
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/40"></div>
                </div>
             )}
          </BentoCard>
        ))}
      </div>
      
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};