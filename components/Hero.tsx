import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  // Title Animation
  const titleChars = "MICRON HOUSE".split("");

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const titleLetterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const }
    }
  };

  return (
    <section className="relative h-[95vh] w-full bg-white flex flex-col items-center justify-center box-border overflow-hidden pt-32 pb-4 md:pt-24 md:pb-6">
      
      <div className="container mx-auto px-4 md:px-12 h-full">
        <div className="relative w-full h-full overflow-hidden rounded-3xl md:rounded-[2rem] bg-zinc-950 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center relative group">
          
          {/* Cinematic Background */}
          <div className="absolute inset-0 z-0 select-none">
             <div className="relative h-full w-full animate-slow-zoom">
                <img 
                 src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                 alt="Cosmic View"
                 className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
             </div>
          </div>

          {/* Content Layer - Only Title */}
          <div className="relative z-10 w-full flex flex-col items-center justify-center px-6">
              <motion.h1 
                initial="hidden"
                animate="visible"
                variants={titleContainerVariants}
                className="flex flex-wrap items-center justify-center gap-x-1 md:gap-x-4 leading-[0.9] text-center"
              >
                  {titleChars.map((char, i) => (
                      <motion.span
                          key={`t-${i}`}
                          variants={titleLetterVariants}
                          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase drop-shadow-2xl"
                      >
                          {char === " " ? "\u00A0" : char}
                      </motion.span>
                  ))}
              </motion.h1>
          </div>
          
        </div>
      </div>
    </section>
  );
};