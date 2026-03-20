import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { motion } from 'framer-motion';
import { Wine, BedDouble, Shield, Music, Mic, Heart, Trophy, Utensils, Cpu, Users, Map, Fish, Stethoscope } from 'lucide-react';

interface Experience {
  title: string;
  icon: React.ReactNode;
  description: string | React.ReactNode; 
  customGradient?: string; 
}

interface ChildDept {
  id: string;
  title: string;
  value: string;
  detail: string;
  gradient: string;
  tagColor: string;
  experiences: Experience[];
}

// ─── EXECUTIVE HOSTING children ───
const execChildren: ChildDept[] = [
  { 
    id: "travel", title: "Travel & Entertainment", value: "Board hosting, VIP visits", 
    detail: "A private retreat for Micron executives, employees, and guests—designed to host a spectrum of intimate social and professional experiences.", 
    gradient: "bg-micron-eggplant", tagColor: "border-micron-green",
    experiences: [
      { title: "Game Days", icon: <Trophy />, description: "BSU football Saturday. Tailgate brunch catered by Kris Komori (KIN, Idaho\u2019s first James Beard winner). Gathering at the House before and after the game.", customGradient: "bg-micron-eggplant" },
      { title: "The Prelude", icon: <Music />, description: "Pre-event cocktails by Remi McManus (Bar, Please!) in the living room. Cybercab transfer to Albertsons Stadium suites for Post Malone or the 2026 concert series.", customGradient: "bg-micron-green" },
      { title: "Fly Fishing", icon: <Fish />, description: "Cybercab to Jackson Jet Center (15 min). Helicopter into the Sawtooth National Forest. Guided morning on a private stretch, riverside lunch paired with Snake River Valley wines.", customGradient: "bg-micron-eggplant-light" }
    ]
  }, 
  { 
    id: "events", title: "Events & Meetings", value: "Private dinners", 
    detail: "Consistent environment, curated experiences, cultural calendar integration.", 
    gradient: "bg-micron-green", tagColor: "border-micron-eggplant",
    experiences: [
      { title: "Snake River Tasting", icon: <Wine />, description: "Four winemakers from Sunnyslope: Ste. Chapelle, Telaya, Huston, Koenig. Pouring Parma Ridge Gew\u00fcrztraminer (93 pts) and Huston Sparkling Gr\u00fcner Veltliner (92 pts).", customGradient: "bg-micron-green" },
      { title: "Basque Supper", icon: <Utensils />, description: "Traditional Basque dinner by Dan Ansotegui (Ansots, 2026 Outstanding Hospitality nominee). Lamb, chorizos, pimientos. Celebrating Boise\u2019s heritage with eight guests.", customGradient: "bg-micron-eggplant" },
      { title: "Rocky Bar", icon: <Map />, description: "Cybercab to Jackson Jet Center (15 min). Helicopter to a ghost town in the Boise Mountains. Tour ruins of the old jail and cabins in a National Register district.", customGradient: "bg-micron-grey1" }
    ]
  },
  { 
    id: "exec", title: "Executive Office", value: "Confidential off-sites", 
    detail: "Strategy sessions, sensitive conversations, total discretion, no hotel staff.", 
    gradient: "bg-micron-grey1", tagColor: "border-micron-eggplant-light",
    experiences: [
      { title: "Confidential Counsel", icon: <Shield />, description: "Fireside conversations with the Governor or key investors. Optimus and Cybercab manage all logistics for total discretion.", customGradient: "bg-micron-grey1" },
      { title: "Visiting Voices", icon: <Mic />, description: "Intimate fireside lectures with semiconductor leaders. Dinner prepared by Nathan Whitley (Terroir, 2026 James Beard semifinalist).", customGradient: "bg-micron-eggplant-light" }
    ]
  }, 
  { 
    id: "talent", title: "Talent Acquisition", value: "Recruiting closes", 
    detail: "Differentiated candidate experience, memorable final impression, demonstrates company culture.", 
    gradient: "bg-micron-eggplant-light", tagColor: "border-micron-eggplant-light",
    experiences: [
      { title: "Chef\u2019s Table", icon: <Wine />, description: "Salvador Alamilla (Amano, 2025 James Beard Best Chef Mountain) prepares a multi-course dinner to impress a top candidate.", customGradient: "bg-micron-grey1" },
      { title: "The Closer", icon: <Shield />, description: "Final offer discussions by the living room fireplace. A neutral setting in the 1906 home, away from the boardroom.", customGradient: "bg-micron-eggplant-light" },
      { title: "Family Basecamp", icon: <Heart />, description: "While the candidate interviews at HQ (15m away), the family starts their \u201cDay in Boise\u201d with breakfast on the private terrace.", customGradient: "bg-micron-green" }
    ]
  }
];

// ─── RESIDENTIAL SUPPORT children ───
const resChildren: ChildDept[] = [
  { 
    id: "mobility", title: "Global Mobility", value: "Soft landings", 
    detail: "Real neighborhood experience, family accommodation, transition support before permanent housing.", 
    gradient: "bg-micron-eggplant-light", tagColor: "border-micron-grey1",
    experiences: [
      { title: "Soft Landings", icon: <BedDouble />, description: "Executives relocating from Munich, Seoul, or Tel Aviv. Two weeks in a real Boise neighborhood. An environment of fruit trees, geothermal heat, and a private hot tub.", customGradient: "bg-micron-eggplant-light" }
    ]
  }, 
  { 
    id: "family", title: "Family Support", value: "St. Luke\u2019s lodging", 
    detail: "Less than 1 mile to medical center, home environment during difficult times, compassionate use.", 
    gradient: "bg-micron-eggplant", tagColor: "border-micron-grey1",
    experiences: [
      { title: "Medical Proximity", icon: <Stethoscope />, description: "Located 0.8 miles from St. Luke\u2019s Boise Medical Center. Immediate access for families while retaining privacy.", customGradient: "bg-micron-eggplant" },
      { title: "Compassionate Stay", icon: <Heart />, description: "A private, fully equipped home for families facing long-term treatment scenarios. Dignity and comfort during crisis.", customGradient: "bg-micron-grey1" }
    ]
  },
  { 
    id: "foundation", title: "Micron Foundation", value: "Community events", 
    detail: "Hosting community leaders, nonprofit partners, civic engagement.", 
    gradient: "bg-micron-grey2", tagColor: "border-micron-green",
    experiences: [
      { title: "Art + Appetite", icon: <Music />, description: "Boise Art Museum leads a private discussion on National Gallery of Art loans. Dinner by Alex Cardoza (Susina).", customGradient: "bg-micron-grey2" },
      { title: "Young Innovators", icon: <Cpu />, description: "STEM immersion featuring live Optimus and Cybercab demonstrations. Students engage directly with autonomous systems.", customGradient: "bg-micron-green" },
      { title: "Chip & Chair", icon: <Users />, description: "Micron engineers mentor Boise State CS students fireside. A cohort conversation on the semiconductor industry.", customGradient: "bg-micron-eggplant" }
    ]
  }
];

interface ParentCard {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  gradient: string;
  children: ChildDept[];
}

const parentCards: ParentCard[] = [
  {
    id: "executive",
    title: "EXECUTIVE HOSTING",
    subtitle: "Board stays, private dinners, off-sites, recruiting",
    summary: "A private residence for VIP visits, confidential meetings, candidate closes, and hosted gatherings.",
    gradient: "bg-micron-eggplant",
    children: execChildren,
  },
  {
    id: "residential",
    title: "RESIDENTIAL SUPPORT",
    subtitle: "Relocation, family stays, community use",
    summary: "Soft landings for relocation, family lodging, St. Luke\u2019s proximity, and selected foundation or community use.",
    gradient: "bg-micron-eggplant-light",
    children: resChildren,
  }
];

export const SectionServing: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const openParentModal = (parent: ParentCard) => {
    setModalData({
      title: parent.title,
      subtitle: parent.subtitle,
      category: 'showcase',
      theme: 'light',
      maxWidth: 'max-w-6xl',
      headerClassName: parent.gradient === 'bg-micron-eggplant' ? 'text-micron-eggplant' : 'text-micron-eggplant-light',
      content: (
        <div className="flex flex-col gap-8 pb-4">
          <div className="border-l-4 border-micron-green pl-6 py-1">
            <p className="text-base font-light text-zinc-600 leading-relaxed font-body">
              {parent.summary}
            </p>
          </div>

          {parent.children.map((dept, deptIdx) => (
            <div key={dept.id} className="flex flex-col gap-4">
              <div className="flex items-baseline gap-3">
                <h4 className="text-lg font-bold uppercase tracking-tight text-zinc-900">{dept.title}</h4>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{dept.value}</span>
              </div>
              <div className={`border-l-4 ${dept.tagColor} pl-5 py-0.5 mb-1`}>
                <p className="text-sm font-light text-zinc-500 leading-relaxed">{dept.detail}</p>
              </div>

              <div className={`grid grid-cols-1 ${dept.experiences.length === 1 ? 'md:grid-cols-1 max-w-md' : dept.experiences.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4`}>
                {dept.experiences.map((exp, i) => (
                  <div 
                    key={i} 
                    className={`${exp.customGradient || dept.gradient} text-white p-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 border border-white/10`}
                  >
                    <div className="flex items-center gap-3">
                      {React.cloneElement(exp.icon as React.ReactElement<any>, { size: 20, className: "text-white/80" })}
                      <h5 className="text-base font-bold uppercase tracking-tight">{exp.title}</h5>
                    </div>
                    <div className="h-px w-full bg-white/20" />
                    <p className="text-white/80 font-medium leading-relaxed text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>

              {deptIdx < parent.children.length - 1 && (
                <div className="h-px w-full bg-zinc-200 mt-2" />
              )}
            </div>
          ))}
        </div>
      )
    });
  };

  return (
    <section id="serving" className="container mx-auto px-8 md:px-12 pt-12 pb-6 md:pb-12 text-zinc-900">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end gap-6 mb-12"
        >
            <div className="flex-shrink-0">
                <span className="block text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">03 / OUTCOME</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-micron-eggplant leading-none font-sans">
                    PROOF OF CONCEPT
                </h2>
            </div>
            
            <div className="md:ml-auto max-w-2xl pb-1">
                 <div className="md:pl-6 md:border-l-4 md:border-micron-eggplant/20 md:hover:border-micron-eggplant md:transition-colors md:duration-500">
                    <p className="text-base font-light text-zinc-600 leading-snug font-body">
                       <span className="font-bold text-micron-eggplant/50 block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                           CORPORATE AUTONOMOUS RESIDENCE
                       </span>
                       The prototype begins as a lived readiness proving ground for autonomy in practice. It then introduces the corporate autonomous residence and entertainment hub — a corporate residential model <strong className="font-semibold text-zinc-800">enabled by Optimus and Cybercab's service, security, and mobility layer.</strong>
                    </p>
                 </div>
            </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {parentCards.map((parent, i) => (
                <BentoCard
                    key={parent.id}
                    className={`flex flex-col min-h-[260px] md:min-h-[320px] p-8 relative overflow-hidden group transition-all duration-300 ${parent.gradient}`}
                    gradient={parent.gradient}
                    textColor="text-white"
                    borderColor="border-white/10"
                    delay={i * 0.2}
                    hoverEffect={true}
                    arrowPosition="bottom-right"
                    onClick={() => openParentModal(parent)}
                >
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none text-white mb-2">{parent.title}</h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-5">{parent.subtitle}</p>
                            <div className="h-px w-full bg-white/20 mb-5" />
                        </div>
                        <p className="text-base font-medium text-white/80 leading-relaxed">{parent.summary}</p>
                        <div className="flex flex-wrap gap-2 mt-5">
                            {parent.children.map((child) => (
                                <span key={child.id} className="text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/70 px-3 py-1.5 rounded-full border border-white/10">
                                    {child.title}
                                </span>
                            ))}
                        </div>
                    </div>
                </BentoCard>
            ))}
        </div>

        <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};
