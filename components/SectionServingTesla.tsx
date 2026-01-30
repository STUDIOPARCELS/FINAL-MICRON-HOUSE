import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Zap, Cpu, ScanFace, BatteryCharging, Lock } from 'lucide-react';

const teslaCards = [
  { 
    id: 1, 
    title: "REAL-WORLD INFERENCE", 
    subtitle: "Optimus in the Wild",
    content: "Training data is only as good as the environment. 1020 E Warm Springs offers a complex, multi-variable domestic environment to train Optimus bots.",
    icon: <ScanFace size={24} className="text-white group-hover:text-micron-green transition-colors duration-300" />,
    colSpan: "md:col-span-2",
    gradient: "bg-micron-black", // Black BG
    hoverClass: "group-hover:text-micron-green" // Green Hover
  },
  { 
    id: 2, 
    title: "CYBERCAB HUB", 
    subtitle: "Autonomous docking",
    content: "A private driveway and garage configured for inductive charging.",
    icon: <BatteryCharging size={24} className="text-micron-green group-hover:text-white transition-colors duration-300" />,
    colSpan: "md:col-span-1",
    gradient: "bg-micron-grey2", // Grey BG
    hoverClass: "group-hover:text-micron-eggplant-light" // Light Eggplant Hover
  },
  { 
    id: 3, 
    title: "EXECUTIVE SANDBOX", 
    subtitle: "Leadership Interface",
    content: "A private, secure location for high-level strategy between Micron and Tesla leadership.",
    icon: <Lock size={24} className="text-white group-hover:text-micron-eggplant-light transition-colors duration-300" />,
    colSpan: "md:col-span-1",
    gradient: "bg-micron-eggplant", // Eggplant BG
    hoverClass: "group-hover:text-micron-green" // Green Hover
  },
  { 
    id: 4, 
    title: "ENERGY INDEPENDENCE", 
    subtitle: "Powerwall + Geothermal",
    content: "Demonstrating the future of home energy. Combining Boise's historic geothermal heat with Tesla Solar and Powerwall storage.",
    icon: <Zap size={24} className="text-yellow-400 group-hover:text-white transition-colors duration-300" />,
    colSpan: "md:col-span-2",
    gradient: "bg-micron-green", // Green BG
    hoverClass: "group-hover:text-micron-eggplant-light" // Light Eggplant Hover (White is default)
  }
];

export const SectionServingTesla: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  return (
    <section id="serving-tesla" className="container mx-auto px-6 py-24 md:px-12 bg-white text-zinc-900">
      <div className="mb-20 flex flex-col md:flex-row md:items-end gap-6 border-b border-zinc-200 pb-8">
        <div>
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">05 / PARTNERSHIP</span>
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-zinc-900 leading-none">SERVING TESLA</h2>
        </div>
        <div className="md:ml-auto max-w-md pb-1">
          <p className="text-zinc-500 font-body text-sm leading-relaxed">
            This isn't just a house. It's a live-fire testing ground for the technologies defining the next century.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teslaCards.map((card, i) => (
          <BentoCard 
            key={card.id} 
            className={`
                flex flex-col justify-between min-h-[225px] ${card.colSpan} 
            `}
            gradient={card.gradient} 
            delay={i * 0.1}
            onClick={() => setModalData({
                title: card.title,
                subtitle: card.subtitle,
                category: 'showcase',
                tags: ['Tesla', 'Innovation', 'Future'],
                content: <p className="text-xl text-zinc-300 leading-relaxed">{card.content}</p>
            })}
          >
            <div className="flex justify-between items-start mb-6">
               <div className="p-2 rounded-full bg-white/10 border border-white/5 backdrop-blur-sm group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300 shadow-sm">
                  {card.icon}
               </div>
               <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors duration-300">
                  Concept {card.id}
               </div>
            </div>

            <div className="mt-auto">
               <h3 className={`text-2xl font-bold text-white mb-2 ${card.hoverClass} transition-colors duration-300`}>{card.title}</h3>
               <p className="text-white/60 font-body text-xs leading-relaxed max-w-md line-clamp-2 group-hover:text-zinc-200 transition-colors duration-300">
                 {card.content}
               </p>
            </div>

            {/* Decorative Tech Elements */}
            <div className="absolute right-0 bottom-0 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 ease-in-out">
                <Cpu size={80} />
            </div>
          </BentoCard>
        ))}
      </div>

      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};