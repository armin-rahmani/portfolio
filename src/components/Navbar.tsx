import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePageTransition } from '../context/TransitionContext';
import { useContactModal } from '../context/ContactModalContext';
import { MobileMenu } from './MobileMenu';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { id: 'about', label: 'About,' },
  { id: 'services', label: 'Services,' },
  { id: 'work', label: 'Work,' },
  { id: 'process', label: 'Process' }
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { navigateTo } = usePageTransition();
  const { openContactModal } = useContactModal();
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const brandBtnRef = useRef<HTMLButtonElement>(null);
  const talkBtnWrapRef = useRef<HTMLDivElement>(null);

  const isHomePage = location.pathname === '/';

  // 60fps ScrollTrigger detection across all sections
  useGSAP(() => {
    // Dynamic dark section tracking
    const darkSections = document.querySelectorAll('[data-nav-color="primary"]');
    const darkTriggers: ScrollTrigger[] = [];

    darkSections.forEach((sec) => {
      const st = ScrollTrigger.create({
        trigger: sec,
        start: 'top 70px',
        end: 'bottom 70px',
        onEnter: () => setIsDarkSection(true),
        onEnterBack: () => setIsDarkSection(true),
        onLeave: () => setIsDarkSection(false),
        onLeaveBack: () => setIsDarkSection(false)
      });
      darkTriggers.push(st);
    });

    // Initial smooth entrance animation for the navbar
    if (navContainerRef.current) {
      gsap.fromTo(
        navContainerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }

    return () => {
      darkTriggers.forEach((st) => st.kill());
    };
  }, { scope: headerRef, dependencies: [location.pathname] });

  // GSAP Magnetic button effect on Talk to me
  const handleTalkMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!talkBtnWrapRef.current) return;
    const rect = talkBtnWrapRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(talkBtnWrapRef.current, {
      x: x * 0.28,
      y: y * 0.28,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleTalkMouseLeave = () => {
    if (!talkBtnWrapRef.current) return;
    gsap.to(talkBtnWrapRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1.2, 0.4)',
      overwrite: 'auto'
    });
  };

  const handleLinkClick = (e: React.MouseEvent, target: string, label: string) => {
    e.preventDefault();
    navigateTo(target, label);
  };

  // Dynamic frosted glass backdrop blur pill styling
  const pillBgClass = isDarkSection ? 'nav-pill-dark' : 'nav-pill-light';
  const brandPillClass = isDarkSection ? 'nav-pill-dark' : 'nav-pill-light';

  return (
    <>
      <header
        ref={headerRef}
        className="header fixed top-0 inset-x-0 z-50 pointer-events-none"
      >
        <div
          ref={navContainerRef}
          className="layout-fixed layout-grid relative w-full z-30 pt-[3.2vw] sm:pt-[1.5vw] pointer-events-auto items-center px-4 sm:px-8 lg:px-12"
        >
          {/* Left: Brand with frosted blur capsule */}
          <div className="col-span-6 sm:col-span-3 flex justify-start items-center">
            <button
              ref={brandBtnRef}
              type="button"
              onClick={(e) => handleLinkClick(e, '/', 'HOME')}
              className={`flex items-center px-[3vw] sm:px-[1.2vw] py-[1.2vw] sm:py-[0.4vw] rounded-full border backdrop-blur-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 group ${brandPillClass}`}
              data-cursor-text="HOME"
            >
              <span className="smallText font-medium tracking-tight whitespace-nowrap">armin rahmani</span>
            </button>
          </div>

          {/* Center: Desktop Navigation Group with Frosted Glass Blur Capsule (Hidden on mobile) */}
          <div className="col-span-6 justify-center items-center hidden sm:flex">
            <div
              className={`nav-group flex items-center gap-[0.35vw] px-[1.4vw] py-[0.45vw] rounded-full border backdrop-blur-xl transition-all duration-300 ${pillBgClass}`}
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={(e) => handleLinkClick(e, `#${link.id}`, link.id.toUpperCase())}
                  className="nav-pill-item nav-btn smallText cursor-pointer py-[0.2vw] px-[0.4vw] transition-transform duration-200 hover:scale-105"
                  data-cursor-text={link.id.toUpperCase()}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Mobile Menu Button (Mobile Only) / Desktop Talk to Me Button */}
          <div className="col-span-6 sm:col-span-3 flex items-center justify-end gap-3 sm:gap-2">
            {/* Mobile Menu Button - Replaces "Talk to me" on mobile */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="sm:hidden flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300/80 bg-white/80 backdrop-blur-xl transition-all duration-300 cursor-pointer active:scale-95 shadow-xs text-neutral-900"
              aria-label="Open Navigation Menu"
            >
              <div className="flex flex-col gap-0.5 w-3.5">
                <span className="block h-[1.5px] w-full bg-neutral-900 rounded-full" />
                <span className="block h-[1.5px] w-2.5 bg-neutral-900 rounded-full" />
              </div>
              <span className="text-xs font-semibold tracking-wide uppercase">Menu</span>
            </button>

            {/* Desktop Talk to me Button - Hidden on Mobile */}
            <div
              ref={talkBtnWrapRef}
              onMouseMove={handleTalkMouseMove}
              onMouseLeave={handleTalkMouseLeave}
              className="hidden sm:block drop-shadow rounded-[1vw] sm:rounded-[0.25vw] will-change-transform"
              style={{
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
              }}
            >
              <div className="overflow-hidden">
                <button
                  type="button"
                  onClick={openContactModal}
                  className="main-btn smallText cursor-pointer"
                  aria-label="Talk to me"
                  data-cursor-text="TALK"
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
            <span className="text-[10px] font-mono text-neutral-400 tracking-wide select-none hidden xl:block whitespace-nowrap">
              Available for projects
            </span>
          </div>
        </div>
      </header>

      {/* GSAP-Powered Mobile Menu Overlay (Mounted globally, animated in/out via GSAP) */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={(target, label) => navigateTo(target, label)}
      />
    </>
  );
};
