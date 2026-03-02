
import React from 'react';
import { BentoCard } from './BentoCard';
import { Calendar, PenTool, Activity, Zap, FileText, Database, Shield, Radio, Cpu, Network } from 'lucide-react';
import { motion } from 'framer-motion';

const timelineEvents = [
  {
    id: 1,
    date: "NOW",
    title: "AGREEMENT",
    desc: "Defining the physical API.",
    detail: "Establishing the interface between historic infrastructure and autonomous logic. Mapping the residence for Optimus navigation.",
    icon: <Database />,
    gradient: "bg-micron-black",
  },
  {
    id: 2,
    date: "DAY 60",
    title: "SYSTEMS ALIGNMENT",
    desc: "Digitizing the environment.",
    detail: "Optimus neural networks ingest the property's geometry for centimeter-level navigation and semantic understanding.",
    icon: <Network />,
    gradient: "bg-micron-eggplant-light", // Changed to Blue
  },
  {
    id: 3,
    date: "DAY 90",
    title: "WELLNESS INSTALL",
    desc: "Human optimization.",
    detail: "Deploying contrast therapy, vibration systems, and circadian lighting to service the biological occupants.",
    icon: <Activity />,
    gradient: "bg-micron-green",
  },
  {
    id: 4,
    date: "DAY 120",
    title: "ACCESS BEGINS",
    desc: "The feedback loop begins.",
    detail: "Executive stakeholders initiate residency. Initial feedback loops established between occupants and the autonomous OS.",
    icon: <Radio />,
    gradient: "bg-micron-grey3",
  },
  {
    id: 5,
    date: "2027",
    title: "FULL AUTONOMY",
    desc: "The new standard.",
    detail: "Transitioning to zero-intervention property management. Cybercab and Optimus assume full operational governance.",
    icon: <Cpu />,
    gradient: "bg-micron-eggplant",
  }
];

export const SectionTimeline: React.FC = () => {
  // Removed Modal State and Modal Component usage
  
  return (
    // Reduced padding: py-16 instead of py-24, px-4 mobile
    <section id="timeline" className="container mx-auto px-4 md:px-12 py-8 md:py-16 mb-20 bg-white text-zinc-900">
      {/* Consistent Header */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: false, amount: 0.2 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="mb-12 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-8"
      >
        <div className="flex-shrink-0">
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">06 / Roadmap</span>
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-grey1 leading-none font-sans">EXECUTION ROADMAP</h2>
        </div>

        <div className="md:ml-auto max-w-2xl pb-1">
             <div className="pl-6 border-l-4 border-micron-grey1/20 hover:border-micron-grey1 transition-colors duration-500">
                <p className="text-base font-light text-zinc-600 leading-snug font-body">
                   <span className="font-bold text-micron-grey1 block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                       STRATEGIC DEPLOYMENT.
                   </span>
                   From physical alignment to full autonomy. A phased integration of robotics, biometrics, and historic infrastructure.
                </p>
             </div>
        </div>
      </motion.div>

      {/* Grid - RESPONSIVE FIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {timelineEvents.map((item, i) => (
          <BentoCard 
            key={item.id} 
            delay={i * 0.1}
            className={`flex flex-col min-h-[340px] relative hover:shadow-2xl transition-shadow duration-300`}
            gradient={item.gradient}
            textColor="text-white"
            borderColor="border-white/10"
            hoverEffect={false} // Disabled hover lift to keep focus on reading
          >
             {/* Icon Top Left */}
             <div className="absolute top-8 left-8 text-white/80">
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24, strokeWidth: 1.5 })}
             </div>

             <div className="flex flex-col items-center justify-start h-full pt-16 text-center px-4">
                 <div className="mb-6">
                    <span className="text-xl font-bold uppercase tracking-widest text-white/60 font-sans block mb-1">
                        {item.date}
                    </span>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none mb-3">
                        {item.title}
                    </h3>
                    <div className="h-0.5 w-8 bg-white/30 mx-auto mt-2"></div>
                 </div>

                 <div className="mt-auto pb-4">
                     <p className="text-white font-bold text-sm uppercase tracking-wide mb-3">
                        {item.desc}
                     </p>
                     {/* Increased font size for readability as requested */}
                     <p className="text-white/90 font-body text-sm md:text-base leading-relaxed font-medium">
                        {item.detail}
                     </p>
                 </div>
             </div>
             
          </BentoCard>
        ))}
      </div>
    </section>
  );
};
