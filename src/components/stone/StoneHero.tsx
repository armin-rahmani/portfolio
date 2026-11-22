import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown, ArrowUpRight, ShieldCheck, Globe, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StoneHeroProps {
  onOpenQuote: () => void;
}

const TITLE_WORDS = [
  ['A', 'R', 'A', 'S', 'H'],
  ['S', 'T', 'O', 'N', 'E']
];

export const StoneHero: React.FC<StoneHeroProps> = ({ onOpenQuote }) => {
  const containerRef = useRef<HTMLElement>(null);
  const cardCenterRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Universal entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 });

    tl.fromTo(
      '.hero-meta',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
      .fromTo(
        '.hero-title-letter',
        { yPercent: 70, opacity: 0, rotateX: -30 },
        { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.04, ease: 'power4.out' },
        '-=0.3'
      )
      .fromTo(
        '.hero-sub',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.5'
      )
      .fromTo(
        cardCenterRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        cardLeftRef.current,
        { scale: 0.88, opacity: 0, x: -30, y: 20 },
        { scale: 1, opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo(
        cardRightRef.current,
        { scale: 0.88, opacity: 0, x: 30, y: 20 },
        { scale: 1, opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.75'
      )
      .fromTo(
        statsRef.current?.children || [],
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
        '-=0.4'
      );

    // Continuous organic floating motion
    gsap.to('.card-left-float', {
      y: 6,
      rotation: -6,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.card-right-float', {
      y: -7,
      rotation: 6,
      duration: 4.0,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.2
    });

    gsap.to('.card-center-float', {
      y: -4,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.1
    });

    // Desktop 60fps 3D Mouse Parallax
    mm.add('(min-width: 1024px)', () => {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const normX = (clientX / window.innerWidth) * 2 - 1;
        const normY = (clientY / window.innerHeight) * 2 - 1;

        if (cardCenterRef.current) {
          gsap.to(cardCenterRef.current, {
            x: normX * 18,
            y: normY * 14,
            rotationY: normX * 4,
            rotationX: -normY * 4,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
        if (cardLeftRef.current) {
          gsap.to(cardLeftRef.current, {
            x: normX * 28,
            y: normY * 20,
            rotationY: normX * 7,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
        if (cardRightRef.current) {
          gsap.to(cardRightRef.current, {
            x: normX * -28,
            y: normY * 20,
            rotationY: normX * -7,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    });

  }, { scope: containerRef });

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between items-center text-center overflow-hidden bg-black text-white select-none"
    >
      {/* Subtle radial ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Main Hero Header */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 w-full flex flex-col items-center">
        
        {/* Clean Meta Tag */}
        <div className="hero-meta inline-flex items-center gap-2.5 px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono tracking-widest uppercase text-neutral-300 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>EST. 1974 • ISFAHAN, IRAN • QUARRY & FACTORY</span>
        </div>

        {/* Big Apple-Style Title with Letter-by-Letter GSAP Animation */}
        <h1 className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-sans font-bold tracking-tighter uppercase leading-none overflow-hidden my-2">
          {TITLE_WORDS.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-flex overflow-hidden">
              {word.map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="hero-title-letter inline-block transform-gpu"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Clean Subtitle */}
        <p className="hero-sub font-sans font-medium text-base sm:text-xl text-neutral-300 max-w-2xl mt-4 leading-relaxed tracking-tight">
          Masters of Lashotor (Pietra Gray) marble and silver travertine. Quarried south of Isfahan and calibrated with Italian diamond frame gangsaws.
        </p>

        {/* Clean Call to Action Buttons */}
        <div className="hero-sub flex flex-col sm:flex-row items-center gap-4 mt-8">
          <button
            onClick={() => scrollToSection('#catalog')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all shadow-xl cursor-pointer"
          >
            Explore Stone Catalog
          </button>

          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white/5 border border-white/15 text-white font-semibold text-xs tracking-wider uppercase hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Request Direct Quote</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400" />
          </button>
        </div>

      </div>

      {/* 3D Floating Stone Slab Cards with GSAP Parallax */}
      <div className="relative w-full max-w-6xl mx-auto px-6 h-[320px] sm:h-[400px] md:h-[460px] flex items-center justify-center mt-12 mb-8 perspective-[1200px]">
        
        {/* Left Card: Silver Travertine */}
        <div
          ref={cardLeftRef}
          className="absolute left-4 sm:left-12 md:left-24 z-10 w-44 sm:w-60 md:w-72 transform-gpu"
        >
          <div className="card-left-float rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-900 group">
            <div className="h-44 sm:h-56 md:h-64 overflow-hidden relative">
              <img
                src="/images/stone/silver_travertine_texture.jpg"
                alt="Takab Silver Travertine"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  TRAVERTINE
                </span>
                <span className="text-xs sm:text-sm font-sans font-bold text-white block">
                  Takab Silver Vein-Cut
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Card: Pietra Gray Master Slab */}
        <div
          ref={cardCenterRef}
          className="relative z-20 w-64 sm:w-88 md:w-[480px] transform-gpu"
        >
          <div className="card-center-float rounded-xl overflow-hidden border border-white/25 shadow-2xl bg-black group">
            <div className="h-56 sm:h-72 md:h-84 overflow-hidden relative">
              <img
                src="/images/stone/real_black_marble.jpg"
                alt="Lashotor Pietra Gray Marble Slab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-white text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                FLAGSHIP
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  ISFAHAN MARBLE
                </span>
                <span className="text-base sm:text-lg font-sans font-bold text-white block">
                  Lashotor (Pietra Gray)
                </span>
                <span className="text-[11px] font-mono text-neutral-400 block mt-0.5">
                  High-polished master slab • Pure white calcite veining
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: White Crystal Marble */}
        <div
          ref={cardRightRef}
          className="absolute right-4 sm:right-12 md:right-24 z-10 w-44 sm:w-60 md:w-72 transform-gpu"
        >
          <div className="card-right-float rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-900 group">
            <div className="h-44 sm:h-56 md:h-64 overflow-hidden relative">
              <img
                src="/images/stone/white_crystal_marble.jpg"
                alt="White Crystal Marble Slabs"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  CRYSTAL MARBLE
                </span>
                <span className="text-xs sm:text-sm font-sans font-bold text-white block">
                  Aligudarz White Crystal
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Metrics Bar */}
      <div
        ref={statsRef}
        className="relative z-10 max-w-5xl mx-auto px-6 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-t border-white/10 pt-8"
      >
        <div className="p-3">
          <span className="text-2xl sm:text-3xl font-mono font-bold text-white block">50+</span>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mt-1">
            Years Heritage
          </span>
        </div>

        <div className="p-3">
          <span className="text-2xl sm:text-3xl font-mono font-bold text-white block">45,000 m²</span>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mt-1">
            Monthly Capacity
          </span>
        </div>

        <div className="p-3">
          <span className="text-2xl sm:text-3xl font-mono font-bold text-white block">±0.3 mm</span>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mt-1">
            Gangsaw Tolerance
          </span>
        </div>

        <div className="p-3">
          <span className="text-2xl sm:text-3xl font-mono font-bold text-white block">28+</span>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mt-1">
            Export Destinations
          </span>
        </div>
      </div>

    </section>
  );
};
