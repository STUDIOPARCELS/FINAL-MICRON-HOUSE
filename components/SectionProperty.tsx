
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BentoCard } from './BentoCard';
import { MapPin, Plane, Building2, Trees, GraduationCap, Stethoscope, Utensils, Sprout, BedDouble, Images, ArrowUpRight, FileText, Home, Zap, Leaf, Map, Car, Thermometer, Waves, Activity, Bot, History, Droplets, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { ModalContent } from '../types';

// Helper component for inner bento cards (reused here to keep component self-contained)
// REMOVED: Black outlines (border-black/40 -> border-black/10)
const InnerBento = ({ title, children, gradient, icon, className = "", delay = 0 }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className={`
            ${gradient} rounded-2xl p-6 md:p-8 text-white relative overflow-hidden group 
            shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] 
            border-t border-l border-white/20 border-b border-black/10 border-r border-black/5
            ${className}
        `}
    >
        {/* Decorative background element - Only if icon exists */}
        {icon && (
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {icon}
            </div>
        )}
        
        {/* Top Highlight for 3D Bevel */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

        <div className="relative z-10 h-full flex flex-col">
            {(title || icon) && (
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-3 drop-shadow-md">
                    {icon && React.cloneElement(icon, { size: 24, strokeWidth: 1.5 })}
                    {title}
                </h3>
            )}
            <div className="text-white/90 text-sm md:text-base leading-relaxed font-body font-medium space-y-4 flex-1 drop-shadow-sm">
                {children}
            </div>
        </div>
    </motion.div>
);

// PDF Whitepaper Viewer — opens as a lightbox overlay on top of existing modals
const WhitepaperViewer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); return () => setMounted(false); }, []);
    useEffect(() => {
        if (isOpen) {
            const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
            document.addEventListener('keydown', handleEsc);
            return () => document.removeEventListener('keydown', handleEsc);
        }
    }, [isOpen, onClose]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[200] bg-zinc-950/80 backdrop-blur-md"
            />
            <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 30, stiffness: 350 }}
                    className="pointer-events-auto relative w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-2xl border border-zinc-200 ring-1 ring-zinc-200"
                >
                    {/* Header */}
                    <div className="px-6 md:px-8 py-5 flex justify-between items-center border-b border-zinc-200 bg-zinc-50 flex-shrink-0">
                        <div>
                            <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight text-zinc-900">Lost Vibrations</h2>
                            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 mt-0.5">White Paper — Lisa Wood Studio 2026</p>
                        </div>
                        <button onClick={onClose} className="rounded-full bg-zinc-100 p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 transition-colors border border-zinc-200">
                            <X size={20} />
                        </button>
                    </div>
                    {/* PDF iframe */}
                    <div className="flex-1 min-h-0 bg-white">
                        <iframe
                            src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/LOST-VIBRATIONS-WHITEPAPER%20(1).pdf"
                            className="w-full h-full border-0"
                            title="Lost Vibrations White Paper"
                        />
                    </div>
                </motion.div>
            </div>
        </>,
        document.body
    );
};

export const SectionProperty: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);
  const [showWhitepaper, setShowWhitepaper] = useState(false);

  const openGallery = () => {
    setModalData({
        title: "PROPERTY LIBRARY",
        category: 'gallery',
        content: null,
    });
  };

  const getModalContent = (type: string) => {
    const base = { category: 'showcase' as const, theme: 'light' as const };
    
    switch (type) {
        case 'wellness':
            return {
                ...base,
                title: "WELLNESS & NATURE",
                subtitle: "RESTORATIVE INFRASTRUCTURE",
                content: (
                    <div className="flex flex-col gap-6 h-full">
                        {/* Summary Paragraph Added */}
                        <p className="text-base text-zinc-600 font-light leading-relaxed border-l-4 border-micron-green pl-6 py-1">
                            Powered by a 177°F direct-use aquifer. Geothermal water flows through the home’s radiators and feeds the outdoor soaking tub. The grounds feature mature fruit trees and a Concord grapevine.
                        </p>

                        {/* REVERTED: Grid Layout to 3 columns for portrait cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                            
                            {/* Card 1: CONTRAST THERAPY - Text Only, Paragraphs */}
                            <InnerBento 
                                title="CONTRAST THERAPY" 
                                gradient="bg-micron-eggplant-light" 
                                icon={<Waves />}
                                delay={0.1}
                                className="flex flex-col h-full"
                            >
                                <div className="flex flex-col h-full gap-4">
                                    <p>
                                        Alternating thermal exposure drives circulation to flush systemic inflammation and accelerate deep tissue recovery.
                                    </p>
                                    <p>
                                        The rapid temperature shift triggers a proven 250% increase in dopamine, delivering sustained alertness, mental clarity, and elevated mood.
                                    </p>
                                </div>
                            </InnerBento>
                            
                            {/* Card 2: WHOLE BODY VIBRATION - Text Only, Paragraphs */}
                            <InnerBento 
                                title="WHOLE BODY VIBRATION" 
                                gradient="bg-micron-grey1" 
                                icon={<Activity />}
                                delay={0.2}
                                className="flex flex-col h-full"
                            >
                                <div className="flex flex-col h-full gap-4">
                                    <p>
                                        Invented in 1960 by Vladimir Nazarov for the Soviet Space Program to combat zero-gravity bone loss.
                                    </p>
                                    <p>
                                        By engaging 90% of muscle fibers (vs. 40% in standard training), it rapidly builds bone density, counteracts neuropathy, and stimulates neuro-repair for improved mental health.
                                    </p>
                                    <button 
                                        onClick={() => setShowWhitepaper(true)}
                                        className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60 hover:text-white/95 transition-all duration-300 group/link bg-transparent border-0 cursor-pointer"
                                    >
                                        <FileText size={12} strokeWidth={2} className="opacity-70 group-hover/link:opacity-100 transition-opacity" />
                                        Read the White Paper
                                        <ArrowUpRight size={10} strokeWidth={2.5} className="opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
                                    </button>
                                </div>
                            </InnerBento>

                            {/* Card 3: ORGANIC GARDEN - Text Only, Paragraphs */}
                            <InnerBento 
                                title="ORGANIC GARDEN" 
                                gradient="bg-micron-green" 
                                icon={<Sprout />}
                                delay={0.3}
                                className="flex flex-col h-full"
                            >
                                <div className="flex flex-col h-full gap-4">
                                    <p>
                                        2025 research on the "Soil-Plant-Gut Axis" confirms fresh-harvested produce delivers essential soil-based probiotics missing from sterilized commercial food.
                                    </p>
                                    <p>
                                        Homegrown crops retain up to 50% more nutrient density than store-bought options, directly fueling the gut microbiome and immune system.
                                    </p>
                                </div>
                            </InnerBento>
                        </div>
                    </div>
                )
            };
        case 'autonomous':
            return {
                ...base,
                title: "AUTONOMOUS SERVICE",
                subtitle: "LIVING LAB",
                content: (
                    <div className="flex flex-col gap-6 h-full">
                        {/* Summary Paragraph Added */}
                        <p className="text-base text-zinc-600 font-light leading-relaxed border-l-4 border-micron-grey1 pl-6 py-1">
                            Autonomous service via Cybercab and Optimus. A functional proving ground where abstract technology becomes a seamless, daily reality.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                            <InnerBento 
                                title="CYBERCAB" 
                                gradient="bg-micron-black" 
                                // FLIPPED: scale-x-[-1] to face left
                                icon={<Car className="scale-x-[-1]" />}
                                delay={0.1}
                                className="flex flex-col h-full"
                            >
                                <div className="flex flex-col h-full justify-between gap-6">
                                    <p>Tesla's first fully autonomous vehicle — a two-passenger cabin with butterfly doors, inductive charging, and a 20.5-inch display. Cybercab manages all airport transfers, downtown shuttles, and guest logistics autonomously.</p>
                                    <div className="aspect-square w-full rounded-xl overflow-hidden relative shadow-lg border border-white/10 mt-auto">
                                        {/* Placeholder for Cybercab */}
                                        <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" alt="Cybercab" />
                                    </div>
                                </div>
                            </InnerBento>
                            
                            <InnerBento 
                                title="OPTIMUS" 
                                gradient="bg-micron-eggplant-light" 
                                icon={<Bot />}
                                delay={0.2}
                                className="flex flex-col h-full"
                            >
                                <div className="flex flex-col h-full justify-between gap-6">
                                    <p>Tesla's Gen 3 humanoid — 5'8", 125 lbs, with 22 degrees of freedom in each hand and vision-based autonomy. Optimus manages property maintenance, perimeter monitoring, and routine service tasks within defined geofenced zones across the residence.</p>
                                    <div className="aspect-square w-full rounded-xl overflow-hidden relative shadow-lg border border-white/10 mt-auto">
                                        {/* Placeholder for Optimus */}
                                        <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" alt="Optimus" />
                                    </div>
                                </div>
                            </InnerBento>
                        </div>
                    </div>
                )
            };
        case 'historic':
            return {
                ...base,
                title: "HISTORIC LEGACY",
                subtitle: "1890 - PRESENT",
                content: (
                    <div className="flex flex-col gap-6 h-full">
                        {/* Summary Paragraph Added */}
                        <p className="text-base text-zinc-600 font-light leading-relaxed border-l-4 border-micron-eggplant pl-6 py-1">
                            Anchored by the C.W. Moore House (1891) and the neighboring George Whitfield Russell House. A corridor defined by the legacy of Western pioneers and energy ingenuity.
                        </p>

                        <div className="grid grid-cols-1 gap-6 flex-1">
                            <InnerBento 
                                title="C.W. MOORE & THE DISTRICT" 
                                gradient="bg-micron-eggplant" 
                                icon={<History />}
                                delay={0.1}
                                className="h-full"
                            >
                                {/* Changed to a more balanced grid layout to fill empty space */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                                    <div className="flex flex-col justify-center gap-6">
                                        <p>In 1890, Christopher W. Moore, founder of the First National Bank of Idaho, drilled two wells near the base of Table Rock. He struck 170-degree water. By 1892, he had piped it to his mansion on Warm Springs Avenue—marking the first use of geothermal water for home heating in the United States.</p>
                                        <p>Today, the Boise Warm Springs Water District remains the oldest continuously operating geothermal district in North America. The Micron House sits on this historic line, utilizing the same clean, ancient energy source that Moore tapped over 130 years ago. It is a National Register of Historic Places corridor defined by energy innovation.</p>
                                    </div>
                                    <div className="w-full h-full min-h-[300px] md:min-h-0 bg-white/10 rounded-xl overflow-hidden relative border border-white/20">
                                        <img src="https://images.unsplash.com/photo-1565692093863-79282363b829?q=80&w=2070&auto=format&fit=crop" alt="Historic Boise" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-micron-eggplant/80 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6">
                                            <span className="text-sm font-bold uppercase tracking-widest text-white block mb-1">Est. 1890</span>
                                            <span className="text-white/80 text-xs">Warm Springs Avenue</span>
                                        </div>
                                    </div>
                                </div>
                            </InnerBento>
                        </div>
                    </div>
                )
            };
        default: return null;
    }
  };

  return (
    // Reduced Section Padding: py-8 md:py-16, px-4 mobile
    <section id="property" className="container mx-auto px-4 md:px-12 py-8 md:py-16 bg-zinc-50 text-zinc-900">
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
                <div className="text-base font-light text-zinc-600 leading-snug font-body">
                   {/* CHANGED: text-micron-eggplant to text-micron-eggplant-light (blue), Removed dot */}
                   <span className="font-bold text-micron-eggplant-light block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                       HISTORIC CONTEXT
                   </span>
                   {/* Split text and new paragraph structure */}
                   <p className="mb-4">
                        A modest home drawing on North America’s oldest continuously operating geothermal district (est. 1890). This site taps into the nation's largest historic direct-use aquifer.
                   </p>
                   <p className="text-micron-eggplant font-semibold">
                        A profound convergence of harnessed earth energy and energy from the stars.
                   </p>
                </div>
             </div>
        </div>
      </motion.div>

      {/* Reduced Main Layout Gap: gap-5 (was gap-6) */}
      <div className="flex flex-col gap-5">
        
        {/* 1. Stats Grid - RESPONSIVE FIX */}
        {/* Reduced grid gap: gap-4 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
             {/* Reduced height from min-h-[160px] to min-h-[120px] */}
             <BentoCard gradient="bg-micron-eggplant" className="min-h-[120px] flex flex-col items-center justify-center text-center" delay={0.1}>
                 <h3 className="text-3xl md:text-5xl font-black text-white mb-2">1906</h3>
                 {/* Text color changed to zinc-500 (faded) */}
                 <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Year Built</p>
             </BentoCard>
             <BentoCard gradient="bg-micron-grey1" className="min-h-[120px] flex flex-col items-center justify-center text-center" delay={0.2}>
                 <h3 className="text-3xl md:text-5xl font-black text-white mb-2">3,374</h3>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Square Feet</p>
             </BentoCard>
             {/* Changed from bg-micron-grey2 to bg-micron-green */}
             <BentoCard gradient="bg-micron-green" className="min-h-[120px] flex flex-col items-center justify-center text-center" delay={0.3}>
                 <h3 className="text-3xl md:text-5xl font-black text-white mb-2">3 / 4</h3>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Bed / Bath</p>
             </BentoCard>
             {/* Geothermal Rights Delay changed to 1.2s */}
             <BentoCard gradient="bg-micron-eggplant-light" className="min-h-[120px] flex flex-col items-center justify-center text-center" delay={1.2}>
                 <h3 className="text-3xl md:text-5xl font-black text-white mb-2">1892</h3>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Geothermal Rights</p>
             </BentoCard>

             {/* 5th Card: View Gallery Link - Removed Icon, Removed Underline, Changed Text Color */}
             <BentoCard 
                gradient="bg-zinc-900" 
                className="min-h-[120px] flex flex-col items-center justify-center text-center group cursor-pointer col-span-2 md:col-span-1" 
                delay={0.5}
                onClick={openGallery}
             >
                 {/* Changed text color to micron-eggplant-light and increased weight/size */}
                 <h3 className="text-2xl md:text-4xl font-black text-micron-eggplant-light uppercase tracking-tighter leading-none">
                    VIEW GALLERY
                 </h3>
             </BentoCard>
        </div>

        {/* 2. Location Details - RESPONSIVE FIX */}
        {/* ADDED: hoverEffect={true} and hover interactions for these cards */}
        <div className="mt-6">
             <div className="flex items-center gap-2 mb-3">
                <MapPin className="text-micron-eggplant" size={20} />
                <h3 className="font-bold uppercase tracking-widest text-sm text-micron-eggplant">Location Details</h3>
             </div>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-4">
                 <BentoCard gradient="bg-micron-green" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={true} delay={0.1}>
                    <div className="flex justify-between items-start">
                        <MapPin size={16} className="text-white"/>
                        <span className="text-xl md:text-2xl font-bold text-white">15<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Micron HQ</span>
                 </BentoCard>

                 <BentoCard gradient="bg-micron-eggplant" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={true} delay={0.15}>
                    <div className="flex justify-between items-start">
                        <Plane size={16} className="text-white"/>
                        <span className="text-xl md:text-2xl font-bold text-white">10<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Airport</span>
                 </BentoCard>

                 <BentoCard gradient="bg-micron-eggplant-light" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={true} delay={0.2}>
                    <div className="flex justify-between items-start">
                        <Building2 size={16} className="text-white"/>
                        <span className="text-xl md:text-2xl font-bold text-white">3<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Downtown</span>
                 </BentoCard>

                 <BentoCard gradient="bg-zinc-800" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={true} delay={0.25}>
                    <div className="flex justify-between items-start">
                        <Stethoscope size={16} className="text-white"/>
                        <span className="text-xl md:text-2xl font-bold text-white">2<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">St. Luke's</span>
                 </BentoCard>

                 <BentoCard gradient="bg-micron-grey2" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={true} delay={0.3}>
                    <div className="flex justify-between items-start">
                        <Building2 size={16} className="text-white"/>
                        <span className="text-xl md:text-2xl font-bold text-white">5<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Capitol</span>
                 </BentoCard>

                 <BentoCard gradient="bg-micron-black" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={true} delay={0.35}>
                    <div className="flex justify-between items-start">
                        <GraduationCap size={16} className="text-white"/>
                        <span className="text-xl md:text-2xl font-bold text-white">4<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Boise State</span>
                 </BentoCard>

                 {/* Greenbelt */}
                 <BentoCard gradient="bg-micron-green" className="min-h-[100px] flex flex-col justify-between p-4 relative overflow-hidden" hoverEffect={true} delay={0.4}>
                     <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 blur-xl -mr-4 -mt-4 rounded-full pointer-events-none"></div>
                     <div className="flex justify-between items-start relative z-10">
                         <Trees size={16} className="text-white"/>
                         <span className="text-xl md:text-2xl font-bold text-white">1<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
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
                <h3 className="font-bold uppercase tracking-widest text-sm text-micron-eggplant">Technology, Wellness & Legacy</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* GEOTHERMAL: Changed to GREEN (bg-micron-green) + White Text */}
                <BentoCard 
                    gradient="bg-micron-green" 
                    textColor="text-white" 
                    borderColor="border-white/10" 
                    className="min-h-[220px] group cursor-pointer hover:shadow-2xl transition-all" 
                    delay={0.1}
                    onClick={() => setModalData(getModalContent('wellness'))}
                    hoverEffect={true}
                    arrowPosition="bottom-right"
                >
                    <div className="flex justify-between items-start mb-4">
                        <Leaf className="text-white" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">Nature</span>
                    </div>
                    {/* CHANGED: Title to "Wellness" */}
                    <h4 className="text-xl font-bold uppercase tracking-tight mb-2">Wellness</h4>
                    {/* Updated text: text-base + font-medium + pure white (CHANGED TO white/70) */}
                    <p className="text-base text-white/70 font-medium leading-relaxed font-body">
                        Powered by a 177°F direct-use aquifer. Geothermal water flows through the home’s radiators and feeds the outdoor soaking tub. The grounds feature mature fruit trees and a Concord grapevine.
                    </p>
                    {/* REMOVED: Redundant ArrowUpRight */}
                </BentoCard>

                {/* AUTONOMOUS SERVICE: Changed to DARK GRAY (bg-micron-grey1) */}
                <BentoCard 
                    gradient="bg-micron-grey1" 
                    textColor="text-white" 
                    borderColor="border-white/10" 
                    className="min-h-[220px] group cursor-pointer hover:shadow-2xl transition-all" 
                    delay={0.2}
                    onClick={() => setModalData(getModalContent('autonomous'))}
                    hoverEffect={true}
                    arrowPosition="bottom-right"
                >
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
                    {/* REMOVED: Redundant ArrowUpRight */}
                </BentoCard>

                {/* NATIONAL REGISTER: Kept EGGPLANT */}
                <BentoCard 
                    gradient="bg-micron-eggplant" 
                    textColor="text-white" 
                    borderColor="border-white/10" 
                    className="min-h-[220px] group cursor-pointer hover:shadow-2xl transition-all"
                    delay={0.3}
                    onClick={() => setModalData(getModalContent('historic'))}
                    hoverEffect={true}
                    arrowPosition="bottom-right"
                >
                    <div className="flex justify-between items-start mb-4">
                        {/* Switched to Map icon as requested */}
                        <Map className="text-white" />
                        {/* Changed Heritage to Legacy */}
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">Legacy</span>
                    </div>
                    <h4 className="text-xl font-bold uppercase tracking-tight mb-2">National Register of Historic Places</h4>
                    {/* Updated text: text-base + font-medium + pure white (CHANGED TO white/70) */}
                    <p className="text-base text-white/70 font-medium leading-relaxed font-body">
                        Anchored by the C.W. Moore House (1891) and the neighboring George Whitfield Russell House. A corridor defined by the legacy of Western pioneers and energy ingenuity.
                    </p>
                    {/* REMOVED: Redundant ArrowUpRight */}
                </BentoCard>
             </div>
        </div>

      </div>
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
      <WhitepaperViewer isOpen={showWhitepaper} onClose={() => setShowWhitepaper(false)} />
    </section>
  );
};
