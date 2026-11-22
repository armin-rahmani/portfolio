import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUp, ArrowDown, Calendar, CheckCircle } from 'lucide-react';

interface DMTestimonialsProps {
  onOpenContact: () => void;
}

export const DMTestimonials: React.FC<DMTestimonialsProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 'forta',
      quote:
        'Digitalmakers transformed our entire online presence. Having direct communication with senior makers rather than account managers made a night-and-day difference in speed and quality.',
      author: 'Johan van der Meer',
      role: 'Managing Director',
      company: 'Forta Mental Healthcare',
      avatar: '/images/dm/headshot-forta-johan.avif'
    },
    {
      id: 'rentabus',
      quote:
        'The speed, precision, and architectural cleanliness they deliver is unmatched. Our booking conversions jumped by 42% within two months of launch across European markets.',
      author: 'Angelo Rossi',
      role: 'Co-founder & COO',
      company: 'Rentabus International',
      avatar: '/images/dm/headshot-rentabus-angelo.avif'
    },
    {
      id: 'nrds',
      quote:
        'From bold typography and brand strategy to 60fps GSAP animations, everything was executed with exceptional taste and technical mastery. Our users constantly praise the experience.',
      author: 'Edward van Dijk',
      role: 'Product Lead',
      company: 'NRDS Mobility',
      avatar: '/images/dm/headshot-nrds-edward.avif'
    }
  ];

  const handleNext = () => {
    animateQuoteTransition(1, () => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    });
  };

  const handlePrev = () => {
    animateQuoteTransition(-1, () => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    });
  };

  const animateQuoteTransition = (direction: number, updateState: () => void) => {
    if (!quoteRef.current) {
      updateState();
      return;
    }

    gsap.to(quoteRef.current, {
      y: direction * -20,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        updateState();
        gsap.fromTo(
          quoteRef.current,
          { y: direction * 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
        );
      }
    });
  };

  const current = testimonials[activeIndex];

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="py-24 sm:py-32 md:py-40 px-6 md:px-12 bg-[#0E0E0E] text-white border-t border-white/10"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <span className="font-handwritten text-3xl sm:text-4xl text-[#5363F6] block mb-2 rotate-[-2deg]">
            What others say
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-2xl">
            Stories backed by proven results
          </h2>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          {/* Left Column: Google Meet Booking Card */}
          <div className="lg:col-span-5 rounded-3xl bg-[#151515] border border-white/10 p-8 sm:p-12 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-8">
                <img
                  src="/images/dm/Google_Meet_icon_(2020)_1.svg"
                  alt="Google Meet"
                  className="w-10 h-10 object-contain"
                />
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available this week</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                Book a brief 15-minute intro meeting
              </h3>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 font-light">
                No salespeople. Directly discuss your ideas, architecture, and design goals with the makers.
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#5363F6] shrink-0" />
                  <span>Direct consultation with Armin & team</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#5363F6] shrink-0" />
                  <span>High-level architecture and scope review</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#5363F6] shrink-0" />
                  <span>Clear estimates and timeline breakdown</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6">
              <button
                onClick={onOpenContact}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-[#5363F6] text-white hover:bg-[#4352E4] transition-all duration-300 font-semibold text-sm shadow-lg shadow-[#5363F6]/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule intro meeting</span>
              </button>
            </div>
          </div>

          {/* Right Column: Vertical Testimonials Card */}
          <div className="lg:col-span-7 rounded-3xl bg-[#151515] border border-white/10 p-8 sm:p-12 flex flex-col justify-between shadow-xl relative">
            {/* Top Navigation Arrows */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
                Client Review {activeIndex + 1} of {testimonials.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center text-white transition-all hover:bg-white/10 active:scale-95"
                  aria-label="Previous Testimonial"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center text-white transition-all hover:bg-white/10 active:scale-95"
                  aria-label="Next Testimonial"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Animated Quote Content */}
            <div ref={quoteRef} className="flex-grow flex flex-col justify-between py-4">
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-white leading-relaxed mb-10">
                “{current.quote}”
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[#5363F6]/40 bg-gray-800"
                />
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {current.author}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-light">
                    {current.role} — <span className="text-white/80">{current.company}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
