import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Terms: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    gsap.from('.terms-reveal', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="w-full bg-primary text-secondary pt-[10vw] pb-[8vw] px-[2.75vw]">
      {/* Top Tag & Date */}
      <div className="terms-reveal flex items-center justify-between border-b border-secondary/10 pb-[2vw] mb-[4vw]">
        <div className="flex items-center gap-[0.5vw] text-secondary/50 extraSmallText">
          <span className="w-[0.5vw] h-[0.5vw] bg-yellow rounded-full" />
          <span>The small print</span>
          <span className="mx-[0.3vw]">/</span>
          <span>terms of use</span>
        </div>
        <span className="detailText font-mono uppercase text-secondary/40">
          Last updated 25 September 2026
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[4vw]">
        {/* Left Column: Big Headline & Summary */}
        <div className="terms-reveal lg:col-span-4 flex flex-col justify-between">
          <div>
            <h1 className="largeText font-normal leading-[0.85] tracking-tight">
              terms
              <br />
              <span className="text-secondary/30">of use.</span>
            </h1>

            <p className="smallText text-secondary/70 mt-[2.5vw] leading-[1.35]">
              The ground rules for visiting our site, exploring our work and starting a conversation.
            </p>
          </div>

          <div className="mt-[4vw] p-[1.5vw] bg-secondary/5 rounded-[0.5vw] hidden lg:block">
            <span className="extraSmallText font-medium text-secondary block mb-[0.4vw]">
              Licensing or usage questions?
            </span>
            <p className="detailText text-secondary/60 leading-[1.4] mb-[1vw]">
              If you have questions about these terms or want permission to use something you find here, reach out.
            </p>
            <a
              href="mailto:arminrahmani318@gmail.com"
              className="extraSmallText text-secondary hover:text-yellow underline transition-colors"
            >
              arminrahmani318@gmail.com ↗
            </a>
          </div>
        </div>

        {/* Right Column: Full Terms Body */}
        <div className="terms-reveal lg:col-span-8 space-y-[3vw] text-secondary/80">
          <section className="border-b border-secondary/10 pb-[2.5vw]">
            <h2 className="smallText font-medium text-secondary mb-[0.8vw]">
              1. About this site
            </h2>
            <p className="extraSmallText leading-[1.5]">
              This website is the official portfolio of Armin Rahmani, full-stack website developer, SEO specialist, and backend architect. These terms apply to your use of this website. If you have questions about these terms or want permission to use something you find here, contact{' '}
              <a href="mailto:arminrahmani318@gmail.com" className="text-secondary underline">
                arminrahmani318@gmail.com
              </a>.
            </p>
          </section>

          <section className="border-b border-secondary/10 pb-[2.5vw]">
            <h2 className="smallText font-medium text-secondary mb-[0.8vw]">
              2. Using the site
            </h2>
            <p className="extraSmallText leading-[1.5]">
              You are welcome to browse the site and share links to its pages. Please use it lawfully and respect other people's rights. Do not attempt to gain unauthorised access to the site, its systems or information. Do not introduce malicious code, disrupt the service or use the enquiry form to transmit unsolicited promotional material.
            </p>
          </section>

          <section className="border-b border-secondary/10 pb-[2.5vw]">
            <h2 className="smallText font-medium text-secondary mb-[0.8vw]">
              3. Our work & content
            </h2>
            <p className="extraSmallText leading-[1.5]">
              The text, designs, visual assets, layouts and code on this site are owned by Sidejob or used with permission from clients, photographers, filmmakers and creative partners. Client trademarks, brand assets and project visuals remain the property of their respective owners. You may not copy, reproduce, distribute or create derivative works from site content without prior written permission.
            </p>
          </section>

          <section className="border-b border-secondary/10 pb-[2.5vw]">
            <h2 className="smallText font-medium text-secondary mb-[0.8vw]">
              4. Enquiries & projects
            </h2>
            <p className="extraSmallText leading-[1.5]">
              Submitting an enquiry through our briefing form or via email does not form a binding contract. A production project only begins once scope, budget, timeline and contractual terms are agreed upon and formally signed in writing by both parties.
            </p>
          </section>

          <section className="border-b border-secondary/10 pb-[2.5vw]">
            <h2 className="smallText font-medium text-secondary mb-[0.8vw]">
              5. Availability & liability
            </h2>
            <p className="extraSmallText leading-[1.5]">
              We strive to keep the site accurate and accessible, but it is provided on an "as is" basis. We are not liable for temporary interruptions, technical errors or third-party content.
            </p>
          </section>

          <section className="border-b border-secondary/10 pb-[2.5vw]">
            <h2 className="smallText font-medium text-secondary mb-[0.8vw]">
              6. Applicable law
            </h2>
            <p className="extraSmallText leading-[1.5]">
              These terms are governed by the laws of Norway. Any disputes arising in connection with this website shall be settled under the jurisdiction of Oslo District Court.
            </p>
          </section>

          <div className="pt-[1vw] flex items-center justify-between">
            <Link to="/privacy" className="smallText text-secondary hover:text-yellow underline transition-colors">
              Read Privacy Policy →
            </Link>
            <Link to="/contact" className="main-btn smallText">
              <span className="main-btn__icon" aria-hidden="true" />
              <span className="main-btn__label">
                <span className="main-btn__clip">
                  <span className="main-btn__from">Talk to me</span>
                  <span className="main-btn__to" aria-hidden="true">Talk to me</span>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
