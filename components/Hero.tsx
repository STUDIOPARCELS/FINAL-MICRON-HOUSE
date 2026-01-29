import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 500));
      setStage(1); // Timeline text
      await new Promise(r => setTimeout(r, 1500));
      setStage(2); // Paradigm text
      await new Promise(r => setTimeout(r, 800));
      setStage(3); // Map box
    };
    sequence();
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-white px-4 md:px-8 pb-8 pt-28 flex flex-col items-center justify-center box-border overflow-hidden">
      
      {/* Background Container - Dark Cosmic to frame the content */}
      <div className="relative w-full flex-1 overflow-hidden rounded-[2.5rem] bg-zinc-900 shadow-2xl ring-1 ring-zinc-900/5 min-h-[750px] flex flex-col">
        
        {/* Cinematic Background - Cosmic */}
        <div className="absolute inset-0 z-0">
           <div className="relative h-full w-full animate-slow-zoom">
              <img 
               src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
               alt="Cosmic View"
               className="h-full w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />
           </div>
        </div>

        {/* Content Flex Container */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center flex-1 py-12">
            
            {/* 1. The Timeline Text - LARGE AND BOLD */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={stage >= 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
                className="mb-12 text-center"
            >
               <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16">
                   <span className="text-2xl md:text-4xl font-micron font-bold lowercase text-white tracking-tight drop-shadow-lg">micron's history.</span>
                   <span className="text-2xl md:text-4xl font-micron font-bold lowercase text-white tracking-tight drop-shadow-lg">tesla's future.</span>
                   <span className="text-2xl md:text-4xl font-micron font-bold lowercase text-white tracking-tight drop-shadow-lg">boise's moment.</span>
               </div>
            </motion.div>

            {/* 2. New Paradigm Text - REVERTED TO ORIGINAL PHRASING & CENTERED */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={stage >= 2 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
               <h2 className="text-4xl md:text-6xl font-bold font-micron tracking-tight leading-none text-zinc-100 drop-shadow-2xl">
                 a new paradigm. one address.
               </h2>
            </motion.div>

            {/* 3. The Glass Map Box */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={stage >= 3 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl glass-panel p-4 mx-auto"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-white justify-center">
                   <MapPin size={20} className="text-micron-eggplant" />
                   <div className="text-left">
                     <p className="font-sans text-base font-medium tracking-wide text-white">
                       1020 E Warm Springs Ave
                     </p>
                     <p className="font-sans text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">
                       Boise, ID 83712
                     </p>
                   </div>
                </div>

                {/* Map Tile */}
                <div className="h-32 w-full rounded-xl overflow-hidden border border-white/10 relative group hover:border-white/30 transition-colors duration-500">
                  <div className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white backdrop-blur-sm">Location</div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%) brightness(85%)' }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Map"
                    className="h-full w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={stage >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
            <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};