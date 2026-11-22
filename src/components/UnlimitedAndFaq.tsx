import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    q: 'What technologies do you specialize in?',
    a: 'My core stack includes TypeScript, React, Next.js, and Tailwind CSS on the frontend with GSAP for fluid animations; Node.js, Go, Python, PostgreSQL, Redis, and GraphQL on the backend; deployed on AWS, Docker, and Vercel.'
  },
  {
    q: 'Do you handle both frontend and backend?',
    a: 'Yes. As a full-stack developer, I design and build everything from database schemas, secure authentication, and REST/GraphQL APIs to responsive, pixel-perfect frontend interfaces.'
  },
  {
    q: 'How do you achieve high search engine rankings (SEO)?',
    a: 'I engineer technical SEO into the architecture: semantic HTML, structured JSON-LD schema, dynamic OpenGraph data, fast server-side rendering (SSR), and sub-second Core Web Vitals (LCP, INP, CLS) that Google rewards.'
  },
  {
    q: 'Can you redesign or speed up an existing website?',
    a: 'Absolutely. I conduct comprehensive audits of legacy systems, identify bottlenecks in database queries or frontend bundle sizes, and migrate platforms to modern stacks that load instantly and convert better.'
  },
  {
    q: 'Do you collaborate with international teams and clients?',
    a: 'Yes. I work seamlessly with founders, product teams, and businesses worldwide across asynchronous workflows, sprint reviews, and direct communication.'
  },
  {
    q: 'How does pricing and project scoping work?',
    a: 'Transparent, milestone-based pricing tailored to the exact requirements: architecture, feature complexity, API integrations, and SEO scope. You receive a clear, fixed timeline and deliverables breakdown before work begins.'
  },
  {
    q: 'How do you ensure security and code quality?',
    a: 'Every project adheres to OWASP security best practices, strict type safety, encrypted authentication, rate-limiting, and automated CI/CD testing pipelines.'
  },
  {
    q: 'What is your typical turnaround timeline?',
    a: 'Focused web apps and landing experiences typically launch in 1 to 3 weeks; comprehensive full-stack platforms with custom backends and extensive SEO architecture run on structured 4 to 8 week milestones.'
  }
];

export const UnlimitedAndFaq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal kinetic team lines on scroll
    const teamLines = gsap.utils.toArray<HTMLElement>('.kinetic-team-line');
    teamLines.forEach((line) => {
      gsap.fromTo(
        line,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 3D tilt & parallax on FAQ card
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          rotateX: 12,
          rotateY: -8,
          y: 30
        },
        {
          rotateX: -6,
          rotateY: 6,
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    }
  }, { scope: containerRef });

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div
      ref={containerRef}
      data-nav-color="primary"
      className="w-full bg-secondary text-primary py-[10vw] sm:pt-[5vw] pb-[calc(5vw+5svh)]"
    >
      {/* Top Block: Unlimited Capabilities */}
      <div className="layout-grid text-primary mb-[12vw] sm:mb-[10vw]">
        <div className="col-span-full sm:col-span-3 flex flex-col gap-[2vw] sm:gap-[0.75vw] mb-[8vw] sm:mb-0">
          <span className="smallText font-medium">Full-stack precision</span>
          <span className="extraSmallText text-primary/60">
            building end-to-end web experiences, high-throughput backends, and organic SEO{' '}
            <br className="hidden sm:block" /> engines.
          </span>
        </div>

        <div className="hidden sm:block col-span-3" />

        <div className="col-span-full sm:col-span-6">
          <div className="z-0 largeText text-primary">
            <div
              style={{
                position: 'relative',
                display: 'block',
                textAlign: 'start',
                overflow: 'clip',
                lineHeight: 'inherit',
                margin: '-0.13em -0.08em',
                padding: '0.13em 0.08em'
              }}
            >
              <div
                className="kinetic-team-line"
                style={{
                  position: 'relative',
                  display: 'block',
                  textAlign: 'start',
                  lineHeight: 'inherit'
                }}
              >
                clean code only
              </div>
            </div>
            <div
              style={{
                position: 'relative',
                display: 'block',
                textAlign: 'start',
                overflow: 'clip',
                lineHeight: 'inherit',
                margin: '-0.13em -0.08em',
                padding: '0.13em 0.08em'
              }}
            >
              <div
                className="kinetic-team-line"
                style={{
                  position: 'relative',
                  display: 'block',
                  textAlign: 'start',
                  lineHeight: 'inherit'
                }}
              >
                built to scale
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Block: FAQ */}
      <div className="layout-grid w-full">
        <div className="col-span-full sm:col-span-12 border-t border-primary/10" />

        {/* Left Column: Heading & 3D Card */}
        <div className="col-span-full sm:col-span-4 self-stretch flex flex-col">
          <div className="flex items-center gap-[2vw] sm:gap-[1vw] mb-[6vw] sm:mb-[3vw] pt-[6vw] sm:pt-[2vw]">
            <div
              className="drop-shadow rounded-[0.5vw] sm:rounded-[0.25vw]"
              style={{
                boxShadow: '0 0 1vw 0.5vw rgba(255, 51, 68, 0.25)'
              }}
            >
              <div className="w-[5vw] h-[5vw] sm:w-[1.8vw] sm:h-[1.8vw] rounded-[0.5vw] sm:rounded-[0.2vw] bg-yellow" />
            </div>
            <div>
              <h2 style={{ lineHeight: 0.5 }} className="mediumText text-primary">
                any questions?
              </h2>
            </div>
          </div>

          <div className="relative w-full sm:flex-1 sm:min-h-[16vw] [perspective:800px] pointer-events-none mb-[8vw] sm:mb-0">
            <div
              ref={cardRef}
              className="will-change-transform [transform-style:preserve-3d] w-full sm:w-fit"
            >
              <div
                className="w-full sm:w-[24vw] h-[50vw] sm:h-[16vw] overflow-hidden rounded-[0.5vw] sm:rounded-[0.25vw] bg-neutral-900 border border-primary/10 shadow-2xl"
              >
                <img
                  src="/images/faq.webp"
                  alt="Sidejob FAQ card"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: FAQ Accordion */}
        <div className="col-span-full sm:col-span-7 sm:col-start-6">
          <div className="flex flex-col w-full">
            {FAQ_LIST.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="faq-item w-full border-b border-primary/10"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="faq-row flex flex-col w-full py-[4vw] sm:py-[2vw] text-left cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="flex justify-between items-center w-full">
                      <span className="faq-question mediumText pr-[4vw] sm:pr-0 text-primary group-hover:text-yellow transition-colors duration-200">
                        {item.q}
                      </span>
                      <div
                        className="drop-shadow faq-icon rounded-[0.5vw] sm:rounded-[0.25vw] shrink-0"
                        style={{
                          boxShadow: '0 0 1vw 0.5vw rgba(255, 51, 68, 0.25)'
                        }}
                      >
                        <div
                          className={`faq-icon__sq w-[4vw] h-[4vw] sm:w-[1.25vw] sm:h-[1.25vw] bg-yellow rounded-[0.5vw] sm:rounded-[0.25vw] transition-transform duration-300 ${
                            isOpen ? 'rotate-45 scale-90' : 'group-hover:scale-110'
                          }`}
                        />
                      </div>
                    </span>

                    <div
                      className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
                        isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="faq-answer__text extraSmallText text-primary/70 pt-[3vw] sm:pt-[1.25vw] pr-[8vw] sm:pr-[2vw] sm:w-[90%] leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
