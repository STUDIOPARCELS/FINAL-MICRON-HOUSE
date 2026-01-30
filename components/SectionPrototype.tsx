import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const getCardData = (id: number): ModalContent => {
  const base = { category: 'cinematic' as const, label: 'Vision' };
  switch(id) {
    case 1: return { 
        ...base, 
        label: 'VISION',
        title: 'PROTOTYPE', 
        modalLayout: 'default', 
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', 
        content: (
            <div className="space-y-8">
                <div>
                    <h3 className="text-micron-green font-bold uppercase tracking-wide text-sm mb-2">A NEW PARADIGM</h3>
                    <p>The Autonomous Corporate Residence establishes a new asset class: a private sanctuary where security, maintenance, and hospitality are serviced through robotics and AI. It is the concept of the first AI-integrated corporate residence—Optimus and Cybercab serving as the service layer.</p>
                </div>
                <div className="h-px bg-white/10 w-full"></div>
                <div>
                    <h3 className="text-micron-green font-bold uppercase tracking-wide text-sm mb-2">THE LIVING LAB</h3>
                    <p>The 3BR/4BA home begins as a high-complexity testing ground for Tesla integration. By 2027, it becomes the first robotic-integrated residence in America, where abstract technology becomes a tangible, lived experience.</p>
                </div>
            </div>
        )
    };
    case 2: return { 
        ...base, 
        title: 'timing', 
        modalLayout: 'reverse', 
        image: 'https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?q=80&w=2000&auto=format&fit=crop', 
        content: (
            <div className="space-y-8">
                <div>
                    <h3 className="text-micron-eggplant-light font-bold uppercase tracking-wide text-sm mb-2">BOISE’S MOMENT</h3>
                    <p>A Rising Star. The convergence of safety, economic stability, and exceptional quality of life. One of the safest cities in the country, where billion-dollar industry meets world-class talent. A capital city ascending on the national stage.</p>
                </div>
                <div className="h-px bg-white/10 w-full"></div>
                <div>
                    <h3 className="text-micron-eggplant-light font-bold uppercase tracking-wide text-sm mb-2">WORLD-CLASS CULTURE & RECREATION</h3>
                    <p>A culinary scene defined by James Beard winners and Michelin-starred talent, supported by award-winning vineyards. Treefort Music Fest and the Boise Philharmonic drive the cultural calendar. Immediate outdoor access—fly fishing the Boise River and skiing at Bogus Basin—balances corporate output with physical restoration.</p>
                </div>
                <div className="h-px bg-white/10 w-full"></div>
                <div>
                    <h3 className="text-micron-eggplant-light font-bold uppercase tracking-wide text-sm mb-2">ORIGINAL SUSTAINABLE ENERGY</h3>
                    <p>Located across the street from the C.W. Moore House (1891), the first geothermally heated residence in America. This site marks the birthplace of the nation's first district heating system. A legacy of energy independence that validates the modern sustainable vision.</p>
                </div>
            </div>
        )
    };
    case 3: return { 
        ...base, 
        label: undefined, 
        title: 'COLLABORATION', 
        modalLayout: 'vertical-text-top', 
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop', 
        content: (
            <div className="space-y-8">
                <div>
                    <h3 className="text-micron-green font-bold uppercase tracking-wide text-sm mb-2">TWO COMPANIES, CONVERGING HISTORIES</h3>
                    <p>Micron (founded 1978, Boise) and Tesla (founded 2003) are driven by aligned trajectories. Tesla’s mission to "accelerate the world's transition to sustainable energy" and "build a world of amazing abundance" is powered by Micron’s memory.</p>
                </div>
                <div className="h-px bg-white/10 w-full"></div>
                <div>
                    <h3 className="text-micron-green font-bold uppercase tracking-wide text-sm mb-2">ALIGNED MISSIONS</h3>
                    <p>Micron supplies DRAM/NAND for Tesla’s HW3 and HW4, memory for Media Control Units, and HBM for xAI. The Micron House brings both together just 15 minutes from HQ. The chips enabling Optimus and Cybercab originate here. The silicon developed nearby returns as the autonomous hospitality that runs the home.</p>
                </div>
            </div>
        )
    };
    case 4: return { 
        ...base, 
        title: 'FOUNDATION', 
        modalLayout: 'vertical-image-top', 
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop', // Updated to a reliable architectural image
        content: (
        <div className="h-full flex flex-col">
           <div className="mb-10">
               <h3 className="text-3xl md:text-4xl text-white font-black uppercase leading-none tracking-tighter mb-6">
                 WITHOUT PLACE,<br/> 
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-micron-green to-emerald-400">THERE IS NO PERSPECTIVE</span>
               </h3>
               <div className="w-full h-px bg-gradient-to-r from-white/20 to-transparent"></div>
           </div>
           
           <div className="space-y-10 overflow-y-auto pr-2 custom-scrollbar">
               {/* Item 1 */}
               <div className="relative pl-6 border-l-2 border-micron-green/30 hover:border-micron-green transition-colors duration-500 group">
                  <h4 className="text-micron-green font-bold uppercase text-xs tracking-[0.2em] mb-2 group-hover:text-white transition-colors">The Origin Point</h4>
                  <p className="text-zinc-400 text-lg font-light leading-relaxed group-hover:text-zinc-300 transition-colors">
                    Located across the street from the C.W. Moore House (1891), the first geothermally heated residence in America. This site marks the birthplace of the nation's first district heating system. 177°F water rises naturally from the earth to heat this home, the State Capitol, and the surrounding historic district.
                  </p>
               </div>

               {/* Item 2 */}
               <div className="relative pl-6 border-l-2 border-micron-eggplant-light/30 hover:border-micron-eggplant-light transition-colors duration-500 group">
                  <h4 className="text-micron-eggplant-light font-bold uppercase text-xs tracking-[0.2em] mb-2 group-hover:text-white transition-colors">Natural Stewardship</h4>
                  <p className="text-zinc-400 text-lg font-light leading-relaxed group-hover:text-zinc-300 transition-colors">
                    A property maintained under single ownership for 25 years. Defined by producing fruit trees, Concord grapevines, and deep wellness infrastructure. The oldest renewable energy in the West powers a living, breathing home, anchoring the technology in an organic reality.
                  </p>
               </div>

               {/* Item 3 - Feature Box */}
               <div className="bg-gradient-to-br from-white/5 to-black rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-xl">
                  <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] mb-4 flex items-center gap-3">
                     <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                     </span>
                     Earth Meets Stars
                  </h4>
                  <p className="text-zinc-300 text-lg leading-relaxed">
                    Energy from the ground meets energy from the stars. Heat bubbles up through the pipes to warm the structure; intelligence beams down via Starlink to power the robotics. This is where the abstract becomes physical. Where cosmic-scale innovation touches ground.
                  </p>
               </div>
           </div>
        </div>
    )};
    default: return { ...base, title: '', content: null, category: 'cinematic' };
  }
};

export const SectionPrototype: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  return (
    <section id="prototype" className="container mx-auto px-6 py-24 md:px-12 bg-white text-zinc-900">
      
      {/* Header - Animated Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-20 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-10"
      >
        <div className="flex-shrink-0">
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">01 / VISION</span>
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-green leading-none font-sans">A NEW DAY</h2>
        </div>
        <div className="md:ml-auto max-w-2xl pb-1">
          <div className="pl-6 border-l-4 border-micron-eggplant/20 hover:border-micron-eggplant transition-colors duration-500">
             <p className="text-base font-light text-zinc-600 leading-snug font-body">
               <span className="font-bold text-micron-eggplant block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                   MICRON. TESLA. BOISE.
               </span>
               Three forces converge at a single address — grounded in a city ascending on the national stage — to present the first autonomous residence.
             </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Card 1: PROTOTYPE */}
        <BentoCard 
          className="flex flex-col h-[480px] p-8 relative overflow-hidden group" 
          gradient="bg-micron-black" 
          textColor="text-white"
          borderColor="border-white/10"
          delay={0.1} 
          hoverEffect={true}
          onClick={() => setModalData(getCardData(1))}
        >
             <div className="relative z-10 mt-auto">
                 <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-green transition-colors duration-300 mb-4">
                    PROTOTYPE
                 </h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                    A New Paradigm
                 </p>
                 <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={18} className="text-white" />
                 </div>
             </div>
        </BentoCard>

        {/* Card 2: COLLABORATION */}
        <BentoCard 
          className="flex flex-col h-[480px] p-8 relative overflow-hidden group" 
          gradient="bg-micron-grey1" 
          textColor="text-white"
          borderColor="border-white/10"
          delay={0.2} 
          hoverEffect={true}
          onClick={() => setModalData(getCardData(3))}
        >
             <div className="relative z-10 mt-auto">
                 <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-green transition-colors duration-300 mb-4">
                    COLLABORATION
                 </h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                    Shared Missions
                 </p>
                 <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={18} className="text-white" />
                 </div>
             </div>
        </BentoCard>

        {/* Card 3: TIMING */}
        <BentoCard 
            className="flex flex-col h-[480px] p-8 relative overflow-hidden group" 
            gradient="bg-micron-green"
            textColor="text-white"
            borderColor="border-white/10"
            delay={0.3} 
            hoverEffect={true}
            onClick={() => setModalData(getCardData(2))}
        >
           <div className="relative z-10 mt-auto">
                 <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-eggplant transition-colors duration-300 mb-4">
                    TIMING
                 </h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                    Boise's Moment
                 </p>
                 <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={18} className="text-white" />
                 </div>
           </div>
        </BentoCard>

        {/* Card 4: FOUNDATION */}
        <BentoCard 
           className="flex flex-col h-[480px] p-8 relative overflow-hidden group" 
           gradient="bg-micron-eggplant" 
           textColor="text-white"
           borderColor="border-white/10"
           delay={0.4} 
           hoverEffect={true}
           onClick={() => setModalData(getCardData(4))}
        >
             <div className="relative z-10 mt-auto">
                 <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-green transition-colors duration-300 mb-4">
                    FOUNDATION
                 </h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                    Place & Perspective
                 </p>
                 <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={18} className="text-white" />
                 </div>
             </div>
        </BentoCard>

      </div>
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};