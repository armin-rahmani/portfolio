import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useContactModal } from '../context/ContactModalContext';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card3DRef = useRef<HTMLDivElement>(null);
  const { openContactModal } = useContactModal();

  useGSAP(() => {
    // 1. Manifesto text reveal on scroll
    gsap.from('.about-manifesto-text', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 0.8
      },
      y: 40,
      opacity: 0.2,
      ease: 'none'
    });

    // 2. Parallax 3D tilt on the camera card
    gsap.to(card3DRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.2
      },
      rotateX: -8,
      rotateY: 6,
      y: -30,
      ease: 'none'
    });

    // 3. Staggered reveal of the 3 pillars
    gsap.from('.about-pillar-row', {
      scrollTrigger: {
        trigger: '.about-pillars-container',
        start: 'top 75%'
      },
      y: 45,
      opacity: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <div
      id="about"
      ref={containerRef}
      data-nav-color="primary"
      className="w-full h-fit bg-secondary text-primary pb-[8vw] sm:pb-[calc(3vw+15svh)] relative overflow-hidden"
    >
      {/* Top Manifesto Row */}
      <div className="layout-grid w-full pt-[6vw] sm:pt-[3vw]">
        <h2 className="about-manifesto-text z-0 col-span-full sm:col-span-6 mediumText font-light tracking-tight leading-[1.12]">
          Armin Rahmani is a full-stack digital architect and developer building high-performance web applications, scalable backends, search engine optimization (SEO), and bespoke UI/UX designs. No bloated code. Just engineering that scales and converts.
        </h2>
      </div>

      {/* Main Divider Line */}
      <div className="w-full layout-grid">
        <div className="w-full border-t border-primary/10 col-span-full mt-[10vw] mb-[6vw] sm:mt-[5.5vw] sm:mb-[3vw]" />

        {/* Left Column: Yellow Badge + Floating Visual Card */}
        <div className="col-span-full sm:col-span-6 relative self-stretch flex flex-col sm:mb-[3vw]">
          {/* Section Header */}
          <div className="flex items-baseline gap-[0.8vw] mb-[3vw]">
            <h2 className="mediumText text-primary font-medium tracking-tight">
              working with me <span className="text-primary/40 font-normal ml-[0.5vw] hidden sm:inline-block">about</span>
            </h2>
          </div>

          {/* Floating 3D Production Visual Card */}
          <div className="relative w-full sm:flex-1 sm:min-h-[16vw] [perspective:800px]">
            <div
              ref={card3DRef}
              className="w-full sm:w-[24vw] h-[48vw] sm:h-[18vw] rounded-[0.5vw] sm:rounded-[0.25vw] overflow-hidden shadow-2xl bg-secondary/80 border border-primary/10 [transform-style:preserve-3d] will-change-transform"
            >
              <img
                src="/images/camera.webp"
                alt="Digital architecture and developer equipment"
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Right Column: 3 Pillars & Action Button */}
        <div className="about-pillars-container col-span-full sm:col-span-6 flex flex-col gap-[8vw] sm:gap-[4vw] mt-[8vw] sm:mt-0">
          {/* Pillar 1 */}
          <div className="about-pillar-row flex flex-col gap-[2vw] sm:gap-[1vw]">
            <h3 className="mediumText font-normal">Full-Stack & Backend</h3>
            <p className="smallText text-primary/70 leading-[1.38] max-w-[95%]">
              From resilient database schemas and high-throughput REST/GraphQL APIs to reactive frontends built with React, Next.js, and TypeScript. Architecture engineered for performance, security, and effortless scalability.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="about-pillar-row flex flex-col gap-[2vw] sm:gap-[1vw]">
            <h3 className="mediumText font-normal">SEO & Growth Engine</h3>
            <p className="smallText text-primary/70 leading-[1.38] max-w-[95%]">
              Search engine dominance built into the core code. Technical SEO, semantic HTML structure, schema markup, and sub-second Core Web Vitals that rank #1 on Google and turn organic traffic into high-value conversions.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="about-pillar-row flex flex-col gap-[2vw] sm:gap-[1vw]">
            <h3 className="mediumText font-normal">UI/UX & Interactive Design</h3>
            <p className="smallText text-primary/70 leading-[1.38] max-w-[95%]">
              Every interface is crafted with mathematical precision, accessible design tokens, and fluid GSAP micro-interactions that captivate users, retain attention, and establish unmistakable brand authority.
            </p>
          </div>

          {/* Talk to me Button */}
          <div className="pt-[2vw]">
            <button
              type="button"
              onClick={openContactModal}
              className="main-btn smallText cursor-pointer"
              aria-label="Talk to me"
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
      </div>
    </div>
  );
};
