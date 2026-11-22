import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface RayaIntroProps {
  onComplete?: () => void;
}

export const RayaIntro: React.FC<RayaIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 1. Initial State
    tl.set(containerRef.current, { display: 'flex', opacity: 1, pointerEvents: 'all' })
      .set(titleRef.current, { y: 40, opacity: 0, rotateX: 20 })
      .set(subtitleRef.current, { y: 20, opacity: 0 })
      .set(lineRef.current, { scaleX: 0 })
      .set(counterRef.current, { opacity: 0 });

    // 2. Animate counter 0% -> 100%
    const counterObj = { val: 0 };
    tl.to(counterRef.current, {
      opacity: 1,
      duration: 0.3
    })
    .to(counterObj, {
      val: 100,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = `${Math.floor(counterObj.val)}%`;
        }
      }
    }, '-=0.1')
    .to(lineRef.current, {
      scaleX: 1,
      duration: 1.1,
      ease: 'power2.inOut'
    }, '<')

    // 3. Staggered Title & Creator Credit Reveal
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.9,
      ease: 'back.out(1.4)'
    }, '-=0.7')
    .to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.5')

    // 4. Brief Hold then Dramatic Smooth Wipe Out
    .to([titleRef.current, subtitleRef.current, counterRef.current, lineRef.current], {
      y: -25,
      opacity: 0,
      duration: 0.45,
      ease: 'power2.in',
      delay: 0.3
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.85,
      ease: 'power4.inOut'
    }, '-=0.1')
    .set(containerRef.current, { display: 'none', pointerEvents: 'none' });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0C1016] text-[#F0F6F8] flex flex-col items-center justify-center px-6 select-none font-vazir"
      dir="rtl"
    >
      <div className="max-w-xl w-full text-center flex flex-col items-center">
        {/* Modern Persian Typography Headline */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 will-change-transform"
        >
          استودیو خلاق رایا
        </h1>

        {/* Creator Attribution */}
        <p
          ref={subtitleRef}
          className="text-sm sm:text-lg text-neutral-400 font-medium tracking-wide mb-8 will-change-transform flex items-center gap-2 justify-center"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
          <span>طراحی و توسعه توسط <strong className="text-white font-bold">آرمین رحمانی</strong></span>
        </p>

        {/* Minimal Progress Line & Counter */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 relative overflow-hidden rounded-full mb-3">
          <div
            ref={lineRef}
            className="h-full bg-white origin-right will-change-transform"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        <span
          ref={counterRef}
          className="text-xs sm:text-sm font-mono text-neutral-400 font-medium tracking-widest"
        >
          0%
        </span>
      </div>
    </div>
  );
};
