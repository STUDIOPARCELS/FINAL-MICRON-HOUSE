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
        textSize: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl",
        layout: "default",
        lines: [["WITHOUT", "VISION"], ["THERE'S", "NO", "VELOCITY"]]
    },
    {
        words: ["WITHOUT", "MEMORY", "THERE'S", "NO", "MEANING"],
        color: "text-[#878d9f]",
        highlightColor: "text-micron-eggplant",
        hoverColor: "hover:text-micron-eggplant/60", 
        highlights: ["MEMORY", "MEANING"],
        textSize: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl",
        layout: "default",
        lines: [["WITHOUT", "MEMORY"], ["THERE'S", "NO", "MEANING"]]
    },
    {
        words: ["WITHOUT", "PLACE", "THERE'S", "NO", "PERSPECTIVE"], 
        color: "text-[#878d9f]",
        highlightColor: "text-micron-green",
        hoverColor: "hover:text-green-900", 
        highlights: ["PLACE", "PERSPECTIVE"],
        textSize: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl",
        layout: "default",
        lines: [["WITHOUT", "PLACE"], ["THERE'S", "NO"], ["PERSPECTIVE"]],
        secondHalfDelay: 7.0,
    },
];

const InteractiveParadigmTitle: React.FC = () => {
    const paradigmLine1 = ["THE"];
    const paradigmLine2 = ["PARADIGM"];
    const paradigmLine3 = ["SHIFTS."];

    // Colors
    const cGreen = "#008f25";
    const cDarkGreen = "#14532d"; 
    const cEggplant = "#2c0f38"; 
    const cWhite = "#ffffff";

    // "THE PARADIGM" — Eggplant base, slowly cycles eggplant→dark green→green→eggplant
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

    // "SHIFTS." — Starts eggplant, settles on white. Hover: white→green→dark green→green→white
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
            {/* Line 1 & 2 */}
            <div className="flex flex-wrap gap-x-2 md:gap-x-4 items-baseline">
                {paradigmLine1.map((word, i) => (
                    <motion.span
                        key={`l1-${i}`}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover" // Independent interaction
                        viewport={{ once: true }} 
                        variants={standardVariant}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block cursor-pointer"
                    >
                        {word}
                    </motion.span>
                ))}
                
                {paradigmLine2.map((word, i) => (
                    <motion.span
                        key={`l2-${i}`}
                        custom={i + paradigmLine1.length}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover" // Independent interaction
                        viewport={{ once: true }} 
                        variants={standardVariant}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block cursor-pointer"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
            {/* Line 3 */}
            <div className="flex flex-wrap gap-x-2 md:gap-x-4">
                {paradigmLine3.map((word, i) => (
                    <motion.span
                        key={`l3-${i}`}
                        custom={i + paradigmLine1.length + paradigmLine2.length}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover" // Independent interaction
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
  const handleVideoEnd = () => {};
  
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
      
      // Sentence 0: Camera closes in on rocket
      if (t >= 5.0 && !fired.has('s0on')) {
          fired.add('s0on');
          setCurrentSentenceIndex(0);
      }
      if (t >= 8.5 && !fired.has('s0off')) {
          fired.add('s0off');
          setCurrentSentenceIndex(null);
      }
      
      // Sentence 1: Fab first visible over foothills
      if (t >= 10.5 && !fired.has('s1on')) {
          fired.add('s1on');
          setCurrentSentenceIndex(1);
      }
      if (t >= 15.5 && !fired.has('s1off')) {
          fired.add('s1off');
          setCurrentSentenceIndex(null);
      }
      
      // Sentence 2: Capitol building in view
      if (t >= 16.0 && !fired.has('s2on')) {
          fired.add('s2on');
          setCurrentSentenceIndex(2);
      }
      if (t >= 25.0 && !fired.has('s2off')) {
          fired.add('s2off');
          setCurrentSentenceIndex(null);
      }
      
      // Brand reveal: Wordmark fades in when car drives off
      if (t >= 26.0 && !fired.has('wordmark')) {
          fired.add('wordmark');
          setWordmarkVisible(true);
          wordmarkControls.start({
              opacity: 1,
              transition: { duration: 2.0, ease: [0.16, 1, 0.3, 1] }
          });
      }
      
      // Brand reveal: Logo rolls in as video starts spinning out from overhead
      if (t >= 29.0 && !fired.has('logo')) {
          fired.add('logo');
          setLogoVisible(true);
          iconControls.start({
              x: 0, rotate: 0, opacity: 1,
              transition: { type: "spring", stiffness: 5, damping: 12, duration: 8.0, bounce: 0 }
          });
          setTimeout(() => setLayoutShift(true), 1000);
      }
      
      // Blue bento appears
      if (t >= 30.6 && !fired.has('bento')) {
          fired.add('bento');
          setVideoCompleted(true);
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
                           duration: 3.0, 
                           ease: [0.16, 1, 0.3, 1],
                           delay: i < 2 ? i * 1.2 : (currentSet.secondHalfDelay || 4.0) + (i - 2) * 0.8
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
  const quoteText = "A private residence for first encounters with Optimus and Cybercab.";
  const quoteWords = quoteText.split(" ");

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

  return (
    <section 
        ref={containerRef}
        // UPDATED: pt-24 on mobile (was pt-32) to reduce padding by ~20%. md:pt-24 remains.
        className="relative w-full bg-white text-zinc-900 pt-20 md:pt-40 pb-12 md:pb-16 flex flex-col justify-end"
    >
      <div className="container mx-auto px-4 md:px-12 h-full flex flex-col gap-4 xl:gap-16">
        
        {/* TOP SECTION */}
        {/* UPDATED: Changed grid layout to [55fr_45fr] for desktop to make video wider */}
        <div className="flex flex-col xl:grid xl:grid-cols-[55fr_45fr] gap-8 xl:gap-4 h-auto xl:h-[500px] w-full">
            
            {/* 1. TEXT ANIMATION AREA (White Bento) */}
            {/* UPDATED: Changed order to order-2 (Bottom on Mobile, Right on Desktop) */}
            <motion.div 
                layout
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className={`
                    min-h-[180px] p-6
                    xl:min-h-[300px] xl:h-full xl:p-12
                    w-full flex flex-col items-center justify-center order-2 bg-white rounded-3xl 
                    shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] border border-zinc-200 relative overflow-hidden group
                `}
            >
                 {/* BRAND REVEAL: MICRON stacked above HOUSE fills bento, logo rolls in */}
                 {wordmarkVisible && (
                   <div className="absolute inset-0 flex flex-row items-center justify-center z-20 pointer-events-none px-6 xl:px-12 gap-2 md:gap-3 xl:gap-4">
                     {/* Wordmark — MICRON above HOUSE, fills the space */}
                     <motion.div
                        className="flex flex-col"
                     >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 3.0, ease: [0.16, 1, 0.3, 1], delay: 0 }}
                            className="text-[2.5rem] md:text-[3.3rem] xl:text-[5rem] font-black uppercase tracking-tight text-micron-eggplant leading-[0.85]"
                        >
                            Micron
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 3.0, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
                            className="text-[2.5rem] md:text-[3.3rem] xl:text-[5rem] font-black uppercase tracking-tight text-micron-eggplant leading-[0.85]"
                        >
                            House
                        </motion.span>
                     </motion.div>
                     {/* Logo — rolls in to fill remaining space */}
                     <motion.img 
                        initial={{ x: 200, rotate: -360, opacity: 0 }}
                        animate={iconControls}
                        src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-no-border.png"
                        alt="Micron Logo"
                        className="h-[88px] w-[88px] md:h-[154px] md:w-[154px] xl:h-[220px] xl:w-[220px] object-contain"
                     />
                   </div>
                 )}
                 
                 {/* Sentence text — visible during video, fades when brand appears */}
                 <motion.div 
                    layout
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                    className={`w-full relative z-10 flex items-center justify-center`}
                    style={{ opacity: wordmarkVisible ? 0 : 1 }}
                 >
                     <AnimatePresence mode="wait">
                       {currentSentenceIndex !== null && (
                           <motion.div 
                              key={`${currentSentenceIndex}-${key}`}
                              className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-4 w-full max-w-5xl justify-center"
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
                           >
                             {(() => {
                                 const currentSet = sentences[currentSentenceIndex];
                                 if (currentSet.lines) {
                                     // Forced line layout: render each line as a block
                                     let wordIndex = 0;
                                     return currentSet.lines.map((line: string[], lineIdx: number) => (
                                         <div key={`line-${lineIdx}`} className="w-full flex flex-nowrap gap-x-4 md:gap-x-6 justify-center">
                                             {line.map((word: string) => {
                                                 const el = renderWord(word, wordIndex, currentSet);
                                                 wordIndex++;
                                                 return el;
                                             })}
                                         </div>
                                     ));
                                 }
                                 return currentSet.words.map((word: string, i: number) => renderWord(word, i, currentSet));
                             })()}
                           </motion.div>
                       )}
                     </AnimatePresence>
                 </motion.div>
            </motion.div>

            {/* 2. VIDEO AREA */}
            {/* UPDATED: Changed order to order-1 (Top on Mobile, Left on Desktop) */}
            {/* UPDATED: REMOVED DELAY so video plays instantly */}
            {/* UPDATED: Changed mobile height from aspect-[1.4/1] to aspect-[1.4/1] (Taller by ~10%) */}
            <div 
                className="aspect-[1.4/1] h-auto xl:aspect-auto xl:h-full w-full rounded-3xl overflow-hidden relative shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-transform duration-500 bg-black order-1 group"
            >
                <video 
                    ref={videoRef}
                    autoPlay
                    loop={false} 
                    muted 
                    playsInline
                    preload="auto"
                    src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/MH_VIDEOS/micron-house-hero-compressed.mp4"
                    onPlaying={() => {
                        if (videoRef.current) videoRef.current.playbackRate = 0.45;
                        setVideoIsPlaying(true);
                        startSentenceTimers();
                    }}
                    onEnded={handleVideoEnd}
                    onTimeUpdate={handleVideoTimeUpdate}
                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                />
                {/* Invisible overlay blocks iOS from rendering native play button */}
                <div className="absolute inset-0 z-[1]" style={{ WebkitTapHighlightColor: 'transparent' }} />
            </div>

        </div>

        {/* BOTTOM SECTION: PARADIGM & QUOTE */}
        {/* Appears on scroll like all other sections */}
        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 2.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full bg-micron-eggplant-light rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white/20 relative overflow-hidden flex flex-col p-6 md:p-8 gap-4 md:gap-6 group"
        >
            {/* TOP ROW: Paradigm + Quote + Map */}
            <div className="flex flex-col lg:flex-row lg:items-stretch flex-1 gap-4 lg:gap-6 xl:gap-8">
            {/* LEFT: Title + Quote (tablet) + Address Block */}
            <div className="flex-shrink-0 flex flex-col justify-between items-start z-10 relative h-full md:w-auto gap-10 md:gap-12">
                 <div className="relative z-10 w-full">
                    <InteractiveParadigmTitle />
                 </div>

                 {/* TABLET LANDSCAPE QUOTE - under title, no angle, fills horizontal space */}
                 <div className="hidden lg:block xl:hidden relative z-10">
                      <motion.div
                         initial="hidden"
                         animate={shouldShowQuote ? "visible" : "hidden"}
                         variants={quoteContainerVariants}
                         className="font-micron text-base text-white/90 font-extralight leading-relaxed text-left will-change-transform"
                      >
                         <p className="inline">
                             {quoteWords.map((word, i) => (
                                <motion.span
                                    key={i}
                                    variants={quoteWordVariants}
                                    className="mr-1 inline-block"
                                >
                                    {word}
                                </motion.span>
                             ))}
                         </p>
                      </motion.div>
                 </div>
                 
                 {/* ADDRESS BLOCK */}
                 <div className="flex flex-col gap-0 border-l-4 border-micron-eggplant pl-3 relative z-10 mt-auto lg:mt-auto h-fit">
                        <h3 className="text-white font-bold text-lg uppercase tracking-wider leading-tight">Micron House</h3>
                        <p className="text-micron-eggplant font-semibold text-sm md:text-base uppercase tracking-widest leading-tight whitespace-nowrap overflow-hidden text-ellipsis">1020 East Warm Springs Ave</p>
                        <p className="text-micron-eggplant/80 text-xs md:text-sm uppercase tracking-widest leading-tight">Boise, Idaho 83712</p>
                 </div>

                 {/* MOBILE + TABLET PORTRAIT QUOTE - centered */}
                 <div className="lg:hidden w-full flex-grow pt-4 pb-12 flex items-center justify-center relative z-20">
                      <motion.div
                         initial="hidden"
                         animate={shouldShowQuote ? "visible" : "hidden"}
                         variants={quoteContainerVariants}
                         className="font-micron text-xl text-center text-white font-extralight leading-relaxed -rotate-3 pb-4 will-change-transform"
                      >
                         <p className="inline">
                             {quoteWords.map((word, i) => (
                                <motion.span
                                    key={i}
                                    variants={quoteWordVariants}
                                    className="mr-1.5 inline-block"
                                >
                                    {word}
                                </motion.span>
                             ))}
                         </p>
                      </motion.div>
                 </div>
            </div>

            {/* CENTER: DESKTOP-ONLY QUOTE CONTAINER */}
            <div className="hidden xl:flex flex-grow items-center justify-center relative px-4 z-10">
                <motion.div
                        initial="hidden"
                        animate={shouldShowQuote ? "visible" : "hidden"}
                        variants={quoteContainerVariants}
                        className="font-micron text-2xl text-white font-extralight leading-relaxed text-left -rotate-6 max-w-lg w-full -translate-x-4 pb-4 will-change-transform"
                >
                     <p className="inline">
                        {quoteWords.map((word, i) => (
                        <motion.span
                            key={i}
                            variants={quoteWordVariants}
                            className="mr-2 inline-block"
                        >
                            {word}
                        </motion.span>
                        ))}
                    </p>
                </motion.div>
            </div>

            {/* RIGHT: Map Card — compact on tablet landscape, full on desktop */}
            <div className="w-full lg:w-[260px] xl:w-[340px] aspect-[4/3] lg:aspect-[3/4] lg:h-auto bg-zinc-100 rounded-2xl overflow-hidden shadow-2xl relative border-4 border-white/20 z-10 mt-auto lg:mt-0 flex-shrink-0">
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