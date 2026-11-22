import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroLoaderProps {
  onComplete: () => void;
  onRevealStart?: () => void;
}

const TITLE_CHARS = ['a', 'r', 'm', 'i', 'n'];

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete, onRevealStart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Lock scroll during intro
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();

    // 1. Initial kinetic text states: hidden below with 3D tilt
    gsap.set('.intro-char', {
      yPercent: 120,
      rotateX: -70,
      opacity: 0,
      transformOrigin: '50% 100%'
    });

    // 2. The big white text completes on the all-black screen
    tl.to('.intro-char', {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power4.out'
    });

    // 3. Brief hold so the completed white text registers
    tl.to({}, { duration: 0.3 });

    // 4. Smooth Transition: Reveal page and morph intro text into hero position
    tl.add(() => {
      onRevealStart?.();
    });

    // Measure destination hero title
    tl.add(() => {
      const heroTitle = document.querySelector('.hero-title-container');
      const introEl = titleContainerRef.current;

      let deltaY = 0;
      let deltaX = 0;
      let scaleRatio = 1;

      if (heroTitle && introEl) {
        const heroRect = heroTitle.getBoundingClientRect();
        const introRect = introEl.getBoundingClientRect();

        deltaY = (heroRect.top + heroRect.height / 2) - (introRect.top + introRect.height / 2);
        deltaX = (heroRect.left + heroRect.width / 2) - (introRect.left + introRect.width / 2);
        if (introRect.width > 0 && heroRect.width > 0) {
          scaleRatio = heroRect.width / introRect.width;
        }
      }

      // Smoothly dissolve the black screen to reveal hero page
      gsap.to(bgRef.current, {
        opacity: 0,
        duration: 0.95,
        ease: 'power3.inOut'
      });

      // Smoothly morph title position and scale into the exact hero headline location
      gsap.to(introEl, {
        x: deltaX,
        y: deltaY,
        scale: scaleRatio,
        duration: 0.95,
        ease: 'power3.inOut'
      });

      // Smoothly transition text color from pure white to deep black as it lands on the hero background
      gsap.to('.intro-char', {
        color: '#000000',
        duration: 0.95,
        ease: 'power3.inOut',
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-none select-none flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Pure All-Black Screen */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-black pointer-events-auto"
      />

      {/* Monumental Big White "armin" Text on Black Screen */}
      <div
        ref={titleContainerRef}
        className="relative z-10 w-full text-center flex justify-center items-baseline will-change-transform"
      >
        <h1 className="inline-block whitespace-nowrap will-change-transform text-[28vw] sm:text-[22vw] md:text-[19.5vw] font-[900] tracking-[-0.055em] leading-[0.78] text-white">
          <div
            className="flex overflow-visible justify-center items-baseline"
            style={{ perspective: '1600px' }}
          >
            {TITLE_CHARS.map((char, i) => (
              <span
                key={i}
                className="intro-char inline-block will-change-transform relative text-white"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: '50% 100%'
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </h1>
      </div>
    </div>
  );
};
