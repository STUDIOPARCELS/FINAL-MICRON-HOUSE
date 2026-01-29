import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';

const getCardData = (id: number): ModalContent => {
  const base = { category: 'cinematic' as const, label: 'Paradigm Shift' };
  switch(id) {
    case 1: return { 
        ...base, 
        title: 'Micron & Boise', 
        content: (
            <div className="space-y-8">
                <div>
                    <h3 className="text-micron-green font-bold uppercase tracking-wide text-sm mb-2">Historical Thread</h3>
                    <p>47 years rooted in Boise. A global technology leader with a $100B NY Megafab starting Jan 2026—yet Boise remains the headquarters. This house is 15 minutes away from that global nerve center.</p>
                </div>
                <div className="h-px bg-white/10 w-full"></div>
                <div>
                    <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-2">Energy Thread</h3>
                    <p>Geothermal since 1892. Micron is moving to 100% renewable energy in the US by 2025, mirroring the clean energy heritage of this site.</p>
                </div>
            </div>
        )
    };
    case 2: return { ...base, title: 'Boise Rising', content: <p>James Beard winners (Komori '23, Alamilla '25). Treefort Music Fest. Thriving downtown. Outdoorsman's paradise—foothills, river, skiing 20 minutes away.<br/><br/>Multiple billion-dollar corporations have sustained the investment that built this city. It is safe, vibrant, and arriving on the national stage.</p> };
    case 3: return { ...base, title: 'The Corporate Alliance', content: <p>Micron supplies DRAM/NAND for Tesla HW3/HW4 (Autopilot, FSD). Powers xAI Grok training (HBM). SpaceX Starlink (radiation-hardened NAND).<br/><br/>Relationship: "Demand-constrained"—Tesla buying as much as Micron can supply. Physically only 15 minutes apart from Micron HQ to Tesla delivery centers.</p> };
    case 4: return { ...base, title: 'Grounding the Paradigm', content: (
        <div>
           <h3 className="font-bold text-white mb-4">Two Things At Once</h3>
           <ol className="list-decimal list-inside space-y-4 mb-8 text-zinc-300">
              <li><span className="text-white font-bold">Private Hospitality:</span> Valuing employees, guests, partners through intimate private experience. Hiding in plain sight.</li>
              <li><span className="text-white font-bold">AI Integration:</span> Working environment where Optimus and Cybercab operate in a real home with real users. 2027 integration timeline.</li>
           </ol>
           <div className="p-6 bg-black/40 border border-white/5 rounded-xl">
              <h4 className="text-sm font-bold text-micron-green mb-4">PROPERTY SPECIFICATIONS</h4>
              <ul className="text-sm space-y-2 text-zinc-400">
                 <li>1020 E Warm Springs Ave</li>
                 <li>1906 Architecture, 3,374 sq ft</li>
                 <li>Geothermal radiant heat (since 1892)</li>
                 <li>Producing fruit trees & Concord grapevine</li>
                 <li>5 min to Capitol, 15 min to Micron HQ</li>
              </ul>
           </div>
        </div>
    )};
    default: return { ...base, title: '', content: null, category: 'cinematic' };
  }
};

export const SectionPrototype: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  // Common styles for the "cover" text to ensure absolute uniformity
  const cardLabelStyle = "text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-auto";
  const cardTitleStyle = "text-3xl font-bold text-white mb-2 font-micron";
  const cardDescStyle = "text-xs text-zinc-400 font-body leading-relaxed max-w-sm";
  
  return (
    <section id="prototype" className="container mx-auto px-6 py-24 md:px-12 bg-white text-zinc-900">
      {/* Header */}
      <div className="mb-20 flex flex-col md:flex-row md:items-end gap-6 border-b border-zinc-200 pb-8">
        <div>
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">01 / Concept</span>
           <h2 className="text-5xl md:text-6xl font-bold font-micron uppercase tracking-tight text-zinc-900 leading-none">Paradigm Shift</h2>
        </div>
        <div className="md:ml-auto max-w-lg pb-1">
          <p className="text-zinc-500 font-body text-sm leading-relaxed">
            From the stars to Warm Springs Avenue. Bringing together history, energy, and culture.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        
        {/* Card 1: Micron & Boise - Standard Dark Zinc */}
        <BentoCard 
          className="group flex flex-col min-h-[350px]" 
          gradient="bg-zinc-900" 
          delay={0.1} 
          onClick={() => setModalData(getCardData(1))}
        >
          <span className={cardLabelStyle}>HERITAGE</span>
          <div className="mt-auto">
             <h3 className={cardTitleStyle}>Roots in History</h3>
             <p className={cardDescStyle}>
               47 years in Boise. Geothermal since 1892. A $100B future built on a century of resilience.
             </p>
          </div>
        </BentoCard>

        {/* Card 2: Boise Rising - Distinct Pitch Black */}
        <BentoCard 
            className="group flex flex-col min-h-[350px] relative overflow-hidden" 
            gradient="bg-black"
            delay={0.2} 
            onClick={() => setModalData(getCardData(2))}
        >
           {/* Subtle Background Image */}
           <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity z-0">
               <img src="https://images.unsplash.com/photo-1445583934509-4ad52d4e9555?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale" />
           </div>
           
           <div className="relative z-10 flex flex-col h-full">
              <span className={cardLabelStyle}>CONTEXT</span>
              <div className="mt-auto">
                 <h3 className={cardTitleStyle}>Boise Rising</h3>
                 <p className={cardDescStyle}>
                   James Beard chefs. Thriving arts. A city arriving on the national stage.
                 </p>
              </div>
           </div>
        </BentoCard>

        {/* Card 3: The Alliance - Dark Zinc */}
        <BentoCard 
          className="group flex flex-col min-h-[350px]" 
          gradient="bg-zinc-950" 
          delay={0.3} 
          onClick={() => setModalData(getCardData(3))}
        >
           <span className={cardLabelStyle}>PARTNERSHIP</span>
           <div className="mt-auto">
              <h3 className={cardTitleStyle}>The Alliance</h3>
              <p className={cardDescStyle}>
                 Micron memory powering Tesla's future. Two giants, 15 minutes apart.
              </p>
           </div>
        </BentoCard>

        {/* Card 4: Grounding the Paradigm - DISTINCT EGGPLANT/PURPLE */}
        <BentoCard 
           className="group flex flex-col min-h-[350px]" 
           gradient="bg-micron-eggplant" 
           delay={0.4} 
           onClick={() => setModalData(getCardData(4))}
        >
           <span className={cardLabelStyle}>THE PARADIGM</span>
           <div className="mt-auto">
               <h3 className={cardTitleStyle}>Grounding the Paradigm</h3>
               <p className={cardDescStyle}>
                   Abstract technology becomes tangible. Private hospitality meets AI integration.
               </p>
           </div>
        </BentoCard>

      </div>
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};