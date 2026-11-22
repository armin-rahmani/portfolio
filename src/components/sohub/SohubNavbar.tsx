import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SohubNavbarProps {
  activeView: 'home' | 'studio' | 'work' | 'contact';
  onSelectView: (view: 'home' | 'studio' | 'work' | 'contact') => void;
  onOpenContact: () => void;
}

export const SohubNavbar: React.FC<SohubNavbarProps> = ({
  activeView,
  onSelectView,
  onOpenContact
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const dotsRef = useRef<HTMLSpanElement>(null);
  const chatBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const backBtnRef = useRef<HTMLAnchorElement>(null);

  // Magnetic cursor quickTo setup with GSAP on desktop
  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    if (chatBtnRef.current) {
      const chatX = gsap.quickTo(chatBtnRef.current, 'x', { duration: 0.35, ease: 'power2.out' });
      const chatY = gsap.quickTo(chatBtnRef.current, 'y', { duration: 0.35, ease: 'power2.out' });

      const onMouseMove = (e: MouseEvent) => {
        const rect = chatBtnRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        chatX(x * 0.25);
        chatY(y * 0.25);
      };

      const onMouseLeave = () => {
        chatX(0);
        chatY(0);
      };

      const el = chatBtnRef.current;
      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);
    }

    if (menuBtnRef.current) {
      const menuX = gsap.quickTo(menuBtnRef.current, 'x', { duration: 0.35, ease: 'power2.out' });
      const menuY = gsap.quickTo(menuBtnRef.current, 'y', { duration: 0.35, ease: 'power2.out' });

      const onMouseMove = (e: MouseEvent) => {
        const rect = menuBtnRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        menuX(x * 0.25);
        menuY(y * 0.25);
      };

      const onMouseLeave = () => {
        menuX(0);
        menuY(0);
      };

      const el = menuBtnRef.current;
      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);
    }
  }, { scope: containerRef });

  // GSAP Menu Drawer animation & Staggered Link Reveals
  useGSAP(() => {
    if (!menuRef.current) return;

    if (isMenuOpen) {
      const tl = gsap.timeline();
      tl.to(menuRef.current, {
        x: '0%',
        rotation: 0,
        opacity: 1,
        duration: 0.55,
        ease: 'power3.out',
        pointerEvents: 'auto'
      })
      .fromTo(
        '.raya-menu-link',
        { y: 20, opacity: 0, rotateX: 15 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.07, duration: 0.45, ease: 'back.out(1.4)' },
        '-=0.25'
      );

      if (dotsRef.current) {
        gsap.to(dotsRef.current, {
          rotation: 90,
          scale: 1.15,
          duration: 0.4,
          ease: 'back.out(1.5)'
        });
      }
    } else {
      gsap.to(menuRef.current, {
        x: '-120%',
        rotation: -6,
        opacity: 0,
        duration: 0.45,
        ease: 'power3.in',
        pointerEvents: 'none'
      });
      if (dotsRef.current) {
        gsap.to(dotsRef.current, {
          rotation: 0,
          scale: 1,
          duration: 0.35,
          ease: 'power2.out'
        });
      }
    }
  }, { scope: containerRef, dependencies: [isMenuOpen] });

  const handleLinkClick = (view: 'home' | 'studio' | 'work' | 'contact') => {
    onSelectView(view);
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={containerRef}
      dir="rtl"
      className="fixed w-full pointer-events-none left-0 top-0 px-4 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 z-[997] flex flex-row items-start justify-between font-vazir"
    >
      {/* Brand Logo - Native Typography, NO custom capsule border */}
      <button
        type="button"
        onClick={() => handleLinkClick('home')}
        className="pointer-events-auto header-logo group flex items-center gap-2.5 cursor-pointer hover:opacity-80 active:scale-95 transition-all text-[#0C1016] mt-1 select-none"
        aria-label="صفحه اصلی استودیو رایا"
      >
        <span className="font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-none">
          رایا
        </span>
        <span className="h-4 w-[1.5px] bg-black/20 hidden sm:inline-block" />
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7F8790] hidden sm:inline-block">
          RAYA STUDIO
        </span>
      </button>

      {/* Controls Container */}
      <div className="relative flex flex-col items-start pointer-events-auto">
        <div className="flex flex-row items-center gap-2 sm:gap-3 lg:gap-4 z-[4]">
          {/* Back to Armin's Portfolio - Clean Native Style */}
          <Link
            ref={backBtnRef}
            to="/"
            className="p-[0.35rem] select-none hover:scale-105 active:scale-95 transition-all duration-300 rounded-full flex flex-row items-center bg-[#1E232C]/5 hover:bg-[#1E232C]/10 text-[#0C1016]"
            title="بازگشت به پورتفولیو آرمین رحمانی"
          >
            <span className="text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 flex items-center gap-1.5">
              <span>←</span>
              <span className="hidden sm:inline">پورتفولیو آرمین</span>
            </span>
          </Link>

          {/* Chat with Raya Button (Native SOHub Soft Grey Pill) */}
          <button
            ref={chatBtnRef}
            type="button"
            onClick={onOpenContact}
            style={{ backgroundColor: '#D9E0E3' }}
            className="p-[0.3rem] select-none will-change-transform group hover:scale-105 active:scale-95 transition-transform duration-500 rounded-full hidden sm:flex flex-row items-center cursor-pointer shadow-sm"
          >
            <span style={{ color: '#0C1016' }} className="text-xs lg:text-sm font-bold px-4 lg:px-6">
              گفتگو با رایا
            </span>
            <span
              style={{ backgroundColor: '#F0F6F8' }}
              className="relative overflow-hidden flex items-center justify-center w-8 lg:w-10 h-8 lg:h-10 rounded-full"
            >
              <span
                style={{ color: '#0C1016' }}
                className="block w-1/3 will-change-transform group-hover:-translate-x-[250%] transition-transform duration-500"
              >
                <svg width="100%" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 3.26215C1 2.33911 1.79594 1.59084 2.77778 1.59082C16.2041 1.59082 17 2.33909 17 3.26213V11.6485C17 12.5716 16.2041 13.3198 15.2222 13.3199L11.9989 13.3199C11.7918 13.3199 11.5912 13.3878 11.4318 13.512L8.9962 15.409L6.59291 13.5151C6.43287 13.389 6.23071 13.3199 6.02188 13.3199H2.77778C1.79594 13.3199 1 12.5716 1 11.6486L1 3.26215Z"
                    stroke="currentColor"
                    strokeWidth="1.77778"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </button>

          {/* SOHub MENU / CLOSE Toggle Pill (Native Black Pill with 2 dots) */}
          <button
            ref={menuBtnRef}
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            style={{ backgroundColor: '#0C1016' }}
            className="p-[0.3rem] will-change-transform group hover:scale-105 active:scale-95 transition-transform duration-500 rounded-full flex flex-row items-center cursor-pointer shadow-lg"
          >
            <span style={{ color: '#F0F6F8' }} className="text-xs lg:text-sm font-bold pl-4 sm:pl-7 pr-3 sm:pr-5">
              <span className="block relative overflow-hidden h-5">
                <span
                  style={{
                    transform: isMenuOpen ? 'translateY(-100%)' : 'translateY(0%)'
                  }}
                  className="block transition-transform duration-500 ease-[cubic-bezier(.22,.68,0,1.2)]"
                >
                  منو
                </span>
                <span
                  style={{
                    transform: isMenuOpen ? 'translateY(-100%)' : 'translateY(0%)'
                  }}
                  className="block transition-transform duration-500 ease-[cubic-bezier(.22,.68,0,1.2)] text-white/80"
                >
                  بستن
                </span>
              </span>
            </span>
            <span
              style={{ backgroundColor: '#1E242C' }}
              className="relative overflow-hidden flex items-center justify-center w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 rounded-full"
            >
              <span
                ref={dotsRef}
                style={{ color: '#F0F6F8' }}
                className="block w-1/3 will-change-transform transition-transform duration-500"
              >
                <svg width="100%" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11.4517" cy="3.41264" r="2.54545" fill="currentColor" />
                  <circle cx="2.54545" cy="3.41264" r="2.54545" fill="currentColor" />
                </svg>
              </span>
            </span>
          </button>
        </div>

        {/* Sliding Menu Drawer */}
        <nav
          id="site-menu"
          ref={menuRef}
          className="absolute top-full left-0 mt-3 w-72 sm:w-88 select-none pointer-events-none z-[3] menu will-change-transform"
          style={{ transform: 'translate(-120%, 0px) rotate(-6deg)', opacity: 0 }}
        >
          <div className="rounded-3xl bg-[#E8EEF1] p-5 sm:p-7 lg:p-8 flex flex-col gap-2 shadow-2xl border border-black/10">
            {(
              [
                { label: 'خانه', view: 'home', sub: 'Home' },
                { label: 'استودیو و افتخارات', view: 'studio', sub: 'Studio & Awards' },
                { label: 'پروژه‌ها و کارها', view: 'work', sub: 'Selected Works' },
                { label: 'تماس و همکاری', view: 'contact', sub: 'Contact & Hire' }
              ] as const
            ).map((item) => {
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.view}
                  type="button"
                  onClick={() => handleLinkClick(item.view)}
                  style={{ color: '#1E232C' }}
                  className={`raya-menu-link flex group flex-row items-center justify-between text-xl sm:text-2xl font-bold py-3 rounded-2xl w-full px-5 transition-all duration-200 cursor-pointer text-right ${
                    isActive ? 'bg-white shadow-sm' : 'hover:bg-white/70'
                  }`}
                >
                  <span className="flex flex-col items-start">
                    <span>{item.label}</span>
                    <span className="text-[10px] text-[#7F8790] uppercase tracking-wider font-mono">
                      {item.sub}
                    </span>
                  </span>
                  <span className="text-sm opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200">
                    ←
                  </span>
                </button>
              );
            })}

            {/* Armin Rahmani Mandatory Attribution Banner */}
            <div className="mt-4 pt-4 border-t border-black/10 text-right">
              <span className="text-[11px] text-[#7F8790] block leading-relaxed">
                طراحی و توسعه وبسایت توسط{' '}
                <strong className="text-[#0C1016] font-bold">آرمین رحمانی</strong>
              </span>
              <span className="text-[10px] text-[#7F8790]/70 font-mono block mt-0.5">
                Creative Engineering with GSAP
              </span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
