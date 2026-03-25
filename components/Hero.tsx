import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useAnimation, Variants } from 'framer-motion';

// Defined outside to prevent re-creation on render
const sentences = [
    {
        words: ["WITHOUT", "VISION", "THERE'S", "NO", "VELOCITY"],
        color: "text-[#878d9f]",
        highlightColor: "text-[#3d4250]",
        hoverColor: "hover:text-black", 
        highlights: ["VISION", "VELOCITY"],
        textSize: "text-2xl sm:text-3xl md:text-3xl lg:text-[clamp(1.6rem,2.4vw,2.5rem)]",
        layout: "default",
        lines: [["WITHOUT", "VISION"], ["THERE'S", "NO", "VELOCITY"]],
        secondHalfDelay: 7.8,
    },
    {
        words: ["WITHOUT", "MEMORY", "THERE'S", "NO", "MEANING"],
        color: "text-[#878d9f]",
        highlightColor: "text-micron-eggplant",
        hoverColor: "hover:text-micron-eggplant/60", 
        highlights: ["MEMORY", "MEANING"],
        textSize: "text-2xl sm:text-3xl md:text-3xl lg:text-[clamp(1.6rem,2.4vw,2.5rem)]",
        layout: "default",
        lines: [["WITHOUT", "MEMORY"], ["THERE'S", "NO", "MEANING"]],
        secondHalfDelay: 2.5,
    },
    {
        words: ["WITHOUT", "PLACE", "THERE'S", "NO", "PERSPECTIVE"], 
        color: "text-[#878d9f]",
        highlightColor: "text-micron-green",
        hoverColor: "hover:text-green-900", 
        highlights: ["PLACE", "PERSPECTIVE"],
        textSize: "text-2xl sm:text-3xl md:text-3xl lg:text-[clamp(1.6rem,2.4vw,2.5rem)]",
        layout: "default",
        lines: [["WITHOUT", "PLACE"], ["THERE'S", "NO", "PERSPECTIVE"]],
        secondHalfDelay: 6.7,
    },
];

const InteractiveParadigmTitle: React.FC = () => {
    const paradigmLine1 = ["CRITICAL"];
    const paradigmLine2 = ["WINDOW"];

    // Colors
    const cGreen = "#008f25";
    const cDarkGreen = "#14532d"; 
    const cEggplant = "#2c0f38"; 
    const cWhite = "#ffffff";

    // "CRITICAL" — Eggplant base, slowly cycles eggplant→dark green→green→eggplant
    const standardVariant: Variants = {
        hidden: { y: 20, opacity: 0, color: cEggplant },
        visible: (i: number) => ({
            y: 0, opacity: 1, color: cEggplant,
            transition: { 
                y: { duration: 1.6, ease: "easeOut", delay: 0.3 + (i * 0.15) },
                opacity: { duration: 1.6, ease: "easeOut", delay: 0.3 + (i * 0.15) },
            }
        }),
        hover: {
            color: [cEggplant, cDarkGreen, cGreen, cDarkGreen, cEggplant],
            transition: { duration: 8.0, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity }
        }
    };

    // "WINDOW" — Starts eggplant, settles on white. Hover: white→green→dark green→green→white
    const shiftsVariant: Variants = {
        hidden: { y: 20, opacity: 0, color: cEggplant },
        visible: (i: number) => ({
            y: 0, opacity: 1, 
            color: [cEggplant, cDarkGreen, cWhite],
            transition: { 
                y: { duration: 1.6, ease: "easeOut", delay: 0.3 + (i * 0.15) },
                opacity: { duration: 1.6, ease: "easeOut", delay: 0.3 + (i * 0.15) },
                color: { duration: 6.0, ease: "easeInOut", delay: 1.5, times: [0, 0.5, 1] }
            }
        }),
        hover: {
            color: [cWhite, cGreen, cDarkGreen, cGreen, cWhite],
            transition: { duration: 8.0, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity }
        }
    };

    return (
        <div className="flex flex-col items-start cursor-default">
            {/* Line 1: CRITICAL */}
            <div className="flex flex-wrap gap-x-2 md:gap-x-4 items-baseline">
                {paradigmLine1.map((word, i) => (
                    <motion.span
                        key={`l1-${i}`}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true }} 
                        variants={standardVariant}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block cursor-pointer"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
            {/* Line 2: WINDOW */}
            <div className="flex flex-wrap gap-x-2 md:gap-x-4">
                {paradigmLine2.map((word, i) => (
                    <motion.span
                        key={`l2-${i}`}
                        custom={i + paradigmLine1.length}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true }} 
                        variants={shiftsVariant}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block cursor-pointer"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

export const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // UPDATED: Lowered threshold to 0.1 to ensure it triggers more reliably on desktop
  const isInView = useInView(containerRef, { amount: 0.1 });

  // Start as null for blank state
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number | null>(null);
  const [key, setKey] = useState(0); 
  const [layoutShift, setLayoutShift] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  
  // New States for Quote Animation Control
  const [hasScrolled, setHasScrolled] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  // Brand reveal states
  const [wordmarkVisible, setWordmarkVisible] = useState(false);
  const [quoteSettled, setQuoteSettled] = useState(false);

  // Timer Ref to manage cleanup
  const sequenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animation Controls
  const iconControls = useAnimation();
  const wordmarkControls = useAnimation();

  // Scroll Listener
  useEffect(() => {
    const onScroll = () => {
        if (window.scrollY > 50) { // Slight threshold to avoid jitter
            setHasScrolled(true);
        }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track if video has actually started playing
  const videoStarted = useRef(false);

  // Unified Start Sequence Function
  // Resets everything, starts video immediately, waits for video to play before starting text
  const startSequence = () => {
    // 1. Clear any pending timers
    if (sequenceTimer.current) clearTimeout(sequenceTimer.current);

    // 2. Reset Text & Icon State
    setCurrentSentenceIndex(null);
    setLayoutShift(false);
    setLogoVisible(false);
    setWordmarkVisible(false);
    setVideoIsPlaying(false);
    iconControls.set({ x: 200, rotate: -360, opacity: 0 });
    wordmarkControls.set({ opacity: 0 });

    // 3. Start Video — programmatic play only (no autoPlay attribute), matching bento pattern
    // If play succeeds: onPlaying fires → poster fades → sentence timers start (all synced)
    // If play blocked: poster stays visible, nothing else happens until user taps
    videoStarted.current = false;
    firedCues.current.clear();
    if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {
            // Autoplay blocked — do nothing. User will tap, forcePlay triggers, onPlaying syncs everything.
            console.log("Autoplay blocked — waiting for user interaction");
        });
    }
  };

  // Start sentence timers - now just marks video as started (actual triggers are in handleVideoTimeUpdate)
  const startSentenceTimers = () => {
    if (videoStarted.current) return;
    videoStarted.current = true;
  };

  // Handle Video End — freeze on last frame
  const handleVideoEnd = () => {
      setVideoCompleted(true);
  };
  
  // VIDEO-TIME-DRIVEN CUE SYSTEM
  // All animations are anchored to video.currentTime instead of setTimeout.
  // Video is 34.8s at 1x, plays at 0.45x = ~77s real time.
  // currentTime advances at 0.45x of real time.
  //
  // Footage cue points (in video currentTime):
  //   ~5.0s:  Camera closes in on rocket → Sentence 0 (VISION/VELOCITY)
  //   ~8.5s:  Transition → Sentence 0 out
  //   ~10.5s: Fab first visible over foothills → Sentence 1 (MEMORY/MEANING)  
  //   ~15.5s: Transition → Sentence 1 out
  //   ~16.0s: Capitol building in frame → Sentence 2 (PLACE/PERSPECTIVE)
  //   ~23.0s: Sentence 2 out
  //   ~24.0s: Car drives off → Wordmark slides in
  //   ~27.0s: Hyper zoom → Logo slides in above wordmark
  //   ~30.6s: Blue bento appears
  
  const sentenceTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const firedCues = useRef<Set<string>>(new Set());
  
  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const t = e.currentTarget.currentTime;
      const fired = firedCues.current;
      
      // Sentence 0: Earth from space — starts immediately
      // WITHOUT VISION at t=0.5, THERE'S NO VELOCITY at hyper zoom away from Starbase (~t=7)
      if (t >= 0.5 && !fired.has('s0on')) {
          fired.add('s0on');
          setCurrentSentenceIndex(0);
      }
      
      // Sentence 1: replaces sentence 0 — over the foothills
      // WITHOUT MEMORY at t=9.5, THERE'S NO MEANING when Micron focuses (~t=13)
      if (t >= 9.5 && !fired.has('s1on')) {
          fired.add('s1on');
          setCurrentSentenceIndex(1);
      }
      
      // Sentence 2: replaces sentence 1 — hyper zoom to Capitol
      // WITHOUT PLACE at t=16, THERE'S NO PERSPECTIVE when house settles (~t=22)
      if (t >= 16.0 && !fired.has('s2on')) {
          fired.add('s2on');
          setCurrentSentenceIndex(2);
      }
      
      // Clear sentence before brand reveal
      if (t >= 28.0 && !fired.has('s2off')) {
          fired.add('s2off');
          setCurrentSentenceIndex(null);
      }
      
      // Brand reveal: Wordmark fades in — car parked in front of house
      if (t >= 30.0 && !fired.has('wordmark')) {
          fired.add('wordmark');
          setWordmarkVisible(true);
          wordmarkControls.start({
              opacity: 1,
              transition: { duration: 4.0, ease: [0.16, 1, 0.3, 1] }
          });
      }
      
      // Brand reveal: Logo rolls in as car drives off
      if (t >= 32.0 && !fired.has('logo')) {
          fired.add('logo');
          setLogoVisible(true);
          iconControls.start({
              x: 0, rotate: 0, opacity: 1,
              transition: { type: "spring", stiffness: 5, damping: 12, duration: 6.0, bounce: 0 }
          });
          setTimeout(() => setLayoutShift(true), 1000);
      }
      
      // Blue bento appears
      if (t >= 32.0 && !fired.has('bento')) {
          fired.add('bento');
      }
  };

  // Handle Scroll Visibility (Scroll back up triggers replay)
  // This also handles the initial mount because isInView becomes true on load
  useEffect(() => {
      if (isInView) {
          startSequence();
      } else {
          // Clean up if we scroll away
          if (sequenceTimer.current) clearTimeout(sequenceTimer.current);
          sentenceTimers.current.forEach(t => clearTimeout(t));
          firedCues.current.clear();
          setCurrentSentenceIndex(null);
          setLayoutShift(false);
          setLogoVisible(false);
          setWordmarkVisible(false);
          setVideoCompleted(false);
          setVideoIsPlaying(false);
          iconControls.set({ x: 200, rotate: -360, opacity: 0 });
          wordmarkControls.set({ opacity: 0 });
      }

      return () => {
          if (sequenceTimer.current) clearTimeout(sequenceTimer.current);
      };
  }, [isInView]);
  
  // Sentence cycling is now fully driven by setTimeout in startSequence
  // Clean up all timers on unmount or view change
  useEffect(() => {
    return () => {
        sentenceTimers.current.forEach(t => clearTimeout(t));
    };
  }, []);

  // Video Speed — 0.45x for slower cinematic feel
  // playbackRate is set in onPlaying callback to avoid blocking autoplay on mobile
  useEffect(() => {
    // Try to play immediately on mount — hero is always at top of page
    if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
    }
    
    // Force play on first user interaction — fallback for mobile browsers that block autoplay
    const forcePlay = () => {
        if (videoRef.current && videoRef.current.paused) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
        }
    };
    document.addEventListener('touchstart', forcePlay, { once: true });
    document.addEventListener('click', forcePlay, { once: true });
    document.addEventListener('scroll', forcePlay, { once: true });
    return () => {
        document.removeEventListener('touchstart', forcePlay);
        document.removeEventListener('click', forcePlay);
        document.removeEventListener('scroll', forcePlay);
    };
  }, []);

  // Render an independently-animated comma between sentence halves
  const renderComma = (currentSet: any) => {
      // Comma appears midway between first half settling and second half starting
      const commaDelay = (currentSet.secondHalfDelay || 4.0) * 0.45;
      return (
          <motion.span
              key="comma"
              variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                      opacity: 1,
                      transition: { 
                          duration: 2.0, 
                          ease: [0.16, 1, 0.3, 1],
                          delay: commaDelay
                      } 
                  },
                  exit: {
                      opacity: 0,
                      transition: { duration: 0.8, ease: "easeIn" }
                  }
              }}
              className={`${currentSet.textSize} font-black tracking-tighter leading-[0.9] ${currentSet.color}`}
              style={{ marginLeft: '-0.15em' }}
          >
              ,
          </motion.span>
      );
  }

  const renderWord = (word: string, i: number, currentSet: any) => {
      const isHighlight = currentSet.highlights.includes(word);
      const colorClass = isHighlight ? currentSet.highlightColor : currentSet.color;
      const hoverClass = isHighlight ? currentSet.hoverColor : "";
      const sizeClass = currentSet.wordSizeOverrides?.[word] || currentSet.textSize;
      
      let layoutClass = "";
      if (currentSet.layout === "vertical_all") {
          layoutClass = "w-full basis-full mb-1";
      } else if (currentSet.layout === "mixed" && currentSet.layoutOverrides && currentSet.layoutOverrides[i]) {
          layoutClass = currentSet.layoutOverrides[i];
      }

      const fontWeight = currentSet.wordWeightOverrides?.[word] || "font-black";

      return (
           <motion.span
               key={`${word}-${i}`}
               variants={{
                   hidden: { opacity: 0 },
                   visible: { 
                       opacity: 1,
                       transition: { 
                           duration: 3.6, 
                           ease: [0.16, 1, 0.3, 1],
                           delay: i < 2 ? i * 1.5 : (currentSet.secondHalfDelay || 4.0) + (i - 2) * 0.6
                       } 
                   },
                   exit: {
                       opacity: 0,
                       transition: { duration: 0.8, ease: "easeIn" }
                   }
               }}
               className={`${sizeClass} ${layoutClass} ${fontWeight} uppercase tracking-tighter leading-[0.9] cursor-default transition-colors duration-300 ${colorClass} ${hoverClass}`}
           >
               {word}
           </motion.span>
      );
  }

  // UPDATED: Single Paragraph Quote with hyphen and lowercase 'd'
  const quoteText = "Micron House is the immediate venue to test Cybercab and Optimus in a 1906 home, convene leaders around firsthand experience — and shape public rollout from a historic neighborhood near the Capitol, downtown, Micron, and the airport.";
  const quoteWords = quoteText.split(" ");
  
  // Color segments for the quote
  const getQuoteWordColor = (i: number): string => {
    if (i >= 20) return "#14532d"; // "— and shape public rollout...airport." → dark green
    return "#ffffff";              // everything before → white
  };

  // Shared container variants for the word-by-word animation
  // RESTORED: To previous version (slower stagger, no blur)
  const quoteContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            staggerChildren: 0.48, 
            delayChildren: 0.2 
        } 
    }
  };

  const quoteWordVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 10,
        // RESTORED: No blur
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        // RESTORED: No blur, 0.8s duration
        transition: { 
            duration: 0.8, 
            ease: "easeOut" 
        } 
    }
  };

  // Quote shows only after the hero video sequence finishes
  const shouldShowQuote = videoCompleted || hasScrolled;

  // After all quote words have animated in, transition colors to white
  useEffect(() => {
    if (shouldShowQuote && !quoteSettled) {
      // 37 words × 0.48s stagger + 0.2s delay + 1s buffer
      const timer = setTimeout(() => setQuoteSettled(true), 20000);
      return () => clearTimeout(timer);
    }
  }, [shouldShowQuote, quoteSettled]);

  return (
    <section 
        ref={containerRef}
        // UPDATED: pt-24 on mobile restored. md:pt-24 remains.
        className="relative w-full bg-white text-zinc-900 pt-24 md:pt-24 lg:pt-32 pb-8 md:pb-12 lg:pb-16 flex flex-col justify-end"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 h-full flex flex-col gap-3 md:gap-4 lg:gap-6 xl:gap-10">
        
        {/* VIDEO — Polaroid bento frame */}
        <div className="w-full lg:w-[75%] lg:mx-auto bg-white rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] border border-zinc-200 p-4 md:p-10 lg:p-12 xl:p-16">
            <div 
                className="aspect-video w-full rounded-2xl overflow-hidden relative group"
            >
                <video 
                    ref={videoRef}
                    autoPlay
                    loop={false} 
                    muted 
                    playsInline
                    preload="auto"
                    src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/HERO%20NEWcropped.mp4"
                    onPlaying={() => {
                        if (videoRef.current) videoRef.current.playbackRate = 0.90;
                        setVideoIsPlaying(true);
                        startSentenceTimers();
                    }}
                    onEnded={handleVideoEnd}
                    onTimeUpdate={handleVideoTimeUpdate}
                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 z-[1]" style={{ WebkitTapHighlightColor: 'transparent' }} />
                
                {/* TAGLINE — centered in video frame, ALL viewports, word at a time */}
                {videoCompleted && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.0 }}
                    className="absolute inset-0 z-[2] flex items-center justify-center px-4"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 50%, transparent 80%)' }}
                  >
                    <div className="flex flex-col items-center gap-1 md:gap-2 lg:gap-2.5 xl:gap-3 leading-none">
                      {[["The", "First", "Autonomous"], ["Corporate", "Residence"]].map((line, lineIdx) => (
                        <div key={lineIdx} className="flex gap-x-1.5 md:gap-x-2.5">
                          {line.map((word, wi) => {
                            const globalIdx = lineIdx === 0 ? wi : 3 + wi;
                            return (
                              <motion.span
                                key={`${lineIdx}-${wi}`}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 0.6, y: 0 }}
                                transition={{ duration: 2.0, delay: 2.0 + (globalIdx * 0.6), ease: [0.16, 1, 0.3, 1] }}
                                className="text-white text-[12px] md:text-[16px] lg:text-[20px] xl:text-[28px] font-thin uppercase tracking-[0.2em] md:tracking-[0.25em]"
                              >
                                {word}
                              </motion.span>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
            </div>
        </div>

        {/* SENTENCE ANIMATION STRIP */}
        <motion.div 
            layout
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[75%] lg:mx-auto min-h-[80px] md:min-h-[100px] lg:min-h-[90px] xl:min-h-[100px] flex flex-col items-center justify-center relative overflow-hidden py-3 md:py-3 lg:py-3 px-[50px] lg:px-[60px]"
        >
             {/* BRAND REVEAL */}
             {wordmarkVisible && (
               <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-6 md:px-12 xl:px-16">
                 {/* MICRON HOUSE + Logo — centered on all viewports */}
                 <div className="flex flex-row items-center gap-2 md:gap-3 flex-shrink-0">
                   <motion.div className="flex flex-col">
                      <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 5.0, ease: [0.16, 1, 0.3, 1], delay: 0 }}
                          className="text-[2rem] md:text-[1.6rem] lg:text-[1.6rem] xl:text-[2rem] font-black uppercase tracking-tight text-micron-eggplant leading-[0.85]"
                      >
                          Micron
                      </motion.span>
                      <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 5.0, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
                          className="text-[2rem] md:text-[1.6rem] lg:text-[1.6rem] xl:text-[2rem] font-black uppercase tracking-tight text-micron-eggplant leading-[0.85]"
                      >
                          House
                      </motion.span>
                   </motion.div>
                   <motion.img 
                      initial={{ x: 200, rotate: -360, opacity: 0 }}
                      animate={iconControls}
                      src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-no-border.png"
                      alt="Micron Logo"
                      className="h-[62px] w-[62px] md:h-[60px] md:w-[60px] lg:h-[56px] lg:w-[56px] xl:h-[70px] xl:w-[70px] object-contain"
                   />
                 </div>
               </div>
             )}
             
             {/* Sentence text — stacked centered on mobile, single line on tablet+ */}
             <motion.div 
                layout
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="w-full relative z-10 flex items-center justify-center px-8 md:px-12 xl:px-16"
                style={{ opacity: wordmarkVisible ? 0 : 1 }}
             >
                 <AnimatePresence mode="wait">
                   {currentSentenceIndex !== null && (
                       <motion.div 
                          key={`${currentSentenceIndex}-${key}`}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={{
                              hidden: { opacity: 1 },
                              visible: { 
                                  opacity: 1,
                                  transition: { staggerChildren: 0 } 
                              },
                              exit: { 
                                  opacity: 1, 
                                  transition: { staggerChildren: 0.15, staggerDirection: -1, duration: 1.5 } 
                              }
                          }}
                          className="w-full max-w-5xl"
                       >
                         {/* MOBILE: stacked two lines, centered with equal padding */}
                         <div className="flex flex-col items-center gap-2 md:hidden">
                           {sentences[currentSentenceIndex].lines?.map((line: string[], lineIdx: number) => (
                             <div key={`line-${lineIdx}`} className="flex flex-nowrap gap-x-2 items-baseline">
                               {line.map((word: string, wi: number) => {
                                 const globalIdx = sentences[currentSentenceIndex].lines!
                                   .slice(0, lineIdx)
                                   .reduce((sum: number, l: string[]) => sum + l.length, 0) + wi;
                                 return renderWord(word, globalIdx, sentences[currentSentenceIndex]);
                               })}
                               {lineIdx === 0 && renderComma(sentences[currentSentenceIndex])}
                             </div>
                           ))}
                         </div>
                         {/* TABLET+: single horizontal line, centered */}
                         <div className="hidden md:flex flex-nowrap gap-x-3 lg:gap-x-5 justify-center items-baseline">
                           {sentences[currentSentenceIndex].words.map((word: string, i: number) => (
                             <React.Fragment key={`word-group-${i}`}>
                               {renderWord(word, i, sentences[currentSentenceIndex])}
                               {i === 1 && renderComma(sentences[currentSentenceIndex])}
                             </React.Fragment>
                           ))}
                         </div>
                       </motion.div>
                   )}
                 </AnimatePresence>
             </motion.div>
        </motion.div>

        {/* BOTTOM SECTION: PARADIGM & QUOTE */}
        {/* Appears on scroll like all other sections */}
        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 2.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full bg-micron-eggplant-light rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white/20 relative overflow-hidden flex flex-col p-6 md:p-8 lg:p-10 xl:p-[60px] gap-4 md:gap-6 group"
        >
            {/* MAIN LAYOUT: stacks on mobile+tablet, side-by-side on xl+ */}
            <div className="flex flex-col xl:flex-row xl:items-stretch flex-1 gap-4 xl:gap-8">
            
            {/* LEFT: Title + Address */}
            <div className="flex-shrink-0 flex flex-col justify-between items-start z-10 relative md:w-auto gap-6 md:gap-8">
                 <div className="relative z-10 w-full">
                    <InteractiveParadigmTitle />
                 </div>

                 {/* ADDRESS BLOCK */}
                 <div className="flex flex-col gap-0 border-l-4 border-micron-eggplant pl-3 relative z-10 mt-auto h-fit">
                        <h3 className="text-white font-bold text-lg uppercase tracking-wider leading-tight">Micron House</h3>
                        <p className="text-micron-eggplant font-semibold text-sm md:text-base uppercase tracking-widest leading-tight whitespace-nowrap overflow-hidden text-ellipsis">1020 East Warm Springs Ave</p>
                        <p className="text-micron-eggplant/80 text-xs md:text-sm uppercase tracking-widest leading-tight">Boise, Idaho 83712</p>
                 </div>
            </div>

            {/* CENTER: Quote — shows on all sizes, diagonal on desktop */}
            <div className="flex flex-grow items-center justify-center relative z-10 py-4 xl:py-0 xl:px-4">
                <motion.div
                        initial="hidden"
                        animate={shouldShowQuote ? "visible" : "hidden"}
                        variants={quoteContainerVariants}
                        className="font-micron text-lg md:text-xl xl:text-2xl text-white font-extralight leading-relaxed text-left -rotate-2 xl:-rotate-6 max-w-lg w-full pb-4 will-change-transform"
                >
                     <p className="inline">
                        {quoteWords.map((word, i) => (
                        <motion.span
                            key={i}
                            variants={quoteWordVariants}
                            className="mr-1.5 xl:mr-2 inline-block"
                            style={{ color: getQuoteWordColor(i) === '#14532d' ? '#14532d' : (quoteSettled ? '#ffffff' : getQuoteWordColor(i)), transition: 'color 2s ease' }}
                        >
                            {word}
                        </motion.span>
                        ))}
                    </p>
                </motion.div>
            </div>

            {/* RIGHT: Map Card */}
            <div className="w-full xl:w-[280px] h-[200px] md:h-[220px] xl:h-auto bg-zinc-100 rounded-2xl overflow-hidden shadow-2xl relative border-4 border-white/20 z-10 flex-shrink-0">
                 <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) contrast(100%)' }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="Micron House Map"
                    className="absolute inset-0 w-full h-full opacity-90"
                />
            </div>
            </div>

        </motion.div>

      </div>
    </section>
  );
}