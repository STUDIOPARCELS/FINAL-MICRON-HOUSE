import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { MessageSquare, ShieldCheck, Eye, Activity, Layers, Mountain, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// --- HELPER COMPONENT (Matched to SectionPrototype) ---
const InnerBento = ({ title, children, gradient, icon, className = "", delay = 0, textColor = "text-white", padding = "p-5", direction = "up" }: any) => {
    let initial: { opacity: number; x?: number; y?: number } = { opacity: 0, y: 100 };
    if (direction === "left") initial = { opacity: 0, x: -100 };
    if (direction === "right") initial = { opacity: 0, x: 100 };
    if (direction === "down") initial = { opacity: 0, y: -100 };

    return (
        <motion.div 
            initial={initial}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay, duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className={`
                ${gradient} rounded-xl ${padding} ${textColor} relative overflow-hidden group 
                shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300
                flex flex-col justify-start
                border-t border-l border-white/20 border-b border-white/10 border-r border-white/5
                ${className}
            `}
        >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

            <div className="relative z-10 h-full flex flex-col gap-3">
                {(title || icon) && (
                    <div className="mb-1 shrink-0">
                        <h3 className={`text-sm md:text-base font-black uppercase tracking-tight flex items-center gap-2 drop-shadow-md leading-none ${textColor === 'text-white' ? 'text-white/70' : ''}`}>
                            {icon && React.cloneElement(icon, { size: 18, strokeWidth: 2 })}
                            {title}
                        </h3>
                    </div>
                )}
                <div className={`leading-relaxed font-body font-normal flex-1 ${textColor === 'text-zinc-900' ? 'text-zinc-600' : 'text-white/80'}`}>
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

const teslaCards = [
  // CARD 1: REAL-WORLD INFERENCE
  { 
    id: 2, 
    title: "REAL-WORLD INFERENCE", 
    subtitle: "A Living Laboratory",
    content: "Where Micron executives, engineers, guests, and partners generate domestic intelligence from Optimus and Cybercab — across real dinners, real stays, and real events.",
    icon: null,
    gradient: "bg-micron-grey1", 
    border: "border-white/10",
    subtitleColor: "text-micron-green", 
    descriptionColor: "text-zinc-300 group-hover:text-white transition-colors duration-300",
    titleHoverColor: "group-hover:text-micron-eggplant-light"
  },
  // CARD 2: THE TECTONIC SHIFT
  {
    id: 1,
    title: "A TECTONIC SHIFT", 
    subtitle: "Social Conditions",
    content: "Autonomous systems will enter daily life in a society already strained by AI-driven white-collar displacement, institutional pressure, and public distrust.",
    icon: null,
    gradient: "bg-micron-eggplant-light", 
    border: "border-white/10",
    subtitleColor: "text-zinc-900", 
    descriptionColor: "text-white/90 group-hover:text-white transition-colors duration-300",
    titleHoverColor: "group-hover:text-zinc-100"
  },
  // CARD 3: GENESIS
  {
    id: 3,
    title: "GENESIS", 
    subtitle: "Origin & Intent",
    content: "The strategy, design, and stewardship behind the Micron House concept. Aligning a Boise property with the future Micron and Tesla are leading.",
    icon: null,
    gradient: "bg-micron-eggplant", 
    border: "border-white/10",
    subtitleColor: "text-zinc-400", 
    descriptionColor: "text-zinc-300 group-hover:text-white transition-colors duration-300",
    titleHoverColor: "group-hover:text-micron-eggplant-light"
  },
];

export const SectionServingTesla: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const getModalContent = (id: number) => {
    // CONTENT FOR "GENESIS" (ID 3)
    if (id === 3) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                {/* LEFT COLUMN: Vision & Proposal */}
                <div className="flex flex-col gap-6">
                    {/* Vision Card */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="bg-zinc-100 rounded-[2rem] p-8 border border-zinc-200 relative overflow-hidden flex flex-col justify-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
                    >
                         <div className="mb-6">
                            <h4 className="text-3xl font-bold text-micron-eggplant mb-2 tracking-tight">Stewardship & Intent</h4>
                            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Lisa Wood</p>
                         </div>
                         <div className="w-12 h-1 bg-micron-green/20 mb-6"></div>
                         <div className="space-y-4 text-zinc-600 leading-relaxed text-base font-medium">
                            <p>I have lived in Idaho since 1992 and owned the Warm Springs property since 2000. After three decades in technology, I developed Micron House as a way to align a Boise property on Warm Springs Avenue with Micron's long-term presence and the lived arrival of autonomous systems.</p>
                            <p>Micron House brings three commitments into one setting: <em className="italic font-normal">hospitality of high standard, stewardship of the property, and careful observation of how autonomy changes daily experience.</em></p>
                         </div>
                    </motion.div>

                    {/* Proposal Card - UPDATED WITH CONTACT INFO */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="bg-[#2c2e33] text-white rounded-[2rem] p-8 border border-zinc-700 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-white/90 mb-4">Partnership</h3>
                            <div className="text-zinc-300 font-light leading-relaxed text-base space-y-4">
                                <p>
                                    Micron House is conceived as a long-term relationship whose value grows through use: leadership stays, partner hosting, recruitment, relocation, and family support.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-zinc-600">
                             <p className="text-white font-bold text-lg mb-1">Lisa Wood</p>
                             <div className="flex flex-col gap-1 text-zinc-400 font-medium">
                                <a href="tel:2087202433" className="hover:text-white transition-colors w-fit">208.720.2433</a>
                                <a href="mailto:lisa@lisawoodstudio.com" className="hover:text-white transition-colors w-fit border-b border-transparent hover:border-white">lisa@lisawoodstudio.com</a>
                             </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: Concept Tiles */}
                <motion.div 
                    variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                    className="bg-white rounded-[2rem] p-8 border border-zinc-200 flex flex-col gap-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                     <div className="flex flex-col items-center text-center pb-4 border-b border-zinc-100">
                        <motion.img 
                            src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-no-border.png" 
                            alt="Micron House Icon"
                            className="w-40 h-40 object-contain opacity-90 mb-6"
                            initial={{ x: 200, rotate: -360, opacity: 0 }}
                            whileInView={{ x: 0, rotate: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 15, damping: 18, duration: 5.1, bounce: 0 }}
                        />
                        <h3 className="text-2xl font-bold text-micron-eggplant leading-tight tracking-tight">Concept & Design</h3>
                        <div className="text-base text-zinc-500 mt-3 font-medium text-left space-y-3 max-w-md">
                            <p>Earth and sky form the foundation. Intelligence and vision layer over the top. The elements balance to form a star, representing the autonomous home.</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                        {/* Earth - Green */}
                        <div className="order-2 sm:order-1 bg-micron-green text-white rounded-xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Mountain size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Earth</span>
                            </div>
                            <p className="text-white/80 text-lg leading-relaxed font-medium">Ground</p>
                        </div>

                        {/* Sky - Blue */}
                        <div className="order-1 sm:order-2 bg-micron-eggplant-light text-white rounded-xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Star size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Sky</span>
                            </div>
                            <p className="text-white/80 text-lg leading-relaxed font-medium">Energy</p>
                        </div>

                        {/* Memory - Eggplant */}
                        <div className="order-3 sm:order-3 bg-micron-eggplant text-white rounded-xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Layers size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Memory</span>
                            </div>
                            <p className="text-white/80 text-lg leading-relaxed font-medium">Intelligence</p>
                        </div>

                        {/* Vision - Grey */}
                        <div className="order-4 sm:order-4 bg-micron-grey1 text-white rounded-xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Eye size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Vision</span>
                            </div>
                            <p className="text-white/80 text-lg leading-relaxed font-medium">Autonomy</p>
                        </div>
                     </div>

                </motion.div>
            </div>
        )
    }

    // CONTENT FOR "REAL-WORLD INFERENCE" (ID 2)
    if (id === 2) {
        return (
            // MATCHING PROTOTYPE LAYOUT STRUCTURE
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto pb-6 lg:pb-12">
                
                {/* LEFT COLUMN: IMAGE + CLOSED LOOP CARD */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    
                    {/* IMAGE */}
                    <div className="w-full aspect-[4/3] lg:aspect-square">
                         <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="w-full h-full relative rounded-xl overflow-hidden border border-zinc-200 group shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
                         >
                            <img 
                                src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/UPPER_FLOOR/stairs.webp" loading="lazy" 
                                alt="Stairs" 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                         </motion.div>
                    </div>

                    {/* CLOSED LOOP CARD */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-full bg-white rounded-xl px-6 py-3 md:px-8 md:py-4 text-zinc-900 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                    >
                        <div className="flex items-baseline gap-4 mb-2 relative z-10">
                            <h3 className="text-xl font-black uppercase tracking-tight text-micron-green flex items-center gap-2">
                                <Activity size={20} /> CLOSED LOOP
                            </h3>
                        </div>
                        
                        <div className="w-full h-px bg-zinc-200 mb-4 relative z-10" />

                        <div className="flex flex-col gap-4 text-zinc-600 text-base font-medium leading-relaxed relative z-10">
                            {/* UPDATED: Flex layout to align "Micron to Front Door" next to "15 min" */}
                            <div className="flex flex-row items-baseline gap-4">
                                 <span className="block text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 leading-none">15 <span className="text-2xl font-bold align-top text-zinc-400">min</span></span>
                                 <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Micron to Front Door</span>
                            </div>
                            
                            <p className="leading-snug">
                                Optimus and Cybercab run on Micron silicon fabricated fifteen minutes from the front door.
                            </p>
                        </div>
                    </motion.div>
                </div>
                
                {/* RIGHT COLUMN: STACKED BENTOS */}
                <div className="lg:col-span-1 flex flex-col gap-4 h-full">
                    {/* THE FEEDBACK LOOP */}
                    <InnerBento 
                        gradient="bg-micron-eggplant" 
                        direction="right" 
                        delay={0.7} 
                        className="flex-grow" 
                        padding="p-6"
                    >
                        {/* UPDATED: Increased gap from mb-3 to gap-2 (approx mb-4 visual equivalent) */}
                        <div className="flex flex-col mb-4 gap-2">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 font-sans flex items-center gap-2">
                                <MessageSquare size={16} /> THE FEEDBACK LOOP
                            </h3>
                            <span className="text-xs uppercase tracking-widest text-white/50">Training Ground</span>
                        </div>
                        <div className="w-full h-px bg-white/20 mb-4" />
                        <ul className="space-y-3 mb-4">
                            {[
                                "Optimus prepares a private dining room for a confidential executive dinner.",
                                "Optimus manages a quiet household for an employee's family.",
                                "Cybercab delivers a senior Washington official to a fireside."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-white/90 text-base font-medium leading-snug">
                                    <div className="w-1.5 h-1.5 rounded-full bg-micron-green mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-white/60 font-bold tracking-wide leading-relaxed border-t border-white/10 pt-3">
                            Three scenarios. Three emotional registers. Each one training autonomous systems.
                        </p>
                    </InnerBento>

                    {/* PRE-PUBLIC DEPLOYMENT */}
                    <InnerBento 
                        gradient="bg-micron-grey1" 
                        direction="right" 
                        delay={1.0} 
                        className="flex-grow" 
                        padding="p-6"
                    >
                         {/* UPDATED: Increased gap from mb-3 to gap-2 */}
                        <div className="flex flex-col mb-4 gap-2">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 font-sans flex items-center gap-2">
                                <ShieldCheck size={16} /> PRE-PUBLIC DEPLOYMENT
                            </h3>
                            <span className="text-xs uppercase tracking-widest text-white/50">First Access</span>
                        </div>
                        <div className="w-full h-px bg-white/20 mb-4" />
                        <div className="space-y-4 text-white/90 text-base font-medium leading-relaxed">
                            <p>
                                Micron's leadership experiences Optimus and Cybercab across the full spectrum of real life before any consumer on earth.
                            </p>
                            <p>
                                Operational variety builds institutional knowledge. Every scenario deepens the data, sharpens the model, and strengthens the partnership.
                            </p>
                            <div className="w-full h-px bg-white/20 mt-4 mb-3" />
                            {/* UPDATED: Removed "Political" */}
                            <p className="text-sm font-bold tracking-widest text-micron-green">
                                Confidential. Celebratory. Compassionate.
                            </p>
                        </div>
                    </InnerBento>
                </div>
            </div>
        )
    }
    
    // CONTENT FOR "A TECTONIC SHIFT" (ID 1)
    return (
        <div className="flex flex-col gap-6 h-full pb-8">
            {/* SHARED READINESS */}
            <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="bg-micron-eggplant-light text-white rounded-[2rem] p-8 md:p-10 border border-white/20 flex flex-col gap-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
                 <div>
                    <h5 className="text-3xl font-black text-white mb-3 uppercase leading-none tracking-tight">SHARED READINESS</h5>
                    <p className="text-white font-medium leading-relaxed text-base">
                        Micron and Tesla engineers sit with lawmakers, educators, healthcare leaders, and community voices to build trust, shape understanding, and define the human experience of autonomy — while the window to lead that conversation is still open.
                    </p>
                 </div>
            </motion.div>

            {/* PRESSURE POINTS */}
            <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="bg-white rounded-[2rem] p-8 md:p-10 border border-zinc-200 flex flex-col justify-center gap-6 mt-2 text-zinc-900 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
                <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-micron-eggplant font-bold uppercase text-sm tracking-[0.2em]">PRESSURE POINTS</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-3 bg-micron-green text-white p-6 rounded-xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                        <span className="text-white font-bold uppercase text-sm tracking-widest">DISPLACEMENT</span>
                        <div className="w-full h-px bg-white/20" />
                        <p className="text-white/80 font-medium leading-relaxed text-base">
                            AI is already restructuring white-collar labor. Autonomous systems extend that disruption into physical work, service, and logistics — simultaneously.
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-3 bg-micron-grey2 text-white p-6 rounded-xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                        <span className="text-white font-bold uppercase text-sm tracking-widest">DISTRUST</span>
                        <div className="w-full h-px bg-white/20" />
                        <p className="text-white/80 font-medium leading-relaxed text-base">
                            Public confidence in institutions and technology companies is at historic lows. Autonomous systems carry cameras, sensors, and decision-making into private life.
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-3 bg-micron-eggplant text-white p-6 rounded-xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                        <span className="text-white font-bold uppercase text-sm tracking-widest">PACE</span>
                        <div className="w-full h-px bg-white/20" />
                        <p className="text-white/80 font-medium leading-relaxed text-base">
                            Speed of deployment will outpace public readiness. Without controlled environments to develop trust and protocol, the first encounters will define the narrative.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
  };

  const openModal = (card: typeof teslaCards[0]) => {
    setModalData({
      title: card.title,
      subtitle: card.subtitle,
      category: 'showcase',
      theme: 'light',
      maxWidth: 'max-w-6xl',
      content: getModalContent(card.id)
    });
  };

  return (
      <section id="serving-tesla" className="container mx-auto px-8 md:px-12 pt-12 pb-6 md:pb-12 text-zinc-900 overflow-hidden">
          {/* TABLET FIX: px-4 on mobile to prevent edge clipping. flex-row pushed to lg for portrait. */}
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row md:items-end gap-6 mb-12"
          >
              <div className="flex-shrink-0">
                  <span className="block text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">04 / PROVING GROUND</span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-micron-grey1 leading-none font-sans">
                      FIRST ENCOUNTERS
                  </h2>
              </div>
              
              <div className="md:ml-auto max-w-2xl pb-1">
                   <div className="md:pl-6 md:border-l-4 md:border-micron-eggplant/20 md:hover:border-micron-eggplant md:transition-colors md:duration-500">
                      <div className="text-base font-light text-zinc-600 leading-snug font-body">
                         <span className="font-bold text-micron-grey1/50 block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                             DAILY LIFE
                         </span>
                         <strong className="font-semibold text-zinc-800">Here guests come into contact with Optimus and Cybercab for the first time</strong> on Warm Springs Avenue, a tree-lined, century-old neighborhood on the National Register of Historic Places, where geothermal ingenuity and residential life give the experience <strong className="font-semibold text-zinc-800">perspective, place, and grounding.</strong>
                      </div>
                   </div>
              </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {teslaCards.map((card, i) => (
                  <BentoCard 
                      key={card.id}
                      className={`flex flex-col min-h-[300px] p-8 relative overflow-hidden group ${card.gradient}`}
                      gradient={card.gradient}
                      textColor="text-white"
                      borderColor={card.border}
                      delay={i * 0.1}
                      hoverEffect={true}
                      hideArrow={false}
                      arrowPosition="bottom-right"
                      onClick={() => openModal(card)}
                  >
                       <div className="relative z-10 flex flex-col h-full">
                           <div className="mb-auto">
                               <h3 className={`text-3xl font-black uppercase tracking-tight leading-none mb-2 text-white transition-colors duration-300 ${card.titleHoverColor}`}>
                                   {card.title}
                               </h3>
                               <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${card.subtitleColor}`}>
                                   {card.subtitle}
                               </p>
                               <div className="w-full h-px bg-white/20 mb-6" />
                               <p className={`text-base font-medium leading-relaxed ${card.descriptionColor}`}>
                                   {card.content}
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