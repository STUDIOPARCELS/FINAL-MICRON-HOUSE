import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { ArrowUpRight, Play, Zap, BrainCircuit, Globe, Activity, ShieldCheck, Server, TrendingUp, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper component for inner bento cards within the modal
const InnerBento = ({ title, children, gradient, icon, className = "", delay = 0 }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className={`
            ${gradient} rounded-2xl p-6 md:p-8 text-white relative overflow-hidden group 
            shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] 
            border-t border-l border-white/20 border-b border-black/40
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
            <div className="text-white/90 text-sm md:text-base leading-relaxed font-body font-medium space-y-4 flex-1 drop-shadow-sm">
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
            <div className="flex flex-col gap-6">
                
                {/* 
                   MOVED VIDEO TO TOP: 
                   Ensures media is always on top on mobile stack. 
                */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-full aspect-video md:aspect-[21/9] bg-black rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border-t border-white/20 border-b border-black/40"
                >
                     {/* Placeholder Background Image */}
                     <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                     
                     <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                            <Play className="text-white fill-white ml-2" size={32} />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight drop-shadow-lg">
                            Watch The Vision
                        </h3>
                        <p className="text-white/80 font-bold uppercase tracking-widest text-xs mt-2">
                            Enter Media Section
                        </p>
                     </div>
                </motion.div>

                {/* The 3 Core Pillars in Colorful Bento Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InnerBento 
                        title="SERVICE & SECURITY LAYER" 
                        gradient="bg-micron-green" 
                        icon={<Server />}
                        delay={0.2}
                    >
                        <p>Five minutes from downtown. Fifteen from the airport. Fifteen from Micron headquarters. The home sits at the center of everything Boise offers — and Optimus and Cybercab are the mechanism that brings it through the front door.</p>
                        <p>Culinary, wellness, recreation, entertainment — each delivered into an intimate, private setting with a level of coordination and discretion that the autonomous infrastructure sustains across every event. This is the prototype for a new kind of corporate hospitality.</p>
                    </InnerBento>

                    <InnerBento 
                        title="REAL-WORLD INTEGRATION" 
                        gradient="bg-micron-eggplant" 
                        icon={<Globe />}
                        delay={0.3}
                    >
                        <p>Optimus and Cybercab operate here before they reach the public. This residence is the beginning of cohabitation — executives, engineers, partners, and invited guests engaging with the technology in a domestic setting, generating continuous feedback.</p>
                        <p>Located minutes from the Micron fabs where the memory inside every unit is manufactured, the loop from silicon to service closes at Micron House.</p>
                    </InnerBento>

                    <InnerBento 
                        title="THE INFLECTION POINT" 
                        gradient="bg-micron-grey1" 
                        icon={<BrainCircuit />}
                        delay={0.4}
                    >
                        <p>Every person alive today has lived in a world composed entirely of other people. That is about to change. As autonomous systems scale from thousands to millions to billions, the visual and psychological landscape of daily life transforms permanently.</p>
                        <p>Micron House is where the leaders building that future and the policymakers governing it engage with the profound questions together — density, presence, liability, civil liberty — while the technology assists the chef in the next room.</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                <InnerBento 
                    title="Boise's Moment" 
                    gradient="bg-micron-eggplant-light" 
                    icon={<Zap />}
                    delay={0.1}
                >
                    <p>A Rising Star. The convergence of safety, economic stability, and exceptional quality of life.</p>
                    <p className="mt-2">One of the safest cities in the country, where billion-dollar industry meets world-class talent. A capital city ascending on the national stage.</p>
                </InnerBento>

                <InnerBento 
                    title="Culture & Recreation" 
                    gradient="bg-micron-green" 
                    icon={<Activity />}
                    delay={0.2}
                >
                    <p>A culinary scene defined by James Beard winners and Michelin-starred talent. Treefort Music Fest and the Boise Philharmonic drive the cultural calendar.</p>
                    <p className="mt-2">Immediate outdoor access—fly fishing the Boise River and skiing at Bogus Basin—balances corporate output with physical restoration.</p>
                </InnerBento>

                <InnerBento 
                    title="Sustainable Energy" 
                    gradient="bg-micron-eggplant" 
                    icon={<Globe />}
                    delay={0.3}
                >
                    <p>Located across the street from the C.W. Moore House (1891), the first geothermally heated residence in America.</p>
                    <p className="mt-2">This site marks the birthplace of the nation's first district heating system. A legacy of energy independence that validates the modern sustainable vision.</p>
                </InnerBento>
            </div>
        )
    };
    case 3: return { 
        ...base, 
        title: 'COLLABORATION', 
        subtitle: 'SHARED MISSIONS',
        content: (
            <div className="flex flex-col gap-6 h-full">
                {/* Top Row: Two Columns for First Two Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    
                    {/* SECTION 1: CONVERGING TRAJECTORIES (Dark Gray) */}
                    <InnerBento 
                        title="" 
                        gradient="bg-micron-grey1" 
                        icon={null} // Removed bg icon to keep it clean per request
                        delay={0.1}
                        className="border-zinc-200/10"
                    >
                         <div className="flex items-center gap-3 mb-4">
                            <Handshake className="text-micron-green" size={24} />
                            <span className="text-micron-green font-bold uppercase tracking-widest text-xs">CONVERGING TRAJECTORIES</span>
                         </div>
                         <p className="text-white leading-relaxed">
                            Micron (founded 1978, Boise) and Tesla (founded 2003) formalized their supply relationship in 2019. Today, every Tesla vehicle carries 20 Micron memory chips delivering a 30x bandwidth leap over the prior generation. They are the leaders in advanced memory manufacturing and autonomous robotics respectively — and each company's product requires the other's to function.
                         </p>
                    </InnerBento>

                    {/* SECTION 2: ALIGNED MISSIONS (Eggplant) */}
                    <InnerBento 
                        title="" 
                        gradient="bg-micron-eggplant" 
                        icon={null}
                        delay={0.2}
                        className="border-white/10"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <BrainCircuit className="text-micron-green" size={24} />
                            <span className="text-micron-green font-bold uppercase tracking-widest text-xs">ALIGNED MISSIONS</span>
                        </div>
                        
                        <p className="text-white/90 leading-relaxed mb-6 font-medium">
                            Their mission statements read like two halves of one sentence.
                        </p>
                        
                        <div className="space-y-4 mb-6">
                            <div className="pl-4 border-l-2 border-micron-green/30">
                                <strong className="text-white block text-xs uppercase tracking-wide mb-1 opacity-70">Tesla</strong>
                                <span className="italic text-white text-lg font-serif">"Accelerate the world's transition to sustainable energy" and "Build a world of amazing abundance."</span>
                            </div>
                            <div className="pl-4 border-l-2 border-micron-green/30">
                                <strong className="text-white block text-xs uppercase tracking-wide mb-1 opacity-70">Micron</strong>
                                <span className="italic text-white text-lg font-serif">"Transform how the world uses information to enrich life for all."</span>
                            </div>
                        </div>

                        <p className="text-white/80 text-sm leading-relaxed">
                            One builds the machines that move through the world. The other builds the memory that allows them to understand it. The Micron House sits 15 minutes from the fabs where that memory is born — the chips enabling Optimus and Cybercab originate here, return here, and operate inside the walls.
                        </p>
                    </InnerBento>
                </div>

                {/* Bottom Row: Full Width for Future Scale (Black/Dark) */}
                {/* SECTION 3: FUTURE SCALE */}
                <InnerBento 
                    title="" 
                    gradient="bg-zinc-900" 
                    icon={null}
                    delay={0.3}
                    className="border-zinc-800"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="text-micron-green" size={24} />
                        <span className="text-micron-green font-bold uppercase tracking-widest text-xs">FUTURE SCALE</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8">
                             <p className="text-white leading-relaxed mb-4 text-lg font-light">
                                In June 2025 Micron announced $200 billion in U.S. semiconductor manufacturing — the largest memory infrastructure commitment in American history, creating 90,000 jobs. Tesla is targeting 50,000 Optimus units by 2026 and million-unit annual capacity beyond that. Every unit is a mobile supercomputer requiring Micron silicon.
                             </p>
                             <p className="text-white/70 leading-relaxed text-sm">
                                Under Elon Musk and Sanjay Mehrotra, these two companies are scaling toward a future where autonomous systems outnumber people — and both leaders have acknowledged that the speed of this transition carries a shared responsibility to shape its impact on labor, law, public space, and the human experience itself.
                             </p>
                        </div>
                        
                        {/* Stats / Visual Anchor */}
                        <div className="lg:col-span-4 flex flex-col justify-center gap-6 border-t lg:border-t-0 lg:border-l border-zinc-800 pt-6 lg:pt-0 lg:pl-8">
                             <div className="group">
                                <span className="block text-4xl lg:text-5xl font-black text-white mb-2 group-hover:text-micron-green transition-colors">$200B</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Micron Investment</span>
                             </div>
                             <div className="group">
                                <span className="block text-4xl lg:text-5xl font-black text-white mb-2 group-hover:text-micron-green transition-colors">1M+</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Optimus Capacity</span>
                             </div>
                        </div>
                    </div>
                </InnerBento>
            </div>
        )
    };
    case 4: return { 
        ...base, 
        title: 'FOUNDATION', 
        subtitle: 'PLACE & PERSPECTIVE',
        content: (
        <div className="flex flex-col gap-4">
           {/* 
                1. MANTRA HEADER
                Tight typography, Micron Eggplant background for contrast, White Text.
           */}
           <div className="bg-micron-eggplant p-6 md:p-8 rounded-2xl border border-white/10 shadow-lg flex flex-col justify-center items-start gap-1">
               <h3 className="text-xl md:text-3xl font-black uppercase leading-none tracking-tight text-white/50">
                 WITHOUT MEMORY, <span className="text-white">THERE IS NO MEANING.</span>
               </h3>
               <h3 className="text-xl md:text-3xl font-black uppercase leading-none tracking-tight text-white/50">
                 WITHOUT VISION, <span className="text-white">THERE IS NO VELOCITY.</span>
               </h3>
               <h3 className="text-xl md:text-3xl font-black uppercase leading-none tracking-tight text-white/50">
                 WITHOUT PLACE, <span className="text-white">THERE IS NO PERSPECTIVE.</span>
               </h3>
           </div>
           
           {/* 
                2. MEDIA BENTO BOX (NEW)
                Landscape aspect ratio (21:9 or similar).
                Placed between Text and Bottom Grid.
           */}
           <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full aspect-[21/9] bg-zinc-900 rounded-2xl overflow-hidden shadow-lg relative group border border-white/10"
            >
                 <img 
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop" 
                    alt="Historic Foundation" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8">
                    <span className="text-micron-green font-bold uppercase tracking-widest text-xs mb-1 block">Est. 1890</span>
                    <h4 className="text-white font-bold text-xl md:text-2xl uppercase tracking-tight">The Historic Bedrock</h4>
                 </div>
           </motion.div>

           {/* 
                3. BOTTOM GRID
                3 Columns for The Avenue, Energy, Convergence.
           */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <InnerBento 
                    title="THE AVENUE" 
                    gradient="bg-micron-green"
                    icon={<Globe />}
                    delay={0.2}
               >
                   <p>Warm Springs Avenue began as a stagecoach route in the 1890s. Stone carriage steps still line the street where horses were hitched outside Queen Anne mansions and Colonial Revival homes. A streetcar ran from downtown to the Natatorium for a nickel.</p>
                   <p className="mt-2">The avenue is a wide, tree-lined corridor on the National Register of Historic Places — the same road where Boise's wealthiest citizens built their estates using the city's most radical technology of the era: hot water from the ground.</p>
               </InnerBento>

               <InnerBento 
                    title="ENERGY" 
                    gradient="bg-micron-eggplant-light"
                    icon={<Activity />}
                    delay={0.3}
               >
                   <p>In 1892, banker C.W. Moore piped 177-degree geothermal water into his brick mansion at the corner of Warm Springs and Walnut — the first home in America heated by natural hot water. The idea spread down the avenue, then downtown, then to the State Capitol — the only capitol building in the country heated by geothermal energy.</p>
                   <p className="mt-2">Today the Boise Warm Springs Water District still delivers that same water to roughly 300 homes through the nation's oldest geothermal district heating system, operational for over 130 years.</p>
               </InnerBento>

               <InnerBento 
                    title="CONVERGENCE" 
                    gradient="bg-micron-black"
                    icon={<Zap />}
                    className="border-white/20"
                    delay={0.4}
               >
                   <p>Micron House draws heat from the same aquifer that warmed its first residents in 1906 — energy from deep in the earth, delivered through infrastructure that predates electricity in most American homes. It connects to the world through Starlink, receiving signal from a constellation of satellites powered by solar energy collected in space.</p>
                   <p className="mt-2">Hot water rising from below. Data arriving from above. The oldest residential energy system in the country meeting the newest -- on a tree-lined street with carriage steps in the sidewalk, in a neighborhood that has been absorbing the future for 130 years.</p>
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
                                            color: word === "BOISE." ? '#008f25' : '#2c0f38', // CHANGED: Gray #6b7280 -> Eggplant #2c0f38
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
                            Creating the first autonomous corporate residence. A convergence of historic stewardship and future technology.
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
                    <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-green transition-colors duration-300 mb-4">
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