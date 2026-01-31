import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { BentoCard } from './BentoCard';

export const SectionIntro: React.FC = () => {
  
  const sentences = [
    { 
      text: "Without memory, there's no meaning.",
      highlight: "meaning.",
      align: "justify-start" // Left
    },
    { 
      text: "Without vision, there's no velocity.",
      highlight: "velocity.",
      align: "justify-center" // Center
    },
    { 
      text: "Without place, there's no perspective.",
      highlight: "perspective.",
      align: "justify-end" // Right
    }
  ];

  // Animation constants
  const WORD_DELAY = 0.5; // Deliberate pace for each word
  const SENTENCE_DELAY = 1.5; // Double pause between sentences

  return (
    <section className="relative w-full bg-white text-zinc-900 py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 flex flex-col gap-8">
        
        {/* 1. Top Bento: Green, Animated Text */}
        <BentoCard 
            className="min-h-[360px] justify-center shadow-2xl"
            gradient="bg-micron-green"
            textColor="text-white"
            borderColor="border-white/20"
            hoverEffect={false}
        >
            <div className="flex flex-col gap-8 w-full mx-auto py-8 px-4">
                {sentences.map((sentence, sIndex) => {
                    // Calculate start time for this sentence based on previous words
                    let prevWords = 0;
                    for (let i = 0; i < sIndex; i++) {
                        prevWords += sentences[i].text.split(" ").length;
                    }
                    // Delay = (Total previous words * WORD_DELAY) + (Previous pauses * SENTENCE_DELAY)
                    const startDelay = (prevWords * WORD_DELAY) + (sIndex * SENTENCE_DELAY);

                    return (
                        <div 
                            key={sIndex} 
                            className={`flex flex-wrap ${sentence.align} gap-x-3 md:gap-x-5 text-2xl md:text-5xl lg:text-6xl leading-tight tracking-tight w-full`}
                        >
                            {sentence.text.split(" ").map((word, wIndex) => {
                                const isHighlight = word.toLowerCase() === sentence.highlight;
                                const delay = startDelay + (wIndex * WORD_DELAY);
                                
                                return (
                                    <motion.span
                                        key={`${sIndex}-${wIndex}`}
                                        initial={{ opacity: 0, filter: 'blur(12px)', y: 10 }}
                                        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ 
                                            duration: 0.8, 
                                            delay: delay,
                                            ease: "easeOut" 
                                        }}
                                        className={`${
                                            isHighlight 
                                                ? "font-black italic opacity-100 text-micron-eggplant" 
                                                : "font-light italic opacity-70"
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

        {/* 2. Bottom Grid: Paradigm Text + Map Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left: New Paradigm Text */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col justify-center py-4"
            >
                {/* Removed "NEW" */}
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.9] mb-8">
                    A PARADIGM UNFOLDS.
                </h2>
                
                <div className="flex flex-col gap-4 pl-2 border-l-4 border-micron-green">
                    <span className="text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] text-micron-green pl-4">
                        ONE ADDRESS.
                    </span>
                    <div className="pl-4">
                        <h3 className="text-xl font-bold text-zinc-900 uppercase leading-none tracking-tight mb-1">
                            1020 East Warm Springs Ave
                        </h3>
                        <div className="flex items-center gap-2">
                             <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Boise, Idaho 83712</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Right: Map Bento Box */}
            <BentoCard 
                className="min-h-[300px] p-0 overflow-hidden relative group shadow-xl"
                gradient="bg-white"
                borderColor="border-zinc-200"
                hoverEffect={true}
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
                    
                    {/* Marker - Static Pin, no pulse */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                       <div className="relative -mt-6">
                           <MapPin size={40} className="text-micron-green fill-micron-green/20 drop-shadow-lg" />
                       </div>
                    </div>
                 </div>
                 
                 {/* Floating Label */}
                 <div className="absolute bottom-6 left-6 pointer-events-none z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg border border-zinc-200 shadow-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">Get Directions</span>
                        <ArrowUpRight size={14} className="text-micron-green" />
                    </div>
                 </div>
            </BentoCard>

        </div>
      </div>
    </section>
  );
};