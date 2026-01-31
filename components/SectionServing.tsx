import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { motion } from 'framer-motion';
import { Wine, Car, BedDouble, Shield, Music, Mic, Armchair, Heart, Trophy, Snowflake, Utensils, Cpu, Users } from 'lucide-react';

interface Experience {
  title: string;
  icon: React.ReactNode;
  description: string;
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
    detail: "Esteemed corporate guests hosted in an intimate, private setting. Control over experience, memorable impressions.", 
    gradient: "bg-micron-eggplant", // Bento: Eggplant
    // Modal: Eggplant Header, Green Accents
    modalHeaderColor: "text-micron-eggplant",
    modalIconColor: "text-micron-green",
    modalTagColor: "border-micron-green",
    experiences: [
      {
        title: "Game Days",
        icon: <Trophy />,
        description: "BSU football Saturday. Tailgate brunch catered by Kris Komori (KIN, Idaho's first James Beard winner). Gathering at the House before and after the game."
      },
      {
        title: "The Staging Ground",
        icon: <Music />,
        description: "Pre-event cocktails by Remi McManus (Bar, Please!) in the living room. Cybercab transfer to Albertsons Stadium suites for Post Malone or the 2026 concert series."
      }
    ]
  }, 
  { 
    id: "events", 
    title: "Events & Meetings", 
    value: "Private dinners", 
    detail: "Controlled environment, curated experiences, cultural calendar integration.", 
    gradient: "bg-micron-green", // Bento: Green
    // Modal: Green Header, Eggplant Accents
    modalHeaderColor: "text-micron-green",
    modalIconColor: "text-micron-eggplant",
    modalTagColor: "border-micron-eggplant",
    experiences: [
      {
        title: "Snake River Tasting",
        icon: <Wine />,
        description: "Four winemakers from Sunnyslope: Ste. Chapelle, Telaya, Huston, Koenig. Pouring Parma Ridge Gewürztraminer (93 pts) and Huston Sparkling Grüner Veltliner (92 pts)."
      },
      {
        title: "Basque Supper",
        icon: <Utensils />,
        description: "Traditional Basque dinner by Dan Ansotegui (Ansots, 2026 Outstanding Hospitality nominee). Lamb, chorizos, pimientos. Celebrating Boise's heritage with eight guests."
      }
    ]
  },
  { 
    id: "exec", 
    title: "Executive Office", 
    value: "Confidential off-sites", 
    detail: "Strategy sessions, sensitive conversations, total discretion, no hotel staff.", 
    gradient: "bg-micron-grey1", // Bento: Dark Gray
    // Modal: Dark Gray Header, Blue Accents
    modalHeaderColor: "text-micron-grey1",
    modalIconColor: "text-micron-eggplant-light",
    modalTagColor: "border-micron-eggplant-light",
    experiences: [
      {
        title: "Confidential Counsel",
        icon: <Shield />,
        description: "Fireside conversations with the Governor or key investors. Optimus and Cybercab manage all logistics for total discretion."
      },
      {
        title: "Visiting Voices",
        icon: <Mic />,
        description: "Intimate fireside lectures with semiconductor leaders. Dinner prepared by Nathan Whitley (Terroir, 2026 James Beard semifinalist)."
      }
    ]
  }, 
  { 
    id: "mobility", 
    title: "Global Mobility", 
    value: "Soft landings", 
    detail: "Real neighborhood experience, family accommodation, transition support before permanent housing.", 
    gradient: "bg-micron-eggplant-light", // Bento: Blue
    // Modal: Blue Header, Dark Gray Accents
    modalHeaderColor: "text-micron-eggplant-light",
    modalIconColor: "text-micron-grey1",
    modalTagColor: "border-micron-grey1",
    experiences: [
      {
        title: "Soft Landings",
        icon: <BedDouble />,
        description: "Executives relocating from Munich, Seoul, or Tel Aviv. Two weeks in a real Boise neighborhood. Fruit trees, geothermal heat, and a private hot tub and sauna before permanent housing."
      }
    ]
  }, 
  { 
    id: "talent", 
    title: "Talent Acquisition", 
    value: "Recruiting closes", 
    detail: "Differentiated candidate experience, memorable final impression, demonstrates company culture.", 
    gradient: "bg-micron-eggplant", // Bento: Eggplant
    // Modal: Eggplant Header, Blue Accents (Different combo than Travel)
    modalHeaderColor: "text-micron-eggplant",
    modalIconColor: "text-micron-eggplant-light",
    modalTagColor: "border-micron-eggplant-light",
    experiences: [
      {
        title: "Chef's Table",
        icon: <Wine />,
        description: "Salvador Alamilla (Amano, 2025 James Beard Best Chef Mountain) prepares a multi-course dinner to impress a top candidate. Snake River Valley Malbec pairings."
      },
      {
        title: "The Closer",
        icon: <Shield />,
        description: "Final offer discussions by the living room fireplace. A neutral setting in the 1906 historic estate, surrounded by curated regional art, away from the boardroom."
      },
      {
        title: "Family Basecamp",
        icon: <Heart />,
        description: "While the candidate interviews at HQ (15m away), the family starts their \"Day in Boise\" with breakfast on the private terrace."
      }
    ]
  }, 
  { 
    id: "foundation", 
    title: "Micron Foundation", 
    value: "Community events", 
    detail: "Hosting community leaders, nonprofit partners, civic engagement.", 
    gradient: "bg-micron-grey2", // Bento: Mid Gray
    // Modal: Mid Gray Header, Green Accents
    modalHeaderColor: "text-micron-grey2",
    modalIconColor: "text-micron-green",
    modalTagColor: "border-micron-green",
    experiences: [
      {
        title: "Art + Appetite",
        icon: <Music />,
        description: "Boise Art Museum leads a private discussion on National Gallery of Art loans (Eakins, Morisot, Rothko). Dinner by Alex Cardoza (Susina, 2026 James Beard semifinalist)."
      },
      {
        title: "Young Innovators",
        icon: <Cpu />,
        description: "STEM event featuring an Optimus demonstration. Students tour the geothermal system where C.W. Moore built America's first geothermal-heated home in 1891. Thirty students."
      },
      {
        title: "Chip & Chair",
        icon: <Users />,
        description: "Engineers mentor Boise State CS students fireside. A cohort conversation on the semiconductor industry catered by Dan Ansotegui (Ansots, 3x James Beard semifinalist). Twelve students."
      }
    ]
  }, 
  { 
    id: "family", 
    title: "Family Support", 
    value: "St. Luke's lodging", 
    detail: "Less than 1 mile to medical center, home environment during difficult times, compassionate use.", 
    gradient: "bg-micron-grey3", // Bento: Light Gray
    // Modal: Dark Gray Header (For contrast), Eggplant Accents (Warmth)
    modalHeaderColor: "text-micron-grey1",
    modalIconColor: "text-micron-eggplant",
    modalTagColor: "border-micron-eggplant",
    experiences: [
      {
        title: "Healing House",
        icon: <Heart />,
        description: "A restorative alternative to a hotel for families during treatment at St. Luke's (2 min away). Radiant heat, wood fireplace. Producing fruit trees. Optimus manages daily needs."
      }
    ]
  },
  { 
    id: "employee", 
    title: "Employee Incentives", 
    value: "Milestone rewards", 
    detail: "Recognition for exceptional performance, unique reward beyond standard compensation.", 
    gradient: "bg-micron-green", // Bento: Green
    // Modal: Green Header, Blue Accents
    modalHeaderColor: "text-micron-green",
    modalIconColor: "text-micron-eggplant-light",
    modalTagColor: "border-micron-eggplant-light",
    experiences: [
      {
        title: "Alpine Days",
        icon: <Snowflake />,
        description: "Heli-ski Idaho backcountry. Return for geothermal hot tub and contrast therapy. Recovery meal by a local chef. Optimus handles housekeeping."
      },
      {
        title: "Spa Recovery",
        icon: <Armchair />,
        description: "In-home massage therapy followed by a geothermal soak. Physical restoration occurs entirely within the property lines."
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
        category: 'reference', // Uses larger layout
        theme: 'light', // Force White Background
        headerClassName: dept.modalHeaderColor, // Pass custom header color
        content: (
            <div className="flex flex-col gap-10">
                 <div>
                     <p className="text-2xl md:text-3xl font-light text-zinc-600 leading-tight">
                        {dept.detail}
                     </p>
                 </div>
                 
                 <div className="h-px bg-zinc-200 w-full"></div>

                 <div className="space-y-6">
                    {/* Subhead styled with accent color */}
                    <h3 className={`text-sm font-bold uppercase tracking-[0.2em] opacity-80 ${dept.modalIconColor}`}>
                        Curated Experiences
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dept.experiences.map((exp, i) => (
                            <div 
                                key={i} 
                                // White mode cards: zinc-50 background, zinc-200 border
                                className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 hover:border-zinc-300 hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`${dept.modalIconColor}`}>
                                        {React.cloneElement(exp.icon as React.ReactElement<any>, { size: 28, strokeWidth: 1.5 })}
                                    </div>
                                    <h4 className="text-lg font-bold uppercase tracking-tight text-zinc-800">{exp.title}</h4>
                                </div>
                                <p className="text-zinc-500 font-light leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        )
      });
  };

  return (
    <section id="serving" className="container mx-auto px-6 py-8 md:px-12 md:py-24 bg-zinc-50 text-zinc-900">
      
      {/* Header - Animated Reveal */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, amount: 0.2 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="mb-20 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-10"
      >
        <div className="flex-shrink-0">
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">04 / ENGAGEMENT</span>
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant leading-none">SERVING MICRON</h2>
        </div>
        
        <div className="md:ml-auto max-w-2xl pb-1">
             <div className="pl-6 border-l-4 border-micron-eggplant/20 hover:border-micron-eggplant transition-colors duration-500">
                <p className="text-lg font-light text-zinc-600 leading-snug font-body">
                   <span className="font-bold text-micron-eggplant block mb-2 text-xl md:text-2xl uppercase tracking-tighter font-sans">
                       STRATEGIC ALIGNMENT.
                   </span>
                   Integrating the residence into Micron's operational fabric. It serves not just as accommodation, but as a strategic asset for talent acquisition, executive privacy, and brand equity.
                </p>
             </div>
        </div>
      </motion.div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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