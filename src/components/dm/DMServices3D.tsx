import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, Layers, TrendingUp, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const DMServices3D: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop Animation (> 1024px)
    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=1200',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Initially stacked closely together
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 0.98,
        transformOrigin: 'center center'
      });

      // Fan out cards with exact digitalmakers parameters:
      // Card 1: x: -13.75em, y: 2.125em, rotate: -5
      // Card 2: x: 0em, y: 0em, rotate: 2
      // Card 3: x: 13em, y: 4.5em, rotate: 6
      tl.to(
        card1Ref.current,
        {
          x: '-13.75em',
          y: '2.125em',
          rotate: -5,
          scale: 1,
          ease: 'power2.out'
        },
        0
      )
        .to(
          card2Ref.current,
          {
            x: '0em',
            y: '0em',
            rotate: 2,
            scale: 1.02,
            ease: 'power2.out'
          },
          0
        )
        .to(
          card3Ref.current,
          {
            x: '13em',
            y: '4.5em',
            rotate: 6,
            scale: 1,
            ease: 'power2.out'
          },
          0
        );
    });

    // Mobile & Tablet (< 1024px)
    mm.add('(max-width: 1023px)', () => {
      // Staggered vertical cards entrance
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
      cards.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, rotate: index % 2 === 0 ? -2 : 2 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%'
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="approach"
      className="relative bg-[#0E0E0E] text-white overflow-hidden border-t border-white/10"
    >
      <div ref={triggerRef} className="min-h-screen flex flex-col justify-center py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5363F6]/10 border border-[#5363F6]/30 text-xs font-semibold text-[#5363F6] uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our approach</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-3xl">
              How we make digital work
            </h2>

            <p className="mt-4 text-gray-400 max-w-xl text-base sm:text-lg font-light leading-relaxed">
              From foundational brand identity to custom Webflow engineering and continuous conversion growth.
            </p>
          </div>

          {/* 3D Stacking Cards Stage */}
          <div className="relative flex justify-center items-center min-h-[580px] lg:min-h-[660px] perspective-1000">
            {/* CARD 1: BRANDING (#5363F6 Blue) */}
            <div
              ref={card1Ref}
              className="lg:absolute w-full max-w-[380px] sm:max-w-[420px] rounded-3xl p-8 sm:p-10 bg-[#5363F6] text-white shadow-[0_25px_60px_rgba(83,99,246,0.35)] flex flex-col justify-between min-h-[500px] sm:min-h-[540px] z-10 preserve-3d will-change-transform mb-8 lg:mb-0"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/20 mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/80 font-bold">
                    01 / BRAND
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-4">
                  Shape an identity that commands attention
                </h3>

                <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-8 font-light">
                  Strategic brand positioning that cuts through noise and turns passive visitors into loyal advocates.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-white/90">
                  {[
                    'Brand Strategy & Positioning',
                    'Logo Systems & Typography',
                    'Design Systems & Figma UI Kits',
                    'Art Direction & Photography Guidelines'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F8CB47] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/20 flex items-center justify-between">
                <span className="text-xs font-mono text-white/70">Creative Strategy</span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Phase 01</span>
              </div>
            </div>

            {/* CARD 2: BUILDING (#F1EDE4 Ivory) */}
            <div
              ref={card2Ref}
              className="lg:absolute w-full max-w-[380px] sm:max-w-[420px] rounded-3xl p-8 sm:p-10 bg-[#F1EDE4] text-[#0E0E0E] shadow-[0_30px_70px_rgba(0,0,0,0.45)] flex flex-col justify-between min-h-[500px] sm:min-h-[540px] z-20 preserve-3d will-change-transform mb-8 lg:mb-0"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-black/10 mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-black/60 font-bold">
                    02 / BUILD
                  </span>
                  <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center">
                    <Layers className="w-4 h-4 text-black" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-4 text-[#0E0E0E]">
                  Bespoke Webflow sites & GSAP motion
                </h3>

                <p className="text-black/75 text-sm sm:text-base leading-relaxed mb-8 font-light">
                  Clean semantic code and 60fps animations engineered for blistering performance and effortless CMS control.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-black/85">
                  {[
                    'Certified Webflow Architecture',
                    'GSAP 3 Animation & ScrollTrigger',
                    'Custom JavaScript & API Integrations',
                    'PageSpeed 95+ & WCAG AAA Accessibility'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#5363F6] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-black/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/dm/webflow-certified-partner-badge-dm.svg"
                    alt="Webflow Certified Partner"
                    className="h-4 w-auto"
                  />
                  <span className="text-xs font-mono text-black/60">Certified Partner</span>
                </div>
                <span className="text-xs font-bold text-black uppercase tracking-wider">Phase 02</span>
              </div>
            </div>

            {/* CARD 3: BOOSTING (#1A1A1A Deep Carbon) */}
            <div
              ref={card3Ref}
              className="lg:absolute w-full max-w-[380px] sm:max-w-[420px] rounded-3xl p-8 sm:p-10 bg-[#1A1A1A] text-white border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-[500px] sm:min-h-[540px] z-30 preserve-3d will-change-transform"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-400 font-bold">
                    03 / BOOST
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[#F8CB47]" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-4">
                  Scale traffic and conversion with precision
                </h3>

                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 font-light">
                  Continuous data-driven optimization, technical SEO dominance, and high-converting marketing funnels.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
                  {[
                    'Technical SEO Audits & Structured Data',
                    'Conversion Rate Optimization (CRO)',
                    'GA4 & Tag Manager Event Tracking',
                    'Continuous Growth & Iteration Sprints'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">Continuous Growth</span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Phase 03</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
