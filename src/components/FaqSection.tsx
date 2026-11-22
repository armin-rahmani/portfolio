import React, { useState, useRef } from 'react';
import { FAQ_ITEMS } from '../data/sidejobData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.faq-header', {
      scrollTrigger: {
        trigger: '.faq-header',
        start: 'top 80%'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.faq-item', {
      scrollTrigger: {
        trigger: '.faq-accordion',
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      ref={containerRef}
      data-nav-color="secondary"
      className="w-full bg-primary text-secondary py-[8vw] px-[2.75vw] border-t border-secondary/10 relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[4vw]">
        {/* Left Headline */}
        <div className="faq-header lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-[0.5vw] text-secondary/50 extraSmallText mb-[2vw]">
              <span className="w-[0.5vw] h-[0.5vw] bg-yellow rounded-full" />
              <span>frequently asked</span>
              <span className="mx-[0.3vw]">/</span>
              <span>faq</span>
            </div>
            <h2 className="largeText font-normal leading-[0.85] tracking-tight">
              any questions?
            </h2>
          </div>

          <p className="smallText text-secondary/60 mt-[3vw] max-w-[24vw] hidden lg:block">
            Everything you need to know about how briefs, teams, budgets and productions operate at Sidejob.
          </p>
        </div>

        {/* Right Accordion List */}
        <div className="faq-accordion lg:col-span-8 flex flex-col">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="faq-item border-b border-secondary/15 py-[1.8vw] cursor-pointer transition-colors"
                onClick={() => toggleItem(idx)}
              >
                <div className="flex items-center justify-between gap-[1vw]">
                  <h3 className="smallText font-medium text-secondary">
                    {item.question}
                  </h3>
                  <span
                    className={`smallText font-mono transition-transform duration-300 ${
                      isOpen ? 'rotate-45 text-yellow' : 'text-secondary/40'
                    }`}
                  >
                    +
                  </span>
                </div>

                <div
                  className={`grid transition-all duration-400 ease-in-out overflow-hidden ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-[1vw]' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="min-h-0">
                    <p className="extraSmallText text-secondary/70 leading-[1.45] max-w-[90%]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
