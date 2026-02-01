import React from 'react';
import { motion } from 'framer-motion';
import { BentoCard } from './BentoCard';

export const Hero: React.FC = () => {
  const titleChars = "MICRON HOUSE".split("");

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // Tighter stagger for faster completion
      transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    }
  };

  const titleLetterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      // Duration reduced to 1.2s for snappy but smooth feel
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  return (
    // Restored padding-bottom: pb-8 to create gap between this and the green box below
    <section className="relative w-full bg-white flex flex-col items-center justify-center pt-24 pb-8 md:pt-28 md:pb-8 box-border overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-12 h-full flex items-center justify-center">
        {/* Switched to BentoCard for consistent 'treatment' (corners, shadows, borders) */}
        {/* Adjusted aspect ratio to be shorter/wider to reduce vertical padding inside the black box */}
        <BentoCard 
          gradient="bg-micron-black"
          textColor="text-white"
          borderColor="border-zinc-900/5" // Subtle border
          className="w-full aspect-[2/1] md:aspect-[3/1] flex items-center justify-center !p-0" // Increased aspect ratio denominator to make it shorter
          delay={0}
          hoverEffect={true}
        >
          {/* Center Title */}
          <div className="relative z-20 flex flex-col items-center text-center px-4 w-full h-full justify-center">
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
                   className="text-[10vw] md:text-[7vw] leading-none font-black text-white tracking-tighter"
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
        </BentoCard>
      </div>
    </section>
  );
};