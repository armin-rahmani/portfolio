import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Privacy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    gsap.from('.privacy-reveal', {
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
      <div className="privacy-reveal flex items-center justify-between border-b border-secondary/10 pb-[2vw] mb-[4vw]">
        <div className="flex items-center gap-[0.5vw] text-secondary/50 extraSmallText">
          <span className="w-[0.5vw] h-[0.5vw] bg-yellow rounded-full" />
          <span>The small print</span>
          <span className="mx-[0.3vw]">/</span>
          <span>privacy policy</span>
        </div>
        <span className="detailText font-mono uppercase text-secondary/40">
          Last updated 25 September 2026
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[4vw]">
        {/* Left Column: Big Headline & Summary */}
        <div className="privacy-reveal lg:col-span-4 flex flex-col justify-between">
          <div>
            <h1 className="largeText font-normal leading-[0.85] tracking-tight">
              privacy
              <br />
              <span className="text-secondary/30">policy.</span>
            </h1>

            <p className="smallText text-secondary/70 mt-[2.5vw] leading-[1.35]">
              A little clarity on your data. What we collect, why we need it, and the choices you have.
            </p>
          </div>

          <div className="mt-[4vw] p-[1.5vw] bg-secondary/5 rounded-[0.5vw] hidden lg:block">
            <span className="extraSmallText font-medium text-secondary block mb-[0.4vw]">
              Questions about your data?
            </span>
            <p className="detailText text-secondary/60 leading-[1.4] mb-[1vw]">
              You can contact our data officer anytime to request data removal or copies.
            </p>
            <a
              href="mailto:arminrahmani318@gmail.com"
              className="extraSmallText text-secondary hover:text-yellow underline transition-colors"
            >
              arminrahmani318@gmail.com ↗
            </a>
          </div>
        </div>

        {/* Right Column: Full Policy Body */}
        <div className="privacy-reveal lg:col-span-8 space-y-[3vw] text-secondary/80">
          <section className="border-b border-secondary/10 pb-[2.5vw]">
            <h2 className="smallText font-medium text-secondary mb-[0.8vw]">
              1. Who we are
            </h2>
            <p className="extraSmallText leading-[1.5]">
              Armin Rahmani is a full-stack website developer, SEO specialist, and backend architect. We operate this portfolio website and are responsible for the personal information described in this policy. This policy covers visits to our website and enquiries you send us. For questions about your information, or to exercise your rights, email{' '}
              <a href="mailto:arminrahmani318@gmail.com" className="text-secondary underline">
                arminrahmani318@gmail.com
              </a>.
            </p>
          </section>

          <section className="border-b border-secondary/10 pb-[2.5vw]">
            <h2 className="smallText font-medium text-secondary mb-[0.8vw]">
              2. Information you share
            </h2>
            <p className="extraSmallText leading-[1.5]">
              When you contact us, we receive the information you choose to send. Our enquiry form asks for your name, email address and project details, including the type of work, stage, budget and brief. You can also share your company, location, timing, service needs and links to reference material. If you email us directly or book a call, we receive your contact details and message contents.
            </p>
          </section>

          <section className="border-b border-secondary/10 pb-[2.5vw]">
            <h2 className="smallText font-medium text-secondary mb-[0.8vw]">
              3. How we use information
            </h2>
            <p className="extraSmallText leading-[1.5]">
              We use your information strictly to respond to your enquiry, discuss potential projects, prepare production estimates and provide creative services. We do not sell your personal information or share it with third parties for marketing purposes.
            </p>
          </section>

          <section className="border-b border-secondary/10 pb-[2.5vw]">
            <h2 className="smallText font-medium text-secondary mb-[0.8vw]">
              4. Analytics & cookies
            </h2>
            <p className="extraSmallText leading-[1.5]">
              We aim to keep our site minimal and privacy-friendly. We do not use intrusive cross-site tracking cookies. Any analytics we collect are aggregated, anonymous and used solely to ensure the site operates properly, performs smoothly and scales across devices.
            </p>
          </section>

          <section className="border-b border-secondary/10 pb-[2.5vw]">
            <h2 className="smallText font-medium text-secondary mb-[0.8vw]">
              5. Service providers
            </h2>
            <p className="extraSmallText leading-[1.5]">
              We use trusted European and global hosting infrastructure (including Vercel and Apple CDN) to deliver audio streams, media assets, fonts and fast page loads securely worldwide.
            </p>
          </section>

          <section className="border-b border-secondary/10 pb-[2.5vw]">
            <h2 className="smallText font-medium text-secondary mb-[0.8vw]">
              6. Your rights
            </h2>
            <p className="extraSmallText leading-[1.5]">
              Under Norwegian and GDPR regulations, you have full rights to access, rectify, delete, or limit the processing of your personal data. Simply contact us at{' '}
              <a href="mailto:arminrahmani318@gmail.com" className="text-secondary underline">
                arminrahmani318@gmail.com
              </a>{' '}
              and we will process your request promptly.
            </p>
          </section>

          <div className="pt-[1vw] flex items-center justify-between">
            <Link to="/terms" className="smallText text-secondary hover:text-yellow underline transition-colors">
              Read Terms of Use →
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
