import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { motion } from 'framer-motion';
import { Wine, Car, BedDouble, Shield, Music, Mic, Armchair, Heart, Trophy, Snowflake, Utensils, Cpu, Users, Fish, Map } from 'lucide-react';

interface Experience {
  title: string;
  icon: React.ReactNode;
  description: string;
  customGradient?: string; // Restored custom gradient functionality
}

interface Department {
  id: string;
  title: string;
  value: string;
  detail: string;
  gradient: string;
  experiences: Experience[];
  
  // New props for Modal Color Customization
  modalHeaderColor: string; // Tailwind class for the modal title
  modalIconColor: string;   // Tailwind class for the icons inside the modal
  modalTagColor: string;    // Tailwind class for small accent tags or borders
}

// DEFINING COMPLEMENTARY COLOR PAIRINGS
const departments: Department[] = [
  { 
    id: "travel", 
    title: "Travel & Entertainment", 
    value: "Board hosting, VIP visits", 
    detail: "A private retreat for Micron executives, employees, and guests—designed to host a spectrum of intimate social and professional experiences.", 
    gradient: "bg-micron-eggplant", 
    modalHeaderColor: "text-micron-eggplant",
    modalIconColor: "text-zinc-400", 
    modalTagColor: "border-micron-green",
    experiences: [
      {
        title: "Game Days",
        icon: <Trophy />,
        description: "BSU football Saturday. Tailgate brunch catered by Kris Komori (KIN, Idaho's first James Beard winner). Gathering at the House before and after the game.",
        customGradient: "bg-micron-eggplant"
      },
      {
        title: "The Prelude", 
        icon: <Music />,
        description: "Pre-event cocktails by Remi McManus (Bar, Please!) in the living room. Cybercab transfer to Albertsons Stadium suites for Post Malone or the 2026 concert series.",
        customGradient: "bg-micron-green"
      },
      // Added Fly Fishing - Color: Blue
      {
        title: "FLY FISHING",
        icon: <Fish />,
        description: "Cybercab to Jackson Jet Center, fifteen minutes. Helicopter into the Sawtooth National Forest, where the South Fork of the Boise River runs cold through a basalt canyon holding wild rainbow and brown trout. A guided morning on a private stretch, then a riverside lunch from one of Boise's James Beard–recognized chefs paired with Snake River Valley wines. Helicopter back. Cybercab waiting.",
        customGradient: "bg-micron-eggplant-light" 
      },
      // Added Rocky Bar - Color: Gray
      {
        title: "ROCKY BAR",
        icon: <Map />,
        description: "Cybercab to Jackson Jet Center, fifteen minutes. Helicopter southeast over Arrowrock Reservoir and into the Boise Mountains — twenty minutes to a ghost town at the confluence of Bear and Steel Creeks that once held 2,500 people and nearly became Idaho's territorial capital. A local historian walks the group through what remains — the old jail, Peg Leg Annie's cabin, mine ruins scattered across a ten-square-mile National Register district, and the cemetery where acting territorial governor Clinton DeWitt Smith dropped dead mid-chess game while inspecting the quartz mines in 1865. Creekside lunch from a James Beard–recognized Boise chef, Snake River Valley wines, late summer light through the cottonwoods. Helicopter back. Cybercab waiting.",
        customGradient: "bg-micron-grey1"
      }
    ]
  }, 
  { 
    id: "events", 
    title: "Events & Meetings", 
    value: "Private dinners", 
    detail: "Controlled environment, curated experiences, cultural calendar integration.", 
    gradient: "bg-micron-green", 
    modalHeaderColor: "text-micron-green",
    modalIconColor: "text-zinc-400",
    modalTagColor: "border-micron-eggplant",
    experiences: [
      {
        title: "Snake River Tasting",
        icon: <Wine />,
        description: "Four winemakers from Sunnyslope: Ste. Chapelle, Telaya, Huston, Koenig. Pouring Parma Ridge Gewürztraminer (93 pts) and Huston Sparkling Grüner Veltliner (92 pts).",
        customGradient: "bg-micron-green"
      },
      {
        title: "Basque Supper",
        icon: <Utensils />,
        description: "Traditional Basque dinner by Dan Ansotegui (Ansots, 2026 Outstanding Hospitality nominee). Lamb, chorizos, pimientos. Celebrating Boise's heritage with eight guests.",
        customGradient: "bg-micron-eggplant"
      }
    ]
  },
  { 
    id: "exec", 
    title: "Executive Office", 
    value: "Confidential off-sites", 
    detail: "Strategy sessions, sensitive conversations, total discretion, no hotel staff.", 
    gradient: "bg-micron-grey1", 
    modalHeaderColor: "text-micron-grey1",
    modalIconColor: "text-zinc-400",
    modalTagColor: "border-micron-eggplant-light",
    experiences: [
      {
        title: "Confidential Counsel",
        icon: <Shield />,
        description: "Fireside conversations with the Governor or key investors. Optimus and Cybercab manage all logistics for total discretion.",
        customGradient: "bg-micron-grey1"
      },
      {
        title: "Visiting Voices",
        icon: <Mic />,
        description: "Intimate fireside lectures with semiconductor leaders. Dinner prepared by Nathan Whitley (Terroir, 2026 James Beard semifinalist).",
        customGradient: "bg-micron-eggplant-light"
      }
    ]
  }, 
  { 
    id: "mobility", 
    title: "Global Mobility", 
    value: "Soft landings", 
    detail: "Real neighborhood experience, family accommodation, transition support before permanent housing.", 
    gradient: "bg-micron-eggplant-light", 
    modalHeaderColor: "text-micron-eggplant-light",
    modalIconColor: "text-zinc-400",
    modalTagColor: "border-micron-grey1",
    experiences: [
      {
        title: "Soft Landings",
        icon: <BedDouble />,
        description: "Executives relocating from Munich, Seoul, or Tel Aviv. Two weeks in a real Boise neighborhood. An environment of fruit trees, geothermal heat, and a private hot tub and sauna before permanent housing.",
        customGradient: "bg-micron-eggplant-light"
      }
    ]
  }, 
  { 
    id: "talent", 
    title: "Talent Acquisition", 
    value: "Recruiting closes", 
    detail: "Differentiated candidate experience, memorable final impression, demonstrates company culture.", 
    // Changed to BLUE (eggplant-light) as requested
    gradient: "bg-micron-eggplant-light", 
    modalHeaderColor: "text-micron-eggplant-light", 
    modalIconColor: "text-zinc-400",
    modalTagColor: "border-micron-eggplant-light",
    experiences: [
      {
        title: "Chef's Table",
        icon: <Wine />,
        description: "Salvador Alamilla (Amano, 2025 James Beard Best Chef Mountain) prepares a multi-course dinner to impress a top candidate. Snake River Valley Malbec pairings.",
        customGradient: "bg-micron-grey1"
      },
      {
        title: "The Closer",
        icon: <Shield />,
        description: "Final offer discussions by the living room fireplace. A neutral setting in the 1906 historic estate, surrounded by curated regional art, away from the boardroom.",
        customGradient: "bg-micron-eggplant-light"
      },
      {
        title: "Family Basecamp",
        icon: <Heart />,
        description: "While the candidate interviews at HQ (15m away), the family starts their \"Day in Boise\" with breakfast on the private terrace.",
        customGradient: "bg-micron-green"
      }
    ]
  }, 
  { 
    id: "foundation", 
    title: "Micron Foundation", 
    value: "Community events", 
    detail: "Hosting community leaders, nonprofit partners, civic engagement.", 
    gradient: "bg-micron-grey2", 
    modalHeaderColor: "text-micron-grey2",
    modalIconColor: "text-zinc-400",
    modalTagColor: "border-micron-green",
    experiences: [
      {
        title: "Art + Appetite",
        icon: <Music />,
        description: "Boise Art Museum leads a private discussion on National Gallery of Art loans (Eakins, Morisot, Rothko). Dinner by Alex Cardoza (Susina, 2026 James Beard semifinalist).",
        customGradient: "bg-micron-grey2"
      },
      {
        title: "Young Innovators",
        icon: <Cpu />,
        description: "STEM immersion featuring live Optimus and Cybercab demonstrations. Students engage directly with autonomous systems in a residential context. Thirty students.",
        customGradient: "bg-micron-green"
      },
      {
        title: "Chip & Chair",
        icon: <Users />,
        description: "Micron engineers mentor Boise State CS students fireside. A cohort conversation on the semiconductor industry catered by Dan Ansotegui (Ansots, 3x James Beard semifinalist). Twelve students.",
        customGradient: "bg-micron-eggplant"
      }
    ]
  }, 
  { 
    id: "family", 
    title: "Family Support", 
    value: "St. Luke's lodging", 
    detail: "Less than 1 mile to medical center, home environment during difficult times, compassionate use.", 
    gradient: "bg-micron-grey3", 
    modalHeaderColor: "text-micron-grey1",
    modalIconColor: "text-zinc-400",
    modalTagColor: "border-micron-eggplant",
    experiences: [
      {
        title: "Healing House",
        icon: <Heart />,
        description: "A restorative alternative to a hotel for families during treatment at St. Luke's (2 min away). Radiant heat, wood fireplace. Producing fruit trees. Optimus manages daily needs.",
        customGradient: "bg-micron-eggplant"
      }
    ]
  },
  { 
    id: "employee", 
    title: "Employee Incentives", 
    value: "Milestone rewards", 
    detail: "Recognition for exceptional performance, unique reward beyond standard compensation.", 
    gradient: "bg-micron-green", 
    modalHeaderColor: "text-micron-green",
    modalIconColor: "text-zinc-400",
    modalTagColor: "border-micron-eggplant-light",
    experiences: [
      {
        title: "Alpine Days",
        icon: <Snowflake />,
        description: "Heli-ski Idaho backcountry. Return for geothermal hot tub and contrast therapy. Recovery meal by a local chef. Optimus handles housekeeping.",
        customGradient: "bg-micron-green"
      },
      {
        title: "Spa Recovery",
        icon: <Armchair />,
        description: "In-home massage therapy followed by a geothermal soak. Physical restoration occurs entirely within the property lines.",
        customGradient: "bg-micron-eggplant-light"
      }
    ]
  }, 
];

export const SectionServing: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const openDeptModal = (dept: Department) => {
      setModalData({
        title: dept.title,
        subtitle: dept.value,
        category: 'showcase', 
        theme: 'light', // Force White Background for the modal itself
        headerClassName: dept.modalHeaderColor, 
        content: (
            <div className="flex flex-col gap-6">
                 {/* 
                    1. DESCRIPTION - Clean, architectural, reduced padding
                 */}
                 <motion.div 
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    className="pb-2"
                 >
                     {/* Reduced text size for mobile/desktop for better fit: text-lg md:text-2xl */}
                     <p className="text-lg md:text-2xl font-light text-zinc-800 leading-tight tracking-tight">
                        {dept.detail}
                     </p>
                 </motion.div>
                 
                 <div className="space-y-4">
                    {/* Subhead */}
                    <motion.h3 
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2"
                    >
                        Curated Experiences
                    </motion.h3>
                    
                    {/* 
                       2. EXPERIENCE CARDS - 3D Effect
                       Enhanced shadow, border, and lighting for "pop out" look.
                       REMOVED: Black outlines (border-black/30 -> border-black/5).
                    */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dept.experiences.map((exp, i) => {
                             // LOGIC: If this is the last item and the total is odd, make it span full width
                             const isLastAndOdd = (i === dept.experiences.length - 1) && (dept.experiences.length % 2 !== 0);
                             
                             return (
                                <motion.div 
                                    key={i}
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                    whileHover={{ y: -4, scale: 1.01 }}
                                    className={`
                                        ${isLastAndOdd ? 'md:col-span-2' : ''}
                                        ${exp.customGradient || dept.gradient} 
                                        rounded-2xl p-8
                                        border-t border-l border-white/20 border-b border-black/10 border-r border-black/5
                                        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]
                                        hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]
                                        transition-all duration-300
                                        group relative overflow-hidden
                                        ring-1 ring-white/10 ring-inset
                                    `}
                                >
                                    {/* 3D Highlight Gradient at top */}
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
                                    
                                    {/* Subtle texture overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />

                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div className="flex justify-between items-start mb-6">
                                            <h4 className="text-xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                                                {exp.title}
                                            </h4>
                                            {/* Icon size 24 */}
                                            <div className="text-white/90 group-hover:text-white transition-colors drop-shadow-md">
                                                {React.cloneElement(exp.icon as React.ReactElement<any>, { size: 24, strokeWidth: 1.5 })}
                                            </div>
                                        </div>
                                        
                                        <p className="text-white/95 text-sm leading-relaxed font-medium drop-shadow-sm">
                                            {exp.description}
                                        </p>
                                    </div>
                                </motion.div>
                             );
                        })}
                    </div>
                 </div>
            </div>
        )
      });
  };

  return (
    // Reduced padding: py-16 instead of py-24, px-4 mobile
    <section id="serving" className="container mx-auto px-4 md:px-12 py-8 md:py-16 bg-white text-zinc-900">
      
      {/* Header - Animated Reveal */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, amount: 0.2 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="mb-12 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-8"
      >
        <div className="flex-shrink-0">
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">04 / ENGAGEMENT</span>
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant leading-none">SERVING MICRON</h2>
        </div>
        
        <div className="md:ml-auto max-w-2xl pb-1">
             <div className="pl-6 border-l-4 border-micron-eggplant/20 hover:border-micron-eggplant transition-colors duration-500">
                <p className="text-base font-light text-zinc-600 leading-snug font-body">
                   <span className="font-bold text-micron-eggplant block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                       STRATEGIC ALIGNMENT.
                   </span>
                   Integrating the residence into Micron's operational fabric. It serves not just as accommodation, but as a strategic asset for talent acquisition, executive privacy, and brand equity.
                </p>
             </div>
        </div>
      </motion.div>

      {/* Departments Grid - RESPONSIVE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept, i) => (
          <BentoCard 
            key={dept.id} 
            className="flex flex-col justify-between min-h-[180px] relative overflow-hidden group" 
            gradient={dept.gradient}
            textColor="text-white"
            borderColor="border-white/10"
            delay={i * 0.05}
            hoverEffect={true}
            onClick={() => openDeptModal(dept)}
          >
            <div className="mt-2">
               <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                 {dept.title}
               </h3>
               
               <p className="text-xs font-bold uppercase tracking-widest text-white/60 font-sans">
                  {dept.value}
               </p>
            </div>
          </BentoCard>
        ))}
      </div>

      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};