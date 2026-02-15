
import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { ArrowUpRight, Play, Zap, BrainCircuit, Globe, Activity, ShieldCheck, Server, TrendingUp, Handshake, Building2, Cpu, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper component for inner bento cards within the modal
// Updated to accept textColor and allow border overrides via className
const InnerBento = ({ title, children, gradient, icon, className = "", delay = 0, textColor = "text-white" }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className={`
            ${gradient} rounded-2xl p-6 md:p-8 ${textColor} relative overflow-hidden group 
            shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] 
            border-t border-l border-white/20 border-b border-black/10 border-r border-black/5
            ${className}
        `}
    >
        {/* Decorative background element - Only if icon exists */}
        {icon && (
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {icon}
            </div>
        )}
        
        {/* Top Highlight for 3D Bevel */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

        <div className="relative z-10 h-full flex flex-col">
            {(title || icon) && (
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-3 drop-shadow-md">
                    {icon && React.cloneElement(icon, { size: 24, strokeWidth: 1.5 })}
                    {title}
                </h3>
            )}
            {/* Removed 'text-white/90' hardcode, utilizing textColor prop */}
            <div className={`text-sm md:text-base leading-relaxed font-body font-medium flex-1 drop-shadow-sm opacity-90`}>
                {children}
            </div>
        </div>
    </motion.div>
);

const getCardData = (id: number): ModalContent => {
  // Common config for all Prototype Section modals: Light Theme (White Background), Showcase Category
  const base = { category: 'showcase' as const, theme: 'light' as const };

  switch(id) {
    case 1: return { 
        ...base, 
        title: 'PROTOTYPE', 
        subtitle: 'VISION',
        content: (
            <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px]">
                {/* LEFT COLUMN: PORTRAIT VIDEO */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-full lg:w-4/12 bg-black rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border-t border-white/20 border-b border-black/10 flex-shrink-0 order-1"
                >
                     <div className="absolute inset-0 opacity-80 bg-[url('https://images.unsplash.com/photo-1534996858221-380b92700493?q=80&w=1931&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                     <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                            <Play className="text-white fill-white ml-2" size={32} />
                        </div>
                        <h3 className="text-4xl font-black text-white uppercase tracking-tight drop-shadow-lg text-center leading-none">
                            Cosmic<br/>Zoo
                        </h3>
                     </div>
                </motion.div>

                {/* RIGHT COLUMN: EXPANDED GRID */}
                <div className="w-full lg:w-8/12 grid grid-cols-1 md:grid-cols-2 gap-4 order-2">
                    {/* TOP CARD */}
                    <InnerBento 
                        title="SERVICE & SECURITY" 
                        gradient="bg-micron-green" 
                        icon={<ShieldCheck className="text-white/80" />}
                        delay={0.2}
                        className="md:col-span-2 flex flex-col justify-center"
                    >
                        <p className="text-base md:text-lg leading-relaxed text-white font-medium">
                            A secure, autonomous event hub centrally located in Boise. <span className="font-bold">Optimus and Cybercab units execute all logistics</span>, delivering high-end culinary, wellness, and entertainment experiences with privacy and precision.
                        </p>
                    </InnerBento>

                    {/* BOTTOM LEFT */}
                    <InnerBento 
                        title="INTEGRATION" 
                        gradient="bg-micron-eggplant" 
                        icon={<Zap className="text-white/80" />}
                        delay={0.3}
                        className="flex flex-col justify-between"
                    >
                        <p className="text-sm leading-relaxed text-white/80 font-medium mb-4">
                            <span className="text-white font-bold block mb-2 text-lg">A Venue for Leadership.</span>
                            A residential venue for the leaders building the future and the policymakers governing it. Guests gather to experience the shift to autonomous systems directly, turning abstract policy into practical understanding.
                        </p>
                    </InnerBento>

                    {/* BOTTOM RIGHT */}
                    <InnerBento 
                        title="INFLECTION POINT" 
                        gradient="bg-micron-grey1" 
                        icon={<TrendingUp className="text-white/80" />}
                        delay={0.4}
                        className="flex flex-col justify-between"
                    >
                        <p className="text-sm leading-relaxed text-white/80 font-medium mb-4">
                            <span className="text-white font-bold block mb-2 text-lg">Scaling to Billions.</span>
                            Autonomous systems are scaling from thousands to billions. Daily life transforms permanently. The leaders building that future and the policymakers governing it gather here to experience the shift firsthand and confront the profound questions it demands.
                        </p>
                    </InnerBento>
                </div>
            </div>
        )
    };
    case 2: return { 
        ...base, 
        title: 'TIMING', 
        subtitle: "BOISE'S MOMENT",
        content: (
            <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
                {/* LEFT COLUMN: Video + Runway (Green) */}
                <div className="lg:w-5/12 flex flex-col gap-6">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border-t border-white/20 border-b border-black/10 flex-shrink-0"
                    >
                         <div className="absolute inset-0 opacity-80 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                         <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                             <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                                <Play className="text-white fill-white ml-1" size={24} />
                             </div>
                             <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight drop-shadow-lg">
                                The Window
                             </h3>
                         </div>
                    </motion.div>

                    <InnerBento title="RUNWAY" gradient="bg-micron-green" delay={0.3} className="flex-1">
                        <p className="text-sm leading-relaxed font-medium">The window to build, test, and refine the first autonomous corporate residence exists right now — before the technology scales to mass production and the conversation shifts from design to regulation.</p>
                        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/60">Defining the Standard</p>
                    </InnerBento>
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:w-7/12 flex flex-col gap-6">
                    {/* BOISE'S MOMENT - Updated with Stats */}
                    <InnerBento title="BOISE'S MOMENT" gradient="bg-micron-eggplant-light" delay={0.2}>
                        <div className="space-y-6">
                            <p className="text-sm leading-relaxed text-white/95 font-medium">
                                <span className="font-bold text-white">Boise has arrived.</span> A city once known primarily for agriculture now supports a James Beard-nominated culinary scene, world-class wineries, and the civic energy of a Division I University town.
                            </p>
                            
                            {/* Stats Row */}
                            <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                                <div>
                                    <span className="block text-3xl font-black text-white">25</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Miles of Greenbelt</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-black text-white">45</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Mins to Skiing</span>
                                </div>
                            </div>
                        </div>
                    </InnerBento>

                    {/* 3 ARCS CONVERGING - COMPLETELY REDESIGNED */}
                    <InnerBento 
                        title="3 ARCS CONVERGING" 
                        gradient="bg-micron-eggplant" 
                        className="flex-1"
                        delay={0.4}
                    >
                        <div className="flex flex-col gap-3 h-full">
                            {/* Light cards for readability inside the Purple Box */}
                            <div className="flex flex-col gap-3">
                                {/* 1. City */}
                                <div className="bg-white rounded-xl p-4 flex gap-4 items-center shadow-lg transform transition-transform hover:scale-[1.02]">
                                    <div className="bg-zinc-100 p-2 rounded-lg shrink-0">
                                        <Building2 size={20} className="text-micron-eggplant" />
                                    </div>
                                    <div>
                                        <h4 className="text-zinc-900 font-bold text-xs uppercase tracking-wider mb-0.5">Cultural Maturity</h4>
                                        <p className="text-zinc-600 text-xs font-medium leading-snug">A city reaching its peak after decades of quiet growth.</p>
                                    </div>
                                </div>

                                {/* 2. Micron */}
                                <div className="bg-white rounded-xl p-4 flex gap-4 items-center shadow-lg transform transition-transform hover:scale-[1.02]">
                                    <div className="bg-zinc-100 p-2 rounded-lg shrink-0">
                                        <Cpu size={20} className="text-micron-green" />
                                    </div>
                                    <div>
                                        <h4 className="text-zinc-900 font-bold text-xs uppercase tracking-wider mb-0.5">Infrastructure</h4>
                                        <p className="text-zinc-600 text-xs font-medium leading-snug">Micron deploying $200B investment into its hometown.</p>
                                    </div>
                                </div>

                                {/* 3. Tesla */}
                                <div className="bg-white rounded-xl p-4 flex gap-4 items-center shadow-lg transform transition-transform hover:scale-[1.02]">
                                    <div className="bg-zinc-100 p-2 rounded-lg shrink-0">
                                        <Bot size={20} className="text-black" />
                                    </div>
                                    <div>
                                        <h4 className="text-zinc-900 font-bold text-xs uppercase tracking-wider mb-0.5">Robotics</h4>
                                        <p className="text-zinc-600 text-xs font-medium leading-snug">Tesla placing autonomous systems into the world.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-white/10 text-center">
                                 <p className="text-white/80 text-xs leading-relaxed font-bold uppercase tracking-widest">
                                    Converging on Warm Springs Ave
                                 </p>
                            </div>
                        </div>
                    </InnerBento>
                </div>
            </div>
        )
    };
    case 3: return { 
        ...base, 
        title: 'COLLABORATION', 
        subtitle: 'SHARED MISSIONS',
        content: (
            <div className="flex flex-col gap-6 h-full">
                {/* ROW 1: THE PLAYERS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[250px]">
                    <InnerBento 
                        title="" 
                        gradient="bg-micron-eggplant" 
                        delay={0.1}
                        className="flex flex-col justify-between"
                    >
                         <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-none">MICRON</h3>
                                <Cpu size={24} className="text-micron-green" />
                            </div>
                            <p className="text-micron-green font-bold uppercase tracking-widest text-[10px] mb-4">Sanjay Mehrotra, CEO</p>
                            <p className="text-xl md:text-2xl font-bold leading-tight mb-4 text-white tracking-tight italic">
                                "Transform how the world uses information to enrich life for all."
                            </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white/20">
                            <p className="text-white/80 text-sm leading-relaxed font-medium">
                                Founded 1978, Boise. Today, every Tesla vehicle carries 20 Micron memory chips delivering a 30x bandwidth leap. The chips enabling Optimus originate here.
                            </p>
                        </div>
                    </InnerBento>

                    <InnerBento 
                        title="" 
                        gradient="bg-black" 
                        delay={0.2}
                        className="flex flex-col justify-between"
                    >
                         <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-none">TESLA</h3>
                                <Bot size={24} className="text-zinc-400" />
                            </div>
                            <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] mb-4">Elon Musk, CEO</p>
                            <p className="text-xl md:text-2xl font-bold leading-tight mb-4 text-white tracking-tight italic">
                                "Accelerate the world's transition to sustainable energy" & "Build a world of amazing abundance."
                            </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white/20">
                            <p className="text-white/80 text-sm leading-relaxed font-medium">
                                Founded 2003. Leading the world in autonomous robotics. Optimus and Cybercab require Micron's advanced memory infrastructure.
                            </p>
                        </div>
                    </InnerBento>
                </div>

                {/* ROW 2: FUTURE SCALE & VIDEO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[300px]">
                    {/* FUTURE SCALE - Gray Box (Light Theme) */}
                    <InnerBento 
                        title="FUTURE SCALE" 
                        gradient="bg-zinc-100" 
                        textColor="text-zinc-900" 
                        delay={0.3}
                        className="flex flex-col justify-between border-black/5"
                    >
                         <div className="flex flex-col gap-6 h-full">
                             {/* Stats Header */}
                             <div className="grid grid-cols-2 gap-4 border-b border-zinc-200 pb-4">
                                 <div>
                                    <span className="block text-4xl lg:text-5xl font-black tracking-tighter text-micron-eggplant leading-none">$200B</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Micron Investment</span>
                                 </div>
                                 <div>
                                    <span className="block text-4xl lg:text-5xl font-black tracking-tighter text-micron-eggplant leading-none">1M+</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Optimus Capacity</span>
                                 </div>
                             </div>
                             
                             {/* Narrative Content */}
                             <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                                 <p className="text-sm leading-relaxed text-zinc-700 font-medium">
                                    In June 2025, Micron announced <span className="font-bold text-zinc-900">$200 billion</span> in U.S. semiconductor manufacturing — the largest memory infrastructure commitment in American history, creating 90,000 jobs.
                                 </p>
                                 <p className="text-sm leading-relaxed text-zinc-700 font-medium">
                                    Tesla is targeting 50,000 Optimus units by this year and million-unit annual capacity beyond that. Every unit is a mobile supercomputer requiring Micron silicon.
                                 </p>
                                 <p className="text-sm leading-relaxed text-zinc-700 font-medium">
                                    Under Elon Musk and Sanjay Mehrotra, these two companies are scaling toward a future where autonomous systems outnumber people — and both leaders have acknowledged that the speed of this transition carries a shared responsibility.
                                 </p>
                             </div>
                        </div>
                    </InnerBento>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative h-full min-h-[300px] bg-black rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border border-black/10"
                    >
                         <div className="absolute inset-0 opacity-80 bg-[url('https://images.unsplash.com/photo-1625314877391-492d53c7c4b4?q=80&w=987&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                         <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                                <Play className="text-white fill-white ml-1" size={32} />
                            </div>
                         </div>
                         <div className="absolute bottom-8 left-8 right-8 z-20">
                             <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none mb-2">
                                The Partnership
                             </h3>
                             <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
                                Watch the Story
                             </p>
                         </div>
                    </motion.div>
                </div>
            </div>
        )
    };
    case 4: return { 
        ...base, 
        title: 'FOUNDATION', 
        subtitle: 'GROUNDING THE TECHNOLOGY', 
        content: (
        <div className="flex flex-col gap-4 h-full">
           <div className="w-full bg-micron-eggplant p-8 md:p-12 rounded-2xl border border-white/10 shadow-lg flex items-center justify-center text-center">
               <p className="text-xl md:text-3xl font-black uppercase leading-tight tracking-tight">
                 <span className="block md:inline mb-6 md:mb-0">
                    <span className="text-white/50">WITHOUT MEMORY, </span><span className="text-white">THERE IS NO MEANING. </span>
                 </span>
                 <span className="block md:inline">
                    <span className="text-white/50">WITHOUT PLACE, </span><span className="text-white">THERE IS NO PERSPECTIVE.</span>
                 </span>
               </p>
           </div>
           
           <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-lg relative group border border-white/10 shrink-0"
            >
                 <img 
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop" 
                    alt="Historic Foundation" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10">
                    <span className="text-micron-green font-bold uppercase tracking-widest text-xs md:text-sm mb-1 block">Est. 1890</span>
                    <h4 className="text-white font-bold text-2xl md:text-4xl uppercase tracking-tight">The Historic Bedrock</h4>
                 </div>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">
               <InnerBento 
                    title="ADDRESS" 
                    gradient="bg-micron-green"
                    icon={<Globe />}
                    delay={0.2}
               >
                   <p className="text-sm leading-relaxed">Warm Springs Avenue began as a stagecoach route in the 1890s. Stone carriage steps still line the street where horses were hitched.</p>
               </InnerBento>

               <InnerBento 
                    title="ENERGY" 
                    gradient="bg-micron-eggplant-light"
                    icon={<Activity />}
                    delay={0.3}
               >
                   <p className="text-sm leading-relaxed">In 1892, banker C.W. Moore piped 177-degree geothermal water into his brick mansion — the first home in America heated by natural hot water.</p>
               </InnerBento>

               <InnerBento 
                    title="CONVERGENCE" 
                    gradient="bg-micron-black"
                    icon={<Zap />}
                    delay={0.4}
               >
                   <p className="text-sm leading-relaxed">Micron House draws heat from the same aquifer. Hot water rising from below. Data arriving from above.</p>
               </InnerBento>
           </div>
        </div>
    )};
    default: return { ...base, title: '', content: null };
  }
};

export const SectionPrototype: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const mainTitleWords = ["MICRON.", "TESLA.", "BOISE."];
  
  return (
    // Reduced padding: py-16 instead of py-24, adjusted px for mobile (px-4) vs desktop (px-12)
    <section id="prototype" className="container mx-auto px-4 md:px-12 py-8 md:py-16 bg-white text-zinc-900">
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.0 }}
        className="pointer-events-auto"
      >
        {/* Header - Aligned with other sections */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-8"
        >
            <div className="flex-shrink-0">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">01 / VISION</span>
                <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-green leading-none font-sans">A NEW DAY</h2>
            </div>
            <div className="md:ml-auto max-w-2xl pb-1">
                <div className="pl-6 border-l-4 border-micron-eggplant/20 hover:border-micron-eggplant transition-colors duration-500">
                    <div className="text-base font-light text-zinc-600 leading-snug font-body">
                        {/* MAIN HEADER: Text-2xl to 3xl */}
                        <span className="font-bold text-micron-eggplant block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans cursor-default">
                            {mainTitleWords.map((word, i) => (
                                <motion.span 
                                        key={i}
                                        initial={{ opacity: 0, x: -5 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        whileHover={{ 
                                            y: -4, 
                                            x: 2, 
                                            scale: 1.05, 
                                            // LOGIC: BOISE=Green, TESLA=Black, Default=Eggplant
                                            color: word === "BOISE." ? '#008f25' : (word === "TESLA." ? '#000000' : '#2c0f38'),
                                            transition: { duration: 0.2 } 
                                        }}
                                        transition={{ duration: 0.4, delay: i * 0.2 }} 
                                        className="mr-3 inline-block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </span>
                        
                        {/* DESCRIPTION: Text-Base */}
                        <motion.span 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: (mainTitleWords.length * 0.2) + 0.2 }}
                                className="text-micron-eggplant block text-base" // CHANGED: text-zinc-600 -> text-micron-eggplant
                        >
                            Creating the first autonomous corporate residence. Where Micron's semiconductor revolution, Tesla's autonomous ecosystem, and Boise's emergence as a global tech hub converge at an inflection point — and 1020 Warm Springs Avenue delivers the first tangible glimpse of the autonomous era.
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Bento Grid - RESPONSIVE FIX: grid-cols-1 (mobile) -> grid-cols-2 (tablet) -> grid-cols-4 (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: PROTOTYPE (Black) */}
            <BentoCard 
            className="flex flex-col min-h-[320px] md:h-[480px] p-8 relative overflow-hidden group" 
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
                </div>
            </BentoCard>

            {/* Card 2: COLLABORATION (Blue) */}
            <BentoCard 
            className="flex flex-col min-h-[320px] md:h-[480px] p-8 relative overflow-hidden group" 
            gradient="bg-micron-eggplant-light" 
            textColor="text-white"
            borderColor="border-white/10"
            delay={0.2} 
            hoverEffect={true}
            onClick={() => setModalData(getCardData(3))}
            >
                <div className="relative z-10 mt-auto">
                    <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-black transition-colors duration-300 mb-4">
                        COLLABORATION
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        Shared Missions
                    </p>
                </div>
            </BentoCard>

            {/* Card 3: TIMING (Green) */}
            <BentoCard 
                className="flex flex-col min-h-[320px] md:h-[480px] p-8 relative overflow-hidden group" 
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
            </div>
            </BentoCard>

            {/* Card 4: FOUNDATION (Eggplant) */}
            <BentoCard 
            className="flex flex-col min-h-[320px] md:h-[480px] p-8 relative overflow-hidden group" 
            gradient="bg-micron-eggplant" 
            textColor="text-white" 
            borderColor="border-white/10"
            delay={0.4} 
            hoverEffect={true}
            onClick={() => setModalData(getCardData(4))}
            >
                <div className="relative z-10 mt-auto">
                    {/* CHANGED: group-hover text color from micron-green to micron-eggplant-light (blue) */}
                    <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-eggplant-light transition-colors duration-300 mb-4">
                        FOUNDATION
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        Place & Perspective
                    </p>
                </div>
            </BentoCard>

        </div>
      </motion.div>
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};
