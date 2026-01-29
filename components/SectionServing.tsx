import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';

const departments = [
  { id: "travel", title: "Travel & Entertainment", value: "Board hosting, VIP visits", detail: "High-caliber guests in private setting, control over experience, memorable impressions.", gradient: "bg-zinc-950" }, 
  { id: "mobility", title: "Global Mobility", value: "Soft landings", detail: "Real neighborhood experience, family accommodation, transition support before permanent housing.", gradient: "bg-black" }, 
  { id: "talent", title: "Talent Acquisition", value: "Recruiting closes", detail: "Differentiated candidate experience, memorable final impression, demonstrates company culture.", gradient: "bg-zinc-900" }, 
  { id: "employee", title: "Employee Experience", value: "Milestone rewards", detail: "Recognition for exceptional performance, unique reward beyond standard compensation.", gradient: "bg-zinc-800" }, 
  { id: "exec", title: "Executive Office", value: "Confidential off-sites", detail: "Strategy sessions, sensitive conversations, total discretion, no hotel staff.", gradient: "bg-zinc-950" }, 
  { id: "foundation", title: "Micron Foundation", value: "Community events", detail: "Hosting community leaders, nonprofit partners, civic engagement.", gradient: "bg-micron-green" }, // ACCENT
  { id: "events", title: "Events & Meetings", value: "Private dinners", detail: "Controlled environment, curated experiences, cultural calendar integration.", gradient: "bg-micron-eggplant" }, // ACCENT 
  { id: "family", title: "Family Support", value: "St. Luke's lodging", detail: "Less than 1 mile to medical center, home environment during difficult times, compassionate use.", gradient: "bg-zinc-900" } 
];

export const SectionServing: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const handleCardClick = (dept: typeof departments[0]) => {
    setModalData({
      title: dept.title,
      subtitle: dept.value,
      label: "Department Value",
      category: 'reference',
      content: <p className="text-lg text-zinc-300 font-body">{dept.detail}</p>
    });
  };

  return (
    <section id="serving" className="container mx-auto px-6 py-24 md:px-12 bg-zinc-50 text-zinc-900">
      {/* Consistent Header */}
      <div className="mb-20 flex flex-col md:flex-row md:items-end gap-6 border-b border-zinc-200 pb-8">
        <div>
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">03 / Departments</span>
           <h2 className="text-5xl md:text-6xl font-bold font-micron uppercase tracking-tight text-zinc-900 leading-none">Serving Micron</h2>
        </div>
        <div className="md:ml-auto max-w-md pb-1">
          <p className="text-zinc-500 font-body text-sm leading-relaxed">
            Solving immediate corporate needs. Adding value to the Micron ecosystem.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {departments.map((dept, i) => (
          <BentoCard 
            key={dept.id} 
            className="flex flex-col justify-center min-h-[180px] group border border-white/5" 
            gradient={dept.gradient}
            delay={i * 0.05}
            onClick={() => handleCardClick(dept)}
          >
            <div className="mb-auto flex justify-between">
               <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Dept. {i+1}</span>
            </div>
            <h3 className="font-bold text-xl text-white mb-2 tracking-tight">{dept.title}</h3>
            <p className="text-xs text-white/50 font-body uppercase tracking-wide">{dept.value}</p>
          </BentoCard>
        ))}
      </div>

      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};