import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface DMHeroProps {
  onOpenContact: () => void;
}

export const DMHero: React.FC<DMHeroProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentBottomRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Kinetic infinite marquee animation
    const marquee = marqueeRef.current;
    if (marquee) {
      const track = marquee.querySelector('.marquee-inner');
      if (track) {
        gsap.to(track, {
          xPercent: -50,
          duration: 25,
          ease: 'none',
          repeat: -1
        });
      }
    }

    // 2. Entrance animation
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      badgeRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    tl.fromTo(
      portraitRef.current,
      { scale: 0.94, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(
      contentBottomRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
      '-=0.6'
    );

    // 3. Subtle interactive mouse parallax on portrait
    const container = containerRef.current;
    const portrait = portraitRef.current;
    if (container && portrait) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(portrait, {
          x: relX * 25,
          y: relY * 20,
          rotateY: relX * 4,
          duration: 0.8,
          ease: 'power2.out'
        });
      };

      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 bg-[#0E0E0E] text-white overflow-hidden select-none"
    >
      {/* Background Subtle Radial Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#5363F6]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Status Capsule */}
      <div className="flex justify-center w-full relative z-20">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs md:text-sm font-medium text-gray-300">
            Available from Q1 2027
          </span>
        </div>
      </div>

      {/* Kinetic Massive Marquee (Behind Portrait) */}
      <div
        ref={marqueeRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden pointer-events-none z-0 opacity-20"
      >
        <div className="marquee-inner flex whitespace-nowrap text-[13vw] font-black tracking-tighter uppercase text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.7)]">
          <span className="pr-8">iences – Crafting digital experiences – Crafting digital exper</span>
          <span className="pr-8">iences – Crafting digital experiences – Crafting digital exper</span>
        </div>
      </div>

      {/* Centerpiece: Founders Portrait (Nick & Robin) */}
      <div
        ref={portraitRef}
        className="relative z-10 flex justify-center items-center my-auto py-4 md:py-8"
      >
        <div className="relative max-w-4xl w-full flex justify-center">
          <img
            src="/images/dm/digitalmakers-nick-robin-header.png"
            alt="Digitalmakers Founders - Nick & Robin"
            className="w-full max-w-[850px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-none"
            loading="eager"
          />
        </div>
      </div>

      {/* Bottom Editorial Content */}
      <div
        ref={contentBottomRef}
        className="relative z-20 max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-4"
      >
        {/* Left Headline & Description */}
        <div className="md:col-span-8 flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
            We think and act digital.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light">
            Digitalmakers helps brands step forward with a sharper identity, faster websites and digital marketing.
          </p>
        </div>

        {/* Right Handwritten Cursive Callout */}
        <div className="md:col-span-4 flex md:justify-end items-end">
          <div className="flex items-center gap-3">
            <span className="font-handwritten text-3xl sm:text-4xl text-[#5363F6] rotate-[-4deg] tracking-wide">
              We make digital work ↵
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
