import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { RAYA_SERVICES } from '../../data/rayaData';

gsap.registerPlugin(ScrollTrigger);

export const SohubServices: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stackCardsRef = useRef<HTMLDivElement>(null);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);

  // ScrollTrigger Stacking & Switcher Pinning with Depth
  useGSAP(() => {
    // 1. Heading Fade/Slide in
    gsap.fromTo(
      '.serv-heading-anim',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.home-services',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 2. Desktop Card Stacking with ScrollTrigger Pinning
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop && stackCardsRef.current) {
      const cards = gsap.utils.toArray<HTMLElement>('.service-stack-card');
      if (cards.length > 1) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stackCardsRef.current,
            start: 'top 15%',
            end: () => `+=${cards.length * 600}`,
            pin: true,
            scrub: 0.8,
            onUpdate: (self) => {
              const idx = Math.min(
                cards.length - 1,
                Math.floor(self.progress * cards.length)
              );
              setActiveServiceIdx(idx);
            }
          }
        });

        cards.forEach((card, index) => {
          if (index === 0) return;
          tl.fromTo(
            card,
            { yPercent: 110, scale: 0.94, opacity: 0.8 },
            { yPercent: 0, scale: 1, opacity: 1, duration: 1, ease: 'power2.out' },
            `card-${index}`
          );
        });
      }
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      dir="rtl"
      className="home-services relative z-[10] bg-[#FBFBFB] flex flex-col px-4 sm:px-8 lg:px-12 xl:px-20 pt-16 lg:pt-24 pb-20 lg:pb-36 scroll-mt-24 sm:scroll-mt-32 font-vazir"
    >
      {/* Subheading & Editorial Statement */}
      <div className="flex flex-col gap-3 sm:gap-5 lg:gap-6 max-w-5xl mb-8 sm:mb-14">
        <div className="serv-heading-anim flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black inline-block" />
          <h2 className="text-xs sm:text-sm lg:text-base text-[#7F8790] font-bold uppercase tracking-widest">
            حوزه‌های تخصصی و خدمات
          </h2>
        </div>
        <p className="serv-heading-anim text-[#0C1016] leading-[1.2] font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight">
          ما یک استودیو دیزاین تعاملی هستیم که با تمرکز بر{' '}
          <span className="text-neutral-500">
            خلق تجربیات دیجیتال چشم‌نواز
          </span>{' '}
          ایده‌ها را به ارزش‌های واقعی کسب‌وکار بدل می‌سازیم.
        </p>
      </div>

      {/* Desktop Capability Switcher Bar */}
      <div className="hidden lg:flex items-center gap-4 mb-8 pb-4 border-b border-black/10 select-none">
        {RAYA_SERVICES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveServiceIdx(idx)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeServiceIdx === idx
                ? 'bg-black text-white shadow-md scale-105'
                : 'bg-black/5 text-black/70 hover:bg-black/10'
            }`}
          >
            <span className="text-xs font-mono opacity-60">{s.number}</span>
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* Stacked Cards Container */}
      <div
        ref={stackCardsRef}
        className="relative w-full min-h-[480px] lg:h-[580px] flex flex-col lg:block"
      >
        {RAYA_SERVICES.map((service, index) => (
          <div
            key={service.id}
            style={{
              backgroundColor: service.bgColor,
              color: service.textColor,
              zIndex: index + 1
            }}
            className="service-stack-card relative lg:absolute inset-0 w-full rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 shadow-2xl flex flex-col justify-between mb-6 lg:mb-0 border border-white/10 will-change-transform"
          >
            {/* Top Row: Service Number & English Tag */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="text-2xl sm:text-4xl font-mono font-bold tracking-tight text-white/50">
                {service.number}
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/60 font-mono">
                {service.titleEn}
              </span>
            </div>

            {/* Middle: Title & Comprehensive Description */}
            <div className="flex flex-col gap-4 max-w-3xl my-auto">
              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                {service.title}
              </h3>
              <p className="text-sm sm:text-lg lg:text-xl text-white/85 leading-relaxed font-medium">
                {service.description}
              </p>
            </div>

            {/* Bottom: Tags Pills */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2 sm:gap-3">
              {service.tags.map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm text-white/90 border border-white/10 select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
