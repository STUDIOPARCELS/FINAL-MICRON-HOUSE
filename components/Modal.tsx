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

// Category A: Cinematic Story
const CinematicModalContent: React.FC<{ data: ModalContent; onClose: () => void }> = ({ data, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="pointer-events-auto relative h-[85vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-zinc-950 shadow-2xl flex flex-col md:flex-row border border-white/10 ring-1 ring-white/5"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10"
      >
        <X size={24} />
      </button>

      {/* Left: Text Reveal */}
      <div className="flex-1 p-12 md:p-16 flex flex-col justify-center overflow-y-auto bg-gradient-to-br from-zinc-950 to-black">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {data.label && (
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-micron-blue font-micron">
              {data.label}
            </motion.div>
          )}
          <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="font-micron text-4xl md:text-5xl text-white mb-8 leading-tight">
            {data.title}
          </motion.h2>
          
          <div className="space-y-6 text-lg text-zinc-400 font-light leading-relaxed">
             <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
               {data.content}
             </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right: Visual Placeholder */}
      <div className="flex-1 bg-zinc-900 relative overflow-hidden hidden md:block">
        <img 
           src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
           alt="Visual Context"
           className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-950" />
      </div>
    </motion.div>
  );
};

// Category B: Showcase Use-Cases (THE FIX FOR THE "HORRIBLE" WHITE MODAL)
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
        <h2 className="font-micron text-3xl md:text-5xl text-white mb-4 drop-shadow-md">{data.title}</h2>
        <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto tracking-wide">{data.subtitle}</p>
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
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-micron-blue hover:bg-white/10 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* 3D Dark Tiles for Meta Data */}
        <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="h-32 bg-gradient-to-br from-zinc-900 to-black rounded-2xl flex flex-col items-center justify-center border border-white/10 shadow-lg relative overflow-hidden group">
           <div className="absolute inset-0 bg-micron-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
           <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 z-10">Timeline</span>
           <span className="text-white font-micron font-bold text-lg z-10">2026-2027</span>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="h-32 bg-gradient-to-br from-zinc-900 to-black rounded-2xl flex flex-col items-center justify-center border border-white/10 shadow-lg relative overflow-hidden group">
           <div className="absolute inset-0 bg-micron-green/10 opacity-0 group-hover:opacity-100 transition-opacity" />
           <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 z-10">Availability</span>
           <span className="text-white font-micron font-bold text-lg z-10">Priority Access</span>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

// Category C: Reference
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
          <h2 className="font-micron text-2xl text-white">{data.title}</h2>
          <p className="text-sm text-zinc-400 mt-1">{data.subtitle}</p>
        </div>
        <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors"><X size={20} /></button>
      </div>
      <div className="p-8 text-zinc-300">
        {data.content}
      </div>
    </motion.div>
  );
};