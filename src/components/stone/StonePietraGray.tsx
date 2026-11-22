import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Layers, ArrowUpRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StonePietraGrayProps {
  onOpenQuote: (stoneName?: string) => void;
}

export const StonePietraGray: React.FC<StonePietraGrayProps> = ({ onOpenQuote }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [matchMode, setMatchMode] = useState<'single' | 'bookmatch' | 'quadmatch'>('bookmatch');

  useGSAP(() => {
    gsap.fromTo(
      '.pietra-reveal',
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

    gsap.fromTo(
      '.spec-card',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.specs-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="pietra-gray"
      ref={containerRef}
      className="py-28 md:py-36 bg-black border-t border-b border-white/10 relative overflow-hidden text-white select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="pietra-reveal inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-4">
              <span>FLAGSHIP EXTRACTION</span>
            </div>
            <h2 className="pietra-reveal font-sans text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tighter uppercase">
              LASHOTOR <span className="font-light text-neutral-400">PIETRA GRAY</span>
            </h2>
            <p className="pietra-reveal font-mono text-xs sm:text-sm text-neutral-400 mt-2 tracking-wider uppercase">
              ISFAHAN ARCHITECTURAL MARBLE • LOW POROSITY & HIGH COMPRESSIVE LOAD
            </p>
          </div>

          <div className="pietra-reveal max-w-md">
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans font-normal">
              Directly extracted from our quarry reserves south of Isfahan and sliced with diamond frame gangsaws in Mahmudabad. Renowned internationally for its dense graphite body and striking white calcite veining.
            </p>
          </div>
        </div>

        {/* Interactive Bookmatch & Symmetry Explorer */}
        <div className="pietra-reveal bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 sm:p-8 mb-16 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight">
                Architectural Bookmatch Studio
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                Sequential cut-to-cut slab mirroring for luxury feature walls, lobbies, and presidential residences.
              </p>
            </div>

            {/* Pattern Mode Switcher */}
            <div className="flex items-center gap-2 p-1 bg-black rounded-lg border border-white/10">
              <button
                onClick={() => setMatchMode('single')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono uppercase transition-all duration-300 cursor-pointer ${
                  matchMode === 'single'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Single Slab
              </button>
              <button
                onClick={() => setMatchMode('bookmatch')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono uppercase transition-all duration-300 cursor-pointer ${
                  matchMode === 'bookmatch'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                2-Piece Bookmatch
              </button>
              <button
                onClick={() => setMatchMode('quadmatch')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono uppercase transition-all duration-300 cursor-pointer ${
                  matchMode === 'quadmatch'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                4-Piece Quadmatch
              </button>
            </div>
          </div>

          {/* Interactive Viewer Canvas */}
          <div className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] rounded-xl overflow-hidden bg-black border border-white/10 select-none">
            
            {/* Mode 1: Single Master Slab */}
            {matchMode === 'single' && (
              <div className="w-full h-full relative group">
                <img
                  src="/images/stone/real_black_marble.jpg"
                  alt="Lashotor Pietra Gray Master Slab"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">
                    GANGSAW MASTER SLAB #LSH-2840
                  </span>
                  <span className="text-base sm:text-xl font-sans font-bold">
                    Dimensions: 300 cm × 190 cm × 2.0 cm
                  </span>
                </div>
              </div>
            )}

            {/* Mode 2: 2-Piece Bookmatch (Mirrored Left & Right) */}
            {matchMode === 'bookmatch' && (
              <div className="w-full h-full grid grid-cols-2 divide-x divide-white/20">
                <div className="relative h-full overflow-hidden">
                  <img
                    src="/images/stone/real_black_marble.jpg"
                    alt="Bookmatch Slab A"
                    className="w-full h-full object-cover object-left"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 px-2.5 py-1 rounded text-[11px] font-mono text-white border border-white/10">
                    Slab A (Primary Polish)
                  </div>
                </div>
                <div className="relative h-full overflow-hidden">
                  <img
                    src="/images/stone/real_black_marble.jpg"
                    alt="Bookmatch Slab B Mirrored"
                    className="w-full h-full object-cover object-left -scale-x-100"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 px-2.5 py-1 rounded text-[11px] font-mono text-white border border-white/10">
                    Slab B (Mirrored Symmetry)
                  </div>
                </div>
              </div>
            )}

            {/* Mode 3: 4-Piece Quadmatch (Diamond Heart Symmetry) */}
            {matchMode === 'quadmatch' && (
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 divide-x divide-y divide-white/20">
                <div className="relative h-full overflow-hidden">
                  <img
                    src="/images/stone/real_black_marble.jpg"
                    alt="Quadmatch Top Left"
                    className="w-full h-full object-cover object-top-left"
                  />
                </div>
                <div className="relative h-full overflow-hidden">
                  <img
                    src="/images/stone/real_black_marble.jpg"
                    alt="Quadmatch Top Right"
                    className="w-full h-full object-cover object-top-left -scale-x-100"
                  />
                </div>
                <div className="relative h-full overflow-hidden">
                  <img
                    src="/images/stone/real_black_marble.jpg"
                    alt="Quadmatch Bottom Left"
                    className="w-full h-full object-cover object-top-left -scale-y-100"
                  />
                </div>
                <div className="relative h-full overflow-hidden">
                  <img
                    src="/images/stone/real_black_marble.jpg"
                    alt="Quadmatch Bottom Right"
                    className="w-full h-full object-cover object-top-left -scale-x-100 -scale-y-100"
                  />
                </div>
              </div>
            )}

            {/* Symmetry Center Line */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-px h-full bg-white/40 shadow-sm" />
              {matchMode === 'quadmatch' && (
                <div className="absolute h-px w-full bg-white/40 shadow-sm" />
              )}
            </div>

            {/* Bottom Action */}
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => onOpenQuote('Lashotor Pietra Gray')}
                className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <span>Reserve Slabs From This Block</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Geological & ASTM Technical Spec Matrix */}
        <div className="specs-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          
          <div className="spec-card p-4 rounded-xl bg-[#0A0A0A] border border-white/10 hover:border-white/30 transition-all">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
              Specific Density
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">
              2.71 <span className="text-xs text-neutral-400">g/cm³</span>
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">ASTM C97</p>
          </div>

          <div className="spec-card p-4 rounded-xl bg-[#0A0A0A] border border-white/10 hover:border-white/30 transition-all">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
              Water Absorption
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">
              0.15% <span className="text-xs text-neutral-400">by wt.</span>
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">Ultra-low porosity</p>
          </div>

          <div className="spec-card p-4 rounded-xl bg-[#0A0A0A] border border-white/10 hover:border-white/30 transition-all">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
              Compressive Load
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">
              135 <span className="text-xs text-neutral-400">MPa</span>
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">High structural duty</p>
          </div>

          <div className="spec-card p-4 rounded-xl bg-[#0A0A0A] border border-white/10 hover:border-white/30 transition-all">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
              Modulus of Rupture
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">
              14.2 <span className="text-xs text-neutral-400">MPa</span>
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">Flexural resistance</p>
          </div>

          <div className="spec-card p-4 rounded-xl bg-[#0A0A0A] border border-white/10 hover:border-white/30 transition-all">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
              Abrasion Loss
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">
              21.8 <span className="text-xs text-neutral-400">mm</span>
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">Böhme Disc Test</p>
          </div>

          <div className="spec-card p-4 rounded-xl bg-[#0A0A0A] border border-white/10 hover:border-white/30 transition-all">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
              Resin & Backing
            </span>
            <div className="text-base sm:text-lg font-bold font-mono text-white mt-1">
              Tenax Epoxy
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">Vacuum mesh backing</p>
          </div>

        </div>

      </div>
    </section>
  );
};
