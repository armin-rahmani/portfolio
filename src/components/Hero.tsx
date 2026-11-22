import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePageTransition } from '../context/TransitionContext';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isIntroDone: boolean;
}

const TITLE_LETTERS = ['a', 'r', 'm', 'i', 'n'];

export const Hero: React.FC<HeroProps> = ({ isIntroDone }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardCenterRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  const pagerRef = useRef<HTMLDivElement>(null);
  const bokehTrRef = useRef<HTMLImageElement>(null);
  const bokehBlRef = useRef<HTMLImageElement>(null);
  const titleLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const scrollBtnRef = useRef<HTMLButtonElement>(null);
  const portfolioBtnRef = useRef<HTMLButtonElement>(null);
  const portfolioArrowRef = useRef<HTMLSpanElement>(null);

  // quickTo references for locked 60fps mouse parallax
  const quickToMap = useRef<{
    leftX?: (val: number) => void;
    leftY?: (val: number) => void;
    rightX?: (val: number) => void;
    rightY?: (val: number) => void;
    centerX?: (val: number) => void;
    centerY?: (val: number) => void;
    pagerX?: (val: number) => void;
    pagerY?: (val: number) => void;
    bokehTrX?: (val: number) => void;
    bokehTrY?: (val: number) => void;
    bokehBlX?: (val: number) => void;
    bokehBlY?: (val: number) => void;
    scrollBtnX?: (val: number) => void;
    scrollBtnY?: (val: number) => void;
    letters?: Array<{ y?: (val: number) => void; rot?: (val: number) => void }>;
  }>({});

  const { navigateTo } = usePageTransition();

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Universal entrance timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      onComplete: () => {
        // Continuous organic floating waves for all floating items
        gsap.to('.card-left-float', {
          y: 7,
          rotation: -11,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        gsap.to('.card-right-float', {
          y: -8,
          rotation: 9,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.2
        });

        gsap.to('.card-center-float', {
          y: -5,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.1
        });

        gsap.to('.pager-float', {
          y: -10,
          rotation: 16,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.3
        });
      }
    });

    // 1. Dynamic 3D letter flip for "armin" with character-level stagger
    tl.from('.hero-char', {
      yPercent: 80,
      rotateX: -60,
      opacity: 0,
      duration: 1.0,
      stagger: 0.06,
      ease: 'power3.out',
      clearProps: 'opacity,transform'
    }, 0.1)
      // 2. Floating supporting cards entrance
      .from(
        cardCenterRef.current,
        { scale: 0.88, opacity: 0, y: 35, duration: 1.0, ease: 'power3.out' },
        '-=0.75'
      )
      .from(
        cardLeftRef.current,
        { scale: 0.85, opacity: 0, x: -35, y: 25, duration: 0.95, ease: 'power3.out' },
        '-=0.75'
      )
      .from(
        cardRightRef.current,
        { scale: 0.85, opacity: 0, x: 35, y: 25, duration: 0.95, ease: 'power3.out' },
        '-=0.8'
      )
      .from(
        pagerRef.current,
        { scale: 0.6, opacity: 0, y: -40, rotate: 30, duration: 0.9, ease: 'back.out(1.8)' },
        '-=0.75'
      )
      // 3. Editorial items reveal
      .from(
        '.hero-editorial-item',
        { y: 15, opacity: 0, duration: 0.75, stagger: 0.05, ease: 'power2.out' },
        '-=0.6'
      );

    // Desktop Specific: Mouse Parallax Setup
    mm.add('(min-width: 768px)', () => {
      if (cardLeftRef.current) {
        quickToMap.current.leftX = gsap.quickTo(cardLeftRef.current, 'x', { duration: 0.45, ease: 'power2.out' });
        quickToMap.current.leftY = gsap.quickTo(cardLeftRef.current, 'y', { duration: 0.45, ease: 'power2.out' });
      }
      if (cardRightRef.current) {
        quickToMap.current.rightX = gsap.quickTo(cardRightRef.current, 'x', { duration: 0.5, ease: 'power2.out' });
        quickToMap.current.rightY = gsap.quickTo(cardRightRef.current, 'y', { duration: 0.5, ease: 'power2.out' });
      }
      if (cardCenterRef.current) {
        quickToMap.current.centerX = gsap.quickTo(cardCenterRef.current, 'x', { duration: 0.38, ease: 'power2.out' });
        quickToMap.current.centerY = gsap.quickTo(cardCenterRef.current, 'y', { duration: 0.38, ease: 'power2.out' });
      }
      if (pagerRef.current) {
        quickToMap.current.pagerX = gsap.quickTo(pagerRef.current, 'x', { duration: 0.55, ease: 'power2.out' });
        quickToMap.current.pagerY = gsap.quickTo(pagerRef.current, 'y', { duration: 0.55, ease: 'power2.out' });
      }
      if (bokehTrRef.current) {
        quickToMap.current.bokehTrX = gsap.quickTo(bokehTrRef.current, 'x', { duration: 0.6, ease: 'power2.out' });
        quickToMap.current.bokehTrY = gsap.quickTo(bokehTrRef.current, 'y', { duration: 0.6, ease: 'power2.out' });
      }
      if (bokehBlRef.current) {
        quickToMap.current.bokehBlX = gsap.quickTo(bokehBlRef.current, 'x', { duration: 0.65, ease: 'power2.out' });
        quickToMap.current.bokehBlY = gsap.quickTo(bokehBlRef.current, 'y', { duration: 0.65, ease: 'power2.out' });
      }
      if (scrollBtnRef.current) {
        quickToMap.current.scrollBtnX = gsap.quickTo(scrollBtnRef.current, 'x', { duration: 0.3, ease: 'power2.out' });
        quickToMap.current.scrollBtnY = gsap.quickTo(scrollBtnRef.current, 'y', { duration: 0.3, ease: 'power2.out' });
      }

      quickToMap.current.letters = titleLettersRef.current.map((el) => {
        if (!el) return {};
        return {
          y: gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power2.out' }),
          rot: gsap.quickTo(el, 'rotateY', { duration: 0.4, ease: 'power2.out' })
        };
      });
    });

    // Scroll-linked scrub: disperse floating cards gracefully on scroll
    gsap.to(cardLeftRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      },
      xPercent: -35,
      yPercent: -20,
      rotate: -18,
      ease: 'none'
    });

    gsap.to(cardRightRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      },
      xPercent: 35,
      yPercent: -15,
      rotate: 18,
      ease: 'none'
    });

    gsap.to(cardCenterRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      },
      scale: 0.94,
      yPercent: 14,
      ease: 'none'
    });

    gsap.to(pagerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      },
      yPercent: -30,
      rotate: 25,
      ease: 'none'
    });

    // Subtle drift on title container during scroll
    gsap.to('.hero-title-container', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: -40,
      opacity: 0.35,
      ease: 'none'
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // 60fps Multi-plane mouse parallax with quickTo (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPct = (clientX / innerWidth - 0.5) * 26;
    const yPct = (clientY / innerHeight - 0.5) * 26;

    quickToMap.current.leftX?.(xPct * 0.75);
    quickToMap.current.leftY?.(yPct * 0.75);
    quickToMap.current.rightX?.(-xPct * 1.15);
    quickToMap.current.rightY?.(-yPct * 1.15);
    quickToMap.current.centerX?.(xPct * 0.35);
    quickToMap.current.centerY?.(yPct * 0.35);
    quickToMap.current.pagerX?.(-xPct * 1.4);
    quickToMap.current.pagerY?.(-yPct * 1.4);

    quickToMap.current.bokehTrX?.(-xPct * 0.25);
    quickToMap.current.bokehTrY?.(-yPct * 0.25);
    quickToMap.current.bokehBlX?.(xPct * 0.2);
    quickToMap.current.bokehBlY?.(yPct * 0.2);

    if (quickToMap.current.letters) {
      quickToMap.current.letters.forEach((item, i) => {
        const charOffset = (i - 2) * 3;
        item.y?.(yPct * 0.2 + Math.sin(xPct * 0.1 + i) * 2.5);
        item.rot?.((xPct + charOffset) * 0.35);
      });
    }
  };

  const handleCharMouseEnter = (i: number) => {
    const el = titleLettersRef.current[i];
    if (!el) return;
    gsap.to(el, {
      y: -16,
      scale: 1.08,
      duration: 0.25,
      ease: 'back.out(2)',
      yoyo: true,
      repeat: 1,
      overwrite: 'auto'
    });
  };

  const handleScrollBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.innerWidth < 768 || !scrollBtnRef.current) return;
    const rect = scrollBtnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    quickToMap.current.scrollBtnX?.(x * 0.25);
    quickToMap.current.scrollBtnY?.(y * 0.25);
  };

  const handleScrollBtnMouseLeave = () => {
    quickToMap.current.scrollBtnX?.(0);
    quickToMap.current.scrollBtnY?.(0);
  };

  const handlePortfolioMouseEnter = () => {
    if (portfolioArrowRef.current) {
      gsap.to(portfolioArrowRef.current, {
        x: 6,
        scale: 1.1,
        duration: 0.3,
        ease: 'back.out(2)',
        overwrite: 'auto'
      });
    }
  };

  const handlePortfolioMouseLeave = () => {
    if (portfolioArrowRef.current) {
      gsap.to(portfolioArrowRef.current, {
        x: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  };

  const scrollToAbout = () => {
    navigateTo('#about', 'ABOUT');
  };

  return (
    <div
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      data-nav-color="secondary"
      className="w-full h-screen min-h-[660px] sm:min-h-[720px] max-h-[1050px] bg-[#F8F7F4] bg-grain flex flex-col justify-between relative overflow-hidden select-none text-[#0e0e0e] px-4 sm:px-8 lg:px-12 xl:px-16"
    >
      {/* 1. Cinematic Foreground Bokeh Shadows */}
      <img
        ref={bokehTrRef}
        src="/images/bokeh_tr.svg"
        alt=""
        aria-hidden="true"
        className="hero-bokeh-tr absolute -top-[6vw] -right-[4vw] w-[26vw] h-[26vw] max-w-[380px] pointer-events-none z-10 select-none opacity-80 mix-blend-multiply will-change-transform"
      />
      <img
        ref={bokehBlRef}
        src="/images/bokeh_bl.svg"
        alt=""
        aria-hidden="true"
        className="hero-bokeh-bl absolute -bottom-[6vw] -left-[5vw] w-[30vw] h-[30vw] max-w-[440px] pointer-events-none z-10 select-none opacity-80 mix-blend-multiply will-change-transform"
      />

      {/* 2. Fine Editorial Geometric Vector Curve */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path
          d="M -40,480 C 140,320 180,190 480,270 C 740,340 960,200 1320,230"
          fill="none"
          stroke="rgba(14, 14, 14, 0.08)"
          strokeWidth="1.2"
        />
      </svg>

      {/* 3. Left Margin Vertical Micro-Typography (Desktop only) */}
      <div className="absolute left-[1.2vw] xl:left-[1.6vw] top-[50%] -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-20 pointer-events-none hero-editorial-item">
        <div className="w-[1px] h-14 bg-neutral-300/70" />
        <span
          className="text-[9px] font-mono uppercase tracking-[0.26em] text-neutral-400 whitespace-nowrap flex items-center gap-2"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          BASED IN GERMANY
        </span>
        <div className="w-[1px] h-14 bg-neutral-300/70" />
      </div>

      {/* 4. Main Hero Composition */}
      <div className="relative w-full flex-1 flex flex-col justify-start items-center pt-[14vh] sm:pt-[12vh]">
        {/* Subtitle above headline */}
        <div className="w-full max-w-[92vw] sm:max-w-[85vw] md:max-w-[72vw] flex justify-start items-center gap-3 mb-1.5 sm:mb-2 z-10 hero-editorial-item">
          <div className="w-10 sm:w-20 h-[1px] bg-neutral-400/80" />
          <div className="text-[11px] sm:text-xs md:text-sm font-medium tracking-tight text-neutral-800 leading-tight">
            <div>Creative Developer</div>
            <div>&amp; Digital Craftsman</div>
          </div>
        </div>

        {/* Oversized "armin" Headline - Solid Deep Black */}
        <div className="hero-title-container relative z-30 pointer-events-none select-none text-center w-full">
          <h1 className="hero-headline inline-block whitespace-nowrap will-change-transform text-[28vw] sm:text-[22vw] md:text-[19.5vw] font-[900] tracking-[-0.055em] leading-[0.78] text-black">
            <div className="flex overflow-visible justify-center items-baseline" style={{ perspective: '1600px' }}>
              {TITLE_LETTERS.map((char, i) => (
                <span
                  key={i}
                  ref={(el) => { titleLettersRef.current[i] = el; }}
                  onMouseEnter={() => handleCharMouseEnter(i)}
                  className="hero-char inline-block will-change-transform relative pointer-events-auto cursor-default text-black"
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

        {/* Right Metadata Column (Desktop only) */}
        <div className="absolute right-[4vw] md:right-[5.5vw] top-[26%] hidden lg:flex flex-col items-start gap-3 z-10 pointer-events-none hero-editorial-item">
          <span className="text-xs font-medium text-neutral-400 tracking-wider">
            01 / 03
          </span>
          <div className="w-[1px] h-14 bg-neutral-300/70" />
          <div className="text-xs text-neutral-600 font-light leading-relaxed max-w-[130px] pt-1">
            Building immersive
            <br />
            web experiences with
            <br />
            code and creativity.
          </div>
          <div className="w-5 h-[1px] bg-neutral-300/70 mt-1" />
        </div>

        {/* 5. The Floating Cards & Objects */}
        {/* Central Dominant Card: Coding Workstation Laptop */}
        <div
          ref={cardCenterRef}
          className="absolute top-[46vh] sm:top-[50vh] left-[50%] sm:left-[52%] -translate-x-1/2 w-[62vw] sm:w-[42vw] md:w-[32vw] max-w-[470px] aspect-[16/10] will-change-transform z-20 pointer-events-auto cursor-pointer"
          data-cursor-text="DEV"
        >
          <div
            className="card-center-float w-full h-full rounded-[1.5vw] sm:rounded-[0.6vw] overflow-hidden bg-neutral-900"
            style={{
              boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(0, 0, 0, 0.08)',
              transform: 'rotate(-3deg)'
            }}
          >
            <img
              src="/images/hero0.webp"
              alt="Developer engineering workstation"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Left Floating Card: Wireframe Sketching Blueprint */}
        <div
          ref={cardLeftRef}
          className="absolute top-[52vh] sm:top-[57vh] left-[5vw] sm:left-[15vw] md:left-[17vw] w-[30vw] sm:w-[21vw] md:w-[15.5vw] max-w-[230px] aspect-[16/11] will-change-transform z-20 pointer-events-auto cursor-pointer"
          data-cursor-text="DESIGN"
        >
          <div
            className="card-left-float w-full h-full rounded-[1.2vw] sm:rounded-[0.4vw] overflow-hidden bg-neutral-800"
            style={{
              boxShadow: '0 20px 45px -8px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.06)',
              transform: 'rotate(-12deg)'
            }}
          >
            <img
              src="/images/hero2.webp"
              alt="UI/UX wireframe sketching"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Right Floating Card: Night Skyscraper Skyline with Palm Trees */}
        <div
          ref={cardRightRef}
          className="absolute top-[60vh] sm:top-[68vh] right-[6vw] sm:right-[17vw] md:right-[19vw] w-[29vw] sm:w-[20vw] md:w-[15vw] max-w-[225px] aspect-[16/11] will-change-transform z-20 pointer-events-auto cursor-pointer"
          data-cursor-text="BUILD"
        >
          <div
            className="card-right-float w-full h-full rounded-[1.2vw] sm:rounded-[0.4vw] overflow-hidden bg-neutral-900"
            style={{
              boxShadow: '0 22px 48px -8px rgba(0, 0, 0, 0.36), 0 0 0 1px rgba(0, 0, 0, 0.06)',
              transform: 'rotate(10deg)'
            }}
          >
            <img
              src="/images/hero3.webp"
              alt="Night city architecture with palm trees"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Floating Realistic Red Pager Device (Clean without background) */}
        <div
          ref={pagerRef}
          className="absolute top-[43vh] sm:top-[46vh] right-[6vw] sm:right-[10vw] w-[20vw] sm:w-[13vw] md:w-[10vw] max-w-[150px] aspect-[4/3] will-change-transform z-25 pointer-events-auto select-none cursor-pointer"
          data-cursor-text="PAGER"
        >
          <div
            className="pager-float w-full h-full flex items-center justify-center"
            style={{
              filter: 'drop-shadow(0 15px 25px rgba(255, 51, 68, 0.32)) drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
              transform: 'rotate(14deg)'
            }}
          >
            <img
              src="/images/red_pager.png"
              alt="Retro Red Pager"
              className="w-full h-full object-contain pointer-events-none"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* 6. Bottom Row Composition (Fully Responsive for Mobile & Desktop) */}
      <footer className="w-full pb-4 sm:pb-[1.8vw] z-20">
        {/* Desktop Layout (sm:grid) */}
        <div className="hidden sm:grid grid-cols-12 items-end w-full">
          {/* Bottom Left: 3-line Description */}
          <div className="col-span-4 text-xs md:text-sm font-medium text-neutral-800 leading-[1.38] max-w-sm hero-editorial-item">
            Full-stack website developer, SEO specialist,
            <br />
            backend engineer and UI/UX designer building
            <br />
            high-performance digital systems that scale.
          </div>

          {/* Bottom Center: Pill Scroll Indicator with GSAP Magnetic Interaction */}
          <div className="col-span-4 flex items-center justify-center hero-editorial-item">
            <button
              ref={scrollBtnRef}
              type="button"
              onClick={scrollToAbout}
              onMouseMove={handleScrollBtnMouseMove}
              onMouseLeave={handleScrollBtnMouseLeave}
              className="px-4 py-1.5 rounded-full border border-neutral-300/80 hover:border-neutral-900 bg-white/70 backdrop-blur-xs transition-all duration-300 flex items-center gap-2 text-xs text-neutral-800 font-medium cursor-pointer hover:scale-105 active:scale-95 group shadow-2xs will-change-transform"
              data-cursor-text="EXPLORE"
            >
              <span>Scroll to explore</span>
            </button>
          </div>

          {/* Bottom Right: Portfolio Link with GSAP Elastic Arrow Button */}
          <div className="col-span-4 flex items-center justify-end gap-3 text-xs font-medium text-neutral-800 hero-editorial-item">
            <span className="text-neutral-400 font-medium">01.</span>
            <div className="w-8 sm:w-12 h-[1px] bg-neutral-300" />
            <button
              ref={portfolioBtnRef}
              type="button"
              onClick={() => navigateTo('#work', 'WORK')}
              onMouseEnter={handlePortfolioMouseEnter}
              onMouseLeave={handlePortfolioMouseLeave}
              className="hover:text-black flex items-center gap-2 cursor-pointer group"
              data-cursor-text="WORK"
            >
              <span>My Portfolio</span>
              <span
                ref={portfolioArrowRef}
                className="w-6 h-6 rounded-full bg-[#0e0e0e] text-white flex items-center justify-center text-xs transition-all shadow-xs will-change-transform"
              >
                →
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Layout (sm:hidden) */}
        <div className="flex sm:hidden flex-col gap-3 w-full">
          {/* Mobile Description */}
          <p className="text-[11px] font-medium text-neutral-800 leading-snug">
            Full-stack developer, SEO specialist, backend engineer &amp; UI/UX designer.
          </p>

          {/* Mobile Action Buttons Bar */}
          <div className="flex items-center justify-between w-full pt-1 border-t border-neutral-300/60">
            <button
              type="button"
              onClick={scrollToAbout}
              className="px-3.5 py-1.5 rounded-full border border-neutral-300 bg-white/80 flex items-center gap-1.5 text-[11px] font-semibold text-neutral-900 active:scale-95 transition-transform"
            >
              <span>Scroll to explore</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('#work', 'WORK')}
              className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-900 active:scale-95 transition-transform"
            >
              <span>Portfolio</span>
              <span className="w-5 h-5 rounded-full bg-[#0e0e0e] text-white flex items-center justify-center text-[10px]">
                →
              </span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
