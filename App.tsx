import React from 'react';
import { Hero } from './components/Hero';
import { SectionPrototype } from './components/SectionPrototype';
import { SectionUseCases } from './components/SectionUseCases';
import { SectionServing } from './components/SectionServing';
import { SectionServingTesla } from './components/SectionServingTesla';
import { SectionTimeline } from './components/SectionTimeline';

function App() {
  // Helper function to handle smooth scrolling with header offset
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 85; // Height of fixed header + breathing room
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900 font-sans">
      {/* Navigation Overlay */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/80 backdrop-blur-md px-8 py-5 border-b border-zinc-200 shadow-sm transition-all duration-300">
        <div 
          className="text-3xl font-extrabold tracking-tighter text-micron-eggplant lowercase font-sans cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ textShadow: '0px 0px 1px rgba(44, 15, 56, 0.2)' }} 
        >
          micron house
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
           <a href="#prototype" onClick={(e) => scrollToSection(e, 'prototype')} className="hover:text-micron-green transition-colors">Vision</a>
           <a href="#use-cases" onClick={(e) => scrollToSection(e, 'use-cases')} className="hover:text-micron-eggplant-light transition-colors">Use Case</a>
           <a href="#serving" onClick={(e) => scrollToSection(e, 'serving')} className="hover:text-micron-green transition-colors">Serving Micron</a>
           <a href="#serving-tesla" onClick={(e) => scrollToSection(e, 'serving-tesla')} className="hover:text-micron-eggplant-light transition-colors">Serving Tesla</a>
           <a href="#timeline" onClick={(e) => scrollToSection(e, 'timeline')} className="hover:text-micron-green transition-colors">Timeline</a>
        </div>
      </nav>

      <main>
        <Hero />
        <div className="relative z-20 bg-white">
          <SectionPrototype />
          <SectionUseCases />
          <SectionServing />
          <SectionServingTesla />
          <SectionTimeline />

          {/* Footer */}
          <footer className="border-t border-zinc-200 bg-zinc-50 py-16 text-center text-zinc-500">
            <h3 className="text-2xl font-bold text-zinc-900 mb-2 font-micron">1020 E WARM SPRINGS AVE</h3>
            <p className="text-sm mb-8 font-body text-zinc-400">Boise, ID 83712</p>
            <p className="text-xs text-zinc-400">© 2025 Proposal for Micron Technology</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;