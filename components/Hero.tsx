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
    <section className="relative w-full bg-white flex flex-col items-center justify-center box-border overflow-hidden pt-28 pb-4 md:pt-20 md:pb-6">
      
      <div className="container mx-auto px-4 md:px-12">
        {/* Enforce Landscape Aspect Ratio (aspect-video) */}
        <div className="relative w-full aspect-video max-h-[85vh] overflow-hidden rounded-3xl md:rounded-[2rem] bg-zinc-950 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center relative group">
          
          {/* Cinematic Video Background - Cosmic Zoo */}
          <div className="absolute inset-0 z-0 select-none overflow-hidden">
             {/* Overlay Gradient */}
             <div className="absolute inset-0 bg-black/40 z-10 mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10" />
             
             <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80"
             >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
                {/* Fallback image if video fails */}
                <img 
                 src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                 alt="Cosmic View"
                 className="h-full w-full object-cover"
                />
             </video>
          </div>

          {/* Content Layer - Only Title */}
          <div className="relative z-20 w-full flex flex-col items-center justify-center px-6">
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
                          className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase drop-shadow-2xl mix-blend-overlay"
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