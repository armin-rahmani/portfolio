import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  onReadStory?: () => void;
}

export const CelestiqueAbout: React.FC<AboutProps> = ({ onReadStory }) => {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Heading reveal on scroll
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Text stagger reveal
      if (textRef.current?.children) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Arched image scale & reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95, y: 35 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-[#F5F2EB] text-[#1C1917] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 border-t border-[#1C1917]/8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Giant Watermark Heading (Exact Reference Match) */}
        <div ref={headingRef} className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span className="font-tenor text-xs tracking-[0.25em] text-[#1C1917]/60 uppercase">
              OUR ATELIER HERITAGE
            </span>
          </div>

          <h2 className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] text-[#1C1917]/80 uppercase">
            ABOUT <br />
            <span className="text-[#1C1917]/35 italic">US</span>
          </h2>
        </div>

        {/* Two-Column Grid Matching Reference Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Detailed Philosophy & Story */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col gap-6 text-left">
            <p className="font-editorial text-xl sm:text-2xl lg:text-3xl leading-snug text-[#1C1917] font-normal">
              No matter the occasion, whether a grand celebration or an intimate everyday moment, our collections are thoughtfully curated. Every design is crafted using centuries-old artisanal traditions combined with contemporary silhouettes that make you feel truly extraordinary.
            </p>

            <div className="h-px w-24 bg-[#C5A059] my-1" />

            <p className="text-sm sm:text-base text-[#1C1917]/70 font-sans leading-relaxed">
              Our artisanal ateliers in Florence & Geneva work solely with 100% recycled 18k solid gold, conflict-free certified diamonds, and hand-selected natural pearls. Each creation undergoes over 40 hours of master lapidary finishing, ensuring a luminous luster designed to endure across generations.
            </p>

            <p className="text-sm sm:text-base text-[#1C1917]/70 font-sans leading-relaxed">
              Whether you're celebrating love, marking an enduring personal milestone, or elevating your everyday elegance, we invite you to explore our celestial creations and discover fine jewelry designed to harmonize with your soul.
            </p>

            <div className="pt-4">
              <button
                onClick={onReadStory}
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1C1917] text-[#F7F4EE] hover:bg-[#C5A059] hover:text-[#1C1917] transition-all duration-300 text-xs font-tenor tracking-[0.2em] uppercase shadow-xs cursor-pointer"
              >
                <span>READ OUR STORY</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Statement & Arched Portrait (Exact Reference Match) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Top Statement Block */}
            <div className="bg-[#EFEAE0] p-6 sm:p-8 rounded-2xl border border-[#1C1917]/5 shadow-2xs">
              <p className="font-editorial italic text-base sm:text-lg text-[#1C1917]/85 leading-relaxed">
                "At Celestique, we believe that jewelry is more than an accessory—it's a moment, an emotion, and a testament of timeless elegance. We craft pieces that honor your personal journey."
              </p>
              <div className="mt-4 flex items-center justify-between text-xs font-tenor text-[#1C1917]/60 uppercase tracking-widest">
                <span>GENEVA • FLORENCE</span>
                <span className="text-[#C5A059] font-medium">EST. 2025</span>
              </div>
            </div>

            {/* Arched Architectural Photo */}
            <div
              ref={imageRef}
              className="relative w-full aspect-[4/5] rounded-t-[140px] sm:rounded-t-[180px] rounded-b-2xl overflow-hidden shadow-lg border border-[#1C1917]/10 group"
            >
              <img
                src="/images/celestique/about_models.webp"
                alt="Celestique Fine Jewelry Atelier Models"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Floating Certification Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl border border-black/5 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-tenor uppercase tracking-wider text-[#1C1917]">
                    Ethical Artisanal Craft
                  </span>
                </div>
                <span className="text-[10px] font-tenor uppercase text-[#1C1917]/50 tracking-widest">
                  100% Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
