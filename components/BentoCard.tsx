import React from 'react';
import { motion } from 'framer-motion';
import { CardProps } from '../types';

export const BentoCard: React.FC<CardProps & { textColor?: string; borderColor?: string }> = ({ 
  className = "", 
  children, 
  delay = 0, 
  onClick,
  hoverEffect = true,
  // Default to a dark zinc if not provided
  gradient = "bg-zinc-900",
  // New props for theming
  textColor = "text-white",
  borderColor = "border-white/10"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom ease out
        delay: delay 
      }}
      whileHover={hoverEffect ? { y: -8, transition: { duration: 0.3 } } : undefined}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl 
        ${gradient} ${textColor}
        border ${borderColor}
        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] 
        p-8
        flex flex-col
        transition-all duration-300 ease-out
        group
        ${hoverEffect && onClick ? 'cursor-pointer hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]' : ''}
        ${hoverEffect && !onClick ? 'hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]' : ''}
        ${className}
      `}
    >
      {/* Subtle top light source for 3D bevel effect (Only visible on dark cards) */}
      {textColor === 'text-white' && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-100" />
      )}
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
      
      {/* Hover Icon (Only if clickable) */}
      {hoverEffect && onClick && (
        <div className={`absolute bottom-6 right-6 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 z-20`}>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center border shadow-lg ${textColor === 'text-white' ? 'bg-white/10 text-white border-white/10' : 'bg-zinc-900 text-white border-zinc-900'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
};