import React, { useRef } from 'react';
import { SERVICES } from '../data/sidejobData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Kinetic Typography soft staggered entrance on scroll
    gsap.fromTo(
      rowsRef.current.filter(Boolean),
      {
        yPercent: 60,
        opacity: 0,
        rotateX: 18
      },
      {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.1,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef });

  const handleMouseEnter = (index: number) => {
    // 1. Soft & smooth text bolding & scaling with GSAP
    const targetWord = wordsRef.current[index];
    if (targetWord) {
      gsap.to(targetWord, {
        scale: 1.035,
        fontWeight: 700,
        letterSpacing: '-0.025em',
        color: '#11110f',
        duration: 0.5,
        ease: 'power2.out'
      });
    }

    // 2. Expand soft glowing yellow rounded light bar underneath
    const targetBar = barsRef.current[index];
    if (targetBar) {
      gsap.to(targetBar, {
        scaleX: 1,
        opacity: 1,
        duration: 0.55,
        ease: 'power2.out'
      });
    }

    // 3. Smoothly soften sibling service words
    rowsRef.current.forEach((row, i) => {
      if (row && i !== index) {
        gsap.to(row, {
          opacity: 0.22,
          scale: 0.985,
          duration: 0.45,
          ease: 'power2.out'
        });
      }
    });
  };

  const handleMouseLeave = (index: number) => {
    // 1. Reset text weight and scale smoothly
    const targetWord = wordsRef.current[index];
    if (targetWord) {
      gsap.to(targetWord, {
        scale: 1,
        fontWeight: 400,
        letterSpacing: '-0.04em',
        color: '#11110f',
        duration: 0.45,
        ease: 'power2.out'
      });
    }

    // 2. Softly collapse yellow light bar
    const targetBar = barsRef.current[index];
    if (targetBar) {
      gsap.to(targetBar, {
        scaleX: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      });
    }

    // 3. Restore all rows opacity smoothly
    rowsRef.current.forEach((row) => {
      if (row) {
        gsap.to(row, {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'power2.out'
        });
      }
    });
  };

  return (
    <div
      id="services"
      ref={containerRef}
      data-nav-color="secondary"
      className="w-full sm:h-fit sm:min-h-fit min-h-svh bg-primary text-secondary layout-grid relative pb-[8vw]"
    >
      {/* Top Header Row */}
      <div className="col-span-full sm:col-span-12 flex justify-between items-center mt-[6vw] sm:mt-[4vw] border-b border-secondary/10 pb-[2vw]">
        <div className="flex items-center gap-[1.5vw] sm:gap-[1vw]">
          <div
            className="drop-shadow rounded-[0.25vw]"
            style={{
              boxShadow: '0 0 1vw 0.5vw rgba(255, 51, 68, 0.25)'
            }}
          >
            <div className="sm:w-[1.8vw] sm:h-[1.8vw] w-[5vw] h-[5vw] sm:rounded-[0.2vw] rounded-[0.5vw] bg-yellow" />
          </div>
          <div>
            <span className="mediumText">how can I help?</span>
          </div>
        </div>
        <h2 className="mediumText text-secondary/40">services</h2>
      </div>

      {/* Center Dynamic Stacked Disciplines List (Larger, softer smoother animation, rounded glowing yellow light bar) */}
      <div className="col-span-full sm:col-span-12 flex flex-col items-center justify-center mt-[7vw] mb-[6vw] sm:mb-[3vw] relative select-none [perspective:1000px]">
        {SERVICES.map((s, idx) => (
          <div
            key={s.id}
            ref={(el) => { rowsRef.current[idx] = el; }}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
            className="service-item-row relative cursor-pointer py-[0.25vw] flex flex-col items-center will-change-transform"
            style={{ lineHeight: 0.88 }}
          >
            {/* Dynamic Kinetic Text Word */}
            <span
              ref={(el) => { wordsRef.current[idx] = el; }}
              className="service-huge-word inline-block text-[13.5vw] sm:text-[12.8vw] tracking-[-0.04em] font-normal text-secondary will-change-transform transform-3d select-none"
              style={{
                transition: 'font-weight 0.25s ease-out'
              }}
            >
              {s.name}
            </span>

            {/* Softer, High-Radius Glowing Red Light Bar Underneath */}
            <div
              ref={(el) => { barsRef.current[idx] = el; }}
              className="service-light-bar h-[7px] sm:h-[9px] w-[108%] rounded-full bg-yellow shadow-[0_0_25px_rgba(255,51,68,0.9),0_0_55px_rgba(255,51,68,0.55),0_0_85px_rgba(255,51,68,0.3)] scale-x-0 opacity-0 origin-center pointer-events-none mt-[0.25vw] will-change-transform"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
