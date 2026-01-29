import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Wine, Car, Globe2, Sparkles, Utensils, Flame, Leaf, Music, Activity, Heart } from 'lucide-react';

const useCases = [
  { id: 1, title: "Vintner Dinner", text: "Snake River Valley wines. 6 executives. 1906 dining room.", icon: <Wine />, gradient: "bg-zinc-950" }, // Deepest Black
  { id: 2, title: "Autonomous Arrival", text: "Board member lands at BOI. Cybercab waiting. Optimus opens door.", icon: <Car />, gradient: "bg-micron-blue" }, // ACCENT: Blue
  { id: 3, title: "Executive Relocation", text: "Munich to Boise. 2 weeks in a real neighborhood.", icon: <Globe2 />, gradient: "bg-black" }, // Pitch Black
  { id: 4, title: "Wellness Morning", text: "Deck. Hot tub. Sauna. Contrast therapy.", icon: <Sparkles />, gradient: "bg-micron-green" }, // ACCENT: Green
  { id: 5, title: "St. Luke's Support", text: "Family with child at hospital. <1 mile away. A home.", icon: <Heart />, gradient: "bg-zinc-800" }, // Lighter Zinc
  { id: 6, title: "Tailgate Brunch", text: "Before BSU football. Local diner food. Boise beer.", icon: <Utensils />, gradient: "bg-zinc-900" }, // Standard Zinc
  { id: 7, title: "Fireside Chat", text: "Governor & Executives. Completely private. Hiding in plain sight.", icon: <Flame />, gradient: "bg-zinc-950" }, // Deepest Black
  { id: 8, title: "Harvest Dinner", text: "Fall. Produce from property's fruit trees & grapevine.", icon: <Leaf />, gradient: "bg-zinc-800" }, // Lighter Zinc
  { id: 9, title: "Cultural Hub", text: "Pre-Treefort cocktails. Post-Philharmonic gathering.", icon: <Music />, gradient: "bg-black" }, // Pitch Black
  { id: 10, title: "Recovery Protocol", text: "Whole body vibration. Geothermal warmth. Quiet.", icon: <Activity />, gradient: "bg-micron-eggplant" }, // ACCENT: Dark Eggplant
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
      {/* Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end gap-6 border-b border-zinc-200 pb-8">
        <div>
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">02 / Experiences</span>
           <h2 className="text-5xl md:text-6xl font-bold font-micron uppercase tracking-tight text-zinc-900 leading-none">The Experiences</h2>
        </div>
        <div className="md:ml-auto max-w-lg">
             <p className="text-zinc-500 text-sm">Intimate. Authentic. Inaccessible by design.</p>
        </div>
      </div>

      {/* 5 Column Grid - FORCED (2 Rows of 5) - Explicit Grid Template */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {useCases.map((uc, i) => (
          <BentoCard 
            key={uc.id} 
            className={`flex flex-col justify-between min-h-[200px] group`}
            gradient={uc.gradient} 
            delay={i * 0.05}
            onClick={() => openModal(uc)}
          >
            <div className="flex justify-between items-start mb-4">
                <div className="text-white/80 group-hover:text-white transition-colors p-2 bg-white/10 rounded-lg border border-white/5 backdrop-blur-sm">
                   {uc.icon}
                </div>
                <span className="text-[10px] font-bold text-white/30">0{i+1}</span>
            </div>
            
            <div>
               <h3 className="font-bold text-sm text-white mb-2 leading-tight">{uc.title}</h3>
               <p className="text-[10px] leading-relaxed font-body text-white/50 line-clamp-3 group-hover:text-white/80 transition-colors">{uc.text}</p>
            </div>

          </BentoCard>
        ))}
      </div>

      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};