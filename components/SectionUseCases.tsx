import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Wine, Car, BedDouble, Shield, Music, Mic, Armchair, Heart, Trophy, Snowflake, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const useCases = [
  { 
    id: 1, 
    title: "CHEF'S TABLE", 
    text: "A James Beard-recognized chef prepares dinner in the 1906 kitchen. Snake River Valley wines selected by the owner's sommelier network. Six guests. Produce from the property's fruit trees and grapevine when in season.", 
    icon: <Wine />, 
    gradient: "bg-micron-black",
  }, 
  { 
    id: 2, 
    title: "AUTONOMOUS ARRIVAL", 
    text: "Board member lands at BOI. Cybercab waiting at the curb. Autonomous drive through downtown Boise to Warm Springs Avenue. Optimus opens the front door. Luggage handled. Guest settles into a geothermal-heated home.", 
    icon: <Car />, 
    gradient: "bg-micron-green",
  },
  { 
    id: 3, 
    title: "ALPINE DAY", 
    text: "Heli-ski Idaho backcountry. Return to the house for geothermal hot tub, dry sauna, contrast therapy. Recovery meal prepared by a local chef. The mountain and the restoration in the same day.", 
    icon: <Snowflake />, 
    gradient: "bg-micron-eggplant-light",
  },
  { 
    id: 4, 
    title: "SOFT LANDING", 
    text: "Executive relocating from Munich, Seoul, or Tel Aviv. Family arrives before permanent housing is ready. Two weeks in a real Boise neighborhood. Foothills visible from the deck. River walkable.", 
    icon: <BedDouble />, 
    gradient: "bg-zinc-600",
  },
  { 
    id: 5, 
    title: "CONFIDENTIAL COUNSEL", 
    text: "Governor and executives. Investors and founders. Board members and advisors. Fireside conversation. Same neighbors for 25 years. Complete privacy.", 
    icon: <Shield />, 
    gradient: "bg-micron-eggplant",
  },
  { 
    id: 6, 
    title: "PRE-PERFORMANCE", 
    text: "Cocktails before the Boise Philharmonic. Drinks before Ballet Idaho. Gathering before Treefort. The house as staging point for Boise's performing arts calendar.", 
    icon: <Music />, 
    gradient: "bg-micron-black",
  },
  { 
    id: 7, 
    title: "VISITING VOICES", 
    text: "The Boise Art Museum curator discusses a current exhibition. A James Beard chef demonstrates technique. A state official briefs on policy. Intimate lectures and conversations in the living room. Six to eight guests. The expertise comes to the house.", 
    icon: <Mic />, 
    gradient: "bg-zinc-600",
  },
  { 
    id: 8, 
    title: "STAYCATION", 
    text: "Total restoration without leaving the property. Optimus handles the housekeeping. Cybercab is your private driver. A butler and chauffeur service, redefined by robotics. You are taken care of.", 
    icon: <Armchair />, 
    gradient: "bg-micron-green",
  },
  { 
    id: 9, 
    title: "COMPASSIONATE STAY", 
    text: "Family with a child receiving treatment at St. Luke's Medical Center, less than one mile away. A home. Kitchen access. Quiet evenings.", 
    icon: <Heart />, 
    gradient: "bg-micron-eggplant-light",
  },
  { 
    id: 10, 
    title: "GAME DAY", 
    text: "BSU football Saturday. Tailgate brunch at the house. Biscuits from a celebrated local diner. Craft beer from a Boise brewery. Walk to the stadium. Return for evening gathering.", 
    icon: <Trophy />, 
    gradient: "bg-micron-grey2",
  },
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
      {/* Header - Animated Reveal */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="mb-16 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-10"
      >
        <div className="flex-shrink-0">
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">03 / USE CASE</span>
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant-light leading-none">EXPERIENCES</h2>
        </div>
        
        {/* Added Lorem Ipsum Description */}
        <div className="md:ml-auto max-w-2xl pb-1">
             <div className="pl-6 border-l-4 border-micron-eggplant-light/20 hover:border-micron-eggplant-light transition-colors duration-500">
                <p className="text-lg font-light text-zinc-600 leading-snug font-body">
                   <span className="font-bold text-micron-eggplant-light block mb-2 text-xl md:text-2xl uppercase tracking-tighter font-sans">
                       CURATED MOMENTS.
                   </span>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
             </div>
        </div>
      </motion.div>

      {/* 
        Grid / Horizontal Scroll Strategy:
        Mobile: Horizontal Scroll to avoid excessive vertical length (user request).
        Desktop: 5-column Grid.
      */}
      <div className="flex items-center gap-2 mb-4 md:hidden">
          <span className="text-xs text-zinc-400 uppercase tracking-wide">Swipe to explore →</span>
      </div>

      <div className="
        flex overflow-x-auto pb-6 -mx-6 px-6 gap-6 snap-x snap-mandatory 
        md:grid md:grid-cols-5 md:gap-6 md:pb-0 md:mx-0 md:px-0 md:overflow-visible
        scrollbar-hide
      ">
        {useCases.map((uc, i) => (
          <BentoCard 
            key={uc.id} 
            className="
                min-w-[280px] md:min-w-0 snap-center
                flex flex-col justify-between min-h-[340px] group border-none
            "
            gradient={uc.gradient} 
            textColor="text-white"
            borderColor="border-transparent"
            delay={i * 0.05}
            onClick={() => openModal(uc)}
          >
            <div className="mb-6">
                <div className="flex justify-between items-start">
                    {/* Icon container - clean, white, no fill, 50% smaller (18px) */}
                    <div className="flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                       {React.cloneElement(uc.icon as React.ReactElement<any>, { size: 18, strokeWidth: 1.5, className: "text-white" })}
                    </div>
                    {/* Hover indicator */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        <ArrowUpRight className="text-white/70" size={20} />
                    </div>
                </div>
                
                <h3 className="font-bold text-xl text-white mb-3 leading-tight uppercase tracking-tight">
                  {uc.title}
                </h3>
            </div>
            
            <p className="text-sm font-bold text-white/80 leading-relaxed font-sans tracking-wide">
              {uc.text}
            </p>

          </BentoCard>
        ))}
      </div>

      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};