
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
            border border-white/10
            ${className}
        `}
    >
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
            <div className="flex flex-col gap-8 h-full">
                {/* Intro Line */}
                <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed border-l-4 border-micron-green pl-6 py-1">
                    A private corporate residence powered by autonomous technology — <br />where Micron hosts, entertains, and demonstrates the future it's building.
                </p>

                <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[480px]">
                    {/* LEFT COLUMN: PORTRAIT VIDEO */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="w-full lg:w-4/12 bg-black rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border border-white/10 flex-shrink-0 order-1"
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
                            {/* ADDED SUBHEADER and standardized text size */}
                            <span className="text-white font-bold block mb-2 text-lg">The Autonomous Hub.</span>
                            <div className="text-sm leading-relaxed text-white/80 font-medium space-y-3">
                                <p>
                                    A secure, autonomous property for executive hosting, strategic entertaining, and confidential events — centrally located within a historic neighborhood.
                                </p>
                                <p>
                                    <span className="font-bold text-white">Optimus and Cybercab units execute all logistics</span>, delivering high-end culinary, wellness, and entertainment experiences with privacy and precision.
                                </p>
                            </div>
                        </InnerBento>

                        {/* BOTTOM LEFT */}
                        <InnerBento 
                            title="INTEGRATION" 
                            gradient="bg-micron-eggplant" 
                            icon={<Zap className="text-white/80" />}
                            delay={0.3}
                            className="flex flex-col justify-between"
                        >
                            <div className="text-sm leading-relaxed text-white/80 font-medium mb-4">
                                <span className="text-white font-bold block mb-2 text-lg">A Venue for Leadership.</span>
                                <p className="mb-4">
                                    A residential venue for the <span className="font-bold text-white">leaders building the future and the policymakers governing it</span>.
                                </p>
                                <p>
                                    Guests gather to experience the shift to autonomous systems directly, turning abstract policy into practical understanding.
                                </p>
                            </div>
                        </InnerBento>

                        {/* BOTTOM RIGHT */}
                        <InnerBento 
                            title="INFLECTION POINT" 
                            gradient="bg-micron-grey1" 
                            icon={<TrendingUp className="text-white/80" />}
                            delay={0.4}
                            className="flex flex-col justify-between"
                        >
                            <div className="flex flex-col gap-2">
                                <span className="text-white font-bold block mb-1 text-lg">Scaling to Billions.</span>
                                <div className="space-y-3 text-sm leading-relaxed text-white/80 font-medium">
                                    <p>
                                        Autonomous systems are scaling from thousands to billions. Daily life transforms permanently.
                                    </p>
                                    <p>
                                        The leaders building that future meet here to experience the shift firsthand and <span className="font-bold text-white">confront the profound questions it demands</span>.
                                    </p>
                                </div>
                            </div>
                        </InnerBento>
                    </div>
                </div>
            </div>
        )
    };
    case 2: return { 
        ...base, 
        title: 'TIMING', 
        subtitle: "THIS MOMENT",
        content: (
            <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
                {/* LEFT COLUMN: Video + RUNWAY */}
                <div className="lg:w-5/12 flex flex-col gap-6">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border border-white/10 flex-shrink-0"
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

                    <InnerBento title="RUNWAY" gradient="bg-micron-eggplant" delay={0.2} className="flex-1">
                        <p className="text-sm leading-relaxed font-medium">
                           Zero Optimus robots operate in private residences today — before mass production shifts the conversation from design to regulation.
                        </p>
                    </InnerBento>
                </div>

                {/* RIGHT COLUMN: BOISE'S MOMENT + 3 ARCS */}
                <div className="lg:w-7/12 flex flex-col gap-6">
                    <InnerBento title="BOISE'S MOMENT" gradient="bg-micron-green" delay={0.3} className="flex-shrink-0">
                         <p className="text-sm leading-relaxed text-white/95 font-medium">
                            A city once known primarily for potatoes and public land now supports a James Beard-nominated culinary scene, world-class wineries across the Snake River Valley, and a Division I University town.
                        </p>
                    </InnerBento>

                    <InnerBento 
                        title="3 ARCS CONVERGING" 
                        gradient="bg-micron-grey1" 
                        className="flex-1"
                        delay={0.4}
                    >
                         <div className="space-y-4 text-sm leading-relaxed text-white/95 font-medium">
                            <p>
                                A city reaching cultural maturity. A semiconductor company deploying the largest memory infrastructure investment in American history. A robotics company preparing to place autonomous systems into the world.
                            </p>
                            <p>
                                All converging on the same street where a Boise banker piped 177-degree water from the ground to heat his home in 1892 and started a tradition of adopting technology the rest of the country hadn't imagined yet.
                            </p>
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
                                <Cpu size={24} className="text-zinc-400" /> {/* Changed Icon Color to Gray */}
                            </div>
                            <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] mb-4">Sanjay Mehrotra, CEO</p>
                            {/* CHANGED: Reduced Size to text-sm md:text-base & Changed Color back to WHITE */}
                            <p className="text-sm md:text-base font-bold leading-tight mb-4 text-white tracking-tight italic">
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
                            {/* CHANGED: Reduced Size to text-sm md:text-base & Changed Color back to WHITE */}
                            <p className="text-sm md:text-base font-bold leading-tight mb-4 text-white tracking-tight italic">
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

                {/* ROW 2: FUTURE SCALE (Full Width, No Video) */}
                <div className="flex-1 min-h-[250px]">
                    <InnerBento 
                        title="FUTURE SCALE" 
                        gradient="bg-zinc-100" 
                        textColor="text-zinc-900" 
                        delay={0.3}
                        className="flex flex-col justify-between border-black/5 h-full"
                    >
                         <div className="flex flex-col md:flex-row gap-6 h-full">
                             {/* Stats Header - Left side on desktop for balanced layout */}
                             {/* CHANGED: Darkened border-r from zinc-200 to zinc-400 for visibility */}
                             <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:w-1/3 border-b md:border-b-0 md:border-r border-zinc-400 pb-4 md:pb-0 md:pr-4">
                                 <div>
                                    <span className="block text-4xl lg:text-5xl font-black tracking-tighter text-micron-eggplant leading-none">$200B</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Micron Investment</span>
                                 </div>
                                 <div>
                                    <span className="block text-4xl lg:text-5xl font-black tracking-tighter text-micron-eggplant leading-none">1M+</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Optimus Capacity</span>
                                 </div>
                             </div>
                             
                             {/* Narrative Content - Right side on desktop - Text Color CHANGED to BLACK */}
                             <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1 md:w-2/3 flex flex-col justify-center">
                                 <p className="text-sm md:text-base leading-relaxed text-black font-medium">
                                    Micron's $200 billion semiconductor commitment — the largest memory infrastructure investment in American history. Tesla targeting million-unit annual Optimus capacity, every unit a mobile supercomputer requiring Micron silicon.
                                 </p>
                                 <p className="text-sm md:text-base leading-relaxed text-black font-medium">
                                    Two companies scaling toward a future where autonomous systems outnumber people — both leaders acknowledging the speed of that transition carries shared responsibility.
                                 </p>
                             </div>
                        </div>
                    </InnerBento>
                </div>
            </div>
        )
    };
    case 4: return { 
        ...base, 
        title: 'PLACE', 
        subtitle: 'GROUNDING THE TECHNOLOGY', 
        content: (
        // REDESIGNED LAYOUT: Split Portrait Image (Left) + Dense Grid (Right)
        <div className="flex flex-col md:flex-row gap-6 h-full">
            {/* LEFT COLUMN: Portrait Image Card (40%) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full md:w-5/12 bg-zinc-900 rounded-2xl overflow-hidden shadow-lg relative group border border-white/10 shrink-0 min-h-[400px] md:min-h-0"
            >
                 <img 
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop" 
                    alt="Historic Foundation" 
                    // Use object-cover w-full h-full to fill the portrait container
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                 <div className="absolute bottom-8 left-8 right-8">
                    <span className="text-micron-green font-bold uppercase tracking-widest text-sm mb-2 block">Est. 1890</span>
                    <h4 className="text-white font-bold text-3xl md:text-5xl uppercase tracking-tight leading-none">The Historic Bedrock</h4>
                 </div>
           </motion.div>

           {/* RIGHT COLUMN: Quote + 3 Small Cards (60%) */}
           <div className="w-full md:w-7/12 flex flex-col gap-6">
                {/* Top: Quote Box */}
                <div className="bg-micron-eggplant p-8 rounded-2xl border border-white/10 shadow-lg flex items-center justify-center text-center flex-shrink-0">
                   <p className="text-xl md:text-2xl font-black uppercase leading-tight tracking-tight">
                     <span className="block mb-2">
                        <span className="text-white/50">WITHOUT MEMORY, </span><span className="text-white">THERE IS NO MEANING. </span>
                     </span>
                     <span className="block">
                        <span className="text-white/50">WITHOUT PLACE, </span><span className="text-white">THERE IS NO PERSPECTIVE.</span>
                     </span>
                   </p>
                </div>

                {/* Bottom: 3 Card Stack/Grid */}
                <div className="flex-1 grid grid-cols-1 gap-4 overflow-y-auto">
                    <InnerBento 
                        title="ADDRESS" 
                        gradient="bg-micron-green"
                        icon={<Globe />}
                        delay={0.2}
                    >
                        <p className="text-sm leading-relaxed">Warm Springs Avenue is a tree-lined corridor on the National Register of Historic Places — where Boise's wealthiest families built estates heated by the city's most radical technology: hot water from the ground.</p>
                    </InnerBento>

                    <InnerBento 
                        title="ENERGY" 
                        gradient="bg-micron-eggplant-light"
                        icon={<Activity />}
                        delay={0.3}
                    >
                        <div className="space-y-4">
                            <p className="text-sm leading-relaxed">
                                In 1892, C.W. Moore piped 177°F geothermal water into his mansion — the first home in America heated by natural hot water. The idea spread down the avenue, then downtown, and by 1982 to the State Capitol — now the only capitol building in the country on geothermal.
                            </p>
                            <p className="text-sm leading-relaxed">
                                Today, the same system delivers to roughly 300 homes — operational for over 130 years, the water temperature unchanged within one degree.
                            </p>
                        </div>
                    </InnerBento>

                    <InnerBento 
                        title="CONFLUENCE" 
                        gradient="bg-micron-black"
                        icon={<Zap />}
                        delay={0.4}
                    >
                        <p className="text-sm leading-relaxed">Heat from an aquifer tapped in 1892. Data from a satellite constellation powered by solar energy in space. Hot water rising from below. Signal arriving from above. The oldest residential energy system in the country meeting the newest — on a street that has been absorbing the future for 130 years.</p>
                    </InnerBento>
                </div>
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

            {/* Card 4: PLACE (Eggplant) */}
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
                        PLACE
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
