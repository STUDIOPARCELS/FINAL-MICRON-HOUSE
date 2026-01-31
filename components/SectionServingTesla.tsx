import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { ScanFace, ArrowUpRight, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

const teslaCards = [
  { 
    id: 1, 
    title: "REAL-WORLD INFERENCE", 
    subtitle: "Optimus in the Wild",
    content: "Training data is only as good as the environment. 1020 E Warm Springs offers a complex, multi-variable domestic environment to train Optimus bots.",
    icon: <ScanFace />,
    // Updated color to black as requested
    gradient: "bg-micron-black", 
    border: "border-white/10"
  },
  {
    id: 2,
    title: "THE TECTONIC SHIFT",
    subtitle: "Anthropology of the Future",
    content: "Moving beyond laws and sidewalks into the anthropology of the future. How humanity adapts to the 'Crisis of Shared Reality' in the age of ubiquitous robotics.",
    icon: <BrainCircuit />,
    gradient: "bg-micron-grey1", // Dark Gray
    border: "border-white/10"
  }
];

export const SectionServingTesla: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const getModalContent = (id: number) => {
    if (id === 1) {
        return <p className="text-xl text-zinc-300 leading-relaxed">Training data is only as good as the environment. 1020 E Warm Springs offers a complex, multi-variable domestic environment to train Optimus bots.</p>;
    }
    
    // Detailed Content for Tectonic Shift
    return (
        <div className="space-y-12">
            <div>
                <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4 border-l-2 border-micron-eggplant-light pl-4">The Zoom Out</h3>
                <p className="text-xl text-zinc-300 leading-relaxed">
                   We are moving beyond laws and sidewalks into the anthropology of the future. The deployment of billions of humanoid robots in the next 5–10 years will not just change labor; it will fracture the fundamental human experience of "Presence."
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h4 className="text-micron-green font-bold uppercase text-xs tracking-[0.2em] mb-3">The Thesis</h4>
                    <h5 className="text-white text-lg font-bold mb-2">The Crisis of "Shared Reality"</h5>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        For 200,000 years, if you saw a bipedal figure in the distance, you knew it had a mind, a mother, and a mortality. That certainty is about to vanish.
                    </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h4 className="text-micron-eggplant-light font-bold uppercase text-xs tracking-[0.2em] mb-3">The Psychology</h4>
                    <h5 className="text-white text-lg font-bold mb-2">Uncanny Stress & Cognitive Load</h5>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        The human brain has a dedicated "Face Network" (fusiform face area). It is expensive to run. Flooding this network with millions of synthetic faces will cause chronic "Social Inflammation."
                    </p>
                </div>
            </div>

            <div>
                <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4 border-l-2 border-micron-eggplant pl-4">Societal Reaction</h3>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                         <span className="text-white font-bold block mb-1">Analog Zones</span>
                         <p className="text-zinc-400">The rise of clubs, parks, and neighborhoods that strictly ban robots to preserve human-only spaces.</p>
                    </div>
                    <div>
                         <span className="text-white font-bold block mb-1">The Butlerian Jihad</span>
                         <p className="text-zinc-400">Potential visceral, violent attacks on robots by people who feel mocked by the machine's perfection.</p>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  return (
    <section id="serving-tesla" className="container mx-auto px-6 py-8 md:px-12 md:py-24 bg-white text-zinc-900">
      {/* Header - Animated Reveal */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, amount: 0.2 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="mb-20 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-10"
      >
        <div className="flex-shrink-0">
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">05 / PARTNERSHIP</span>
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-zinc-900 leading-none">SERVING TESLA</h2>
        </div>

        {/* Added Description */}
        <div className="md:ml-auto max-w-2xl pb-1">
             <div className="pl-6 border-l-4 border-zinc-900/20 hover:border-zinc-900 transition-colors duration-500">
                <p className="text-lg font-light text-zinc-600 leading-snug font-body">
                   <span className="font-bold text-zinc-900 block mb-2 text-xl md:text-2xl uppercase tracking-tighter font-sans">
                       AUTONOMOUS FUTURE.
                   </span>
                   A living laboratory where the future of robotics meets the reality of daily life. Optimus and Cybercab aren't just tested here—they are the operating system of the home.
                </p>
             </div>
        </div>
      </motion.div>

      {/* Two Column Landscape Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {teslaCards.map((card, i) => (
          <BentoCard 
            key={card.id} 
            className={`
                flex flex-col justify-between min-h-[350px] relative group overflow-hidden
            `}
            gradient={card.gradient} 
            borderColor={card.border}
            textColor="text-white"
            delay={i * 0.1}
            onClick={() => setModalData({
                title: card.title,
                subtitle: card.subtitle,
                category: 'showcase',
                tags: ['Tesla', 'Anthropology', 'Future'],
                content: getModalContent(card.id)
            })}
          >
            {/* Removed explicit arrow div */}

            {/* Content aligned to bottom - matching Vision cards */}
            <div className="relative z-10 mt-auto">
               <h3 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-eggplant-light transition-colors duration-300 mb-4">
                   {card.title}
               </h3>
               <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                  {card.subtitle}
               </p>
            </div>
          </BentoCard>
        ))}
      </div>

      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};