import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CelestiqueLogo } from './CelestiqueLogo';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onSelectCategory: (catId: string) => void;
  onShopNow: () => void;
}

export const CelestiqueHero: React.FC<HeroProps> = ({
  onSelectCategory,
  onShopNow,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Title & Stars entrance
      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
      });

      // Left editorial text entrance
      tl.from(
        leftColRef.current,
        {
          x: -30,
          opacity: 0,
          duration: 1,
        },
        '-=0.8'
      );

      // Right menu & tagline entrance
      tl.from(
        rightColRef.current,
        {
          x: 30,
          opacity: 0,
          duration: 1,
        },
        '-=0.8'
      );

      // Center mannequin hand entrance & float
      tl.from(
        handRef.current,
        {
          scale: 0.9,
          y: 50,
          opacity: 0,
          duration: 1.4,
          ease: 'power2.out',
        },
        '-=1.0'
      );

      // Continuous subtle breathing float on hand
      gsap.to(handRef.current, {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Parallax on scroll
      gsap.to(handRef.current, {
        y: 100,
        scale: 1.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen bg-[#F7F4EE] text-[#1C1917] overflow-hidden flex flex-col justify-between pt-6 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 select-none"
    >
      {/* Background Subtle Gradient & Light Radial Wash */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/70 via-transparent to-[#E8E2D7]/30" />

      {/* 1. Giant Brand Title (Exact Reference Match) */}
      <div
        ref={titleRef}
        className="w-full text-center relative z-10 pt-2 sm:pt-4 pb-4 sm:pb-6"
      >
        <CelestiqueLogo size="hero" className="w-full justify-center" />
      </div>

      {/* 2. Three-Column Main Composition */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full my-auto py-6 sm:py-10">
        {/* Left Column: Collection 2025 & Description */}
        <div
          ref={leftColRef}
          className="lg:col-span-3 flex flex-col items-start justify-center order-2 lg:order-1 text-left"
        >
          <div className="inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="font-editorial text-2xl sm:text-3xl text-[#1C1917] tracking-tight uppercase">
              COLLECTION 2025
            </span>
          </div>

          <p className="font-editorial italic text-base sm:text-lg text-[#1C1917]/75 leading-relaxed max-w-sm mb-6">
            Discover our exquisite fine jewelry collection, crafted for timeless elegance with ethically sourced gems and sustainable recycled gold.
          </p>

          <button
            onClick={onShopNow}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1C1917] text-[#F7F4EE] hover:bg-[#C5A059] hover:text-[#1C1917] transition-all duration-300 text-xs font-tenor tracking-[0.2em] uppercase shadow-sm cursor-pointer"
          >
            <span>SHOP NOW</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Center Column: Sculpted Porcelain Hand with Luxury Rings */}
        <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2 my-4 lg:my-0">
          <div
            ref={handRef}
            className="relative w-64 sm:w-80 md:w-96 lg:w-[420px] aspect-[3/4] flex items-center justify-center"
          >
            {/* Soft Ambient Shadow Backdrop */}
            <div className="absolute inset-0 bg-[#E0D7C9]/40 rounded-full blur-3xl transform -translate-y-4 scale-90" />

            {/* Hand Image (Exact Reference Aesthetic) */}
            <img
              src="/images/celestique/hero_hand.webp"
              alt="Celestique Fine Jewelry Sculpted Hand"
              className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(28,25,23,0.18)]"
              loading="eager"
            />

            {/* Floating Celestial Badge */}
            <div className="absolute bottom-4 right-2 sm:right-6 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-black/5 shadow-xs flex items-center gap-2 z-20">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
              <span className="text-[10px] font-tenor uppercase tracking-widest text-[#1C1917]">
                18k Solid Gold & Pavé
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Tagline & Category Menu (Exact Reference Match) */}
        <div
          ref={rightColRef}
          className="lg:col-span-3 flex flex-col items-start lg:items-end justify-center order-3 text-left lg:text-right"
        >
          {/* Tagline */}
          <h2 className="font-tenor text-xs sm:text-sm tracking-[0.22em] text-[#1C1917]/70 uppercase leading-snug max-w-[240px] mb-8">
            A CELESTIAL TOUCH FOR TIMELESS MOMENTS
          </h2>

          {/* Category Vertical Nav */}
          <div className="w-full max-w-[260px] flex flex-col">
            {[
              { id: 'rings', label: 'RINGS' },
              { id: 'earrings', label: 'EARRINGS' },
              { id: 'necklaces', label: 'NECKLACES' },
              { id: 'bracelets', label: 'BRACELETS' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group flex items-center justify-between w-full py-3.5 border-b border-[#1C1917]/15 hover:border-[#1C1917] transition-all duration-300 text-xs font-tenor tracking-[0.2em] text-[#1C1917] hover:text-[#C5A059] cursor-pointer"
              >
                <span>{cat.label}</span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <div className="relative z-10 w-full flex items-center justify-center pt-2">
        <span className="text-[10px] font-tenor tracking-[0.25em] uppercase text-[#1C1917]/40">
          SCROLL TO EXPLORE ATELIER
        </span>
      </div>
    </section>
  );
};
