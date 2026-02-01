import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { MapPin, Plane, Building2, Trees, GraduationCap, Stethoscope, Utensils, Sprout, BedDouble, Images, ArrowUpRight, Home, Zap, Leaf, Map, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { ModalContent } from '../types';

export const SectionProperty: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const openGallery = () => {
    setModalData({
        title: "PROPERTY LIBRARY",
        category: 'gallery',
        content: null,
    });
  };

  return (
    // Reduced Section Padding: py-8 md:py-16 (was md:py-24)
    <section id="property" className="container mx-auto px-6 py-8 md:px-12 md:py-16 bg-zinc-50 text-zinc-900">
       {/* Header - Animated Reveal */}
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: false, amount: 0.2 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         // Reduced margin-bottom: mb-10 (was mb-16)
         className="mb-10 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-10"
      >
        <div className="flex-shrink-0">
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">02 / ASSET</span>
           {/* Color changed to BLUE */}
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant-light leading-none font-sans">PROPERTY</h2>
        </div>
        
        <div className="md:ml-auto max-w-2xl pb-1">
             <div className="pl-6 border-l-4 border-micron-eggplant/20 hover:border-micron-eggplant transition-colors duration-500">
                <p className="text-base font-light text-zinc-600 leading-snug font-body">
                   <span className="font-bold text-micron-eggplant block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                       HISTORIC CONTEXT.
                   </span>
                   A modest home situated atop North America’s oldest continuously operating geothermal district (est. 1890). This site taps into the nation's largest historic direct-use aquifer—the same clean, ancient energy source that powers the only state capital in the country. 
                   <span className="text-micron-eggplant font-semibold"> A profound convergence of deep geologic history with energy from the stars.</span>
                </p>
             </div>
        </div>
      </motion.div>

      {/* Reduced Main Layout Gap: gap-5 (was gap-6) */}
      <div className="flex flex-col gap-5">
        
        {/* 1. Stats Grid - Changed to 5 columns with Gallery Link */}
        {/* Reduced grid gap: gap-4 (was gap-6) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
             {/* Reduced height from min-h-[160px] to min-h-[120px] */}
             <BentoCard gradient="bg-micron-eggplant" className="min-h-[120px] flex flex-col items-center justify-center text-center" delay={0.1}>
                 <h3 className="text-4xl md:text-5xl font-black text-white mb-2">1906</h3>
                 {/* Text color changed to zinc-500 (faded) */}
                 <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Year Built</p>
             </BentoCard>
             <BentoCard gradient="bg-micron-grey1" className="min-h-[120px] flex flex-col items-center justify-center text-center" delay={0.2}>
                 <h3 className="text-4xl md:text-5xl font-black text-white mb-2">3,374</h3>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Square Feet</p>
             </BentoCard>
             {/* Changed from bg-micron-grey2 to bg-micron-green */}
             <BentoCard gradient="bg-micron-green" className="min-h-[120px] flex flex-col items-center justify-center text-center" delay={0.3}>
                 <h3 className="text-4xl md:text-5xl font-black text-white mb-2">3 / 4</h3>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Bed / Bath</p>
             </BentoCard>
             {/* Geothermal Rights Delay changed to 1.2s */}
             <BentoCard gradient="bg-micron-eggplant-light" className="min-h-[120px] flex flex-col items-center justify-center text-center" delay={1.2}>
                 <h3 className="text-4xl md:text-5xl font-black text-white mb-2">1892</h3>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Geothermal Rights</p>
             </BentoCard>

             {/* 5th Card: View Gallery Link - Removed Icon, Removed Underline, Changed Text Color */}
             <BentoCard 
                gradient="bg-zinc-900" 
                className="min-h-[120px] flex flex-col items-center justify-center text-center group cursor-pointer" 
                delay={0.5}
                onClick={openGallery}
             >
                 {/* Changed text color to micron-eggplant-light */}
                 <h3 className="text-lg font-bold text-micron-eggplant-light uppercase tracking-widest transition-all pb-1">View Gallery</h3>
             </BentoCard>
        </div>

        {/* 2. Location Details */}
        {/* Reduced margin-top: mt-6 (was mt-8) */}
        <div className="mt-6">
             {/* Reduced margin-bottom: mb-3 (was mb-6) */}
             <div className="flex items-center gap-2 mb-3">
                <MapPin className="text-micron-eggplant" size={20} />
                <h3 className="font-bold uppercase tracking-widest text-sm text-micron-eggplant">Location Details</h3>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-4">
                 <BentoCard gradient="bg-micron-green" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={false} delay={0.1}>
                    <div className="flex justify-between items-start">
                        <MapPin size={16} className="text-white"/>
                        <span className="text-2xl font-bold text-white">15<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Micron HQ</span>
                 </BentoCard>

                 <BentoCard gradient="bg-micron-eggplant" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={false} delay={0.15}>
                    <div className="flex justify-between items-start">
                        <Plane size={16} className="text-white"/>
                        <span className="text-2xl font-bold text-white">10<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Airport</span>
                 </BentoCard>

                 <BentoCard gradient="bg-micron-eggplant-light" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={false} delay={0.2}>
                    <div className="flex justify-between items-start">
                        <Building2 size={16} className="text-white"/>
                        <span className="text-2xl font-bold text-white">3<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Downtown</span>
                 </BentoCard>

                 <BentoCard gradient="bg-zinc-800" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={false} delay={0.25}>
                    <div className="flex justify-between items-start">
                        <Stethoscope size={16} className="text-white"/>
                        <span className="text-2xl font-bold text-white">2<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">St. Luke's</span>
                 </BentoCard>

                 <BentoCard gradient="bg-micron-grey2" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={false} delay={0.3}>
                    <div className="flex justify-between items-start">
                        <Building2 size={16} className="text-white"/>
                        <span className="text-2xl font-bold text-white">5<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Capitol</span>
                 </BentoCard>

                 <BentoCard gradient="bg-micron-black" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={false} delay={0.35}>
                    <div className="flex justify-between items-start">
                        <GraduationCap size={16} className="text-white"/>
                        <span className="text-2xl font-bold text-white">4<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Boise State</span>
                 </BentoCard>

                 {/* Greenbelt */}
                 <BentoCard gradient="bg-micron-green" className="min-h-[100px] flex flex-col justify-between p-4 relative overflow-hidden" hoverEffect={false} delay={0.4}>
                     <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 blur-xl -mr-4 -mt-4 rounded-full pointer-events-none"></div>
                     <div className="flex justify-between items-start relative z-10">
                         <Trees size={16} className="text-white"/>
                         <span className="text-2xl font-bold text-white">1<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                     </div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-white/90 relative z-10">River</span>
                 </BentoCard>
             </div>
        </div>

        {/* 3. Residence Specifications */}
        {/* Reduced margin-top: mt-8 (was mt-12) */}
        <div className="mt-8">
             {/* Reduced margin-bottom: mb-3 (was mb-6) */}
             <div className="flex items-center gap-2 mb-3">
                <Home className="text-micron-eggplant" size={20} />
                <h3 className="font-bold uppercase tracking-widest text-sm text-micron-eggplant">Residence Specifications</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Spec 1 - Changed gradient to bg-zinc-100 for 3D look */}
                 <BentoCard gradient="bg-zinc-100" textColor="text-zinc-900" borderColor="border-zinc-200" className="min-h-[200px] shadow-sm" delay={0.1}>
                     <div className="flex justify-between items-start mb-4">
                        <Utensils className="text-micron-black" size={24} />
                     </div>
                     <h4 className="text-lg font-bold uppercase tracking-tight mb-3 text-micron-eggplant">Main Level</h4>
                     <ul className="space-y-3 text-sm text-zinc-600 font-body">
                        {/* Added Foyer */}
                        <li className="flex gap-2 items-start"><span className="text-micron-green mt-1 text-[10px]">●</span> <span>Foyer Entry</span></li>
                        <li className="flex gap-2 items-start"><span className="text-micron-green mt-1 text-[10px]">●</span> <span>Living, Dining, & Fully Equipped Kitchen</span></li>
                        {/* Removed 'Main Floor' from text */}
                        <li className="flex gap-2 items-start"><span className="text-micron-green mt-1 text-[10px]">●</span> <span>Office w/ Ensuite Bath</span></li>
                        <li className="flex gap-2 items-start"><span className="text-micron-green mt-1 text-[10px]">●</span> <span>French Door Access to Deck</span></li>
                        {/* Lowercased 'Throughout' */}
                        <li className="flex gap-2 items-start"><span className="text-micron-green mt-1 text-[10px]">●</span> <span>Antiques & Art throughout</span></li>
                     </ul>
                 </BentoCard>

                 {/* Spec 2 - Changed gradient to bg-zinc-100 for 3D look */}
                 <BentoCard gradient="bg-zinc-100" textColor="text-zinc-900" borderColor="border-zinc-200" className="min-h-[200px] shadow-sm" delay={0.2}>
                     <div className="flex justify-between items-start mb-4">
                        <BedDouble className="text-micron-black" size={24} />
                     </div>
                     <h4 className="text-lg font-bold uppercase tracking-tight mb-3 text-micron-eggplant">Upper Level</h4>
                     <ul className="space-y-3 text-sm text-zinc-600 font-body">
                        <li className="flex gap-2 items-start"><span className="text-micron-green mt-1 text-[10px]">●</span> <span>3 Bedrooms</span></li>
                        <li className="flex gap-2 items-start"><span className="text-micron-green mt-1 text-[10px]">●</span> <span>2 Private En-Suite Baths</span></li>
                        <li className="flex gap-2 items-start"><span className="text-micron-green mt-1 text-[10px]">●</span> <span>1 Bedroom Served by Hall Bath</span></li>
                        {/* Added Laundry */}
                        <li className="flex gap-2 items-start"><span className="text-micron-green mt-1 text-[10px]">●</span> <span>Laundry Facilities</span></li>
                     </ul>
                 </BentoCard>

                 {/* Spec 3 - Changed gradient to bg-zinc-100 for 3D look */}
                 <BentoCard gradient="bg-zinc-100" textColor="text-zinc-900" borderColor="border-zinc-200" className="min-h-[200px] shadow-sm" delay={0.3}>
                     <div className="flex justify-between items-start mb-4">
                        <Sprout className="text-micron-black" size={24} />
                     </div>
                     <h4 className="text-lg font-bold uppercase tracking-tight mb-3 text-micron-eggplant">Grounds</h4>
                     <ul className="space-y-3 text-sm text-zinc-600 font-body">
                        <li className="flex gap-2 items-start"><span className="text-micron-green mt-1 text-[10px]">●</span> <span>Mature Fruit Trees (Peach, Plum, Cherry)</span></li>
                        <li className="flex gap-2 items-start"><span className="text-micron-green mt-1 text-[10px]">●</span> <span>Concord Grapevine</span></li>
                        <li className="flex gap-2 items-start"><span className="text-micron-green mt-1 text-[10px]">●</span> <span>Fully Fenced Yard & ~300 sq ft Deck</span></li>
                        <li className="flex gap-2 items-start"><span className="text-micron-green mt-1 text-[10px]">●</span> <span>Attached Carport via Private Alley</span></li>
                     </ul>
                 </BentoCard>
             </div>
        </div>

        {/* 4. Amenities & Systems */}
        {/* Reduced margin-top: mt-8 (was mt-12) */}
        <div className="mt-8">
             {/* Reduced margin-bottom: mb-3 (was mb-6) */}
             <div className="flex items-center gap-2 mb-3">
                <Zap className="text-micron-eggplant" size={20} />
                <h3 className="font-bold uppercase tracking-widest text-sm text-micron-eggplant">Technology, Wellness & History</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* GEOTHERMAL: Changed to GREEN (bg-micron-green) + White Text */}
                <BentoCard gradient="bg-micron-green" textColor="text-white" borderColor="border-white/10" className="min-h-[220px]" delay={0.1}>
                    <div className="flex justify-between items-start mb-4">
                        <Leaf className="text-white" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">Nature</span>
                    </div>
                    <h4 className="text-xl font-bold uppercase tracking-tight mb-2">Geothermal & Wellness</h4>
                    {/* Updated text: text-base + font-medium + pure white (CHANGED TO white/70) */}
                    <p className="text-base text-white/70 font-medium leading-relaxed font-body">
                        Geothermal spa utilizing the district's 177°F source. The home is heated through geothermal radiant heat as well as the hot tub. The grounds feature mature producing fruit trees and a Concord grapevine.
                    </p>
                </BentoCard>

                {/* AUTONOMOUS SERVICE: Changed to DARK GRAY (bg-micron-grey1) */}
                <BentoCard gradient="bg-micron-grey1" textColor="text-white" borderColor="border-white/10" className="min-h-[220px]" delay={0.2}>
                    <div className="flex justify-between items-start mb-4">
                        {/* Switched to Car (Side Profile) and darker gold (amber-600) */}
                        {/* UPDATED: Face opposite direction (scale-x-[-1]) and more yellow gold */}
                        <Car className="text-white scale-x-[-1]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">Intelligence</span>
                    </div>
                    <h4 className="text-xl font-bold uppercase tracking-tight mb-2">Autonomous Service</h4>
                    {/* Updated text: Removed 'living lab' */}
                    <p className="text-base text-white/70 font-medium leading-relaxed font-body">
                        Autonomous service via Cybercab and Optimus. A functional proving ground where abstract technology becomes a seamless, daily reality.
                    </p>
                </BentoCard>

                {/* NATIONAL REGISTER: Kept EGGPLANT */}
                <BentoCard 
                    gradient="bg-micron-eggplant" 
                    textColor="text-white" 
                    borderColor="border-white/10" 
                    className="min-h-[220px]"
                    delay={0.3}
                >
                    <div className="flex justify-between items-start mb-4">
                        {/* Switched to Map icon as requested */}
                        <Map className="text-white" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">Heritage</span>
                    </div>
                    <h4 className="text-xl font-bold uppercase tracking-tight mb-2">National Register of Historic Places</h4>
                    {/* Updated text: text-base + font-medium + pure white (CHANGED TO white/70) */}
                    <p className="text-base text-white/70 font-medium leading-relaxed font-body">
                        Anchored by the C.W. Moore House (1891) and the neighboring George Whitfield Russell House. A corridor defined by the legacy of Western pioneers and energy ingenuity.
                    </p>
                </BentoCard>
             </div>
        </div>

      </div>
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};