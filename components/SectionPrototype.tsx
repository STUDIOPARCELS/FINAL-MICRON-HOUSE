import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { ArrowUpRight, Play, Zap, BrainCircuit, Globe, Activity, ShieldCheck, Server, TrendingUp, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper component for inner bento cards within the modal
// REMOVED: border-black/40. Changed to border-black/5 for subtle definition or just rely on shadow.
const InnerBento = ({ title, children, gradient, icon, className = "", delay = 0 }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className={`
            ${gradient} rounded-2xl p-6 md:p-8 text-white relative overflow-hidden group 
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
            <div className="flex flex-col gap-5 h-full">
                {/* 
                   UPDATED VIDEO SIZE: Standard Aspect Ratio 16:9
                */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border-t border-white/20 border-b border-black/10 flex-shrink-0"
                >
                     {/* Placeholder Background Image */}
                     <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                     
                     <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                            <Play className="text-white fill-white ml-2" size={24} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight drop-shadow-lg">
                            Watch The Vision
                        </h3>
                     </div>
                </motion.div>

                {/* The 3 Core Pillars in Colorful Bento Boxes */}
                {/* Compact grid with less gap */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">
                    <InnerBento 
                        title="SERVICE & SECURITY LAYER" 
                        gradient="bg-micron-green" 
                        // REMOVED ICON
                        delay={0.2}
                        className="overflow-y-auto"
                    >
                        <p className="text-sm">Five minutes from downtown. Fifteen from the airport. Fifteen from Micron headquarters. The home sits at the center of everything Boise offers — and Optimus and Cybercab are the mechanism that brings it through the front door.</p>
                        <p className="text-sm mt-3">Culinary, wellness, recreation, entertainment — each delivered into an intimate, private setting with a level of coordination and discretion that the autonomous infrastructure sustains across every event.</p>
                    </InnerBento>

                    <InnerBento 
                        title="REAL-WORLD INTEGRATION" 
                        gradient="bg-micron-eggplant" 
                        // REMOVED ICON
                        delay={0.3}
                        className="overflow-y-auto"
                    >
                        <p className="text-sm">Optimus and Cybercab operate here before they reach the public. This residence is the beginning of cohabitation — executives, engineers, partners, and invited guests engaging with the technology in a domestic setting, generating continuous feedback.</p>
                        <p className="text-sm mt-3">Located minutes from the Micron fabs where the memory inside every unit is manufactured, the loop from silicon to service closes at Micron House.</p>
                    </InnerBento>

                    <InnerBento 
                        title="INFLECTION POINT" 
                        gradient="bg-micron-grey1" 
                        // REMOVED ICON
                        delay={0.4}
                        className="overflow-y-auto"
                    >
                        <p className="text-sm">Every person alive today has lived in a world composed entirely of other people. That is about to change. As autonomous systems scale from thousands to millions to billions, the visual and psychological landscape of daily life transforms permanently.</p>
                        <p className="text-sm mt-3">Micron House is where the leaders building that future and the policymakers governing it engage with the profound questions together.</p>
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
            <div className="flex flex-col gap-6 h-full">
                {/* 
                    Video/Media Section 
                    Standard Aspect Ratio 16:9
                */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border-t border-white/20 border-b border-black/10 flex-shrink-0"
                >
                     {/* Placeholder Background for Video */}
                     <div className="absolute inset-0 opacity-80 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                     
                     <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                         <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                            <Play className="text-white fill-white ml-1" size={24} />
                         </div>
                         <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight drop-shadow-lg">
                            The Window of Opportunity
                         </h3>
                     </div>
                </motion.div>

                {/* 
                   RECONFIGURED LAYOUT: 
                   Eliminating extra space. 
                   Grid is now 2 columns on desktop.
                   - Boise's Moment: spans 1 column.
                   - Runway: spans 1 column.
                   - 3 Arcs: spans 2 columns (full width at bottom) to anchor the layout.
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
                    {/* SECTION 1 — BLUE BENTO BOX */}
                    <InnerBento 
                        title="BOISE'S MOMENT" 
                        gradient="bg-micron-eggplant-light" 
                        // REMOVED ICON
                        delay={0.2}
                    >
                        <p className="text-sm">Boise has arrived. A city once known primarily for potatoes and public land now supports a James Beard-nominated culinary scene, world-class wineries across the Snake River Valley, a thriving arts and entertainment scene, and the kind of civic energy that comes with a Division I University town.</p>
                        <p className="mt-3 text-sm">The Boise River Greenbelt connects 25 miles of parkland through the city center. Bogus Basin is 45 minutes from downtown. Some of the best fly fishing, whitewater, and backcountry skiing in North America are all within reach.</p>
                    </InnerBento>

                    {/* SECTION 2 — GREEN BENTO BOX */}
                    <InnerBento 
                        title="RUNWAY" 
                        gradient="bg-micron-green" 
                        // REMOVED ICON
                        delay={0.3}
                    >
                        <p className="text-sm">There are no Optimus robots operating in private residences today. The window to build, test, and refine the first autonomous corporate residence exists right now — before the technology scales to mass production and the conversation shifts from design to regulation.</p>
                        <p className="mt-3 text-sm">This is a unique moment in the timeline of automation where a prototype can still define the standard.</p>
                    </InnerBento>

                    {/* SECTION 3 — EGGPLANT BENTO BOX (Full Width) */}
                    <InnerBento 
                        title="3 ARCS CONVERGING" 
                        gradient="bg-micron-eggplant" 
                        // REMOVED ICON
                        className="md:col-span-2 overflow-y-auto"
                        delay={0.4}
                    >
                        <div className="md:columns-2 gap-8">
                            <p className="mb-4 md:mb-0 text-sm">A city reaching cultural maturity after decades of quiet growth. A semiconductor company deploying the largest memory infrastructure investment in American history into its hometown. A robotics company preparing to place autonomous systems into the world for the first time.</p>
                            <p className="text-sm">These three trajectories are converging right now, in the same city, on the same street where a Boise banker piped 177-degree water from the ground to heat his home in 1892 — before most American homes had electricity — and started a tradition of adopting technology the rest of the country hadn't imagined yet.</p>
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
                {/* 
                   UPDATED LAYOUT: 
                   Left Column (2/3): Text Content
                   Right Column (1/3): Portrait Video
                */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                    
                    {/* Left Column Container */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* SECTION 1: MICRON (Deep Eggplant) */}
                        <InnerBento 
                            title="" 
                            gradient="bg-micron-eggplant" 
                            icon={null} 
                            delay={0.1}
                            className="border-white/10 flex-1"
                        >
                            <div className="mb-4">
                                <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-none mb-1 drop-shadow-md">MICRON</h3>
                                <p className="text-micron-green font-bold uppercase tracking-widest text-xs">Sanjay Mehrotra, CEO</p>
                            </div>
                            <div className="pl-4 border-l-2 border-white/20 mb-4">
                                <p className="italic text-white/90 text-lg font-serif">"Transform how the world uses information to enrich life for all."</p>
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Founded 1978, Boise. Today, every Tesla vehicle carries 20 Micron memory chips delivering a 30x bandwidth leap over the prior generation. The chips enabling Optimus originate here.
                            </p>
                        </InnerBento>

                        {/* SECTION 2: TESLA (Dark Gray / Black) */}
                        <InnerBento 
                            title="" 
                            gradient="bg-zinc-900" 
                            icon={null}
                            delay={0.2}
                            className="border-white/10 flex-1"
                        >
                            <div className="mb-4">
                                <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-none mb-1 drop-shadow-md">TESLA</h3>
                                <p className="text-micron-green font-bold uppercase tracking-widest text-xs">Elon Musk, CEO</p>
                            </div>
                            <div className="pl-4 border-l-2 border-white/20 mb-4">
                                <p className="italic text-white/90 text-lg font-serif">"Accelerate the world's transition to sustainable energy" & "Build a world of amazing abundance."</p>
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Founded 2003. Leading the world in autonomous robotics. Optimus and Cybercab require Micron's advanced memory infrastructure to perceive and navigate the world.
                            </p>
                        </InnerBento>
                    </div>

                    {/* Right Column: Portrait Video Bento */}
                    {/* STANDARD PORTRAIT ASPECT RATIO 9:16 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-1 h-full min-h-[500px] lg:min-h-0 aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl relative group border-t border-white/20 border-b border-black/10"
                    >
                         {/* Placeholder Portrait Video Background */}
                         <div className="absolute inset-0 opacity-80 bg-[url('https://images.unsplash.com/photo-1625314877391-492d53c7c4b4?q=80&w=987&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                         
                         <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                                <Play className="text-white fill-white ml-1" size={24} />
                            </div>
                         </div>
                         <div className="absolute bottom-8 left-8 right-8 z-20">
                             <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none mb-2">
                                The Partnership
                             </h3>
                             <p className="text-white/70 text-sm font-bold uppercase tracking-widest">
                                Watch the Story
                             </p>
                         </div>
                    </motion.div>
                </div>

                {/* Bottom Row: Full Width for Future Scale (GREEN) */}
                <InnerBento 
                    title="" 
                    gradient="bg-micron-green" 
                    icon={null}
                    delay={0.3}
                    className="border-white/10"
                >
                    <div className="flex flex-col mb-4">
                        <span className="text-white font-black uppercase tracking-widest text-3xl drop-shadow-md">FUTURE SCALE</span>
                        <span className="text-black font-bold uppercase tracking-widest text-xs mt-1">Building Together</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8">
                             <p className="text-white leading-relaxed mb-4 text-lg font-light">
                                In June 2025 Micron announced $200 billion in U.S. semiconductor manufacturing — the largest memory infrastructure commitment in American history, creating 90,000 jobs. Tesla is targeting 50,000 Optimus units by this year and million-unit annual capacity beyond that. Every unit is a mobile supercomputer requiring Micron silicon.
                             </p>
                             <p className="text-white/80 leading-relaxed text-sm">
                                Under Elon Musk and Sanjay Mehrotra, these two companies are scaling toward a future where autonomous systems outnumber people — and both leaders have acknowledged that the speed of this transition carries a shared responsibility to shape its impact on labor, law, public space, and the human experience itself.
                             </p>
                        </div>
                        
                        {/* Stats / Visual Anchor */}
                        <div className="lg:col-span-4 flex flex-col justify-center gap-6 border-t lg:border-t-0 lg:border-l border-white/20 pt-6 lg:pt-0 lg:pl-8">
                             <div className="group">
                                <span className="block text-4xl lg:text-5xl font-black text-white mb-2">$200B</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">Micron Investment</span>
                             </div>
                             <div className="group">
                                <span className="block text-4xl lg:text-5xl font-black text-white mb-2">1M+</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">Optimus Capacity</span>
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
        subtitle: 'GROUNDING THE TECHNOLOGY', // Added subtitle as requested
        content: (
        <div className="flex flex-col gap-4 h-full">
           {/* 
                UPDATED LAYOUT: Vertical Stack for Top Elements
           */}
           
           {/* 1. MANTRA HEADER (Full Width, Paragraph Style) */}
           <div className="w-full bg-micron-eggplant p-8 md:p-12 rounded-2xl border border-white/10 shadow-lg flex items-center justify-center text-center">
               <p className="text-xl md:text-3xl font-black uppercase leading-tight tracking-tight">
                 <span className="block md:inline mb-6 md:mb-0">
                    <span className="text-white/50">WITHOUT MEMORY, </span><span className="text-white">THERE IS NO MEANING. </span>
                 </span>
                 <span className="block md:inline mb-6 md:mb-0">
                    <span className="text-white/50">WITHOUT VISION, </span><span className="text-white">THERE IS NO VELOCITY. </span>
                 </span>
                 <span className="block md:inline">
                    <span className="text-white/50">WITHOUT PLACE, </span><span className="text-white">THERE IS NO PERSPECTIVE.</span>
                 </span>
               </p>
           </div>
           
           {/* 
                2. MEDIA BENTO BOX (Full Width, Standard 16:9 Landscape)
           */}
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

           {/* 
                3. BOTTOM GRID
                3 Columns for Address, Energy, Convergence.
           */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">
               <InnerBento 
                    title="ADDRESS" 
                    gradient="bg-micron-green"
                    icon={<Globe />}
                    delay={0.2}
                    className="overflow-y-auto"
               >
                   <p className="text-sm">Warm Springs Avenue began as a stagecoach route in the 1890s. Stone carriage steps still line the street where horses were hitched outside Queen Anne mansions and Colonial Revival homes.</p>
                   <p className="text-sm mt-2">The avenue is a wide, tree-lined corridor on the National Register of Historic Places — the same road where Boise's wealthiest citizens built their estates using the city's most radical technology of the era: hot water from the ground.</p>
               </InnerBento>

               <InnerBento 
                    title="ENERGY" 
                    gradient="bg-micron-eggplant-light"
                    icon={<Activity />}
                    delay={0.3}
                    className="overflow-y-auto"
               >
                   <p className="text-sm">In 1892, banker C.W. Moore piped 177-degree geothermal water into his brick mansion at the corner of Warm Springs and Walnut — the first home in America heated by natural hot water.</p>
                   <p className="text-sm mt-2">Today the Boise Warm Springs Water District still delivers that same water to roughly 300 homes through the nation's oldest geothermal district heating system, operational for over 130 years.</p>
               </InnerBento>

               <InnerBento 
                    title="CONVERGENCE" 
                    gradient="bg-micron-black"
                    icon={<Zap />}
                    className="border-white/20 overflow-y-auto"
                    delay={0.4}
               >
                   <p className="text-sm">Micron House draws heat from the same aquifer that warmed its first residents in 1906 — energy from deep in the earth, delivered through infrastructure that predates electricity in most American homes.</p>
                   <p className="text-sm mt-2">Hot water rising from below. Data arriving from above. The oldest residential energy system in the country meeting the newest -- on a tree-lined street with carriage steps in the sidewalk, in a neighborhood that has been absorbing the future for 130 years.</p>
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