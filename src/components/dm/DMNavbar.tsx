import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DMMenuDrawer } from './DMMenuDrawer';

interface DMNavbarProps {
  onOpenContact: () => void;
}

export const DMNavbar: React.FC<DMNavbarProps> = ({ onOpenContact }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll and background theme (dark vs light sections)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Detect white sections in the viewport
      const whiteSections = document.querySelectorAll('.bg-white, .background-color-white, [data-logo-theme="dark"]');
      let onLight = false;

      whiteSections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        // If top of viewport is inside this white section
        if (rect.top <= 80 && rect.bottom >= 80) {
          onLight = true;
        }
      });

      setIsLightSection(onLight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle magnetic hover for the floating menu button
  useGSAP(() => {
    const btn = menuBtnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: navRef });

  const handleNavClick = (anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isScrolled ? 'py-4 backdrop-blur-md bg-black/20' : 'py-6 md:py-8'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="/"
            className="relative z-10 flex items-center transition-transform hover:scale-105 active:scale-95 duration-300"
            aria-label="Digitalmakers Home"
          >
            <img
              src={isLightSection ? '/images/dm/digitalmakers-logo-black.svg' : '/images/dm/digitalmakers-logo-white.svg'}
              alt="Digitalmakers"
              className="w-24 sm:w-28 h-auto transition-all duration-300"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => handleNavClick('#approach')}
              className={`transition-colors hover:text-[#5363F6] ${
                isLightSection ? 'text-black/80' : 'text-white/80'
              }`}
            >
              What we do
            </button>

            <button
              onClick={() => handleNavClick('#cases')}
              className={`transition-colors hover:text-[#5363F6] flex items-baseline gap-1 ${
                isLightSection ? 'text-black/80' : 'text-white/80'
              }`}
            >
              <span>Showcase</span>
              <sup className="text-[10px] font-mono text-[#F8CB47]">5</sup>
            </button>

            <button
              onClick={() => handleNavClick('#statement')}
              className={`transition-colors hover:text-[#5363F6] ${
                isLightSection ? 'text-black/80' : 'text-white/80'
              }`}
            >
              About us
            </button>

            <button
              onClick={onOpenContact}
              className={`transition-colors hover:text-[#5363F6] ${
                isLightSection ? 'text-black/80' : 'text-white/80'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Floating Sticky Menu Button */}
          <div className="flex items-center gap-3">
            <button
              ref={menuBtnRef}
              onClick={() => setIsMenuOpen(true)}
              className={`group flex items-center gap-3 px-4 py-2.5 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all duration-300 backdrop-blur-xl shadow-lg active:scale-95 ${
                isLightSection
                  ? 'bg-black/90 text-white border-black/80 hover:bg-black'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              <span>Menu</span>
              <div className="flex flex-col gap-1 w-4">
                <span className="block h-[1.5px] w-full bg-current transition-transform group-hover:translate-x-0.5 duration-200" />
                <span className="block h-[1.5px] w-3/4 bg-current transition-transform group-hover:translate-x-1 duration-200" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Overlay */}
      <DMMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenContact={onOpenContact}
      />
    </>
  );
};
