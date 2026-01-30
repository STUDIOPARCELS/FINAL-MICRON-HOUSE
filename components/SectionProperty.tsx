import React from 'react';
import { BentoCard } from './BentoCard';
import { MapPin, Clock, Home, Zap, Shield, ArrowUpRight } from 'lucide-react';

export const SectionProperty: React.FC = () => {
  return (
    <section id="property" className="container mx-auto px-6 py-24 md:px-12 bg-zinc-50 text-zinc-900">
       {/* Header */}
       <div className="mb-16 flex flex-col md:flex-row md:items-end gap-6 border-b border-zinc-200 pb-8">
        <div>
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">02 / THE ASSET</span>
           <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant leading-none">THE PROPERTY</h2>
        </div>
        <div className="md:ml-auto max-w-lg">
             <p className="text-zinc-500 text-sm">A historic estate upgraded for the future. Hiding in plain sight.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Row 1: Map & Commute */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Map Card */}
            <BentoCard className="md:col-span-2 min-h-[300px] !p-0 relative" gradient="bg-zinc-900" hoverEffect={false}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%) brightness(85%)' }}
                    allowFullScreen={false}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full"
                />
                {/* Overlay Card - White Theme */}
                <div className="absolute top-6 left-6 bg-white border border-zinc-200 p-5 rounded-xl shadow-xl max-w-xs">
                    <h3 className="text-zinc-900 font-bold text-lg leading-tight mb-1">1020 E Warm Springs Ave</h3>
                    <p className="text-zinc-500 text-xs uppercase tracking-wide font-medium">Boise, ID 83712</p>
                    <a href="https://maps.google.com" target="_blank" className="flex items-center gap-1 text-[10px] text-micron-eggplant-light font-bold uppercase tracking-wider mt-3 hover:text-micron-eggplant transition-colors">
                        View Larger Map <ArrowUpRight size={10} />
                    </a>
                </div>
            </BentoCard>

            {/* Commute Times */}
            <div className="flex flex-col gap-6">
                <BentoCard gradient="bg-micron-black" className="flex-1 justify-center">
                     <div className="flex items-center gap-4 mb-2">
                        <span className="text-4xl font-bold text-white">15 <span className="text-sm font-normal text-zinc-400">MIN</span></span>
                     </div>
                     <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">To Micron HQ</p>
                </BentoCard>
                 <BentoCard gradient="bg-micron-eggplant" className="flex-1 justify-center">
                     <div className="flex items-center gap-4 mb-2">
                        <span className="text-4xl font-bold text-white">10 <span className="text-sm font-normal text-zinc-400 text-white/60">MIN</span></span>
                     </div>
                     <p className="text-xs font-bold uppercase tracking-widest text-white/60">To BOI Airport</p>
                </BentoCard>
            </div>
        </div>

        {/* Row 2: Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             <BentoCard gradient="bg-micron-black" className="min-h-[160px] justify-center text-center">
                 <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">1906</h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Year Built</p>
             </BentoCard>
             <BentoCard gradient="bg-micron-grey1" className="min-h-[160px] justify-center text-center">
                 <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">3,374</h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Square Feet</p>
             </BentoCard>
             <BentoCard gradient="bg-micron-grey2" className="min-h-[160px] justify-center text-center">
                 <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">3 / 4</h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Bed / Bath</p>
             </BentoCard>
             <BentoCard gradient="bg-micron-eggplant-light" className="min-h-[160px] justify-center text-center">
                 <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">1892</h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-white/80">Geothermal Rights</p>
             </BentoCard>
        </div>

        {/* Row 3: Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Features */}
             <BentoCard gradient="bg-white" className="!bg-white !border-zinc-200 !text-zinc-900 border" hoverEffect={false}>
                <div className="flex items-center gap-2 mb-6 text-micron-eggplant">
                    <Home size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Property Features</h3>
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-zinc-600 font-medium">
                    <p>• Geothermal radiant heat</p>
                    <p>• Central air conditioning</p>
                    <p>• Starlink high-speed Wi-Fi</p>
                    <p>• Fully equipped kitchen</p>
                    <p>• Art and antiques throughout</p>
                    <p>• ~300 sq ft deck</p>
                    <p>• Fully fenced private yard</p>
                    <p>• 4 fruit trees</p>
                    <p>• Concord grapevine</p>
                    <p>• Trusted staff</p>
                </div>
             </BentoCard>
             
             {/* Location & Partnership */}
             <div className="flex flex-col gap-6">
                 {/* Partnership Upgrades */}
                 <BentoCard gradient="bg-micron-green" className="flex-1">
                     <div className="flex items-center gap-2 mb-4 text-white">
                         <Shield size={20} />
                         <h3 className="font-bold uppercase tracking-widest text-sm">Partnership Upgrades</h3>
                     </div>
                     <div className="flex flex-wrap gap-3">
                         <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white border border-white/20">Sauna</span>
                         <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white border border-white/20">Hot springs-fed hot tub</span>
                         <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white border border-white/20">Whole body vibration</span>
                     </div>
                 </BentoCard>

                 {/* Location Highlights */}
                 <BentoCard gradient="bg-zinc-100" className="!bg-zinc-100 !border-zinc-200 flex-1 !text-zinc-900" hoverEffect={false}>
                      <div className="flex items-center gap-2 mb-4 text-zinc-400">
                         <MapPin size={20} />
                         <h3 className="font-bold uppercase tracking-widest text-sm">Location Highlights</h3>
                     </div>
                     <div className="grid grid-cols-2 gap-4 text-sm font-bold text-zinc-800">
                         <div className="flex justify-between items-center"><span className="font-medium text-zinc-600">Downtown Boise</span> <span className="text-micron-green text-xs bg-micron-green/10 px-2 py-0.5 rounded">&lt;1 mi</span></div>
                         <div className="flex justify-between items-center"><span className="font-medium text-zinc-600">St. Luke's Medical</span> <span className="text-micron-green text-xs bg-micron-green/10 px-2 py-0.5 rounded">&lt;1 mi</span></div>
                         <div className="flex justify-between items-center"><span className="font-medium text-zinc-600">Boise State</span> <span className="text-micron-eggplant text-xs bg-micron-eggplant/10 px-2 py-0.5 rounded">Walk</span></div>
                         <div className="flex justify-between items-center"><span className="font-medium text-zinc-600">Greenbelt</span> <span className="text-micron-eggplant text-xs bg-micron-eggplant/10 px-2 py-0.5 rounded">Walk</span></div>
                     </div>
                 </BentoCard>
             </div>
        </div>

      </div>
    </section>
  );
};