import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const titleChars = "MICRON HOUSE".split("");

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const titleLetterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } // Ultra smooth ease
    }
  };

  return (
    // Removed h-screen centering to reduce vertical whitespace gaps.
    // pt-28 ensures it sits nicely below the fixed header (approx 90px).
    // pb-6 minimizes the gap to the next section (Green Bento).
    <section className="relative w-full bg-white flex flex-col items-center justify-center pt-28 pb-6 md:pt-32 md:pb-8 box-border overflow-hidden">
      
      {/* Changed px-6 md:px-12 to just px-6 to match SectionIntro's width exactly as requested */}
      <div className="container mx-auto px-6 h-full flex items-center justify-center">
        {/* Standard Black Bento Box (No Video) */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-3xl bg-micron-black shadow-2xl flex flex-col items-center justify-center group ring-1 ring-zinc-900/5"
        >
          {/* Subtle top light source for 3D bevel effect to match other Bento cards */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-100" />
          
          {/* Center Title */}
          <div className="relative z-20 flex flex-col items-center text-center px-4">
             <motion.div
               variants={titleContainerVariants}
               initial="hidden"
               animate="visible"
               className="flex flex-wrap justify-center gap-x-[0.05em] overflow-hidden"
             >
               {titleChars.map((char, i) => (
                 <motion.span
                   key={i}
                   variants={titleLetterVariants}
                   className="text-[12vw] md:text-[8vw] leading-none font-black text-white tracking-tighter"
                   style={{ 
                     display: 'inline-block',
                     transformOrigin: 'bottom center'
                   }}
                 >
                   {char === " " ? "\u00A0" : char}
                 </motion.span>
               ))}
             </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};