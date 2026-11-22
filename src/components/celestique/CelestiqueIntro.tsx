import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
}

export const CelestiqueIntro: React.FC<IntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [percent, setPercent] = useState(0);

  useGSAP(
    () => {
      const obj = { val: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Animate counter from 0 to 100
      tl.to(obj, {
        val: 100,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          setPercent(Math.floor(obj.val));
        },
      });

      // Text and sparkles pulse
      tl.from(
        textRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: 20,
          duration: 1,
          ease: 'power3.out',
        },
        0.2
      );

      // Smooth upward wipe reveal
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1.1,
        ease: 'power4.inOut',
        delay: 0.2,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#1C1917] text-[#F7F4EE] flex flex-col justify-between p-8 sm:p-12 select-none"
    >
      {/* Top Header info */}
      <div className="flex items-center justify-between text-xs font-tenor uppercase tracking-[0.25em] text-white/50">
        <span>HAUTE JOAILLERIE</span>
        <span>COLLECTION 2025</span>
      </div>

      {/* Center Wordmark with Starburst */}
      <div ref={textRef} className="text-center my-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#C5A059] animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <h1
          className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase"
          style={{
            fontFamily: "'Cormorant Garamond', 'Italiana', Georgia, serif",
          }}
        >
          CELESTIQUE
        </h1>
        <p className="font-tenor text-xs sm:text-sm tracking-[0.3em] uppercase text-[#C5A059] mt-3">
          A Celestial Touch for Timeless Moments
        </p>
      </div>

      {/* Bottom Counter & Credits */}
      <div className="flex items-center justify-between text-xs font-tenor tracking-widest uppercase text-white/40">
        <span>Designed by Armin Rahmani</span>
        <span ref={counterRef} className="font-mono text-sm text-[#C5A059]">
          {String(percent).padStart(2, '0')}%
        </span>
      </div>
    </div>
  );
};
