import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Cpu, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  num: string;
  title: string;
  equipment: string;
  description: string;
  image: string;
  specs: string[];
}

const PROCESS_STEPS: Step[] = [
  {
    num: '01',
    title: 'Quarry Block Selection',
    equipment: 'Diamond Wire Saw & Hydraulic Excavation',
    description: 'Direct extraction from our quarry reserves south of Isfahan. Utilizing zero-detonation diamond wire saws ensures structural crystalline integrity without hidden shock micro-cracks.',
    image: '/images/stone/real_quarry_blocks.jpg',
    specs: ['Blocks up to 30 Tons', 'Zero Blast Micro-Cracks', 'Grade A+ Vein Orientation']
  },
  {
    num: '02',
    title: 'Italian Multi-Wire Slicing',
    equipment: '80-Blade Diamond Multi-Wire Gangsaws',
    description: 'Blocks are aligned with computerized laser calipers and sliced into calibrated 2.0 cm and 3.0 cm architectural slabs with an exceptional thickness tolerance of less than ±0.3 mm.',
    image: '/images/stone/stone_factory_cutting.webp',
    specs: ['Slab Dimensions up to 320×195 cm', '±0.3 mm Thickness Tolerance', 'Perfect Edge Perpendicularity']
  },
  {
    num: '03',
    title: 'Vacuum Epoxy & Dual Mesh Backing',
    equipment: 'Thermal Vacuum Resin Ovens & Tenax Systems',
    description: 'Each slab undergoes deep thermal moisture evacuation and high-vacuum infusion with Italian Tenax epoxy resin, backed with dual-layer fiberglass mesh for supreme flexural strength and safety.',
    image: '/images/stone/luxury_bathroom_lashotor.webp',
    specs: ['Tenax UV-Stable Clear Resin', '300 g/m² Heavy Structural Mesh', '100% Penetration of Micro-Veins']
  },
  {
    num: '04',
    title: '16-Head Breton Line Polishing',
    equipment: 'Automated Italian Breton Slab Polisher',
    description: 'Sixteen sequential diamond abrasive heads polish the slab surface progressively from coarse grain to micro-crystallization, achieving a brilliant 95+ gloss mirror reflection.',
    image: '/images/stone/real_black_marble.jpg',
    specs: ['95+ Gloss Units', 'Optical Laser Flatness Audit', 'Individual Batch Tracking']
  }
];

export const StoneProcess: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.process-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="py-28 md:py-36 bg-black text-white select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
        
        {/* Section Heading */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>PRECISION ENGINEERING</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tighter uppercase">
            QUARRY TO <span className="font-light text-neutral-400">ARCHITECTURE</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 mt-2 tracking-wider uppercase">
            HIGH-TECH PROCESSING AT MAHMUDABAD FACILITY, ISFAHAN
          </p>
        </div>

        {/* 4 Sequential Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="process-card group bg-[#0A0A0A] border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col justify-between shadow-2xl"
            >
              {/* Step Image */}
              <div className="h-64 sm:h-72 relative overflow-hidden bg-black">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* Big Step Number */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-black/80 border border-white/20 flex items-center justify-center font-mono font-bold text-sm text-white">
                  {step.num}
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider block">
                    {step.equipment}
                  </span>
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-sans font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Specs List */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {step.specs.map((item, specIdx) => (
                    <div key={specIdx} className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
