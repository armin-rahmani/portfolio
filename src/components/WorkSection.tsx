import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS, CLIENT_LOGOS, Project } from '../data/sidejobData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useContactModal } from '../context/ContactModalContext';
import { useShowcaseModal } from '../context/ShowcaseModalContext';

gsap.registerPlugin(ScrollTrigger);

export const WorkSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevArrowRef = useRef<HTMLSpanElement>(null);
  const nextArrowRef = useRef<HTMLSpanElement>(null);
  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);

  const { openContactModal } = useContactModal();
  const { openShowcase } = useShowcaseModal();

  // quickTo helpers for magnetic button pull and active card 3D tilt
  const quickToMap = useRef<{
    prevX?: (val: number) => void;
    prevY?: (val: number) => void;
    nextX?: (val: number) => void;
    nextY?: (val: number) => void;
  }>({});

  const total = PROJECTS.length;

  const handleNext = useCallback(() => {
    setActiveCardIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveCardIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation when in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  // 3D Coverflow Animation Engine with GSAP
  useGSAP(() => {
    // Magnetic button quickTo setup
    if (prevBtnRef.current) {
      quickToMap.current.prevX = gsap.quickTo(prevBtnRef.current, 'x', { duration: 0.35, ease: 'power2.out' });
      quickToMap.current.prevY = gsap.quickTo(prevBtnRef.current, 'y', { duration: 0.35, ease: 'power2.out' });
    }
    if (nextBtnRef.current) {
      quickToMap.current.nextX = gsap.quickTo(nextBtnRef.current, 'x', { duration: 0.35, ease: 'power2.out' });
      quickToMap.current.nextY = gsap.quickTo(nextBtnRef.current, 'y', { duration: 0.35, ease: 'power2.out' });
    }

    // ScrollTrigger entrance for work section typography & content
    gsap.from('.work-content-anim', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%'
      },
      y: 45,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  // GSAP 3D Stage positioning on active index change
  useGSAP(() => {
    const isMobile = window.innerWidth <= 640;
    const isTablet = window.innerWidth > 640 && window.innerWidth <= 1024;

    cardsRef.current.forEach((cardEl, idx) => {
      if (!cardEl) return;

      // Calculate circular offset distance
      let offset = idx - activeCardIndex;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const isCenter = offset === 0;
      const absOffset = Math.abs(offset);

      // Responsive spatial calculations
      const xSpacing = isMobile ? 86 : (isTablet ? 42 : 35);
      const xPos = offset * xSpacing;
      const zPos = isCenter ? (isMobile ? 30 : 70) : -180 * absOffset;
      const rotY = offset * (isMobile ? -10 : -22);
      const rotZ = offset * 1.5;
      const scale = isCenter ? 1 : (isMobile ? 0.88 : 0.85);
      const opacity = isCenter ? 1 : (absOffset === 1 ? (isMobile ? 0.35 : 0.5) : 0);
      const zIndex = 30 - absOffset * 6;

      gsap.to(cardEl, {
        xPercent: xPos,
        z: zPos,
        rotateY: rotY,
        rotateZ: rotZ,
        scale,
        opacity,
        duration: 0.75,
        ease: 'power3.out',
        overwrite: 'auto'
      });

      cardEl.style.zIndex = String(zIndex);
      cardEl.style.pointerEvents = absOffset <= 1 ? 'auto' : 'none';
    });

    // Animate active index counter and progress bar with GSAP
    gsap.fromTo(
      '.work-counter-num',
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)' }
    );

    gsap.to('.work-progress-fill', {
      scaleX: (activeCardIndex + 1) / total,
      duration: 0.45,
      ease: 'power2.out'
    });
  }, { scope: stageRef, dependencies: [activeCardIndex, total] });

  // 3D Active Card Mouse Parallax
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) return;
    const activeEl = cardsRef.current[activeCardIndex];
    if (!activeEl) return;

    const rect = activeEl.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    gsap.to(activeEl, {
      rotateY: x * 6,
      rotateX: -y * 6,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleStageMouseLeave = () => {
    const activeEl = cardsRef.current[activeCardIndex];
    if (!activeEl) return;
    gsap.to(activeEl, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  // Button Magnetic Handlers (GSAP Powered)
  const handlePrevMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    quickToMap.current.prevX?.(x * 0.28);
    quickToMap.current.prevY?.(y * 0.28);
    if (prevArrowRef.current) {
      gsap.to(prevArrowRef.current, { x: -3, duration: 0.25, ease: 'power2.out' });
    }
  };

  const handlePrevMouseLeave = () => {
    quickToMap.current.prevX?.(0);
    quickToMap.current.prevY?.(0);
    if (prevArrowRef.current) {
      gsap.to(prevArrowRef.current, { x: 0, duration: 0.4, ease: 'power2.out' });
    }
  };

  const handleNextMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    quickToMap.current.nextX?.(x * 0.28);
    quickToMap.current.nextY?.(y * 0.28);
    if (nextArrowRef.current) {
      gsap.to(nextArrowRef.current, { x: 3, duration: 0.25, ease: 'power2.out' });
    }
  };

  const handleNextMouseLeave = () => {
    quickToMap.current.nextX?.(0);
    quickToMap.current.nextY?.(0);
    if (nextArrowRef.current) {
      gsap.to(nextArrowRef.current, { x: 0, duration: 0.4, ease: 'power2.out' });
    }
  };

  return (
    <div
      id="work"
      ref={containerRef}
      data-nav-color="primary"
      className="w-full relative bg-secondary text-primary pt-[14vw] sm:pt-[7vw] pb-[8vw] select-none overflow-hidden scroll-mt-24 sm:scroll-mt-32"
    >
      {/* 1. Header Row - Clean Apple/Sidejob Editorial Style (No red dots) */}
      <div className="layout-grid w-full mb-[3vw] items-baseline">
        <div className="work-content-anim col-span-full sm:col-span-6 flex items-baseline gap-[0.8vw]">
          <h2 className="mediumText text-primary font-medium tracking-tight">
            selected projects <span className="text-primary/40 font-normal">work</span>
          </h2>
        </div>

        <div className="work-content-anim col-span-full sm:col-span-6 flex items-center sm:justify-end mt-3 sm:mt-0">
          <span className="detailText uppercase tracking-widest text-primary/40 font-medium">
            Portfolio Stage
          </span>
        </div>
      </div>

      {/* 2. 3D GSAP Stage / Coverflow */}
      <div
        ref={stageRef}
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="work-carousel relative z-10 w-full h-[65vw] sm:h-[34vw] md:h-[28vw] max-h-[520px] [perspective:1400px] my-[2vw] flex items-center justify-center pointer-events-auto"
        role="region"
        aria-label="Portfolio Project Carousel"
      >
        <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
          {PROJECTS.map((proj: Project, idx: number) => {
            const isCenter = idx === activeCardIndex;

            return (
              <div
                key={proj.title}
                ref={(el) => { cardsRef.current[idx] = el; }}
                onClick={() => {
                  if (isCenter) {
                    if (proj.liveUrl) {
                      navigate(proj.liveUrl);
                    } else {
                      openShowcase(proj);
                    }
                  } else {
                    setActiveCardIndex(idx);
                  }
                }}
                data-cursor-text={isCenter ? 'OPEN' : 'SELECT'}
                className={`work-slide-card absolute w-[82vw] sm:w-[48vw] md:w-[38vw] max-w-[580px] h-full rounded-[1.2vw] sm:rounded-[0.6vw] overflow-hidden will-change-transform [transform-style:preserve-3d] cursor-pointer transition-[border-color,box-shadow] duration-500 bg-neutral-900 border ${
                  isCenter
                    ? 'border-white/30 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.85)]'
                    : 'border-white/10 hover:border-white/20 shadow-2xl'
                }`}
              >
                {/* Project Image - Pure Single Image, No Text Overlay */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="eager"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2.5 Active Project Metadata & Armin Rahmani Signature */}
      <div className="layout-grid w-full mt-[2vw] mb-[1.5vw] items-center">
        <div className="col-span-12 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-primary border-b border-white/10 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white">
              {PROJECTS[activeCardIndex].title}
            </h3>
            <span className="text-xs sm:text-sm text-primary/60 font-normal">
              {PROJECTS[activeCardIndex].category}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/90 font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Designed & Engineered by Armin Rahmani</span>
          </div>
        </div>
      </div>

      {/* 3. Website Signature Controls: Frosted Pill Buttons + Brand .main-btn (GSAP Animated) */}
      <div className="layout-grid w-full mt-[2.5vw] mb-[4vw] items-center">
        {/* Left: Project Index Counter & Progress Track */}
        <div className="col-span-12 sm:col-span-6 flex items-center gap-4">
          <div className="flex items-baseline gap-1.5">
            <span className="work-counter-num text-2xl sm:text-3xl font-medium tracking-tight text-primary">
              0{activeCardIndex + 1}
            </span>
            <span className="smallText text-primary/40 font-normal">
              / 0{total}
            </span>
          </div>

          {/* Progress Hairline Track */}
          <div className="w-24 sm:w-36 h-[2px] bg-white/15 relative overflow-hidden rounded-full">
            <div
              className="work-progress-fill absolute inset-y-0 left-0 w-full bg-white origin-left will-change-transform"
              style={{ transform: `scaleX(${(activeCardIndex + 1) / total})` }}
            />
          </div>

          {/* Minimal Apple-Style Indicator Bars (Clean, no red dots) */}
          <div className="flex items-center gap-1.5">
            {PROJECTS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setActiveCardIndex(dotIdx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  dotIdx === activeCardIndex
                    ? 'w-6 h-1 bg-white'
                    : 'w-2 h-1 bg-white/25 hover:bg-white/60'
                }`}
                aria-label={`Jump to project ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Frosted Capsule Buttons & Signature .main-btn (Website Style, Color, Shape) */}
        <div className="col-span-12 sm:col-span-6 flex flex-wrap items-center justify-start sm:justify-end gap-2 sm:gap-3 mt-4 sm:mt-0">
          {/* Previous Capsule Button */}
          <button
            ref={prevBtnRef}
            type="button"
            onClick={handlePrev}
            onMouseMove={handlePrevMouseMove}
            onMouseLeave={handlePrevMouseLeave}
            className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 text-primary text-xs sm:text-sm font-medium backdrop-blur-xl flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all duration-300 active:scale-95 will-change-transform group"
            aria-label="Previous project"
            data-cursor-text="PREV"
          >
            <span
              ref={prevArrowRef}
              className="text-xs sm:text-base leading-none will-change-transform transition-transform"
            >
              ←
            </span>
            <span>Previous</span>
          </button>

          {/* Next Capsule Button */}
          <button
            ref={nextBtnRef}
            type="button"
            onClick={handleNext}
            onMouseMove={handleNextMouseMove}
            onMouseLeave={handleNextMouseLeave}
            className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 text-primary text-xs sm:text-sm font-medium backdrop-blur-xl flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all duration-300 active:scale-95 will-change-transform group"
            aria-label="Next project"
            data-cursor-text="NEXT"
          >
            <span>Next</span>
            <span
              ref={nextArrowRef}
              className="text-xs sm:text-base leading-none will-change-transform transition-transform"
            >
              →
            </span>
          </button>

          {/* Live Demo or Live Site Capsule Button */}
          {PROJECTS[activeCardIndex].liveUrl ? (
            <button
              type="button"
              onClick={() => navigate(PROJECTS[activeCardIndex].liveUrl!)}
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full border border-emerald-400/40 hover:border-emerald-300 bg-emerald-500/20 hover:bg-emerald-400 text-emerald-100 hover:text-black text-xs sm:text-sm font-semibold backdrop-blur-xl flex items-center gap-1.5 cursor-pointer transition-all duration-300 active:scale-95 will-change-transform group shadow-md"
              aria-label={`Open Full ${PROJECTS[activeCardIndex].title}`}
              data-cursor-text="VISIT"
            >
              <span>
                {PROJECTS[activeCardIndex].id === 'celestique'
                  ? 'Explore Celestique'
                  : PROJECTS[activeCardIndex].id === 'sohub'
                  ? 'Explore Raya Studio'
                  : 'Open Live Site'}
              </span>
              <span className="text-[10px] sm:text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => openShowcase(PROJECTS[activeCardIndex])}
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/20 hover:border-white/50 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium backdrop-blur-xl flex items-center gap-1.5 cursor-pointer transition-all duration-300 active:scale-95 will-change-transform group shadow-sm"
              aria-label="Open GSAP Showcase Demo"
              data-cursor-text="DEMO"
            >
              <span>Live Demo</span>
              <span className="text-[10px] sm:text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </button>
          )}

          {/* Website Signature .main-btn (Talk to me) */}
          <button
            type="button"
            onClick={openContactModal}
            className="main-btn extraSmallText sm:smallText ml-0.5 cursor-pointer"
            aria-label="Talk to me"
            data-cursor-text="TALK"
          >
            <span className="main-btn__icon" aria-hidden="true" />
            <span className="main-btn__label">
              <span className="main-btn__clip">
                <span className="main-btn__from">Talk to me</span>
                <span className="main-btn__to" aria-hidden="true">Talk to me</span>
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* 4. Client Collaboration Logos & Narrative Text Grid */}
      <div className="layout-grid w-full mt-[5vw]">
        {/* Left Column: Client Logos Grid */}
        <div className="work-content-anim col-span-full sm:col-span-7 flex flex-col justify-between mb-[8vw] sm:mb-0">
          <div>
            <span className="detailText uppercase tracking-widest text-primary/40 font-medium block mb-[2vw]">
              Select Tech Stacks & Brand Collaborations
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-[2vw] items-center">
              {CLIENT_LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  className="w-full aspect-square flex items-center justify-center p-[0.5vw] opacity-45 hover:opacity-100 transition-opacity cursor-default"
                  title={logo.name}
                >
                  <img
                    src={logo.file}
                    alt={logo.name}
                    className="w-full h-full object-contain invert"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Editorial Paragraphs (Apple Clean Typography) */}
        <div className="work-content-anim col-span-full sm:col-span-5">
          <div className="flex flex-col gap-[2.5vw] text-primary leading-[1.45]">
            <p className="smallText text-primary font-normal">
              A selection of recent digital products, high-traffic web applications, and scalable backend architectures engineered with precision.
            </p>
            <p className="extraSmallText text-primary/75">
              Every project begins with clean architecture and search engine viability. Whether architecting high-concurrency backend microservices or crafting reactive Next.js interfaces with GSAP motion, the focus is always on speed, security, and measurable conversion.
            </p>
            <p className="extraSmallText text-primary/75">
              No bloated dependencies, no fragile workarounds. Full-stack development means owning the entire lifecycle: database schemas, cloud infrastructure, accessibility compliance, and organic SEO indexing that ranks #1.
            </p>
            <p className="extraSmallText text-primary/75">
              Modern web experiences must feel instant. By combining aggressive server-side caching, sub-second TTFB, and fluid GSAP transitions, every user interaction becomes an engaging, memorable brand experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
