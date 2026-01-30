import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { ScanFace, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const teslaCards = [
  { 
    id: 1, 
    title: "REAL-WORLD INFERENCE", 
    subtitle: "Optimus in the Wild",
    content: "Training data is only as good as the environment. 1020 E Warm Springs offers a complex, multi-variable domestic environment to train Optimus bots.",
    icon: <ScanFace />,
    colSpan: "md:col-span-2", // Full width
    image: "https://images.unsplash.com/photo-1596766728080-6058e50bb777?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-zinc-900 to-black", // Dark Gray/Black gradient
    border: "border-white/10"
  }
];

export const SectionServingTesla: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  return (
    <section id="serving-tesla" className="container mx-auto px-6 py-24 md:px-12 bg-white text-zinc-900">
      {/* Header - Animated Reveal */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="mb-20 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-10"
      >
        <div className="flex-shrink-0">
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">05 / PARTNERSHIP</span>
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-zinc-900 leading-none">SERVING TESLA</h2>
        </div>

        {/* Added Lorem Ipsum Description */}
        <div className="md:ml-auto max-w-2xl pb-1">
             <div className="pl-6 border-l-4 border-zinc-900/20 hover:border-zinc-900 transition-colors duration-500">
                <p className="text-lg font-light text-zinc-600 leading-snug font-body">
                   <span className="font-bold text-zinc-900 block mb-2 text-xl md:text-2xl uppercase tracking-tighter font-sans">
                       AUTONOMOUS FUTURE.
                   </span>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
             </div>
        </div>
      </motion.div>

      {/* Single Full Width Card */}
      <div className="w-full">
        {teslaCards.map((card, i) => (
          <BentoCard 
            key={card.id} 
            className={`
                flex flex-col justify-between min-h-[450px] relative group overflow-hidden
            `}
            gradient="bg-zinc-900" 
            borderColor={card.border}
            delay={i * 0.1}
            onClick={() => setModalData({
                title: card.title,
                subtitle: card.subtitle,
                category: 'showcase',
                tags: ['Tesla', 'Innovation', 'Future'],
                content: <p className="text-xl text-zinc-300 leading-relaxed">{card.content}</p>
            })}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                <img src={card.image} alt="" className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-90`} />
            </div>

            <div className="relative z-10 flex justify-between items-start mb-6">
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md group-hover:bg-white/10 transition-all duration-300 shadow-xl">
                  {React.cloneElement(card.icon as React.ReactElement<any>, { size: 28, className: "text-white" })}
               </div>
               <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="text-white/80" size={32} />
               </div>
            </div>

            <div className="relative z-10 mt-auto max-w-4xl">
               <div className="inline-block px-3 py-1 mb-4 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-400 bg-black/30 backdrop-blur-sm">
                  {card.subtitle}
               </div>
               <h3 className={`text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none`}>
                   {card.title}
               </h3>
               <div className="h-0.5 w-16 bg-micron-green mb-6 group-hover:w-32 transition-all duration-500"></div>
               <p className="text-zinc-300 font-body text-xl md:text-2xl leading-relaxed max-w-2xl group-hover:text-white transition-colors duration-300">
                 {card.content}
               </p>
            </div>
          </BentoCard>
        ))}
      </div>

      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};