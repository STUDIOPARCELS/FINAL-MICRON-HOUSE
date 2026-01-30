import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Wine, Car, Globe2, Sparkles, Utensils, Flame, Leaf, Music, Activity, Heart } from 'lucide-react';

// Reordered for contrast: Alternating Dark / Light / Color
const useCases = [
  // 1. Black
  { id: 1, title: "Vintner Dinners", text: "Snake River Valley wines. 6 executives. 1906 dining room.", icon: <Wine />, gradient: "bg-micron-black", hoverClass: "group-hover:text-micron-green" }, 
  
  // 2. Light Blue (Contrast against Black)
  { id: 3, title: "Executive Relocations", text: "Munich to Boise. 2 weeks in a real neighborhood.", icon: <Globe2 />, gradient: "bg-micron-eggplant-light", hoverClass: "group-hover:text-micron-green" },
  
  // 3. Deep Eggplant (Dark)
  { id: 10, title: "Recovery Protocols", text: "Whole body vibration. Geothermal warmth. Quiet.", icon: <Activity />, gradient: "bg-micron-eggplant", hoverClass: "group-hover:text-micron-green" },
  
  // 4. Green (Bright)
  { id: 2, title: "Autonomous Arrivals", text: "Board member lands at BOI. Cybercab waiting. Optimus opens door.", icon: <Car />, gradient: "bg-micron-green", hoverClass: "group-hover:text-micron-eggplant" },
  
  // 5. Grey (Dark/Neutral)
  { id: 4, title: "Wellness Mornings", text: "Deck. Hot tub. Sauna. Contrast therapy.", icon: <Sparkles />, gradient: "bg-micron-grey1", hoverClass: "group-hover:text-micron-green" },
  
  // 6. Light Blue (Bright)
  { id: 7, title: "Fireside Chats", text: "Governor & Executives. Completely private. Hiding in plain sight.", icon: <Flame />, gradient: "bg-micron-eggplant-light", hoverClass: "group-hover:text-micron-green" },
  
  // 7. Black (Dark)
  { id: 8, title: "Harvest Dinners", text: "Fall. Produce from property's fruit trees & grapevine.", icon: <Leaf />, gradient: "bg-micron-black", hoverClass: "group-hover:text-micron-green" },
  
  // 8. Green (Bright)
  { id: 9, title: "Pre-Event Cocktails", text: "Pre-Treefort cocktails. Post-Philharmonic gathering.", icon: <Music />, gradient: "bg-micron-green", hoverClass: "group-hover:text-micron-eggplant" },
  
  // 9. Deep Eggplant (Dark)
  { id: 5, title: "Medical Support Stays", text: "Family with child at hospital. <1 mile away. A home.", icon: <Heart />, gradient: "bg-micron-eggplant", hoverClass: "group-hover:text-micron-green" },
  
  // 10. Grey (Neutral)
  { id: 6, title: "Tailgate Brunches", text: "Before BSU football. Local diner food. Boise beer.", icon: <Utensils />, gradient: "bg-micron-grey1", hoverClass: "group-hover:text-micron-green" },
];

export const SectionUseCases: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const openModal = (uc: typeof useCases[0]) => {
    setModalData({
      title: uc.title,
      label: "Experience",
      subtitle: "Intimacy and Privacy",
      category: 'showcase',
      content: <p className="text-xl leading-relaxed text-zinc-300 font-body">{uc.text}</p>,
      tags: ['Exclusive', 'Private', 'Turnkey']
    });
  };

  return (
    <section id="use-cases" className="container mx-auto px-6 py-24 md:px-12 bg-white text-zinc-900">
      <div className="mb-16 flex flex-col md:flex-row md:items-end gap-6 border-b border-zinc-200 pb-8">
        <div>
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">03 / USE CASE</span>
           {/* Changed to Blue (Light Eggplant) */}
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant-light leading-none">EXPERIENCES</h2>
        </div>
        <div className="md:ml-auto max-w-lg">
             <p className="text-zinc-500 text-sm">Intimate. Authentic. Inaccessible by design.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {useCases.map((uc, i) => (
          <BentoCard 
            key={uc.id} 
            className={`flex flex-col justify-between min-h-[220px]`}
            gradient={uc.gradient} 
            delay={i * 0.05}
            onClick={() => openModal(uc)}
          >
            <div className="flex justify-between items-start mb-4">
                <div className="text-white/80 group-hover:text-white group-hover:bg-white/20 transition-all duration-300 p-2 bg-white/10 rounded-lg border border-white/5 backdrop-blur-sm">
                   {uc.icon}
                </div>
            </div>
            
            <div>
               <h3 className={`font-bold text-sm text-white mb-2 leading-tight ${uc.hoverClass} transition-colors duration-300`}>{uc.title}</h3>
               <p className="text-[11px] leading-relaxed font-body text-white/50 line-clamp-3 group-hover:text-white/80 transition-colors duration-300">{uc.text}</p>
            </div>

          </BentoCard>
        ))}
      </div>

      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};