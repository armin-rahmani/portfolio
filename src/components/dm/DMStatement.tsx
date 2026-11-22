import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const DMStatement: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const pillBtnRef = useRef<HTMLAnchorElement>(null);

  // Client Logos
  const clientLogos = [
    { name: 'Samsung', src: '/images/dm/digitalmakers-samsung-businesscenter.svg' },
    { name: 'Volvo', src: '/images/dm/digitalmakers-volvo-logo.svg' },
    { name: 'Gemeente Utrecht', src: '/images/dm/digitalmakers-gemeente-utrecht.svg' },
    { name: 'Erasmus', src: '/images/dm/digitalmakers-erasmus.svg' },
    { name: 'Avans', src: '/images/dm/digitalmakers-avans-hogeschool.svg' },
    { name: 'Schiphol', src: '/images/dm/digitalmakers-schiphol.svg' },
    { name: 'KVK', src: '/images/dm/digitalmakers-kvk.svg' },
    { name: 'Insights', src: '/images/dm/digitalmakers-insights.svg' },
    { name: 'Leiden', src: '/images/dm/digitalmakers-leiden.svg' },
    { name: 'Forta', src: '/images/dm/digitalmakers-forta.svg' },
    { name: 'Intersport', src: '/images/dm/digitalmakers-intersport.svg' },
    { name: 'Koppert', src: '/images/dm/digitalmakers-koppert.svg' },
    { name: 'Klinger', src: '/images/dm/digitalmakers-klinger.svg' },
    { name: 'DLG', src: '/images/dm/digitalmakers-dlg.svg' },
    { name: 'Bring', src: '/images/dm/digitalmakers-bring.svg' },
    { name: 'Hunkemöller', src: '/images/dm/digitalmakers-hunkemoller.svg' },
    { name: 'Wolford', src: '/images/dm/digitalmakers-wolford.svg' },
    { name: 'Ecco', src: '/images/dm/digitalmakers-ecco.svg' },
    { name: 'Yves Rocher', src: '/images/dm/digitalmakers-yves-rocher.svg' }
  ];

  useGSAP(() => {
    // 1. Continuous Logo Marquee Loop
    const track = marqueeRef.current?.querySelector('.logo-marquee-track');
    if (track) {
      gsap.to(track, {
        xPercent: -50,
        duration: 35,
        ease: 'none',
        repeat: -1
      });
    }

    // 2. Scrubbed Focus-Blur on the Massive Headline
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        {
          filter: 'blur(12px)',
          opacity: 0.25,
          y: 40
        },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.8
          }
        }
      );
    }

    // 3. Reveal Paragraph and Button
    if (paragraphRef.current && pillBtnRef.current) {
      gsap.fromTo(
        [paragraphRef.current, pillBtnRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 85%'
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="statement" className="relative w-full">
      {/* Upper Dark Zone: Client Logos Marquee */}
      <div className="bg-[#0E0E0E] py-16 border-t border-b border-white/10 overflow-hidden select-none">
        <div className="max-w-[1400px] mx-auto px-6 mb-8 text-center">
          <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
            Trusted by forward-thinking teams & enterprises
          </span>
        </div>

        <div ref={marqueeRef} className="relative w-full overflow-hidden">
          {/* Edge gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0E0E0E] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0E0E0E] to-transparent z-10 pointer-events-none" />

          <div className="logo-marquee-track flex items-center gap-14 md:gap-20 whitespace-nowrap will-change-transform">
            {[...clientLogos, ...clientLogos].map((client, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale invert brightness-200"
              >
                <img
                  src={client.src}
                  alt={client.name}
                  className="h-8 md:h-10 w-auto max-w-[140px] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower White Editorial Zone */}
      <div className="bg-[#F8F7F4] text-[#0E0E0E] py-24 sm:py-32 md:py-44 px-6 md:px-12 background-color-white" data-logo-theme="dark">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
          {/* Massive Scrub-blurred Headline */}
          <h2
            ref={headlineRef}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0E0E] leading-[1.08] max-w-5xl"
          >
            We’ve built & scaled digital solutions for over a decade
          </h2>

          {/* Statement Paragraph */}
          <p
            ref={paragraphRef}
            className="mt-8 sm:mt-12 text-base sm:text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed font-normal"
          >
            As an agile duo, we bridge the gap between creative design and technical execution. No layers, no account managers, just direct collaboration with senior makers who care about every pixel and line of code.
          </p>

          {/* "Meet the makers" Interactive Pill Button */}
          <div className="mt-12 sm:mt-16">
            <a
              ref={pillBtnRef}
              href="#approach"
              className="group inline-flex items-center gap-4 px-6 py-3.5 rounded-full bg-[#0E0E0E] text-white hover:bg-[#5363F6] transition-all duration-300 shadow-xl hover:shadow-[#5363F6]/25 hover:scale-105 active:scale-95"
            >
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  src="/images/dm/digitalmakers-robin-white.avif"
                  alt="Robin"
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white/20 object-cover bg-gray-800"
                />
                <img
                  src="/images/dm/digitalmakers-nick-white.avif"
                  alt="Nick"
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white/20 object-cover bg-gray-800"
                />
              </div>

              <span className="text-sm font-semibold tracking-wide">
                Meet the makers
              </span>

              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
