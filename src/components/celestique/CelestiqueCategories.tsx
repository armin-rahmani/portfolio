import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CATEGORY_SHOWCASE } from '../../data/celestiqueData';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CelestiqueCategories: React.FC<CategoriesProps> = ({
  onSelectCategory,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Title reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2x2 Category Cards Stagger Reveal
      if (gridRef.current?.children) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="categories"
      ref={containerRef}
      className="relative bg-[#EFECE6] text-[#1C1917] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 border-t border-[#1C1917]/8 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Giant Watermark Heading (Exact Reference Match) */}
        <div ref={titleRef} className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span className="font-tenor text-xs tracking-[0.25em] text-[#1C1917]/60 uppercase">
              CURATED SILHOUETTES
            </span>
          </div>

          <h2 className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] text-[#1C1917]/80 uppercase">
            OUR <br />
            <span className="text-[#1C1917]/35 italic">PRODUCTS</span>
          </h2>
        </div>

        {/* 2x2 Grid Matching Reference */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {CATEGORY_SHOWCASE.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group cursor-pointer flex flex-col bg-[#F7F4EE] rounded-3xl overflow-hidden border border-[#1C1917]/8 shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Category Header Label with Arrow (Exact Reference Match) */}
              <div className="p-6 sm:p-8 flex items-center justify-between border-b border-[#1C1917]/6">
                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] tracking-wider uppercase group-hover:text-[#C5A059] transition-colors">
                    {cat.title} →
                  </h3>
                  <p className="font-tenor text-xs tracking-widest text-[#1C1917]/50 uppercase mt-1">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1C1917] group-hover:bg-[#1C1917] group-hover:text-white transition-all duration-300 shadow-2xs">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Stone Pedestal Product Showcase Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE7DE]">
                <img
                  src={cat.image}
                  alt={`Celestique ${cat.title}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  loading="lazy"
                />

                {/* Subtle Luxury Corner Tag */}
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/5 text-[11px] font-tenor uppercase tracking-widest text-[#1C1917]">
                  {cat.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
