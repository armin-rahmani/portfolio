import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePageTransition } from '../context/TransitionContext';
import { useContactModal } from '../context/ContactModalContext';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateTo } = usePageTransition();
  const { openContactModal } = useContactModal();

  useGSAP(() => {
    // Parallax upward drift into footer
    gsap.fromTo(
      '.footer-content',
      { y: -30, opacity: 0.8 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%'
        }
      }
    );
  }, { scope: containerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    navigateTo(`#${id}`, id.toUpperCase());
  };

  return (
    <footer
      ref={containerRef}
      data-nav-color="primary"
      className="w-full h-fit bg-secondary"
    >
      <div className="footer-content w-full bg-secondary layout-grid text-primary py-[6vw] sm:py-[1vw] translate-y-[-8vw]">
        {/* Col 1: Giant Wordmark */}
        <div
          className="col-span-full sm:col-span-4 text-[16vw] sm:text-[7vw]"
          style={{ letterSpacing: '-0.07em' }}
        >
          <button
            type="button"
            onClick={() => navigateTo('/', 'HOME')}
            className="nav-btn cursor-pointer text-left"
          >
            armin
          </button>
        </div>

        {/* Col 2: Navigation */}
        <div className="col-span-3 sm:col-span-2 mt-[8vw] sm:mt-[2vw]">
          <div className="flex items-center gap-[2vw] sm:gap-[0.5vw]">
            <div className="w-[3vw] h-[3vw] sm:w-[0.9vw] sm:h-[0.9vw] bg-yellow rounded-[0.5vw] sm:rounded-[0.1vw] mt-[0.5vw] sm:mt-[0.2vw]" />
            <span className="smallText">navigation</span>
          </div>

          <div
            data-footer-links=""
            className="text-hover-group w-fit flex flex-col items-start extraSmallText text-primary/50 mt-[3vw] sm:mt-[0.5vw]"
          >
            <div className="footer-link-clip w-fit">
              <button
                type="button"
                onClick={() => handleNavClick('about')}
                className="text-hover cursor-pointer w-fit py-[1.5vw] sm:py-[0.25vw] text-left"
              >
                about
              </button>
            </div>
            <div className="footer-link-clip w-fit">
              <button
                type="button"
                onClick={() => handleNavClick('services')}
                className="text-hover cursor-pointer w-fit py-[1.5vw] sm:py-[0.25vw] text-left"
              >
                services
              </button>
            </div>
            <div className="footer-link-clip w-fit">
              <button
                type="button"
                onClick={() => handleNavClick('work')}
                className="text-hover cursor-pointer w-fit py-[1.5vw] sm:py-[0.25vw] text-left"
              >
                work
              </button>
            </div>
            <div className="footer-link-clip w-fit">
              <button
                type="button"
                onClick={() => handleNavClick('process')}
                className="text-hover cursor-pointer w-fit py-[1.5vw] sm:py-[0.25vw] text-left"
              >
                process
              </button>
            </div>
          </div>
        </div>

        {/* Col 3: Capabilities */}
        <div className="col-span-3 sm:col-span-2 mt-[8vw] sm:mt-[2vw]">
          <div className="flex items-center gap-[2vw] sm:gap-[0.5vw]">
            <div className="w-[3vw] h-[3vw] sm:w-[0.9vw] sm:h-[0.9vw] bg-yellow rounded-[0.5vw] sm:rounded-[0.1vw] mt-[0.5vw] sm:mt-[0.2vw]" />
            <span className="smallText">capabilities</span>
          </div>

          <div
            data-footer-links=""
            className="text-hover-group w-fit flex flex-col items-start extraSmallText text-primary/50 mt-[3vw] sm:mt-[0.5vw]"
          >
            <span className="text-hover cursor-default w-fit py-[1.5vw] sm:py-[0.25vw]">
              development
            </span>
            <span className="text-hover cursor-default w-fit py-[1.5vw] sm:py-[0.25vw]">
              backend
            </span>
            <span className="text-hover cursor-default w-fit py-[1.5vw] sm:py-[0.25vw]">
              seo
            </span>
            <span className="text-hover cursor-default w-fit py-[1.5vw] sm:py-[0.25vw]">
              ui/ux design
            </span>
            <span className="text-hover cursor-default w-fit py-[1.5vw] sm:py-[0.25vw]">
              architecture
            </span>
            <span className="text-hover cursor-default w-fit py-[1.5vw] sm:py-[0.25vw]">
              optimization
            </span>
          </div>
        </div>

        {/* Col 4: Connect */}
        <div className="col-span-3 sm:col-span-2 mt-[8vw] sm:mt-[2vw]">
          <div className="flex items-center gap-[2vw] sm:gap-[0.5vw]">
            <div className="w-[3vw] h-[3vw] sm:w-[0.9vw] sm:h-[0.9vw] bg-yellow rounded-[0.5vw] sm:rounded-[0.1vw] mt-[0.5vw] sm:mt-[0.2vw]" />
            <span className="smallText">connect</span>
          </div>

          <div
            data-footer-links=""
            className="text-hover-group w-fit flex flex-col items-start extraSmallText text-primary/50 mt-[3vw] sm:mt-[0.5vw]"
          >
            <a
              href="mailto:arminrahmani318@gmail.com"
              className="text-hover cursor-pointer w-fit py-[1.5vw] sm:py-[0.25vw] hover:text-[#ff3344] transition-colors"
            >
              arminrahmani318@gmail.com
            </a>
            <a
              href="tel:09138763394"
              className="text-hover cursor-pointer w-fit py-[1.5vw] sm:py-[0.25vw] font-mono hover:text-[#ff3344] transition-colors"
            >
              09138763394
            </a>
            <a
              href="tel:09203275255"
              className="text-hover cursor-pointer w-fit py-[1.5vw] sm:py-[0.25vw] font-mono hover:text-[#ff3344] transition-colors"
            >
              09203275255
            </a>
            <a
              href="https://wa.me/989138763394"
              target="_blank"
              rel="noreferrer"
              className="text-hover cursor-pointer w-fit py-[1.5vw] sm:py-[0.25vw] text-emerald-400"
            >
              whatsapp chat
            </a>
          </div>
        </div>

        {/* Col 5: Talk to me Button */}
        <div className="col-span-3 sm:col-span-2 mt-[8vw] sm:mt-[2vw] flex items-start sm:justify-end">
          <div className="w-fit text-secondary">
            <div
              className="drop-shadow rounded-[1vw] sm:rounded-[0.25vw]"
              style={{
                boxShadow: '0 0 1vw 0.5vw rgba(255, 51, 68, 0.25)'
              }}
            >
              <button
                type="button"
                onClick={openContactModal}
                className="main-btn smallText cursor-pointer"
                aria-label="Talk to me"
              >
                <span className="main-btn__icon" aria-hidden="true" />
                <span className="main-btn__label">
                  <span className="main-btn__clip">
                    <span className="main-btn__from">Talk to me</span>
                    <span className="main-btn__to" aria-hidden="true">
                      Talk to me
                    </span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="col-span-3 sm:col-span-4 mt-[20vw] sm:mt-[15.75vw]">
          <span className="detailText font-thin text-primary/50">
            © 2026 Armin Rahmani. All rights reserved.
          </span>
        </div>

        {/* Back to top */}
        <div className="col-span-full sm:col-span-4 mt-[6vw] sm:mt-[15vw] hidden sm:flex justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top extraSmallText font-thin text-primary/50 cursor-pointer hover:scale-105"
          >
            <span className="back-to-top__clip">
              <span className="back-to-top__from">
                <span className="back-to-top__arrow">↑</span>
                <span className="back-to-top__label">back to top</span>
              </span>
              <span className="back-to-top__to" aria-hidden="true">
                <span className="back-to-top__arrow">↑</span>
                <span className="back-to-top__label">back to top</span>
              </span>
            </span>
          </button>
        </div>

        {/* Legal & Credits */}
        <div className="col-span-3 sm:col-span-4 flex sm:justify-end mt-[20vw] sm:mt-[15.75vw]">
          <nav
            aria-label="Legal and credits"
            className="legal-links detailText font-thin text-primary/70"
          >
            <button type="button" onClick={() => navigateTo('/privacy', 'PRIVACY')}>
              <span className="text-hover cursor-pointer w-fit">privacy</span>
            </button>
            <span aria-hidden="true">, </span>
            <button type="button" onClick={() => navigateTo('/terms', 'TERMS')}>
              <span className="text-hover cursor-pointer w-fit">
                terms of use
              </span>
            </button>
            <a
              href="https://joshchant.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-[0.5vw]"
            >
              <span className="text-hover cursor-pointer w-fit">
                site by josh
              </span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
