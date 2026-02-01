import React from 'react';
import { motion } from 'framer-motion';
import { BentoCard } from './BentoCard';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    // Restored padding-bottom: pb-8 to create gap between this and the green box below
    <section className="relative w-full bg-white flex flex-col items-center justify-center pt-24 pb-8 md:pt-28 md:pb-8 box-border overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-12 h-full flex items-center justify-center">
        {/* "Cosmic Zoo" Video Hero Card */}
        <BentoCard 
          gradient="bg-black"
          textColor="text-white"
          borderColor="border-zinc-900/5" 
          className="w-full aspect-[16/9] md:aspect-[2.4/1] flex items-center justify-center !p-0 relative overflow-hidden group"
          delay={0}
          hoverEffect={false}
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
             {/* Note: Using a placeholder space/abstract video. In production, serve this from a reliable CDN. */}
             <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover opacity-60 scale-105"
                poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
             >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
             </video>
             
             {/* Cosmic Overlays for "Micron" Branding */}
             <div className="absolute inset-0 bg-gradient-to-r from-micron-eggplant/80 via-transparent to-micron-eggplant/80 mix-blend-overlay"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
          </div>

          {/* Center Title */}
          <div className="relative z-20 flex flex-col items-center text-center px-4 w-full justify-center">
             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
             >
               <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter mb-4 mix-blend-screen leading-none">
                 MICRON HOUSE
               </h1>
             </motion.div>
             
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6, duration: 1.0 }}
               className="flex items-center gap-4"
             >
                <div className="h-px w-12 bg-white/50 hidden md:block"></div>
                <p className="text-zinc-300 text-xs md:text-sm font-bold uppercase tracking-[0.4em]">
                  Boise's Innovation Residence
                </p>
                <div className="h-px w-12 bg-white/50 hidden md:block"></div>
             </motion.div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
};