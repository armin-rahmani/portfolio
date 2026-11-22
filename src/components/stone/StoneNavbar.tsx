import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Phone, ArrowUpRight } from 'lucide-react';
import { StoneMobileMenu } from './StoneMobileMenu';

interface StoneNavbarProps {
  onOpenQuote: () => void;
}

export const StoneNavbar: React.FC<StoneNavbarProps> = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const quoteBtnWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Magnetic button effect on Quote button
  useGSAP(() => {
    const btn = quoteBtnWrapRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.35, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1.2, 0.4)' });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: headerRef });

  const handleNavClick = (anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 select-none ${
          isScrolled
            ? 'py-4 bg-black/85 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-6 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between">
          
          {/* Clean Brand */}
          <a
            href="/"
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Arash Stone Co."
          >
            <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <line x1="12" y1="22" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="22" y2="8.5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="2" y2="8.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-sans font-bold tracking-tight text-white text-base uppercase leading-none">
                ARASH STONE
              </span>
              <span className="text-[10px] font-mono text-neutral-400 tracking-wider mt-1 uppercase">
                EST. 1974 • ISFAHAN
              </span>
            </div>
          </a>

          {/* Clean Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <button
              onClick={() => handleNavClick('#pietra-gray')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Pietra Gray
            </button>
            <button
              onClick={() => handleNavClick('#catalog')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('#finishes')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Finishes
            </button>
            <button
              onClick={() => handleNavClick('#process')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Quarry & Factory
            </button>
            <button
              onClick={() => handleNavClick('#export')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Export
            </button>
            <button
              onClick={() => handleNavClick('#contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action: Clean Phone & Magnetic Quote Button */}
          <div className="hidden sm:flex items-center gap-6">
            <a
              href="tel:03133808419"
              className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-400" />
              <span>031-33808419</span>
            </a>

            <div ref={quoteBtnWrapRef}>
              <button
                onClick={onOpenQuote}
                className="px-5 py-2.5 rounded-lg bg-white text-black text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-neutral-200 shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Request Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Clean Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white flex flex-col items-center justify-center gap-1 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <span className="w-4 h-0.5 bg-white transition-transform" />
              <span className="w-4 h-0.5 bg-white transition-transform" />
            </button>
          </div>

        </div>
      </header>

      {/* GSAP Mobile Drawer */}
      <StoneMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenQuote={() => {
          setIsMobileMenuOpen(false);
          onOpenQuote();
        }}
      />
    </>
  );
};
