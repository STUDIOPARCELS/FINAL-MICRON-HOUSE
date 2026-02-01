import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BentoCard } from './BentoCard';

interface SectionIntroProps {
  onAnimationComplete?: () => void;
}

export const SectionIntro: React.FC<SectionIntroProps> = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // --- TIMING CONFIGURATION ---
  const INITIAL_DELAY = 1.0;     // 1s Delay after Micron House populates
  const WORD_DELAY = 0.4;        // Slow, readable speed per word
  const SENTENCE_PAUSE = 0.8;    // Pause between sentences
  const FADE_DURATION = 0.8;     // Smooth fade in for words

  const sentences = [
    { 
      text: "Without memory, there's no meaning.",
      boldWord: "memory,",
      colorWord: "meaning.",
      align: "md:justify-start" 
    },
    { 
      text: "Without vision, there's no velocity.",
      boldWord: "vision,",
      colorWord: "velocity.",
      align: "md:justify-center" 
    },
    { 
      text: "Without place, there's no perspective.",
      boldWord: "place,",
      colorWord: "perspective.",
      align: "md:justify-end" 
    }
  ];

  // --- CALCULATE TOTAL DURATION ---
  // We calculate the exact timestamp when the last word finishes to trigger the next section.
  let currentDelayCounter = INITIAL_DELAY;
  
  // Helper to store word delays
  const wordDelays: number[][] = sentences.map(s => {
      const words = s.text.split(" ");
      const delaysForSentence = words.map((_, i) => currentDelayCounter + (i * WORD_DELAY));
      // Advance counter for next sentence: (words * duration) + pause
      currentDelayCounter += (words.length * WORD_DELAY) + SENTENCE_PAUSE;
      return delaysForSentence;
  });

  // The moment the last word of the last sentence starts appearing
  const lastSentenceIndex = sentences.length - 1;
  const lastWordIndex = sentences[lastSentenceIndex].text.split(" ").length - 1;
  const lastWordStartTime = wordDelays[lastSentenceIndex][lastWordIndex];
  
  // Paradigm Section starts AFTER the last word has fully faded in (plus a small buffer)
  const PARADIGM_START_TIME = lastWordStartTime + FADE_DURATION + 0.2; 
  
  const paradigmText = "A PARADIGM UNFOLDS.";
  const addressLine1 = "Micron House";
  const addressLine2 = "1020 East Warm Springs Ave";
  const addressLine3 = "Boise, Idaho 83712";

  // Calculate Paradigm Word Delays
  const paradigmWords = paradigmText.split(" ");
  const paradigmWordDelays = paradigmWords.map((_, i) => PARADIGM_START_TIME + (i * 0.15)); // Faster, punchy reveal for header
  
  // Address Starts after Paradigm Header
  const ADDRESS_START_TIME = PARADIGM_START_TIME + (paradigmWords.length * 0.15) + 0.5;
  const MAP_START_TIME = ADDRESS_START_TIME + 1.0;

  return (
    // Reduced bottom padding: pb-6 md:pb-12, px-4 mobile
    <section ref={containerRef} className="container mx-auto px-4 md:px-12 pt-0 pb-6 md:pb-12 bg-zinc-50 text-zinc-900">
      <div className="flex flex-col gap-4"> 
        
        {/* 1. Top Bento: Green, Animated Text */}
        <BentoCard 
            className="min-h-[220px] md:min-h-[300px] justify-center shadow-2xl relative overflow-hidden group"
            gradient="bg-micron-green"
            textColor="text-white"
            borderColor="border-white/20"
            hoverEffect={true}
            // Increased delay to 1.3s to ensure Hero Black Box finishes first
            delay={1.3} 
        >
            <div className="flex flex-col gap-4 md:gap-8 w-full mx-auto py-4 md:py-6 px-2 md:px-4 relative z-10">
                {sentences.map((sentence, sIndex) => (
                    <div 
                        key={sIndex} 
                        className={`flex flex-wrap ${sentence.align} gap-x-2 md:gap-x-5 text-2xl md:text-5xl lg:text-6xl leading-tight tracking-tight w-full`}
                    >
                        {sentence.text.split(" ").map((word, wIndex) => {
                            const isBold = word === sentence.boldWord;
                            const isColor = word === sentence.colorWord;
                            const delay = wordDelays[sIndex][wIndex];
                            
                            return (
                                <motion.span
                                    key={`${sIndex}-${wIndex}`}
                                    initial={{ opacity: 0, x: -5 }} 
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
                                    transition={{ 
                                        duration: FADE_DURATION,
                                        delay: delay,
                                        ease: "easeOut"
                                    }}
                                    className={`${
                                        isBold 
                                            ? "font-black italic opacity-100 text-white" 
                                            : isColor
                                                ? "font-medium italic opacity-100 text-micron-eggplant"
                                                : "font-light italic opacity-70 text-white"
                                    }`}
                                >
                                    {word}
                                </motion.span>
                            );
                        })}
                    </div>
                ))}
            </div>
        </BentoCard>

        {/* 2. Bottom Grid: Paradigm Text -> Address -> Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-0">
            
            {/* Left: Text and Address */}
            <div className="flex flex-col justify-center py-2 pl-2">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.9] mb-8 flex flex-wrap gap-x-4">
                    {paradigmWords.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 15 }} 
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                            transition={{ 
                                duration: 1.2, 
                                ease: [0.16, 1, 0.3, 1], 
                                delay: paradigmWordDelays[i] 
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h2>
                
                {/* ADDRESS BLOCK */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: ADDRESS_START_TIME, duration: 0.8 }}
                    className="flex gap-5 border-l-4 border-micron-green pl-6"
                >
                    <div className="flex flex-col justify-center">
                        <h3 className="text-micron-green font-bold text-lg md:text-xl tracking-[0.2em] uppercase mb-1 flex flex-wrap gap-x-2">
                             {addressLine1.split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.5, delay: ADDRESS_START_TIME + 0.1 + (i * 0.05) }}
                                >
                                    {word}
                                </motion.span>
                             ))}
                        </h3>
                        <p className="text-zinc-900 font-bold text-base md:text-lg tracking-widest uppercase leading-snug flex flex-wrap gap-x-2">
                             {addressLine2.split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.5, delay: ADDRESS_START_TIME + 0.2 + (i * 0.05) }}
                                >
                                    {word}
                                </motion.span>
                             ))}
                        </p>
                        <p className="text-zinc-400 text-sm md:text-base tracking-widest uppercase flex flex-wrap gap-x-2">
                             {addressLine3.split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.5, delay: ADDRESS_START_TIME + 0.3 + (i * 0.05) }}
                                >
                                    {word}
                                </motion.span>
                             ))}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Right: Map Bento Box */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                    duration: 1.0, 
                    delay: MAP_START_TIME
                }}
                className="h-full min-h-[300px]"
            >
                <BentoCard 
                    className="p-0 overflow-hidden relative group shadow-xl h-full"
                    gradient="bg-white"
                    borderColor="border-zinc-200"
                    hoverEffect={true}
                    delay={0}
                >
                     <div className="absolute inset-0 w-full h-full bg-zinc-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(100%) contrast(100%)' }}
                            allowFullScreen={false}
                            loading="lazy"
                            title="Map"
                            className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                        />
                     </div>
                </BentoCard>
            </motion.div>

        </div>
      </div>
    </section>
  );
};