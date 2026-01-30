import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const SectionIntro: React.FC = () => {
  
  // Logic: Without [Input], there's no [Result]
  const lines = [
    { prefix: "Without", highlight: "Memory", suffix: ", there's no", result: "Meaning." },
    { prefix: "Without", highlight: "Vision", suffix: ", there's no", result: "Velocity." },
    { prefix: "Without", highlight: "Place", suffix: ", there's no", result: "Perspective." },
  ];

  return (
    <section className="relative w-full bg-white text-zinc-900 py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Text Content */}
            <div className="flex-1 max-w-4xl">
                
                {/* 1. The "Without..." Statements */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.15 }}
                    className="flex flex-col gap-3 mb-12 md:mb-16"
                >
                    {lines.map((line, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="text-xl md:text-3xl lg:text-4xl leading-tight font-sans tracking-wide"
                        >
                            <span className="text-zinc-400 font-light">{line.prefix} </span>
                            <span className="text-zinc-900 font-bold">{line.highlight}</span>
                            <span className="text-zinc-400 font-light">{line.suffix} </span>
                            <span className="text-micron-eggplant font-bold">{line.result}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 2. The Main Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.9] mb-4">
                        A NEW PARADIGM.
                    </h2>
                    <div className="flex items-center gap-4">
                        <span className="text-2xl md:text-3xl font-bold uppercase tracking-[0.25em] text-micron-green">
                            ONE ADDRESS.
                        </span>
                    </div>
                </motion.div>

            </div>

            {/* Right Column: Map Block */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-full lg:w-[450px] flex-shrink-0 mt-8 lg:mt-0"
            >
                <div className="bg-zinc-50 p-2 rounded-2xl border border-zinc-100 shadow-2xl">
                     {/* Map Area */}
                     <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mb-4 border border-zinc-200 group/map cursor-pointer bg-zinc-200">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                          width="100%"
                          height="100%"
                          style={{ border: 0, filter: 'grayscale(100%) contrast(100%)' }}
                          allowFullScreen={false}
                          loading="lazy"
                          title="Map"
                          className="absolute inset-0 w-full h-full scale-100 opacity-80 group-hover/map:opacity-100 transition-all duration-700"
                        />
                        {/* Static Marker Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                           <div className="h-3 w-3 bg-micron-green rounded-full shadow-[0_0_0_4px_rgba(0,143,37,0.2)] ring-2 ring-white" />
                        </div>
                     </div>

                     <div className="px-2 pb-2">
                        <div className="flex flex-col items-start gap-1">
                            <h3 className="text-xl font-black text-zinc-900 uppercase leading-none tracking-tight">
                                1020 East Warm Springs Ave
                            </h3>
                            <div className="flex items-center gap-2 group/link cursor-pointer">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover/link:text-micron-green transition-colors">
                                    Boise Idaho 83712
                                </p>
                                <ArrowUpRight size={14} className="text-zinc-400 group-hover/link:text-micron-green transition-colors" />
                            </div>
                        </div>
                     </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};