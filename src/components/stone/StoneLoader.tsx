import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface StoneLoaderProps {
  onComplete: () => void;
  onRevealStart?: () => void;
}

export const StoneLoader: React.FC<StoneLoaderProps> = ({ onComplete, onRevealStart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useGSAP(() => {
    document.body.style.overflow = 'hidden';
    const tl = gsap.timeline();

    // 1. Initial states
    gsap.set('.loader-item', { opacity: 0, y: 20 });
    gsap.set('.loader-line', { scaleX: 0 });

    // 2. Animate brand identity elements
    tl.to('.loader-item', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out'
    });

    // 3. Counter 0 -> 100%
    const counterObj = { val: 0 };
    tl.to(
      counterObj,
      {
        val: 100,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          setPercent(Math.floor(counterObj.val));
        }
      },
      0.2
    );

    tl.to(
      '.loader-line',
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.inOut'
      },
      0.2
    );

    // 4. Brief hold
    tl.to({}, { duration: 0.15 });

    // 5. Exit text
    tl.to('.loader-item, .loader-line', {
      opacity: 0,
      y: -20,
      duration: 0.35,
      stagger: 0.02,
      ease: 'power3.in',
      onComplete: () => {
        onRevealStart?.();
      }
    });

    // 6. Upward sweep reveal of page
    tl.to(curtainRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      }
    }, '-=0.08');

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#0A0C0F] text-[#F3F4F6] flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden"
    >
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#0A0C0F] flex flex-col justify-between p-6 sm:p-12 z-10"
      >
        {/* Top Metadata */}
        <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-white/10 pb-4">
          <div className="loader-item flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="font-mono uppercase tracking-[0.2em] text-[#C5A059] font-semibold text-xs">
              ARASH STONE CO.
            </span>
          </div>
          <div className="loader-item font-mono text-[11px] text-neutral-400 hidden sm:block tracking-widest uppercase">
            QUARRY DIRECT // ISFAHAN, IRAN • EST. 1974
          </div>
          <div className="loader-item font-mono text-[#C5A059] font-bold text-xs sm:text-sm tracking-wider">
            [{percent.toString().padStart(3, '0')}%]
          </div>
        </div>

        {/* Center Monolithic Identity */}
        <div className="flex flex-col items-center justify-center my-auto text-center px-4">
          {/* Emblem */}
          <div className="loader-item w-16 h-16 sm:w-20 sm:h-20 mb-6 rounded-2xl border border-[#C5A059]/40 bg-[#14171D] flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.2)]">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-[#C5A059]">
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <line x1="12" y1="22" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" />
              <line x1="12" y1="12" x2="22" y2="8.5" stroke="currentColor" strokeWidth="1.2" />
              <line x1="12" y1="12" x2="2" y2="8.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>

          <h1 className="loader-item font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.1em] text-white uppercase mb-3">
            ARASH STONE
          </h1>

          <p className="loader-item font-mono text-[11px] sm:text-xs text-[#C5A059] tracking-[0.25em] uppercase mb-1">
            صنایع سنگ آرش اصفهان
          </p>

          <p className="loader-item text-xs sm:text-sm text-neutral-400 font-light max-w-md mx-auto mt-2 leading-relaxed">
            World-class Lashotor (Pietra Gray) marble, silver travertine, and architectural stone slabs.
          </p>

          {/* Gold Progress Bar */}
          <div className="w-[70vw] sm:w-[260px] h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden relative">
            <div className="loader-line w-full h-full bg-[#C5A059] origin-left shadow-[0_0_15px_#C5A059]" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-neutral-500 border-t border-white/10 pt-4 font-mono">
          <span className="loader-item tracking-wider uppercase">
            Mahmudabad Industrial Stone Zone // 34th St.
          </span>
          <span className="loader-item text-[#C5A059] tracking-wider uppercase font-semibold">
            High Precision Slabs &amp; Tiles
          </span>
        </div>
      </div>
    </div>
  );
};
