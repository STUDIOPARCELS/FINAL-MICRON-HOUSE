import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { MapPin, Plane, Building2, Trees, GraduationCap, Stethoscope, Wifi, Waves, Wind, MonitorSmartphone, Utensils, Sprout, ShieldCheck, Armchair, Car, BedDouble, Images } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { ModalContent } from '../types';

export const SectionProperty: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const openGallery = () => {
    setModalData({
        title: "PROPERTY LIBRARY",
        category: 'gallery',
        content: null, // Content handled by gallery renderer
    });
  };

  return (
    <section id="property" className="container mx-auto px-6 py-24 md:px-12 bg-zinc-50 text-zinc-900">
       {/* Header - Animated Reveal */}
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="mb-16 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-10"
       >
        <div className="flex-shrink-0">
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">02 / ASSET</span>
           {/* Changed to Green */}
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-green leading-none">THE PROPERTY</h2>
        </div>
        
        {/* Styled Description */}
        <div className="md:ml-auto max-w-2xl pb-1">
             <div className="pl-6 border-l-4 border-micron-eggplant/20 hover:border-micron-eggplant transition-colors duration-500">
                <p className="text-lg font-light text-zinc-600 leading-snug font-body">
                   <span className="font-bold text-micron-eggplant block mb-2 text-xl md:text-2xl uppercase tracking-tighter font-sans">
                       Historic Context.
                   </span>
                   A Warm Springs address is one of Boise's most desirable—a mature tree-lined section of the historic district with many notable homes.
                </p>
             </div>
        </div>
      </motion.div>

      <div className="flex flex-col gap-6">
        
        {/* 1. Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             <BentoCard gradient="bg-micron-black" className="min-h-[160px] justify-center text-center">
                 <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">1906</h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Year Built</p>
             </BentoCard>
             <BentoCard gradient="bg-micron-grey1" className="min-h-[160px] justify-center text-center">
                 <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">3,374</h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Square Feet</p>
             </BentoCard>
             <BentoCard gradient="bg-micron-grey2" className="min-h-[160px] justify-center text-center">
                 <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">3 / 4</h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Bed / Bath</p>
             </BentoCard>
             <BentoCard gradient="bg-micron-eggplant-light" className="min-h-[160px] justify-center text-center">
                 <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">1892</h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-white/80">Geothermal Rights</p>
             </BentoCard>
        </div>

        {/* 2. Location Details - Mobile Horizontal Scroll, Desktop Grid */}
        <div className="mt-8">
             <div className="flex items-center gap-2 mb-6">
                <MapPin className="text-micron-eggplant" size={20} />
                <h3 className="font-bold uppercase tracking-widest text-sm text-micron-eggplant">Location Details</h3>
                <span className="text-xs text-zinc-400 md:hidden ml-auto uppercase tracking-wide">Swipe →</span>
             </div>
             
             {/* 
                MOBILE: flex overflow-x-auto (horizontal scroll), snap behavior
                DESKTOP: grid (normal grid layout)
             */}
             <div className="
                flex overflow-x-auto pb-6 -mx-6 px-6 gap-4 snap-x snap-mandatory 
                md:grid md:grid-cols-4 md:gap-4 md:pb-0 md:mx-0 md:px-0 md:overflow-visible
                scrollbar-hide
             ">
                 <LocationBigCard 
                    label="Micron HQ" 
                    time="15" 
                    icon={<MapPin size={18} className="text-white drop-shadow-sm"/>}
                    colorClass="bg-micron-green"
                 />
                 <LocationBigCard 
                    label="Airport" 
                    time="10" 
                    icon={<Plane size={18} className="text-white drop-shadow-sm"/>}
                    colorClass="bg-micron-eggplant"
                 />
                 <LocationBigCard 
                    label="Downtown" 
                    time="3" 
                    icon={<Building2 size={18} className="text-white drop-shadow-sm"/>}
                    colorClass="bg-micron-eggplant-light"
                 />
                 <LocationBigCard 
                    label="St. Luke's" 
                    time="2" 
                    icon={<Stethoscope size={18} className="text-white drop-shadow-sm"/>}
                    colorClass="bg-zinc-800"
                 />
                 <LocationBigCard 
                    label="Capitol" 
                    time="5" 
                    icon={<Building2 size={18} className="text-white drop-shadow-sm"/>}
                    colorClass="bg-micron-grey2"
                 />
                 <LocationBigCard 
                    label="Boise State" 
                    time="4" 
                    icon={<GraduationCap size={18} className="text-white drop-shadow-sm"/>}
                    colorClass="bg-micron-black"
                 />
                 {/* Greenbelt - Fixed color to palette green */}
                 <div className="
                    min-w-[220px] md:min-w-0 snap-center
                    col-span-1 sm:col-span-2 min-h-[140px] flex flex-col justify-between p-6 rounded-2xl bg-micron-green text-white shadow-lg transition-transform hover:-translate-y-1 relative overflow-hidden group border border-white/10
                 ">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl -mr-10 -mt-10 rounded-full pointer-events-none"></div>
                     <div className="flex justify-between items-start relative z-10">
                         <Trees size={18} className="text-white drop-shadow-sm"/>
                         <span className="text-3xl font-bold drop-shadow-sm">1 <span className="text-xs font-normal align-top opacity-80">MIN</span></span>
                     </div>
                     <span className="text-xs font-bold uppercase tracking-widest opacity-90 relative z-10">Boise River Greenbelt</span>
                 </div>
             </div>
        </div>

        {/* 3. Property Details - Updated for Dense Mobile Layout */}
        <div className="mt-12">
             <div className="flex items-center gap-2 mb-6">
                <Armchair className="text-micron-eggplant" size={20} />
