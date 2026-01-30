import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const [stage, setStage] = useState(0);

  // Split the text into individual words for the "fade in each word" effect
  const fullText = "Without memory, there's no meaning. Without vision, there's no velocity. Without place, there's no perspective.";
  const words = fullText.split(' ');

  useEffect(() => {
    // Calculate timing based on word count
    // 17 words * 0.4s stagger = ~6.8 seconds for full text to start appearing
    const totalTextTime = words.length * 400 + 1000; 

    const sequence = async () => {
      await new Promise(r => setTimeout(r, 500));
      setStage(1); // Words start fading in
      
      await new Promise(r => setTimeout(r, totalTextTime)); 
      setStage(2); // Map Box appears (Moved up in order)
      
      await new Promise(r => setTimeout(r, 1500));
      setStage(3); // Paradigm text appears (Moved down)
    };
    sequence();
  }, [words.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Slower stagger (0.4s per word)
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(10px)' },
    visible: { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        transition: { 
            duration: 1.5, // Twice as slow fade (was ~0.8)
            ease: "easeOut" 
        }
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-white px-4 md:px-8 pb-8 pt-28 flex flex-col items-center justify-center box-border overflow-hidden">
      
      {/* Background Container */}
      <div className="relative w-full flex-1 overflow-hidden rounded-[2.5rem] bg-zinc-900 shadow-2xl ring-1 ring-zinc-900/5 min-h-[800px] flex flex-col">
        
        {/* Cinematic Background - Cosmic */}
        <div className="absolute inset-0 z-0">
           <div className="relative h-full w-full animate-slow-zoom">
              <img 
               src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
               alt="Cosmic View"
               className="h-full w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/70" />
           </div>
        </div>

        {/* Content Flex Container */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center flex-1 py-16">
            
            {/* 1. Word-by-Word Text Animation */}
            {/* "reduce thickness by 50%" -> font-semibold (600) instead of extrabold (800/900) */}
            <motion.div 
                initial="hidden"
                animate={stage >= 1 ? "visible" : "hidden"}
                variants={containerVariants}
                className="mb-20 text-center max-w-6xl px-6 flex flex-wrap justify-center gap-x-3 gap-y-2"
            >
               {words.map((word, i) => (
                 <motion.span 
                    key={i} 
                    variants={wordVariants} 
                    className="inline-block text-xl md:text-3xl font-sans font-semibold tracking-tighter text-white drop-shadow-lg"
                 >
                    {word}
                 </motion.span>
               ))}
            </motion.div>

            {/* 2. The Glass Map Box (Moved Up - Under Bento/Text) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl glass-panel p-4 mx-auto mb-16"
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

            {/* 3. Paradigm Text (Moved Down) */}
            {/* Reduced font size by ~20%: 4xl/6xl -> 3xl/5xl */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={stage >= 3 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.5 }}
              className="text-center mb-12"
            >
               <h2 className="text-3xl md:text-5xl font-bold font-micron tracking-tight leading-none text-zinc-100 drop-shadow-2xl">
                 a new paradigm. one address.
               </h2>
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