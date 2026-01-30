import React from 'react';
import { BentoCard } from './BentoCard';
import { motion } from 'framer-motion';

const departments = [
  // 1. Black (Top Left)
  { 
    id: "travel", 
    title: "Travel & Entertainment", 
    value: "Board hosting, VIP visits", 
    detail: "High-caliber guests in private setting, control over experience, memorable impressions.", 
    gradient: "bg-micron-black"
  }, 
  
  // 2. Green (Top Mid-Left)
  { 
    id: "events", 
    title: "Events & Meetings", 
    value: "Private dinners", 
    detail: "Controlled environment, curated experiences, cultural calendar integration.", 
    gradient: "bg-micron-green"
  },

  // 3. Eggplant (Top Mid-Right)
  { 
    id: "exec", 
    title: "Executive Office", 
    value: "Confidential off-sites", 
    detail: "Strategy sessions, sensitive conversations, total discretion, no hotel staff.", 
    gradient: "bg-micron-eggplant"
  }, 
  
  // 4. Gray (Top Right)
  { 
    id: "mobility", 
    title: "Global Mobility", 
    value: "Soft landings", 
    detail: "Real neighborhood experience, family accommodation, transition support before permanent housing.", 
    gradient: "bg-zinc-600"
  }, 
  
  // 5. Light Blue (Bottom Left)
  { 
    id: "talent", 
    title: "Talent Acquisition", 
    value: "Recruiting closes", 
    detail: "Differentiated candidate experience, memorable final impression, demonstrates company culture.", 
    gradient: "bg-micron-eggplant-light"
  }, 
  
  // 6. Black (Bottom Mid-Left)
  { 
    id: "foundation", 
    title: "Micron Foundation", 
    value: "Community events", 
    detail: "Hosting community leaders, nonprofit partners, civic engagement.", 
    gradient: "bg-micron-black"
  }, 
  
  // 7. Light Blue (Bottom Mid-Right)
  { 
    id: "family", 
    title: "Family Support", 
    value: "St. Luke's lodging", 
    detail: "Less than 1 mile to medical center, home environment during difficult times, compassionate use.", 
    gradient: "bg-micron-eggplant-light"
  },
  
  // 8. Green (Bottom Right)
  { 
    id: "employee", 
    title: "Employee Experience", 
    value: "Milestone rewards", 
    detail: "Recognition for exceptional performance, unique reward beyond standard compensation.", 
    gradient: "bg-micron-green"
  }, 
];

export const SectionServing: React.FC = () => {
  return (
    <section id="serving" className="container mx-auto px-6 py-24 md:px-12 bg-zinc-50 text-zinc-900">
      {/* Header - Animated Reveal */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="mb-20 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-10"
      >
        <div className="flex-shrink-0">
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">04 / ENGAGEMENT</span>
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant leading-none">SERVING MICRON</h2>
        </div>
        
        {/* Added Lorem Ipsum Description */}
        <div className="md:ml-auto max-w-2xl pb-1">
             <div className="pl-6 border-l-4 border-micron-eggplant/20 hover:border-micron-eggplant transition-colors duration-500">
                <p className="text-lg font-light text-zinc-600 leading-snug font-body">
                   <span className="font-bold text-micron-eggplant block mb-2 text-xl md:text-2xl uppercase tracking-tighter font-sans">
                       STRATEGIC ALIGNMENT.
                   </span>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                </p>
             </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept, i) => (
          <BentoCard 
            key={dept.id} 
            className="flex flex-col justify-between min-h-[280px] relative overflow-hidden group" 
            gradient={dept.gradient}
            textColor="text-white"
            borderColor="border-white/10"
            delay={i * 0.05}
            hoverEffect={true}
          >
            <div className="mt-4">
               {/* Updated Header Style to match Serving Tesla */}
               <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                 {dept.title}
               </h3>
               
               <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-6 font-sans">
                  {dept.value}
               </p>
               
               <p className="text-base text-white/80 font-body leading-relaxed">
                  {dept.detail}
               </p>
            </div>
            
          </BentoCard>
        ))}
      </div>
    </section>
  );
};