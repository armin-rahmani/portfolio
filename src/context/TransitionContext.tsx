import React, { createContext, useContext, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface TransitionContextType {
  navigateTo: (target: string, label?: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  navigateTo: () => {},
  isTransitioning: false
});

export const usePageTransition = () => useContext(TransitionContext);

const TITLE_CHARS = ['a', 'r', 'm', 'i', 'n'];

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetLabel, setTargetLabel] = useState('EXPLORE');
  const curtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (target: string, label?: string) => {
    if (isTransitioning) return;

    const displayLabel = label || target.replace(/[#/]/g, '').toUpperCase() || 'HOME';
    setTargetLabel(displayLabel);
    setIsTransitioning(true);

    const curtain = curtainRef.current;
    if (!curtain) {
      if (target.startsWith('#')) {
        const el = document.getElementById(target.replace('#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(target);
      }
      setIsTransitioning(false);
      return;
    }

    // GSAP Cinematic Curtain Transition
    const tl = gsap.timeline();

    // 1. Reset position to bottom and make visible
    gsap.set(curtain, { yPercent: 100, display: 'flex' });
    gsap.set(textRef.current, { opacity: 0, y: 25 });
    gsap.set('.trans-char', { yPercent: 100, rotateX: 60, opacity: 0 });

    // 2. Curtain slides in from bottom completely covering the screen
    tl.to(curtain, {
      yPercent: 0,
      duration: 0.45,
      ease: 'power3.inOut'
    })
      // 3. Reveal destination label & wordmark
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out'
        },
        '-=0.15'
      )
      .to(
        '.trans-char',
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: 'power3.out'
        },
        '<'
      )
      // 4. Perform the actual navigation/scroll while page is 100% hidden behind curtain
      .add(() => {
        if (target.startsWith('#')) {
          const id = target.replace('#', '');
          if (location.pathname === '/') {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: 'instant' });
            }
          } else {
            navigate(`/${target}`);
          }
        } else {
          navigate(target);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      })
      .to({}, { duration: 0.18 }) // Brief pause for smooth feel
      // 5. Fade out text
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        ease: 'power2.in'
      })
      // 6. Curtain slides up and away revealing the destination cleanly
      .to(curtain, {
        yPercent: -100,
        duration: 0.55,
        ease: 'power4.inOut',
        onComplete: () => {
          gsap.set(curtain, { display: 'none', yPercent: 100 });
          setIsTransitioning(false);
        }
      }, '-=0.08');
  };

  return (
    <TransitionContext.Provider value={{ navigateTo, isTransitioning }}>
      {children}

      {/* Cinematic Transition Screen Curtain */}
      <div
        ref={curtainRef}
        style={{ display: 'none' }}
        className="fixed inset-0 z-[99998] bg-[#000000] text-primary flex flex-col justify-between p-[3vw] select-none pointer-events-auto overflow-hidden [perspective:1000px]"
      >
        {/* Top Meta */}
        <div className="flex items-center justify-between extraSmallText text-primary/70 border-b border-white/10 pb-[1.5vw]">
          <div className="flex items-center gap-[0.7vw]">
            <span className="w-[0.55vw] h-[0.55vw] min-w-[7px] min-h-[7px] bg-yellow rounded-full animate-ping" />
            <span className="font-mono uppercase tracking-widest text-[0.85rem] text-primary">
              ARMIN RAHMANI
            </span>
          </div>
          <div className="font-mono detailText text-primary/50 hidden sm:block tracking-wider">
            FULL-STACK • BACKEND • SEO • DESIGN
          </div>
          <div className="font-mono text-yellow font-semibold text-[0.95rem] tracking-wider uppercase">
            // {targetLabel}
          </div>
        </div>

        {/* Center Identity & Destination Indicator with Kinetic Typography */}
        <div ref={textRef} className="flex flex-col items-center justify-center my-auto text-center">
          <div className="overflow-hidden py-[0.5vw]">
            <h2 className="largeText font-normal tracking-tight leading-none text-primary flex items-center justify-center">
              {TITLE_CHARS.map((char, i) => (
                <span key={i} className="overflow-hidden inline-block" style={{ verticalAlign: 'top' }}>
                  <span className="trans-char inline-block will-change-transform [transform-style:preserve-3d]">
                    {char}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <div className="flex items-center gap-[0.8vw] mt-[1.5vw]">
            <span className="w-[0.45vw] h-[0.45vw] min-w-[6px] min-h-[6px] bg-yellow rounded-full" />
            <p className="extraSmallText text-primary/80 tracking-[0.2em] uppercase font-mono">
              DIRECTING TO {targetLabel}
            </p>
          </div>
          <div className="w-[18vw] min-w-[180px] h-[3px] bg-white/15 rounded-full mt-[2.5vw] overflow-hidden relative">
            <div className="w-full h-full bg-yellow shadow-[0_0_14px_#ff3344] animate-pulse" />
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="flex items-center justify-between detailText text-primary/50 border-t border-white/10 pt-[1.5vw] font-mono">
          <span className="tracking-wider">NO BLOATED CODE. JUST ARCHITECTURE THAT SCALES.</span>
          <span className="text-yellow tracking-wider">LOADING SECTION</span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
};
