import React from 'react';
import { motion } from 'framer-motion';
import { CardProps } from '../types';

export const BentoCard: React.FC<CardProps> = ({ 
  className = "", 
  children, 
  delay = 0, 
  onClick,
  hoverEffect = true,
  // Default to a dark zinc if not provided
  gradient = "bg-zinc-900"
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
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl 
        ${gradient} text-white
        border border-white/10
        shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] 
        p-6 
        flex flex-col
        transition-all duration-500 ease-out
        group
        ${hoverEffect && onClick ? 'cursor-pointer hover:border-white/30 hover:-translate-y-2 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6)]' : ''}
        ${className}
      `}
    >
      {/* Subtle top light source for 3D bevel effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-100" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
      
      {/* Hover Icon */}
      {hoverEffect && onClick && (
        <div className="absolute bottom-4 right-4 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 z-20">
          <div className="h-6 w-6 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-lg">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
};