import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BentoCard } from './BentoCard';

interface SectionIntroProps {
  onAnimationComplete?: () => void;
}

export const SectionIntro: React.FC<SectionIntroProps> = ({ onAnimationComplete }) => {
  
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

  // ANIMATION TIMING CONFIGURATION
  // Goal: Smooth, luxurious flow, but precise timing gaps.
  
  const GREEN_BOX_DELAY = 0.2; 
  
  // Text Animation - Smooth and Readable
  const WORD_DELAY = 0.12; 
  const SENTENCE_DELAY = 0.5; 
  const TEXT_FADE_DURATION = 1.0; // Slower fade for individual words (smoothness)

  const TEXT_START_OFFSET = GREEN_BOX_DELAY + 0.3; 

  // --- CALCULATION FOR 'PERSPECTIVE' COMPLETION ---
  // Sentence 1 (5 words)
  // Sentence 2 (5 words)
  // Sentence 3 (5 words)
  const prevWordsCount = 10; // Words in first two sentences
  const sentenceGaps = 2; // Gaps between 3 sentences
  
  // Start time of the last sentence ("Without place...")
  const LAST_SENTENCE_START = TEXT_START_OFFSET + (prevWordsCount * WORD_DELAY) + (sentenceGaps * SENTENCE_DELAY);
  
  // "Perspective" is the 5th word (index 4) of the last sentence.
  const PERSPECTIVE_START_TIME = LAST_SENTENCE_START + (4 * WORD_DELAY);
  
  // Time when "Perspective" is fully visible (opacity 1)
  const PERSPECTIVE_COMPLETE_TIME = PERSPECTIVE_START_TIME + TEXT_FADE_DURATION;
  
  // --- PARADIGM UNFOLDS TIMING ---
  // Constraint: "Fade in literally one second after perspective fades in"
  const paradigmStartTime = PERSPECTIVE_COMPLETE_TIME + 1.0; 
  
  // --- ADDRESS & MAP TIMING ---
  // Start Address shortly after Paradigm starts appearing (overlapping slightly for flow)
  const addressStartTime = paradigmStartTime + 0.8; 
  const mapStartTime = addressStartTime + 0.6;
  
  // Total duration for callback
  const TOTAL_DURATION = mapStartTime + 1.0; 

  useEffect(() => {
    if (onAnimationComplete) {
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, TOTAL_DURATION * 1000);
      return () => clearTimeout(timer);
    }
  }, [onAnimationComplete, TOTAL_DURATION]);

  const paradigmText = "A PARADIGM UNFOLDS.";

  // Address Lines
  const addressLine1 = "Micron House";
  const addressLine2 = "1020 East Warm Springs Ave";
  const addressLine3 = "Boise, Idaho 83712";

  return (
    <section className="container mx-auto px-6 pt-0 pb-12 md:pb-24 bg-zinc-50 text-zinc-900">
      <div className="flex flex-col gap-4"> 
        
        {/* 1. Top Bento: Green, Animated Text */}
        <BentoCard 
            className="min-h-[260px] md:min-h-[360px] justify-center shadow-2xl relative overflow-hidden group"
            gradient="bg-micron-green"
            textColor="text-white"
            borderColor="border-white/20"
            hoverEffect={true}
            delay={GREEN_BOX_DELAY}
        >
            <div className="flex flex-col gap-4 md:gap-8 w-full mx-auto py-4 md:py-8 px-2 md:px-4 relative z-10">
                {sentences.map((sentence, sIndex) => {
                    let prevWords = 0;
                    for (let i = 0; i < sIndex; i++) {
                        prevWords += sentences[i].text.split(" ").length;
                    }
                    // Calculate start delay for this sentence
                    const startDelay = TEXT_START_OFFSET + (prevWords * WORD_DELAY) + (sIndex * SENTENCE_DELAY);

                    return (
                        <div 
                            key={sIndex} 
                            className={`flex flex-wrap ${sentence.align} gap-x-2 md:gap-x-5 text-2xl md:text-5xl lg:text-6xl leading-tight tracking-tight w-full`}
                        >
                            {sentence.text.split(" ").map((word, wIndex) => {
                                const isBold = word === sentence.boldWord;
                                const isColor = word === sentence.colorWord;
                                const delay = startDelay + (wIndex * WORD_DELAY);
                                
                                return (
                                    <motion.span
                                        key={`${sIndex}-${wIndex}`}
                                        initial={{ opacity: 0, x: -5 }} 
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ 
                                            duration: TEXT_FADE_DURATION,
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
                    );
                })}
            </div>
        </BentoCard>

        {/* 2. Bottom Grid: Paradigm Text -> Address -> Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-0">
            
            {/* Left: Text and Address */}
            <div className="flex flex-col justify-center py-2 pl-2">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.9] mb-8 flex flex-wrap gap-x-4">
                    {paradigmText.split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 15 }} // Increased Y slightly for drama
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ 
                                duration: 1.5, // SLOWED DOWN from 0.3 to 1.5 for smoothness
                                ease: [0.16, 1, 0.3, 1], // Smooth bezier
                                delay: paradigmStartTime + (i * 0.08) 
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h2>
                
                {/* ADDRESS BLOCK - Animated Word by Word */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: addressStartTime, duration: 0.8 }}
                    className="flex gap-5 border-l-4 border-micron-green pl-6"
                >
                    <div className="flex flex-col justify-center">
                        <h3 className="text-micron-green font-bold text-lg md:text-xl tracking-[0.2em] uppercase mb-1 flex flex-wrap gap-x-2">
                             {addressLine1.split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: addressStartTime + 0.1 + (i * 0.05) }}
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
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: addressStartTime + 0.2 + (i * 0.05) }}
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
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: addressStartTime + 0.3 + (i * 0.05) }}
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                    duration: 1.0, 
                    delay: mapStartTime
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
                     
                     <div className="absolute bottom-6 left-6 pointer-events-none z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg border border-zinc-200 shadow-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">Get Directions</span>
                            <ArrowUpRight size={14} className="text-micron-green" />
                        </div>
                     </div>
                </BentoCard>
            </motion.div>

        </div>
      </div>
    </section>
  );
};