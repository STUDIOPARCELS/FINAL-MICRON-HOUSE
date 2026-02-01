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
        className={`${gradient} rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden group ${className}`}
    >
        {/* Decorative background element - Only if icon exists */}
        {icon && (
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {icon}
            </div>
        )}
        
        <div className="relative z-10 h-full flex flex-col">
            {(title || icon) && (
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                    {icon && React.cloneElement(icon, { size: 24, strokeWidth: 1.5 })}
                    {title}
                </h3>
            )}
            <div className="text-white/90 text-sm md:text-base leading-relaxed font-body font-medium space-y-4 flex-1">
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
                {/* Row 1: The 3 Core Pillars in Colorful Bento Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InnerBento 
                        title="The Service Layer" 
                        gradient="bg-micron-green" 
                        icon={<Server />}
                        delay={0.1}
                    >
                        <p>A private sanctuary serviced entirely by Optimus and Cybercab. Here, the service layer is the product.</p>
                        <p>It curates the best of Boise—bringing exclusive local experiences directly into the home or facilitating discreet autonomous transport.</p>
                    </InnerBento>

                    <InnerBento 
                        title="Real-World Integration" 
                        gradient="bg-micron-eggplant" 
                        icon={<Globe />}
                        delay={0.2}
                    >
                        <p>Located minutes from engineering headquarters, this residence creates a vital feedback loop.</p>
                        <p>Executives and guests live alongside the technology, observing Optimus and Cybercab in a genuine home environment, transforming abstract code into tangible experience.</p>
                    </InnerBento>

                    <InnerBento 
                        title="The Inflection Point" 
                        gradient="bg-micron-grey1" 
                        icon={<BrainCircuit />}
                        delay={0.3}
                    >
                        <p>As society pivots toward mass adoption of humanoid robotics, this residence serves as the strategic staging ground for essential dialogue.</p>
                        <ul className="list-disc pl-4 space-y-1 mt-2 text-white/80 text-xs">
                            <li>Absorbing visual vernacular of robotics.</li>
                            <li>Defining psychological thresholds.</li>
                            <li>Establishing autonomous-free zones.</li>
                        </ul>
                    </InnerBento>
                </div>

                {/* Row 2: Media / Video Section */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full aspect-video md:aspect-[21/9] bg-black rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer"
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
                        className="border border-zinc-200/10"
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
                        className="border border-white/10"
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
                    className="border border-zinc-800"
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
        <div className="flex flex-col gap-6">
           <div className="bg-zinc-100 p-8 rounded-2xl border border-zinc-200">
               <h3 className="text-2xl md:text-4xl text-zinc-900 font-black uppercase leading-none tracking-tighter mb-4">
                 WITHOUT PLACE,<br/> 
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-micron-green to-emerald-600">THERE IS NO PERSPECTIVE.</span>
               </h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <InnerBento 
                    title="The Origin Point" 
                    gradient="bg-micron-green"
                    icon={<Globe />}
                    delay={0.1}
               >
                   <p>Located across the street from the C.W. Moore House (1891). 177°F water rises naturally from the earth to heat this home, the State Capitol, and the surrounding historic district.</p>
               </InnerBento>

               <InnerBento 
                    title="Natural Stewardship" 
                    gradient="bg-micron-eggplant-light"
                    icon={<Activity />}
                    delay={0.2}
               >
                   <p>A property maintained under single ownership for 25 years. Defined by producing fruit trees, Concord grapevines, and deep wellness infrastructure.</p>
               </InnerBento>

               <InnerBento 
                    title="Earth Meets Stars" 
                    gradient="bg-gradient-to-br from-zinc-900 to-black"
                    icon={<Zap />}
                    className="border border-white/20"
                    delay={0.3}
               >
                   <p>Energy from the ground meets energy from the stars. Heat bubbles up through the pipes to warm the structure; intelligence beams down via Starlink to power the robotics.</p>
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
    // Reduced padding: py-16 instead of py-24
    <section id="prototype" className="container mx-auto px-6 py-8 md:px-12 md:py-16 bg-white text-zinc-900">
      
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
                                            color: word === "BOISE." ? '#008f25' : '#6b7280', 
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
                                className="text-zinc-600 block text-base"
                        >
                            Creating the first autonomous corporate residence. A convergence of historic stewardship and future technology.
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
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