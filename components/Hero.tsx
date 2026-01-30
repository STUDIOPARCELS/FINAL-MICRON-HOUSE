import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const [stage, setStage] = useState(0);

  // 1. Philosophical Text Configuration
  const sentence1 = "Without memory, there's no meaning.".split(" ");
  const sentence2 = "Without vision, there's no velocity.".split(" ");
  const sentence3 = "Without place, there's no perspective.".split(" ");

  // 2. Paradigm Text Configuration
  const paradigmPart1 = "A new paradigm.".split(" ");
  const paradigmPart2 = "One address.".split(" ");

  // Timing Constants
  const WORD_DELAY = 0.35; 
  const SENTENCE_PAUSE = WORD_DELAY * 3; 
  
  useEffect(() => {
    // Calculate timing
    const s1Duration = sentence1.length * WORD_DELAY;
    const s2Duration = sentence2.length * WORD_DELAY;
    const s3Duration = sentence3.length * WORD_DELAY;
    
    // Total time for the intro text to play out
    const totalIntroTime = (s1Duration + SENTENCE_PAUSE + s2Duration + SENTENCE_PAUSE + s3Duration) * 1000 + 1500;

    const sequence = async () => {
      await new Promise(r => setTimeout(r, 800));
      setStage(1); // Start Intro Text (Centered)
      
      await new Promise(r => setTimeout(r, totalIntroTime)); 
      setStage(2); // FADE OUT Intro Text
      
      await new Promise(r => setTimeout(r, 1000)); // Void
      setStage(3); // Title Reveal (Left Aligned)
    };
    sequence();
  }, []);

  const getWordDelay = (sentenceIndex: number, wordIndex: number) => {
    let delay = 0;
    if (sentenceIndex > 0) delay += (sentence1.length * WORD_DELAY) + SENTENCE_PAUSE;
    if (sentenceIndex > 1) delay += (sentence2.length * WORD_DELAY) + SENTENCE_PAUSE;
    delay += wordIndex * WORD_DELAY;
    return delay;
  };

  return (
    <section className="relative h-[95vh] w-full bg-white px-2 md:px-6 pt-24 pb-6 flex flex-col items-center justify-center box-border overflow-hidden">
      
      {/* Main Container - The "Viewport" */}
      <div className="relative w-full h-full overflow-hidden rounded-[2rem] bg-zinc-950 shadow-2xl flex flex-col relative group">
        
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 select-none">
           <div className="relative h-full w-full animate-slow-zoom">
              <img 
               src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
               alt="Cosmic View"
               className="h-full w-full object-cover opacity-50"
              />
              {/* Vignette Overlay: Heavier on the left to make text readable */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
           </div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full h-full flex flex-col">
            
            {/* SCENE 1: The Philosophy (CENTERED) */}
            {/* Fades OUT after playing to clear stage for Scene 2 */}
            <AnimatePresence>
            {stage < 2 && (
                <motion.div 
                    exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 flex items-center justify-center px-8 md:px-20"
                >
                    <div className="text-center max-w-6xl flex flex-wrap justify-center gap-x-2 gap-y-3">
                    {sentence1.map((word, i) => (
                        <motion.span 
                            key={`s1-${i}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, delay: getWordDelay(0, i), ease: "linear" }}
                            // Changed Font to font-body (Inter) and Medium weight for better legibility
                            className="inline-block text-2xl md:text-4xl lg:text-5xl font-body font-normal tracking-wide text-white/90"
                        >
                            {word}
                        </motion.span>
                    ))}
                    
                    {sentence2.map((word, i) => (
                        <motion.span 
                            key={`s2-${i}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, delay: getWordDelay(1, i), ease: "linear" }}
                            className="inline-block text-2xl md:text-4xl lg:text-5xl font-body font-normal tracking-wide text-white/90"
                        >
                            {word}
                        </motion.span>
                    ))}

                    {sentence3.map((word, i) => (
                        <motion.span 
                            key={`s3-${i}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, delay: getWordDelay(2, i), ease: "linear" }}
                            className="inline-block text-2xl md:text-4xl lg:text-5xl font-body font-normal tracking-wide text-white/90"
                        >
                            {word}
                        </motion.span>
                    ))}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* SCENE 2: The Reveal (LEFT ALIGNED) */}
            {/* This container aligns items to the start (left) and centers them vertically */}
            {stage >= 3 && (
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 lg:px-28 pb-20">
                    <div className="flex flex-col items-start gap-4 max-w-4xl">
                        
                        {/* Title - Significantly Reduced Size */}
                        <h1 className="flex flex-wrap items-start justify-start gap-x-4 md:gap-x-5 leading-none">
                            {paradigmPart1.map((word, i) => (
                                <motion.span
                                    key={`p1-${i}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                                    // Reduced from 9xl to 7xl/5xl
                                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>
                        
                        {/* Subtitle - Left Aligned */}
                        <div className="flex flex-wrap items-start justify-start gap-x-3 mt-2 pl-1">
                            {paradigmPart2.map((word, i) => (
                                <motion.span
                                    key={`p2-${i}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 1.5 + (i * 0.3), ease: "linear" }}
                                    className="text-lg md:text-2xl font-light tracking-[0.2em] text-micron-eggplant-light uppercase"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </div>

                    </div>
                </div>
            )}

            {/* Floating Map HUD (Left Aligned) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={stage >= 3 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
              className="absolute bottom-10 left-8 md:left-20 lg:left-28 z-20"
            >
                <div className="group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 flex items-center gap-4 hover:bg-black/60 transition-all duration-500 hover:border-white/30 cursor-pointer overflow-hidden">
                    
                    {/* Icon Circle - Using New Blue Color via eggplant-light class */}
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-micron-eggplant-light flex items-center justify-center text-white shadow-lg shadow-micron-eggplant-light/50 group-hover:scale-110 transition-transform">
                        <MapPin size={20} className="text-black/80" /> 
                    </div>

                    {/* Text Info */}
                    <div className="flex flex-col pr-4 md:pr-8">
                        <span className="text-xs md:text-sm font-bold text-white tracking-wide uppercase">1020 E Warm Springs Ave</span>
                        <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">Boise, ID 83712</span>
                    </div>

                    {/* Hidden Map Preview (Expands on Hover) */}
                    <div className="w-0 overflow-hidden group-hover:w-32 md:group-hover:w-48 transition-all duration-500 ease-in-out h-12 rounded-r-full relative opacity-50 group-hover:opacity-100">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%) brightness(85%)' }}
                            allowFullScreen={false}
                            loading="lazy"
                            title="Map"
                            className="absolute inset-0 w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/50 pointer-events-none" />
                    </div>
                    
                    {/* Action Arrow */}
                    <div className="pr-4 text-white/30 group-hover:text-white transition-colors">
                        <ArrowRight size={16} />
                    </div>

                </div>
            </motion.div>

        </div>
        
      </div>
    </section>
  );
};