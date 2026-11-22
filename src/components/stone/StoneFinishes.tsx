import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FinishDetail {
  id: string;
  name: string;
  glossLevel: string;
  slipRating: string;
  tactileFeel: string;
  image: string;
  bestFor: string[];
  description: string;
}

const FINISHES: FinishDetail[] = [
  {
    id: 'polished',
    name: 'Diamond Mirror Polished',
    glossLevel: '95+ GU (High Gloss)',
    slipRating: 'R9 (Dry Indoor)',
    tactileFeel: 'Mirror-smooth, glassy crystalline reflection',
    image: '/images/stone/real_black_marble.jpg',
    bestFor: ['Grand Lobby Flooring', 'Feature Bookmatch Walls', 'Master Bathroom Vanities', 'Elevator Portals'],
    description: 'Processed through 16-head Breton diamond calibrating lines. Reveals the deepest black-gray pigment and razor-sharp calcite white veins with zero surface distortion.'
  },
  {
    id: 'honed',
    name: 'Satin Honed (Matte)',
    glossLevel: '15-25 GU (Satin Matte)',
    slipRating: 'R10 (Low Glare)',
    tactileFeel: 'Soft velvet, smooth non-reflective touch',
    image: '/images/stone/silver_travertine_texture.jpg',
    bestFor: ['Contemporary Minimalist Villas', 'Gallery Walls', 'Kitchen Countertops', 'Executive Boardrooms'],
    description: 'Precision honed with micro-grit abrasives to eliminate specular light glare while retaining crisp vein clarity. Resists visible scratches and fingerprint smudges.'
  },
  {
    id: 'bush-hammered',
    name: 'Bush-Hammered',
    glossLevel: '< 5 GU (Ultra Matte)',
    slipRating: 'R11 - R12 (High Anti-Slip)',
    tactileFeel: 'Evenly pitted mechanical crater texture',
    image: '/images/stone/bush_hammered_finish.webp',
    bestFor: ['Exterior Building Facades', 'Plazas & Pedestrian Boulevards', 'Pool Surrounds & Wet Decks', 'Stair Treads'],
    description: 'Mechanical rotary carbide hammers impact the stone surface, producing a uniform, slip-resistant pitted texture. Lightens Lashotor to a sophisticated ash stone tone.'
  },
  {
    id: 'leathered',
    name: 'Antique Leathered (Brushed)',
    glossLevel: '30-40 GU (Warm Sheen)',
    slipRating: 'R10 (Tactile Grip)',
    tactileFeel: 'Organic undulating relief following natural crystal boundaries',
    image: '/images/stone/golden_black_marble.webp',
    bestFor: ['Luxury Fireplace Mantels', 'Bar Countertops', 'Boutique Hotel Accent Cladding', 'Spa Lounges'],
    description: 'Diamond-wire abrasive brushes excavate softer matrix minerals while preserving resilient calcite veins, resulting in a rich undulating texture with tactile depth.'
  }
];

interface StoneFinishesProps {
  onOpenQuote: (finishName?: string) => void;
}

export const StoneFinishes: React.FC<StoneFinishesProps> = ({ onOpenQuote }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedFinish, setSelectedFinish] = useState<FinishDetail>(FINISHES[0]);

  useGSAP(() => {
    gsap.fromTo(
      '.finish-reveal',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="finishes" ref={containerRef} className="py-28 md:py-36 bg-black border-t border-b border-white/10 relative text-white select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
        
        {/* Section Heading */}
        <div className="finish-reveal mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SURFACE TEXTURES</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tighter uppercase">
            MASTER <span className="font-light text-neutral-400">FINISHES</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 mt-2 tracking-wider uppercase">
            POLISHED, HONED, BUSH-HAMMERED, AND ANTIQUE LEATHERED
          </p>
        </div>

        {/* Finish Selector Tabs */}
        <div className="finish-reveal flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {FINISHES.map((finish) => (
            <button
              key={finish.id}
              onClick={() => setSelectedFinish(finish)}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedFinish.id === finish.id
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#0E0E0E] text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {finish.name}
            </button>
          ))}
        </div>

        {/* Selected Finish Showcase Split Card */}
        <div className="finish-reveal grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
          
          {/* Left: High-Res Macro Texture Viewer */}
          <div className="lg:col-span-7 h-[340px] sm:h-[420px] rounded-xl overflow-hidden relative group bg-black border border-white/10">
            <img
              src={selectedFinish.image}
              alt={selectedFinish.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                Tactile Profile
              </span>
              <p className="text-sm sm:text-base font-sans font-medium text-neutral-200">
                "{selectedFinish.tactileFeel}"
              </p>
            </div>
          </div>

          {/* Right: Technical Specifications & Applications */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white mb-2">
                {selectedFinish.name}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                {selectedFinish.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-lg bg-black border border-white/10 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">
                    Gloss Rating
                  </span>
                  <span className="text-white font-bold">{selectedFinish.glossLevel}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">
                    Slip Resistance
                  </span>
                  <span className="text-white font-bold">{selectedFinish.slipRating}</span>
                </div>
              </div>

              {/* Best For Checklist */}
              <div className="mb-8">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-3">
                  Recommended Architectural Uses:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedFinish.bestFor.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onOpenQuote(`${selectedFinish.name} Finish`)}
              className="w-full py-3.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Samples With This Finish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
