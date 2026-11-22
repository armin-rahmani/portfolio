import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const DMCases: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const cases = [
    {
      id: 'zonwatt',
      title: 'Zonwatt',
      category: 'Sustainable Energy',
      tags: ['Webflow CMS', 'Custom Configurator', 'SEO'],
      year: '2024',
      image: '/images/dm/digitalmakers-case-zonwatt.avif',
      desc: 'High-conversion solar energy platform with custom quote calculator and seamless ERP synchronization.'
    },
    {
      id: 'rentabus',
      title: 'Rentabus',
      category: 'Mobility & Travel',
      tags: ['Booking Engine', 'GSAP Motion', 'Multi-language'],
      year: '2024',
      image: '/images/dm/dm-about-rentabus.avif',
      desc: 'European passenger transit booking platform engineered for lightning-fast route estimation and 42% higher conversion.'
    },
    {
      id: 'nrds',
      title: 'NRDS',
      category: 'Urban Mobility',
      tags: ['Brand Identity', '3D Interactive', 'Webflow'],
      year: '2023',
      image: '/images/dm/nrds-mockup.avif',
      desc: 'Modern electric mobility platform featuring sleek GSAP motion, interactive vehicle customizer, and bold typography.'
    },
    {
      id: 'forta',
      title: 'Forta Foundation',
      category: 'Mental Healthcare',
      tags: ['Enterprise Multisite', 'WCAG AAA', 'HIPAA/GDPR'],
      year: '2023',
      image: '/images/dm/6ad200ebb1ab6c131987f5c0_dm-update-v3-forta-sites.webp',
      desc: 'Comprehensive digital ecosystem serving 40+ clinics across the Netherlands with strict privacy & accessibility standards.'
    },
    {
      id: 'dropoflemon',
      title: 'Drop of Lemon',
      category: 'Creative Production',
      tags: ['Editorial Layout', 'High-res Media', 'Fluid UI'],
      year: '2023',
      image: '/images/dm/dropoflemon-photography.jpg',
      desc: 'Minimalist visual portfolio for fashion and commercial studio photographers with fluid image transitions.'
    },
    {
      id: 'bowi',
      title: 'Bowi AI',
      category: 'AI SaaS',
      tags: ['Product Landing', 'Conversion Engine', 'Automation'],
      year: '2024',
      image: '/images/dm/6ad200eb9dcc40323845c9b6_dm-update-v3-bowi.webp',
      desc: 'High-performance conversion platform for an AI sales automation tool with interactive demo triggers.'
    }
  ];

  useGSAP(() => {
    // Parallax effect on all case images
    const cards = containerRef.current?.querySelectorAll('.case-card');
    cards?.forEach((card) => {
      const img = card.querySelector('.case-img');
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="cases"
      className="py-24 sm:py-32 md:py-40 px-6 md:px-12 bg-[#0E0E0E] text-white border-t border-white/10"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <span className="font-handwritten text-3xl sm:text-4xl text-[#5363F6] block mb-2 rotate-[-2deg]">
              Built in Webflow ↵
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
              Our cases
            </h2>
          </div>

          <p className="text-gray-400 max-w-md text-base sm:text-lg font-light leading-relaxed">
            A selection of high-impact platforms, bespoke brand identities, and high-conversion web applications built for scale.
          </p>
        </div>

        {/* 2-Column Responsive Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {cases.map((item, index) => (
            <div
              key={item.id}
              className={`case-card group relative flex flex-col rounded-3xl overflow-hidden bg-[#151515] border border-white/10 hover:border-[#5363F6]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#5363F6]/10 ${
                index % 3 === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Image Window with Inner Parallax */}
              <div className="relative w-full h-[320px] sm:h-[440px] md:h-[520px] overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="case-img w-full h-[120%] object-cover object-center filter brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 will-change-transform"
                  loading="lazy"
                />

                {/* Top overlay pills */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono font-medium text-white/90 border border-white/10">
                    {item.category}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-gray-400 border border-white/10">
                    {item.year}
                  </span>
                </div>

                {/* Floating "View Case" Arrow button */}
                <div className="absolute bottom-6 right-6 z-10 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg group-hover:bg-[#5363F6] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-8 sm:p-10 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#5363F6] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-gray-400 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
