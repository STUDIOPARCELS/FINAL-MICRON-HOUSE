import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  // Config: Intro Words - Ghost Structure Design
  // Filler words are barely visible (structure), Keywords are bright white (meaning).
  const line1 = [
    { text: "WITHOUT", highlight: false },
    { text: "MEMORY,", highlight: true, color: "#ffffff" },
    { text: "THERE'S", highlight: false },
    { text: "NO", highlight: false },
    { text: "MEANING.", highlight: false },
  ];

  const line2 = [
    { text: "WITHOUT", highlight: false },
    { text: "VISION,", highlight: true, color: "#ffffff" },
    { text: "THERE'S", highlight: false },
    { text: "NO", highlight: false },
    { text: "VELOCITY.", highlight: false },
  ];

  const line3 = [
    { text: "WITHOUT", highlight: false },
    { text: "PLACE,", highlight: true, color: "#ffffff" },
    { text: "THERE'S", highlight: false },
    { text: "NO", highlight: false },
    { text: "PERSPECTIVE.", highlight: false },
  ];

  // Config: Title & Subtitle
  const titleChars = "A NEW PARADIGM.".split("");
  const subtitleWords = ["ONE", "ADDRESS."];

  // --- TIMING CONFIGURATION (Seconds) ---
  const START_DELAY = 1.0;
  const WORD_STAGGER = 0.5; // Slow pace between words
  const WORD_FADE_DURATION = 1.0; 

  // Calculate start times manually to ensure perfect sequencing
  const LINE_1_START = START_DELAY;
  const LINE_2_START = LINE_1_START + (line1.length * WORD_STAGGER) + 0.5;
  const LINE_3_START = LINE_2_START + (line2.length * WORD_STAGGER) + 0.5;

  // Title: Starts after Line 3 finishes
  const TITLE_START = LINE_3_START + (line3.length * WORD_STAGGER) + 0.8;

  // Subtitle: Starts after Title finishes drawing
  const SUBTITLE_START = TITLE_START + 1.5;

  // Map: Starts last
  const MAP_START = SUBTITLE_START + 2.0;


  // --- VARIANTS ---

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: WORD_FADE_DURATION, ease: "easeOut" }
    }
  };

  const titleContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: TITLE_START
      }
    }
  };

  const titleLetterVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative h-[95vh] w-full bg-white flex flex-col items-center justify-center box-border overflow-hidden pt-24 pb-6">
      
      <div className="container mx-auto px-6 md:px-12 h-full">
        <div className="relative w-full h-full overflow-hidden rounded-[2rem] bg-zinc-950 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] flex flex-col relative group">
          
          {/* Cinematic Background */}
          <div className="absolute inset-0 z-0 select-none">
             <div className="relative h-full w-full animate-slow-zoom">
                <img 
                 src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                 alt="Cosmic View"
                 className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
             </div>
          </div>

          {/* Content Layer */}
          <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 md:px-20 lg:px-24">
              
              <div className="flex flex-col items-start w-full max-w-6xl">
                  
                  {/* SCENE 1: Intro Text Sequence (Ghost Structure Design) */}
                  <div className="flex flex-col gap-8 mb-16 pl-1">
                      
                      {/* Line 1 */}
                      <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: WORD_STAGGER, delayChildren: LINE_1_START } } }}
                        className="flex flex-wrap items-baseline gap-x-4 text-2xl md:text-4xl leading-none"
                      >
                          {line1.map((word, i) => (
                             <motion.span 
                                key={i} 
                                variants={wordVariants} 
                                style={{ color: word.highlight ? word.color : undefined }} 
                                className={`
                                    tracking-[0.15em] 
                                    ${word.highlight 
                                        ? 'font-black drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]'  // Glowing White
                                        : 'font-black text-white/15'                              // Ghost White
                                    }
                                `}
                             >
                                {word.text}
                             </motion.span>
                          ))}
                      </motion.div>

                      {/* Line 2 */}
                      <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: WORD_STAGGER, delayChildren: LINE_2_START } } }}
                        className="flex flex-wrap items-baseline gap-x-4 text-2xl md:text-4xl leading-none"
                      >
                          {line2.map((word, i) => (
                             <motion.span 
                                key={i} 
                                variants={wordVariants} 
                                style={{ color: word.highlight ? word.color : undefined }} 
                                className={`
                                    tracking-[0.15em] 
                                    ${word.highlight 
                                        ? 'font-black drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]' 
                                        : 'font-black text-white/15'
                                    }
                                `}
                             >
                                {word.text}
                             </motion.span>
                          ))}
                      </motion.div>

                      {/* Line 3 */}
                      <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: WORD_STAGGER, delayChildren: LINE_3_START } } }}
                        className="flex flex-wrap items-baseline gap-x-4 text-2xl md:text-4xl leading-none"
                      >
                          {line3.map((word, i) => (
                             <motion.span 
                                key={i} 
                                variants={wordVariants} 
                                style={{ color: word.highlight ? word.color : undefined }} 
                                className={`
                                    tracking-[0.15em] 
                                    ${word.highlight 
                                        ? 'font-black drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]' 
                                        : 'font-black text-white/15'
                                    }
                                `}
                             >
                                {word.text}
                             </motion.span>
                          ))}
                      </motion.div>

                  </div>

                  {/* SCENE 2: Main Title & Subtitle */}
                  <div className="mb-12">
                      {/* Title: A NEW PARADIGM */}
                      <motion.h1 
                        initial="hidden"
                        animate="visible"
                        variants={titleContainerVariants}
                        className="flex flex-wrap items-start justify-start gap-x-1 leading-[0.9] mb-4"
                      >
                          {titleChars.map((char, i) => (
                              <motion.span
                                  key={`t-${i}`}
                                  variants={titleLetterVariants}
                                  className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase drop-shadow-2xl"
                              >
                                  {char === " " ? "\u00A0" : char}
                              </motion.span>
                          ))}
                      </motion.h1>
                      
                      {/* Subtitle: ONE ADDRESS */}
                      <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                             visible: { transition: { staggerChildren: 1.5, delayChildren: SUBTITLE_START } } 
                        }}
                        className="pl-2 flex gap-4"
                      >
                        {subtitleWords.map((word, i) => (
                            <motion.span 
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeOut" } }
                                }}
                                className="text-xl md:text-3xl font-bold tracking-[0.25em] text-micron-green uppercase drop-shadow-lg"
                            >
                                {word}
                            </motion.span>
                        ))}
                      </motion.div>
                  </div>

                  {/* SCENE 3: Map & Address Block */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 3.0, delay: MAP_START, ease: "easeOut" }}
                    className="mt-12 w-full max-w-2xl"
                  >
                     {/* Map Area - Wide Cinematic Format */}
                     <div className="relative w-full h-40 md:h-52 rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] group/map cursor-pointer bg-zinc-900">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                          width="100%"
                          height="100%"
                          style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%) brightness(85%)' }}
                          allowFullScreen={false}
                          loading="lazy"
                          title="Map"
                          className="absolute inset-0 w-full h-full scale-110 opacity-80 group-hover/map:opacity-100 transition-opacity duration-700"
                        />
                        {/* Marker Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                           <div className="relative">
                              <div className="absolute -inset-4 bg-micron-green/20 rounded-full animate-ping"></div>
                              <div className="h-3 w-3 bg-micron-green rounded-full shadow-[0_0_20px_rgba(0,143,37,1)] border border-white" />
                           </div>
                        </div>
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                     </div>

                     {/* Address Details - Prominent & Consistent */}
                     <div className="pl-1">
                        <div className="flex flex-col items-start gap-2">
                            <h2 className="text-3xl md:text-4xl font-black text-white uppercase leading-none tracking-tight drop-shadow-lg">
                                1020 East Warm Springs Ave
                            </h2>
                            <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity cursor-pointer group/link">
                                <div className="h-px w-8 bg-micron-green"></div>
                                <p className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-400 group-hover/link:text-white transition-colors">
                                    Boise Idaho 83712
                                </p>
                                <ArrowUpRight size={14} className="text-micron-green" />
                            </div>
                        </div>
                     </div>
                  </motion.div>

              </div>

          </div>
          
        </div>
      </div>
    </section>
  );
};