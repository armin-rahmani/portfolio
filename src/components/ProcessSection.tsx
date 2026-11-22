import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  num: string;
  title: string;
  desc: string[];
  image: string;
  rounded: 'top' | 'none' | 'bottom';
}

const STEPS: ProcessStep[] = [
  {
    num: '1',
    title: 'Architect & Strategize',
    desc: [
      "Whether you're starting from zero or scaling",
      "an existing platform, we dissect requirements and",
      "determine the exact tech stack: database model,",
      "SEO keyword roadmap, and the performance baseline",
      "needed to dominate your market."
    ],
    image: '/images/process1.webp',
    rounded: 'top'
  },
  {
    num: '2',
    title: 'Design & Build',
    desc: [
      "No shortcuts, no bloated frameworks. I engineer",
      "resilient backend microservices, type-safe API contracts,",
      "and interactive user interfaces with fluid GSAP",
      "motion. Everything is crafted cleanly with modern",
      "standards, full accessibility, and robust test suites."
    ],
    image: '/images/process2.webp',
    rounded: 'none'
  },
  {
    num: '3',
    title: 'Deploy & Optimize',
    desc: [
      "I manage the entire rollout from zero to production.",
      "Cloud deployments, CI/CD pipelines, sub-second",
      "server caching, Lighthouse 100 audits, and automated",
      "search indexing. You get high-performance digital",
      "infrastructure ready to scale."
    ],
    image: '/images/process3.webp',
    rounded: 'bottom'
  }
];

export const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Header reveal
    gsap.fromTo(
      '.process-header-content',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.process-header-content',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 2. Performant kinetic step reveals: 1 clean trigger per step
    const steps = gsap.utils.toArray<HTMLElement>('.process-step-row');
    steps.forEach((step) => {
      const lines = step.querySelectorAll('.process-line-inner');
      const img = step.querySelector('.process-img');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      tl.fromTo(
        lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.65,
          stagger: 0.05,
          ease: 'power3.out'
        }
      );

      if (img) {
        tl.fromTo(
          img,
          { opacity: 0.8, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out'
          },
          '<'
        );
      }
    });
  }, { scope: containerRef });

  return (
    <div
      id="process"
      ref={containerRef}
      data-nav-color="secondary"
      className="process-surface relative z-10 bg-primary text-secondary"
    >
      {/* Header Row */}
      <div className="w-full bg-primary layout-grid text-secondary">
        <div className="process-header-content col-span-full sm:col-span-12 flex justify-between mt-[6vw] sm:mt-[3vw] pb-[4vw] sm:pb-[2vw] border-b border-secondary/10">
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
              <span className="mediumText">how I work</span>
            </div>
          </div>
          <h2 className="mediumText text-secondary/40">process</h2>
        </div>
      </div>

      {/* 3 Kinetic Steps */}
      {STEPS.map((step, idx) => (
        <div
          key={step.num}
          className={`process-step-row w-full bg-primary layout-grid text-secondary ${
            idx === 0
              ? 'pt-[8vw] sm:pt-[5vw] sm:border-b border-secondary/10'
              : idx === 1
              ? 'pt-[10vw] sm:pt-0 sm:border-b border-secondary/10'
              : 'pt-[10vw] sm:pt-0 pb-[15vw] sm:pb-[3vw] sm:border-b border-secondary/10'
          }`}
        >
          {/* Step Number */}
          <div className="col-span-full sm:col-span-1 mediumText pt-[2vw] sm:pt-[1vw] flex sm:block items-baseline gap-[3vw] sm:gap-0">
            <span className="font-mono">{step.num}</span>
            <span className="smallText sm:hidden font-medium">{step.title}</span>
          </div>

          {/* Step Description with Kinetic Typography */}
          <div className="col-span-full sm:col-span-4 flex flex-col gap-[2.5vw] sm:gap-[1vw] pt-[3vw] sm:pt-[1vw]">
            <span className="smallText hidden sm:block font-medium">{step.title}</span>
            <div className="w-full sm:w-[75%] extraSmallText text-secondary/65">
              <div className="z-0">
                {step.desc.map((line, lIdx) => (
                  <div
                    key={lIdx}
                    style={{
                      position: 'relative',
                      display: 'block',
                      textAlign: 'start',
                      overflow: 'clip',
                      margin: '-0.05em -0.08em',
                      padding: '0.05em 0.08em'
                    }}
                  >
                    <div
                      className="process-line-inner"
                      style={{
                        position: 'relative',
                        display: 'block',
                        textAlign: 'start'
                      }}
                    >
                      {line}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Image */}
          <div className="col-span-full sm:col-span-7 mt-[4vw] sm:-mt-px relative pointer-events-none">
            <div
              className={`drop-shadow ${
                step.rounded === 'top'
                  ? 'rounded-t-[0.5vw] sm:rounded-t-[0.25vw]'
                  : step.rounded === 'bottom'
                  ? 'rounded-b-[0.5vw] sm:rounded-b-[0.25vw]'
                  : 'rounded-[0.5vw] sm:rounded-[0.25vw]'
              }`}
              style={{
                boxShadow: '0 0.5vw 2.5vw rgba(0, 0, 0, 0.08)'
              }}
            >
              <div
                className={`w-full h-[50vw] overflow-hidden sm:h-[35vw] bg-neutral-100 border border-secondary/10 ${
                  step.rounded === 'top'
                    ? 'rounded-t-[0.5vw] sm:rounded-t-[0.25vw]'
                    : step.rounded === 'bottom'
                    ? 'rounded-b-[0.5vw] sm:rounded-b-[0.25vw]'
                    : ''
                }`}
              >
                <img
                  src={step.image}
                  alt={`Process image ${step.title}`}
                  className="process-img w-full h-full object-cover opacity-95 transition-opacity duration-300"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
