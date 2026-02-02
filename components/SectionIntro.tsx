
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BentoCard } from './BentoCard';

interface SectionIntroProps {
  onAnimationComplete?: () => void;
}

export const SectionIntro: React.FC<SectionIntroProps> = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const addressLine1 = "Micron House";
  const addressLine2 = "1020 East Warm Springs Ave";
  const addressLine3 = "Boise, Idaho 83712";

  // CONSTANTS FOR COLORS
  const COLOR_WHITE = '#ffffff';
  const COLOR_EGGPLANT = '#2c0f38';
  const COLOR_FADED = 'rgba(255, 255, 255, 0.7)';

  // Full text paragraph configuration
  const fullText = "Without memory, there's no meaning. Without vision, there's no velocity. Without place, there's no perspective.";
  const boldKeywords = ["memory,", "vision,", "place,"];
  const colorKeywords = ["meaning.", "velocity.", "perspective."];

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
            // Removed delay to make it instant ("baked in")
            delay={0} 
        >
            <div className="w-full mx-auto py-6 px-4 md:px-8 relative z-10 text-center">
                <p className="text-2xl md:text-5xl lg:text-6xl leading-tight tracking-tight cursor-default">
                    {fullText.split(" ").map((word, i) => {
                        const isBold = boldKeywords.includes(word);
                        const isColor = colorKeywords.includes(word);
                        
                        // Determine the base colors explicitly
                        const baseColor = isBold ? COLOR_WHITE : (isColor ? COLOR_EGGPLANT : COLOR_FADED);

                        return (
                            <React.Fragment key={i}>
                                <motion.span
                                    // "BAKED IN" ANIMATION: 
                                    // Removed initial/animate opacity/y transitions. 
                                    // Text appears instantly in its final position.
                                    style={{ color: baseColor }}
                                    
                                    // HOVER LOGIC RETAINED:
                                    whileHover={
                                        isBold 
                                            ? { color: COLOR_EGGPLANT, scale: 1.05, y: -2 }
                                            : isColor 
                                                ? { color: COLOR_WHITE, scale: 1.05, y: -2 }
                                                : undefined
                                    }
                                    transition={{ 
                                        default: { duration: 0.2, ease: "easeInOut" }
                                    }}
                                    className={`inline-block ${
                                        isBold 
                                            ? "font-black italic" 
                                            : isColor
                                                ? "font-normal italic" 
                                                : "font-light italic"
                                    }`}
                                >
                                    {word}
                                </motion.span>
                                {" "}
                            </React.Fragment>
                        );
                    })}
                </p>
            </div>
        </BentoCard>

        {/* 2. Bottom Grid: Paradigm Text -> Address -> Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-0">
            
            {/* Left: Text and Address */}
            <div className="flex flex-col justify-center py-2 pl-2">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.9] mb-8 cursor-default flex flex-col items-start">
                    {/* Static Text - No Entrance Animation */}
                    <div className="flex flex-wrap gap-x-4 md:gap-x-6">
                        <span>THE</span>
                        <span>PARADIGM</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 md:gap-x-6">
                        <span>SHIFTS.</span>
                    </div>
                </h2>
                
                {/* ADDRESS BLOCK */}
                <div className="flex gap-5 border-l-4 border-micron-green pl-6">
                    <div className="flex flex-col justify-center">
                        <h3 className="text-micron-green font-bold text-lg md:text-xl tracking-[0.2em] uppercase mb-1">
                             {addressLine1}
                        </h3>
                        <p className="text-zinc-900 font-bold text-base md:text-lg tracking-widest uppercase leading-snug">
                             {addressLine2}
                        </p>
                        <p className="text-zinc-400 text-sm md:text-base tracking-widest uppercase">
                             {addressLine3}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right: Map Bento Box */}
            <div className="h-full min-h-[300px]">
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
            </div>

        </div>
      </div>
    </section>
  );
};
