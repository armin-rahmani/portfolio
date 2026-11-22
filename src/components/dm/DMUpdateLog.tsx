import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export const DMUpdateLog: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updates = [
    {
      id: 'certified',
      tag: 'Milestone',
      date: 'Jan 2025',
      title: 'Certified Webflow Partner',
      desc: 'Officially recognized as a Webflow Professional Partner for high-complexity enterprise builds.',
      image: '/images/dm/6ad2017149ad18447745d704_6ad200ebcff227f3667db89f_dm-update-v3-certified.webp'
    },
    {
      id: 'kantoor',
      tag: 'Studio',
      date: 'Nov 2024',
      title: 'New Studio in Rotterdam',
      desc: 'Expanded into our dedicated creative studio designed for collaborative sprints and client workshops.',
      image: '/images/dm/6ad200ecf617cd967e98a8b1_dm-update-v3-kantoor.webp'
    },
    {
      id: 'site-v3',
      tag: 'Launch',
      date: 'Sep 2024',
      title: 'Website v3 with GSAP',
      desc: 'Re-engineered from the ground up with 60fps kinetic motion, 3D card fan-outs, and buttery smooth Lenis scroll.',
      image: '/images/dm/6ad200ed36b229a1f4ba57dc_dm-update-v3-site-v2.webp'
    },
    {
      id: 'bowi',
      tag: 'Client',
      date: 'Jul 2024',
      title: 'Bowi AI Conversion Engine',
      desc: 'Architected and launched the high-converting SaaS portal for the Bowi AI sales assistant platform.',
      image: '/images/dm/6ad200eb9dcc40323845c9b6_dm-update-v3-bowi.webp'
    },
    {
      id: 'photo',
      tag: 'Media',
      date: 'May 2024',
      title: 'In-house Photography Space',
      desc: 'Integrated specialized editorial lighting and camera setup for custom client brand imagery.',
      image: '/images/dm/6ad200ec8c54c67e5c67e595_dm-update-v3-photo-space.webp'
    },
    {
      id: 'rentabus-scale',
      tag: 'Case Study',
      date: 'Mar 2024',
      title: 'Rentabus Across 12 Countries',
      desc: 'Scaled European transit booking infrastructure processing thousands of route requests daily.',
      image: '/images/dm/6ad200ecfa16432d064d7e80_dm-update-v3-rentabus.webp'
    },
    {
      id: 'forta-multi',
      tag: 'Healthcare',
      date: 'Jan 2024',
      title: 'Forta 40+ Multisite Rollout',
      desc: 'Successfully launched 40 regional healthcare practice platforms with strict privacy compliance.',
      image: '/images/dm/6ad200ebb1ab6c131987f5c0_dm-update-v3-forta-sites.webp'
    },
    {
      id: 'merch',
      tag: 'Brand',
      date: 'Oct 2023',
      title: 'Studio Merch & Apparel',
      desc: 'Custom embroidered studio apparel crafted for team members, clients, and partners.',
      image: '/images/dm/6ad200ec9965a6a4a45fd4d6_dm-update-v3-merch.webp'
    }
  ];

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((track.scrollLeft / maxScroll) * 100);
    }
  };

  const slide = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const scrollAmount = 380 * direction;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Subtle 3D Card Tilt on hover
  useGSAP(() => {
    const cards = containerRef.current?.querySelectorAll('.update-card');
    cards?.forEach((card) => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
        const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 8,
          rotateX: -y * 8,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="updates"
      className="py-24 sm:py-32 md:py-40 bg-[#0E0E0E] text-white border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F8CB47]" />
            <span>Milestones & Timeline</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
            Update Log
          </h2>
        </div>

        {/* Navigation Buttons and Progress */}
        <div className="flex items-center gap-4">
          <div className="w-24 sm:w-32 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#5363F6] rounded-full transition-all duration-300"
              style={{ width: `${Math.max(10, scrollProgress)}%` }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => slide(-1)}
              className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center text-white transition-all hover:bg-white/10 active:scale-95"
              aria-label="Previous updates"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => slide(1)}
              className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center text-white transition-all hover:bg-white/10 active:scale-95"
              aria-label="Next updates"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Draggable / Swipeable Track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-8 scrollbar-none select-none scroll-smooth perspective-1000"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {updates.map((item) => (
          <div
            key={item.id}
            className="update-card shrink-0 w-[290px] sm:w-[340px] md:w-[380px] rounded-3xl bg-[#151515] border border-white/10 overflow-hidden flex flex-col justify-between shadow-xl transition-shadow duration-300 hover:shadow-2xl hover:border-white/20 preserve-3d cursor-grab active:cursor-grabbing"
          >
            {/* Card Image */}
            <div className="relative h-[220px] sm:h-[250px] w-full overflow-hidden bg-black/40">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover filter brightness-95"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-white/90 border border-white/10">
                  {item.tag}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-[#F8CB47] border border-white/10">
                  {item.date}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>Digitalmakers Log</span>
                <span className="text-[#5363F6]">Verified</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
