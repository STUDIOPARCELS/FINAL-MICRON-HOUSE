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
    desc: "Establishing the partnership.",
    detail: "Finalizing the agreement between Micron and the property stakeholders. Defining the scope of the prototype relationship.",
    icon: <FileText />,
    gradient: "bg-micron-black",
  },
  { 
    id: 2, 
    date: "MAR 1", 
    title: "PROTOCOL ASSESSMENT", 
    desc: "Defining operational parameters.",
    detail: "Defining specific testing parameters for Optimus. Establishing liability, insurance, and operational protocols for the residence.",
    icon: <PenTool />,
    gradient: "bg-micron-grey1", // Changed to Dark Gray #353942
  },
  { 
    id: 3, 
    date: "APR 1", 
    title: "WELLNESS INSTALL", 
    desc: "Sauna, Cold Plunge, and WBV.",
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
    gradient: "bg-micron-grey3",
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
    <section id="timeline" className="container mx-auto px-6 py-8 md:px-12 md:py-24 mb-20 bg-zinc-50 text-zinc-900">
      {/* Consistent Header */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: false, amount: 0.2 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="mb-20 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-10"
      >
        <div className="flex-shrink-0">
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">06 / Roadmap</span>
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-grey1 leading-none font-sans">EXECUTION ROADMAP</h2>
        </div>

        <div className="md:ml-auto max-w-2xl pb-1">
             <div className="pl-6 border-l-4 border-micron-grey1/20 hover:border-micron-grey1 transition-colors duration-500">
                <p className="text-lg font-light text-zinc-600 leading-snug font-body">
                   <span className="font-bold text-micron-grey1 block mb-2 text-xl md:text-2xl uppercase tracking-tighter font-sans">
                       TIMELINE.
                   </span>
                   Moving from agreement to installation, then to a fully active testing environment.
                </p>
             </div>
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
             {/* Icon Top Left */}
             <div className="absolute top-8 left-8 text-white group-hover:scale-110 transition-transform duration-300">
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 18, strokeWidth: 1.5, className: "text-white" })}
             </div>

             <div className="flex flex-col items-center justify-start h-full pt-12 text-center px-2">
                 <div className="mb-6">
                    <span className="text-2xl font-black uppercase tracking-widest text-white/90 drop-shadow-sm font-sans">
                        {item.date}
                    </span>
                    <div className="h-0.5 w-8 bg-white/30 mx-auto mt-2"></div>
                 </div>

                 <div className="mt-2">
                     <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-tight leading-none">{item.title}</h3>
                     <p className="text-white/90 font-body text-xs leading-relaxed transition-colors duration-300">
                        {item.desc}
                     </p>
                 </div>
             </div>
             
          </BentoCard>
        ))}
      </div>
      
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};