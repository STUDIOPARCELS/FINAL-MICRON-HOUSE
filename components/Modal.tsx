import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ModalContent } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalContent | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  if (!data) return null;

  const getModalContent = () => {
    switch (data.category) {
      case 'cinematic':
        return <CinematicModalContent data={data} onClose={onClose} />;
      case 'showcase':
        return <ShowcaseModalContent data={data} onClose={onClose} />;
      case 'reference':
      default:
        return <ReferenceModalContent data={data} onClose={onClose} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-[51] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            {getModalContent()}
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// Category A: Cinematic Story with Variable Layouts
const CinematicModalContent: React.FC<{ data: ModalContent; onClose: () => void }> = ({ data, onClose }) => {
  
  // Determine Layout Classes
  const layout = data.modalLayout || 'default';
  
  let containerClasses = "flex flex-col md:flex-row"; // Default
  let textSectionClasses = "flex-1";
  let imageSectionClasses = "flex-1 hidden md:block";
  let imageContainerStyles = "h-full w-full"; // Inner image wrapper

  // Layout Logic
  switch (layout) {
    case 'reverse':
      containerClasses = "flex flex-col md:flex-row-reverse";
      break;
    case 'vertical-text-top':
      containerClasses = "flex flex-col";
      textSectionClasses = "h-1/2 w-full";
      imageSectionClasses = "h-1/2 w-full hidden md:block";
      break;
    case 'vertical-image-top':
      containerClasses = "flex flex-col-reverse"; // Image visual top (in flex-col-reverse, last child is top)
      textSectionClasses = "h-1/2 w-full";
      imageSectionClasses = "h-1/2 w-full hidden md:block";
      break;
    default:
      // Default is already set
      break;
  }

  // Image Source (Fallback if not provided)
  const imageSrc = data.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className={`pointer-events-auto relative h-[85vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-zinc-950 shadow-2xl border border-white/10 ring-1 ring-white/5 ${containerClasses}`}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10"
      >
        <X size={24} />
      </button>

      {/* Text Section */}
      <div className={`${textSectionClasses} p-12 md:p-16 flex flex-col justify-center overflow-y-auto bg-gradient-to-br from-zinc-950 to-black`}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {data.label && (
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-micron-eggplant-light">
              {data.label}
            </motion.div>
          )}
          {/* Updated Title Style: Uppercase, Bold, Sans-serif (removed font-micron) */}
          <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-4xl md:text-5xl text-white mb-8 leading-none font-bold uppercase tracking-tight">
            {data.title}
          </motion.h2>
          
          <div className="space-y-6 text-lg text-zinc-400 font-light leading-relaxed">
             <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
               {data.content}
             </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Image Section - Bento Box Style */}
      <div className={`${imageSectionClasses} bg-zinc-900 relative p-6 md:p-8 flex items-center justify-center`}>
        {/* The "Bento" Image Container */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
           <img 
             src={imageSrc} 
             alt="Visual Context"
             className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-1000 hover:scale-105"
           />
           {/* Subtle overlay for depth */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
};

// Category B: Showcase Use-Cases (Vintner Dinners, Tesla, etc.)
const ShowcaseModalContent: React.FC<{ data: ModalContent; onClose: () => void }> = ({ data, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="pointer-events-auto relative w-full max-w-4xl overflow-hidden rounded-3xl bg-zinc-900/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] p-8 md:p-12 border border-white/10 max-h-[90vh] overflow-y-auto ring-1 ring-white/5"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 rounded-full bg-white/5 p-2 text-white hover:bg-white/20 transition-colors border border-white/10"
      >
        <X size={24} />
      </button>

      {/* Header */}
      <div className="mb-10 text-center">
        {/* Consistent Bento Cover Style: Sans, Bold, Uppercase */}
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4 drop-shadow-md">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Staggered Grid Reveal */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.div 
          variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
          className="col-span-1 md:col-span-2 bg-black/40 rounded-2xl p-8 border border-white/5 shadow-inner"
        >
          <div className="prose prose-lg prose-invert text-zinc-300">
            {data.content}
          </div>
          
          {data.tags && (
            <div className="flex gap-2 mt-8">
              {data.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-micron-eggplant-light hover:bg-white/10 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* 3D Dark Tiles for Meta Data */}
        <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="h-32 bg-gradient-to-br from-zinc-900 to-black rounded-2xl flex flex-col items-center justify-center border border-white/10 shadow-lg relative overflow-hidden group">
           <div className="absolute inset-0 bg-micron-eggplant-light/10 opacity-0 group-hover:opacity-100 transition-opacity" />
           <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 z-10">Timeline</span>
           <span className="text-white font-bold text-lg z-10">2026-2027</span>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="h-32 bg-gradient-to-br from-zinc-900 to-black rounded-2xl flex flex-col items-center justify-center border border-white/10 shadow-lg relative overflow-hidden group">
           <div className="absolute inset-0 bg-micron-green/10 opacity-0 group-hover:opacity-100 transition-opacity" />
           <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 z-10">Availability</span>
           <span className="text-white font-bold text-lg z-10">Priority Access</span>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

// Category C: Reference (Serving Micron)
const ReferenceModalContent: React.FC<{ data: ModalContent; onClose: () => void }> = ({ data, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-auto relative w-full max-w-2xl overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl border border-white/10"
    >
      <div className="bg-black/50 p-6 border-b border-white/10 flex justify-between items-start">
        <div>
          {/* Consistent Bento Cover Style: Sans, Bold, Uppercase */}
          <h2 className="text-2xl font-bold uppercase tracking-tight text-white mb-1">
            {data.title}
          </h2>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            {data.subtitle}
          </p>
        </div>
        <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors"><X size={20} /></button>
      </div>
      <div className="p-8 text-zinc-300">
        {data.content}
      </div>
    </motion.div>
  );
};